# Data Augmentation agents — and the Generator's structured-extraction superpower

Data-Augmentation (ingestion) agents run over resources as they land and create **new derived data**.
Nuclia does the work; the portal just reads the result. The factory already wires three
(`scripts/create-da-agents.mjs`): **llm-graph** (knowledge graph), **synthetic-questions** (a
per-resource FAQ), and **labeler** (facets from a taxonomy). This doc is about the fourth — the one
that turns unstructured resources into **structured, queryable data you can chart, tabulate, filter,
and render beautifully**: the **Generator**.

> ## This changes what a demo can *be*
>
> The Generator collapses the oldest limitation of a RAG demo. Before, a pile of PDFs/emails/notes
> could only power *search + a chat answer*. Now, the **same unstructured corpus** can be turned into
> **typed, structured data at ingestion** — so the demo can have everything a bespoke SaaS product
> has: **live charts, KPI dashboards, sortable/filterable data grids, faceted filtering, comparison
> tables, timelines, maps** — all computed from the documents themselves, all **grounded and cited**,
> nothing mocked. And it's **fully general**: give the Generator a schema for *any* domain (invoices,
> contracts, vehicles, equipment, properties, claims, patients, tickets, résumés, research papers…)
> and it manufactures the structured layer that used to require a database and an ETL pipeline. This
> is the single biggest multiplier on how impressive, believable, and *bespoke* a one-shot demo can
> be — treat it as a first-class tool on every build where the corpus hides structure, not an
> afterthought.

> Auth + host (verified): DA tasks use the **SOWNER service-account token**
> (`X-NUCLIA-SERVICEACCOUNT: Bearer`), NOT the NUA key, on the **`{zone}.dp.progress.cloud`** host.
> `POST /kb/{kb}/task/start`, `on: 1` (fields), `operations` is a keyed container. The task schema
> can evolve — confirm field names against the live catalog: `GET /kb/{kb}/tasks`.

## The agent catalog (dashboard name → API task name)

| Dashboard | API task | Produces |
|---|---|---|
| Labeler | `labeler` | Labels/classifications → **facets & filters** |
| Graph Extraction | `llm-graph` | Entities + relations → **knowledge graph** |
| Q&A Generator | `synthetic-questions` | Question/answer pairs → **richer retrieval** |
| **Generator** | **`ask`** | Summaries, **structured JSON**, and **name-value (key-value) fields** |
| Content Safety / LLM Security | `llama-guard`, `prompt-guard` | Safety/jailbreak flags |
| — | `llm-align`, `memory` | Validate generated content; conversation memory |

## The Generator (`ask`) — schema-driven structured extraction

The Generator reads each resource and writes new data to a **destination field**. Its power is that it
can produce **validated structured JSON** conforming to a **schema you register on the KB**, and store
it as a **native `key_value` field** — so the extracted facts become first-class, queryable data.

**`AskOperation` config** (verified — Appendix F):

| Field | Meaning |
|---|---|
| `question` (req) | What to extract/generate (the instruction) |
| `destination` (req) | Field to write the output into |
| `json` | `true` → emit structured JSON (not prose) |
| `store_as_key_value` | `true` (+ `json:true`) → store as a **FieldKeyValue** (name-value pairs), not a text field. Field mode only. |
| `kv_schema_id` | ID of a **registered KV schema** the JSON must conform to (required when `store_as_key_value`) |
| `user_prompt` | custom prompt containing `{context}` and optionally `{question}` |
| `triggers` | conditional — only run on resources matching criteria/labels |

### Step 1 — register a KV schema (the shape of the structured data)

`POST /kb/{kb}/kv-schemas` (role WRITER, dp host). Field types: **`text | integer | float | boolean |
date`**; each field may be `required`, `range` (stores a range; enables `contains`), or `repeated` (a
list). This *typing* is what makes the extracted data chartable and filterable.

