#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// lint-groundedness.mjs — the mechanical guard behind the palette's promise:
// a composed demo may never present invented data as fact.
//
// It statically scans the portal's pages/compositions for the two ways
// fabrication sneaks in, and FAILS the build if it finds them:
//
//   1. Hardcoded metric literals — a `value="63%"` / `value={"1,729,000"}` prop
//      is a number typed by the author, not computed from the Knowledge Box.
//      Derive it from a KB response, or render it through <CitedMetric source=…>.
//   2. External data fetches — any fetch to an http(s):// or // host pulls data
//      from outside the KB + the portal's own /api proxy.
//
// Plus a soft WARNING: a page that runs `ask`/`useAsk` but never uses
// <GroundedAnswer> may be printing an answer without enforcing citations.
//
// Zero dependencies. Run:  node scripts/lint-groundedness.mjs
// ─────────────────────────────────────────────────────────────────────────────
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
// Where composed UI lives. pages/ today; add demo-authored composition dirs here.
const SCAN_DIRS = ['portal/src/pages', 'portal/src/demo'].map((d) => join(ROOT, d));
// Pigments are allowed to contain the primitives the lint polices.
const ALLOW = new Set(['CitedMetric.tsx', 'GroundedAnswer.tsx']);

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : /\.(tsx?|jsx?)$/.test(p) ? [p] : [];
  });
}

const fails = [];
const warns = [];

for (const file of SCAN_DIRS.flatMap(walk)) {
  if (ALLOW.has(file.split('/').pop())) continue;
  const rel = relative(ROOT, file);
  const src = readFileSync(file, 'utf8');
  const lines = src.split('\n');

  lines.forEach((line, i) => {
    const at = `${rel}:${i + 1}`;
    // 1) literal metric value with a digit or % (expressions value={x} are fine)
    const m = line.match(/\bvalue=\{?\s*["'`]([^"'`]*[\d%][^"'`]*)["'`]\s*\}?/);
    if (m) fails.push(`${at}  hardcoded metric literal  value="${m[1]}"  → derive from the KB or use <CitedMetric source=…>`);
    // 2) fetch to an external host
    const f = line.match(/fetch\(\s*["'`]((https?:)?\/\/[^"'`]+)["'`]/);
    if (f) fails.push(`${at}  external data fetch  fetch("${f[1]}")  → all data must come through the KB / the portal's /api proxy`);
  });

  // soft: runs ask but never renders through GroundedAnswer
  const usesAsk = /\b(useAsk|[^.\w]ask)\s*\(/.test(src) || /\bfrom '\.\.\/lib\/arag'/.test(src) && /\bask\b/.test(src);
  if (usesAsk && /dangerouslySetInnerHTML/.test(src) && !/GroundedAnswer/.test(src) && !/renderMarkdown\(relText/.test(src)) {
    warns.push(`${rel}  renders answer HTML without <GroundedAnswer> — confirm uncited answers are surfaced, not shown as fact`);
  }
}

const G = '\x1b[32m', R = '\x1b[31m', Y = '\x1b[33m', X = '\x1b[0m';
if (warns.length) { console.log(`${Y}⚠ groundedness warnings${X}`); warns.forEach((w) => console.log('  ' + w)); }
if (fails.length) {
  console.log(`\n${R}✗ groundedness lint FAILED — ${fails.length} issue(s):${X}`);
  fails.forEach((f) => console.log('  ' + f));
  console.log('\nThe guarantees live in the materials: numbers come from the KB, data comes from the KB.\n');
  process.exit(1);
}
console.log(`${G}✓ groundedness lint passed${X} — no hardcoded metrics, no external data fetches in composed UI.`);
