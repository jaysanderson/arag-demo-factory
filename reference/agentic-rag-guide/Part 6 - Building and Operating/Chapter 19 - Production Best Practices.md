**PART 6 — BUILDING AND OPERATING**

**Chapter 19\
Production Best Practices**

*Security, multi-tenancy, cost, and performance for real deployments*

The gap between a working prototype and a production system is made of
the concerns in this chapter: keeping data isolated and secure,
controlling cost, staying fast, and failing safely. Everything here
builds on mechanisms introduced earlier — this chapter is about applying
them deliberately.

**Security and access control**

Layer your defenses; do not rely on any single one.

- **Least-privilege keys.** Give each component the narrowest
  service-account role that works — SREADER for search frontends,
  SWRITER/SOWNER only for trusted ingestion backends (Chapter 4). Never
  ship a writer key to a browser.

- **Rotate keys.** Because keys are minted per service account and
  expire within 1095 days, rotate them on a schedule and revoke
  individual keys the moment one is suspected leaked, without disturbing
  others.

- **Constrain the surface.** Set allowed_origins and, for backend-only
  KBs, allowed_ip_addresses so a key is useless outside your
  infrastructure.

- **Row-level security.** Tag resources with access_groups and pass the
  caller's security groups on every query; enable enforce_security to
  make it mandatory.

- **Guard the pipeline.** Run the llama-guard and prompt-guard ingestion
  agents (Chapter 8) on any untrusted content so unsafe or
  injection-laden material is flagged before it can reach an answer.

**Multi-tenancy**

Two models, chosen by how strong your isolation must be:

| **Model** | **How** | **Use when** |
|----|----|----|
| Knowledge Box per tenant | Each tenant gets its own KB and keys | Strong isolation, per-tenant config/models, easy per-tenant deletion and export |
| Shared KB with security groups | One KB; resources tagged with tenant access_groups; queries scoped by security | Many small tenants where a KB each is too much overhead |

| **Key idea** Default to a Knowledge Box per tenant when tenants are few or sensitive — isolation is structural, and deleting a tenant is deleting a KB. Use the shared-KB-with-security model only for large numbers of low-risk tenants, and test the security filter relentlessly, because there a bug is a cross-tenant data leak. |
|----|

**Cost and token management**

Generative answers cost tokens, and retrieval quality is what keeps that
cost down — a tight context is cheaper *and* better. Practical levers:

- **Watch the numbers.** The streaming metadata item on /ask reports
  input and output tokens per answer (Chapter 10). Log it and aggregate
  — it is your per-answer cost meter.

- **Right-size context.** Keep top_k as low as quality allows, and
  prefer neighbouring_paragraphs over full_resource unless whole
  documents are truly needed. More context is not free and often does
  not help.

- **Route models by difficulty.** Override generative_model per request
  — a cheaper model for routine questions, a stronger one only when
  needed.

- **Set budgets.** Account-level consumption controls let you cap and
  monitor spend; wire alerts before you hit limits.

- **Bring your own provider.** For high volume, connecting your own
  Anthropic, Bedrock, or Gemini account can change the cost equation and
  keep generation under your own contract.

**Performance and latency**

- **Stream answers.** Use streaming /ask so users see tokens
  immediately; the metadata item reports time-to-first-chunk so you can
  track it.

- **Cache the cacheable.** catalog, suggest, and popular answers are
  cache-friendly; do not re-embed a query you just served.

- **Pick the near zone.** Latency is dominated by distance — put the
  Knowledge Box in the zone closest to your users, within your
  data-residency rules.

- **Ingest asynchronously and in batches.** Do not block user requests
  on ingestion; let processing run and use webhooks (Chapter 8) rather
  than polling to learn when content is ready.

**Reliability and correctness**

- **Treat \`no_context\` as normal.** When retrieval finds nothing, /ask
  says so instead of hallucinating (Chapter 10). Handle that status in
  your UI — offer to broaden the search or fall back to a Retrieval
  Agent with internet fallback (Chapter 13).

- **Respect processing lag.** Content is not searchable the instant it
  is created. Poll status or use webhooks before promising users that
  new content is live.

- **Use the review cycle.** Enable hidden resources so new content is
  staged and reviewed before it appears in answers — indexing without
  exposing until approved.

- **Back up before destructive change.** Deletion is irreversible and
  takes keys with it; snapshot first (Chapter 17).

- **Monitor quality continuously.** Sample REMi metrics and watch user
  feedback (Chapter 16); regressions from a content or model change show
  up there first.

| **Key idea** A production RAG system is judged on trust. Every practice in this chapter — least privilege, tenant isolation, honest no_context, staged review, continuous evaluation — exists to make answers something users can rely on. Speed and cost matter, but trust is the product. |
|----|
