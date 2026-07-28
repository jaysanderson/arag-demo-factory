# NUA API Reference (builder distillation)

The **Nuclia Understanding API** — the model-side of Progress Agentic RAG: Predict (chat,
embeddings, rephrase, summarize, tokens/NER, rerank, REMi), the Processing pipeline, the DA-agent /
task lifecycle, and the standalone **Retrieval Agent**. Distilled from the practitioner's guide
Appendix B (157 operations, 18 groups, generated from the `nua` v1 OpenAPI spec) down to what the
factory actually drives. When a field here isn't enough, Appendix B is the exhaustive per-field
reference and Appendix F is the schema catalog.

> Rule of thumb: **NUA is the key you already have.** The factory provisions with a NUA key + region;
> almost everything below is reachable with just that. The exceptions (data-plane read/write) need a
> KB service-account token — see [ARAG-REFERENCE.md](ARAG-REFERENCE.md).

## Host + auth

| | |
|---|---|
| **Host** | `https://{zone}.dp.progress.cloud/api/v1` (this account: `aws-ap-southeast-2-1`) |
| **Auth** | `X-NUCLIA-NUAKEY: Bearer {NUA_KEY}` (a NUA key; `Authorization: Bearer` also accepted) |
| **Common header** | `x-show-consumption: true` on Predict calls → returns token/cost accounting in the response |
| **Container variants** | Most Predict paths have a twin `/{kbid}` form (e.g. `/predict/chat/{kbid}`) that runs with **that KB's configured models/prompt** instead of NUA defaults. Use the `/{kbid}` form to mirror what the KB's own `/ask` would do. |

Send exactly one auth header. A NUA key is rejected on the global `rag.progress.cloud` API — NUA
calls must use the zonal `dp` host.

## Predict — the generative workhorse (23 ops)

`POST` unless noted. All accept `?model=` (override the generative/embedding model) and
`x-show-consumption`.

| Method · Path | Purpose | Key body / params |
|---|---|---|
| `POST /predict/chat` | Raw LLM chat with your context — the answer generator underneath `/ask`. | `question`* · `context[]` / `query_context{}` (the passages to ground on) · `system` · `user_prompt` · `chat_history[]` · `citations` (+`citation_threshold`) · `generative_model` · `max_tokens` · `json_schema` (structured output) · `prefer_markdown` · `query_context_images` (VLM) · `retrieval` (bool) |
| `POST /predict/rephrase` | Rewrite a query using history/context (query expansion before retrieval). | `question`* · `chat_history[]` · `context[]` · `user_context[]` · `prompt` (must contain `{question}`) · `generative_model` |
| `POST /predict/summarize` | Summarize one or many resources. | `resources{}`* (map→SummarizeResource) · `summary_kind` (`simple`\|extended) · `user_prompt` · `generative_model` |
| `GET /predict/tokens` | Tokenize + **NER** (named-entity extraction) for a string. | `?text=`* · `?model=` |
| `POST /predict/rerank` | Re-score candidate passages against the query. | `question`* · `user_id`* · `context{}` (map id→passage text) |
| `POST /predict/remi` | **REMi** answer-quality metrics: answer-relevance, context-relevance, groundedness (0–5). Drives the quality dashboard. | `user_id`* · `question` · `answer` · `contexts[]` |
| `POST /predict/sentences` | Batch embeddings. | `texts[]`* · `model` |
| `POST /predict/compat/embeddings` | OpenAI-compatible embeddings (`Predict Sentences`). | OpenAI embeddings shape |
| `POST /predict/compat/chat/completions` | **OpenAI-compatible** chat completions — drop-in for OpenAI SDKs. | OpenAI chat shape · `GET /predict/compat/models[/{id}]` to list |
| `GET /predict/sentence` · `POST /predict/query` | Single-sentence vector / query preprocessing (vector + entities + intent). `GET /predict/query` is **deprecated** → use `POST`. | `text` / query body |

Each of the above has a `/{kbid}` container twin that uses the KB's configured models.

## Processing — push content through the ingest pipeline (6 + 4 ops)

