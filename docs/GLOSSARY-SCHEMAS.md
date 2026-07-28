# ARAG Glossary + Load-Bearing Schemas (builder distillation)

The vocabulary and the request/response shapes a builder actually constructs or parses. Distilled
from the practitioner's guide **Appendix E** (glossary, enums, identifiers) and the load-bearing
subset of **Appendix F** (the ~1,140-schema catalog — only the schemas you build or read are here).
Pairs with `docs/ARAG-REFERENCE.md` (hosts, auth, provisioning) and `docs/RETRIEVAL.md`.

> Rule of thumb: **know these terms and shapes before you touch an endpoint.** If a field isn't
> here, it's a knob you probably don't need for a demo — reach for Appendix F only then.

## Glossary — the terms a builder must know

| Term | What it is |
|---|---|
| **Account** | Billing/ownership boundary; holds users + KBs. UUID + slug. Use the **UUID** in provisioning paths. |
| **Zone** | Geographic region a KB lives in (this account: `aws-ap-southeast-2-1`). A KB belongs to exactly one. |
| **Knowledge Box (KB)** | The content + index + config container, fully isolated. Identified by `kbid`. |
| **Resource** | One content item (doc/page/image/audio/video/text) + metadata. Has a `uuid`, optional `slug`. |
| **Field** | A typed value inside a resource: `text`, `file`, `link`, `conversation`, `key_value`. A resource holds several. |
| **Paragraph** | The **retrievable unit** — a text block a field is split into at processing. Indexed for keyword + semantic. |
| **Vector / Vectorset** | An embedding of a paragraph; a `vectorset` is a named vector index (per model), chosen with the `vectorset` param. |
| **Label / Labelset** | A tag (`label`) inside a named group (`labelset`); drives filters and facets. Written as `labelset/label`. |
| **Entity / Entity group** | A named thing (person/org/place/product) from NER or defined by you; grouped as `ORG`, `GPE`, `DATE`, … |
| **Relation** | A typed edge between entities/resources — the knowledge graph. Types: `ABOUT, CHILD, COLAB, ENTITY, OTHER, SYNONYM`. |
| **Processing** | Async NUA pipeline: extract text (OCR/STT), detect language, split paragraphs, run NER, compute vectors. |
| **NUA** | Nuclia Understanding API — processing + Predict. No KB involved; nothing stored. |
| **Predict** | NUA models run directly: embeddings, tokens/NER, LLM chat, query analysis, rerank, REMi. |
| **Ingestion agent** | A Data-Augmentation agent that enriches at ingest — labeler, generator, graph, Q&A, guards. |
| **Retrieval Agent (RAO)** | Configurable multi-source/multi-step agent (drivers + workflow) above a KB's fixed pipeline. |
| **Driver** | A source given to a Retrieval Agent — a KB, SQL/Snowflake, pandas, internet search, or MCP server. |
| **RAG strategy** | How `/ask` assembles LLM context: `full_resource`, `neighbouring_paragraphs`, `hierarchy`, `graph`, … |
| **REMi** | RAG Evaluation Metrics model — scores Answer Relevance, Context Relevance, Groundedness (the RAG triad). |
| **Service account** | Non-human KB identity with a role; its keys authorize data/search calls. |
| **NUA key / PAT** | NUA credential (`X-NUCLIA-NUAKEY`); PAT = long-lived user token, works on all four APIs. |

**Response identifiers** — every citation and match is one of these compound ids:

| Form | Meaning | Example |
|---|---|---|
| `<rid>` | Resource UUID | `ca2a8f3bf186491facde30cdb2fbc2b6` |
| `<rid>/<ft>/<field>` | A field in a resource; `ft` = field-type letter | `ca2a…/t/body` |
| `<rid>/<ft>/<field>/<start>-<end>` | A **paragraph** — char range within a field | `ca2a…/t/body/0-301` |

Field-type letters: `t` text · `f` file · `u` link · `a` generic/title · `c` conversation. A citation
maps one paragraph id to the answer span(s) it supports. (Appendix E.)

**Enums you set most often** (Appendix E):
- `features` — find (`FindOptions`): `keyword, semantic, relations, graph`. ask (`ChatOptions`): `keyword, semantic, relations` (graph via the graph RAG strategy).
- `show` (`ResourceProperties`): `basic, values, extracted, origin, extra, relations, security, errors`. Default `[basic]`.
- text `format` (`TextFormat`): `PLAIN, HTML, MARKDOWN, KEEP_MARKDOWN, RST, JSON, JSONL, PLAIN_BLANKLINE_SPLIT`.
- `rag_strategies[].name`: `full_resource, field_extension, hierarchy, neighbouring_paragraphs, metadata_extension, conversational, prequeries, graph`. Image: `page_image, paragraph_image, table_image`.
- `rank_fusion`: `rrf` (default). `reranker`: `predict` (default). Both accept an object form for tuning.
- SA roles: `SREADER, SWRITER, SCONTRIBUTOR, SOWNER`. KB user roles: `READER, WRITER, MANAGER`.

