**PART 4 — SEARCH, RETRIEVAL, AND RAG**

**Chapter 13\
Configuring RAG for Your Use Case**

*A cookbook — turning the /find and /ask parameters into concrete
recipes*

Chapters 9 and 10 introduced every parameter find and ask accept. This
chapter answers the question that actually matters when you build
something: *for my use case, how do I set them?* It gives a framework
for reasoning about the parameters, a decision table, and a set of
copy-and-adapt recipes — each one a complete request, tested against the
live sandbox, with the reasoning for every setting.

| **Key idea** There is no single 'best' RAG configuration. A support bot that must never guess and a research tool that must never miss want almost opposite settings. Configuration is where you encode what *your* application values — precision, recall, completeness, cost, or latency. |
|----|

**A framework: three questions**

Every RAG request answers three questions in order. Group the parameters
by which question they answer and configuration stops being a wall of
forty fields.

| **Question** | **You are controlling…** | **Key parameters** |
|----|----|----|
| 1\. What is *eligible* to be retrieved? | The candidate set before ranking | features, filter_expression, security, fields, vectorset, show_hidden, range filters |
| 2\. How much *context* reaches the model? | What gets assembled and sent | top_k, min_score, rank_fusion, reranker, rag_strategies |
| 3\. How should it *answer*? | The generation itself (ask only) | prompt, generative_model, max_tokens, citations, answer_json_schema, reasoning, prefer_markdown, generate_answer |

Work top to bottom. If answers are wrong, the fault is almost always in
question 1 or 2 — the model can only be as good as the context it is
handed. Tune eligibility and context before you touch the prompt.

**The decision table**

A fast lookup from what you care about to the parameters that move the
needle.

| **If you need…** | **Set** |
|----|----|
| Maximum accuracy, no guessing | Low top_k (5–8) · hybrid features · reranker: predict · a strict prompt · citations: true |
| Maximum recall (miss nothing) | High top_k (30–50) · add relations to features · no min_score · consider full_resource |
| Complete, non-fragmented answers | rag_strategies: neighbouring_paragraphs or hierarchy |
| Whole-document reasoning | rag_strategies: full_resource (low top_k) |
| Structured output for a pipeline | answer_json_schema (read answer_json, ignore answer) |
| A multi-turn chatbot | chat_history · rephrase: true · citations: true |
| Exact-match lookup (codes, SKUs) | features: \[keyword\] · target fields · synonyms off |
| Lowest latency / cost | Small top_k · cap max_tokens · cheaper generative_model · stream |
| Bring-your-own LLM | generate_answer: false — take the retrieved context and generate elsewhere |
| Tenant isolation in a shared KB | security.groups + filter_expression on a tenant label |

**Recipe 1 — Precise factual Q&A (support, compliance, policy)**

The goal is a trustworthy answer or an honest 'I don't know' — never a
plausible guess. Keep the candidate set small and high-quality, rerank
it, constrain the model with a strict prompt, and demand citations so
every answer is auditable.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>POST /kb/{kbid}/ask<br />
{<br />
"query": "How much does a home battery store and when is it
subsidised?",<br />
"features": ["keyword", "semantic"],<br />
"top_k": 6,<br />
"reranker": "predict",<br />
"citations": true,<br />
"max_tokens": 300,<br />
"prompt": "Answer ONLY from the context. If the context does not contain
the answer, say you don't know. Be concise. Context: {context} Question:
{question}"<br />
}</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Tested against the sandbox, this returned: *"A home battery stores 10kWh
of usable capacity and is subsidised starting from July 2025 under the
federal Cheaper Home Batteries program,"* with a citation pointing at
the exact source paragraph. **Why each setting:** low top_k keeps noise
out of the context; reranker: predict puts the single best passage
first; the prompt is the guardrail against invention; citations makes
the answer defensible.

| **Gotcha — tested** Even without a strict prompt, the platform will not invent an answer when retrieval finds nothing — it returns status: "no_context". The strict prompt makes that behaviour tighter and extends it to *partially* relevant context. Always handle no_context in your UI. |
|----|

**Recipe 2 — High-recall research (discovery, literature review,
e-discovery)**

