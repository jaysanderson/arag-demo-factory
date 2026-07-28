**PART 3 — DATA INGESTION**

**Chapter 6\
Resources and Fields: The Data Model**

*How content is shaped, addressed, and enriched before it is ever
searched*

Retrieval quality is decided at ingestion time. How you shape a resource
— how you split content into fields, what metadata you attach, how you
identify it — determines what you can filter by, how results are
grouped, and how precisely answers can cite their sources. This chapter
is the data model in practice.

**The resource, revisited**

A **resource** is one item of content plus its metadata. It has a
system-assigned uuid, an optional slug you choose, and a set of
**fields** that hold the actual content. A resource can be as simple as
one uploaded PDF, or a composite of several fields — the platform's
recipe example bundles an image, an explanatory text, a preparation
video, and a comments conversation into a single resource, so a search
for the dish returns one coherent result rather than four fragments.

| **Key idea** Model one resource per *thing a user would want to retrieve as a unit*. If two pieces of content should always surface together, make them fields of one resource; if they should rank independently, make them separate resources. |
|----|

**Creating resources**

Create a resource with POST /kb/{kbid}/resources. The body carries the
resource's metadata and dictionaries of fields keyed by field id. Field
ids must match ^\[a-zA-Z0-9:\_-\]+\$.

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
"slug": "solar-basics",<br />
"title": "Solar Panel Basics",<br />
"texts": { "body": { "body": "A photovoltaic solar panel converts
sunlight into DC electricity...", "format": "PLAIN" } },<br />
"usermetadata": { "classifications": [ { "labelset": "topic", "label":
"energy" } ] }<br />
}'<br />
# -&gt; 201 { "uuid": "ca2a8f3bf186491facde30cdb2fbc2b6", "seqid": null
}</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

| **Note** Content calls accept either Authorization: Bearer \<key\> or X-NUCLIA-SERVICEACCOUNT: Bearer \<key\>; both were verified to work with a KB API key. This book uses Authorization for brevity. The older X-NUCLIA-SERVICEACCOUNT form appears in some dashboard-generated snippets — they are equivalent. |
|----|

**The field types**

Each field type is a key in the create/modify body and behaves
differently at processing time.

**Text fields (\`texts\`)**

Text you supply directly. The format selects how it is interpreted:
PLAIN, HTML, MARKDOWN (converted to plain text — use KEEP_MARKDOWN to
preserve the markup), RST, JSON, or JSONL. Structured JSON is
understood: index a JSON array of records and you can then ask questions
whose answers depend on the structure.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>"texts": {<br />
"body": { "body": "Plain prose here.", "format": "PLAIN" },<br />
"specs": { "body": "[{\"book\":\"Dune\",\"author\":\"Herbert\"}]",
"format": "JSON" }<br />
}</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**File fields (\`files\`)**

Uploaded binaries — PDFs, Office documents, images, audio, video,
archives. Files can be added inline as base64, uploaded to a field
endpoint, or supplied as a URL. The platform runs OCR on images and
speech-to-text on audio and video automatically; the extracted text is
what gets indexed. Chapter 7 is devoted to file upload.

**Link fields (\`links\`)**

A URL the platform fetches and processes. Ideal for indexing web pages
and sitemaps without downloading them yourself.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>"links": { "home": { "uri": "https://www.progress.com/agentic-rag" }
}</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Conversation fields (\`conversations\`)**

An ordered list of messages — a chat log, a support thread, an email
chain. Each message carries an author, text, and optional attachments.
Conversations can be appended to over time with a dedicated messages
endpoint, so a live thread stays a single resource.

**Key-value fields (\`key_values\`)**

Structured key/value data attached to a resource, useful for records
whose fields you want available alongside prose.

**Metadata: the four buckets**

Metadata is what turns a pile of text into a filterable, governable
knowledge base. The platform separates it into distinct buckets with
different rules.

| **Bucket** | **Field** | **Who sets it** | **Queryable?** |
|----|----|----|----|
| User metadata | usermetadata | You | Yes — labels and relations drive filtering |
| Origin | origin | You | Yes — source, dates, tags, collaborators, path |
| System metadata | metadata | Platform (language, etc.) | Yes |
| Extra | extra | You | No — stored but not indexed for retrieval |

**User metadata** holds classifications (labels) and relations. Labels
are the primary mechanism for faceting and filtering — a topic=energy
label on a resource lets a query restrict to energy content. **Origin**
captures provenance: source_id, url, created/modified timestamps, tags,
collaborators, and a path (useful for reproducing a folder hierarchy).
**Extra** is a free-form JSON store for information you want to keep
with the resource but explicitly do *not* want influencing retrieval.

| **Gotcha — tested** Put anything you might filter or facet by into usermetadata/origin, not extra. The extra bucket is deliberately excluded from the query path — data placed there is invisible to find filters. This trips people who store a category in extra and then wonder why they cannot filter on it. |
|----|

**Reading resources back**

GET /kb/{kbid}/resource/{rid} returns a resource. The show and extracted
query parameters control how much detail you get — from just the basics
to the full extracted text and computed metadata the platform produced
during processing.

| **\`show\` value** | **Includes** |
|----|----|
| basic | Title, summary, icon, labels, status (the default) |
| values | The field values you supplied |
| extracted | Processed output: extracted text, paragraphs, computed metadata |
| errors | Any processing errors on the resource |
| origin / security / relations | The corresponding metadata blocks |

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/resource/$RID?show=basic&amp;show=extracted&amp;extracted=text&amp;extracted=metadata"
\<br />
-H "Authorization: Bearer $KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Reading back the sandbox's solar-basics resource confirmed its status
was PROCESSED, its detected language was en, and its text field carried
both text and metadata under extracted — the paragraphs and computed
metadata the indexes were built from.

**Addressing resources by slug**

Every by-id endpoint has a by-slug twin under /kb/{kbid}/slug/{rslug}.
Because the slug is yours to choose, you can address resources by your
own external identifiers without ever storing the platform's UUIDs.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>TEXT</strong></p>
<p># These two are equivalent when the resource's slug is
"solar-basics"<br />
GET /kb/{kbid}/resource/ca2a8f3bf186491facde30cdb2fbc2b6<br />
GET /kb/{kbid}/slug/solar-basics</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Modifying, hiding, and deleting**

PATCH a resource to change metadata or add fields; unset fields are left
untouched, so patches are additive by default. Resources can be
**hidden** (excluded from search without deletion) by patching hidden:
true — useful for staging content or soft-retiring it. DELETE removes a
resource and its fields permanently.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p># Add a label and hide the resource in one patch<br />
curl -X PATCH
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/resource/$RID" \<br />
-H "Authorization: Bearer $KEY" -H "Content-Type: application/json"
\<br />
-d '{"hidden": true, "usermetadata": {"classifications":
[{"labelset":"status","label":"archived"}]}}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>
