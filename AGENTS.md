# AGENTS.md — ARAG Demo Factory

## This Is a Factory, Not an Application

This repo is a **demo factory** for **Progress Agentic RAG (ARAG)** — the Nuclia-based
platform. A sales engineer opens it, fires **one prompt**, and the factory agentically
designs a fitting use case (modelled on the catalog exemplars), generates a synthetic corpus, binds a Knowledge Box,
and brings it home as a **fantastic-looking research portal** — themed, grounded, cited,
and ready to demo.

It is modelled on the PDP Agentic Package's guardrail spine, retargeted from
MarkLogic/Semaphore to ARAG/Nuclia. It ships a **catalog of reference exemplars** drawn from
shipped demos, so every bespoke build is modelled on something that has actually sold before.

**If the user hasn't generated a demo yet, that is the first thing you do — one shot.**

### Setup

```
Step 1 — Prerequisites (Node 20+, Git, a Nuclia account + service-account token):
  Mac/Linux:  chmod +x setup.sh && ./setup.sh
  Windows:    .\setup.ps1

Step 2 — Fire one prompt describing the demo you want (see Orchestration below).
```

**Ask which UI mode at the start (`UI_MODE`), and — for Kendo mode — the license key.** Every demo
builds in one of two modes, captured once in `.env`:
- **`kendo`** (default) — **KendoReact** (the full suite is installed). Needs a license or it shows a
  "license key missing" trial banner in front of the customer. Progress owns Kendo, so the SE has a
  key. If none is configured (no `KENDO_UI_LICENSE` in `.env`, no `telerik-license.txt` at the
  factory/portal root), **ask for it up front**, alongside the Nuclia setup, and write it to
  `KENDO_UI_LICENSE` in `.env`. The build activates it automatically and **offline** (portal
  `prebuild`/`predev` → `scripts/kendo-license.mjs`, using the already-installed
  `@progress/kendo-licensing` — never the public npm registry).
- **`opensource`** — **Radix UI + Recharts + TanStack Table + Tailwind** (all installed). No Kendo, no
  license, no banner.

When `UI_MODE` isn't set, **ask the SE which they want**. Build entirely in that mode — never mix; in
`opensource` mode do **not** import any `@progress/kendo-*` component. The grounding guarantees are
identical in both (the palette pigments are library-agnostic). Component list + OSS equivalents:
`docs/UI-KENDO-COMPONENTS.md`.

**No public npm — installs go through Progress HAR only.** The portal resolves packages through the
Progress HAR registry (the `.npmrc`); `npm ci`/`npm install` in `portal/` must use it, never
npmjs.org. Do not add a dependency that HAR can't serve. If a capability genuinely needs something
HAR can't provide, find a non-npm way (vendor it, or use the platform/SDK differently) rather than
reaching for the public registry.

`create-app.js` transforms this factory directory **in place** into a named demo project —
it composes the chosen blueprint × capabilities into `demo.config.json`, themes and wires
the portal, writes MCP + tool configs, removes factory-only files, and initialises git.
Use `node create-app.js --output ../my-demo` to copy elsewhere instead.

---

## Orchestration Rules (MANDATORY)

> **This factory is deliberately ONE-SHOT.** Unlike the PDP reference package — which
> always shows an A/B/C/D menu and never auto-picks — here the sales engineer fires a
> single prompt and you **build immediately, no menu, no blocking confirmation.** The factory
> builds *any* domain; the shipped blueprints are **reference exemplars**, not the option
> space. Your job is to design a demo that fits their words and go.

### On the user's FIRST message

1. **Read the reference catalog.** Load `catalog/catalog.json` — the shipped blueprints (as
   **reference exemplars** of well-formed demos) and the capability vocabulary + their
   `matchTags`.

