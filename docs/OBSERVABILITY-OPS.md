# Observability & Ops (builder distillation)

How to prove a demo is grounded, keep its corpus fresh, and not ship something that leaks or
overspends. Distilled from the practitioner's guide Part 6 (Ch. 17 Quality & Observability, Ch. 18
Backups/Export/Sync, Ch. 19 Production Best Practices). Hosts and auth per `ARAG-REFERENCE.md` —
data plane on `{zone}.rag.progress.cloud/api/v1`, NUA + NucliaDB (evaluation, feedback, activity,
sync/backup) on `{zone}.dp.progress.cloud/api/v1`. `{zone}` = `aws-ap-southeast-2-1`.

> Rule of thumb: **a demo that can't show its grounding isn't done.** REMi powers the Quality
> surface; wire feedback into every answer; read logs with a user token, never the NUA key.

## 1. Quality & observability

### REMi — the RAG triad

**REMi** (RAG Evaluation Metrics) is the platform's own model that scores a RAG interaction on three
axes. It runs **in NUA**, so a REMi call needs **both** the KB endpoint/service-account key **and** a
NUA key. The Python SDK (`pip install nuclia`) wraps it.

| Metric | Answers | A low score means | Fix |
|---|---|---|---|
| **Answer relevance** | Does the answer address the query? | Question was misread | Rephrasing / prompt |
| **Context relevance** | Was retrieved context relevant? | **Retrieval** is the problem | Chunking, filters, semantic model, `top_k` |
| **Groundedness** | Is the answer supported by that context? | Model is drifting from evidence | Tighten prompt, lower `max_tokens` |

The three **localize failure**: high context relevance + low groundedness = the model inventing;
low context relevance = retrieval never found the evidence. **Sample, score, track over time** —
run REMi on a rolling sample of production interactions and chart the three metrics; a groundedness
drop right after a content or model change is the signal to catch before users do. REMi logs are
downloadable, so they can flow into your own analytics stack.

**Demo builder takeaway:** the Quality surface in a demo *is* REMi. Score a handful of the demo's
canned questions, show the three bars, and point at groundedness as the "answers are not made up"
proof. Pair it with visible citations (an ungrounded answer is a bug) — the two together are the
trust story.

### User feedback — the cheapest quality signal

`POST /kb/{kb}/feedback` records a thumbs verdict + optional text against an answer `ident`. Wire a
feedback control into **every** answer surface; flagged-bad interactions are the highest-value
inputs to a REMi review and to prompt/chunking tuning.

```bash
curl -X POST "https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/feedback" \
  -H "Authorization: Bearer $KEY" -H "Content-Type: application/json" \
  -d '{"ident":"<answer-ident>","good":true,"task":"CHAT","feedback":"exactly right"}'
```

### Activity logs — the audit trail

The audit trail of a KB: resources processed/created/edited, questions + generative answers,
queries, and user feedback. Query per event type; also surfaced in the dashboard UI.

```bash
curl -X POST "https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/activity/visited/query" \
  -H "Authorization: Bearer $PAT" -H "Content-Type: application/json" \
  -d '{"year_month":"2026-07"}'
```

| **Gotcha — tested** | Activity-log endpoints **reject NUA keys** (`NuaKeyUser cannot access context of type ActivityLogsAPI` / `ActivityLogsMetricsAPI`). Read logs with a **user token or PAT** — not the NUA key, not the KB service-account key. Surprising, because the same NUA key can create the very KB whose logs it cannot read. |
|---|---|

## 2. Backups, export/import, sync

| Mechanism | Captures | Async? | Reach for it when |
|---|---|---|---|
| **Backup/restore** | Full KB state: config **+** resources, point-in-time | Yes — request then poll | Complete state capture, DR, cloning an env, at scale. **Enterprise-account capability.** |
| **Export/import** | Serialized KB data, portable/downloadable | — | Move content between accounts/zones, seed staging from prod, offline copy. Simpler for small/medium KBs. |
| **Sync Agent / connectors** | Keeps corpus **fresh** from a system of record | Scheduled | Content lives elsewhere and changes |

