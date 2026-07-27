# The Use-Case Catalog — "The Shopping List"

This directory is the heart of the ARAG Demo Factory. It is a machine-readable catalog of
**everything the factory knows how to build**, drawn from the real portfolio of Progress
Agentic RAG (ARAG) demos shipped over time.

The orchestrator (see `../AGENTS.md`) reads this catalog on the user's first message, maps
their one-shot prompt onto it, and assembles a demo from two kinds of building block:

```
        BLUEPRINTS  (what vertical / story)        ×        CAPABILITIES  (which ARAG surfaces)
   ┌────────────────────────────────────┐            ┌────────────────────────────────────┐
   │ legal-matter-intelligence          │            │ cited-ask     find      graph      │
   │ insurance-claims-workbench         │            │ doc-pipeline  call-qa   workflows  │
   │ enterprise-ops-command             │     ×      │ remi          mcp       personalize│
   │ cx-concierge  code-intelligence    │            │ visibility    facets    personas   │
   │ doc-intelligence  grains-research  │            └────────────────────────────────────┘
   │ sales-enablement  ai-visibility …  │
   └────────────────────────────────────┘
```

A **blueprint** picks a vertical, a synthetic corpus, a theme, and a *default* set of
capabilities. The one-shot prompt can add or drop capabilities on top. The orchestrator
composes the two into a single `demo.config.json`, which `create-app.js` writes into a
generated portal, and which the portal reads at runtime to decide which surfaces to show.

Everything here is data, not code. Adding a new demo to the shopping list means adding one
JSON file to `blueprints/` and (rarely) one to `capabilities/` — no engine changes.

---

## Files

| File | What it is |
|------|-----------|
| `catalog.json` | The index — every blueprint and capability, with tags the orchestrator matches against. Generated from the individual files by `scripts/build-catalog.mjs`; also safe to hand-edit. |
| `capabilities/<id>.json` | One **capability module** — an ARAG surface (Ask, Find, Graph, Doc pipeline, …), what KB features it needs, and how the portal turns it on. Fixed vocabulary; changes rarely. |
| `blueprints/<id>.json` | One **vertical blueprint** — a shipped-demo-derived story: persona, corpus spec, theme, default capabilities, demo script, exec pitch. This is where the portfolio lives. |

---

## Capability module schema (`capabilities/<id>.json`)

A capability is one composable ARAG surface. Blueprints reference capabilities by `id`.

```jsonc
{
  "id": "cited-ask",                     // stable kebab id; matches portal surface + blueprint refs
  "name": "Grounded, Cited Answers",
  "surface": "ask",                      // logical surface name (one capability may map to one route)
  "tagline": "Streamed answers that always show their sources.",
  "aragEndpoints": ["/ask"],             // Nuclia endpoints this uses (REFERENCE.md canonical surface)
  "requires": [],                        // other capability ids that must also be enabled
  "kbRequirements": {                     // what the KB must contain for this to actually work
    "resources": true,                   //   documents ingested
    "vectors": true,                     //   embeddings present (semantic)
    "labelsets": false,                  //   classification labels
    "graph": false                       //   extracted entities/relations
  },
  "portal": {                             // how the generated portal renders this
    "route": "/ask",
    "navLabel": "Ask",
    "component": "AskSurface",           // React component in portal/src/pages
    "icon": "chat"
  },
  "sells": "Executives see grounded answers with citations — the antidote to hallucination.",
  "provenance": ["capstone-legal", "research-portal", "ironbark-arag"]  // real demos that ship it
}
```

**The capability vocabulary** (the columns of the matrix). Each is one file:

| id | Surface | ARAG endpoints | From these shipped demos |
|----|---------|----------------|--------------------------|
| `cited-ask` | Grounded chat | `/ask` (NDJSON stream) | capstone-legal, research-portal, ironbark |
| `find` | Semantic search + facets | `/find`, `/catalog` | every demo |
| `graph` | Knowledge graph explorer | `/graph`, `/graph/nodes` | capstone-legal, capstone-atlas, aurora |
| `doc-pipeline` | Document intelligence studio | ingest, extract, classify | arag-doc-processing |
| `augment` | Data-augmentation agents (Labeler / Graph / Generator), live | `/predict/chat`, `/predict/tokens` | arag-doc-processing, capstone-atlas |
| `call-qa` | Call / media analytics | media proxy, `/ask` scoped | call-analysis-arag |
| `workflows` | Agentic multi-step workflows | retrieval-agent session | capstone-atlas, aurora |
| `remi` | Groundedness dashboard (REMi) | REMi scores | ironbark, codeintel |
| `mcp` | MCP endpoint explorer | `{kb}/mcp/sse` | sitefinity-mcp, citeforge |
| `personalize` | Personalised feed / recs | `/ask`, `/find` scoped | aurora, arag-personalize |
| `visibility` | AI-visibility index | account `/predict/chat?model=` | geostack, citeforge |
| `facets` | Faceted catalog browse | `/catalog` faceted | research-portal, capstones |
| `personas` | Audience-scoped views | search_configurations | capstone-legal |

---

## Blueprint schema (`blueprints/<id>.json`)

