**PART 7 — REFERENCE APPENDIX**

**Appendix E — Glossary and Schema Reference**

*Terms, enumerations, and the identifiers you meet in responses*

**Glossary**

| **Term** | **Definition** |
|----|----|
| **Account** | The billing and ownership boundary for an organization. Holds users and Knowledge Boxes. Identified by a UUID and a slug. |
| **Zone** | A geographic region a Knowledge Box lives in (e.g. aws-ap-southeast-2-1). A KB belongs to exactly one zone. |
| **Knowledge Box (KB)** | The primary container of content, indexes, and configuration. Fully isolated from other KBs. Identified by a kbid. |
| **Resource** | One item of content in a KB — a document, page, image, audio, video, or text — plus its metadata. Has a uuid and optional slug. |
| **Field** | A typed value inside a resource: text, file, link, conversation, or key-value. A resource can hold several fields. |
| **Paragraph** | The retrievable unit — a text block a field is split into during processing. Indexed for keyword and semantic search. |
| **Vector** | An embedding of a paragraph or sentence, produced by the KB's semantic model, used for meaning-based retrieval. |
| **Vectorset** | A named vector index within a KB. A KB may hold several (e.g. per embedding model), selectable with the vectorset parameter. |
| **Label / Labelset** | A tag (label) organized into a named group (labelset), applied to resources or paragraphs and used for filtering and faceting. |
| **Entity / Entity group** | A named thing (person, org, place, product) detected by NER or defined by you; grouped into entity groups such as ORG, GPE, DATE. |
| **Relation** | A typed connection between entities and/or resources, forming the knowledge graph. |
| **Processing** | The asynchronous NUA pipeline that extracts text (OCR/STT), detects language, splits paragraphs, runs NER, and computes vectors. |
| **NUA** | The Nuclia Understanding API — processing and Predict services. Involves no Knowledge Box; nothing is stored. |
| **Predict** | NUA services that run models directly: embeddings, tokens/NER, LLM chat, query analysis, rerank, and REMi. |
| **Ingestion agent** | A data-augmentation agent that enriches resources at ingestion — labeler, generator, graph, Q&A, safety guards. |
| **Retrieval Agent (RAO)** | A configurable, multi-source, multi-step agent with drivers and a workflow; the 'agentic' layer above a KB's fixed pipeline. |
| **Driver** | A source made available to a Retrieval Agent — a KB, SQL/Snowflake DB, pandas, internet search, or MCP server. |
| **RAG strategy** | A method for assembling the context sent to the LLM in /ask — full_resource, neighbouring_paragraphs, hierarchy, graph, etc. |
| **REMi** | RAG Evaluation Metrics — a model scoring Answer Relevance, Context Relevance, and Groundedness (the RAG triad). |
| **Service account** | A non-human identity on a KB with a role; its API keys authorize content and search calls. |
| **NUA key** | A credential for the NUA API (and, with allow_kb_management, KB management). Presented in X-NUCLIA-NUAKEY. |
| **PAT** | Personal Access Token — a long-lived user token for admin automation; works on all four APIs. |

**Response identifiers**

Search and citation responses address content with compound identifiers.
Learn to read them and the rest of the API becomes legible.

| **Identifier form** | **Meaning** | **Example** |
|----|----|----|
| \<rid\> | A resource UUID | ca2a8f3bf186491facde30cdb2fbc2b6 |
| \<rid\>/\<ft\>/\<field\> | A field within a resource (ft = field-type letter) | ca2a…/t/body |
| \<rid\>/\<ft\>/\<field\>/\<start\>-\<end\> | A paragraph — a character range within a field | ca2a…/t/body/0-301 |

Field-type letters seen in responses: t text, f file, u link, a
generic/title, c conversation. Citations map one of these paragraph
identifiers to the character span(s) of the answer it supports.

**Key enumerations**

Values verified from the nucliadb v1 specification. These are the enums
you set most often.

**Text field formats (\`format\`)**

| **Value**             | **Meaning**                                     |
|-----------------------|-------------------------------------------------|
| PLAIN                 | Plain text                                      |
| HTML                  | HTML markup                                     |
| MARKDOWN              | Markdown, converted to plain text on ingest     |
| KEEP_MARKDOWN         | Markdown, preserving the markup                 |
| RST                   | reStructuredText                                |
| JSON                  | Structured JSON (understood for structured Q&A) |
| JSONL                 | JSON Lines                                      |
| PLAIN_BLANKLINE_SPLIT | Plain text split on blank lines                 |

**Retrieval features (\`features\`)**

| **\`find\` (FindOptions)** | **\`ask\` (ChatOptions)**      |
|----------------------------|--------------------------------|
| keyword                    | keyword                        |
| semantic                   | semantic                       |
| relations                  | relations                      |
| graph                      | — (use the graph RAG strategy) |

**Resource detail (\`show\` — ResourceProperties)**

basic, values, extracted, origin, extra, relations, security, errors.
Default is \[basic\]. Combine several to control how much of a resource
is serialized.

**Extracted data types (\`extracted\` — ExtractedDataTypeName)**

text, metadata, shortened_metadata, large_metadata, vectors, link, file,
question_answers, relation_vectors. Selects which processed artifacts to
return when reading a resource with show=extracted.

**Field types (FieldTypeName)**

text, file, link, conversation, generic, key_value — the
field_type_filter values, controlling which field types appear in
results.

**Rank fusion and rerankers**

rank_fusion: rrf (Reciprocal Rank Fusion — the default and current
option). reranker: predict (the platform's reranking model — the
default). Both can also take an object form for advanced tuning.

**RAG strategy names (\`rag_strategies\[\].name\`)**

full_resource, field_extension, hierarchy, neighbouring_paragraphs,
metadata_extension, conversational, prequeries, graph. Image strategies
(rag_images_strategies): page_image, paragraph_image, table_image.

**Service-account roles**

SREADER (read/search), SWRITER (write content), SCONTRIBUTOR (write, not
configure), SOWNER (full control). Knowledge Box user roles: READER,
WRITER, MANAGER.

**The four base URLs, one more time**

| **API** | **Base URL** | **Auth header** |
|----|----|----|
| Global | https://rag.progress.cloud/api/v1 | Authorization: Bearer (user/PAT) |
| Zone | https://\<zone\>.dp.progress.cloud | X-NUCLIA-NUAKEY or Authorization: Bearer |
| NucliaDB | https://\<zone\>.dp.progress.cloud/api/v1 | Authorization: Bearer (KB key) |
| NUA | https://\<zone\>.dp.progress.cloud/api/v1 | X-NUCLIA-NUAKEY: Bearer |

| **Key idea** If a call returns 403, check this table first. The overwhelmingly common cause is a credential presented to an API it is not cut for — the error message will name the context it could not access. |
|----|
