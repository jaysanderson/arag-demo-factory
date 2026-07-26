# Project Instructions — ARAG Demo Factory

This is the **ARAG Demo Factory** — a one-shot generator for **Progress Agentic RAG**
(Nuclia) sales demos. A sales engineer fires one prompt; you select a use case from the
catalog and build a themed, grounded, cited **research portal** end-to-end.

Read `AGENTS.md` — it is authoritative for orchestration, the catalog, the pipeline, and the
Hard Rules. This file is the quick reference.

## The one rule that makes this different

**One shot. No menu.** On the user's first message, map their prompt to a
blueprint × capability set from `catalog/`, echo a single `Building: …` line, and run the
whole pipeline without pausing. Only ask a question if the prompt has zero domain signal
(bare "hi") — and then ask one open question, never a menu. This is the deliberate inverse
of the PDP reference package's "always show A/B/C/D" rule. Do not copy that rule here.

## Key Rules

- **Read `AGENTS.md`** for the full flow, catalog schema, and Hard Rules — follow them exactly.
- **The catalog is the option space.** Match prompts against `catalog/catalog.json`
  (`matchTags`), start from the blueprint's default capabilities, honour explicit
  add/drop modifiers in the prompt.
- **Nuclia does the retrieval. The portal does not.** No local vector store, no second index
  over corpus content. All retrieval + generation is ARAG (`/ask`, `/find`, `/catalog`,
  `/graph`). See `docs/ARAG-API.md`.
- **UI components: KendoReact by default.** Build portal surfaces with @progress/kendo-react-* on @progress/kendo-theme-default, themed per demo. Use a non-Kendo component only where Kendo has no fit and it makes the demo materially better (graph canvas, streaming pane). Tailwind is layout glue. FastTrack (ml-fasttrack) is NOT used — MarkLogic-bound, not on HAR. See docs/UI-KENDO.md.
- **KendoReact gotchas that produce silently-broken UI** (full list + fixes in docs/UI-KENDO.md → "Known KendoReact pitfalls"): `<Card onClick>` and `<Chip onClick>` do NOT fire — use `ClickableCard` / `Pill` for anything clickable; `AppBar` has `overflow:hidden` that clips dropdown menus — fix inline (`style={{overflow:'visible'}}`), not via CSS (Kendo's unlayered `all.css` beats `@layer` rules, even with `!important`). **Verify every clickable element by actually clicking it** — a dead card looks identical to a working one.
- **Fully responsive is required — every demo must work on a phone.** Don't gate responsive layout on CSS display utilities inside Kendo components (Kendo's unlayered CSS overrides `hidden`/`lg:flex` → double-nav overlap); drive breakpoints in JS with `useIsDesktop()`/`useMediaQuery()` and render desktop vs. mobile variants (header uses `MobileNav`). Stack panes below `lg`, use `clamp()` type, keep wide content in `overflow-x-auto`. Preview with `?vp=mobile`. See docs/UI-KENDO.md → "Responsive / mobile".
- **Never rewrite the portal shell — configure it** via `demo.config.json` (blueprint,
  theme, enabled surfaces). Same principle as the reference package's "never rewrite App.js".
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
| The shopping list | `catalog/` (`README.md`, `catalog.json`, `blueprints/`, `capabilities/`) |
| Composer / scaffolder | `create-app.js` |
| Portal shell | `portal/` (`src/`, `server/index.mjs`, `demo.config.json`) |
| Corpus / ingest / verify | `scripts/` |
| Canonical Nuclia surface | `docs/ARAG-API.md` |
| Retrieval & grounding policy | `docs/RETRIEVAL.md` |
| Live portfolio snapshot | `DEMOS.md` |

## Testing

```bash
cd portal && npm test          # portal unit tests
node scripts/verify.mjs        # cornerstone queries answer+cite; refusal probes refuse
```
