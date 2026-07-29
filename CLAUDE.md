# Project Instructions — ARAG Demo Factory

This is the **ARAG Demo Factory** — a one-shot generator for **Progress Agentic RAG**
(Nuclia) sales demos. A sales engineer fires one prompt; you design a demo that fits it —
inventing the vertical and corpus, modelled on the catalog exemplars — and build a themed,
grounded, cited **research portal** end-to-end.

Read `AGENTS.md` — it is authoritative for orchestration, the catalog, the pipeline, and the
Hard Rules. This file is the quick reference.

## The one rule that makes this different

**One shot. No menu.** On the user's first message, **design a demo that fits their prompt** —
invent the vertical, the corpus, and the capability set — and **blend the full breadth of ARAG
into one comprehensive, impressive demo** (use every capability that fits the domain — Ask, Voice,
Search, Facets, Assets, Graph, Augment, Doc Studio, Calls, Workflows, For You, Related, Visibility,
Quality, MCP — not a minimal subset). Echo a single `Building: …` line and run the whole pipeline
without pausing. **Never present a list of options for the user to choose from.** Only ask a
question if the prompt has zero domain signal (bare "hi") — then one open question, never a menu.
This is the deliberate inverse
of the PDP reference package's "always show A/B/C/D" rule. Do not copy that rule here.

**This package is a palette; the SE is the artist; each demo is an original masterpiece.** The
prospect hands you a theme and a set of colours, and you paint a stunning, believable product from
the palette of ARAG capabilities. So: invent a bespoke visual identity and information architecture
of your own design — **not** a template with the colours swapped, **not** "random React components
everywhere," and **not** a clone of any existing demo. The reference demos and the `catalog/` exist
only to show the **range** the palette can paint; they are **never** templates to match or reproduce
— glance at them for range, then invent something genuinely new (new company, domain, copy, layout).
**Everything must be realistic:** believable company, documents, numbers, names and copy — synthetic
but never obviously fake, never lorem-ipsum.

**The guarantees live in the materials, not in a frame.** Grounding, citations, and no-invented-data
are properties of the *pigments* — a grounded answer cannot render an uncited claim; a metric can
only show a number computed from the Knowledge Box. That is exactly what lets you compose with total
freedom: the materials keep the demo truthful no matter how boldly you paint.

## Key Rules

- **Read `AGENTS.md`** for the full flow, catalog schema, and Hard Rules — follow them exactly.
- **The catalog is a REFERENCE library, not a menu.** The factory builds *any* domain. Author a
  bespoke blueprint for the prompt — modelled on the shipped `catalog/blueprints/*.json` as
  exemplars (schema, corpus brief, capability mix, cornerstone/refusal queries, the quality bar).
  Reuse or adapt a reference blueprint only when it's a genuinely strong match; otherwise write a
  new one. Never constrain the user to the catalog or say a domain "isn't available." Capabilities
  (`catalog/capabilities/`) ARE the fixed vocabulary of ARAG surfaces — draw the capability set
  from there and honour add/drop modifiers in the prompt.
- **Nuclia does the retrieval. The portal does not.** No local vector store, no second index
  over corpus content. All retrieval + generation is ARAG (`/ask`, `/find`, `/catalog`,
  `/graph`). See `docs/ARAG-API.md`.
