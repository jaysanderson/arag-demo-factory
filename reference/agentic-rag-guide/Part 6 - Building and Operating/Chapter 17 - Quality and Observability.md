**PART 6 — BUILDING AND OPERATING**

**Chapter 17\
Quality and Observability**

*Measuring whether your RAG is actually good, and watching it in
production*

A RAG system can return fluent answers that are subtly wrong, and you
will not know unless you measure. This chapter covers the three tools
the platform gives you to keep quality honest: REMi evaluation metrics,
user feedback capture, and activity logs.

**REMi: evaluating the RAG triad**

**REMi** (RAG Evaluation Metrics) is a model built by the platform to
score the quality of a RAG interaction along the classic *RAG triad*:

| **Metric** | **Question it answers** |
|----|----|
| Answer Relevance | Is the generated answer relevant to the user's query? |
| Context Relevance | Was the retrieved context relevant to the query? |
| Groundedness | Is the answer actually supported by the retrieved context? |

These three localize failure. Low *context relevance* means retrieval is
the problem — revisit chunking, filters, or the semantic model. High
context relevance but low *groundedness* means the model is drifting
from its evidence — tighten the prompt or lower max_tokens. Low *answer
relevance* with good grounding means the question was misread — look at
rephrasing. REMi is available through the NUA API and, per the platform,
its logs are downloadable for quality monitoring.

| **Tip** Sample, score, and track over time rather than scoring every call. Run REMi on a rolling sample of production interactions and watch the three metrics as a dashboard; a sudden drop in groundedness after a content or model change is exactly the signal you want to catch before users do. |
|----|

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p># REMi is exposed via the NUA API; the Python SDK wraps it.<br />
# It needs both the KB endpoint/key and a NUA key, since evaluation runs
in NUA.<br />
pip install nuclia</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Capturing user feedback**

The /feedback endpoint records a user's verdict on an answer — thumbs
up/down and optional text — tied to the interaction. A live call
succeeded with a simple body:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST "https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/feedback"
\<br />
-H "Authorization: Bearer $KEY" -H "Content-Type: application/json"
\<br />
-d
'{"ident":"&lt;answer-ident&gt;","good":true,"task":"CHAT","feedback":"exactly
right"}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Feed this back into your evaluation loop: the interactions users flag as
bad are the highest-value inputs to a REMi review and to tuning your
prompts and chunking. Wire a feedback control into every answer surface
— it is the cheapest quality signal you will ever get.

**Activity logs**

Activity logs are the audit trail of a Knowledge Box: resources
processed, created, and edited; questions and generative answers;
queries; and user feedback. They are how you monitor usage,
troubleshoot, and satisfy compliance. Query them per event type:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/activity/visited/query"
\<br />
-H "Authorization: Bearer $PAT" -H "Content-Type: application/json"
\<br />
-d '{"year_month":"2026-07"}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

| **Gotcha — tested** Activity-log endpoints reject NUA keys — a live call returned NuaKeyUser cannot access context of type ActivityLogsAPI (and the metrics variant, ActivityLogsMetricsAPI). Read activity logs with a **user token or PAT**, not the NUA key or the KB service-account key. This surprises people because the same NUA key can create the very Knowledge Box whose logs it cannot read. |
|----|

The platform also surfaces activity logs in the dashboard UI, and — as
noted in its own change log — REMi logs are downloadable, so quality and
usage data can flow into your own analytics stack.
