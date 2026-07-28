# ARAG Concepts (foundational map)

The mental model you carry as an ARAG developer: what Progress Agentic RAG (Nuclia) *is*, the
objects it's built from, and the five-call flow that turns a pile of content into a cited answer.
Everything the factory builds is a richer version of this shape — the shape never changes.

## What ARAG is

A managed **retrieval-augmented generation** platform. RAG is a pipeline, not a model:
**ingest → index → retrieve → generate**. ARAG runs the whole pipeline behind one API — parsing
(any format, any language), OCR/transcription, chunking, a **hybrid index** (BM25 keyword +
vector semantic), configurable embedding and generative models, reranking, and grounded answer
generation with **citations back to the source paragraph**. An answer with no citation is a bug,
not a stylistic choice (Ch. 1).

Everything hangs off one container: the **Knowledge Box (KB)**. You ingest resources into a KB and
you `find`/`ask` against that same KB. KBs are fully isolated — a search never crosses KB
boundaries. One account holds many KBs (one per tenant / product area / security domain) (Ch. 1–2).

The two endpoints are the platform in miniature. `ask` internally calls `find` to gather evidence,
so it accepts every `find` parameter plus generation controls (Ch. 1):

| Endpoint | Does | Returns |
|---|---|---|
| `POST /kb/{kb}/find` | Hybrid retrieval | Ranked resources + matching paragraphs (`best_matches`) |
| `POST /kb/{kb}/ask`  | Retrieval **+** generation | Generated answer, `citations`, and the `retrieval_results` that grounded it |

## The containment hierarchy

Retrieval operates at the **paragraph** level — the platform finds the best paragraphs, then tells
you which resource and field they came from. This is the key to both results and filtering (Ch. 2).

```
Account
└── Knowledge Box  (belongs to exactly one zone; identified by a kbid UUID)
    └── Resource   (one item of content: doc, page, image, media, text; stable uuid + optional slug)
        └── Field  (typed content holder — a resource can hold several)
            └── Paragraph  (the retrievable text block)
                └── Vector  (an embedding of a paragraph/sentence)
```

**Field types** — content sits in a *typed* field, addressed in results by a field_type letter +
field_id. An identifier like `ca2a…/t/body/0-301` means resource `ca2a…`, text field `body`, char
range 0–301 (Ch. 2):

| Field | API key | Holds |
|---|---|---|
| Text | `texts` | Plain / Markdown / HTML / RST you supply |
| File | `files` | Uploaded binary — PDF, Office, image, audio, video |
| Link | `links` | A URL the platform fetches and processes |
| Conversation | `conversations` | A message sequence (chat / support thread) |
| Key-value | `key_values` | Structured key/value data |

**Enrichment layered on top of raw text** (filter and navigate by these):
- **Labels / classifications** — tags grouped into **labelsets**; applied manually or by an ingestion
  agent, then used as search filters (→ facets).
- **Entities** — named things (people, orgs, places, products) from NER or your **entity groups**.
- **Relations** — connect entities/resources into a **knowledge graph** you can query via `/graph`.
- **Vectorset** — a *named* vector index; a KB can hold several (e.g. one per embedding model), so
  you can migrate embedding models without rebuilding. Select with the `vectorset` param (Ch. 2).

**Processing is asynchronous.** Create/upload is accepted immediately, then processed in the
background by NUA (extract → transcribe → NER → chunk → vectorize). Content is not searchable until
processing finishes — small text is seconds; a fresh file returns *"Not enough data to answer this"*
from `/ask` until done. Never `find` in the same breath as ingest; poll status first (Ch. 2–3, 7).

## Hosts — get these right, always

The platform is four APIs across three hosts. Which host a call goes to is not negotiable:

