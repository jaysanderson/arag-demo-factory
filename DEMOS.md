# Live ARAG Demo Apps - Catalog

Live demo web apps for **Progress Agentic RAG (ARAG)**, hosted on Fly.io. These are
**live and change over time** - treat this catalog as a snapshot, re-audit before a
customer session.

**Screenshot / demo target is `https://<name>.fly.dev`** (the public running app). The
`https://fly.io/apps/<name>` URLs Jay keeps are the Fly.io **dashboard** (auth-walled
admin), not the demo - never screenshot those.

**Re-audited 2026-07-06** (visual catalog pass). Every demo below was woken, loaded in a
real browser at 1920x1080 and screenshotted; the shot was viewed to confirm real content.
Thumbnails live in `../shots/catalog/<name>.png`. A visual contact sheet is at
`../shots/catalog/README.md`.

Status key: **up** = full page rendered - **auth-walled** = a login / magic-link gate
stands in front of the demo - **not-seeded** = reachable but showing a default/empty state
(nothing ARAG-facing to show yet) - **infra** = backing service, not a demo. "(woke)" =
was suspended, an HTTP request brought it back before the shot.

Scope: only genuine ARAG-powered demos are catalogued. Excluded and why: `max-accuracy`
(ARAG-branded but makes no ARAG/Nuclia calls - deterministic OpenCV only),
`wordpress-arag-perso-db` (database infra), `arag-gtm-portal` (this factory's internal
tooling), `smoke-ask` / `mip-ask` (test / account-specific harnesses).

---

## Dealership / CX / customer experience

| App | Live URL | Status | Vertical / use case | ARAG capability shown | Thumbnail |
|---|---|---|---|---|---|
| call-analysis-arag | https://call-analysis-arag.fly.dev | up (woke) | Call-centre / health-insurance QA - analytics dashboard over 24 analysed calls (first-call resolution, compliance, CSAT, complaint categories, cross-sell funnel), plus call list + detail with synced transcript and citation-scrubbed audio | Data-augmentation agents auto-label calls + emit JSON metrics; scoped cited `/ask`; `/find`, `/catalog`, media proxy | `../shots/catalog/call-analysis-arag.png` |
| capstone-aurora-concierge | https://capstone-aurora-concierge.fly.dev | up (woke) | Retail customer-experience - "Aurora Outfitters" outdoor-gear storefront: concierge, personalised feed, journey graph, abandoned-cart winback | `/ask`, `/find`, knowledge graph, Tier-3 workflows, Tier-4 composite-RAG, field-engineered custom fields | `../shots/catalog/capstone-aurora-concierge.png` |
| arag-voice-bridge | https://arag-voice-bridge.fly.dev | up | Voice assistant - real-time spoken Q&A with grounded, cited answers; live call-transcript panel; latency + citation-coverage telemetry | Voice over ARAG `/ask`; grounded + cited + governed; silent-listen agent monitoring | `../shots/catalog/arag-voice-bridge.png` |

## Content / marketing / sales enablement

| App | Live URL | Status | Vertical / use case | ARAG capability shown | Thumbnail |
|---|---|---|---|---|---|
| arag-salesbuddy | https://arag-salesbuddy.fly.dev | up (woke) | Sales enablement - AI selling companion over Product + Methodology KBs; drafts funnel content, MEDDICC-qualifies notes, per-account "why now" framing | `/ask` for all grounded/cited generation over two KBs | `../shots/catalog/arag-salesbuddy.png` |
| contentforge-prgs | https://contentforge-prgs.fly.dev | up (woke) | Grounded content operations - inbox of drafts in review, knowledge gaps (refused topics), brand flags, groundedness + publish gate on a per-tenant KB | `/ask` governed generation; groundedness scoring; MCP endpoint per workspace; Account API KB-create per tenant | `../shots/catalog/contentforge-prgs.png` |
| partnerforge-prgs | https://partnerforge-prgs.fly.dev | auth-walled | Progress Partner Portal - partner-facing enablement gateway; passwordless magic-link sign-in (synthetic demo partner accounts shown) | Not observable behind auth; partner enablement Q&A over ARAG | `../shots/catalog/partnerforge-prgs.png` |
| courseforge-prgs | https://courseforge-prgs.fly.dev | auth-walled | Progress product training & certification - course / learning delivery behind an email+password sign-in | Not observable behind auth; grounded course content + Q&A over ARAG | `../shots/catalog/courseforge-prgs.png` |
| progress-citeforge | https://progress-citeforge.fly.dev | auth-walled | AI visibility + Agent Experience - measure brand appearance across models, make content retrievable via ARAG MCP; email+password sign-in | KB-create in code, `/find`, `/ask`, `{kb}/predict/chat`, entities, `{kb}/mcp/sse` | `../shots/catalog/progress-citeforge.png` |
| geostack-progress | https://geostack-progress.fly.dev | up | AI visibility across the Progress portfolio - Generative Visibility Index, 12 brands tracked, citation / sentiment / displacement, Ask-AI, recommendations, AI-referral tracking | Account + KB `/predict/chat?model=` (full model catalogue), `/ask`, `/find`, LLM-judge, MCP-native | `../shots/catalog/geostack-progress.png` |

