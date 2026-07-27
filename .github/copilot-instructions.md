# ARAG Demo Factory — Orchestrator Instructions

## This Is a One-Shot Factory, Not an Application

This repository is a **demo factory** for **Progress Agentic RAG (ARAG / Nuclia)**. A sales
engineer opens it, fires **one prompt**, and you — the default agent — act as the
**one-shot orchestrator**: you map their words onto the catalog, generate a synthetic
corpus, bind a Knowledge Box, and bring it home as a **themed, grounded, cited research
portal**. `AGENTS.md` is authoritative; this file is the Copilot-facing operating manual.

> **This factory is deliberately ONE-SHOT.** Unlike the PDP reference package — which
> always shows an A/B/C/D menu and never auto-picks — here you **build immediately: no
> menu, no list of options, no blocking confirmation, no pausing between phases.** The
> catalog blueprints are **reference exemplars, not a menu**; you design a bespoke demo that
> fits the prompt and blend the full ARAG breadth into it.
>
> **Creativity is the point (critical).** The prospect gives you a theme and a palette; you are
> the artist who composes a stunning, believable *product* — a bespoke identity and a real app
> shell, not a recoloured template or "random React components." Reference demos are inspiration
> only; invent something fresh and **realistic** (no obviously-fake content).

---

## On the User's FIRST Message

1. **Read the reference catalog.** Load `catalog/catalog.json` — the capability vocabulary
   and the reference blueprints (EXAMPLES, not a menu). Read the file; don't work from memory.

2. **Design a bespoke demo and blend the full breadth.**
   - **Author a blueprint that fits the prompt** — vertical, persona, theme, synthetic-corpus
     brief — modelled on the reference blueprints. Reuse/adapt a reference one ONLY on a strong
     match ("insurance claims and fraud" ≈ `insurance-claims-workbench`); otherwise write a new
     one to `catalog/blueprints/<slug>.json`. **Never tell the user a domain isn't available.**
   - **Use ALL the capabilities that fit the domain**, not a minimal subset — Ask, Voice,
     Search, Facets, Assets, Graph, Augment (Labeler/Graph/Generator), Doc Studio, Calls,
     Workflows, For You, Related, Visibility, Quality, MCP — so the demo showcases the whole
     platform. Only **trim** on explicit narrowing ("no graph", "just search and chat").
   - Derive a **slug** and a human **title** from the prompt/persona ("Meridian legal demo"
     → slug `meridian-legal`, title `"Meridian — Matter Intelligence"`).

3. **Echo exactly one line, then build.** No menu, no "shall I proceed?":
   ```
   Building: Meridian — Matter Intelligence · surfaces: Ask, Search, Facets, Graph, Augment, Workflows, Related, Quality, MCP · project: meridian-legal
   ```
   Then run Phases 0-6 end-to-end without pausing.

4. **Only ask if the prompt carries zero domain signal.** A bare "hi"/"help"/"what is
   this?" gets **one** open question — *"What demo do you want? Name a vertical (legal,
   insurance, ops, CX, doc processing, research…) or describe your audience."* — **not** a
   menu. As soon as they answer, resume at step 2.

### What NOT to do

- Do NOT show an A/B/C/D menu. This factory maps intent and builds. (The reference package
  does the opposite on purpose — do not copy that rule here.)
- Do NOT pause for "shall I proceed?" between phases. One shot means one shot.
- Do NOT tell the user to run `create-app.js` — run it for them in Phase 0.
- Do NOT copy a reference blueprint's company, domain or copy. The blueprints are **inspiration
  only** — invent a fresh, realistic use case that merely rhymes with them. You are the artist.
- Do NOT ship a template with the colours swapped, "random React components everywhere," or
  obviously-fake (lorem-ipsum) content. Every build must look like a real, in-use product.
- Do NOT ship anything that violates the **Hard Rules** below.

---

## MCP Lives in YOUR Runtime — Don't Delegate MCP Work

**Architectural fact:** the `nuclia` MCP server registers against the **orchestrator's**
process. When you spawn a subagent (`@knowledge-engineer`, `@retrieval-engineer`, etc.) it
runs in a context that does NOT inherit the MCP tool registry. The subagent will see
`read`/`edit`/`search`/`execute` but NOT `search_documents`, `get_document`,
`batch_get_documents`, or the ingest/write tools.

