# The Retrieval Agent (builder distillation)

The **Retrieval Agent** (a.k.a. Retrieval-Augmented Orchestrator / RAO) is the "Agentic" in
Progress Agentic RAG: a configurable agent that **plans, routes, and iterates** across several
sources instead of running one fixed search-retrieve-generate pipeline. This is what powers the
**"Agentic" surface** in generated portals. Distilled from Chapter 14 of the practitioner's guide.

> Rule of thumb: reach for the agent only when a question genuinely needs **multiple sources,
> sub-question splitting, conditional routing, or iteration.** Otherwise use `/ask` — it is cheaper,
> faster, and easier to ground. See `docs/RETRIEVAL.md`.

## Agent vs. plain `/ask` — when a demo should use which

| Use `/ask` (KB pipeline) | Use the Retrieval Agent |
|---|---|
| One question, one KB, one answer | Needs **multiple sources at once** (KBs, SQL/Snowflake, pandas, web, MCP) |
| Grounded Q&A over the corpus | Question must be **split into sub-questions**, each routed to a different source |
| Stateless request/response (NDJSON) | **Conditional routing / fallbacks** (e.g. KB first, web if no match) |
| No cross-source reasoning | **Autonomous iteration** until information is sufficient; feedback pauses |
| Portal "Search / Ask" surface | Portal **"Agentic"** surface |

The agent's internet-fallback pattern mirrors `/ask`'s `no_context` behavior — but instead of
returning "not enough data," it reaches for another source.

## The two building blocks

**Drivers** expose sources. **Workflow** is the plan. Both live server-side; deployment only
decides how users reach the agent.

### Drivers (sources)

The agent routes questions to sources **by their name and description** — write descriptions like
job descriptions; a vague one sends the wrong question to the wrong source.

| Driver | Source it exposes |
|---|---|
| **NucliaDB** | One of your KBs (with a chosen search configuration). Same-region: platform auto-mints an API key — you only set expiry. |
| **Perplexity / Google** | Internet search |
| **SQL** (beta) | Relational DB, queried in natural language |
| **Snowflake** (beta) | Snowflake, dialect-aware SQL |
| **MCP** | Tools exposed by MCP servers |

### Workflow (four stages)

| Stage | Purpose | Agents available |
|---|---|---|
| **Preprocess** | Improve the question before retrieval | Rephrase (optionally consults a KB, follows your rules) |
| **Retrieval context** | Gather what's needed to answer | **Ask** (KB driver), Perplexity/Google, MCP, SQL, Snowflake, Pandas, **Smart Agent** |
| **Generation** | Produce the answer | Summarize |
| **Postprocess** | Assess quality / trigger actions | Validation (**REMi** scoring), External Call (HTTP → downstream action) |

**Smart Agent** — the orchestrator. Instead of a fixed route it picks sources, splits the question,
evaluates relevancy, and iterates. Two modes: **Planning** (full plan up front, then execute) and
**Reactive** (choose+execute each next step from the last result). You attach other agents as
*registered agents* (each with a description + the function it exposes — **only agents that expose
functions can be orchestrated**). Different LLMs may drive planning vs. execution; enable *feedback
support* to let it pause and ask the user to validate a step or supply a missing detail. Start with
a fixed **Ask → Summarize** workflow; graduate to a Smart Agent only when questions need real
multi-source planning.

**Worked pattern — internet fallback** (high-value default): (1) NucliaDB driver + Perplexity
driver; (2) **Ask** agent on the KB in Retrieval context; (3) a **Perplexity** agent on that Ask
agent's **Fallback** output (runs only when the KB has no match); (4) **Summarize** in Generation.
Users always get an answer, clearly sourced.

## Talking to an agent — sessions over WebSocket

Retrieval Agents are conversational and stateful, so they run over a **WebSocket** (not a single
request/response). The socket streams intermediate step results, citations, and answer chunks — and
can **pause to ask the user** for a missing parameter or to trigger an OAuth flow for a source.

### Host + auth

Agent sessions run on the **NUA API**, on the **`dp` zone host** — `{zone}.dp.progress.cloud/api/v1`
(same host as tasks/search-configurations). Mint the ephemeral token **server-side** with the NUA
key (`X-NUCLIA-NUAKEY: Bearer …`); hand only the short-lived **ephemeral token** to the browser.

> **Never** embed a long-lived NUA key in client code that opens the socket. One ephemeral token per
> session, minted from the backend where the real credential lives.

### Endpoints

| Step | Call | Notes |
|---|---|---|
| Mint session token | `POST {zone}.dp.progress.cloud/api/v1/agent/{agent-id}/ephemeral_token` (NUA key) | Short-lived; safe for the browser |
| Open session | `wss://{zone}.dp.progress.cloud/api/v1/agent/{agent-id}/session/ephemeral/ws?eph-token={token}&workflow_id={workflow-id}` | `workflow_id` optional — omit to run the agent's default workflow |

### Protocol (frames)

First message sends the question with `operation: 0`; send `operation: 1` to end the chat. Include
prior turns in `chat_history` for statefulness.

```json
{
  "question": "Compare our refund window to the competitor terms.",
  "operation": 0,
  "chat_history": [ { "question": "...", "answer": "..." } ]
}
```

The agent streams back: intermediate step results, citations, answer chunks, and occasionally an
**agent-to-user request for input** — reply on the same socket and the agent resumes. The
JavaScript SDK's **`RetrievalAgent`** class wraps this protocol (observables instead of raw frames).

## Deploying (three paths, increasing control)

| Path | Use when |
|---|---|
| **Ready-to-use widget** | Fastest working chat UI — build+customize a widget in the dashboard, paste the snippet (Chapter 15) |
| **Custom frontend** | Implement the WebSocket protocol yourself, or use the SDK's `RetrievalAgent` — full control. **This is what the portal's "Agentic" surface does:** portal server mints the ephemeral token, browser drives the socket. |
| **MCP** | Expose the agent as a tool to a broader AI system (Claude or any MCP client) via the platform's MCP handler endpoints |

The agent's configuration (drivers + workflow) stays server-side and unchanged across all three.

---
*Source: Chapter 14, "Agentic Retrieval, Sessions, and Workflows" (Part 5 — The Retrieval Agent),
Building Solutions with Progress Agentic RAG. Cross-checked against `docs/ARAG-REFERENCE.md` for
hosts/headers.*
