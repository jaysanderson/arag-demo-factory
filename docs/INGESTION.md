# ARAG Ingestion Reference (builder distillation)

How content gets **into** a Knowledge Box and is **enriched** — the resource/field data model,
file upload + processing, and the Data Augmentation (ingestion) agents. Retrieval quality is
decided here, at ingest, not at query time: how you shape resources determines what you can
filter, facet, cite, and graph later. Distilled from the practitioner's guide, Chapters 6–8.

> Rule of thumb: **model one resource per _thing a user would retrieve as a unit_**, put anything
> you might filter on in `usermetadata`/`origin` (never `extra`), and start the three enrichment
> agents on every build so facets, graph, and related surfaces light up.

## Hosts & auth for ingestion

| Operation | Host | Auth header |
|---|---|---|
| Resources, upload, processing status (data plane) | `{zone}.rag.progress.cloud/api/v1` | `X-NUCLIA-SERVICEACCOUNT: Bearer …` (or `Authorization: Bearer …` — both verified) |
| Tasks / DA-agents (NUA API) | `{zone}.dp.progress.cloud/api/v1` | `X-NUCLIA-NUAKEY: Bearer …` |

Service-account role for ingestion: **SCONTRIBUTOR** (ingests + serves). `{zone}` = `aws-ap-southeast-2-1`.

---

## 1. The resource & field data model (Ch 6)

A **resource** = one item of content + its metadata: a system `uuid`, an optional `slug` you
choose, and a dict of **fields** keyed by field id (`^[a-zA-Z0-9:_-]+$`). A resource can be one PDF
or a composite (image + text + video + comments) that surfaces as a single coherent result.

**Create** — `POST /kb/{kb}/resources` → `201 {uuid, seqid}`. Fields are grouped by type key:

```bash
curl -X POST "https://$ZONE.rag.progress.cloud/api/v1/kb/$KB/resources" \
  -H "Authorization: Bearer $KEY" -H "Content-Type: application/json" \
  -d '{
    "slug": "solar-basics",
    "title": "Solar Panel Basics",
    "texts": { "body": { "body": "A photovoltaic panel converts sunlight...", "format": "PLAIN" } },
    "usermetadata": { "classifications": [ { "labelset": "topic", "label": "energy" } ] }
  }'
```

### Field types (each a key in the body)

| Key | Holds | Notes |
|---|---|---|
| `texts` | Text you supply | `format`: `PLAIN`, `HTML`, `MARKDOWN` (→ plain; `KEEP_MARKDOWN` preserves markup), `RST`, `JSON`, `JSONL`. Structured JSON is understood — index an array of records, ask questions over its structure. |
| `files` | Uploaded binaries | PDF/Office/image/audio/video/archive. Inline base64, field-endpoint upload, or a URL. Auto OCR + speech-to-text; extracted text is indexed. See §2. |
| `links` | A URL the platform fetches | Ideal for web pages + sitemaps without downloading. `{ "home": { "uri": "https://..." } }` |
| `conversations` | Ordered messages (chat/thread/email) | Each message: author, text, attachments. Appendable via a messages endpoint — a live thread stays one resource. |
| `key_values` | Structured key/value data | Records you want alongside prose. |

### Metadata: four buckets

| Bucket | Field | Set by | Queryable? |
|---|---|---|---|
| User metadata | `usermetadata` | You | **Yes** — `classifications` (labels) + relations drive faceting/filtering |
| Origin | `origin` | You | **Yes** — `source_id`, `url`, created/modified, `tags`, `collaborators`, `path` |
| System | `metadata` | Platform (language, etc.) | Yes |
| Extra | `extra` | You | **No** — stored but excluded from retrieval |

> **Gotcha (tested):** anything you might filter/facet by goes in `usermetadata`/`origin`, **not
> `extra`**. `extra` is deliberately invisible to `find` filters — a category stored there cannot
> be filtered on.

### Read back, address by slug, modify