| Method · Path | Purpose | Key body / params |
|---|---|---|
| `POST /processing/push` | Send data to be processed (extract → chunk → embed → enrich). | `kbid` · `title` · `slug` · `labels[]` · `textfield{}` / `filefield{}` / `linkfield{}` / `conversationfield{}` · `processing_options` · `learning_config` · `webhook_config` |
| `POST /processing/upload` | Upload a binary (multipart) → returns an upload token to reference in `filefield`. | multipart file |
| `GET /processing/download` | Fetch a file referenced by an upload token. | `?token=` |
| `GET /processing/requests[/{id}]` | Poll status of processed / pending payloads for the zone. | — |
| `GET /processing/requests/{id}/results` | **SSE stream** of processed output for a processing id. | — |
| `POST /processing/tusupload` · `PATCH /processing/tusupload/{id}` | Resumable **TUS** upload for large files. | TUS protocol |

## DA-agents & Tasks — enrich at ingest (15 ops)

The ingestion-agent lifecycle. Authed with the **NUA key**. Read `GET /kb/{kb}/tasks` first — it
returns each agent's config schema, which you fill into `parameters`. Task API names
(`labeler`, `llm-graph`, `synthetic-questions`, `ask`, `llama-guard`, `prompt-guard`) and the
recommended starting set are in [ARAG-REFERENCE.md](ARAG-REFERENCE.md).