2. **Design a bespoke blueprint × capability set for the prompt.**
   - **This package is a palette; you are the artist; the demo is an original masterpiece
     (critical).** The prospect hands you a theme and a set of colours, and you paint a stunning,
     believable *product* from the palette of ARAG capabilities. The shipped blueprints and the
     whole `catalog/` exist only to show the **range** the palette can paint — they are **never**
     templates to match, clone or reproduce. Glance at them for range, then **invent something
     genuinely new**: a new company, domain, copy, and layout of your own design. Even for a close
     match (e.g. "insurance claims and fraud" ≈ `insurance-claims-workbench`), do not reskin it —
     paint a distinct, named fictional company with its own identity and information architecture.
   - **The guarantees live in the materials, not in a frame.** Grounding, citations, and
     no-invented-data are properties of the components you paint with, so compose with total
     freedom — the materials keep every demo truthful no matter how boldly you arrange them.
   - **Author a blueprint that fits the prompt** — the vertical/story, a named fictional company,
     persona, a distinctive visual identity (typography, a coherent brand+accent palette, editorial
     hero, motion), and a corpus brief (docTypes, a shared entity pool, `cornerstoneQueries`,
     `refusalProbes`, a synthetic-only disclaimer). Model the *schema and quality bar* on the
     shipped `catalog/blueprints/*.json`; write the new one to `catalog/blueprints/<slug>.json`
     (the `/add-blueprint` flow). **Never tell the user a domain isn't in the catalog** — invent it.
   - **Everything must be realistic.** Believable company, documents, numbers, names, dates and
     copy — synthetic but never obviously fake, and never lorem-ipsum. The result should read as a
     tool the customer already uses, not a demo.
   - **Blend the full breadth of capabilities into ONE impressive demo.** The capability
     vocabulary in `catalog/capabilities/` is the fixed set of real ARAG surfaces — **default to
     using ALL of them that make sense for the domain** (Ask, Voice, Search, Facets, Assets,
     Graph, Augment [Labeler/Graph/Generator agents], Doc Studio, Calls, Workflows, For You,
     Related, Visibility, Quality/REMi, MCP), so the demo showcases the whole platform woven into
     a coherent story — **not** a minimal three-surface subset, and **never** a menu of options
     for the user to choose from. Only **trim** when the user explicitly narrows scope: "no graph"
     drops `graph`; "just search and chat" restricts to `find` + `cited-ask`. Modifiers add too:
     "with call QA" adds `call-qa`; "show data augmentation" adds `augment`.
   - Derive a **slug** and **title** from the prompt/persona (e.g. "Meridian legal demo" →
     slug `meridian-legal`, title `"Meridian — Matter Intelligence"`).

3. **Echo one line, then build.** Print exactly one line naming what you're building — no
   menu, no "shall I proceed?":
   ```
   Building: Legal Matter Intelligence (from capstone-legal) · surfaces: Ask, Search, Graph · project: meridian-legal
   ```
   Then run the pipeline end-to-end without pausing.

4. **Only ask if the prompt carries zero domain signal.** A bare "hi"/"help"/"what is
   this?" with no buildable intent gets **one** open question — *"What demo do you want? Name
   a vertical (legal, insurance, ops, CX, doc processing, research…) or describe your
   audience."* — **not** a menu. As soon as they answer, resume at step 2.

### After mapping — run the pipeline automatically (do NOT pause between phases)

The ARAG demo pipeline. Phases whose primary verb is "talk to the Knowledge Box" stay in
**your** loop (MCP lives in your runtime — see below); file-generation and code phases may be
delegated.

- **Phase 0 — Scaffold.** Detect `create-app.js` in the workspace root. If present, run
  `node create-app.js --name <slug> --title "<Title>" --blueprint <id> --capabilities <csv> --no-banner`.
  **Never tell the user to run it themselves.** This writes `demo.config.json`, themes the
  portal, and removes factory-only files.
- **Phase 1 — Knowledge Box.** If a KB is already bound (`NUCLIA_KB_URL` +
  `NUCLIA_SERVICEACCOUNT` in `.env`), verify it. **Otherwise, if a NUA key is present
  (`NUCLIA_NUA_KEY` + `NUCLIA_ACCOUNT` + `NUCLIA_ZONE`), AUTO-PROVISION — the factory creates and
  manages its own ARAG assets; do NOT make the user create a KB by hand:** run
  `node scripts/create-kb.mjs --title "<Title>" --slug <slug>`. It creates a fresh KB, mints a
  service-account token, and writes `NUCLIA_KB_URL` / `NUCLIA_KB_ID` / `NUCLIA_ZONE`
  (+ `NUCLIA_SERVICEACCOUNT`) into `.env`. If it exits 3 (KB made, token needs a one-click
  dashboard key), relay that single step to the user. Then verify reachability (`/counters` via
  MCP or the `nuclia` tools).