| Host | Serves |
|---|---|
| `{zone}.rag.progress.cloud/api/v1` | **RAG data plane** — `/find`, `/ask`, `/catalog`, `/graph`, `/counters`, resources |
| `{zone}.dp.progress.cloud/api/v1` | **NucliaDB + NUA** — `search_configurations`, `tasks`/DA-agents, processing |
| `rag.progress.cloud/api/v1` (global) | Account/KB creation, zone/slug discovery — **rejects NUA keys** |

`{zone}` for this account is `aws-ap-southeast-2-1`. (The book's quickstart shows data-plane calls on
the `dp` host; the factory's verified convention splits data-plane reads onto the `rag` host — use
the table above.)

## Credentials — three kinds, three headers

Send exactly **one** auth header per request; the wrong header or wrong API rejects the key outright
(Ch. 1, 4). The most common early error is a credential used against an API it can't call.

| Credential | Header | Can do |
|---|---|---|
| **NUA key** (`allow_kb_management`) | `X-NUCLIA-NUAKEY: Bearer …` (or `Authorization: Bearer …`) | Create/manage KBs, **start DA-agent tasks**, Understanding/Predict. **No data-plane read/write.** |
| **KB service-account token** | `X-NUCLIA-SERVICEACCOUNT: Bearer …` | KB data plane (`/find`, `/ask`, resources). Roles: **SOWNER / SCONTRIBUTOR / SMEMBER** |
| **Account token / PAT** | `Authorization: Bearer …` | Account admin (global API) |

Gotchas (tested): a NUA key is bound to **one account** server-side (`This NUA key is issued for a
different account`); the global API **rejects NUA keys** (`Nuakeys are not valid in the global API`),
so the account id must come from the dashboard/SDK, not discovery.

## The quickstart flow (create → key → ingest → find → ask)

The whole platform in five calls (Ch. 3). Note the **handoff**: a NUA key *creates* the KB, then a
KB-scoped service-account token does *content and search* — the NUA key can't read the data plane.

1. **Create KB** — `POST /account/{acct}/kbs` `{slug, title}`, NUA key → `{ "id": "…" }`. Save as `KB`.
2. **Get a KB key** (two steps, both NUA-authed): `POST /account/{acct}/kb/{KB}/service_accounts`
   `{title, role}` → `{id}`, then `POST …/service_account/{id}/keys` `{expires}` → `{token}`.
   `expires` is capped at **1095 days** (`Choosen key expiration exceeds the current maxium…`).
   Use `SCONTRIBUTOR` to both ingest and serve; `SOWNER` if it must also create search configs.
3. **Ingest** — `POST /kb/{KB}/resources` with a slug, title, and typed fields:
   ```json
   { "slug": "battery-storage", "title": "Home Battery Storage",
     "texts": { "body": { "body": "Home battery systems store excess solar energy…", "format": "PLAIN" } } }
   ```
   Returns `{ "uuid": "…" }` immediately — but processing is async (poll before step 4). Always set a
   **slug**: a stable id you choose, accepted by most endpoints in place of the UUID.
4. **Find** — `POST /kb/{KB}/find` `{"query":"…natural language…","features":["keyword","semantic"],"top_k":5}`.
   Hybrid by default. Returns ranked `resources` + `best_matches` paragraph ids.
5. **Ask** — `POST /kb/{KB}/ask` `{"query":"…","citations":true}`. `X-Synchronous: true` waits for
   the full answer instead of NDJSON streaming. The response carries the `answer`, a `citations` map
   (source paragraph → char span of the answer it supports), and `retrieval_results` echoing exactly
   which passages were used. That auditable grounding is the point.

Everything the factory adds — richer ingestion (DA agents: `labeler`, `llm-graph`,
`synthetic-questions`), sharper retrieval (search configurations), more controllable answers — makes
each of these five steps better without changing the shape. See `ARAG-REFERENCE.md` for the
provisioning endpoints and `RETRIEVAL.md` for grounding policy.

Source: *Building Solutions with Progress Agentic RAG*, Part 1 — Foundations, Chapters 1–3.
