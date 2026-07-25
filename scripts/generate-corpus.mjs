#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// generate-corpus.mjs — scaffold a synthetic-corpus PLAN from a blueprint brief.
//
// Reads a blueprint's `corpus` brief (catalog/blueprints/<id>.json) and emits a
// build plan + manifest schema to data/corpus/<id>/. It does NOT write full
// document bodies — the @knowledge-engineer agent does that at build time, MCP
// in the orchestrator's loop. What this produces is the SKELETON that makes the
// corpus coherent: a shared entity pool, a per-document plan that reuses those
// entities (so the knowledge graph forms real edges), a taxonomy to create as
// labelsets, and the cornerstone/refusal queries the verifier will assert on.
//
// Zero dependencies — Node built-ins only.
//
//   node scripts/generate-corpus.mjs --blueprint grains-research
//   node scripts/generate-corpus.mjs --blueprint legal-matter-intelligence --out ./data/corpus
// ─────────────────────────────────────────────────────────────────────────────

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

function parseArgs(argv) {
  const a = { out: join(ROOT, 'data', 'corpus') };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--blueprint') a.blueprint = argv[++i];
    else if (argv[i] === '--out') a.out = argv[++i];
    else if (argv[i] === '--help' || argv[i] === '-h') a.help = true;
  }
  return a;
}

function die(msg) {
  console.error(`\n  ✗ ${msg}\n`);
  process.exit(1);
}

const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const singular = (s) => String(s).replace(/ies$/, 'y').replace(/s$/, '');
const titleCase = (s) => String(s).replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
const MEDIA_RE = /transcript|podcast|webinar|call|audio|video|interview/i;

function main() {
  const args = parseArgs(process.argv);
  if (args.help || !args.blueprint) {
    console.log(`
  generate-corpus.mjs — scaffold a synthetic-corpus plan from a blueprint

  node scripts/generate-corpus.mjs --blueprint <id> [--out <dir>]

  Emits data/corpus/<id>/manifest.json (+ MANIFEST_SCHEMA.md). The plan is input
  for @knowledge-engineer, which writes the actual documents at build time.
`);
    process.exit(args.help ? 0 : 1);
  }

  const bpFile = join(ROOT, 'catalog', 'blueprints', `${args.blueprint}.json`);
  if (!existsSync(bpFile)) {
    const avail = existsSync(join(ROOT, 'catalog', 'blueprints'))
      ? readdirSync(join(ROOT, 'catalog', 'blueprints')).filter((f) => f.endsWith('.json')).map((f) => f.replace('.json', ''))
      : [];
    die(`Unknown blueprint "${args.blueprint}".\n    Available: ${avail.join(', ') || '(none)'}`);
  }

  const bp = JSON.parse(readFileSync(bpFile, 'utf8'));
  const corpus = bp.corpus || {};
  const docTypes = corpus.docTypes?.length ? corpus.docTypes : ['document'];
  const target = Math.max(Number(corpus.targetCount) || docTypes.length * 4, docTypes.length);

  // ── entity pool ─────────────────────────────────────────────────────────────
  // One record per recurring entity, with a stable id. Bodies are placeholders —
  // @knowledge-engineer replaces `label` with a realistic (synthetic) name.
  const entities = [];
  for (const [group, count] of Object.entries(corpus.recurringEntities || {})) {
    const n = Number(count) || 0;
    for (let i = 1; i <= n; i++) {
      const g = singular(group);
      entities.push({
        id: `${slug(g)}-${String(i).padStart(2, '0')}`,
        group,
        // A placeholder the knowledge-engineer overwrites with a synthetic name.
        label: `${titleCase(g)} ${i}`,
      });
    }
  }
  const byGroup = (group) => entities.filter((e) => e.group === group);
  const entityGroups = Object.keys(corpus.recurringEntities || {});

  // ── document plan ───────────────────────────────────────────────────────────
  // Distribute the target count across doc types, and assign a rotating handful
  // of recurring entities to each doc so entities co-occur and the graph forms.
  const docs = [];
  const cursor = Object.fromEntries(entityGroups.map((g) => [g, 0]));
  const pickFrom = (group, k) => {
    const pool = byGroup(group);
    if (!pool.length) return [];
    const out = [];
    for (let i = 0; i < k; i++) {
      out.push(pool[cursor[group] % pool.length].id);
      cursor[group]++;
    }
    return out;
  };

  for (let i = 0; i < target; i++) {
    const docType = docTypes[i % docTypes.length];
    const isMedia = MEDIA_RE.test(docType);
    // Each doc references 1 primary "author" group + up to 2 subject entities per
    // remaining group — enough overlap for edges without a fully-connected mess.
    const refs = [];
    for (const g of entityGroups) refs.push(...pickFrom(g, g === entityGroups[0] ? 1 : Math.min(2, byGroup(g).length ? 2 : 0)));

    docs.push({
      id: `${slug(docType)}-${String(i + 1).padStart(3, '0')}`,
      docType,
      titleHint: `${titleCase(docType)} #${i + 1}`,
      entityRefs: [...new Set(refs)],
      classifications: [{ labelset: 'doc_type', label: docType }],
      media: isMedia
        ? { media_type: /video|webinar|interview/i.test(docType) ? 'video' : 'audio', duration_minutes: 18 + ((i * 7) % 42) }
        : null,
    });
  }

  // ── taxonomy (labelsets to create) ──────────────────────────────────────────
  const taxonomy = [
    { id: 'doc_type', title: 'Document type', multiple: false, labels: docTypes },
    { id: 'topic', title: 'Topic', multiple: true, labels: [] }, // filled from domain by @knowledge-engineer
  ];
  if (docs.some((d) => d.media)) {
    taxonomy.push({ id: 'media_type', title: 'Media type', multiple: false, labels: ['audio', 'video', 'text'] });
  }

  // ── manifest ────────────────────────────────────────────────────────────────
  const manifest = {
    $schema: './MANIFEST_SCHEMA.md',
    blueprint: bp.id,
    generatedBy: 'scripts/generate-corpus.mjs',
    domain: corpus.domain || bp.vertical || '',
    notes: corpus.notes || '',
    safety: bp.safety || { syntheticOnly: true },
    counts: {
      targetDocuments: target,
      documentsPlanned: docs.length,
      entities: entities.length,
      docTypes: docTypes.length,
      mediaDocuments: docs.filter((d) => d.media).length,
    },
    taxonomy,
    entities,
    documents: docs,
    verification: {
      cornerstoneQueries: corpus.cornerstoneQueries || [],
      refusalProbes: corpus.refusalProbes || [],
    },
  };

  const outDir = join(args.out, bp.id);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  writeFileSync(join(outDir, 'MANIFEST_SCHEMA.md'), SCHEMA_DOC);

  console.log(`\n  Corpus plan for "${bp.id}"`);
  console.log(`  ├─ documents planned : ${docs.length} across ${docTypes.length} type(s)`);
  console.log(`  ├─ entities pooled   : ${entities.length} in ${entityGroups.length} group(s)`);
  console.log(`  ├─ media documents   : ${manifest.counts.mediaDocuments}`);
  console.log(`  ├─ taxonomy labelsets: ${taxonomy.map((t) => t.id).join(', ')}`);
  console.log(`  └─ written to        : ${outDir}/manifest.json`);
  console.log(`\n  Next: @knowledge-engineer fills the placeholders and ingests via MCP.\n`);
}

