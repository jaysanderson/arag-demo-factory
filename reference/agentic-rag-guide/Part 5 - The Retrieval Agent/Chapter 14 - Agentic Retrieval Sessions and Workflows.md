**PART 5 — THE RETRIEVAL AGENT**

**Chapter 14\
Agentic Retrieval, Sessions, and Workflows**

*Beyond fixed pipelines — multi-source, multi-step, reasoning retrieval*

Everything so far has used a Knowledge Box's *fixed* RAG pipeline: one
query, one retrieval, one answer. That is the right tool for most
questions. But complex questions — ones that need several sources,
intermediate reasoning, or a decision about *where* to look — call for
something more. This is the **Retrieval Agent** (also called the
Retrieval-Augmented Orchestrator, or RAO): a configurable agent that
plans, routes, and iterates. This is the "Agentic" in Progress Agentic
RAG.

**Why an agent, not just a pipeline**

A Knowledge Box answers "what is the refund window?" perfectly: search,
retrieve, generate. It struggles with "compare our refund policy to the
one in this SQL database of competitor terms, and if neither covers
digital goods, check the web." That question needs multiple sources, a
sub-question breakdown, conditional routing, and iteration until the
information is sufficient. The Retrieval Agent is built for exactly
this.

A Retrieval Agent can:

- Draw on **several sources at once** — multiple Knowledge Boxes, SQL
  and Snowflake databases, pandas dataframes, internet search services,
  and MCP servers.

- **Analyse and split** a user question into sub-questions and decide
  dynamically which sources each needs.

- Apply **conditional logic** to route from one step to the next —
  including fallbacks.

- **Reason and iterate** autonomously until it has enough to answer.

**The two building blocks: drivers and a workflow**

A Retrieval Agent is defined by two things.

**Drivers — the sources**

A **driver** makes one information source available to the agent. Its
name and description matter, because the agent uses them to decide
whether a source is relevant to the question in hand. Supported drivers
include:

| **Driver** | **Source it exposes** |
|----|----|
| NucliaDB | One of your Knowledge Boxes (with a chosen search configuration) |
| Perplexity / Google | Internet search services |
| SQL | A relational database, queried in natural language (beta) |
| Snowflake | A Snowflake database, with dialect-aware SQL (beta) |
| MCP | Tools exposed by Model Context Protocol servers |

| **Tip** Write driver descriptions as carefully as you would write a job description. The agent routes queries to sources based on these descriptions; a vague one means the agent sends the wrong questions to the wrong source. For a NucliaDB driver in the same region, the platform will auto-create an API key for you — you only set its expiry. |
|----|

**Workflow — how questions are handled**

The **workflow** is the plan. It has four stages, each hosting specific
agents:

| **Stage** | **Purpose** | **Available agents** |
|----|----|----|
| Preprocess | Improve the question before retrieval | Rephrase |
| Retrieval context | Gather the information to answer | Ask, Perplexity/Google, MCP, SQL, Snowflake, Pandas, Smart Agent |
| Generation | Produce the answer from what was retrieved | Summarize |
| Postprocess | Assess quality or trigger actions | Validation (REMi), External Call |

**Preprocess → Rephrase** rewrites the user's question for better
retrieval, optionally consulting a Knowledge Box for context and
following rules you specify. **Retrieval context** is where the work
happens: an *Ask* agent queries a Knowledge Box driver; a *Perplexity*
agent searches the web; *SQL*/*Snowflake*/*Pandas* agents query
structured data in natural language. **Generation → Summarize** turns
the gathered material into an answer. **Postprocess** can run a
*Validation* agent that uses the REMi model to score answer quality, or
an *External Call* agent that makes an HTTP request to trigger a
downstream action.

**The Smart Agent: planning and reactive modes**

The most powerful retrieval agent is the **Smart Agent**, which
orchestrates other agents. Instead of a fixed route, it picks the
appropriate sources, splits the question into sub-questions, evaluates
relevancy, and iterates until the information is sufficient. It runs in
one of two modes:

