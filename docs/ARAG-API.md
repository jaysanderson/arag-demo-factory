# ARAG API — the data & management endpoint reference

THE endpoint reference for the ARAG Demo Factory. Everything the orchestrator needs to
provision a Knowledge Box and drive it — grouped by API surface, with method · path · purpose ·
key params · auth/role on every group. Distilled from the practitioner's guide Part 7 appendices
(A NucliaDB · C Zone · D Global), which are OpenAPI-accurate and live-tested against a sandbox in
`aws-ap-southeast-2-1`. For the *why* and the provisioning narrative, read the sibling
[`ARAG-REFERENCE.md`](./ARAG-REFERENCE.md); this file is the *what/where*.

> Rule of thumb: **read this before reverse-engineering an endpoint.** If a call isn't here, it's
> almost certainly a resource/field CRUD variant of one that is, or a NUA-processing endpoint
> (Appendix B, out of scope here).

---

## Hosts (three, per zone)

| Host | Serves | Auth it accepts |
|---|---|---|
| `https://{zone}.rag.progress.cloud/api/v1` | **RAG data plane** — `/find`, `/ask`, `/catalog`, `/graph`, `/suggest`, `/summarize`, `/counters`, resources. Portal convention. | KB service-account token |
| `https://{zone}.dp.progress.cloud/api/v1` | **NucliaDB management + NUA surface** — **`search_configurations`**, the whole **Zone API** (KB lifecycle, service accounts/keys, connectors, backups, activity/REMi), **DA-agent tasks**, processing. | NUA key *or* KB token *or* PAT (per endpoint) |
| `https://rag.progress.cloud/api/v1` (global, **no zone prefix**) | **Account/user/zone management** — create account, list accounts, whoami, zones. | User token / PAT only — **rejects NUA keys** |

`{zone}` for this account: **`aws-ap-southeast-2-1`**.

**Reconciliation / drift notes (important):**
- The two *zone* gateways (`rag` and `dp`) front the same NucliaDB. The guide live-tested the entire
  data plane on `{zone}.dp.progress.cloud`; the portal calls it on `{zone}.rag.progress.cloud`.
  Data-plane reads work on either — **use `rag` for retrieval** (portal convention), **`dp` for the
  management routes** that only exist there (`search_configurations`, `tasks`, `processing`).
- **KB creation is a *zone* op, not global.** `POST /account/{account_id}/kbs` runs on
  `{zone}.dp.progress.cloud` **and accepts the NUA key** (verified 2xx). Only **account** creation is
  global/PAT-only. (Older notes calling KB creation a "global `rag`" op are wrong — corrected here.)
- The zone/host string is **server-side only**; never render it on a customer-facing surface.

## Credentials (three kinds, three headers)

| Credential | Header | Unlocks |
|---|---|---|
| **NUA key** (minted with `allow_kb_management`) | `X-NUCLIA-NUAKEY: Bearer …` | Zone management: create/manage KBs, service accounts, keys; **start DA-agent tasks**; Predict/Understanding. **No data-plane read/write; rejected by global API and by activity-logs/backups.** |
| **KB service-account token** (`kb-…` or JWT) | `X-NUCLIA-SERVICEACCOUNT: Bearer …` | KB data plane (`/find`, `/ask`, `/catalog`, `/graph`, resources, labelsets, KB-scoped `predict`). KB roles: **SOWNER / SCONTRIBUTOR / SMEMBER**. |
| **Account token / PAT** | `Authorization: Bearer …` | Global/account admin + anything the NUA key is refused for (accounts, activity logs, backups). |

**Send exactly one auth header.** A NUA key in `X-NUCLIA-SERVICEACCOUNT` → "wrong header key"; a NUA
key on the global API → *"Nuakeys are not valid in the global API"*; a NUA key on KB content →
*"NuaKeyUser cannot access context of type NucliaDBKnowledgeBox"*. Strip a stray `Bearer ` prefix and
quotes from a pasted token (else `JWT decoding error`). Propagate end-user identity with
`x-nucliadb-user` when a demo needs per-user attribution/audit.

---

## Resolving the account from a NUA key

**The factory wants to build from only a NUA key + region. Here is the hard truth, tested:**