const SCHEMA_DOC = `# Corpus manifest schema

\`manifest.json\` is a PLAN, not the data. It is emitted by
\`scripts/generate-corpus.mjs\` from a blueprint's \`corpus\` brief and consumed by
the \`@knowledge-engineer\` agent, which writes realistic (synthetic) document
bodies and ingests them into the Knowledge Box via MCP.

## Top level

| field | type | meaning |
|---|---|---|
| \`blueprint\` | string | the blueprint id this plan derives from |
| \`domain\` | string | subject domain for the synthetic content |
| \`notes\` | string | build notes carried from the blueprint brief |
| \`safety\` | object | \`{ syntheticOnly, noRealBrands, disclaimer }\` — non-negotiable |
| \`counts\` | object | summary tallies (documents, entities, media) |
| \`taxonomy\` | array | labelsets to create before ingest (see below) |
| \`entities\` | array | the shared entity pool (see below) |
| \`documents\` | array | the per-document plan (see below) |
| \`verification\` | object | \`{ cornerstoneQueries, refusalProbes }\` for \`verify.mjs\` |

## \`taxonomy[]\`
\`{ id, title, multiple, labels[] }\` — one Nuclia labelset each. \`doc_type\` is
always present; \`topic\` labels are filled in by the knowledge-engineer from the
domain; \`media_type\` appears only when the plan contains media documents.

## \`entities[]\`
\`{ id, group, label }\` — the shared pool. \`label\` is a PLACEHOLDER; the
knowledge-engineer overwrites it with a realistic synthetic name. Reusing these
ids across documents is what makes the knowledge graph form real edges.

## \`documents[]\`
\`{ id, docType, titleHint, entityRefs[], classifications[], media }\` —
- \`entityRefs\` are ids into \`entities[]\`; documents that share refs co-occur and
  connect in the graph.
- \`classifications\` are \`{ labelset, label }\` applied at ingest.
- \`media\` is \`{ media_type, duration_minutes }\` for transcript/podcast/webinar
  doc types (so the call/media surface lights up), else \`null\`.

The knowledge-engineer expands each planned document into a full body consistent
with its \`docType\`, \`entityRefs\`, and \`domain\`, then ingests it with its
classifications and (for media) its duration.
`;

main();