- **Phase 2 — Corpus.** If the blueprint has a live reference KB already seeded (e.g.
  `grains-research`), bind it. Otherwise `@knowledge-engineer` generates a synthetic corpus
  from the blueprint's `corpus` brief (recurring entities, doc types, cornerstone queries),
  and **you** ingest it via MCP (`search`/`resources`/labelset tools). Multi-modal doc types
  (transcripts, media) get `media_type`/`duration` so those surfaces light up.
- **Phase 3 — Retrieval & agent config.** Set the RAG strategy, prompt, and citation policy
  (see `docs/RETRIEVAL.md`). Grounding is mandatory: neighbouring-paragraph context on,
  citations on. **Every demo also provisions these on its KB — do NOT skip them** (endpoints +
  auth in the bundled product guide — `reference/agentic-rag-guide/`, esp. Ch 8 (ingestion
  agents), Ch 13 (RAG config), and Appendices A/B):
  - **1+ saved search configurations** (`search_configurations/{name}` on the `dp` host) so the
    demo ships tuned retrieval, and the portal defaults to one via `NUCLIA_SEARCH_CONFIG`
    (`scripts/create-retrieval.mjs`, or via the `nuclia` MCP).
  - **Core Data-Augmentation agents** — run `node scripts/create-da-agents.mjs --apply ALL`
    (optionally `--labels '<json>'` from the blueprint's labelsets): **llm-graph** (→ graph +
    related), **synthetic-questions** (→ richer retrieval), and **labeler** (→ facets, when labels
    are given). VERIFIED live and baked into the script: the tasks API (`POST /kb/{kb}/task/start`
    on the `dp` host) is authed with the **KB service-account (SOWNER) token — NOT the NUA key**
    (which returns 403); tasks run **`on: 1` (field)**; `operations` is a keyed container
    (`{graph|label|qa|…}`). These run against the SE's OWN KB — no central/shared KB is ever
    required (the package is distributed; each SE brings their account).
- **Phase 4 — Portal.** `@ui-developer` **PAINTS A BESPOKE SHELL — this is the default and the
  point.** Author `portal/src/demo/composition.tsx` exporting a full `Shell`: your OWN navigation,
  layout, information architecture and routes, composed from **the palette** (`portal/src/palette/`,
  see its `README.md` + `docs/PALETTE-ARCHITECTURE.md`), fitted to THIS domain — a dealership demo is
  an operations console (sidebar by function + dashboard + check-in); a legal demo is a matter
  workspace; etc. The demo must be **structurally unique**, not just recoloured. **Merely theming
  `demo.config.json`'s fixed AppBar + Converse/Explore/Analyze/Extend nav is the config-shell — a
  throwaway quick-sketch ONLY; shipping it as a real demo is a FAILURE (every such build is a
  cookie-cutter clone).** Compose entirely from the palette's grounded pigments
  (`useAsk`+`<GroundedAnswer>`, `<CitedMetric source>`, `<JourneyThroughContext>`, `useCatalog`
  facets, `useGraph`, `<ResourceDetail>` at `/r/:id`, …) so the guarantees hold by construction —
  never hand-hack an uncited answer or a hardcoded metric. Two demos must never share a layout.
  **Every build ships a guided tour — always:** generate a `demoScript` (ordered narrated beats,
  each deep-linking a surface) in `demo.config.json`, and the walkthrough mounts itself — the config
  shell renders a "Guided tour" button and the App frame auto-mounts `<GuidedTourLauncher>` for any
  bespoke `Shell` (also exported from the palette to place in your own chrome). A build without a
  `demoScript` / guided tour is a FAILURE. **The full KendoReact component palette — every component
  you can compose with, what's installed vs. addable via HAR — is catalogued in
  `docs/UI-KENDO-COMPONENTS.md`;** reach for the components that fit the domain (Data Grid / TreeList
  for records, Scheduler / Gantt / TaskBoard for operations, Charts / Gauges for dashboards, AI Prompt
  / Chat for the copilot, PDF Viewer / Upload for documents), always themed per demo and grounded.
