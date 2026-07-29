# The component palette — two UI modes

Every demo is built in one of **two UI modes** (`UI_MODE` in `.env`, captured once at setup). The
grounding guarantees are **identical** in both — the palette pigments (`<GroundedAnswer>`,
`<CitedMetric source>`, `<Pill>`, states, citations) are **library-agnostic** (plain React +
Tailwind, no Kendo). Only the *component vocabulary* for everything else changes.

| `UI_MODE` | Build with | License |
|---|---|---|
| **`kendo`** (default) | **KendoReact** — the full suite (below), all installed | needs `KENDO_UI_LICENSE` (else a trial banner) |
| **`opensource`** | **Radix UI + Recharts + TanStack Table + Tailwind** (+ `lucide-react`) | none — no Kendo, no banner |

Reach for the component that fits the domain; theme it per demo (`brand`/`accent`); keep every value
grounded via the pigments. **Never mix modes in one demo** — check `UI_MODE` and build entirely in
that vocabulary; in `opensource` mode do **not** import any `@progress/kendo-*` component.

> **No public npm.** Everything resolves through the **Progress HAR** registry (the `.npmrc`), never
> npmjs.org (HAR proxies public npm, so React/Radix/Recharts/TanStack all come through it; the
> `min-release-age` policy means new versions are pinned to older, allowed ones in the lockfile).
> `ml-fasttrack` / FastTrack is **not** used (MarkLogic-bound, not on HAR).

---

## KendoReact mode — the full suite (all installed)

**Every KendoReact package is installed** — all ~40 `@progress/kendo-react-*` packages plus their
helpers (verified: Spreadsheet, Map, TaskBoard, Scheduler, Gantt, Editor, PDF Viewer, Upload, Gauges,
PivotGrid, TreeList, Chat/AI, File Saver, … all resolve at build). Import any component directly, no
add step. The table below is just the most-used starter set; the complete list follows.

| Package (starter set) | Components you get |
|---|---|
| `@progress/kendo-react-buttons` | Button, ButtonGroup, **Chip**, ChipList, DropDownButton, SplitButton, FloatingActionButton, SegmentedControl, Toolbar |
| `@progress/kendo-react-inputs` | TextBox, TextArea, Input, NumericTextBox, MaskedTextBox, Checkbox, RadioButton(Group), Switch, Slider, RangeSlider, Rating, Signature, ColorPicker / ColorGradient / ColorPalette |
| `@progress/kendo-react-dropdowns` | AutoComplete, ComboBox, MultiColumnComboBox, DropDownList, DropDownTree, MultiSelect, MultiSelectTree |
| `@progress/kendo-react-layout` | AppBar, Card, Avatar, Drawer, Menu, ContextMenu, PanelBar, TabStrip, Splitter, Stepper, TileLayout, GridLayout, StackLayout, ExpansionPanel, Breadcrumb, Timeline, BottomNavigation, ActionSheet |
| `@progress/kendo-react-grid` | Data Grid (sorting, paging, grouping, filtering, virtualization) |
| `@progress/kendo-react-charts` | Area, Bar, Line, Pie, Donut, Bubble, Scatter, Sparkline, Funnel, Pyramid, Radar, Polar, Heatmap, Sankey, Waterfall, Bullet, BoxPlot, RangeArea, StockChart, OrgChart, Drilldown |
| `@progress/kendo-react-indicators` | Badge, Loader, Skeleton |
| `@progress/kendo-react-progressbars` | ProgressBar, ChunkProgressBar |
| `@progress/kendo-react-dialogs` | Dialog, Window |
| `@progress/kendo-react-notification` | Notification |
| `@progress/kendo-svg-icons`, `@progress/kendo-drawing` | SVG icon set; the drawing library (charts/gauges substrate) |

## Full KendoReact component list (all installed)

