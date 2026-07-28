**PART 1 — FOUNDATIONS**

**Chapter 2\
Core Concepts and Vocabulary**

*The objects and terms the platform is built from*

The platform is precise about its vocabulary, and its API uses these
terms literally. This chapter defines each one and shows how they nest.
Treat it as a reference to return to — the first time you meet
field_type, paragraph, or vectorset in a later chapter, this is where
the definition lives.

**The containment hierarchy**

From the outside in, the platform's objects nest like this:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>TEXT</strong></p>
<p>Account<br />
└── Knowledge Box (belongs to one zone)<br />
└── Resource<br />
└── Field (text / file / link / conversation / key-value)<br />
└── Paragraph (a retrievable text block)<br />
└── Vector (an embedding of a paragraph or sentence)</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Retrieval operates at the **paragraph** level: when you search, the
platform finds the most relevant paragraphs and then tells you which
resource and field they came from. Understanding this hierarchy is the
key to understanding both search results and filtering.

**Account and zone**

An **account** is the billing and ownership boundary — your
organization. It holds users, Knowledge Boxes, and usage. A **zone** is
the geographic region a Knowledge Box lives in. One account can own
Knowledge Boxes across several zones.

**Knowledge Box**

A **Knowledge Box** (often abbreviated *KB*, and identified by a kbid
UUID) is the primary container. It holds resources, the indexes built
from them, and a configuration that includes which semantic and
generative models to use, security settings, and labels. Knowledge Boxes
are fully isolated from one another — a search never crosses KB
boundaries. Most real solutions use one Knowledge Box per tenant, per
product area, or per security domain.

**Resource**

A **resource** is a single item of content you put into a Knowledge Box
— a document, a web page, an image, an audio or video file, or a block
of text. Each resource has a stable uuid and an optional human-friendly
slug. A resource carries metadata (title, summary, labels, origin,
security) and one or more **fields** that hold its actual content.

| **Tip** Set a slug when you create a resource. A slug is a stable, human-readable id you choose (for example an external record id), and most content endpoints accept a slug in place of the UUID — which means you can address resources by your own identifiers. |
|----|

**Fields and field types**

Content does not sit loose in a resource; it sits in a typed **field**.
A single resource can hold several fields of different types — for
example a file field for an uploaded PDF and a text field for an
editorial summary. The field types are:

| **Field type** | **API key** | **Holds** |
|----|----|----|
| Text | texts | Plain text, Markdown, HTML, or RST you supply directly |
| File | files | An uploaded binary — PDF, Office doc, image, audio, video |
| Link | links | A URL the platform will fetch and process |
| Conversation | conversations | A sequence of messages (e.g. a chat or support thread) |
| Key-value | key_values | Structured key/value data |

Every field is addressed by a field_type letter and a field_id in search
results and downloads — t for text, f for file, u for link, a for the
generic/title field, and so on. You will see identifiers like
ca2a.../t/body/0-301 in results: that is resource ca2a…, text field
body, character range 0–301.

**Paragraph and vector**

When a field is processed, its text is split into **paragraphs** — the
retrievable unit. Each paragraph is indexed two ways: into a **keyword**
index (BM25, for exact term matching) and into a **vector** index (an
embedding produced by the Knowledge Box's semantic model, for
meaning-based matching). A search can use either or both; using both is
called *hybrid* retrieval and is the default.

A **vectorset** is a named vector index. A Knowledge Box can hold more
than one — for example one per embedding model — and you can select
which to search with the vectorset parameter. This is what makes it
possible to migrate embedding models without rebuilding everything.

**Labels, entities, and relations**

Beyond raw text, the platform enriches content with structure you can
filter and navigate by:

- **Labels** (also called classifications) are tags organized into
  **labelsets**. You can apply them manually or have an ingestion agent
  apply them automatically, then filter searches by them.

- **Entities** are named things — people, organizations, places,
  products — detected by the NER model or defined by you in **entity
  groups**.

- **Relations** connect entities and resources into a **knowledge
  graph** you can query directly (Chapter 12).

**Processing and the NUA pipeline**

Ingestion is asynchronous. When you create or upload a resource, the
platform accepts it immediately and then **processes** it in the
background through the Nuclia Understanding API (NUA): extracting text,
transcribing media, running NER, chunking into paragraphs, and computing
vectors. Only after processing completes is the content fully
searchable.

| **Gotcha — tested** Because processing is asynchronous, content is not instantly searchable. In testing, a small text resource was searchable within seconds, but a freshly uploaded file returned *"Not enough data to answer this"* from /ask until processing finished. Always account for this lag — Chapter 7 shows how to check processing status. |
|----|

**The credentials, in one place**

Four kinds of credential appear in the book. Chapter 4 is devoted to
them, but here is the one-line version so the code samples make sense
sooner:

| **Credential** | **Authorizes** | **Typical use** |
|----|----|----|
| NUA key | Processing/Predict, and (if enabled) KB management | Backend automation, this book's testing |
| KB API key (service account) | Content and search on one Knowledge Box | Application backends |
| Personal Access Token (PAT) | Everything your user can do | Long-running scripts, admin |
| User token | Everything, briefly (30 min) | Interactive/dashboard use |
