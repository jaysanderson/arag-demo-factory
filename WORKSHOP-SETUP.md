# Workshop Setup — ARAG Demo Factory

Do this **before** the session so the hour is spent building, not fumbling with credentials.

## 1. Prerequisites (5 min)

| Requirement | Check | Get it |
|-------------|-------|--------|
| **Node.js 20+** | `node --version` | https://nodejs.org/ or `winget install OpenJS.NodeJS.LTS` |
| **Git** | `git --version` | https://git-scm.com/ or `winget install Git.Git` |
| **An AI coding tool** | — | Claude Code, VS Code Copilot, Cursor, Windsurf, or OpenCode |
| **npm registry access** | `curl -sSf -m 8 https://registry.npmjs.org/` | Needed only for the portal build; `setup.sh` warns if blocked |

Run the automated check:

```bash
chmod +x setup.sh && ./setup.sh        # Windows: .\setup.ps1
```

It verifies Node + Git, probes the npm registry (warns, never hard-fails), and checks your
`.env`.

## 2. Nuclia Credentials (5 min) — the part people forget

Each SE needs a **Nuclia account**, a **service-account token**, and a **Knowledge Box**.

```bash
cp .env.example .env
```

Fill in `.env`:

| Variable | Where to find it |
|----------|-----------------|
| `NUCLIA_SERVICEACCOUNT` | KB → service accounts → create/copy the token (JWT or `kb-…`) |
| `NUCLIA_KB_URL` | `https://<zone>.rag.progress.cloud/api/v1/kb/<kbId>` (doc-processing KBs use `dp.progress.cloud`) |
| `NUCLIA_ZONE` | The KB's zone, e.g. `europe-1`, `aws-eu-1` |
| `NUCLIA_KB_ID` | The KB id (uuid), from the KB URL |

To **create** KBs (not just bind one), also set `NUCLIA_ACCOUNT` + `NUCLIA_ACCOUNT_TOKEN`.

> **Token hygiene:** `.env` and `.mcp.json` are gitignored. The token stays server-side —
> never in `demo.config.json`, the UI, or git. Do not paste it into chat.

## 3. Confirm the MCP Connection (2 min)

Open the factory in your tool and ask it to **verify the Knowledge Box is reachable**. The
orchestrator will use the `nuclia` MCP tools (or `/counters`) to confirm. If it can't
connect, re-check the four `.env` values — the MCP URL is composed from `NUCLIA_ZONE` and
`NUCLIA_KB_ID`, and the bearer from `NUCLIA_SERVICEACCOUNT`.

## 4. Pick a Vertical (1 min)

Skim the reference catalog so each SE arrives with a prompt in mind:

```bash
node scripts/build-catalog.mjs        # (re)build the index if needed
cat catalog/catalog.json              # blueprints × capabilities
```

Example prompts to bring:

- "Legal matter-intelligence demo for a boutique family-law firm."
- "Insurance claims and fraud workbench — no graph, add call QA."
- "Grains-research portal with a groundedness dashboard."
- "Customer concierge for an outdoor-gear retailer, just search and chat."

## Pre-Flight Checklist

- [ ] `./setup.sh` passes (Node 20+, Git).
- [ ] `.env` has `NUCLIA_SERVICEACCOUNT`, `NUCLIA_KB_URL`, `NUCLIA_ZONE`, `NUCLIA_KB_ID`.
- [ ] npm registry reachable (or you accept the portal won't build here).
- [ ] AI coding tool installed and opened on the factory folder.
- [ ] The tool can verify the KB via the `nuclia` MCP.
- [ ] A vertical / prompt chosen.

If all six are ticked, you're ready — fire one prompt.
