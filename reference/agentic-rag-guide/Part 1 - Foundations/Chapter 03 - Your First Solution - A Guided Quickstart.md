**PART 1 — FOUNDATIONS**

**Chapter 3\
Your First Solution: A Guided Quickstart**

*From zero to a cited, generated answer in five steps*

This chapter walks the entire pipeline end to end: authenticate, create
a Knowledge Box, ingest a little content, retrieve it, and ask a
question that returns a generated, cited answer. Every command here was
run against the live platform while writing — the responses are the real
ones. By the end you will have a working solution you can adapt to your
own data.

| **Note** The quickstart uses a **NUA key with KB-management enabled** to create the Knowledge Box, then a **Knowledge Box API key** for content and search. Chapter 4 explains why the handoff between the two is necessary; for now, follow the steps. |
|----|

**Before you start**

You need three things: your **zone** slug (this walkthrough uses
aws-ap-southeast-2-1), a **NUA key** whose token encodes
allow_kb_management: true, and either curl, Python 3.9+, or Node 18+.
Set two environment variables so the samples are copy-pasteable:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>export ZONE="aws-ap-southeast-2-1"<br />
export NUA_KEY="eyJhbGciOi...your-nua-key..."</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Step 1 — Create a Knowledge Box**

Knowledge Boxes are created through the **Zone API**, under your
account. Creating one requires only a slug and a title. The NUA key is
presented in the X-NUCLIA-NUAKEY header with the Bearer scheme.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/kbs" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{"slug":"quickstart","title":"Quickstart KB"}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

The response returns the new Knowledge Box id:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>{ "id": "e3bb0d28-3821-44a4-8948-fe511f48aa42" }</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Save that id as KB. In Python and JavaScript the official SDKs handle
account resolution and the base URL for you once you authenticate with
the NUA key:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>PYTHON</strong></p>
<p>from nuclia import sdk<br />
<br />
# Authenticate once; the SDK extracts the zone and account from the
token.<br />
sdk.NucliaAuth().nua(token=NUA_KEY)<br />
<br />
kbs = sdk.NucliaAccount()<br />
kb = kbs.create_kb(account=ACCOUNT, zone=ZONE, slug="quickstart",
title="Quickstart KB")<br />
print(kb.id)</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

| **Gotcha — tested** Two limits surfaced immediately in testing. First, the NUA key is bound to one specific account server-side — passing any other account id returns This NUA key is issued for a different account. Second, the Global API cannot be used to discover that account from a NUA key (it rejects NUA keys outright), so the account id must come from your dashboard or the SDK's stored configuration. |
|----|

**Step 2 — Get a Knowledge Box API key**

The NUA key created the Knowledge Box, but **content and search calls
need a Knowledge Box-scoped credential**. Create a service account on
the Knowledge Box and then mint a key for it — both through the Zone
API:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p># Create a service account with owner rights on the KB<br />
curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/kb/$KB/service_accounts"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" -H "Content-Type:
application/json" \<br />
-d '{"title":"app-backend","role":"SOWNER"}'<br />
# -&gt; { "id": "32af7a29-7692-4806-a973-ec926da2c175" }<br />
<br />
# Mint an API key for that service account (expiry &lt;= 1095
days)<br />
curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/kb/$KB/service_account/$SA_ID/keys"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" -H "Content-Type:
application/json" \<br />
-d '{"expires":"2028-01-01T00:00:00Z"}'<br />
# -&gt; { "token": "eyJhbGciOi...KB-scoped-key..." }</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

