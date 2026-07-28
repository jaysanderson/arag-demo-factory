**PART 4 — SEARCH, RETRIEVAL, AND RAG**

**Chapter 9\
Retrieval Fundamentals: /find and /search**

*Finding the right passages — hybrid retrieval, filtering, ranking, and
reranking*

Generation is only as good as the passages it is given. This chapter is
about getting that step right: the two retrieval endpoints, how hybrid
retrieval works, how to filter precisely, and how ranking and reranking
decide the final order. Master find and ask (Chapter 10) becomes mostly
a matter of what to do with the passages it returns.

**Two endpoints, two shapes of result**

The platform offers two retrieval endpoints. Both accept GET (query in
the URL) and POST (query in a JSON body); use POST for anything
non-trivial.

| **Endpoint** | **Returns** | **Use when** |
|----|----|----|
| /find | Results grouped by resource, with the best-matching paragraphs and a best_matches ranking | Building RAG context or a search UI — this is the modern default |
| /search | Flat lists — separate paragraphs, resources, sentences blocks with scores | You need the raw, ungrouped result sets or legacy-style output |

find is what ask calls internally, and its resource-grouped shape maps
naturally onto search interfaces, so this chapter leads with it.

**Hybrid retrieval: keyword + semantic**

The features parameter selects which indexes to search. The default,
\["keyword", "semantic"\], runs both — *hybrid* retrieval — and fuses
the results.

| **Feature** | **Index** | **Good at** |
|----|----|----|
| keyword | BM25 lexical | Exact terms, names, codes, acronyms |
| semantic | Vector | Meaning, paraphrase, synonyms, cross-lingual matches |
| relations | Knowledge graph | Entities related to the query |
| graph | Graph paths | Structured graph traversal (see Chapter 12) |

A live find for *"how long is the payback period for solar"* — a phrase
that does not appear verbatim in the corpus — correctly surfaced the
solar and battery resources via semantic matching, returning
paragraph-level best_matches like ca2a8f3b.../t/body/0-301. That
identifier is the retrieval currency of the platform: resource-id /
field-type / field-id / char-range.

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
"best_matches": ["ca2a8f3b.../t/body/0-301", "86b5f794.../t/body/0-336",
"ca2a8f3b.../a/title/0-18"],<br />
"total": 4<br />
}</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**The complete parameter set, by job**

