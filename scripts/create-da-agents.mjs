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
// Reads .env: NUCLIA_KB_URL, NUCLIA_SERVICEACCOUNT, NUCLIA_ZONE. Zero deps, Node 20+.
//   node scripts/create-da-agents.mjs
//   node scripts/create-da-agents.mjs --apply ALL --labels '[{"label":"Policy","description":"Policy docs"}]'
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

  console.log(`\n  Starting Data-Augmentation agents on the Knowledge Box (apply: ${apply})…`);
  let ok = 0;
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