- `GET /kb/{kb}/resource/{rid}` — `show` = `basic` (default: title/summary/icon/labels/status) ·
  `values` (your field values) · `extracted` (processed text, paragraphs, computed metadata) ·
  `errors` · `origin`/`security`/`relations`. Pair with `extracted=text&extracted=metadata`.
- **Slug twin:** every by-id route has `/kb/{kb}/slug/{rslug}` — address by your own external ids,
  never store platform UUIDs.
- `PATCH /kb/{kb}/resource/{rid}` — **additive**: unset fields untouched. Add labels/fields, or
  `{"hidden": true}` to exclude from search without deleting (staging / soft-retire). `DELETE` is permanent.

---

## 2. Uploading & processing files (Ch 7)

**Accepted formats** (all extracted to text; OCR + STT applied automatically):

| Category | Examples |
|---|---|
| Documents | `.txt .html .docx .pdf .json` |
| Spreadsheets | `.xlsx .csv` |
| Presentations | `.pptx` |
| Images (OCR) | `.jpg .png .tiff` |
| Video (STT) | `.mp4 .avi .mpeg` |
| Audio (STT) | `.mp3 .wav` |
| Web | `.html`, sitemaps |
| Archives | `.zip .gzip .rar` |

> **Gotcha (tested):** an archive is indexed as **one** resource — inner files' text is merged.
> Unpack before ingesting if you need per-file results.

### Two upload paths

**Simple** — `POST /kb/{kb}/upload`, whole binary in one request. Returns the new resource `uuid`
and the created file `field_id` (one call both makes the resource and attaches the file).

```bash
curl -X POST "https://$ZONE.rag.progress.cloud/api/v1/kb/$KB/upload" \
  -H "Authorization: Bearer $KEY" \
  -H "X-Filename: wind.txt" -H "Content-Type: text/plain" \
  --data-binary @wind.txt
# -> 201 { "seqid": null, "uuid": "1009f3c7...", "field_id": "1d7c1a94..." }
```

Optional headers: `X-Language`, `X-Password` (protected docs), `X-Extract-Strategy`, `X-Split-Strategy`.

**Resumable (TUS)** — for large files / unreliable networks: create an upload, `PATCH` chunks with
`Upload-Offset`, resume from the last acknowledged offset. Use for long videos, big PDFs. SDKs wrap
the offset bookkeeping.

### Processing pipeline & readiness

Once a file lands, the Understanding API runs: detect type → extract text (OCR/STT) → detect
language → split into paragraphs → NER → compute vectors with the KB's semantic model. Output is
stored under the field's `extracted` data.

> **Warning (tested):** processing is **async, not instant**. A file accepted with `201` still
> answered *"Not enough data"* on `/ask` until its vectors existed. Never assume queryable on upload.

Readiness: `GET /kb/{kb}/resource/{rid}?show=basic` → `metadata.status` moves
`PENDING`/`PROCESSING` → `PROCESSED` (or `ERROR`). Poll it for a demo build; at volume, prefer a
**webhook** (a DA agent can fire one — §3) over per-resource polling.

### Tuning extraction & chunking

| Strategy | Controls | Referenced by | Default state |
|---|---|---|---|
| **Extract strategy** | How text is pulled from a doc (tables, layout) | `X-Extract-Strategy` / field `extract_strategy` | none until you create them (`GET /kb/{kb}/extract_strategies` → `{}` on a fresh KB) |
| **Split strategy** | How extracted text is chunked into paragraphs | `X-Split-Strategy` | prose default |

> **Key idea:** chunking is the highest-leverage ingestion knob. If answers miss context or cite
> fragments, revisit the split strategy **before** touching models. Too small loses context; too
> large drops precision.

**Maintenance:** `POST .../resource/{rid}/reprocess` re-runs the full pipeline (after changing an
extract/split strategy or the semantic model); `POST .../resource/{rid}/reindex` rebuilds indexes
from already-extracted data (cheaper).

---

## 3. Data Augmentation / ingestion agents (Ch 8)

Agents that create **derived data** over resources at ingest: labels, summaries, structured JSON,
Q&A pairs, graph relations, safety flags. Managed as **tasks** on the **NUA API** (`dp` host, NUA key).

