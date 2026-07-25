# ARAG Demo Factory

A **one-shot generator** for **Progress Agentic RAG (ARAG / Nuclia)** sales demos. Open it,
fire **one prompt**, and the factory maps your words onto a catalog of shipped use cases,
generates a synthetic corpus, binds a Knowledge Box, and brings it home as a **themed,
grounded, cited research portal** — ready to demo.

It is modelled on the PDP Agentic Package's guardrail spine, retargeted from
MarkLogic/Semaphore to ARAG/Nuclia — and deliberately **inverted** on one point: the
reference package always shows a build menu; this factory never does. You describe the demo;
it builds it.

## Quick Start

```bash
# 1. Check prerequisites (Node 20+, Git) and Nuclia credentials
chmod +x setup.sh && ./setup.sh          # Windows: .\setup.ps1

# 2. Add your Nuclia credentials
cp .env.example .env                      # then paste your KB service-account token + KB URL

# 3. Open the factory in your AI coding tool and fire ONE prompt, e.g.
#    "Build me an insurance claims and fraud workbench, no graph, add call QA"
```

That's it — no menu, no wizard. The orchestrator maps the prompt to a blueprint ×
capabilities and runs the whole pipeline. See `GETTING_STARTED.md` for the bouncing-ball
walkthrough and `AGENTIC-TOOLS-GUIDE.md` for per-tool setup.

## The Shopping List (`catalog/`)

Everything the factory can build is data in `catalog/`, drawn from the real portfolio of
shipped ARAG demos (see `DEMOS.md`).

```
        BLUEPRINTS (vertical / story)            ×        CAPABILITIES (ARAG surfaces)
   legal-matter-intelligence                          cited-ask   find     graph
   insurance-claims-workbench                          facets      call-qa  workflows
   enterprise-ops-command  cx-concierge      ×         remi        mcp      personalize
   doc-intelligence  grains-research                   visibility  personas
   sales-enablement  ai-visibility …
```

A demo = **one blueprint × a chosen subset of capabilities**, composed into
`demo.config.json`. The portal renders itself from that config; it is never rewritten per
demo. Add a use case by dropping one JSON file into `catalog/blueprints/` and running
`node scripts/build-catalog.mjs`.

## The One-Shot Flow

| Phase | What happens |
|-------|--------------|
| 0 Scaffold | `create-app.js` writes `demo.config.json`, themes the portal, removes factory-only files |
| 1 Knowledge Box | Bind/create the KB; verify reachability |
| 2 Corpus | Bind a live reference KB, or generate a synthetic corpus and ingest it (via the `nuclia` MCP) |
| 3 Retrieval | Set the RAG strategy, prompt, and citation policy (grounding + citations on) |
| 4 Portal | Theme and wire the resolved surfaces from `demo.config.json` |
| 5 Verify | Cornerstone queries must answer + cite; refusal probes must refuse |
| 6 Deliver | Local URL + "what to show" + optional Fly deploy (`<slug>.fly.dev`) |

Phases run straight through — no pausing between them. See `AGENTS.md` for the authoritative
detail.

## Architecture

```
Generated demo portal (Vite + React + TypeScript, one shell, config-driven)
  -> Portal server (Express, server/index.mjs) — holds NUCLIA_SERVICEACCOUNT, proxies ARAG
       -> Progress Agentic RAG (Nuclia) — ALL retrieval + generation:
              /ask (NDJSON stream, cited)  /find  /catalog (facets)  /graph
              /resources (+ ingest)  labelsets  predict/chat  mcp/sse
  -> demo.config.json — blueprint × capabilities → which surfaces render, theme, KB binding
```

The portal **never talks to Nuclia directly** — the Express server holds the token and
proxies (`X-NUCLIA-SERVICEACCOUNT: Bearer …`). Answers **must** render citations.

## Hard Rules (non-negotiable)

Every demo is customer-facing, so every build honours these — enforced by `create-app.js`:

1. **Synthetic only** — all corpora are generated; never real records.
2. **No real brands** — fictional companies/firms/products; real place/crop names are fine.
3. **Anonymise identities** — synthetic authors/contacts (`demo@example.com`), never a real person.
4. **Residency safety** — never print the zone/region on a customer-facing surface.
5. **Visible disclaimer** — every portal renders `safety.disclaimer`.
6. **Token hygiene** — `NUCLIA_SERVICEACCOUNT` stays in server-side env; never in config, the UI, or git.

## Prerequisites

- **Node.js 20+**
- **Git**
- A **Nuclia** account + **service-account token** and a **Knowledge Box** (URL, zone, id)
- Network access to the npm registry for the portal build (`setup.sh` warns if it's blocked)

## Ports

| Service | Port | URL |
|---------|------|-----|
| Portal server (Express) | 4000 (8080 in container) | http://localhost:4000 |
| Portal UI (Vite dev) | 5173 | http://localhost:5173 |

## Key Files

| Purpose | Path |
|---------|------|
| Orchestration (authoritative) | `AGENTS.md` |
| Copilot orchestrator | `.github/copilot-instructions.md` |
| Specialist agents | `.github/agents/` |
| The shopping list | `catalog/` |
| Composer / scaffolder | `create-app.js` |
| Corpus / ingest / verify / build-catalog | `scripts/` |
| Live portfolio snapshot | `DEMOS.md` |
| MCP config | `.mcp.json`, `opencode.json`, `.vscode/mcp.json`, `.cursor/mcp.json` |

## License

ISC