Here the cost of missing a relevant passage is high and a human reads
the results, so favour recall over precision. Cast a wide net, add graph
relations, and drop min_score so nothing is filtered out prematurely.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>POST /kb/{kbid}/find<br />
{<br />
"query": "risks associated with battery storage",<br />
"features": ["keyword", "semantic", "relations"],<br />
"top_k": 40,<br />
"rank_fusion": "rrf",<br />
"highlight": true,<br />
"show": ["basic", "values"]<br />
}</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Use find (not ask) for research surfaces — you want the ranked evidence,
not a single synthesised answer. highlight marks the matched terms for a
reviewer; relations pulls in graph-connected entities the pure vector
search would rank lower.

**Recipe 3 — Whole-document answers (contracts, standards, long
policies)**

When the answer depends on a whole document rather than one paragraph —
'summarise this policy', 'what are the termination clauses' — send the
full resource, not snippets.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>POST /kb/{kbid}/ask<br />
{<br />
"query": "Summarise the EV charging options and their power
ratings.",<br />
"top_k": 2,<br />
"rag_strategies": [ { "name": "full_resource", "count": 1 } ]<br />
}</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Tested, this produced a complete summary covering both the 7kW
single-phase and 22kW three-phase options — detail a paragraph-only
retrieval would have split across fragments. Keep top_k low with
full_resource; whole documents are large, and two of them can fill the
model's context window on their own.

**Recipe 4 — Complete, non-fragmented snippets (the cheapest quality
win)**

The most common RAG failure is a correct-but-incomplete answer: the
matched paragraph was right, but the detail lived in the sentence before
or after it. neighbouring_paragraphs fixes this for a fraction of the
cost of full_resource.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>POST /kb/{kbid}/ask<br />
{<br />
"query": "what capacity is a home battery",<br />
"rag_strategies": [ { "name": "neighbouring_paragraphs", "before": 1,
"after": 1 } ]<br />
}</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Reach for this first whenever answers feel truncated. In testing it
returned a clean *"A typical home battery has a usable capacity of
10kWh"* by giving the model the matched paragraph plus its immediate
neighbours for context.

**Recipe 5 — Structured extraction (feed a pipeline, not a person)**

When the consumer is code, not a human, don't parse prose — demand JSON.
Supply an answer_json_schema and the model returns a validated object.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>POST /kb/{kbid}/ask<br />
{<br />
"query": "list the battery capacity in kWh",<br />
"answer_json_schema": {<br />
"name": "battery",<br />
"description": "battery facts",<br />
"parameters": {<br />
"type": "object",<br />
"properties": { "capacity_kwh": { "type": "number" } },<br />
"required": ["capacity_kwh"]<br />
}<br />
}<br />
}</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Tested, this returned {"answer_json": {"capacity_kwh": 10}} with an
empty prose answer. Parse answer_json; ignore answer. This is how you
turn /ask into a reliable field-extraction engine over documents —
parties and dates from contracts, specs from datasheets, entities from
reports.

**Recipe 6 — Conversational assistant (multi-turn chatbot)**

A chatbot must understand follow-ups like 'and for batteries?' that only
make sense given the previous turn. Pass chat_history so the platform
rephrases the query with conversational awareness before retrieving.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>POST /kb/{kbid}/ask<br />
{<br />
"query": "and for batteries?",<br />
"rephrase": true,<br />
"citations": true,<br />
"chat_history": [<br />
{ "author": "USER", "text": "What is the payback period for solar?"
},<br />
{ "author": "NUCLIA", "text": "About 4 to 7 years." }<br />
]<br />
}</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

| **Gotcha — tested** History changes retrieval. In testing, the follow-up 'and for batteries?' with this history rephrased to a battery query — but if the rephrased query drifts from your corpus you can get no_context where a direct question would have answered. Tune chat_history_relevance_threshold if history is pulling retrieval off-topic. |
|----|

**Recipe 7 — Exact-match lookup (SKUs, error codes, case numbers)**

