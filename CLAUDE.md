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
- **UI components: KendoReact by default — but craft is what hits the bar.** Build portal surfaces with @progress/kendo-react-* on @progress/kendo-theme-default, **themed distinctively per demo** (the `brand`/`accent` CSS variables are yours to set — that is the "we provide the colours, you're the artist" contract). Kendo is the substrate; the *design* — layout, hierarchy, motion, a coherent identity — is what makes it stunning. Use a non-Kendo/bespoke component where it makes the demo materially better (graph canvas, the streaming Ask pane, the cinematic **"Journey through the context"** walk on the Ask surface). Tailwind is layout glue. FastTrack (ml-fasttrack) is NOT used — MarkLogic-bound, not on HAR. See docs/UI-KENDO.md.
- **KendoReact gotchas that produce silently-broken UI** (full list + fixes in docs/UI-KENDO.md → "Known KendoReact pitfalls"): `<Card onClick>` and `<Chip onClick>` do NOT fire — use `ClickableCard` / `Pill` for anything clickable; `AppBar` has `overflow:hidden` that clips dropdown menus — fix inline (`style={{overflow:'visible'}}`), not via CSS (Kendo's unlayered `all.css` beats `@layer` rules, even with `!important`). **Verify every clickable element by actually clicking it** — a dead card looks identical to a working one.
- **Fully responsive is required — every demo must work on a phone.** Don't gate responsive layout on CSS display utilities inside Kendo components (Kendo's unlayered CSS overrides `hidden`/`lg:flex` → double-nav overlap); drive breakpoints in JS with `useIsDesktop()`/`useMediaQuery()` and render desktop vs. mobile variants (header uses `MobileNav`). Stack panes below `lg`, use `clamp()` type, keep wide content in `overflow-x-auto`. Preview with `?vp=mobile`. See docs/UI-KENDO.md → "Responsive / mobile".
- **What's sacred is the guarantees, not the shell.** The invariants are grounding, citations,
  no-invented-data, responsive, and every-control-works — properties carried by the components
  themselves. *Today* the reliable way to keep them is the config-driven shell (theme + enabled
  surfaces via `demo.config.json`), so configure it rather than hand-hacking it. But the shell is
  scaffolding, not the ceiling: the roadmap (see `RELEASE.md` → open items) is to lower the
  deliverable to composable **grounded primitives** the artist arranges freely — freedom of
  composition, incorruptible materials. Never sacrifice a guarantee for a layout, or a layout for
  the shell's convenience.
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
| Reference blueprints + capability vocabulary | `catalog/` (`README.md`, `catalog.json`, `blueprints/`, `capabilities/`) |
| Composer / scaffolder | `create-app.js` |
| Portal shell | `portal/` (`src/`, `server/index.mjs`, `demo.config.json`) |
| Corpus / ingest / verify | `scripts/` |
| Canonical Nuclia surface | `docs/ARAG-API.md` |
| Provisioning reference (KB/SA, search configs, DA agents) | `docs/ARAG-REFERENCE.md` |
| Retrieval & grounding policy | `docs/RETRIEVAL.md` |
| Live portfolio snapshot | `DEMOS.md` |

## Testing

```bash
cd portal && npm test          # portal unit tests
node scripts/verify.mjs        # cornerstone queries answer+cite; refusal probes refuse
```