### Catalog (`GET /kb/{kb}/tasks`)

`GET /kb/{kb}/tasks` returns the catalog **and each agent's config schema** — read it to build
`parameters` and to see which LLM / provider keys a given agent (esp. the guards) requires.

| API `name` | Dashboard | Produces |
|---|---|---|
| `labeler` | Labeler | Classification labels from label descriptions/examples → **facets** |
| `llm-graph` | Graph Extraction | Entities + typed relations → **`/graph`**, related |
| `synthetic-questions` | Q&A Generator | Question/answer pairs (resource FAQ) → richer **retrieval** |
| `ask` | Generator | Summaries, JSON, extracted structured content (e.g. parties/dates/amounts → filterable fields) |
| `llm-align` | — | Aligns/validates generated content against source |
| `memory` | — | Extracts memory facts from conversation fields incrementally |
| `llama-guard` | Content Safety | Flags unsafe / inappropriate text blocks or resources |
| `prompt-guard` | LLM Security | Flags jailbreak / prompt-injection content |

> **Tip:** label descriptions **are prompts**. Write each like instructing a new analyst — what
> qualifies, what doesn't, an example. This does more for label quality than any model choice.

### Starting an agent

`POST /kb/{kb}/task/start`:

```bash
curl -X POST "https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/task/start" \
  -H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" -H "Content-Type: application/json" \
  -d '{
    "name": "labeler",
    "parameters": {                    # DataAugmentation-Input (shape per the task schema)
      "operations": [ { "label": { "labelset": "severity",
        "labels": [ {"label":"High","description":"Outage or data loss; needs immediate action"} ] } } ],
      "llm": { "model": "chatgpt-azure-4o" },
      "filter": { "contains": [], "resource_type": [], "field_types": [] }
    },
    "apply": "ALL",
    "enabled": true
  }'
```

| Body field | Values | Meaning |
|---|---|---|
| `name` | task name from the catalog | which agent |
| `parameters` | `DataAugmentation-Input` | `operations[]` (the enrichment spec), `llm`, `filter` (conditional triggering) — exact shape comes from that task's schema in `GET /tasks` |
| `apply` | `EXISTING` · `NEW` · `ALL` | `EXISTING` backfills now (one-shot) · `NEW` runs continuously on new resources · `ALL` = both |
| `enabled` | `true`/`false` | active on creation |

**Triggering modes** map to `apply` + `filter`: one-shot (`EXISTING`), continuous (`NEW`),
conditional (add `filter` by resource type / field type / keywords, or gate by an existing label so
one agent's output drives another — e.g. summarize only what `labeler` tagged `High`). Any agent
can fire a **webhook** on completion — the clean way to notify downstream that a resource is ready.

### Lifecycle

| Action | Endpoint |
|---|---|
| Enable / stop / restart / clean up | `POST /kb/{kb}/task/{id}/enable` · `/stop` · `/restart` · `/cleanup` |
| Inspect a run | `GET /kb/{kb}/task/{id}/inspect` |
| Edit / delete | `PATCH` · `DELETE /kb/{kb}/task/{id}` |

### What every demo build should start

Start these three with **`apply: ALL`** so the corpus is enriched and the demo's facet/graph/related
surfaces are populated:

1. **`labeler`** → facets & filters (Ch 9 faceting depends on it).
2. **`llm-graph`** → the knowledge graph queried via `/graph`.
3. **`synthetic-questions`** → pre-written Q&A that lifts retrieval quality.

Add **`llama-guard` + `prompt-guard`** for any KB exposed to user-generated or untrusted content —
running them at ingest labels unsafe content before it can ever be retrieved into an answer.

---

*Source: "Building Solutions with Progress Agentic RAG," Part 3 — Data Ingestion, Ch 6 (Resources
& Fields), Ch 7 (Uploading & Processing Files), Ch 8 (Data Augmentation / Ingestion Agents);
hosts/credentials reconciled with `docs/ARAG-REFERENCE.md`.*
