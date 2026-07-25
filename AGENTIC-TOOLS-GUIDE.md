# Agentic Coding Tools Guide

The ARAG Demo Factory ships configuration for every major AI coding tool. Pick the one you
use and follow the setup below. All tools read the same source of truth — `AGENTS.md` — and
connect to the same `nuclia` MCP server; only the entry-point instruction file and the MCP
config format differ.

## Quick Reference

| Tool | Instructions File | MCP Config | Agents | Orchestration |
|------|------------------|------------|--------|---------------|
| **VS Code Copilot** | `.github/copilot-instructions.md` | `.vscode/mcp.json` | 10 specialist agents | Full one-shot auto-orchestration |
| **Copilot CLI** | `.github/copilot-instructions.md` | `.vscode/mcp.json` | 10 specialist agents | Full one-shot auto-orchestration |
| **Claude Code** | `CLAUDE.md` + `AGENTS.md` | `.mcp.json` | — | One-shot (follow AGENTS.md) |
| **OpenCode** | `AGENTS.md` | `opencode.json` | — | One-shot (follow AGENTS.md) |
| **Cursor** | `.cursorrules` + `AGENTS.md` | `.cursor/mcp.json` | — | One-shot (follow AGENTS.md) |
| **Windsurf** | `.windsurfrules` + `AGENTS.md` | — (global config) | — | One-shot (follow AGENTS.md) |

Every tool follows the same rule: **one prompt → one build, no menu.** The specialist-agent
roster and the SessionStart hook are Copilot-specific; the other tools get the same
behaviour from the instruction files.

## The MCP servers

Two MCP servers ship with the factory:

- **`nuclia`** (HTTP) — the primary interface for all Knowledge Box operations
  (`search_documents`, `get_document`, `batch_get_documents`, ingest/write tools). Its URL
  and bearer token are composed from your `.env` (`NUCLIA_ZONE`, `NUCLIA_KB_ID`,
  `NUCLIA_SERVICEACCOUNT`). **It registers against the orchestrator's runtime — subagents do
  not inherit it**, so all KB work stays in the orchestrator's loop.
- **`playwright`** (local, `npx @playwright/mcp`) — headless browser automation for verifying
  the portal and recording demos.

---

## Claude Code

1. Install Claude Code, then run `claude` from the project root.
2. It reads `CLAUDE.md` on startup (which points to `AGENTS.md`) and connects the `nuclia` +
   `playwright` MCP servers via `.mcp.json`.
3. Fire one prompt describing the demo — Claude maps it to the catalog and builds.

The `nuclia` MCP tools live in Claude's own runtime. If you spawn subagents, they won't see
those tools — that's by design; KB work stays in the main loop.

---

## VS Code Copilot (richest integration)

1. Install VS Code + the GitHub Copilot Chat extension.
2. Open the factory folder; open Chat (`Cmd/Ctrl+Shift+I`) and select **Agent** mode.
3. You get: the 10 specialist agents in `.github/agents/`, the one-shot orchestrator in
   `.github/copilot-instructions.md`, the SessionStart hook
   (`.github/hooks/session-start.sh`) that injects the one-shot rule, the `nuclia` +
   `playwright` MCP servers (`.vscode/mcp.json`), and a curated dev-command allowlist
   (`.vscode/settings.json`).
4. Describe the demo in one prompt — the orchestrator routes to specialists automatically.

Talk to a specialist directly with `@agent-name` (e.g. `@retrieval-engineer tune the
citation policy`).

---

## OpenCode

1. Install OpenCode; run `opencode` in the project directory.
2. It reads `AGENTS.md` and connects the MCP servers via `opencode.json`.
3. Fire one prompt. OpenCode has no separate agent roster, but `AGENTS.md` carries the full
   one-shot flow and the MCP boundary rule.

---

## Cursor

1. Open the folder in Cursor; use Chat (`Cmd/Ctrl+L`) or Composer (`Cmd/Ctrl+I`).
2. It reads `.cursorrules`; add `@AGENTS.md` to your first message for the full flow.
3. MCP servers are configured in `.cursor/mcp.json`.

---

## Windsurf

1. Open the folder in Windsurf; use Cascade.
2. It reads `.windsurfrules`; reference `AGENTS.md` in your first message for full context.
3. Windsurf uses a **global** MCP config. Add the servers to
   `~/.codeium/windsurf/mcp_config.json`:
   ```json
   {
     "mcpServers": {
       "nuclia": {
         "serverUrl": "https://<zone>.rag.progress.cloud/api/v1/kb/<kbId>/mcp",
         "headers": { "X-NUCLIA-SERVICEACCOUNT": "Bearer <token>" }
       },
       "playwright": { "command": "npx", "args": ["@playwright/mcp@0.0.74", "--headless"] }
     }
   }
   ```

---

## Files generated / shipped for tools

| File | Purpose | Read by |
|------|---------|---------|
| `AGENTS.md` | Orchestration, catalog, pipeline, Hard Rules (authoritative) | all tools |
| `CLAUDE.md` | Quick reference for Claude Code | Claude Code |
| `.cursorrules` | Project rules for Cursor | Cursor |
| `.windsurfrules` | Project rules for Windsurf | Windsurf |
| `.github/copilot-instructions.md` | One-shot orchestrator | VS Code Copilot |
| `.github/agents/*.agent.md` | 10 specialist agents | VS Code Copilot |
| `.github/hooks/session-start.sh` | Injects the one-shot rule at session start | VS Code Copilot |
| `.mcp.json` / `.vscode/mcp.json` / `.cursor/mcp.json` / `opencode.json` | `nuclia` + `playwright` MCP | respective tools |
| `.vscode/settings.json` | Dev-command allowlist | VS Code |

## Troubleshooting

| Problem | Solution |
|---------|----------|
| It shows a menu / asks which option | It shouldn't — this factory is one-shot. Re-state your demo (a vertical or audience). |
| Tool doesn't know the project | Reference `AGENTS.md` explicitly in your first message. |
| MCP `nuclia` not connecting | Check `.env` has `NUCLIA_ZONE`, `NUCLIA_KB_ID`, `NUCLIA_SERVICEACCOUNT` set; the URL is composed from them. |
| Subagent "can't see the KB tools" | Correct — MCP lives in the orchestrator's runtime. KB work stays there. |
| Portal build fails | The npm registry may be unreachable — `setup.sh` warns about this. |