- **Planning mode** — generate a full plan up front, then execute it.

- **Reactive mode** — select and execute functions iteratively, deciding
  each next step from the last result.

You register other agents (Knowledge Boxes, MCP tools, databases) with
the Smart Agent as *registered agents*, each with a description of what
it does and the function it exposes. Only registered agents that expose
functions can be orchestrated. You can use different LLMs for the
planning and execution phases to balance cost and quality, and enable
*feedback support* so the agent can pause to ask the user to validate an
intermediate result or supply a missing detail.

| **Key idea** The Smart Agent is where 'agentic' becomes literal: it decides, acts, observes, and decides again. Start with a simple fixed workflow (Ask → Summarize) and graduate to a Smart Agent only when questions genuinely need multi-source planning — the fixed workflow is cheaper, faster, and easier to reason about. |
|----|

**A worked pattern: internet fallback**

A common, high-value workflow answers from your Knowledge Box when it
can and falls back to the web when it cannot — so users always get an
answer, clearly sourced. The wiring:

1.  Create a **NucliaDB driver** (your Knowledge Box) and a **Perplexity
    driver** (web search).

2.  In **Retrieval context**, add an **Ask** agent using the Knowledge
    Box as its source.

3.  On that Ask agent's **Fallback** output, add a **Perplexity** agent
    — it runs only when the Knowledge Box has no relevant match.

4.  In **Generation**, add a **Summarize** agent to phrase the final
    answer from whichever source produced results.

This mirrors, at the agent level, the no_context behavior of /ask from
Chapter 10 — but instead of returning "not enough data," the agent
reaches for another source.

**Talking to an agent: sessions and the WebSocket API**

Retrieval Agents are conversational and stateful, so they are driven
over a **WebSocket** rather than a single request/response. This lets
the agent stream intermediate steps, stream the answer, and — crucially
— pause to ask the user for more information (a missing parameter, or to
trigger an OAuth flow for a source).

**Opening a connection**

Open the socket with an **ephemeral token** obtained from the agent's
/ephemeral_token endpoint (short-lived, safe to hand to a browser). The
URL:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>TEXT</strong></p>
<p>wss://&lt;zone&gt;.dp.progress.cloud/api/v1/agent/&lt;agent-id&gt;/session/ephemeral/ws?eph-token=&lt;token&gt;&amp;workflow_id=&lt;workflow-id&gt;</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

workflow_id is optional; omit it to run the agent's default workflow.
Send the user's question as the first message with operation: 0; send
operation: 1 to end the chat.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>{<br />
"question": "Compare our refund window to the competitor terms.",<br />
"operation": 0,<br />
"chat_history": [ { "question": "...", "answer": "..." } ]<br />
}</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

The agent streams back messages: intermediate step results, citations,
answer chunks, and occasionally an agent-to-user request for input.
Handle that last case — respond on the same socket — and the agent
resumes. The JavaScript SDK's RetrievalAgent class wraps this protocol
so you work with observables instead of raw frames.

| **Gotcha — tested** Ephemeral tokens are exactly that — ephemeral. Mint one per session from your backend (where the real credential lives) and pass only the ephemeral token to the browser. Never embed a long-lived key in client code that opens the socket directly. |
|----|

**Deploying a Retrieval Agent**

Three deployment paths, in increasing order of control:

- **Ready-to-use widget** — create a widget in the dashboard, customize
  it, and paste the snippet into your site. Fastest path to a working
  chat UI (Chapter 15).

- **Custom frontend** — implement the WebSocket protocol yourself, or
  use the JavaScript SDK's RetrievalAgent class for full control of the
  experience.

- **MCP** — expose the agent to a broader AI system (for example Claude
  or another MCP client) so the agent becomes a tool other assistants
  can call. The platform exposes MCP handler endpoints for exactly this.

Whichever you choose, the agent's configuration — drivers and workflow —
stays server-side and unchanged; deployment only decides how users reach
it.
