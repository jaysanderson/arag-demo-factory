# Portal UI — KendoReact

The portal is built with **KendoReact**, Progress's own React component library, on the
`@progress/kendo-theme-default` theme. This is a deliberate brand choice: a Progress Agentic
RAG demo shown to an executive should also be wearing Progress's UI. Reach for a non-Kendo
component **only** where Kendo has no fit and it makes the demo materially better — keep those
to a short, explicit list (below). Tailwind stays, but only as layout/spacing glue, never as
the component system.

> **FastTrack (`ml-fasttrack`) is intentionally not used.** It is a MarkLogic-bound accelerator
> (`MarkLogicProvider` speaks MarkLogic's `/v1/search`), it is not published to HAR, and no ARAG
> demo uses it. Its look is reproduced with KendoReact directly — which is what FastTrack is
> built on under the hood.

## Install (via HAR)

KendoReact resolves through the Progress **HAR** registry (`.npmrc`). On HAR's 14-day cooldown,
pin the resolve date:

```bash
npm install --before "$(date -v-15d +%Y-%m-%d)" \
  @progress/kendo-react-layout @progress/kendo-react-buttons @progress/kendo-react-inputs \
  @progress/kendo-react-grid @progress/kendo-react-charts @progress/kendo-react-indicators \
  @progress/kendo-react-notification @progress/kendo-drawing @progress/kendo-svg-icons \
  @progress/kendo-theme-default @progress/kendo-licensing hammerjs
```

The theme CSS is imported once, at the app entry:

```ts
import '@progress/kendo-theme-default/dist/all.css';
```

**Licensing — remove the banner before a customer sees it.** KendoReact 15 shows a
`License key missing for KendoReact` banner until a key is activated — unacceptable in front of
a buyer. Progress owns Kendo, so a key exists. Set it and the banner is gone:

1. Set `KENDO_UI_LICENSE` (env) **or** drop a `telerik-license.txt` at the portal root (both
   gitignored — never commit a real key).
2. `npm run build` runs `scripts/kendo-license.mjs` in a `prebuild` hook: it activates the key
   if present, and degrades to trial mode (banner) if absent — a demo build never fails over
   licensing. Run `npm run kendo:license` to activate manually.

On Fly, set it as a build secret / env var so the deployed bundle is banner-free.

## Per-demo theming

Each demo's brand colour comes from `demo.config.json.theme.primary`. Map it onto Kendo's CSS
custom properties at runtime (in `src/lib/theme.ts`, alongside the existing `--brand` vars) so
the whole component set re-skins per demo:

```ts
const root = document.documentElement;
root.style.setProperty('--brand', theme.primary);
root.style.setProperty('--brand-soft', hexToSoft(theme.primary));
// Kendo theme variables (kendo-theme-default 14.x):
root.style.setProperty('--kendo-color-primary', theme.primary);
root.style.setProperty('--kendo-color-primary-emphasis', theme.accent);
```

No SASS build is needed — the shipped `all.css` reads these variables.

## Component map

| Portal element | KendoReact |
|---|---|
| App bar / brand wordmark | `AppBar`, `AppBarSection`, `AppBarSpacer` (`kendo-react-layout`) |
| Surface nav | `TabStrip` or `Button` (togglable) (`kendo-react-buttons`) |
| Buttons | `Button`, `ButtonGroup` (`kendo-react-buttons`) |
| Text / search inputs | `TextBox`, `Input` (`kendo-react-inputs`) |
| Dropdowns / persona pickers | `DropDownList` (`kendo-react-dropdowns`) |
| Cards (results, sources, assets) | `Card`, `CardHeader`, `CardBody`, `CardTitle` (`kendo-react-layout`) |
| Tabular data (query log, tables) | `Grid`, `GridColumn` (`kendo-react-grid`) |
| Result lists | `ListView` (`kendo-react-layout`) or a Card grid |
| Facet checkboxes | `Checkbox` (`kendo-react-inputs`), `Chip`/`ChipList` (`kendo-react-buttons`) |
| Quality / REMi / analytics charts | `Chart`, `ChartSeries`, … (`kendo-react-charts`) |
| Loading | `Loader` (`kendo-react-indicators`) |
| Status chip, labels, counts | `Chip`, `Badge` (`kendo-react-indicators`/`-buttons`) |
| Errors / toasts | `Notification` (`kendo-react-notification`) |
| Document detail drawer | `Drawer` (`kendo-react-layout`) or `Dialog` (`kendo-react-dialogs`) |

## Vendor-first (a brand requirement)

Use the Progress vendor controls **wherever possible** — a Progress Agentic RAG demo must
visibly run on Progress's own UI stack. If a piece of UI *can* be a Kendo control, it **is** a
Kendo control, themed to look bespoke — never hand-rolled. Prefer, e.g., Kendo `Chart` over a
custom SVG chart, Kendo `CircularGauge`/`RadialGauge` (`@progress/kendo-react-gauges`) or
`ProgressBar` (`@progress/kendo-react-progressbars`) over a custom ring, Kendo `Grid`/`TileLayout`
over a hand-built table/bento, Kendo `Menu`/`Drawer` over a custom dropdown. Style them with the
theme vars and Kendo's own animation/config to make them stunning.

**The trial banner is not a reason to avoid Kendo.** A licence key is applied at build time (see
Licensing above); until then the banner is acceptable. Never replace or drop a Kendo control to
suppress it.

## Where non-Kendo is allowed (keep short)

- **Knowledge-graph canvas** (`GraphSurface`, `RelatedSurface` graph column) — the force-directed
  SVG has no Kendo equivalent; keep the custom canvas, but wrap it in a Kendo `Card` and use
  Kendo `Chip`s for the entity pills.
- **Streaming answer pane** (`AskSurface`, `VoiceSurface`) — token-by-token streaming is custom;
  render it inside a Kendo `Card`, with the citations panel as Kendo `Card`s.
- **Voice mic control** — a custom round record button; everything around it is Kendo.

## Hard invariant — restyle, don't rewire

Converting a surface to Kendo is **presentational only**. Do NOT touch the ARAG client
(`src/lib/arag.ts`), the config loader (`src/lib/config.ts`), the Express proxy
(`server/index.mjs`), or the streaming/citation-grouping logic. Swap the presentational
elements for Kendo, keep every data path and the config-driven surface model exactly as-is. An
answer must still always render its citations; an ungrounded answer is still surfaced as a
warning.
