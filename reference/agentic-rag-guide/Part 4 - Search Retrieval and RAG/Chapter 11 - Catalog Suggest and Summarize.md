**PART 4 — SEARCH, RETRIEVAL, AND RAG**

**Chapter 11\
Catalog, Suggest, and Summarize**

*The supporting retrieval endpoints that round out a search experience*

Three endpoints sit alongside find and ask and handle jobs those two are
not built for: browsing the catalog of resources, autocompleting as the
user types, and summarizing content on demand. Each is small, fast, and
worth knowing.

**Catalog — browse and facet the resource index**

/catalog lists and filters resources by their *stored* attributes —
title, slug, labels, origin — without touching the semantic index. It is
the endpoint behind an admin table or a faceted browse experience, and
it is available the instant a resource is created, before processing
finishes.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p># List everything<br />
curl "https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/catalog" -H
"Authorization: Bearer $KEY"<br />
<br />
# Facet by a labelset to get counts per label<br />
curl -X POST "https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/catalog"
\<br />
-H "Authorization: Bearer $KEY" -H "Content-Type: application/json"
\<br />
-d '{"query":"","faceted":["/classification.labels/topic"]}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

| **Key idea** catalog reads the title/metadata index, not the vector index, so it works before a resource is processed and never incurs embedding cost. Use it for browse, filter, and faceted-count UIs; use find when you need relevance. |
|----|

**Suggest — autocomplete as you type**

/suggest returns fast partial matches for a prefix — paragraphs and
entities — so a search box can show suggestions on each keystroke. A
live ?query=batt returned the battery and EV paragraphs in milliseconds.
Keep it on GET for simplicity and cache aggressively.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/suggest?query=batt"
\<br />
-H "Authorization: Bearer $KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Summarize — condense resources on demand**

/summarize takes a list of resource ids and returns a summary of each,
plus an optional combined summary. It uses the KB's summary model. A
live call over the solar and battery resources returned tidy
per-resource summaries. Use it for digest views, previews, or
pre-computing summaries you will later retrieve against.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/summarize" \<br />
-H "Authorization: Bearer $KEY" -H "Content-Type: application/json"
\<br />
-d '{"resources":["ca2a8f3b...","86b5f794..."]}'</p></th>
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
<p>{ "resources": { "ca2a8f3b...": { "summary": "Photovoltaic solar
panels convert sunlight into DC electricity, which is then converted to
AC..." } } }</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

| **Tip** For summaries you will show repeatedly, generate them once with a Generator ingestion agent (Chapter 8) and store them as a field, rather than calling /summarize on every page view. Summarize on demand only for ad-hoc selections. |
|----|
