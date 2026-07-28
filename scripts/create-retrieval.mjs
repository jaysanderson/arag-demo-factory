#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// create-retrieval.mjs — provision saved SEARCH CONFIGURATIONS on the KB.
//
// Every demo should ship with one or more named retrieval configurations (the
// "Saved configuration" objects in the dashboard's Search page, and the
// `search_configuration` a /find or /ask call can name). Without them a demo has
// only the account default; with them the RAG Lab / search UI can compare
// strategies, and the portal can default to a tuned one.
//
// API (verified against the shipped research portal): a config is created with
//   POST {KB}/search_configurations/{name}   body { kind, config }
// authenticated with the KB service-account token (X-NUCLIA-SERVICEACCOUNT).
//
// Reads from .env: NUCLIA_KB_URL, NUCLIA_SERVICEACCOUNT (SCONTRIBUTOR/SOWNER).
// Zero dependencies — Node 20+.
//
//   node scripts/create-retrieval.mjs
//   node scripts/create-retrieval.mjs --primary grounded-hybrid
// ─────────────────────────────────────────────────────────────────────────────
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ENV_PATH = join(ROOT, '.env');

function readEnv() {
  const env = { ...process.env };
  if (existsSync(ENV_PATH)) {
    for (const line of readFileSync(ENV_PATH, 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && env[m[1]] === undefined) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
  return env;
}
function writeEnvVars(vars) {
  let text = existsSync(ENV_PATH) ? readFileSync(ENV_PATH, 'utf8') : '';
  for (const [k, v] of Object.entries(vars)) {
    if (v == null || v === '') continue;
    const re = new RegExp(`^${k}=.*$`, 'm');
    text = re.test(text) ? text.replace(re, `${k}=${v}`) : text.replace(/\n?$/, '\n') + `${k}=${v}\n`;
  }
  writeFileSync(ENV_PATH, text);
}
const arg = (name, def) => { const i = process.argv.indexOf(name); return i > -1 ? process.argv[i + 1] : def; };
const clean = (k) => String(k || '').trim().replace(/^["']+|["']+$/g, '').replace(/^Bearer\s+/i, '').trim();

// The retrieval strategies every demo ships with. `kind: 'find'` configs tune the
// ranked search; the portal + RAG Lab can name any of them. Keep them grounded:
// hybrid + predict reranker is the default the answer path should lean on.
const CONFIGS = [
  { name: 'grounded-hybrid', kind: 'find', config: { features: ['keyword', 'semantic'], reranker: 'predict' } },
  { name: 'semantic-broad', kind: 'find', config: { features: ['semantic'], reranker: 'predict' } },
  { name: 'keyword-precise', kind: 'find', config: { features: ['keyword'] } },
];

async function main() {
  const env = readEnv();
  const KB = (env.NUCLIA_KB_URL || '').replace(/\/+$/, '');
  const TOKEN = clean(env.NUCLIA_SERVICEACCOUNT);
  if (!KB || !TOKEN) {
    console.error('\n  ✗ Set NUCLIA_KB_URL and NUCLIA_SERVICEACCOUNT in .env first (run create-kb.mjs).\n');
    process.exit(1);
  }
  // search_configurations live on the doc-processing host (dp), and creation is an
  // OWNER-role operation — see docs/ARAG-REFERENCE.md. If the provisioned token is
  // SCONTRIBUTOR this returns 403; mint an SOWNER token (or run it as the account owner).
  const DP = KB.replace('.rag.progress.cloud', '.dp.progress.cloud');
  const headers = { 'X-NUCLIA-SERVICEACCOUNT': `Bearer ${TOKEN}`, 'Content-Type': 'application/json' };
  const primary = arg('--primary', 'grounded-hybrid');

  console.log(`\n  Creating ${CONFIGS.length} search configuration(s) on the Knowledge Box…`);
  let ok = 0;
  for (const c of CONFIGS) {
    const res = await fetch(`${DP}/search_configurations/${encodeURIComponent(c.name)}`, {
      method: 'POST', headers, body: JSON.stringify({ kind: c.kind, config: c.config }),
    });
    if (res.ok) { console.log(`  ✓ ${c.name} (${c.kind})`); ok++; }
    else console.log(`  ✗ ${c.name} — HTTP ${res.status} ${(await res.text()).slice(0, 160)}`);
  }
  if (ok) writeEnvVars({ NUCLIA_SEARCH_CONFIG: primary });
  console.log(ok
    ? `\n  ${ok}/${CONFIGS.length} created. Default written to .env as NUCLIA_SEARCH_CONFIG=${primary}.\n`
    : `\n  No configurations created — check the token role / KB URL.\n`);
  process.exit(ok ? 0 : 2);
}
main().catch((e) => { console.error(`\n  ✗ ${e.message}\n`); process.exit(1); });