- **Phase 5 — Verify.** `@tester` runs the blueprint's `cornerstoneQueries` (must answer,
  cited) and `refusalProbes` (must refuse, not confabulate). Grounded + cited or it's a bug.
  **The groundedness lint runs automatically on every `npm run build`** (`scripts/lint-groundedness.mjs`,
  wired into `prebuild`): it fails the build on any hardcoded metric literal or external data fetch,
  so fabricated data cannot ship. If it fails, derive the number from the KB or use `<CitedMetric>`.
  **Also click through the whole app** — every nav menu opens and navigates, every suggestion/pill
  runs, every result/asset/citation opens the `/r/:id` watch page, the graph pivots. Kendo's
  dead-onClick gotchas (see `docs/UI-KENDO.md`) mean a card can look perfect and do nothing, so
  interaction must be exercised, not eyeballed. The demo must survive an "idiot walkthrough": an
  SE clicking anything visible should always get a working result.
  **Also verify mobile** — SEs demo and share links from phones. Check the layout at a phone width
  (`?vp=mobile` forces the JS breakpoint) and on a real device: the hamburger `MobileNav` replaces
  the desktop nav (no double-nav), panes stack, nothing scrolls horizontally. Fully responsive is a
  package requirement — see `docs/UI-KENDO.md` → "Responsive / mobile".
- **Phase 6 — Deliver.** Print the local URL, a one-paragraph "what to show" from the demo
  script, and (if asked) deploy to Fly (`<slug>.fly.dev`). Print a timing summary.

### What NOT to do

- Do NOT show an A/B/C/D menu. This factory maps intent and builds. (The reference package
  does the opposite on purpose; do not copy that rule here.)
- Do NOT pause for "shall I proceed?" between phases. One shot means one shot.
- Do NOT tell the user to run `create-app.js` — run it for them in Phase 0.
- DO author a bespoke blueprint that fits the prompt — the catalog blueprints are reference
  exemplars, not a menu; reuse one only when it is a genuinely strong match. Never limit the
  user to the catalog.
- Do NOT ship anything that violates the **Hard Rules** below.

---

## The Catalog — reference exemplars + capability vocabulary

`catalog/` holds **reference blueprints** (exemplars — the factory authors a bespoke one per
prompt, modelled on these) and the **fixed capability vocabulary**. The factory builds any
domain. See `catalog/README.md` for the full schema. In brief:

- `catalog/blueprints/*.json` — vertical stories derived from **shipped** ARAG demos
  (legal, insurance, ops, CX, code-intel, doc-processing, sales-enablement, research,
  personalization, AI-visibility…). Each declares a persona, a synthetic-corpus brief, a
  theme, default capabilities, a demo script, and an exec pitch.
- `catalog/capabilities/*.json` — composable ARAG surfaces (`cited-ask`, `find`, `facets`,
  `graph`, `doc-pipeline`, `augment`, `call-qa`, `workflows`, `remi`, `mcp`, `personalize`,
  `visibility`, `personas`, `voice`, `assets`, `related`). Each maps to a portal surface and
  declares the KB features it needs. **`augment`** is the ingestion-time enrichment story —
  the Labeler / Graph / Generator **data-augmentation agents** running live via `/predict`
  (classify into the KB taxonomy, extract the entity graph, generate grounded Q&A). Add it when
  a prompt asks about labeling/classification, entity/graph extraction, Q&A or synthetic-data
  generation, or "how the knowledge base builds/enriches itself."
- `catalog/catalog.json` — the index you match prompts against.

A demo = **one blueprint × a chosen subset of capabilities**, composed into
`demo.config.json`. The portal renders itself from that config; it is never rewritten per
demo. Grounded in `DEMOS.md` (the live-portfolio snapshot) and `docs/ARAG-API.md` (the
canonical Nuclia surface).

---

## MCP Tools — Primary Interface (MANDATORY)

