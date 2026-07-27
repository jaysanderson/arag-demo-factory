// ─────────────────────────────────────────────────────────────────────────────
// ARAG Portal server.
//
//   1. Holds the KB service-account token (NUCLIA_SERVICEACCOUNT). It NEVER
//      reaches the browser, demo.config.json, /api/config, or the logs.
//   2. Proxies exactly the ARAG surface the portal needs, applying the grounding
//      policy (server/retrieval.mjs) so answers arrive cited by default.
//   3. In production also serves the built SPA (dist/) — one process, one port.
//
// Every KB call authenticates with a single header:
//   X-NUCLIA-SERVICEACCOUNT: Bearer <token>
// (sending more than one authorization header makes Nuclia reject the request).
// ─────────────────────────────────────────────────────────────────────────────

import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { existsSync, readFileSync } from 'node:fs';
import { askBody } from './retrieval.mjs';
import { shapeGraph } from './graph.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ── env (no dotenv dependency) ───────────────────────────────────────────────
// Read portal/.env first, then the factory-root .env (the location the docs tell
// you to fill in). Real environment variables always win over both.
try {
  for (const envPath of [join(ROOT, '.env'), join(ROOT, '..', '.env')]) {
    if (!existsSync(envPath)) continue;
    for (const line of readFileSync(envPath, 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
} catch { /* ignore */ }

const PORT = process.env.PORT || 4000;
const GEN_MODEL = process.env.NUCLIA_GENERATIVE_MODEL || '';
const TIMEOUT_MS = Number(process.env.NUCLIA_TIMEOUT_MS || 60000);

const trimUrl = (u) => (u || '').replace(/\/+$/, '');
// Sanitise a pasted token: drop surrounding quotes/whitespace and a stray
// "Bearer " prefix (a common copy-paste mistake that yields "JWT decoding error").
const cleanKey = (k) =>
  String(k || '').trim().replace(/^["']+|["']+$/g, '').replace(/^Bearer\s+/i, '').trim();

const KB_BASE = trimUrl(process.env.NUCLIA_KB_URL);
const KB_TOKEN = cleanKey(process.env.NUCLIA_SERVICEACCOUNT || process.env.NUCLIA_API_KEY);

// ── demo config (runtime source of truth for surfaces, theme, safety) ─────────
function loadConfig() {
  for (const p of [join(ROOT, 'demo.config.json'), join(ROOT, 'portal', 'demo.config.json')]) {
    try { if (existsSync(p)) return JSON.parse(readFileSync(p, 'utf8')); } catch { /* try next */ }
  }
  return null;
}
const CONFIG = loadConfig();
const PERSONA = CONFIG?.persona || null;

// The client copy of the config carries NO secrets and NO residency string. The
// `kb` block (env-var names) is dropped, and the zone is never emitted anywhere
// (Hard Rule 4). Everything left is safe to render.
function publicConfig() {
  if (!CONFIG) return { title: 'Agentic RAG Portal', surfaces: [], safety: {}, theme: {} };
  const { kb, ...rest } = CONFIG; // eslint-disable-line no-unused-vars
  return rest;
}

// ── Nuclia client ────────────────────────────────────────────────────────────
function headers(extra = {}) {
  return {
    'X-NUCLIA-SERVICEACCOUNT': `Bearer ${KB_TOKEN}`,
    'Content-Type': 'application/json',
    ...extra,
  };
}

async function kbFetch(pathname, { method = 'GET', body, accept, signal } = {}) {
  if (!KB_BASE || !KB_TOKEN) {
    const err = new Error('Knowledge Box is not configured on the server (set NUCLIA_KB_URL and NUCLIA_SERVICEACCOUNT).');
    err.status = 503;
    throw err;
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${KB_BASE}${pathname}`, {
      method,
      headers: headers(accept ? { Accept: accept } : {}),
      body: body ? JSON.stringify(body) : undefined,
      signal: signal || controller.signal,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      const err = new Error(`Nuclia ${res.status} ${res.statusText}: ${text.slice(0, 400)}`);
      err.status = res.status;
      throw err;
    }
    return res;
  } finally {
    clearTimeout(timer);
  }
}

const jsonOf = async (pathname, opts) => (await kbFetch(pathname, opts)).json();

// ── labelset / facet discovery (cached) ──────────────────────────────────────
// A config-driven portal does not know a KB's taxonomy ahead of time, so facet
// paths are discovered from the KB's own labelsets and cached briefly.
// Cache the KB's declared labelsets AND their declared labels. Nuclia's /catalog
// faceting can surface classification labels that belong to OTHER Knowledge
// Boxes in the same account (observed: a space KB whose doc_type facet returned
// another demo's doc types). A KB must only ever show its own taxonomy, so we
// keep the set of labels each labelset actually declares and filter facets to it.
let facetCache = { paths: null, allowed: {}, ts: 0 };
async function facetPaths() {
  if (facetCache.paths && Date.now() - facetCache.ts < 300000) return facetCache.paths;
  try {
    const data = await jsonOf('/labelsets');
    const sets = data.labelsets || {};
    const ids = Object.keys(sets);
    const paths = ids.map((id) => `/classification.labels/${id}`);
    const allowed = {};
    for (const id of ids) allowed[id] = new Set((sets[id].labels || []).map((l) => l.title));
    facetCache = { paths, allowed, ts: Date.now() };
    return paths;
  } catch {
    return facetCache.paths || [];
  }
}

/**
 * Normalises Nuclia's facet payload into `{ labelset: [{label, count}] }`,
 * keeping only labels this KB declares (see facetPaths). `allowed` is the map
 * of labelset id → Set of declared label titles.
 */
function normaliseFacets(raw, allowed = {}) {
  const source = raw?.fulltext?.facets || raw?.facets || {};
  const out = {};
  for (const [path, entries] of Object.entries(source)) {
    const labelset = path.split('/').filter(Boolean).pop();
    if (!labelset) continue;
    const declared = allowed[labelset];
    const pairs = Array.isArray(entries)
      ? entries.map((e) => [e.facet ?? e.tag ?? '', e.total ?? e.count ?? 0])
      : Object.entries(entries).map(([key, value]) => [
          key,
          typeof value === 'number' ? value : value?.total ?? value?.count ?? 0,
        ]);
    const list = pairs
      .map(([key, count]) => ({ label: String(key).split('/').pop(), count }))
      // Only labels the KB actually declares — drops any cross-KB phantom labels.
      .filter((entry) => entry.label && (!declared || declared.size === 0 || declared.has(entry.label)))
      .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
    if (list.length) out[labelset] = list;
  }
  return out;
}

/** Flattens a catalog resource into a generic, render-ready card. */
function toCard(id, resource) {
  const extra = resource.extra?.metadata || {};
  const classifications = resource.usermetadata?.classifications || [];
  const labels = {};
  for (const { labelset, label } of classifications) (labels[labelset] ||= []).push(label);
  const firstLabel = (...names) => {
    for (const n of names) if (labels[n]?.length) return labels[n][0];
    return null;
  };
  return {
    id,
    slug: resource.slug || null,
    title: resource.title || id,
    summary: resource.summary || '',
    icon: resource.icon || null,
    created: resource.created || null,
    sourceUrl: resource.origin?.url || extra.source_url || null,
    docType: firstLabel('doc_type', 'type') || extra.doc_type || 'Document',
    mediaType: firstLabel('media_type') || extra.media_type || null,
    durationMinutes: extra.duration_minutes ?? null,
    labels, // full labelset → [labels] map, for chips
    authors: extra.authors || [],
  };
}

// ── app ──────────────────────────────────────────────────────────────────────
const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));

/** GET /api/health — cheapest reachability probe (also powers the status chip). */
app.get('/api/health', async (_req, res) => {
  if (!KB_BASE || !KB_TOKEN) {
    return res.json({ ok: false, kb: 'unconfigured' });
  }
  try {
    const counters = await jsonOf('/counters');
    res.json({ ok: true, kb: 'connected', resources: counters.resources ?? null });
  } catch (err) {
    res.json({ ok: false, kb: 'unreachable', error: err.message });
  }
});

/** GET /api/config — the portal's render contract, stripped of anything sensitive. */
app.get('/api/config', (_req, res) => {
  res.set('Cache-Control', 'no-store');
  res.json(publicConfig());
});

/**
 * POST /api/ask — grounded, streamed answer. Relays Nuclia's NDJSON straight
 * through so the UI renders tokens as they arrive; grounding policy (neighbouring
 * paragraphs + citations) is applied here, server-side.
 */
app.post('/api/ask', async (req, res) => {
  const { query, filters, searchConfig, resourceId } = req.body || {};
  if (!query || !String(query).trim()) return res.status(400).json({ error: 'query is required' });

  const body = { query, ...askBody({ persona: PERSONA, generativeModel: GEN_MODEL }) };
  if (filters && filters.length) body.filters = filters;
  // Scope the answer to a single resource — used by the "journey through the
  // context" walk to ask each source how it relates, grounded only in itself.
  if (resourceId) body.resource_filters = [String(resourceId)];
  // A named search configuration is authoritative — it carries its own strategy
  // and prompt, so local overrides would silently fight it.
  if (searchConfig) {
    delete body.rag_strategies;
    delete body.prompt;
    delete body.top_k;
    body.search_configuration = searchConfig;
  }

  // Abort the upstream only if the CLIENT disconnects before we finish
  // streaming. Watching req.on('close') is wrong — it fires as soon as the POST
  // body is consumed, aborting the upstream mid-answer and yielding an empty
  // (silently swallowed) response.
  const controller = new AbortController();
  res.on('close', () => { if (!res.writableEnded) controller.abort(); });

  try {
    const upstream = await kbFetch('/ask', {
      method: 'POST',
      body,
      accept: 'application/x-ndjson',
      signal: controller.signal,
    });
    res.setHeader('Content-Type', 'application/x-ndjson');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const reader = upstream.body.getReader();
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(Buffer.from(value));
      if (typeof res.flush === 'function') res.flush();
    }
    res.end();
  } catch (err) {
    if (controller.signal.aborted) return;
    if (res.headersSent) return res.end();
    res.status(err.status || 502).json({ error: err.message });
  }
});

/** POST /api/search — semantic retrieval (/find), for the results list. */
app.post('/api/search', async (req, res) => {
  const { query, filters, pageSize = 20, searchConfig, features } = req.body || {};
  if (!query || !String(query).trim()) return res.status(400).json({ error: 'query is required' });
  const body = { query, page_size: pageSize };
  if (filters && filters.length) body.filters = filters;
  if (searchConfig) body.search_configuration = searchConfig;
  if (features && features.length) body.features = features;
  const started = Date.now();
  try {
    const result = await jsonOf('/find', { method: 'POST', body });
    res.json({ ...result, latencyMs: Date.now() - started });
  } catch (err) {
    res.status(err.status || 502).json({ error: err.message });
  }
});

// Nuclia relevance scores come back 0–5 (sometimes already 0–1). Fold to 0–1.
const norm01 = (v) => {
  const n = Number(v) || 0;
  const s = n > 1 ? n / 5 : n;
  return Math.max(0, Math.min(1, s));
};
const tidyQuote = (t) => String(t || '').replace(/\s+/g, ' ').replace(/^[•\-–\s]+/, '').trim();

/** Rank a /find payload into ordered "journey" stops (strongest match first). */
function journeyStops(raw, cited) {
  const resources = raw.resources || {};
  const stops = [];
  for (const [rid, r] of Object.entries(resources)) {
    const paras = [];
    for (const field of Object.values(r.fields || {})) {
      for (const p of Object.values(field.paragraphs || {})) {
        if (p && typeof p.text === 'string') paras.push({ text: p.text, score: Number(p.score) || 0 });
      }
    }
    paras.sort((a, b) => b.score - a.score);
    const card = toCard(rid, r);
    const labels = Object.values(card.labels || {}).flat().slice(0, 4);
    // Skip the title-as-paragraph (Nuclia indexes the title as its own, often
    // top-scoring, paragraph) so the quote is real supporting prose.
    const titleNorm = tidyQuote(card.title).toLowerCase();
    const isTitle = (t) => { const q = tidyQuote(t).toLowerCase(); return q === titleNorm || q.length < 25; };
    const quote = tidyQuote((paras.find((p) => !isTitle(p.text)) || paras[0])?.text || r.summary || '');
    stops.push({
      resourceId: rid,
      title: card.title,
      url: card.sourceUrl,
      score: norm01(r.score ?? paras[0]?.score ?? 0),
      quote,
      labels,
      cited: cited.has(rid),
    });
  }
  stops.sort((a, b) => b.score - a.score);
  return stops.slice(0, 8);
}

/** POST /api/journey — ranked grounding for the "journey through the context" walk. */
app.post('/api/journey', async (req, res) => {
  const { query, filters, citedIds = [], pageSize = 8 } = req.body || {};
  if (!query || !String(query).trim()) return res.status(400).json({ error: 'query is required' });
  const body = { query, page_size: pageSize, features: ['keyword', 'semantic'], show: ['basic', 'origin'] };
  if (filters && filters.length) body.filters = filters;
  try {
    const raw = await jsonOf('/find', { method: 'POST', body });
    res.json({ stops: journeyStops(raw, new Set((citedIds || []).filter(Boolean))) });
  } catch (err) {
    res.status(err.status || 502).json({ error: err.message });
  }
});

/** POST /api/catalog — faceted browse over the whole corpus (metadata, not semantic). */
app.post('/api/catalog', async (req, res) => {
  const { query = '', filters, pageSize = 60, page = 0 } = req.body || {};
  try {
    const facets = await facetPaths();
    const body = {
      query,
      page_size: pageSize,
      page_number: page,
      show: ['basic', 'origin', 'extra'],
    };
    if (filters && filters.length) body.filters = filters;
    if (facets.length) body.faceted = facets;

    const raw = await jsonOf('/catalog', { method: 'POST', body });
    const resources = raw.resources || {};
    const items = Object.entries(resources).map(([id, r]) => toCard(id, r));
    res.json({
      items,
      facets: normaliseFacets(raw, facetCache.allowed),
      total: raw.fulltext?.total ?? items.length,
      page,
      pageSize,
    });
  } catch (err) {
    res.status(err.status || 502).json({ error: err.message });
  }
});

/** POST /api/graph — knowledge-graph path search, shaped for the explorer. */
app.post('/api/graph', async (req, res) => {
  const { entity = '', topK = 200, includeAllGroups = false } = req.body || {};
  const query = { prop: 'path' };
  const seed = String(entity).trim();
  if (seed) {
    query.undirected = true;
    query.source = { value: seed };
  }
  try {
    const raw = await jsonOf('/graph', { method: 'POST', body: { query, top_k: topK } });
    res.json(shapeGraph(raw, { includeAllGroups }));
  } catch (err) {
    res.status(err.status || 502).json({ error: err.message });
  }
});

/** GET /api/entities — entities Nuclia extracted, by group (graph suggestions). */
app.get('/api/entities', async (_req, res) => {
  try {
    const listing = await jsonOf('/entitiesgroups');
    const ids = Object.keys(listing.groups || {});
    const groups = await Promise.all(
      ids.map(async (id) => {
        try {
          const g = await jsonOf(`/entitiesgroup/${encodeURIComponent(id)}`);
          const entities = Object.keys(g.entities || {}).sort();
          return { id, title: g.title || id, count: entities.length, entities };
        } catch {
          return { id, title: id, count: 0, entities: [] };
        }
      })
    );
    res.json({ groups: groups.filter((g) => g.count > 0).sort((a, b) => b.count - a.count) });
  } catch (err) {
    res.status(err.status || 502).json({ error: err.message });
  }
});

/** GET /api/resource/:id — full document when chunks aren't enough. */
app.get('/api/resource/:id', async (req, res) => {
  try {
    const data = await jsonOf(
      `/resource/${encodeURIComponent(req.params.id)}?show=basic&show=values&show=origin&show=extra`
    );
    res.json(data);
  } catch (err) {
    res.status(err.status || 502).json({ error: err.message });
  }
});

// ── Data-augmentation agents (live, via Nuclia predict) ───────────────────────
// The enrichment side of ARAG: the same models Nuclia's Labeler / Graph /
// Generator augmentation agents run at ingest, exposed here so a demo can show
// content being enriched live. All KB-scoped, server-side token only.

// predict/chat streams plain text and appends a status byte; return clean text.
async function predictChat(question, context) {
  const res = await kbFetch('/predict/chat', {
    method: 'POST',
    body: { question, query_context: (context || []).slice(0, 8), user_id: 'augment-demo' },
  });
  const raw = await res.text();
  return raw.replace(/\s*\d\s*$/, '').trim();
}

const firstTextOf = (resource) => {
  const fields = resource?.data?.texts || {};
  let best = '';
  for (const f of Object.values(fields)) {
    const body = f?.value?.body || '';
    if (body.length > best.length) best = body;
  }
  return best || resource?.summary || '';
};

/** POST /api/augment/source {id} → the resource's extracted text (the "extract" step). */
app.post('/api/augment/source', async (req, res) => {
  try {
    const { id } = req.body || {};
    if (!id) return res.status(400).json({ error: 'id required' });
    const data = await jsonOf(`/resource/${encodeURIComponent(id)}?show=basic&show=values`);
    res.json({ title: data.title || id, text: firstTextOf(data).slice(0, 6000) });
  } catch (err) {
    res.status(err.status || 502).json({ error: err.message });
  }
});

/** POST /api/augment/label {text, candidates[]} → Labeler agent: applicable labels. */
app.post('/api/augment/label', async (req, res) => {
  try {
    const { text, candidates } = req.body || {};
    if (!text) return res.status(400).json({ error: 'text required' });
    const list = (candidates || []).map((c) => `${c.labelset}/${c.label}`);
    const q = list.length
      ? `You are a content classifier. From ONLY this candidate label list, return the labels that clearly apply to the content, one per line, exactly as written (format labelset/label). Do not invent labels.\nCandidates:\n${list.join('\n')}`
      : 'Suggest up to 6 concise topical labels for this content, one per line.';
    const out = await predictChat(q, [text]);
    const wanted = new Set(list.map((s) => s.toLowerCase()));
    const labels = out
      .split('\n').map((l) => l.replace(/^[-*\d.\s]+/, '').trim()).filter(Boolean)
      .map((l) => {
        const [ls, ...rest] = l.split('/');
        return rest.length ? { labelset: ls.trim(), label: rest.join('/').trim() } : { labelset: 'topic', label: l };
      })
      .filter((x) => !wanted.size || wanted.has(`${x.labelset}/${x.label}`.toLowerCase()))
      .slice(0, 8);
    res.json({ labels });
  } catch (err) {
    res.status(err.status || 502).json({ error: err.message });
  }
});

/** POST /api/augment/graph {text} → Graph agent: entities (NER) + relation triples. */
app.post('/api/augment/graph', async (req, res) => {
  try {
    const { text } = req.body || {};
    if (!text) return res.status(400).json({ error: 'text required' });
    const snippet = text.slice(0, 1500);
    const [tok, triples] = await Promise.all([
      jsonOf(`/predict/tokens?text=${encodeURIComponent(snippet)}`).catch(() => ({ tokens: [] })),
      predictChat(
        'Extract up to 6 factual subject | relation | object triples from the content. One per line, pipe-separated. Use only entities present in the text.',
        [snippet]
      ).catch(() => ''),
    ]);
    const seen = new Set();
    const entities = (tok.tokens || [])
      .map((t) => ({ text: t.text, type: t.ner }))
      .filter((e) => { const k = e.text.toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; })
      .slice(0, 24);
    const relations = triples
      .split('\n').map((l) => l.replace(/^[-*\d.)\s]+/, '').split('|').map((s) => s.trim()))
      .filter((p) => p.length === 3 && p[0] && p[2])
      .map(([s, r, o]) => ({ s, r, o })).slice(0, 6);
    res.json({ entities, relations });
  } catch (err) {
    res.status(err.status || 502).json({ error: err.message });
  }
});

/** POST /api/augment/generate {text} → Generator agent: synthetic Q&A pairs. */
app.post('/api/augment/generate', async (req, res) => {
  try {
    const { text } = req.body || {};
    if (!text) return res.status(400).json({ error: 'text required' });
    const out = await predictChat(
      'Generate 3 question-and-answer pairs a reader could ask about this content, answerable from it alone. Format strictly as lines "Q: …" then "A: …".',
      [text]
    );
    const qa = [];
    let cur = null;
    for (const line of out.split('\n')) {
      const q = line.match(/^\s*Q[:.)-]\s*(.+)/i);
      const a = line.match(/^\s*A[:.)-]\s*(.+)/i);
      if (q) { if (cur) qa.push(cur); cur = { q: q[1].trim(), a: '' }; }
      else if (a && cur) cur.a = a[1].trim();
      else if (cur && cur.a) cur.a += ' ' + line.trim();
    }
    if (cur) qa.push(cur);
    res.json({ qa: qa.filter((p) => p.q).slice(0, 4) });
  } catch (err) {
    res.status(err.status || 502).json({ error: err.message });
  }
});

// ── static SPA (production) ───────────────────────────────────────────────────
const DIST = join(ROOT, 'dist');
if (existsSync(DIST)) {
  app.use('/assets', express.static(join(DIST, 'assets'), { immutable: true, maxAge: '365d' }));
  app.use(express.static(DIST, { index: false, maxAge: '1h' }));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.sendFile(join(DIST, 'index.html'));
  });
}

app.listen(PORT, () => {
  const kb = KB_BASE ? 'configured' : 'NOT configured (set NUCLIA_KB_URL + NUCLIA_SERVICEACCOUNT)';
  console.log(`[arag-portal] listening on :${PORT}  ·  KB ${kb}`);
});
