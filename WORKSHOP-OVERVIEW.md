# Workshop Overview — ARAG Demo Factory

A short enablement session that gets a sales engineer from "never seen it" to "I built a
live, grounded ARAG demo from one prompt" in under an hour.

## Who It's For

Sales engineers and solution consultants who need to stand up a **Progress Agentic RAG
(ARAG / Nuclia)** demo for a customer conversation — fast, on-brand (fictional brand), and
grounded enough to survive a sceptical buyer.

## What They'll Walk Away With

- A live demo portal for a chosen vertical, generated from **one prompt**.
- A synthetic, fictional-brand corpus in a Knowledge Box — grounded, cited answers and clean
  refusals.
- The mental model: **blueprint × capabilities → `demo.config.json` → portal**, and how to
  extend the catalog.

## The Big Idea

This is a **one-shot factory**. Unlike the PDP reference package (which always shows an
A/B/C/D build menu), here the SE describes the demo in a sentence and the factory maps it
onto a **catalog of shipped use cases** and builds it end-to-end — no menu, no pausing. The
catalog *is* the option space.

## Agenda (~60 min)

| Time | Segment | What happens |
|------|---------|--------------|
| 0:00 | Setup check | Run `./setup.sh`; confirm Node 20+, Git, and Nuclia creds in `.env`. See `WORKSHOP-SETUP.md`. |
| 0:10 | The shopping list | Tour `catalog/` — blueprints (verticals) × capabilities (ARAG surfaces). Ground it in `DEMOS.md`. |
| 0:20 | Fire one prompt | Each SE fires a prompt for their vertical and watches Phases 0-6 run (scaffold → KB → corpus → retrieval → portal → verify). |
| 0:35 | Prove it's grounded | Run the cornerstone queries (answer + cite) and a refusal probe (must refuse). This is the trust story. |
| 0:45 | Reskin & extend | Change the brand/capabilities; add a blueprint with `/add-blueprint`; rebuild the catalog. |
| 0:55 | Deploy (optional) | Ship to Fly (`<slug>.fly.dev`) with the token as a Fly secret. |

## The Hard Rules (say them out loud)

Every demo is customer-facing, so every build honours these — the SE should be able to
recite them:

1. Synthetic only. 2. No real brands. 3. Anonymise identities. 4. No residency/zone strings
on screen. 5. Visible disclaimer. 6. Token server-side only.

## Facilitator Notes

- Emphasise the inversion: **no menu.** If a tool shows one, the SE's prompt was too vague —
  coach them to name a vertical or audience.
- The `nuclia` MCP lives in the orchestrator's runtime — subagents don't inherit it. When
  someone asks "why can't the subagent load the data?", that's the answer: KB work stays in
  the main loop.
- Have everyone's `.env` ready before the session (see `WORKSHOP-SETUP.md`) — credential
  fumbling is the #1 time sink.
