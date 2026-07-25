# Getting Started — ARAG Demo Factory

## What Is This?

A **one-shot demo generator** for **Progress Agentic RAG (ARAG / Nuclia)**. You describe the
demo you want in one sentence; the factory maps it onto a catalog of shipped use cases,
generates a synthetic corpus, binds a Knowledge Box, themes a portal, and verifies it — then
hands you a live, grounded, cited research portal. No menu, no wizard, no clicking through
options.

## Follow the Bouncing Ball

```
unzip  →  set Nuclia creds  →  open in Claude/Copilot  →  fire ONE prompt  →  live portal
```

### 1. Unzip / clone

```bash
cd arag-demo-factory
chmod +x setup.sh && ./setup.sh        # Windows: .\setup.ps1
```

`setup.sh` checks Node 20+ and Git, probes npm-registry reachability (and warns clearly if
it's blocked — it does not hard-fail), and checks for your Nuclia credentials.

### 2. Set your Nuclia credentials

```bash
cp .env.example .env
```

Open `.env` and fill in:

| Variable | What it is |
|----------|-----------|
| `NUCLIA_SERVICEACCOUNT` | Your KB service-account token (JWT or `kb-…`). **Server-side only.** |
| `NUCLIA_KB_URL` | `https://<zone>.rag.progress.cloud/api/v1/kb/<kbId>` (doc-processing KBs use `dp.progress.cloud`) |
| `NUCLIA_ZONE` | e.g. `europe-1`, `aws-eu-1` — server-side only, never rendered |
| `NUCLIA_KB_ID` | The KB id (uuid) |

`.env` and `.mcp.json` are gitignored — the token never reaches git, `demo.config.json`, or
the UI.

### 3. Open the factory in your AI coding tool

| Tool | How to start |
|------|-------------|
| **Claude Code** | Run `claude` in the project directory |
| **VS Code Copilot** | Open the folder, `Cmd/Ctrl+Shift+I`, select **Agent** mode |
| **Cursor** | Open the folder, use Composer or Chat |
| **Windsurf** | Open the folder, use Cascade |
| **OpenCode** | Run `opencode` in the project directory |

Each tool reads the factory's instruction files (`CLAUDE.md` / `.github/copilot-instructions.md`
/ `.cursorrules` / `.windsurfrules` / `AGENTS.md`) and the `nuclia` MCP config automatically.
See `AGENTIC-TOOLS-GUIDE.md` for per-tool detail.

### 4. Fire one prompt

Describe the demo — a vertical and/or an audience. Examples:

```
"Build me a legal matter-intelligence demo for a boutique family-law firm."
"Insurance claims and fraud workbench — no graph, add call QA."
"A research portal over our grains-research papers, with a groundedness dashboard."
"Customer concierge for an outdoor-gear retailer, just search and chat."
```

The orchestrator echoes a single line:

```
Building: Insurance Claims Workbench (from insurance-claims-workbench) · surfaces: Ask, Search, Facets, Call QA, REMi · project: ironclad-claims
```

…and then runs the whole pipeline without stopping to ask.

### 5. Live portal

At the end you get a local URL, a one-paragraph "what to show", and a timing summary. Ask it
to **deploy to Fly** and it ships to `<slug>.fly.dev`.

## What the Factory Does For You (Phases 0-6)

0. **Scaffold** — runs `create-app.js` (you never run it yourself).
1. **Knowledge Box** — binds/creates and verifies the KB.
2. **Corpus** — binds a live reference KB, or generates a synthetic corpus and ingests it.
3. **Retrieval** — sets the RAG strategy, prompt, and citation policy (grounding on).
4. **Portal** — themes and wires the resolved surfaces.
5. **Verify** — cornerstone queries must answer + cite; refusal probes must refuse.
6. **Deliver** — URL, demo script, optional Fly deploy.

## If Something's Off

| Symptom | Fix |
|---------|-----|
| "It asked me a question instead of building" | Your prompt had no domain signal (a bare "hi"). Name a vertical or audience. |
| Portal build fails on `npm install` | The npm registry may be unreachable — `setup.sh` warns about this. Restore network access. |
| KB not reachable | Re-check `.env` — token, KB URL, zone, id — then ask it to re-verify the KB. |
| An answer shows no citation | That's a bug by our rules — ask the orchestrator to re-run retrieval config (Phase 3). |

## The Shopping List

Everything the factory can build lives in `catalog/` (see `catalog/README.md`). To add a new
use case, drop one JSON file into `catalog/blueprints/` and run
`node scripts/build-catalog.mjs` (or use the `/add-blueprint` prompt).

Good luck — one prompt is all it takes.
