# Corpus manifest schema

`manifest.json` is a PLAN, not the data. It is emitted by
`scripts/generate-corpus.mjs` from a blueprint's `corpus` brief and consumed by
the `@knowledge-engineer` agent, which writes realistic (synthetic) document
bodies and ingests them into the Knowledge Box via MCP.

## Top level

| field | type | meaning |
|---|---|---|
| `blueprint` | string | the blueprint id this plan derives from |
| `domain` | string | subject domain for the synthetic content |
| `notes` | string | build notes carried from the blueprint brief |
| `safety` | object | `{ syntheticOnly, noRealBrands, disclaimer }` — non-negotiable |
| `counts` | object | summary tallies (documents, entities, media) |
| `taxonomy` | array | labelsets to create before ingest (see below) |
| `entities` | array | the shared entity pool (see below) |
| `documents` | array | the per-document plan (see below) |
| `verification` | object | `{ cornerstoneQueries, refusalProbes }` for `verify.mjs` |

## `taxonomy[]`
`{ id, title, multiple, labels[] }` — one Nuclia labelset each. `doc_type` is
always present; `topic` labels are filled in by the knowledge-engineer from the
domain; `media_type` appears only when the plan contains media documents.

## `entities[]`
`{ id, group, label }` — the shared pool. `label` is a PLACEHOLDER; the
knowledge-engineer overwrites it with a realistic synthetic name. Reusing these
ids across documents is what makes the knowledge graph form real edges.

## `documents[]`
`{ id, docType, titleHint, entityRefs[], classifications[], media }` —
- `entityRefs` are ids into `entities[]`; documents that share refs co-occur and
  connect in the graph.
- `classifications` are `{ labelset, label }` applied at ingest.
- `media` is `{ media_type, duration_minutes }` for transcript/podcast/webinar
  doc types (so the call/media surface lights up), else `null`.

The knowledge-engineer expands each planned document into a full body consistent
with its `docType`, `entityRefs`, and `domain`, then ingests it with its
classifications and (for media) its duration.
