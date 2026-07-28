# ARAG Demo Factory — Release Notes

**A one-shot generator for Progress Agentic RAG demos.** A partner sets up three values once,
fires one prompt, and the factory builds a themed, grounded, cited demo — on their *own* account,
with a bespoke look fitted to the use case. No central service, no shared Knowledge Box, no
paint-by-numbers.

---

## The contract — three inputs, then one prompt

**One-time setup** (`.env`, ~30 seconds, copied from the Nuclia dashboard):

| | |
|---|---|
| `NUCLIA_NUA_KEY` | a NUA key with **Manage Knowledge Boxes** enabled (scoped — the right key to hand to partners) |
| `NUCLIA_ACCOUNT` | the account id (UUID) — a NUA key can't self-resolve it, so it's captured once |
| `NUCLIA_ZONE` | the region, e.g. `aws-ap-southeast-2-1` |

**Then every demo is a single prompt:** *"Build me a &lt;use case&gt;."* The factory does the rest.

## What the factory does per demo — automatically, on the partner's own account

1. **Provisions its own Knowledge Box** + a service-account (SOWNER) token — one credential that
   ingests, serves, and manages assets (`scripts/create-kb.mjs`).
2. **Generates + ingests a realistic synthetic corpus** for the invented company/domain.
3. **Creates saved search configurations** (`create-retrieval.mjs`) and **Data-Augmentation agents**
   — labeler → facets, `llm-graph` → a knowledge graph, `synthetic-questions` → richer retrieval
   (`create-da-agents.mjs`).
4. **Paints a bespoke portal** — its OWN shell, navigation, information architecture and layout,
   composed from the palette and fitted to the domain (a dealership build is an operations console;
   a legal build is a matter workspace). **Never a recoloured template.**
5. **Verifies** — cornerstone queries answer *with citations*; refusal probes *decline* grounded.

## The principles it's built on

- **The package is a palette; the SE is the artist; each demo is an original masterpiece.** Every
  demo is *structurally* unique (its own IA/nav/layout via a bespoke `Shell`), not the same shell
  recoloured. Theming the config-shell is a throwaway quick-sketch only.
- **The guarantees live in the materials.** Grounded, cited, no-invented-data are enforced by
  *incorruptible pigments* — `<GroundedAnswer>` can't render an uncited claim; `<CitedMetric source>`
  can't render a number without KB provenance — and a **groundedness lint** fails the build on any
  hardcoded metric or external data fetch. Free composition, incorruptible materials.
- **Distributable by design.** The NUA key is scoped; each partner brings their own account; there's
  **no central/shared KB dependency**; the portal installs from the Progress **HAR registry**.
- **Expert knowledge on board.** The complete **910-page Progress Agentic RAG practitioner's guide**
  is bundled (`reference/agentic-rag-guide/`) and wired into the build agent, so it works across the
  whole platform end-to-end — and partners can optionally ingest it too.
- **Signature surface — "Journey through the context":** a cinematic, per-source grounding walk
  (animated confidence rings, "cited in the answer" badges, a resource-scoped "how this relates").

## Verified (live, this release)

- **Full end-to-end battle test on a real account:** provision → ingest → 3 search configs → 3 DA
  agents (running) → portal → grounded, cited answers + correctly *grounded refusals*. Throwaway KB
  cleaned up afterwards.
- **The exact ARAG provisioning recipe pinned down and baked into the scripts:** NUA keys work only
  on the **regional** API; KB service-account **key mint** is the singular `service_account/{id}/keys`
  route (`expires` ≤ 1095 days); **DA-agent tasks use the SOWNER service-account token, not the NUA
  key** (which is 403), on the `dp` host, `on: 1` (field), keyed operations; a NUA key without
  `allow_kb_management` now **fails fast** with a clear message.
- **Supply chain + build:** `npm ci` from HAR (304 packages), portal `tsc` **0 errors**, `npm run
  build` + groundedness lint green.
- **A real one-shot demo** (an automotive dealership DMS console) built and reviewed in the browser —
  bespoke sidebar console, KB-derived KPIs with visible provenance, grounded/cited throughout.

## Open / next

- Mobile sweep of bespoke shells; grow the pigment set (coverage/REMi dials, richer graph);
  optional knowledge-graph entity de-duplication.

*Repo: github.com/jaysanderson/arag-demo-factory · the raw guide lives at
github.com/jaysanderson/building-solutions-progress-agentic-rag (not vendored — the package stays lean).*
