**PART 2 — AUTHENTICATION AND MANAGEMENT**

**Chapter 5\
Accounts, Zones, and Knowledge Box Management**

*Creating, configuring, and retiring Knowledge Boxes*

This chapter covers the administrative surface: how accounts and zones
frame everything, how to create and configure Knowledge Boxes, how to
choose models, and how to delete cleanly. These operations live on the
**Zone API** (https://\<zone\>.dp.progress.cloud) and, for account-wide
concerns, the **Global API**.

**Accounts and zones**

An **account** is your organization's boundary for billing, users, and
Knowledge Boxes. Each account has a stable id (UUID) and a
human-friendly slug. Most management URLs are scoped by account id:
/api/v1/account/{account_id}/....

A **zone** is a region your data can live in. Knowledge Boxes are
created within a specific zone and never move between zones. The zones
available during testing included Australia (aws-ap-southeast-2-1),
Europe (aws-eu-central-1-1 and europe-1), the USA (aws-us-east-2-1), and
Israel (aws-il-central-1-1). Choose based on data-residency requirements
and proximity to your users.

**Creating a Knowledge Box**

Creation requires only slug and title, but several optional fields let
you configure the Knowledge Box up front rather than patching it later.

| **Field** | **Type** | **Purpose** |
|----|----|----|
| slug | string (required) | Human-readable id, unique within the account |
| title | string (required) | Display name |
| description | string | Free-text description |
| mode | enum | Knowledge Box mode; immutable after creation |
| learning_configuration | object | Model choices — semantic, generative, NER, etc. |
| allowed_origins | array\<string\> | Web origins permitted to call the KB |
| allowed_ip_addresses | array\<string\> | Source IPs permitted to call the KB |
| external_index_provider | object | Use an external vector index instead of the built-in one |
| enforce_security | boolean | Require resource security groups on every request |

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/kbs" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" -H "Content-Type:
application/json" \<br />
-d '{<br />
"slug": "support-kb",<br />
"title": "Customer Support KB",<br />
"description": "Public help-centre content",<br />
"learning_configuration": { "generative_model": "chatgpt-azure-4o"
}<br />
}'<br />
# -&gt; 201 { "id": "e3bb0d28-3821-44a4-8948-fe511f48aa42" }</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Inspecting and changing configuration**

Two different views of a Knowledge Box matter. The **management view**
(Zone API) shows account context, security, and top-level settings. The
**learning configuration** (NucliaDB API, GET /kb/{kbid}/configuration)
shows the models actually in force. Here is the real learning
configuration of the sandbox as returned by the platform:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>{<br />
"semantic_model": "multilingual-2024-05-06",<br />
"semantic_vector_size": 1024,<br />
"semantic_vector_similarity": "DOT",<br />
"semantic_threshold": 0.4,<br />
"generative_model": "chatgpt-azure-4o",<br />
"ner_model": "multilingual",<br />
"relation_model": "base",<br />
"anonymization_model": "disabled",<br />
"visual_labeling": "disabled",<br />
"summary_model": "chatgpt-azure-4o",<br />
"summary": "simple"<br />
}</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Change configuration with a PATCH. Model changes take effect for
subsequent operations; changing the semantic model is where vectorsets
(Chapter 2) matter, because existing vectors were produced by the old
model.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p># Change the generative model (Zone API, management)<br />
curl -X PATCH
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/kb/$KB" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" -H "Content-Type:
application/json" \<br />
-d
'{"learning_configuration":{"generative_model":"chatgpt-azure-4o"}}'<br />
<br />
# Or with the CLI against the learning configuration directly<br />
nuclia kb set_configuration --generative_model=chatgpt-azure-4o</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Choosing models**

Two model choices dominate answer quality: the **semantic model** (which
embedding model indexes and matches meaning) and the **generative
model** (which LLM writes answers).

**Semantic models**

The platform offers English-optimized and multilingual embedding models.
The sandbox defaulted to multilingual-2024-05-06 (1024-dimensional,
dot-product similarity). Pick a multilingual model if your content or
your users span languages; pick an English model for best quality on
English-only corpora. You can query the available options from the
Predict service.

**Generative models**

The generative model is any LLM the platform supports — during authoring
the default was chatgpt-azure-4o, and the platform's model lineup also
includes Anthropic Claude models, Llama, and Azure Mistral, among
others. You can also **bring your own** provider account (Anthropic, AWS
Bedrock, Google Gemini) so that generation runs under your own contract
and keys — configured through the learning configuration's user_keys.

| **Tip** Set the generative model per Knowledge Box, but override it per request when needed: /ask accepts a generative_model parameter, so you can route hard questions to a stronger model and routine ones to a cheaper model without reconfiguring the KB. |
|----|

**Listing, and deleting cleanly**

List every Knowledge Box in an account with GET
/api/v1/account/{account}/kbs. Deletion is permanent and removes all
content and indexes, so it is the one management call to guard
carefully.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p># List<br />
curl "https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/kbs"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"<br />
<br />
# Delete (irreversible)<br />
curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/kb/$KB" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

| **Warning** Deletion cannot be undone, and it takes the KB's service accounts and API keys with it. For anything you might need to restore, take a backup first (Chapter 17) — enterprise accounts can create backup/restore Knowledge Boxes. |
|----|

**Management operations at a glance**

The Zone API exposes the full administrative surface for a Knowledge
Box. The most useful:

| **Operation** | **Endpoint** |
|----|----|
| Create KB | POST /api/v1/account/{account}/kbs |
| Get / modify / delete KB | GET\|PATCH\|DELETE /api/v1/account/{account}/kb/{kb} |
| List KBs | GET /api/v1/account/{account}/kbs |
| Service accounts | GET\|POST /.../kb/{kb}/service_accounts |
| API keys | POST /.../service_account/{sa}/keys, DELETE .../key/{id} |
| Invite users to a KB | POST /.../kb/{kb}/invite |
| KB permissions / users | GET /.../kb/{kb}/permissions, GET\|PATCH /.../kb/{kb}/users |
| Activity logs | POST /api/v1/kb/{kb}/activity/{event_type}/query (needs user/PAT) |

| **Gotcha — tested** Activity-log endpoints reject NUA keys with NuaKeyUser cannot access context of type ActivityLogsAPI. Reading activity logs requires a user token or PAT, even though the same NUA key can create and delete the Knowledge Box itself. Chapter 16 covers observability with the right credential. |
|----|
