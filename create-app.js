#!/usr/bin/env node
'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// ARAG Demo Factory — composer / scaffolder
//
// Composes one CATALOG BLUEPRINT × a chosen set of CAPABILITIES into a single
// demo.config.json, themes and wires the portal, enforces the factory Hard
// Rules, and (in-place) strips factory-only files so the directory becomes a
// clean, shippable demo project.
//
// Zero dependencies — Node built-ins only. The npm registry is not assumed
// reachable (see the reference package's HAR/registry story).
//
//   node create-app.js --name legal-demo --title "Meridian — Matter Intelligence" \
//        --blueprint legal-matter-intelligence --capabilities cited-ask,find,graph
//   node create-app.js --blueprint grains-research            # title/caps default from blueprint
//   node create-app.js --output ../my-demo --blueprint …      # copy instead of transform in place
//
// The orchestrator (AGENTS.md) runs this in Phase 0; end users normally never
// run it by hand.
// ─────────────────────────────────────────────────────────────────────────────

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = __dirname;
const CATALOG = path.join(ROOT, 'catalog');

// Nav order for portal surfaces, regardless of which capabilities enable them.
const SURFACE_ORDER = [
  'ask', 'search', 'graph', 'docproc', 'callqa',
  'workflows', 'personalize', 'visibility', 'remi', 'mcp',
];

// Files/dirs that are factory tooling and must NOT ship inside a generated demo.
const FACTORY_ONLY = [
  'catalog', 'create-app.js', 'DEMOS.md',
  'WORKSHOP-OVERVIEW.md', 'WORKSHOP-SETUP.md',
  'scripts/build-catalog.mjs',
];

// ── args ─────────────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const a = { banner: true, capabilities: null, interactive: true };
  for (let i = 2; i < argv.length; i++) {
    const k = argv[i];
    if (k === '--name') { a.name = argv[++i]; a.interactive = false; }
    else if (k === '--title') { a.title = argv[++i]; }
    else if (k === '--blueprint') { a.blueprint = argv[++i]; a.interactive = false; }
    else if (k === '--capabilities') { a.capabilities = argv[++i]; }
    else if (k === '--output') { a.output = argv[++i]; }
    else if (k === '--no-banner') { a.banner = false; }
    else if (k === '--help' || k === '-h') { a.help = true; }
  }
  return a;
}

function slugify(s) {
  return String(s || '')
    .toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 50);
}

function titleCase(s) {
  return String(s || '').replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

// ── catalog ──────────────────────────────────────────────────────────────────

function loadJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function loadBlueprint(id) {
  const file = path.join(CATALOG, 'blueprints', `${id}.json`);
  if (!fs.existsSync(file)) {
    const available = fs.existsSync(path.join(CATALOG, 'blueprints'))
      ? fs.readdirSync(path.join(CATALOG, 'blueprints')).filter((f) => f.endsWith('.json')).map((f) => f.replace('.json', ''))
      : [];
    fail(`Unknown blueprint "${id}".\n  Available: ${available.join(', ') || '(none)'}`);
  }
  return loadJson(file);
}

function loadCapability(id) {
  const file = path.join(CATALOG, 'capabilities', `${id}.json`);
  if (!fs.existsSync(file)) fail(`Unknown capability "${id}".`);
  return loadJson(file);
}

/**
 * Resolve a capability id list into a surfaces array (deduped by route, in nav
 * order), pulling in each capability's transitive `requires`.
 */
function resolveSurfaces(capabilityIds) {
  const wanted = new Set();
  const visit = (id) => {
    if (wanted.has(id)) return;
    wanted.add(id);
    const cap = loadCapability(id);
    for (const req of cap.requires || []) visit(req);
  };
  capabilityIds.forEach(visit);

  const byRoute = new Map();
  for (const id of wanted) {
    const cap = loadCapability(id);
    const p = cap.portal;
    if (!p || !p.route) continue;
    if (!byRoute.has(p.route)) {
      byRoute.set(p.route, {
        id: cap.surface,
        route: p.route,
        label: p.navLabel,
        component: p.component,
        icon: p.icon || null,
        capabilities: [id],
        enabled: true,
      });
    } else {
      byRoute.get(p.route).capabilities.push(id);
    }
  }

  return [...byRoute.values()].sort(
    (x, y) => SURFACE_ORDER.indexOf(x.id) - SURFACE_ORDER.indexOf(y.id)
  );
}

/** Compose blueprint × capabilities → demo.config.json (Hard Rules enforced). */
function composeConfig(blueprint, capabilityIds, title) {
  const surfaces = resolveSurfaces(capabilityIds);

  // Hard Rule 1: synthetic only. Refuse otherwise.
  const safety = blueprint.safety || {};
  if (safety.syntheticOnly === false) {
    fail('Refusing to build: blueprint.safety.syntheticOnly is false. The factory only produces synthetic demos (Hard Rule 1).');
  }
  // Hard Rule 5: a disclaimer must exist.
  if (!safety.disclaimer) {
    fail('Refusing to build: blueprint has no safety.disclaimer (Hard Rule 5).');
  }

  return {
    blueprint: blueprint.id,
    title: title || blueprint.name,
    persona: blueprint.persona || null,
    theme: {
      brandName: blueprint.theme?.brandName || blueprint.name,
      primary: blueprint.theme?.primary || '#1f6feb',
      accent: blueprint.theme?.accent || '#d9a441',
      mood: blueprint.theme?.mood || 'clean, trustworthy',
    },
    surfaces,
    // KB binding points at server-side env — the token is NEVER written here (Hard Rule 6).
    kb: { baseUrlEnv: 'NUCLIA_KB_URL', zoneEnv: 'NUCLIA_ZONE', tokenEnv: 'NUCLIA_SERVICEACCOUNT' },
    safety: {
      syntheticOnly: true,
      noRealBrands: safety.noRealBrands !== false,
      disclaimer: safety.disclaimer,
    },
    demoScript: blueprint.demoScript || [],
    provenance: { demo: blueprint.provenanceDemo || null, reference: blueprint.liveReference || null },
    generatedBy: 'arag-demo-factory',
  };
}

// ── transform ────────────────────────────────────────────────────────────────

function copyTree(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyTree(s, d);
    else fs.copyFileSync(s, d);
  }
}

