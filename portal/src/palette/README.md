# The Palette

This is what the sales engineer paints with. The **package is a palette**, the **SE is the
artist**, and each **demo is an original masterpiece**. The portfolio and `catalog/` show the
*range* the palette can paint — they are never templates to copy.

Import everything from the barrel:

```ts
import { useAsk, GroundedAnswer, CitedMetric, JourneyThroughContext,
         Hero, Section, Panel, TileGrid, ConfidenceRing } from '../palette';
```

## The pigments (grounded data hooks)

Every hook draws from the Knowledge Box through the portal's own `/api` proxy. None can invent
data — they return what ARAG returned, plus loading/error state.

| Hook | Paints with | Notes |
|------|-------------|-------|
| `useAsk()` | a streamed, cited answer | `resourceId` scopes it to one source |
| `useSearch()` | ranked semantic results (`/find`) | |
| `useCatalog(immediate?)` | faceted browse of the corpus | metadata, not semantic |
| `useGraph()` | knowledge-graph paths | |
| `useEntities(immediate?)` | entity groups | |
| `useHealth()` | KB liveness + resource count | |

Capabilities without a hook yet: use `arag.*` (the raw grounded client) or `buildStops`/`relate`.

## The guaranteed components (truthful by construction)

These are why composition can be free without ever fabricating — **the guarantees live in the
materials, not in a frame**:

- **`<GroundedAnswer state={useAsk()} />`** — renders an answer *with its sources*, and is
  structurally incapable of showing an uncited claim: a zero-citation answer renders an
  ungrounded/refusal warning instead of clean prose. Includes the Journey walk.
- **`<CitedMetric label value source />`** — a number on screen must come from the KB. `source`
  (its provenance) is **required**; derive `value` from a KB response. Never pass a hand-typed
  figure — the groundedness lint fails the build on literal metric values.
- **`<JourneyThroughContext open query citedIds onClose />`** — the cinematic per-source grounding
  walk (confidence rings, "cited" badges, resource-scoped "how this relates").
- **`<ConfidenceRing score />`**, **`<Citations />`** — supporting pigments.

## The medium (layout primitives)

Unopinionated, theme-token-driven canvas + brushes — no vertical, no fixed nav baked in:
`<Hero>`, `<Section>`, `<Panel>`, `<TileGrid>`. Colour comes from the demo's own `--brand` /
`--accent` tokens, so the same primitives read completely differently per demo.

## How to paint (the composition seam)

By default the portal renders the **config shell** — a reliable quick-sketch that themes and
renders the enabled surfaces from `demo.config.json`. To paint something bespoke, drop a
`portal/src/demo/composition.tsx`:

```tsx
import { useAsk, GroundedAnswer, Hero, Section, CitedMetric, useCatalog } from '../palette';
import type { DemoComposition } from '../palette';

export const composition: DemoComposition = {
  Home: ({ config }) => {
    const chat = useAsk();
    return (
      <div className="space-y-8">
        <Hero eyebrow={config.theme.brandName} title="…a landing you designed…" />
        {/* …compose the pigments into your own information architecture… */}
        <GroundedAnswer state={chat} />
      </div>
    );
  },
  routes: [{ path: '/briefings', Component: ({ config }) => (/* a painted page */) }],
};
```

No `composition.tsx` → the config shell runs unchanged. With one → the shell hands it the home and
any bespoke routes. Either way the header/footer/disclaimer and the `/r/:id` watch page stay.

## The guard

`npm run build` runs `scripts/lint-groundedness.mjs`: it **fails the build** on hardcoded metric
literals (`value="63%"`) and external data fetches, and warns when an answer is rendered without
`<GroundedAnswer>`. Fabrication cannot ship.
