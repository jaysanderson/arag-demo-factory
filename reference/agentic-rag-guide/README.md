# Building Solutions with Progress Agentic RAG

**The complete practitioner's guide — grounded in a live, tested Knowledge Box.**

A hands-on book for building real solutions on Progress Agentic RAG (the RAG-as-a-Service
platform built on NucliaDB + the Nuclia Understanding API). It takes you from the first API
call to a production deployment, and every request, response, and code sample in the guide
chapters was executed against a live Knowledge Box while the book was written.

## What's here

| File / folder | Contents |
|---|---|
| **Building Solutions with Progress Agentic RAG - Complete Book.pdf** | The entire book as one navigable PDF (910 pages) — cover, continuous page numbers, and Part → Chapter bookmarks. |
| **Book Overview.pptx** | A 10-slide overview deck of the book. |
| `00 - START HERE - Contents.docx` | Master index and reading guide. |
| `00 - Front Matter.docx` | About the book, who it's for, how it was tested, conventions. |
| `Part 1 – Foundations/` | Concepts, vocabulary, and a guided quickstart (Ch 1–3). |
| `Part 2 – Authentication and Management/` | Credentials and Knowledge Box management (Ch 4–5). |
| `Part 3 – Data Ingestion/` | Resources, files, and ingestion agents (Ch 6–8). |
| `Part 4 – Search, Retrieval, and RAG/` | `find`, `ask`, catalog/suggest/summarize, the knowledge graph, and a **RAG configuration cookbook** (Ch 9–13). |
| `Part 5 – The Retrieval Agent/` | Agentic, multi-source, stateful retrieval (Ch 14). |
| `Part 6 – Building and Operating/` | SDKs, the no-code widget, observability, backups/sync, production practices (Ch 15–19). |
| `Part 7 – Reference Appendix/` | Full endpoint reference for all four APIs (A–D), a glossary/schema quick reference (E), the complete schema catalog of all 1,140 data models (F), and an API verification matrix (G). |

## How it was built

- **Live-tested:** a throwaway Knowledge Box in the `aws-ap-southeast-2-1` zone was created and
  exercised end to end — 235 of 356 operations (66%) were called against the sandbox and returned
  a real response; the rest are marked in Appendix G with the reason they weren't run
  (destructive, credential-gated, or agent-provisioning).
- **Spec-accurate:** the reference appendix is generated from the official OpenAPI specifications
  (global, nua, nucliadb, zone — v1) and documents every endpoint, parameter, response, and schema.
- **Three languages:** cURL, Python, and JavaScript/TypeScript examples throughout the guide.

## Stats

~107,000 words · 28 documents · 356 endpoints · 1,140 schemas · 910-page PDF.

---

*The Word documents are the editable source; the PDF is the compiled read-only edition.*