Semantic search is the wrong tool for an exact token like ERR-4021 or a
part number — you want lexical precision, not 'similar meaning'. Turn
semantics off and target the field.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>POST /kb/{kbid}/find<br />
{<br />
"query": "LFP",<br />
"features": ["keyword"],<br />
"fields": ["a/title", "t/body"],<br />
"top_k": 10<br />
}</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

features: \[keyword\] uses only the BM25 index; fields restricts the
search to named fields so a code in the body doesn't get lost among
unrelated semantic neighbours. This is also the cheapest query type — no
embedding of the query is required.

**Recipe 8 — Multilingual knowledge base**

With a multilingual semantic model (the sandbox defaulted to
multilingual-2024-05-06), vector search matches *meaning across
languages*: a French question can retrieve an English passage. Lead with
semantic features and let rephrasing normalise the query.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>POST /kb/{kbid}/ask<br />
{<br />
"query": "Quel est le délai de rentabilité du solaire ?",<br />
"features": ["semantic", "keyword"],<br />
"rephrase": true<br />
}</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Keep keyword in the mix for names and codes (which are
language-agnostic), but semantic does the cross-lingual work. If your
users and content span languages, confirm the KB's semantic model is a
multilingual one (Chapter 5).

**Recipe 9 — Lowest latency and cost**

For high-volume or interactive surfaces, every token and millisecond
counts. Shrink the context, cap the output, pick a cheaper model, and
stream so the user sees words immediately.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>POST /kb/{kbid}/ask (send WITHOUT X-Synchronous to stream)<br />
{<br />
"query": "what is the battery subsidy?",<br />
"top_k": 3,<br />
"max_tokens": 150,<br />
"generative_model": "&lt;a-cheaper-model&gt;",<br />
"prefer_markdown": true<br />
}</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Streaming's metadata item reports input/output tokens and
time-to-first-chunk per answer (Chapter 10) — log it and watch the
trend. prefer_markdown was verified to return formatted output
(headings, bold, lists) when you are rendering into a rich UI.

| **Tip** Route by difficulty: set a cheap generative_model as the KB default and override generative_model per request only for the hard questions. Most traffic is easy; pay for the strong model only when it earns its keep. |
|----|

**Recipe 10 — Retrieval-only: bring your own LLM**

Sometimes you want the platform's world-class retrieval but your own
model for generation — a fine-tuned model, an on-prem LLM, or one under
your own contract. Set generate_answer: false and ask returns the
assembled context without generating.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>POST /kb/{kbid}/ask<br />
{<br />
"query": "battery subsidy",<br />
"generate_answer": false<br />
}</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Tested, this returned status: "success" with an empty answer and the
full retrieval_results. Take those passages, build your own prompt, and
call whatever model you like. You get the platform's hybrid retrieval,
reranking, and RAG strategies as a service, decoupled from generation.

**Recipe 11 — Secure, multi-tenant retrieval**

In a shared Knowledge Box, every query must see only its tenant's data.
Combine a filter_expression on a tenant label with the caller's
security.groups, and enable enforce_security on the KB so it can never
be forgotten (Chapters 4 and 18).

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>POST /kb/{kbid}/find<br />
{<br />
"query": "outstanding invoices",<br />
"security": { "groups": ["tenant:acme"] },<br />
"filter_expression": { "field": { "prop": "label", "labelset": "tenant",
"label": "acme" } },<br />
"top_k": 10<br />
}</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

| **Warning** Test tenant isolation adversarially before shipping — a missing security block or a wrong label here is a cross-tenant data leak, not a cosmetic bug. Prefer a Knowledge Box per tenant when isolation matters more than overhead (Chapter 18). |
|----|

**Putting it together**

Real applications rarely use one recipe; they compose. A production
support assistant might use Recipe 1's strict prompt and citations,
Recipe 4's neighbouring paragraphs for completeness, Recipe 6's chat
history for follow-ups, and Recipe 11's security scoping — all in one
request. Start from the recipe closest to your goal, then borrow
settings from the others.

| **Key idea** Store the configuration you settle on as a named **search configuration** (Chapter 10) and call it by name with search_configuration. Your application code stays a one-liner, and you can retune retrieval and prompts — swap a recipe — without shipping a new build. |
|----|
