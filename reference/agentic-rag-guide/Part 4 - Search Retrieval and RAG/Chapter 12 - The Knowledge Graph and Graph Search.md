**PART 4 — SEARCH, RETRIEVAL, AND RAG**

**Chapter 12\
The Knowledge Graph and Graph Search**

*Retrieval that follows relationships, not just similarity*

Vector and keyword search find passages that *resemble* a query. Some
questions instead need passages connected by *relationships* — who
reports to whom, which component depends on which, how two entities are
linked. For those, the platform builds a **knowledge graph** of entities
and relations and lets you query it directly.

**Where the graph comes from**

Two sources populate the graph. The NER model detects entities (people,
organizations, places, dates) during processing automatically. The
llm-graph ingestion agent (Chapter 8) goes further, using an LLM to
extract richer, typed relations between entities across your resources.
On the sandbox, graph extraction over an ingested web page produced
entities such as *Progress*, *Private Knowledge Box*, and *Enterprise
Knowledge Management*, connected by typed relations.

**Three graph endpoints**

| **Endpoint** | **Returns** |
|----|----|
| POST /kb/{kbid}/graph | Paths — source → relation → destination triples |
| POST /kb/{kbid}/graph/nodes | Nodes — the entities themselves, ranked |
| POST /kb/{kbid}/graph/relations | Relations — the edge types in the graph |

| **Gotcha — tested** All three require a query object in the body. Sending only {"top_k": 10} returns 422 Field required for query. The query object selects what part of the graph to traverse — for example {"prop": "node"} for nodes or {"prop": "path"} for paths. |
|----|

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p># Retrieve nodes (entities) from the graph — verified live<br />
curl -X POST "https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/graph/nodes"
\<br />
-H "Authorization: Bearer $KEY" -H "Content-Type: application/json"
\<br />
-d '{"query":{"prop":"node"},"top_k":5}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>{<br />
"nodes": [<br />
{ "value": "Private Knowledge Box", "type": "entity", "group": "ORG",
"score": 1.037 },<br />
{ "value": "Progress", "type": "entity", "group": "ORG", "score": 1.037
}<br />
]<br />
}</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

A path query returns triples. A live /graph call returned paths linking
a resource to a topic via an ABOUT relation — the shape you traverse to
answer relationship questions:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>{<br />
"paths": [<br />
{ "source": { "value": "ca2a8f3b...", "type": "resource" },<br />
"relation": { "type": "ABOUT", "label": "" },<br />
"destination": { "value": "topic/energy", "type": "entity" } }<br />
]<br />
}</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Graph in retrieval: features and rag_strategies**

You do not always query the graph directly. Two integration points bring
graph knowledge into ordinary retrieval and generation:

- **\`features: \["relations"\]\` or \`\["graph"\]\` on
  \`find\`/\`ask\`** — include graph-related entities and paths in
  retrieval results.

- **The \`graph\` RAG strategy on \`ask\`** (Chapter 10) — expand the
  generation context along graph relations, so the model sees not just
  the matched paragraph but the entities and facts connected to it.

| **Key idea** Reach for the graph when the *connections* are the answer. "What depends on service X?" or "Which policies mention both A and B?" are graph questions; "What is the refund window?" is a vector question. Many real applications use both, with the graph strategy enriching an otherwise standard ask. |
|----|

**Defining your own entities**

The platform auto-detects standard entity groups — ORG, GPE (places),
DATE, and others were present on the sandbox by default. For
domain-specific entities (product SKUs, internal system names), define
your own **entity groups** so the graph and NER recognise them. Read the
current groups with GET /kb/{kbid}/entitiesgroups; manage domain entity
groups from the dashboard or the management API, then reprocess so
existing content is re-scanned.
