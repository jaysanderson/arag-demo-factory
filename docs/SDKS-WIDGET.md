# SDKs + No-Code Widget (builder distillation)

What to reach for when you don't want raw HTTP. The official SDKs are thin wrappers over the same
data plane the portal proxies (`{zone}.dp.progress.cloud/api/v1`) — every endpoint and parameter from
`ARAG-REFERENCE.md` carries straight across. The REST API always gets new features first; SDKs follow.
For this account `{zone}` = `aws-ap-southeast-2-1`.

> Rule of thumb: **backend ingestion/admin → Python (or its CLI); frontend search/chat → JS or the
> widget; C# backend → .NET; anything else → raw REST.** The SDKs are conveniences, not gatekeepers —
> when one lags a new feature, drop to the REST call for that one op and keep using the SDK elsewhere.

## Auth mapping (SDK ↔ the three credentials)

Same three credentials as raw HTTP (`ARAG-REFERENCE.md` §Credentials) — the SDK picks the header:

| Credential | Python | JS/TS | Does |
|---|---|---|---|
| **NUA key** | `sdk.NucliaAuth().nua(token=NUA_KEY)` | (management/agent clients) | KB mgmt, DA-agent tasks, Predict. No data-plane R/W. |
| **KB service-account key** | `api_key=KB_KEY` on `NucliaKB`/`NucliaSearch` | `apiKey` in `new Nuclia({…})` | `/find`, `/ask`, resources. |
| **Account PAT** | `sdk.NucliaAuth()` login / PAT | — | Account admin (global). |

The SDK reads **zone + account out of the token** — you rarely hand it a host. Send one credential per client.

## Python SDK (`nuclia`) — ingestion, scripts, CI

Most complete SDK; ships a CLI on the same engine. `pip install nuclia`.

```python
from nuclia import sdk

sdk.NucliaAuth().nua(token=NUA_KEY)          # management + processing

kb = sdk.NucliaKB(                            # one KB via service-account key
    url=f"https://{ZONE}.dp.progress.cloud/api/v1/kb/{KB}", api_key=KB_KEY)
kb.resource.create(slug="doc-1", title="Doc 1",
    texts={"body": {"body": "Hello world", "format": "PLAIN"}})

search = sdk.NucliaSearch(url=..., api_key=KB_KEY)
print(search.ask(query="What does the document say?").answer)   # grounded answer
```

Modules mirror the API surface: `auth`, `kb`/`manage`, `upload` (incl. resumable file upload),
`search` (`find`/`search`/`ask`/`catalog`/`summarize`), `nua` (Predict — embeddings, NER, LLM,
query analysis), `agents` (Retrieval + DA agents), `kb-backup`/`import-export`, `activity-log`, `rao`.

**CLI** (same engine — use it for one-off admin + CI without writing Python):
`nuclia auth nua REGION NUA_KEY` stores the key; then `nuclia kb …`, `nuclia auth …`, etc.

## JavaScript / TypeScript SDK (`@nuclia/core`) — frontend + Node

Observable-first (RxJS); it's the engine **under the widget**, and the path to a custom search/chat UI.
`npm install @nuclia/core`.

```javascript
import { Nuclia } from "@nuclia/core";

const nuclia = new Nuclia({
  backend: `https://${ZONE}.dp.progress.cloud/api`,
  zone: ZONE, knowledgeBox: KB, apiKey: KB_KEY,
});

nuclia.knowledgeBox
  .ask("How much does a home battery store?")
  .subscribe((answer) => console.log(answer.text));   // streams as it arrives
```

Key classes: `Nuclia` (client), `Db` (account/KB access), `KnowledgeBox` vs `WritableKnowledgeBox`
(read vs read-write), `Resource`/`ReadableResource`, `RetrievalAgent` + `Session`/`ReadableSession`
(agent convos over WebSocket). **The read/write split is deliberate** — hand read-only `KnowledgeBox`
to browser code, reserve `WritableKnowledgeBox` for a trusted backend that holds a write key.

## .NET SDK — C# backends

Typed service interfaces mirroring the API: `IKnowledgeBoxService` (config, labels),
`IResourceService` (CRUD), `IResourceFieldsService` (fields), `ISearchService`
(`AskAsync`, `AskStreamAsync`, `FindAsync`, `CatalogAsync`, `SuggestAsync`, `SummarizeAsync`,
`GraphSearchAsync`).

```csharp
var answer = await searchService.AskAsync(new AskRequest {
    Query = "How much does a home battery store?", Citations = true });
Console.WriteLine(answer.Answer);

await foreach (var item in searchService.AskStreamAsync(new AskRequest { Query = "..." }))
    Console.Write(item.Text);        // token stream
```

---

## No-code: the embeddable widget

A set of Web Components from the CDN — a search bar + a results area, plus KB id and zone, give a
working search-and-answer experience in a two-line snippet. Build/preview it in the dashboard's
**Widgets** section, then **Embed widget** to generate it.

```html
<script src="https://cdn.rag.progress.cloud/nuclia-widget.umd.js"></script>

<nuclia-search-bar
  knowledgebox="YOUR-KB"
  zone="aws-ap-southeast-2-1"
  features="answers,filter">
</nuclia-search-bar>
<nuclia-search-results></nuclia-search-results>
```

`features` toggles behavior: `answers` (generative answers), `filter` (faceted filtering), etc.

**Three types:** *Embedded in page* (input on the page, results below; "Ask more" opens full chat) ·
*Popup* (a button opening an overlay) · *Chat* (conversational, suited to a Retrieval Agent).

**Private KBs — do not paste a long-lived key into a public page.** Supported patterns: restrict the
key's **allowed origins** to your domains, and/or serve short-lived credentials from your backend.
For truly sensitive corpora keep the KB private and **proxy search through your backend** (holding an
SREADER key) with the widget talking to your proxy — exactly the ARAG portal's model. Allowed-origins
is a control, not a secret store.

Attributes + a JS API cover styling, prompts, result rendering, and event hooks (brand + analytics).
The widget is built on `@nuclia/core`, so outgrowing it into a custom UI is incremental, not a rewrite.

## The dashboard (`rag.progress.cloud`)

Whole lifecycle without code: pick a zone, upload data (PDF/Word/Excel/PowerPoint/text, or web links),
watch processing, try queries + generative answers on the search page. **Best trick for builders: the
"Get code" button** — configure a search visually, then copy the exact REST call, Python, or widget
snippet it produces. Treat the dashboard as an interactive query builder, not just an admin console —
it's the fastest way to hand the factory a known-good `/find` or `/ask` payload.

---
*Source: the practitioner's guide, Chapter 15 (The SDKs — Python, JavaScript/TypeScript, and .NET) and
Chapter 16 (No-Code — The Search Widget and Dashboard), cross-checked against `ARAG-REFERENCE.md`.*