## Code / developer / integration

| App | Live URL | Status | Vertical / use case | ARAG capability shown | Thumbnail |
|---|---|---|---|---|---|
| codeintel-arag | https://codeintel-arag.fly.dev | up | **Meridian Codex** - code documentation + search for legacy modernisation of a fictional distributor's 25-year-old OpenEdge ABL ERP ("MeridianONE"). Six routes: estate overview, ask-the-codebase (grounded cited answers with file+line refs, 5/5 groundedness), auto-generated docs, dependency/blast-radius graph, modernisation risk register, per-module modernisation brief. Presents as Meridian's own system, ARAG invisible | Ingest ABL corpus, augmentation agents (label/generate-docs/graph), grounded cited `/ask`, semantic `/find`, knowledge graph, REMi groundedness | `../shots/catalog/codeintel-arag.png` |
| sitefinity-mcp-eftm2 | https://sitefinity-mcp-eftm2.fly.dev | up | Sitefinity CMS MCP explorer - "Coriander Lane" fictional restaurant chain running on Sitefinity, exposed over MCP; four-step live demo shows keyword search failing and meaning-based retrieval winning, with a grounded 14-source cited answer and live MCP wire traffic | MCP server over a live Sitefinity CMS; `search_items` / `semantic_search` / `grounded_answer` tool calls; grounded cited `/ask` | `../shots/catalog/sitefinity-mcp-eftm2.png` |

## Personalisation / CMS

| App | Live URL | Status | Vertical / use case | ARAG capability shown | Thumbnail |
|---|---|---|---|---|---|
| wordpress-arag-perso | https://wordpress-arag-perso.fly.dev | up | Retail personalisation - live WooCommerce "ARAG Personalize" store (AU); one plugin replaces five for search, recommendations, AI chat and SEO, all grounded in the catalogue; conversational answer engine | `/ask` (sync + stream), `/find`, `/search`, `/catalog`, `/counters`; one plugin replaces five | `../shots/catalog/wordpress-arag-perso.png` |
| arag-dam-coke | https://arag-dam-coke.fly.dev | up | Digital asset management - "Agentic DAM" brand asset manager over a brand archive; asset-type + lifecycle governance dashboard, semantic search, Ask-the-Archive, intelligence graph, AI Studio | Agentic RAG asset discovery / retrieval; cited "Ask the Archive"; NucliaDB-backed | `../shots/catalog/arag-dam-coke.png` |
| umbraco-arag-perso | https://umbraco-arag-perso.fly.dev | **INTERNAL-ONLY** (not-seeded) | Umbraco 17 / .NET personalisation package - grounded chat, segmented heros, reranked search, REMi scoring, retrieval-agent chat | `/ask`, `/find`, retrieval agent, OpenTelemetry per call. INTERNAL-ONLY: still serves the default "Welcome to your Umbraco installation" page; publishing content needs Umbraco backoffice credentials the factory does not hold | `../shots/catalog/umbraco-arag-perso.png` |
| umbraco-site | https://umbraco-site.fly.dev | **INTERNAL-ONLY** (not-seeded) | Umbraco content site (host for the personalisation package) | Same ARAG surface as umbraco-arag-perso. INTERNAL-ONLY: default Umbraco welcome page, same backoffice-credential blocker | `../shots/catalog/umbraco-site.png` |