| Method · Path | Purpose | Key body / params |
|---|---|---|
| `GET /kb/{kb}/tasks` | List available agents/tasks **+ their config schemas**. | — |
| `POST /kb/{kb}/task/start` | Start one. | `name`* (TaskName) · `parameters` (DataAugmentation-Input, must match the task's schema) · `apply` (`EXISTING` backfill \| `NEW` continuous \| `ALL`, default ALL) · `enabled` · `uuid_task` (start a pre-configured one) |
| `GET /kb/{kb}/task/{id}/inspect` | Status/details of a running task. | — |
| `POST /kb/{kb}/task/{id}/enable` | Enable/disable (NEW-apply tasks only). | `enabled` |
| `POST /kb/{kb}/task/{id}/stop` · `/restart` · `/cleanup` | Stop (EXISTING workers) · restart · remove produced data. | — |
| `PATCH /kb/{kb}/task/{id}` · `DELETE /kb/{kb}/task/{id}` | Edit params (patchable tasks) · delete. | — |
| `GET /kb/{kb}/task/{id}/worker_config` | Inspect the worker config. | — |
| `.../dataset/{id}/task/...` | Same lifecycle (`start`/`stop`/`inspect`/`tasks`) scoped to a **dataset** instead of a KB. | — |

`SemanticModelMigrationParams` is also a valid `parameters` payload (re-embed on a model change).

## Retrieval Agent — agentic RAG as a service (28 + workflows 18 + prompts 5 + MCP 5)

A standalone, session-based agent (`/agent/{agent_id}/…`) with a preprocess → retrieve →
postprocess → generation pipeline, external **drivers**, editable prompts, and MCP exposure. This is
the "agent that plans and calls tools", distinct from the ingest-time DA-agents above.

**Pipeline stages** — each has `GET` (list) / `POST` (add) / `PATCH {id}` / `DELETE {id}`:

| Stage | Path | Role |
|---|---|---|
| Preprocess | `/agent/{agent_id}/preprocess[/{id}]` | rephrase / expand / route the query before retrieval |
| Postprocess | `/agent/{agent_id}/postprocess[/{id}]` | rerank / filter / dedupe retrieved context |
| Generation | `/agent/{agent_id}/generation[/{id}]` | compose the final grounded answer |
| Rules | `/agent/{agent_id}/rules` (`GET`/`POST`) | guardrails / routing rules |
| Drivers | `/agent/{agent_id}/drivers`, `PATCH`/`DELETE /driver/{driver}` | external data/tool connectors: `identifier`, `name`, `provider` (driver type, e.g. `google`, `marklogic`, SQL/Cypher/NucliaDB/internet), encrypted `config` |

**Sessions & interaction** (where you actually query the agent):

| Method · Path | Purpose | Key body / params |
|---|---|---|
| `POST /agent/{agent_id}/sessions` | Create a session. | `slug`* · `name`* · `summary`* · `data`* · `format`* (TextFormat) |
| `GET /agent/{agent_id}/sessions` · `GET /session/{s}` | List / fetch. | — |
| `POST /agent/{agent_id}/session/{s}` | **Ask the agent** (interaction). | `question`* · `chat_history[]` (client-managed; overrides server history when set) · `arguments{}` · `headers{}` · `operation` · `streaming` (bool) |
| `PATCH`/`DELETE /session/{s}` | Update / delete session. | — |

**Workflows** (18) — named, versioned pipeline variants: `/agent/{agent_id}/workflow/{wid}` with the
same `preprocess`/`postprocess`/`generation`/`rules` sub-resources, plus
`POST /agent/{agent_id}/workflow/{wid}/session/{s}` to run a session through a specific workflow.

**Prompts** (5) — `GET/POST /agent/{agent_id}/prompts`, `GET/PATCH/DELETE /prompt/{id}`: version and
hot-edit the agent's prompts without redeploying.

**MCP** (5) — expose the agent (or a KB) as an **MCP server**:
`GET/POST/DELETE /agent/{agent_id}/session/{s}/mcp` and `GET/POST /kb/{kbid}/mcp`.

**Ops** — export/import an agent config (`POST /agent/{agent_id}/export` \| `/import` with
`overwrite`), and audit-log downloads (`POST /agent/{agent_id}/audit/interactions/download`, then
`GET .../download_request/{id}/status`).

## Models, KB config & strategies (builder-relevant subset)

| Method · Path | Purpose |
|---|---|
| `GET /schema` · `GET /schema/{kbid}` · `GET /learning/configuration/schema` | JSON-schema for the `learningconfiguration` field — the menu of valid model/pipeline settings when creating/updating a KB. |
| `GET /config/{kbid}` · `POST`/`PATCH`/`DELETE` | Read/set the models assigned to a KB (generative, embedding, etc.). |
| `GET /generative_providers/{kbid}` | All available generative models for a KB, grouped by provider — use to populate a model picker. |
| `GET /account/{account_id}/models` · `/schema` · `/default_models` | Trained/public models and the KB-creation schema at account scope. |
| `GET/POST/DELETE /extract_strategies/{kbid}` · `/split_strategies/{kbid}` | Custom extract / chunk-split strategies (on-prem style config). |
| `GET/POST /account/{account_id}/datasets`, `PUT /dataset/{id}/partition/{pid}` | Datasets + partition upload (training/eval data). |
| `GET /collect/feedback/{kbid}[/{month}]` | Export end-user feedback as CSV (feeds quality review). |
| `.../assume_role/bedrock` | AWS Bedrock BYO-model auth flow (account scope). |

## whoami / account-self — the answer is NO

**There is no NUA endpoint that returns a key's own account id + zone.** Reviewed all 18 groups /
157 operations: no `/whoami`, `/me`, `/account/self`, or account-status route exists. The only
`/status` path is `GET /agent/{agent_id}/audit/download_request/{request_id}/status` (per-request
audit status, unrelated). Every account-scoped call —
`GET /account/{account_id}/models`, `/account/{account_id}/schema`, etc. — **already requires
`account_id` in the path**, so none can be used to *discover* it.

Implication for the factory: a NUA key + region alone cannot self-resolve the account UUID from the
NUA API. The account id must be obtained out-of-band — supplied by the operator, read from the
dashboard/global API with an account token, or decoded from wherever the key was minted. Zone is
already an input (it's the host). If a "key + region only" flow is a hard requirement, the account
id has to come from a non-NUA source.

---
*Source: "Building Solutions with Progress Agentic RAG", Appendix B — NUA API Reference (157
operations, `nua` v1 OpenAPI), cross-checked against this project's verified runs. Update this file
when a build hits an endpoint not covered.*