The `nuclia` MCP server is the primary interface for all Knowledge Box operations
(`search_documents`, `get_document`, `batch_get_documents`, and the write/ingest tools).
Tools are self-describing — discover by intent. Fall back to the ARAG REST API only if MCP
is unavailable/broken, or for non-Nuclia HTTP targets (the portal's own server/UI).

### MCP Lives in YOUR Runtime — Don't Delegate MCP Work

MCP servers register against the **orchestrator's** process, not subagent runtimes. If you
spawn `@knowledge-engineer`, `@retrieval-engineer`, etc., they will NOT see the `nuclia`
tools.

**Stay in YOUR loop for:** binding/creating the KB, ingesting resources, creating
labelsets, configuring retrieval/agents, running search/ask verification, groundedness
checks. **Delegate to subagents only for:** generating corpus files to disk, editing portal
source and configs, shell probes against the portal (local ports), lint/test/build runs.
**Pattern:** subagent produces an artifact → you make the MCP calls against it → next
subagent edits/verifies. Every specialist agent has an `MCP Boundary` block telling it to
stop and hand KB work back to you; honour that — don't push REST/curl fallbacks.

---

## Hard Rules (Factory Safety — NON-NEGOTIABLE)

Every demo this factory produces is customer-facing. These are enforced by `create-app.js`
and must be honoured by every agent and phase. They come from the GTM factory's own
governance (`DEMOS.md` flags).

1. **Synthetic only.** Never present real records as genuine. All corpora are generated.
   `create-app.js` refuses a `demo.config.json` with `safety.syntheticOnly:false`.
2. **No real brands or trademarks.** Use fictional companies, firms, and products. Never
   theme a demo as a real named brand (the portfolio has been burned by a real-brand DAM
   demo — do not repeat it). Real *place names, crop/variety names, and public institutions*
   are acceptable for realism when the brand/persona itself is fictional.
3. **Anonymise identities.** Never seed a demo with a real person's name, email, or handle.
   Default contact/author fields to synthetic values (`demo@example.com`, invented names).
4. **Residency safety.** Never print the hosting region / zone string on a customer-facing
   surface. AU/ANZ residency is not offered — do not claim it. Keep zone in server-side env,
   never in the UI.
5. **Visible disclaimer.** Every generated portal renders a synthetic-data disclaimer
   (footer or banner) from `demo.config.json`'s `safety.disclaimer`.
6. **Token hygiene.** The KB service-account token lives only in server-side env
   (`NUCLIA_SERVICEACCOUNT`), never in `demo.config.json`, the UI bundle, or git. `.env` and
   `.mcp.json` are gitignored.

If a requested demo would violate any of these, adapt it (reskin to fictional, synthesise
the data) and note what you changed — do not refuse the whole build, and do not silently ship
the violation.

---

## Architecture

```
Generated demo portal (Vite + React + TypeScript, one shell, config-driven)
  → Portal server (Express, server/index.mjs) — holds NUCLIA_SERVICEACCOUNT, proxies ARAG
       → Progress Agentic RAG (Nuclia)   — ALL retrieval + generation:
              /ask (NDJSON stream, cited)   /find   /catalog (facets)   /graph
              /resources (+ POST to ingest)  labelsets   {kb}/predict/chat   {kb}/mcp/sse
  → demo.config.json  — blueprint × capabilities → which surfaces render, theme, KB binding, script

Factory tooling (removed from generated projects):
  catalog/       — reference blueprints (exemplars) + capability vocabulary
  create-app.js  — composer/scaffolder (zero-dep Node)
  scripts/       — corpus generation, ingest, verify, build-catalog (zero-dep Node)
```

- **Plain JavaScript in factory tooling; TypeScript in the portal** (matches the shipped
  portfolio — research-portal, capstones).
- **The demo IS the product, not a pitch — this is the north star.** The whole point of the
  one-shot build is to hand an SE a demo the prospect immediately reads as *their own working
  environment*, somewhere they could be tremendously valuable right now. It must NOT look like a
  sales-enablement tool or a Progress brochure. Concretely: the landing is a **working home** — a
  prominent ask bar, real starter questions (`probes.answerable`), live knowledge-base status, and
  a quiet tool launcher — never a marketing hero. Ban brochure tells: no "showcase" eyebrow/vertical,
  no "one solution / N capability areas", no "how the demo flows" section, no capability-selling
  copy in the UI. The product wears its **own** identity (title/brand as "Mission Intelligence"
  etc.), not "Agentic RAG platform"; Progress attribution is a quiet footer credit. The blueprint's
  `sells` line is **talk-track only and must never render in the product** — surfaces show the
  functional `tagline`. Write `tagline`/`elevatorPitch`/`disclaimer` as product copy (what it does,
  grounded + cited), not slogans. `OverviewSurface.tsx` is the reference implementation.
- **UI components: use the Progress vendor controls (KendoReact) wherever possible.** This is a
  brand requirement, not a preference — a Progress Agentic RAG demo must visibly run on
  Progress's own UI stack. Build every surface with KendoReact — `@progress/kendo-react-{layout,
  buttons,inputs,grid,charts,indicators,gauges,progressbars,notification,dropdowns,dialogs,…}` on
  `@progress/kendo-theme-default`, themed per demo from `demo.config.json.theme`. If a piece of UI
  *can* be a Kendo control (chart, grid, gauge, progress, card, tile layout, menu, drawer, chip,
  input), use the Kendo control and theme it beautifully — **do not hand-roll it.** Custom code is
  allowed ONLY where Kendo has no equivalent: the ambient/atmospheric background, the
  force-directed knowledge-graph canvas, and the token-by-token streaming answer pane. Tailwind is
  layout/spacing glue, not the component system. **The KendoReact trial banner (shown without a
  licence key) is acceptable — a key is applied at build time (`KENDO_UI_LICENSE` /
  `telerik-license.txt`, see `docs/UI-KENDO.md`); never avoid or replace a Kendo control just to
  suppress the banner.** npm resolves through the **Progress HAR registry** — the `.npmrc` files
  ship with the project and need **no auth for read access**, so `npm ci` against the pinned
  lockfile just works (deterministic + cooldown-safe; HAR blocks packages published <14 days ago).
  Never remove the `.npmrc` — it's a supply-chain security control, not a workaround.
- **KendoReact has silent-failure gotchas — read `docs/UI-KENDO.md` → "Known KendoReact
  pitfalls" before building or debugging UI.** The big ones: `<Card onClick>` and `<Chip onClick>`
  never fire (use `components/ClickableCard` and `components/Pill` for anything clickable);
  `AppBar` clips dropdown menus with `overflow:hidden` (override inline — Kendo's unlayered CSS
  beats layered `@layer`/`!important` rules). **A dead card looks identical to a working one, so
  the Verify phase MUST click through every interactive element**, not just screenshot it.
- **FastTrack (`ml-fasttrack`) is intentionally NOT used.** It is a MarkLogic-bound accelerator
  (its `MarkLogicProvider` speaks MarkLogic's `/v1/search`), it is not on HAR, and no ARAG demo
  uses it. Its look is reproduced with KendoReact directly — which is what FastTrack is built on.
- The portal **never talks to Nuclia directly** — the Express server holds the token and
  proxies, exactly as every shipped demo does (`X-NUCLIA-SERVICEACCOUNT: Bearer …`).
- Answers **must** render citations. An ungrounded answer is surfaced as a warning, never as
  bare text.

---

## Key Files

| Purpose | Path |
|---------|------|
| Orchestration (authoritative) | `AGENTS.md` (this file) |
| Claude Code entry | `CLAUDE.md` |
| Copilot orchestrator | `.github/copilot-instructions.md` |
| Specialist agents | `.github/agents/` and `.claude/agents/` |
| Reference blueprints + capability vocabulary | `catalog/` (`README.md`, `catalog.json`, `blueprints/`, `capabilities/`) |
| Composer / scaffolder | `create-app.js` |
| Corpus / ingest / verify | `scripts/` |
| Portal shell (config-driven) | `portal/` (`src/`, `server/index.mjs`, `demo.config.json`) |
| **ARAG product guide (the plain 910-page document — read it to build ANY part of the platform)** | **`reference/agentic-rag-guide/`** — the full practitioner's guide (19 chapters + API appendices A–G + PDF). Open the relevant chapter before reverse-engineering anything. Partners may also ingest these files into their own KB. Index: its `README.md` / `TABLE_OF_CONTENTS.md`. |
| Retrieval & grounding policy | `docs/RETRIEVAL.md` |
| Live portfolio snapshot | `DEMOS.md` |
| MCP config | `.mcp.json`, `opencode.json`, `.vscode/mcp.json`, `.cursor/mcp.json` |

## Environment

| Variable | Purpose |
|---|---|
| `NUCLIA_SERVICEACCOUNT` | KB service-account token (JWT / `kb-…`) — `X-NUCLIA-SERVICEACCOUNT: Bearer`. Server-side only. |
| `NUCLIA_KB_URL` | Full KB base, `https://<zone>.rag.progress.cloud/api/v1/kb/<id>` (doc-processing KBs use `dp.progress.cloud`). |
| `NUCLIA_ZONE` | e.g. `europe-1`, `aws-eu-1`. Server-side only — never rendered. |
| `NUCLIA_NUA_KEY` / `NUCLIA_ACCOUNT` | NUA key + account slug — lets the factory create and manage its own ARAG assets (Option A auto-provisioning). |
| `PORT` | Portal server port (default 8080 in container, 4000 local). |