## Doc processing

| App | Live URL | Status | Vertical / use case | ARAG capability shown | Thumbnail |
|---|---|---|---|---|---|
| arag-doc-processing | https://arag-doc-processing.fly.dev | up | Document Intelligence Studio - drop a doc (invoice, contract, resume, PO, pre-auth, remittance), watch the 8-step pipeline; custom extraction configs; synthetic test-doc generation | Ingest, OCR/visual/layout, agent classify, schema-driven visual-LLM extraction, NER, summary, validate, standardise (JSON/XML/CSV), `/ask`, `/find` | `../shots/catalog/arag-doc-processing.png` |

## Enterprise / operations / partner-enablement

| App | Live URL | Status | Vertical / use case | ARAG capability shown | Thumbnail |
|---|---|---|---|---|---|
| capstone-legal | https://capstone-legal.fly.dev | up (woke) | Legal (family-law / trusts-and-estates) capstone - "Tilden & Voss LLP"; Client vs Research personas, streaming cited chat, service matrix, related-matters graph, composite search | Streaming `/ask` (NDJSON), `/find`, `/catalog` facets, `/graph` + `/graph/nodes`, stored `search_configurations`, LLM_GRAPH agent | `../shots/catalog/capstone-legal.png` |
| capstone-atlas-operations | https://capstone-atlas-operations.fly.dev | up | Enterprise operations capstone - "Atlas Operations"; six grounded surfaces on one KB (hybrid search, two-voice concierge, schema-constrained workflows, typed knowledge-graph reasoning, composite-RAG incident RCA, ops telemetry) | `/ask`, `/find`, knowledge graph, Tier-3 schema workflows, Tier-4 composite-RAG, 429-backoff client | `../shots/catalog/capstone-atlas-operations.png` |
| maintenanceos | https://maintenanceos.fly.dev | auth-walled | Maintenance / asset-ops - field maintenance operations platform; email+password sign-in (demo accounts shown on the login card) | Source cloned 2026-07-21 (`reference-repos/maintenanceOS` + `-web`): 45 grounded AI endpoints over ARAG (/ask, /find, predict/chat, compat vision, DA tasks) + `/mcp` Streamable HTTP with 81 OpenAPI-auto-generated tools, JWT pass-through | `../shots/catalog/maintenanceos.png` |
| research-portal-arag | https://research-portal-arag.fly.dev | up (woke) | Research portal - start from a KB, add content in-app (upload/paste/crawl), then search + streaming chat + multi-step agent over a CMS/DXP vendor corpus (1,114 resources) | Proxied `/ask` (NDJSON stream), `/find`, `POST resources`, labelsets, retrieval-agent session | `../shots/catalog/research-portal-arag.png` |

## Factory-built demos (this factory's own `apps/`)

| App | Live URL | Status | Vertical / use case | ARAG capability shown | Thumbnail |
|---|---|---|---|---|---|
| ironbark-arag | https://ironbark-arag.fly.dev | up (woke) | Insurance (fictional "Ironbark Mutual") - multi-desk staff workbench: claims intake, policy & coverage, underwriting, call-QA, fraud/SIU, ops insights, all on one Knowledge Box; synthetic-data footer disclaimer | Augmentation agents, resource-scoped cited `/ask`, `/find`, REMi groundedness, knowledge graph | `../shots/catalog/ironbark-arag.png` |
| parag-experience | https://parag-experience.fly.dev | up (woke) | Progress Agentic RAG public showcase - hero, "grounded vs guessed" interactive taste, wall of live demos, proof band, builder/API section | Showcase (links live demos); indexable public asset | `../shots/catalog/parag-experience.png` |
| codeintel-arag (apps/) | https://codeintel-arag.fly.dev | up (woke) | Code documentation + search for legacy modernisation / key-man risk. Verified 2026-07-20 (qa): the live Fly app serves the LOCAL apps/codeintel-arag build (Meridian Codex - live title matches, /api/succession and /api/overview 200), not the augmented-data workbench | Ingest code corpus, augmentation-generated docs, cited `/ask`, knowledge graph | `../shots/catalog/codeintel-arag.png` |

