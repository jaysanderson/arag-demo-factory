---
description: "Deploy a finished demo portal to Fly.io at <slug>.fly.dev — Dockerfile + fly.toml + the KB token as a Fly secret (never in the image)."
agent: "deploy-engineer"
argument-hint: "Optional: the app slug (defaults to demo.config.json's slug)"
tools: [read, edit, search, execute]
---

# Deploy an ARAG Demo to Fly.io

Deploy the built portal to Fly. Ship what was built — do not change surfaces or behaviour at
deploy time. **The KB token is a Fly secret, never baked into the image, `fly.toml`,
`demo.config.json`, or git.**

## Steps

1. Read `demo.config.json` for the slug/title; confirm the portal builds locally
   (`cd portal && npm run build`).
2. **Dockerfile** — multi-stage: build the Vite portal, then run the Express server
   (`server/index.mjs`) serving the built assets on `PORT` (8080 in-container). Copy only
   build output + server. **Never copy `.env`.**
3. **fly.toml** — app `<slug>`, internal port 8080, force HTTPS, health check on the server's
   health route. No secrets in this file.
4. **Secrets** — from the local `.env`, set them as Fly secrets (names only shown here):
   ```
   fly secrets set NUCLIA_SERVICEACCOUNT=… NUCLIA_KB_URL=… NUCLIA_ZONE=… NUCLIA_KB_ID=…
   ```
5. **Deploy** — `fly deploy`. Then verify `<slug>.fly.dev` responds over HTTPS and an answer
   surface returns a cited answer (hand the KB-backed check to the orchestrator if needed).

## Verify before reporting done

- `grep -ri` the build context and `fly.toml` for the token value — must be ABSENT.
- `<slug>.fly.dev` responds; health check green; disclaimer renders; no zone string in the UI.
- `.env` was not copied into the image and is not committed.

## Output

App name/URL, Dockerfile + fly.toml summary, secrets set (names only), smoke-check result.