function removeFactoryFiles(dir) {
  for (const rel of FACTORY_ONLY) {
    const full = path.join(dir, rel);
    if (fs.existsSync(full)) fs.rmSync(full, { recursive: true, force: true });
  }
}

function initGit(dir) {
  try {
    execFileSync('git', ['rev-parse', '--git-dir'], { cwd: dir, stdio: 'ignore' });
    return 'existing';
  } catch {
    try { execFileSync('git', ['init', '-q'], { cwd: dir, stdio: 'ignore' }); return 'initialized'; }
    catch { return 'unavailable'; }
  }
}

function fail(msg) {
  console.error(`\n  ✗ ${msg}\n`);
  process.exit(1);
}

// ── main ─────────────────────────────────────────────────────────────────────

function main() {
  const args = parseArgs(process.argv);

  if (args.help) {
    console.log(`
  ARAG Demo Factory — composer

  node create-app.js --blueprint <id> [--name <slug>] [--title "<Title>"]
                     [--capabilities a,b,c] [--output <dir>] [--no-banner]

  --blueprint <id>       catalog blueprint id (see catalog/blueprints/)
  --capabilities <csv>   override the blueprint's default capabilities
  --name <slug>          project slug (default: derived from blueprint)
  --title "<Title>"      portal wordmark (default: blueprint name)
  --output <dir>         copy to <dir> instead of transforming in place
  --no-banner            suppress the intro banner
`);
    process.exit(0);
  }

  if (args.banner) console.log('\n  ARAG Demo Factory — composing your Progress Agentic RAG demo\n');

  if (!args.blueprint) {
    fail('A --blueprint is required. The orchestrator (AGENTS.md) selects one from the catalog by matching the user prompt. Run with --help for usage.');
  }

  const blueprint = loadBlueprint(args.blueprint);
  const capabilityIds = args.capabilities
    ? args.capabilities.split(',').map((s) => s.trim()).filter(Boolean)
    : (blueprint.capabilities || []);
  if (!capabilityIds.length) fail(`Blueprint "${blueprint.id}" declares no capabilities and none were passed with --capabilities.`);

  const name = slugify(args.name || blueprint.id);
  const title = args.title || blueprint.name;
  const config = composeConfig(blueprint, capabilityIds, title);

  // Determine target directory.
  let targetDir = ROOT;
  if (args.output) {
    targetDir = path.resolve(process.cwd(), args.output);
    if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length) fail(`${targetDir} exists and is not empty.`);
    copyTree(ROOT, targetDir);
    console.log(`  Copied factory to ${targetDir}`);
  }

  // Write demo.config.json into the portal (its runtime source of truth) and the root.
  const configJson = JSON.stringify(config, null, 2) + '\n';
  fs.mkdirSync(path.join(targetDir, 'portal'), { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'portal', 'demo.config.json'), configJson);
  fs.writeFileSync(path.join(targetDir, 'demo.config.json'), configJson);

  // Strip factory-only files when transforming in place (keep them in --output copies? No —
  // a generated demo should never carry the catalog either way).
  removeFactoryFiles(targetDir);

  const gitState = args.output ? initGit(targetDir) : 'kept';

  // Report.
  const surfaceList = config.surfaces.map((s) => s.label).join(', ');
  console.log(`  Blueprint:    ${blueprint.name}  (from ${blueprint.provenanceDemo || 'catalog'})`);
  console.log(`  Project:      ${name}`);
  console.log(`  Title:        ${title}`);
  console.log(`  Surfaces:     ${surfaceList}`);
  console.log(`  Theme:        ${config.theme.brandName}  ${config.theme.primary}/${config.theme.accent}`);
  console.log(`  Location:     ${targetDir}`);
  console.log(`  Safety:       synthetic-only ✓  disclaimer ✓`);
  console.log(`  Config:       portal/demo.config.json written`);
  console.log(`  Catalog:      removed (factory-only)`);
  console.log(`  git:          ${gitState}`);

  console.log(`
  Next (the orchestrator does these automatically — Phases 1-6):
    1. Bind/seed the Knowledge Box (set NUCLIA_* in .env)
    2. Ingest the corpus (or bind the blueprint's live reference KB)
    3. Configure retrieval (grounding + citations on)
    4. cd portal && npm install && npm run dev      # theme + surfaces render from demo.config.json
    5. Verify grounded + cited answers
`);
}

if (require.main === module) main();

module.exports = { composeConfig, resolveSurfaces, slugify };
