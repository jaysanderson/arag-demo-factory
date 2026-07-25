#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────
// build-catalog.mjs — (re)build catalog/catalog.json
// ─────────────────────────────────────────────────────────────
// Zero-dependency. Scans catalog/blueprints/*.json and
// catalog/capabilities/*.json and writes catalog/catalog.json — the
// index the one-shot orchestrator scores prompts against.
//
// Blueprint index entry:  { id, name, vertical, provenanceDemo, matchTags, capabilities, tagline }
// Capability index entry:  { id, name, surface, tagline }
//
// Usage:  node scripts/build-catalog.mjs
// ─────────────────────────────────────────────────────────────

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CATALOG_DIR = join(__dirname, '..', 'catalog');
const BLUEPRINTS_DIR = join(CATALOG_DIR, 'blueprints');
const CAPABILITIES_DIR = join(CATALOG_DIR, 'capabilities');
const OUT = join(CATALOG_DIR, 'catalog.json');

function readJsonDir(dir) {
  if (!existsSync(dir)) {
    console.error(`[build-catalog] missing directory: ${dir}`);
    return [];
  }
  const out = [];
  for (const file of readdirSync(dir).sort()) {
    if (!file.endsWith('.json')) continue;
    const path = join(dir, file);
    try {
      out.push({ __file: file, ...JSON.parse(readFileSync(path, 'utf8')) });
    } catch (err) {
      console.error(`[build-catalog] SKIPPED ${basename(dir)}/${file}: ${err.message}`);
    }
  }
  return out;
}

function pick(obj, keys) {
  const out = {};
  for (const k of keys) if (obj[k] !== undefined) out[k] = obj[k];
  return out;
}

const blueprintFiles = readJsonDir(BLUEPRINTS_DIR);
const capabilityFiles = readJsonDir(CAPABILITIES_DIR);

const capabilities = capabilityFiles
  .map((c) => pick(c, ['id', 'name', 'surface', 'tagline']))
  .filter((c) => c.id)
  .sort((a, b) => a.id.localeCompare(b.id));

const blueprints = blueprintFiles
  .map((b) =>
    pick(b, [
      'id',
      'name',
      'vertical',
      'provenanceDemo',
      'matchTags',
      'capabilities',
      'tagline',
    ]),
  )
  .filter((b) => b.id)
  .sort((a, b) => a.id.localeCompare(b.id));

// Warn (do not fail) on any blueprint referencing an unknown capability id.
const capIds = new Set(capabilities.map((c) => c.id));
for (const b of blueprints) {
  for (const cap of b.capabilities || []) {
    if (!capIds.has(cap)) {
      console.warn(
        `[build-catalog] WARNING: blueprint "${b.id}" references unknown capability "${cap}"`,
      );
    }
  }
}

const catalog = {
  generatedAt: new Date().toISOString(),
  counts: { blueprints: blueprints.length, capabilities: capabilities.length },
  blueprints,
  capabilities,
};

writeFileSync(OUT, JSON.stringify(catalog, null, 2) + '\n');
console.log(
  `[build-catalog] wrote ${OUT} — ${blueprints.length} blueprints, ${capabilities.length} capabilities`,
);
