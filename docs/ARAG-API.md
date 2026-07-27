# ARAG API — the canonical Nuclia surface the portal uses

This is the integration reference for the ARAG Demo Factory portal. It distils the
Progress Agentic RAG (Nuclia) surface actually used across the shipped portfolio
(see `arag-gtm/reference-repos/REFERENCE.md`) down to what the portal server
(`portal/server/index.mjs`) proxies. **The browser never calls Nuclia directly** —
every call goes through the portal's Express server, which holds the token.

---

## Auth header — the canonical pattern

KB-scoped calls authenticate with a **service-account token** (a JWT, or a `kb-…`
service access token), passed as a single header:

```
X-NUCLIA-SERVICEACCOUNT: Bearer <token>
```

This is the dominant convention across the portfolio (both Capstones, geostack,
research-portal, arag-doc-processing, the Partner Enablement curriculum). Notes:

- Send **exactly one** authorization header. Sending both `Authorization: Bearer`
  and `X-NUCLIA-SERVICEACCOUNT: Bearer` (or two of either) makes Nuclia reject the
  request outright. For KB ops the header is `X-NUCLIA-SERVICEACCOUNT` — **not**
  `Authorization`, not `X-API-Key`, not a cookie.
- Strip a stray `Bearer ` prefix and surrounding quotes from a pasted token before
  use (a common copy-paste mistake that yields `JWT decoding error`). The server's
  `cleanKey()` does this.
- End-user identity (distinct from the API caller) is propagated as `x-nucliadb-user`
  when a demo needs per-user attribution.

## Base URL / zone

Production ARAG host pattern:

```
https://<zone>.rag.progress.cloud/api/v1/kb/<kb-id>
```

- Document-processing KBs use `dp.progress.cloud` instead of `rag.progress.cloud`
  (`https://<zone>.dp.progress.cloud/api/v1/kb/<id>`).
- Zones seen in the portfolio: `europe-1`, `aws-eu-1`, `aws-eu-central-1-1`,
  `aws-us-east-2-1`. Default is **EU / `europe-1`**.
- **Residency safety (Hard Rule 4):** AU/ANZ residency is not offered — do not claim
  it. The zone/host string is **server-side only** and must never be rendered on a
  customer-facing surface. The full base URL lives in `NUCLIA_KB_URL`.

## The three credential types — do not conflate

| Credential | What it unlocks | Header | Env |
|---|---|---|---|
| **KB service-account token** | All KB ops (`/ask`, `/find`, `/catalog`, `/graph`, `/resources`, entities, labelsets) and the **KB-scoped** `{kb}/predict/chat` | `X-NUCLIA-SERVICEACCOUNT: Bearer` | `NUCLIA_SERVICEACCOUNT` |
| **Account NUA key** | The **account-level** `/api/v1/predict/chat` across the full 60+ model catalogue (honours `?model=`) | `Authorization: Bearer` | `NUCLIA_NUA_KEY` |
| **Account PAT** | The only credential that can **create** Knowledge Boxes (account management API) | `Authorization: Bearer` | `NUCLIA_ACCOUNT_TOKEN` |

