# ARAG Demo Factory — Release Notes

**The factory that turns one prompt into a stunning, grounded, cited Progress Agentic RAG demo.**
This release raises the bar from "a working demo" to "a real application a prospect would swear
they already use." Three things drove it: a portfolio-wide quality audit, a signature creative
surface, and a hard turn toward *creativity + realism* as non-negotiables.

---

## What's new

### 1. A mandatory quality bar, set from the live portfolio
Walked ~20 deployed ARAG apps end-to-end (Atlas Operations, Aurora Concierge, GeoStack, Call
Analysis, **Document Intelligence Studio**, CiteForge, **Ironbark Mutual**, **Meridian Codex**,
Tilden & Voss, **Research Portal**, ContentForge, Kestrel, Halyard, Racing WA Intelligence,
Wildmere, Fenlow, Agentic DAM, GTM Factory, MaintenanceOS, …) to define what "good" means. The bar:

- **It's an application, not a demo** — real app shell, grouped nav, live status (KB · model ·
  resource count), a genuine home, auth where it fits. Never four disconnected tiles.
- **The whole ARAG product, woven in** — cited Ask, Search, facets, graph, related, personalize,
  voice, workflows, doc-intelligence + augmentation agents, calls, REMi, visibility, MCP.
- **Bespoke design craft, not a component dump** — the strongest exemplars are hand-crafted
  (themeable palette, editorial hero, custom SVG gauges, motion), *not* "random React everywhere."
- **Realistic content** — believable company, documents, numbers and copy. Never obviously fake.

### 2. "Journey through the context" — the signature surface, now built in
The portfolio's most compelling feature is now part of the factory. Below any cited answer, a
**cinematic, auto-playing walk through the grounding**: strongest match first, each source with an
animated **confidence ring**, classification chips, a *"cited in the answer"* badge, the supporting
passage, and a **live, resource-scoped "how does this relate?"** answer — with narration, keyboard
control, and a replayable trail. It turns RAG grounding into a designed experience — the clearest
possible proof that an answer is *grounded, not generated*.
*New:* `lib/journey.ts`, `components/journey/{ConfidenceRing,AnswerJourney}.tsx`, server
`/api/journey` + resource-scoped `/ask`; wired into the Ask surface. Typechecks + builds clean.

### 3. Creativity is now the critical mandate
**"We provide the colours; the package is the artist."** Every build must be a bespoke, stunning,
believable product — a distinct identity and a real app shell, never a recoloured template. Baked
into the session hook, `AGENTS.md`, `CLAUDE.md`, and the Copilot instructions.

### 4. Blueprints are inspiration, not replicas
The reference catalog is a source of *cues*, never a menu and never to be copied. The factory
invents a fresh, realistic use case per prompt — a new fictional company that merely rhymes with
the exemplars. The last "shopping list / don't invent" contradictions were removed.

### 5. NUA-key auto-provisioning
The factory now asks for a **NUA key** and creates + manages its **own** ARAG assets — Knowledge
Box, service account, labelsets, retrieval agents — with no setup by hand. Updated `.env.example`
(Option A), `scripts/create-kb.mjs`, and all orchestration docs.

### 6. The factory became a palette, not a template kit
The package is now a **palette** the SE paints with — `portal/src/palette/`: grounded data hooks
(`useAsk`, `useSearch`, `useCatalog`, `useGraph`, `useEntities`, `useHealth`), guaranteed components
(`<GroundedAnswer>` can't show an uncited claim; `<CitedMetric>` can't show a number without KB
provenance; `<JourneyThroughContext>`, `<ConfidenceRing>`), and a layout medium (`<Hero>`,
`<Section>`, `<Panel>`, `<TileGrid>`). A **composition seam** lets a demo paint its own home + pages
(`portal/src/demo/composition.tsx`) with the config shell as a safe fallback. A **groundedness lint**
(`scripts/lint-groundedness.mjs`, wired into `prebuild`) fails the build on any hardcoded metric or
external data fetch — so *the guarantees live in the materials, and fabrication cannot ship*. Known
violations fixed (Call QA's hardcoded `100%/2%`; the rendered `sells` line). See
`docs/PALETTE-ARCHITECTURE.md` and `portal/src/palette/README.md`.

---

## Verified (live)
- **Supply chain:** portal installs from the Progress HAR registry (`npm ci` → 304 packages, ~3s).
- **Build:** portal typechecks clean and builds (3,240 modules) *with* the new Journey feature.
- **NUA-key auto-provisioning — end to end against a real account:** `create-kb.mjs` creates a KB,
  mints a service-account token, and writes `.env` with **zero manual steps** (exit 0). The
  provisioned token then ingested a synthetic corpus, which indexed and answered — grounded and
  cited — through every portal route (`/api/ask`, `/api/search`, the new `/api/journey`), and the
  **"Journey through the context"** walk ran in the browser with live confidence rings and
  resource-scoped relate answers. Throwaway KB deleted afterwards; account left as found.
- **Provisioning recipe pinned down** (and baked into `create-kb.mjs`): NUA keys work only on the
  **regional** API; KB create + SA create + key mint are all regional; the key-mint route is the
  **singular** `service_account/{id}/keys` with an `expires` epoch (≤ 1095 days); the token is
  minted **SCONTRIBUTOR** so one credential both ingests and serves. (NUA keys have no data-plane
  access; the global API rejects them.)

## Open / next
- **Parity:** finish porting the remaining legacy surfaces onto the palette (Ask is done; the rest
  still call `lib/arag` directly and stay valid). Grow the pigment set (coverage/REMi dials, a graph
  canvas wrapper).
- Optional: let a composition override the nav, not just Home + routes.
- Minor: a stray `portal/.env` shadows the root `.env` the provisioner writes — worth a guard.