**Backup ops:** create (snapshot config+resources) · list/get (inspect status) · restore (recreate a
KB from a snapshot, async) · delete. Restore reproduces the captured state — good for DR *and* for
cloning a demo environment.

**Export/import** (conceptual SDK flow):

```python
from nuclia import sdk
export = sdk.NucliaExportImport()
export.export_kb(...)   # produces a portable export
export.import_kb(...)   # re-creates content in a target KB
```

**Keeping content fresh** — choose by *where content lives and who owns the schedule*:

| Source | Use | Runs where |
|---|---|---|
| Local folder, sitemap, RSS | **Sync Agent** (small app: Win/mac/Linux; configure via dashboard at `http://localhost:8090`) | Your laptop/server |
| Cloud storage, SaaS | **External connections + sync configurations** (Zone API `external_connections`, `sync_config`); OAuth handled by the platform | In the platform, nothing installed |

## 3. Production best practices — the guardrails

**Security — layer defenses, never rely on one:**

- **Least-privilege keys.** Narrowest service-account role that works — SREADER for search
  frontends; SWRITER/SOWNER only for trusted ingestion backends. **Never ship a writer key to a
  browser** (the ARAG portal already keeps the API key server-side).
- **Rotate & revoke.** Keys expire ≤ 1095 days; rotate on a schedule, revoke a leaked key
  individually without disturbing others.
- **Constrain the surface.** `allowed_origins`, and `allowed_ip_addresses` for backend-only KBs.
- **Row-level security.** Tag resources with `access_groups`, pass the caller's security groups on
  every query, set `enforce_security` to make it mandatory.
- **Guard the pipeline.** Run `llama-guard` + `prompt-guard` ingestion agents on untrusted content
  so unsafe/injection material is flagged before it can reach an answer.

**Multi-tenancy & residency:**

| Model | How | Use when |
|---|---|---|
| **KB per tenant** | Own KB + keys per tenant | Few/sensitive tenants — isolation is structural, deleting a tenant = deleting a KB, per-tenant models/export |
| **Shared KB + security groups** | One KB, resources tagged with tenant `access_groups`, queries scoped by security | Many small low-risk tenants; **test the filter relentlessly — a bug here is a cross-tenant leak** |

Residency: put the KB in the zone closest to users **within** your data-residency rules; latency is
dominated by distance.

**Cost & tokens** — tight context is cheaper *and* better:

- `/ask` streaming **metadata** item reports input/output tokens per answer — log and aggregate it
  as a per-answer cost meter (also reports time-to-first-chunk).
- Keep `top_k` as low as quality allows; prefer `neighbouring_paragraphs` over `full_resource`.
- Route `generative_model` per request — cheap model for routine questions, strong one only when
  needed.
- Account-level **consumption controls** cap and monitor spend; alert before limits.
- **Bring your own provider** (Anthropic/Bedrock/Gemini) for high volume.

**Performance:** stream `/ask`; cache the cacheable (`catalog`, `suggest`, popular answers — don't
re-embed a query you just served); ingest async in batches, learn readiness via webhooks not polling.

**Reliability & correctness:**

- Treat **`no_context` as normal** — `/ask` says "no context" instead of hallucinating; handle that
  status in the UI (offer to broaden, or fall back to a Retrieval Agent with internet fallback).
- **Respect processing lag** — content isn't searchable the instant it's created; poll status or use
  webhooks before promising it's live.
- **Staged review** — enable hidden resources so new content is indexed but not answerable until
  approved.
- **Back up before destructive change** — deletion is irreversible and takes keys with it.
- **Monitor quality continuously** — sample REMi + watch feedback; regressions show up there first.

| **Key idea** | A production RAG system is judged on **trust**. Least privilege, tenant isolation, honest `no_context`, staged review, continuous evaluation — all exist to make answers something users can rely on. Speed and cost matter, but trust is the product. |
|---|---|

---
*Source: the practitioner's guide — Ch. 17 (Quality & Observability), Ch. 18 (Backups, Export/Import,
Sync Connectors), Ch. 19 (Production Best Practices). Hosts/auth cross-checked against
`docs/ARAG-REFERENCE.md`.*