> **There is NO endpoint that returns the account id/slug from a NUA key alone.** Two independent
> facts close every door:
> 1. **The account id is not in the NUA-key JWT.** Decoding the token payload shows only the
>    **client id** and **key id** — no account id/slug.
> 2. **The endpoints that *would* tell you — the global "whoami / list my accounts" routes — reject
>    NUA keys.** `GET /api/v1/accounts`, `GET /api/v1/user`, `GET /api/v1/user/welcome`,
>    `GET /api/v1/zones` all live on the global host, which refuses NUA keys by design
>    (matrix: every global op = *Needs user/PAT*).
>
> Every *zone* endpoint that a NUA key **can** call already requires `{account_id}` **in the path**
> (`/account/{account_id}/kbs`, `/account/{account_id}/kb/{kb_id}/service_accounts`, …). None of them
> is a discovery endpoint, and the zone account-scoped routes without a KB (`nua_clients`, `backups`)
> return **403** for a NUA key. So the account id must be obtained **out of band**.

**How to get it (pick one, once — the id is stable per account):**

| Source | How | Cost |
|---|---|---|
| **Nuclia dashboard** | Copy the account slug/UUID from the dashboard URL or account settings. | Human, once |
| **SDK config** | Run `nuclia auth nua <key>` (or `nuclia auth`), then read the bound account id from the SDK config (`~/.nuclia/`). *During the guide's testing this was the reliable source.* | One CLI step |
| **PAT, programmatic** | With a user token/PAT (not the NUA key): `GET https://rag.progress.cloud/api/v1/accounts` → `[{ id, slug, … }]`. Then use the id on the zone host with the NUA key thereafter. | Needs a PAT once |

**Practical factory rule:** capture the account id/slug **once** (dashboard or SDK config) into
server-side config alongside the NUA key + zone. From then on the NUA key alone provisions everything
(create KB → service account → key). If you truly have *only* a NUA key and no account id, you cannot
proceed via API — surface a clear prompt for the account id/slug rather than guessing.

**Verify the id works:** `GET {zone}.dp.progress.cloud/api/v1/account/{account_id}/kbs` with the NUA
key returns your KB list (200) — a good post-resolution sanity check.

---

## Global / Account API — `https://rag.progress.cloud/api/v1`

Auth: **user token / PAT only** (`Authorization: Bearer`). **NUA keys rejected.** Path uses account
**slug** for mutations, **slug-or-id** for reads. Nothing here was live-tested (needs PAT).

| Method · Path | Purpose | Key fields |
|---|---|---|
| `GET /accounts` | **List my accounts** → `[{id, slug, title}]` (the whoami for account discovery) | — |
| `POST /accounts` | Create account | `title`(req), `slug`, `zone`, `workflow`, `eula_accepted` → `ItemCreated` |
| `GET /account/{slug_or_id}` | Get account | — |
| `PATCH /account/{slug}` · `DELETE /account/{slug}` | Modify / delete account | `title`, `description`, `slug`, `workflow`, `saml_config` |
| `GET /account/{slug_or_id}/zones` · `GET /zones` | Zones for one account · all zones (union) | → `array<Zone>` |
| `GET /account/{id}/usage` | Usage stats | `from`(req), `to`, `aggregation`, `knowledgebox`, `nua_key_id` |
| `GET /account/{slug}/permissions` | Caller's account permissions | — |
| `GET /account/{slug}/users` · `PATCH …/users` · `GET …/users/search?query=` · `GET …/user/{user_id}` | Account users: list · add/delete · search · detail | PATCH body `{add:[], delete:[]}` |
| `GET /account/{id}/invites` · `POST /account/{slug}/invite` · `DELETE /account/{id}/invite/{email}` | Account invites | invite `{email(req), role=AMEMBER, came_from}` |
| `GET /user` · `PATCH /user` · `DELETE /user` · `GET /user/welcome` | Authenticated user (whoami) · edit · delete · onboarding | — |
| `GET /user/pa_tokens` · `POST /user/pa_tokens` · `DELETE /user/pa_token/{id}` | **Personal access tokens** (mint a PAT) | create `{description(req), expiration_date}` → `TokenCreated` |
| `POST /oauth2/register` · `PUT /oauth2/register/{client_id}` | OAuth dynamic client registration (RFC 7591) | — |

---

## Zone API — `https://{zone}.dp.progress.cloud/api/v1`

Auth: a **management credential** — a **NUA key** with `allow_kb_management` (`X-NUCLIA-NUAKEY: Bearer`)
for KB/service-account lifecycle, **or** a user token / PAT for account-scoped, activity, backup, and
connector routes (these **403** a NUA key). `{account_id}` = account UUID. This is what the factory
uses to provision.

### Knowledge Box lifecycle — NUA key works