```bash
curl -X POST "https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/kv-schemas" \
  -H "X-NUCLIA-SERVICEACCOUNT: Bearer $SOWNER" -H "Content-Type: application/json" \
  -d '{
    "id": "vehicle_facts",
    "description": "Structured facts extracted from each vehicle listing",
    "fields": [
      { "key": "make",        "type": "text",    "required": true },
      { "key": "model",       "type": "text" },
      { "key": "year",        "type": "integer" },
      { "key": "price",       "type": "float" },
      { "key": "body_type",   "type": "text" },
      { "key": "in_stock",    "type": "boolean" },
      { "key": "listed_date", "type": "date" }
    ]
  }'
```

### Step 2 — start the Generator to fill it

`POST /kb/{kb}/task/start` (SOWNER, dp host):

```json
{
  "name": "ask",
  "parameters": {
    "name": "factory-generator",
    "on": 1,
    "operations": [{
      "ask": {
        "question": "Extract the make, model, year, price, body type, stock status and listing date for this vehicle.",
        "destination": "vehicle_facts",
        "json": true,
        "store_as_key_value": true,
        "kv_schema_id": "vehicle_facts"
      }
    }]
  },
  "apply": "ALL",
  "enabled": true
}
```

Now every resource carries a typed `key_value` field (`vehicle_facts`) with `make/year/price/…`.

### Step 3 — read it back and use it

Include `key_value` in `field_type_filter` (it's a default) and read the extracted fields per
resource, **or** aggregate across the corpus. Because the values are typed, you can sum/average/bucket
them and **filter/facet** on them.

## Wonderful, valuable ways to use it in a demo

The extracted structured/name-value data is the raw material for the parts of a demo that feel like a
real product — all **grounded** (every number traces to a resource's KB field, so it flows through
`<CitedMetric source>` truthfully):

- **Charts from the corpus** — aggregate a numeric/date KV field to populate real bar/line/pie charts:
  average `price` by `make`, listings per `listed_date` month, count by `body_type`. Not mock data —
  the chart *is* the Knowledge Box.
- **Beautiful, structured search-result cards** — instead of a title + snippet, render the extracted
  fields as a rich card: price chip, year, stock badge, body-type tag. The result *looks* like the
  prospect's own product because it shows their fields.
- **Data grids / comparison tables** — a KendoReact Grid / TanStack Table over the KV fields: sortable,
  filterable columns of real extracted values. Great for "compare these records" moments.
- **Facets & filters that didn't exist in the source** — the typed fields become filter controls
  (price range via a `range` field, `in_stock` toggle, `body_type` facet) even though the source docs
  were unstructured prose.
- **Grounded KPI dashboards** — headline `<CitedMetric>` tiles computed from aggregated KV values
  ("142 vehicles · avg $38k · 23 in stock"), each with visible provenance.
- **Timelines & maps** — `date` fields drive a timeline; an extracted `location`/address text field
  drives a map or a geo grouping.
- **Entity/relationship views** — pair the Generator's structured fields with `llm-graph` relations
  for a records-plus-connections explorer.

### Design guidance for the builder

- When a domain has recurring structured facts hiding in prose (invoices→amounts/dates/parties;
  vehicles→specs/price; contracts→parties/renewal dates; equipment→model/serial/PM interval;
  properties→beds/baths/price), **define a KV schema and run the Generator** — then build at least one
  chart, one rich result card, and one facet from it. This is often what makes a demo feel bespoke.
- Keep it grounded: aggregate real KV values through `<CitedMetric source>` / `useCatalog`; never
  hardcode a number (the groundedness lint fails the build if you do).
- Match the schema field **types** to how you'll use them: `integer`/`float`/`date` for charts and
  ranges, `boolean` for toggles, `text` (+ `repeated`) for facets/tags.
- Extraction quality follows the `question`/`user_prompt` — write it like instructing an analyst:
  say exactly which facts to pull and how to normalise them.

`scripts/create-da-agents.mjs --generate '<json>'` registers a KV schema and starts the Generator in
one step (see its `--help`); or do it directly with the two calls above in your own loop.
