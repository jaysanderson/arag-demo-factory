**PART 7 — REFERENCE APPENDIX**

**Appendix A — NucliaDB REST API Reference**

*Knowledge Box content, search, and RAG — every endpoint, fully
expanded*

The content and retrieval surface of a Knowledge Box.

**115 operations** in **11 groups**, generated from the official
nucliadb v1 OpenAPI specification. Served from
https://\<zone\>.dp.progress.cloud/api/v1; authorized with a Knowledge
Box API key (Authorization: Bearer or X-NUCLIA-SERVICEACCOUNT). Every
request-body field, parameter, and response is listed; object-typed
fields reference named schemas documented in full in Appendix F (Schema
Catalog).

**Knowledge Boxes (10)**

**GET /kb/s/{slug}**

Get Knowledge Box (by slug) · roles: MANAGER, READER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| slug     | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET "https://$ZONE.dp.progress.cloud/api/v1/kb/s/{slug}"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | KnowledgeBoxObj     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /kb/{kbid}**

Get Knowledge Box · roles: MANAGER, READER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |

**Example** — a real call captured against the live sandbox:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET "https://$ZONE.dp.progress.cloud/api/v1/kb/$KB" \<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Response:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>{<br />
"slug": "arag-book-sandbox",<br />
"uuid": "$KB",<br />
"config": {<br />
"uuid": null,<br />
"slug": "$ACCOUNT:arag-book-sandbox",<br />
"title": "ARAG Book Sandbox (safe to delete)",<br />
"description": "Throwaway KB for live-testing while writing the
book.",<br />
"learning_configuration": null,<br />
"external_index_provider": null,<br />
"configured_external_index_provider": {<br />
"type": "unset"<br />
},<br />
"similarity": null,<br />
"hidden_resources_enabled": false,<br />
"hidden_resources_hide_on_creation": false,<br />
"enforce_security": false<br />
},<br />
"model": null<br />
}</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | KnowledgeBoxObj     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /kb/{kbid}/configuration**

Create Knowledge Box models configuration · roles: MANAGER, OWNER

Create configuration of models assigned to a Knowledge Box

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/configuration" \<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 204        |                     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**PATCH /kb/{kbid}/configuration**

Update Knowledge Box models configuration · roles: MANAGER, OWNER

Update current configuration of models assigned to a Knowledge Box

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PATCH
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/configuration" \<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 204        |                     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /kb/{kbid}/counters**

Knowledgebox Counters · roles: READER, MANAGER

Summary of amount of different things inside a knowledgebox

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kbid | path | string | yes |  |
| debug | query | boolean |  | If set, the response will include some extra metadata for debugging purposes, like the list of queried nodes. |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET "https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/counters"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**           | **Description**     |
|------------|----------------------|---------------------|
| 200        | KnowledgeboxCounters | Successful Response |
| 422        | HTTPValidationError  | Validation Error    |

**GET /kb/{kbid}/export/{export_id}**

Download a Knowledge Box export · roles: MANAGER, READER

**Parameters**

| **Name**  | **In** | **Type** | **Req** | **Description** |
|-----------|--------|----------|---------|-----------------|
| kbid      | path   | string   | yes     |                 |
| export_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/export/{export_id}"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        |                     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /kb/{kbid}/export/{export_id}/status**

Get the status of a Knowledge Box Export · roles: MANAGER, READER

**Parameters**

| **Name**  | **In** | **Type** | **Req** | **Description** |
|-----------|--------|----------|---------|-----------------|
| kbid      | path   | string   | yes     |                 |
| export_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/export/{export_id}/status"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | StatusResponse      | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /kb/{kbid}/import/{import_id}/status**

Get the status of a Knowledge Box Import · roles: MANAGER, READER

**Parameters**

| **Name**  | **In** | **Type** | **Req** | **Description** |
|-----------|--------|----------|---------|-----------------|
| kbid      | path   | string   | yes     |                 |
| import_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/import/{import_id}/status"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | StatusResponse      | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /kb/{kbid}/upload**

Upload binary file on a Knowledge Box · roles: WRITER

Upload a file onto a Knowledge Box, field id will be file and rid will
be autogenerated.

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kbid | path | string | yes |  |
| x-filename | header | string \| null |  | Name of the file being uploaded. |
| x-password | header | string \| null |  | If the file is password protected, the password must be provided here. |
| x-language | header | string \| null |  |  |
| x-md5 | header | string \| null |  | MD5 hash of the file being uploaded. This is used to check if the file has been uploaded before. |
| x-extract-strategy | header | string \| null |  | Extract strategy to use when uploading a file. If not provided, the default strategy will be used. |
| x-split-strategy | header | string \| null |  | Split strategy to use when uploading a file. If not provided, the default strategy will be used. |

**Example** — a real call captured against the live sandbox:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST "https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/upload"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Response:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>{<br />
"seqid": null,<br />
"uuid": "1009f3c71b934964aecb012f5d18e390",<br />
"field_id": "1d7c1a94d9ca4a4ab6ad9a12a4342e8a"<br />
}</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**           | **Description**     |
|------------|----------------------|---------------------|
| 201        | ResourceFileUploaded | Successful Response |
| 422        | HTTPValidationError  | Validation Error    |

**GET /learning/configuration/schema**

Learning Configuration Schema

Get jsonschema definition for learningconfiguration field of
knowledgebox creation payload

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/learning/configuration/schema"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**Search (19)**

**POST /kb/{kbid}/ask**

Ask Knowledge Box · roles: READER

Ask questions on a Knowledge Box

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kbid | path | string | yes |  |
| x-ndb-client | header | NucliaDBClientType |  |  |
| x-show-consumption | header | boolean |  |  |
| x-nucliadb-user | header | string |  |  |
| x-forwarded-for | header | string |  |  |
| x-synchronous | header | boolean |  | When set to true, outputs response as JSON in a non-streaming way. This is slower and requires waiting for entire answer to be ready. |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| audit_metadata | map\<string, string\> \| null |  |  | A dictionary containing optional audit-specific metadata, such as userid, environment, or other contextual information. This metadata can be leveraged for filtering and analyzing activity logs in futu… |
| query | string | yes |  | The query to get a generative answer for |
| top_k | integer |  | 20 | The top most relevant results to fetch at the retrieval step. The maximum number of results allowed is 200. |
| filter_expression | FilterExpression \| null |  |  | Returns only documents that match this filter expression.Filtering examples can be found here: (see docs) This allows building complex filtering expressions and replaces the following parameters:field… |
| fields | array\<string\> |  | \[\] | The list of fields to search in. For instance: a/title to search only on title field. For more details on filtering by field, see: (see docs) |
| filters | array\<string\> \| array\<Filter\> |  | \[\] | The list of filters to apply. Filtering examples can be found here: (see docs) |
| keyword_filters | array\<string\> \| array\<Filter\> |  | \[\] | List of keyword filter expressions to apply to the retrieval step. The text block search will only be performed on the documents that contain the specified keywords. The filters are case-insensitive, … |
| vectorset | string \| null |  |  | Vectors index to perform the search in. If not provided, NucliaDB will use the default one |
| min_score | number \| MinScore \| null |  |  | Minimum score to filter search results. Results with a lower score will be ignored. Accepts either a float or a dictionary with the minimum scores for the bm25 and vector indexes. If a float is provid… |
| features | array\<ChatOptions\> |  | \['semantic', 'keyword'\] | Features enabled for the chat endpoint. Semantic search is done if semantic is included. If keyword is included, the results will include matching paragraphs from the bm25 index. If relations is inclu… |
| range_creation_start | string \| null |  |  | Resources created before this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53:00+05:00. |
| range_creation_end | string \| null |  |  | Resources created after this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53:00+05:00. |
| range_modification_start | string \| null |  |  | Resources modified before this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53:00+05:00. |
| range_modification_end | string \| null |  |  | Resources modified after this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53:00+05:00. |
| show | array\<ResourceProperties\> |  | \['basic'\] | Controls which types of metadata are serialized on resources of search results |
| field_type_filter | array\<FieldTypeName\> |  | \['text', 'file', 'link', 'conversation', 'generic', 'key_value'\] | Define which field types are serialized on resources of search results |
| extracted | array\<ExtractedDataTypeName\> |  | \[\] | \[Deprecated\] Please use GET resource endpoint instead to get extracted metadata |
| context | array\<ChatContextMessage\> \| null |  |  | DEPRECATED! Please, use chathistory instead. |
| chat_history | array\<ChatContextMessage\> \| null |  |  | Use to rephrase the new LLM query by taking into account the chat conversation history. This will be passed to the LLM so that it is aware of the previous conversation. |
| extra_context | array\<string\> \| null |  |  | Additional context that is added to the retrieval context sent to the LLM. It allows extending the chat feature with content that may not be in the Knowledge Box. |
| extra_context_images | array\<Image\> \| null |  |  | Additional images added to the retrieval context sent to the LLM." It allows extending the chat feature with content that may not be in the Knowledge Box. |
| query_image | Image \| null |  |  | Image that will be used together with the query text for retrieval and then sent to the LLM as part of the context. If a query image is provided, the extracontextimages and ragimagesstrategies will be… |
| highlight | boolean |  | False | If set to true, the query terms will be highlighted in the results between \<mark\>...\</mark\> tags |
| resource_filters | array\<string\> |  | \[\] | List of resource ids to filter search results for. Only paragraphs from the specified resources will be returned. |
| prompt | string \| CustomPrompt \| null |  |  | Use to customize the prompts given to the generative model. Both system and user prompts can be customized. If a string is provided, it is interpreted as the user prompt. |
| rank_fusion | RankFusionName \| ReciprocalRankFusion |  | rrf | Rank fusion algorithm to use to merge results from multiple retrievers (keyword, semantic) |
| reranker | RerankerName \| PredictReranker |  | predict | Reranker let you specify which method you want to use to rerank your results at the end of retrieval |
| citations | boolean \| CitationsType \| null |  |  | Whether to include citations in the response. If set to None or False, no citations will be computed. If set to True or 'default', citations will be computed after answer generation and send as a sepa… |
| citation_threshold | number \| null |  |  | If citations is set to True or 'default', this will be the similarity threshold. Value between 0 and 1, lower values will produce more citations. If not set, it will be set to the optimized threshold … |
| security | RequestSecurity \| null |  |  | Security metadata for the request. Please refer to the documentation for more details on how security works: (see docs) |
| show_hidden | boolean |  | False | If set to false (default), excludes hidden resources from search |
| rag_strategies | array\<FieldExtensionStrategy \| FullResourceStrategy \| HierarchyResourceStrategy \| NeighbouringParagraphsStrategy \| MetadataExtensionStrategy \| ConversationalStrategy \| PreQueriesStrategy \| GraphStrategy\> |  | \[\] | Options for tweaking how the context for the LLM model is crafted: - fullresource will add the full text of the matching resources to the context. This strategy cannot be combined with hierarchy, neig… |
| rag_images_strategies | array\<PageImageStrategy \| ParagraphImageStrategy \| TableImageStrategy\> |  | \[\] | Options for tweaking how the image based context for the LLM model is crafted: - pageimage will add the full page image of the matching resources to the context. - tables will send the table images fo… |
| debug | boolean |  | False | If set, the response will include some extra metadata for debugging purposes, like the list of queried nodes. |
| generative_model | string \| null |  |  | The generative model to use for the chat endpoint. If not provided, the model configured for the Knowledge Box is used. |
| generative_model_seed | integer \| null |  |  | The seed to use for the generative model for deterministic generation. Only supported by some models. |
| max_tokens | integer \| MaxTokens \| null |  |  | Use to limit the amount of tokens used in the LLM context and/or for generating the answer. If not provided, the default maximum tokens of the generative model will be used. If an integer is provided,… |
| rephrase | boolean |  | False | Rephrase the query for a more efficient retrieval. This will consume LLM tokens and make the request slower. |
| chat_history_relevance_threshold | number \| null |  |  | Threshold to determine if the past chat history is relevant to rephrase the user's question. 0 - Always treat previous messages as relevant (always rephrase).1 - Always treat previous messages as irre… |
| prefer_markdown | boolean |  | False | If set to true, the response will be in markdown format |
| answer_json_schema | object (free-form map) \| null |  |  | Desired JSON schema for the LLM answer. This schema is passed to the LLM so that it answers in a scructured format following the schema. If not provided, textual response is returned. Note that when u… |
| generate_answer | boolean |  | True | Whether to generate an answer using the generative model. If set to false, the response will only contain the retrieval results. |
| search_configuration | string \| null |  |  | Load ask parameters from this configuration. Parameters in the request override parameters from the configuration. |
| reasoning | Reasoning \| boolean |  | False | Reasoning options for the generative model. Set to True to enable default reasoning, False to disable, or provide a Reasoning object for custom options. |