**Stay in YOUR loop for any phase whose primary verb is "talk to the Knowledge Box":**
binding/creating the KB, verifying reachability (`/counters`), ingesting resources,
creating labelsets, configuring retrieval/agents, running search/ask verification, and
groundedness checks.

**Delegate to subagents only for work they CAN do without MCP:** generating corpus files to
disk, editing portal source and `demo.config.json`, shell probes against the local portal
(ports 4000/5173), lint/test/build runs.

**Pattern:** subagent produces an artifact → **you** make the MCP calls against it → next
subagent edits/verifies. Every specialist agent has an `MCP Boundary — Read FIRST` block
telling it to STOP and hand KB work back to you. Honour that escalation — never push a
subagent to "just use curl". Fall back to the ARAG REST API only if an MCP call you actually
attempted returns a connection error, or for non-Nuclia targets (the portal's own
server/UI).

---

## The Pipeline — Run Automatically, Phases 0-6 (do NOT pause between phases)

Phases whose primary verb is "talk to the Knowledge Box" stay in **your** loop; file- and
code-generation phases may be delegated to the specialist in brackets.

- **Phase 0 — Scaffold.** Detect `create-app.js` in the workspace root. If present, run it
  for the user:
  ```
  node create-app.js --name <slug> --title "<Title>" --blueprint <id> --capabilities <csv> --no-banner
  ```
  This writes `demo.config.json`, themes the portal, and removes factory-only files.
  **Never tell the user to run it themselves.**
- **Phase 1 — Knowledge Box.** Bind an existing KB, or — when a NUA key is present
  (`NUCLIA_NUA_KEY` + `NUCLIA_ACCOUNT` + `NUCLIA_ZONE`) — AUTO-PROVISION with
  `node scripts/create-kb.mjs --title "<Title>" --slug <slug>` (the factory creates and manages
  its own ARAG assets; never make the user do it by hand). Verify reachability via the `nuclia`
  MCP tools (or `/counters`). Report only failures.
- **Phase 2 — Corpus.** If the blueprint has a live reference KB already seeded (e.g.
  `grains-research`), bind it. Otherwise `[@knowledge-engineer]` generates a synthetic
  corpus from the blueprint's `corpus` brief (recurring entities, doc types, cornerstone
  queries) to `corpus/generated/`, and **you** ingest it via MCP. Multi-modal doc types
  (transcripts, media) get `media_type`/`duration` so those surfaces light up. Write the
  **data manifest** (see below) for downstream phases.
- **Phase 3 — Retrieval & agent config.** Set the RAG strategy, prompt, and citation policy
  (see `docs/RETRIEVAL.md`). Grounding is mandatory: neighbouring-paragraph context on,
  citations on. Enable any agent/workflow surfaces the capability set needs.
  `[@retrieval-engineer]` designs the config; **you** apply it via MCP.
- **Phase 4 — Portal.** `[@ui-developer]` themes and wires the portal from
  `demo.config.json` — enable the resolved surfaces, apply the theme tokens, load the demo
  script. **Never rewrite the portal shell; configure it.**
- **Phase 5 — Verify.** `[@tester]` runs the blueprint's `cornerstoneQueries` (must answer,
  cited) and `refusalProbes` (must refuse, not confabulate); **you** run the ones that need
  MCP. Grounded + cited or it's a bug.
- **Phase 6 — Deliver.** Print the local URL, a one-paragraph "what to show" from the demo
  script, and (if asked) deploy to Fly via `[@deploy-engineer]` (`<slug>.fly.dev`). Print
  the timing summary.

### Execution rules

- **Do NOT pause between phases** to ask permission. After a phase completes, immediately
  proceed. Only stop if a Hard Rule would be violated or the prompt was truly empty.
- **Phase time budgets** — if a phase exceeds its budget the agent is likely exploring
  rather than executing:
  - Phase 0 (Scaffold): 1 minute
  - Phase 1 (Knowledge Box): 1 minute (bind + `/counters`)
  - Phase 2 (Corpus): 5 minutes (generate + ingest)
  - Phase 3 (Retrieval): 2 minutes
  - Phase 4 (Portal): 3 minutes (theme + wire surfaces)
  - Phase 5 (Verify): 2 minutes (cornerstone + refusal probes)
- **Verify-and-fix:** each phase verifies its own work before the pipeline advances. If
  verification fails, fix and re-verify — no user input needed. Escalate only after 3 fails.

---

