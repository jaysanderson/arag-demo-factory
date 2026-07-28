# Catalog, Suggest, Summarize & the Knowledge Graph (builder distillation)

The supporting retrieval surfaces that round out a demo beyond `/find` and `/ask`: faceted
**browse**, type-ahead **suggest**, on-demand **summarize**, and **graph** traversal. Distilled for
the orchestrator building any demo — reach for these when the UI needs a filter rail, an
autocomplete box, a digest view, or a relationship explorer.

All calls are on the **RAG data plane** — host `https://{zone}.rag.progress.cloud/api/v1`, auth
`X-NUCLIA-SERVICEACCOUNT: Bearer <sa-token>`. `{zone}` = `aws-ap-southeast-2-1`.
(The dashboard and the guide's examples use the mirror `{zone}.dp.progress.cloud` host with
`Authorization: Bearer`; both reach the same KB — the portal proxies the `rag` host.)

## 1. `/catalog` — faceted browse over the corpus

`POST /kb/{kb}/catalog` lists and filters resources by their **stored** attributes (title, slug,
labels, origin) — it reads the title/metadata index, **not** the vector index. So it works the
instant a resource is created (before processing finishes) and never incurs embedding cost. This is
the endpoint behind an admin table or a faceted browse rail; use `/find` only when you need
relevance ranking. `GET /kb/{kb}/catalog` with no body lists everything.

| Param | Type | Purpose |
|---|---|---|
| `query` | string | Title/keyword filter over stored text (`""` = match all). |
| `faceted` | string[] | Facet paths to return counts for, e.g. `/classification.labels/topic`, `/origin`, `/icon`. |
| `filters` | string[] | Restrict the result set by label/metadata, e.g. `/classification.labels/topic/energy`. |
| `page_number`, `page_size` | int | Pagination over the resource list. |
| `sort` | object | `{ "field": "created", "order": "desc" }` etc. |

```bash
# Faceted counts per topic label — powers a filter rail
curl -X POST "https://$ZONE.rag.progress.cloud/api/v1/kb/$KB/catalog" \
  -H "X-NUCLIA-SERVICEACCOUNT: Bearer $SA" -H "Content-Type: application/json" \
  -d '{"query":"","faceted":["/classification.labels/topic"]}'
```

Response: `resources` (map of id → title/slug/metadata) plus `fulltext`/`facets`, where each faceted
path carries `{ "<facet-value>": <count> }`. Render the facet counts as the checkable filter rail;
feed a checked value back as a `filters` entry to drill down. Facets exist only where an ingestion
agent wrote labels — start the **labeler** agent (`apply: ALL`) so `/classification.labels/*` is
populated.

## 2. `/suggest` — autocomplete as you type

`GET /kb/{kb}/suggest?query=<prefix>` returns fast partial matches — paragraphs **and** entities —
for a search box on each keystroke. Sub-millisecond in practice (`?query=batt` → battery/EV
paragraphs). Keep it on `GET`, debounce ~150 ms, cache aggressively per prefix.

```bash
curl "https://$ZONE.rag.progress.cloud/api/v1/kb/$KB/suggest?query=batt" \
  -H "X-NUCLIA-SERVICEACCOUNT: Bearer $SA"
```

## 3. `/summarize` — condense resources on demand

`POST /kb/{kb}/summarize` takes resource ids and returns a per-resource summary (plus an optional
combined one), using the KB's summary model. Use it for digest views, previews, or pre-computing
summaries you'll later retrieve against.

| Param | Type | Purpose |
|---|---|---|
| `resources` | string[] | Resource UUIDs to summarize. |
| `summary_kind` | string | `simple` (per-resource) or `extended` (adds a combined summary). |

```bash
curl -X POST "https://$ZONE.rag.progress.cloud/api/v1/kb/$KB/summarize" \
  -H "X-NUCLIA-SERVICEACCOUNT: Bearer $SA" -H "Content-Type: application/json" \
  -d '{"resources":["ca2a8f3b...","86b5f794..."]}'
# → { "resources": { "ca2a8f3b...": { "summary": "Photovoltaic solar panels convert..." } } }
```

