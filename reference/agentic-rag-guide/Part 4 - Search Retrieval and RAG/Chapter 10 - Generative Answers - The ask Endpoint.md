**PART 4 — SEARCH, RETRIEVAL, AND RAG**

**Chapter 10\
Generative Answers: The /ask Endpoint**

*From retrieved passages to a trusted, cited, controllable answer*

/ask is the platform's centerpiece. It performs retrieval (everything in
Chapter 9), assembles the best passages into a context, sends that
context plus your question to a generative model, and returns the answer
— optionally with citations, structured output, and a full account of
what it retrieved. It accepts every find parameter *plus* a large family
of generation controls. This chapter walks the ones that matter.

**The simplest ask, and its anatomy**

At minimum, ask needs a query. Requesting citations and sending
X-Synchronous: true (wait for the whole answer rather than streaming)
gives the cleanest first result:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST "https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/ask"
\<br />
-H "Authorization: Bearer $KEY" -H "Content-Type: application/json"
\<br />
-H "X-Synchronous: true" \<br />
-d '{"query":"How much does a home battery store and when is it
subsidised?","citations":true}'</p></th>
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
"answer": "A home battery stores 10kWh of usable capacity and is
subsidised starting from July 2025 under the federal Cheaper Home
Batteries program.",<br />
"status": "success",<br />
"citations": { "86b5f794.../t/body/0-336": [[0, 218]] },<br />
"retrieval_results": { "resources": { "86b5f794...": { ... } } }<br />
}</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Three parts of the response deserve attention every time. answer is the
generated text. citations maps each supporting source paragraph to the
character spans of the answer it grounds — this is how you show users
*why* an answer is trustworthy. retrieval_results is the exact find
output that fed the model, so you can inspect or display the sources.

| **Gotcha — tested** When retrieval finds nothing relevant, the platform does not invent an answer — it returns status: "no_context" and the text *"Not enough data to answer this."* This is the anti-hallucination guardrail doing its job. Treat no_context as a first-class outcome in your code, not an error. |
|----|

**The generation parameters, grouped**

Beyond the retrieval parameters it inherits, ask adds these generation
controls. They are grouped here by what they do.

**Controlling the answer text**

| **Parameter** | **Type / default** | **Effect** |
|----|----|----|
| prompt | string or object | Your own prompt template, with {context} and {question} placeholders |
| generative_model | string | Override the KB's LLM for this request |
| max_tokens | int or object | Cap the answer length (and optionally context tokens) |
| prefer_markdown | bool — false | Ask the model to format the answer as Markdown |
| generative_model_seed | int | Seed for more reproducible generations |
| generate_answer | bool — true | If false, retrieve and assemble context but skip generation |
| reasoning | bool or object — false | Enable model reasoning for harder questions |

A custom prompt is the highest-leverage control. A verified request that
constrains tone and length:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JAVASCRIPT</strong></p>
<p>{<br />
"query": "payback period?",<br />
"prompt": "Answer in one short sentence for a homeowner. Context:
{context} Question: {question}"<br />
}<br />
// -&gt; "The payback period for a residential solar system in Australia
is typically 4 to 7 years, depending on feed-in tariffs."</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Controlling grounding and citations**

| **Parameter** | **Effect** |
|----|----|
| citations | Return source-paragraph → answer-span mapping |
| citation_threshold | Minimum confidence for a citation to be included |
| answer_json_schema | Force the answer into a JSON structure you define |
| extra_context | Inject extra passages not in the KB into the context |
| extra_context_images | Inject images into the context (requires a visual LLM) |

**Conversational context**

| **Parameter** | **Effect** |
|----|----|
| chat_history | Prior turns, so the query is rephrased with conversation awareness |
| chat_history_relevance_threshold | How strongly history influences rephrasing |
| rephrase / rephrase_prompt | Rewrite the user's query before retrieval |

**Structured answers with answer_json_schema**