**Example** — a real call captured against the live sandbox:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST "https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/ask"
\<br />
-H "Authorization: Bearer $KB_API_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"query": "How much does a home battery store and when is it
subsidised?",<br />
"top_k": 5,<br />
"features": [<br />
"keyword",<br />
"semantic"<br />
],<br />
"citations": true<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Response:

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
"retrieval_results": {<br />
"resources": {<br />
"86b5f7948b144b008f018cbd47a2bde4": {<br />
"id": "86b5f7948b144b008f018cbd47a2bde4",<br />
"slug": "battery-storage",<br />
"title": "Home Battery Storage",<br />
"summary": "",<br />
"icon": "text/plain",<br />
"thumbnail": "",<br />
"metadata": {<br />
"metadata": {},<br />
"language": "en",<br />
"languages": [<br />
"en"<br />
],<br />
"status": "PROCESSED"<br />
},<br />
"usermetadata": {<br />
"classifications": [<br />
{<br />
"labelset": "topic",<br />
"label": "energy",<br />
"cancelled_by_user": false<br />
}<br />
],<br />
"relations": []<br />
},<br />
"fi<br />
... (truncated)</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | SyncAskResponse     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /kb/{kbid}/catalog**

List resources of a Knowledge Box · roles: READER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kbid | path | string | yes |  |
| query | query | string |  | The query to search for |
| filter_expression | query | string \| null |  | Returns only documents that match this filter expression.Filtering examples can be found here: (see docs) This allows building complex filtering expre… |
| filters | query | array\<string\> |  | The list of filters to apply. Filtering examples can be found here: (see docs) |
| faceted | query | array\<string\> |  | The list of facets to calculate. The facets follow the same syntax as filters: (see docs) |
| sort_field | query | SortField |  | Field to sort results with (Score not supported in catalog) |
| sort_order | query | SortOrder |  | Order to sort results with |
| page_number | query | integer |  | The page number of the results to return |
| page_size | query | integer |  | The number of results to return per page. The maximum number of results per page allowed is 200. |
| with_status | query | ResourceProcessingStatus \| null |  | Filter results by resource processing status |
| range_creation_start | query | string \| null |  | Resources created before this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:5… |
| range_creation_end | query | string \| null |  | Resources created after this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53… |
| range_modification_start | query | string \| null |  | Resources modified before this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:… |
| range_modification_end | query | string \| null |  | Resources modified after this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:5… |
| hidden | query | boolean \| null |  | Set to filter only hidden or only non-hidden resources. Default is to return everything |
| show | query | array\<ResourceProperties\> |  | Controls which types of metadata are serialized on resources of search results |

**Example** — a real call captured against the live sandbox:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET "https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/catalog"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Response:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>{<br />
"resources": {<br />
"df6191306a97408db56025102074aac0": {<br />
"id": "df6191306a97408db56025102074aac0",<br />
"slug": "progress-site",<br />
"title": "Progress site",<br />
"summary": "",<br />
"icon": "application/generic",<br />
"thumbnail": "",<br />
"metadata": {<br />
"metadata": {},<br />
"language": "",<br />
"languages": [],<br />
"status": "PENDING"<br />
},<br />
"usermetadata": {<br />
"classifications": []<br />
},<br />
"fieldmetadata": [],<br />
"computedmetadata": {<br />
"field_classifications": []<br />
},<br />
"created": "2026-07-27T05:24:19.555446",<br />
"modified": "2026-07-27T05:24:19.555461",<br />
"last_seqid": 0,<br />
"last_account_seq": null,<br />
"queue": "private",<br />
"hidden": false,<br />
"data": {<br />
"links": {<br />
"home": {<br />
"status": "PENDING"<br />
}<br />
},<br />
"generics": {<br />
"title": {<br />
... (truncated)</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**                | **Description**     |
|------------|---------------------------|---------------------|
| 200        | KnowledgeboxSearchResults | Successful Response |
| 422        | HTTPValidationError       | Validation Error    |

**POST /kb/{kbid}/catalog**

List resources of a Knowledge Box · roles: READER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| query | string \| CatalogQuery |  |  | The query to search for |
| filter_expression | CatalogFilterExpression \| null |  |  | Returns only documents that match this filter expression.Filtering examples can be found here: (see docs) This allows building complex filtering expressions and replaces the following parameters:filte… |
| faceted | array\<string\> |  | \[\] | The list of facets to calculate. The facets follow the same syntax as filters: (see docs) |
| sort | SortOptions \| null |  |  | Options for results sorting |
| page_number | integer |  | 0 | The page number of the results to return |
| page_size | integer |  | 20 | The number of results to return per page. The maximum number of results per page allowed is 200. |
| hidden | boolean \| null |  |  | Set to filter only hidden or only non-hidden resources. Default is to return everything |
| show | array\<ResourceProperties\> |  | \['basic', 'errors'\] | Controls which types of metadata are serialized on resources of search results |
| filters | array\<string\> \| array\<Filter\> |  | \[\] | The list of filters to apply. Filtering examples can be found here: (see docs) |
| with_status | ResourceProcessingStatus \| null |  |  | Filter results by resource processing status |
| range_creation_start | string \| null |  |  | Resources created before this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53:00+05:00. |
| range_creation_end | string \| null |  |  | Resources created after this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53:00+05:00. |
| range_modification_start | string \| null |  |  | Resources modified before this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53:00+05:00. |
| range_modification_end | string \| null |  |  | Resources modified after this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53:00+05:00. |

**Example** — a real call captured against the live sandbox:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST "https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/catalog"
\<br />
-H "Authorization: Bearer $KB_API_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"query": "",<br />
"faceted": [<br />
"/classification.labels/topic"<br />
]<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Response:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>{<br />
"resources": {<br />
"df6191306a97408db56025102074aac0": {<br />
"id": "df6191306a97408db56025102074aac0",<br />
"slug": "progress-site",<br />
"title": "Progress site",<br />
"summary": "",<br />
"icon": "application/stf-link",<br />
"thumbnail":
"/kb/$KB/resource/df6191306a97408db56025102074aac0/link/home/download/extracted/link_thumbnail",<br />
"metadata": {<br />
"metadata": {},<br />
"language": "en",<br />
"languages": [<br />
"en",<br />
"fr"<br />
],<br />
"status": "PROCESSED"<br />
},<br />
"usermetadata": {<br />
"classifications": []<br />
},<br />
"fieldmetadata": [],<br />
"computedmetadata": {<br />
"field_classifications": []<br />
},<br />
"created": "2026-07-27T05:24:19.555446",<br />
"modified": "2026-07-27T05:24:19.555461",<br />
"last_seqid": 0,<br />
"last_account_seq": null,<br />
"queue": "private",<br />
"hidden": false,<br />
"data": {<br />
... (truncated)</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**                | **Description**     |
|------------|---------------------------|---------------------|
| 200        | KnowledgeboxSearchResults | Successful Response |
| 422        | HTTPValidationError       | Validation Error    |

**POST /kb/{kbid}/feedback**

Send Feedback · roles: READER

Send feedback for a search operation in a Knowledge Box

**Parameters**

| **Name**        | **In** | **Type**           | **Req** | **Description** |
|-----------------|--------|--------------------|---------|-----------------|
| kbid            | path   | string             | yes     |                 |
| x-ndb-client    | header | NucliaDBClientType |         |                 |
| x-nucliadb-user | header | string             |         |                 |
| x-forwarded-for | header | string             |         |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| ident | string | yes |  | Id of the request to provide feedback for. This id is returned in the response header Nuclia-Learning-Id of the chat endpoint. |
| good | boolean | yes |  | Whether the result was good or not |
| task | FeedbackTasks | yes |  | The task the feedback is for. For now, only CHAT task is available |
| feedback | string \| null |  |  | Feedback text |
| text_block_id | string \| null |  |  | Text block id |

**Example** — a real call captured against the live sandbox:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST "https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/feedback"
\<br />
-H "Authorization: Bearer $KB_API_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"ident": "test",<br />
"good": true,<br />
"task": "CHAT",<br />
"feedback": "great"<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Response:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>None</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /kb/{kbid}/find**

Find Knowledge Box · roles: READER

Find on a Knowledge Box

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kbid | path | string | yes |  |
| query | query | string |  | The query to search for |
| filter_expression | query | string \| null |  | Returns only documents that match this filter expression.Filtering examples can be found here: (see docs) This allows building complex filtering expre… |
| fields | query | array\<string\> |  | The list of fields to search in. For instance: a/title to search only on title field. For more details on filtering by field, see: (see docs) |
| filters | query | array\<string\> |  | The list of filters to apply. Filtering examples can be found here: (see docs) |
| top_k | query | integer \| null |  | The number of results search should return. The maximum number of results allowed is 200. |
| min_score | query | number \| null |  | Minimum similarity score to filter vector index results. If not specified, the default minimum score of the semantic model associated to the Knowledge… |
| min_score_semantic | query | number \| null |  | Minimum semantic similarity score to filter vector index results. If not specified, the default minimum score of the semantic model associated to the … |
| min_score_bm25 | query | number |  | Minimum bm25 score to filter paragraph and document index results |
| vectorset | query | string \| null |  | Vectors index to perform the search in. If not provided, NucliaDB will use the default one |
| range_creation_start | query | string \| null |  | Resources created before this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:5… |
| range_creation_end | query | string \| null |  | Resources created after this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53… |
| range_modification_start | query | string \| null |  | Resources modified before this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:… |
| range_modification_end | query | string \| null |  | Resources modified after this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:5… |
| features | query | array\<FindOptions\> |  | List of search features to use. Each value corresponds to a lookup into on of the different indexes |
| debug | query | boolean |  | If set, the response will include some extra metadata for debugging purposes, like the list of queried nodes. |
| highlight | query | boolean |  | If set to true, the query terms will be highlighted in the results between \<mark\>...\</mark\> tags |
| show | query | array\<ResourceProperties\> |  | Controls which types of metadata are serialized on resources of search results |
| field_type | query | array\<FieldTypeName\> |  | Define which field types are serialized on resources of search results |
| extracted | query | array\<ExtractedDataTypeName\> |  | \[Deprecated\] Please use GET resource endpoint instead to get extracted metadata |
| with_duplicates | query | boolean |  | Whether to return duplicate paragraphs on the same document |
| with_synonyms | query | boolean |  | Whether to return matches for custom knowledge box synonyms of the query terms. Note: only supported for keyword and fulltext search options. |
| security_groups | query | array\<string\> \| null |  | List of security groups to filter search results for. Only resources matching the query and containing the specified security groups will be returned.… |
| show_hidden | query | boolean |  | If set to false (default), excludes hidden resources from search |
| rank_fusion | query | RankFusionName |  | Rank fusion algorithm to use to merge results from multiple retrievers (keyword, semantic) |
| reranker | query | RerankerName |  | Reranker let you specify which method you want to use to rerank your results at the end of retrieval |
| search_configuration | query | string \| null |  | Load find parameters from this configuration. Parameters in the request override parameters from the configuration. |
| x-ndb-client | header | NucliaDBClientType |  |  |
| x-nucliadb-user | header | string |  |  |
| x-forwarded-for | header | string |  |  |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET "https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/find"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**              | **Description**     |
|------------|-------------------------|---------------------|
| 200        | KnowledgeboxFindResults | Successful Response |
| 422        | HTTPValidationError     | Validation Error    |

**POST /kb/{kbid}/find**

Find Knowledge Box · roles: READER

Find on a Knowledge Box

**Parameters**

| **Name**        | **In** | **Type**           | **Req** | **Description** |
|-----------------|--------|--------------------|---------|-----------------|
| kbid            | path   | string             | yes     |                 |
| x-ndb-client    | header | NucliaDBClientType |         |                 |
| x-nucliadb-user | header | string             |         |                 |
| x-forwarded-for | header | string             |         |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| audit_metadata | map\<string, string\> \| null |  |  | A dictionary containing optional audit-specific metadata, such as userid, environment, or other contextual information. This metadata can be leveraged for filtering and analyzing activity logs in futu… |
| query | string |  |  | The query to search for |
| filter_expression | FilterExpression \| null |  |  | Returns only documents that match this filter expression.Filtering examples can be found here: (see docs) This allows building complex filtering expressions and replaces the following parameters:field… |
| fields | array\<string\> |  | \[\] | The list of fields to search in. For instance: a/title to search only on title field. For more details on filtering by field, see: (see docs) |
| filters | array\<string\> \| array\<Filter\> |  | \[\] | The list of filters to apply. Filtering examples can be found here: (see docs) |
| top_k | integer |  | 20 | The number of results search should return. The maximum number of results allowed is 200. |
| min_score | number \| MinScore \| null |  |  | Minimum score to filter search results. Results with a lower score will be ignored. Accepts either a float or a dictionary with the minimum scores for the bm25 and vector indexes. If a float is provid… |
| range_creation_start | string \| null |  |  | Resources created before this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53:00+05:00. |
| range_creation_end | string \| null |  |  | Resources created after this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53:00+05:00. |
| range_modification_start | string \| null |  |  | Resources modified before this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53:00+05:00. |
| range_modification_end | string \| null |  |  | Resources modified after this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53:00+05:00. |
| debug | boolean |  | False | If set, the response will include some extra metadata for debugging purposes, like the list of queried nodes. |
| highlight | boolean |  | False | If set to true, the query terms will be highlighted in the results between \<mark\>...\</mark\> tags |
| show | array\<ResourceProperties\> |  | \['basic'\] | Controls which types of metadata are serialized on resources of search results |
| field_type_filter | array\<FieldTypeName\> |  | \['text', 'file', 'link', 'conversation', 'generic', 'key_value'\] | Define which field types are serialized on resources of search results |
| extracted | array\<ExtractedDataTypeName\> |  | \[\] | \[Deprecated\] Please use GET resource endpoint instead to get extracted metadata |
| vector | array\<number\> \| null |  |  | The vector to perform the search with. If not provided, NucliaDB will use Nuclia Predict API to create the vector off from the query. |
| vectorset | string \| null |  |  | Vectors index to perform the search in. If not provided, NucliaDB will use the default one |
| with_duplicates | boolean |  | False | Whether to return duplicate paragraphs on the same document |
| with_synonyms | boolean |  | False | Whether to return matches for custom knowledge box synonyms of the query terms. Note: only supported for keyword and fulltext search options. |
| resource_filters | array\<string\> |  | \[\] | List of resource ids to filter search results for. Only paragraphs from the specified resources will be returned. |
| security | RequestSecurity \| null |  |  | Security metadata for the request. Please refer to the documentation for more details on how security works: (see docs) |
| show_hidden | boolean |  | False | If set to false (default), excludes hidden resources from search |
| rephrase | boolean |  | False | Rephrase the query for a more efficient retrieval. This will consume LLM tokens and make the request slower. |
| rephrase_prompt | string \| null |  |  | Rephrase prompt given to the generative model responsible for rephrasing the query for a more effective retrieval step. This is only used if the rephrase flag is set to true in the request. If not spe… |
| query_image | Image \| null |  |  | Image that will be used together with the query text for retrieval. |
| graph_query | And_GraphPathQuery\_ \| Or_GraphPathQuery\_ \| Not_GraphPathQuery\_ \| GraphPath-Input \| SourceNode \| DestinationNode \| AnyNode \| Relation-Input \| nucliadb_models\_\_graph\_\_requests\_\_Generated \| null |  |  | Query for the knowledge graph. Paths (node-relation-node) extracted from a paragraphid will be used to extend the results |
| features | array\<FindOptions\> |  | \['keyword', 'semantic'\] | List of search features to use. Each value corresponds to a lookup into on of the different indexes |
| rank_fusion | RankFusionName \| ReciprocalRankFusion |  | rrf | Rank fusion algorithm to use to merge results from multiple retrievers (keyword, semantic) |
| reranker | RerankerName \| PredictReranker |  | predict | Reranker let you specify which method you want to use to rerank your results at the end of retrieval |
| keyword_filters | array\<string\> \| array\<Filter\> |  | \[\] | List of keyword filter expressions to apply to the retrieval step. The text block search will only be performed on the documents that contain the specified keywords. The filters are case-insensitive, … |
| search_configuration | string \| null |  |  | Load find parameters from this configuration. Parameters in the request override parameters from the configuration. |
| generative_model | string \| null |  |  | The generative model used to rephrase the query. If not provided, the model configured for the Knowledge Box is used. |

**Example** — a real call captured against the live sandbox:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST "https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/find"
\<br />
-H "Authorization: Bearer $KB_API_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"query": "how long is the payback period for solar",<br />
"features": [<br />
"keyword",<br />
"semantic"<br />
],<br />
"top_k": 5<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Response:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>{<br />
"resources": {<br />
"86b5f7948b144b008f018cbd47a2bde4": {<br />
"id": "86b5f7948b144b008f018cbd47a2bde4",<br />
"slug": "battery-storage",<br />
"title": "Home Battery Storage",<br />
"summary": "",<br />
"icon": "text/plain",<br />
"thumbnail": "",<br />
"metadata": {<br />
"metadata": {},<br />
"language": "en",<br />
"languages": [<br />
"en"<br />
],<br />
"status": "PROCESSED"<br />
},<br />
"usermetadata": {<br />
"classifications": [<br />
{<br />
"labelset": "topic",<br />
"label": "energy",<br />
"cancelled_by_user": false<br />
}<br />
]<br />
},<br />
"fieldmetadata": [],<br />
"computedmetadata": {<br />
"field_classifications": []<br />
},<br />
"created": "2026-07-27T05:24:18.542195",<br />
"modified": "2026-07-27T05:24:18.542214",<br />
"last_seqid": 0,<br />
"last_account_seq": null,<br />
"queue": "private",<br />
"hidden"<br />
... (truncated)</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**              | **Description**     |
|------------|-------------------------|---------------------|
| 200        | KnowledgeboxFindResults | Successful Response |
| 422        | HTTPValidationError     | Validation Error    |

**POST /kb/{kbid}/graph**

Search Knowledge Box graph · roles: READER

Search on the Knowledge Box graph and retrieve triplets of
vertex-edge-vertex

**Parameters**

| **Name**        | **In** | **Type**           | **Req** | **Description** |
|-----------------|--------|--------------------|---------|-----------------|
| kbid            | path   | string             | yes     |                 |
| x-ndb-client    | header | NucliaDBClientType |         |                 |
| x-nucliadb-user | header | string             |         |                 |
| x-forwarded-for | header | string             |         |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| top_k | integer |  | 50 |  |
| filter_expression | GraphFilterExpression \| null |  |  | Returns only relations from documents that match this filter expression.Filtering examples can be found here: (see docs) |
| security | RequestSecurity \| null |  |  | Security metadata for the request. Please refer to the documentation for more details on how security works: (see docs) |
| show_hidden | boolean |  | False | If set to false (default), excludes hidden resources from search |
| query | And_GraphPathQuery\_ \| Or_GraphPathQuery\_ \| Not_GraphPathQuery\_ \| GraphPath-Input \| SourceNode \| DestinationNode \| AnyNode \| Relation-Input \| nucliadb_models\_\_graph\_\_requests\_\_Generated | yes |  |  |

**Example** — a real call captured against the live sandbox:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST "https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/graph"
\<br />
-H "Authorization: Bearer $KB_API_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"query": {<br />
"prop": "path"<br />
},<br />
"top_k": 10<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Response:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>{<br />
"paths": [<br />
{<br />
"source": {<br />
"value": "ca2a8f3bf186491facde30cdb2fbc2b6",<br />
"type": "resource",<br />
"group": ""<br />
},<br />
"relation": {<br />
"label": "",<br />
"type": "ABOUT"<br />
},<br />
"destination": {<br />
"value": "topic/energy",<br />
"type": "label",<br />
"group": ""<br />
},<br />
"metadata": {<br />
"field_id": "ca2a8f3bf186491facde30cdb2fbc2b6/a/metadata",<br />
"paragraph_id": null<br />
},<br />
"score": 1.0<br />
},<br />
{<br />
"source": {<br />
"value": "ca2a8f3bf186491facde30cdb2fbc2b6",<br />
"type": "resource",<br />
"group": ""<br />
},<br />
"relation": {<br />
"label": "",<br />
"type": "ENTITY"<br />
},<br />
"destination": {<br />
"value": "Australia",<br />
"type": "entity",<br />
"group": "GPE"<br />
},<br />
"metadata": {<br />
"field_id": "ca2a8f3bf186491facde30cdb2fbc2b6/t/body",<br />
"para<br />
... (truncated)</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | GraphSearchResponse | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /kb/{kbid}/graph/nodes**

Search Knowledge Box graph nodes · roles: READER

Search on the Knowledge Box graph and retrieve nodes (vertices)

**Parameters**

| **Name**        | **In** | **Type**           | **Req** | **Description** |
|-----------------|--------|--------------------|---------|-----------------|
| kbid            | path   | string             | yes     |                 |
| x-ndb-client    | header | NucliaDBClientType |         |                 |
| x-nucliadb-user | header | string             |         |                 |
| x-forwarded-for | header | string             |         |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| top_k | integer |  | 50 |  |
| filter_expression | GraphFilterExpression \| null |  |  | Returns only relations from documents that match this filter expression.Filtering examples can be found here: (see docs) |
| security | RequestSecurity \| null |  |  | Security metadata for the request. Please refer to the documentation for more details on how security works: (see docs) |
| show_hidden | boolean |  | False | If set to false (default), excludes hidden resources from search |
| query | And_GraphNodesQuery\_ \| Or_GraphNodesQuery\_ \| Not_GraphNodesQuery\_ \| AnyNode \| nucliadb_models\_\_graph\_\_requests\_\_Generated | yes |  |  |

**Example** — a real call captured against the live sandbox:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/graph/nodes" \<br />
-H "Authorization: Bearer $KB_API_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"query": {<br />
"prop": "node"<br />
},<br />
"top_k": 5<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Response:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>{<br />
"nodes": [<br />
{<br />
"value": "Private Knowledge Box",<br />
"type": "entity",<br />
"group": "ORG",<br />
"score": 1.037416696548462<br />
},<br />
{<br />
"value": "Enterprise Knowledge Management",<br />
"type": "entity",<br />
"group": "ORG",<br />
"score": 1.037416696548462<br />
},<br />
{<br />
"value": "Progress",<br />
"type": "entity",<br />
"group": "ORG",<br />
"score": 1.037416696548462<br />
},<br />
{<br />
"value": "90-day",<br />
"type": "entity",<br />
"group": "DATE",<br />
"score": 1.037416696548462<br />
},<br />
{<br />
"value": "2026",<br />
"type": "entity",<br />
"group": "DATE",<br />
"score": 1.037416696548462<br />
}<br />
]<br />
}</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**               | **Description**     |
|------------|--------------------------|---------------------|
| 200        | GraphNodesSearchResponse | Successful Response |
| 422        | HTTPValidationError      | Validation Error    |

**POST /kb/{kbid}/graph/relations**

Search Knowledge Box graph relations · roles: READER

Search on the Knowledge Box graph and retrieve relations (edges)

**Parameters**

| **Name**        | **In** | **Type**           | **Req** | **Description** |
|-----------------|--------|--------------------|---------|-----------------|
| kbid            | path   | string             | yes     |                 |
| x-ndb-client    | header | NucliaDBClientType |         |                 |
| x-nucliadb-user | header | string             |         |                 |
| x-forwarded-for | header | string             |         |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| top_k | integer |  | 50 |  |
| filter_expression | GraphFilterExpression \| null |  |  | Returns only relations from documents that match this filter expression.Filtering examples can be found here: (see docs) |
| security | RequestSecurity \| null |  |  | Security metadata for the request. Please refer to the documentation for more details on how security works: (see docs) |
| show_hidden | boolean |  | False | If set to false (default), excludes hidden resources from search |
| query | And_GraphRelationsQuery\_ \| Or_GraphRelationsQuery\_ \| Not_GraphRelationsQuery\_ \| Relation-Input \| nucliadb_models\_\_graph\_\_requests\_\_Generated | yes |  |  |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/graph/relations" \<br />
-H "Authorization: Bearer $KB_API_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"query": {<br />
"operands": [<br />
{}<br />
]<br />
},<br />
"top_k": 50,<br />
"show_hidden": false<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**                   | **Description**     |
|------------|------------------------------|---------------------|
| 200        | GraphRelationsSearchResponse | Successful Response |
| 422        | HTTPValidationError          | Validation Error    |

**GET /kb/{kbid}/predict/{endpoint}**

Predict API Proxy · roles: READER

Convenience endpoint that proxies requests to the Predict API. It adds
the Knowledge Box configuration settings as headers to the predict API
request. Refer to the Predict API documentation for more details about
the request and response models: (see docs)

**Parameters**

| **Name**        | **In** | **Type**                | **Req** | **Description** |
|-----------------|--------|-------------------------|---------|-----------------|
| kbid            | path   | string                  | yes     |                 |
| endpoint        | path   | PredictProxiedEndpoints | yes     |                 |
| x-nucliadb-user | header | string                  |         |                 |
| x-ndb-client    | header | NucliaDBClientType      |         |                 |
| x-forwarded-for | header | string                  |         |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/predict/{endpoint}"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /kb/{kbid}/predict/{endpoint}**

Predict API Proxy · roles: READER

Convenience endpoint that proxies requests to the Predict API. It adds
the Knowledge Box configuration settings as headers to the predict API
request. Refer to the Predict API documentation for more details about
the request and response models: (see docs)

**Parameters**

| **Name**        | **In** | **Type**                | **Req** | **Description** |
|-----------------|--------|-------------------------|---------|-----------------|
| kbid            | path   | string                  | yes     |                 |
| endpoint        | path   | PredictProxiedEndpoints | yes     |                 |
| x-nucliadb-user | header | string                  |         |                 |
| x-ndb-client    | header | NucliaDBClientType      |         |                 |
| x-forwarded-for | header | string                  |         |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/predict/{endpoint}"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /kb/{kbid}/resource/{rid}/ask**

Ask a resource (by id) · roles: READER

Ask questions to a resource

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kbid | path | string | yes |  |
| rid | path | string | yes |  |
| x-show-consumption | header | boolean |  |  |
| x-ndb-client | header | NucliaDBClientType |  |  |
| x-nucliadb-user | header | string |  |  |
| x-forwarded-for | header | string |  |  |
| x-synchronous | header | boolean |  | When set to true, outputs response as JSON in a non-streaming way. This is slower and requires waiting for entire answer to be ready. |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| audit_metadata | map\<string, string\> \| null |  |  | A dictionary containing optional audit-specific metadata, such as userid, environment, or other contextual information. This metadata can be leveraged for filtering and analyzing activity logs in futu… |
| query | string | yes |  | The query to get a generative answer for |
| top_k | integer |  | 20 | The top most relevant results to fetch at the retrieval step. The maximum number of results allowed is 200. |
| filter_expression | FilterExpression \| null |  |  | Returns only documents that match this filter expression.Filtering examples can be found here: (see docs) This allows building complex filtering expressions and replaces the following parameters:field… |
| fields | array\<string\> |  | \[\] | The list of fields to search in. For instance: a/title to search only on title field. For more details on filtering by field, see: (see docs) |
| filters | array\<string\> \| array\<Filter\> |  | \[\] | The list of filters to apply. Filtering examples can be found here: (see docs) |
| keyword_filters | array\<string\> \| array\<Filter\> |  | \[\] | List of keyword filter expressions to apply to the retrieval step. The text block search will only be performed on the documents that contain the specified keywords. The filters are case-insensitive, … |
| vectorset | string \| null |  |  | Vectors index to perform the search in. If not provided, NucliaDB will use the default one |
| min_score | number \| MinScore \| null |  |  | Minimum score to filter search results. Results with a lower score will be ignored. Accepts either a float or a dictionary with the minimum scores for the bm25 and vector indexes. If a float is provid… |
| features | array\<ChatOptions\> |  | \['semantic', 'keyword'\] | Features enabled for the chat endpoint. Semantic search is done if semantic is included. If keyword is included, the results will include matching paragraphs from the bm25 index. If relations is inclu… |
| range_creation_start | string \| null |  |  | Resources created before this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53:00+05:00. |
| range_creation_end | string \| null |  |  | Resources created after this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53:00+05:00. |
| range_modification_start | string \| null |  |  | Resources modified before this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53:00+05:00. |
| range_modification_end | string \| null |  |  | Resources modified after this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53:00+05:00. |
| show | array\<ResourceProperties\> |  | \['basic'\] | Controls which types of metadata are serialized on resources of search results |
| field_type_filter | array\<FieldTypeName\> |  | \['text', 'file', 'link', 'conversation', 'generic', 'key_value'\] | Define which field types are serialized on resources of search results |
| extracted | array\<ExtractedDataTypeName\> |  | \[\] | \[Deprecated\] Please use GET resource endpoint instead to get extracted metadata |
| context | array\<ChatContextMessage\> \| null |  |  | DEPRECATED! Please, use chathistory instead. |
| chat_history | array\<ChatContextMessage\> \| null |  |  | Use to rephrase the new LLM query by taking into account the chat conversation history. This will be passed to the LLM so that it is aware of the previous conversation. |
| extra_context | array\<string\> \| null |  |  | Additional context that is added to the retrieval context sent to the LLM. It allows extending the chat feature with content that may not be in the Knowledge Box. |
| extra_context_images | array\<Image\> \| null |  |  | Additional images added to the retrieval context sent to the LLM." It allows extending the chat feature with content that may not be in the Knowledge Box. |
| query_image | Image \| null |  |  | Image that will be used together with the query text for retrieval and then sent to the LLM as part of the context. If a query image is provided, the extracontextimages and ragimagesstrategies will be… |
| highlight | boolean |  | False | If set to true, the query terms will be highlighted in the results between \<mark\>...\</mark\> tags |
| resource_filters | array\<string\> |  | \[\] | List of resource ids to filter search results for. Only paragraphs from the specified resources will be returned. |
| prompt | string \| CustomPrompt \| null |  |  | Use to customize the prompts given to the generative model. Both system and user prompts can be customized. If a string is provided, it is interpreted as the user prompt. |
| rank_fusion | RankFusionName \| ReciprocalRankFusion |  | rrf | Rank fusion algorithm to use to merge results from multiple retrievers (keyword, semantic) |
| reranker | RerankerName \| PredictReranker |  | predict | Reranker let you specify which method you want to use to rerank your results at the end of retrieval |
| citations | boolean \| CitationsType \| null |  |  | Whether to include citations in the response. If set to None or False, no citations will be computed. If set to True or 'default', citations will be computed after answer generation and send as a sepa… |
| citation_threshold | number \| null |  |  | If citations is set to True or 'default', this will be the similarity threshold. Value between 0 and 1, lower values will produce more citations. If not set, it will be set to the optimized threshold … |
| security | RequestSecurity \| null |  |  | Security metadata for the request. Please refer to the documentation for more details on how security works: (see docs) |
| show_hidden | boolean |  | False | If set to false (default), excludes hidden resources from search |
| rag_strategies | array\<FieldExtensionStrategy \| FullResourceStrategy \| HierarchyResourceStrategy \| NeighbouringParagraphsStrategy \| MetadataExtensionStrategy \| ConversationalStrategy \| PreQueriesStrategy \| GraphStrategy\> |  | \[\] | Options for tweaking how the context for the LLM model is crafted: - fullresource will add the full text of the matching resources to the context. This strategy cannot be combined with hierarchy, neig… |
| rag_images_strategies | array\<PageImageStrategy \| ParagraphImageStrategy \| TableImageStrategy\> |  | \[\] | Options for tweaking how the image based context for the LLM model is crafted: - pageimage will add the full page image of the matching resources to the context. - tables will send the table images fo… |
| debug | boolean |  | False | If set, the response will include some extra metadata for debugging purposes, like the list of queried nodes. |
| generative_model | string \| null |  |  | The generative model to use for the chat endpoint. If not provided, the model configured for the Knowledge Box is used. |
| generative_model_seed | integer \| null |  |  | The seed to use for the generative model for deterministic generation. Only supported by some models. |
| max_tokens | integer \| MaxTokens \| null |  |  | Use to limit the amount of tokens used in the LLM context and/or for generating the answer. If not provided, the default maximum tokens of the generative model will be used. If an integer is provided,… |
| rephrase | boolean |  | False | Rephrase the query for a more efficient retrieval. This will consume LLM tokens and make the request slower. |
| chat_history_relevance_threshold | number \| null |  |  | Threshold to determine if the past chat history is relevant to rephrase the user's question. 0 - Always treat previous messages as relevant (always rephrase).1 - Always treat previous messages as irre… |
| prefer_markdown | boolean |  | False | If set to true, the response will be in markdown format |
| answer_json_schema | object (free-form map) \| null |  |  | Desired JSON schema for the LLM answer. This schema is passed to the LLM so that it answers in a scructured format following the schema. If not provided, textual response is returned. Note that when u… |
| generate_answer | boolean |  | True | Whether to generate an answer using the generative model. If set to false, the response will only contain the retrieval results. |
| search_configuration | string \| null |  |  | Load ask parameters from this configuration. Parameters in the request override parameters from the configuration. |
| reasoning | Reasoning \| boolean |  | False | Reasoning options for the generative model. Set to True to enable default reasoning, False to disable, or provide a Reasoning object for custom options. |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/resource/$RID/ask"
\<br />
-H "Authorization: Bearer $KB_API_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"query": "your question here",<br />
"top_k": 20,<br />
"fields": [],<br />
"features": [<br />
"semantic",<br />
"keyword"<br />
],<br />
"show": [<br />
"basic"<br />
],<br />
"field_type_filter": [<br />
"text",<br />
"file",<br />
"link",<br />
"conversation",<br />
"generic",<br />
"key_value"<br />
]<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | SyncAskResponse     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /kb/{kbid}/resource/{rid}/search**

Search on Resource · roles: READER

Search on a single resource

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kbid | path | string | yes |  |
| rid | path | string | yes |  |
| query | query | string | yes |  |
| filter_expression | query | string \| null |  | Returns only documents that match this filter expression.Filtering examples can be found here: (see docs) This allows building complex filtering expre… |
| fields | query | array\<string\> |  | The list of fields to search in. For instance: a/title to search only on title field. For more details on filtering by field, see: (see docs) |
| filters | query | array\<string\> |  | The list of filters to apply. Filtering examples can be found here: (see docs) |
| faceted | query | array\<string\> |  | The list of facets to calculate. The facets follow the same syntax as filters: (see docs) |
| sort_field | query | SortField \| null |  | Field to sort results with (Score not supported in catalog) |
| sort_order | query | SortOrder |  | Order to sort results with |
| top_k | query | integer \| null |  | The number of results search should return. The maximum number of results allowed is 200. |
| range_creation_start | query | string \| null |  | Resources created before this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:5… |
| range_creation_end | query | string \| null |  | Resources created after this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53… |
| range_modification_start | query | string \| null |  | Resources modified before this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:… |
| range_modification_end | query | string \| null |  | Resources modified after this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:5… |
| highlight | query | boolean |  | If set to true, the query terms will be highlighted in the results between \<mark\>...\</mark\> tags |
| debug | query | boolean |  | If set, the response will include some extra metadata for debugging purposes, like the list of queried nodes. |
| x-ndb-client | header | NucliaDBClientType |  |  |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/resource/$RID/search"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**            | **Description**     |
|------------|-----------------------|---------------------|
| 200        | ResourceSearchResults | Successful Response |
| 422        | HTTPValidationError   | Validation Error    |

**GET /kb/{kbid}/search**

Search Knowledge Box · roles: READER

Search on a Knowledge Box and retrieve separate results for documents,
paragraphs, and sentences. Usually, it is better to use find

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kbid | path | string | yes |  |
| query | query | string |  | The query to search for |
| filter_expression | query | string \| null |  | Returns only documents that match this filter expression.Filtering examples can be found here: (see docs) This allows building complex filtering expre… |
| fields | query | array\<string\> |  | The list of fields to search in. For instance: a/title to search only on title field. For more details on filtering by field, see: (see docs) |
| filters | query | array\<string\> |  | The list of filters to apply. Filtering examples can be found here: (see docs) |
| faceted | query | array\<string\> |  | The list of facets to calculate. The facets follow the same syntax as filters: (see docs) |
| sort_field | query | SortField |  | Field to sort results with (Score not supported in catalog) |
| sort_order | query | SortOrder |  | Order to sort results with |
| top_k | query | integer |  | The number of results search should return. The maximum number of results allowed is 200. |
| offset | query | integer |  | The number of results to skip, starting from the beginning in sort order. Used for pagination. It can only be used with the keyword and fulltext index… |
| min_score | query | number \| null |  | Minimum similarity score to filter vector index results. If not specified, the default minimum score of the semantic model associated to the Knowledge… |
| min_score_semantic | query | number \| null |  | Minimum semantic similarity score to filter vector index results. If not specified, the default minimum score of the semantic model associated to the … |
| min_score_bm25 | query | number |  | Minimum bm25 score to filter paragraph and document index results |
| vectorset | query | string \| null |  | Vectors index to perform the search in. If not provided, NucliaDB will use the default one |
| range_creation_start | query | string \| null |  | Resources created before this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:5… |
| range_creation_end | query | string \| null |  | Resources created after this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53… |
| range_modification_start | query | string \| null |  | Resources modified before this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:… |
| range_modification_end | query | string \| null |  | Resources modified after this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:5… |
| features | query | array\<SearchOptions\> |  | List of search features to use. Each value corresponds to a lookup into on of the different indexes |
| debug | query | boolean |  | If set, the response will include some extra metadata for debugging purposes, like the list of queried nodes. |
| highlight | query | boolean |  | If set to true, the query terms will be highlighted in the results between \<mark\>...\</mark\> tags |
| show | query | array\<ResourceProperties\> |  | Controls which types of metadata are serialized on resources of search results |
| field_type | query | array\<FieldTypeName\> |  | Define which field types are serialized on resources of search results |
| extracted | query | array\<ExtractedDataTypeName\> |  | \[Deprecated\] Please use GET resource endpoint instead to get extracted metadata |
| with_duplicates | query | boolean |  | Whether to return duplicate paragraphs on the same document |
| with_synonyms | query | boolean |  | Whether to return matches for custom knowledge box synonyms of the query terms. Note: only supported for keyword and fulltext search options. |
| security_groups | query | array\<string\> \| null |  | List of security groups to filter search results for. Only resources matching the query and containing the specified security groups will be returned.… |
| show_hidden | query | boolean |  | If set to false (default), excludes hidden resources from search |
| x-ndb-client | header | NucliaDBClientType |  |  |
| x-nucliadb-user | header | string |  |  |
| x-forwarded-for | header | string |  |  |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET "https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/search"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**                | **Description**     |
|------------|---------------------------|---------------------|
| 200        | KnowledgeboxSearchResults | Successful Response |
| 422        | HTTPValidationError       | Validation Error    |

**POST /kb/{kbid}/search**

Search Knowledge Box · roles: READER

Search on a Knowledge Box and retrieve separate results for documents,
paragraphs, and sentences. Usually, it is better to use find

**Parameters**

| **Name**        | **In** | **Type**           | **Req** | **Description** |
|-----------------|--------|--------------------|---------|-----------------|
| kbid            | path   | string             | yes     |                 |
| x-ndb-client    | header | NucliaDBClientType |         |                 |
| x-nucliadb-user | header | string             |         |                 |
| x-forwarded-for | header | string             |         |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| audit_metadata | map\<string, string\> \| null |  |  | A dictionary containing optional audit-specific metadata, such as userid, environment, or other contextual information. This metadata can be leveraged for filtering and analyzing activity logs in futu… |
| query | string |  |  | The query to search for |
| filter_expression | FilterExpression \| null |  |  | Returns only documents that match this filter expression.Filtering examples can be found here: (see docs) This allows building complex filtering expressions and replaces the following parameters:field… |
| fields | array\<string\> |  | \[\] | The list of fields to search in. For instance: a/title to search only on title field. For more details on filtering by field, see: (see docs) |
| filters | array\<string\> \| array\<Filter\> |  | \[\] | The list of filters to apply. Filtering examples can be found here: (see docs) |
| top_k | integer |  | 20 | The number of results search should return. The maximum number of results allowed is 200. |
| min_score | number \| MinScore \| null |  |  | Minimum score to filter search results. Results with a lower score will be ignored. Accepts either a float or a dictionary with the minimum scores for the bm25 and vector indexes. If a float is provid… |
| range_creation_start | string \| null |  |  | Resources created before this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53:00+05:00. |
| range_creation_end | string \| null |  |  | Resources created after this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53:00+05:00. |
| range_modification_start | string \| null |  |  | Resources modified before this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53:00+05:00. |
| range_modification_end | string \| null |  |  | Resources modified after this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53:00+05:00. |
| debug | boolean |  | False | If set, the response will include some extra metadata for debugging purposes, like the list of queried nodes. |
| highlight | boolean |  | False | If set to true, the query terms will be highlighted in the results between \<mark\>...\</mark\> tags |
| show | array\<ResourceProperties\> |  | \['basic'\] | Controls which types of metadata are serialized on resources of search results |
| field_type_filter | array\<FieldTypeName\> |  | \['text', 'file', 'link', 'conversation', 'generic', 'key_value'\] | Define which field types are serialized on resources of search results |
| extracted | array\<ExtractedDataTypeName\> |  | \[\] | \[Deprecated\] Please use GET resource endpoint instead to get extracted metadata |
| vector | array\<number\> \| null |  |  | The vector to perform the search with. If not provided, NucliaDB will use Nuclia Predict API to create the vector off from the query. |
| vectorset | string \| null |  |  | Vectors index to perform the search in. If not provided, NucliaDB will use the default one |
| with_duplicates | boolean |  | False | Whether to return duplicate paragraphs on the same document |
| with_synonyms | boolean |  | False | Whether to return matches for custom knowledge box synonyms of the query terms. Note: only supported for keyword and fulltext search options. |
| resource_filters | array\<string\> |  | \[\] | List of resource ids to filter search results for. Only paragraphs from the specified resources will be returned. |
| security | RequestSecurity \| null |  |  | Security metadata for the request. Please refer to the documentation for more details on how security works: (see docs) |
| show_hidden | boolean |  | False | If set to false (default), excludes hidden resources from search |
| rephrase | boolean |  | False | Rephrase the query for a more efficient retrieval. This will consume LLM tokens and make the request slower. |
| rephrase_prompt | string \| null |  |  | Rephrase prompt given to the generative model responsible for rephrasing the query for a more effective retrieval step. This is only used if the rephrase flag is set to true in the request. If not spe… |
| query_image | Image \| null |  |  | Image that will be used together with the query text for retrieval. |
| features | array\<SearchOptions\> |  | \['keyword', 'fulltext', 'semantic'\] | List of search features to use. Each value corresponds to a lookup into on of the different indexes |
| faceted | array\<string\> |  | \[\] | The list of facets to calculate. The facets follow the same syntax as filters: (see docs) |
| sort | SortOptions \| null |  |  | Options for results sorting |
| offset | integer |  | 0 | The number of results to skip, starting from the beginning in sort order. Used for pagination. It can only be used with the keyword and fulltext indexes. |

**Example** — a real call captured against the live sandbox:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST "https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/search"
\<br />
-H "Authorization: Bearer $KB_API_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"query": "battery capacity",<br />
"features": [<br />
"keyword",<br />
"semantic"<br />
],<br />
"top_k": 5<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Response:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>{<br />
"resources": {<br />
"f08c5ae15670407a9256059d4ea3b5a4": {<br />
"id": "f08c5ae15670407a9256059d4ea3b5a4",<br />
"slug": "ev-charging",<br />
"title": "EV Home Charging",<br />
"summary": "",<br />
"icon": "text/plain",<br />
"thumbnail": "",<br />
"metadata": {<br />
"metadata": {},<br />
"language": "en",<br />
"languages": [<br />
"en"<br />
],<br />
"status": "PROCESSED"<br />
},<br />
"usermetadata": {<br />
"classifications": [<br />
{<br />
"labelset": "topic",<br />
"label": "transport",<br />
"cancelled_by_user": false<br />
}<br />
]<br />
},<br />
"fieldmetadata": [],<br />
"computedmetadata": {<br />
"field_classifications": []<br />
},<br />
"created": "2026-07-27T05:24:19.052088",<br />
"modified": "2026-07-27T05:24:19.052103",<br />
"last_seqid": 0,<br />
"last_account_seq": null,<br />
"queue": "private",<br />
"hidden": fal<br />
... (truncated)</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**                | **Description**     |
|------------|---------------------------|---------------------|
| 200        | KnowledgeboxSearchResults | Successful Response |
| 422        | HTTPValidationError       | Validation Error    |

**POST /kb/{kbid}/slug/{slug}/ask**

Ask a resource (by slug) · roles: READER

Ask questions to a resource

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kbid | path | string | yes |  |
| slug | path | string | yes |  |
| x-show-consumption | header | boolean |  |  |
| x-ndb-client | header | NucliaDBClientType |  |  |
| x-nucliadb-user | header | string |  |  |
| x-forwarded-for | header | string |  |  |
| x-synchronous | header | boolean |  | When set to true, outputs response as JSON in a non-streaming way. This is slower and requires waiting for entire answer to be ready. |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| audit_metadata | map\<string, string\> \| null |  |  | A dictionary containing optional audit-specific metadata, such as userid, environment, or other contextual information. This metadata can be leveraged for filtering and analyzing activity logs in futu… |
| query | string | yes |  | The query to get a generative answer for |
| top_k | integer |  | 20 | The top most relevant results to fetch at the retrieval step. The maximum number of results allowed is 200. |
| filter_expression | FilterExpression \| null |  |  | Returns only documents that match this filter expression.Filtering examples can be found here: (see docs) This allows building complex filtering expressions and replaces the following parameters:field… |
| fields | array\<string\> |  | \[\] | The list of fields to search in. For instance: a/title to search only on title field. For more details on filtering by field, see: (see docs) |
| filters | array\<string\> \| array\<Filter\> |  | \[\] | The list of filters to apply. Filtering examples can be found here: (see docs) |
| keyword_filters | array\<string\> \| array\<Filter\> |  | \[\] | List of keyword filter expressions to apply to the retrieval step. The text block search will only be performed on the documents that contain the specified keywords. The filters are case-insensitive, … |
| vectorset | string \| null |  |  | Vectors index to perform the search in. If not provided, NucliaDB will use the default one |
| min_score | number \| MinScore \| null |  |  | Minimum score to filter search results. Results with a lower score will be ignored. Accepts either a float or a dictionary with the minimum scores for the bm25 and vector indexes. If a float is provid… |
| features | array\<ChatOptions\> |  | \['semantic', 'keyword'\] | Features enabled for the chat endpoint. Semantic search is done if semantic is included. If keyword is included, the results will include matching paragraphs from the bm25 index. If relations is inclu… |
| range_creation_start | string \| null |  |  | Resources created before this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53:00+05:00. |
| range_creation_end | string \| null |  |  | Resources created after this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53:00+05:00. |
| range_modification_start | string \| null |  |  | Resources modified before this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53:00+05:00. |
| range_modification_end | string \| null |  |  | Resources modified after this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53:00+05:00. |
| show | array\<ResourceProperties\> |  | \['basic'\] | Controls which types of metadata are serialized on resources of search results |
| field_type_filter | array\<FieldTypeName\> |  | \['text', 'file', 'link', 'conversation', 'generic', 'key_value'\] | Define which field types are serialized on resources of search results |
| extracted | array\<ExtractedDataTypeName\> |  | \[\] | \[Deprecated\] Please use GET resource endpoint instead to get extracted metadata |
| context | array\<ChatContextMessage\> \| null |  |  | DEPRECATED! Please, use chathistory instead. |
| chat_history | array\<ChatContextMessage\> \| null |  |  | Use to rephrase the new LLM query by taking into account the chat conversation history. This will be passed to the LLM so that it is aware of the previous conversation. |
| extra_context | array\<string\> \| null |  |  | Additional context that is added to the retrieval context sent to the LLM. It allows extending the chat feature with content that may not be in the Knowledge Box. |
| extra_context_images | array\<Image\> \| null |  |  | Additional images added to the retrieval context sent to the LLM." It allows extending the chat feature with content that may not be in the Knowledge Box. |
| query_image | Image \| null |  |  | Image that will be used together with the query text for retrieval and then sent to the LLM as part of the context. If a query image is provided, the extracontextimages and ragimagesstrategies will be… |
| highlight | boolean |  | False | If set to true, the query terms will be highlighted in the results between \<mark\>...\</mark\> tags |
| resource_filters | array\<string\> |  | \[\] | List of resource ids to filter search results for. Only paragraphs from the specified resources will be returned. |
| prompt | string \| CustomPrompt \| null |  |  | Use to customize the prompts given to the generative model. Both system and user prompts can be customized. If a string is provided, it is interpreted as the user prompt. |
| rank_fusion | RankFusionName \| ReciprocalRankFusion |  | rrf | Rank fusion algorithm to use to merge results from multiple retrievers (keyword, semantic) |
| reranker | RerankerName \| PredictReranker |  | predict | Reranker let you specify which method you want to use to rerank your results at the end of retrieval |
| citations | boolean \| CitationsType \| null |  |  | Whether to include citations in the response. If set to None or False, no citations will be computed. If set to True or 'default', citations will be computed after answer generation and send as a sepa… |
| citation_threshold | number \| null |  |  | If citations is set to True or 'default', this will be the similarity threshold. Value between 0 and 1, lower values will produce more citations. If not set, it will be set to the optimized threshold … |
| security | RequestSecurity \| null |  |  | Security metadata for the request. Please refer to the documentation for more details on how security works: (see docs) |
| show_hidden | boolean |  | False | If set to false (default), excludes hidden resources from search |
| rag_strategies | array\<FieldExtensionStrategy \| FullResourceStrategy \| HierarchyResourceStrategy \| NeighbouringParagraphsStrategy \| MetadataExtensionStrategy \| ConversationalStrategy \| PreQueriesStrategy \| GraphStrategy\> |  | \[\] | Options for tweaking how the context for the LLM model is crafted: - fullresource will add the full text of the matching resources to the context. This strategy cannot be combined with hierarchy, neig… |
| rag_images_strategies | array\<PageImageStrategy \| ParagraphImageStrategy \| TableImageStrategy\> |  | \[\] | Options for tweaking how the image based context for the LLM model is crafted: - pageimage will add the full page image of the matching resources to the context. - tables will send the table images fo… |
| debug | boolean |  | False | If set, the response will include some extra metadata for debugging purposes, like the list of queried nodes. |
| generative_model | string \| null |  |  | The generative model to use for the chat endpoint. If not provided, the model configured for the Knowledge Box is used. |
| generative_model_seed | integer \| null |  |  | The seed to use for the generative model for deterministic generation. Only supported by some models. |
| max_tokens | integer \| MaxTokens \| null |  |  | Use to limit the amount of tokens used in the LLM context and/or for generating the answer. If not provided, the default maximum tokens of the generative model will be used. If an integer is provided,… |
| rephrase | boolean |  | False | Rephrase the query for a more efficient retrieval. This will consume LLM tokens and make the request slower. |
| chat_history_relevance_threshold | number \| null |  |  | Threshold to determine if the past chat history is relevant to rephrase the user's question. 0 - Always treat previous messages as relevant (always rephrase).1 - Always treat previous messages as irre… |
| prefer_markdown | boolean |  | False | If set to true, the response will be in markdown format |
| answer_json_schema | object (free-form map) \| null |  |  | Desired JSON schema for the LLM answer. This schema is passed to the LLM so that it answers in a scructured format following the schema. If not provided, textual response is returned. Note that when u… |
| generate_answer | boolean |  | True | Whether to generate an answer using the generative model. If set to false, the response will only contain the retrieval results. |
| search_configuration | string \| null |  |  | Load ask parameters from this configuration. Parameters in the request override parameters from the configuration. |
| reasoning | Reasoning \| boolean |  | False | Reasoning options for the generative model. Set to True to enable default reasoning, False to disable, or provide a Reasoning object for custom options. |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/slug/{slug}/ask" \<br />
-H "Authorization: Bearer $KB_API_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"query": "your question here",<br />
"top_k": 20,<br />
"fields": [],<br />
"features": [<br />
"semantic",<br />
"keyword"<br />
],<br />
"show": [<br />
"basic"<br />
],<br />
"field_type_filter": [<br />
"text",<br />
"file",<br />
"link",<br />
"conversation",<br />
"generic",<br />
"key_value"<br />
]<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | SyncAskResponse     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /kb/{kbid}/suggest**

Suggest on a knowledge box · roles: READER

Suggestions on a knowledge box

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kbid | path | string | yes |  |
| query | query | string | yes | The query to get suggestions for |
| fields | query | array\<string\> |  | The list of fields to search in. For instance: a/title to search only on title field. For more details on filtering by field, see: (see docs) |
| filters | query | array\<string\> |  | The list of filters to apply. Filtering examples can be found here: (see docs) |
| range_creation_start | query | string \| null |  | Resources created before this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:5… |
| range_creation_end | query | string \| null |  | Resources created after this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53… |
| range_modification_start | query | string \| null |  | Resources modified before this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:… |
| range_modification_end | query | string \| null |  | Resources modified after this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:5… |
| features | query | array\<SuggestOptions\> |  | Features enabled for the suggest endpoint. |
| debug | query | boolean |  | If set, the response will include some extra metadata for debugging purposes, like the list of queried nodes. |
| highlight | query | boolean |  | If set to true, the query terms will be highlighted in the results between \<mark\>...\</mark\> tags |
| show_hidden | query | boolean |  | If set to false (default), excludes hidden resources from search |
| security_groups | query | array\<string\> \| null |  | List of security groups to filter search results for. Only resources matching the query and containing the specified security groups will be returned.… |

**Example** — a real call captured against the live sandbox:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET "https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/suggest"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Response:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>{<br />
"paragraphs": {<br />
"results": [<br />
{<br />
"score": 0.5418849587440491,<br />
"rid": "f08c5ae15670407a9256059d4ea3b5a4",<br />
"field_type": "t",<br />
"field": "body",<br />
"text": "An electric vehicle can be charged at home using a 7kW
single-phase wallbox or a 22kW three-phase charger. Charging overnight
from rooftop solar and battery reduces running costs dramatically. Smart
chargers support scheduled charging aligned to cheap tariff windows and
solar surplus.",<br />
"labels": [<br />
"topic/transport"<br />
],<br />
"start_seconds": null,<br />
"end_seconds": null,<br />
"position": {<br />
"page_number": 0,<br />
"index": 0,<br />
"start": 0,<br />
"end": 285<br />
}<br />
},<br />
{<br />
"score": 0.5418849587440491,<br />
"rid": "86b5f7948b144b008f018cbd47a2bde4",<br />
"field_type": "t",<br />
"field": "body",<br />
"<br />
... (truncated)</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**                 | **Description**     |
|------------|----------------------------|---------------------|
| 200        | KnowledgeboxSuggestResults | Successful Response |
| 422        | HTTPValidationError        | Validation Error    |

**POST /kb/{kbid}/suggest**

Suggest on a knowledge box · roles: READER

Suggestions on a knowledge box

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| query | string | yes |  | The query to get suggestions for |
| features | array\<SuggestOptions\> |  | \['paragraph', 'entities'\] | Features enabled for the suggest endpoint. |
| filter_expression | FilterExpression \| null |  |  | Returns only documents that match this filter expression.Filtering examples can be found here: (see docs) This allows building complex filtering expressions and replaces the following parameters:field… |
| security | RequestSecurity \| null |  |  | Security metadata for the request. Please refer to the documentation for more details on how security works: (see docs) |
| show_hidden | boolean |  | False | If set to false (default), excludes hidden resources from search |
| highlight | boolean |  | False | If set to true, the query terms will be highlighted in the results between \<mark\>...\</mark\> tags |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST "https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/suggest"
\<br />
-H "Authorization: Bearer $KB_API_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"query": "your question here",<br />
"features": [<br />
"paragraph",<br />
"entities"<br />
],<br />
"show_hidden": false,<br />
"highlight": false<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**                 | **Description**     |
|------------|----------------------------|---------------------|
| 200        | KnowledgeboxSuggestResults | Successful Response |
| 422        | HTTPValidationError        | Validation Error    |

**POST /kb/{kbid}/summarize**

Summarize your documents · roles: READER

**Parameters**

| **Name**           | **In** | **Type** | **Req** | **Description** |
|--------------------|--------|----------|---------|-----------------|
| kbid               | path   | string   | yes     |                 |
| x-show-consumption | header | boolean  |         |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| generative_model | string \| null |  |  | The generative model to use for the summarization. If not provided, the model configured for the Knowledge Box is used. |
| user_prompt | string \| null |  |  | Optional custom prompt input by the user |
| resources | array\<string\> | yes |  | Uids or slugs of the resources to summarize. If the resources are not found, they will be ignored. |
| summary_kind | SummaryKind |  | simple | Option to customize how the summary will be |

**Example** — a real call captured against the live sandbox:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/summarize" \<br />
-H "Authorization: Bearer $KB_API_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"resources": [<br />
"ca2a8f3bf186491facde30cdb2fbc2b6",<br />
"86b5f7948b144b008f018cbd47a2bde4"<br />
]<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Response:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>{<br />
"resources": {<br />
"ca2a8f3bf186491facde30cdb2fbc2b6": {<br />
"summary": "Photovoltaic solar panels convert sunlight into direct
current (DC) electricity, which is then converted to alternating current
(AC) by inverters. In Australia, residential rooftop systems typically
range from 5kW to 10kW. Certified installers by the Clean Energy Council
ensure proper installation. Payback periods range from 4 to 7 years,
influenced by feed-in tariffs.",<br />
"tokens": 104<br />
},<br />
"86b5f7948b144b008f018cbd47a2bde4": {<br />
"summary": "Home battery systems, like lithium-iron-phosphate (LFP)
batteries, store excess solar energy for nighttime use, offering 10kWh
capacity and about 6000 cycles. They can provide blackout protection
with a compatible hybrid inverter. Starting July 2025, the federal
Cheaper Home Batteries program will subsidize installations.",<br />
"tokens": 109<br />
}<br />
},<br />
"<br />
... (truncated)</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | SummarizedResponse  | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**Models (6)**

**GET /kb/{kbid}/configuration**

Get Knowledge Box models configuration · roles: READER, MANAGER

Current configuration of models assigned to a Knowledge Box

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |

**Example** — a real call captured against the live sandbox:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/configuration" \<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Response:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>{<br />
"resource_labelers_models": null,<br />
"paragraph_labelers_models": null,<br />
"intent_models": null,<br />
"visual_labeling": "disabled",<br />
"ner_model": "multilingual",<br />
"relation_model": "base",<br />
"anonymization_model": "disabled",<br />
"semantic_model": "multilingual-2024-05-06",<br />
"semantic_models": [<br />
"multilingual-2024-05-06"<br />
],<br />
"default_semantic_model": "multilingual-2024-05-06",<br />
"semantic_graph_node_models": [],<br />
"default_semantic_graph_node_model": null,<br />
"semantic_graph_edge_models": [],<br />
"default_semantic_graph_edge_model": null,<br />
"semantic_vector_similarity": "DOT",<br />
"semantic_vector_size": 1024,<br />
"semantic_matryoshka_dims": [],<br />
"semantic_threshold": 0.4,<br />
"generative_model": "chatgpt-azure-4o",<br />
"user_keys": null,<br />
"user_prompts": null,<br />
"summary": "simple",<br />
"summary_model": "chatgpt-azure-4o",<br />
"summary_prompt": null,<br />
"prefer_markdown_generative_response":<br />
... (truncated)</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /kb/{kbid}/generative_providers**

Available models for a knowledge box · roles: READER, MANAGER

Get all available models for a knowledge box grouped by provider

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/generative_providers"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /kb/{kbid}/model/{model_id}**

Get model metadata · roles: READER, MANAGER

Get metadata for a particular model

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |
| model_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/model/{model_id}" \<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /kb/{kbid}/models**

Get available models · roles: READER, MANAGER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |

**Example** — a real call captured against the live sandbox:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET "https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/models"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Response:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>{<br />
"available": {},<br />
"trained": {}<br />
}</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /kb/{kbid}/models/{model_id}/{filename}**

Download the Knowledege Box model · roles: READER, MANAGER

Download the trained model or any other generated file as a result of a
training task on a Knowledge Box.

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |
| model_id | path   | string   | yes     |                 |
| filename | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/models/{model_id}/{filename}"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /kb/{kbid}/schema**

Learning configuration schema · roles: READER, MANAGER

Get jsonschema definition to update the learningconfiguration of your
Knowledge Box

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET "https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/schema"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**Knowledge Box Services (21)**

**GET /kb/{kbid}/custom-synonyms**

Get Knowledge Box Custom Synonyms · roles: READER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |

**Example** — a real call captured against the live sandbox:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/custom-synonyms" \<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Response:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>{<br />
"synonyms": {<br />
"ev": [<br />
"electric vehicle"<br />
],<br />
"pv": [<br />
"photovoltaic",<br />
"solar"<br />
]<br />
}<br />
}</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**           | **Description**     |
|------------|----------------------|---------------------|
| 200        | KnowledgeBoxSynonyms | Successful Response |
| 422        | HTTPValidationError  | Validation Error    |

**PUT /kb/{kbid}/custom-synonyms**

Set Knowledge Box Custom Synonyms · roles: WRITER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type**                       | **Req** | **Default** | **Description** |
|-----------|--------------------------------|---------|-------------|-----------------|
| synonyms  | map\<string, array\<string\>\> | yes     |             |                 |

**Example** — a real call captured against the live sandbox:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PUT
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/custom-synonyms" \<br />
-H "Authorization: Bearer $KB_API_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"synonyms": {<br />
"pv": [<br />
"photovoltaic",<br />
"solar"<br />
],<br />
"ev": [<br />
"electric vehicle"<br />
]<br />
}<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 204        |                     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**DELETE /kb/{kbid}/custom-synonyms**

Delete Knowledge Box Custom Synonyms · roles: WRITER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/custom-synonyms" \<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 204        |                     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /kb/{kbid}/entitiesgroup/{group}**

Get a Knowledge Box Entities Group · roles: READER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |
| group    | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/entitiesgroup/{group}"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | EntitiesGroup       | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /kb/{kbid}/entitiesgroups**

Get Knowledge Box Entities · roles: READER

**Parameters**

| **Name**      | **In** | **Type** | **Req** | **Description** |
|---------------|--------|----------|---------|-----------------|
| kbid          | path   | string   | yes     |                 |
| show_entities | query  | boolean  |         |                 |

**Example** — a real call captured against the live sandbox:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/entitiesgroups" \<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Response:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>{<br />
"uuid": "$KB",<br />
"groups": {<br />
"ORG": {<br />
"title": "",<br />
"color": "",<br />
"custom": false,<br />
"entities": {}<br />
},<br />
"GPE": {<br />
"title": "",<br />
"color": "",<br />
"custom": false,<br />
"entities": {}<br />
},<br />
"DATE": {<br />
"title": "",<br />
"color": "",<br />
"custom": false,<br />
"entities": {}<br />
},<br />
"TIME": {<br />
"title": "",<br />
"color": "",<br />
"custom": false,<br />
"entities": {}<br />
}<br />
}<br />
}</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**           | **Description**     |
|------------|----------------------|---------------------|
| 200        | KnowledgeBoxEntities | Successful Response |
| 422        | HTTPValidationError  | Validation Error    |

**GET /kb/{kbid}/kv-schemas**

List KV schemas · roles: READER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/kv-schemas" \<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | KBKVSchemas         | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /kb/{kbid}/kv-schemas**

Create KV schema · roles: WRITER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field**   | **Type**               | **Req** | **Default** | **Description** |
|-------------|------------------------|---------|-------------|-----------------|
| id          | string                 | yes     |             |                 |
| description | string                 |         |             |                 |
| fields      | array\<KVSchemaField\> |         |             |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/kv-schemas" \<br />
-H "Authorization: Bearer $KB_API_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"id": "...",<br />
"description": ""<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 201        | KVSchema            | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /kb/{kbid}/kv-schemas/{schema_id}**

Get a KV schema · roles: READER

**Parameters**

| **Name**  | **In** | **Type** | **Req** | **Description** |
|-----------|--------|----------|---------|-----------------|
| kbid      | path   | string   | yes     |                 |
| schema_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/kv-schemas/{schema_id}"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | KVSchema            | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**PUT /kb/{kbid}/kv-schemas/{schema_id}**

Update KV schema · roles: WRITER

**Parameters**

| **Name**  | **In** | **Type** | **Req** | **Description** |
|-----------|--------|----------|---------|-----------------|
| kbid      | path   | string   | yes     |                 |
| schema_id | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| description | string \| null |  |  |  |
| fields | array\<KVSchemaField\> \| null |  |  |  |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PUT
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/kv-schemas/{schema_id}"
\<br />
-H "Authorization: Bearer $KB_API_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | KVSchema            | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**DELETE /kb/{kbid}/kv-schemas/{schema_id}**

Delete KV schema · roles: WRITER

**Parameters**

| **Name**  | **In** | **Type** | **Req** | **Description** |
|-----------|--------|----------|---------|-----------------|
| kbid      | path   | string   | yes     |                 |
| schema_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/kv-schemas/{schema_id}"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 204        |                     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /kb/{kbid}/labelset/{labelset}**

Get a Knowledge Box Label Set · roles: READER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |
| labelset | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/labelset/{labelset}"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**                      |
|------------|---------------------|--------------------------------------|
| 200        | LabelSet            | Successful Response                  |
| 404        |                     | Knowledge Box or Label Set not found |
| 422        | HTTPValidationError | Validation Error                     |

**POST /kb/{kbid}/labelset/{labelset}**

Set Knowledge Box Labels · roles: WRITER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |
| labelset | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| title | string \| null |  |  | Title of the labelset. It is a prettier display name for the labelset shown in the UI but it is not intended to be used for searching. |
| color | string \| null |  | blue |  |
| multiple | boolean |  | True |  |
| kind | array\<LabelSetKind\> |  | \[\] |  |
| labels | array\<nucliadb_models\_\_labels\_\_Label\> |  |  | List of labels in the labelset. The titles of the labels must be unique within the labelset. |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/labelset/{labelset}"
\<br />
-H "Authorization: Bearer $KB_API_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"multiple": true,<br />
"kind": []<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**DELETE /kb/{kbid}/labelset/{labelset}**

Delete Knowledge Box Label · roles: WRITER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |
| labelset | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/labelset/{labelset}"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /kb/{kbid}/labelsets**

Get Knowledge Box Label Sets · roles: READER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |

**Example** — a real call captured against the live sandbox:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET "https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/labelsets"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Response:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>{<br />
"uuid": "$KB",<br />
"labelsets": {<br />
"topic": {<br />
"title": "Topic",<br />
"color": "#ff0000",<br />
"multiple": true,<br />
"kind": [<br />
"RESOURCES"<br />
],<br />
"labels": [<br />
{<br />
"title": "energy",<br />
"related": "",<br />
"text": "",<br />
"uri": ""<br />
},<br />
{<br />
"title": "transport",<br />
"related": "",<br />
"text": "",<br />
"uri": ""<br />
}<br />
]<br />
}<br />
}<br />
}</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | KnowledgeBoxLabels  | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /kb/{kbid}/notifications**

Knowledge Box Notifications Stream · roles: READER

Provides a stream of activity notifications for the given Knowledge Box.
The stream will be automatically closed after 2 minutes.

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/notifications" \<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema** | **Description** |
|----|----|----|
| 200 | object | Each line of the response is a Base64-encoded JSON object representing a notification. Refer to \[the internal documentat… |
| 404 |  | Knowledge Box not found |
| 422 | HTTPValidationError | Validation Error |

**GET /kb/{kbid}/processing-status**

Knowledge Box Processing Status · roles: READER

Provides the status of the processing of the given Knowledge Box.

**Parameters**

| **Name**  | **In** | **Type**        | **Req** | **Description** |
|-----------|--------|-----------------|---------|-----------------|
| kbid      | path   | string          | yes     |                 |
| cursor    | query  | string \| null  |         |                 |
| scheduled | query  | boolean \| null |         |                 |
| limit     | query  | integer         |         |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/processing-status"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**         |
|------------|---------------------|-------------------------|
| 200        | RequestsResults     | Successful Response     |
| 404        |                     | Knowledge Box not found |
| 422        | HTTPValidationError | Validation Error        |

**GET /kb/{kbid}/search_configurations**

List search configurations · roles: READER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/search_configurations"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema** | **Description** |
|----|----|----|
| 200 | map\<string, FindSearchConfiguration \| AskSearchConfiguration\> | Successful Response |
| 422 | HTTPValidationError | Validation Error |

**GET /kb/{kbid}/search_configurations/{config_name}**

Get search configuration · roles: READER

**Parameters**

| **Name**    | **In** | **Type** | **Req** | **Description** |
|-------------|--------|----------|---------|-----------------|
| kbid        | path   | string   | yes     |                 |
| config_name | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/search_configurations/{config_name}"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema** | **Description** |
|----|----|----|
| 200 | FindSearchConfiguration \| AskSearchConfiguration | Successful Response |
| 422 | HTTPValidationError | Validation Error |

**POST /kb/{kbid}/search_configurations/{config_name}**

Create search configuration · roles: OWNER

**Parameters**

| **Name**    | **In** | **Type** | **Req** | **Description** |
|-------------|--------|----------|---------|-----------------|
| kbid        | path   | string   | yes     |                 |
| config_name | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/search_configurations/{config_name}"
\<br />
-H "Authorization: Bearer $KB_API_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"kind": "string",<br />
"config": {<br />
"query": "",<br />
"fields": [],<br />
"top_k": 20,<br />
"debug": false,<br />
"highlight": false,<br />
"show": [<br />
"basic"<br />
]<br />
}<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 201        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**PATCH /kb/{kbid}/search_configurations/{config_name}**

Update search configuration · roles: OWNER

**Parameters**

| **Name**    | **In** | **Type** | **Req** | **Description** |
|-------------|--------|----------|---------|-----------------|
| kbid        | path   | string   | yes     |                 |
| config_name | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PATCH
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/search_configurations/{config_name}"
\<br />
-H "Authorization: Bearer $KB_API_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"kind": "string",<br />
"config": {<br />
"query": "",<br />
"fields": [],<br />
"top_k": 20,<br />
"debug": false,<br />
"highlight": false,<br />
"show": [<br />
"basic"<br />
]<br />
}<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**DELETE /kb/{kbid}/search_configurations/{config_name}**

Delete search configuration · roles: OWNER

**Parameters**

| **Name**    | **In** | **Type** | **Req** | **Description** |
|-------------|--------|----------|---------|-----------------|
| kbid        | path   | string   | yes     |                 |
| config_name | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/search_configurations/{config_name}"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 204        |                     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**Extract Strategies (4)**

**GET /kb/{kbid}/extract_strategies**

Learning extract strategies · roles: READER, MANAGER

Get available extract strategies

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |

**Example** — a real call captured against the live sandbox:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/extract_strategies"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Response:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>{}</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**                   | **Description**     |
|------------|------------------------------|---------------------|
| 200        | map\<string, ExtractConfig\> | Successful Response |
| 422        | HTTPValidationError          | Validation Error    |

**POST /kb/{kbid}/extract_strategies**

Add a extract strategy to a KB · roles: MANAGER, OWNER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field**   | **Type**                     | **Req** | **Default** | **Description** |
|-------------|------------------------------|---------|-------------|-----------------|
| name        | string                       |         |             |                 |
| vllm_config | VLLMExtractionConfig \| null |         |             |                 |
| ai_tables   | AITables \| null             |         |             |                 |
| split       | SplitConfig \| null          |         |             |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/extract_strategies"
\<br />
-H "Authorization: Bearer $KB_API_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"name": ""<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | string              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /kb/{kbid}/extract_strategies/strategy/{strategy_id}**

Extract strategy configuration · roles: READER, MANAGER

Get extract strategy for a given id

**Parameters**

| **Name**    | **In** | **Type** | **Req** | **Description** |
|-------------|--------|----------|---------|-----------------|
| kbid        | path   | string   | yes     |                 |
| strategy_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/extract_strategies/strategy/{strategy_id}"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**DELETE /kb/{kbid}/extract_strategies/strategy/{strategy_id}**

Remove a extract strategy from a KB · roles: MANAGER, OWNER

Removes a extract strategy from a KB

**Parameters**

| **Name**    | **In** | **Type** | **Req** | **Description** |
|-------------|--------|----------|---------|-----------------|
| kbid        | path   | string   | yes     |                 |
| strategy_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/extract_strategies/strategy/{strategy_id}"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 204        |                     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**Resource field TUS uploads (6)**

**POST /kb/{kbid}/resource/{path_rid}/file/{field}/tusupload**

Create new upload on a Resource (by id) · roles: WRITER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kbid | path | string | yes |  |
| path_rid | path | string | yes |  |
| field | path | string | yes |  |
| x-extract-strategy | header | string \| null |  | Extract strategy to use when uploading a file. If not provided, the default strategy will be used. |
| x-split-strategy | header | string \| null |  | Split strategy to use when uploading a file. If not provided, the default strategy will be used. |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/resource/{path_rid}/file/{field}/tusupload"
\<br />
-H "Authorization: Bearer $KB_API_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**HEAD
/kb/{kbid}/resource/{path_rid}/file/{field}/tusupload/{upload_id}**

Upload information · roles: WRITER

**Parameters**

| **Name**  | **In** | **Type** | **Req** | **Description** |
|-----------|--------|----------|---------|-----------------|
| kbid      | path   | string   | yes     |                 |
| path_rid  | path   | string   | yes     |                 |
| field     | path   | string   | yes     |                 |
| upload_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X HEAD
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/resource/{path_rid}/file/{field}/tusupload/{upload_id}"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**PATCH /kb/{kbid}/resource/{rid}/file/{field}/tusupload/{upload_id}**

Upload data on a Resource (by id) · roles: WRITER

**Parameters**

| **Name**  | **In** | **Type** | **Req** | **Description** |
|-----------|--------|----------|---------|-----------------|
| kbid      | path   | string   | yes     |                 |
| rid       | path   | string   | yes     |                 |
| field     | path   | string   | yes     |                 |
| upload_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PATCH
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/resource/$RID/file/{field}/tusupload/{upload_id}"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /kb/{kbid}/slug/{rslug}/file/{field}/tusupload**

Create new upload on a Resource (by slug) · roles: WRITER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kbid | path | string | yes |  |
| rslug | path | string | yes |  |
| field | path | string | yes |  |
| x-extract-strategy | header | string \| null |  | Extract strategy to use when uploading a file. If not provided, the default strategy will be used. |
| x-split-strategy | header | string \| null |  | Split strategy to use when uploading a file. If not provided, the default strategy will be used. |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/slug/{rslug}/file/{field}/tusupload"
\<br />
-H "Authorization: Bearer $KB_API_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**PATCH /kb/{kbid}/slug/{rslug}/file/{field}/tusupload/{upload_id}**

Upload data on a Resource (by slug) · roles: WRITER

**Parameters**

| **Name**  | **In** | **Type** | **Req** | **Description** |
|-----------|--------|----------|---------|-----------------|
| kbid      | path   | string   | yes     |                 |
| rslug     | path   | string   | yes     |                 |
| field     | path   | string   | yes     |                 |
| upload_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PATCH
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/slug/{rslug}/file/{field}/tusupload/{upload_id}"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**HEAD /kb/{kbid}/slug/{rslug}/file/{field}/tusupload/{upload_id}**

Upload information · roles: WRITER

**Parameters**

| **Name**  | **In** | **Type** | **Req** | **Description** |
|-----------|--------|----------|---------|-----------------|
| kbid      | path   | string   | yes     |                 |
| rslug     | path   | string   | yes     |                 |
| field     | path   | string   | yes     |                 |
| upload_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X HEAD
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/slug/{rslug}/file/{field}/tusupload/{upload_id}"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**Resource fields (25)**

**POST /kb/{kbid}/resource/{path_rid}/file/{field}/upload**

Upload binary file on a Resource (by id) · roles: WRITER

Upload a file as a field on an existing resource, if the field exists
will return a conflict (419)

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kbid | path | string | yes |  |
| path_rid | path | string | yes |  |
| field | path | string | yes |  |
| x-filename | header | string \| null |  | Name of the file being uploaded. |
| x-password | header | string \| null |  | If the file is password protected, the password must be provided here. |
| x-language | header | string \| null |  |  |
| x-md5 | header | string \| null |  | MD5 hash of the file being uploaded. This is used to check if the file has been uploaded before. |
| x-extract-strategy | header | string \| null |  | Extract strategy to use when uploading a file. If not provided, the default strategy will be used. |
| x-split-strategy | header | string \| null |  | Split strategy to use when uploading a file. If not provided, the default strategy will be used. |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/resource/{path_rid}/file/{field}/upload"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**           | **Description**     |
|------------|----------------------|---------------------|
| 201        | ResourceFileUploaded | Successful Response |
| 422        | HTTPValidationError  | Validation Error    |

**PUT /kb/{kbid}/resource/{rid}/conversation/{field_id}**

Add resource conversation field (by id) · roles: WRITER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |
| rid      | path   | string   | yes     |                 |
| field_id | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| messages | array\<InputMessage\> |  |  | List of messages in the conversation field. Each message must have a unique ident. A single conversation can contain up to 51,200 messages. You can add up to 2,048 messages per request. |
| extract_strategy | string \| null |  |  | Id of the Nuclia extract strategy used at processing time. If not set, the default strategy was used. Extract strategies are defined at the learning configuration api. |
| split_strategy | string \| null |  |  | Id of the Nuclia split strategy used at processing time. If not set, the default strategy was used. Split strategies are defined at the learning configuration api. |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PUT
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/resource/$RID/conversation/{field_id}"
\<br />
-H "Authorization: Bearer $KB_API_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 201        | ResourceFieldAdded  | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET
/kb/{kbid}/resource/{rid}/conversation/{field_id}/download/field/{message_id}/{file_num}**

Download conversation binary field (by id) · roles: READER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kbid | path | string | yes |  |
| rid | path | string | yes |  |
| field_id | path | string | yes |  |
| message_id | path | string | yes |  |
| file_num | path | integer | yes |  |
| range | header | string \| null |  | Standard HTTP Range header that enable multipart requests |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/resource/$RID/conversation/{field_id}/download/field/{message_id}/{file_num}"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**PUT /kb/{kbid}/resource/{rid}/conversation/{field_id}/messages**

Append messages to conversation field (by id) · roles: WRITER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |
| rid      | path   | string   | yes     |                 |
| field_id | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| (array root) | array\<InputMessage\> |  |  |  |
|  timestamp | string \| null |  |  | Time at which the message was sent, in ISO 8601 format. |
|  who | string \| null |  |  | Sender of the message, e.g. 'user' or 'assistant' |
|  to | array\<string\> |  |  | List of recipients of the message, e.g. \['assistant'\] or \['user'\] |
|  content | InputMessageContent | yes |  |  |
|  ident | string | yes |  | Unique identifier for the message. Must be unique within the conversation. |
|  type | MessageType \| null |  |  |  |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PUT
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/resource/$RID/conversation/{field_id}/messages"
\<br />
-H "Authorization: Bearer $KB_API_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '[<br />
{<br />
"content": {<br />
"text": "string",<br />
"format": "PLAIN"<br />
},<br />
"ident": "string",<br />
"to": [<br />
"string"<br />
]<br />
}<br />
]'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | ResourceFieldAdded  | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**DELETE
/kb/{kbid}/resource/{rid}/conversation/{field_id}/messages/{message_ident}**

Delete conversation message (by id) · roles: WRITER

Delete a message from a conversation field by its ident. This is a
convenience endpoint intended for occasional deletions — frequent use on
the same conversation may degrade read performance over time. Deleted
message identifiers are permanently reserved and cannot be reused.

**Parameters**

| **Name**      | **In** | **Type** | **Req** | **Description**                    |
|---------------|--------|----------|---------|------------------------------------|
| kbid          | path   | string   | yes     |                                    |
| rid           | path   | string   | yes     |                                    |
| field_id      | path   | string   | yes     |                                    |
| message_ident | path   | string   | yes     | The ident of the message to delete |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/resource/$RID/conversation/{field_id}/messages/{message_ident}"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 204        |                     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**PUT /kb/{kbid}/resource/{rid}/file/{field_id}**

Add resource file field (by id) · roles: WRITER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kbid | path | string | yes |  |
| rid | path | string | yes |  |
| field_id | path | string | yes |  |
| x-skip-store | header | boolean |  | If set to true, file fields will not be saved in the blob storage. They will only be sent to process. |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| language | string \| null |  |  |  |
| password | string \| null |  |  |  |
| file | File | yes |  |  |
| extract_strategy | string \| null |  |  | Id of the Nuclia extract strategy to use at processing time. If not set, the default strategy will be used. Extract strategies are defined at the learning configuration api. |
| split_strategy | string \| null |  |  | Id of the Nuclia split strategy used at processing time. If not set, the default strategy was used. Split strategies are defined at the learning configuration api. |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PUT
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/resource/$RID/file/{field_id}"
\<br />
-H "Authorization: Bearer $KB_API_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"file": {<br />
"content_type": "application/octet-stream"<br />
}<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 201        | ResourceFieldAdded  | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /kb/{kbid}/resource/{rid}/file/{field_id}/download/field**

Download field binary field (by id) · roles: READER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kbid | path | string | yes |  |
| rid | path | string | yes |  |
| field_id | path | string | yes |  |
| inline | query | boolean |  |  |
| range | header | string \| null |  | Standard HTTP Range header that enable multipart requests |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/resource/$RID/file/{field_id}/download/field"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /kb/{kbid}/resource/{rid}/file/{field_id}/reprocess**

Reprocess file field (by id) · roles: WRITER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kbid | path | string | yes |  |
| rid | path | string | yes |  |
| field_id | path | string | yes |  |
| reset_title | query | boolean |  | Reset the title of the resource so that the file or link computed titles are set after processing. |
| x-nucliadb-user | header | string |  |  |
| x-file-password | header | string \| null |  | If a file is password protected, the password must be provided here for the file to be processed |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/resource/$RID/file/{field_id}/reprocess"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 202        | ResourceUpdated     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**PUT /kb/{kbid}/resource/{rid}/link/{field_id}**

Add resource link field (by id) · roles: WRITER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |
| rid      | path   | string   | yes     |                 |
| field_id | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| headers | map\<string, string\> \| null |  | {} |  |
| cookies | map\<string, string\> \| null |  | {} |  |
| uri | string | yes |  |  |
| language | string \| null |  |  |  |
| localstorage | map\<string, string\> \| null |  | {} |  |
| css_selector | string \| null |  |  |  |
| xpath | string \| null |  |  |  |
| extract_strategy | string \| null |  |  | Id of the Nuclia extract strategy to use at processing time. If not set, the default strategy will be used. Extract strategies are defined at the learning configuration api. |
| split_strategy | string \| null |  |  | Id of the Nuclia split strategy used at processing time. If not set, the default strategy was used. Split strategies are defined at the learning configuration api. |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PUT
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/resource/$RID/link/{field_id}"
\<br />
-H "Authorization: Bearer $KB_API_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"uri": "https://example.com"<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 201        | ResourceFieldAdded  | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**PUT /kb/{kbid}/resource/{rid}/text/{field_id}**

Add resource text field (by id) · roles: WRITER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |
| rid      | path   | string   | yes     |                 |
| field_id | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| body | string | yes |  | The text body. The format of the text should be specified in the format field. The sum of all text fields in the request may not exceed 2MB. If you need to store more text, consider using a file field… |
| format | TextFormat |  | PLAIN | The format of the text. |
| extract_strategy | string \| null |  |  | Id of the Nuclia extract strategy to use at processing time. If not set, the default strategy will be used. Extract strategies are defined at the learning configuration api. |
| split_strategy | string \| null |  |  | Id of the Nuclia split strategy used at processing time. If not set, the default strategy was used. Split strategies are defined at the learning configuration api. |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PUT
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/resource/$RID/text/{field_id}"
\<br />
-H "Authorization: Bearer $KB_API_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"body": "string",<br />
"format": "PLAIN"<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 201        | ResourceFieldAdded  | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /kb/{kbid}/resource/{rid}/{field_type}/{field_id}**

Get Resource field (by id) · roles: READER

**Parameters**

| **Name**   | **In** | **Type**                         | **Req** | **Description** |
|------------|--------|----------------------------------|---------|-----------------|
| kbid       | path   | string                           | yes     |                 |
| rid        | path   | string                           | yes     |                 |
| field_type | path   | FieldTypeName                    | yes     |                 |
| field_id   | path   | string                           | yes     |                 |
| show       | query  | array\<ResourceFieldProperties\> |         |                 |
| extracted  | query  | array\<ExtractedDataTypeName\>   |         |                 |
| page       | query  | string or integer                |         |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/resource/$RID/{field_type}/{field_id}"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | ResourceField       | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**DELETE /kb/{kbid}/resource/{rid}/{field_type}/{field_id}**

Delete Resource field (by id) · roles: WRITER

**Parameters**

| **Name**   | **In** | **Type**      | **Req** | **Description** |
|------------|--------|---------------|---------|-----------------|
| kbid       | path   | string        | yes     |                 |
| rid        | path   | string        | yes     |                 |
| field_type | path   | FieldTypeName | yes     |                 |
| field_id   | path   | string        | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/resource/$RID/{field_type}/{field_id}"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 204        |                     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET
/kb/{kbid}/resource/{rid}/{field_type}/{field_id}/download/extracted/{download_field}**

Download extracted binary file (by id) · roles: READER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kbid | path | string | yes |  |
| rid | path | string | yes |  |
| field_type | path | FieldTypeName | yes |  |
| field_id | path | string | yes |  |
| download_field | path | string | yes |  |
| range | header | string \| null |  | Standard HTTP Range header that enable multipart requests |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/resource/$RID/{field_type}/{field_id}/download/extracted/{download_field}"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**PUT /kb/{kbid}/slug/{rslug}/conversation/{field_id}**

Add resource conversation field (by slug) · roles: WRITER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |
| rslug    | path   | string   | yes     |                 |
| field_id | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| messages | array\<InputMessage\> |  |  | List of messages in the conversation field. Each message must have a unique ident. A single conversation can contain up to 51,200 messages. You can add up to 2,048 messages per request. |
| extract_strategy | string \| null |  |  | Id of the Nuclia extract strategy used at processing time. If not set, the default strategy was used. Extract strategies are defined at the learning configuration api. |
| split_strategy | string \| null |  |  | Id of the Nuclia split strategy used at processing time. If not set, the default strategy was used. Split strategies are defined at the learning configuration api. |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PUT
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/slug/{rslug}/conversation/{field_id}"
\<br />
-H "Authorization: Bearer $KB_API_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 201        | ResourceFieldAdded  | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET
/kb/{kbid}/slug/{rslug}/conversation/{field_id}/download/field/{message_id}/{file_num}**

Download conversation binary field (by slug) · roles: READER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kbid | path | string | yes |  |
| rslug | path | string | yes |  |
| field_id | path | string | yes |  |
| message_id | path | string | yes |  |
| file_num | path | integer | yes |  |
| range | header | string \| null |  | Standard HTTP Range header that enable multipart requests |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/slug/{rslug}/conversation/{field_id}/download/field/{message_id}/{file_num}"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**PUT /kb/{kbid}/slug/{rslug}/conversation/{field_id}/messages**

Append messages to conversation field (by slug) · roles: WRITER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |
| rslug    | path   | string   | yes     |                 |
| field_id | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| (array root) | array\<InputMessage\> |  |  |  |
|  timestamp | string \| null |  |  | Time at which the message was sent, in ISO 8601 format. |
|  who | string \| null |  |  | Sender of the message, e.g. 'user' or 'assistant' |
|  to | array\<string\> |  |  | List of recipients of the message, e.g. \['assistant'\] or \['user'\] |
|  content | InputMessageContent | yes |  |  |
|  ident | string | yes |  | Unique identifier for the message. Must be unique within the conversation. |
|  type | MessageType \| null |  |  |  |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PUT
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/slug/{rslug}/conversation/{field_id}/messages"
\<br />
-H "Authorization: Bearer $KB_API_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '[<br />
{<br />
"content": {<br />
"text": "string",<br />
"format": "PLAIN"<br />
},<br />
"ident": "string",<br />
"to": [<br />
"string"<br />
]<br />
}<br />
]'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | ResourceFieldAdded  | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**DELETE
/kb/{kbid}/slug/{rslug}/conversation/{field_id}/messages/{message_ident}**

Delete conversation message (by slug) · roles: WRITER

Delete a message from a conversation field by its ident. This is a
convenience endpoint intended for occasional deletions — frequent use on
the same conversation may degrade read performance over time. Deleted
message identifiers are permanently reserved and cannot be reused.

**Parameters**

| **Name**      | **In** | **Type** | **Req** | **Description**                    |
|---------------|--------|----------|---------|------------------------------------|
| kbid          | path   | string   | yes     |                                    |
| rslug         | path   | string   | yes     |                                    |
| field_id      | path   | string   | yes     |                                    |
| message_ident | path   | string   | yes     | The ident of the message to delete |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/slug/{rslug}/conversation/{field_id}/messages/{message_ident}"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 204        |                     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**PUT /kb/{kbid}/slug/{rslug}/file/{field_id}**

Add resource file field (by slug) · roles: WRITER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kbid | path | string | yes |  |
| rslug | path | string | yes |  |
| field_id | path | string | yes |  |
| x-skip-store | header | boolean |  | If set to true, file fields will not be saved in the blob storage. They will only be sent to process. |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| language | string \| null |  |  |  |
| password | string \| null |  |  |  |
| file | File | yes |  |  |
| extract_strategy | string \| null |  |  | Id of the Nuclia extract strategy to use at processing time. If not set, the default strategy will be used. Extract strategies are defined at the learning configuration api. |
| split_strategy | string \| null |  |  | Id of the Nuclia split strategy used at processing time. If not set, the default strategy was used. Split strategies are defined at the learning configuration api. |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PUT
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/slug/{rslug}/file/{field_id}"
\<br />
-H "Authorization: Bearer $KB_API_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"file": {<br />
"content_type": "application/octet-stream"<br />
}<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 201        | ResourceFieldAdded  | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /kb/{kbid}/slug/{rslug}/file/{field_id}/download/field**

Download field binary field (by slug) · roles: READER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kbid | path | string | yes |  |
| rslug | path | string | yes |  |
| field_id | path | string | yes |  |
| inline | query | boolean |  |  |
| range | header | string \| null |  | Standard HTTP Range header that enable multipart requests |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/slug/{rslug}/file/{field_id}/download/field"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /kb/{kbid}/slug/{rslug}/file/{field}/upload**

Upload binary file on a Resource (by slug) · roles: WRITER

Upload a file as a field on an existing resource, if the field exists
will return a conflict (419)

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kbid | path | string | yes |  |
| rslug | path | string | yes |  |
| field | path | string | yes |  |
| x-filename | header | string \| null |  | Name of the file being uploaded. |
| x-password | header | string \| null |  | If the file is password protected, the password must be provided here. |
| x-language | header | string \| null |  |  |
| x-md5 | header | string \| null |  | MD5 hash of the file being uploaded. This is used to check if the file has been uploaded before. |
| x-extract-strategy | header | string \| null |  | Extract strategy to use when uploading a file. If not provided, the default strategy will be used. |
| x-split-strategy | header | string \| null |  | Split strategy to use when uploading a file. If not provided, the default strategy will be used. |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/slug/{rslug}/file/{field}/upload"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**           | **Description**     |
|------------|----------------------|---------------------|
| 201        | ResourceFileUploaded | Successful Response |
| 422        | HTTPValidationError  | Validation Error    |

**PUT /kb/{kbid}/slug/{rslug}/link/{field_id}**

Add resource link field (by slug) · roles: WRITER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |
| rslug    | path   | string   | yes     |                 |
| field_id | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| headers | map\<string, string\> \| null |  | {} |  |
| cookies | map\<string, string\> \| null |  | {} |  |
| uri | string | yes |  |  |
| language | string \| null |  |  |  |
| localstorage | map\<string, string\> \| null |  | {} |  |
| css_selector | string \| null |  |  |  |
| xpath | string \| null |  |  |  |
| extract_strategy | string \| null |  |  | Id of the Nuclia extract strategy to use at processing time. If not set, the default strategy will be used. Extract strategies are defined at the learning configuration api. |
| split_strategy | string \| null |  |  | Id of the Nuclia split strategy used at processing time. If not set, the default strategy was used. Split strategies are defined at the learning configuration api. |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PUT
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/slug/{rslug}/link/{field_id}"
\<br />
-H "Authorization: Bearer $KB_API_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"uri": "https://example.com"<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 201        | ResourceFieldAdded  | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**PUT /kb/{kbid}/slug/{rslug}/text/{field_id}**

Add resource text field (by slug) · roles: WRITER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |
| rslug    | path   | string   | yes     |                 |
| field_id | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| body | string | yes |  | The text body. The format of the text should be specified in the format field. The sum of all text fields in the request may not exceed 2MB. If you need to store more text, consider using a file field… |
| format | TextFormat |  | PLAIN | The format of the text. |
| extract_strategy | string \| null |  |  | Id of the Nuclia extract strategy to use at processing time. If not set, the default strategy will be used. Extract strategies are defined at the learning configuration api. |
| split_strategy | string \| null |  |  | Id of the Nuclia split strategy used at processing time. If not set, the default strategy was used. Split strategies are defined at the learning configuration api. |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PUT
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/slug/{rslug}/text/{field_id}"
\<br />
-H "Authorization: Bearer $KB_API_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"body": "string",<br />
"format": "PLAIN"<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 201        | ResourceFieldAdded  | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /kb/{kbid}/slug/{rslug}/{field_type}/{field_id}**

Get Resource field (by slug) · roles: READER

**Parameters**

| **Name**   | **In** | **Type**                         | **Req** | **Description** |
|------------|--------|----------------------------------|---------|-----------------|
| kbid       | path   | string                           | yes     |                 |
| rslug      | path   | string                           | yes     |                 |
| field_type | path   | FieldTypeName                    | yes     |                 |
| field_id   | path   | string                           | yes     |                 |
| show       | query  | array\<ResourceFieldProperties\> |         |                 |
| extracted  | query  | array\<ExtractedDataTypeName\>   |         |                 |
| page       | query  | string or integer                |         |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/slug/{rslug}/{field_type}/{field_id}"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | ResourceField       | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**DELETE /kb/{kbid}/slug/{rslug}/{field_type}/{field_id}**

Delete Resource field (by slug) · roles: WRITER

**Parameters**

| **Name**   | **In** | **Type**      | **Req** | **Description** |
|------------|--------|---------------|---------|-----------------|
| kbid       | path   | string        | yes     |                 |
| rslug      | path   | string        | yes     |                 |
| field_type | path   | FieldTypeName | yes     |                 |
| field_id   | path   | string        | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/slug/{rslug}/{field_type}/{field_id}"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 204        |                     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET
/kb/{kbid}/slug/{rslug}/{field_type}/{field_id}/download/extracted/{download_field}**

Download extracted binary file (by slug) · roles: READER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kbid | path | string | yes |  |
| rslug | path | string | yes |  |
| field_type | path | FieldTypeName | yes |  |
| field_id | path | string | yes |  |
| download_field | path | string | yes |  |
| range | header | string \| null |  | Standard HTTP Range header that enable multipart requests |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/slug/{rslug}/{field_type}/{field_id}/download/extracted/{download_field}"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**Resources (14)**

**GET /kb/{kbid}/resource/{rid}**

Get Resource (by id) · roles: READER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kbid | path | string | yes |  |
| rid | path | string | yes |  |
| show | query | array\<ResourceProperties\> |  |  |
| field_type | query | array\<FieldTypeName\> |  |  |
| extracted | query | array\<ExtractedDataTypeName\> |  |  |
| x-nucliadb-user | header | string |  |  |
| x-forwarded-for | header | string |  |  |

**Example** — a real call captured against the live sandbox:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/resource/$RID" \<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Response:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>{<br />
"id": "ca2a8f3bf186491facde30cdb2fbc2b6",<br />
"slug": "solar-basics",<br />
"title": "Solar Panel Basics",<br />
"summary": "",<br />
"icon": "text/plain",<br />
"thumbnail": "",<br />
"metadata": {<br />
"metadata": {},<br />
"language": "en",<br />
"languages": [<br />
"en"<br />
],<br />
"status": "PROCESSED"<br />
},<br />
"usermetadata": {<br />
"classifications": [<br />
{<br />
"labelset": "topic",<br />
"label": "energy",<br />
"cancelled_by_user": false<br />
}<br />
]<br />
},<br />
"fieldmetadata": [],<br />
"computedmetadata": {<br />
"field_classifications": []<br />
},<br />
"created": "2026-07-27T05:24:17.119810",<br />
"modified": "2026-07-27T05:24:17.119827",<br />
"last_seqid": 0,<br />
"last_account_seq": null,<br />
"queue": "private",<br />
"hidden": false,<br />
"data": {<br />
"texts": {<br />
"body": {<br />
"value": {<br />
"body": "A photovoltaic solar panel converts sunlight into direct
current electricity. A residential rooftop system<br />
... (truncated)</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**                              | **Description**     |
|------------|-----------------------------------------|---------------------|
| 200        | nucliadb_models\_\_resource\_\_Resource | Successful Response |
| 422        | HTTPValidationError                     | Validation Error    |

**PATCH /kb/{kbid}/resource/{rid}**

Modify Resource (by id) · roles: WRITER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kbid | path | string | yes |  |
| rid | path | string | yes |  |
| x-nucliadb-user | header | string |  |  |
| x-skip-store | header | boolean |  | If set to true, file fields will not be saved in the blob storage. They will only be sent to process. |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| title | string \| null |  |  |  |
| summary | string \| null |  |  |  |
| slug | string \| null |  |  | The slug is the user-defined id for the resource |
| thumbnail | string \| null |  |  |  |
| metadata | InputMetadata \| null |  |  |  |
| usermetadata | UserMetadata \| null |  |  |  |
| fieldmetadata | array\<UserFieldMetadata\> \| null |  |  |  |
| origin | InputOrigin \| null |  |  |  |
| extra | Extra \| null |  |  | Extra metadata for the resource. It can be used to store structured information about the resource that can't be used to query at retrieval time. If not set, the existing extra metadata will not be mo… |
| files | object |  | {} | Dictionary of file fields to be added to the resource. The keys correspond to the field id, and must comply with the regex: ^\[a-zA-Z0-9:-\]+\$ |
| links | object |  | {} | Dictionary of link fields to be added to the resource. The keys correspond to the field id, and must comply with the regex: ^\[a-zA-Z0-9:-\]+\$ |
| texts | object |  | {} | Dictionary of text fields to be added to the resource. The keys correspond to the field id, and must comply with the regex: ^\[a-zA-Z0-9:-\]+\$ |
| conversations | object |  | {} | Dictionary of conversation fields to be added to the resource. The keys correspond to the field id, and must comply with the regex: ^\[a-zA-Z0-9:-\]+\$ |
| key_values | object |  | {} | Dictionary of key-value fields to be added to the resource. The key must be the schema name and must comply with the regex: ^\[a-zA-Z0-9:-\]+\$ |
| processing_options | PushProcessingOptions \| null |  | {'ml_text': True} | Options for processing the resource. If not set, the default options will be used. |
| security | ResourceSecurity \| null |  |  | Security metadata for the resource. It can be used to have fine-grained control over who can access the resource. |
| hidden | boolean \| null |  |  | Modify the hidden status of the resource. If not set, the hidden status will not be modified. |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PATCH
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/resource/$RID" \<br />
-H "Authorization: Bearer $KB_API_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | ResourceUpdated     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**DELETE /kb/{kbid}/resource/{rid}**

Delete Resource (by id) · roles: WRITER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |
| rid      | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/resource/$RID" \<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 204        |                     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**HEAD /kb/{kbid}/resource/{rid}**

Head Resource (by id) · roles: READER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |
| rid      | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X HEAD
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/resource/$RID" \<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**         |
|------------|---------------------|-------------------------|
| 200        | object              | Successful Response     |
| 404        |                     | Resource does not exist |
| 422        | HTTPValidationError | Validation Error        |

**POST /kb/{kbid}/resource/{rid}/reindex**

Reindex Resource (by id) · roles: WRITER

**Parameters**

| **Name**        | **In** | **Type** | **Req** | **Description** |
|-----------------|--------|----------|---------|-----------------|
| kbid            | path   | string   | yes     |                 |
| rid             | path   | string   | yes     |                 |
| reindex_vectors | query  | boolean  |         |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/resource/$RID/reindex"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 204        |                     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /kb/{kbid}/resource/{rid}/reprocess**

Reprocess resource (by id) · roles: WRITER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kbid | path | string | yes |  |
| rid | path | string | yes |  |
| reset_title | query | boolean |  | Reset the title of the resource so that the file or link computed titles are set after processing. |
| x-nucliadb-user | header | string |  |  |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/resource/$RID/reprocess"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 202        | ResourceUpdated     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /kb/{kbid}/resources**

List Resources · roles: READER

List of resources of a knowledgebox

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description**                 |
|----------|--------|----------|---------|---------------------------------|
| kbid     | path   | string   | yes     |                                 |
| page     | query  | integer  |         | Requested page number (0-based) |
| size     | query  | integer  |         | Page size                       |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET "https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/resources"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | ResourceList        | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /kb/{kbid}/resources**

Create Resource · roles: WRITER

Create a new Resource in a Knowledge Box

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kbid | path | string | yes |  |
| x-skip-store | header | boolean |  | If set to true, file fields will not be saved in the blob storage. They will only be sent to process. |
| x-nucliadb-user | header | string |  |  |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| title | string \| null |  |  |  |
| summary | string \| null |  |  |  |
| slug | string \| null |  |  | The slug is the user-defined id for the resource |
| icon | string \| null |  |  | The icon should be a media type string: (see docs) |
| thumbnail | string \| null |  |  |  |
| metadata | InputMetadata \| null |  |  | Generic metadata for the resource. It can be used to store structured information about the resource that later is serialized on retrieval results, however this metadata can not be used for searching … |
| usermetadata | UserMetadata \| null |  |  |  |
| fieldmetadata | array\<UserFieldMetadata\> \| null |  |  |  |
| origin | InputOrigin \| null |  |  | Origin metadata for the resource. Used to store information about the resource on the origin system. Most of its fields can later be used to filter at search time. |
| extra | Extra \| null |  |  | Extra metadata for the resource. It can be used to store structured information about the resource that can't be used to query at retrieval time. |
| hidden | boolean \| null |  |  | Set the hidden status of the resource. If not set, the default value for new resources in the KnowledgeBox will be used. |
| files | object |  | {} | Dictionary of file fields to be added to the resource. The keys correspond to the field id, and must comply with the regex: ^\[a-zA-Z0-9:-\]+\$ |
| links | object |  | {} | Dictionary of link fields to be added to the resource. The keys correspond to the field id, and must comply with the regex: ^\[a-zA-Z0-9:-\]+\$ |
| texts | object |  | {} | Dictionary of text fields to be added to the resource. The keys correspond to the field id, and must comply with the regex: ^\[a-zA-Z0-9:-\]+\$ |
| conversations | object |  | {} | Dictionary of conversation fields to be added to the resource. The keys correspond to the field id, and must comply with the regex: ^\[a-zA-Z0-9:-\]+\$ |
| key_values | object |  | {} | Dictionary of key-value fields to be added to the resource. The key must be the schema name and must comply with the regex: ^\[a-zA-Z0-9:-\]+\$ |
| processing_options | PushProcessingOptions \| null |  | {'ml_text': True} | Options for processing the resource. If not set, the default options will be used. |
| security | ResourceSecurity \| null |  |  | Security metadata for the resource. It can be used to have fine-grained control over who can access the resource. |

**Example** — a real call captured against the live sandbox:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/resources" \<br />
-H "Authorization: Bearer $KB_API_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"slug": "solar-basics",<br />
"title": "Solar Panel Basics",<br />
"texts": {<br />
"body": {<br />
"body": "A photovoltaic solar panel converts sunlight into direct
current electricity. A residential rooftop system in Australia typically
ranges from 5kW to 10kW. Inverters convert DC to AC. The Clean Energy
Council certifies installers. Payback periods are commonly 4 to 7 years
depending on feed-in tariffs.",<br />
"format": "PLAIN"<br />
}<br />
},<br />
"usermetadata": {<br />
"classifications": [<br />
{<br />
"labelset": "topic",<br />
"label": "energy"<br />
}<br />
]<br />
}<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Response:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>{<br />
"uuid": "ca2a8f3bf186491facde30cdb2fbc2b6",<br />
"elapsed": 0.23978948593139648,<br />
"seqid": null<br />
}</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 201        | ResourceCreated     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /kb/{kbid}/slug/{rslug}**

Get Resource (by slug) · roles: READER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kbid | path | string | yes |  |
| rslug | path | string | yes |  |
| show | query | array\<ResourceProperties\> |  |  |
| field_type | query | array\<FieldTypeName\> |  |  |
| extracted | query | array\<ExtractedDataTypeName\> |  |  |
| x-nucliadb-user | header | string |  |  |
| x-forwarded-for | header | string |  |  |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/slug/{rslug}" \<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**                              | **Description**     |
|------------|-----------------------------------------|---------------------|
| 200        | nucliadb_models\_\_resource\_\_Resource | Successful Response |
| 422        | HTTPValidationError                     | Validation Error    |

**PATCH /kb/{kbid}/slug/{rslug}**

Modify Resource (by slug) · roles: WRITER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kbid | path | string | yes |  |
| rslug | path | string | yes |  |
| x-skip-store | header | boolean |  | If set to true, file fields will not be saved in the blob storage. They will only be sent to process. |
| x-nucliadb-user | header | string |  |  |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| title | string \| null |  |  |  |
| summary | string \| null |  |  |  |
| slug | string \| null |  |  | The slug is the user-defined id for the resource |
| thumbnail | string \| null |  |  |  |
| metadata | InputMetadata \| null |  |  |  |
| usermetadata | UserMetadata \| null |  |  |  |
| fieldmetadata | array\<UserFieldMetadata\> \| null |  |  |  |
| origin | InputOrigin \| null |  |  |  |
| extra | Extra \| null |  |  | Extra metadata for the resource. It can be used to store structured information about the resource that can't be used to query at retrieval time. If not set, the existing extra metadata will not be mo… |
| files | object |  | {} | Dictionary of file fields to be added to the resource. The keys correspond to the field id, and must comply with the regex: ^\[a-zA-Z0-9:-\]+\$ |
| links | object |  | {} | Dictionary of link fields to be added to the resource. The keys correspond to the field id, and must comply with the regex: ^\[a-zA-Z0-9:-\]+\$ |
| texts | object |  | {} | Dictionary of text fields to be added to the resource. The keys correspond to the field id, and must comply with the regex: ^\[a-zA-Z0-9:-\]+\$ |
| conversations | object |  | {} | Dictionary of conversation fields to be added to the resource. The keys correspond to the field id, and must comply with the regex: ^\[a-zA-Z0-9:-\]+\$ |
| key_values | object |  | {} | Dictionary of key-value fields to be added to the resource. The key must be the schema name and must comply with the regex: ^\[a-zA-Z0-9:-\]+\$ |
| processing_options | PushProcessingOptions \| null |  | {'ml_text': True} | Options for processing the resource. If not set, the default options will be used. |
| security | ResourceSecurity \| null |  |  | Security metadata for the resource. It can be used to have fine-grained control over who can access the resource. |
| hidden | boolean \| null |  |  | Modify the hidden status of the resource. If not set, the hidden status will not be modified. |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PATCH
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/slug/{rslug}" \<br />
-H "Authorization: Bearer $KB_API_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | ResourceUpdated     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**DELETE /kb/{kbid}/slug/{rslug}**

Delete Resource (by slug) · roles: WRITER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |
| rslug    | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/slug/{rslug}" \<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 204        |                     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**HEAD /kb/{kbid}/slug/{rslug}**

Head Resource (by slug) · roles: READER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |
| rslug    | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X HEAD
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/slug/{rslug}" \<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**         |
|------------|---------------------|-------------------------|
| 200        | object              | Successful Response     |
| 404        |                     | Resource does not exist |
| 422        | HTTPValidationError | Validation Error        |

**POST /kb/{kbid}/slug/{rslug}/reindex**

Reindex Resource (by slug) · roles: WRITER

**Parameters**

| **Name**        | **In** | **Type** | **Req** | **Description** |
|-----------------|--------|----------|---------|-----------------|
| kbid            | path   | string   | yes     |                 |
| rslug           | path   | string   | yes     |                 |
| reindex_vectors | query  | boolean  |         |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/slug/{rslug}/reindex"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 204        |                     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /kb/{kbid}/slug/{rslug}/reprocess**

Reprocess resource (by slug) · roles: WRITER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kbid | path | string | yes |  |
| rslug | path | string | yes |  |
| reset_title | query | boolean |  | Reset the title of the resource so that the file or link computed titles are set after processing. |
| x-nucliadb-user | header | string |  |  |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/slug/{rslug}/reprocess"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 202        | ResourceUpdated     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**Ingestion Agents (2)**

**POST /kb/{kbid}/resource/{rid}/run-agents**

Run Agents on Resource · roles: READER

**Parameters**

| **Name**        | **In** | **Type** | **Req** | **Description** |
|-----------------|--------|----------|---------|-----------------|
| kbid            | path   | string   | yes     |                 |
| rid             | path   | string   | yes     |                 |
| x-nucliadb-user | header | string   |         |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| filters | array\<AgentsFilter\> \| null |  |  | Filters to apply to the agents. If None, all curently configured agents are applied. |
| agent_ids | array\<string\> \| null |  |  |  |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/resource/$RID/run-agents"
\<br />
-H "Authorization: Bearer $KB_API_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**             | **Description**     |
|------------|------------------------|---------------------|
| 200        | ResourceAgentsResponse | Successful Response |
| 422        | HTTPValidationError    | Validation Error    |

**POST /kb/{kbid}/slug/{slug}/run-agents**

Run Agents on Resource (by slug) · roles: READER

**Parameters**

| **Name**        | **In** | **Type** | **Req** | **Description** |
|-----------------|--------|----------|---------|-----------------|
| kbid            | path   | string   | yes     |                 |
| slug            | path   | string   | yes     |                 |
| x-nucliadb-user | header | string   |         |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| filters | array\<AgentsFilter\> \| null |  |  | Filters to apply to the agents. If None, all curently configured agents are applied. |
| agent_ids | array\<string\> \| null |  |  |  |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/slug/{slug}/run-agents"
\<br />
-H "Authorization: Bearer $KB_API_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**             | **Description**     |
|------------|------------------------|---------------------|
| 200        | ResourceAgentsResponse | Successful Response |
| 422        | HTTPValidationError    | Validation Error    |

**Split Strategies (4)**

**GET /kb/{kbid}/split_strategies**

Learning split strategies · roles: READER, MANAGER

Get available split strategies

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |

**Example** — a real call captured against the live sandbox:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/split_strategies" \<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Response:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>{}</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**                        | **Description**     |
|------------|-----------------------------------|---------------------|
| 200        | map\<string, SplitConfiguration\> | Successful Response |
| 422        | HTTPValidationError               | Validation Error    |

**POST /kb/{kbid}/split_strategies**

Add a split strategy to a KB · roles: MANAGER, OWNER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string |  |  |  |
| max_paragraph | integer |  | 0 |  |
| custom_split | CustomSplitStrategy \| null |  |  |  |
| llm_split | LLMSplitConfig \| null |  |  |  |
| manual_split | ManualSplitConfig \| null |  |  |  |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/split_strategies" \<br />
-H "Authorization: Bearer $KB_API_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"name": "",<br />
"max_paragraph": 0<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | string              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /kb/{kbid}/split_strategies/strategy/{strategy_id}**

Extract split configuration · roles: READER, MANAGER

Get split strategy for a given id

**Parameters**

| **Name**    | **In** | **Type** | **Req** | **Description** |
|-------------|--------|----------|---------|-----------------|
| kbid        | path   | string   | yes     |                 |
| strategy_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/split_strategies/strategy/{strategy_id}"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**DELETE /kb/{kbid}/split_strategies/strategy/{strategy_id}**

Remove a split strategy from a KB · roles: MANAGER, OWNER

Removes a split strategy from a KB

**Parameters**

| **Name**    | **In** | **Type** | **Req** | **Description** |
|-------------|--------|----------|---------|-----------------|
| kbid        | path   | string   | yes     |                 |
| strategy_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/split_strategies/strategy/{strategy_id}"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 204        |                     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**Knowledge Box TUS uploads (4)**

**POST /kb/{kbid}/tusupload**

Create new upload on a Knowledge Box · roles: WRITER

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kbid | path | string | yes |  |
| x-extract-strategy | header | string \| null |  | Extract strategy to use when uploading a file. If not provided, the default strategy will be used. |
| x-split-strategy | header | string \| null |  | Split strategy to use when uploading a file. If not provided, the default strategy will be used. |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/tusupload" \<br />
-H "Authorization: Bearer $KB_API_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**OPTIONS /kb/{kbid}/tusupload**

TUS Server information

**Parameters**

| **Name**  | **In** | **Type**       | **Req** | **Description** |
|-----------|--------|----------------|---------|-----------------|
| kbid      | path   | string         | yes     |                 |
| rid       | query  | string \| null |         |                 |
| rslug     | query  | string \| null |         |                 |
| upload_id | query  | string \| null |         |                 |
| field     | query  | string \| null |         |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X OPTIONS
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/tusupload" \<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**PATCH /kb/{kbid}/tusupload/{upload_id}**

Upload data on a Knowledge Box · roles: WRITER

**Parameters**

| **Name**  | **In** | **Type** | **Req** | **Description** |
|-----------|--------|----------|---------|-----------------|
| kbid      | path   | string   | yes     |                 |
| upload_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PATCH
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/tusupload/{upload_id}"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**HEAD /kb/{kbid}/tusupload/{upload_id}**

Upload information · roles: WRITER

**Parameters**

| **Name**  | **In** | **Type** | **Req** | **Description** |
|-----------|--------|----------|---------|-----------------|
| kbid      | path   | string   | yes     |                 |
| upload_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X HEAD
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/tusupload/{upload_id}"
\<br />
-H "Authorization: Bearer $KB_API_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |
