**Building Solutions with\
Progress Agentic RAG**

*The complete practitioner's guide — start here*

This is the master index for the book — seven parts plus a reference
appendix. Read the parts in order for a guided build, or jump to the
reference to look up any endpoint, data model, or verification status.

| **Key idea** Every request, response, and code sample in the guide chapters was executed against a live Progress Agentic RAG Knowledge Box in the aws-ap-southeast-2-1 zone. The reference appendix is generated from the official OpenAPI specifications (global, nua, nucliadb, zone — v1) and documents every endpoint, parameter, response, and schema. Appendix G records how each endpoint was verified. |
|----|

**How to read this book**

- **New to the platform?** Read Part 1, then do the Chapter 3 quickstart
  with your own key.

- **Confused by keys and 403s?** Chapter 4 maps every credential to the
  APIs it can call.

- **Building ingestion?** Part 3. **Building search/answers?** Part 4 —
  the core of the book.

- **Configuring RAG for a specific use case?** Chapter 13 — a cookbook
  of tested recipes.

- **Need advanced, multi-source retrieval?** Part 5, the Retrieval
  Agent.

- **Going to production?** Part 6, especially Chapter 19.

- **Looking up an endpoint or data model?** Appendices A–F. **What's
  proven?** Appendix G.

**Contents**

**Part 1 — Foundations**

- 1\. What Is Progress Agentic RAG?

- 2\. Core Concepts and Vocabulary

- 3\. Your First Solution: A Guided Quickstart

**Part 2 — Authentication and Management**

- 4\. Authentication and Authorization

- 5\. Accounts, Zones, and Knowledge Box Management

**Part 3 — Data Ingestion**

- 6\. Resources and Fields: The Data Model

- 7\. Uploading and Processing Files

- 8\. Data Augmentation: Ingestion Agents

**Part 4 — Search, Retrieval, and RAG**

- 9\. Retrieval Fundamentals: /find and /search

- 10\. Generative Answers: The /ask Endpoint

- 11\. Catalog, Suggest, and Summarize

- 12\. The Knowledge Graph and Graph Search

- 13\. Configuring RAG for Your Use Case (cookbook)

**Part 5 — The Retrieval Agent**

- 14\. Agentic Retrieval, Sessions, and Workflows

**Part 6 — Building and Operating**

- 15\. The SDKs: Python, JavaScript/TypeScript, and .NET

- 16\. No-Code: The Search Widget and Dashboard

- 17\. Quality and Observability

- 18\. Backups, Export/Import, and Sync Connectors

- 19\. Production Best Practices

**Part 7 — Reference Appendix**

- A. NucliaDB REST API — full endpoint reference

- B. NUA API — full endpoint reference

- C. Zone API — full endpoint reference

- D. Global / Account API — full endpoint reference

- E. Glossary and Schema Quick Reference

- F. Complete Schema Catalog — all 1,140 data models

- G. API Verification Matrix — how every endpoint was tested

**Scope and verification**

The guide chapters teach the full pipeline with cURL, Python, and
JavaScript/TypeScript examples, culminating in Chapter 13's cookbook of
tested RAG configurations for real use cases. Appendices A–D document
all **356 operations** — every parameter, request-body field (nested
objects expanded), authorization role, and response. Appendix F
documents all **1,140 named schemas** field by field. Appendix G reports
live verification: **235 of 356 operations (66%) were exercised against
the sandbox**, the remainder skipped only for safety, credential, or
agent-provisioning reasons — each marked explicitly.