- **The demo IS the product, not a pitch.** The prospect must feel they've opened *their own* working tool and could be tremendously productive in it right now — never a Progress/sales-enablement brochure. So: the landing is a **working home** (a prominent ask bar + real starter questions from `probes.answerable` + live KB status + a quiet tool launcher), NOT a marketing hero. No "showcase" framing, no "one solution / N capability areas", no "how the demo flows", no capability-selling copy in the UI. Product chrome uses the product's own identity (title/brand), not "Agentic RAG platform"; vendor attribution is a quiet footer credit only. The `sells` field is **talk-track only — never rendered in the product** (the UI uses the functional `tagline`). Value is shown by *using* the tool, not claimed in copy. See `OverviewSurface.tsx`.
- **UI components: KendoReact by default — but craft is what hits the bar.** Build portal surfaces with @progress/kendo-react-* on @progress/kendo-theme-default, **themed distinctively per demo** (the `brand`/`accent` CSS variables are yours to set — that is the "we provide the colours, you're the artist" contract). Kendo is the substrate; the *design* — layout, hierarchy, motion, a coherent identity — is what makes it stunning. Use a non-Kendo/bespoke component where it makes the demo materially better (graph canvas, the streaming Ask pane, the cinematic **"Journey through the context"** walk on the Ask surface). Tailwind is layout glue. FastTrack (ml-fasttrack) is NOT used — MarkLogic-bound, not on HAR. **The full KendoReact component palette you can compose with is catalogued in docs/UI-KENDO-COMPONENTS.md** (what's installed now vs. addable via HAR). See docs/UI-KENDO.md.
- **Compose from the design system — this is what stops demos looking "vibe-coded".** The visual
  baseline is **borrowed from Progress** (progress.com fonts, cool-slate ink ramp, crisp ~5px radii,
  the type/spacing/elevation/motion tokens) — that gives *polish and consistency*; the prospect's
  `--brand`/`--accent` (set per demo) give *uniqueness*. Build every surface from the tokens +
  primitives (type scale, `ink-*` ramp, `brand`/`accent`, `.card`/`.btn`/`.field`/`.eyebrow`, the
  palette layout + pigments) — **never** arbitrary values (`text-[13px]`, raw hex, one-off
  radius/shadow); there's a token for it. Borrow Progress's *craft, not its branding* — customer
  surfaces wear the prospect's identity, not Progress's. Full language + discipline:
  **docs/DESIGN-SYSTEM.md**.
- **Two UI modes — ask which at the start (`UI_MODE`).** Every demo builds in one of two modes,
  captured once in `.env`: **`kendo`** (default) uses **KendoReact** (the full suite is installed) and
  needs a license — if none is set (`KENDO_UI_LICENSE` in `.env` or a `telerik-license.txt` at the
  root), ask the SE for their key up front and write it to `.env` (the build activates it offline via
  `scripts/kendo-license.mjs`), else it shows a trial banner; **`opensource`** builds with
  **Radix UI + Recharts + TanStack Table + Tailwind** (all installed), no Kendo, no license. Ask which
  the SE wants when it isn't set. **Never mix modes in one demo**; in `opensource` mode do not import
  any `@progress/kendo-*` component. The grounding guarantees hold in both (the pigments are
  library-agnostic). Full component list + OSS equivalents: `docs/UI-KENDO-COMPONENTS.md`.
- **No public npm.** **All installs resolve through the Progress HAR registry (the `.npmrc`), never
  npmjs.org** (HAR proxies public npm, so OSS libs install through it; the `min-release-age` policy
  pins newer versions to older allowed ones). Don't add a dependency HAR can't serve; if something
  truly isn't on HAR, vendor it or find a non-npm path rather than using the public registry.
- **KendoReact gotchas that produce silently-broken UI** (full list + fixes in docs/UI-KENDO.md → "Known KendoReact pitfalls"): `<Card onClick>` and `<Chip onClick>` do NOT fire — use `ClickableCard` / `Pill` for anything clickable; `AppBar` has `overflow:hidden` that clips dropdown menus — fix inline (`style={{overflow:'visible'}}`), not via CSS (Kendo's unlayered `all.css` beats `@layer` rules, even with `!important`). **Verify every clickable element by actually clicking it** — a dead card looks identical to a working one.
- **Fully responsive is required — every demo must work on a phone.** Gate the SHELL's own structure (sidebar ⇄ hamburger/drawer) in JS with `useIsDesktop()`/`useMediaQuery()` — both are exported from the palette — and render desktop vs. mobile variants; **never** gate shell structure with CSS `lg:`/`hidden` (only `useIsDesktop()` honours the `?vp=mobile` preview override, and Kendo's unlayered CSS beats Tailwind display utilities → double-nav overlap). Stack panes below `lg`, use `clamp()` type, keep wide content (graphs, tables) in `overflow-x-auto` so it scrolls *inside* its panel and the page body never scrolls sideways. **Long chip/pill/suggestion labels must wrap** — the palette `<Pill>` already wraps; any custom clickable text needs `white-space:normal` + `overflow-wrap:anywhere` or it forces horizontal overflow on a phone. **Verify at 390px, not just `?vp=mobile`** (which only flips the JS hook, not CSS breakpoints): confirm `document.documentElement.scrollWidth <= 390` on every route. See docs/UI-KENDO.md → "Responsive / mobile".
- **Paint a bespoke shell per demo — the config-shell is a cookie-cutter trap.** Every real demo
  must author `portal/src/demo/composition.tsx` with a full **`Shell`** — its OWN navigation,
  layout, information architecture and routes, composed from the palette (`portal/src/palette/`) and
  fitted to the domain (a dealership = an operations console; legal = a matter workspace; …) — so it
  is **structurally unique**, not just recoloured. Merely theming `demo.config.json`'s fixed AppBar +
  Converse/Explore/Analyze/Extend nav is the config-shell: a throwaway quick-sketch ONLY; shipping it
  as a real demo is a failure (two demos then share a layout). **What's sacred is the guarantees, not
  any shell** — grounding, citations, no-invented-data, responsive, every-control-works — and they
  are carried by the palette pigments (`<GroundedAnswer>` can't show an uncited claim; `<CitedMetric
  source>` can't show an un-sourced number), so free composition never breaks them.
- **Every build ships a guided tour — always.** Generate a `demoScript` (an ordered set of
  narrated beats, each deep-linking a surface) in `demo.config.json` for *every* demo, and the tour
  renders itself: the config shell shows a "Guided tour" button, and the App frame auto-mounts
  `<GuidedTourLauncher>` for any bespoke `Shell` (also exported from the palette if you'd rather place
  it in your own chrome). Never ship a demo without a `demoScript` — an empty tour is a failure.
- **Answers must render citations.** An ungrounded answer is surfaced as a warning, never as
  bare text.
- **Hard Rules are non-negotiable** (AGENTS.md): synthetic only, no real brands, anonymise
  identities, no residency strings on screen, visible disclaimer, token server-side only.
- **The KB token never leaves the server.** `NUCLIA_SERVICEACCOUNT` is server-side env; never
  in `demo.config.json`, the UI, or git.

## MCP Tools

The `nuclia` MCP server is the primary interface for all Knowledge Box work
(`search_documents`, `get_document`, `batch_get_documents`, ingest/write tools). Discover by
intent. MCP lives in **your** runtime — subagents don't inherit it, so all KB work (bind,
ingest, configure, verify) stays in your loop; delegate only file/code generation. Fall back
to the ARAG REST API only if MCP is unavailable, or for non-Nuclia targets (the portal's own
server/UI).

## Pipeline (after mapping the prompt)

Phase 0 Scaffold (`create-app.js`) → 1 Knowledge Box → 2 Corpus (bind live, or generate +
ingest) → 3 Retrieval & agent config → 4 Portal (theme + wire surfaces) → 5 Verify
(cornerstone queries answer & cite; refusal probes refuse) → 6 Deliver (URL + demo script,
optional Fly deploy).

**Phase 3 — don't skip the Generator (structured extraction). It's the biggest multiplier on how
impressive a demo can be.** Beyond graph/synthetic-questions/labeler, the `ask` DA task extracts
**typed, validated structured JSON** from unstructured resources into a native **`key_value` field**
that conforms to a **KV schema you register** (`POST /kb/{kb}/kv-schemas`; types
`text|integer|float|boolean|date`). That turns *any* corpus into product-grade structured data — so
the demo can have **real charts, KPI dashboards, sortable/filterable data grids, facets, comparison
tables, timelines and maps**, all grounded/cited, nothing mocked. Whenever the corpus hides recurring
facts, register a schema + run the Generator (`scripts/create-da-agents.mjs --generate '<json>'`),
then build at least one chart, one rich result card, and one facet from it. See
**`docs/DATA-AUGMENTATION.md`**.

## Architecture

```
Portal (Vite + React + TS, config-driven, one shell)
  → Express server (server/index.mjs) — holds NUCLIA_SERVICEACCOUNT, proxies ARAG
       → Progress Agentic RAG (Nuclia) — /ask /find /catalog /graph /resources predict/chat mcp
  → demo.config.json — blueprint × capabilities drive which surfaces render + theme + KB binding
```

## Key Files

| Purpose | Path |
|---------|------|
| Orchestration (authoritative) | `AGENTS.md` |
| Reference blueprints + capability vocabulary | `catalog/` (`README.md`, `catalog.json`, `blueprints/`, `capabilities/`) |
| Composer / scaffolder | `create-app.js` |
| Portal shell | `portal/` (`src/`, `server/index.mjs`, `demo.config.json`) |
| Corpus / ingest / verify | `scripts/` |
| **ARAG product guide (plain 910-page document — read to build any capability)** | **`reference/agentic-rag-guide/`** (19 chapters + API appendices + PDF) |
| Retrieval & grounding policy | `docs/RETRIEVAL.md` |
| Live portfolio snapshot | `DEMOS.md` |

## Testing

```bash
cd portal && npm test          # portal unit tests
node scripts/verify.mjs        # cornerstone queries answer+cite; refusal probes refuse
```
