# The design system — Progress-grade polish, per-demo palette

A demo looks "vibe-coded" when it's a pile of ad-hoc Tailwind: arbitrary text sizes, random hexes,
inconsistent spacing, five different button styles. The fix is a **design system**: a fixed set of
tokens and primitives that every surface composes from, so the whole demo reads as *one intentionally
designed product*.

**The split that makes this work:**
- **Progress provides the *system*** — fonts, the neutral (ink) ramp, the type scale, spacing rhythm,
  radii, elevation and motion. This is the professional baseline, borrowed from progress.com. It is
  what makes any demo look *designed*.
- **The prospect provides the *palette*** — `--brand` / `--accent` are set per demo (`theme.ts` from
  `demo.config.json`), so the same system reads completely differently for each demo and looks like
  *their* product.

> **Borrow Progress's craft, not its branding.** The system gives you Progress-grade *quality*; the
> customer-facing surfaces still wear the **prospect's** identity (name, colours, voice). Never turn a
> demo into a Progress brochure — vendor attribution stays a quiet footer credit ([[demo-is-the-product-not-a-pitch]]).

## Borrowed from Progress (the baseline)

| Token | Value (from progress.com) |
|---|---|
| Body font | `ProgressText, Roboto, system-ui, sans-serif` (Roboto is Progress's own fallback) |
| Display font | `ProgressDisplay, Metric, Archivo, Roboto, sans-serif` (geometric, Metric-like) |
| Ink / neutral | cool blue-slate keyed to Progress ink **#383F55** (`ink-700`); ramp `ink-50…950` |
| Default brand | Progress AI blue **#054BFF** (overridden per demo) |
| Default accent | Progress magenta **#EB0249** (their green is also on-brand — set per demo) |
| Radii | tight/crisp (~5px): `rounded` 5px, `rounded-lg` 8px, cards ~10px — enterprise, not bubbly |

The proprietary `ProgressText`/`ProgressDisplay`/`Metric` faces are named first so a real Progress
environment renders them; everyone else falls back to Roboto/Archivo, which carry the same character.

## The tokens you compose with (never arbitrary values)

- **Type:** `font-display` + `text-display-xl` / `text-display-lg` / `text-display` for headings;
  `text-eyebrow` (uppercase, tracked) for labels; body in the default `font-sans`. **Never**
  `text-[13px]` or a one-off size.
- **Colour:** the `ink-50…950` ramp + `brand` / `brand-strong` / `brand-soft` / `brand-contrast` +
  `accent`. **No raw hex, no arbitrary `text-[#…]`** — every colour is a token (this is also what
  keeps light/dark and per-demo theming coherent).
- **Radius / elevation:** the `rounded-*` scale + `shadow-xs…xl` / `shadow-glow`. One elevation model:
  `.card` (flat surface), `.card-elevated` (raised), `.card-hover` (interactive lift).
- **Spacing:** a consistent rhythm — lay groups out with `flex`/`grid` + `gap`/`space-y-*` on the 4/8
  scale; don't hand-tune per-element margins.
- **Motion:** `animate-fade-up`, `animate-scale-in`, `animate-fade-in` (+ the ambient `drift`/`aurora`
  for backdrops). Respect `prefers-reduced-motion`.

## The component vocabulary (use these, don't re-roll them)

Composing from these is what keeps every demo internally consistent:

- **Surfaces:** `.card`, `.card-elevated`, `.card-hover`, `.glass` (sticky chrome)
- **Actions:** `.btn` + `.btn-brand` / `.btn-ghost`; the palette `<Pill>` for chips/toggles (wraps,
  Kendo-free, works in both UI modes)
- **Inputs:** `.field`, `.ask-bar` (the product-grade home ask input)
- **Text accents:** `.eyebrow`, `.text-gradient`, `.text-shimmer`
- **Layout medium:** `<Hero>`, `<Section eyebrow title lede>`, `<Panel>`, `<TileGrid cols>` (palette)
- **Grounded pigments:** `<GroundedAnswer>`, `<CitedMetric source>`, `<Citations>`,
  `<JourneyThroughContext>`, `<StatusChip>` — truthful by construction, library-agnostic
- **UI-mode components:** KendoReact (`UI_MODE=kendo`) or Radix/Recharts/TanStack (`opensource`) for
  everything above the primitives — see `docs/UI-KENDO-COMPONENTS.md`. The tokens above apply to both.

## Per-demo theming (where the uniqueness comes from)

`theme.ts` writes `--brand` / `--accent` (and derives strong/soft/contrast + re-skins all of Kendo)
from `demo.config.json`'s `theme.primary` / `theme.accent`. So: **set the prospect's colours** in the
blueprint; optionally give the demo its own display face for character. Structure/IA/nav come from the
bespoke `Shell`. The Progress baseline only shows through as *quality* — cool neutrals, crisp radii,
disciplined type — never as Progress's actual brand colours (unless the prospect's palette happens to
be blue).

## The discipline, in one line

Compose from the tokens and primitives above; if you're reaching for an arbitrary value
(`text-[…]`, a raw hex, a one-off radius/shadow), stop — there's a token for it. That single habit is
the difference between "designed" and "vibe-coded."