| Method · Path | Purpose | Key fields |
|---|---|---|
| `GET /account/{account_id}/kbs` | **List KBs** in the account → `[{id, slug, zone, title, state, …}]` | `?mode=kb\|agent\|agents`, `?include_search_configs` |
| `POST /account/{account_id}/kbs` | **Create KB** → `{id}` | `slug`(req), `title`(req), `description`, `mode=kb`, `learning_configuration`, `allowed_origins`, `enforce_security` |
| `GET /account/{account_id}/kb/{kb_id}` | Get KB (management view) | — |
| `PATCH /account/{account_id}/kb/{kb_id}` · `DELETE …` | Update · delete KB | title/slug/origins; DELETE is irreversible |
| `GET …/kb/{kb_id}/permissions` · `GET\|PATCH …/kb/{kb_id}/users` | KB permissions · members | — |
| `GET …/kb/{kb_id}/invites` · `POST\|DELETE …/kb/{kb_id}/invite` | KB invites | `{email, role}` |
| `GET …/kb/{kb_id}/logo.png` | KB logo (500 if none set) | — |

### Service accounts & keys — the provisioning core (NUA key works)

| Method · Path | Purpose | Key fields |
|---|---|---|
| `GET /account/{account_id}/kb/{kb_id}/service_accounts` | List service accounts | → `array<ServiceAccount>` |
| `POST /account/{account_id}/kb/{kb_id}/service_accounts` | **Create service account** (KB-scoped, PLURAL) → `{id}` | `title`(req), `role`(req) — `SOWNER` \| `SCONTRIBUTOR` \| `SMEMBER` |
| `POST /account/{account_id}/kb/{kb_id}/service_account/{sa_id}/keys` | **Mint key** (SINGULAR route) → `{token}` | `{expires}` = epoch seconds, **≤ 1095 days** out |
| `DELETE …/service_account/{sa_id}` · `DELETE …/service_account/{sa_id}/key/{key_id}` | Revoke SA · revoke one key | — |
| `POST /ephemeral_token` | Short-lived token scoped to a KB (SA) or path | `{path, ttl, agent_session}` → `EphemeralTokenResponse` |
| `POST /account/{account_id}/kb/{kb_id}/ephemeral_tokens` | Ephemeral tokens for a KB | — |
| `POST /service_account_temporal_key` · `POST /service_account_agent_key` | Temporal SA key · temporal agent-session key | `{ttl}` · `{agent_session(req), ttl=10}` |

**Provisioning flow (NUA key + resolved account id):** create KB → create SA (`SCONTRIBUTOR` to
ingest+serve; `SOWNER` if it must also create search configurations) → mint key. Implemented in
`scripts/create-kb.mjs`.

### NUA clients (mint/rotate NUA keys) — **PAT only** (403s a NUA key)

| Method · Path | Purpose |
|---|---|
| `GET\|POST /account/{account_id}/nua_clients` | List · create NUA client (issues a new NUA key) |
| `GET\|PATCH\|DELETE /account/{account_id}/nua_client/{client_id}` | Get · update · delete |
| `PUT /account/{account_id}/nua_client/{client_id}/key` | Rotate the client's key |

### Backups, connectors, activity, REMi — **PAT only** (403s a NUA key)

| Method · Path | Purpose |
|---|---|
| `GET\|POST /account/{account_id}/backups` · `DELETE …/backup/{id}` · `POST …/backup/{id}/restore` | KB backups: list/create · delete · restore |
| `GET\|POST /kb/{kb_id}/external_connections` · `GET\|DELETE …/external_connection/{id}` · `…/{id}/browse` | Sync-connector definitions + browse |
| `GET\|POST /kb/{kb_id}/sync_configs` · `GET\|PATCH\|DELETE …/sync_config/{id}` · `…/{id}/sync` · `…/{id}/authorize` · `…/{id}/validate_resources` · `…/sync_job/{job_id}/logs` | Sync config lifecycle + run + logs |
| `GET /kb/{kb_id}/activity/metrics` · `GET …/activity/{event_type}/months` · `POST …/activity/{event_type}/query[/download]` | **Activity logs** (audit) — reject NUA keys |
| `POST /kb/{kb_id}/remi/query` · `GET /kb/{kb_uuid}/remi/scores` · `GET /kb/{kb_uuid}/remi/events/{id}` | **REMi** answer-quality scores/events |

---

## NucliaDB data plane — `https://{zone}.rag.progress.cloud/api/v1` (portal) · also on `dp`

Auth: **KB service-account token** (`X-NUCLIA-SERVICEACCOUNT: Bearer`). Roles noted per row
(READER = read/search, WRITER = mutate content, MANAGER/OWNER = config). All paths below are under
`/kb/{kbid}`.

### Search, RAG & generation