- **AI interface:** AI Prompt, Inline AI Prompt, PromptBox, Chat, SmartPasteButton, Speech-to-Text Button — *natural fit for a grounded copilot surface*
- **Buttons & actions:** Button, ButtonGroup, Chip, ChipList, DropDownButton, SplitButton, FloatingActionButton, SegmentedControl, Toolbar
- **Inputs:** TextBox, TextArea, NumericTextBox, MaskedTextBox, Checkbox, RadioButton(Group), Switch, Slider, RangeSlider, Rating, Signature, Color pickers
- **Dropdowns:** AutoComplete, ComboBox, MultiColumnComboBox, DropDownList, DropDownTree, MultiSelect, MultiSelectTree
- **Form:** Form, FormElement, Field, FieldArray, FieldWrapper
- **Date & time:** Calendar, MultiViewCalendar, DateInput, DatePicker, DateTimePicker, TimePicker, DateRangePicker
- **Data grid & data:** Data Grid, TreeList, PivotGrid, ListView, ListBox, Data Tools (Filter, Pager), Data Query, SpreadSheet, Sortable
- **Data viz — charts:** Area, Bar, Line, Pie, Donut, Bubble, Scatter, Sparkline, Funnel, Pyramid, Radar, Polar, Heatmap, Sankey, Waterfall, Bullet, BoxPlot, RangeArea, StockChart, OrgChart, Chart Wizard
- **Data viz — gauges:** ArcGauge, CircularGauge, LinearGauge, RadialGauge
- **Layout:** AppBar, Card, Avatar, Drawer, Menu, ContextMenu, PanelBar, TabStrip, Splitter, Stepper, TileLayout, GridLayout, StackLayout, ExpansionPanel, Breadcrumb, Timeline, BottomNavigation, ActionSheet, ScrollView (carousel)
- **Navigation & scheduling:** Menu, Drawer, Breadcrumb, Stepper, Scheduler, Gantt, TaskBoard
- **Editors & docs:** Editor (rich text), PDF Generator, PDF Viewer, Excel Export, File Saver, Upload, External Drop Zone
- **Indicators & feedback:** Badge, Loader, Skeleton, ProgressBar, ChunkProgressBar, Notification, Tooltip, Popover, Popup, Dialog, Window
- **Labels:** Label, Floating Label, Hint, Error
- **Maps & codes:** Map, Barcode, QR Code
- **Utilities:** Icon/SvgIcon, Typography, Animation, Ripple, Drag & Drop, Keyboard Navigation

## Picking components for the domain (examples, not a template)

- **Records / catalogue** → Data Grid, TreeList, ListView, PivotGrid, faceted filters (Data Tools)
- **Grounded copilot** → AI Prompt / Chat shell around `useAsk` + `<GroundedAnswer>` + the Journey walk
- **Operations / scheduling** → Scheduler, Gantt, TaskBoard, Timeline, Stepper
- **Dashboards / KPIs** → Charts, Gauges, Sparkline, Badge, `<CitedMetric>` (never an un-sourced number)
- **Documents** → PDF Viewer, Editor, Upload / External Drop Zone (ingest), Excel Export
- **Knowledge graph** → a bespoke canvas (not Kendo) + `useGraph`; OrgChart/Sankey for lighter relations

## Open-source mode (`UI_MODE=opensource`) — the stack + equivalents

No Kendo, no license. Build with these (all installed via HAR) + plain React + Tailwind. The palette
pigments work unchanged, so grounded/cited answers and sourced metrics are identical.

| Need | Open-source component |
|---|---|
| Dialog / modal / drawer | `@radix-ui/react-dialog` |
| Dropdown menu / context menu | `@radix-ui/react-dropdown-menu` |
| Select / combobox | `@radix-ui/react-select` |
| Popover / flyout | `@radix-ui/react-popover` |
| Tooltip | `@radix-ui/react-tooltip` |
| Tabs | `@radix-ui/react-tabs` |
| Accordion / expansion panel | `@radix-ui/react-accordion` |
| Switch / checkbox / slider | `@radix-ui/react-switch` · `-checkbox` · `-slider` |
| Avatar | `@radix-ui/react-avatar` |
| Scroll area | `@radix-ui/react-scroll-area` |
| Nav menu | `@radix-ui/react-navigation-menu` |
| Charts (bar/line/pie/area/scatter/radar…) | `recharts` |
| Data grid / table (sort, filter, paginate, group) | `@tanstack/react-table` (render with Tailwind) |
| Buttons, cards, chips, badges, inputs, layout | plain elements + Tailwind (see `.card` / `.btn` / `.pill` utilities in `index.css`) |
| Icons | `lucide-react` (already used everywhere) |
| Class helpers | `clsx`, `tailwind-merge` |
| Knowledge graph | bespoke SVG/canvas + `useGraph` (same as Kendo mode) |

Rules in this mode: **no `@progress/kendo-*` imports**; style with Tailwind + the demo's
`brand`/`accent` CSS vars; still gate shell breakpoints in JS (`useIsDesktop()` from the palette);
still verify `scrollWidth <= 390` on every route; still render every answer through `<GroundedAnswer>`
and every number through `<CitedMetric source>`.

## KendoReact gotchas (silent-broken UI — full list in `UI-KENDO.md`)

- `<Card onClick>` and `<Chip onClick>` **do not fire** — use the palette's `ClickableCard` / `Pill`
  for anything clickable. **Long `Pill`/chip labels must wrap** (the palette `Pill` already does) or
  they force horizontal overflow on a phone.
- `AppBar` has `overflow:hidden` that clips dropdown menus — fix inline (`style={{overflow:'visible'}}`),
  not via CSS (Kendo's unlayered `all.css` beats `@layer`).
- Gate responsive **shell structure** in JS (`useIsDesktop()` from the palette), never CSS `lg:` —
  Kendo's unlayered CSS overrides Tailwind display utilities, and only the JS hook honours `?vp=mobile`.
- Every clickable element must be **click-tested**; verify `scrollWidth <= viewport` at 390px.
