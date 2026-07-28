# ARAG Knowledge Base (distilled)

This directory is the factory's **expert knowledge of Progress Agentic RAG** — distilled from the
910-page practitioner's guide (`github.com/jaysanderson/building-solutions-progress-agentic-rag`,
OpenAPI-accurate + live-tested) into dense, actionable reference the orchestrator reads while
building. The goal: the orchestrator should build like a developer who knows ARAG end-to-end.

The raw guide is **not** vendored (bloat + this package is distributed); it stays at the public repo.

## Read order / map

| Doc | What it covers | Reach for it when |
|---|---|---|
| **CONCEPTS.md** | Mental model, vocabulary, the containment hierarchy, the 5-call quickstart | Getting oriented |
| **AUTH-MANAGEMENT.md** | Every credential + role, account/zone/KB lifecycle | Provisioning, auth questions |
| **ARAG-REFERENCE.md** | Provisioning cheat-sheet (hosts, KB/SA, search configs, DA agents) | Quick lookup mid-build |
| **INGESTION.md** | Resource/field data model, upload + processing, DA (ingestion) agents | Getting content into a KB + enriching it |
| **RETRIEVAL.md** | `/find` + `/ask`, grounding/citations, the RAG-config cookbook, `search_configurations` | Tuning how the demo answers |
| **CATALOG-GRAPH.md** | `/catalog` facets, `/suggest`, `/summarize`, the knowledge graph | Facet / graph / related surfaces |
| **AGENTIC.md** | The Retrieval Agent — sessions, workflows, drivers | The "Agentic" surface / multi-step retrieval |
| **OBSERVABILITY-OPS.md** | REMi/quality, backups/export/sync, production practices | Quality surface, operating a demo |
| **SDKS-WIDGET.md** | Python / JS-TS / .NET SDKs, the no-code widget | When not writing raw HTTP |
| **ARAG-API.md** | Endpoint reference — Global/Account · Zone · NucliaDB data plane | "What's the exact endpoint?" |
| **NUA-API.md** | NUA API — predict, tasks/DA-agents, retrieval agent | Tasks, predict, agent endpoints |
| **GLOSSARY-SCHEMAS.md** | Glossary + the load-bearing request/response/schema shapes | Constructing or parsing bodies |

Also in `docs/`: `RETRIEVAL.md` (grounding policy), `PALETTE-ARCHITECTURE.md` (portal palette), `UI-KENDO.md` (KendoReact gotchas).

## The two facts every doc assumes

- **Hosts (per zone):** `{zone}.rag.progress.cloud` = RAG data plane (`find`/`ask`/`catalog`/`graph`/
  resources) · `{zone}.dp.progress.cloud` = `search_configurations` + tasks/DA-agents + zone
  management + NUA · global `rag.progress.cloud` = account/KB creation (**rejects NUA keys**).
- **Auth:** NUA key = `X-NUCLIA-NUAKEY: Bearer` (KB/task management, no data plane) · service-account
  token = `X-NUCLIA-SERVICEACCOUNT: Bearer` (data plane; roles SOWNER/SCONTRIBUTOR/SMEMBER) ·
  account token/PAT = `Authorization: Bearer` (account admin, self-resolves the account).

> **Account resolution:** a NUA key cannot self-resolve its account (not in the JWT; global list
> routes reject NUA keys). The account id is captured once out-of-band (or via a PAT's
> `GET /api/v1/accounts`); thereafter the NUA key alone provisions KB → service account → key.
> See AUTH-MANAGEMENT.md / ARAG-API.md.

*Source: "Building Solutions with Progress Agentic RAG" (Parts 1–7). Update a doc when a build hits
something it doesn't cover.*