For programmatic use, you often want data, not prose. Supply an
answer_json_schema and the model returns a validated object instead of
free text. A live example extracting a single number:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST "https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/ask"
\<br />
-H "Authorization: Bearer $KEY" -H "X-Synchronous: true" -H
"Content-Type: application/json" \<br />
-d '{<br />
"query": "list the battery capacity in kWh",<br />
"answer_json_schema": {<br />
"name": "battery", "description": "battery facts",<br />
"parameters": { "type": "object", "properties": { "capacity_kwh": {
"type": "number" } },<br />
"required": ["capacity_kwh"] }<br />
}<br />
}'</p></th>
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
<p>{ "answer": "", "answer_json": { "capacity_kwh": 10 }, "status":
"success", ... }</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

| **Key idea** With answer_json_schema, the prose answer comes back empty and the structured result lands in answer_json. This is the clean way to use /ask as a data-extraction engine — parse answer_json, ignore answer. |
|----|

**RAG strategies: shaping the context**

By default, ask sends the top matching *paragraphs* to the model. **RAG
strategies** change what context is assembled — often the difference
between a fragmentary answer and a complete one. Supply one or more in
rag_strategies. The platform offers:

| **Strategy** | **What it sends to the model** |
|----|----|
| full_resource | The entire text of the top resources, not just matched paragraphs |
| field_extension | Specific additional fields of the matched resources |
| hierarchy | The matched paragraph plus its surrounding document hierarchy |
| neighbouring_paragraphs | The matched paragraph plus the ones immediately around it |
| metadata_extension | Resource metadata added to the context |
| conversational | Surrounding messages for conversation fields |
| prequeries | Run predefined queries first and add their results to context |
| graph | Expand context along knowledge-graph relations |

A verified full_resource request — useful when answers need the whole
document, not a snippet:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>{ "query": "summarise EV charging options",<br />
"rag_strategies": [ { "name": "full_resource", "count": 1 } ] }</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

| **Tip** neighbouring_paragraphs is the cheapest quality win. RAG answers often fail because the matched paragraph is correct but incomplete — the sentence before or after held the missing detail. Adding a neighbour or two fixes this without the cost of full_resource. |
|----|

**Streaming the answer**

Omit X-Synchronous and ask streams its response as newline-delimited
JSON items — ideal for a chat UI that shows the answer as it is written.
Capturing a live stream revealed the full item sequence:

| **\`item.type\`** | **Payload** |
|----|----|
| answer | One token/chunk of the answer text (many of these) |
| retrieval | The retrieval results that grounded the answer |
| citations | The source → span citation map |
| augmented_context | Any extra context that was assembled |
| status | Final status, e.g. {code:0, status:success} |
| metadata | Token counts and timings — input/output tokens, first-chunk latency |

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>PYTHON</strong></p>
<p>import requests, json<br />
r =
requests.post(f"https://{ZONE}.dp.progress.cloud/api/v1/kb/{KB}/ask",<br />
headers={"Authorization": f"Bearer {KEY}"},<br />
json={"query": "What is the battery subsidy?", "citations": True},
stream=True)<br />
for line in r.iter_lines():<br />
if not line: continue<br />
item = json.loads(line)["item"]<br />
if item["type"] == "answer":<br />
print(item["text"], end="", flush=True) # render tokens as they
arrive<br />
elif item["type"] == "citations":<br />
citations = item["citations"] # show sources when they arrive</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

The metadata item is quietly valuable in production: it reports input
and output token counts (both raw and in Nuclia's billing units) and
timings such as time-to-first-chunk. Log it to track cost and latency
per answer.

**Asking against a single resource**

POST /kb/{kbid}/resource/{rid}/ask (and its by-slug twin) restricts
generation to one resource — perfect for a "chat with this document"
feature. It takes the same generation parameters, but retrieval is
confined to that resource's fields.

**Reusing configurations**

Rather than repeating a long parameter set on every call, define a
**search configuration** in the dashboard and reference it by name with
search_configuration. The stored configuration supplies the defaults;
anything you pass in the request overrides it. This keeps application
code small and lets non-developers tune retrieval and prompts without a
deploy.

| **Key idea** You now know every find and ask parameter. The next chapter — **Chapter 13, Configuring RAG for Your Use Case** — is the payoff: a cookbook of tested recipes that map real use cases (precise Q&A, high-recall research, structured extraction, chatbots, multi-tenant, low-cost) to concrete parameter settings you can copy and adapt. |
|----|