*Note: `apps/mip-ask` is an account-specific (MIP) demo, kept out of the reusable
reference catalog by policy; `apps/arag-gtm-portal` and `apps/smoke-ask` are internal
tooling, not customer demos.*

## Excluded from the catalog

| App | Live URL | Reason | Notes |
|---|---|---|---|
| max-accuracy | https://max-accuracy.fly.dev | ARAG-branded, **no ARAG calls** | Field-measurement PWA (measure a roller blind in mm from a phone photo). Deterministic computer-vision (OpenCV.js), no ARAG/Nuclia calls. Not an ARAG demo. |
| wordpress-arag-perso-db | https://wordpress-arag-perso-db.fly.dev | infra | Database backing service for `wordpress-arag-perso`. No public HTTP endpoint. Do not screenshot or demo. |
| arag-gtm-portal | https://arag-gtm-portal.fly.dev | internal tooling | This factory's own GTM portal. Not a customer demo. |

---

### Flags for later remediation (do not fix here)

- **arag-dam-coke** - the demo is styled as the **real Coca-Cola** brand ("Coca-Cola Brand
  Archive", real campaign names) and the activity feed / admin chip carried the personal
  name "Jay". Real-brand usage in a synthetic demo risks hard rule #7 (anonymise other
  names/identifiers); reskin to a fictional brand before any external use. The catalogued
  thumbnail is cropped to the left dashboard panel to drop the personal name, but the
  "Coca-Cola Brand Archive" title still appears - do not ship this shot externally without
  a reskin.
- **progress-citeforge** - the sign-in card **pre-fills Jay's real email**
  (`jay@vestedtechnology.com.au`). Real personal email in a demo surface. The thumbnail was
  neutralised to "(demo account)", but the app itself should default to a synthetic address.
- **research-portal-arag** - the sidebar footer prints the hosting-region string
  `aws-us-east-2-1.rag.progress.cloud` (US region). Fine for a US reference demo, but it is
  a residency string per hard rule #8: it was cropped out of the thumbnail; scan for it
  before any AU-customer screenshot.
- **capstone-atlas-operations** - the UI shows a "Residency - EU" chip/toggle. This is a
  synthetic in-product residency selector (a demo feature), not the actual Fly hosting
  region, but confirm the toggle state before an AU-residency-sensitive screenshot.

### Notes

- **Suspended-then-woke:** ten apps were suspended at audit time and returned 200 after a
  single HTTP request; all rendered full content on the follow-up shot. Suspended apps take
  ~10-20s to wake - hit the URL once and retry before assuming an app is down.
- **Auth-walled** (`partnerforge-prgs`, `courseforge-prgs`, `progress-citeforge`,
  `maintenanceos`): a login / magic-link gate stands in front of the demo; the thumbnail is
  the sign-in screen. Line up credentials (several show demo accounts on the card) before a
  live session.
- **Umbraco pair** (`umbraco-arag-perso`, `umbraco-site`) - marked **INTERNAL-ONLY**
  (2026-07-16): both still serve the default "Welcome to your Umbraco installation" page,
  and seeding needs Umbraco backoffice credentials the factory does not hold. Do not show
  either in a customer session until content is published.

### Remediation status (2026-07-16, local fixes - NOT yet redeployed)

- **smoke-ask** (`apps/smoke-ask`, internal) - rebranded from the real telco "Tangerine"
  to the fictional **Corella Telecom**; "Powered by Progress Agentic RAG" header badge
  removed; discreet synthetic-content footer added; KB purged and reseeded with Corella
  content (Tangerine strings no longer in answers).
- **mip-ask** (`apps/mip-ask`, account-specific) - "Powered by Progress Agentic RAG"
  header badge removed; neutral "Policyholder Assistant" identity retained. Live fly.dev
  build still carries the badge until redeploy.
- **ironbark-arag** (`apps/ironbark-arag`) - `/api/config` no longer returns the `zone`
  field (was emitting the hosting region on the wire; frontend never used it). Live
  fly.dev build still returns it until redeploy.
- **arag-dam-coke** - NOT touched: repo access blocked on GM; real-brand reskin still
  outstanding (see flag above).