| Method · Path | Purpose | Role |
|---|---|---|
| `POST /ask` | **Grounded generative answer** (streamed NDJSON, or `x-synchronous: true` for one JSON). Cited. | READER |
| `POST /find` (also `GET`) | **Semantic + keyword retrieval**, ranked. No generation. | READER |
| `POST /catalog` (also `GET`) | **Faceted metadata browse** over resources (fast, non-semantic, facet counts). | READER |
| `POST /graph` | **Knowledge-graph path search** → subject/relation/object triples. | READER |
| `POST /graph/nodes` · `POST /graph/relations` | Graph vertices only · edges only. | READER |
| `GET\|POST /suggest` | Autocomplete/entity suggestions. `query`(req), `fields`, `filters`, `features`. | READER |
| `POST /summarize` | Summarize named resources. `resources`(req uids/slugs), `summary_kind=simple`, `user_prompt`, `generative_model`. | READER |
| `POST /search` (also `GET`) | Legacy search (paragraph/document indexes). Prefer `/find`. | READER |
| `POST /resource/{rid}/ask` · `POST /slug/{slug}/ask` | Ask a single resource. | READER |
| `GET /resource/{rid}/search` | Search within one resource. | READER |
| `POST /feedback` | Thumbs up/down on an answer. `{ident(req), good(req), task:"CHAT"(req), feedback}`. `ident` = `Nuclia-Learning-Id` header from `/ask`. | READER |
| `GET\|POST /predict/{endpoint}` | KB-scoped Predict proxy (labeler/NER/chat/rerank/remi). Some are POST-only (`rerank`, `remi`). | READER |

### `POST /ask` — key request-body fields (the load-bearing surface)

| Field | Default | Notes |
|---|---|---|
| `query` | — | required |
| `top_k` | 20 | retrieval depth, max 200 |
| `features` | `["semantic","keyword"]` | add `relations` to pull graph paths |
| `rag_strategies` | `[]` | e.g. `[{"name":"neighbouring_paragraphs","before":2,"after":2}]`; also `full_resource`, `hierarchy`, `field_extension`, `metadata_extension`, `prequeries`, `graph`, `conversation` |
| `rag_images_strategies` | `[]` | `page_image`, `tables`, `paragraph_image` |
| `citations` / `citation_threshold` | off / auto | set `citations:true`; lower threshold → more citations. **An answer with no citations is a bug — surface as ungrounded.** |
| `prompt` | — | string (=user prompt) or `{system, user}` |
| `filters` / `filter_expression` | `[]` | e.g. `/classification.labels/{labelset}/{label}` |
| `generative_model` | KB default | override LLM; `generative_model_seed`, `max_tokens`, `reasoning`, `answer_json_schema` |
| `rephrase` / `chat_history` | false / — | rephrase costs LLM tokens; history rephrases follow-ups |
| `prefer_markdown`, `show`, `field_type_filter`, `security`, `show_hidden` | — | serialization / access control |
| `search_configuration` | — | **authoritative if set** — it carries strategy+prompt; the request drops `rag_strategies`/`prompt`/`top_k` to avoid fighting it |

`/find` shares most fields (no generation ones) plus `vector`, `vectorset`, `with_duplicates`,
`with_synonyms`, `keyword_filters`, `graph_query`, `rank_fusion` (`rrf`), `reranker` (`predict`).
`/catalog` body: `query`, `faceted:["/classification.labels/{labelset}"]`, `filters`, `sort`,
`page_number`/`page_size` (max 200), `show:["basic","origin","extra"]`, `with_status`, date ranges.
`/graph` body: `{query:{prop:"path"|"node", ...}, top_k:50, filter_expression, show_hidden}`; scope
with a `SourceNode`/`DestinationNode`/`AnyNode` operand.

### Resources & fields (content CRUD)

| Method · Path | Purpose | Role |
|---|---|---|
| `POST /resources` | **Create resource** — `title`, `slug`, `summary`, `origin`, `usermetadata`, `texts`/`files`/`links`/`conversations`/`key_values`, `security`. | WRITER |
| `GET /resources` | List resources. | READER |
| `GET /resource/{rid}` (also `/slug/{rslug}`) | Get one resource. **`?show=values` returns field bodies** (+ `basic`,`origin`,`extra`,`errors`); without `values` bodies read empty. | READER |
| `PATCH /resource/{rid}` · `DELETE /resource/{rid}` | Update · delete resource. | WRITER |
| `PUT /resource/{rid}/text\|link\|file\|conversation/{field_id}` | Add/replace a field. | WRITER |
| `GET\|DELETE /resource/{rid}/{field_type}/{field_id}` | Get · delete a field. | READER/WRITER |
| `GET /resource/{rid}/file/{field}/download/field` | Download a stored file field. | READER |
| `POST /resource/{rid}/reindex` · `POST /resource/{rid}/reprocess` · `…/file/{field}/reprocess` | Reindex · reprocess. | WRITER |
| `POST /resource/{rid}/run-agents` · `POST /slug/{slug}/run-agents` | Run DA-agents on one resource on demand. | WRITER |
| `POST /upload` | Simple binary upload (autogenerates rid, field `file`). Headers `x-filename`, `x-language`, `x-md5`, `x-extract-strategy`, `x-split-strategy`. | WRITER |
| `POST /tusupload` · `PATCH /tusupload/{upload_id}` (+ per-resource/field variants) | Resumable (TUS) upload. | WRITER |

