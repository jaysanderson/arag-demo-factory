# ARAG API Reference (builder distillation)

The load-bearing facts the factory needs to provision and drive Progress Agentic RAG, distilled
from the **910-page practitioner's guide** (`github.com/jaysanderson/building-solutions-progress-agentic-rag`,
OpenAPI-accurate + live-tested) and cross-checked against this project's own verified runs. When a
detail here isn't enough, the guide's Part 7 appendices (A NucliaDB · B NUA · C Zone · D Global) are
the full endpoint reference.

> Rule of thumb: **read this before reverse-engineering an endpoint.** Almost everything the
> factory provisions — KBs, service accounts, search configurations, DA agents — is documented here.

## Hosts (per zone)

| Host | Serves | Notes |
|---|---|---|
| `{zone}.rag.progress.cloud/api/v1` | RAG data plane — `/find`, `/ask`, `/catalog`, `/graph`, `/counters`, resources | What the portal server proxies. |
| `{zone}.dp.progress.cloud/api/v1` | NucliaDB + NUA — **search_configurations**, **tasks/DA-agents**, processing | The dashboard + the guide use this host. |
| `rag.progress.cloud/api/v1` (global) | Account/KB creation, slug lookup | **Rejects NUA keys** — use the zone host for NUA-authed calls. |

`{zone}` for this account: `aws-ap-southeast-2-1`.

## Credentials (three kinds, three headers)

| Credential | Header | Can do |
|---|---|---|
| **NUA key** (`allow_kb_management`) | `X-NUCLIA-NUAKEY: Bearer …` (or `Authorization: Bearer …`) | Create/manage KBs, **start DA-agent tasks**, Understanding API. **No data-plane read/write.** |
| **KB service-account token** | `X-NUCLIA-SERVICEACCOUNT: Bearer …` | KB data plane (`/find`, `/ask`, resources). Roles: **SOWNER / SCONTRIBUTOR / SMEMBER**. |
| **Account token / PAT** | `Authorization: Bearer …` | Account admin (global API). |

Send exactly one auth header per request. A NUA key in `X-NUCLIA-SERVICEACCOUNT` is rejected
("wrong header key"); a NUA key on the global API is rejected ("not valid in global API").

## Knowledge Box + service account (provisioning) — VERIFIED

All on the zone `rag` host, account UUID (not slug) in the path, NUA key as Bearer:

1. **Create KB** — `POST /account/{acct}/kbs` `{title, slug, zone}` → `{id}`.
2. **Create service account** (KB-scoped, PLURAL) — `POST /account/{acct}/kb/{kb}/service_accounts`
   `{title, role}`. Use `SCONTRIBUTOR` so one token both ingests and serves; `SOWNER` if it must
   also create search configurations (below).
3. **Mint key** (SINGULAR route) — `POST /account/{acct}/kb/{kb}/service_account/{id}/keys`
   `{expires}` where `expires` is an epoch **≤ 1095 days** out → `{token}`.

Implemented in `scripts/create-kb.mjs`.

## Search configurations (retrieval configs)

Saved, named retrieval configs — the "Saved configuration" objects in the dashboard, and the
`search_configuration` a `/find` or `/ask` call can name (request params override the config).
On the **`dp`** host, **role OWNER** to create:

- `GET  /kb/{kb}/search_configurations` — list
- `POST /kb/{kb}/search_configurations/{name}` — create · body `{ kind, config }`
  (`kind` = `find` | `ask`; `config` holds the find/ask params: `features`, `reranker`, `top_k`,
  `show`, `rag_strategies`, `generative_model`, …)
- `PATCH` / `DELETE /kb/{kb}/search_configurations/{name}`

Every demo should ship 1+ of these (`scripts/create-retrieval.mjs`), and the portal defaults to one
via `NUCLIA_SEARCH_CONFIG`.

## Data Augmentation Agents (ingestion agents / "tasks")

Agents that enrich resources at ingest — labels, graph, Q&A, safety. **On the NUA API** (`dp` host),
authed with the **NUA key**:

- `GET  /kb/{kb}/tasks` — catalog **+ each agent's config schema** (read this to build `parameters`).
- `POST /kb/{kb}/task/start` — start one · body:
  `{ name: <TaskName>, parameters: <DataAugmentation-Input>, apply: EXISTING|NEW|ALL, enabled: true }`
- lifecycle: `POST /kb/{kb}/task/{id}/enable|stop|restart|cleanup`, `PATCH`/`DELETE /kb/{kb}/task/{id}`,
  `GET /kb/{kb}/task/{id}/inspect`.

**Task names** (dashboard name → API name):

| Dashboard | API `name` | Produces |
|---|---|---|
| Labeler | `labeler` | classification labels (→ facets) |
| Graph extraction | `llm-graph` | entities + relations (→ `/graph`, related) |
| Q&A Generator | `synthetic-questions` | question/answer pairs (→ richer retrieval) |
| Generator | `ask` | summaries / structured JSON |
| Content safety | `llama-guard` | unsafe-content flags |
| LLM security | `prompt-guard` | jailbreak / prompt-injection flags |

`apply`: `EXISTING` backfills now, `NEW` runs continuously on new resources, `ALL` both. A demo
build should start at least **labeler + llm-graph + synthetic-questions** with `apply: ALL` so the
corpus is enriched and the facet/graph/related surfaces light up. Implemented in
`scripts/create-da-agents.mjs`.

## Retrieval + grounding (portal)

`/find` (ranked search) and `/ask` (NDJSON streamed, cited) both accept `search_configuration`.
Grounding policy (neighbouring-paragraph context + citations on) lives in `portal/server/retrieval.mjs`;
answers must render citations. See `docs/RETRIEVAL.md`.

---
*Source: the practitioner's guide (Part 7 appendices are the exhaustive reference), plus this
project's own verified provisioning runs. Update this file when a build hits an endpoint not covered.*
