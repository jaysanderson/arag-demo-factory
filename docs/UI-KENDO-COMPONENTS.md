# KendoReact — the component palette

The portal UI is **KendoReact** (Progress owns it; the SE has a license — see the license ask in
`AGENTS.md`). This is the catalogue of components you compose demos from — the "colours" on the
palette. Reach for the component that fits the domain; theme it per demo (`brand`/`accent`); and keep
every value grounded in the Knowledge Box via the palette pigments (`<GroundedAnswer>`,
`<CitedMetric source>`, `useAsk`/`useCatalog`/`useGraph`). Source: telerik.com/kendo-react-ui
(all components).

> **No public npm.** Packages resolve through the **Progress HAR** registry (the `.npmrc`), never
> npmjs.org. The set below marked *installed* is available right now. To use a component from a
> package that isn't installed yet, add its `@progress/kendo-react-*` package **via HAR** (`npm ci`
> in `portal/` through the HAR registry) — if HAR can't serve it, vendor it or find a non-npm path,
> never the public registry. `ml-fasttrack` / FastTrack is **not** used (MarkLogic-bound, not on HAR).

## Available now — installed packages (import immediately)

| Package | Components you get |
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

## The full KendoReact catalogue (add the package via HAR to use)

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

## KendoReact gotchas (silent-broken UI — full list in `UI-KENDO.md`)

- `<Card onClick>` and `<Chip onClick>` **do not fire** — use the palette's `ClickableCard` / `Pill`
  for anything clickable. **Long `Pill`/chip labels must wrap** (the palette `Pill` already does) or
  they force horizontal overflow on a phone.
- `AppBar` has `overflow:hidden` that clips dropdown menus — fix inline (`style={{overflow:'visible'}}`),
  not via CSS (Kendo's unlayered `all.css` beats `@layer`).
- Gate responsive **shell structure** in JS (`useIsDesktop()` from the palette), never CSS `lg:` —
  Kendo's unlayered CSS overrides Tailwind display utilities, and only the JS hook honours `?vp=mobile`.
- Every clickable element must be **click-tested**; verify `scrollWidth <= viewport` at 390px.