---

## Retrieval requests — `/find` and `/ask`

**FindRequest** (POST `/kb/{kb}/find`) — ranked search, no generation. All fields optional.

| Field | Type | Note |
|---|---|---|
| query | string | The search text. |
| features | array\<FindOptions\> | Default `['keyword','semantic']`. Add `relations`/`graph`. |
| top_k | integer | Default 20, max 200. |
| filters / keyword_filters | array\<string\|Filter\> | Label/facet filters, e.g. `/classification.labels/topic/pricing`. |
| filter_expression | FilterExpression | Complex boolean filter; replaces `filters`/`range_*`/`fields`. |
| fields | array\<string\> | Restrict search to fields, e.g. `a/title`. |
| range_creation_start/end, range_modification_start/end | string (ISO 8601) | Date-window filters. |
| show / field_type_filter | arrays | What to serialize on returned resources. |
| min_score | number\|MinScore | Drop low-score hits; float or `{bm25, vector}`. |
| rank_fusion / reranker | see enums | Merge + rerank strategy. |
| vectorset | string | Pick a non-default vector index. |
| graph_query | GraphPath query | Extend results via graph paths from matched paragraphs. |
| highlight | boolean | Wrap query terms in `<mark>…</mark>`. |
| search_configuration | string | Load a saved find config; **request fields override it**. |

**AskRequest** (POST `/kb/{kb}/ask`) — retrieval **+** generation, streamed NDJSON. Superset of Find; only `query` required. Adds:

| Field | Type | Note |
|---|---|---|
| chat_history | array\<ChatContextMessage\> | `{author: NUCLIA\|USER, text}` — prior turns, used to rephrase. |
| rag_strategies | array | Context assembly (see enums). `full_resource` cannot combine with `hierarchy`/`neighbouring_paragraphs`. |
| rag_images_strategies | array | `page_image, paragraph_image, table_image` for visual LLMs. |
| prompt | string\|CustomPrompt | `CustomPrompt{system, user, rephrase}`; `{context}`/`{question}` placeholders. |
| citations | boolean\|CitationsType | `CitationsType`: `none, default, llm_footnotes`. **Turn on — ungrounded answers are a bug.** |
| citation_threshold | number 0–1 | Lower = more citations. |
| generative_model | string | Override the KB default LLM. |
| answer_json_schema | object | Force a structured JSON answer (suppresses prose). |
| max_tokens | integer\|MaxTokens | Cap context and/or answer tokens. |
| reasoning | boolean\|Reasoning | Enable model reasoning trace. |
| generate_answer | boolean | Default true; false = retrieval only. |
| extra_context | array\<string\> | Inject text not in the KB into the LLM context. |
| search_configuration | string | Load a saved ask config; request fields override. |

## Retrieval responses

**KnowledgeboxFindResults** (the `/find` body, and `SyncAskResponse.retrieval_results`):

| Field | Type | Note |
|---|---|---|
| resources | map\<rid, **FindResource**\> | Keyed by resource id. |
| best_matches | array\<string\> | **Paragraph ids, most-relevant first — the render order.** |
| relations | Relations | Graph edges (see below). |
| total, query, rephrased_query, min_score | — | Result metadata. |

- **FindResource**: `id, slug, title, summary, icon, created, modified, metadata, usermetadata, computedmetadata, origin, relations, security,` and `fields: map<string, FindField>`.
- **FindField** → `paragraphs: map<string, FindParagraph>`.
- **FindParagraph**: `score, score_type, order, text, id, labels[], position, is_a_table, page_with_visual, reference` (extracted-image id), `relevant_relations` (only with graph strategy). **`id` is the `<rid>/<ft>/<field>/<start>-<end>` you match against `best_matches` and citations.**

**SyncAskResponse** (the assembled `/ask` result):

| Field | Type | Note |
|---|---|---|
| answer | string | The generative answer. |
| answer_json | object | Present iff `answer_json_schema` was sent. |
| status | string | `success \| error \| nocontext \| noretrievaldata`. |
| retrieval_results | KnowledgeboxFindResults | The grounding hits (shape above). |
| retrieval_best_matches | array\<AskRetrievalMatch\> | `{id}` best blocks incl. prequeries. |
| citations | map | **Reference → resource/paragraph id.** Render these. |
| citation_footnote_to_context | map\<string,string\> | Footnote id → context key (paragraph id). |
| relations | Relations | Detected graph edges of the answer. |
| augmented_context | AugmentedContext | Extra blocks added by RAG strategies. |
| learning_id | string | Feed to the feedback endpoint. |
| metadata | SyncAskMetadata | Token counts (`AskTokens{input,output}`) + timings. |
| error_details | string | Set on error. |

**Relations**: `{ entities: map<entity, EntitySubgraph> }` — the graph payload behind related-content and graph surfaces.

