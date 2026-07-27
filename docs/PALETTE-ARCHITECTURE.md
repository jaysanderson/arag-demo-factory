# Palette Architecture

**The package is a palette; the sales engineer is the artist; each demo is an original
masterpiece.** This document is the architecture that makes that literally true in the portal —
so the factory stops being a paint-by-numbers kit and becomes a creative medium, without ever
sacrificing the guarantees (grounded, cited, no invented data, works on a phone, every control
lives).

## The core idea: guarantees live in the materials, not in a frame

A locked template feels safe because it controls what can appear. But it also caps originality.
The way to get *both* freedom and safety is to push the guarantees **down into the pigments**: make
each primitive incapable of lying, then let the artist compose without limits.

- A `<GroundedAnswer>` cannot render an uncited claim.
- A `<CitedMetric>` cannot render a number without KB provenance.
- The build's groundedness lint rejects hardcoded metrics and external data fetches.

Free composition, incorruptible materials.

## The two layers

### 1. Pigments — grounded capability primitives (`portal/src/palette/`)
- **Hooks** (`hooks.ts`): `useAsk`, `useSearch`, `useCatalog`, `useGraph`, `useEntities`,
  `useHealth`. Each draws from the KB through the `/api` proxy; none can fabricate.
- **Guaranteed components**: `GroundedAnswer`, `CitedMetric`, `JourneyThroughContext`,
  `ConfidenceRing`, `Citations`.

### 2. Medium — the design system (`layout.tsx` + theme tokens)
Unopinionated primitives (`Hero`, `Section`, `Panel`, `TileGrid`) driven by the demo's own
`--brand` / `--accent` tokens. The canvas and brushes, never the picture.

Everything is re-exported from `palette/index.ts` — one import surface for the artist. See
`palette/README.md` for the painting guide.

## Composition seam (`palette/compose.ts`)

The shell reads an **absent-safe** composition via `import.meta.glob`:

- **No `portal/src/demo/composition.tsx`** → the config-driven shell renders the enabled surfaces
  from `demo.config.json` (the reliable "quick sketch"). This is the default; stock builds are
  unchanged.
- **A `composition.tsx` present** → the shell hands it the home page and any bespoke routes, which
  it paints from the palette. Header/footer/disclaimer and the `/r/:id` watch page still wrap it.

So a demo can be a quick config sketch or a fully painted, bespoke experience — same guarantees
either way.

## The guard (`scripts/lint-groundedness.mjs`)

Wired into `portal` `prebuild`, so it runs on every `npm run build` and **fails the build** on:
1. **Hardcoded metric literals** — `value="63%"`. Derive from the KB or use `<CitedMetric source=…>`.
2. **External data fetches** — anything to an `http(s)://` / `//` host. All data comes through the KB.

Plus a warning when an answer is rendered without `<GroundedAnswer>`.

## Migration status

| Phase | State |
|-------|-------|
| A — extract pigments/hooks + medium into `palette/` | ✅ shipped |
| B — incorruptible contracts + fix violations (Call QA `100%/2%`, `sells`) + groundedness lint | ✅ shipped |
| C — composition seam (bespoke Home + painted routes; config-shell fallback) | ✅ shipped |
| D — docs (this file + `palette/README.md`) | ✅ shipped |
| Parity — refactor the 15 legacy surfaces to consume the palette | ◐ in progress (Ask done; others still render via `lib/arag` directly and stay valid) |

## Roadmap

- Finish porting the remaining surfaces onto the palette (remove duplicated ask/cite logic).
- Add pigments as capabilities grow (a `<CoverageDial>`/`<RemiDial>` from `useAsk` sweeps; a
  `<GraphCanvas>` wrapper).
- Optional: let a composition override the nav, not just Home + routes.
