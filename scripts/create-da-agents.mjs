#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// create-da-agents.mjs — start the core Data-Augmentation (ingestion) agents.
//
// VERIFIED live against Progress ARAG. The important, non-obvious facts (they
// contradict a naive reading of the guide, and are why this is a script):
//   • The tasks API is authenticated with the KB SERVICE-ACCOUNT token
//     (X-NUCLIA-SERVICEACCOUNT: Bearer) — NOT the NUA key, which returns 403
//     ("NuaKeyUser cannot access KnowledgeboxWorkerTask"). Needs SOWNER.
//   • Host: {zone}.dp.progress.cloud.
//   • Agents run on fields: parameters.on = 1 (0 = paragraphs is rejected for these).
//   • operations is a KEYED container: {graph|label|qa|ask|…}, one per operation.
//   • GraphOperation/LabelOperation require `ident`; labeler also needs `labels`.
//   • Start body: { name:<task>, parameters:<DataAugmentation-Input>, apply, enabled }.
//
// Starts llm-graph (→ knowledge graph + related) and synthetic-questions (→ richer
// retrieval) — neither needs a demo-specific taxonomy. The LABELER (→ facets) needs
// the demo's labelsets, so pass them with --labels '<json>' (an array of
// {label,description}); it's skipped when none are given.
//
// THE GENERATOR (--generate) is the big one: it turns unstructured resources into
// TYPED, STRUCTURED, QUERYABLE data — the raw material for real charts, dashboards,
// data grids, facets and rich result cards, all grounded. It (1) registers a KV
// schema on the KB (POST /kb/{kb}/kv-schemas) and (2) starts the `ask` task with
// json+store_as_key_value+kv_schema_id so every resource gains a native key_value
// field conforming to that schema. Field types: text|integer|float|boolean|date.
// See docs/DATA-AUGMENTATION.md. Schema shapes are from the guide (Appendix A/F);
// confirm against the live catalog with GET /kb/{kb}/tasks if a call 422s.
//
// Reads .env: NUCLIA_KB_URL, NUCLIA_SERVICEACCOUNT, NUCLIA_ZONE. Zero deps, Node 20+.
//   node scripts/create-da-agents.mjs
//   node scripts/create-da-agents.mjs --apply ALL --labels '[{"label":"Policy","description":"Policy docs"}]'
//   node scripts/create-da-agents.mjs --generate '{"id":"vehicle_facts",
//     "question":"Extract make, model, year, price, body type, stock status, listing date.",
//     "fields":[{"key":"make","type":"text","required":true},{"key":"year","type":"integer"},
//               {"key":"price","type":"float"},{"key":"in_stock","type":"boolean"},
//               {"key":"listed_date","type":"date"}]}'
// ─────────────────────────────────────────────────────────────────────────────
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ENV_PATH = join(ROOT, '.env');
function readEnv() {
  const env = { ...process.env };
  if (existsSync(ENV_PATH)) for (const line of readFileSync(ENV_PATH, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && env[m[1]] === undefined) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  return env;
}
const arg = (n, d) => { const i = process.argv.indexOf(n); return i > -1 ? process.argv[i + 1] : d; };
const clean = (k) => String(k || '').trim().replace(/^["']+|["']+$/g, '').replace(/^Bearer\s+/i, '').trim();

async function main() {
  const env = readEnv();
  const KB = (env.NUCLIA_KB_URL || '').replace(/\/+$/, '');
  const SA = clean(env.NUCLIA_SERVICEACCOUNT);
  if (!KB || !SA) { console.error('\n  ✗ Set NUCLIA_KB_URL and NUCLIA_SERVICEACCOUNT (SOWNER) in .env (run create-kb.mjs).\n'); process.exit(1); }
  const DP = KB.replace('.rag.progress.cloud', '.dp.progress.cloud');
  const headers = { 'X-NUCLIA-SERVICEACCOUNT': `Bearer ${SA}`, 'Content-Type': 'application/json' };
  const apply = arg('--apply', 'ALL'); // EXISTING | NEW | ALL

  const start = async (name, operations) => {
    const body = { name, parameters: { name: `factory-${name}`, on: 1, operations }, apply, enabled: true };
    const res = await fetch(`${DP}/task/start`, { method: 'POST', headers, body: JSON.stringify(body) });
    const j = await res.json().catch(() => ({}));
    if (res.ok) console.log(`  ✓ ${name} — ${j.status || 'started'}`);
    else console.log(`  ✗ ${name} — HTTP ${res.status} ${JSON.stringify(j).slice(0, 200)}`);
    return res.ok;
  };

  // Register a KV schema on the KB so the Generator's JSON conforms to it and is
  // stored as a native key_value field. POST /kb/{kb}/kv-schemas (WRITER).
  const registerKvSchema = async (id, description, fields) => {
    const res = await fetch(`${DP}/kv-schemas`, {
      method: 'POST', headers,
      body: JSON.stringify({ id, description: description || '', fields }),
    });
    if (res.ok) { console.log(`  ✓ kv-schema '${id}' registered (${fields.length} fields)`); return true; }
    if (res.status === 409) { console.log(`  · kv-schema '${id}' already exists — reusing`); return true; }
    const j = await res.json().catch(() => ({}));
    console.log(`  ✗ kv-schema '${id}' — HTTP ${res.status} ${JSON.stringify(j).slice(0, 200)}`);
    return false;
  };

  console.log(`\n  Starting Data-Augmentation agents on the Knowledge Box (apply: ${apply})…`);
  let ok = 0;

  // Generator (ask) — the structured-extraction superpower. Registers a KV schema,
  // then runs `ask` with json + store_as_key_value so every resource gains a typed
  // key_value field to chart/grid/facet/aggregate. See docs/DATA-AUGMENTATION.md.
  let gen = null;
  try { const g = arg('--generate', ''); if (g) gen = JSON.parse(g); } catch (e) { console.log(`  ✗ --generate JSON parse error: ${e.message}`); }
  if (gen && gen.id && Array.isArray(gen.fields) && gen.fields.length) {
    const schemaOk = await registerKvSchema(gen.id, gen.description, gen.fields);
    if (schemaOk) {
      ok += await start('ask', [{ ask: {
        question: gen.question || `Extract the following fields for this resource: ${gen.fields.map((f) => f.key).join(', ')}.`,
        destination: gen.destination || gen.id,
        json: true,
        store_as_key_value: true,
        kv_schema_id: gen.id,
        ...(gen.user_prompt ? { user_prompt: gen.user_prompt } : {}),
      } }]);
    }
  }
  // Knowledge graph — generic entity types; the LLM extracts what fits the corpus.
  ok += await start('llm-graph', [{ graph: { ident: 'g1', entity_defs: [
    { label: 'Organization', description: 'Companies, teams, departments, and agencies' },
    { label: 'Person', description: 'People and their roles' },
    { label: 'Location', description: 'Places and regions' },
    { label: 'Product', description: 'Products, services, and offerings' },
    { label: 'Concept', description: 'Key domain concepts, policies, and procedures' },
  ] } }]);
  // Synthetic Q&A — pre-computed questions/answers to retrieve against.
  ok += await start('synthetic-questions', [{ qa: { max_questions: 3 } }]);
  // Labeler — only when the demo supplied a taxonomy.
  let labels = [];
  try { labels = JSON.parse(arg('--labels', '[]')); } catch { /* ignore */ }
  if (Array.isArray(labels) && labels.length) {
    ok += await start('labeler', [{ label: { ident: 'l1', labels } }]);
  } else {
    console.log('  · labeler skipped (no --labels; pass the demo\'s labelsets to enable facets)');
  }

  console.log(ok ? `\n  ${ok} agent(s) started — they enrich resources as they ingest.\n`
                 : `\n  No agents started — check the SOWNER token / KB URL.\n`);
  process.exit(ok ? 0 : 2);
}
main().catch((e) => { console.error(`\n  ✗ ${e.message}\n`); process.exit(1); });