## search_configuration body (saved retrieval configs)

POST `/kb/{kb}/search_configurations/{name}` on the **dp** host (role OWNER). Body:

| Field | Type | Note |
|---|---|---|
| kind | string | `find` or `ask`. |
| config | FindConfig \| AskConfig | The find/ask params (`features, reranker, top_k, show, rag_strategies, generative_model, prompt, citations`, …) — same field names as the request. |

Request-time params **override** the named config. Ship ≥1 per demo; portal default is `NUCLIA_SEARCH_CONFIG`. (See `docs/ARAG-REFERENCE.md`.)

---

## Data-Augmentation agents (ingestion "tasks")

Start on the **NUA API** (dp host, NUA key): `POST /kb/{kb}/task/start` with
`{ name: <TaskName>, parameters: <DataAugmentation-Input>, apply: EXISTING|NEW|ALL, enabled: true }`.
`GET /kb/{kb}/tasks` returns each agent's config schema — read it to build `parameters`.

**TaskName** (enum): `dummy, env, demo-dataset, labeler, llm-graph, synthetic-questions, ask, llm-align, semantic-model-migrator, llama-guard, prompt-guard, memory`. The builder five: `labeler, llm-graph, synthetic-questions, ask, llama-guard`/`prompt-guard`. (Dashboard↔API name map in `ARAG-REFERENCE.md`.)

**DataAugmentation-Input** (the `parameters`):

| Field | Type | Note |
|---|---|---|
| name | string | Agent name. |
| on | ApplyTo | `0` = paragraphs, `1` = whole fields. |
| filter | Filter | Restrict which content the agent touches. |
| operations | array\<**Operation**\> | One or more of the operation objects below. |
| llm | LLMConfig | Model config for the agent. |
| filter_expression_json | string | Takes precedence over `filter` if set. |

**Operation** is a tagged union — set exactly one key: `graph, label, ask, qa, extract, prompt_guard, llama_guard, memory`.

| Operation | Key fields | Produces |
|---|---|---|
| **LabelOperation** | `ident`(req), `labels: array<Label>`, `description`, `multiple`, `triggers` | Classification labels → facets. `Label{label, description, examples[]}`. |
| **GraphOperation** | `ident`(req), `entity_defs: array<EntityDefinition>`, `examples`, `triggers` | Entities + relations → `/graph`, related. |
| **QAOperation** | `max_questions`(20), `question_generator_prompt`, `summary_prompt`, `generate_answers_prompt`, `triggers` | Synthetic Q&A pairs → richer retrieval. |
| **AskOperation** | `question`(req), `destination`(req), `json`, `user_prompt` (needs `{context}`), `store_as_key_value`, `kv_schema_id`, `triggers` | Summaries / structured JSON per field. |
| **GuardOperation** | `enabled`, `triggers` | Safety flags — `llama_guard` (content) / `prompt_guard` (jailbreak). |

`Trigger{url, headers, params}` = optional webhook per operation. `apply`: `EXISTING` backfills, `NEW` runs on new content, `ALL` both. (See `scripts/create-da-agents.mjs`.)

---

## Resource-create body (ingestion)

POST `/kb/{kb}/resources` — **CreateResourcePayload**:

| Field | Type | Note |
|---|---|---|
| title, summary, slug, icon | string | `slug` = your user-defined id; `icon` a media-type string. |
| texts | map\<fieldid, **TextField**\> | Inline text fields. Field ids match `^[a-zA-Z0-9:-]+$`. |
| files | map\<fieldid, **FileField**\> | Binary/document fields. |
| links | map\<fieldid, **LinkField**\> | URL fields (crawled at processing). |
| conversations / key_values | maps | Chat + structured KV fields. |
| usermetadata | **UserMetadata** | `{ classifications: array<UserClassification>, relations[] }`. |
| origin | InputOrigin | Source-system metadata; most fields become search filters. |
| metadata / extra | InputMetadata / Extra | Structured metadata (returned on retrieval; not queryable). |
| hidden, security | — | Visibility + access-group control. |

Field shapes:
- **TextField**: `body`(req, total text fields ≤ 2MB), `format` (`TextFormat`, default `PLAIN`), `extract_strategy`, `split_strategy`.
- **LinkField**: `uri`(req), `headers, cookies, css_selector, xpath, language, extract_strategy`.
- **FileField**: `file`(req, a `File`), `language, password, extract_strategy`.
- **UserClassification** (a classification you apply): `labelset`(req), `label`(req), `cancelled_by_user`. (`Classification` in responses is just `{labelset, label}`.)

Classifications set here become the `filters`/facets you query at retrieval — the label→facet loop that lights up the demo's filter UI.

---

Source: practitioner's guide **Appendix E** (Glossary and Schema Reference) and the load-bearing
subset of **Appendix F** (Complete Schema Catalog); cross-checked against `docs/ARAG-REFERENCE.md`.