A blueprint is a shipped-demo-derived vertical story. It is the unit a sales engineer picks
(explicitly or via the one-shot prompt mapping).

```jsonc
{
  "id": "legal-matter-intelligence",
  "name": "Legal Matter Intelligence",
  "vertical": "Legal / Professional Services",
  "provenanceDemo": "capstone-legal",              // the real shipped demo it is modelled on
  "liveReference": "https://capstone-legal.fly.dev",
  "persona": "Tilden & Voss LLP (fictional firm)",
  "tagline": "A partner-grade research workbench over a firm's matters and precedent.",
  "elevatorPitch": "Associates find precedent in seconds with citations a partner will trust; the graph surfaces related matters no keyword search would.",
  "matchTags": ["legal","law","matters","precedent","litigation","contracts","counsel","firm","attorney","case law"],
  "capabilities": ["cited-ask","find","facets","graph","personas"],   // defaults; prompt can add/drop
  "theme": {
    "brandName": "Tilden & Voss",
    "primary": "#1f3a5f",
    "accent": "#b08d57",
    "mood": "authoritative, restrained, editorial"
  },
  "corpus": {                                        // brief for @knowledge-engineer
    "domain": "US family-law and trusts-and-estates practice",
    "docTypes": ["matter memo","precedent brief","statute note","client intake","engagement letter"],
    "targetCount": 40,
    "recurringEntities": {                            // reuse across docs so the graph forms real edges
      "attorneys": 8, "matters": 12, "clients": 10, "jurisdictions": 5
    },
    "cornerstoneQueries": [                           // verified-answer questions for @tester
      "What is our standard position on a spendthrift trust clause?",
      "Which matters involved contested guardianship in California?"
    ]
  },
  "demoScript": [
    { "step": 1, "say": "Every answer cites the matter it came from.", "show": "Ask: 'standard spendthrift clause' → cited answer" },
    { "step": 2, "say": "The graph finds related matters keyword search misses.", "show": "Graph around a client entity" }
  ],
  "safety": {                                         // enforced by create-app + baked into portal
    "syntheticOnly": true,
    "noRealBrands": true,
    "disclaimer": "Demonstration data — fictional firm and matters. Not legal advice."
  }
}
```

### Field notes

- **`provenanceDemo` / `liveReference`** — these keep every blueprint honest: it is derived
  from something that actually shipped, so the pitch is credible. See `../DEMOS.md` snapshot.
- **`matchTags`** — the orchestrator scores the one-shot prompt against these to pick a
  blueprint. Keep them generous and domain-obvious.
- **`capabilities`** — the *default* surfaces. The one-shot prompt can override:
  "insurance demo, no graph, add call-QA" → drop `graph`, add `call-qa`.
- **`corpus`** — a brief, not the data. `@knowledge-engineer` generates the actual synthetic
  corpus from this at build time. Reuse of `recurringEntities` is what makes the knowledge
  graph non-trivial.
- **`safety`** — non-negotiable. The factory only ever produces synthetic, fictional-brand
  demos (see the Hard Rules in `../AGENTS.md`). `create-app.js` refuses to write a config
  with `syntheticOnly:false`.

---

## The output contract (`demo.config.json`)

The orchestrator composes blueprint × capabilities into one config that `create-app.js`
writes to the generated project root. **The portal shell reads this at runtime and renders
itself accordingly — it is never rewritten per demo, only configured.** (Same principle as
the reference package's "never rewrite App.js".)

```jsonc
{
  "blueprint": "legal-matter-intelligence",
  "title": "Tilden & Voss — Matter Intelligence",
  "theme": { "brandName": "Tilden & Voss", "primary": "#1f3a5f", "accent": "#b08d57" },
  "surfaces": [                                   // resolved from capabilities, in nav order
    { "id": "ask",   "route": "/ask",   "label": "Ask",     "component": "AskSurface",   "enabled": true },
    { "id": "find",  "route": "/search","label": "Search",  "component": "SearchSurface","enabled": true },
    { "id": "graph", "route": "/graph", "label": "Graph",   "component": "GraphSurface", "enabled": true }
  ],
  "kb": { "zone": "aws-eu-1", "kbId": "…", "baseUrlEnv": "NUCLIA_KB_URL" },  // token never here — server-side env
  "safety": { "syntheticOnly": true, "disclaimer": "Demonstration data — fictional firm and matters." },
  "demoScript": [ /* copied from blueprint for the in-app guided tour */ ]
}
```

The KB **service-account token is never written to config** — it lives only in the portal's
server-side env (`NUCLIA_SERVICEACCOUNT`), exactly as every shipped demo does it
(`X-NUCLIA-SERVICEACCOUNT: Bearer …`, see `../docs/ARAG-API.md`).

---

## Adding a use case to the shopping list

1. Copy an existing `blueprints/<id>.json`, retarget it to the new vertical, ground it in a
   real (or intended) shipped demo.
2. If it needs a surface that does not exist yet, add a `capabilities/<id>.json` and the
   matching component to `portal/src/pages/`.
3. Run `node scripts/build-catalog.mjs` to refresh `catalog.json`.
4. That's it — the orchestrator will offer it on the next one-shot that matches its tags.