*(Every `…/resource/{rid}/…` route has a `…/slug/{rslug}/…` twin.)*

### Taxonomy, entities, synonyms, config

| Method · Path | Purpose | Role |
|---|---|---|
| `GET /labelsets` · `GET /labelset/{labelset}` | **Read the KB's taxonomy** (facet paths are discovered here, not assumed). | READER |
| `POST /labelset/{labelset}` · `DELETE /labelset/{labelset}` | Create/replace · delete a labelset. Body `{title, color, multiple, kind, labels:[...]}`. | WRITER |
| `GET /entitiesgroups` · `GET /entitiesgroup/{group}` | Extracted entities by group (bulk list returns empty maps — **fetch each group individually**). | READER |
| `GET\|PUT\|DELETE /custom-synonyms` | KB synonyms (used when `with_synonyms:true`). | MANAGER/WRITER |
| `GET\|POST /search_configurations` · `GET\|POST\|PATCH\|DELETE /search_configurations/{name}` | **Saved retrieval configs.** `POST` body `{kind:"find"\|"ask", config:{…find/ask params…}}`. **Create/update/delete need role OWNER.** Ship ≥1 per demo; portal defaults via `NUCLIA_SEARCH_CONFIG`. | READER / **OWNER** |
| `GET\|POST /extract_strategies` · `GET\|DELETE …/strategy/{id}` | Custom extract strategies. | MANAGER |
| `GET\|POST /split_strategies` · `GET\|DELETE …/strategy/{id}` | Custom split strategies. | MANAGER |
| `GET\|POST\|PUT\|DELETE /kv-schemas[/{id}]` | Key-value field schemas. | MANAGER |

### KB status, models, admin

| Method · Path | Purpose | Role |
|---|---|---|
| `GET /counters` | Cheapest reachability probe (counts only, never the zone) — powers the connected chip. | READER |
| `GET /processing-status` · `GET /notifications` | Ingest/processing status · **live notification stream** (holds the connection open — treat as long-lived). | READER |
| `GET /configuration` · `POST\|PATCH /configuration` | Read · create/update KB model configuration (`POST` is 405 if config exists — use `PATCH`). | READER / MANAGER·OWNER |
| `GET /models` · `GET /model/{id}` · `GET /generative_providers` | Available models · one model · generative providers. | READER |
| `GET /schema` · `GET /learning/configuration/schema` | KB resource schema · learning-config JSON schema (for KB-creation payloads). | READER |
| `GET /export/{id}` · `GET /export/{id}/status` · `GET /import/{id}/status` | Export download/status · import status. | MANAGER/READER |
| `GET /kb/s/{slug}` · `GET /kb/{kbid}` | Resolve KB by slug · by id. | MANAGER/READER |

---

## Verification status (from the guide's live sweep)

Of 356 documented ops, 235 (66%) were exercised live, 102 (28%) returned full success. Practical
takeaways for the builder:
- **Data plane is well-proven:** `ask`, `find`, `catalog`, `graph`, `graph/nodes`, `summarize`,
  `suggest`, resource CRUD, labelsets, `search_configurations` full CRUD — all **Verified 2xx**.
- **DA-agent tasks need the KB key, not the NUA key** — `POST /kb/{kbid}/task/start` = 403 with NUA,
  200 with KB key. (Tasks themselves are the NUA/`dp` surface — see Appendix B.)
- **Activity logs & backups reject NUA keys** (need PAT). **Global API is entirely PAT-only.**
- Gotchas: `logo.png` and `/processing/download` return **500** when the artifact is absent;
  `/notifications` is a **stream** (read-timeout is expected); several `predict/*` are **POST-only**
  (GET → 405).

---

*Source: "Building Solutions with Progress Agentic RAG" — Part 7 appendices A (NucliaDB REST API),
C (Zone API), D (Global/Account API), and G (API Verification Matrix), reconciled against
`ARAG-REFERENCE.md` and this project's provisioning scripts. Update when a build hits an endpoint or
behaviour not covered here.*