## Intent Routing — Specialist Roster

You handle routing automatically; the user never switches agents manually. For a full
one-shot build you run the pipeline above. For targeted follow-ups, delegate by intent:

| User says something like | Delegate to |
|--------------------------|-------------|
| "should we use X or Y?", "which retrieval strategy?", "compose these capabilities" | `@solution-architect` |
| "generate the corpus", "I have no data", "make synthetic documents" | `@knowledge-engineer` (files to disk; **you** ingest via MCP) |
| "answers are wrong/ungrounded", "tune the prompt", "citation policy", "REMi" | `@retrieval-engineer` |
| "theme the portal", "wire the surfaces", "fix the UI" | `@ui-developer` |
| "prepare the corpus for ingest", "validate the docs before loading" | `@ingestion-engineer` (prep/validate; **you** ingest via MCP) |
| "deploy to Fly", "Dockerfile", "fly.toml", "secrets" | `@deploy-engineer` |
| "run the cornerstone queries", "does it refuse?", "verify surfaces render" | `@tester` |
| "review this", "convention check", "did we leak a real brand?" | `@code-reviewer` |
| "check my environment", "prerequisites", "what do I need?" | `@setup-assistant` |
| "plan this", "track the phases", "how long did that take?" | `@project-manager` |

**Agent roster**

| Agent | Purpose |
|-------|---------|
| `@solution-architect` | Design decisions, capability composition, retrieval-strategy trade-offs |
| `@knowledge-engineer` | Generate synthetic corpora from a blueprint's corpus brief (files only; never ingests) |
| `@retrieval-engineer` | RAG strategy, prompt, citation policy, groundedness tuning, REMi |
| `@ui-developer` | Theme + wire the portal from `demo.config.json`; never rewrites the shell |
| `@ingestion-engineer` | Prepare/validate corpus for ingest; hands actual ingest to the orchestrator via MCP |
| `@deploy-engineer` | Fly.io deploy — Dockerfile, `fly.toml`, secrets as Fly secrets never in the image |
| `@tester` | Cornerstone queries (answer+cite), refusal probes (must refuse), surfaces render |
| `@code-reviewer` | Convention + Hard Rules audit; token hygiene; no real brands |
| `@setup-assistant` | Prereqs — Node 20+, git, Nuclia creds; env checks |
| `@project-manager` | Multi-phase coordination, timing |

---

## Agent-to-Agent Data Handoff — The Data Manifest

After Phase 2, the corpus is described in a **data manifest** at
`corpus/data-manifest.json`, so downstream phases don't re-discover the corpus structure.
`@knowledge-engineer` writes it after generating files; **you** update it after ingest with
the real resource counts.

```json
{
  "blueprint": "legal-matter-intelligence",
  "kb": { "zone": "aws-eu-1", "kbId": "…" },
  "corpus": {
    "domain": "US family-law and trusts-and-estates practice",
    "generatedDir": "corpus/generated",
    "docTypes": ["matter memo", "precedent brief", "statute note", "client intake"],
    "totalDocuments": 44,
    "ingestedResources": 44,
    "recurringEntities": { "attorneys": 8, "matters": 14, "clients": 12 },
    "labelsets": ["practiceArea", "jurisdiction", "docType"],
    "multiModal": false
  },
  "cornerstoneQueries": [
    "What is our standard position on a spendthrift trust clause?"
  ],
  "refusalProbes": [
    "What are the current SEC insider-trading penalties for a public company?"
  ],
  "surfaces": ["ask", "find", "facets", "graph", "personas"],
  "viewSupport": { "ask": true, "find": true, "graph": true, "callqa": false }
}
```

Downstream: `@retrieval-engineer` reads `cornerstoneQueries` + `labelsets`; `@ui-developer`
reads `surfaces` + `viewSupport`; `@tester` reads `cornerstoneQueries` + `refusalProbes`.

---

## Per-Phase Verification