find accepts 33 parameters. Rather than an alphabetical dump (that is
Appendix A's job), here they are grouped by what they *do* — the same
three-question framework the cookbook in Chapter 13 builds on: what is
eligible, how much comes back, and how it is serialized.

**Query and eligibility — what can be retrieved**

| **Parameter** | **Type / default** | **What it controls** |
|----|----|----|
| query | string | The natural-language query |
| features | array — \[keyword, semantic\] | Which indexes to search: keyword, semantic, relations, graph |
| fields | array — \[\] | Restrict the search to specific fields, e.g. a/title |
| filter_expression | object | Composable AND/OR/NOT filter over labels, slugs, dates, origin (see below) |
| security | object | The caller's groups, for row-level (per-resource) security |
| vectorset | string | Which vector index to search, on a multi-model KB |
| with_synonyms | bool — false | Expand the query using the KB's custom synonyms |
| show_hidden | bool — false | Include resources marked hidden |
| range_creation_start/end | datetime | Only resources created within this window |
| range_modification_start/end | datetime | Only resources modified within this window |
| resource_filters | array | Restrict to specific resource ids (legacy; prefer filter_expression) |
| filters / keyword_filters | array | Legacy flat filters, superseded by filter_expression |

**Context and ranking — how much comes back, in what order**

| **Parameter** | **Type / default** | **What it controls** |
|----|----|----|
| top_k | integer — 20 | How many results to retrieve (max 200) |
| min_score | number or object | Drop results below this score; settable per index (bm25/vector) |
| rank_fusion | rrf (default) | How keyword and semantic result lists are merged |
| reranker | predict (default) | Second-pass model reordering of the fused results |
| vector | array\<number\> | Supply your own query vector instead of embedding query |
| with_duplicates | bool — false | Return duplicate paragraphs instead of collapsing them |

**Query understanding and output**

| **Parameter** | **Type / default** | **What it controls** |
|----|----|----|
| rephrase | bool — false | Rewrite the query before retrieval for better matching |
| rephrase_prompt | string | Custom instructions for the rephrasing step |
| query_image | object | An image to search with (visual models) |
| highlight | bool — false | Wrap matched terms in the returned text |
| show | array — \[basic\] | Which resource metadata blocks to serialize |
| field_type_filter | array | Which field types appear in results |
| search_configuration | string | Load these parameters from a stored named configuration |
| generative_model | string | (when relations/graph features drive follow-on generation) |
| debug / audit_metadata | bool / object | Debugging output and audit tagging |

| **Key idea** You will not set most of these on any given call — the defaults are strong. This table is a map, not a checklist. Chapter 13 shows which handful to reach for in each real use case. |
|----|

**Filtering with filter_expression**

Filtering is how you turn a whole-KB search into a scoped one. The
modern mechanism is filter_expression, a composable object that
supersedes the older flat filters, fields, range\_\*, resource_filters,
and keyword_filters parameters. It lets you build AND/OR/NOT expressions
over resource and field properties — labels, slugs, origin metadata,
creation and modification dates, and more.

A verified example restricting a search to a single resource by slug:

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
-d '{<br />
"query": "energy",<br />
"filter_expression": { "field": { "prop": "resource", "slug":
"battery-storage" } },<br />
"top_k": 5<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Filtering by label is the workhorse pattern — combine it with the labels
an ingestion agent applied (Chapter 8) to scope answers to a category,
tenant, or status:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>{<br />
"query": "outages",<br />
"filter_expression": {<br />
"field": { "prop": "label", "labelset": "severity", "label": "High"
}<br />
}<br />
}</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

| **Tip** Prefer filter_expression over the legacy flat parameters for anything new. It is strictly more expressive — you can nest AND/OR/NOT — and the platform documents the older parameters as things it *replaces*. Mixing both in one request invites confusion. |
|----|

**Ranking and reranking**

Two stages decide the final order. First, **rank fusion** merges the
keyword and semantic result lists — the default and currently only
strategy is Reciprocal Rank Fusion (rrf), which rewards documents that
rank well in *both* lists. Second, a **reranker** takes the fused top
results and reorders them with a more expensive, more accurate model;
the default is predict, the platform's own reranking model.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p># Explicit RRF fusion + Predict reranking (both verified against the
live KB)<br />
curl -X POST "https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/find"
\<br />
-H "Authorization: Bearer $KEY" -H "Content-Type: application/json"
\<br />
-d
'{"query":"battery","rank_fusion":"rrf","reranker":"predict","top_k":5}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

| **Key idea** The defaults — hybrid features, rrf fusion, predict reranking — are strong and the right starting point. Tune top_k and min_score first; only revisit fusion and reranking once you have evidence the default ordering is failing you. |
|----|

**Scoping, security, and hidden content**

Three parameters shape *what is eligible* to be returned:

- **\`security\`** — pass the caller's groups, and the platform returns
  only resources whose access_groups permit them. This is row-level
  security enforced at query time; with enforce_security on the KB it is
  mandatory.

- **\`show_hidden\`** — by default, resources marked hidden are
  excluded; set this to include them (for admin or staging views).

- **\`with_synonyms\`** — expand the query using the KB's custom
  synonyms, so pv also matches photovoltaic and solar (the sandbox had
  exactly those synonyms configured).

**Autocomplete and suggestions**

For a search-as-you-type experience, /suggest returns fast partial-match
paragraphs and entities for a prefix — much cheaper than a full find on
every keystroke. A live /suggest?query=batt returned the EV and battery
paragraphs immediately. Chapter 11 covers it alongside catalog and
summarize.
