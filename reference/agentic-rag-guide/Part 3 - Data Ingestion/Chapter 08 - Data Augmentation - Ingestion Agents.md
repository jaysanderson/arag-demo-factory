**PART 3 — DATA INGESTION**

**Chapter 8\
Data Augmentation: Ingestion Agents**

*Automatically enriching content as it lands — labels, structure,
graphs, and safety*

Ingestion does not have to stop at extraction. **Data augmentation
agents** (also called ingestion agents) run over your resources and
create new derived data: labels, summaries, structured JSON,
question/answer pairs, knowledge-graph relations, and safety flags. They
can run once over existing content, continuously over new content, or
only over resources matching criteria — and they can fire a webhook when
done.

**The agent catalog**

Querying the platform's task catalog on a live Knowledge Box (GET
/kb/{kbid}/tasks) returned the following agents. Each comes with its own
configuration schema.

| **Agent** | **What it produces** |
|----|----|
| labeler | Applies labels to resources or text blocks from label descriptions and examples |
| llm-graph | Extracts a knowledge graph — entities and relations — over resources |
| synthetic-questions | Generates question/answer pairs (a resource-specific FAQ) |
| ask | Generates summaries, JSON, or extracted structured content |
| llm-align | Aligns/validates generated content against source |
| memory | Analyses conversation fields and extracts memory facts incrementally |
| llama-guard | Flags text blocks or resources as unsafe / inappropriate |
| prompt-guard | Flags jailbreak / prompt-injection content |

| **Note** This catalog was read live from the platform during authoring. The dashboard groups them under friendlier names — Labeler, Generator, Q&A Generator, Graph Extraction, Content Safety & LLM Security — but the API task names above are what you configure against. |
|----|

**Labelers — automatic classification**

A labeler applies a labelset to content based on a short description of
each label. The canonical example: a support Knowledge Box with a
Severity labelset — Low, Moderate, High — each with a precise
description. The labeler reads each incoming ticket and assigns the
right severity, which you can then filter and facet on at query time
(Chapter 9). Because the classification happens at ingestion, search
stays fast — no per-query LLM classification.

| **Tip** Label descriptions are prompts. Vague descriptions produce vague labels. Write each one as if instructing a new analyst: state what qualifies, what does not, and give an example. This single practice does more for label quality than any model choice. |
|----|

**Generators — summaries, JSON, and Q&A**

Generator-style agents (the ask and synthetic-questions tasks) create
new text from existing resources. Use them to pre-compute per-resource
summaries, extract structured JSON (for example pulling parties, dates,
and amounts out of a contract into fields you can filter on), or build a
synthetic FAQ so common questions have crisp, pre-written answers to
retrieve against.

**Graph extraction — building the knowledge graph**

The llm-graph agent reads resources and extracts named entities and the
relations between them, populating the knowledge graph that Chapter 12
shows how to query. On the sandbox, graph extraction over an ingested
web page surfaced entities such as *Progress*, *Private Knowledge Box*,
and *Enterprise Knowledge Management*, connected by typed relations —
all queryable through /graph.

**Content safety and LLM security**

Two guard agents protect the pipeline. llama-guard flags unsafe or
inappropriate content; prompt-guard flags jailbreak and prompt-injection
attempts. Running these as ingestion agents means unsafe content is
labelled before it can ever be retrieved into an answer, and you can
exclude flagged resources at query time. For any application exposed to
user-generated or untrusted content, enable both.

**Triggering: one-shot, continuous, and conditional**

Every agent can run in three modes, and the mode is what makes agents
operationally useful:

- **One-shot** — apply to all existing resources now (backfilling a new
  labelset, for instance).

- **Continuous** — apply automatically to every new resource as it is
  ingested.

- **Conditional** — apply only to resources matching criteria: resource
  type, field type, or keywords. The platform also supports triggering
  agents based on labels, so one agent's output can gate another's — for
  example, only run the summarizer on resources the labeler tagged High.

An agent can also call a **webhook** on completion, which is the clean
way to notify downstream systems that a resource is enriched and ready —
far better than polling.

**Managing agents through the API**

Agents are tasks on the Knowledge Box. List the catalog and inspect each
agent's configuration schema with GET /kb/{kbid}/tasks; the NUA API
exposes the endpoints to start, stop, and inspect agent runs. The
configuration schema returned for each task tells you exactly which
fields it accepts — including which LLM to use and, for the guards,
which provider keys are required.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p># Read the full agent catalog and each agent's config schema<br />
curl "https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/tasks" \<br />
-H "Authorization: Bearer $KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>
