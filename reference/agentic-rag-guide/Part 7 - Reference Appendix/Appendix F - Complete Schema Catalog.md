**PART 7 — REFERENCE APPENDIX**

**Appendix F — Complete Schema Catalog**

*Every data model in all four APIs, documented field by field*

This catalog documents every named schema referenced anywhere in the
four OpenAPI specifications — request bodies, response models, and every
nested object type. When a field in Appendices A–D shows an object type
by name (for example FilterExpression, AskRequest, or SyncAskResponse),
its full definition is here. Schemas are grouped by API and listed
alphabetically.

**1140 schemas** in total: 340 (NucliaDB), 481 (NUA), 124 (Zone), 195
(Global). Names may repeat across APIs where a model is shared; each
API's copy is documented under its own section for accuracy.

**nucliadb — 340 schemas**

**AgentsFilter**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| type | AgentType | yes |  |  |
| task_names | array\<string\> |  |  | list of task names. If None or empty, all tasks for that operation are applied. |

**AgentType**

**Enum:** graph, label, ask, qa, extract, prompt_guard, llama_guard

**AITables**

| **Field** | **Type**          | **Req** | **Default** | **Description** |
|-----------|-------------------|---------|-------------|-----------------|
| llm       | LLMConfig \| null |         |             |                 |

**And_FieldFilterExpressionType\_**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| operands | array\<And_FieldFilterExpressionType\_ \| Or_FieldFilterExpressionType\_ \| Not_FieldFilterExpressionType\_ \| Resource-Input \| Field \| Keyword \| DateCreated \| DateModified \| Label \| ResourceMimetype \| FieldMimetype \| Entity-Input \| Language \| OriginTag \| OriginMetadata \| OriginPath \| OriginSource \| OriginCollaborator \| nucliadb_models\_\_filters\_\_Generated\> | yes |  |  |

**And_GraphNodesQuery\_**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| operands | array\<And_GraphNodesQuery\_ \| Or_GraphNodesQuery\_ \| Not_GraphNodesQuery\_ \| AnyNode \| nucliadb_models\_\_graph\_\_requests\_\_Generated\> | yes |  |  |

**And_GraphPathQuery\_**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| operands | array\<And_GraphPathQuery\_ \| Or_GraphPathQuery\_ \| Not_GraphPathQuery\_ \| GraphPath-Input \| SourceNode \| DestinationNode \| AnyNode \| Relation-Input \| nucliadb_models\_\_graph\_\_requests\_\_Generated\> | yes |  |  |

**And_GraphRelationsQuery\_**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| operands | array\<And_GraphRelationsQuery\_ \| Or_GraphRelationsQuery\_ \| Not_GraphRelationsQuery\_ \| Relation-Input \| nucliadb_models\_\_graph\_\_requests\_\_Generated\> | yes |  |  |

**And_KVFilterExpression\_**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| operands | array\<And_KVFilterExpression\_ \| Or_KVFilterExpression\_ \| Not_KVFilterExpression\_ \| Eq \| Inequalities \| Contains\> | yes |  |  |

**And_ParagraphFilterExpression\_**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| operands | array\<And_ParagraphFilterExpression\_ \| Or_ParagraphFilterExpression\_ \| Not_ParagraphFilterExpression\_ \| Label \| Kind\> | yes |  |  |

**And_ResourceFilterExpression\_**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| operands | array\<And_ResourceFilterExpression\_ \| Or_ResourceFilterExpression\_ \| Not_ResourceFilterExpression\_ \| Resource-Input \| DateCreated \| DateModified \| Label \| ResourceMimetype \| Language \| OriginTag \| OriginMetadata \| OriginPath \| OriginSource \| OriginCollaborator \| Status\> | yes |  |  |

**AnonimizationModel**

An enumeration.

**Enum:** disabled, multilingual

**Answer**

| **Field**      | **Type**        | **Req** | **Default** | **Description** |
|----------------|-----------------|---------|-------------|-----------------|
| text           | string          | yes     |             |                 |
| language       | string \| null  |         |             |                 |
| ids_paragraphs | array\<string\> | yes     |             |                 |

**AnthropicKey**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| key       | string   |         |             |                 |

**AnyNode**

| **Field** | **Type**                 | **Req** | **Default** | **Description** |
|-----------|--------------------------|---------|-------------|-----------------|
| prop      | string                   |         | node        |                 |
| value     | string \| null           |         |             |                 |
| match     | NodeMatchKindName        |         | exact       |                 |
| type      | RelationNodeType \| null |         | entity      |                 |
| group     | string \| null           |         |             |                 |

**AppliedDataAugmentation**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| qas | QuestionAnswers \| null |  |  | Question and answers generated by the Question Answers agent |
| new_text_fields | array\<NewTextField\> |  |  | New text fields. Only generated by the Generator agent as of now. |
| changed | boolean |  | True | Indicates if the FieldMetadata was changed by the agents |

**AskConfig**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| audit_metadata | map\<string, string\> \| null |  |  | A dictionary containing optional audit-specific metadata, such as userid, environment, or other contextual information. This metadata can be leveraged for filtering and analyzing activity logs in futu… |
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
| reasoning | Reasoning \| boolean |  | False | Reasoning options for the generative model. Set to True to enable default reasoning, False to disable, or provide a Reasoning object for custom options. |
| query | string \| null |  |  |  |

**AskRequest**

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

**AskRetrievalMatch**

| **Field** | **Type** | **Req** | **Default** | **Description**               |
|-----------|----------|---------|-------------|-------------------------------|
| id        | string   | yes     |             | Id of the matching text block |

**AskSearchConfiguration**

| **Field** | **Type**  | **Req** | **Default** | **Description** |
|-----------|-----------|---------|-------------|-----------------|
| kind      | string    | yes     |             |                 |
| config    | AskConfig | yes     |             |                 |

**AskTimings**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| generative_first_chunk | number \| null |  |  | Time the LLM took to generate the first chunk of the answer |
| generative_total | number \| null |  |  | Total time the LLM took to generate the answer |

**AskTokens**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| input | integer | yes |  | Number of LLM tokens used for the context in the query |
| output | integer | yes |  | Number of LLM tokens used for the answer |
| input_nuclia | number \| null |  |  | Number of Nuclia LLM tokens used for the context in the query |
| output_nuclia | number \| null |  |  | Number of Nuclia LLM tokens used for the answer |

**AugmentedContext**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| paragraphs | map\<string, AugmentedTextBlock\> |  | {} | Paragraphs added to the context as a result of using the ragstrategies parameter, typically the neighbouringparagraphs or the conversation strategies |
| fields | map\<string, AugmentedTextBlock\> |  | {} | Field extracted texts added to the context as a result of using the ragstrategies parameter, typically the hierarcy or fullresource strategies. |

**AugmentedField**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| metadata | FieldMetadata | yes |  |  |
| applied_data_augmentation | AppliedDataAugmentation | yes |  |  |
| input_nuclia_tokens | number | yes |  |  |
| output_nuclia_tokens | number | yes |  |  |
| time | number | yes |  |  |

**AugmentedTextBlock**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| id | string | yes |  | The id of the augmented text bloc. It can be a paragraph id or a field id. |
| text | string | yes |  | The text of the augmented text block. It may include additional metadata to enrich the context |
| position | TextPosition \| null |  |  | Metadata about the position of the text block in the original document. |
| parent | string \| null |  |  | The parent text block that was augmented for. |
| augmentation_type | TextBlockAugmentationType | yes |  | Type of augmentation. |

**Author**

**Enum:** NUCLIA, USER

**AzureMistralKey**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| key       | string   |         |             |                 |
| url       | string   |         |             |                 |

**AzureOpenAIKey**

| **Field**  | **Type** | **Req** | **Default** | **Description** |
|------------|----------|---------|-------------|-----------------|
| key        | string   |         |             |                 |
| url        | string   |         |             |                 |
| deployment | string   |         |             |                 |
| model      | string   |         |             |                 |

**CatalogFilterExpression**

Returns only documents that match this filter expression. Filtering
examples can be found here: (see docs) This allows building complex
filtering expressions and replaces the following parameters: filters,
range\_\*, with_status.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| resource | And_ResourceFilterExpression\_ \| Or_ResourceFilterExpression\_ \| Not_ResourceFilterExpression\_ \| Resource-Input \| DateCreated \| DateModified \| Label \| ResourceMimetype \| Language \| OriginTag \| OriginMetadata \| OriginPath \| OriginSource \| OriginCollaborator \| Status | yes |  | Filter to apply to resources |

**CatalogQuery**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| field | CatalogQueryField |  | title | Field to search in |
| match | CatalogQueryMatch |  | exact | Operator to use for matching results |
| query | string | yes |  | Text to search for |

**CatalogQueryField**

**Enum:** title, slug

**CatalogQueryMatch**

**Enum:** exact, words, fuzzy, starts_with, ends_with, contains

**CatalogRequest**

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

**ChatContextMessage**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| author    | Author   | yes     |             |                 |
| text      | string   | yes     |             |                 |

**ChatOptions**

**Enum:** keyword, relations, semantic

**CitationsType**

**Enum:** none, default, llm_footnotes

**Classification**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| labelset  | string   | yes     |             |                 |
| label     | string   | yes     |             |                 |

**CloudLink**

| **Field**    | **Type**        | **Req** | **Default** | **Description** |
|--------------|-----------------|---------|-------------|-----------------|
| uri          | string \| null  |         |             |                 |
| size         | integer \| null |         |             |                 |
| content_type | string \| null  |         |             |                 |
| filename     | string \| null  |         |             |                 |
| md5          | string \| null  |         |             |                 |

**ComputedMetadata**

The purpose of this field is to show a cherry-picked set of fields from
computed metadata without having to load the whole computed metadata
field.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| field_classifications | array\<FieldClassification\> |  | \[\] |  |

**Consumption**

| **Field**           | **Type**     | **Req** | **Default** | **Description** |
|---------------------|--------------|---------|-------------|-----------------|
| normalized_tokens   | TokensDetail | yes     |             |                 |
| customer_key_tokens | TokensDetail | yes     |             |                 |

**Contains**

Computes whether a value exists inside a range or a repeated field

| **Field** | **Type**                    | **Req** | **Default** | **Description** |
|-----------|-----------------------------|---------|-------------|-----------------|
| schema_id | string                      | yes     |             |                 |
| key       | string                      | yes     |             |                 |
| contains  | integer \| number \| string | yes     |             |                 |

**ConversationalStrategy**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string |  | conversation |  |
| attachments_text | boolean |  | False | Add attachments on context retrieved on conversation |
| attachments_images | boolean |  | False | Add attachments images on context retrieved on conversation if they are mime type image and using a visual LLM |
| full | boolean |  | False | Add all conversation fields on matched blocks |
| max_messages | integer |  | 15 | Max messages to append in case its not full field |

**ConversationFieldData**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| value | FieldConversation \| null |  |  |  |
| extracted | ConversationFieldExtractedData \| null |  |  |  |
| error | Error \| null |  |  |  |
| status | string \| null |  |  |  |
| errors | array\<Error\> \| null |  |  |  |

**ConversationFieldExtractedData**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| text | ExtractedText \| null |  |  |  |
| metadata | FieldComputedMetadata \| null |  |  |  |
| large_metadata | LargeComputedMetadata \| null |  |  |  |
| vectors | VectorObject \| null |  |  |  |
| question_answers | FieldQuestionAnswers \| null |  |  |  |
| relation_node_vectors | map\<string, array\<RelationNodeVector\>\> \| null |  |  |  |
| relation_edge_vectors | map\<string, array\<RelationEdgeVector\>\> \| null |  |  |  |

**CreateResourcePayload**

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

**CustomPrompt**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| system | string \| null |  |  | System prompt given to the generative model responsible of generating the answer. This can help customize the behavior of the model when generating the answer. If not specified, the default model prov… |
| user | string \| null |  |  | User prompt given to the generative model responsible of generating the answer. Use the words {context} and {question} in brackets where you want those fields to be placed, in case you want them in yo… |
| rephrase | string \| null |  |  | Rephrase prompt given to the generative model responsible for rephrasing the query for a more effective retrieval step. This is only used if the rephrase flag is set to true in the request. If not spe… |

**CustomSplitStrategy**

**Enum:** 0, 1, 2

**DateCreated**

Matches all fields created in a date range

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| prop | string |  | created |  |
| since | string \| null |  |  | Start of the date range. Leave blank for unbounded |
| until | string \| null |  |  | End of the date range. Leave blank for unbounded |

**DateModified**

Matches all fields modified in a date range

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| prop | string |  | modified |  |
| since | string \| null |  |  | Start of the date range. Leave blank for unbounded |
| until | string \| null |  |  | End of the date range. Leave blank for unbounded |

**DestinationNode**

| **Field** | **Type**                 | **Req** | **Default**      | **Description** |
|-----------|--------------------------|---------|------------------|-----------------|
| prop      | string                   |         | destination_node |                 |
| value     | string \| null           |         |                  |                 |
| match     | NodeMatchKindName        |         | exact            |                 |
| type      | RelationNodeType \| null |         | entity           |                 |
| group     | string \| null           |         |                  |                 |

**DirectionalRelation**

| **Field**      | **Type**                 | **Req** | **Default** | **Description** |
|----------------|--------------------------|---------|-------------|-----------------|
| entity         | string                   | yes     |             |                 |
| entity_type    | RelationNodeType         | yes     |             |                 |
| entity_subtype | string                   | yes     |             |                 |
| relation       | RelationType             | yes     |             |                 |
| relation_label | string                   | yes     |             |                 |
| direction      | RelationDirection        | yes     |             |                 |
| metadata       | RelationMetadata \| null |         |             |                 |
| resource_id    | string                   | yes     |             |                 |

**DummyIndexProvider**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| type | ExternalIndexProviderType |  | unset | Enum for the different external index providers. For now none are supported, but we may add some in the future. |

**EntitiesGroup**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| title | string \| null |  |  | Title of the entities group |
| color | string \| null |  |  | Color of the entities group. This is for display purposes only. |
| custom | boolean |  | False | Denotes if it has been created by the user |
| entities | map\<string, nucliadb_models\_\_entities\_\_Entity\> |  | {} |  |

**EntitiesGroupSummary**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| title | string \| null |  |  | Title of the entities group |
| color | string \| null |  |  | Color of the entities group. This is for display purposes only. |
| custom | boolean |  | False | Denotes if it has been created by the user |
| entities | map\<string, nucliadb_models\_\_entities\_\_Entity\> |  | {} | This field is deprecated and will be removed in future versions. It will always be empty. Use the /api/v1/kb/{kbid}/entitiesgroup/{group} endpoint to get the entities of a group. |

**Entity**

Matches fields that contains a detected entity

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| prop | string |  | entity |  |
| subtype | string | yes |  | Type of the entity. e.g: PERSON |
| value | string \| null |  |  | Value of the entity. e.g: Anna. If blank, matches any entity of the given type |

**Entity-Input**

Matches fields that contains a detected entity

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| prop | string |  | entity |  |
| subtype | string | yes |  | Type of the entity. e.g: PERSON |
| value | string \| null |  |  | Value of the entity. e.g: Anna. If blank, matches any entity of the given type |

**Entity-Output**

| **Field** | **Type**       | **Req** | **Default** | **Description** |
|-----------|----------------|---------|-------------|-----------------|
| token     | string \| null |         |             |                 |
| root      | string \| null |         |             |                 |
| type      | string \| null |         |             |                 |

**EntitySubgraph**

| **Field**  | **Type**                     | **Req** | **Default** | **Description** |
|------------|------------------------------|---------|-------------|-----------------|
| related_to | array\<DirectionalRelation\> | yes     |             |                 |

**Eq**

Equal (==) operator

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| schema_id | string | yes |  |  |
| key | string | yes |  |  |
| eq | boolean \| integer \| number \| string | yes |  |  |

**Error**

| **Field** | **Type**       | **Req** | **Default** | **Description** |
|-----------|----------------|---------|-------------|-----------------|
| body      | string         | yes     |             |                 |
| code      | integer        | yes     |             |                 |
| code_str  | string         | yes     |             |                 |
| created   | string \| null | yes     |             |                 |
| severity  | string         | yes     |             |                 |

**ExternalIndexProviderType**

Enum for the different external index providers. For now none are
supported, but we may add some in the future.

**Enum:** unset

**Extra**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| metadata | object (free-form map) | yes |  | Arbitrary JSON metadata provided by the user that is not meant to be searchable, but can be serialized on results. |

**ExtractConfig**

| **Field**   | **Type**                     | **Req** | **Default** | **Description** |
|-------------|------------------------------|---------|-------------|-----------------|
| name        | string                       |         |             |                 |
| vllm_config | VLLMExtractionConfig \| null |         |             |                 |
| ai_tables   | AITables \| null             |         |             |                 |
| split       | SplitConfig \| null          |         |             |                 |

**ExtractedDataTypeName**

**Enum:** text, metadata, shortened_metadata, large_metadata, vectors,
link, file, question_answers, relation_vectors

**ExtractedText**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| text | string \| null |  |  |  |
| split_text | map\<string, string\> \| null |  |  |  |
| deleted_splits | array\<string\> \| null |  |  |  |

**FeedbackRequest**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| ident | string | yes |  | Id of the request to provide feedback for. This id is returned in the response header Nuclia-Learning-Id of the chat endpoint. |
| good | boolean | yes |  | Whether the result was good or not |
| task | FeedbackTasks | yes |  | The task the feedback is for. For now, only CHAT task is available |
| feedback | string \| null |  |  | Feedback text |
| text_block_id | string \| null |  |  | Text block id |

**FeedbackTasks**

**Enum:** CHAT

**Field**

Matches a field or set of fields

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| prop | string |  | field |  |
| type | FieldTypeName | yes |  | Type of the field to match, |
| name | string \| null |  |  | Name of the field to match. If blank, matches all fields of the given type |

**FieldClassification**

| **Field**       | **Type**                | **Req** | **Default** | **Description** |
|-----------------|-------------------------|---------|-------------|-----------------|
| field           | FieldID                 | yes     |             |                 |
| classifications | array\<Classification\> |         | \[\]        |                 |

**FieldComputedMetadata**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| metadata | FieldMetadata | yes |  |  |
| split_metadata | map\<string, FieldMetadata\> \| null |  |  |  |
| deleted_splits | array\<string\> \| null |  |  |  |

**FieldConversation**

This is a metadata representation of a conversation about how many pages
of messages and total of messages we have. This class is used mainly
when exposing a conversation in the resource level

| **Field**        | **Type**        | **Req** | **Default** | **Description** |
|------------------|-----------------|---------|-------------|-----------------|
| pages            | integer \| null |         |             |                 |
| size             | integer \| null |         |             |                 |
| total            | integer \| null |         |             |                 |
| extract_strategy | string \| null  |         |             |                 |
| split_strategy   | string \| null  |         |             |                 |

**FieldEntities**

Wrapper for the entities extracted from a field (required because
protobuf doesn't support lists of lists)

| **Field** | **Type**             | **Req** | **Default** | **Description** |
|-----------|----------------------|---------|-------------|-----------------|
| entities  | array\<FieldEntity\> | yes     |             |                 |

**FieldEntity**

| **Field** | **Type**          | **Req** | **Default** | **Description** |
|-----------|-------------------|---------|-------------|-----------------|
| text      | string            | yes     |             |                 |
| label     | string            | yes     |             |                 |
| positions | array\<Position\> | yes     |             |                 |

**FieldExtensionStrategy**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string |  | field_extension |  |
| fields | array\<string\> |  | \[\] | List of field ids to extend the context with. It will try to extend the retrieval context with the specified fields in the matching resources. The field ids have to be in the format {fieldtype}/{field… |
| data_augmentation_field_prefixes | array\<string\> |  | \[\] | List of prefixes for data augmentation added fields to extend the context with. For example, if the prefix is 'simpson', all fields that are a result of data augmentation with that prefix will be used… |

**FieldFile**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| added | string \| null |  |  |  |
| file | CloudLink \| null |  |  |  |
| language | string \| null |  |  |  |
| password | string \| null |  |  |  |
| external | boolean |  | False |  |
| extract_strategy | string \| null |  |  | Id of the Nuclia extract strategy used at processing time. If not set, the default strategy was used. Extract strategies are defined at the learning configuration api. |
| split_strategy | string \| null |  |  | Id of the Nuclia split strategy used at processing time. If not set, the default strategy was used. Split strategies are defined at the learning configuration api. |

**FieldID**

| **Field**  | **Type**  | **Req** | **Default** | **Description** |
|------------|-----------|---------|-------------|-----------------|
| field_type | FieldType | yes     |             |                 |
| field      | string    | yes     |             |                 |

**FieldLargeMetadata**

| **Field** | **Type**                       | **Req** | **Default** | **Description** |
|-----------|--------------------------------|---------|-------------|-----------------|
| entities  | array\<Entity-Output\> \| null |         |             |                 |
| tokens    | map\<string, integer\> \| null |         |             |                 |

**FieldLink**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| added | string \| null |  |  |  |
| headers | map\<string, string\> \| null |  |  |  |
| cookies | map\<string, string\> \| null |  |  |  |
| uri | string \| null |  |  |  |
| language | string \| null |  |  |  |
| localstorage | map\<string, string\> \| null |  |  |  |
| css_selector | string \| null |  |  |  |
| xpath | string \| null |  |  |  |
| extract_strategy | string \| null |  |  | Id of the Nuclia extract strategy used at processing time. If not set, the default strategy was used. Extract strategies are defined at the learning configuration api. |
| split_strategy | string \| null |  |  | Id of the Nuclia split strategy used at processing time. If not set, the default strategy was used. Split strategies are defined at the learning configuration api. |

**FieldMetadata**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| links | array\<string\> | yes |  |  |
| paragraphs | array\<nucliadb_models\_\_common\_\_Paragraph\> | yes |  |  |
| ner | map\<string, string\> | yes |  |  |
| entities | map\<string, FieldEntities\> | yes |  |  |
| classifications | array\<Classification\> | yes |  |  |
| last_index | string \| null |  |  |  |
| last_understanding | string \| null |  |  |  |
| last_extract | string \| null |  |  |  |
| last_summary | string \| null |  |  |  |
| last_processing_start | string \| null |  |  |  |
| thumbnail | CloudLink \| null |  |  |  |
| language | string \| null |  |  |  |
| summary | string \| null |  |  |  |
| positions | map\<string, Positions\> | yes |  |  |
| relations | array\<Relation-Output\> \| null |  |  |  |
| mime_type | string \| null |  |  |  |

**FieldMimetype**

Matches fields with a mimetype

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| prop | string |  | field_mimetype |  |
| type | string | yes |  | Type of the mimetype to match. e.g: In image/jpeg, type is image |
| subtype | string \| null |  |  | Type of the mimetype to match. e.g: In image/jpeg, subtype is jpeg.Leave blank to match all mimetype of the type |

**FieldQuestionAnswers**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| question_answers | QuestionAnswers | yes |  |  |
| split_question_answers | map\<string, QuestionAnswers\> \| null |  |  |  |
| deleted_splits | array\<string\> \| null |  |  |  |

**FieldRef**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| field_type | FieldTypeName | yes |  | This map assumes that both values and extracted data field containers use the same names for its fields. See models.ResourceFieldValues and models.ResourceFieldExtractedData |
| field_id | string | yes |  |  |
| split | string \| null |  |  |  |

**FieldText**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| body | string \| null |  |  |  |
| format | TextFormat \| null |  |  |  |
| md5 | string \| null |  |  |  |
| extract_strategy | string \| null |  |  | Id of the Nuclia extract strategy used at processing time. If not set, the default strategy was used. Extract strategies are defined at the learning configuration api. |
| split_strategy | string \| null |  |  | Id of the Nuclia split strategy used at processing time. If not set, the default strategy was used. Split strategies are defined at the learning configuration api. |

**FieldType**

**Enum:** file, link, text, generic, conversation

**FieldTypeName**

This map assumes that both values and extracted data field containers
use the same names for its fields. See models.ResourceFieldValues and
models.ResourceFieldExtractedData

**Enum:** text, file, link, conversation, generic, key_value

**File**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| filename | string \| null |  |  |  |
| content_type | string |  | application/octet-stream |  |
| payload | string \| null |  |  | Base64 encoded file content |
| md5 | string \| null |  |  |  |
| uri | string \| null |  |  |  |
| extra_headers | map\<string, string\> |  | {} |  |

**FileB64**

| **Field**    | **Type** | **Req** | **Default**              | **Description** |
|--------------|----------|---------|--------------------------|-----------------|
| filename     | string   | yes     |                          |                 |
| content_type | string   |         | application/octet-stream |                 |
| payload      | string   | yes     |                          |                 |
| md5          | string   | yes     |                          |                 |

**FileExtractedData**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| language | string \| null |  |  |  |
| md5 | string \| null |  |  |  |
| metadata | map\<string, string\> \| null |  |  |  |
| nested | map\<string, string\> \| null |  |  |  |
| file_generated | map\<string, CloudLink\> \| null |  |  |  |
| file_rows_previews | map\<string, RowsPreview\> \| null |  |  |  |
| file_preview | CloudLink \| null |  |  |  |
| file_pages_previews | FilePages \| null |  |  |  |
| file_thumbnail | CloudLink \| null |  |  |  |
| field | string \| null |  |  |  |
| icon | string \| null |  |  |  |
| nested_position | map\<string, NestedPosition\> \| null |  |  |  |
| nested_list_position | map\<string, NestedListPosition\> \| null |  |  |  |

**FileField**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| language | string \| null |  |  |  |
| password | string \| null |  |  |  |
| file | File | yes |  |  |
| extract_strategy | string \| null |  |  | Id of the Nuclia extract strategy to use at processing time. If not set, the default strategy will be used. Extract strategies are defined at the learning configuration api. |
| split_strategy | string \| null |  |  | Id of the Nuclia split strategy used at processing time. If not set, the default strategy was used. Split strategies are defined at the learning configuration api. |

**FileFieldData**

| **Field** | **Type**                       | **Req** | **Default** | **Description** |
|-----------|--------------------------------|---------|-------------|-----------------|
| value     | FieldFile \| null              |         |             |                 |
| extracted | FileFieldExtractedData \| null |         |             |                 |
| error     | Error \| null                  |         |             |                 |
| status    | string \| null                 |         |             |                 |
| errors    | array\<Error\> \| null         |         |             |                 |

**FileFieldExtractedData**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| text | ExtractedText \| null |  |  |  |
| metadata | FieldComputedMetadata \| null |  |  |  |
| large_metadata | LargeComputedMetadata \| null |  |  |  |
| vectors | VectorObject \| null |  |  |  |
| question_answers | FieldQuestionAnswers \| null |  |  |  |
| relation_node_vectors | map\<string, array\<RelationNodeVector\>\> \| null |  |  |  |
| relation_edge_vectors | map\<string, array\<RelationEdgeVector\>\> \| null |  |  |  |
| file | FileExtractedData \| null |  |  |  |

**FilePages**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| pages | array\<CloudLink\> \| null |  |  |  |
| positions | array\<PagePositions\> \| null |  |  |  |
| structures | array\<PageStructure\> \| null |  |  |  |

**Filter**

| **Field** | **Type**                | **Req** | **Default** | **Description** |
|-----------|-------------------------|---------|-------------|-----------------|
| all       | array\<string\> \| null |         |             |                 |
| any       | array\<string\> \| null |         |             |                 |
| none      | array\<string\> \| null |         |             |                 |
| not_all   | array\<string\> \| null |         |             |                 |

**FilterExpression**

Returns only documents that match this filter expression. Filtering
examples can be found here: (see docs) This allows building complex
filtering expressions and replaces the following parameters: fields,
filters, range\_\*, resource_filters, keyword_filters.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| field | And_FieldFilterExpressionType\_ \| Or_FieldFilterExpressionType\_ \| Not_FieldFilterExpressionType\_ \| Resource-Input \| Field \| Keyword \| DateCreated \| DateModified \| Label \| ResourceMimetype \| FieldMimetype \| Entity-Input \| Language \| OriginTag \| OriginMetadata \| OriginPath \| OriginSource \| OriginCollaborator \| nucliadb_models\_\_filters\_\_Generated \| null |  |  | Filter to apply to fields |
| paragraph | And_ParagraphFilterExpression\_ \| Or_ParagraphFilterExpression\_ \| Not_ParagraphFilterExpression\_ \| Label \| Kind \| null |  |  | Filter to apply to each text block |
| key_value | And_KVFilterExpression\_ \| Or_KVFilterExpression\_ \| Not_KVFilterExpression\_ \| Eq \| Inequalities \| Contains \| null |  |  | Filter to apply to key-value fields (JSON index prefilter) |
| operator | Operator |  | and | How to combine field and paragraph filters (default is AND).AND returns text blocks that match both filters.OR returns textblocks that match one of the two filters |

**FindConfig**

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
| graph_query | And_GraphPathQuery\_ \| Or_GraphPathQuery\_ \| Not_GraphPathQuery\_ \| GraphPath \| SourceNode \| DestinationNode \| AnyNode \| nucliadb_models\_\_graph\_\_requests\_\_Relation \| nucliadb_models\_\_graph\_\_requests\_\_Generated \| null |  |  | Query for the knowledge graph. Paths (node-relation-node) extracted from a paragraphid will be used to extend the results |
| features | array\<FindOptions\> |  | \['keyword', 'semantic'\] | List of search features to use. Each value corresponds to a lookup into on of the different indexes |
| rank_fusion | RankFusionName \| ReciprocalRankFusion |  | rrf | Rank fusion algorithm to use to merge results from multiple retrievers (keyword, semantic) |
| reranker | RerankerName \| PredictReranker |  | predict | Reranker let you specify which method you want to use to rerank your results at the end of retrieval |
| keyword_filters | array\<string\> \| array\<Filter\> |  | \[\] | List of keyword filter expressions to apply to the retrieval step. The text block search will only be performed on the documents that contain the specified keywords. The filters are case-insensitive, … |
| generative_model | string \| null |  |  | The generative model used to rephrase the query. If not provided, the model configured for the Knowledge Box is used. |

**FindField**

| **Field**  | **Type**                     | **Req** | **Default** | **Description** |
|------------|------------------------------|---------|-------------|-----------------|
| paragraphs | map\<string, FindParagraph\> | yes     |             |                 |

**FindOptions**

**Enum:** keyword, semantic, relations, graph

**FindParagraph**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| score | number | yes |  |  |
| score_type | SCORE_TYPE | yes |  |  |
| order | integer |  | 0 |  |
| text | string | yes |  |  |
| id | string | yes |  |  |
| labels | array\<string\> \| null |  | \[\] |  |
| position | TextPosition \| null |  |  |  |
| fuzzy_result | boolean |  | False |  |
| page_with_visual | boolean |  | False | This flag informs if the page may have information that has not been extracted |
| reference | string \| null |  |  | Reference to the extracted image that represents this paragraph |
| is_a_table | boolean |  | False | The referenced image of the paragraph is a table |
| relevant_relations | Relations \| null |  |  | Relevant relations from which the paragraph was found, will only be filled if using the Graph RAG Strategy |

**FindRequest**

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

**FindResource**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| id | string | yes |  |  |
| slug | string \| null |  |  |  |
| title | string \| null |  |  |  |
| summary | string \| null |  |  |  |
| icon | string \| null |  |  |  |
| thumbnail | string \| null |  |  |  |
| metadata | Metadata \| null |  |  |  |
| usermetadata | UserMetadata \| null |  |  |  |
| fieldmetadata | array\<UserFieldMetadata\> \| null |  |  |  |
| computedmetadata | ComputedMetadata \| null |  |  |  |
| created | string \| null |  |  |  |
| modified | string \| null |  |  |  |
| last_seqid | integer \| null |  |  |  |
| last_account_seq | integer \| null |  |  |  |
| queue | QueueType \| null |  |  |  |
| hidden | boolean \| null |  |  |  |
| origin | Origin \| null |  |  |  |
| extra | Extra \| null |  |  |  |
| relations | array\<Relation-Output\> \| null |  |  |  |
| data | ResourceData \| null |  |  |  |
| security | ResourceSecurity \| null |  |  | Resource security metadata |
| fields | map\<string, FindField\> | yes |  |  |

**FindSearchConfiguration**

| **Field** | **Type**   | **Req** | **Default** | **Description** |
|-----------|------------|---------|-------------|-----------------|
| kind      | string     | yes     |             |                 |
| config    | FindConfig | yes     |             |                 |

**FullResourceApplyTo**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| exclude | array\<string\> |  |  | Resources from matches containing any of these labels won't expand to the full resource. This may be useful to exclude long and not interesting resources and expend less tokens |

**FullResourceStrategy**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string |  | full_resource |  |
| count | integer \| null |  |  | Maximum number of full documents to retrieve. If not specified, all matching documents are retrieved. |
| include_remaining_text_blocks | boolean |  | False | Whether to include the remaining text blocks after the maximum number of resources has been reached. |
| apply_to | FullResourceApplyTo \| null |  |  | Define which resources to exclude from serialization |

**GenerativeModel**

An enumeration.

**Enum:** generative-multilingual-2023, chatgpt

**Generator**

**Enum:** data-augmentation, processor, user

**GenericFieldData**

| **Field** | **Type**                       | **Req** | **Default** | **Description** |
|-----------|--------------------------------|---------|-------------|-----------------|
| value     | string \| null                 |         |             |                 |
| extracted | TextFieldExtractedData \| null |         |             |                 |
| error     | Error \| null                  |         |             |                 |
| status    | string \| null                 |         |             |                 |
| errors    | array\<Error\> \| null         |         |             |                 |

**GraphFilterExpression**

Returns only relations from documents that match this filter expression.
Filtering examples can be found here: (see docs)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| field | And_FieldFilterExpressionType\_ \| Or_FieldFilterExpressionType\_ \| Not_FieldFilterExpressionType\_ \| Resource-Input \| Field \| Keyword \| DateCreated \| DateModified \| Label \| ResourceMimetype \| FieldMimetype \| Entity-Input \| Language \| OriginTag \| OriginMetadata \| OriginPath \| OriginSource \| OriginCollaborator \| nucliadb_models\_\_filters\_\_Generated | yes |  | Filter to apply to fields |

**GraphNode**

| **Field** | **Type**                 | **Req** | **Default** | **Description** |
|-----------|--------------------------|---------|-------------|-----------------|
| value     | string \| null           |         |             |                 |
| match     | NodeMatchKindName        |         | exact       |                 |
| type      | RelationNodeType \| null |         | entity      |                 |
| group     | string \| null           |         |             |                 |

**GraphNode-Input**

| **Field** | **Type**                 | **Req** | **Default** | **Description** |
|-----------|--------------------------|---------|-------------|-----------------|
| value     | string \| null           |         |             |                 |
| match     | NodeMatchKindName        |         | exact       |                 |
| type      | RelationNodeType \| null |         | entity      |                 |
| group     | string \| null           |         |             |                 |

**GraphNode-Output**

| **Field** | **Type**         | **Req** | **Default** | **Description** |
|-----------|------------------|---------|-------------|-----------------|
| value     | string           | yes     |             |                 |
| type      | RelationNodeType | yes     |             |                 |
| group     | string           | yes     |             |                 |
| score     | number \| null   |         |             |                 |

**GraphNodesSearchRequest**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| top_k | integer |  | 50 |  |
| filter_expression | GraphFilterExpression \| null |  |  | Returns only relations from documents that match this filter expression.Filtering examples can be found here: (see docs) |
| security | RequestSecurity \| null |  |  | Security metadata for the request. Please refer to the documentation for more details on how security works: (see docs) |
| show_hidden | boolean |  | False | If set to false (default), excludes hidden resources from search |
| query | And_GraphNodesQuery\_ \| Or_GraphNodesQuery\_ \| Not_GraphNodesQuery\_ \| AnyNode \| nucliadb_models\_\_graph\_\_requests\_\_Generated | yes |  |  |

**GraphNodesSearchResponse**

| **Field** | **Type**                  | **Req** | **Default** | **Description** |
|-----------|---------------------------|---------|-------------|-----------------|
| nodes     | array\<GraphNode-Output\> | yes     |             |                 |

**GraphPath**

| **Field**   | **Type**              | **Req** | **Default** | **Description** |
|-------------|-----------------------|---------|-------------|-----------------|
| prop        | string                |         | path        |                 |
| source      | GraphNode \| null     |         |             |                 |
| relation    | GraphRelation \| null |         |             |                 |
| destination | GraphNode \| null     |         |             |                 |
| undirected  | boolean               |         | False       |                 |

**GraphPath-Input**

| **Field**   | **Type**                    | **Req** | **Default** | **Description** |
|-------------|-----------------------------|---------|-------------|-----------------|
| prop        | string                      |         | path        |                 |
| source      | GraphNode-Input \| null     |         |             |                 |
| relation    | GraphRelation-Input \| null |         |             |                 |
| destination | GraphNode-Input \| null     |         |             |                 |
| undirected  | boolean                     |         | False       |                 |

**GraphPath-Output**

| **Field**   | **Type**             | **Req** | **Default** | **Description** |
|-------------|----------------------|---------|-------------|-----------------|
| source      | GraphNode-Output     | yes     |             |                 |
| relation    | GraphRelation-Output | yes     |             |                 |
| destination | GraphNode-Output     | yes     |             |                 |
| metadata    | PathMetadata \| null | yes     |             |                 |
| score       | number \| null       |         |             |                 |

**GraphRelation**

| **Field** | **Type**              | **Req** | **Default** | **Description** |
|-----------|-----------------------|---------|-------------|-----------------|
| label     | string \| null        |         |             |                 |
| type      | RelationType \| null  |         |             |                 |
| match     | RelationMatchKindName |         | exact       |                 |

**GraphRelation-Input**

| **Field** | **Type**              | **Req** | **Default** | **Description** |
|-----------|-----------------------|---------|-------------|-----------------|
| label     | string \| null        |         |             |                 |
| type      | RelationType \| null  |         |             |                 |
| match     | RelationMatchKindName |         | exact       |                 |

**GraphRelation-Output**

| **Field** | **Type**       | **Req** | **Default** | **Description** |
|-----------|----------------|---------|-------------|-----------------|
| label     | string         | yes     |             |                 |
| type      | RelationType   | yes     |             |                 |
| score     | number \| null |         |             |                 |

**GraphRelationsSearchRequest**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| top_k | integer |  | 50 |  |
| filter_expression | GraphFilterExpression \| null |  |  | Returns only relations from documents that match this filter expression.Filtering examples can be found here: (see docs) |
| security | RequestSecurity \| null |  |  | Security metadata for the request. Please refer to the documentation for more details on how security works: (see docs) |
| show_hidden | boolean |  | False | If set to false (default), excludes hidden resources from search |
| query | And_GraphRelationsQuery\_ \| Or_GraphRelationsQuery\_ \| Not_GraphRelationsQuery\_ \| Relation-Input \| nucliadb_models\_\_graph\_\_requests\_\_Generated | yes |  |  |

**GraphRelationsSearchResponse**

| **Field** | **Type**                      | **Req** | **Default** | **Description** |
|-----------|-------------------------------|---------|-------------|-----------------|
| relations | array\<GraphRelation-Output\> | yes     |             |                 |

**GraphSearchRequest**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| top_k | integer |  | 50 |  |
| filter_expression | GraphFilterExpression \| null |  |  | Returns only relations from documents that match this filter expression.Filtering examples can be found here: (see docs) |
| security | RequestSecurity \| null |  |  | Security metadata for the request. Please refer to the documentation for more details on how security works: (see docs) |
| show_hidden | boolean |  | False | If set to false (default), excludes hidden resources from search |
| query | And_GraphPathQuery\_ \| Or_GraphPathQuery\_ \| Not_GraphPathQuery\_ \| GraphPath-Input \| SourceNode \| DestinationNode \| AnyNode \| Relation-Input \| nucliadb_models\_\_graph\_\_requests\_\_Generated | yes |  |  |

**GraphSearchResponse**

| **Field** | **Type**                  | **Req** | **Default** | **Description** |
|-----------|---------------------------|---------|-------------|-----------------|
| paths     | array\<GraphPath-Output\> | yes     |             |                 |

**GraphStrategy**

This strategy retrieves context pieces by exploring the Knowledge Graph,
starting from the entities present in the query. It works best if the
Knowledge Box has a user-defined Graph Extraction agent enabled.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string |  | graph_beta |  |
| hops | integer |  | 3 | Number of hops to take when exploring the graph for relevant context. For example, - hops=1 will explore the neighbors of the starting entities. - hops=2 will explore the neighbors of the neighbors of… |
| top_k | integer |  |  | Number of relationships to keep after each hop after ranking them by relevance to the query. This number correlates to more paragraphs being sent as context. If not set, this number will be set to 30 … |
| agentic_graph_only | boolean |  | True | If set to true, only relationships extracted from a graph extraction agent are considered for context expansion. |
| relation_text_as_paragraphs | boolean |  | False | If set to true, the text of the relationships is to create context paragraphs, this enables to use bigger top K values without running into the generative model's context limits. If set to false, the … |
| relation_ranking | RelationRanking |  | reranker | Method to rank relationships. - reranker uses the reranker model to rank relationships. - generative uses first the reranker to first lower the amount of relationships and then the generative model to… |
| query_entity_detection | QueryEntityDetection |  | predict | Method to detect entities in the query. - predict uses NUA to detect entities in the query, slower and more accurate but requires an exact text match between Knowledge Box entities and entities in the… |
| weight | number |  | 3.0 | Weight of the graph strategy in the context. The weight is used to scale the results of the strategy before adding them to the context.The weight should be a positive number. |

**HFEmbeddingKey**

Some models require a specific template (including prefix) to work
correctly in each task For example Snowflake's Arctic-embed requires a
specific prefix to work correctly. In that case, the query prompt will
be \` passage_prompt: "" query_prompt: "Represent this sentence for
searching relevant pas…

| **Field**      | **Type**         | **Req** | **Default** | **Description** |
|----------------|------------------|---------|-------------|-----------------|
| url            | string           |         |             |                 |
| key            | string           |         |             |                 |
| matryoshka     | array\<integer\> |         |             |                 |
| similarity     | string           |         |             |                 |
| size           | integer          |         | 0           |                 |
| threshold      | number           |         | 0.0         |                 |
| passage_prompt | string           |         |             |                 |
| query_prompt   | string           |         |             |                 |

**HFLLMKey**

| **Field** | **Type**  | **Req** | **Default** | **Description** |
|-----------|-----------|---------|-------------|-----------------|
| key       | string    |         |             |                 |
| url       | string    |         |             |                 |
| model     | ModelType |         | 0           |                 |

**HierarchyResourceStrategy**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string |  | hierarchy |  |
| count | integer |  | 0 | Number of extra characters that are added to each matching paragraph when adding to the context. |

**HTTPValidationError**

| **Field** | **Type**                 | **Req** | **Default** | **Description** |
|-----------|--------------------------|---------|-------------|-----------------|
| detail    | array\<ValidationError\> |         |             |                 |

**Image**

| **Field**    | **Type** | **Req** | **Default** | **Description** |
|--------------|----------|---------|-------------|-----------------|
| content_type | string   | yes     |             |                 |
| b64encoded   | string   | yes     |             |                 |

**Inequalities**

Inequality operators that can be grouped to perform range queries.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| schema_id | string | yes |  |  |
| key | string | yes |  |  |
| gte | integer \| number \| string \| null |  |  |  |
| lte | integer \| number \| string \| null |  |  |  |

**InputConversationField**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| messages | array\<InputMessage\> |  |  | List of messages in the conversation field. Each message must have a unique ident. A single conversation can contain up to 51,200 messages. You can add up to 2,048 messages per request. |
| extract_strategy | string \| null |  |  | Id of the Nuclia extract strategy used at processing time. If not set, the default strategy was used. Extract strategies are defined at the learning configuration api. |
| split_strategy | string \| null |  |  | Id of the Nuclia split strategy used at processing time. If not set, the default strategy was used. Split strategies are defined at the learning configuration api. |

**InputMessage**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| timestamp | string \| null |  |  | Time at which the message was sent, in ISO 8601 format. |
| who | string \| null |  |  | Sender of the message, e.g. 'user' or 'assistant' |
| to | array\<string\> |  |  | List of recipients of the message, e.g. \['assistant'\] or \['user'\] |
| content | InputMessageContent | yes |  |  |
| ident | string | yes |  | Unique identifier for the message. Must be unique within the conversation. |
| type | MessageType \| null |  |  |  |

**InputMessageContent**

| **Field**          | **Type**          | **Req** | **Default** | **Description** |
|--------------------|-------------------|---------|-------------|-----------------|
| text               | string            | yes     |             |                 |
| format             | MessageFormat     |         | PLAIN       |                 |
| attachments        | array\<FileB64\>  |         | \[\]        |                 |
| attachments_fields | array\<FieldRef\> |         | \[\]        |                 |

**InputMetadata**

| **Field** | **Type**                | **Req** | **Default** | **Description** |
|-----------|-------------------------|---------|-------------|-----------------|
| metadata  | map\<string, string\>   |         | {}          |                 |
| language  | string \| null          |         |             |                 |
| languages | array\<string\> \| null |         |             |                 |

**InputOrigin**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| source_id | string \| null |  |  |  |
| url | string \| null |  |  |  |
| created | string \| null |  |  | Creation date of the resource at the origin system. This can be later used for date range filtering on search endpoints. Have a look at the advanced search documentation page: (see docs) |
| modified | string \| null |  |  | Modification date of the resource at the origin system. This can be later used for date range filtering on search endpoints. Have a look at the advanced search documentation page: (see docs) |
| metadata | map\<string, string\> |  | {} | Generic metadata from the resource at the origin system. It can later be used for filtering on search endpoints with '/origin.metadata/{key}/{value}' |
| tags | array\<string\> |  | \[\] | Resource tags about the origin system. It can later be used for filtering on search endpoints with '/origin.tags/{tag}' |
| collaborators | array\<string\> |  | \[\] |  |
| filename | string \| null |  |  |  |
| related | array\<string\> |  | \[\] |  |
| path | string \| null |  |  | Path of the original resource. Typically used to store folder structure information of the resource at the origin system. It can be later used for filtering on search endpoints with '/origin.path/{pat… |
| sync_metadata | SyncMetadata \| null |  |  | Metadata related to the resource from the origin system fetched by the Progress Agentic RAG's Cloud Storage Sync service. |

**KBKVSchemas**

| **Field** | **Type**                | **Req** | **Default** | **Description** |
|-----------|-------------------------|---------|-------------|-----------------|
| schemas   | map\<string, KVSchema\> |         |             |                 |

**KeyValueField**

A key-value field value. The field id (key in the resource's key_values
dict) must equal the schema name — enforcing one KV field per schema per
resource.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| data | map\<string, string \| array\<string\> \| integer \| number \| boolean \| Range\> |  |  | Key-value pairs conforming to the schema. |

**KeyValueFieldData**

| **Field** | **Type**               | **Req** | **Default** | **Description** |
|-----------|------------------------|---------|-------------|-----------------|
| value     | KeyValueField \| null  |         |             |                 |
| error     | Error \| null          |         |             |                 |
| status    | string \| null         |         |             |                 |
| errors    | array\<Error\> \| null |         |             |                 |

**Keyword**

Matches all fields that contain a keyword

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| prop      | string   |         | keyword     |                 |
| word      | string   | yes     |             | Keyword to find |

**Kind**

Matches paragraphs of a certain kind

| **Field** | **Type**      | **Req** | **Default** | **Description**                |
|-----------|---------------|---------|-------------|--------------------------------|
| prop      | string        |         | kind        |                                |
| kind      | TypeParagraph | yes     |             | The kind of paragraph to match |

**KnowledgeBoxConfig**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| uuid | string \| null |  |  | UUID for the Knowledge Box. If not provided, a new UUID will be generated. |
| slug | string \| null |  |  | Slug for the Knowledge Box. |
| title | string \| null |  |  | Title for the Knowledge Box. |
| description | string \| null |  |  | Description for the Knowledge Box. |
| learning_configuration | object (free-form map) \| null |  |  | Learning configuration for the Knowledge Box. If provided, NucliaDB will set the learning configuration for the Knowledge Box. |
| external_index_provider | DummyIndexProvider \| null |  |  | External index provider for the Knowledge Box. |
| configured_external_index_provider | object (free-form map) \| null |  |  | Metadata for the configured external index provider (if any) |
| similarity | VectorSimilarity \| null |  |  | This field is deprecated. Use 'learningconfiguration' instead. |
| hidden_resources_enabled | boolean |  | False | Allow hiding resources |
| hidden_resources_hide_on_creation | boolean |  | False | Hide newly created resources |
| enforce_security | boolean \| null |  |  | Whether to enforce security groups by default on all requests. If set to None, the value will not be updated. If set to a boolean value, it will update the setting for the Knowledge Box accordingly. |

**KnowledgeboxCounters**

| **Field**  | **Type**                | **Req** | **Default** | **Description** |
|------------|-------------------------|---------|-------------|-----------------|
| resources  | integer                 | yes     |             |                 |
| paragraphs | integer                 | yes     |             |                 |
| fields     | integer                 | yes     |             |                 |
| sentences  | integer                 | yes     |             |                 |
| shards     | array\<string\> \| null |         |             |                 |
| index_size | number                  |         | 0.0         |                 |

**KnowledgeBoxEntities**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| uuid | string | yes |  |  |
| groups | map\<string, EntitiesGroupSummary\> |  | {} |  |

**KnowledgeboxFindResults**

Find on knowledgebox results

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| resources | map\<string, FindResource\> | yes |  |  |
| relations | Relations \| null |  |  |  |
| query | string \| null |  |  |  |
| rephrased_query | string \| null |  |  |  |
| total | integer |  | 0 |  |
| page_number | integer |  | 0 | Pagination will be deprecated, please, refer to topk in the request |
| page_size | integer |  | 20 | Pagination will be deprecated, please, refer to topk in the request |
| next_page | boolean |  | False | Pagination will be deprecated, please, refer to topk in the request |
| nodes | array\<map\<string, string\>\> \| null |  |  | List of nodes queried in the search |
| shards | array\<string\> \| null |  |  | The list of shard replica ids used for the search. |
| autofilters | array\<string\> |  | \[\] | \[deprecated\] list of filters automatically applied to the search query |
| min_score | number \| MinScore \| null |  | {'bm25': 0.0} | The minimum scores that have been used for the search operation. |
| best_matches | array\<string\> |  | \[\] | List of ids of best matching paragraphs. The list is sorted by decreasing relevance (most relevant first). |
| metrics | object (free-form map) \| null |  |  | Metrics information about the search operation. The metadata included in this field is subject to change and should not be used in production. This is only available if the debug parameter is set to t… |

**KnowledgeBoxLabels**

| **Field** | **Type**                | **Req** | **Default** | **Description** |
|-----------|-------------------------|---------|-------------|-----------------|
| uuid      | string                  | yes     |             |                 |
| labelsets | map\<string, LabelSet\> |         | {}          |                 |

**KnowledgeBoxObj**

The API representation of a Knowledge Box object.

| **Field** | **Type**                      | **Req** | **Default** | **Description** |
|-----------|-------------------------------|---------|-------------|-----------------|
| slug      | string \| null                |         |             |                 |
| uuid      | string                        | yes     |             |                 |
| config    | KnowledgeBoxConfig \| null    |         |             |                 |
| model     | SemanticModelMetadata \| null |         |             |                 |

**KnowledgeBoxObjID**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| uuid      | string   | yes     |             |                 |

**KnowledgeboxSearchResults**

Search on knowledgebox results

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| resources | map\<string, Resource-Output\> |  | {} |  |
| sentences | Sentences \| null |  |  |  |
| paragraphs | Paragraphs \| null |  |  |  |
| fulltext | Resources \| null |  |  |  |
| relations | Relations \| null |  |  |  |
| nodes | array\<map\<string, string\>\> \| null |  |  |  |
| shards | array\<string\> \| null |  |  |  |
| autofilters | array\<string\> |  | \[\] | \[deprecated\] list of filters automatically applied to the search query |

**KnowledgeboxSuggestResults**

Suggest on resource results

| **Field**  | **Type**                | **Req** | **Default** | **Description** |
|------------|-------------------------|---------|-------------|-----------------|
| paragraphs | Paragraphs \| null      |         |             |                 |
| entities   | RelatedEntities \| null |         |             |                 |
| shards     | array\<string\> \| null |         |             |                 |

**KnowledgeBoxSynonyms**

| **Field** | **Type**                       | **Req** | **Default** | **Description** |
|-----------|--------------------------------|---------|-------------|-----------------|
| synonyms  | map\<string, array\<string\>\> | yes     |             |                 |

**KnowledgeGraphEntity**

| **Field** | **Type**                 | **Req** | **Default** | **Description** |
|-----------|--------------------------|---------|-------------|-----------------|
| name      | string                   | yes     |             |                 |
| type      | RelationNodeType \| null |         |             |                 |
| subtype   | string \| null           |         |             |                 |

**KVFieldType**

**Enum:** text, integer, float, boolean, date

**KVSchema**

| **Field**   | **Type**               | **Req** | **Default** | **Description** |
|-------------|------------------------|---------|-------------|-----------------|
| id          | string                 | yes     |             |                 |
| description | string                 |         |             |                 |
| fields      | array\<KVSchemaField\> |         |             |                 |

**KVSchemaField**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| key | string | yes |  |  |
| type | KVFieldType | yes |  |  |
| description | string |  |  |  |
| required | boolean |  | True |  |
| range | boolean |  | False | When enabled, this field stores a range instead of a single value and operations like contains are possible |
| repeated | boolean |  | False | When enabled, this field stores a list of elements instead of a single value and operations like contains are possible |

**Label**

Matches fields/paragraphs with a label (or labelset)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| prop | string |  | label |  |
| labelset | string | yes |  | The ID of the labelset to match |
| label | string \| null |  |  | The label to match. If blank, matches all labels in the given labelset |

**LabelSet**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| title | string \| null |  |  | Title of the labelset. It is a prettier display name for the labelset shown in the UI but it is not intended to be used for searching. |
| color | string \| null |  | blue |  |
| multiple | boolean |  | True |  |
| kind | array\<LabelSetKind\> |  | \[\] |  |
| labels | array\<nucliadb_models\_\_labels\_\_Label\> |  |  | List of labels in the labelset. The titles of the labels must be unique within the labelset. |

**LabelSetKind**

**Enum:** RESOURCES, PARAGRAPHS, SENTENCES, SELECTIONS

**Language**

Matches the language of the field

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| prop | string |  | language |  |
| only_primary | boolean |  | False | Match only the primary language of the document. By default, matches any language that appears in the document |
| language | string | yes |  | The code of the language to match, e.g: en |

**LargeComputedMetadata**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| metadata | FieldLargeMetadata \| null |  |  |  |
| split_metadata | map\<string, FieldLargeMetadata\> \| null |  |  |  |
| deleted_splits | array\<string\> \| null |  |  |  |

**LearningConfigurationUpdate**

| **Field**           | **Type** | **Req** | **Default**  | **Description** |
|---------------------|----------|---------|--------------|-----------------|
| anonymization_model | object   |         | disabled     |                 |
| generative_model    | object   |         | chatgpt      |                 |
| ner_model           | object   |         | multilingual |                 |

**LinkExtractedData**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| date | string \| null |  |  |  |
| language | string \| null |  |  |  |
| title | string \| null |  |  |  |
| metadata | map\<string, string\> \| null |  |  |  |
| link_thumbnail | CloudLink \| null |  |  |  |
| link_preview | CloudLink \| null |  |  |  |
| field | string \| null |  |  |  |
| link_image | CloudLink \| null |  |  |  |
| description | string \| null |  |  |  |
| type | string \| null |  |  |  |
| embed | string \| null |  |  |  |
| file_generated | map\<string, CloudLink\> \| null |  |  |  |

**LinkField**

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

**LinkFieldData**

| **Field** | **Type**                       | **Req** | **Default** | **Description** |
|-----------|--------------------------------|---------|-------------|-----------------|
| value     | FieldLink \| null              |         |             |                 |
| extracted | LinkFieldExtractedData \| null |         |             |                 |
| error     | Error \| null                  |         |             |                 |
| status    | string \| null                 |         |             |                 |
| errors    | array\<Error\> \| null         |         |             |                 |

**LinkFieldExtractedData**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| text | ExtractedText \| null |  |  |  |
| metadata | FieldComputedMetadata \| null |  |  |  |
| large_metadata | LargeComputedMetadata \| null |  |  |  |
| vectors | VectorObject \| null |  |  |  |
| question_answers | FieldQuestionAnswers \| null |  |  |  |
| relation_node_vectors | map\<string, array\<RelationNodeVector\>\> \| null |  |  |  |
| relation_edge_vectors | map\<string, array\<RelationEdgeVector\>\> \| null |  |  |  |
| link | LinkExtractedData \| null |  |  |  |

**LLMConfig**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| user_keys | UserLearningKeys \| null |  |  |  |
| generative_model | string |  |  |  |
| generative_provider | string |  |  |  |
| generative_prompt_id | string |  |  |  |

**LLMSplitConfig**

| **Field** | **Type**          | **Req** | **Default** | **Description** |
|-----------|-------------------|---------|-------------|-----------------|
| rules     | array\<string\>   |         |             |                 |
| llm       | LLMConfig \| null |         |             |                 |

**ManualSplitConfig**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| splitter  | string   |         |             |                 |

**MaxTokens**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| context | integer \| null |  |  | Use to limit the amount of tokens used in the LLM context |
| answer | integer \| null |  |  | Use to limit the amount of tokens used in the LLM answer |

**MessageFormat**

**Enum:** PLAIN, HTML, RST, MARKDOWN, KEEP_MARKDOWN, JSON

**MessageType**

**Enum:** UNSET, QUESTION, ANSWER

**Metadata**

| **Field** | **Type**                 | **Req** | **Default** | **Description** |
|-----------|--------------------------|---------|-------------|-----------------|
| metadata  | map\<string, string\>    |         | {}          |                 |
| language  | string \| null           |         |             |                 |
| languages | array\<string\> \| null  |         |             |                 |
| status    | ResourceProcessingStatus | yes     |             |                 |

**MetadataExtensionStrategy**

RAG strategy to enrich the context with metadata of the matching
paragraphs or its resources. This strategy can be combined with any of
the other strategies.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string |  | metadata_extension |  |
| types | array\<MetadataExtensionType\> | yes |  | List of resource metadata types to add to the context. - 'origin': origin metadata of the resource. - 'classificationlabels': classification labels of the resource. - 'ner': Named Entity Recognition e… |

**MetadataExtensionType**

**Enum:** origin, classification_labels, ners, extra_metadata

**MinScore**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| semantic | number \| null |  |  | Minimum semantic similarity score used to filter vector index search. If not specified, the default minimum score of the semantic model associated to the Knowledge Box will be used. Check out the docu… |
| bm25 | number |  | 0 | Minimum score used to filter bm25 index search. Check out the documentation for more information on how to use this parameter: (see docs) |

**MistralKey**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| key       | string   |         |             |                 |

**ModelType**

**Enum:** 0, 1

**NeighbouringParagraphsStrategy**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string |  | neighbouring_paragraphs |  |
| before | integer |  | 2 | Number of previous neighbouring paragraphs to add to the context, for each matching paragraph in the retrieval step. |
| after | integer |  | 2 | Number of following neighbouring paragraphs to add to the context, for each matching paragraph in the retrieval step. |

**NERModel**

An enumeration.

**Enum:** multilingual

**NestedListPosition**

| **Field** | **Type**                | **Req** | **Default** | **Description** |
|-----------|-------------------------|---------|-------------|-----------------|
| positions | array\<NestedPosition\> | yes     |             |                 |

**NestedPosition**

| **Field** | **Type**        | **Req** | **Default** | **Description** |
|-----------|-----------------|---------|-------------|-----------------|
| start     | integer \| null |         |             |                 |
| end       | integer \| null |         |             |                 |
| page      | integer \| null |         |             |                 |

**NewTextField**

| **Field**   | **Type**  | **Req** | **Default** | **Description** |
|-------------|-----------|---------|-------------|-----------------|
| text_field  | FieldText | yes     |             |                 |
| destination | string    | yes     |             |                 |

**NodeMatchKindName**

**Enum:** exact, fuzzy, fuzzy_words, semantic

**Not_FieldFilterExpressionType\_**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| operand | And_FieldFilterExpressionType\_ \| Or_FieldFilterExpressionType\_ \| Not_FieldFilterExpressionType\_ \| Resource-Input \| Field \| Keyword \| DateCreated \| DateModified \| Label \| ResourceMimetype \| FieldMimetype \| Entity-Input \| Language \| OriginTag \| OriginMetadata \| OriginPath \| OriginSource \| OriginCollaborator \| nucliadb_models\_\_filters\_\_Generated | yes |  |  |

**Not_GraphNodesQuery\_**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| operand | And_GraphNodesQuery\_ \| Or_GraphNodesQuery\_ \| Not_GraphNodesQuery\_ \| AnyNode \| nucliadb_models\_\_graph\_\_requests\_\_Generated | yes |  |  |

**Not_GraphPathQuery\_**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| operand | And_GraphPathQuery\_ \| Or_GraphPathQuery\_ \| Not_GraphPathQuery\_ \| GraphPath-Input \| SourceNode \| DestinationNode \| AnyNode \| Relation-Input \| nucliadb_models\_\_graph\_\_requests\_\_Generated | yes |  |  |

**Not_GraphRelationsQuery\_**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| operand | And_GraphRelationsQuery\_ \| Or_GraphRelationsQuery\_ \| Not_GraphRelationsQuery\_ \| Relation-Input \| nucliadb_models\_\_graph\_\_requests\_\_Generated | yes |  |  |

**Not_KVFilterExpression\_**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| operand | And_KVFilterExpression\_ \| Or_KVFilterExpression\_ \| Not_KVFilterExpression\_ \| Eq \| Inequalities \| Contains | yes |  |  |

**Not_ParagraphFilterExpression\_**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| operand | And_ParagraphFilterExpression\_ \| Or_ParagraphFilterExpression\_ \| Not_ParagraphFilterExpression\_ \| Label \| Kind | yes |  |  |

**Not_ResourceFilterExpression\_**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| operand | And_ResourceFilterExpression\_ \| Or_ResourceFilterExpression\_ \| Not_ResourceFilterExpression\_ \| Resource-Input \| DateCreated \| DateModified \| Label \| ResourceMimetype \| Language \| OriginTag \| OriginMetadata \| OriginPath \| OriginSource \| OriginCollaborator \| Status | yes |  |  |

**nucliadb_models\_\_common\_\_Paragraph**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| start | integer \| null |  |  |  |
| end | integer \| null |  |  |  |
| start_seconds | array\<integer\> \| null |  |  |  |
| end_seconds | array\<integer\> \| null |  |  |  |
| kind | TypeParagraph \| null |  |  |  |
| classifications | array\<Classification\> \| null |  |  |  |
| sentences | array\<nucliadb_models\_\_common\_\_Sentence\> \| null |  |  |  |
| key | string \| null |  |  |  |
| page | PageInformation \| null |  |  |  |
| representation | Representation \| null |  |  |  |
| relations | ParagraphRelations \| null |  |  |  |

**nucliadb_models\_\_common\_\_Sentence**

| **Field** | **Type**        | **Req** | **Default** | **Description** |
|-----------|-----------------|---------|-------------|-----------------|
| start     | integer \| null |         |             |                 |
| end       | integer \| null |         |             |                 |
| key       | string \| null  |         |             |                 |

**nucliadb_models\_\_entities\_\_Entity**

| **Field**  | **Type**        | **Req** | **Default** | **Description** |
|------------|-----------------|---------|-------------|-----------------|
| value      | string          | yes     |             |                 |
| merged     | boolean         |         | False       |                 |
| represents | array\<string\> |         | \[\]        |                 |

**nucliadb_models\_\_extracted\_\_Entity**

| **Field** | **Type**       | **Req** | **Default** | **Description** |
|-----------|----------------|---------|-------------|-----------------|
| token     | string \| null |         |             |                 |
| root      | string \| null |         |             |                 |
| type      | string \| null |         |             |                 |

**nucliadb_models\_\_filters\_\_Entity**

Matches fields that contains a detected entity

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| prop | string |  | entity |  |
| subtype | string | yes |  | Type of the entity. e.g: PERSON |
| value | string \| null |  |  | Value of the entity. e.g: Anna. If blank, matches any entity of the given type |

**nucliadb_models\_\_filters\_\_Generated**

Matches if the field was generated by the given source

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| prop | string |  | generated |  |
| by | string | yes |  | Generator for this field. Currently, only data-augmentation is supported |
| da_task | string \| null |  |  | Matches field generated by an specific DA task, given its prefix |

**nucliadb_models\_\_filters\_\_Label**

Matches fields/paragraphs with a label (or labelset)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| prop | string |  | label |  |
| labelset | string | yes |  | The ID of the labelset to match |
| label | string \| null |  |  | The label to match. If blank, matches all labels in the given labelset |

**nucliadb_models\_\_filters\_\_Resource**

Matches all fields of a resource given its id or slug

| **Field** | **Type**       | **Req** | **Default** | **Description**               |
|-----------|----------------|---------|-------------|-------------------------------|
| prop      | string         |         | resource    |                               |
| id        | string \| null |         |             | UUID of the resource to match |
| slug      | string \| null |         |             | Slug of the resource to match |

**nucliadb_models\_\_graph\_\_requests\_\_Generated**

Matches if the relation was generated by the given source

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| prop | string |  | generated |  |
| by | Generator | yes |  | Generator for this field. |
| da_task | string \| null |  |  | Matches relations generated by an specific DA task, given its prefix |

**nucliadb_models\_\_graph\_\_requests\_\_Relation**

| **Field** | **Type**              | **Req** | **Default** | **Description** |
|-----------|-----------------------|---------|-------------|-----------------|
| prop      | string                |         | relation    |                 |
| label     | string \| null        |         |             |                 |
| type      | RelationType \| null  |         |             |                 |
| match     | RelationMatchKindName |         | exact       |                 |

**nucliadb_models\_\_labels\_\_Label**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| title | string | yes |  | Title of the label. This is the display name for the label shown in the UI and also used for searching. |
| related | string \| null |  |  |  |
| text | string \| null |  |  |  |
| uri | string \| null |  |  |  |

**nucliadb_models\_\_metadata\_\_Relation**

| **Field** | **Type**                 | **Req** | **Default** | **Description** |
|-----------|--------------------------|---------|-------------|-----------------|
| relation  | RelationType             | yes     |             |                 |
| label     | string \| null           |         |             |                 |
| metadata  | RelationMetadata \| null |         |             |                 |
| from      | RelationEntity \| null   |         |             |                 |
| to        | RelationEntity           | yes     |             |                 |

**nucliadb_models\_\_resource\_\_Resource**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| id | string | yes |  |  |
| slug | string \| null |  |  |  |
| title | string \| null |  |  |  |
| summary | string \| null |  |  |  |
| icon | string \| null |  |  |  |
| thumbnail | string \| null |  |  |  |
| metadata | Metadata \| null |  |  |  |
| usermetadata | UserMetadata \| null |  |  |  |
| fieldmetadata | array\<UserFieldMetadata\> \| null |  |  |  |
| computedmetadata | ComputedMetadata \| null |  |  |  |
| created | string \| null |  |  |  |
| modified | string \| null |  |  |  |
| last_seqid | integer \| null |  |  |  |
| last_account_seq | integer \| null |  |  |  |
| queue | QueueType \| null |  |  |  |
| hidden | boolean \| null |  |  |  |
| origin | Origin \| null |  |  |  |
| extra | Extra \| null |  |  |  |
| relations | array\<nucliadb_models\_\_metadata\_\_Relation\> \| null |  |  |  |
| data | ResourceData \| null |  |  |  |
| security | ResourceSecurity \| null |  |  | Resource security metadata |

**nucliadb_models\_\_search\_\_Paragraph**

| **Field**     | **Type**                 | **Req** | **Default** | **Description** |
|---------------|--------------------------|---------|-------------|-----------------|
| score         | number                   | yes     |             |                 |
| rid           | string                   | yes     |             |                 |
| field_type    | string                   | yes     |             |                 |
| field         | string                   | yes     |             |                 |
| text          | string                   | yes     |             |                 |
| labels        | array\<string\>          |         | \[\]        |                 |
| start_seconds | array\<integer\> \| null |         |             |                 |
| end_seconds   | array\<integer\> \| null |         |             |                 |
| position      | TextPosition \| null     |         |             |                 |
| fuzzy_result  | boolean                  |         | False       |                 |

**nucliadb_models\_\_search\_\_Sentence**

| **Field**  | **Type**             | **Req** | **Default** | **Description** |
|------------|----------------------|---------|-------------|-----------------|
| score      | number               | yes     |             |                 |
| rid        | string               | yes     |             |                 |
| text       | string               | yes     |             |                 |
| field_type | string               | yes     |             |                 |
| field      | string               | yes     |             |                 |
| index      | string \| null       |         |             |                 |
| position   | TextPosition \| null |         |             |                 |

**NucliaDBClientType**

**Enum:** api, widget, web, dashboard, desktop, chrome_extension

**OpenAIKey**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| key       | string   |         |             |                 |
| org       | string   |         |             |                 |

**Operator**

**Enum:** and, or

**Or_FieldFilterExpressionType\_**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| operands | array\<And_FieldFilterExpressionType\_ \| Or_FieldFilterExpressionType\_ \| Not_FieldFilterExpressionType\_ \| Resource-Input \| Field \| Keyword \| DateCreated \| DateModified \| Label \| ResourceMimetype \| FieldMimetype \| Entity-Input \| Language \| OriginTag \| OriginMetadata \| OriginPath \| OriginSource \| OriginCollaborator \| nucliadb_models\_\_filters\_\_Generated\> | yes |  |  |

**Or_GraphNodesQuery\_**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| operands | array\<And_GraphNodesQuery\_ \| Or_GraphNodesQuery\_ \| Not_GraphNodesQuery\_ \| AnyNode \| nucliadb_models\_\_graph\_\_requests\_\_Generated\> | yes |  |  |

**Or_GraphPathQuery\_**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| operands | array\<And_GraphPathQuery\_ \| Or_GraphPathQuery\_ \| Not_GraphPathQuery\_ \| GraphPath-Input \| SourceNode \| DestinationNode \| AnyNode \| Relation-Input \| nucliadb_models\_\_graph\_\_requests\_\_Generated\> | yes |  |  |

**Or_GraphRelationsQuery\_**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| operands | array\<And_GraphRelationsQuery\_ \| Or_GraphRelationsQuery\_ \| Not_GraphRelationsQuery\_ \| Relation-Input \| nucliadb_models\_\_graph\_\_requests\_\_Generated\> | yes |  |  |

**Or_KVFilterExpression\_**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| operands | array\<And_KVFilterExpression\_ \| Or_KVFilterExpression\_ \| Not_KVFilterExpression\_ \| Eq \| Inequalities \| Contains\> | yes |  |  |

**Or_ParagraphFilterExpression\_**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| operands | array\<And_ParagraphFilterExpression\_ \| Or_ParagraphFilterExpression\_ \| Not_ParagraphFilterExpression\_ \| Label \| Kind\> | yes |  |  |

**Or_ResourceFilterExpression\_**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| operands | array\<And_ResourceFilterExpression\_ \| Or_ResourceFilterExpression\_ \| Not_ResourceFilterExpression\_ \| Resource-Input \| DateCreated \| DateModified \| Label \| ResourceMimetype \| Language \| OriginTag \| OriginMetadata \| OriginPath \| OriginSource \| OriginCollaborator \| Status\> | yes |  |  |

**Origin**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| source_id | string \| null |  |  |  |
| url | string \| null |  |  |  |
| created | string \| null |  |  |  |
| modified | string \| null |  |  |  |
| metadata | map\<string, string\> |  | {} | Generic metadata from the resource at the origin system. It can later be used for filtering on search endpoints with '/origin.metadata/{key}/{value}' |
| tags | array\<string\> |  | \[\] | Resource tags about the origin system. It can later be used for filtering on search endpoints with '/origin.tags/{tag}' |
| collaborators | array\<string\> |  | \[\] |  |
| filename | string \| null |  |  |  |
| related | array\<string\> |  | \[\] |  |
| path | string \| null |  |  | Path of the original resource. Typically used to store folder structure information of the resource at the origin system. It can be later used for filtering on search endpoints with '/origin.path/{pat… |
| sync_metadata | SyncMetadata \| null |  |  | Metadata related to the resource from the origin system fetched by the Progress Agentic RAG's Cloud Storage Sync service. |
| source | Source \| null |  | API |  |

**OriginCollaborator**

Matches the origin collaborators

| **Field**    | **Type** | **Req** | **Default**         | **Description** |
|--------------|----------|---------|---------------------|-----------------|
| prop         | string   |         | origin_collaborator |                 |
| collaborator | string   | yes     |                     | Collaborator    |

**OriginMetadata**

Matches metadata from the origin

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| prop | string |  | origin_metadata |  |
| field | string | yes |  | Metadata field |
| value | string \| null |  |  | Value of the metadata field. If blank, matches any document with the given metadata field set (to any value) |

**OriginPath**

Matches the origin path

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| prop | string |  | origin_path |  |
| prefix | string \| null |  |  | Prefix of the path, matches all paths under this prefixe.g: prefix=/dir/ matches /dir and /dir/a/b but not /dirrrr |

**OriginSource**

Matches the origin source id

| **Field** | **Type**       | **Req** | **Default**   | **Description** |
|-----------|----------------|---------|---------------|-----------------|
| prop      | string         |         | origin_source |                 |
| id        | string \| null |         |               | Source ID       |

**OriginTag**

Matches all fields with a given origin tag

| **Field** | **Type** | **Req** | **Default** | **Description**  |
|-----------|----------|---------|-------------|------------------|
| prop      | string   |         | origin_tag  |                  |
| tag       | string   | yes     |             | The tag to match |

**PageImageStrategy**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string |  | page_image |  |
| count | integer \| null |  |  | Maximum number of page images to retrieve. By default, at most 5 images are retrieved. |

**PageInformation**

| **Field**        | **Type**        | **Req** | **Default** | **Description** |
|------------------|-----------------|---------|-------------|-----------------|
| page             | integer \| null |         |             |                 |
| page_with_visual | boolean \| null |         |             |                 |

**PagePositions**

| **Field** | **Type**        | **Req** | **Default** | **Description** |
|-----------|-----------------|---------|-------------|-----------------|
| start     | integer \| null |         |             |                 |
| end       | integer \| null |         |             |                 |

**PageStructure**

| **Field** | **Type**                    | **Req** | **Default** | **Description** |
|-----------|-----------------------------|---------|-------------|-----------------|
| page      | PageStructurePage           | yes     |             |                 |
| tokens    | array\<PageStructureToken\> | yes     |             |                 |

**PageStructurePage**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| width     | integer  | yes     |             |                 |
| height    | integer  | yes     |             |                 |

**PageStructureToken**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| x         | number   | yes     |             |                 |
| y         | number   | yes     |             |                 |
| width     | number   | yes     |             |                 |
| height    | number   | yes     |             |                 |
| text      | string   | yes     |             |                 |
| line      | number   | yes     |             |                 |

**PalmKey**

| **Field**   | **Type** | **Req** | **Default** | **Description** |
|-------------|----------|---------|-------------|-----------------|
| credentials | string   |         |             |                 |
| location    | string   |         |             |                 |

**Paragraph**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| start | integer \| null |  |  |  |
| end | integer \| null |  |  |  |
| start_seconds | array\<integer\> \| null |  |  |  |
| end_seconds | array\<integer\> \| null |  |  |  |
| kind | TypeParagraph \| null |  |  |  |
| classifications | array\<Classification\> \| null |  |  |  |
| sentences | array\<Sentence\> \| null |  |  |  |
| key | string \| null |  |  |  |
| page | PageInformation \| null |  |  |  |
| representation | Representation \| null |  |  |  |
| relations | ParagraphRelations \| null |  |  |  |

**ParagraphAnnotation**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| classifications | array\<UserClassification\> |  | \[\] |  |
| key | string | yes |  |  |

**ParagraphImageStrategy**

| **Field** | **Type** | **Req** | **Default**     | **Description** |
|-----------|----------|---------|-----------------|-----------------|
| name      | string   |         | paragraph_image |                 |

**ParagraphRelations**

| **Field**    | **Type**        | **Req** | **Default** | **Description** |
|--------------|-----------------|---------|-------------|-----------------|
| parents      | array\<string\> |         | \[\]        |                 |
| siblings     | array\<string\> |         | \[\]        |                 |
| replacements | array\<string\> |         | \[\]        |                 |

**Paragraphs**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| results | array\<nucliadb_models\_\_search\_\_Paragraph\> |  | \[\] |  |
| facets | object (free-form map) \| null |  |  |  |
| query | string \| null |  |  |  |
| total | integer |  | 0 |  |
| page_number | integer |  | 0 |  |
| page_size | integer |  | 20 |  |
| next_page | boolean |  | False |  |
| min_score | number | yes |  | Minimum bm25 score used to filter bm25 index search. Results with a lower score have been ignored. |

**PathMetadata**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| field_id | string \| null |  |  | Field id where the relation has been extracted from |
| paragraph_id | string \| null |  |  | Paragraph id where the relation has been extracted from |

**Position**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| start     | integer  | yes     |             |                 |
| end       | integer  | yes     |             |                 |

**Positions**

| **Field** | **Type**          | **Req** | **Default** | **Description** |
|-----------|-------------------|---------|-------------|-----------------|
| position  | array\<Position\> | yes     |             |                 |
| entity    | string            | yes     |             |                 |

**PredictProxiedEndpoints**

Enum for the different endpoints that are proxied to the Predict API

**Enum:** tokens, chat, rephrase, run-agents-text, summarize, rerank,
remi

**PredictReranker**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string |  | predict |  |
| window | integer \| null |  |  | Number of elements reranker will use. Window must be greater or equal to topk. Greater values will improve results at cost of retrieval and reranking time. By default, this reranker uses a default of … |

**PreQueriesStrategy**

This strategy allows to run a set of queries before the main query and
add the results to the context. It allows to give more importance to
some queries over others by setting the weight of each query. The weight
of the main query can also be set with the main_query_weight parameter.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string |  | prequeries |  |
| queries | array\<PreQuery\> | yes |  | List of queries to run before the main query. The results are added to the context with the specified weights for each query. There is a limit of 10 prequeries per request. |
| main_query_weight | number |  | 1.0 | Weight of the main query in the context. Use this to control the importance of the main query in the context. |

**PreQuery**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| request | FindRequest | yes |  | The request to be executed before the main query. |
| weight | number |  | 1.0 | Weight of the prequery in the context. The weight is used to scale the results of the prequery before adding them to the context.The weight should be a positive number, and they are normalized so that… |
| id | string \| null |  |  | Identifier of the prequery. If not specified, it is autogenerated based on the index of the prequery in the list (prequery0, prequery1, ...). |
| prefilter | boolean |  | False | If set to true, the prequery results are used to filter the scope of the remaining queries. The resources of the most relevant paragraphs of the prefilter queries are used as resource filters for the … |

**PushProcessingOptions**

| **Field** | **Type**        | **Req** | **Default** | **Description** |
|-----------|-----------------|---------|-------------|-----------------|
| ml_text   | boolean \| null |         | True        |                 |

**QueryEntityDetection**

**Enum:** predict, suggest

**Question**

| **Field**      | **Type**        | **Req** | **Default** | **Description** |
|----------------|-----------------|---------|-------------|-----------------|
| text           | string          | yes     |             |                 |
| language       | string \| null  |         |             |                 |
| ids_paragraphs | array\<string\> | yes     |             |                 |

**QuestionAnswer**

| **Field** | **Type**        | **Req** | **Default** | **Description** |
|-----------|-----------------|---------|-------------|-----------------|
| question  | Question        | yes     |             |                 |
| answers   | array\<Answer\> | yes     |             |                 |

**QuestionAnswerAnnotation**

| **Field**         | **Type**       | **Req** | **Default** | **Description** |
|-------------------|----------------|---------|-------------|-----------------|
| question_answer   | QuestionAnswer | yes     |             |                 |
| cancelled_by_user | boolean        |         | False       |                 |

**QuestionAnswers**

| **Field**       | **Type**                | **Req** | **Default** | **Description** |
|-----------------|-------------------------|---------|-------------|-----------------|
| question_answer | array\<QuestionAnswer\> | yes     |             |                 |

**QueueType**

**Enum:** private, shared

**Range**

**Type:** object (free-form map)

**RankFusionName**

**Enum:** rrf

**Reasoning**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| display | boolean |  | True | Whether to display the reasoning steps in the response. |
| effort | enum\[none, minimal, low, medium, high, xhigh\] |  | medium | Level of reasoning effort. Used by OpenAI models to control the depth of reasoning. This parameter will be automatically mapped to budgettokens if the chosen model does not support effort. |
| budget_tokens | integer |  | 15000 | Token budget for reasoning. Used by Anthropic or Google models to limit the number of tokens used for reasoning. This parameter will be automatically mapped to effort if the chosen model does not supp… |

**ReciprocalRankFusion**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string |  | rrf |  |
| k | number |  | 60.0 | k parameter changes the influence top-ranked and lower-ranked elements have. Research has shown that 60 is a performant value across datasets |
| window | integer \| null |  |  | Number of elements for retrieval to do RRF. Window must be greater or equal to topk. Greater values will increase probability of multi match at cost of retrieval time |
| boosting | ReciprocalRankFusionWeights |  |  | Define different weights for each retriever. This allows to assign different priorities to different retrieval methods. RRF scores will be multiplied by this value. The default is 1 for each retriever… |

**ReciprocalRankFusionWeights**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| keyword   | number   |         | 1.0         |                 |
| semantic  | number   |         | 1.0         |                 |

**RelatedEntities**

| **Field** | **Type**               | **Req** | **Default** | **Description** |
|-----------|------------------------|---------|-------------|-----------------|
| total     | integer                |         | 0           |                 |
| entities  | array\<RelatedEntity\> |         | \[\]        |                 |

**RelatedEntity**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| family    | string   | yes     |             |                 |
| value     | string   | yes     |             |                 |

**Relation-Input**

| **Field** | **Type**              | **Req** | **Default** | **Description** |
|-----------|-----------------------|---------|-------------|-----------------|
| prop      | string                |         | relation    |                 |
| label     | string \| null        |         |             |                 |
| type      | RelationType \| null  |         |             |                 |
| match     | RelationMatchKindName |         | exact       |                 |

**Relation-Output**

| **Field** | **Type**                 | **Req** | **Default** | **Description** |
|-----------|--------------------------|---------|-------------|-----------------|
| relation  | RelationType             | yes     |             |                 |
| label     | string \| null           |         |             |                 |
| metadata  | RelationMetadata \| null |         |             |                 |
| from      | RelationEntity \| null   |         |             |                 |
| to        | RelationEntity           | yes     |             |                 |

**RelationDirection**

**Enum:** in, out

**RelationEdgeVector**

| **Field**      | **Type**        | **Req** | **Default** | **Description** |
|----------------|-----------------|---------|-------------|-----------------|
| relation_label | string          | yes     |             |                 |
| vector         | array\<number\> | yes     |             |                 |

**RelationEntity**

| **Field** | **Type**         | **Req** | **Default** | **Description** |
|-----------|------------------|---------|-------------|-----------------|
| value     | string           | yes     |             |                 |
| type      | RelationNodeType | yes     |             |                 |
| group     | string \| null   |         |             |                 |

**RelationMatchKindName**

**Enum:** exact, semantic

**RelationMetadata**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| paragraph_id | string \| null |  |  |  |
| source_start | integer \| null |  |  |  |
| source_end | integer \| null |  |  |  |
| to_start | integer \| null |  |  |  |
| to_end | integer \| null |  |  |  |
| data_augmentation_task_id | string \| null |  |  |  |

**RelationNodeType**

**Enum:** entity, label, resource, user

**RelationNodeVector**

| **Field**  | **Type**        | **Req** | **Default** | **Description** |
|------------|-----------------|---------|-------------|-----------------|
| node_value | string          | yes     |             |                 |
| vector     | array\<number\> | yes     |             |                 |

**RelationRanking**

**Enum:** reranker, generative

**Relations**

| **Field** | **Type**                      | **Req** | **Default** | **Description** |
|-----------|-------------------------------|---------|-------------|-----------------|
| entities  | map\<string, EntitySubgraph\> | yes     |             |                 |

**RelationType**

**Enum:** ABOUT, CHILD, COLAB, ENTITY, OTHER, SYNONYM

**Representation**

| **Field**      | **Type**        | **Req** | **Default** | **Description** |
|----------------|-----------------|---------|-------------|-----------------|
| is_a_table     | boolean \| null |         |             |                 |
| reference_file | string \| null  |         |             |                 |

**RequestSecurity**

Security metadata for the search request

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| access_groups | array\<string\> |  | \[\] | List of group ids to do the request with. |

**RequestsResult**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| processing_id | string | yes |  | Processing ID of the resource. |
| resource_id | string | yes |  | Resource ID. |
| kbid | string | yes |  |  |
| title | string \| null |  |  | Title of the resource. |
| labels | array\<string\> |  | \[\] | Labels of the resource. |
| completed | boolean | yes |  | Whether the resource has been completed |
| scheduled | boolean | yes |  | Whether the resource has been scheduled |
| timestamp | string | yes |  | Timestamp of when the resource was first scheduled. |
| completed_at | string \| null |  |  | Timestamp of when the resource was completed |
| scheduled_at | string \| null |  |  | Timestamp of when the resource was first scheduled. |
| failed | boolean |  | False | Whether the resource has failed to process |
| retries | integer |  | 0 | Number of retries for the resource. |
| schedule_eta | number |  | 0.0 | Estimated time until the resource is scheduled. |
| schedule_order | integer |  | 0 | Order of the resource in the schedule queue. |

**RequestsResults**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| results | array\<RequestsResult\> |  | \[\] | List of results. |
| cursor | string \| null |  |  | Cursor to use for the next page of results. |

**RerankerName**

Rerankers - Predict reranker: after retrieval, send the results to
Predict API to rerank it. This method uses a reranker model, so one can
expect better results at the expense of more latency. This will be the
new default - No-operation (noop) reranker: maintain order and do not
rerank the results a…

**Enum:** predict, noop

**Resource**

Matches all fields of a resource given its id or slug

| **Field** | **Type**       | **Req** | **Default** | **Description**               |
|-----------|----------------|---------|-------------|-------------------------------|
| prop      | string         |         | resource    |                               |
| id        | string \| null |         |             | UUID of the resource to match |
| slug      | string \| null |         |             | Slug of the resource to match |

**Resource-Input**

Matches all fields of a resource given its id or slug

| **Field** | **Type**       | **Req** | **Default** | **Description**               |
|-----------|----------------|---------|-------------|-------------------------------|
| prop      | string         |         | resource    |                               |
| id        | string \| null |         |             | UUID of the resource to match |
| slug      | string \| null |         |             | Slug of the resource to match |

**Resource-Output**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| id | string | yes |  |  |
| slug | string \| null |  |  |  |
| title | string \| null |  |  |  |
| summary | string \| null |  |  |  |
| icon | string \| null |  |  |  |
| thumbnail | string \| null |  |  |  |
| metadata | Metadata \| null |  |  |  |
| usermetadata | UserMetadata \| null |  |  |  |
| fieldmetadata | array\<UserFieldMetadata\> \| null |  |  |  |
| computedmetadata | ComputedMetadata \| null |  |  |  |
| created | string \| null |  |  |  |
| modified | string \| null |  |  |  |
| last_seqid | integer \| null |  |  |  |
| last_account_seq | integer \| null |  |  |  |
| queue | QueueType \| null |  |  |  |
| hidden | boolean \| null |  |  |  |
| origin | Origin \| null |  |  |  |
| extra | Extra \| null |  |  |  |
| relations | array\<Relation-Output\> \| null |  |  |  |
| data | ResourceData \| null |  |  |  |
| security | ResourceSecurity \| null |  |  | Resource security metadata |

**ResourceAgentsRequest**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| filters | array\<AgentsFilter\> \| null |  |  | Filters to apply to the agents. If None, all curently configured agents are applied. |
| agent_ids | array\<string\> \| null |  |  |  |

**ResourceAgentsResponse**

| **Field** | **Type**                      | **Req** | **Default** | **Description** |
|-----------|-------------------------------|---------|-------------|-----------------|
| results   | map\<string, AugmentedField\> | yes     |             |                 |

**ResourceCreated**

| **Field** | **Type**        | **Req** | **Default** | **Description** |
|-----------|-----------------|---------|-------------|-----------------|
| uuid      | string          | yes     |             |                 |
| elapsed   | number \| null  |         |             |                 |
| seqid     | integer \| null |         |             |                 |

**ResourceData**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| texts | map\<string, TextFieldData\> \| null |  |  |  |
| files | map\<string, FileFieldData\> \| null |  |  |  |
| links | map\<string, LinkFieldData\> \| null |  |  |  |
| conversations | map\<string, ConversationFieldData\> \| null |  |  |  |
| generics | map\<string, GenericFieldData\> \| null |  |  |  |
| key_values | map\<string, KeyValueFieldData\> \| null |  |  |  |

**ResourceField**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| field_type | FieldTypeName | yes |  | This map assumes that both values and extracted data field containers use the same names for its fields. See models.ResourceFieldValues and models.ResourceFieldExtractedData |
| field_id | string | yes |  |  |
| value | object |  |  |  |
| extracted | TextFieldExtractedData \| FileFieldExtractedData \| LinkFieldExtractedData \| ConversationFieldExtractedData \| null |  |  |  |
| error | Error \| null |  |  |  |
| status | string \| null |  |  |  |
| errors | array\<Error\> \| null |  |  |  |

**ResourceFieldAdded**

| **Field** | **Type**        | **Req** | **Default** | **Description** |
|-----------|-----------------|---------|-------------|-----------------|
| seqid     | integer \| null |         |             |                 |

**ResourceFieldPrefix**

Matches a field or set of fields. This filter is for internal use only
and is not exposed in the public API schema.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| prop | string |  | resource_field_prefix |  |
| resource_id | string \| null |  |  | ID of the resource containing the field(s) to match |
| resource_slug | string \| null |  |  | Slug of the resource containing the field(s) to match. |
| field_type | FieldTypeName | yes |  | Type of the fields to match |
| field_name_prefix | string | yes |  | Prefix of the name of the field to match. If blank, matches all fields of the given type in the given resource |

**ResourceFieldProperties**

**Enum:** value, extracted, error

**ResourceFileUploaded**

| **Field** | **Type**        | **Req** | **Default** | **Description** |
|-----------|-----------------|---------|-------------|-----------------|
| seqid     | integer \| null |         |             |                 |
| uuid      | string \| null  |         |             |                 |
| field_id  | string \| null  |         |             |                 |

**ResourceList**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| resources | array\<nucliadb_models\_\_resource\_\_Resource\> | yes |  |  |
| pagination | ResourcePagination | yes |  |  |

**ResourceMimetype**

Matches resources with a mimetype. The mimetype of a resource can be
assigned independently of the mimetype of its fields. In resources with
multiple fields, you may prefer to use field_mimetype

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| prop | string |  | resource_mimetype |  |
| type | string | yes |  | Type of the mimetype to match. e.g: In image/jpeg, type is image |
| subtype | string \| null |  |  | Type of the mimetype to match. e.g: In image/jpeg, subtype is jpeg.Leave blank to match all mimetype of the type |

**ResourcePagination**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| page      | integer  | yes     |             |                 |
| size      | integer  | yes     |             |                 |
| last      | boolean  | yes     |             |                 |

**ResourceProcessingStatus**

**Enum:** PENDING, PROCESSED, ERROR, EMPTY, BLOCKED, EXPIRED

**ResourceProperties**

**Enum:** basic, origin, extra, relations, values, extracted, errors,
security

**ResourceResult**

| **Field**  | **Type**                | **Req** | **Default** | **Description** |
|------------|-------------------------|---------|-------------|-----------------|
| score      | number \| integer       | yes     |             |                 |
| rid        | string                  | yes     |             |                 |
| field_type | string                  | yes     |             |                 |
| field      | string                  | yes     |             |                 |
| labels     | array\<string\> \| null |         |             |                 |

**Resources**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| results | array\<ResourceResult\> | yes |  |  |
| facets | object (free-form map) \| null |  |  |  |
| query | string \| null |  |  |  |
| total | integer |  | 0 |  |
| page_number | integer |  | 0 |  |
| page_size | integer |  | 20 |  |
| next_page | boolean |  | False |  |
| min_score | number | yes |  | Minimum bm25 score used to filter bm25 index search. Results with a lower score have been ignored. |

**ResourceSearchResults**

Search on resource results

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| sentences | Sentences \| null |  |  |  |
| paragraphs | Paragraphs \| null |  |  |  |
| relations | Relations \| null |  |  |  |
| nodes | array\<map\<string, string\>\> \| null |  |  |  |
| shards | array\<string\> \| null |  |  |  |

**ResourceSecurity**

Security metadata for the resource

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| access_groups | array\<string\> |  | \[\] | List of group ids that can access the resource. |

**ResourceUpdated**

| **Field** | **Type**        | **Req** | **Default** | **Description** |
|-----------|-----------------|---------|-------------|-----------------|
| seqid     | integer \| null |         |             |                 |

**Row**

| **Field** | **Type**                | **Req** | **Default** | **Description** |
|-----------|-------------------------|---------|-------------|-----------------|
| cell      | array\<string\> \| null |         |             |                 |

**RowsPreview**

| **Field** | **Type**                     | **Req** | **Default** | **Description** |
|-----------|------------------------------|---------|-------------|-----------------|
| sheets    | map\<string, Sheet\> \| null |         |             |                 |

**SCORE_TYPE**

**Enum:** VECTOR, BM25, BOTH, RERANKER, RELATION_RELEVANCE

**SearchOptions**

**Enum:** fulltext, keyword, relations, semantic

**SearchRequest**

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

**SemanticModelMetadata**

Metadata of the semantic model associated to the KB

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| similarity_function | VectorSimilarity | yes |  | Vector similarity algorithm that is applied on search |
| vector_dimension | integer \| null |  |  | Dimension of the indexed vectors/embeddings |
| default_min_score | number \| null |  |  | Deprecated |

**Sentence**

| **Field** | **Type**        | **Req** | **Default** | **Description** |
|-----------|-----------------|---------|-------------|-----------------|
| start     | integer \| null |         |             |                 |
| end       | integer \| null |         |             |                 |
| key       | string \| null  |         |             |                 |

**Sentences**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| results | array\<nucliadb_models\_\_search\_\_Sentence\> |  | \[\] |  |
| facets | object (free-form map) | yes |  |  |
| page_number | integer |  | 0 |  |
| page_size | integer |  | 20 |  |
| min_score | number | yes |  | Minimum similarity score used to filter vector index search. Results with a lower score have been ignored. |

**Sheet**

| **Field** | **Type**             | **Req** | **Default** | **Description** |
|-----------|----------------------|---------|-------------|-----------------|
| rows      | array\<Row\> \| null |         |             |                 |

**SortField**

**Enum:** score, created, modified, title

**SortOptions**

| **Field** | **Type**  | **Req** | **Default** | **Description** |
|-----------|-----------|---------|-------------|-----------------|
| field     | SortField | yes     |             |                 |
| order     | SortOrder |         | desc        |                 |

**SortOrder**

**Enum:** asc, desc

**Source**

**Enum:** WEB, DESKTOP, API, PYSDK

**SourceNode**

| **Field** | **Type**                 | **Req** | **Default** | **Description** |
|-----------|--------------------------|---------|-------------|-----------------|
| prop      | string                   |         | source_node |                 |
| value     | string \| null           |         |             |                 |
| match     | NodeMatchKindName        |         | exact       |                 |
| type      | RelationNodeType \| null |         | entity      |                 |
| group     | string \| null           |         |             |                 |

**SplitConfig**

| **Field**     | **Type** | **Req** | **Default** | **Description** |
|---------------|----------|---------|-------------|-----------------|
| max_paragraph | integer  |         | 0           |                 |

**SplitConfiguration**

Hey, developer! Keep this in sync with corresponding pydantic model in
learning_config.models

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string |  |  |  |
| max_paragraph | integer |  | 0 |  |
| custom_split | CustomSplitStrategy \| null |  |  |  |
| llm_split | LLMSplitConfig \| null |  |  |  |
| manual_split | ManualSplitConfig \| null |  |  |  |

**Status**

Matches resource in a certain processing status

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| prop | string |  | status |  |
| status | ResourceProcessingStatus | yes |  | The status of the resource |

**StatusResponse**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| status | Status | yes |  | Matches resource in a certain processing status |
| total | integer |  | 0 |  |
| processed | integer |  | 0 |  |
| retries | integer |  | 0 |  |

**StoredLearningConfiguration**

Model to map in a generic way what we really store on the db, without
valdations. As enum values containing the versions change from time to
time, and we don't keep historics, we cannot use the model enums here,
as it will fail with older values

| **Field**                  | **Type** | **Req** | **Default** | **Description** |
|----------------------------|----------|---------|-------------|-----------------|
| semantic_model             | string   | yes     |             |                 |
| anonymization_model        | string   | yes     |             |                 |
| generative_model           | string   | yes     |             |                 |
| ner_model                  | string   | yes     |             |                 |
| semantic_vector_similarity | string   | yes     |             |                 |
| semantic_vector_size       | integer  |         |             |                 |

**SuggestOptions**

**Enum:** paragraph, entities

**SuggestRequest**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| query | string | yes |  | The query to get suggestions for |
| features | array\<SuggestOptions\> |  | \['paragraph', 'entities'\] | Features enabled for the suggest endpoint. |
| filter_expression | FilterExpression \| null |  |  | Returns only documents that match this filter expression.Filtering examples can be found here: (see docs) This allows building complex filtering expressions and replaces the following parameters:field… |
| security | RequestSecurity \| null |  |  | Security metadata for the request. Please refer to the documentation for more details on how security works: (see docs) |
| show_hidden | boolean |  | False | If set to false (default), excludes hidden resources from search |
| highlight | boolean |  | False | If set to true, the query terms will be highlighted in the results between \<mark\>...\</mark\> tags |

**SummarizedResource**

| **Field** | **Type** | **Req** | **Default** | **Description**         |
|-----------|----------|---------|-------------|-------------------------|
| summary   | string   | yes     |             | Summary of the resource |
| tokens    | integer  | yes     |             |                         |

**SummarizedResponse**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| resources | map\<string, SummarizedResource\> |  | {} | Individual resource summaries. The key is the resource id or slug. |
| summary | string |  |  | Global summary of all resources combined. |
| consumption | Consumption \| null |  |  |  |

**SummarizeRequest**

Model for the request payload of the summarize endpoint

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| generative_model | string \| null |  |  | The generative model to use for the summarization. If not provided, the model configured for the Knowledge Box is used. |
| user_prompt | string \| null |  |  | Optional custom prompt input by the user |
| resources | array\<string\> | yes |  | Uids or slugs of the resources to summarize. If the resources are not found, they will be ignored. |
| summary_kind | SummaryKind |  | simple | Option to customize how the summary will be |

**SummaryKind**

**Enum:** simple, extended

**SyncAskMetadata**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| tokens | AskTokens \| null |  |  | Number of tokens used in the LLM context and answer |
| timings | AskTimings \| null |  |  | Timings of the generative model |

**SyncAskResponse**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| answer | string | yes |  | The generative answer to the query |
| reasoning | string \| null |  |  | The reasoning steps followed by the LLM to generate the answer. This is returned only if the reasoning feature is enabled in the request. |
| answer_json | object (free-form map) \| null |  |  | The generative JSON answer to the query. This is returned only if the answerjsonschema parameter is provided in the request. |
| status | string | yes |  | The status of the query execution. It can be 'success', 'error', 'nocontext' or 'noretrievaldata' |
| retrieval_results | KnowledgeboxFindResults | yes |  | The retrieval results of the query |
| retrieval_best_matches | array\<AskRetrievalMatch\> |  | \[\] | Sorted list of best matching text blocks in the retrieval step. This includes the main query and prequeries results, if any. |
| prequeries | map\<string, KnowledgeboxFindResults\> \| null |  |  | The retrieval results of the prequeries |
| learning_id | string |  |  | The id of the learning request. This id can be used to provide feedback on the learning process. |
| relations | Relations \| null |  |  | The detected relations of the answer |
| citations | object (free-form map) |  |  | The citations of the answer. List of references to the resources used to generate the answer. |
| citation_footnote_to_context | map\<string, string\> |  |  | Maps ids in the footnote citations to querycontext keys (normally paragraph ids) |
| augmented_context | AugmentedContext \| null |  |  | Augmented text blocks that were sent to the LLM as part of the RAG strategies applied on the retrieval results in the request. |
| prompt_context | array\<string\> \| null |  |  | The prompt context used to generate the answer. Returned only if the debug flag is set to true |
| predict_request | object (free-form map) \| null |  |  | The internal predict request used to generate the answer. Returned only if the debug flag is set to true |
| metadata | SyncAskMetadata \| null |  |  | Metadata of the query execution. This includes the number of tokens used in the LLM context and answer, and the timings of the generative model. |
| consumption | Consumption \| null |  |  | The consumption of the query execution. Return only if 'X-show-consumption' header is set to true in the request. |
| error_details | string \| null |  |  | Error details message in case there was an error |
| debug | object (free-form map) \| null |  |  | Debug information about the ask operation. The metadata included in this field is subject to change and should not be used in production. Note that it is only available if the debug parameter is set t… |

**SyncMetadata**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| file_id | string | yes |  | Identifier of the file in the origin cloud storage system |
| auth_provider | string | yes |  | Authentication provider used to access the origin cloud storage system |
| content_hash | string | yes |  | Content hash of the file in the origin cloud storage system. The hash algorithm used depends on the origin system. |

**TableImageStrategy**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| name      | string   |         | tables      |                 |

**TextBlockAugmentationType**

**Enum:** neighbouring_paragraphs, conversation, hierarchy,
full_resource, field_extension, metadata_extension

**TextField**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| body | string | yes |  | The text body. The format of the text should be specified in the format field. The sum of all text fields in the request may not exceed 2MB. If you need to store more text, consider using a file field… |
| format | TextFormat |  | PLAIN | The format of the text. |
| extract_strategy | string \| null |  |  | Id of the Nuclia extract strategy to use at processing time. If not set, the default strategy will be used. Extract strategies are defined at the learning configuration api. |
| split_strategy | string \| null |  |  | Id of the Nuclia split strategy used at processing time. If not set, the default strategy was used. Split strategies are defined at the learning configuration api. |

**TextFieldData**

| **Field** | **Type**                       | **Req** | **Default** | **Description** |
|-----------|--------------------------------|---------|-------------|-----------------|
| value     | FieldText \| null              |         |             |                 |
| extracted | TextFieldExtractedData \| null |         |             |                 |
| error     | Error \| null                  |         |             |                 |
| status    | string \| null                 |         |             |                 |
| errors    | array\<Error\> \| null         |         |             |                 |

**TextFieldExtractedData**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| text | ExtractedText \| null |  |  |  |
| metadata | FieldComputedMetadata \| null |  |  |  |
| large_metadata | LargeComputedMetadata \| null |  |  |  |
| vectors | VectorObject \| null |  |  |  |
| question_answers | FieldQuestionAnswers \| null |  |  |  |
| relation_node_vectors | map\<string, array\<RelationNodeVector\>\> \| null |  |  |  |
| relation_edge_vectors | map\<string, array\<RelationEdgeVector\>\> \| null |  |  |  |

**TextFormat**

**Enum:** PLAIN, HTML, RST, MARKDOWN, JSON, KEEP_MARKDOWN, JSONL,
PLAIN_BLANKLINE_SPLIT

**TextGenerationKey**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| model     | string   |         |             |                 |

**TextPosition**

| **Field**     | **Type**                 | **Req** | **Default** | **Description** |
|---------------|--------------------------|---------|-------------|-----------------|
| page_number   | integer \| null          |         |             |                 |
| index         | integer                  | yes     |             |                 |
| start         | integer                  | yes     |             |                 |
| end           | integer                  | yes     |             |                 |
| start_seconds | array\<integer\> \| null |         |             |                 |
| end_seconds   | array\<integer\> \| null |         |             |                 |

**TokensDetail**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| input     | number   | yes     |             |                 |
| output    | number   | yes     |             |                 |
| image     | number   | yes     |             |                 |

**TypeParagraph**

**Enum:** TEXT, OCR, INCEPTION, DESCRIPTION, TRANSCRIPT, TITLE, TABLE

**UpdateKVSchema**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| description | string \| null |  |  |  |
| fields | array\<KVSchemaField\> \| null |  |  |  |

**UpdateResourcePayload**

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

**UserClassification**

| **Field**         | **Type** | **Req** | **Default** | **Description** |
|-------------------|----------|---------|-------------|-----------------|
| labelset          | string   | yes     |             |                 |
| label             | string   | yes     |             |                 |
| cancelled_by_user | boolean  |         | False       |                 |

**UserFieldMetadata**

Field-level metadata set by the user via the rest api

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| paragraphs | array\<ParagraphAnnotation\> |  | \[\] |  |
| question_answers | array\<QuestionAnswerAnnotation\> |  | \[\] |  |
| field | FieldID | yes |  |  |

**UserLearningKeys**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| openai | OpenAIKey \| null |  |  |  |
| azure_openai | AzureOpenAIKey \| null |  |  |  |
| palm | PalmKey \| null |  |  |  |
| anthropic | AnthropicKey \| null |  |  |  |
| claude3 | AnthropicKey \| null |  |  |  |
| text_generation | TextGenerationKey \| null |  |  |  |
| mistral | MistralKey \| null |  |  |  |
| azure_mistral | AzureMistralKey \| null |  |  |  |
| hf_llm | HFLLMKey \| null |  |  |  |
| hf_embedding | HFEmbeddingKey \| null |  |  |  |

**UserMetadata**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| classifications | array\<UserClassification\> |  | \[\] |  |
| relations | array\<Relation-Output\> |  | \[\] |  |

**ValidationError**

| **Field** | **Type**                   | **Req** | **Default** | **Description** |
|-----------|----------------------------|---------|-------------|-----------------|
| loc       | array\<string \| integer\> | yes     |             |                 |
| msg       | string                     | yes     |             |                 |
| type      | string                     | yes     |             |                 |
| input     | object                     |         |             |                 |
| ctx       | object                     |         |             |                 |

**Vector**

| **Field**       | **Type**                | **Req** | **Default** | **Description** |
|-----------------|-------------------------|---------|-------------|-----------------|
| start           | integer \| null         |         |             |                 |
| end             | integer \| null         |         |             |                 |
| start_paragraph | integer \| null         |         |             |                 |
| end_paragraph   | integer \| null         |         |             |                 |
| vector          | array\<number\> \| null |         |             |                 |

**VectorObject**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| vectors | Vectors \| null |  |  |  |
| split_vectors | map\<string, Vectors\> \| null |  |  |  |
| deleted_splits | array\<string\> \| null |  |  |  |

**Vectors**

| **Field** | **Type**                | **Req** | **Default** | **Description** |
|-----------|-------------------------|---------|-------------|-----------------|
| vectors   | array\<Vector\> \| null |         |             |                 |

**VectorSimilarity**

**Enum:** cosine, dot

**VLLMExtractionConfig**

| **Field** | **Type**          | **Req** | **Default** | **Description** |
|-----------|-------------------|---------|-------------|-----------------|
| rules     | array\<string\>   |         |             |                 |
| llm       | LLMConfig \| null |         |             |                 |

**nua — 481 schemas**

**AccountTypes**

**Enum:** stash-trial, stash-starter, stash-growth, stash-startup,
stash-enterprise, stash-developer, stash-business, v3starter, v3fly,
v3growth, v3pro, v3enterprise, cowork

**AgentID**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| id        | string   | yes     |             |                 |

**AITables-Input**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| llm | LLMConfig-Input \| null |  |  |  |
| rules | array\<string\> |  |  |  |
| merge_pages | boolean \| null |  | False |  |
| max_pages_to_merge | integer \| null |  | 0 |  |

**AITables-Output**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| llm | LLMConfig-Output \| null |  |  |  |
| rules | array\<string\> |  |  |  |
| merge_pages | boolean \| null |  | False |  |
| max_pages_to_merge | integer \| null |  | 0 |  |

**AITablesConfig**

| **Field**           | **Type**        | **Req** | **Default** | **Description** |
|---------------------|-----------------|---------|-------------|-----------------|
| generative_model    | string \| null  |         |             |                 |
| generative_provider | string \| null  |         |             |                 |
| rules               | array\<string\> |         | \[\]        |                 |
| merge_pages         | boolean \| null |         |             |                 |
| max_pages_to_merge  | integer \| null |         |             |                 |

**And_FieldFilterExpressionType\_**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| operands | array\<And_FieldFilterExpressionType\_ \| Or_FieldFilterExpressionType\_ \| Not_FieldFilterExpressionType\_ \| Resource-Input \| Field \| Keyword \| DateCreated \| DateModified \| Label \| ResourceMimetype \| FieldMimetype \| Entity-Input \| Language \| OriginTag \| OriginMetadata \| OriginPath \| OriginSource \| OriginCollaborator \| Generated\> | yes |  |  |

**And_GraphPathQuery\_**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| operands | array\<And_GraphPathQuery\_ \| Or_GraphPathQuery\_ \| Not_GraphPathQuery\_ \| GraphPath \| SourceNode \| DestinationNode \| AnyNode \| Relation-Input \| nucliadb_models\_\_graph\_\_requests\_\_Generated\> | yes |  |  |

**And_KVFilterExpression\_**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| operands | array\<And_KVFilterExpression\_ \| Or_KVFilterExpression\_ \| Not_KVFilterExpression\_ \| Eq \| Inequalities \| Contains\> | yes |  |  |

**And_ParagraphFilterExpression\_**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| operands | array\<And_ParagraphFilterExpression\_ \| Or_ParagraphFilterExpression\_ \| Not_ParagraphFilterExpression\_ \| Label \| Kind\> | yes |  |  |

**AnonymizationModel**

**Enum:** disabled, multilingual

**Answer**

| **Field**      | **Type**        | **Req** | **Default** | **Description** |
|----------------|-----------------|---------|-------------|-----------------|
| text           | string          | yes     |             |                 |
| language       | string \| null  |         |             |                 |
| ids_paragraphs | array\<string\> | yes     |             |                 |

**AnswerRelevance**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| score     | integer  | yes     |             |                 |
| reason    | string   | yes     |             |                 |

**AnthropicBedrockKey**

| **Field**  | **Type** | **Req** | **Default** | **Description** |
|------------|----------|---------|-------------|-----------------|
| access_key | string   | yes     |             |                 |
| secret_key | string   | yes     |             |                 |

**AnthropicKey**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| key       | string   |         |             |                 |

**AnthropicUserPrompt**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| prompt    | string   |         |             |                 |

**AnthropicVertexKey**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| credentials | string | yes |  | Service Account Key credentials in JSON format for Vertex AI access |
| location | string |  |  | GCP region where the model will be accessed from. E.g. us-central1 |

**AnyNode**

| **Field** | **Type**                 | **Req** | **Default** | **Description** |
|-----------|--------------------------|---------|-------------|-----------------|
| prop      | string                   |         | node        |                 |
| value     | string \| null           |         |             |                 |
| match     | NodeMatchKindName        |         | exact       |                 |
| type      | RelationNodeType \| null |         | entity      |                 |
| group     | string \| null           |         |             |                 |

**ApplyOptions**

Defines how the tasks should be applied to the existing data. -
EXSITING: Only apply to existing data (starts a worker that executes the
task) - NEW: Only apply to new data (enables the task at processing
time) - ALL: Apply to all data (both of the above)

**Enum:** EXISTING, NEW, ALL

**ApplyTo**

**Enum:** 0, 1

**AskOperation**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| question | string | yes |  |  |
| destination | string | yes |  |  |
| json | boolean |  | False |  |
| triggers | array\<Trigger\> |  |  |  |
| user_prompt | string |  |  | Prompt to use when executing the agent over a field, it must include the {context} placeholder and optionally the {question} placeholder if you wish. If not given, the default prompt will be used. Onl… |
| store_as_key_value | boolean |  | False | When set to true and json is also true, the generated JSON output is stored as a FieldKeyValue instead of a JSON TextField. Only applies to ApplyTo.FIELD mode. |
| kv_schema_id | string |  |  | The ID of the KV schema registered in the KnowledgeBox that the generated JSON output should conform to. Required when storeaskeyvalue is true. Falls back to destination if not set. |

**AskRequest**

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

**AskRetrievalMatch**

| **Field** | **Type** | **Req** | **Default** | **Description**               |
|-----------|----------|---------|-------------|-------------------------------|
| id        | string   | yes     |             | Id of the matching text block |

**AskTimings**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| generative_first_chunk | number \| null |  |  | Time the LLM took to generate the first chunk of the answer |
| generative_total | number \| null |  |  | Total time the LLM took to generate the answer |

**AskTokens**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| input | integer | yes |  | Number of LLM tokens used for the context in the query |
| output | integer | yes |  | Number of LLM tokens used for the answer |
| input_nuclia | number \| null |  |  | Number of Nuclia LLM tokens used for the context in the query |
| output_nuclia | number \| null |  |  | Number of Nuclia LLM tokens used for the answer |

**AssetList**

| **Field** | **Type**               | **Req** | **Default** | **Description** |
|-----------|------------------------|---------|-------------|-----------------|
| assets    | array\<AssetResponse\> | yes     |             |                 |

**AssetResponse**

Returned to the worker after a successful upload.

| **Field**    | **Type** | **Req** | **Default** | **Description** |
|--------------|----------|---------|-------------|-----------------|
| id           | string   | yes     |             |                 |
| task_id      | string   | yes     |             |                 |
| task_name    | string   | yes     |             |                 |
| kbid         | string   | yes     |             |                 |
| account_id   | string   | yes     |             |                 |
| created_at   | string   | yes     |             |                 |
| content_type | string   | yes     |             |                 |

**AssetSignedURL**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| url       | string   | yes     |             |                 |

**AssistantMessage**

| **Field**  | **Type**                 | **Req** | **Default** | **Description** |
|------------|--------------------------|---------|-------------|-----------------|
| type       | string                   |         | assistant   |                 |
| author     | Author                   |         | NUCLIA      |                 |
| text       | string                   |         |             |                 |
| content    | object                   |         |             |                 |
| tool_calls | array\<MessageToolCall\> |         |             |                 |

**AssumeRoleType**

**Enum:** 0, 1

**Audio**

Data about a previous audio response from the model. \[Learn more\]((see
docs)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| id        | string   | yes     |             |                 |

**AugmentedContext**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| paragraphs | map\<string, AugmentedTextBlock\> |  | {} | Paragraphs added to the context as a result of using the ragstrategies parameter, typically the neighbouringparagraphs or the conversation strategies |
| fields | map\<string, AugmentedTextBlock\> |  | {} | Field extracted texts added to the context as a result of using the ragstrategies parameter, typically the hierarcy or fullresource strategies. |

**AugmentedTextBlock**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| id | string | yes |  | The id of the augmented text bloc. It can be a paragraph id or a field id. |
| text | string | yes |  | The text of the augmented text block. It may include additional metadata to enrich the context |
| position | TextPosition \| null |  |  | Metadata about the position of the text block in the original document. |
| parent | string \| null |  |  | The parent text block that was augmented for. |
| augmentation_type | TextBlockAugmentationType | yes |  | Type of augmentation. |

**Author**

**Enum:** NUCLIA, USER

**AzureAIIKey**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| key       | string   |         |             |                 |
| url       | string   |         |             |                 |
| model     | string   |         |             |                 |

**AzureMistralKey**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| key       | string   |         |             |                 |
| url       | string   |         |             |                 |

**AzureMistralUserPrompt**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| prompt    | string   |         |             |                 |
| system    | string   |         |             |                 |

**AzureOpenAIKey**

| **Field**  | **Type** | **Req** | **Default** | **Description** |
|------------|----------|---------|-------------|-----------------|
| key        | string   |         |             |                 |
| url        | string   |         |             |                 |
| deployment | string   |         |             |                 |
| model      | string   |         |             |                 |

**AzureUserPrompt**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| system    | string   |         |             |                 |
| prompt    | string   |         |             |                 |

**BaseConfig**

**Type:** object

**BaseModel**

**Type:** object

**BedrockAssumeRoleFinishRequest**

| **Field** | **Type** | **Req** | **Default** | **Description**                    |
|-----------|----------|---------|-------------|------------------------------------|
| role_arn  | string   | yes     |             | ARN of the role created in AWS IAM |

**BedrockAssumeRoleStartResponse**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| external_id | string | yes |  | External ID for assuming role |
| aws_account_id | string | yes |  | AWS Account ID to assume role into |
| role_name | string | yes |  | Name of the role to be created in AWS IAM |

**Body_import_retrieval_agent_api_v1_agent\_\_agent_id\_\_import_post**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| file | string | yes |  |  |
| passphrase | string | yes |  | Passphrase for the encrypted export file |
| overwrite | boolean |  | False | Whether to overwrite existing agent configuration. If false and the agent configuration is not empty, the import will fail. |

**ChatCompletionAllowedToolChoiceParam**

Constrains the tools available to the model to a pre-defined set.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| allowed_tools | ChatCompletionAllowedToolsParam | yes |  | Constrains the tools available to the model to a pre-defined set. |
| type | string | yes |  |  |

**ChatCompletionAllowedToolsParam**

Constrains the tools available to the model to a pre-defined set.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| mode | enum\[auto, required\] | yes |  |  |
| tools | array\<object (free-form map)\> | yes |  |  |

**ChatCompletionAssistantMessageParam**

Messages sent by the model in response to user messages.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| role | string | yes |  |  |
| audio | Audio \| null |  |  |  |
| content | string \| array\<ChatCompletionContentPartTextParam \| ChatCompletionContentPartRefusalParam\> \| null |  |  |  |
| function_call | FunctionCall \| null |  |  |  |
| name | string |  |  |  |
| refusal | string \| null |  |  |  |
| tool_calls | array\<ChatCompletionMessageFunctionToolCallParam \| ChatCompletionMessageCustomToolCallParam\> |  |  |  |

**ChatCompletionContentPartImageParam**

Learn about \[image inputs\]((see docs)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| image_url | ImageURL | yes     |             |                 |
| type      | string   | yes     |             |                 |

**ChatCompletionContentPartInputAudioParam**

Learn about \[audio inputs\]((see docs)

| **Field**   | **Type**   | **Req** | **Default** | **Description** |
|-------------|------------|---------|-------------|-----------------|
| input_audio | InputAudio | yes     |             |                 |
| type        | string     | yes     |             |                 |

**ChatCompletionContentPartRefusalParam**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| refusal   | string   | yes     |             |                 |
| type      | string   | yes     |             |                 |

**ChatCompletionContentPartTextParam**

Learn about \[text inputs\]((see docs)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| text      | string   | yes     |             |                 |
| type      | string   | yes     |             |                 |

**ChatCompletionDeveloperMessageParam**

Developer-provided instructions that the model should follow, regardless
of messages sent by the user. With o1 models and newer, developer
messages replace the previous system messages.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| content | string \| array\<ChatCompletionContentPartTextParam\> | yes |  |  |
| role | string | yes |  |  |
| name | string |  |  |  |

**ChatCompletionFunctionMessageParam**

| **Field** | **Type**       | **Req** | **Default** | **Description** |
|-----------|----------------|---------|-------------|-----------------|
| content   | string \| null | yes     |             |                 |
| name      | string         | yes     |             |                 |
| role      | string         | yes     |             |                 |

**ChatCompletionFunctionToolParam**

A function tool that can be used to generate a response.

| **Field** | **Type**           | **Req** | **Default** | **Description** |
|-----------|--------------------|---------|-------------|-----------------|
| function  | FunctionDefinition | yes     |             |                 |
| type      | string             | yes     |             |                 |

**ChatCompletionMessageCustomToolCallParam**

A call to a custom tool created by the model.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| id | string | yes |  |  |
| custom | openai\_\_types\_\_chat\_\_chat_completion_message_custom_tool_call_param\_\_Custom | yes |  | The custom tool that the model called. |
| type | string | yes |  |  |

**ChatCompletionMessageFunctionToolCallParam**

A call to a function tool created by the model.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| id | string | yes |  |  |
| function | openai\_\_types\_\_chat\_\_chat_completion_message_function_tool_call_param\_\_Function | yes |  | The function that the model called. |
| type | string | yes |  |  |

**ChatCompletionNamedToolChoiceCustomParam**

Specifies a tool the model should use. Use to force the model to call a
specific custom tool.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| custom | openai\_\_types\_\_chat\_\_chat_completion_named_tool_choice_custom_param\_\_Custom | yes |  |  |
| type | string | yes |  |  |

**ChatCompletionNamedToolChoiceParam**

Specifies a tool the model should use. Use to force the model to call a
specific function.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| function | openai\_\_types\_\_chat\_\_chat_completion_named_tool_choice_param\_\_Function | yes |  |  |
| type | string | yes |  |  |

**ChatCompletionSystemMessageParam**

Developer-provided instructions that the model should follow, regardless
of messages sent by the user. With o1 models and newer, use developer
messages for this purpose instead.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| content | string \| array\<ChatCompletionContentPartTextParam\> | yes |  |  |
| role | string | yes |  |  |
| name | string |  |  |  |

**ChatCompletionToolMessageParam**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| content | string \| array\<ChatCompletionContentPartTextParam\> | yes |  |  |
| role | string | yes |  |  |
| tool_call_id | string | yes |  |  |

**ChatCompletionUserMessageParam**

Messages sent by an end user, containing prompts or additional context
information.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| content | string \| array\<ChatCompletionContentPartTextParam \| ChatCompletionContentPartImageParam \| ChatCompletionContentPartInputAudioParam \| File\> | yes |  |  |
| role | string | yes |  |  |
| name | string |  |  |  |

**ChatContextMessage**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| author    | Author   | yes     |             |                 |
| text      | string   | yes     |             |                 |

**ChatModel**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| question | string | yes |  |  |
| retrieval | boolean |  | True |  |
| user_id | string |  | system |  |
| system | string \| null |  |  |  |
| chat_history | array\<AssistantMessage \| ToolMessage \| Message\> |  |  |  |
| context | array\<Message\> |  | \[\] |  |
| query_context | array\<string\> \| map\<string, string\> |  | {} |  |
| query_context_order | map\<string, integer\> |  | {} |  |
| truncate | boolean \| null |  | True |  |
| user_prompt | UserPrompt \| null |  |  |  |
| citations | boolean \| CitationsType \| null |  |  | Whether to include citations in the response. If set to None or False, no citations will be computed. If set to True or 'default', citations will be computed after answer generation and send as a sepa… |
| citation_threshold | number \| null |  |  | If citations is set to True or 'default', this will be the similarity threshold. Value between 0 and 1, lower values will produce more citations. If not set, it will be set to the optimized threshold … |
| generative_model | string \| null |  |  |  |
| max_tokens | integer \| null |  |  |  |
| query_context_images | array\<Image\> \| map\<string, Image\> |  | {} |  |
| prefer_markdown | boolean \| null |  |  |  |
| json_schema | object (free-form map) \| null |  |  |  |
| format_prompt | boolean |  | True |  |
| rerank_context | boolean |  | False | Whether to reorder the query context based on a reranker. This option will also make it so the first response will contain the scores given for each context piece. |
| tools | array\<Tool\> |  |  | List of tools to choose |
| tool_choice | ToolChoiceAuto \| ToolChoiceNone \| ToolChoiceRequired \| ToolChoiceForced |  | {'type': 'required'} | Tool choice strategy. auto: The model decides whether to use a tool or not based on the prompt and available tools. required (default): A tool must be used.none: Disables tool usage even if tools are … |
| seed | integer \| null |  |  | Seed use for the generative model for a deterministic output. |
| reasoning | Reasoning \| boolean |  | False | Reasoning options for the generative model. Set to True to enable default reasoning, False to disable, or provide a Reasoning object for custom options. |
| image_generation | boolean |  | False | Whether to enable image generation in the response. |

**ChatOptions**

**Enum:** keyword, relations, semantic

**CitationsType**

**Enum:** none, default, llm_footnotes

**Classification**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| labelset  | string   | yes     |             |                 |
| label     | string   | yes     |             |                 |

**ClassificationLabel**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| label     | string   | yes     |             |                 |
| labelset  | string   | yes     |             |                 |

**Claude3UserPrompt**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| system    | string   |         |             |                 |
| prompt    | string   |         |             |                 |

**CloudLink**

| **Field**    | **Type**        | **Req** | **Default** | **Description** |
|--------------|-----------------|---------|-------------|-----------------|
| uri          | string \| null  |         |             |                 |
| size         | integer \| null |         |             |                 |
| content_type | string \| null  |         |             |                 |
| filename     | string \| null  |         |             |                 |
| md5          | string \| null  |         |             |                 |

**ComputedMetadata**

The purpose of this field is to show a cherry-picked set of fields from
computed metadata without having to load the whole computed metadata
field.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| field_classifications | array\<FieldClassification\> |  | \[\] |  |

**ConfigSchema**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| semantic_model | ConfigSchemaOptions \| null |  |  |  |
| semantic_models | ConfigSchemaOptions \| null |  |  |  |
| default_semantic_model | ConfigSchemaOptions \| null |  |  |  |
| anonymization_model | ConfigSchemaOptions | yes |  |  |
| visual_labeling | ConfigSchemaOptions \| null |  |  |  |
| generative_model | ConfigSchemaOptions \| null |  |  |  |
| ner_model | ConfigSchemaOptions \| null |  |  |  |
| relation_model | ConfigSchemaOptions \| null |  |  |  |
| summary_model | ConfigSchemaOptions \| null |  |  |  |
| summary | ConfigSchemaOptions \| null |  |  |  |
| user_keys | ConfigSchemaElements \| null |  |  |  |
| user_prompts | ConfigSchemaElements \| null |  |  |  |
| summary_prompt | ConfigSchemaElements \| null |  |  |  |
| prefer_markdown_generative_response | ConfigSchemaElements \| null |  |  |  |
| semantic_graph_node_models | ConfigSchemaOptions \| null |  |  |  |
| default_semantic_graph_node_model | ConfigSchemaOptions \| null |  |  |  |
| semantic_graph_edge_models | ConfigSchemaOptions \| null |  |  |  |
| default_semantic_graph_edge_model | ConfigSchemaOptions \| null |  |  |  |

**ConfigSchemaElements**

| **Field** | **Type**               | **Req** | **Default** | **Description** |
|-----------|------------------------|---------|-------------|-----------------|
| schemas   | object (free-form map) | yes     |             |                 |
| create    | boolean                |         | False       |                 |
| update    | boolean                |         | False       |                 |

**ConfigSchemaOptions**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| options | array\<GenerativeOption\> \| array\<Option\> | yes |  |  |
| default | string \| null |  |  |  |
| create | boolean |  | False |  |
| update | boolean |  | False |  |
| multiple | boolean |  | False |  |

**Consumption**

| **Field**           | **Type**     | **Req** | **Default** | **Description** |
|---------------------|--------------|---------|-------------|-----------------|
| normalized_tokens   | TokensDetail | yes     |             |                 |
| customer_key_tokens | TokensDetail | yes     |             |                 |

**ConsumptionResponse**

| **Field**           | **Type**     | **Req** | **Default** | **Description** |
|---------------------|--------------|---------|-------------|-----------------|
| normalized_tokens   | TokensDetail | yes     |             |                 |
| customer_key_tokens | TokensDetail | yes     |             |                 |

**Contains**

Computes whether a value exists inside a range

| **Field** | **Type**          | **Req** | **Default** | **Description** |
|-----------|-------------------|---------|-------------|-----------------|
| schema_id | string            | yes     |             |                 |
| key       | string            | yes     |             |                 |
| contains  | integer \| number | yes     |             |                 |

**ConversationalStrategy**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string |  | conversation |  |
| attachments_text | boolean |  | False | Add attachments on context retrieved on conversation |
| attachments_images | boolean |  | False | Add attachments images on context retrieved on conversation if they are mime type image and using a visual LLM |
| full | boolean |  | False | Add all conversation fields on matched blocks |
| max_messages | integer |  | 15 | Max messages to append in case its not full field |

**ConversationFieldData**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| value | FieldConversation \| null |  |  |  |
| extracted | ConversationFieldExtractedData \| null |  |  |  |
| error | Error \| null |  |  |  |
| status | string \| null |  |  |  |
| errors | array\<Error\> \| null |  |  |  |

**ConversationFieldExtractedData**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| text | ExtractedText \| null |  |  |  |
| metadata | FieldComputedMetadata \| null |  |  |  |
| large_metadata | LargeComputedMetadata \| null |  |  |  |
| vectors | VectorObject \| null |  |  |  |
| question_answers | FieldQuestionAnswers \| null |  |  |  |
| relation_node_vectors | map\<string, array\<RelationNodeVector\>\> \| null |  |  |  |
| relation_edge_vectors | map\<string, array\<RelationEdgeVector\>\> \| null |  |  |  |

**CreateAccountCustomModel**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| model_types | array\<StringModelTypes\> | yes |  |  |
| location | string | yes |  |  |
| description | string \| null |  |  |  |
| trained_date | string |  | 2026-07-22T10:44:48.440834 |  |
| trained_kbid | string |  |  |  |
| openai_compat | OpenAICompatModel-Input \| null |  |  |  |

**CreateDefaultModelConfig**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| default_model_id | string | yes |  | Identifier of the public model to add to the account. e.g: 'chatgpt-azure-4-turbo' or 'claude-3' |
| description | string \| null |  |  | Description for the model config |
| user_keys | UserLearningKeys \| null |  |  | Custom user keys for the model. If not set, Nuclia keys will be used. |
| user_prompts | UserPrompts \| null |  |  | Custom user prompts for the model. If not set, Nuclia prompts will be used. |
| assume_role | AssumeRoleType \| null |  |  | Assume role type for models that require it (e.g., AWS Bedrock) |
| kbids | array\<string\> |  |  | List of KB IDs where this default model config is allowed. Empty list means it is allowed in all KBs (default). |

**CustomAccountModel**

This is the pydantic model for the model details in the account.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| model_id | string | yes |  |  |
| account | string | yes |  |  |
| model_type | StringModelTypes \| null | yes |  |  |
| trained_date | string \| null | yes |  |  |
| location | string \| null | yes |  |  |
| trained_kbid | string \| null | yes |  |  |
| model_types | array\<StringModelTypes\> |  | \[\] |  |
| log | string \| null | yes |  |  |
| kbids | array\<string\> | yes |  |  |
| openai_compat | OpenAICompatModel-Output \| null |  |  |  |

**CustomAccountModelListItem**

This is the pydantic model for the listing of models in the account.

| **Field**    | **Type**                  | **Req** | **Default** | **Description** |
|--------------|---------------------------|---------|-------------|-----------------|
| model_id     | string                    | yes     |             |                 |
| account      | string                    | yes     |             |                 |
| model_type   | StringModelTypes \| null  | yes     |             |                 |
| trained_date | string \| null            | yes     |             |                 |
| location     | string \| null            | yes     |             |                 |
| trained_kbid | string \| null            | yes     |             |                 |
| model_types  | array\<StringModelTypes\> |         | \[\]        |                 |
| title        | string \| null            | yes     |             |                 |

**CustomPrompt**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| system | string \| null |  |  | System prompt given to the generative model responsible of generating the answer. This can help customize the behavior of the model when generating the answer. If not specified, the default model prov… |
| user | string \| null |  |  | User prompt given to the generative model responsible of generating the answer. Use the words {context} and {question} in brackets where you want those fields to be placed, in case you want them in yo… |
| rephrase | string \| null |  |  | Rephrase prompt given to the generative model responsible for rephrasing the query for a more effective retrieval step. This is only used if the rephrase flag is set to true in the request. If not spe… |

**CustomSplitStrategy**

**Enum:** NONE, MANUAL, LLM

**DataAugmentation-Input**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string |  |  |  |
| on | ApplyTo |  | 0 | Defines if the task should be applied to paragraphs (0) or whole fields (1) |
| filter | Filter \| null |  |  | Filter to apply the data augmentation |
| operations | array\<Operation-Input\> |  |  |  |
| llm | LLMConfig-Input |  |  |  |
| filter_expression_json | string \| null |  |  | JSON representation of the filter expression, used to filter the data augmentation in the UI. If set, it takes precedence over the filter field |

**DataAugmentation-Output**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string |  |  |  |
| on | ApplyTo |  | 0 | Defines if the task should be applied to paragraphs (0) or whole fields (1) |
| filter | Filter \| null |  |  | Filter to apply the data augmentation |
| operations | array\<Operation-Output\> |  |  |  |
| llm | LLMConfig-Output |  |  |  |
| filter_expression_json | string \| null |  |  | JSON representation of the filter expression, used to filter the data augmentation in the UI. If set, it takes precedence over the filter field |

**DataResidencyStatus**

**Enum:** unknown, guaranteed, not_guaranteed

**Dataset**

| **Field**     | **Type**               | **Req** | **Default** | **Description** |
|---------------|------------------------|---------|-------------|-----------------|
| id            | string                 | yes     |             |                 |
| timestamp     | string                 | yes     |             |                 |
| account_id    | string                 | yes     |             |                 |
| nua_client_id | string                 | yes     |             |                 |
| account_type  | string                 | yes     |             |                 |
| type          | string                 | yes     |             |                 |
| path          | string                 | yes     |             |                 |
| filter        | object (free-form map) | yes     |             |                 |
| name          | string \| null         |         |             |                 |

**DatasetCreated**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| id        | string   | yes     |             |                 |

**DatasetFilter**

| **Field** | **Type**        | **Req** | **Default** | **Description** |
|-----------|-----------------|---------|-------------|-----------------|
| labels    | array\<string\> | yes     |             |                 |

**DatasetInfo**

| **Field** | **Type**      | **Req** | **Default** | **Description** |
|-----------|---------------|---------|-------------|-----------------|
| name      | string        | yes     |             |                 |
| filter    | DatasetFilter | yes     |             |                 |
| type      | Task-Input    | yes     |             |                 |

**DatasetsList**

| **Field** | **Type**         | **Req** | **Default** | **Description** |
|-----------|------------------|---------|-------------|-----------------|
| datasets  | array\<Dataset\> | yes     |             |                 |

**DateCreated**

Matches all fields created in a date range

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| prop | string |  | created |  |
| since | string \| null |  |  | Start of the date range. Leave blank for unbounded |
| until | string \| null |  |  | End of the date range. Leave blank for unbounded |

**DateModified**

Matches all fields modified in a date range

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| prop | string |  | modified |  |
| since | string \| null |  |  | Start of the date range. Leave blank for unbounded |
| until | string \| null |  |  | End of the date range. Leave blank for unbounded |

**DeepSeekUserPrompt**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| system    | string   |         |             |                 |
| prompt    | string   |         |             |                 |

**DefaultModelConfig**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| id | string | yes |  | Unique identifier of the default model configuration (UUID format). e.g: '3fa85f64-5717-4562-b3fc-2c963f66afa6' |
| default_model_id | string | yes |  | Identifier of the default model to add to the account. e.g: 'chatgpt-azure-4-turbo' or 'claude-3' |
| description | string \| null |  |  | Description for the model config |
| user_keys | UserLearningKeys \| null |  |  | Custom user keys for the model. If not set, Nuclia keys will be used. |
| user_prompts | UserPrompts \| null |  |  | Custom user prompts for the model. If not set, Nuclia prompts will be used. |
| assume_role | AssumeRoleType \| null |  |  | Assume role type for models that require it (e.g., AWS Bedrock) |
| kbids | array\<string\> |  |  | List of KB IDs where this default model config is allowed. Empty list means it is allowed in all KBs. |

**DefaultModelConfigListItem**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| id | string | yes |  | Unique identifier of the default model configuration (UUID format). e.g: '3fa85f64-5717-4562-b3fc-2c963f66afa6' |
| default_model_id | string | yes |  | Identifier of the default model to add to the account. e.g: 'chatgpt-azure-4-turbo' or 'claude-3' |
| description | string \| null |  |  | Description for the model config |
| assume_role | AssumeRoleType \| null |  |  | Assume role type for models that require it (e.g., AWS Bedrock) |
| kbids | array\<string\> |  |  | List of KB IDs where this default model config is allowed. Empty list means it is allowed in all KBs. |

**DestinationNode**

| **Field** | **Type**                 | **Req** | **Default**      | **Description** |
|-----------|--------------------------|---------|------------------|-----------------|
| prop      | string                   |         | destination_node |                 |
| value     | string \| null           |         |                  |                 |
| match     | NodeMatchKindName        |         | exact            |                 |
| type      | RelationNodeType \| null |         | entity           |                 |
| group     | string \| null           |         |                  |                 |

**DirectionalRelation**

| **Field**      | **Type**                 | **Req** | **Default** | **Description** |
|----------------|--------------------------|---------|-------------|-----------------|
| entity         | string                   | yes     |             |                 |
| entity_type    | RelationNodeType         | yes     |             |                 |
| entity_subtype | string                   | yes     |             |                 |
| relation       | RelationType             | yes     |             |                 |
| relation_label | string                   | yes     |             |                 |
| direction      | RelationDirection        | yes     |             |                 |
| metadata       | RelationMetadata \| null |         |             |                 |
| resource_id    | string                   | yes     |             |                 |

**DownloadStatus**

| **Field**    | **Type**               | **Req** | **Default** | **Description** |
|--------------|------------------------|---------|-------------|-----------------|
| id           | string                 | yes     |             |                 |
| type         | string                 | yes     |             |                 |
| status       | enum\[pending, ready\] | yes     |             |                 |
| download_url | string \| null         | yes     |             |                 |
| query        | object (free-form map) | yes     |             |                 |

**DriverConfig**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| id | string \| null |  |  |  |
| identifier | string | yes |  |  |
| name | string | yes |  |  |
| provider | object | yes |  | The type of driver, e.g., 'google', 'marklogic', etc. |
| config | EncryptedPayload | yes |  | The configuration specific to the driver. |

**DriverID**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| id        | string   | yes     |             |                 |

**EdgeEmbeddingModel**

**Enum:** multilingual-graph-v1

**Effort**

**Enum:** 0, 1, 2, 3, 4, 5

**Effort-Input**

**Enum:** 0, 1, 2, 3, 4, 5

**EmbeddingModel**

| **Field** | **Type**        | **Req** | **Default** | **Description** |
|-----------|-----------------|---------|-------------|-----------------|
| object    | string          |         | embedding   |                 |
| index     | integer         |         | 0           |                 |
| embedding | array\<number\> | yes     |             |                 |

**EmbeddingsRequestModel**

| **Field** | **Type**                  | **Req** | **Default** | **Description** |
|-----------|---------------------------|---------|-------------|-----------------|
| input     | array\<string\> \| string | yes     |             |                 |
| model     | string \| null            |         |             |                 |

**EmbeddingsResponseModel**

| **Field** | **Type**                | **Req** | **Default** | **Description** |
|-----------|-------------------------|---------|-------------|-----------------|
| object    | string                  |         | list        |                 |
| data      | array\<EmbeddingModel\> | yes     |             |                 |
| model     | string                  | yes     |             |                 |
| usage     | EmbeddingUsageData      | yes     |             |                 |

**EmbeddingUsageData**

| **Field**     | **Type** | **Req** | **Default** | **Description** |
|---------------|----------|---------|-------------|-----------------|
| prompt_tokens | integer  | yes     |             |                 |
| total_tokens  | integer  | yes     |             |                 |

**EncryptedPayload**

**Type:** object

**Entity-Input**

Matches fields that contains a detected entity

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| prop | string |  | entity |  |
| subtype | string | yes |  | Type of the entity. e.g: PERSON |
| value | string \| null |  |  | Value of the entity. e.g: Anna. If blank, matches any entity of the given type |

**Entity-Output**

| **Field** | **Type**       | **Req** | **Default** | **Description** |
|-----------|----------------|---------|-------------|-----------------|
| token     | string \| null |         |             |                 |
| root      | string \| null |         |             |                 |
| type      | string \| null |         |             |                 |

**EntityDefinition**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| label | string | yes |  | Entity type |
| description | string \| null |  |  | Description of the entity type |

**EntityExample**

| **Field** | **Type** | **Req** | **Default** | **Description**                 |
|-----------|----------|---------|-------------|---------------------------------|
| name      | string   | yes     |             | Name associated with the entity |
| label     | string   | yes     |             | Type of entity                  |

**EntitySubgraph**

| **Field**  | **Type**                     | **Req** | **Default** | **Description** |
|------------|------------------------------|---------|-------------|-----------------|
| related_to | array\<DirectionalRelation\> | yes     |             |                 |

**Eq**

Equal (==) operator

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| schema_id | string | yes |  |  |
| key | string | yes |  |  |
| eq | boolean \| integer \| number \| string | yes |  |  |

**Error**

| **Field** | **Type**       | **Req** | **Default** | **Description** |
|-----------|----------------|---------|-------------|-----------------|
| body      | string         | yes     |             |                 |
| code      | integer        | yes     |             |                 |
| code_str  | string         | yes     |             |                 |
| created   | string \| null | yes     |             |                 |
| severity  | string         | yes     |             |                 |

**Extra**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| metadata | object (free-form map) | yes |  | Arbitrary JSON metadata provided by the user that is not meant to be searchable, but can be serialized on results. |

**ExtractConfig**

| **Field**   | **Type**                     | **Req** | **Default** | **Description** |
|-------------|------------------------------|---------|-------------|-----------------|
| name        | string                       | yes     |             |                 |
| vllm_config | VLLMExtractionConfig \| null |         |             |                 |
| ai_tables   | AITablesConfig \| null       |         |             |                 |

**ExtractConfig-Input**

Hey, developer! Keep this in sync with corresponding pydantic model in
learning_config.models

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string |  |  |  |
| vllm_config | VLLMExtractionConfig-Input \| null |  |  |  |
| ai_tables | AITables-Input \| null |  |  |  |
| split | SplitConfig \| null |  |  |  |
| max_parallel_llm_calls | integer |  | 0 |  |

**ExtractConfig-Output**

Hey, developer! Keep this in sync with corresponding pydantic model in
learning_config.models

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string |  |  |  |
| vllm_config | VLLMExtractionConfig-Output \| null |  |  |  |
| ai_tables | AITables-Output \| null |  |  |  |
| split | SplitConfig \| null |  |  |  |
| max_parallel_llm_calls | integer |  | 0 |  |

**ExtractedDataTypeName**

**Enum:** text, metadata, shortened_metadata, large_metadata, vectors,
link, file, question_answers, relation_vectors

**ExtractedText**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| text | string \| null |  |  |  |
| split_text | map\<string, string\> \| null |  |  |  |
| deleted_splits | array\<string\> \| null |  |  |  |

**ExtractOperation**

| **Field** | **Type**         | **Req** | **Default** | **Description** |
|-----------|------------------|---------|-------------|-----------------|
| model     | Model            |         | 0           |                 |
| triggers  | array\<Trigger\> |         |             |                 |

**Features**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| reasoning | ReasoningConfig \| null |  |  |  |
| tools | BaseConfig \| null |  |  |  |
| structured_output | StructuredOutputConfig \| null |  |  |  |
| vision | BaseConfig \| null |  |  |  |
| streaming | BaseConfig \| null |  |  |  |
| system_message | BaseConfig \| null |  |  |  |
| text_extraction | BaseConfig \| null |  |  |  |
| custom_keys | BaseConfig \| null |  |  |  |
| file_input | BaseConfig \| null |  |  |  |
| image_generation | BaseConfig \| null |  |  |  |

**Field**

Matches a field or set of fields

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| prop | string |  | field |  |
| type | FieldTypeName | yes |  | Type of the field to match, |
| name | string \| null |  |  | Name of the field to match. If blank, matches all fields of the given type |

**FieldClassification**

| **Field**       | **Type**                | **Req** | **Default** | **Description** |
|-----------------|-------------------------|---------|-------------|-----------------|
| field           | FieldID                 | yes     |             |                 |
| classifications | array\<Classification\> |         | \[\]        |                 |

**FieldComputedMetadata**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| metadata | FieldMetadata | yes |  |  |
| split_metadata | map\<string, FieldMetadata\> \| null |  |  |  |
| deleted_splits | array\<string\> \| null |  |  |  |

**FieldConversation**

This is a metadata representation of a conversation about how many pages
of messages and total of messages we have. This class is used mainly
when exposing a conversation in the resource level

| **Field**        | **Type**        | **Req** | **Default** | **Description** |
|------------------|-----------------|---------|-------------|-----------------|
| pages            | integer \| null |         |             |                 |
| size             | integer \| null |         |             |                 |
| total            | integer \| null |         |             |                 |
| extract_strategy | string \| null  |         |             |                 |
| split_strategy   | string \| null  |         |             |                 |

**FieldEntities**

Wrapper for the entities extracted from a field (required because
protobuf doesn't support lists of lists)

| **Field** | **Type**             | **Req** | **Default** | **Description** |
|-----------|----------------------|---------|-------------|-----------------|
| entities  | array\<FieldEntity\> | yes     |             |                 |

**FieldEntity**

| **Field** | **Type**          | **Req** | **Default** | **Description** |
|-----------|-------------------|---------|-------------|-----------------|
| text      | string            | yes     |             |                 |
| label     | string            | yes     |             |                 |
| positions | array\<Position\> | yes     |             |                 |

**FieldExtensionStrategy**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string |  | field_extension |  |
| fields | array\<string\> |  | \[\] | List of field ids to extend the context with. It will try to extend the retrieval context with the specified fields in the matching resources. The field ids have to be in the format {fieldtype}/{field… |
| data_augmentation_field_prefixes | array\<string\> |  | \[\] | List of prefixes for data augmentation added fields to extend the context with. For example, if the prefix is 'simpson', all fields that are a result of data augmentation with that prefix will be used… |

**FieldFile**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| added | string \| null |  |  |  |
| file | CloudLink \| null |  |  |  |
| language | string \| null |  |  |  |
| password | string \| null |  |  |  |
| external | boolean |  | False |  |
| extract_strategy | string \| null |  |  | Id of the Nuclia extract strategy used at processing time. If not set, the default strategy was used. Extract strategies are defined at the learning configuration api. |
| split_strategy | string \| null |  |  | Id of the Nuclia split strategy used at processing time. If not set, the default strategy was used. Split strategies are defined at the learning configuration api. |

**FieldID**

| **Field**  | **Type**  | **Req** | **Default** | **Description** |
|------------|-----------|---------|-------------|-----------------|
| field_type | FieldType | yes     |             |                 |
| field      | string    | yes     |             |                 |

**FieldLargeMetadata**

| **Field** | **Type**                       | **Req** | **Default** | **Description** |
|-----------|--------------------------------|---------|-------------|-----------------|
| entities  | array\<Entity-Output\> \| null |         |             |                 |
| tokens    | map\<string, integer\> \| null |         |             |                 |

**FieldLink**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| added | string \| null |  |  |  |
| headers | map\<string, string\> \| null |  |  |  |
| cookies | map\<string, string\> \| null |  |  |  |
| uri | string \| null |  |  |  |
| language | string \| null |  |  |  |
| localstorage | map\<string, string\> \| null |  |  |  |
| css_selector | string \| null |  |  |  |
| xpath | string \| null |  |  |  |
| extract_strategy | string \| null |  |  | Id of the Nuclia extract strategy used at processing time. If not set, the default strategy was used. Extract strategies are defined at the learning configuration api. |
| split_strategy | string \| null |  |  | Id of the Nuclia split strategy used at processing time. If not set, the default strategy was used. Split strategies are defined at the learning configuration api. |

**FieldMetadata**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| links | array\<string\> | yes |  |  |
| paragraphs | array\<Paragraph\> | yes |  |  |
| ner | map\<string, string\> | yes |  |  |
| entities | map\<string, FieldEntities\> | yes |  |  |
| classifications | array\<Classification\> | yes |  |  |
| last_index | string \| null |  |  |  |
| last_understanding | string \| null |  |  |  |
| last_extract | string \| null |  |  |  |
| last_summary | string \| null |  |  |  |
| last_processing_start | string \| null |  |  |  |
| thumbnail | CloudLink \| null |  |  |  |
| language | string \| null |  |  |  |
| summary | string \| null |  |  |  |
| positions | map\<string, Positions\> | yes |  |  |
| relations | array\<Relation-Output\> \| null |  |  |  |
| mime_type | string \| null |  |  |  |

**FieldMimetype**

Matches fields with a mimetype

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| prop | string |  | field_mimetype |  |
| type | string | yes |  | Type of the mimetype to match. e.g: In image/jpeg, type is image |
| subtype | string \| null |  |  | Type of the mimetype to match. e.g: In image/jpeg, subtype is jpeg.Leave blank to match all mimetype of the type |

**FieldQuestionAnswers**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| question_answers | QuestionAnswers | yes |  |  |
| split_question_answers | map\<string, QuestionAnswers\> \| null |  |  |  |
| deleted_splits | array\<string\> \| null |  |  |  |

**FieldText**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| body | string \| null |  |  |  |
| format | TextFormat \| null |  |  |  |
| md5 | string \| null |  |  |  |
| extract_strategy | string \| null |  |  | Id of the Nuclia extract strategy used at processing time. If not set, the default strategy was used. Extract strategies are defined at the learning configuration api. |
| split_strategy | string \| null |  |  | Id of the Nuclia split strategy used at processing time. If not set, the default strategy was used. Split strategies are defined at the learning configuration api. |

**FieldType**

**Enum:** file, link, text, generic, conversation

**FieldTypeName**

This map assumes that both values and extracted data field containers
use the same names for its fields. See models.ResourceFieldValues and
models.ResourceFieldExtractedData

**Enum:** text, file, link, conversation, generic, key_value

**File**

Learn about \[file inputs\]((see docs) for text generation.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| file      | FileFile | yes     |             |                 |
| type      | string   | yes     |             |                 |

**FileExtractedData**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| language | string \| null |  |  |  |
| md5 | string \| null |  |  |  |
| metadata | map\<string, string\> \| null |  |  |  |
| nested | map\<string, string\> \| null |  |  |  |
| file_generated | map\<string, CloudLink\> \| null |  |  |  |
| file_rows_previews | map\<string, RowsPreview\> \| null |  |  |  |
| file_preview | CloudLink \| null |  |  |  |
| file_pages_previews | FilePages \| null |  |  |  |
| file_thumbnail | CloudLink \| null |  |  |  |
| field | string \| null |  |  |  |
| icon | string \| null |  |  |  |
| nested_position | map\<string, NestedPosition\> \| null |  |  |  |
| nested_list_position | map\<string, NestedListPosition\> \| null |  |  |  |

**FileFieldData**

| **Field** | **Type**                       | **Req** | **Default** | **Description** |
|-----------|--------------------------------|---------|-------------|-----------------|
| value     | FieldFile \| null              |         |             |                 |
| extracted | FileFieldExtractedData \| null |         |             |                 |
| error     | Error \| null                  |         |             |                 |
| status    | string \| null                 |         |             |                 |
| errors    | array\<Error\> \| null         |         |             |                 |

**FileFieldExtractedData**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| text | ExtractedText \| null |  |  |  |
| metadata | FieldComputedMetadata \| null |  |  |  |
| large_metadata | LargeComputedMetadata \| null |  |  |  |
| vectors | VectorObject \| null |  |  |  |
| question_answers | FieldQuestionAnswers \| null |  |  |  |
| relation_node_vectors | map\<string, array\<RelationNodeVector\>\> \| null |  |  |  |
| relation_edge_vectors | map\<string, array\<RelationEdgeVector\>\> \| null |  |  |  |
| file | FileExtractedData \| null |  |  |  |

**FileFile**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| file_data | string   |         |             |                 |
| file_id   | string   |         |             |                 |
| filename  | string   |         |             |                 |

**FilePages**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| pages | array\<CloudLink\> \| null |  |  |  |
| positions | array\<PagePositions\> \| null |  |  |  |
| structures | array\<PageStructure\> \| null |  |  |  |

**Filter**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| contains | array\<string\> |  |  | Text that must be contained in the field in order to apply the data augmentation, if multiple values are provided, they will be combined with the specified operator |
| resource_type | array\<string\> |  |  | Data Augmentation will only be applied to resources of the specified types, if multiple values are provided, they will be combined with the specified operator |
| field_types | array\<string\> |  |  | Data Augmentation will only be applied to fields of the specified types |
| not_field_types | array\<string\> |  |  | Data Augmentation will not be applied to fields of the specified types |
| rids | array\<string\> |  |  | Data Augmentation will only be applied resources matching the specified resource ids |
| fields | array\<string\> |  |  | Data Augmentation will only be applied to fields matching the specified field ids |
| splits | array\<string\> |  |  | Data Augmentation will only be applied to fields matching the specified field splits |
| labels | array\<string\> |  |  | Data Augmentation will only be applied to fields matching the specified labels, if multiple values are provided, they will be combined with the specified operator |
| apply_to_agent_generated_fields | boolean |  | False | If enabled, the data augmentation will also be applied to fields generated by other data augmentation agents. This functionality is only supported for agents that do not generate fields. |
| contains_operator | FilterLogicalOperator |  | 0 | Way of combining the values in the contains field |
| labels_operator | FilterLogicalOperator |  | 0 | Way of combining the values in the labels field |

**FilterExpression**

Returns only documents that match this filter expression. Filtering
examples can be found here: (see docs) This allows building complex
filtering expressions and replaces the following parameters: fields,
filters, range\_\*, resource_filters, keyword_filters.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| field | And_FieldFilterExpressionType\_ \| Or_FieldFilterExpressionType\_ \| Not_FieldFilterExpressionType\_ \| Resource-Input \| Field \| Keyword \| DateCreated \| DateModified \| Label \| ResourceMimetype \| FieldMimetype \| Entity-Input \| Language \| OriginTag \| OriginMetadata \| OriginPath \| OriginSource \| OriginCollaborator \| Generated \| null |  |  | Filter to apply to fields |
| paragraph | And_ParagraphFilterExpression\_ \| Or_ParagraphFilterExpression\_ \| Not_ParagraphFilterExpression\_ \| Label \| Kind \| null |  |  | Filter to apply to each text block |
| operator | Operator |  | and | How to combine field and paragraph filters (default is AND).AND returns text blocks that match both filters.OR returns textblocks that match one of the two filters |

**FilterLogicalOperator**

**Enum:** 0, 1

**FindField**

| **Field**  | **Type**                     | **Req** | **Default** | **Description** |
|------------|------------------------------|---------|-------------|-----------------|
| paragraphs | map\<string, FindParagraph\> | yes     |             |                 |

**FindOptions**

**Enum:** keyword, semantic, relations, graph

**FindParagraph**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| score | number | yes |  |  |
| score_type | SCORE_TYPE | yes |  |  |
| order | integer |  | 0 |  |
| text | string | yes |  |  |
| id | string | yes |  |  |
| labels | array\<string\> \| null |  | \[\] |  |
| position | TextPosition \| null |  |  |  |
| fuzzy_result | boolean |  | False |  |
| page_with_visual | boolean |  | False | This flag informs if the page may have information that has not been extracted |
| reference | string \| null |  |  | Reference to the extracted image that represents this paragraph |
| is_a_table | boolean |  | False | The referenced image of the paragraph is a table |
| relevant_relations | Relations \| null |  |  | Relevant relations from which the paragraph was found, will only be filled if using the Graph RAG Strategy |

**FindRequest**

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
| graph_query | And_GraphPathQuery\_ \| Or_GraphPathQuery\_ \| Not_GraphPathQuery\_ \| GraphPath \| SourceNode \| DestinationNode \| AnyNode \| Relation-Input \| nucliadb_models\_\_graph\_\_requests\_\_Generated \| null |  |  | Query for the knowledge graph. Paths (node-relation-node) extracted from a paragraphid will be used to extend the results |
| features | array\<FindOptions\> |  | \['keyword', 'semantic'\] | List of search features to use. Each value corresponds to a lookup into on of the different indexes |
| rank_fusion | RankFusionName \| ReciprocalRankFusion |  | rrf | Rank fusion algorithm to use to merge results from multiple retrievers (keyword, semantic) |
| reranker | RerankerName \| PredictReranker |  | predict | Reranker let you specify which method you want to use to rerank your results at the end of retrieval |
| keyword_filters | array\<string\> \| array\<Filter\> |  | \[\] | List of keyword filter expressions to apply to the retrieval step. The text block search will only be performed on the documents that contain the specified keywords. The filters are case-insensitive, … |
| search_configuration | string \| null |  |  | Load find parameters from this configuration. Parameters in the request override parameters from the configuration. |
| generative_model | string \| null |  |  | The generative model used to rephrase the query. If not provided, the model configured for the Knowledge Box is used. |

**FindResource**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| id | string | yes |  |  |
| slug | string \| null |  |  |  |
| title | string \| null |  |  |  |
| summary | string \| null |  |  |  |
| icon | string \| null |  |  |  |
| thumbnail | string \| null |  |  |  |
| metadata | Metadata \| null |  |  |  |
| usermetadata | UserMetadata \| null |  |  |  |
| fieldmetadata | array\<UserFieldMetadata\> \| null |  |  |  |
| computedmetadata | ComputedMetadata \| null |  |  |  |
| created | string \| null |  |  |  |
| modified | string \| null |  |  |  |
| last_seqid | integer \| null |  |  |  |
| last_account_seq | integer \| null |  |  |  |
| queue | QueueType \| null |  |  |  |
| hidden | boolean \| null |  |  |  |
| origin | Origin \| null |  |  |  |
| extra | Extra \| null |  |  |  |
| relations | array\<Relation-Output\> \| null |  |  |  |
| data | ResourceData \| null |  |  |  |
| security | ResourceSecurity \| null |  |  | Resource security metadata |
| fields | map\<string, FindField\> | yes |  |  |

**Format**

**Enum:** 0, 1, 2, 3, 4, 5, 6, 7

**FullResourceApplyTo**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| exclude | array\<string\> |  |  | Resources from matches containing any of these labels won't expand to the full resource. This may be useful to exclude long and not interesting resources and expend less tokens |

**FullResourceStrategy**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string |  | full_resource |  |
| count | integer \| null |  |  | Maximum number of full documents to retrieve. If not specified, all matching documents are retrieved. |
| include_remaining_text_blocks | boolean |  | False | Whether to include the remaining text blocks after the maximum number of resources has been reached. |
| apply_to | FullResourceApplyTo \| null |  |  | Define which resources to exclude from serialization |

**FunctionCall**

Deprecated and replaced by tool_calls. The name and arguments of a
function that should be called, as generated by the model.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| arguments | string   | yes     |             |                 |
| name      | string   | yes     |             |                 |

**FunctionDefinition**

| **Field**   | **Type**               | **Req** | **Default** | **Description** |
|-------------|------------------------|---------|-------------|-----------------|
| name        | string                 | yes     |             |                 |
| description | string                 |         |             |                 |
| parameters  | object (free-form map) |         |             |                 |
| strict      | boolean \| null        |         |             |                 |

**Generated**

Matches if the field was generated by the given source

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| prop | string |  | generated |  |
| by | string | yes |  | Generator for this field. Currently, only data-augmentation is supported |
| da_task | string \| null |  |  | Matches field generated by an specific DA task, given its prefix |

**GenerationConfig**

Stores parameters involved in generation that may vary from request to
request

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| temperature | number |  | 0.0 | Temperature to use when sampling |
| default_max_completion_tokens | integer |  | 800 | Maximum number of output tokens to request by default |
| max_input_tokens | integer |  | 64000 | Maximum number of input tokens supported by the model. |
| max_supported_completion_tokens | integer \| null |  |  | Maximum number of output tokens supported by the model, if not set, no check will be done that the supplied maxtokens is less than this value |

**GenerativeDrivers**

**Enum:** microsoft, google, nuclia, hf, mistral, claude3,
microsoft_mistral, openai, huggingface, vertex, azure_aii,
openai_compat, bedrock, none, custom, dummy

**GenerativeOption**

| **Field**   | **Type**       | **Req** | **Default** | **Description** |
|-------------|----------------|---------|-------------|-----------------|
| name        | string         | yes     |             |                 |
| description | string \| null |         |             |                 |
| value       | string         | yes     |             |                 |
| provider    | string         | yes     |             |                 |
| user_prompt | string \| null |         |             |                 |
| user_key    | string \| null |         |             |                 |

**Generator**

**Enum:** data-augmentation, processor, user

**GenericFieldData**

| **Field** | **Type**                       | **Req** | **Default** | **Description** |
|-----------|--------------------------------|---------|-------------|-----------------|
| value     | string \| null                 |         |             |                 |
| extracted | TextFieldExtractedData \| null |         |             |                 |
| error     | Error \| null                  |         |             |                 |
| status    | string \| null                 |         |             |                 |
| errors    | array\<Error\> \| null         |         |             |                 |

**GraphEdgeSearch**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| vectors | map\<string, map\<string, array\<number\>\>\> | yes |  | Graph edge embeddings for each edge and semantic model. Structure: {model: {edge: vector}} |
| timings | map\<string, number\> | yes |  | Time taken to compute the graph edge embedding for each semantic model |
| consumption | ConsumptionResponse \| null |  |  | Consumption details for the graph edge embeddings operation |

**GraphExtractionExample**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| entities | array\<EntityExample\> | yes |  | Examples of entities extracted from the example text |
| relations | array\<RelationExample\> | yes |  | Examples of relations extracted from the example text, all entities must be included in the entities list |
| text | string | yes |  | Example text where entities and relations were extracted |

**GraphNode**

| **Field** | **Type**                 | **Req** | **Default** | **Description** |
|-----------|--------------------------|---------|-------------|-----------------|
| value     | string \| null           |         |             |                 |
| match     | NodeMatchKindName        |         | exact       |                 |
| type      | RelationNodeType \| null |         | entity      |                 |
| group     | string \| null           |         |             |                 |

**GraphNodeSearch**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| vectors | map\<string, map\<string, array\<number\>\>\> | yes |  | Graph node embeddings for each node and semantic model. Structure: {model: {node: vector}} |
| timings | map\<string, number\> | yes |  | Time taken to compute the graph node embedding for each semantic model |
| consumption | ConsumptionResponse \| null |  |  | Consumption details for the graph node embeddings operation |

**GraphOperation-Input**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| entity_defs | array\<EntityDefinition\> |  |  | Types of entities that will be considered for extraction |
| examples | array\<GraphExtractionExample\> |  |  | Examples to be sent to the model as few-shot learning |
| ident | string | yes |  |  |
| triggers | array\<Trigger\> |  |  |  |

**GraphOperation-Output**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| entity_defs | array\<EntityDefinition\> |  |  | Types of entities that will be considered for extraction |
| examples | array\<GraphExtractionExample\> |  |  | Examples to be sent to the model as few-shot learning |
| ident | string | yes |  |  |
| triggers | array\<Trigger\> |  |  |  |

**GraphPath**

| **Field**   | **Type**              | **Req** | **Default** | **Description** |
|-------------|-----------------------|---------|-------------|-----------------|
| prop        | string                |         | path        |                 |
| source      | GraphNode \| null     |         |             |                 |
| relation    | GraphRelation \| null |         |             |                 |
| destination | GraphNode \| null     |         |             |                 |
| undirected  | boolean               |         | False       |                 |

**GraphRelation**

| **Field** | **Type**             | **Req** | **Default** | **Description** |
|-----------|----------------------|---------|-------------|-----------------|
| label     | string \| null       |         |             |                 |
| type      | RelationType \| null |         |             |                 |

**GraphStrategy**

This strategy retrieves context pieces by exploring the Knowledge Graph,
starting from the entities present in the query. It works best if the
Knowledge Box has a user-defined Graph Extraction agent enabled.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string |  | graph_beta |  |
| hops | integer |  | 3 | Number of hops to take when exploring the graph for relevant context. For example, - hops=1 will explore the neighbors of the starting entities. - hops=2 will explore the neighbors of the neighbors of… |
| top_k | integer |  |  | Number of relationships to keep after each hop after ranking them by relevance to the query. This number correlates to more paragraphs being sent as context. If not set, this number will be set to 30 … |
| agentic_graph_only | boolean |  | True | If set to true, only relationships extracted from a graph extraction agent are considered for context expansion. |
| relation_text_as_paragraphs | boolean |  | False | If set to true, the text of the relationships is to create context paragraphs, this enables to use bigger top K values without running into the generative model's context limits. If set to false, the … |
| relation_ranking | RelationRanking |  | reranker | Method to rank relationships. - reranker uses the reranker model to rank relationships. - generative uses first the reranker to first lower the amount of relationships and then the generative model to… |
| query_entity_detection | QueryEntityDetection |  | predict | Method to detect entities in the query. - predict uses NUA to detect entities in the query, slower and more accurate but requires an exact text match between Knowledge Box entities and entities in the… |
| weight | number |  | 3.0 | Weight of the graph strategy in the context. The weight is used to scale the results of the strategy before adding them to the context.The weight should be a positive number. |

**GuardOperation**

| **Field** | **Type**         | **Req** | **Default** | **Description** |
|-----------|------------------|---------|-------------|-----------------|
| enabled   | boolean          |         | False       |                 |
| triggers  | array\<Trigger\> |         |             |                 |

**HFEmbeddingKey**

| **Field**      | **Type**         | **Req** | **Default** | **Description** |
|----------------|------------------|---------|-------------|-----------------|
| url            | string           | yes     |             |                 |
| key            | string           | yes     |             |                 |
| matryoshka     | array\<integer\> |         | \[\]        |                 |
| similarity     | string           | yes     |             |                 |
| size           | integer          | yes     |             |                 |
| threshold      | number           | yes     |             |                 |
| passage_prompt | string           | yes     |             |                 |
| query_prompt   | string           | yes     |             |                 |

**HFLLMKey**

| **Field** | **Type**  | **Req** | **Default** | **Description** |
|-----------|-----------|---------|-------------|-----------------|
| key       | string    |         |             |                 |
| url       | string    |         |             |                 |
| model     | ModelType |         | 0           |                 |

**HFUserPrompt**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| system    | string   |         |             |                 |
| prompt    | string   | yes     |             |                 |

**HierarchyResourceStrategy**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string |  | hierarchy |  |
| count | integer |  | 0 | Number of extra characters that are added to each matching paragraph when adding to the context. |

**HistoryQuestionAnswer**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| question  | string   | yes     |             |                 |
| answer    | string   | yes     |             |                 |

**HTTPValidationError**

| **Field** | **Type**                 | **Req** | **Default** | **Description** |
|-----------|--------------------------|---------|-------------|-----------------|
| detail    | array\<ValidationError\> |         |             |                 |

**Image**

| **Field**    | **Type** | **Req** | **Default** | **Description** |
|--------------|----------|---------|-------------|-----------------|
| content_type | string   | yes     |             |                 |
| b64encoded   | string   | yes     |             |                 |

**ImageURL**

| **Field** | **Type**                | **Req** | **Default** | **Description** |
|-----------|-------------------------|---------|-------------|-----------------|
| url       | string                  | yes     |             |                 |
| detail    | enum\[auto, low, high\] |         |             |                 |

**Inequalities**

Inequality operators that can be grouped to perform range queries.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| schema_id | string | yes |  |  |
| key | string | yes |  |  |
| gte | integer \| number \| string \| null |  |  |  |
| lte | integer \| number \| string \| null |  |  |  |

**InputAudio**

| **Field** | **Type**         | **Req** | **Default** | **Description** |
|-----------|------------------|---------|-------------|-----------------|
| data      | string           | yes     |             |                 |
| format    | enum\[wav, mp3\] | yes     |             |                 |

**InteractionOperation**

**Enum:** 0, 1

**InteractionRequest**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| question | string | yes |  |  |
| headers | map\<string, string\> |  | {} |  |
| arguments | map\<string, string\> |  | {} |  |
| chat_history | array\<HistoryQuestionAnswer\> \| null |  |  | Client-managed chat history. When set (even to an empty list), overrides any server-side session history for agents that use previous Q&A context (rephrase, summarize, smart, etc.). Omit the field ent… |
| operation | InteractionOperation |  | 0 |  |
| streaming | boolean |  | False |  |

**InteractionsAuditDownloadRequest**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| session_id | string \| null |  |  | Filter by session ID |
| year | integer \| null |  |  | Filter by year (e.g., 2024). If not specified, defaults to the current year. |
| month | integer \| null |  |  | Filter by month (1-12). If not specified, defaults to the past month. |

**JobStatus**

**Enum:** not_running, finished, running, started, stopped, failed,
terminating, starting

**JSONSchema**

Structured Outputs configuration options, including a JSON Schema.

| **Field**   | **Type**               | **Req** | **Default** | **Description** |
|-------------|------------------------|---------|-------------|-----------------|
| name        | string                 | yes     |             |                 |
| description | string                 |         |             |                 |
| schema      | object (free-form map) |         |             |                 |
| strict      | boolean \| null        |         |             |                 |

**KeyValueField**

A key-value field value. The field id (key in the resource's key_values
dict) must equal the schema name — enforcing one KV field per schema per
resource.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| data | map\<string, string \| integer \| number \| boolean \| Range\> |  |  | Key-value pairs conforming to the schema. |

**KeyValueFieldData**

| **Field** | **Type**               | **Req** | **Default** | **Description** |
|-----------|------------------------|---------|-------------|-----------------|
| value     | KeyValueField \| null  |         |             |                 |
| error     | Error \| null          |         |             |                 |
| status    | string \| null         |         |             |                 |
| errors    | array\<Error\> \| null |         |             |                 |

**Keyword**

Matches all fields that contain a keyword

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| prop      | string   |         | keyword     |                 |
| word      | string   | yes     |             | Keyword to find |

**Kind**

Matches paragraphs of a certain kind

| **Field** | **Type**      | **Req** | **Default** | **Description**                |
|-----------|---------------|---------|-------------|--------------------------------|
| prop      | string        |         | kind        |                                |
| kind      | TypeParagraph | yes     |             | The kind of paragraph to match |

**KnowledgeboxFindResults**

Find on knowledgebox results

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| resources | map\<string, FindResource\> | yes |  |  |
| relations | Relations \| null |  |  |  |
| query | string \| null |  |  |  |
| rephrased_query | string \| null |  |  |  |
| total | integer |  | 0 |  |
| page_number | integer |  | 0 | Pagination will be deprecated, please, refer to topk in the request |
| page_size | integer |  | 20 | Pagination will be deprecated, please, refer to topk in the request |
| next_page | boolean |  | False | Pagination will be deprecated, please, refer to topk in the request |
| nodes | array\<map\<string, string\>\> \| null |  |  | List of nodes queried in the search |
| shards | array\<string\> \| null |  |  | The list of shard replica ids used for the search. |
| autofilters | array\<string\> |  | \[\] | \[deprecated\] list of filters automatically applied to the search query |
| min_score | number \| MinScore \| null |  | {'bm25': 0.0} | The minimum scores that have been used for the search operation. |
| best_matches | array\<string\> |  | \[\] | List of ids of best matching paragraphs. The list is sorted by decreasing relevance (most relevant first). |
| metrics | object (free-form map) \| null |  |  | Metrics information about the search operation. The metadata included in this field is subject to change and should not be used in production. This is only available if the debug parameter is set to t… |

**Label**

| **Field**   | **Type**        | **Req** | **Default** | **Description** |
|-------------|-----------------|---------|-------------|-----------------|
| label       | string          | yes     |             |                 |
| description | string          |         |             |                 |
| examples    | array\<string\> |         |             |                 |

**LabelOperation**

| **Field**   | **Type**         | **Req** | **Default** | **Description** |
|-------------|------------------|---------|-------------|-----------------|
| labels      | array\<Label\>   |         |             |                 |
| ident       | string           | yes     |             |                 |
| description | string           |         |             |                 |
| multiple    | boolean          |         | False       |                 |
| triggers    | array\<Trigger\> |         |             |                 |

**Language**

Matches the language of the field

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| prop | string |  | language |  |
| only_primary | boolean |  | False | Match only the primary language of the document. By default, matches any language that appears in the document |
| language | string | yes |  | The code of the language to match, e.g: en |

**LargeComputedMetadata**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| metadata | FieldLargeMetadata \| null |  |  |  |
| split_metadata | map\<string, FieldLargeMetadata\> \| null |  |  |  |
| deleted_splits | array\<string\> \| null |  |  |  |

**LayoutFormat**

**Enum:** 0

**learning_config\_\_models\_\_AnthropicKey**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| key       | string   | yes     |             |                 |

**learning_config\_\_models\_\_AzureOpenAIKey**

| **Field**  | **Type** | **Req** | **Default** | **Description** |
|------------|----------|---------|-------------|-----------------|
| key        | string   | yes     |             |                 |
| url        | string   | yes     |             |                 |
| deployment | string   | yes     |             |                 |
| model      | string   | yes     |             |                 |

**learning_config\_\_models\_\_HFEmbeddingKey**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| url | string | yes |  | URL of the Huggingface embedding model endpoint |
| key | string |  |  | API Key with access the desired Huggingface endpoint |
| matryoshka | array\<integer\> \| null |  |  | List of matryoshka dimensions to use for the embedding, in descending order. If unknown, leave it empty |
| similarity | string |  | DOT | Similarity function to use. It can be DOT or COSINE, leave it as DOT if unknown |
| size | integer | yes |  | Size of the embeddings generated by the model. Must be set to the correct value for the specific model hosted in the endpoint |
| threshold | number |  | 0.4 | Threshold to use for semantic similarity |
| passage_prompt | string |  | {} | Prompt to use for passage embedding, only set this value if your embedding model requires it |
| query_prompt | string |  | {} | Prompt to use for query embedding, only set this value if your embedding model requires it |

**learning_config\_\_models\_\_MistralKey**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| key       | string   | yes     |             |                 |

**learning_config\_\_models\_\_OpenAIKey**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| key       | string   | yes     |             |                 |
| org       | string   | yes     |             |                 |

**learning_config\_\_models\_\_PalmKey**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| credentials | string \| null |  |  | If using Vertex AI, this should contain the Service Account Key credentials |
| location | string \| null |  |  | If using Vertex AI, this is the GCP region where the model will be accessed from. E.g. us-central1 |
| gemini_key | string \| null |  |  | If using Gemini API, only an API key for the Gemini Developer API is required |

**learning_models\_\_providers\_\_models\_\_Effort**

**Enum:** none, minimal, low, medium, high, xhigh

**learning_protos\_\_config_p2p\_\_AnthropicVertexKey**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| credentials | string | yes |  | Service Account Key credentials in JSON format for Vertex AI access |
| location | string |  |  | GCP region where the model will be accessed from. E.g. us-central1 |

**learning_protos\_\_config_p2p\_\_HFEmbeddingKey**

Some models require a specific template (including prefix) to work
correctly in each task For example Snowflake's Arctic-embed requires a
specific prefix to work correctly. In that case, the query prompt will
be \` passage_prompt: "" query_prompt: "Represent this sentence for
searching relevant pas…

| **Field**      | **Type**         | **Req** | **Default** | **Description** |
|----------------|------------------|---------|-------------|-----------------|
| url            | string           |         |             |                 |
| key            | string           |         |             |                 |
| matryoshka     | array\<integer\> |         |             |                 |
| similarity     | string           |         |             |                 |
| size           | integer          |         | 0           |                 |
| threshold      | number           |         | 0.0         |                 |
| passage_prompt | string           |         |             |                 |
| query_prompt   | string           |         |             |                 |

**learning_protos\_\_config_p2p\_\_HFLLMKey**

| **Field** | **Type**  | **Req** | **Default** | **Description** |
|-----------|-----------|---------|-------------|-----------------|
| key       | string    |         |             |                 |
| url       | string    |         |             |                 |
| model     | ModelType |         | 0           |                 |

**learning_protos\_\_config_p2p\_\_UserLearningKeys-Input**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| openai | OpenAIKey \| null |  |  |  |
| azure_openai | AzureOpenAIKey \| null |  |  |  |
| palm | PalmKey \| null |  |  |  |
| anthropic | AnthropicKey \| null |  |  |  |
| claude3 | AnthropicKey \| null |  |  |  |
| anthropic_vertex | learning_protos\_\_config_p2p\_\_AnthropicVertexKey \| null |  |  |  |
| anthropic_bedrock | AnthropicBedrockKey \| null |  |  |  |
| text_generation | TextGenerationKey \| null |  |  |  |
| mistral | MistralKey \| null |  |  |  |
| azure_mistral | AzureMistralKey \| null |  |  |  |
| hf_llm | learning_protos\_\_config_p2p\_\_HFLLMKey \| null |  |  |  |
| hf_embedding | HFEmbeddingKey \| null |  |  |  |
| azure_aii | AzureAIIKey \| null |  |  |  |
| openai_compat | OpenAICompatModel-Input \| null |  |  |  |

**learning_protos\_\_config_p2p\_\_UserLearningKeys-Output**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| openai | OpenAIKey \| null |  |  |  |
| azure_openai | AzureOpenAIKey \| null |  |  |  |
| palm | PalmKey \| null |  |  |  |
| anthropic | AnthropicKey \| null |  |  |  |
| claude3 | AnthropicKey \| null |  |  |  |
| anthropic_vertex | learning_protos\_\_config_p2p\_\_AnthropicVertexKey \| null |  |  |  |
| anthropic_bedrock | AnthropicBedrockKey \| null |  |  |  |
| text_generation | TextGenerationKey \| null |  |  |  |
| mistral | MistralKey \| null |  |  |  |
| azure_mistral | AzureMistralKey \| null |  |  |  |
| hf_llm | learning_protos\_\_config_p2p\_\_HFLLMKey \| null |  |  |  |
| hf_embedding | HFEmbeddingKey \| null |  |  |  |
| azure_aii | AzureAIIKey \| null |  |  |  |
| openai_compat | OpenAICompatModel-Output \| null |  |  |  |

**LearningConfig**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| semantic_models | array\<string\> \| null |  |  |  |
| generative_model | string \| null |  |  |  |
| ner_model | string \| null |  |  |  |
| anonymization_model | string \| null |  |  |  |
| visual_labeling | string \| null |  |  |  |
| split_configs | map\<string, SplitConfiguration\> \| null |  |  |  |
| extract_configs | map\<string, ExtractConfig\> \| null |  |  |  |

**LearningConfiguration**

This model is to add the fields that are computed dynamically and not
stored in the db, it also serves as a bridge between the stored config
and what we want to send through the APIs

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| resource_labelers_models | array\<string\> \| null |  |  |  |
| paragraph_labelers_models | array\<string\> \| null |  |  |  |
| intent_models | array\<string\> \| null |  |  |  |
| visual_labeling | string \| null |  | disabled |  |
| ner_model | string |  | multilingual |  |
| relation_model | string \| null |  | base |  |
| anonymization_model | string |  | disabled |  |
| semantic_model | string \| null |  |  |  |
| semantic_models | array\<string\> \| null |  |  |  |
| default_semantic_model | string \| null |  |  |  |
| semantic_graph_node_models | array\<string\> \| null |  |  |  |
| default_semantic_graph_node_model | string \| null |  |  |  |
| semantic_graph_edge_models | array\<string\> \| null |  |  |  |
| default_semantic_graph_edge_model | string \| null |  |  |  |
| semantic_vector_similarity | string \| null |  | DOT |  |
| semantic_vector_size | integer \| null |  | 1024 |  |
| semantic_matryoshka_dims | array\<integer\> \| null |  | \[\] |  |
| semantic_threshold | number \| null |  | 0.4 |  |
| generative_model | string |  | chatgpt-azure-4o |  |
| user_keys | UserLearningKeys \| null |  |  |  |
| user_prompts | UserPrompts \| null |  |  |  |
| summary | Summary |  | simple |  |
| summary_model | string |  | chatgpt-azure-4o |  |
| summary_prompt | SummaryPrompt \| null |  |  |  |
| prefer_markdown_generative_response | boolean |  | False |  |
| semantic_model_configs | map\<string, SemanticConfig\> |  | {} |  |
| semantic_graph_node_model_configs | map\<string, SemanticConfig\> |  | {} |  |
| semantic_graph_edge_model_configs | map\<string, SemanticConfig\> |  | {} |  |

**LearningConfigurationCreation**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| anonymization_model | AnonymizationModel \| string |  | disabled |  |
| visual_labeling | VisualLabeling \| string |  | disabled |  |
| generative_model | string |  | chatgpt-azure-4o |  |
| ner_model | NERModel \| string |  | multilingual |  |
| relation_model | RelationModel \| string |  | base |  |
| user_keys | UserLearningKeys \| null |  |  |  |
| user_prompts | UserPrompts \| null |  |  |  |
| summary | Summary \| null |  | simple |  |
| summary_model | string |  | chatgpt-azure-4o |  |
| summary_prompt | SummaryPrompt \| null |  |  |  |
| prefer_markdown_generative_response | boolean |  | False |  |
| default_semantic_model | string \| null |  |  | The default vector set / semantic model to use. Must be one of the models defined in the semanticmodels field. If not provided, the first model in the list will be used. |
| semantic_model | ParagraphEmbeddingModel \| null |  |  |  |
| semantic_models | array\<ParagraphEmbeddingModel\> \| null |  |  |  |
| semantic_graph_node_models | array\<NodeEmbeddingModel\> \| null |  |  |  |
| default_semantic_graph_node_model | string \| null |  |  |  |
| semantic_graph_edge_models | array\<EdgeEmbeddingModel\> \| null |  |  |  |
| default_semantic_graph_edge_model | string \| null |  |  |  |

**LearningConfigurationUpdate**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| anonymization_model | AnonymizationModel \| string |  | disabled |  |
| visual_labeling | VisualLabeling \| string |  | disabled |  |
| generative_model | string |  | chatgpt-azure-4o |  |
| ner_model | NERModel \| string |  | multilingual |  |
| relation_model | RelationModel \| string |  | base |  |
| user_keys | UserLearningKeys \| null |  |  |  |
| user_prompts | UserPrompts \| null |  |  |  |
| summary | Summary \| null |  | simple |  |
| summary_model | string |  | chatgpt-azure-4o |  |
| summary_prompt | SummaryPrompt \| null |  |  |  |
| prefer_markdown_generative_response | boolean |  | False |  |
| default_semantic_model | string \| null |  |  | The default vector set / semantic model to use. Must be one of the models defined in the semanticmodels field. If not provided, the first model in the list will be used. |

**LinkExtractedData**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| date | string \| null |  |  |  |
| language | string \| null |  |  |  |
| title | string \| null |  |  |  |
| metadata | map\<string, string\> \| null |  |  |  |
| link_thumbnail | CloudLink \| null |  |  |  |
| link_preview | CloudLink \| null |  |  |  |
| field | string \| null |  |  |  |
| link_image | CloudLink \| null |  |  |  |
| description | string \| null |  |  |  |
| type | string \| null |  |  |  |
| embed | string \| null |  |  |  |
| file_generated | map\<string, CloudLink\> \| null |  |  |  |

**LinkFieldData**

| **Field** | **Type**                       | **Req** | **Default** | **Description** |
|-----------|--------------------------------|---------|-------------|-----------------|
| value     | FieldLink \| null              |         |             |                 |
| extracted | LinkFieldExtractedData \| null |         |             |                 |
| error     | Error \| null                  |         |             |                 |
| status    | string \| null                 |         |             |                 |
| errors    | array\<Error\> \| null         |         |             |                 |

**LinkFieldExtractedData**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| text | ExtractedText \| null |  |  |  |
| metadata | FieldComputedMetadata \| null |  |  |  |
| large_metadata | LargeComputedMetadata \| null |  |  |  |
| vectors | VectorObject \| null |  |  |  |
| question_answers | FieldQuestionAnswers \| null |  |  |  |
| relation_node_vectors | map\<string, array\<RelationNodeVector\>\> \| null |  |  |  |
| relation_edge_vectors | map\<string, array\<RelationEdgeVector\>\> \| null |  |  |  |
| link | LinkExtractedData \| null |  |  |  |

**LinkUpload**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| link | string | yes |  |  |
| headers | map\<string, string\> | yes |  |  |
| cookies | map\<string, string\> | yes |  |  |
| localstorage | map\<string, string\> | yes |  |  |
| css_selector | string \| null |  |  |  |
| xpath | string \| null |  |  |  |
| extract_strategy | string \| null |  |  |  |
| split_strategy | string \| null |  |  |  |
| classification_labels | array\<ClassificationLabel\> \| null |  |  |  |

**ListModelsResponse**

| **Field** | **Type**           | **Req** | **Default** | **Description** |
|-----------|--------------------|---------|-------------|-----------------|
| object    | string             |         | list        |                 |
| data      | array\<ModelInfo\> | yes     |             |                 |
| has_more  | boolean            |         | False       |                 |

**LLMConfig-Input**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| model | string |  |  |  |
| provider | string |  |  |  |
| keys | UserLearningKeys-Input \| null |  |  |  |
| prompts | UserPrompts \| null |  |  |  |
| reasoning_config | LLMReasoningConfig \| null |  |  |  |

**LLMConfig-Output**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| model | string |  |  |  |
| provider | string |  |  |  |
| keys | UserLearningKeys-Output \| null |  |  |  |
| prompts | UserPrompts \| null |  |  |  |
| reasoning_config | LLMReasoningConfig \| null |  |  |  |

**LLMReasoningConfig**

Keep this in sync with learning_generative.models.Reasoning

| **Field**     | **Type**        | **Req** | **Default** | **Description** |
|---------------|-----------------|---------|-------------|-----------------|
| effort        | Effort \| null  |         | 0           |                 |
| budget_tokens | integer \| null |         | 0           |                 |

**LLMReasoningConfig-Input**

Keep this in sync with learning_generative.models.Reasoning

| **Field**     | **Type**             | **Req** | **Default** | **Description** |
|---------------|----------------------|---------|-------------|-----------------|
| effort        | Effort-Input \| null |         | 0           |                 |
| budget_tokens | integer \| null      |         | 0           |                 |

**LLMReasoningConfig-Output**

Keep this in sync with learning_generative.models.Reasoning

| **Field**     | **Type**        | **Req** | **Default** | **Description** |
|---------------|-----------------|---------|-------------|-----------------|
| effort        | Effort \| null  |         | 0           |                 |
| budget_tokens | integer \| null |         | 0           |                 |

**LLMSplitConfig**

| **Field**           | **Type**        | **Req** | **Default** | **Description** |
|---------------------|-----------------|---------|-------------|-----------------|
| generative_model    | string \| null  |         |             |                 |
| generative_provider | string \| null  |         |             |                 |
| rules               | array\<string\> |         | \[\]        |                 |

**LLMSplitConfig-Input**

| **Field** | **Type**                | **Req** | **Default** | **Description** |
|-----------|-------------------------|---------|-------------|-----------------|
| llm       | LLMConfig-Input \| null |         |             |                 |
| rules     | array\<string\>         |         |             |                 |

**LLMSplitConfig-Output**

| **Field** | **Type**                 | **Req** | **Default** | **Description** |
|-----------|--------------------------|---------|-------------|-----------------|
| llm       | LLMConfig-Output \| null |         |             |                 |
| rules     | array\<string\>          |         |             |                 |

**ManualSplitConfig**

| **Field** | **Type**       | **Req** | **Default** | **Description** |
|-----------|----------------|---------|-------------|-----------------|
| splitter  | string \| null |         |             |                 |

**MaxTokens**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| context | integer \| null |  |  | Use to limit the amount of tokens used in the LLM context |
| answer | integer \| null |  |  | Use to limit the amount of tokens used in the LLM answer |

**MemoryOperation-Input**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| ident | string | yes |  |  |
| prompt | string |  |  |  |
| rules | array\<string\> |  |  |  |
| triggers | array\<Trigger\> |  |  |  |
| graph_extraction | boolean |  | False | When true, entities and relations are extracted from each fact using the same LLM. entitydefs and examples are only valid when this is true. |
| entity_defs | array\<EntityDefinition\> |  |  | Restrict graph extraction to these entity types. Only valid when graphextraction is true. |
| examples | array\<GraphExtractionExample\> |  |  | Few-shot examples for graph extraction. Only valid when graphextraction is true. |

**MemoryOperation-Output**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| ident | string | yes |  |  |
| prompt | string |  |  |  |
| rules | array\<string\> |  |  |  |
| triggers | array\<Trigger\> |  |  |  |
| graph_extraction | boolean |  | False | When true, entities and relations are extracted from each fact using the same LLM. entitydefs and examples are only valid when this is true. |
| entity_defs | array\<EntityDefinition\> |  |  | Restrict graph extraction to these entity types. Only valid when graphextraction is true. |
| examples | array\<GraphExtractionExample\> |  |  | Few-shot examples for graph extraction. Only valid when graphextraction is true. |

**Message**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| type      | string   |         | message     |                 |
| author    | Author   | yes     |             |                 |
| text      | string   | yes     |             |                 |

**MessageToolCall**

| **Field** | **Type**            | **Req** | **Default** | **Description** |
|-----------|---------------------|---------|-------------|-----------------|
| id        | string              | yes     |             |                 |
| type      | string              |         | function    |                 |
| function  | MessageToolFunction | yes     |             |                 |

**MessageToolFunction**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| name      | string   | yes     |             |                 |
| arguments | object   |         |             |                 |

**Metadata**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| deployed_region | string \| null |  |  |  |
| deprecated | boolean |  | False |  |
| shut_down_date | string \| null |  |  |  |
| superseded_by | string \| null |  |  |  |
| stability | Stability |  | stable |  |
| knowledge_cutoff_date | string \| null |  |  |  |
| release_date | string \| null |  |  |  |
| data_residency_status | DataResidencyStatus |  | not_guaranteed |  |

**MetadataExtensionStrategy**

RAG strategy to enrich the context with metadata of the matching
paragraphs or its resources. This strategy can be combined with any of
the other strategies.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string |  | metadata_extension |  |
| types | array\<MetadataExtensionType\> | yes |  | List of resource metadata types to add to the context. - 'origin': origin metadata of the resource. - 'classificationlabels': classification labels of the resource. - 'ner': Named Entity Recognition e… |

**MetadataExtensionType**

**Enum:** origin, classification_labels, ners, extra_metadata

**MinScore**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| semantic | number \| null |  |  | Minimum semantic similarity score used to filter vector index search. If not specified, the default minimum score of the semantic model associated to the Knowledge Box will be used. Check out the docu… |
| bm25 | number |  | 0 | Minimum score used to filter bm25 index search. Check out the documentation for more information on how to use this parameter: (see docs) |

**MistralKey**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| key       | string   |         |             |                 |

**MistralUserPrompt**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| prompt    | string   |         |             |                 |

**Model**

**Enum:** 0

**ModelConfig**

| **Field**     | **Type**          | **Req** | **Default** | **Description** |
|---------------|-------------------|---------|-------------|-----------------|
| input_tokens  | TokenValues       | yes     |             |                 |
| output_tokens | OutputTokenValues | yes     |             |                 |
| prompt_id     | string            | yes     |             |                 |
| driver        | GenerativeDrivers | yes     |             |                 |
| max_images    | integer \| null   |         |             |                 |
| assume_role   | integer \| null   |         |             |                 |

**ModelFeatures**

Stores the supported functionality of a model or API

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| logprobs | boolean |  | False | Whether the model supports outputting logprobs |
| streaming | boolean |  | True | Whether the model supports streaming responses |
| system_message | boolean |  | True | Whether the model supports system messages |
| tool_use | boolean |  | True | Whether the model supports tooluse/function calling |
| vision | boolean |  | True | Whether the model supports image understanding (vision) |
| file_input | boolean |  | False | Whether the API and model support file inputs |
| max_images | integer |  | 5 | Maximum number of images that the model supports in a single request |
| seed_support | boolean |  | False | Whether the model supports seeded generation, for deterministic outputs. If not enabled, using a seed will result in an error. |
| reasoning | ReasoningType |  | 0 | Type of reasoning supported by the model. - Unspecified: Reasoning will be automatically detected, but won´t be customizable. - None: No reasoning capabilities are available. - Customizable Effort: Re… |
| reasoning_chat_template_key | string |  |  | The key used in the models chat template to enable or disable reasoning. Only used for models with Reasoning Chat Template reasoning type. Defaults to enablethinking if empty. |

**ModelID**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| id        | string   | yes     |             |                 |

**ModelInfo**

| **Field**         | **Type**        | **Req** | **Default** | **Description** |
|-------------------|-----------------|---------|-------------|-----------------|
| id                | string          | yes     |             |                 |
| name              | string          | yes     |             |                 |
| created           | integer         | yes     |             |                 |
| title             | string \| null  |         |             |                 |
| description       | string \| null  |         |             |                 |
| model_type        | string \| null  |         |             |                 |
| max_input_tokens  | integer \| null |         |             |                 |
| max_output_tokens | integer \| null |         |             |                 |

**ModelType**

**Enum:** 0, 1

**NeighbouringParagraphsStrategy**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string |  | neighbouring_paragraphs |  |
| before | integer |  | 2 | Number of previous neighbouring paragraphs to add to the context, for each matching paragraph in the retrieval step. |
| after | integer |  | 2 | Number of following neighbouring paragraphs to add to the context, for each matching paragraph in the retrieval step. |

**Ner**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| text      | string   | yes     |             |                 |
| ner       | string   | yes     |             |                 |
| start     | integer  | yes     |             |                 |
| end       | integer  | yes     |             |                 |

**NERModel**

**Enum:** multilingual

**NestedListPosition**

| **Field** | **Type**                | **Req** | **Default** | **Description** |
|-----------|-------------------------|---------|-------------|-----------------|
| positions | array\<NestedPosition\> | yes     |             |                 |

**NestedPosition**

| **Field** | **Type**        | **Req** | **Default** | **Description** |
|-----------|-----------------|---------|-------------|-----------------|
| start     | integer \| null |         |             |                 |
| end       | integer \| null |         |             |                 |
| page      | integer \| null |         |             |                 |

**NodeEmbeddingModel**

**Enum:** multilingual-graph-v1

**NodeMatchKindName**

**Enum:** exact, fuzzy, fuzzy_words, semantic

**Not_FieldFilterExpressionType\_**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| operand | And_FieldFilterExpressionType\_ \| Or_FieldFilterExpressionType\_ \| Not_FieldFilterExpressionType\_ \| Resource-Input \| Field \| Keyword \| DateCreated \| DateModified \| Label \| ResourceMimetype \| FieldMimetype \| Entity-Input \| Language \| OriginTag \| OriginMetadata \| OriginPath \| OriginSource \| OriginCollaborator \| Generated | yes |  |  |

**Not_GraphPathQuery\_**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| operand | And_GraphPathQuery\_ \| Or_GraphPathQuery\_ \| Not_GraphPathQuery\_ \| GraphPath \| SourceNode \| DestinationNode \| AnyNode \| Relation-Input \| nucliadb_models\_\_graph\_\_requests\_\_Generated | yes |  |  |

**Not_KVFilterExpression\_**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| operand | And_KVFilterExpression\_ \| Or_KVFilterExpression\_ \| Not_KVFilterExpression\_ \| Eq \| Inequalities \| Contains | yes |  |  |

**Not_ParagraphFilterExpression\_**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| operand | And_ParagraphFilterExpression\_ \| Or_ParagraphFilterExpression\_ \| Not_ParagraphFilterExpression\_ \| Label \| Kind | yes |  |  |

**NovaUserPrompt**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| system    | string   |         |             |                 |
| prompt    | string   |         |             |                 |

**nucliadb_models\_\_graph\_\_requests\_\_Generated**

Matches if the relation was generated by the given source

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| prop | string |  | generated |  |
| by | Generator | yes |  | Generator for this field. |
| da_task | string \| null |  |  | Matches relations generated by an specific DA task, given its prefix |

**NucliaDBClientType**

**Enum:** api, widget, web, dashboard, desktop, chrome_extension

**openai\_\_types\_\_chat\_\_chat_completion_message_custom_tool_call_param\_\_Custom**

The custom tool that the model called.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| input     | string   | yes     |             |                 |
| name      | string   | yes     |             |                 |

**openai\_\_types\_\_chat\_\_chat_completion_message_function_tool_call_param\_\_Function**

The function that the model called.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| arguments | string   | yes     |             |                 |
| name      | string   | yes     |             |                 |

**openai\_\_types\_\_chat\_\_chat_completion_named_tool_choice_custom_param\_\_Custom**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| name      | string   | yes     |             |                 |

**openai\_\_types\_\_chat\_\_chat_completion_named_tool_choice_param\_\_Function**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| name      | string   | yes     |             |                 |

**OpenAIChatCompletionRequest**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| messages | array\<ChatCompletionDeveloperMessageParam \| ChatCompletionSystemMessageParam \| ChatCompletionUserMessageParam \| ChatCompletionAssistantMessageParam \| ChatCompletionToolMessageParam \| ChatCompletionFunctionMessageParam\> | yes |  |  |
| model | string \| null |  |  |  |
| stream | boolean |  | False |  |
| max_tokens | integer \| null |  |  |  |
| seed | integer \| null |  |  |  |
| temperature | number \| null |  |  |  |
| top_p | number \| null |  |  |  |
| user | string \| null |  |  |  |
| tools | array\<ChatCompletionFunctionToolParam\> \| null |  |  |  |
| tool_choice | enum\[none, auto, required\] \| ChatCompletionAllowedToolChoiceParam \| ChatCompletionNamedToolChoiceParam \| ChatCompletionNamedToolChoiceCustomParam \| null |  |  |  |
| response_format | ResponseFormatText \| ResponseFormatJSONSchema \| ResponseFormatJSONObject \| null |  |  |  |
| json_schema | object (free-form map) \| null |  |  |  |
| reasoning_effort | enum\[none, minimal, low, medium, high, xhigh\] \| null |  |  |  |
| image_generation | boolean \| null |  |  |  |
| truncate | boolean \| null |  |  |  |

**OpenAICompatModel-Input**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| key | string |  |  | The API key to use, can be left empty if not required |
| url | string | yes |  | The URL that the api is hosted on |
| model_id | string | yes |  | The model id to use as defined in the API |
| tokenizer | Tokenizer |  | 0 | The tokenizer to use for counting tokens, if you require a different tokenizer, please contact support |
| generation_config | GenerationConfig |  |  | The sampling parameters to use for the model |
| model_features | ModelFeatures |  |  | The model features that the model or API supports |

**OpenAICompatModel-Output**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| key | string |  |  | The API key to use, can be left empty if not required |
| url | string | yes |  | The URL that the api is hosted on |
| model_id | string | yes |  | The model id to use as defined in the API |
| tokenizer | Tokenizer |  | 0 | The tokenizer to use for counting tokens, if you require a different tokenizer, please contact support |
| generation_config | GenerationConfig |  |  | The sampling parameters to use for the model |
| model_features | ModelFeatures |  |  | The model features that the model or API supports |

**OpenAICompatUserPrompt**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| system    | string   |         |             |                 |
| prompt    | string   | yes     |             |                 |

**OpenAIKey**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| key | string | yes |  | The OpenAI API key to use |
| org | string |  |  | The organization to use, can be left empty if not required |

**OpenAIUserPrompt**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| system    | string   |         |             |                 |
| prompt    | string   |         |             |                 |

**Operation-Input**

XXX: Hey developer! If you modify this message, update the
OperationType\` enum above

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| graph | GraphOperation-Input \| null |  |  |  |
| label | LabelOperation \| null |  |  |  |
| ask | AskOperation \| null |  |  |  |
| qa | QAOperation \| null |  |  |  |
| extract | ExtractOperation \| null |  |  |  |
| prompt_guard | GuardOperation \| null |  |  |  |
| llama_guard | GuardOperation \| null |  |  |  |
| memory | MemoryOperation-Input \| null |  |  |  |

**Operation-Output**

XXX: Hey developer! If you modify this message, update the
OperationType\` enum above

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| graph | GraphOperation-Output \| null |  |  |  |
| label | LabelOperation \| null |  |  |  |
| ask | AskOperation \| null |  |  |  |
| qa | QAOperation \| null |  |  |  |
| extract | ExtractOperation \| null |  |  |  |
| prompt_guard | GuardOperation \| null |  |  |  |
| llama_guard | GuardOperation \| null |  |  |  |
| memory | MemoryOperation-Output \| null |  |  |  |

**Operator**

**Enum:** and, or

**Option**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| name      | string   | yes     |             |                 |
| value     | string   | yes     |             |                 |

**Or_FieldFilterExpressionType\_**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| operands | array\<And_FieldFilterExpressionType\_ \| Or_FieldFilterExpressionType\_ \| Not_FieldFilterExpressionType\_ \| Resource-Input \| Field \| Keyword \| DateCreated \| DateModified \| Label \| ResourceMimetype \| FieldMimetype \| Entity-Input \| Language \| OriginTag \| OriginMetadata \| OriginPath \| OriginSource \| OriginCollaborator \| Generated\> | yes |  |  |

**Or_GraphPathQuery\_**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| operands | array\<And_GraphPathQuery\_ \| Or_GraphPathQuery\_ \| Not_GraphPathQuery\_ \| GraphPath \| SourceNode \| DestinationNode \| AnyNode \| Relation-Input \| nucliadb_models\_\_graph\_\_requests\_\_Generated\> | yes |  |  |

**Or_KVFilterExpression\_**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| operands | array\<And_KVFilterExpression\_ \| Or_KVFilterExpression\_ \| Not_KVFilterExpression\_ \| Eq \| Inequalities \| Contains\> | yes |  |  |

**Or_ParagraphFilterExpression\_**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| operands | array\<And_ParagraphFilterExpression\_ \| Or_ParagraphFilterExpression\_ \| Not_ParagraphFilterExpression\_ \| Label \| Kind\> | yes |  |  |

**Origin**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| source_id | string \| null |  |  |  |
| url | string \| null |  |  |  |
| created | string \| null |  |  |  |
| modified | string \| null |  |  |  |
| metadata | map\<string, string\> |  | {} | Generic metadata from the resource at the origin system. It can later be used for filtering on search endpoints with '/origin.metadata/{key}/{value}' |
| tags | array\<string\> |  | \[\] | Resource tags about the origin system. It can later be used for filtering on search endpoints with '/origin.tags/{tag}' |
| collaborators | array\<string\> |  | \[\] |  |
| filename | string \| null |  |  |  |
| related | array\<string\> |  | \[\] |  |
| path | string \| null |  |  | Path of the original resource. Typically used to store folder structure information of the resource at the origin system. It can be later used for filtering on search endpoints with '/origin.path/{pat… |
| sync_metadata | SyncMetadata \| null |  |  | Metadata related to the resource from the origin system fetched by the Progress Agentic RAG's Cloud Storage Sync service. |
| source | Source \| null |  | API |  |

**OriginCollaborator**

Matches the origin collaborators

| **Field**    | **Type** | **Req** | **Default**         | **Description** |
|--------------|----------|---------|---------------------|-----------------|
| prop         | string   |         | origin_collaborator |                 |
| collaborator | string   | yes     |                     | Collaborator    |

**OriginMetadata**

Matches metadata from the origin

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| prop | string |  | origin_metadata |  |
| field | string | yes |  | Metadata field |
| value | string \| null |  |  | Value of the metadata field. If blank, matches any document with the given metadata field set (to any value) |

**OriginPath**

Matches the origin path

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| prop | string |  | origin_path |  |
| prefix | string \| null |  |  | Prefix of the path, matches all paths under this prefixe.g: prefix=/dir/ matches /dir and /dir/a/b but not /dirrrr |

**OriginSource**

Matches the origin source id

| **Field** | **Type**       | **Req** | **Default**   | **Description** |
|-----------|----------------|---------|---------------|-----------------|
| prop      | string         |         | origin_source |                 |
| id        | string \| null |         |               | Source ID       |

**OriginTag**

Matches all fields with a given origin tag

| **Field** | **Type** | **Req** | **Default** | **Description**  |
|-----------|----------|---------|-------------|------------------|
| prop      | string   |         | origin_tag  |                  |
| tag       | string   | yes     |             | The tag to match |

**OutputTokenValues**

| **Field**   | **Type**        | **Req** | **Default** | **Description** |
|-------------|-----------------|---------|-------------|-----------------|
| min         | integer         |         | 0           |                 |
| max         | integer         | yes     |             |                 |
| default_max | integer \| null |         |             |                 |

**PageImageStrategy**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string |  | page_image |  |
| count | integer \| null |  |  | Maximum number of page images to retrieve. By default, at most 5 images are retrieved. |

**PageInformation**

| **Field**        | **Type**        | **Req** | **Default** | **Description** |
|------------------|-----------------|---------|-------------|-----------------|
| page             | integer \| null |         |             |                 |
| page_with_visual | boolean \| null |         |             |                 |

**PagePositions**

| **Field** | **Type**        | **Req** | **Default** | **Description** |
|-----------|-----------------|---------|-------------|-----------------|
| start     | integer \| null |         |             |                 |
| end       | integer \| null |         |             |                 |

**PageStructure**

| **Field** | **Type**                    | **Req** | **Default** | **Description** |
|-----------|-----------------------------|---------|-------------|-----------------|
| page      | PageStructurePage           | yes     |             |                 |
| tokens    | array\<PageStructureToken\> | yes     |             |                 |

**PageStructurePage**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| width     | integer  | yes     |             |                 |
| height    | integer  | yes     |             |                 |

**PageStructureToken**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| x         | number   | yes     |             |                 |
| y         | number   | yes     |             |                 |
| width     | number   | yes     |             |                 |
| height    | number   | yes     |             |                 |
| text      | string   | yes     |             |                 |
| line      | number   | yes     |             |                 |

**PalmKey**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| credentials | string |  |  | If using Vertex AI, this should contain the Service Account Key credentials |
| location | string |  |  | If using Vertex AI, this is the GCP region where the model will be accessed from. E.g. us-central1 |
| gemini_key | string |  |  | If using Gemini API, only an API key for the Gemini Developer API is required |

**PalmUserPrompt**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| prompt    | string   |         |             |                 |

**Paragraph**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| start | integer \| null |  |  |  |
| end | integer \| null |  |  |  |
| start_seconds | array\<integer\> \| null |  |  |  |
| end_seconds | array\<integer\> \| null |  |  |  |
| kind | TypeParagraph \| null |  |  |  |
| classifications | array\<Classification\> \| null |  |  |  |
| sentences | array\<Sentence\> \| null |  |  |  |
| key | string \| null |  |  |  |
| page | PageInformation \| null |  |  |  |
| representation | Representation \| null |  |  |  |
| relations | ParagraphRelations \| null |  |  |  |

**ParagraphAnnotation**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| classifications | array\<UserClassification\> |  | \[\] |  |
| key | string | yes |  |  |

**ParagraphEmbeddingModel**

**Enum:** en-2024-04-24, multilingual-2024-05-06,
multilingual-2023-08-16, multilingual-2024-10-07,
text-embedding-3-small, text-embedding-3-large, gecko-embeddings-multi,
gemini-embedding-2, hf_embedding

**ParagraphImageStrategy**

| **Field** | **Type** | **Req** | **Default**     | **Description** |
|-----------|----------|---------|-----------------|-----------------|
| name      | string   |         | paragraph_image |                 |

**ParagraphRelations**

| **Field**    | **Type**        | **Req** | **Default** | **Description** |
|--------------|-----------------|---------|-------------|-----------------|
| parents      | array\<string\> |         | \[\]        |                 |
| siblings     | array\<string\> |         | \[\]        |                 |
| replacements | array\<string\> |         | \[\]        |                 |

**PatchAccountCustomModel**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| model_types | array\<StringModelTypes\> \| null |  |  |  |
| location | string \| null |  |  |  |
| description | string \| null |  |  |  |
| trained_date | string |  | 2026-07-22T10:44:48.442327 |  |
| trained_kbid | string |  |  |  |
| openai_compat | OpenAICompatModel-Input \| null |  |  |  |

**PatchDefaultModelConfig**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| description | string \| null |  |  | Description for the default model config |
| user_keys | UserLearningKeys \| null |  |  | Custom user keys for the default model. If not set, Nuclia keys will be used. |
| user_prompts | UserPrompts \| null |  |  | Custom user prompts for the default model. If not set, Nuclia prompts will be used. |
| assume_role | AssumeRoleType \| null |  |  | Assume role type for models that require it (e.g., AWS Bedrock) |
| kbids | array\<string\> \| null |  |  | List of KB IDs where this default model config is allowed. Empty list means it is allowed in all KBs. If not set, the previous value will be kept. |

**Position**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| start     | integer  | yes     |             |                 |
| end       | integer  | yes     |             |                 |

**Positions**

| **Field** | **Type**          | **Req** | **Default** | **Description** |
|-----------|-------------------|---------|-------------|-----------------|
| position  | array\<Position\> | yes     |             |                 |
| entity    | string            | yes     |             |                 |

**PredictOrigin**

**Enum:** PREDICT, RAO

**PredictReranker**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string |  | predict |  |
| window | integer \| null |  |  | Number of elements reranker will use. Window must be greater or equal to topk. Greater values will improve results at cost of retrieval and reranking time. By default, this reranker uses a default of … |

**PreQueriesStrategy**

This strategy allows to run a set of queries before the main query and
add the results to the context. It allows to give more importance to
some queries over others by setting the weight of each query. The weight
of the main query can also be set with the main_query_weight parameter.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string |  | prequeries |  |
| queries | array\<PreQuery\> | yes |  | List of queries to run before the main query. The results are added to the context with the specified weights for each query. There is a limit of 10 prequeries per request. |
| main_query_weight | number |  | 1.0 | Weight of the main query in the context. Use this to control the importance of the main query in the context. |

**PreQuery**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| request | FindRequest | yes |  | The request to be executed before the main query. |
| weight | number |  | 1.0 | Weight of the prequery in the context. The weight is used to scale the results of the prequery before adding them to the context.The weight should be a positive number, and they are normalized so that… |
| id | string \| null |  |  | Identifier of the prequery. If not specified, it is autogenerated based on the index of the prequery in the list (prequery0, prequery1, ...). |
| prefilter | boolean |  | False | If set to true, the prequery results are used to filter the scope of the remaining queries. The resources of the most relevant paragraphs of the prefilter queries are used as resource filters for the … |

**ProcessingBlock**

| **Field** | **Type**  | **Req** | **Default** | **Description** |
|-----------|-----------|---------|-------------|-----------------|
| x         | integer   | yes     |             |                 |
| y         | integer   | yes     |             |                 |
| cols      | integer   | yes     |             |                 |
| rows      | integer   | yes     |             |                 |
| type      | TypeBlock | yes     |             |                 |
| ident     | string    | yes     |             |                 |
| payload   | string    | yes     |             |                 |

**ProcessingConversation**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| messages | array\<ProcessingMessage\> | yes |  |  |
| extract_strategy | string \| null |  |  |  |
| split_strategy | string \| null |  |  |  |
| classification_labels | array\<ClassificationLabel\> \| null |  |  |  |

**ProcessingGeneratedConversation**

| **Field**         | **Type**               | **Req** | **Default** | **Description** |
|-------------------|------------------------|---------|-------------|-----------------|
| source_field_id   | string                 | yes     |             |                 |
| conversationfield | ProcessingConversation | yes     |             |                 |

**ProcessingLayoutDiff**

| **Field** | **Type**                       | **Req** | **Default** | **Description** |
|-----------|--------------------------------|---------|-------------|-----------------|
| format    | LayoutFormat                   | yes     |             |                 |
| blocks    | map\<string, ProcessingBlock\> | yes     |             |                 |

**ProcessingMessage**

| **Field** | **Type**                 | **Req** | **Default** | **Description** |
|-----------|--------------------------|---------|-------------|-----------------|
| timestamp | string \| null           |         |             |                 |
| who       | string \| null           |         |             |                 |
| to        | array\<string\>          |         | \[\]        |                 |
| content   | ProcessingMessageContent | yes     |             |                 |
| ident     | string                   | yes     |             |                 |

**ProcessingMessageContent**

| **Field** | **Type**       | **Req** | **Default** | **Description** |
|-----------|----------------|---------|-------------|-----------------|
| text      | string \| null |         |             |                 |
| format    | Format         | yes     |             |                 |

**ProcessingQueueType**

**Enum:** shared, private

**ProcessRequestStatus**

| **Field**      | **Type**        | **Req** | **Default** | **Description** |
|----------------|-----------------|---------|-------------|-----------------|
| processing_id  | string          | yes     |             |                 |
| resource_id    | string \| null  | yes     |             |                 |
| kbid           | string \| null  | yes     |             |                 |
| title          | string \| null  | yes     |             |                 |
| labels         | array\<string\> | yes     |             |                 |
| completed      | boolean         | yes     |             |                 |
| scheduled      | boolean         | yes     |             |                 |
| timestamp      | string          | yes     |             |                 |
| completed_at   | string \| null  | yes     |             |                 |
| scheduled_at   | string \| null  | yes     |             |                 |
| failed         | boolean         |         | False       |                 |
| retries        | integer         |         | 0           |                 |
| schedule_eta   | number          |         | 0.0         |                 |
| schedule_order | integer         |         | 0           |                 |
| request        | string \| null  |         |             |                 |
| response       | string \| null  |         |             |                 |

**ProcessRequestStatusResults**

| **Field** | **Type**                      | **Req** | **Default** | **Description** |
|-----------|-------------------------------|---------|-------------|-----------------|
| results   | array\<ProcessRequestStatus\> | yes     |             |                 |
| cursor    | string \| null                | yes     |             |                 |

**PromptArgument**

An argument for a prompt template.

| **Field**   | **Type**        | **Req** | **Default** | **Description** |
|-------------|-----------------|---------|-------------|-----------------|
| name        | string          | yes     |             |                 |
| description | string \| null  |         |             |                 |
| required    | boolean \| null |         |             |                 |

**PromptConfig**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string | yes |  |  |
| description | string | yes |  |  |
| prompt | string | yes |  |  |
| arguments | array\<PromptArgument\> \| null |  |  |  |
| icons | map\<string, string\> \| null |  |  |  |
| meta | map\<string, string\> \| null |  |  |  |
| prompt_id | string \| null |  |  |  |

**PromptID**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| id        | string   | yes     |             |                 |

**Provider**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| title | string | yes |  |  |
| enterprise_readiness | boolean | yes |  |  |
| models | map\<string, ModelInfo\> | yes |  |  |

**ProviderName**

**Enum:** anthropic, anthropic-vertexai, anthropic-bedrock, microsoft,
google, openai, openai_compat, huggingface, vertex, amazon, default,
onprem, progress-agentic-rag, none, dummy

**ProvidersResponse**

| **Field** | **Type**                | **Req** | **Default** | **Description** |
|-----------|-------------------------|---------|-------------|-----------------|
| providers | map\<string, Provider\> | yes     |             |                 |

**PublicTask**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string | yes |  |  |
| data_augmentation | boolean |  | False |  |
| description | string \| null |  |  |  |
| can_cleanup | boolean |  | False | Whether the task supports the cleanup mode at task deletion time |

**PublicTaskConfig**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| task | PublicTask | yes |  |  |
| kbid | string \| null |  |  |  |
| account_id | string | yes |  |  |
| account_type | string | yes |  |  |
| nua_client_id | string \| null |  |  |  |
| user_id | string | yes |  |  |
| parameters | DataAugmentation-Output \| SemanticModelMigrationParams \| null |  |  |  |
| id | string | yes |  |  |
| timestamp | string | yes |  |  |
| defined_at | string \| null |  |  |  |
| enabled | boolean | yes |  |  |

**PublicTaskRequest**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| task | PublicTask | yes |  |  |
| source | TrainingTaskDatasetSource | yes |  |  |
| kbid | string \| null |  |  |  |
| dataset_id | string \| null |  |  |  |
| account_id | string | yes |  |  |
| nua_client_id | string \| null |  |  |  |
| user_id | string | yes |  |  |
| id | string | yes |  |  |
| task_config_id | string \| null | yes |  |  |
| timestamp | string | yes |  |  |
| scheduled | boolean |  | False |  |
| completed | boolean |  | False |  |
| stopped | boolean |  | False |  |
| scheduled_at | string \| null |  |  |  |
| completed_at | string \| null |  |  |  |
| stopped_at | string \| null |  |  |  |
| failed | boolean |  | False |  |
| retries | integer |  | 0 |  |
| parameters | DataAugmentation-Output \| SemanticModelMigrationParams \| null |  |  |  |
| log | string \| null |  |  |  |
| cleanup_parent_task_id | string \| null |  |  | The ID of the task that this cleanup task is cleaning up after. This is only set to cleanup tasks. |

**PublicTaskSet**

| **Field** | **Type**                  | **Req** | **Default** | **Description** |
|-----------|---------------------------|---------|-------------|-----------------|
| request   | PublicTaskRequest \| null |         |             |                 |
| config    | PublicTaskConfig \| null  |         |             |                 |

**PushPayload**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| kbid | string \| null |  |  |  |
| uuid | string \| null |  |  |  |
| title | string \| null |  |  |  |
| labels | array\<string\> |  | \[\] |  |
| slug | string \| null |  |  |  |
| source | Source \| null |  |  |  |
| userid | string \| null |  |  |  |
| genericfield | map\<string, Text\> |  | {} |  |
| filefield | map\<string, string\> |  | {} |  |
| linkfield | map\<string, LinkUpload\> |  | {} |  |
| textfield | map\<string, Text\> |  | {} |  |
| layoutfield | map\<string, ProcessingLayoutDiff\> |  | {} |  |
| conversationfield | map\<string, ProcessingConversation\> |  | {} |  |
| generated_conversationfield | map\<string, ProcessingGeneratedConversation\> |  | {} |  |
| processing_options | PushProcessingOptions \| null |  |  |  |
| learning_config | LearningConfig \| null |  |  |  |
| webhook_config | WebhookConfig \| null |  |  |  |

**PushProcessingOptions**

| **Field**        | **Type**       | **Req** | **Default** | **Description** |
|------------------|----------------|---------|-------------|-----------------|
| ml_text          | boolean        |         | True        |                 |
| extract_strategy | string \| null |         |             |                 |
| split_strategy   | string \| null |         |             |                 |

**PushResponse**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| seqid | integer \| null |  |  |  |
| account_seq | integer \| null |  |  |  |
| queue | ProcessingQueueType \| null |  |  |  |
| uuid | string \| null |  |  |  |
| processing_id | string | yes |  |  |

**QAOperation**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| question_generator_prompt | string |  |  |  |
| system_question_generator_prompt | string |  |  |  |
| summary_prompt | string |  |  |  |
| generate_answers_prompt | string |  |  |  |
| triggers | array\<Trigger\> |  |  |  |
| max_questions | integer |  | 20 | Maximum number of question-answer pairs to generate per chunk. |

**QueryEntityDetection**

**Enum:** predict, suggest

**QueryInfo**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| language | string | yes |  |  |
| stop_words | array\<string\> | yes |  |  |
| semantic_threshold | number | yes |  |  |
| semantic_thresholds | map\<string, number\> | yes |  | Semantic threshold for each semantic model |
| visual_llm | boolean | yes |  |  |
| max_context | integer | yes |  |  |
| entities | TokenSearch \| null | yes |  |  |
| sentence | SentenceResponse \| null | yes |  |  |
| graph_nodes | GraphNodeSearch \| null |  |  | Graph node embeddings if requested |
| graph_edges | GraphEdgeSearch \| null |  |  | Graph edge embeddings if requested |
| query | string \| null | yes |  |  |
| rephrased_query | string \| null |  |  |  |

**QueryModel**

Model to represent a query request

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| text | string \| null |  |  | The query text to be processed |
| query_image | Image \| null |  |  | Image to be considered as part of the query. Even if the rephrase parameter is set to false, the rephrasing process will occur, combining the provided text with the image's visual features in the reph… |
| rephrase | boolean |  | False | If true, the model will rephrase the input text before processing |
| rephrase_prompt | string \| null |  |  | Custom prompt for rephrasing the input text |
| generative_model | string \| null |  |  | The generative model to use for rephrasing |
| semantic_models | array\<string\> \| null |  |  | Semantic models to compute the sentence vector for, if not provided, it will only compute the sentence vector for default semantic model in the Knowledge box's configuration. |
| agentic_entities | boolean |  | False | If true, the model will return the entities detected in the sentence guided by an already defined Graph Extraction Agent in the Knowledge Box. |
| graph_nodes | array\<string\> \| null |  |  | List of graph node names to compute embeddings for. If not provided, no graph node embeddings will be computed. |
| semantic_graph_node_models | array\<string\> \| null |  |  | Semantic models to compute graph node embeddings for. If not provided, it will only compute embeddings for the default graph semantic model in the Knowledge box's configuration. |
| graph_edges | array\<string\> \| null |  |  | List of graph edge labels to compute embeddings for. If not provided, no graph edge embeddings will be computed. |
| semantic_graph_edge_models | array\<string\> \| null |  |  | Semantic models to compute graph edge embeddings for. If not provided, it will only compute embeddings for the default graph edge semantic model in the Knowledge box's configuration. |

**QueryModelAccount**

Model to represent a query request without a defined KB

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| text | string \| null |  |  | The query text to be processed |
| query_image | Image \| null |  |  | Image to be considered as part of the query. Even if the rephrase parameter is set to false, the rephrasing process will occur, combining the provided text with the image's visual features in the reph… |
| rephrase | boolean |  | False | If true, the model will rephrase the input text before processing |
| rephrase_prompt | string \| null |  |  | Custom prompt for rephrasing the input text |
| generative_model | string |  | chatgpt-azure-4o | The generative model to use for rephrasing. |
| semantic_models | array\<string\> \| null |  |  | Semantic models to compute the sentence vector for, if not provided, it will only compute the sentence vector for default semantic model in the Knowledge box's configuration. |
| agentic_entities | boolean |  | False | If true, the model will return the entities detected in the sentence guided by an already defined Graph Extraction Agent in the Knowledge Box. |
| graph_nodes | array\<string\> \| null |  |  | List of graph node names to compute embeddings for. If not provided, no graph node embeddings will be computed. |
| semantic_graph_node_models | array\<string\> \| null |  |  | Semantic models to compute graph node embeddings for. If not provided, it will only compute embeddings for the default graph semantic model in the Knowledge box's configuration. |
| graph_edges | array\<string\> \| null |  |  | List of graph edge labels to compute embeddings for. If not provided, no graph edge embeddings will be computed. |
| semantic_graph_edge_models | array\<string\> \| null |  |  | Semantic models to compute graph edge embeddings for. If not provided, it will only compute embeddings for the default graph edge semantic model in the Knowledge box's configuration. |
| token_model | string |  | multilingual | The NER model to use for extracting entities from the input text. |
| semantic_model | string |  | multilingual-2024-05-06 | Semantic model to compute the sentence vector for. |

**Question**

| **Field**      | **Type**        | **Req** | **Default** | **Description** |
|----------------|-----------------|---------|-------------|-----------------|
| text           | string          | yes     |             |                 |
| language       | string \| null  |         |             |                 |
| ids_paragraphs | array\<string\> | yes     |             |                 |

**QuestionAnswer**

| **Field** | **Type**        | **Req** | **Default** | **Description** |
|-----------|-----------------|---------|-------------|-----------------|
| question  | Question        | yes     |             |                 |
| answers   | array\<Answer\> | yes     |             |                 |

**QuestionAnswerAnnotation**

| **Field**         | **Type**       | **Req** | **Default** | **Description** |
|-------------------|----------------|---------|-------------|-----------------|
| question_answer   | QuestionAnswer | yes     |             |                 |
| cancelled_by_user | boolean        |         | False       |                 |

**QuestionAnswers**

| **Field**       | **Type**                | **Req** | **Default** | **Description** |
|-----------------|-------------------------|---------|-------------|-----------------|
| question_answer | array\<QuestionAnswer\> | yes     |             |                 |

**QueueType**

**Enum:** private, shared

**Range**

**Type:** object (free-form map)

**RankFusionName**

**Enum:** rrf

**Reasoning**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| display | boolean |  | True | Whether to display the reasoning steps in the response. |
| effort | enum\[none, minimal, low, medium, high, xhigh\] |  | medium | How much reasoning the model should use before answering. Higher values can improve complex answers but may take longer. |
| budget_tokens | integer |  | 15000 | Maximum number of tokens the model can spend on reasoning before answering. Lower values can make responses faster; higher values allow deeper reasoning. |

**ReasoningConfig**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| default | integer \| learning_models\_\_providers\_\_models\_\_Effort | yes |  |  |
| available_efforts | array\<learning_models\_\_providers\_\_models\_\_Effort\> \| null |  |  |  |
| supports_disabling | boolean |  | True |  |
| chat_template_key | string \| null |  |  |  |

**ReasoningTags**

For detecting reasoning blocks

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| start     | string   | yes     |             |                 |
| end       | string   | yes     |             |                 |

**ReasoningType**

**Enum:** 0, 1, 2, 3

**ReciprocalRankFusion**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string |  | rrf |  |
| k | number |  | 60.0 | k parameter changes the influence top-ranked and lower-ranked elements have. Research has shown that 60 is a performant value across datasets |
| window | integer \| null |  |  | Number of elements for retrieval to do RRF. Window must be greater or equal to topk. Greater values will increase probability of multi match at cost of retrieval time |
| boosting | ReciprocalRankFusionWeights |  |  | Define different weights for each retriever. This allows to assign different priorities to different retrieval methods. RRF scores will be multiplied by this value. The default is 1 for each retriever… |

**ReciprocalRankFusionWeights**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| keyword   | number   |         | 1.0         |                 |
| semantic  | number   |         | 1.0         |                 |

**Relation-Input**

| **Field** | **Type**             | **Req** | **Default** | **Description** |
|-----------|----------------------|---------|-------------|-----------------|
| prop      | string               |         | relation    |                 |
| label     | string \| null       |         |             |                 |
| type      | RelationType \| null |         |             |                 |

**Relation-Output**

| **Field** | **Type**                 | **Req** | **Default** | **Description** |
|-----------|--------------------------|---------|-------------|-----------------|
| relation  | RelationType             | yes     |             |                 |
| label     | string \| null           |         |             |                 |
| metadata  | RelationMetadata \| null |         |             |                 |
| from      | RelationEntity \| null   |         |             |                 |
| to        | RelationEntity           | yes     |             |                 |

**RelationDirection**

**Enum:** in, out

**RelationEdgeVector**

| **Field**      | **Type**        | **Req** | **Default** | **Description** |
|----------------|-----------------|---------|-------------|-----------------|
| relation_label | string          | yes     |             |                 |
| vector         | array\<number\> | yes     |             |                 |

**RelationEntity**

| **Field** | **Type**         | **Req** | **Default** | **Description** |
|-----------|------------------|---------|-------------|-----------------|
| value     | string           | yes     |             |                 |
| type      | RelationNodeType | yes     |             |                 |
| group     | string \| null   |         |             |                 |

**RelationExample**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| source | string | yes |  | Entity name from which the relation starts |
| target | string | yes |  | Entity name to which the relation ends |
| label | string | yes |  | Type of relation |

**RelationMetadata**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| paragraph_id | string \| null |  |  |  |
| source_start | integer \| null |  |  |  |
| source_end | integer \| null |  |  |  |
| to_start | integer \| null |  |  |  |
| to_end | integer \| null |  |  |  |
| data_augmentation_task_id | string \| null |  |  |  |

**RelationModel**

**Enum:** base

**RelationNodeType**

**Enum:** entity, label, resource, user

**RelationNodeVector**

| **Field**  | **Type**        | **Req** | **Default** | **Description** |
|------------|-----------------|---------|-------------|-----------------|
| node_value | string          | yes     |             |                 |
| vector     | array\<number\> | yes     |             |                 |

**RelationRanking**

**Enum:** reranker, generative

**Relations**

| **Field** | **Type**                      | **Req** | **Default** | **Description** |
|-----------|-------------------------------|---------|-------------|-----------------|
| entities  | map\<string, EntitySubgraph\> | yes     |             |                 |

**RelationType**

**Enum:** ABOUT, CHILD, COLAB, ENTITY, OTHER, SYNONYM

**RemiRequest**

Model to represent a request for the REMi model Metrics will be computed
accordingly to the inputs given - Answer relevance will be computed if
answer and question are provided - Context relevance will be computed if
question and contexts are provided - Groundedness will be computed if
\`answ…

| **Field** | **Type**                | **Req** | **Default** | **Description** |
|-----------|-------------------------|---------|-------------|-----------------|
| user_id   | string                  | yes     |             |                 |
| question  | string \| null          |         |             |                 |
| answer    | string \| null          |         |             |                 |
| contexts  | array\<string\> \| null |         |             |                 |

**RemiResponse**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| time | number | yes |  |  |
| answer_relevance | AnswerRelevance \| null |  |  | Answer Relevance measures the relevance of the generated answer to the user query, in a scale of 0 to 5. |
| context_relevance | array\<integer \| null\> \| null |  |  | Context Relevance measures the relevance of the retrieved context to the user query, in a scale of 0 to 5. The score will be None if there was an error computing the score for a specific context. |
| groundedness | array\<integer \| null\> \| null |  |  | Groundedness measures the degree to which the generated answer is grounded in the retrieved context, in a scale of 0 to 5. The score will be None if there was an error computing the score for a specif… |
| consumption | ConsumptionResponse \| null |  |  |  |

**RephraseConfig**

| **Field**         | **Type**       | **Req** | **Default** | **Description** |
|-------------------|----------------|---------|-------------|-----------------|
| max_output_tokens | integer        |         | 1025        |                 |
| fallback_model    | string \| null |         |             |                 |

**RephraseModel**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| question | string | yes |  |  |
| chat_history | array\<Message\> |  |  |  |
| context | array\<Message\> |  |  |  |
| user_context | array\<string\> \| null |  |  |  |
| user_id | string |  | system |  |
| generative_model | string \| null |  |  | The generative model to use for the rephrase endpoint. If not provided, the model configured for the Knowledge Box is used. |
| prompt | string \| null |  |  | Prompt to send the model to rephrase the sentence, if not provided, the default prompt will be used. It must include the {question} placeholder. The placeholder will be replaced with the original ques… |
| chat_history_relevance_threshold | number \| null |  |  |  |

**Representation**

| **Field**      | **Type**        | **Req** | **Default** | **Description** |
|----------------|-----------------|---------|-------------|-----------------|
| is_a_table     | boolean \| null |         |             |                 |
| reference_file | string \| null  |         |             |                 |

**RequestSecurity**

Security metadata for the search request

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| access_groups | array\<string\> |  | \[\] | List of group ids to do the request with. |

**RerankerName**

Rerankers - Predict reranker: after retrieval, send the results to
Predict API to rerank it. This method uses a reranker model, so one can
expect better results at the expense of more latency. This will be the
new default - No-operation (noop) reranker: maintain order and do not
rerank the results a…

**Enum:** predict, noop

**RerankModel**

| **Field** | **Type**              | **Req** | **Default** | **Description** |
|-----------|-----------------------|---------|-------------|-----------------|
| question  | string                | yes     |             |                 |
| user_id   | string                | yes     |             |                 |
| context   | map\<string, string\> |         | {}          |                 |

**RerankResponse**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| context_scores | map\<string, number\> | yes |  | Scores for each context given by the reranker |
| consumption | ConsumptionResponse \| null |  |  | Consumption details for the rerank operation |

**Resource-Input**

Matches all fields of a resource given its id or slug

| **Field** | **Type**       | **Req** | **Default** | **Description**               |
|-----------|----------------|---------|-------------|-------------------------------|
| prop      | string         |         | resource    |                               |
| id        | string \| null |         |             | UUID of the resource to match |
| slug      | string \| null |         |             | Slug of the resource to match |

**Resource-Output**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| id | string | yes |  |  |
| slug | string \| null |  |  |  |
| title | string \| null |  |  |  |
| summary | string \| null |  |  |  |
| icon | string \| null |  |  |  |
| thumbnail | string \| null |  |  |  |
| metadata | Metadata \| null |  |  |  |
| usermetadata | UserMetadata \| null |  |  |  |
| fieldmetadata | array\<UserFieldMetadata\> \| null |  |  |  |
| computedmetadata | ComputedMetadata \| null |  |  |  |
| created | string \| null |  |  |  |
| modified | string \| null |  |  |  |
| last_seqid | integer \| null |  |  |  |
| last_account_seq | integer \| null |  |  |  |
| queue | QueueType \| null |  |  |  |
| hidden | boolean \| null |  |  |  |
| origin | Origin \| null |  |  |  |
| extra | Extra \| null |  |  |  |
| relations | array\<Relation-Output\> \| null |  |  |  |
| data | ResourceData \| null |  |  |  |
| security | ResourceSecurity \| null |  |  | Resource security metadata |

**ResourceCreated**

| **Field** | **Type**        | **Req** | **Default** | **Description** |
|-----------|-----------------|---------|-------------|-----------------|
| uuid      | string          | yes     |             |                 |
| elapsed   | number \| null  |         |             |                 |
| seqid     | integer \| null |         |             |                 |

**ResourceData**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| texts | map\<string, TextFieldData\> \| null |  |  |  |
| files | map\<string, FileFieldData\> \| null |  |  |  |
| links | map\<string, LinkFieldData\> \| null |  |  |  |
| conversations | map\<string, ConversationFieldData\> \| null |  |  |  |
| generics | map\<string, GenericFieldData\> \| null |  |  |  |
| key_values | map\<string, KeyValueFieldData\> \| null |  |  |  |

**ResourceFieldPrefix**

Matches a field or set of fields. This filter is for internal use only
and is not exposed in the public API schema.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| prop | string |  | resource_field_prefix |  |
| resource_id | string \| null |  |  | ID of the resource containing the field(s) to match |
| resource_slug | string \| null |  |  | Slug of the resource containing the field(s) to match. |
| field_type | FieldTypeName | yes |  | Type of the fields to match |
| field_name_prefix | string | yes |  | Prefix of the name of the field to match. If blank, matches all fields of the given type in the given resource |

**ResourceList**

| **Field**  | **Type**                 | **Req** | **Default** | **Description** |
|------------|--------------------------|---------|-------------|-----------------|
| resources  | array\<Resource-Output\> | yes     |             |                 |
| pagination | ResourcePagination       | yes     |             |                 |

**ResourceMimetype**

Matches resources with a mimetype. The mimetype of a resource can be
assigned independently of the mimetype of its fields. In resources with
multiple fields, you may prefer to use field_mimetype

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| prop | string |  | resource_mimetype |  |
| type | string | yes |  | Type of the mimetype to match. e.g: In image/jpeg, type is image |
| subtype | string \| null |  |  | Type of the mimetype to match. e.g: In image/jpeg, subtype is jpeg.Leave blank to match all mimetype of the type |

**ResourcePagination**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| page      | integer  | yes     |             |                 |
| size      | integer  | yes     |             |                 |
| last      | boolean  | yes     |             |                 |

**ResourceProcessingStatus**

**Enum:** PENDING, PROCESSED, ERROR, EMPTY, BLOCKED, EXPIRED

**ResourceProperties**

**Enum:** basic, origin, extra, relations, values, extracted, errors,
security

**ResourceSecurity**

Security metadata for the resource

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| access_groups | array\<string\> |  | \[\] | List of group ids that can access the resource. |

**ResponseFormatJSONObject**

JSON object response format. An older method of generating JSON
responses. Using json_schema is recommended for models that support it.
Note that the model will not generate JSON without a system or user
message instructing it to do so.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| type      | string   | yes     |             |                 |

**ResponseFormatJSONSchema**

JSON Schema response format. Used to generate structured JSON responses.
Learn more about \[Structured Outputs\]((see docs)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| json_schema | JSONSchema | yes |  | Structured Outputs configuration options, including a JSON Schema. |
| type | string | yes |  |  |

**ResponseFormatText**

Default response format. Used to generate text responses.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| type      | string   | yes     |             |                 |

**RetrievalAgentExportRequest**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| passphrase | string | yes |  | Passphrase to encrypt the exported configuration. Will be required for import. |

**Row**

| **Field** | **Type**                | **Req** | **Default** | **Description** |
|-----------|-------------------------|---------|-------------|-----------------|
| cell      | array\<string\> \| null |         |             |                 |

**RowsPreview**

| **Field** | **Type**                     | **Req** | **Default** | **Description** |
|-----------|------------------------------|---------|-------------|-----------------|
| sheets    | map\<string, Sheet\> \| null |         |             |                 |

**Rule**

| **Field** | **Type**       | **Req** | **Default** | **Description** |
|-----------|----------------|---------|-------------|-----------------|
| prompt    | string \| null |         |             |                 |

**Rules**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| rules | array\<Rule \| string\> |  |  | List of rules that the workflow should follow. Each rule can be a string or a Rule object with a prompt. |

**SCORE_TYPE**

**Enum:** VECTOR, BM25, BOTH, RERANKER, RELATION_RELEVANCE

**SeedConfig**

| **Field** | **Type**        | **Req** | **Default** | **Description** |
|-----------|-----------------|---------|-------------|-----------------|
| min       | integer         |         | 0           |                 |
| max       | integer         |         | 2147483647  |                 |
| default   | integer \| null |         |             |                 |

**SemanticConfig**

| **Field**       | **Type**           | **Req** | **Default** | **Description** |
|-----------------|--------------------|---------|-------------|-----------------|
| similarity      | SimilarityFunction | yes     |             |                 |
| size            | integer            | yes     |             |                 |
| threshold       | number             | yes     |             |                 |
| max_tokens      | integer \| null    |         |             |                 |
| matryoshka_dims | array\<integer\>   |         | \[\]        |                 |
| external        | boolean            |         | False       |                 |

**SemanticModelMigrationParams**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| semantic_model_id | string | yes |  | The id of the semantic model to migrate to. This must be a valid semantic model id available for the account |
| hf_embedding_key | HFEmbeddingKey \| null |  |  | The HuggingFace embedding key to use. This is only required if the semantic model is hfembedding |

**Sentence**

| **Field** | **Type**        | **Req** | **Default** | **Description** |
|-----------|-----------------|---------|-------------|-----------------|
| start     | integer \| null |         |             |                 |
| end       | integer \| null |         |             |                 |
| key       | string \| null  |         |             |                 |

**SentenceRequestData**

| **Field** | **Type**        | **Req** | **Default** | **Description** |
|-----------|-----------------|---------|-------------|-----------------|
| texts     | array\<string\> | yes     |             |                 |
| model     | string \| null  |         |             |                 |

**SentenceResponse**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| data | array\<number\> |  |  |  |
| vectors | map\<string, array\<number\>\> | yes |  | Sentence vectors for each semantic model |
| time | number | yes |  |  |
| timings | map\<string, number\> | yes |  | Time taken to compute the sentence vector for each semantic model |
| consumption | ConsumptionResponse \| null |  |  | Consumption details for the sentence operation |

**SentencesResponse**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| vectors | array\<array\<number\>\> | yes |  | Sentence vectors for each semantic model |
| time | number | yes |  |  |
| timings | map\<string, number\> | yes |  | Time taken to compute the sentence vector for each semantic model |
| consumption | ConsumptionResponse \| null |  |  | Consumption details for the sentence operation |

**SessionData**

| **Field** | **Type**   | **Req** | **Default** | **Description** |
|-----------|------------|---------|-------------|-----------------|
| slug      | string     | yes     |             |                 |
| name      | string     | yes     |             |                 |
| summary   | string     | yes     |             |                 |
| data      | string     | yes     |             |                 |
| format    | TextFormat | yes     |             |                 |

**Sheet**

| **Field** | **Type**             | **Req** | **Default** | **Description** |
|-----------|----------------------|---------|-------------|-----------------|
| rows      | array\<Row\> \| null |         |             |                 |

**SimilarityFunction**

**Enum:** 0, 1

**SortFields**

**Enum:** timestamp, scheduled_at, completed_at

**SortOrder**

**Enum:** asc, desc

**Source**

**Enum:** 0, 1

**SourceNode**

| **Field** | **Type**                 | **Req** | **Default** | **Description** |
|-----------|--------------------------|---------|-------------|-----------------|
| prop      | string                   |         | source_node |                 |
| value     | string \| null           |         |             |                 |
| match     | NodeMatchKindName        |         | exact       |                 |
| type      | RelationNodeType \| null |         | entity      |                 |
| group     | string \| null           |         |             |                 |

**SplitConfig**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| max_paragraph | integer |  | 0 |  |
| custom_split | CustomSplitStrategy \| null |  | 0 |  |

**SplitConfiguration**

| **Field**     | **Type**                  | **Req** | **Default** | **Description** |
|---------------|---------------------------|---------|-------------|-----------------|
| name          | string                    | yes     |             |                 |
| max_paragraph | integer                   |         | 0           |                 |
| custom_split  | CustomSplitStrategy       |         | NONE        |                 |
| llm_split     | LLMSplitConfig \| null    |         |             |                 |
| manual_split  | ManualSplitConfig \| null |         |             |                 |

**SplitConfiguration-Input**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string |  |  |  |
| max_paragraph | integer |  | 0 |  |
| custom_split | CustomSplitStrategy \| null |  | 0 |  |
| llm_split | LLMSplitConfig-Input \| null |  |  |  |
| manual_split | ManualSplitConfig \| null |  |  |  |

**SplitConfiguration-Output**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string |  |  |  |
| max_paragraph | integer |  | 0 |  |
| custom_split | CustomSplitStrategy \| null |  | 0 |  |
| llm_split | LLMSplitConfig-Output \| null |  |  |  |
| manual_split | ManualSplitConfig \| null |  |  |  |

**Stability**

**Enum:** stable, preview

**StreamDataTypes**

**Enum:** FullText, Chunk, Metadata, FilePreview, FileThumbnail,
GeneratedFile, Links

**StreamPostprocessor**

Postprocessors applied to streaming generative responses.

**Enum:** deduplicate_llm_citations

**StringModelTypes**

**Enum:** GENERATIVE, NER, RESOURCE_LABELER, CLASSIFIER, ANONYMIZER,
VISUAL_LABELER, SUMMARY, DUMMY, PARAGRAPH_LABELER, EMBEDDINGS, RELATIONS

**StructuredOutputConfig**

| **Field**        | **Type** | **Req** | **Default** | **Description** |
|------------------|----------|---------|-------------|-----------------|
| use_tool_calling | boolean  |         | True        |                 |

**SummarizedModelWithConsumption**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| resources | map\<string, SummarizedResource\> | yes |  |  |
| summary | string |  |  |  |
| consumption | ConsumptionResponse \| null |  |  |  |

**SummarizedResource**

| **Field**     | **Type** | **Req** | **Default** | **Description** |
|---------------|----------|---------|-------------|-----------------|
| summary       | string   | yes     |             |                 |
| tokens        | integer  | yes     |             |                 |
| input_tokens  | integer  | yes     |             |                 |
| output_tokens | integer  | yes     |             |                 |

**SummarizeModel**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| resources | map\<string, SummarizeResource\> | yes |  |  |
| summary_kind | SummaryKind |  | simple |  |
| user_prompt | string \| null |  |  |  |
| generative_model | string \| null |  |  |  |

**SummarizeResource**

| **Field** | **Type**              | **Req** | **Default** | **Description** |
|-----------|-----------------------|---------|-------------|-----------------|
| fields    | map\<string, string\> | yes     |             |                 |

**Summary**

**Enum:** extended, simple

**SummaryKind**

**Enum:** simple, extended

**SummaryPrompt**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| prompt    | string   | yes     |             |                 |

**SyncAskMetadata**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| tokens | AskTokens \| null |  |  | Number of tokens used in the LLM context and answer |
| timings | AskTimings \| null |  |  | Timings of the generative model |

**SyncAskResponse**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| answer | string | yes |  | The generative answer to the query |
| reasoning | string \| null |  |  | The reasoning steps followed by the LLM to generate the answer. This is returned only if the reasoning feature is enabled in the request. |
| answer_json | object (free-form map) \| null |  |  | The generative JSON answer to the query. This is returned only if the answerjsonschema parameter is provided in the request. |
| status | string | yes |  | The status of the query execution. It can be 'success', 'error', 'nocontext' or 'noretrievaldata' |
| retrieval_results | KnowledgeboxFindResults | yes |  | The retrieval results of the query |
| retrieval_best_matches | array\<AskRetrievalMatch\> |  | \[\] | Sorted list of best matching text blocks in the retrieval step. This includes the main query and prequeries results, if any. |
| prequeries | map\<string, KnowledgeboxFindResults\> \| null |  |  | The retrieval results of the prequeries |
| learning_id | string |  |  | The id of the learning request. This id can be used to provide feedback on the learning process. |
| relations | Relations \| null |  |  | The detected relations of the answer |
| citations | object (free-form map) |  |  | The citations of the answer. List of references to the resources used to generate the answer. |
| citation_footnote_to_context | map\<string, string\> |  |  | Maps ids in the footnote citations to querycontext keys (normally paragraph ids) |
| augmented_context | AugmentedContext \| null |  |  | Augmented text blocks that were sent to the LLM as part of the RAG strategies applied on the retrieval results in the request. |
| prompt_context | array\<string\> \| null |  |  | The prompt context used to generate the answer. Returned only if the debug flag is set to true |
| predict_request | object (free-form map) \| null |  |  | The internal predict request used to generate the answer. Returned only if the debug flag is set to true |
| metadata | SyncAskMetadata \| null |  |  | Metadata of the query execution. This includes the number of tokens used in the LLM context and answer, and the timings of the generative model. |
| consumption | Consumption \| null |  |  | The consumption of the query execution. Return only if 'X-show-consumption' header is set to true in the request. |
| error_details | string \| null |  |  | Error details message in case there was an error |
| debug | object (free-form map) \| null |  |  | Debug information about the ask operation. The metadata included in this field is subject to change and should not be used in production. Note that it is only available if the debug parameter is set t… |

**SyncMetadata**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| file_id | string | yes |  | Identifier of the file in the origin cloud storage system |
| auth_provider | string | yes |  | Authentication provider used to access the origin cloud storage system |
| content_hash | string | yes |  | Content hash of the file in the origin cloud storage system. The hash algorithm used depends on the origin system. |

**TableImageStrategy**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| name      | string   |         | tables      |                 |

**Task-Input**

**Enum:** PARAGRAPH_CLASSIFICATION, FIELD_CLASSIFICATION,
SENTENCE_CLASSIFICATION, TOKEN_CLASSIFICATION, IMAGE_CLASSIFICATION,
PARAGRAPH_STREAMING, QUESTION_ANSWER_STREAMING, FIELD_STREAMING

**Task-Output**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string | yes |  |  |
| image_repository | string |  | europe-west4-docker.pkg.dev/nuclia-internal/nuclia |  |
| image_name | string \| null |  |  |  |
| image_version | string |  | latest |  |
| entrypoint | array\<string\> \| null |  |  |  |
| sentry_id | string \| null |  |  |  |
| memory | string |  | 1Gi |  |
| cpu | string |  | 1000m |  |
| imagePullPolicy | string |  | Always |  |
| use_gpu | boolean |  | False |  |
| trainset_type | integer \| null |  |  |  |
| command | array\<string\> | yes |  |  |
| disallowed_account_types | array\<string\> |  | \[\] |  |
| model_type | object |  |  |  |
| listing | boolean |  | True |  |
| data_augmentation | boolean |  | False |  |
| description | string \| null |  |  |  |
| feedback | boolean |  | False |  |
| cleanup_command | array\<string\> \| null |  |  |  |

**TaskDefinition**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | TaskName | yes |  |  |
| description | string \| null |  |  |  |
| validation | object (free-form map) \| null |  |  |  |

**TaskEnable**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| enabled   | boolean  | yes     |             |                 |

**TaskList**

| **Field** | **Type**                   | **Req** | **Default** | **Description** |
|-----------|----------------------------|---------|-------------|-----------------|
| tasks     | array\<TaskDefinition\>    | yes     |             |                 |
| running   | array\<PublicTaskRequest\> | yes     |             |                 |
| configs   | array\<PublicTaskConfig\>  | yes     |             |                 |
| done      | array\<PublicTaskRequest\> | yes     |             |                 |

**TaskName**

**Enum:** dummy, env, demo-dataset, labeler, llm-graph,
synthetic-questions, ask, llm-align, semantic-model-migrator,
llama-guard, prompt-guard, memory

**TaskPatch**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| parameters | DataAugmentation-Input \| SemanticModelMigrationParams \| null | yes |  | Parameters to be passed to the task. These must match the validation field for the Task definition class |

**TaskRequest**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| task | Task-Output | yes |  |  |
| source | TrainingTaskDatasetSource | yes |  |  |
| kbid | string \| null |  |  |  |
| dataset_id | string \| null |  |  |  |
| dataset_path | string \| null |  |  |  |
| account_id | string | yes |  |  |
| account_type | string | yes |  |  |
| nua_client_id | string \| null |  |  |  |
| user_id | string | yes |  |  |
| parameters | DataAugmentation-Output \| SemanticModelMigrationParams \| null |  |  |  |
| id | string | yes |  |  |
| task_config_id | string \| null |  |  |  |
| timestamp | string | yes |  |  |
| scheduled | boolean |  | False |  |
| completed | boolean |  | False |  |
| stopped | boolean |  | False |  |
| scheduled_at | string \| null |  |  |  |
| completed_at | string \| null |  |  |  |
| stopped_at | string \| null |  |  |  |
| failed | boolean |  | False |  |
| retries | integer |  | 0 |  |
| token | string \| null |  |  |  |
| key_id | string \| null |  |  |  |
| ndb_token | string \| null |  |  |  |
| log | string \| null |  |  |  |
| cleanup_parent_task_id | string \| null |  |  | The ID of the task that this cleanup task is cleaning up after. This is only set to cleanup tasks. |

**TaskResponse**

| **Field** | **Type**  | **Req** | **Default** | **Description** |
|-----------|-----------|---------|-------------|-----------------|
| name      | TaskName  | yes     |             |                 |
| status    | JobStatus | yes     |             |                 |
| id        | string    | yes     |             |                 |

**TaskStart**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | TaskName | yes |  |  |
| parameters | DataAugmentation-Input \| SemanticModelMigrationParams \| null |  |  | Parameters to be passed to the task. These must match the validation field for the Task definition class |
| uuid_task | string \| null |  |  | UUID of an already configured task. This is used to start a task that was already configured |

**TaskStartKB**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | TaskName | yes |  |  |
| parameters | DataAugmentation-Input \| SemanticModelMigrationParams \| null |  |  | Parameters to be passed to the task. These must match the validation field for the Task definition class |
| uuid_task | string \| null |  |  | UUID of an already configured task. This is used to start a task that was already configured |
| apply | ApplyOptions |  | ALL | Defines how the tasks should be applied to the existing data. - EXSITING: Only apply to existing data (starts a worker that executes the task) - NEW: Only apply to new data (enables the task at proces… |
| enabled | boolean |  | True | Whether the task should be enabled at the time of creation. This only applies to tasks involving 'NEW' apply options, as 'EXISTING' tasks start immediately |

**TemperatureConfig**

| **Field** | **Type**       | **Req** | **Default** | **Description** |
|-----------|----------------|---------|-------------|-----------------|
| min       | number         |         | 0.0         |                 |
| max       | number         | yes     |             |                 |
| default   | number \| null | yes     |             |                 |

**Text**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| body | string | yes |  |  |
| format | Format | yes |  |  |
| extract_strategy | string \| null |  |  |  |
| split_strategy | string \| null |  |  |  |
| classification_labels | array\<ClassificationLabel\> \| null |  |  |  |

**TextBlockAugmentationType**

**Enum:** neighbouring_paragraphs, conversation, hierarchy,
full_resource, field_extension, metadata_extension

**TextFieldData**

| **Field** | **Type**                       | **Req** | **Default** | **Description** |
|-----------|--------------------------------|---------|-------------|-----------------|
| value     | FieldText \| null              |         |             |                 |
| extracted | TextFieldExtractedData \| null |         |             |                 |
| error     | Error \| null                  |         |             |                 |
| status    | string \| null                 |         |             |                 |
| errors    | array\<Error\> \| null         |         |             |                 |

**TextFieldExtractedData**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| text | ExtractedText \| null |  |  |  |
| metadata | FieldComputedMetadata \| null |  |  |  |
| large_metadata | LargeComputedMetadata \| null |  |  |  |
| vectors | VectorObject \| null |  |  |  |
| question_answers | FieldQuestionAnswers \| null |  |  |  |
| relation_node_vectors | map\<string, array\<RelationNodeVector\>\> \| null |  |  |  |
| relation_edge_vectors | map\<string, array\<RelationEdgeVector\>\> \| null |  |  |  |

**TextFormat**

**Enum:** PLAIN, HTML, RST, MARKDOWN, JSON, KEEP_MARKDOWN, JSONL,
PLAIN_BLANKLINE_SPLIT

**TextGenerationKey**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| model     | string   |         |             |                 |

**TextGenerationUserPrompt**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| prompt    | string   |         |             |                 |

**TextPosition**

| **Field**     | **Type**                 | **Req** | **Default** | **Description** |
|---------------|--------------------------|---------|-------------|-----------------|
| page_number   | integer \| null          |         |             |                 |
| index         | integer                  | yes     |             |                 |
| start         | integer                  | yes     |             |                 |
| end           | integer                  | yes     |             |                 |
| start_seconds | array\<integer\> \| null |         |             |                 |
| end_seconds   | array\<integer\> \| null |         |             |                 |

**Tokenizer**

**Enum:** 0, 1, 2

**TokenizerConfig**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string \| null |  |  |  |
| path | string \| null |  |  |  |
| extra_kwargs | object (free-form map) \| null |  |  |  |

**TokensDetail**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| input     | number   | yes     |             |                 |
| output    | number   | yes     |             |                 |
| image     | number   | yes     |             |                 |

**TokenSearch**

| **Field**    | **Type**                    | **Req** | **Default** | **Description** |
|--------------|-----------------------------|---------|-------------|-----------------|
| tokens       | array\<Ner\>                |         | \[\]        |                 |
| time         | number                      | yes     |             |                 |
| input_tokens | integer                     |         | 0           |                 |
| consumption  | ConsumptionResponse \| null |         |             |                 |

**TokenValues**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| min       | integer  |         | 0           |                 |
| max       | integer  | yes     |             |                 |

**Tool**

| **Field**   | **Type**               | **Req** | **Default** | **Description**    |
|-------------|------------------------|---------|-------------|--------------------|
| name        | string                 | yes     |             |                    |
| description | string                 | yes     |             |                    |
| parameters  | object (free-form map) |         |             | Schema of the tool |

**ToolChoiceAuto**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| type      | string   |         | auto        |                 |

**ToolChoiceForced**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| type      | string   |         | forced      |                 |
| name      | string   | yes     |             |                 |

**ToolChoiceNone**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| type      | string   |         | none        |                 |

**ToolChoiceRequired**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| type      | string   |         | required    |                 |

**ToolMessage**

| **Field**    | **Type**       | **Req** | **Default** | **Description** |
|--------------|----------------|---------|-------------|-----------------|
| type         | string         |         | tool        |                 |
| author       | Author         |         | USER        |                 |
| text         | string         |         |             |                 |
| tool_call_id | string         | yes     |             |                 |
| name         | string \| null |         |             |                 |
| content      | object         |         |             |                 |

**TrainingTaskDatasetSource**

**Enum:** nucliadb, dataset

**Trigger**

| **Field** | **Type**              | **Req** | **Default** | **Description** |
|-----------|-----------------------|---------|-------------|-----------------|
| url       | string                |         |             |                 |
| headers   | map\<string, string\> |         |             |                 |
| params    | map\<string, string\> |         |             |                 |

**TypeBlock**

**Enum:** 0, 1, 2, 3, 4, 5, 6

**TypeParagraph**

**Enum:** TEXT, OCR, INCEPTION, DESCRIPTION, TRANSCRIPT, TITLE, TABLE

**UserClassification**

| **Field**         | **Type** | **Req** | **Default** | **Description** |
|-------------------|----------|---------|-------------|-----------------|
| labelset          | string   | yes     |             |                 |
| label             | string   | yes     |             |                 |
| cancelled_by_user | boolean  |         | False       |                 |

**UserFieldMetadata**

Field-level metadata set by the user via the rest api

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| paragraphs | array\<ParagraphAnnotation\> |  | \[\] |  |
| question_answers | array\<QuestionAnswerAnnotation\> |  | \[\] |  |
| field | FieldID | yes |  |  |

**UserLearningKeys**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| openai | learning_config\_\_models\_\_OpenAIKey \| null |  |  |  |
| azure_openai | learning_config\_\_models\_\_AzureOpenAIKey \| null |  |  |  |
| mistral | learning_config\_\_models\_\_MistralKey \| null |  |  |  |
| palm | learning_config\_\_models\_\_PalmKey \| null |  |  |  |
| anthropic | learning_config\_\_models\_\_AnthropicKey \| null |  |  |  |
| claude3 | learning_config\_\_models\_\_AnthropicKey \| null |  |  |  |
| anthropic_vertex | AnthropicVertexKey \| null |  |  |  |
| azure_mistral | learning_config\_\_models\_\_MistralKey \| null |  |  |  |
| hf_llm | HFLLMKey \| null |  |  |  |
| hf_embedding | learning_config\_\_models\_\_HFEmbeddingKey \| null |  |  |  |
| azure_aii | AzureAIIKey \| null |  |  |  |
| openai_compat | OpenAICompatModel-Output \| null |  |  |  |

**UserLearningKeys-Input**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| openai | OpenAIKey \| null |  |  |  |
| azure_openai | AzureOpenAIKey \| null |  |  |  |
| palm | PalmKey \| null |  |  |  |
| anthropic | AnthropicKey \| null |  |  |  |
| claude3 | AnthropicKey \| null |  |  |  |
| anthropic_vertex | AnthropicVertexKey \| null |  |  |  |
| anthropic_bedrock | AnthropicBedrockKey \| null |  |  |  |
| text_generation | TextGenerationKey \| null |  |  |  |
| mistral | MistralKey \| null |  |  |  |
| azure_mistral | AzureMistralKey \| null |  |  |  |
| hf_llm | HFLLMKey \| null |  |  |  |
| hf_embedding | learning_protos\_\_config_p2p\_\_HFEmbeddingKey \| null |  |  |  |
| azure_aii | AzureAIIKey \| null |  |  |  |
| openai_compat | OpenAICompatModel-Input \| null |  |  |  |

**UserLearningKeys-Output**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| openai | OpenAIKey \| null |  |  |  |
| azure_openai | AzureOpenAIKey \| null |  |  |  |
| palm | PalmKey \| null |  |  |  |
| anthropic | AnthropicKey \| null |  |  |  |
| claude3 | AnthropicKey \| null |  |  |  |
| anthropic_vertex | AnthropicVertexKey \| null |  |  |  |
| anthropic_bedrock | AnthropicBedrockKey \| null |  |  |  |
| text_generation | TextGenerationKey \| null |  |  |  |
| mistral | MistralKey \| null |  |  |  |
| azure_mistral | AzureMistralKey \| null |  |  |  |
| hf_llm | HFLLMKey \| null |  |  |  |
| hf_embedding | learning_protos\_\_config_p2p\_\_HFEmbeddingKey \| null |  |  |  |
| azure_aii | AzureAIIKey \| null |  |  |  |
| openai_compat | OpenAICompatModel-Output \| null |  |  |  |

**UserMetadata**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| classifications | array\<UserClassification\> |  | \[\] |  |
| relations | array\<Relation-Output\> |  | \[\] |  |

**UserPrompt**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| prompt    | string   | yes     |             |                 |

**UserPrompts**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| openai | OpenAIUserPrompt \| null |  |  |  |
| azure_openai | AzureUserPrompt \| null |  |  |  |
| palm | PalmUserPrompt \| null |  |  |  |
| anthropic | AnthropicUserPrompt \| null |  |  |  |
| text_generation | TextGenerationUserPrompt \| null |  |  |  |
| mistral | MistralUserPrompt \| null |  |  |  |
| azure_mistral | AzureMistralUserPrompt \| null |  |  |  |
| claude3 | Claude3UserPrompt \| null |  |  |  |
| anthropic_vertex | Claude3UserPrompt \| null |  |  |  |
| anthropic_bedrock | Claude3UserPrompt \| null |  |  |  |
| deepseek | DeepSeekUserPrompt \| null |  |  |  |
| nova | NovaUserPrompt \| null |  |  |  |

**ValidationError**

| **Field** | **Type**                   | **Req** | **Default** | **Description** |
|-----------|----------------------------|---------|-------------|-----------------|
| loc       | array\<string \| integer\> | yes     |             |                 |
| msg       | string                     | yes     |             |                 |
| type      | string                     | yes     |             |                 |

**Vector**

| **Field**       | **Type**                | **Req** | **Default** | **Description** |
|-----------------|-------------------------|---------|-------------|-----------------|
| start           | integer \| null         |         |             |                 |
| end             | integer \| null         |         |             |                 |
| start_paragraph | integer \| null         |         |             |                 |
| end_paragraph   | integer \| null         |         |             |                 |
| vector          | array\<number\> \| null |         |             |                 |

**VectorObject**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| vectors | Vectors \| null |  |  |  |
| split_vectors | map\<string, Vectors\> \| null |  |  |  |
| deleted_splits | array\<string\> \| null |  |  |  |

**Vectors**

| **Field** | **Type**                | **Req** | **Default** | **Description** |
|-----------|-------------------------|---------|-------------|-----------------|
| vectors   | array\<Vector\> \| null |         |             |                 |

**VisualLabeling**

**Enum:** disabled, enabled

**VLLMExtractionConfig**

| **Field**           | **Type**        | **Req** | **Default** | **Description** |
|---------------------|-----------------|---------|-------------|-----------------|
| generative_model    | string \| null  |         |             |                 |
| generative_provider | string \| null  |         |             |                 |
| rules               | array\<string\> |         | \[\]        |                 |

**VLLMExtractionConfig-Input**

| **Field** | **Type**                | **Req** | **Default** | **Description** |
|-----------|-------------------------|---------|-------------|-----------------|
| rules     | array\<string\>         |         |             |                 |
| llm       | LLMConfig-Input \| null |         |             |                 |

**VLLMExtractionConfig-Output**

| **Field** | **Type**                 | **Req** | **Default** | **Description** |
|-----------|--------------------------|---------|-------------|-----------------|
| rules     | array\<string\>          |         |             |                 |
| llm       | LLMConfig-Output \| null |         |             |                 |

**WebhookConfig**

| **Field** | **Type**              | **Req** | **Default** | **Description** |
|-----------|-----------------------|---------|-------------|-----------------|
| uri       | string \| null        |         |             |                 |
| headers   | map\<string, string\> |         | {}          |                 |

**WorkflowData**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| id | string | yes |  |  |
| name | string | yes |  |  |
| description | string \| null | yes |  |  |
| parameters | object (free-form map) \| null | yes |  |  |
| rules | Rules \| null |  |  |  |
| required | array\<string\> |  |  |  |

**WorkflowInput**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| id | string | yes |  |  |
| name | string | yes |  |  |
| description | string \| null |  |  |  |
| parameters | object (free-form map) \| null |  |  |  |
| rules | Rules |  |  |  |
| required | array\<string\> |  |  |  |

**WorkflowUpdate**

| **Field**   | **Type**               | **Req** | **Default** | **Description** |
|-------------|------------------------|---------|-------------|-----------------|
| name        | string                 | yes     |             |                 |
| description | string                 | yes     |             |                 |
| parameters  | object (free-form map) | yes     |             |                 |
| required    | array\<string\>        |         |             |                 |
| rules       | Rules \| null          |         |             |                 |

**zone — 124 schemas**

**AccountType**

**Enum:** stash-trial, v3starter, v3pro, v3enterprise, cowork, v3fly,
v3growth

**ActivityLogsAskQuery**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| pagination | Pagination |  | {'limit': 10} |  |
| year_month | string | yes |  |  |
| show | array\<enum\[id, date, user_id, user_type, client_type, total_duration, audit_metadata, resource_id, nuclia_tokens, token_details…\]\> \| string |  | \['resources_count', 'id', 'rephrased_question', 'answer', 'question', 'rag_strategies_names', 'date'\] |  |
| filters | QueryFiltersAsk | yes |  |  |

**ActivityLogsChatQuery**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| pagination | Pagination |  | {'limit': 10} |  |
| year_month | string | yes |  |  |
| show | array\<enum\[id, date, user_id, user_type, client_type, total_duration, audit_metadata, resource_id, nuclia_tokens, token_details…\]\> \| string |  | \['question', 'rag_strategies_names', 'id', 'date', 'rephrased_question', 'answer'\] |  |
| filters | QueryFiltersChat | yes |  |  |

**ActivityLogsQuery**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| pagination | Pagination |  | {'limit': 10} |  |
| year_month | string | yes |  |  |
| show | array\<enum\[id, date, user_id, user_type, client_type, total_duration, audit_metadata, resource_id, nuclia_tokens, token_details\]\> \| string |  | \['date', 'id'\] |  |
| filters | QueryFiltersCommon | yes |  |  |

**ActivityLogsSearchQuery**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| pagination | Pagination |  | {'limit': 10} |  |
| year_month | string | yes |  |  |
| show | array\<enum\[id, date, user_id, user_type, client_type, total_duration, audit_metadata, resource_id, nuclia_tokens, token_details…\]\> \| string |  | \['date', 'id', 'question', 'resources_count'\] |  |
| filters | QueryFiltersSearch | yes |  |  |

**ActivityUsageResponse**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| timestamp | string   | yes     |             |                 |
| search    | integer  | yes     |             |                 |
| chat      | integer  | yes     |             |                 |
| ask       | integer  | yes     |             |                 |

**AddKbUser**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| id        | string   | yes     |             |                 |
| role      | KbRole   | yes     |             |                 |

**AggregatedRemiScoreMetric**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| timestamp | string | yes |  |  |
| metrics | array\<AggregatedRemiScoreValues\> | yes |  |  |

**AggregatedRemiScoreValues**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| name      | string   | yes     |             |                 |
| min       | number   | yes     |             |                 |
| max       | number   | yes     |             |                 |
| average   | number   | yes     |             |                 |

**Aggregation**

**Enum:** hour, day, week, month, quarter, year, millennium

**AuditMetadata**

| **Field** | **Type**                | **Req** | **Default** | **Description** |
|-----------|-------------------------|---------|-------------|-----------------|
| eq        | string \| null          |         |             |                 |
| gt        | string \| null          |         |             |                 |
| ge        | string \| null          |         |             |                 |
| lt        | string \| null          |         |             |                 |
| le        | string \| null          |         |             |                 |
| ne        | string \| null          |         |             |                 |
| isnull    | boolean \| null         |         |             |                 |
| isin      | array\<string\> \| null |         |             |                 |
| isnotin   | array\<string\> \| null |         |             |                 |
| like      | string \| null          |         |             |                 |
| ilike     | string \| null          |         |             |                 |
| key       | string                  | yes     |             |                 |

**AuthorizeUrlOutput**

| **Field**     | **Type** | **Req** | **Default** | **Description** |
|---------------|----------|---------|-------------|-----------------|
| authorize_url | string   | yes     |             |                 |

**AWSS3AssumeRoleCredentials**

| **Field**   | **Type** | **Req** | **Default** | **Description** |
|-------------|----------|---------|-------------|-----------------|
| role_arn    | string   | yes     |             |                 |
| external_id | string   | yes     |             |                 |

**AzureCertificateCredentials**

Credentials for Azure/SharePoint certificate-based authentication. This
uses the client credentials flow with a certificate instead of a client
secret. The certificate must be registered in the Azure App
Registration. Users provide a .pfx file (base64-encoded) and its
password. The private key and c…

| **Field**    | **Type** | **Req** | **Default** | **Description** |
|--------------|----------|---------|-------------|-----------------|
| tenant_id    | string   | yes     |             |                 |
| client_id    | string   | yes     |             |                 |
| pfx_base64   | string   | yes     |             |                 |
| pfx_password | string   | yes     |             |                 |

**BackupCreate**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| kb_id | string | yes |  | The unique identifier of the knowledgebox to backup. |

**BackupCreateResponse**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| id | string | yes |  | The unique identifier of the created backup. |

**BackupResponse**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| id | string | yes |  | The unique identifier of the backup. |
| account_id | string | yes |  | The unique identifier of the account associated with the backup. |
| started_at | string | yes |  | The timestamp when the backup process started. |
| kb_data | KBDataResponse | yes |  | Metadata of the backed-up knowledgebox. |
| finished_at | string \| null |  |  | The timestamp when the backup process finished. |
| size | integer \| null |  |  | The size of the backup in bytes. |

**BackupRestore**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| slug | string | yes |  | The slug of the new restored knowledgebox. |
| title | string | yes |  | The title of the new restored knowledgebox. |

**BatchUpdateKbUsers**

| **Field** | **Type**                      | **Req** | **Default** | **Description** |
|-----------|-------------------------------|---------|-------------|-----------------|
| add       | array\<AddKbUser\> \| null    |         |             |                 |
| update    | array\<UpdateKbUser\> \| null |         |             |                 |
| delete    | array\<string\> \| null       |         |             |                 |

**BrowseCapabilities**

Capabilities for browsing storage in this external connection.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| has_sites | boolean |  | False | Whether the provider supports site browsing (SharePoint only). |
| requires_site_search | boolean |  | False | Whether sitesearch is required (True) or can list all sites (False). Only applicable for certificate auth connections. |
| requires_site_url_resolution | boolean |  | False | Whether the client must use the /resolvesite endpoint to obtain a siteid from a site URL before browsing drives. Applies to OAuth connections using Sites.Selected permission. |

**BrowseStorageOutput**

Result of browsing storage, containing sites, drives or folders.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| sites | array\<StorageSiteOutput\> \| null |  |  |  |
| drives | array\<StorageDriveOutput\> \| null |  |  |  |
| folders | array\<StorageFolderOutput\> \| null |  |  |  |
| next_page_token | string \| null |  |  |  |

**ClientType**

**Enum:** api, widget, web, dashboard, desktop, chrome_extension

**ContextRelevanceQuery**

| **Field**   | **Type**                  | **Req** | **Default** | **Description** |
|-------------|---------------------------|---------|-------------|-----------------|
| value       | integer                   | yes     |             |                 |
| operation   | enum\[gt, lt, eq\]        | yes     |             |                 |
| aggregation | enum\[average, max, min\] | yes     |             |                 |

**DownloadActivityLogsAskQuery**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| year_month | string | yes |  |  |
| show | array\<enum\[id, date, user_id, user_type, client_type, total_duration, audit_metadata, resource_id, nuclia_tokens, token_details…\]\> \| string |  | \['resources_count', 'id', 'rephrased_question', 'answer', 'question', 'rag_strategies_names', 'date'\] |  |
| filters | QueryFiltersAsk | yes |  |  |
| email_address | string \| null |  |  |  |
| notify_via_email | boolean |  | False |  |

**DownloadActivityLogsChatQuery**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| year_month | string | yes |  |  |
| show | array\<enum\[id, date, user_id, user_type, client_type, total_duration, audit_metadata, resource_id, nuclia_tokens, token_details…\]\> \| string |  | \['question', 'rag_strategies_names', 'id', 'date', 'rephrased_question', 'answer'\] |  |
| filters | QueryFiltersChat | yes |  |  |
| email_address | string \| null |  |  |  |
| notify_via_email | boolean |  | False |  |

**DownloadActivityLogsQuery**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| year_month | string | yes |  |  |
| show | array\<enum\[id, date, user_id, user_type, client_type, total_duration, audit_metadata, resource_id, nuclia_tokens, token_details\]\> \| string |  | \['date', 'id'\] |  |
| filters | QueryFiltersCommon | yes |  |  |
| email_address | string \| null |  |  |  |
| notify_via_email | boolean |  | False |  |

**DownloadActivityLogsSearchQuery**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| year_month | string | yes |  |  |
| show | array\<enum\[id, date, user_id, user_type, client_type, total_duration, audit_metadata, resource_id, nuclia_tokens, token_details…\]\> \| string |  | \['date', 'id', 'question', 'resources_count'\] |  |
| filters | QueryFiltersSearch | yes |  |  |
| email_address | string \| null |  |  |  |
| notify_via_email | boolean |  | False |  |

**DownloadFormat**

**Enum:** ndjson, csv

**DownloadRequest**

| **Field**       | **Type**            | **Req** | **Default** | **Description** |
|-----------------|---------------------|---------|-------------|-----------------|
| request_id      | string              | yes     |             |                 |
| download_type   | DownloadRequestType | yes     |             |                 |
| download_format | DownloadFormat      | yes     |             |                 |
| event_type      | EventType           | yes     |             |                 |
| requested_at    | string              | yes     |             |                 |
| kb_id           | string              | yes     |             |                 |
| download_url    | string \| null      | yes     |             |                 |

**DownloadRequestType**

**Enum:** query

**DummyKBIndexProvider**

| **Field** | **Type**                    | **Req** | **Default** | **Description** |
|-----------|-----------------------------|---------|-------------|-----------------|
| type      | KBExternalIndexProviderType |         | unset       |                 |

**EphemeralTokenProperties**

| **Field**     | **Type**        | **Req** | **Default** | **Description** |
|---------------|-----------------|---------|-------------|-----------------|
| agent_session | string \| null  |         |             |                 |
| ttl           | integer \| null |         |             |                 |

**EphemeralTokenRequestPayload**

| **Field**     | **Type**        | **Req** | **Default** | **Description** |
|---------------|-----------------|---------|-------------|-----------------|
| agent_session | string \| null  |         |             |                 |
| path          | string \| null  |         |             |                 |
| ttl           | integer \| null |         |             |                 |

**EphemeralTokenResponse**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| token     | string   | yes     |             |                 |

**EventDownloadsList**

| **Field** | **Type**        | **Req** | **Default** | **Description** |
|-----------|-----------------|---------|-------------|-----------------|
| downloads | array\<string\> | yes     |             |                 |

**EventType**

**Enum:** visited, modified, deleted, new, search, suggest, indexed,
chat, ask, retrieve, augment, started, stopped, processed

**ExternalAuthorizationInput**

Input schema for external connection authorization with additional
parameters.

| **Field**           | **Type**       | **Req** | **Default** | **Description** |
|---------------------|----------------|---------|-------------|-----------------|
| widget_redirect_url | string \| null |         |             |                 |
| rao_redirect_url    | string         | yes     |             |                 |

**ExternalConnectionInput**

Input schema for creating an external connection. For OAuth providers
(google_oauth, azure_oauth, sharefile_oauth): only provider is required.
The response will contain an authorize_url to complete the OAuth flow.
For providers aws_s3_assume_role, azure_certificate_credentials:
provider and credenti…

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| provider | Provider | yes |  |  |
| credentials | AWSS3AssumeRoleCredentials \| AzureCertificateCredentials \| null |  |  |  |

**ExternalConnectionOutput**

External connection output without sensitive credential data.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| id | string | yes |  |  |
| kb_id | string | yes |  |  |
| created_by | string | yes |  |  |
| created_at | string | yes |  |  |
| updated_at | string | yes |  |  |
| provider | Provider | yes |  |  |
| capabilities | BrowseCapabilities | yes |  | Capabilities for browsing storage in this external connection. |

**FileFilterInput**

| **Field**     | **Type**                 | **Req** | **Default** | **Description** |
|---------------|--------------------------|---------|-------------|-----------------|
| mode          | enum\[include, exclude\] | yes     |             |                 |
| extensions    | array\<string\> \| null  |         |             |                 |
| glob_patterns | array\<string\> \| null  |         |             |                 |

**FileFilterOutput**

| **Field**     | **Type**                 | **Req** | **Default** | **Description** |
|---------------|--------------------------|---------|-------------|-----------------|
| mode          | enum\[include, exclude\] | yes     |             |                 |
| extensions    | array\<string\> \| null  |         |             |                 |
| glob_patterns | array\<string\> \| null  |         |             |                 |

**GenericFilter_bool\_**

| **Field** | **Type**                 | **Req** | **Default** | **Description** |
|-----------|--------------------------|---------|-------------|-----------------|
| eq        | boolean \| null          |         |             |                 |
| gt        | boolean \| null          |         |             |                 |
| ge        | boolean \| null          |         |             |                 |
| lt        | boolean \| null          |         |             |                 |
| le        | boolean \| null          |         |             |                 |
| ne        | boolean \| null          |         |             |                 |
| isnull    | boolean \| null          |         |             |                 |
| isin      | array\<boolean\> \| null |         |             |                 |
| isnotin   | array\<boolean\> \| null |         |             |                 |

**GenericFilter_ClientType\_**

| **Field** | **Type**                    | **Req** | **Default** | **Description** |
|-----------|-----------------------------|---------|-------------|-----------------|
| eq        | ClientType \| null          |         |             |                 |
| gt        | ClientType \| null          |         |             |                 |
| ge        | ClientType \| null          |         |             |                 |
| lt        | ClientType \| null          |         |             |                 |
| le        | ClientType \| null          |         |             |                 |
| ne        | ClientType \| null          |         |             |                 |
| isnull    | boolean \| null             |         |             |                 |
| isin      | array\<ClientType\> \| null |         |             |                 |
| isnotin   | array\<ClientType\> \| null |         |             |                 |

**GenericFilter_datetime\_**

| **Field** | **Type**                | **Req** | **Default** | **Description** |
|-----------|-------------------------|---------|-------------|-----------------|
| eq        | string \| null          |         |             |                 |
| gt        | string \| null          |         |             |                 |
| ge        | string \| null          |         |             |                 |
| lt        | string \| null          |         |             |                 |
| le        | string \| null          |         |             |                 |
| ne        | string \| null          |         |             |                 |
| isnull    | boolean \| null         |         |             |                 |
| isin      | array\<string\> \| null |         |             |                 |
| isnotin   | array\<string\> \| null |         |             |                 |

**GenericFilter_float\_**

| **Field** | **Type**                | **Req** | **Default** | **Description** |
|-----------|-------------------------|---------|-------------|-----------------|
| eq        | number \| null          |         |             |                 |
| gt        | number \| null          |         |             |                 |
| ge        | number \| null          |         |             |                 |
| lt        | number \| null          |         |             |                 |
| le        | number \| null          |         |             |                 |
| ne        | number \| null          |         |             |                 |
| isnull    | boolean \| null         |         |             |                 |
| isin      | array\<number\> \| null |         |             |                 |
| isnotin   | array\<number\> \| null |         |             |                 |

**GenericFilter_int\_**

| **Field** | **Type**                 | **Req** | **Default** | **Description** |
|-----------|--------------------------|---------|-------------|-----------------|
| eq        | integer \| null          |         |             |                 |
| gt        | integer \| null          |         |             |                 |
| ge        | integer \| null          |         |             |                 |
| lt        | integer \| null          |         |             |                 |
| le        | integer \| null          |         |             |                 |
| ne        | integer \| null          |         |             |                 |
| isnull    | boolean \| null          |         |             |                 |
| isin      | array\<integer\> \| null |         |             |                 |
| isnotin   | array\<integer\> \| null |         |             |                 |

**GenericFilter_str\_**

| **Field** | **Type**                | **Req** | **Default** | **Description** |
|-----------|-------------------------|---------|-------------|-----------------|
| eq        | string \| null          |         |             |                 |
| gt        | string \| null          |         |             |                 |
| ge        | string \| null          |         |             |                 |
| lt        | string \| null          |         |             |                 |
| le        | string \| null          |         |             |                 |
| ne        | string \| null          |         |             |                 |
| isnull    | boolean \| null         |         |             |                 |
| isin      | array\<string\> \| null |         |             |                 |
| isnotin   | array\<string\> \| null |         |             |                 |

**GenericFilter_UserType\_**

| **Field** | **Type**                  | **Req** | **Default** | **Description** |
|-----------|---------------------------|---------|-------------|-----------------|
| eq        | UserType \| null          |         |             |                 |
| gt        | UserType \| null          |         |             |                 |
| ge        | UserType \| null          |         |             |                 |
| lt        | UserType \| null          |         |             |                 |
| le        | UserType \| null          |         |             |                 |
| ne        | UserType \| null          |         |             |                 |
| isnull    | boolean \| null           |         |             |                 |
| isin      | array\<UserType\> \| null |         |             |                 |
| isnotin   | array\<UserType\> \| null |         |             |                 |

**HTTPValidationError**

| **Field** | **Type**                 | **Req** | **Default** | **Description** |
|-----------|--------------------------|---------|-------------|-----------------|
| detail    | array\<ValidationError\> |         |             |                 |

**InvalidResource**

Details about a resource that failed validation.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| resource | ResourceIdentifier | yes |  | Identifier for an external resource. The meaning of fileid depends on the provider (determined by the sync config): - Google Drive: the Drive file id - SharePoint / OneDrive: the item id - S3: the obj… |
| reason | string | yes |  |  |

**InviteKnowledgeBoxPayload**

| **Field** | **Type**       | **Req** | **Default** | **Description** |
|-----------|----------------|---------|-------------|-----------------|
| email     | string         | yes     |             |                 |
| role      | KbRole         | yes     |             |                 |
| came_from | string \| null |         |             |                 |

**ItemCreated**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| id        | string   | yes     |             |                 |

**KBDataResponse**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| id | string | yes |  | The unique identifier of the knowledgebox. |
| slug | string | yes |  | A human-readable, URL-friendly identifier for the knowledgebox. |
| title | string | yes |  | The title of the knowledgebox. |
| created | string | yes |  | The timestamp when the knowledgebox was created. |

**KBExternalIndexProviderType**

**Enum:** unset

**KbInvitedUser**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| email     | string   | yes     |             |                 |
| role      | KbRole   | yes     |             |                 |
| expires   | string   | yes     |             |                 |

**KBMode**

Knowledge Box modes define the architecture and components of a KB. -
kb: KB in idp_regional + NucliaDB KB (same ID), no agent - agent: KB in
idp_regional + NucliaDB KB (same ID) + Agent with memory (agent_id =
kb_id) - agent_no_memory: KB in idp_regional + Agent without memory
(agent_id = kb_id), n…

**Enum:** kb, agent, agent_no_memory

**KbRole**

**Enum:** SOWNER, SMEMBER, SCONTRIBUTOR

**KbState**

**Enum:** PUBLISHED, PRIVATE

**KbUser**

| **Field** | **Type**       | **Req** | **Default** | **Description** |
|-----------|----------------|---------|-------------|-----------------|
| id        | string         | yes     |             |                 |
| role      | KbRole         | yes     |             |                 |
| email     | string \| null |         |             |                 |
| name      | string \| null |         |             |                 |

**KnowledgeBox**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| id | string | yes |  |  |
| slug | string | yes |  |  |
| account_id | string | yes |  |  |
| zone | string | yes |  |  |
| title | string | yes |  |  |
| description | string \| null |  |  |  |
| state | KbState | yes |  |  |
| created | string | yes |  |  |
| admin | boolean \| null |  |  |  |
| contrib | boolean \| null |  |  |  |
| allowed_origins | array\<string\> \| null |  |  |  |
| allowed_ip_addresses | array\<string\> \| null |  |  |  |
| search_configs | object (free-form map) |  | {} |  |
| external_index_provider | string \| null |  |  |  |
| enforce_security | boolean | yes |  | Whether security is enforced by default on all requests to this Knowledge Box. |

**KnowledgeBoxCreation**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| slug | string | yes |  |  |
| title | string | yes |  |  |
| description | string \| null |  |  |  |
| mode | KBMode |  | kb | Mode of the Knowledge Box (immutable after creation). 'kb': Standard KB with NucliaDB storage. 'agent': Agent with memory backed by NucliaDB. 'agentnomemory': Agent without memory (no NucliaDB KB crea… |
| learning_configuration | object (free-form map) |  |  |  |
| allowed_origins | array\<string\> \| null |  |  |  |
| allowed_ip_addresses | array\<string\> \| null |  |  |  |
| external_index_provider | DummyKBIndexProvider \| null |  |  | External index provider configuration for the Knowledge Box. If not set, the default NucliaDB's index will be used. |
| search_configs | object (free-form map) |  | {} |  |
| enforce_security | boolean |  | False | Whether security is enforced by default on all requests to this Knowledge Box. |

**KnowledgeBoxExport**

| **Field**   | **Type** | **Req** | **Default** | **Description** |
|-------------|----------|---------|-------------|-----------------|
| id          | string   | yes     |             |                 |
| title       | string   | yes     |             |                 |
| description | string   | yes     |             |                 |

**KnowledgeBoxSummary**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| id | string | yes |  |  |
| slug | string | yes |  |  |
| zone | string | yes |  |  |
| title | string | yes |  |  |
| state | KbState | yes |  |  |
| description | string \| null |  |  |  |
| role_on_kb | KbRole \| null |  |  |  |
| allowed_origins | array\<string\> \| null |  |  |  |
| allowed_ip_addresses | array\<string\> \| null |  |  |  |
| search_configs | object (free-form map) \| null |  |  |  |
| external_index_provider | string \| null |  |  |  |
| enforce_security | boolean | yes |  | Whether security is enforced by default on all requests to this Knowledge Box. |

**KnowledgeBoxUpdate**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| slug | string \| null |  |  |  |
| title | string \| null |  |  |  |
| state | KbState \| null |  |  |  |
| description | string \| null |  |  |  |
| allowed_origins | array\<string\> \| null |  |  |  |
| allowed_ip_addresses | array\<string\> \| null |  |  |  |
| search_configs | object (free-form map) \| null |  |  |  |
| enforce_security | boolean \| null |  |  | Whether security is enforced by default on all requests to this Knowledge Box. Leaving this as None means no change, while setting it to True or False will update the setting accordingly. |

**LabelInput**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| labelset  | string   | yes     |             |                 |
| label     | string   | yes     |             |                 |

**LabelOutput**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| labelset  | string   | yes     |             |                 |
| label     | string   | yes     |             |                 |

**LogEntryOutput**

A single log entry from a sync job.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| id | integer | yes |  | Unique identifier for the log entry |
| timestamp | string | yes |  | Timestamp of the log entry |
| level | string | yes |  | Log level (INFO, WARNING, ERROR, etc.) |
| message | string | yes |  | Log message |
| extra | object (free-form map) \| null |  |  | Additional context data for the log entry |

**LogLevel**

Log level for filtering sync job logs.

**Enum:** DEBUG, INFO, WARNING, ERROR, EXCEPTION, CRITICAL

**ModifiedTimeRangeInput**

| **Field** | **Type**       | **Req** | **Default** | **Description** |
|-----------|----------------|---------|-------------|-----------------|
| from      | string \| null |         |             |                 |
| to        | string \| null |         |             |                 |

**ModifiedTimeRangeOutput**

| **Field** | **Type**       | **Req** | **Default** | **Description** |
|-----------|----------------|---------|-------------|-----------------|
| from      | string \| null |         |             |                 |
| to        | string \| null |         |             |                 |

**NUAClient**

| **Field**   | **Type** | **Req** | **Default** | **Description** |
|-------------|----------|---------|-------------|-----------------|
| token       | string   | yes     |             |                 |
| client_id   | string   | yes     |             |                 |
| internal_id | string   | yes     |             |                 |

**NUAClientKeyCreation**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| contact | string | yes |  |  |
| title | string | yes |  |  |
| description | string \| null |  |  |  |
| client_id | string \| null |  |  |  |
| processing_webhook | ProcessingWebhook \| null |  |  |  |
| allow_kb_management | boolean |  | False |  |
| tokens_limit | integer \| null |  |  |  |

**NUAClientMetadata**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| title | string | yes |  |  |
| description | string \| null |  |  |  |
| contact | string | yes |  |  |
| created | string | yes |  |  |
| partitions | integer | yes |  |  |
| client_id | string | yes |  |  |
| internal_id | string | yes |  |  |
| account_id | string | yes |  |  |
| processing_webhook | ProcessingWebhook \| null |  |  |  |
| tokens_limit | integer \| null |  |  |  |

**NUAClientsMetadata**

| **Field** | **Type**                   | **Req** | **Default** | **Description** |
|-----------|----------------------------|---------|-------------|-----------------|
| clients   | array\<NUAClientMetadata\> | yes     |             |                 |

**NUAClientUpdate**

| **Field**    | **Type**        | **Req** | **Default** | **Description** |
|--------------|-----------------|---------|-------------|-----------------|
| tokens_limit | integer \| null |         |             |                 |
| title        | string \| null  |         |             |                 |
| contact      | string \| null  |         |             |                 |

**NUATokenMetadataUpdate**

| **Field**       | **Type**       | **Req** | **Default** | **Description** |
|-----------------|----------------|---------|-------------|-----------------|
| nua_internal_id | string         | yes     |             |                 |
| issuer          | string \| null |         |             |                 |
| seen_at         | string         | yes     |             |                 |

**PaginatedLogsOutput**

Paginated list of log entries.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| items | array\<LogEntryOutput\> | yes |  |  |
| next_cursor | integer \| null |  |  | Cursor (log ID) to fetch the next page of results. None if no more results. |

**PaginatedSyncJobsOutput**

Paginated list of sync jobs.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| items | array\<SyncJobOutput\> | yes |  |  |
| next_cursor | string \| null |  |  | Cursor to fetch the next page of results. None if no more results. |

**Pagination**

| **Field**      | **Type**        | **Req** | **Default** | **Description** |
|----------------|-----------------|---------|-------------|-----------------|
| limit          | integer         |         | 10          |                 |
| starting_after | integer \| null |         |             |                 |
| ending_before  | integer \| null |         |             |                 |

**PermissionsResponse**

| **Field**   | **Type**        | **Req** | **Default** | **Description** |
|-------------|-----------------|---------|-------------|-----------------|
| permissions | array\<string\> | yes     |             |                 |

**ProcessingWebhook**

| **Field** | **Type**              | **Req** | **Default** | **Description** |
|-----------|-----------------------|---------|-------------|-----------------|
| uri       | string                | yes     |             |                 |
| headers   | map\<string, string\> |         | {}          |                 |

**Provider**

**Enum:** google_oauth, azure_oauth, azure_certificate_credentials,
aws_s3_assume_role, sharefile_oauth, dropbox_oauth

**QueryFiltersAsk**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| id | GenericFilter_int\_ \| null |  |  |  |
| date | GenericFilter_datetime\_ \| null |  |  |  |
| user_id | GenericFilter_str\_ \| null |  |  |  |
| user_type | GenericFilter_UserType\_ \| null |  |  |  |
| client_type | GenericFilter_ClientType\_ \| null |  |  |  |
| total_duration | GenericFilter_int\_ \| null |  |  |  |
| audit_metadata | array\<AuditMetadata\> \| null |  |  |  |
| nuclia_tokens | GenericFilter_float\_ \| null |  |  |  |
| question | StringFilter \| null |  |  |  |
| rephrased_question | StringFilter \| null |  |  |  |
| answer | StringFilter \| null |  |  |  |
| learning_id | StringFilter \| null |  |  |  |
| feedback_good | GenericFilter_bool\_ \| null |  |  | True if the feedback provided for the main question is positive. |
| feedback_comment | StringFilter \| null |  |  | User-provided comment on the feedback for the question. |
| feedback_good_all | GenericFilter_bool\_ \| null |  |  | True if all feedback, including that on the main question and each related text block, is positive. |
| feedback_good_any | GenericFilter_bool\_ \| null |  |  | True if there is any positive feedback on the question itself or any related text block. |
| model | StringFilter \| null |  |  |  |
| status | GenericFilter_int\_ \| null |  |  |  |
| generative_answer_first_chunk_time | GenericFilter_int\_ \| null |  |  | Time in milliseconds from when the user made the request to when the first answer chunk of data was returned by the generative model. |
| generative_reasoning_first_chunk_time | GenericFilter_int\_ \| null |  |  | Time in milliseconds from when the user made the request to when the first reasoning chunk of data was returned by the generative model. |
| generative_answer_time | GenericFilter_int\_ \| null |  |  | Time in milliseconds elapsed between the answer streaming request is done to the generative model until the last chunk of the answer is returned. |
| reasoning | StringFilter \| null |  |  |  |
| resources_count | GenericFilter_int\_ \| null |  |  |  |
| vectorset | StringFilter \| null |  |  |  |
| min_score_bm25 | GenericFilter_float\_ \| null |  |  |  |
| min_score_semantic | GenericFilter_float\_ \| null |  |  |  |
| result_per_page | GenericFilter_int\_ \| null |  |  |  |
| retrieval_time | GenericFilter_int\_ \| null |  |  | Time in milliseconds spent on the NucliaDB side for retrieval, including retrieval rephrase, calculation of query embedding, index search and results hydration |

**QueryFiltersChat**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| id | GenericFilter_int\_ \| null |  |  |  |
| date | GenericFilter_datetime\_ \| null |  |  |  |
| user_id | GenericFilter_str\_ \| null |  |  |  |
| user_type | GenericFilter_UserType\_ \| null |  |  |  |
| client_type | GenericFilter_ClientType\_ \| null |  |  |  |
| total_duration | GenericFilter_int\_ \| null |  |  |  |
| audit_metadata | array\<AuditMetadata\> \| null |  |  |  |
| nuclia_tokens | GenericFilter_float\_ \| null |  |  |  |
| question | StringFilter \| null |  |  |  |
| rephrased_question | StringFilter \| null |  |  |  |
| answer | StringFilter \| null |  |  |  |
| learning_id | StringFilter \| null |  |  |  |
| feedback_good | GenericFilter_bool\_ \| null |  |  | True if the feedback provided for the main question is positive. |
| feedback_comment | StringFilter \| null |  |  | User-provided comment on the feedback for the question. |
| feedback_good_all | GenericFilter_bool\_ \| null |  |  | True if all feedback, including that on the main question and each related text block, is positive. |
| feedback_good_any | GenericFilter_bool\_ \| null |  |  | True if there is any positive feedback on the question itself or any related text block. |
| model | StringFilter \| null |  |  |  |
| status | GenericFilter_int\_ \| null |  |  |  |
| generative_answer_first_chunk_time | GenericFilter_int\_ \| null |  |  | Time in milliseconds from when the user made the request to when the first answer chunk of data was returned by the generative model. |
| generative_reasoning_first_chunk_time | GenericFilter_int\_ \| null |  |  | Time in milliseconds from when the user made the request to when the first reasoning chunk of data was returned by the generative model. |
| generative_answer_time | GenericFilter_int\_ \| null |  |  | Time in milliseconds elapsed between the answer streaming request is done to the generative model until the last chunk of the answer is returned. |
| reasoning | StringFilter \| null |  |  |  |

**QueryFiltersCommon**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| id | GenericFilter_int\_ \| null |  |  |  |
| date | GenericFilter_datetime\_ \| null |  |  |  |
| user_id | GenericFilter_str\_ \| null |  |  |  |
| user_type | GenericFilter_UserType\_ \| null |  |  |  |
| client_type | GenericFilter_ClientType\_ \| null |  |  |  |
| total_duration | GenericFilter_int\_ \| null |  |  |  |
| audit_metadata | array\<AuditMetadata\> \| null |  |  |  |
| nuclia_tokens | GenericFilter_float\_ \| null |  |  |  |

**QueryFiltersSearch**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| id | GenericFilter_int\_ \| null |  |  |  |
| date | GenericFilter_datetime\_ \| null |  |  |  |
| user_id | GenericFilter_str\_ \| null |  |  |  |
| user_type | GenericFilter_UserType\_ \| null |  |  |  |
| client_type | GenericFilter_ClientType\_ \| null |  |  |  |
| total_duration | GenericFilter_int\_ \| null |  |  |  |
| audit_metadata | array\<AuditMetadata\> \| null |  |  |  |
| nuclia_tokens | GenericFilter_float\_ \| null |  |  |  |
| question | StringFilter \| null |  |  |  |
| resources_count | GenericFilter_int\_ \| null |  |  |  |
| vectorset | StringFilter \| null |  |  |  |
| min_score_bm25 | GenericFilter_float\_ \| null |  |  |  |
| min_score_semantic | GenericFilter_float\_ \| null |  |  |  |
| result_per_page | GenericFilter_int\_ \| null |  |  |  |
| retrieval_time | GenericFilter_int\_ \| null |  |  | Time in milliseconds spent on the NucliaDB side for retrieval, including retrieval rephrase, calculation of query embedding, index search and results hydration |

**RegionalTokenMetadataPayload**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| sa_updates | array\<SATokenMetadataUpdate\> |  | \[\] |  |
| nua_updates | array\<NUATokenMetadataUpdate\> |  | \[\] |  |

**RemiAnswerRelevance**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| score     | integer  | yes     |             |                 |
| reason    | string   | yes     |             |                 |

**RemiQuery**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| context_relevance | ContextRelevanceQuery \| null |  |  |  |
| month | string | yes |  |  |
| from_date | string \| null |  |  |  |
| to_date | string \| null |  |  |  |
| feedback_good | boolean \| null |  |  |  |
| status | Status \| null |  |  |  |
| pagination | Pagination |  | {'limit': 10} |  |

**RemiQueryResult**

| **Field** | **Type**           | **Req** | **Default** | **Description** |
|-----------|--------------------|---------|-------------|-----------------|
| id        | integer            | yes     |             |                 |
| question  | string             | yes     |             |                 |
| date      | string             | yes     |             |                 |
| answer    | string \| null     | yes     |             |                 |
| remi      | RemiScores \| null | yes     |             |                 |

**RemiQueryResults**

| **Field** | **Type**                 | **Req** | **Default** | **Description** |
|-----------|--------------------------|---------|-------------|-----------------|
| data      | array\<RemiQueryResult\> | yes     |             |                 |
| has_more  | boolean                  | yes     |             |                 |

**RemiQueryResultWithContext**

| **Field** | **Type**                  | **Req** | **Default** | **Description** |
|-----------|---------------------------|---------|-------------|-----------------|
| id        | integer                   | yes     |             |                 |
| question  | string                    | yes     |             |                 |
| date      | string                    | yes     |             |                 |
| answer    | string \| null            | yes     |             |                 |
| remi      | RemiScores \| null        | yes     |             |                 |
| context   | array\<RetrievedContext\> | yes     |             |                 |

**RemiScores**

| **Field**         | **Type**            | **Req** | **Default** | **Description** |
|-------------------|---------------------|---------|-------------|-----------------|
| answer_relevance  | RemiAnswerRelevance | yes     |             |                 |
| context_relevance | array\<integer\>    | yes     |             |                 |
| groundedness      | array\<integer\>    | yes     |             |                 |

**ResourceIdentifier**

Identifier for an external resource. The meaning of file_id depends on
the provider (determined by the sync config): - Google Drive: the Drive
file id - SharePoint / OneDrive: the item id - S3: the object key -
ShareFile: the item id - Dropbox: the full file path including filename
(e.g. /Docu…

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| file_id   | string   | yes     |             |                 |

**ResourceValidationInput**

Input schema for validating multiple resources with existing external
connection. Credentials should be a Fernet-encrypted string containing
the JSON-serialized credentials dict, encrypted with the same key used
for external connections.

| **Field**   | **Type**                    | **Req** | **Default** | **Description** |
|-------------|-----------------------------|---------|-------------|-----------------|
| credentials | string                      | yes     |             |                 |
| resources   | array\<ResourceIdentifier\> | yes     |             |                 |

**ResourceValidationOutput**

Output schema for validated resources.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| valid_resources | array\<ResourceIdentifier\> | yes |  |  |
| invalid_resources | array\<InvalidResource\> | yes |  |  |

**RetrievedContext**

| **Field**     | **Type**       | **Req** | **Default** | **Description** |
|---------------|----------------|---------|-------------|-----------------|
| text          | string         | yes     |             |                 |
| text_block_id | string \| null |         |             |                 |

**S3AssumeRoleInfoOutput**

Information the client needs to configure an IAM role for Nuclia S3
sync.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| external_id | string | yes |  | The external ID to use in the IAM role trust policy condition. |
| role_name | string | yes |  | The role name that should be created in the client's AWS account. |
| aws_account_id | string | yes |  | Nuclia's AWS account ID that will assume the role. |

**SATokenMetadataUpdate**

| **Field** | **Type**       | **Req** | **Default** | **Description** |
|-----------|----------------|---------|-------------|-----------------|
| sa_key_id | string         | yes     |             |                 |
| issuer    | string \| null |         |             |                 |
| seen_at   | string         | yes     |             |                 |

**ServiceAccount**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| id | string | yes |  |  |
| title | string | yes |  |  |
| role | KbRole | yes |  |  |
| keys | array\<ServiceAccountKey\> \| null |  |  |  |

**ServiceAccountCreation**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| title     | string   | yes     |             |                 |
| role      | KbRole   | yes     |             |                 |

**ServiceAccountJWT**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| id        | string   | yes     |             |                 |
| token     | string   | yes     |             |                 |

**ServiceAccountKey**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| id        | string   | yes     |             |                 |
| created   | string   | yes     |             |                 |
| expires   | string   | yes     |             |                 |

**ServiceAccountKeyCreation**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| expires   | string   | yes     |             |                 |

**ShowOnly**

Marker class to indicate that a field is for display purposes only.
Fields wrapped in this class are excluded from OpenAPI documentation to
prevent confusion, as they are not intended for filtering. Instead, they
are only used in the "show" parameter. This behavior is enforced in the
FastAPI applica…

**Type:** object

**SortOrder**

Sort order for paginated queries.

**Enum:** asc, desc

**Status**

**Enum:** SUCCESS, ERROR, NO_CONTEXT

**StorageDriveOutput**

Represents a drive/storage location that can be selected for syncing.

| **Field**  | **Type**       | **Req** | **Default** | **Description** |
|------------|----------------|---------|-------------|-----------------|
| id         | string         | yes     |             |                 |
| name       | string         | yes     |             |                 |
| drive_type | string \| null |         |             |                 |
| web_url    | string \| null |         |             |                 |

**StorageFolderOutput**

Represents a folder that can be selected for syncing.

| **Field** | **Type**       | **Req** | **Default** | **Description** |
|-----------|----------------|---------|-------------|-----------------|
| id        | string         | yes     |             |                 |
| name      | string         | yes     |             |                 |
| path      | string         | yes     |             |                 |
| web_url   | string \| null |         |             |                 |

**StorageSiteOutput**

Represents a SharePoint site that can be selected for browsing drives.

| **Field** | **Type**       | **Req** | **Default** | **Description** |
|-----------|----------------|---------|-------------|-----------------|
| id        | string         | yes     |             |                 |
| name      | string         | yes     |             |                 |
| web_url   | string \| null |         |             |                 |

**StringFilter**

| **Field** | **Type**                | **Req** | **Default** | **Description** |
|-----------|-------------------------|---------|-------------|-----------------|
| eq        | string \| null          |         |             |                 |
| gt        | string \| null          |         |             |                 |
| ge        | string \| null          |         |             |                 |
| lt        | string \| null          |         |             |                 |
| le        | string \| null          |         |             |                 |
| ne        | string \| null          |         |             |                 |
| isnull    | boolean \| null         |         |             |                 |
| isin      | array\<string\> \| null |         |             |                 |
| isnotin   | array\<string\> \| null |         |             |                 |
| like      | string \| null          |         |             |                 |
| ilike     | string \| null          |         |             |                 |

**SyncConfigInput**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string | yes |  |  |
| sync_root_path | string \| null |  |  |  |
| folder_id | string \| null |  |  |  |
| external_connection_id | string | yes |  |  |
| drive_id | string \| null |  |  |  |
| file_filter | FileFilterInput \| null |  |  |  |
| labels | array\<LabelInput\> \| null |  |  |  |
| modified_time_range | ModifiedTimeRangeInput \| null |  |  |  |
| extract_strategy | string \| null |  |  |  |

**SyncConfigOutput**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| id | string | yes |  |  |
| name | string | yes |  |  |
| kb_id | string | yes |  |  |
| created_at | string | yes |  |  |
| updated_at | string | yes |  |  |
| sync_root_path | string | yes |  |  |
| sync_interval_minutes | integer | yes |  |  |
| created_by | string | yes |  |  |
| external_connection | ExternalConnectionOutput | yes |  | External connection output without sensitive credential data. |
| drive_id | string \| null |  |  |  |
| file_filter | FileFilterOutput \| null |  |  |  |
| labels | array\<LabelOutput\> \| null |  |  |  |
| modified_time_range | ModifiedTimeRangeOutput \| null |  |  |  |
| extract_strategy | string \| null |  |  |  |
| last_sync_run | string \| null |  |  |  |

**SyncConfigUpdateInput**

Partial update model for SyncConfig. Omitted fields are left unchanged.
Fields explicitly set to null clear that entry from extra_configuration.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string \| null |  |  |  |
| file_filter | FileFilterInput \| null |  |  |  |
| labels | array\<LabelInput\> \| null |  |  |  |
| modified_time_range | ModifiedTimeRangeInput \| null |  |  |  |
| extract_strategy | string \| null |  |  |  |

**SyncJobOptionsOutput**

Options for a sync job.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| full_sync | boolean  |         | False       |                 |

**SyncJobOutput**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| id | string | yes |  |  |
| created_at | string | yes |  |  |
| finished_at | string \| null | yes |  |  |
| config_id | string | yes |  |  |
| status | SyncJobStatus | yes |  |  |
| options | SyncJobOptionsOutput |  | {'full_sync': False} | Options for a sync job. |

**SyncJobStatus**

**Enum:** pending, in_progress, completed, failed

**TemporalAgentKeyCreation**

| **Field**     | **Type** | **Req** | **Default** | **Description** |
|---------------|----------|---------|-------------|-----------------|
| agent_session | string   | yes     |             |                 |
| ttl           | integer  |         | 10          |                 |

**TemporalSecurityTokenResponse**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| token     | string   | yes     |             |                 |

**TemporalServiceAccountKeyCreation**

| **Field**       | **Type**                | **Req** | **Default** | **Description** |
|-----------------|-------------------------|---------|-------------|-----------------|
| ttl             | integer                 |         | 10          |                 |
| security_groups | array\<string\> \| null |         |             |                 |

**TriggerSyncInput**

Input for triggering a sync job.

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| full_sync | boolean |  | False | If True, ignore incremental sync state and perform a full sync. Note: S3 and ShareFile providers always perform full syncs as they don't support delta tracking. |

**UpdateKbUser**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| id        | string   | yes     |             |                 |
| role      | KbRole   | yes     |             |                 |

**UserType**

**Enum:** user, nuakey

**ValidationError**

| **Field** | **Type**                   | **Req** | **Default** | **Description** |
|-----------|----------------------------|---------|-------------|-----------------|
| loc       | array\<string \| integer\> | yes     |             |                 |
| msg       | string                     | yes     |             |                 |
| type      | string                     | yes     |             |                 |
| input     | object                     |         |             |                 |
| ctx       | object                     |         |             |                 |

**global — 195 schemas**

**Account**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| id | string | yes |  |  |
| slug | string | yes |  |  |
| title | string | yes |  |  |
| type | AccountType | yes |  |  |
| zone_visibility | ZoneVisibility | yes |  |  |
| description | string \| null |  |  |  |
| can_manage_account | boolean | yes |  |  |
| current_users | integer | yes |  |  |
| max_users | integer \| null |  |  |  |
| current_kbs | integer | yes |  |  |
| max_kbs | integer \| null |  |  |  |
| current_agents | integer | yes |  |  |
| max_agents | integer \| null |  |  |  |
| current_memories | integer | yes |  |  |
| max_memories | integer \| null |  |  |  |
| current_arags | integer | yes |  |  |
| max_arags | integer \| null |  |  |  |
| blocking_state | AccountBlockingState |  | unblocked |  |
| blocked_features | array\<BlockedFeature\> |  | \[\] |  |
| limits | AccountLimits \| null |  |  |  |
| creation_date | string | yes |  |  |
| trial_expiration_date | string \| null |  |  |  |
| domain | string \| null |  |  |  |
| saml_entity_id | string \| null |  |  |  |
| saml_sso_url | string \| null |  |  |  |
| saml_x509_cert | string \| null |  |  |  |
| saml_config | SAMLConfig \| null |  |  |  |
| workflow | WorkflowMode |  | classic |  |
| eula_accepted | boolean |  | False |  |

**AccountAWSMarketplaceSubscriptionInfo**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| status | AWSMarketplaceSubscriptionStatus | yes |  |  |
| on_demand_budget | number \| null |  |  |  |
| action_on_budget_exhausted | ActionOnBudgetExhausted \| null |  |  |  |
| aws_product_code | string | yes |  |  |
| aws_product_id | string | yes |  |  |
| free_tokens_per_billing_cycle | integer | yes |  |  |
| free_storage_nuclia_tokens | integer \| null |  |  |  |
| billing_formula_id | string | yes |  |  |

**AccountBillingConfig**

| **Field**          | **Type** | **Req** | **Default** | **Description** |
|--------------------|----------|---------|-------------|-----------------|
| account_id         | string   | yes     |             |                 |
| billing_formula_id | string   | yes     |             |                 |

**AccountBlockingState**

**Enum:** unblocked, quota, manager, trial_expired, budget,
subscription_canceled, subscription_unpaid

**AccountCreated**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| id        | string   | yes     |             |                 |

**AccountCreation**

| **Field**     | **Type**       | **Req** | **Default** | **Description** |
|---------------|----------------|---------|-------------|-----------------|
| slug          | string \| null |         |             |                 |
| title         | string         | yes     |             |                 |
| description   | string \| null |         |             |                 |
| email         | string \| null |         |             |                 |
| zone          | string \| null |         |             |                 |
| workflow      | WorkflowMode   |         | classic     |                 |
| eula_accepted | boolean        |         | False       |                 |

**AccountId**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| id        | string   | yes     |             |                 |
| slug      | string   | yes     |             |                 |

**AccountingTarget**

Accounting target identifies a specific method of calculating a value
for a stripe price from accounting metrics, but uncoupled from both
price and metrics concepts. Originally, the purpose of target was
intended to be filled in by the value of a specific metric in
accounting. Given that accounting …

**Enum:** media, training, paragraphs_processed, predict, generative,
ai-tokens-used, nuclia-tokens, paragraphs, searches, qa, self-hosted-qa,
self-hosted-predict, self-hosted-processed-paragraphs,
self-hosted-processed-documents

**AccountLabels**

| **Field**        | **Type**        | **Req** | **Default** | **Description** |
|------------------|-----------------|---------|-------------|-----------------|
| progress_account | boolean \| null |         |             |                 |

**AccountLimits**

| **Field**  | **Type**                    | **Req** | **Default** | **Description** |
|------------|-----------------------------|---------|-------------|-----------------|
| upload     | AccountUploadLimits \| null |         |             |                 |
| usage      | AccountUsageLimits \| null  |         |             |                 |
| processing | AccountUsageLimits \| null  |         |             |                 |

**AccountListItem**

| **Field**       | **Type**       | **Req** | **Default** | **Description** |
|-----------------|----------------|---------|-------------|-----------------|
| id              | string         | yes     |             |                 |
| slug            | string         | yes     |             |                 |
| title           | string         | yes     |             |                 |
| type            | AccountType    | yes     |             |                 |
| zone_visibility | ZoneVisibility | yes     |             |                 |

**AccountManager**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| id | string | yes |  |  |
| slug | string | yes |  |  |
| title | string \| null |  |  |  |
| type | AccountType | yes |  |  |
| creator | string | yes |  |  |
| email | string | yes |  |  |
| created | string | yes |  |  |
| modified | string \| null |  |  |  |
| avatar | string \| null |  |  |  |
| labels | AccountLabels \| null |  |  |  |
| zone_visibility | ZoneVisibility | yes |  |  |
| blocked_features | array\<BlockedFeature\> | yes |  |  |
| blocking_state | AccountBlockingState | yes |  |  |
| users | array\<stashify_idp\_\_api\_\_manage\_\_models\_\_User\> | yes |  |  |
| members | array\<string\> | yes |  |  |
| managers | array\<string\> | yes |  |  |
| stashes | AccountManagerStashes | yes |  |  |
| max_kbs | integer | yes |  |  |
| max_agents | integer | yes |  |  |
| max_memories | integer | yes |  |  |
| max_arags | integer | yes |  |  |
| arags | integer | yes |  |  |
| limits | AccountManagerLimits \| null |  |  |  |
| trial_expiration_date | string \| null |  |  |  |
| allow_access_non_enterprise_models | boolean |  | True |  |
| saml_config | SAMLConfig \| null |  |  |  |
| workflow | WorkflowMode |  | classic |  |

**AccountManagerLimits**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| upload | AccountManagerUploadLimits \| null |  |  |  |
| usage | AccountManagerUsageLimits \| null |  |  |  |

**AccountManagerPatch**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| slug | string \| null |  |  |  |
| email | string \| null |  |  |  |
| creator | string \| null |  |  |  |
| type | AccountType \| null |  |  |  |
| kbs | integer \| null |  |  |  |
| agents | integer \| null |  |  |  |
| arags | integer \| null |  |  |  |
| memories | integer \| null |  |  |  |
| data | object (free-form map) \| null |  |  |  |
| saml_config | SAMLConfig \| null |  |  |  |
| limits | AccountManagerLimits \| null |  |  |  |
| trial_expiration_date | string \| null |  |  |  |
| allow_access_non_enterprise_models | boolean \| null |  |  |  |
| workflow | WorkflowMode \| null |  |  |  |
| labels | AccountLabels \| null |  |  |  |
| zone_visibility | ZoneVisibility \| null |  |  |  |

**AccountManagerSetBlocking**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| blocking_state | AccountBlockingState | yes |  |  |
| blocked_features | array\<BlockedFeature\> \| null |  |  |  |

**AccountManagerStashes**

| **Field**   | **Type**       | **Req** | **Default** | **Description** |
|-------------|----------------|---------|-------------|-----------------|
| max_stashes | integer        | yes     |             |                 |
| items       | array\<Stash\> | yes     |             |                 |

**AccountManagerSummary**

| **Field**       | **Type**              | **Req** | **Default** | **Description** |
|-----------------|-----------------------|---------|-------------|-----------------|
| id              | string                | yes     |             |                 |
| slug            | string                | yes     |             |                 |
| title           | string \| null        |         |             |                 |
| type            | AccountType           | yes     |             |                 |
| creator         | string                | yes     |             |                 |
| email           | string                | yes     |             |                 |
| created         | string                | yes     |             |                 |
| modified        | string \| null        |         |             |                 |
| avatar          | string \| null        |         |             |                 |
| labels          | AccountLabels \| null |         |             |                 |
| zone_visibility | ZoneVisibility        | yes     |             |                 |

**AccountManagerUploadLimits**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| upload_limit_max_media_file_size | integer \| null |  |  |  |
| upload_limit_max_non_media_file_size | integer \| null |  |  |  |

**AccountManagerUsageLimits**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| monthly_limit_paragraphs_processed | integer \| null |  |  |  |
| monthly_limit_docs_no_media_processed | integer \| null |  |  |  |
| monthly_limit_media_seconds_processed | integer \| null |  |  |  |
| monthly_limit_paragraphs_stored | integer \| null |  |  |  |
| monthly_limit_hosted_searches_performed | integer \| null |  |  |  |
| monthly_limit_hosted_answers_generated | integer \| null |  |  |  |
| monthly_limit_self_hosted_searches_performed | integer \| null |  |  |  |
| monthly_limit_self_hosted_answers_generated | integer \| null |  |  |  |
| storage_limit_max_bytes_per_kb | integer \| null |  |  |  |
| storage_limit_max_resources_per_kb | integer \| null |  |  |  |

**AccountMeteredUsage**

| **Field**          | **Type**       | **Req** | **Default** | **Description** |
|--------------------|----------------|---------|-------------|-----------------|
| budget             | number \| null |         |             |                 |
| currency           | Currency       | yes     |             |                 |
| invoice_items      | InvoiceItems   | yes     |             |                 |
| start_billing_date | string         | yes     |             |                 |
| end_billing_date   | string         | yes     |             |                 |

**AccountModification**

| **Field**     | **Type**              | **Req** | **Default** | **Description** |
|---------------|-----------------------|---------|-------------|-----------------|
| title         | string \| null        |         |             |                 |
| description   | string \| null        |         |             |                 |
| saml          | OldSAMLConfig \| null |         |             |                 |
| saml_config   | SAMLConfig \| null    |         |             |                 |
| slug          | string \| null        |         |             |                 |
| workflow      | WorkflowMode \| null  |         |             |                 |
| eula_accepted | boolean \| null       |         |             |                 |

**AccountNucliaCustomerTableSubscriptionInfo**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| status | NucliaCustomerTableSubscriptionStatus | yes |  |  |
| on_demand_budget | number \| null |  |  |  |
| action_on_budget_exhausted | ActionOnBudgetExhausted \| null |  |  |  |
| free_tokens_per_billing_cycle | integer | yes |  |  |
| free_storage_nuclia_tokens | integer \| null |  |  |  |
| billing_formula_id | string | yes |  |  |
| nuclia_tokens_price | number | yes |  |  |

**AccountRole**

**Enum:** AOWNER, AMEMBER

**AccountStatus**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| blocking_state | AccountBlockingState |  | unblocked |  |
| blocked_features | array\<BlockedFeature\> |  | \[\] |  |
| requested_account_type | AccountType \| null |  |  |  |

**AccountStatusAvailable**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| available | boolean  | yes     |             |                 |

**AccountStripeCustomer**

| **Field**       | **Type**       | **Req** | **Default** | **Description** |
|-----------------|----------------|---------|-------------|-----------------|
| customer_id     | string         | yes     |             |                 |
| billing_details | BillingDetails | yes     |             |                 |

**AccountStripeSubscription**

| **Field**         | **Type**             | **Req** | **Default** | **Description** |
|-------------------|----------------------|---------|-------------|-----------------|
| subscription_id   | string               | yes     |             |                 |
| payment_method_id | string               | yes     |             |                 |
| currency          | Currency             | yes     |             |                 |
| status            | string               | yes     |             |                 |
| requires_action   | boolean              | yes     |             |                 |
| client_secret     | string \| null       |         |             |                 |
| error             | PaymentError \| null |         |             |                 |

**AccountStripeSubscriptionInfo**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| status | SubscriptionStatus | yes |  |  |
| on_demand_budget | number \| null |  |  |  |
| action_on_budget_exhausted | ActionOnBudgetExhausted \| null |  |  |  |
| billing_interval | IntervalType \| null |  | month |  |
| start_billing_period | string | yes |  |  |
| end_billing_period | string | yes |  |  |
| free_tokens_per_billing_cycle | integer | yes |  |  |
| free_storage_nuclia_tokens | integer \| null |  |  |  |
| billing_formula_id | string | yes |  |  |

**AccountSubscription**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| provider | SubscriptionProvider | yes |  |  |
| subscription | AccountStripeSubscriptionInfo \| AccountAWSMarketplaceSubscriptionInfo \| AccountNucliaCustomerTableSubscriptionInfo | yes |  |  |

**AccountType**

**Enum:** stash-trial, v3starter, v3pro, v3enterprise, cowork, v3fly,
v3growth

**AccountTypeDefaults**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| max_kbs | integer | yes |  |  |
| max_agents | integer | yes |  |  |
| max_memories | integer | yes |  |  |
| max_trial_days | integer |  | -1 |  |
| monthly_limit_paragraphs_processed | integer |  | -1 |  |
| monthly_limit_docs_no_media_processed | integer |  | -1 |  |
| monthly_limit_media_seconds_processed | integer |  | -1 |  |
| monthly_limit_paragraphs_stored | integer |  | -1 |  |
| monthly_limit_hosted_searches_performed | integer |  | -1 |  |
| monthly_limit_hosted_answers_generated | integer |  | -1 |  |
| monthly_limit_self_hosted_searches_performed | integer |  | -1 |  |
| monthly_limit_self_hosted_answers_generated | integer |  | -1 |  |
| storage_limit_max_bytes_per_kb | integer |  | -1 |  |
| storage_limit_max_resources_per_kb | integer |  | -1 |  |
| upload_limit_max_media_file_size | integer | yes |  |  |
| upload_limit_max_non_media_file_size | integer | yes |  |  |
| allow_access_non_enterprise_models | boolean |  | True |  |

**AccountUploadLimits**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| upload_limit_max_media_file_size | integer \| null |  |  |  |
| upload_limit_max_non_media_file_size | integer \| null |  |  |  |

**AccountUsageLimits**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| monthly_limit_paragraphs_processed | integer \| null |  |  |  |
| monthly_limit_docs_no_media_processed | integer \| null |  |  |  |
| monthly_limit_media_seconds_processed | integer \| null |  |  |  |
| monthly_limit_paragraphs_stored | integer \| null |  |  |  |
| monthly_limit_hosted_searches_performed | integer \| null |  |  |  |
| monthly_limit_hosted_answers_generated | integer \| null |  |  |  |
| monthly_limit_self_hosted_searches_performed | integer \| null |  |  |  |
| monthly_limit_self_hosted_answers_generated | integer \| null |  |  |  |
| storage_limit_max_bytes_per_kb | integer \| null |  |  |  |
| storage_limit_max_resources_per_kb | integer \| null |  |  |  |
| monthly_limit_non_media_files_processed | integer \| null |  |  |  |
| monthly_limit_chars_processed | integer \| null |  |  |  |

**AccountUser**

| **Field** | **Type**    | **Req** | **Default** | **Description** |
|-----------|-------------|---------|-------------|-----------------|
| id        | string      | yes     |             |                 |
| name      | string      | yes     |             |                 |
| email     | string      | yes     |             |                 |
| role      | AccountRole | yes     |             |                 |

**AccountUserCreation**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| id        | string   | yes     |             |                 |

**AccountUserPatch**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| type      | string   | yes     |             |                 |

**AccountZoneEntry**

| **Field**  | **Type** | **Req** | **Default** | **Description** |
|------------|----------|---------|-------------|-----------------|
| account_id | string   | yes     |             |                 |
| zone_id    | string   | yes     |             |                 |

**AccountZoneGrant**

| **Field**  | **Type** | **Req** | **Default** | **Description** |
|------------|----------|---------|-------------|-----------------|
| account_id | string   | yes     |             |                 |

**AccountZoneInfo**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| account_type | AccountType | yes |  |  |
| account_email | string | yes |  |  |
| account_slug | string | yes |  |  |
| account_title | string | yes |  |  |
| blocking_state | AccountBlockingState | yes |  |  |
| blocked_features | array\<BlockedFeature\> | yes |  |  |
| upload_limits | AccountUploadLimits | yes |  |  |
| allow_access_non_enterprise_models | boolean |  | True |  |

**ActionId**

**Enum:** join_account, join_kb, go_account, edit, create_template,
create, edit_template, signup_create_user

**ActionOnBudgetExhausted**

**Enum:** WARN_ACCOUNT_OWNER, BLOCK_ACCOUNT

**AddAccountUser**

| **Field** | **Type**    | **Req** | **Default** | **Description** |
|-----------|-------------|---------|-------------|-----------------|
| id        | string      | yes     |             |                 |
| role      | AccountRole | yes     |             |                 |

**Aggregation**

**Enum:** hour, day, week, month, quarter, year, millennium

**Agreement-Input**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| id | string | yes |  |  |
| status | string | yes |  |  |
| start_time | string | yes |  |  |
| expiration_date | string | yes |  |  |
| offer | Offer | yes |  |  |
| entitlement_terms | map\<string, EntitlementTerm-Input\> |  | {} |  |
| metered_terms | map\<string, MeteredTerm-Input\> |  | {} |  |

**Agreement-Output**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| id | string | yes |  |  |
| status | string | yes |  |  |
| start_time | string | yes |  |  |
| expiration_date | string | yes |  |  |
| offer | Offer | yes |  |  |
| entitlement_terms | map\<string, EntitlementTerm-Output\> |  | {} |  |
| metered_terms | map\<string, MeteredTerm-Output\> |  | {} |  |

**AWSMarketplaceCustomerData**

| **Field**           | **Type** | **Req** | **Default** | **Description** |
|---------------------|----------|---------|-------------|-----------------|
| first_name          | string   | yes     |             |                 |
| last_name           | string   | yes     |             |                 |
| owner_email_address | string   | yes     |             |                 |
| phone               | string   | yes     |             |                 |
| company             | string   | yes     |             |                 |
| country             | string   | yes     |             |                 |
| use_case            | string   | yes     |             |                 |
| organization_size   | string   | yes     |             |                 |
| role                | string   | yes     |             |                 |
| receive_updates     | boolean  | yes     |             |                 |

**AWSMarketplaceLoginRequest**

| **Field**      | **Type** | **Req** | **Default** | **Description** |
|----------------|----------|---------|-------------|-----------------|
| customer_token | string   | yes     |             |                 |

**AWSMarketplaceLoginResponse**

| **Field**     | **Type** | **Req** | **Default** | **Description** |
|---------------|----------|---------|-------------|-----------------|
| access_token  | string   | yes     |             |                 |
| refresh_token | string   | yes     |             |                 |

**AWSMarketplaceSetupAccountResponse**

| **Field**     | **Type** | **Req** | **Default** | **Description** |
|---------------|----------|---------|-------------|-----------------|
| account_id    | string   | yes     |             |                 |
| access_token  | string   | yes     |             |                 |
| refresh_token | string   | yes     |             |                 |

**AWSMarketplaceSetupRequest**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| customer_token | string | yes |  |  |
| account_slug | string \| null |  |  |  |
| customer_data | AWSMarketplaceCustomerData \| null |  |  |  |

**AWSMarketplaceSubscriptionStatus**

**Enum:** no_subscription, active, failed, cancel_scheduled, canceled

**BatchUpdateAccountUsers**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| add | array\<AddAccountUser\> \| null |  |  |  |
| delete | array\<string\> \| null |  |  |  |

**BillCurrentPeriodResponse**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| budget | number \| null |  |  |  |
| nuclia_tokens | number | yes |  |  |
| start_billing_date | string | yes |  |  |
| end_billing_date | string | yes |  |  |
| free_storage_nuclia_tokens | number \| null | yes |  |  |
| free_tokens_per_billing_cycle | integer | yes |  |  |
| nuclia_tokens_price | number \| null | yes |  |  |

**BillingDetails**

| **Field**   | **Type**       | **Req** | **Default** | **Description** |
|-------------|----------------|---------|-------------|-----------------|
| name        | string         | yes     |             |                 |
| email       | string         | yes     |             |                 |
| address     | string         | yes     |             |                 |
| country     | Country        | yes     |             |                 |
| state       | string \| null |         |             |                 |
| city        | string         | yes     |             |                 |
| postal_code | string         | yes     |             |                 |
| phone       | string         | yes     |             |                 |
| is_company  | boolean        | yes     |             |                 |
| company     | string \| null |         |             |                 |
| vat         | string \| null |         |             |                 |

**BillingDetailsModified**

| **Field**   | **Type**        | **Req** | **Default** | **Description** |
|-------------|-----------------|---------|-------------|-----------------|
| name        | string \| null  |         |             |                 |
| email       | string \| null  |         |             |                 |
| address     | string \| null  |         |             |                 |
| state       | string \| null  |         |             |                 |
| city        | string \| null  |         |             |                 |
| postal_code | string \| null  |         |             |                 |
| phone       | string \| null  |         |             |                 |
| is_company  | boolean \| null |         |             |                 |
| company     | string \| null  |         |             |                 |
| vat         | string \| null  |         |             |                 |

**BillingFormulaCreate**

| **Field**        | **Type**        | **Req** | **Default** | **Description** |
|------------------|-----------------|---------|-------------|-----------------|
| title            | string          | yes     |             |                 |
| description      | string \| null  |         |             |                 |
| formula          | array\<string\> |         | \[\]        |                 |
| absolute_formula | array\<string\> |         | \[\]        |                 |

**BillingFormulaResponse**

| **Field**        | **Type**        | **Req** | **Default** | **Description** |
|------------------|-----------------|---------|-------------|-----------------|
| id               | string          | yes     |             |                 |
| created          | string          | yes     |             |                 |
| title            | string          | yes     |             |                 |
| description      | string          | yes     |             |                 |
| formula          | array\<string\> | yes     |             |                 |
| absolute_formula | array\<string\> | yes     |             |                 |

**BlockedFeature**

**Enum:** upload, processing, search, generative, training,
public_upload, public_processing, public_search, public_generative

**Body_acs_api_auth_saml_acs_post**

| **Field**    | **Type** | **Req** | **Default** | **Description** |
|--------------|----------|---------|-------------|-----------------|
| SAMLResponse | string   | yes     |             |                 |
| RelayState   | string   | yes     |             |                 |

**Body_aws_marketplace_fulfillment_callback_api_marketplace_aws_callback_post**

| **Field**                | **Type** | **Req** | **Default** | **Description** |
|--------------------------|----------|---------|-------------|-----------------|
| x-amzn-marketplace-token | string   | yes     |             |                 |

**Body_oauth_login_api_auth_oauth_login_post**

| **Field**       | **Type**       | **Req** | **Default** | **Description** |
|-----------------|----------------|---------|-------------|-----------------|
| login_challenge | string         | yes     |             |                 |
| username        | string \| null |         |             |                 |
| password        | string \| null |         |             |                 |

**Body_signup_start_api_auth_signup_start_post**

| **Field** | **Type**             | **Req** | **Default** | **Description** |
|-----------|----------------------|---------|-------------|-----------------|
| email     | string               | yes     |             |                 |
| app       | string               | yes     |             |                 |
| fullname  | string \| null       |         |             |                 |
| company   | string \| null       |         |             |                 |
| workflow  | WorkflowMode \| null |         |             |                 |

**Body_submit_consent_api_auth_oauth_consent_post**

| **Field**         | **Type**        | **Req** | **Default** | **Description** |
|-------------------|-----------------|---------|-------------|-----------------|
| consent_challenge | string          | yes     |             |                 |
| grant_scope       | array\<string\> |         | \[\]        |                 |
| reject            | boolean         |         | False       |                 |

**Body_upload_account_logo_api_v1_account\_\_account_slug\_\_logo_png_patch**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| file      | string   | yes     |             |                 |

**CalculatorConfig**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| version | string | yes |  |  |
| models | map\<string, RawFactor \| ModelFactor\> | yes |  |  |
| storage | map\<string, RawFactor\> | yes |  |  |

**CancelStripeSubscription**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| feedback | StripeSubscriptionCancellationFeedback \| null |  |  |  |
| comment | string \| null |  |  |  |

**CloudProvider**

**Enum:** AWS, GCP, ON_PREMISES

**CloudZeroCustomerData**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| account_id | string | yes |  |  |
| created | string \| null |  |  |  |
| modified | string \| null |  |  |  |
| billing_formula_id | string |  | 00000000-0000-4000-8000-000000000001 |  |
| free_storage_nuclia_tokens | integer \| null |  |  |  |
| free_tokens_per_billing_cycle | integer |  | 0 |  |
| nuclia_tokens_price | number | yes |  |  |
| action_on_budget_exhausted | ActionOnBudgetExhausted \| null |  |  |  |
| on_demand_budget | number \| null |  |  |  |
| billing_history | object (free-form map) |  |  |  |
| last_notifications | LastNotifications |  |  |  |
| product | string | yes |  |  |
| product_line | string | yes |  |  |
| business_unit | string | yes |  |  |

**CloudZeroSubscriptionCreate**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| nuclia_tokens_price | number | yes |  |  |
| billing_formula_id | string |  | 00000000-0000-4000-8000-000000000002 |  |
| free_storage_nuclia_tokens | integer |  | 0 |  |
| free_tokens_per_billing_cycle | integer |  | 0 |  |
| on_demand_budget | number \| null |  |  |  |
| action_on_budget_exhausted | ActionOnBudgetExhausted \| null |  |  |  |
| product | string | yes |  |  |
| product_line | string | yes |  |  |
| business_unit | string | yes |  |  |

**CloudZeroSubscriptionUpdate**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| billing_formula_id | string \| null |  |  |  |
| nuclia_tokens_price | number \| null |  |  |  |
| free_storage_nuclia_tokens | integer \| null |  |  |  |
| free_tokens_per_billing_cycle | integer \| null |  |  |  |
| on_demand_budget | number \| null |  |  |  |
| action_on_budget_exhausted | ActionOnBudgetExhausted \| null |  |  |  |

**Country**

**Enum:** AF, AX, AL, DZ, AD, AO, AI, AQ, AG, AR, AM, AW, AC, AU, AT,
AZ, BS, BH, BD, BB, BY, BE, BZ, BJ, BM, BT, BO, BA, BW, BV, BR, IO, VG,
BN, BG, BF, BI, KH, CM, CA, CV, BQ, KY, CF, TD, CL, CN, CO, KM, CG, CD,
CK, CR, CI, HR, CW, CY, CZ, DK, DJ, DM, DO, EC, EG, SV, GQ, ER, EE, SZ,
ET, FK, FO, FJ, FI, FR, GF, PF, TF, GA, GM, GE, DE, GH, GI, GR, GL, GD,
GP, GU, GT, GG, GN, GW, GY, HT, HN, HK, HU, IS, IN, ID, IQ, IE, IM, IL,
IT, JM, JP, JE, JO, KZ, KE, KI, XK, KW, KG, LA, LV, LB, LS, LR, LY, LI,
LT, LU, MO, MG, MW, MY, MV, ML, MT, MQ, MR, MU, YT, MX, MD, MC, MN, ME,
MS, MA, MZ, MM, NA, NR, NP, NL, NC, NZ, NI, NE, NG, NU, MK, NO, OM, PK,
PS, PA, PG, PY, PE, PH, PN, PL, PT, PR, QA, RE, RO, RU, RW, WS, SM, ST,
SA, SN, RS, SC, SL, SG, SX, SK, SI, SB, SO, ZA, GS, KR, SS, ES, LK, BL,
SH, KN, LC, MF, PM, VC, SR, SJ, SE, CH, TW, TJ, TZ, TH, TL, TG, TK, TO,
TT, TA, TN, TR, TM, TC, TV, UG, UA, AE, GB, US, UY, UZ, VU, VA, VE, VN,
WF, EH, YE, ZM, ZW

**CountryCurrency**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| currency  | Currency | yes     |             |                 |

**CreatePaymentMethod**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| token     | string   | yes     |             |                 |

**CreateStripeCustomer**

| **Field**       | **Type**       | **Req** | **Default** | **Description** |
|-----------------|----------------|---------|-------------|-----------------|
| billing_details | BillingDetails | yes     |             |                 |

**CreateStripePaymentLink**

| **Field**             | **Type**        | **Req** | **Default** | **Description** |
|-----------------------|-----------------|---------|-------------|-----------------|
| account_id            | string          | yes     |             |                 |
| account_type          | AccountType     | yes     |             |                 |
| price_ids             | array\<string\> | yes     |             |                 |
| billing_formula_id    | string          | yes     |             |                 |
| allow_promotion_codes | boolean         |         | False       |                 |
| currency              | Currency        |         | usd         |                 |

**CreateStripeSubscription**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| payment_method_id | string | yes |  |  |
| on_demand_budget | number \| null |  |  |  |
| action_on_budget_exhausted | ActionOnBudgetExhausted \| null |  |  |  |
| billing_interval | IntervalType \| null |  | month |  |
| account_type | AccountType | yes |  |  |

**CreateTokenRequest**

| **Field**       | **Type**       | **Req** | **Default** | **Description** |
|-----------------|----------------|---------|-------------|-----------------|
| description     | string         | yes     |             |                 |
| expiration_date | string \| null |         |             |                 |

**Currency**

**Enum:** eur, usd

**EntitlementTerm-Input**

| **Field** | **Type**                 | **Req** | **Default** | **Description** |
|-----------|--------------------------|---------|-------------|-----------------|
| price     | number \| string \| null |         |             |                 |
| duration  | string                   | yes     |             |                 |
| trial     | boolean                  |         | False       |                 |

**EntitlementTerm-Output**

| **Field** | **Type**       | **Req** | **Default** | **Description** |
|-----------|----------------|---------|-------------|-----------------|
| price     | string \| null |         |             |                 |
| duration  | string         | yes     |             |                 |
| trial     | boolean        |         | False       |                 |

**FlatIdentifier**

| **Field** | **Type**       | **Req** | **Default** | **Description** |
|-----------|----------------|---------|-------------|-----------------|
| type      | string         | yes     |             |                 |
| service   | string         | yes     |             |                 |
| model     | string \| null |         |             |                 |
| version   | string         | yes     |             |                 |

**GlobalAccountUser**

| **Field**    | **Type**            | **Req** | **Default** | **Description** |
|--------------|---------------------|---------|-------------|-----------------|
| user_id      | string              | yes     |             |                 |
| email        | string \| null      |         |             |                 |
| account_role | AccountRole \| null |         |             |                 |
| account_slug | string \| null      |         |             |                 |
| name         | string \| null      |         |             |                 |

**GlobalMagicToken**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| token     | string   | yes     |             |                 |

**HTTPValidationError**

| **Field** | **Type**                 | **Req** | **Default** | **Description** |
|-----------|--------------------------|---------|-------------|-----------------|
| detail    | array\<ValidationError\> |         |             |                 |

**IntervalType**

**Enum:** month, year

**InvitedUser**

| **Field** | **Type**    | **Req** | **Default** | **Description** |
|-----------|-------------|---------|-------------|-----------------|
| email     | string      | yes     |             |                 |
| role      | AccountRole | yes     |             |                 |
| expires   | string      | yes     |             |                 |

**InvitePayload**

| **Field** | **Type**       | **Req** | **Default** | **Description** |
|-----------|----------------|---------|-------------|-----------------|
| email     | string         | yes     |             |                 |
| role      | AccountRole    |         | AMEMBER     |                 |
| came_from | string \| null |         |             |                 |

**InvoiceItems**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| media | nuclia_accounting\_\_models\_\_models\_\_InvoiceItem \| null |  |  |  |
| training | nuclia_accounting\_\_models\_\_models\_\_InvoiceItem \| null |  |  |  |
| paragraphs_processed | nuclia_accounting\_\_models\_\_models\_\_InvoiceItem \| null |  |  |  |
| predict | nuclia_accounting\_\_models\_\_models\_\_InvoiceItem \| null |  |  |  |
| generative | nuclia_accounting\_\_models\_\_models\_\_InvoiceItem \| null |  |  |  |
| searches | nuclia_accounting\_\_models\_\_models\_\_InvoiceItem \| null |  |  |  |
| paragraphs | nuclia_accounting\_\_models\_\_models\_\_InvoiceItem \| null |  |  |  |
| ai-tokens-used | nuclia_accounting\_\_models\_\_models\_\_InvoiceItem \| null |  |  |  |
| nuclia-tokens | nuclia_accounting\_\_models\_\_models\_\_InvoiceItem \| null |  |  |  |
| qa | nuclia_accounting\_\_models\_\_models\_\_InvoiceItem \| null |  |  |  |
| self-hosted-qa | nuclia_accounting\_\_models\_\_models\_\_InvoiceItem \| null |  |  |  |
| self-hosted-predict | nuclia_accounting\_\_models\_\_models\_\_InvoiceItem \| null |  |  |  |
| self-hosted-processed-paragraphs | nuclia_accounting\_\_models\_\_models\_\_InvoiceItem \| null |  |  |  |
| self-hosted-processed-documents | nuclia_accounting\_\_models\_\_models\_\_InvoiceItem \| null |  |  |  |

**InvoicesList**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| items | array\<nuclia_accounting\_\_api\_\_models\_\_InvoiceItem\> | yes |  |  |
| pagination | InvoicesListPagination | yes |  |  |

**InvoicesListPagination**

| **Field**      | **Type**        | **Req** | **Default** | **Description** |
|----------------|-----------------|---------|-------------|-----------------|
| starting_after | string \| null  |         |             |                 |
| limit          | integer \| null |         |             |                 |
| has_more       | boolean         | yes     |             |                 |

**ItemCreated**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| id        | string   | yes     |             |                 |

**KBMode**

Knowledge Box modes define the architecture and components of a KB. -
kb: KB in idp_regional + NucliaDB KB (same ID), no agent - agent: KB in
idp_regional + NucliaDB KB (same ID) + Agent with memory (agent_id =
kb_id) - agent_no_memory: KB in idp_regional + Agent without memory
(agent_id = kb_id), n…

**Enum:** kb, agent, agent_no_memory

**KbState**

**Enum:** PUBLISHED, PRIVATE

**KbUsageDashboard**

| **Field** | **Type**        | **Req** | **Default** | **Description** |
|-----------|-----------------|---------|-------------|-----------------|
| timestamp | string          | yes     |             |                 |
| metrics   | array\<Metric\> | yes     |             |                 |

**KnowledgeBoxIndex**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| kb_id | string | yes |  |  |
| account_id | string | yes |  |  |
| zone_id | string | yes |  |  |
| kb_mode | KBMode | yes |  | Knowledge Box modes define the architecture and components of a KB. - kb: KB in idpregional + NucliaDB KB (same ID), no agent - agent: KB in idpregional + NucliaDB KB (same ID) + Agent with memory (ag… |

**KnowledgeBoxIndexCreationPayload**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| kb_id | string | yes |  |  |
| account_id | string | yes |  |  |
| kb_mode | KBMode | yes |  | Knowledge Box modes define the architecture and components of a KB. - kb: KB in idpregional + NucliaDB KB (same ID), no agent - agent: KB in idpregional + NucliaDB KB (same ID) + Agent with memory (ag… |

**Languages**

**Enum:** CA, ES, EN, FR, DE, PT

**LastNotifications**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| notified_approaching_budget | string \| null |  |  |  |
| notified_budget_exhausted | string \| null |  |  |  |

**LoginPayload**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| username  | string   | yes     |             |                 |
| password  | string   | yes     |             |                 |

**LoginProvider**

**Enum:** GOOGLE, APPLE, LOCAL, SAML, GITHUB, AWS_MARKETPLACE, MICROSOFT

**ManageAccountCreation**

| **Field**       | **Type**               | **Req** | **Default** | **Description** |
|-----------------|------------------------|---------|-------------|-----------------|
| slug            | string                 | yes     |             |                 |
| title           | string                 | yes     |             |                 |
| description     | string \| null         |         |             |                 |
| email           | string                 | yes     |             |                 |
| zone            | string \| null         |         |             |                 |
| workflow        | WorkflowMode           |         | classic     |                 |
| eula_accepted   | boolean                |         | False       |                 |
| type            | AccountType            | yes     |             |                 |
| zone_visibility | ZoneVisibility \| null |         |             |                 |

**ManageUser**

| **Field**  | **Type**               | **Req** | **Default** | **Description** |
|------------|------------------------|---------|-------------|-----------------|
| id         | string                 | yes     |             |                 |
| name       | string \| null         |         |             |                 |
| email      | string                 | yes     |             |                 |
| language   | string \| null         |         |             |                 |
| type       | UserType               | yes     |             |                 |
| providers  | array\<LoginProvider\> |         | \[\]        |                 |
| data       | object                 | yes     |             |                 |
| last_login | string \| null         |         |             |                 |

**ManageUserPatch**

| **Field** | **Type**          | **Req** | **Default** | **Description** |
|-----------|-------------------|---------|-------------|-----------------|
| type      | UserType \| null  |         |             |                 |
| email     | string \| null    |         |             |                 |
| name      | string \| null    |         |             |                 |
| language  | Languages \| null |         |             |                 |

**ManageZone**

| **Field**      | **Type**       | **Req** | **Default** | **Description** |
|----------------|----------------|---------|-------------|-----------------|
| id             | string         | yes     |             |                 |
| slug           | string         | yes     |             |                 |
| title          | string \| null |         |             |                 |
| creator        | string \| null |         |             |                 |
| account        | string \| null |         |             |                 |
| created        | string \| null |         |             |                 |
| modified       | string \| null |         |             |                 |
| cloud_provider | CloudProvider  | yes     |             |                 |
| private        | boolean        | yes     |             |                 |
| origin         | string \| null |         |             |                 |

**ManageZoneAdd**

| **Field**      | **Type**       | **Req** | **Default** | **Description** |
|----------------|----------------|---------|-------------|-----------------|
| slug           | string         | yes     |             |                 |
| title          | string         | yes     |             |                 |
| creator        | string         | yes     |             |                 |
| cloud_provider | CloudProvider  | yes     |             |                 |
| private        | boolean        |         | False       |                 |
| origin         | string \| null |         |             |                 |

**ManageZoneCreated**

| **Field**      | **Type**       | **Req** | **Default** | **Description** |
|----------------|----------------|---------|-------------|-----------------|
| id             | string         | yes     |             |                 |
| slug           | string         | yes     |             |                 |
| title          | string \| null |         |             |                 |
| creator        | string \| null |         |             |                 |
| account        | string \| null |         |             |                 |
| created        | string \| null |         |             |                 |
| modified       | string \| null |         |             |                 |
| cloud_provider | CloudProvider  | yes     |             |                 |
| private        | boolean        | yes     |             |                 |
| origin         | string \| null |         |             |                 |
| token          | string         | yes     |             |                 |

**ManageZonePatch**

| **Field**      | **Type**              | **Req** | **Default** | **Description** |
|----------------|-----------------------|---------|-------------|-----------------|
| slug           | string \| null        |         |             |                 |
| title          | string \| null        |         |             |                 |
| cloud_provider | CloudProvider \| null |         |             |                 |
| private        | boolean \| null       |         |             |                 |
| origin         | string \| null        |         |             |                 |

**ManageZoneSessionToken**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| token     | string   | yes     |             |                 |

**ManualAgreementRequest**

Request body for setting manual agreement data for CPPO customers.

| **Field** | **Type**        | **Req** | **Default** | **Description** |
|-----------|-----------------|---------|-------------|-----------------|
| agreement | Agreement-Input | yes     |             |                 |

**ManualSubscriptionCreate**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| nuclia_tokens_price | number | yes |  |  |
| billing_formula_id | string |  | 00000000-0000-4000-8000-000000000001 |  |
| free_storage_nuclia_tokens | integer |  | 0 |  |
| free_tokens_per_billing_cycle | integer |  | 0 |  |
| on_demand_budget | number \| null |  |  |  |
| action_on_budget_exhausted | ActionOnBudgetExhausted \| null |  |  |  |

**ManualSubscriptionUpdate**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| billing_formula_id | string \| null |  |  |  |
| nuclia_tokens_price | number \| null |  |  |  |
| free_storage_nuclia_tokens | integer \| null |  |  |  |
| free_tokens_per_billing_cycle | integer \| null |  |  |  |
| on_demand_budget | number \| null |  |  |  |
| action_on_budget_exhausted | ActionOnBudgetExhausted \| null |  |  |  |

**MarketplaceSubscriptionState**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| account_type | AccountType | yes |  |  |
| is_trial | boolean | yes |  |  |
| trial_expiration_date | string \| null |  |  |  |
| active | boolean |  | True |  |
| blocking_state | AccountBlockingState \| null |  |  |  |

**MarketplaceSubscriptionUpdateAction**

**Enum:** change_account_type, remove_trial, unblock_account,
activate_subscription, deactivate_subscription, block_account_canceled

**MeteredTerm-Input**

| **Field** | **Type**         | **Req** | **Default** | **Description** |
|-----------|------------------|---------|-------------|-----------------|
| price     | number \| string | yes     |             |                 |

**MeteredTerm-Output**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| price     | string   | yes     |             |                 |

**Metric**

| **Field** | **Type**                    | **Req** | **Default** | **Description** |
|-----------|-----------------------------|---------|-------------|-----------------|
| name      | MetricNames                 | yes     |             |                 |
| value     | number                      | yes     |             |                 |
| details   | array\<NucliaTokenDetails\> |         | \[\]        |                 |

**MetricNames**

**Enum:** pre_processing_time, slow_processing_time,
resources_processed, bytes_processed, chars_processed,
media_seconds_processed, pages_processed, paragraphs_processed,
searches_performed, suggestions_performed, predictions_performed,
docs_no_media, ai_tokens_used, nuclia_tokens, nuclia_tokens_billed

**ModelFactor**

| **Field** | **Type**       | **Req** | **Default** | **Description** |
|-----------|----------------|---------|-------------|-----------------|
| input     | number \| null |         |             |                 |
| output    | number \| null |         |             |                 |
| image     | number \| null |         |             |                 |
| model     | string         | yes     |             |                 |

**NuaKeyIndexCreationPayload**

| **Field**    | **Type**        | **Req** | **Default** | **Description** |
|--------------|-----------------|---------|-------------|-----------------|
| client_id    | string          | yes     |             |                 |
| account_id   | string          | yes     |             |                 |
| internal_id  | string          | yes     |             |                 |
| tokens_limit | integer \| null |         |             |                 |

**NuaKeyIndexUpdatePayload**

| **Field**    | **Type**        | **Req** | **Default** | **Description** |
|--------------|-----------------|---------|-------------|-----------------|
| tokens_limit | integer \| null |         |             |                 |

**NuaKeyInfoResponse**

| **Field**    | **Type**        | **Req** | **Default** | **Description** |
|--------------|-----------------|---------|-------------|-----------------|
| blocked      | integer         |         | 0           |                 |
| tokens_limit | integer \| null |         |             |                 |

**nuclia_accounting\_\_api\_\_models\_\_InvoiceItem**

| **Field**    | **Type**    | **Req** | **Default** | **Description** |
|--------------|-------------|---------|-------------|-----------------|
| id           | string      | yes     |             |                 |
| period_start | string      | yes     |             |                 |
| period_end   | string      | yes     |             |                 |
| order_number | string      | yes     |             |                 |
| account_type | AccountType | yes     |             |                 |
| amount       | number      | yes     |             |                 |
| pdf          | string      | yes     |             |                 |

**nuclia_accounting\_\_models\_\_models\_\_InvoiceItem**

| **Field**     | **Type** | **Req** | **Default** | **Description** |
|---------------|----------|---------|-------------|-----------------|
| threshold     | integer  | yes     |             |                 |
| current_usage | integer  | yes     |             |                 |
| price         | number   | yes     |             |                 |
| over_usage    | integer  | yes     |             |                 |
| over_cost     | number   | yes     |             |                 |

**NucliaCustomerData**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| account_id | string | yes |  |  |
| created | string \| null |  |  |  |
| modified | string \| null |  |  |  |
| billing_formula_id | string |  | 00000000-0000-4000-8000-000000000001 |  |
| free_storage_nuclia_tokens | integer \| null |  |  |  |
| free_tokens_per_billing_cycle | integer |  | 0 |  |
| nuclia_tokens_price | number | yes |  |  |
| action_on_budget_exhausted | ActionOnBudgetExhausted \| null |  |  |  |
| on_demand_budget | number \| null |  |  |  |
| billing_history | object (free-form map) |  |  |  |
| last_notifications | LastNotifications |  |  |  |

**NucliaCustomerTableSubscriptionStatus**

**Enum:** active

**NucliaTokenDetails**

| **Field**            | **Type**       | **Req** | **Default** | **Description** |
|----------------------|----------------|---------|-------------|-----------------|
| identifier           | FlatIdentifier | yes     |             |                 |
| nuclia_tokens        | Tokens         | yes     |             |                 |
| nuclia_tokens_billed | Tokens         | yes     |             |                 |
| raw_usage            | Tokens         | yes     |             |                 |
| requests             | Requests       | yes     |             |                 |

**OAuthTokens**

| **Field**     | **Type** | **Req** | **Default** | **Description** |
|---------------|----------|---------|-------------|-----------------|
| access_token  | string   | yes     |             |                 |
| refresh_token | string   | yes     |             |                 |

**Offer**

| **Field**      | **Type**       | **Req** | **Default** | **Description** |
|----------------|----------------|---------|-------------|-----------------|
| id             | string         | yes     |             |                 |
| name           | string         | yes     |             |                 |
| is_trial       | boolean        |         | False       |                 |
| trial_duration | string \| null |         |             |                 |

**OldSAMLConfig**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| domain    | string   | yes     |             |                 |
| sso_url   | string   | yes     |             |                 |
| entity_id | string   | yes     |             |                 |
| x509_cert | string   | yes     |             |                 |

**PATTokenMetadataUpdate**

| **Field** | **Type**       | **Req** | **Default** | **Description** |
|-----------|----------------|---------|-------------|-----------------|
| token_jti | string         | yes     |             |                 |
| issuer    | string \| null |         |             |                 |
| seen_at   | string         | yes     |             |                 |

**PaymentError**

| **Field**    | **Type** | **Req** | **Default** | **Description** |
|--------------|----------|---------|-------------|-----------------|
| code         | string   | yes     |             |                 |
| decline_code | string   | yes     |             |                 |

**PaymentMethod**

| **Field**           | **Type** | **Req** | **Default** | **Description** |
|---------------------|----------|---------|-------------|-----------------|
| payment_method_id   | string   | yes     |             |                 |
| payment_method_type | string   | yes     |             |                 |

**RawFactor**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| factor    | number   | yes     |             |                 |
| source    | string   | yes     |             |                 |

**RecoverPayload**

| **Field**           | **Type**       | **Req** | **Default** | **Description** |
|---------------------|----------------|---------|-------------|-----------------|
| username            | string         | yes     |             |                 |
| app                 | string \| null |         |             |                 |
| login_challenge     | string \| null |         |             |                 |
| initial_setpassword | boolean        |         | False       |                 |

**RefreshRequest**

| **Field**     | **Type** | **Req** | **Default** | **Description** |
|---------------|----------|---------|-------------|-----------------|
| refresh_token | string   | yes     |             |                 |

**RequestGlobalMagicToken**

| **Field**  | **Type**       | **Req** | **Default** | **Description** |
|------------|----------------|---------|-------------|-----------------|
| action_id  | ActionId       | yes     |             |                 |
| token      | string \| null |         |             |                 |
| email      | string \| null |         |             |                 |
| account_id | string \| null |         |             |                 |
| came_from  | string \| null |         |             |                 |

**Requests**

| **Field**        | **Type**       | **Req** | **Default** | **Description** |
|------------------|----------------|---------|-------------|-----------------|
| api              | number \| null |         |             |                 |
| web              | number \| null |         |             |                 |
| widget           | number \| null |         |             |                 |
| desktop          | number \| null |         |             |                 |
| dashboard        | number \| null |         |             |                 |
| chrome_extension | number \| null |         |             |                 |
| internal         | number \| null |         |             |                 |

**ResetPayload**

| **Field**       | **Type**       | **Req** | **Default** | **Description** |
|-----------------|----------------|---------|-------------|-----------------|
| password        | string         | yes     |             |                 |
| token           | string         | yes     |             |                 |
| login_challenge | string \| null |         |             |                 |

**SAMLConfig**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| domains | array\<string\> | yes |  |  |
| sso_url | string | yes |  |  |
| entity_id | string | yes |  |  |
| x509_cert | string | yes |  |  |
| authn_context | enum\[exact, minimum, better, maximum\] \| null |  |  |  |

**SetPasswordPayload**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| password  | string   | yes     |             |                 |

**SetupUserPayload**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| token     | string   | yes     |             |                 |
| password  | string   | yes     |             |                 |
| name      | string   | yes     |             |                 |

**SignupAction**

**Enum:** check-mail, user-exists

**SignupRequest**

| **Field**       | **Type** | **Req** | **Default** | **Description** |
|-----------------|----------|---------|-------------|-----------------|
| password        | string   | yes     |             |                 |
| login_challenge | string   | yes     |             |                 |

**SignupResponse**

| **Field** | **Type**     | **Req** | **Default** | **Description** |
|-----------|--------------|---------|-------------|-----------------|
| action    | SignupAction | yes     |             |                 |

**SocialLoginAuthorizationRequest**

| **Field**       | **Type**       | **Req** | **Default** | **Description** |
|-----------------|----------------|---------|-------------|-----------------|
| code            | string         | yes     |             |                 |
| login_challenge | string \| null |         |             |                 |

**Stash**

| **Field**   | **Type**                 | **Req** | **Default** | **Description** |
|-------------|--------------------------|---------|-------------|-----------------|
| id          | string                   | yes     |             |                 |
| slug        | string                   | yes     |             |                 |
| title       | string \| null           |         |             |                 |
| description | string \| null           |         |             |                 |
| avatar      | string \| null           |         |             |                 |
| creator     | string                   | yes     |             |                 |
| state       | KbState                  | yes     |             |                 |
| account     | string                   | yes     |             |                 |
| zone        | string                   | yes     |             |                 |
| created     | string                   | yes     |             |                 |
| modified    | string \| null           |         |             |                 |
| data        | StashPreferences \| null |         |             |                 |

**stashify_idp\_\_api\_\_manage\_\_models\_\_User**

| **Field**     | **Type**                | **Req** | **Default** | **Description** |
|---------------|-------------------------|---------|-------------|-----------------|
| id            | string \| null          |         |             |                 |
| last_login    | string \| null          |         |             |                 |
| last_login_ip | string \| null          |         |             |                 |
| avatar        | string \| null          |         |             |                 |
| email         | string                  | yes     |             |                 |
| name          | string \| null          |         |             |                 |
| type          | UserType                | yes     |             |                 |
| language      | Languages \| null       |         |             |                 |
| created       | string \| null          |         |             |                 |
| modified      | string \| null          |         |             |                 |
| data          | UserPreferences \| null |         |             |                 |

**stashify_idp\_\_api\_\_models\_\_User**

| **Field**  | **Type**          | **Req** | **Default** | **Description** |
|------------|-------------------|---------|-------------|-----------------|
| id         | string            | yes     |             |                 |
| name       | string            | yes     |             |                 |
| email      | string            | yes     |             |                 |
| language   | Languages \| null |         |             |                 |
| type       | UserType          | yes     |             |                 |
| last_login | string \| null    |         |             |                 |
| avatar     | string \| null    |         |             |                 |

**StashPreferences**

**Type:** object

**StripeCharge**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| id | string | yes |  |  |
| object | string | yes |  |  |
| customer | string | yes |  |  |
| status | StripeChargeStatus | yes |  |  |
| amount | integer | yes |  |  |
| currency | string | yes |  |  |
| description | string | yes |  |  |
| invoice | string | yes |  |  |
| failure_code | string \| null |  |  |  |
| failure_message | string \| null |  |  |  |
| paid | boolean | yes |  |  |
| created | integer | yes |  |  |
| outcome | StripeChargeOutcome \| null |  |  |  |
| metadata | object (free-form map) |  | {} |  |

**StripeChargeOutcome**

| **Field**      | **Type**        | **Req** | **Default** | **Description** |
|----------------|-----------------|---------|-------------|-----------------|
| network_status | string \| null  |         |             |                 |
| reason         | string \| null  |         |             |                 |
| risk_level     | string \| null  |         |             |                 |
| risk_score     | integer \| null |         |             |                 |
| rule           | string \| null  |         |             |                 |
| seller_message | string \| null  |         |             |                 |
| type           | string \| null  |         |             |                 |

**StripeChargesList**

| **Field** | **Type**              | **Req** | **Default** | **Description** |
|-----------|-----------------------|---------|-------------|-----------------|
| object    | string                | yes     |             |                 |
| data      | array\<StripeCharge\> | yes     |             |                 |

**StripeChargeStatus**

**Enum:** succeeded, pending, failed

**StripeCheckoutSession**

| **Field**    | **Type**       | **Req** | **Default** | **Description** |
|--------------|----------------|---------|-------------|-----------------|
| id           | string         | yes     |             |                 |
| object       | string         | yes     |             |                 |
| customer     | string         | yes     |             |                 |
| payment_link | string \| null | yes     |             |                 |
| subscription | string         | yes     |             |                 |
| mode         | string         | yes     |             |                 |
| status       | string         | yes     |             |                 |

**StripeEvent**

| **Field** | **Type**     | **Req** | **Default** | **Description** |
|-----------|--------------|---------|-------------|-----------------|
| object    | string       | yes     |             |                 |
| data      | StripeObject | yes     |             |                 |
| type      | string       | yes     |             |                 |

**StripeObject**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| object | StripeSubscription \| StripePaymentIntent \| StripeCheckoutSession | yes |  |  |
| previous_attributes | object (free-form map) |  | {} |  |

**StripePaymentIntent**

| **Field**   | **Type**                  | **Req** | **Default** | **Description** |
|-------------|---------------------------|---------|-------------|-----------------|
| id          | string                    | yes     |             |                 |
| object      | string                    | yes     |             |                 |
| customer    | string                    | yes     |             |                 |
| status      | StripePaymentIntentStatus | yes     |             |                 |
| amount      | integer                   | yes     |             |                 |
| currency    | string                    | yes     |             |                 |
| description | string                    | yes     |             |                 |
| charges     | StripeChargesList \| null |         |             |                 |
| metadata    | object (free-form map)    |         | {}          |                 |

**StripePaymentIntentStatus**

**Enum:** requires_payment_method, requires_confirmation,
requires_action, processing, requires_capture, canceled, succeeded

**StripePaymentLinkInfo**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| id        | string   | yes     |             |                 |
| url       | string   | yes     |             |                 |

**StripePriceInfo**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| id        | string   | yes     |             |                 |
| nickname  | string   | yes     |             |                 |
| product   | string   | yes     |             |                 |

**StripePublicKey**

| **Field**  | **Type** | **Req** | **Default** | **Description** |
|------------|----------|---------|-------------|-----------------|
| public_key | string   | yes     |             |                 |

**StripeSubscription**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| id | string | yes |  |  |
| object | string | yes |  |  |
| billing_cycle_anchor | integer | yes |  |  |
| customer | string | yes |  |  |
| default_payment_method | string \| null |  |  |  |
| status | StripeSubscriptionStatus | yes |  |  |
| items | StripeSubscriptionItemsList | yes |  |  |
| metadata | object (free-form map) |  | {} |  |

**StripeSubscriptionCancellationFeedback**

**Enum:** too_expensive, missing_features, switched_service, unused,
customer_service, too_complex, low_quality, other

**StripeSubscriptionItemsList**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| object | string | yes |  |  |
| data | array\<object (free-form map)\> | yes |  |  |

**StripeSubscriptionStatus**

**Enum:** incomplete, incomplete_expired, trialing, active, past_due,
canceled, unpaid

**StripeUsageType**

**Enum:** metered, licensed

**SubscriptionProvider**

**Enum:** NO_SUBSCRIPTION, STRIPE, AWS_MARKETPLACE, MANUAL, CLOUD_ZERO

**SubscriptionStatus**

**Enum:** no_subscription, pending, active, payment_issues,
cancel_scheduled, canceled

**SubscriptionSyncExecutionResponse**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| previous_state | MarketplaceSubscriptionState | yes |  |  |
| current_state | MarketplaceSubscriptionState | yes |  |  |
| actions | array\<MarketplaceSubscriptionUpdateAction\> | yes |  |  |

**SubscriptionSyncStateResponse**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| current_state | MarketplaceSubscriptionState | yes |  |  |
| desired_state | MarketplaceSubscriptionState | yes |  |  |
| actions | array\<MarketplaceSubscriptionUpdateAction\> | yes |  |  |

**Tier**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| recurring | map\<string, TierRecurringBillingItem\> \| null | yes |  |  |
| usage | map\<string, TierUsageBillingItem\> | yes |  |  |

**TierRecurringBillingItem**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| price     | number   | yes     |             |                 |

**TierUsageBillingItem**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| threshold | integer  | yes     |             |                 |
| price     | number   | yes     |             |                 |

**TokenCreated**

| **Field** | **Type**       | **Req** | **Default** | **Description** |
|-----------|----------------|---------|-------------|-----------------|
| id        | string         | yes     |             |                 |
| token     | string         | yes     |             |                 |
| expires   | string \| null | yes     |             |                 |

**TokenExchangeRequestInput**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| token     | string   | yes     |             |                 |

**TokenItem**

| **Field**   | **Type**       | **Req** | **Default** | **Description** |
|-------------|----------------|---------|-------------|-----------------|
| id          | string         | yes     |             |                 |
| description | string         | yes     |             |                 |
| expires     | string \| null | yes     |             |                 |

**TokenMetadataPayload**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| pat_updates | array\<PATTokenMetadataUpdate\> |  | \[\] |  |

**Tokens**

| **Field** | **Type**       | **Req** | **Default** | **Description** |
|-----------|----------------|---------|-------------|-----------------|
| input     | number \| null |         |             |                 |
| output    | number \| null |         |             |                 |
| image     | number \| null |         |             |                 |
| search    | number \| null |         |             |                 |
| storage   | number \| null |         |             |                 |

**UpdateAWSMarketplaceSubscription**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| on_demand_budget | number \| null |  |  |  |
| action_on_budget_exhausted | ActionOnBudgetExhausted \| null |  |  |  |
| free_tokens_per_billing_cycle | integer \| null |  |  |  |

**UpdateStripeCustomer**

| **Field**       | **Type**               | **Req** | **Default** | **Description** |
|-----------------|------------------------|---------|-------------|-----------------|
| billing_details | BillingDetailsModified | yes     |             |                 |

**UpdateStripeSubscription**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| on_demand_budget | number \| null |  |  |  |
| action_on_budget_exhausted | ActionOnBudgetExhausted \| null |  |  |  |
| free_tokens_per_billing_cycle | integer \| null |  |  |  |

**UpdateStripeSubscriptionMeteredPrices**

| **Field**       | **Type**        | **Req** | **Default** | **Description** |
|-----------------|-----------------|---------|-------------|-----------------|
| price_nicknames | array\<string\> | yes     |             |                 |

**UpgradeStripeSubscription**

| **Field**        | **Type**             | **Req** | **Default** | **Description** |
|------------------|----------------------|---------|-------------|-----------------|
| billing_interval | IntervalType \| null |         | month       |                 |
| account_type     | AccountType          | yes     |             |                 |

**UserCreated**

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| id        | string   | yes     |             |                 |

**UserCreation**

| **Field**  | **Type**          | **Req** | **Default** | **Description** |
|------------|-------------------|---------|-------------|-----------------|
| name       | string            | yes     |             |                 |
| email      | string            | yes     |             |                 |
| language   | Languages \| null |         |             |                 |
| type       | UserType \| null  |         | USER        |                 |
| last_login | string \| null    |         |             |                 |

**UserOnboardingInquiry**

| **Field**             | **Type**        | **Req** | **Default** | **Description** |
|-----------------------|-----------------|---------|-------------|-----------------|
| use_case              | string \| null  |         |             |                 |
| organization_size     | string \| null  |         |             |                 |
| receive_updates       | boolean \| null |         |             |                 |
| company               | string \| null  |         |             |                 |
| phone                 | string \| null  |         |             |                 |
| role                  | string \| null  |         |             |                 |
| country               | string \| null  |         |             |                 |
| accept_privacy_policy | boolean \| null |         | False       |                 |

**UserPreferences**

**Type:** object

**UserSetPreferences**

| **Field** | **Type**          | **Req** | **Default** | **Description** |
|-----------|-------------------|---------|-------------|-----------------|
| name      | string \| null    |         |             |                 |
| avatar    | string \| null    |         |             |                 |
| email     | string \| null    |         |             |                 |
| language  | Languages \| null |         |             |                 |

**UserType**

**Enum:** ROOT, DEALER, USER, READONLY, MANAGER, SALES

**ValidationError**

| **Field** | **Type**                   | **Req** | **Default** | **Description** |
|-----------|----------------------------|---------|-------------|-----------------|
| loc       | array\<string \| integer\> | yes     |             |                 |
| msg       | string                     | yes     |             |                 |
| type      | string                     | yes     |             |                 |
| input     | object                     |         |             |                 |
| ctx       | object                     |         |             |                 |

**Welcome**

| **Field**          | **Type**           | **Req** | **Default** | **Description** |
|--------------------|--------------------|---------|-------------|-----------------|
| preferences        | WelcomeUser        | yes     |             |                 |
| accounts           | array\<string\>    | yes     |             |                 |
| create             | boolean            | yes     |             |                 |
| can_be_deleted     | boolean            | yes     |             |                 |
| dependant_accounts | array\<AccountId\> | yes     |             |                 |

**WelcomeUser**

| **Field**  | **Type**          | **Req** | **Default** | **Description** |
|------------|-------------------|---------|-------------|-----------------|
| last_login | string \| null    |         |             |                 |
| email      | string            | yes     |             |                 |
| name       | string \| null    |         |             |                 |
| type       | UserType          | yes     |             |                 |
| language   | Languages \| null |         |             |                 |

**WorkflowMode**

**Enum:** classic, cowork

**Zone**

| **Field**      | **Type**       | **Req** | **Default** | **Description** |
|----------------|----------------|---------|-------------|-----------------|
| id             | string         | yes     |             |                 |
| slug           | string         | yes     |             |                 |
| title          | string \| null |         |             |                 |
| cloud_provider | CloudProvider  | yes     |             |                 |
| private        | boolean        | yes     |             |                 |
| origin         | string \| null |         |             |                 |

**ZoneVisibility**

**Enum:** DEFAULT, RESTRICTED
