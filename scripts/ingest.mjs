// ingest.mjs — Phase 2 corpus loader for the ARAG Demo Factory.
//
// Reads a corpus directory of Markdown files with YAML front matter and pushes
// each as a resource into the Knowledge Box (Writer API), deriving labelsets
// from the front matter so the portal's facets work. Nuclia does the chunking,
// embedding, entity extraction and graph construction from there — nothing about
// the corpus is stored locally.
//
//   NUCLIA_KB_URL=… NUCLIA_SERVICEACCOUNT=… node scripts/ingest.mjs --corpus data/helios-corpus
//   … --labelsets doc_type,subsystem,mission_phase,classification,media_type
//   … --force        # replace resources whose slug already exists
//
// Zero dependencies. Auth: X-NUCLIA-SERVICEACCOUNT: Bearer <kb token>.

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

// ── args + env ───────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const opt = (name, def) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : def; };
const has = (name) => args.includes(name);

const CORPUS = resolve(opt('--corpus', 'data/corpus'));
const FORCE = has('--force');
const LIMIT = parseInt(opt('--limit', '0'), 10) || Infinity;
// Which front-matter fields become labelsets (facets). Array fields fan out.
const LABELSETS = opt('--labelsets', 'doc_type,subsystem,mission_phase,classification,media_type,crew')
  .split(',').map((s) => s.trim()).filter(Boolean);

const KB = (process.env.NUCLIA_KB_URL || '').replace(/\/+$/, '');
const TOKEN = process.env.NUCLIA_SERVICEACCOUNT || process.env.NUCLIA_API_KEY || '';
if (!KB || !TOKEN) { console.error('  Set NUCLIA_KB_URL and NUCLIA_SERVICEACCOUNT.'); process.exit(1); }
const H = { 'X-NUCLIA-SERVICEACCOUNT': `Bearer ${TOKEN}`, 'Content-Type': 'application/json' };

