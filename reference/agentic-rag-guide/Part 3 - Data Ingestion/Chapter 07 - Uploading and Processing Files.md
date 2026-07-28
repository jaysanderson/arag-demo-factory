**PART 3 — DATA INGESTION**

**Chapter 7\
Uploading and Processing Files**

*Binaries in, extracted knowledge out — upload paths, processing, and
strategies*

Files are where RAG earns its keep: a folder of PDFs, scanned images,
and recorded calls becomes searchable knowledge. This chapter covers the
two upload paths, what processing does to a file, how to control
chunking and extraction, and how to know when a file is ready.

**What the platform accepts**

The platform ingests a wide range of formats and extracts text from all
of them, applying OCR and speech-to-text automatically:

| **Category**           | **Examples**                    |
|------------------------|---------------------------------|
| Documents              | .txt, .html, .docx, .pdf, .json |
| Spreadsheets           | .xlsx, .csv                     |
| Presentations          | .pptx                           |
| Images (OCR)           | .jpg, .png, .tiff               |
| Video (speech-to-text) | .mp4, .avi, .mpeg               |
| Audio (speech-to-text) | .mp3, .wav                      |
| Web                    | .html, sitemaps                 |
| Archives               | .zip, .gzip, .rar               |

| **Gotcha — tested** An archive is indexed as **one** resource — the text of every file inside is extracted but merged together. If you need per-file results, unpack the archive before ingesting. This is a deliberate design choice, not a limitation you can toggle. |
|----|

**Two ways to upload**

**Simple upload**

For files up to a moderate size, POST /kb/{kbid}/upload sends the whole
binary in one request. Set X-Filename (and optionally X-Language,
X-Password for protected documents, X-Extract-Strategy,
X-Split-Strategy). This was the path verified in testing.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST "https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/upload"
\<br />
-H "Authorization: Bearer $KEY" \<br />
-H "X-Filename: wind.txt" \<br />
-H "Content-Type: text/plain" \<br />
--data-binary @wind.txt<br />
# -&gt; 201 { "seqid": null, "uuid": "1009f3c7...", "field_id":
"1d7c1a94..." }</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

The response returns the new resource uuid and the field_id of the file
field it created — so a single call both makes the resource and attaches
the file.

**Resumable (TUS) upload**

For large files, unreliable networks, or resumable transfers, the
platform implements the **TUS** protocol. You create an upload, then
send the file in chunks (PATCH with an Upload-Offset), and can resume
from the last acknowledged offset after an interruption. Use TUS for
anything large enough that re-sending from scratch would hurt — long
videos, big PDFs. The SDKs wrap TUS so you rarely hand-roll the offset
bookkeeping.

**What processing does**

Once a file lands, the Nuclia Understanding API processes it through a
pipeline: detect type, extract text (OCR/STT as needed), detect
language, split into paragraphs, run NER, and compute vectors with the
KB's semantic model. Each step's output is stored under the field's
extracted data, which you can read back (Chapter 6).

| **Warning** Processing is asynchronous and not instant. In testing, a freshly uploaded file was accepted with 201 but /ask still answered *"Not enough data to answer this"* until processing completed, because its vectors did not yet exist. Never assume a file is queryable the moment upload returns. |
|----|

**Knowing when a file is ready**

Read the resource and check its processing status. GET
/kb/{kbid}/resource/{rid}?show=basic returns metadata.status, which
moves from PENDING/PROCESSING to PROCESSED (or ERROR). Poll it, or —
better — have processing notify you.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>PYTHON</strong></p>
<p>import time, requests<br />
def wait_processed(zone, kb, rid, key, timeout=300):<br />
url =
f"https://{zone}.dp.progress.cloud/api/v1/kb/{kb}/resource/{rid}"<br />
hdr = {"Authorization": f"Bearer {key}"}<br />
deadline = time.time() + timeout<br />
while time.time() &lt; deadline:<br />
status = requests.get(url, headers=hdr, params={"show":
"basic"}).json()["metadata"]["status"]<br />
if status in ("PROCESSED", "ERROR"):<br />
return status<br />
time.sleep(3)<br />
raise TimeoutError("still processing")</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

| **Tip** For production ingestion at volume, do not poll. Configure a **webhook** (the augmentation agents in Chapter 8 can trigger one) or watch the processing status endpoint in batches. Polling one resource at a time does not scale. |
|----|

**Controlling extraction and chunking**

Two kinds of strategy let you override the defaults for how a file is
turned into paragraphs.

**Extract strategies**

An **extract strategy** controls how text is pulled from a document —
for example, how tables or layout are handled. Strategies are defined on
the Knowledge Box and referenced by name at upload time via the
X-Extract-Strategy header (or the extract_strategy field on a text/link
field). Listing them on a fresh KB returns an empty set — none are
defined until you create them.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p># List extract strategies (empty {} on a new KB)<br />
curl "https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/extract_strategies"
\<br />
-H "Authorization: Bearer $KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Split strategies**

A **split strategy** controls how extracted text is divided into
paragraphs — the chunking step. The default splitting works well for
prose, but a custom split strategy helps when your documents have
unusual structure (dense tables, code, transcripts). Like extract
strategies, they are defined on the KB and referenced by name with
X-Split-Strategy.

| **Key idea** Chunking is the highest-leverage ingestion tuning knob. If answers are missing context or citing fragments, revisit your split strategy before touching the models. Paragraphs that are too small lose context; too large, and retrieval precision drops. |
|----|

**Reprocessing and reindexing**

Two maintenance operations handle change. **Reprocess** re-runs the full
understanding pipeline on a resource — use it after changing an
extract/split strategy or the semantic model. **Reindex** rebuilds the
indexes from already-extracted data — cheaper, for when only indexing
needs refreshing.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p># Reprocess (full pipeline) vs reindex (indexes only)<br />
curl -X POST ".../kb/$KB/resource/$RID/reprocess" -H "Authorization:
Bearer $KEY"<br />
curl -X POST ".../kb/$KB/resource/$RID/reindex" -H "Authorization:
Bearer $KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>