The account `/predict/chat` returns **403** with a KB token (geostack's finding); it
falls back to the KB-scoped predict endpoint, which routes everything to the KB
default model. A NUA key alone **cannot** create KBs — that needs the account PAT.

The portal proxies **only** the KB service-account surface. The AI-Visibility surface
needs the account NUA key; the portal renders its narrative and gates live scores on
that separate credential.

---

## Endpoints in use

The portal server exposes these `/api/*` routes; each maps to a Nuclia call with the
grounding policy from `docs/RETRIEVAL.md` applied.

### `POST /api/ask` → `POST {kb}/ask` — grounded, streamed answer

The core surface. Request body sent to Nuclia:

```jsonc
{
  "query": "How do impact mills compare with chaff lining for ryegrass control?",
  "top_k": 20,
  "rag_strategies": [{ "name": "neighbouring_paragraphs", "before": 2, "after": 2 }],
  "citations": true,
  "citation_threshold": 0.25,
  "prompt": { "system": "…grounded system prompt…" },
  "filters": ["/classification.labels/crop/wheat"]   // optional
  // "search_configuration": "researcher"             // optional; authoritative if set
}
```

Sent with `Accept: application/x-ndjson`. Nuclia streams **newline-delimited JSON**;
the portal relays it straight through so the UI renders tokens as they arrive. Event
shapes the client handles:

- **answer token** — `{ "item": { "type": "answer", "text": "…" } }` (append to answer).
- **retrieval** — `{ "item": { "type": "retrieval", "results": { "resources": { … } } } }`.
  Carries paragraph text + parent document title, keyed by paragraph id
  (`<rid>/t/body/<start>-<end>`). Index this as it streams past.
- **citations** — `{ "citations": { "<paragraphId>": [[start,end], …] } }`. The spans
  are character offsets into the answer; there is no title or excerpt. Join them to the
  retrieval index by paragraph id to get titles + excerpts, then **group by document**
  (many cited paragraphs usually belong to one source).

An answer with **no** citations is surfaced as an explicit *ungrounded* warning — never
shown as trustworthy prose. See `src/lib/arag.ts` (`ask`, `normalizeCitations`).

A named `search_configuration` is **authoritative** — it carries its own strategy and
prompt, so the server drops `rag_strategies` / `prompt` / `top_k` when one is set, to
avoid silently fighting it. (This powers audience personas.)

### `POST /api/search` → `POST {kb}/find` — semantic retrieval

Retrieval only, no generation. Body: `{ query, page_size, filters?, features?,
search_configuration? }`. Returns `{ resources: { rid: { title, fields: { …:
{ paragraphs: { pid: { text, score } } } } } }, best_matches }`. The UI flattens this to
ranked hits with the top-scoring paragraph as the snippet.

### `POST /api/catalog` → `POST {kb}/catalog` — faceted browse

A **metadata** query over resources (not semantic), so it stays fast and returns every
match with facet counts. Body: `{ query, page_size, page_number, show:
["basic","origin","extra"], faceted: ["/classification.labels/<labelset>", …] }`. Facet
paths are **discovered** from the KB's own labelsets (`GET {kb}/labelsets`) — the portal
is config-driven and does not assume a taxonomy. Facet counts come **live from the KB**,
never a stale local index. Filter format: `/classification.labels/<labelset>/<label>`.

### `POST /api/graph` → `POST {kb}/graph` — knowledge-graph path search

Returns subject/relation/object triples from the graph Nuclia built during processing.
Body: `{ query: { prop: "path", undirected?, source?: { value } }, top_k }`. Omit
`source` for the densest part of the graph; set it (with `undirected: true`) to explore
an entity's neighbourhood as either end of a relation. The server shapes the raw triples
into `{ nodes, edges }`: it drops noisy groups (`DATE`, `QUANTITY`, …), merges
surface-form variants of an entity onto one node, and drops nodes left with no edge.

### `GET /api/entities` → `GET {kb}/entitiesgroups` + `{kb}/entitiesgroup/<id>`

Entities Nuclia extracted, by group — powers the graph's entity suggestions. The bulk
listing returns empty entity maps, so each group is fetched individually.

### `GET /api/resource/:id` → `GET {kb}/resource/<id>?show=basic&show=values&show=origin&show=extra`

Full resource by id, used by the document drawer and citation "open source". `show=values`
is what returns the field **bodies** — without it every document reads as empty.

### Data-augmentation agents (`/api/augment/*` → `{kb}/predict/*`)

The enrichment side of ARAG — the same models Nuclia's **augmentation agents** run at ingest,
exposed live (KB-scoped `predict`, server-side token only). Powers the `augment` surface.

- `POST /api/augment/label` → `POST {kb}/predict/chat` — **Labeler**: given the content and the
  KB's own labelset values, returns which labels apply (classification into the real taxonomy).
- `POST /api/augment/graph` → `GET {kb}/predict/tokens` (typed **NER** entities) + `predict/chat`
  for subject–relation–object triples — **Graph** agent.
- `POST /api/augment/generate` → `POST {kb}/predict/chat` — **Generator**: synthetic Q&A pairs
  grounded strictly in the content.
- `POST /api/augment/source {id}` → the resource's extracted text (the "extract" step).

`predict/chat` returns plain text with a trailing status byte — strip it (`/\s*\d\s*$/`).
`predict/tokens?text=` returns `{ tokens: [{ text, ner, start, end }] }`. Both work with the KB
service-account token; no account NUA key needed.

### `GET /api/health` → `GET {kb}/counters`

The cheapest reachability probe; powers the KB-connected status chip. Returns
connectivity only — never the zone.

### `GET /api/config`

Serves `demo.config.json` **minus anything sensitive** — the `kb` block (env-var names)
is stripped and the zone is never emitted. No token ever appears here.

---

## Other surfaces (referenced, credential-gated)

| Surface | Endpoint | Credential | Portal behaviour |
|---|---|---|---|
| Agentic Workflows | retrieval-agent `/api/agent/session/ephemeral` | agent API key | Runs a grounded step-chain client-side; notes the managed agent for production |
| MCP | `{kb}/mcp/sse` | KB service-account | Shows tool list + client config with env placeholders (no zone) |
| AI Visibility | account `/api/v1/predict/chat?model=` | account NUA key | Renders the narrative; gates live scores on the NUA key |

---

## Token hygiene (Hard Rule 6)

The KB service-account token lives **only** in server-side env
(`NUCLIA_SERVICEACCOUNT`). It is never written to `demo.config.json`, never returned by
`/api/config`, never sent to the browser bundle, and never logged. `.env` is gitignored.
