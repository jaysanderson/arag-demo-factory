**PART 1 — FOUNDATIONS**

**Chapter 1\
What Is Progress Agentic RAG?**

*The platform, the problem it solves, and how the pieces fit together*

Progress Agentic RAG is a Retrieval-Augmented Generation platform
delivered as a managed service. In one sentence: it turns a pile of your
unstructured content into a searchable, question-answering knowledge
base that a large language model can reason over — without you having to
build and operate the retrieval infrastructure yourself.

This chapter builds the mental model the rest of the book depends on. If
you already know what RAG is and just want to make calls, skip to
Chapter 3's quickstart; but the ten minutes you spend here will make
every later chapter easier.

**The problem RAG solves**

Large language models are fluent but forgetful. They know only what was
in their training data, they cannot see your private documents, and when
asked about something they do not know they tend to invent a plausible
answer. For a consumer chatbot that is an annoyance. For a legal,
medical, compliance, or commerce application it is a liability.

Retrieval-Augmented Generation fixes this by changing the order of
operations. Instead of asking the model to answer from memory, you first
**retrieve** the most relevant passages from your own content, then hand
those passages to the model and ask it to answer *using only what it was
given*. The model's fluency is preserved; its tendency to hallucinate is
constrained by evidence you control. Done well, every answer can point
back to the exact source paragraph that supports it.

| **Key idea** RAG is not a model. It is a pipeline: **ingest → index → retrieve → generate**. Progress Agentic RAG is a production-grade implementation of that entire pipeline, exposed through an API. |
|----|

**What "as a service" actually buys you**

Building a RAG pipeline by hand means assembling and operating a
surprising number of moving parts: document parsers for dozens of file
formats, an OCR and transcription stack for images and audio, a text
chunker, an embedding model, a vector database, a keyword index, a
reranker, prompt templates, an LLM integration, and the glue that keeps
them consistent as data changes. Each piece is a project in its own
right.

Progress Agentic RAG provides all of it behind a single API and a
dashboard. Specifically, the platform gives you:

- **Ingestion for any data, any language** — upload files, links, or raw
  text; the platform extracts, cleans, transcribes, and chunks the
  content automatically.

- **A hybrid index** — every piece of content is indexed for both
  keyword (BM25) and semantic (vector) retrieval, so you get exact-match
  precision and meaning-based recall at once.

- **Your choice of models** — the semantic (embedding) model and the
  generative (LLM) model are configurable per Knowledge Box; you can
  even bring your own model provider account.

- **A customizable retrieval and RAG pipeline** — you control filtering,
  ranking, reranking, how much context is assembled, and the exact
  prompt sent to the LLM.

- **Trusted answers with citations** — generative answers can carry
  citations back to the source paragraphs, so answers are auditable.

- **An agentic layer** — the Retrieval Agent can plan multi-step
  retrieval, call tools, fall back to the public internet, and hold
  stateful conversations.

**A first look at the shape of the API**

Everything in the platform hangs off one central object: the **Knowledge
Box**. A Knowledge Box is an isolated container of content plus its
indexes and configuration. You ingest resources into a Knowledge Box,
and you search, ask, and generate against that same Knowledge Box. A
single account can hold many Knowledge Boxes, each fully isolated from
the others.

The two endpoints you will use most illustrate the whole platform in
miniature:

| **Endpoint** | **What it does** | **Returns** |
|----|----|----|
| POST /kb/{kbid}/find | Hybrid retrieval — finds the most relevant passages for a query | Ranked resources and text blocks |
| POST /kb/{kbid}/ask | Retrieval + generation — finds passages, then asks the LLM to answer from them | A generated answer, its citations, and the retrieval that grounded it |

ask internally calls find to gather evidence, then sends that evidence
to the LLM. Because of that, ask accepts every parameter find does —
plus a large set that control answer generation. Chapters 9 and 10 cover
both in depth.

| **Note** Throughout the book, find and ask are shown against a live Knowledge Box loaded with a small corpus about home solar, batteries, and EV charging. You will see the same corpus answer real questions in Chapter 3. |
|----|

**Where the platform runs: zones, accounts, and the four APIs**

Two facts about the platform's topology will save you hours of
confusion, so they are worth stating up front.

**Zones**

Your data lives in a **zone** — a geographic region such as
aws-ap-southeast-2-1 (Australia) or aws-eu-central-1-1 (Europe). A
Knowledge Box belongs to exactly one zone, and content operations for
that Knowledge Box are served from that zone's regional host. Choosing a
zone is primarily about data residency and latency.

**The four APIs**

The platform is not a single API but four, each with its own base URL
and its own job. Knowing which is which tells you immediately where a
given call goes and which credential it needs.

| **API** | **Responsibility** | **Base URL** |
|----|----|----|
| Global | Accounts, users, zone discovery | https://rag.progress.cloud/api/v1 |
| Zone (Regional Manager) | Managing Knowledge Boxes within a zone — create, configure, delete, keys | https://\<zone\>.dp.progress.cloud |
| NucliaDB | Knowledge Box **content** — resources, fields, search, ask, graph | https://\<zone\>.dp.progress.cloud/api/v1 |
| NUA | The Understanding API — processing, Predict, agents | https://\<zone\>.dp.progress.cloud/api/v1 |

| **Gotcha — tested** These boundaries are enforced strictly. A credential that works on one API can be flatly rejected by another — a NUA key used against the Global API returns Nuakeys are not valid in the global API. Chapter 4 maps every credential to the APIs it can actually call. This is the single most common source of early confusion. |
|----|

**How this book is organized around the pipeline**

The parts of this book follow the RAG pipeline in order, so you can read
them as a build sequence:

- **Foundations (Part 1)** — concepts, vocabulary, and a working
  quickstart.

- **Authentication and Management (Part 2)** — credentials, and creating
  and configuring Knowledge Boxes.

- **Data Ingestion (Part 3)** — getting content in, and enriching it as
  it lands.

- **Search, Retrieval, and RAG (Part 4)** — the heart of the platform:
  finding, asking, and shaping answers.

- **The Retrieval Agent (Part 5)** — agentic, multi-step, stateful
  retrieval.

- **Building and Operating (Part 6)** — SDKs, the no-code widget,
  observability, and production practices.

- **Reference (Part 7)** — every endpoint, generated from the official
  specifications.

By the end of Part 4 you will be able to build a complete, high-quality
question-answering solution. The remaining parts make it agentic,
observable, and production-ready.
