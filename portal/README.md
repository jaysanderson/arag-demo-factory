# ARAG Portal — the config-driven shell

One gorgeous Progress Agentic RAG research portal that **renders itself from
`demo.config.json`**. The same shell serves every demo the factory produces — it is
themed and has surfaces enabled/disabled by config, and is **never rewritten per demo**.

```
Browser (Vite + React + TS)                 ← never holds the KB token
  → /api/*  Express server (server/index.mjs)  ← holds NUCLIA_SERVICEACCOUNT, applies grounding policy
       → Progress Agentic RAG (Nuclia)         ← all retrieval + generation
  ↑ demo.config.json  → which surfaces render, theme, safety, demo script
```

## Run it

```bash
cp .env.example .env          # set NUCLIA_SERVICEACCOUNT, NUCLIA_KB_URL, NUCLIA_ZONE
npm install
npm run dev                   # UI on :5173, API on :4000 (Vite proxies /api → API)
```

Production (single process serving the built UI + API):

```bash
npm run build && npm start    # serves dist/ + /api on $PORT (default 4000; 8080 in container)
```

Verify grounding end-to-end against the running portal:

```bash
node ../scripts/verify.mjs --blueprint grains-research --base http://localhost:4000
```

## How config drives the UI

`server/index.mjs` serves `demo.config.json` (minus secrets) at `GET /api/config`.
`src/App.tsx` builds the nav and routes from `config.surfaces`, in order, mapping each
surface's `component` name to a React component via `src/pages/registry.ts`. Adding or
removing a surface is a **config change**; the only code touch is registering a new
component in the registry.

- Theme tokens (`theme.primary` / `theme.accent`) become CSS variables (`src/lib/theme.ts`);
  Tailwind's `brand`/`accent` colours resolve to them.
- The synthetic-data disclaimer (`safety.disclaimer`) renders as a banner + footer (Hard Rule 5).
- The zone/region is **never** rendered (Hard Rule 4); the KB token stays server-side (Hard Rule 6).

## Surfaces

`AskSurface` (streamed, cited, ungrounded-warning), `SearchSurface` (semantic `/find` +
live `/catalog` facets), `GraphSurface` (force-directed entity/relation explorer),
`RemiSurface` (live groundedness dashboard), plus `DocStudioSurface`, `CallQaSurface`,
`WorkflowsSurface`, `McpSurface`, `PersonalizeSurface`, `VisibilitySurface`. Each component
name matches the `component` field in the corresponding `catalog/capabilities/*.json`.

See `../docs/ARAG-API.md` (the Nuclia surface) and `../docs/RETRIEVAL.md` (the grounding policy).
