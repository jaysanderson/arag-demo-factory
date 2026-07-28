**PART 6 — BUILDING AND OPERATING**

**Chapter 15\
The SDKs: Python, JavaScript/TypeScript, and .NET**

*Working with the platform in your language of choice*

Every capability in this book is reachable over plain HTTP, and the cURL
samples map directly onto that. But for real applications the official
SDKs remove boilerplate — authentication, base-URL resolution, retries,
streaming, and typed models. The SDKs are wrappers over the same API, so
anything you have learned about endpoints and parameters carries
straight across. As the platform notes, the API always has the newest
features first; the SDKs follow closely.

**Python SDK (nuclia)**

The Python SDK is the most complete, and it ships with a CLI. It is the
right choice for ingestion pipelines, data scripts, backends, and — as
this book demonstrated — testing.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>pip install nuclia</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Authenticate once; the SDK reads the zone and account out of the token.
It supports NUA keys, Knowledge Box keys, user login, and personal
access tokens.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>PYTHON</strong></p>
<p>from nuclia import sdk<br />
<br />
# NUA key (management + processing). The SDK extracts zone/account from
the token.<br />
sdk.NucliaAuth().nua(token=NUA_KEY)<br />
<br />
# Or work against one Knowledge Box with a KB API key<br />
kb =
sdk.NucliaKB(url=f"https://{ZONE}.dp.progress.cloud/api/v1/kb/{KB}",
api_key=KB_KEY)<br />
kb.resource.create(slug="doc-1", title="Doc 1",<br />
texts={"body": {"body": "Hello world", "format": "PLAIN"}})<br />
<br />
search = sdk.NucliaSearch(url=..., api_key=KB_KEY)<br />
answer = search.ask(query="What does the document say?")<br />
print(answer.answer)</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

The Python SDK is organized into modules that mirror the API surface — a
clean map of what is available:

| **Module** | **Covers** |
|----|----|
| auth | NUA, user, and personal-access-token authentication |
| kb / manage | Knowledge Box configuration and labels |
| upload | Resources and file upload (including resumable) |
| search | find, search, ask, catalog, summarize |
| nua | Predict services — embeddings, NER, LLM, query analysis |
| agents (ai/da) | Retrieval Agents and data-augmentation agents |
| kb-backup / import-export | Backups and data portability |
| activity-log | Reading activity logs |
| rao | Retrieval-Augmented Orchestrator (Retrieval Agent) sessions |

| **Tip** The CLI shares the Python SDK's engine, so nuclia kb ..., nuclia auth ..., and friends are perfect for one-off administration and for scripting in CI without writing Python. nuclia auth nua REGION NUA_KEY stores the key for reuse. |
|----|

**JavaScript / TypeScript SDK (@nuclia/core)**

The JS/TS SDK targets the frontend and Node backends and is
observable-first (RxJS). It is the engine behind the search widget, and
the way to build a custom search or agent UI. It is large — the
RetrievalAgent class alone exposes well over a hundred members — but the
entry point is small.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>npm install @nuclia/core</p></th>
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
<th><p><strong>JAVASCRIPT</strong></p>
<p>import { Nuclia } from "@nuclia/core";<br />
<br />
const nuclia = new Nuclia({<br />
backend: `https://${ZONE}.dp.progress.cloud/api`,<br />
zone: ZONE,<br />
knowledgeBox: KB,<br />
apiKey: KB_KEY,<br />
});<br />
<br />
// Ask, streaming results as they arrive<br />
nuclia.knowledgeBox<br />
.ask("How much does a home battery store?")<br />
.subscribe((answer) =&gt; console.log(answer.text));</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Key classes you will meet: Nuclia (the client), Db (account/KB access),
KnowledgeBox and WritableKnowledgeBox (read vs. read-write operations),
Resource/ReadableResource (a single resource and its fields), and
RetrievalAgent with Session/ReadableSession for agent conversations over
WebSocket. The read/write split is deliberate — hand a KnowledgeBox
(read-only) to frontend code and reserve WritableKnowledgeBox for
trusted backends.

**.NET SDK**

The .NET SDK exposes the platform through typed service interfaces, a
natural fit for C# backends. The services mirror the API's shape:

| **Interface** | **Responsibility** | **Representative methods** |
|----|----|----|
| IKnowledgeBoxService | KB-level operations | configuration, labels |
| IResourceService | Resource CRUD | create, get, modify, delete |
| IResourceFieldsService | Fields on a resource | add/get/download fields |
| ISearchService | Retrieval and generation | AskAsync, AskStreamAsync, FindAsync, CatalogAsync, SuggestAsync, SummarizeAsync, GraphSearchAsync |

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>CSHARP</strong></p>
<p>// C# — ask a question and read the answer<br />
var answer = await searchService.AskAsync(new AskRequest {<br />
Query = "How much does a home battery store?",<br />
Citations = true<br />
});<br />
Console.WriteLine(answer.Answer);<br />
<br />
// Stream tokens as they arrive<br />
await foreach (var item in searchService.AskStreamAsync(new AskRequest {
Query = "..." }))<br />
Console.Write(item.Text);</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Which SDK, when**

| **Situation** | **Reach for** |
|----|----|
| Ingestion pipelines, data/admin scripts, CI | Python SDK or CLI |
| Frontend search or chat UI | JavaScript/TypeScript SDK (or the widget) |
| Node backend | JavaScript/TypeScript SDK |
| C#/.NET backend | .NET SDK |
| A language with no SDK | The REST API directly — every cURL sample in this book |

| **Key idea** The SDKs are conveniences, not gatekeepers. When an SDK lags a new API feature, drop to the REST call for that one operation and keep using the SDK for the rest. Because they share the same endpoints, mixing them is safe. |
|----|
