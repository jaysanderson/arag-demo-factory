#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// verify.mjs — Phase 5 answer-quality gate for a running portal.
//
// Two properties matter, and they pull against each other (see docs/RETRIEVAL.md):
//   1. Answerable questions (cornerstoneQueries) must be ANSWERED, with citations.
//   2. Questions the corpus cannot support (refusalProbes) must be REFUSED, not
//      confabulated. A build that answers everything confidently is worse than
//      one that declines.
//
// It drives the portal's own /api/ask (the same grounded path the UI uses), so it
// verifies the real proxy + retrieval policy end-to-end, not Nuclia in isolation.
// Modelled on rp-grdc/server/scripts/verify-answers.js.
//
// Zero dependencies — Node built-ins only (global fetch, Node 18+).
//
//   node scripts/verify.mjs --blueprint grains-research
//   node scripts/verify.mjs --blueprint grains-research --base http://localhost:4000 --quick
//   node scripts/verify.mjs --base https://my-demo.fly.dev   # queries from data/corpus manifest
// ─────────────────────────────────────────────────────────────────────────────

import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const REFUSAL_MARKERS = [
  'not enough data', 'does not contain', 'no information', 'not provided',
  'cannot answer', "don't have", 'does not provide', 'not covered',
  'no supporting', 'unable to', 'no relevant', 'not available', 'no data',
];

function parseArgs(argv) {
  const a = { base: process.env.PORTAL_BASE || 'http://localhost:4000' };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--blueprint') a.blueprint = argv[++i];
    else if (argv[i] === '--base') a.base = argv[++i];
    else if (argv[i] === '--quick') a.quick = true;
    else if (argv[i] === '--help' || argv[i] === '-h') a.help = true;
  }
  a.base = a.base.replace(/\/+$/, '');
  return a;
}

/** Load { cornerstoneQueries, refusalProbes } from a blueprint or corpus manifest. */
function loadQueries(blueprint) {
  if (blueprint) {
    const bpFile = join(ROOT, 'catalog', 'blueprints', `${blueprint}.json`);
    if (existsSync(bpFile)) {
      const c = JSON.parse(readFileSync(bpFile, 'utf8')).corpus || {};
      return { cornerstone: c.cornerstoneQueries || [], refusals: c.refusalProbes || [] };
    }
    const manifest = join(ROOT, 'data', 'corpus', blueprint, 'manifest.json');
    if (existsSync(manifest)) {
      const v = JSON.parse(readFileSync(manifest, 'utf8')).verification || {};
      return { cornerstone: v.cornerstoneQueries || [], refusals: v.refusalProbes || [] };
    }
  }
  // Fall back to the local portal's own config (bundled demo).
  const cfg = join(ROOT, 'portal', 'demo.config.json');
  if (existsSync(cfg)) {
    const bp = JSON.parse(readFileSync(cfg, 'utf8')).blueprint;
    if (bp && bp !== blueprint) return loadQueries(bp);
  }
  return { cornerstone: [], refusals: [] };
}

/** POST /api/ask and collect the full streamed answer + its citations. */
async function askOnce(base, query) {
  const res = await fetch(`${base}/api/ask`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  if (!res.ok || !res.body) {
    const detail = await res.json().catch(() => ({}));
    throw new Error(detail.error || `${res.status} ${res.statusText}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let answer = '';
  let citations = null;

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';
    for (const line of lines) {
      const t = line.trim();
      if (!t) continue;
      let ev;
      try { ev = JSON.parse(t.startsWith('data:') ? t.slice(5) : t); } catch { continue; }
      if (ev.item?.type === 'answer') answer += ev.item.text || '';
      else if (typeof ev.answer === 'string') answer += ev.answer;
      const c = ev.citations || ev.item?.citations;
      if (c) citations = c;
    }
  }

  const count = citations ? (Array.isArray(citations) ? citations.length : Object.keys(citations).length) : 0;
  return { answer: answer.trim(), citationCount: count };
}

const isRefusal = (answer) => {
  const lower = answer.toLowerCase();
  return REFUSAL_MARKERS.some((m) => lower.includes(m));
};

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    console.log(`
  verify.mjs — grounded + cited answer gate

  node scripts/verify.mjs --blueprint <id> [--base <portal-url>] [--quick]

  --blueprint <id>   load cornerstone/refusal queries from the blueprint or manifest
  --base <url>       running portal base (default http://localhost:4000)
  --quick            first 4 cornerstone queries only
`);
    process.exit(0);
  }

  // Reachability first — a clear message beats a wall of fetch errors.
  try {
    const h = await fetch(`${args.base}/api/health`).then((r) => r.json());
    if (!h.ok) console.log(`  ! Portal reachable but KB not connected (${h.kb}). Answers will fail.`);
  } catch {
    console.error(`\n  ✗ Cannot reach the portal at ${args.base}. Start it (npm start) or pass --base.\n`);
    process.exit(1);
  }

  const { cornerstone, refusals } = loadQueries(args.blueprint);
  if (!cornerstone.length && !refusals.length) {
    console.error('\n  ✗ No queries found. Pass --blueprint <id> with cornerstoneQueries/refusalProbes.\n');
    process.exit(1);
  }

  const set = [
    ...(args.quick ? cornerstone.slice(0, 4) : cornerstone).map((q) => ({ q, expect: 'ANSWER' })),
    ...refusals.map((q) => ({ q, expect: 'REFUSAL' })),
  ];

  console.log(`\n  Verifying ${set.length} question(s) against ${args.base}\n`);

  let passed = 0;
  const failures = [];

  for (const [i, item] of set.entries()) {
    const started = Date.now();
    let result;
    try {
      result = await askOnce(args.base, item.q);
    } catch (err) {
      failures.push({ q: item.q, why: `request failed: ${err.message}` });
      console.log(`  ${String(i + 1).padStart(2)}. FAIL  ${item.q}`);
      console.log(`         ${err.message.slice(0, 160)}\n`);
      continue;
    }

    const { answer, citationCount } = result;
    const refused = isRefusal(answer) || (citationCount === 0 && answer.length < 400);
    const seconds = ((Date.now() - started) / 1000).toFixed(1);
    const reasons = [];

    if (item.expect === 'REFUSAL') {
      if (!refused) reasons.push('answered a question the corpus cannot support');
    } else {
      if (isRefusal(answer)) reasons.push('refused an answerable question');
      if (citationCount === 0) reasons.push('no citations — ungrounded');
    }

    const ok = reasons.length === 0;
    if (ok) passed++;
    else failures.push({ q: item.q, why: reasons.join('; '), answer });

    const kind = item.expect === 'REFUSAL' ? 'refusal expected' : `${citationCount} citations`;
    console.log(`  ${String(i + 1).padStart(2)}. ${ok ? 'pass' : 'FAIL'}  [${kind}, ${seconds}s]  ${item.q}`);
    if (!ok) console.log(`         → ${reasons.join('; ')}`);
    console.log(`         ${answer.replace(/\s+/g, ' ').slice(0, 180)}…\n`);
  }

  console.log(`  ${passed}/${set.length} passed\n`);
  if (failures.length) {
    console.log('  Failures:');
    for (const f of failures) console.log(`    - ${f.q}\n      ${f.why}`);
    console.log('');
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(`\n  Verification failed: ${err.message}\n`);
  process.exit(1);
});
