# Retrieval & RAG reference

The heart of every demo. This is the working reference for driving Progress Agentic RAG's
retrieval — `/find`, `/search`, and the cited-answer `/ask` — plus the configuration cookbook that
tunes them per use case. Distilled from the practitioner's guide (Ch. 9 Retrieval Fundamentals,
Ch. 10 The `/ask` Endpoint, Ch. 13 Configuring RAG). Build FROM these settings; don't reverse-engineer
the endpoints.

> **The one law.** An answer the executive can't trust is a failed demo. Every `/ask` in a demo runs
> with **neighbouring-paragraph context ON and `citations: true`** — an uncited answer is a bug, and a
> refusal (`no_context`) is a correct, first-class outcome, not a failure. Everything below serves that.

## Hosts & auth (get these right every time)

| Call | Host | Auth header |
|---|---|---|
| `/find`, `/search`, `/ask`, `/suggest`, resources | `{zone}.rag.progress.cloud/api/v1` (RAG data plane) | `X-NUCLIA-SERVICEACCOUNT: Bearer <token>` |
| **search_configurations** (create/manage) | `{zone}.dp.progress.cloud/api/v1` | same service-account token, role **OWNER** |

`{zone}` for this account is `aws-ap-southeast-2-1`. The portal server proxies the data plane; the UI
never holds a token. (The published guide's curl samples show the `dp` host + `Authorization: Bearer`
for `/find`/`/ask` — that's drift; use the `rag` host + `X-NUCLIA-SERVICEACCOUNT` here.)

---

## 1. `/find` and `/search` — getting the right passages

Two retrieval endpoints. Both take GET (query in URL) and POST (JSON body); **use POST** for anything
non-trivial. `/find` is what `/ask` calls internally.

| Endpoint | Returns | Use when |
|---|---|---|
| `/find` | Results **grouped by resource**, with best paragraphs + a `best_matches` ranking | RAG context or a search UI — the modern default |
| `/search` | **Flat** `paragraphs` / `resources` / `sentences` blocks with scores | You need raw, ungrouped result sets |

### Hybrid retrieval — the `features` array

Default `["keyword","semantic"]` runs both and fuses the lists.

| Feature | Index | Good at |
|---|---|---|
| `keyword` | BM25 lexical | Exact terms, names, codes, acronyms, SKUs |
| `semantic` | Vector | Meaning, paraphrase, synonyms, cross-lingual matches |
| `relations` | Knowledge graph | Entities related to the query (boosts recall) |
| `graph` | Graph paths | Structured graph traversal (Ch. 12) |

### Parameters by job (`/find` has 33; these are the ones you reach for)

**1 — What is *eligible*?**

| Param | Default | Controls |
|---|---|---|
| `query` | — | Natural-language query |
| `features` | `[keyword,semantic]` | Which indexes to search |
| `fields` | `[]` | Restrict to fields, e.g. `a/title`, `t/body` |
| `filter_expression` | — | Composable AND/OR/NOT over labels, slugs, dates, origin (below) |
| `security` | — | Caller's `groups`, for row-level per-resource security |
| `vectorset` | — | Which vector index (multi-model KB) |
| `with_synonyms` | `false` | Expand query with the KB's custom synonyms |
| `show_hidden` | `false` | Include resources marked hidden (admin/staging views) |
| `range_creation_*` / `range_modification_*` | — | Time-window the candidate set |

**2 — How much *context*, in what order?**

| Param | Default | Controls |
|---|---|---|
| `top_k` | `20` | Results retrieved (max 200) |
| `min_score` | — | Drop results below this; settable per index (`{bm25, vector}`) |
| `rank_fusion` | `rrf` | How keyword + semantic lists merge (RRF rewards ranking well in *both*) |
| `reranker` | `predict` | Second-pass model reordering of the fused top — the platform's reranker |
| `with_duplicates` | `false` | Return duplicate paragraphs instead of collapsing |

**3 — Output shape.**

| Param | Default | Controls |
|---|---|---|
| `rephrase` / `rephrase_prompt` | `false` | Rewrite query before retrieval |
| `highlight` | `false` | Wrap matched terms in returned text (great for review UIs) |
| `show` | `[basic]` | Resource metadata blocks to serialize (`basic`, `values`, …) |
| `search_configuration` | — | Load params from a stored named config (§4) |

The defaults — **hybrid features, RRF fusion, predict reranking** — are strong. Tune `top_k` and
`min_score` first; only touch fusion/reranking with evidence the ordering is failing.

### Filtering with `filter_expression`

The modern, composable filter — supersedes flat `filters`/`fields`/`range_*`/`resource_filters`.
Prefer it for anything new; don't mix with the legacy flat params.

```js
// Scope to one resource by slug
{ query: "energy", filter_expression: { field: { prop: "resource", slug: "battery-storage" } }, top_k: 5 }

// The workhorse: filter by a label an ingestion agent applied (Ch. 8)
{ query: "outages", filter_expression: { field: { prop: "label", labelset: "severity", label: "High" } } }
```

### Response shape — the retrieval currency

```js
{
  resources: { "86b5f794…": { slug: "battery-storage", title: "Home Battery Storage", … } },
  best_matches: [ "ca2a8f3b…/t/body/0-301", "86b5f794…/t/body/0-336" ],  // ranked paragraph ids
  total: 4
}
```

A paragraph id is `resource-id / field-type / field-id / char-range` (e.g. `…/t/body/0-301`). That
identifier is what citations point at. `resources → fields → paragraphs`, each paragraph carrying its
`score`; `best_matches` is the cross-resource ranked list — iterate it, not the resource map, for order.
For search-as-you-type, `/suggest?query=<prefix>` is far cheaper than a `/find` per keystroke (Ch. 11).

---

## 2. `/ask` — generative, cited answers

`/ask` runs the full `/find` retrieval, assembles a context, sends it + the question to a generative
model, and returns the answer with citations. It accepts **every `/find` parameter** plus generation
controls. It streams NDJSON by default; send `X-Synchronous: true` to get one JSON blob.

### Generation controls

| Param | Effect |
|---|---|
| `prompt` | Your template, with `{context}` and `{question}` placeholders — the highest-leverage guardrail |
| `generative_model` | Override the KB's LLM for this request (route hard questions to a stronger model) |
| `citations` | Return the source-paragraph → answer-span map — **always on for demos** |
| `citation_threshold` | Min confidence for a citation (higher = fewer, stronger; too high = uncited → flagged ungrounded) |
| `rag_strategies` | Shape *what context* is assembled (below) — the biggest lever on answer completeness |
| `max_tokens` | Cap answer length (int) or context too (`{answer, context}` object) |
| `answer_json_schema` | Force a validated JSON object instead of prose (structured extraction) |
| `chat_history` | Prior turns (`{author: USER\|NUCLIA, text}`) so follow-ups are rephrased in context |
| `reasoning` | Enable model reasoning for harder questions (`false` default) |
| `prefer_markdown` | Ask for Markdown-formatted output |
| `generate_answer` | `false` = retrieve + assemble context but skip generation (bring-your-own-LLM) |
| `extra_context` | Inject passages not in the KB into the context |

### RAG strategies — shaping the context

By default `/ask` sends the top matched **paragraphs**. That's the #1 cause of a correct-but-incomplete
answer: the fact was in the matched paragraph but the number was in the sentence beside it.

| Strategy | Sends to the model |
|---|---|
| `neighbouring_paragraphs` (`before`, `after`) | Matched paragraph **+ the ones around it** — cheapest quality win |
| `full_resource` (`count`) | The **entire text** of the top N resources — whole-document reasoning |
| `hierarchy` | Matched paragraph + its surrounding document structure |
| `field_extension` | Specific extra fields of the matched resources |
| `metadata_extension` | Resource metadata into the context |
| `graph` | Expand context along knowledge-graph relations |
| `prequeries` | Run predefined queries first, add their results to context |

`neighbouring_paragraphs` is the house default (see §3). `full_resource` grounds slightly better but
ships 900–1500-word documents per question — expensive, and a few matches overflow the context; keep
`top_k` low (1–2) when you use it.

### The NDJSON stream

Omit `X-Synchronous` and `/ask` streams newline-delimited items — parse `JSON.parse(line).item`:

| `item.type` | Payload |
|---|---|
| `answer` | One chunk of answer text (many) — render as they arrive |
| `retrieval` | The retrieval results that grounded the answer |
| `citations` | The source → answer-span map — show sources when this arrives |
| `augmented_context` | Any extra context assembled |
| `status` | Final `{code, status}` (e.g. `success`, `no_context`) |
| `metadata` | Input/output token counts (raw + billing units) and timings — **log it** for cost/latency |

### Two must-handle outcomes

- **`status: "no_context"`** → retrieval found nothing relevant; the platform returns *"Not enough data
  to answer this."* rather than inventing. This is the anti-hallucination guardrail. Treat it as a
  first-class result, not an error — in the UI it lands as a refusal with zero citations.
- **`answer_json_schema` set** → the prose `answer` comes back **empty**; the structured result is in
  `answer_json`. Parse `answer_json`, ignore `answer`.

`POST /kb/{kb}/resource/{rid}/ask` (and its by-slug twin) confines retrieval to one resource — the
"chat with this document" feature, same generation params.

---

## 3. The house grounding default (portal)

The portal (`portal/server/retrieval.mjs`, from the shipped `rp-grdc/server/retrieval-config.js`)
applies one policy to every `/api/ask` so demos ground reliably out of the box:

```js
{
  top_k: 20,                                                    // paragraphs before generation
  rag_strategies: [{ name: 'neighbouring_paragraphs', before: 2, after: 2 }],
  citations: true,
  citation_threshold: 0.25                                     // measured-good middle for this corpus class
}
```

Why: Nuclia's defaults hand the model **isolated top-scoring paragraphs**, which reliably
under-answer — a value in a table row arrives without the prose that explains it, and correct
retrieval (0.84–0.95 similarity) still yields *"not enough data."* Neighbouring ±2 fixes that far more
cheaply than `full_resource`. Citations are **off by default** in Nuclia; here an uncited answer is
surfaced as an explicit *ungrounded* warning, not shown as trustworthy prose. `citation_threshold`
tunes how strongly a passage must support a sentence: lower surfaces more (weaker) sources, higher
risks citing nothing.

The system prompt is domain-neutral (one shell, every demo) but strict: answer only from context and
name what's missing; be specific and quantitative with units; attribute results to their source;
surface disagreement rather than settling it. An optional `persona` from `demo.config.json` is woven in
**without** loosening those rules. `scripts/verify.mjs` checks two opposing properties — answerable
questions answered *with citations* (`cornerstoneQueries`), and unsupported questions *refused*
(`refusalProbes`). Adjust the four numbers in one place; the proxy applies them everywhere.

> When a demo enables **personas**, answers are scoped by a named `search_configuration` (§4) instead
> of a per-request prompt. That stored config is authoritative — it carries its own strategy + prompt —
> so the server drops the local `rag_strategies`/`prompt`/`top_k` when one is set, so two configs never
> silently fight. One KB, different answers per audience.

---

## 4. RAG configuration cookbook (Ch. 13)

There is no single best config — a support bot that must never guess and a research tool that must
never miss want opposite settings. Reason in **three questions, top to bottom**: (1) what's *eligible*
(`features`, `filter_expression`, `security`, `fields`), (2) how much *context* reaches the model
(`top_k`, `min_score`, `reranker`, `rag_strategies`), (3) how it *answers* (`prompt`,
`generative_model`, `citations`, `answer_json_schema`). Wrong answers are almost always a question-1-or-2
fault — fix eligibility and context before touching the prompt.

### Decision table

| If you need… | Set |
|---|---|
| Max accuracy, no guessing | Low `top_k` (5–8) · hybrid features · `reranker: predict` · strict `prompt` · `citations: true` |
| Max recall (miss nothing) | High `top_k` (30–50) · add `relations` to features · no `min_score` · consider `full_resource` |
| Complete, non-fragmented answers | `rag_strategies: neighbouring_paragraphs` (or `hierarchy`) |
| Whole-document reasoning | `rag_strategies: full_resource` with low `top_k` |
| Structured output for a pipeline | `answer_json_schema` (read `answer_json`) |
| Multi-turn chatbot | `chat_history` · `rephrase: true` · `citations: true` |
| Exact-match lookup (codes, SKUs) | `features: [keyword]` · target `fields` · synonyms off |
| Lowest latency / cost | Small `top_k` · cap `max_tokens` · cheaper `generative_model` · stream |
| Bring-your-own LLM | `generate_answer: false` — generate elsewhere from the returned context |
| Tenant isolation in a shared KB | `security.groups` + `filter_expression` on a tenant label |

### Recipes (each tested against the live sandbox)

**Precise factual Q&A** (support, compliance) — a trustworthy answer or an honest "I don't know":
```js
{ query, features:["keyword","semantic"], top_k:6, reranker:"predict", citations:true, max_tokens:300,
  prompt:"Answer ONLY from the context. If it doesn't contain the answer, say you don't know. Be concise. Context: {context} Question: {question}" }
```
Low `top_k` keeps noise out; `predict` puts the best passage first; the prompt is the guardrail; the
platform returns `no_context` rather than inventing even without it.

**High-recall research** (discovery, e-discovery) — use `/find`, not `/ask`; you want ranked evidence,
not one synthesis:
```js
{ query, features:["keyword","semantic","relations"], top_k:40, rank_fusion:"rrf", highlight:true, show:["basic","values"] }
```

**Whole-document answers** (contracts, policies) — `{ top_k:2, rag_strategies:[{name:"full_resource", count:1}] }`.

**Non-fragmented snippets** (the cheapest quality win, and the house default) —
`{ rag_strategies:[{name:"neighbouring_paragraphs", before:1, after:1}] }`. Reach for this first whenever answers feel truncated.

**Structured extraction** — `answer_json_schema` with a JSON-Schema `parameters` block; parse `answer_json`, ignore `answer`.

**Conversational** — `{ rephrase:true, citations:true, chat_history:[…] }`. History changes retrieval:
if the rephrased query drifts off-corpus you can get `no_context` where a direct question answered —
tune `chat_history_relevance_threshold`.

**Exact-match lookup** — `{ features:["keyword"], fields:["a/title","t/body"] }`. BM25 only, no query embedding — the cheapest query type.

**Multilingual** — `{ features:["semantic","keyword"], rephrase:true }`; semantic does the cross-lingual
work, keyword catches language-agnostic names/codes. Confirm the KB's semantic model is multilingual.

**Lowest cost** — `{ top_k:3, max_tokens:150, generative_model:"<cheaper>", prefer_markdown:true }`,
streamed. Set a cheap model as the KB default; override `generative_model` per request only for hard questions.

**Multi-tenant** — `{ security:{groups:["tenant:acme"]}, filter_expression:{field:{prop:"label", labelset:"tenant", label:"acme"}} }`
with `enforce_security` on the KB. **Test isolation adversarially** — a missing `security` block is a
data leak, not a cosmetic bug; prefer a KB per tenant when isolation outweighs overhead.

Real demos compose recipes — a support assistant blends the strict prompt (1), neighbouring paragraphs
(4), chat history (6), and security scoping (11) in one request. Start from the closest recipe, borrow
the rest.

### Saving a config — `search_configurations`

Store the settings you land on as a **named search configuration** so app code stays a one-liner and
you retune without a redeploy. On the **`dp` host, role OWNER**:

| Verb | Route | Body |
|---|---|---|
| `GET` | `/kb/{kb}/search_configurations` | — (list) |
| `POST` | `/kb/{kb}/search_configurations/{name}` | `{ kind: "find"\|"ask", config: { …find/ask params… } }` |
| `PATCH` / `DELETE` | `/kb/{kb}/search_configurations/{name}` | update / remove |

Then name it on any call: `{ query, search_configuration: "<name>" }`. The stored config supplies the
defaults; **anything you pass in the request overrides it**. Every demo should ship at least one
(`scripts/create-retrieval.mjs`); the portal defaults to one via `NUCLIA_SEARCH_CONFIG`. Personas
(§3) are just multiple named configs over one KB.

---

*Source: Building Solutions with Progress Agentic RAG — Ch. 9 (Retrieval Fundamentals: /find and
/search), Ch. 10 (Generative Answers: The /ask Endpoint), Ch. 13 (Configuring RAG for Your Use Case);
hosts/auth and the portal grounding policy cross-checked against this project's verified runs
(`docs/ARAG-REFERENCE.md`, `portal/server/retrieval.mjs`).*