// ── minimal front-matter parser (no js-yaml) ──────────────────────────────────
function parseFrontmatter(src) {
  const m = src.replace(/^﻿/, '').match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: src };
  const data = {};
  let key = null;
  for (const raw of m[1].split(/\r?\n/)) {
    if (!raw.trim() || raw.trim().startsWith('#')) continue;
    const item = raw.match(/^\s*-\s+(.*)$/);
    if (item && key) { (data[key] ||= []).push(coerce(item[1])); continue; }
    const kv = raw.match(/^([A-Za-z0-9_]+)\s*:\s*(.*)$/);
    if (!kv) continue;
    key = kv[1];
    const v = kv[2].trim();
    if (v === '') { data[key] = []; }
    else if (v.startsWith('[') && v.endsWith(']')) {
      data[key] = v.slice(1, -1).split(',').map((x) => coerce(x)).filter((x) => x !== '');
      key = null;
    } else { data[key] = coerce(v); key = null; }
  }
  return { data, body: m[2].trim() };
}
function coerce(raw) {
  let v = String(raw).trim().replace(/^["']|["']$/g, '');
  if (v === 'null' || v === '~') return null;
  if (v === 'true') return true;
  if (v === 'false') return false;
  if (/^-?\d+(\.\d+)?$/.test(v)) return Number(v);
  return v;
}

function safeSlug(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 200);
}

// ── build resource + classifications ──────────────────────────────────────────
function classificationsFor(meta) {
  const out = []; const seen = new Set();
  for (const field of LABELSETS) {
    const raw = meta[field];
    if (raw == null || raw === '') continue;
    for (const val of Array.isArray(raw) ? raw : [raw]) {
      const label = String(val).trim(); if (!label) continue;
      const k = `${field}::${label}`; if (seen.has(k)) continue;
      seen.add(k); out.push({ labelset: field, label });
    }
  }
  return out;
}
function toResource(meta, body) {
  return {
    title: meta.title, slug: safeSlug(meta.slug || meta.title), icon: 'text/markdown',
    summary: meta.summary || '',
    origin: {
      url: meta.source_url || undefined,
      created: meta.published ? `${meta.published}T00:00:00Z` : undefined,
      metadata: { doc_type: String(meta.doc_type || ''), media_type: String(meta.media_type || 'text') },
    },
    usermetadata: { classifications: classificationsFor(meta) },
    texts: { body: { body, format: 'MARKDOWN' } },
    extra: { metadata: { ...meta } },
  };
}

// ── labelset sync + ingest ────────────────────────────────────────────────────
async function syncLabelsets(docs) {
  const by = new Map();
  for (const d of docs) for (const { labelset, label } of classificationsFor(d.meta)) {
    (by.get(labelset) || by.set(labelset, new Set()).get(labelset)).add(label);
  }
  for (const [id, labels] of by) {
    const payload = { title: id.replace(/_/g, ' '), color: '#22d3ee', multiple: true, kind: ['RESOURCES'],
      labels: [...labels].sort().map((title) => ({ title })) };
    const r = await fetch(`${KB}/labelset/${encodeURIComponent(id)}`, { method: 'POST', headers: H, body: JSON.stringify(payload) });
    console.log(`  labelset ${id.padEnd(14)} ${String(labels.size).padStart(3)} labels  [${r.status}]`);
  }
}
async function existingSlugs() {
  const slugs = new Map();
  for (let page = 0; page < 20; page++) {
    const r = await fetch(`${KB}/resources?size=100&page=${page}`, { headers: H });
    if (!r.ok) break;
    const res = (await r.json()).resources || [];
    for (const x of res) if (x.slug) slugs.set(x.slug, x.id);
    if (res.length < 100) break;
  }
  return slugs;
}

async function main() {
  if (!existsSync(CORPUS)) { console.error(`  Corpus not found: ${CORPUS}`); process.exit(1); }
  const files = readdirSync(CORPUS).filter((f) => f.endsWith('.md')).sort();
  const docs = [];
  for (const f of files) {
    const { data, body } = parseFrontmatter(readFileSync(join(CORPUS, f), 'utf8'));
    if (data.title && body.trim()) docs.push({ file: f, meta: data, body });
  }
  console.log(`\n  Corpus:  ${docs.length} documents in ${CORPUS}`);
  console.log(`  Target:  ${KB}\n`);
  console.log('  Labelsets:'); await syncLabelsets(docs);
  const existing = FORCE ? new Map() : await existingSlugs();
  console.log('');
  let ok = 0, skip = 0; const fail = [];
  for (const [i, doc] of docs.slice(0, LIMIT).entries()) {
    const r = toResource(doc.meta, doc.body);
    const pos = `${String(i + 1).padStart(3)}/${Math.min(docs.length, LIMIT)}`;
    if (!FORCE && existing.has(r.slug)) { skip++; console.log(`  ${pos}  skip  ${r.slug}`); continue; }
    try {
      if (FORCE && existing.has(r.slug)) await fetch(`${KB}/resource/${existing.get(r.slug)}`, { method: 'DELETE', headers: H });
      const res = await fetch(`${KB}/resources`, { method: 'POST', headers: H, body: JSON.stringify(r) });
      if (!res.ok) throw new Error(`${res.status} ${(await res.text()).slice(0, 200)}`);
      ok++; console.log(`  ${pos}  ok    ${r.slug}`);
    } catch (e) { fail.push({ slug: r.slug, e: e.message }); console.log(`  ${pos}  FAIL  ${r.slug} — ${e.message.slice(0, 120)}`); }
  }
  console.log(`\n  Created ${ok}, skipped ${skip}, failed ${fail.length}`);
  console.log('  Nuclia processes asynchronously — chunks, entities and the graph appear within a minute or two.\n');
  if (fail.length) process.exitCode = 1;
}
main().catch((e) => { console.error(e); process.exit(1); });
