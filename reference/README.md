# Reference — the Progress Agentic RAG product guide

This folder carries the **complete Progress Agentic RAG practitioner's guide** — the plain product
document, unmodified — bundled so the demo build agent has **end-to-end knowledge of the platform**:
every capability, endpoint, retrieval configuration, ingestion agent, and SDK.

- **`agentic-rag-guide/`** — the full guide: 19 chapters (as markdown, faithful conversions of the
  Word source), the API appendices A–G, plus the complete PDF and the guide's own
  `README.md` / `TABLE_OF_CONTENTS.md`.

The build agent opens the relevant chapter/appendix while building (see `AGENTS.md` → key files, and
the session hook). It is the source of truth — the agent should read it rather than guess or
reverse-engineer an endpoint.

**Partners may also ingest these files into their own Knowledge Box** if they want the guide itself as
a searchable corpus — that's optional, and the package never depends on it.

*Source: github.com/jaysanderson/building-solutions-progress-agentic-rag (public, OpenAPI-accurate,
live-tested).*