**Cost tip:** for summaries shown repeatedly, generate them once with a **Generator** ingestion
agent (`ask` task) and store them as a field, rather than calling `/summarize` on every page view.
Summarize on demand only for ad-hoc selections.

## 4. The knowledge graph — traverse relationships, not similarity

Vector/keyword search finds passages that *resemble* a query; the graph answers questions where the
**connections are the answer** ("what depends on service X?", "which policies mention both A and
B?"). Two sources populate it: the **NER model** auto-detects entities (people, orgs, places, dates)
during processing, and the **`llm-graph`** ingestion agent (start it `apply: ALL`) uses an LLM to
extract richer, **typed relations** across resources. No `llm-graph` → only bare NER entities, no
typed edges.

### Three graph endpoints (all POST, all require a `query` object)

| Endpoint | Returns | `query.prop` |
|---|---|---|
| `POST /kb/{kb}/graph` | Paths — `source → relation → destination` triples | `path` |
| `POST /kb/{kb}/graph/nodes` | Nodes — the entities themselves, ranked by score | `node` |
| `POST /kb/{kb}/graph/relations` | Relations — the edge types present in the graph | `relation` |

**Gotcha (tested):** all three require a `query` object. Sending only `{"top_k":10}` → `422 Field
required` for `query`. The `query` object selects what to traverse (`{"prop":"node"}` /
`{"prop":"path"}` / `{"prop":"relation"}`); `top_k` bounds the result count.

```bash
# Nodes (entities), ranked
curl -X POST "https://$ZONE.rag.progress.cloud/api/v1/kb/$KB/graph/nodes" \
  -H "X-NUCLIA-SERVICEACCOUNT: Bearer $SA" -H "Content-Type: application/json" \
  -d '{"query":{"prop":"node"},"top_k":5}'
# → { "nodes": [ { "value":"Private Knowledge Box","type":"entity","group":"ORG","score":1.037 }, ... ] }

# Paths (triples) — the shape you traverse to answer relationship questions
curl -X POST "https://$ZONE.rag.progress.cloud/api/v1/kb/$KB/graph" \
  -H "X-NUCLIA-SERVICEACCOUNT: Bearer $SA" -H "Content-Type: application/json" \
  -d '{"query":{"prop":"path"},"top_k":10}'
# → { "paths": [ { "source":{"value":"ca2a8f3b...","type":"resource"},
#                  "relation":{"type":"ABOUT","label":""},
#                  "destination":{"value":"topic/energy","type":"entity"} } ] }
```

A node carries `value` / `type` / `group` (entity group, e.g. `ORG`, `GPE`, `DATE`) / `score`. A
path carries `source`, `relation` (`type` + optional `label`), and `destination`, each a
`{value,type}` node. This is exactly the shape a KendoReact graph explorer consumes — nodes for the
vertices, paths for the edges.

### Graph inside ordinary retrieval

You don't always query the graph directly — two integration points fold graph knowledge into
`/find` and `/ask`:

- **`features: ["relations"]`** (or `["graph"]`) on `find`/`ask` — include graph entities and paths
  in the retrieval results.
- **The `graph` RAG strategy on `ask`** — expand the generation context along relations, so the
  model sees the entities and facts connected to a matched paragraph, not just the paragraph. Many
  real demos use this to enrich an otherwise standard `ask`.

### Custom entity groups

Standard groups (`ORG`, `GPE`, `DATE`, …) are auto-detected. For domain entities (product SKUs,
internal system names), define your own **entity groups** so NER and the graph recognise them: read
current groups with `GET /kb/{kb}/entitiesgroups`, manage them from the dashboard or management API,
then **reprocess** so existing content is re-scanned.

---
*Source: the practitioner's guide — Chapter 11 (Catalog, Suggest, and Summarize) and Chapter 12 (The
Knowledge Graph and Graph Search); hosts/auth per `docs/ARAG-REFERENCE.md`.*