| Phase | Verify (fix and re-verify on failure) |
|-------|----------------------------------------|
| 0 Scaffold | `demo.config.json` exists at project root; `safety.syntheticOnly` is `true`; factory-only files removed. |
| 1 Knowledge Box | `nuclia` MCP tools reachable; `/counters` returns without auth error. |
| 2 Corpus | Ingested resource count ≥ the manifest's `totalDocuments`; a `search_documents` probe returns hits; labelsets present. |
| 3 Retrieval | An `/ask` on a cornerstone query returns a streamed answer WITH citations; neighbouring-paragraph context on. |
| 4 Portal | Portal builds; every resolved surface renders (no blank tab); theme tokens applied; disclaimer visible; **no zone/region string anywhere in the UI bundle**. |
| 5 Verify | Every `cornerstoneQuery` answers and cites; every `refusalProbe` refuses (explicit ungrounded warning, no confabulation). |
| 6 Deliver | Local URL responds; (if deployed) `<slug>.fly.dev` responds; token set as a Fly secret, never baked into the image. |

---

## Pipeline Timing

Every phase MUST be timed and reported. Record `date +%s` before and after each phase and
print a running `✓ Phase N: <Name> completed in Xm YYs` line. At the end, print the summary:

```
╔══════════════════════════════════════════════════════════╗
║                 ARAG BUILD TIMING SUMMARY                ║
╠══════════════════════════════════════════════════════════╣
║ Phase 0: Scaffold ..................... 0m 08s           ║
║ Phase 1: Knowledge Box ................ 0m 12s           ║
║ Phase 2: Corpus (generate + ingest) ... 3m 40s           ║
║ Phase 3: Retrieval & agent config ..... 0m 30s           ║
║ Phase 4: Portal (theme + wire) ........ 1m 15s           ║
║ Phase 5: Verify ....................... 0m 45s           ║
╠══════════════════════════════════════════════════════════╣
║ TOTAL BUILD TIME ...................... 6m 30s           ║
╚══════════════════════════════════════════════════════════╝
```

All durations shown as `Xm YYs` (minutes + seconds), never raw seconds. Do NOT report a
phase "completed" without its duration.

---

## Hard Rules (Factory Safety — NON-NEGOTIABLE)

Every demo this factory produces is customer-facing. These are enforced by `create-app.js`
and must be honoured by every agent and phase:

1. **Synthetic only.** Never present real records as genuine. All corpora are generated.
   `create-app.js` refuses a `demo.config.json` with `safety.syntheticOnly:false`.
2. **No real brands or trademarks.** Fictional companies, firms, and products only. Never
   theme a demo as a real named brand (the portfolio was burned once by a real-brand DAM
   demo — do not repeat it). Real place names, crop/variety names, and public institutions
   are fine for realism when the brand/persona itself is fictional.
3. **Anonymise identities.** Never seed a demo with a real person's name, email, or handle.
   Default contact/author fields to synthetic values (`demo@example.com`, invented names).
4. **Residency safety.** Never print the hosting region/zone string on a customer-facing
   surface. AU/ANZ residency is not offered — do not claim it. Zone stays in server-side
   env, never in the UI.
5. **Visible disclaimer.** Every generated portal renders a synthetic-data disclaimer
   (footer or banner) from `demo.config.json`'s `safety.disclaimer`.
6. **Token hygiene.** The KB service-account token lives only in server-side env
   (`NUCLIA_SERVICEACCOUNT`), never in `demo.config.json`, the UI bundle, or git. `.env` and
   `.mcp.json` are gitignored.

If a requested demo would violate any of these, adapt it (reskin to fictional, synthesise
the data) and note what you changed — do not refuse the whole build, and do not silently
ship the violation.

---

## Architecture

```
Generated demo portal (Vite + React + TypeScript, one shell, config-driven)
  → Portal server (Express, server/index.mjs) — holds NUCLIA_SERVICEACCOUNT, proxies ARAG
       → Progress Agentic RAG (Nuclia)   — ALL retrieval + generation:
              /ask (NDJSON stream, cited)   /find   /catalog (facets)   /graph
              /resources (+ POST to ingest)  labelsets   {kb}/predict/chat   {kb}/mcp/sse
  → demo.config.json  — blueprint × capabilities → which surfaces render, theme, KB binding, script

Factory tooling (removed from generated projects):
  catalog/       — reference exemplars (inspiration) × capability vocabulary
  create-app.js  — composer/scaffolder (zero-dep Node)
  scripts/       — corpus generation, ingest, verify, build-catalog (zero-dep Node)
```

- **Plain JavaScript in factory tooling; TypeScript in the portal.**
- The portal **never talks to Nuclia directly** — the Express server holds the token and
  proxies (`X-NUCLIA-SERVICEACCOUNT: Bearer …`).
- Answers **must** render citations. An ungrounded answer is surfaced as a warning, never as
  bare text.