| **Gotcha — tested** The key expiry is capped: requesting an expiry beyond three years returns Choosen key expiration exceeds the current maxium of 1095 days (the platform's spelling). Pick a date within 1095 days. |
|----|

Save the returned token as KEY. Content calls present it with the
standard Authorization: Bearer header.

**Step 3 — Ingest content**

Create a few text resources. Each resource gets a slug, a title, and one
or more fields — here a single text field named body.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/resources" \<br />
-H "Authorization: Bearer $KEY" -H "Content-Type: application/json"
\<br />
-d '{<br />
"slug": "battery-storage",<br />
"title": "Home Battery Storage",<br />
"texts": { "body": { "body": "Home battery systems store excess solar
energy for use at night. A typical LFP battery offers 10kWh usable
capacity. The federal Cheaper Home Batteries program subsidises
installation from July 2025.", "format": "PLAIN" } }<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

The platform accepts the resource immediately and returns its uuid:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>{ "uuid": "86b5f7948b144b008f018cbd47a2bde4", "seqid": null
}</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

The same operation in the two SDKs:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>PYTHON</strong></p>
<p>from nuclia import sdk<br />
kb =
sdk.NucliaKB(url=f"https://{ZONE}.dp.progress.cloud/api/v1/kb/{KB}",
api_key=KEY)<br />
kb.resource.create(<br />
slug="battery-storage", title="Home Battery Storage",<br />
texts={"body": {"body": "Home battery systems store excess solar
energy...", "format": "PLAIN"}},<br />
)</p></th>
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
const nuclia = new Nuclia({ backend:
`https://${ZONE}.dp.progress.cloud/api`, zone: ZONE,<br />
knowledgeBox: KB, apiKey: KEY });<br />
nuclia.db.getKnowledgeBox().subscribe(kb =&gt;<br />
kb.createResource({ slug: "battery-storage", title: "Home Battery
Storage",<br />
texts: { body: { body: "Home battery systems store excess solar
energy...", format: "PLAIN" } } })<br />
.subscribe(res =&gt; console.log(res.uuid)));</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

| **Warning** Ingestion is asynchronous. The resource exists the moment you create it, but it is not searchable until background processing finishes. For small text this is seconds; for large files it can be longer. Do not run Step 4 in the same breath and expect results — poll the resource's status first (Chapter 7). |
|----|

**Step 4 — Retrieve with /find**

Once processing completes, find performs hybrid (keyword + semantic)
retrieval. Note the query is a natural-language phrase, not keywords —
semantic matching does the rest.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST "https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/find"
\<br />
-H "Authorization: Bearer $KEY" -H "Content-Type: application/json"
\<br />
-d '{"query":"how long is the payback period for
solar","features":["keyword","semantic"],"top_k":5}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

The response ranks matching resources and returns the specific
paragraphs that matched, keyed by a resource/field/char-range identifier
in best_matches:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>{<br />
"resources": { "86b5f794...": { "slug": "battery-storage", "title":
"Home Battery Storage", ... } },<br />
"best_matches": [<br />
"ca2a8f3b.../t/body/0-301",<br />
"86b5f794.../t/body/0-336"<br />
],<br />
"total": 4<br />
}</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Step 5 — Ask a question**

ask runs the same retrieval, then sends the best passages to the
generative model with your question. Request citations so the answer can
be traced back to its sources. The X-Synchronous: true header waits for
the full answer instead of streaming it.

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

The real answer the platform generated from the ingested corpus:

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

Notice three things. The answer is correct and drawn entirely from the
ingested text. The citations object maps a source paragraph to the
character span of the answer it supports — auditable grounding. And
retrieval_results echoes exactly which passages were used, so nothing
about how the answer was produced is hidden.

| **Key idea** That is the whole platform in five calls: create a Knowledge Box, get a key, ingest, find, ask. Everything else in this book makes each of these steps richer — better ingestion, sharper retrieval, more controllable answers — but the shape never changes. |
|----|

**What to read next**

- Confused about which key does what? **Chapter 4 — Authentication.**

- Want to configure models and security on the Knowledge Box? **Chapter
  5 — Management.**

- Ready to ingest real documents and files? **Part 3 — Data Ingestion.**

- Want to master find and ask? **Part 4 — Search, Retrieval, and RAG.**
