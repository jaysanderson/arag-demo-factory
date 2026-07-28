**PART 7 — REFERENCE APPENDIX**

**Appendix C — Zone API Reference**

*Managing Knowledge Boxes, keys, and connectors within a zone, fully
expanded*

The Regional Manager: KB lifecycle, service accounts/keys, connectors,
backups, activity logs.

**57 operations** in **11 groups**, generated from the official zone v1
OpenAPI specification. Served from https://\<zone\>.dp.progress.cloud;
authorized with a management credential (a NUA key with
allow_kb_management, or a user token / PAT). Every request-body field,
parameter, and response is listed; object-typed fields reference named
schemas documented in full in Appendix F (Schema Catalog).

**Internal Sync Configs (1)**

**DELETE /api/internal/kb/{kb_id}/sync_configs**

Delete All Configs

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kb_id    | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/internal/kb/$KB/sync_configs"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 204        |                     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**Backups (4)**

**DELETE /api/v1/account/{account_id}/backup/{backup_id}**

Delete

Delete knowledgebox backup

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| account_id | path   | string   | yes     |                 |
| backup_id  | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/backup/{backup_id}"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 204        |                     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /api/v1/account/{account_id}/backup/{backup_id}/restore**

Restore

Restore a backup into a new knowledgebox

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| account_id | path   | string   | yes     |                 |
| backup_id  | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| slug | string | yes |  | The slug of the new restored knowledgebox. |
| title | string | yes |  | The title of the new restored knowledgebox. |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/backup/{backup_id}/restore"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"slug": "my-resource",<br />
"title": "My title"<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 201        | ItemCreated         | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /api/v1/account/{account_id}/backups**

List

Get all backups from an account in a region

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| account_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/backups"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**              | **Description**     |
|------------|-------------------------|---------------------|
| 200        | array\<BackupResponse\> | Successful Response |
| 422        | HTTPValidationError     | Validation Error    |

**POST /api/v1/account/{account_id}/backups**

Create

Create knowledgebox backup

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| account_id | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| kb_id | string | yes |  | The unique identifier of the knowledgebox to backup. |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/backups"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"kb_id": "string"<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**           | **Description**     |
|------------|----------------------|---------------------|
| 201        | BackupCreateResponse | Successful Response |
| 422        | HTTPValidationError  | Validation Error    |

**Knowledge Boxes (9)**

**GET /api/v1/account/{account_id}/kb/{kb_id}**

Get Knowledge Box

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| account_id | path   | string   | yes     |                 |
| kb_id      | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/kb/$KB" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | KnowledgeBox        | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**PATCH /api/v1/account/{account_id}/kb/{kb_id}**

Modify Knowledge Box

Modifies an existing Knowledge Box.

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| account_id | path   | string   | yes     |                 |
| kb_id      | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| slug | string \| null |  |  |  |
| title | string \| null |  |  |  |
| state | KbState \| null |  |  |  |
| description | string \| null |  |  |  |
| allowed_origins | array\<string\> \| null |  |  |  |
| allowed_ip_addresses | array\<string\> \| null |  |  |  |
| search_configs | object (free-form map) \| null |  |  |  |
| enforce_security | boolean \| null |  |  | Whether security is enforced by default on all requests to this Knowledge Box. Leaving this as None means no change, while setting it to True or False will update the setting accordingly. |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PATCH
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/kb/$KB" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**             | **Description**     |
|------------|------------------------|---------------------|
| 200        | object (free-form map) | Successful Response |
| 422        | HTTPValidationError    | Validation Error    |

**DELETE /api/v1/account/{account_id}/kb/{kb_id}**

Delete Knowledge Box

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| account_id | path   | string   | yes     |                 |
| kb_id      | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/kb/$KB" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 204        |                     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /api/v1/account/{account_id}/kb/{kb_id}/ephemeral_tokens**

Create Ephemeral Token

Create an ephemeral token to access the Knowledge Box

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| account_id | path   | string   | yes     |                 |
| kb_id      | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/kb/$KB/ephemeral_tokens"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**             | **Description**     |
|------------|------------------------|---------------------|
| 201        | EphemeralTokenResponse | Successful Response |
| 422        | HTTPValidationError    | Validation Error    |

**GET /api/v1/account/{account_id}/kb/{kb_id}/logo.png**

Download Logo

Knowledge Box logo

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| account_id | path   | string   | yes     |                 |
| kb_id      | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/kb/$KB/logo.png"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        |                     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /api/v1/account/{account_id}/kb/{kb_id}/permissions**

Get Knowledge Box Permissions

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| account_id | path   | string   | yes     |                 |
| kb_id      | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/kb/$KB/permissions"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | PermissionsResponse | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /api/v1/account/{account_id}/kbs**

List Knowledge Boxes

List all region Knowledge Boxes that belongs to an specific account that
the authenticated user can see

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| account_id | path | string | yes |  |
| mode | query | enum(kb, agent, agent_no_memory, agents) |  | Optional mode filter. 'kb' for standard KBs, 'agent' for agents with memory, 'agentnomemory' for agents without memory, 'agents' for all agent types (… |
| include_search_configs | query | boolean |  | Whether to include searchconfigs in the response. Set to false to reduce payload size. |

**Example** — a real call captured against the live sandbox:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/kbs" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Response:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>[<br />
{<br />
"id": "c610a68a-492a-499b-acc2-7ea27928f7ba",<br />
"slug": "ironbark-mutual-demo",<br />
"zone": "aws-ap-southeast-2-1",<br />
"title": "Ironbark Mutual - A Day on ARAG (synthetic insurance
demo)",<br />
"state": "PRIVATE",<br />
"description": null,<br />
"role_on_kb": null,<br />
"allowed_origins": null,<br />
"allowed_ip_addresses": null,<br />
"search_configs": {},<br />
"external_index_provider": null,<br />
"hidden_resources_enabled": false,<br />
"hidden_resources_hide_on_creation": false,<br />
"prewarm_enabled": false,<br />
"enforce_security": false<br />
},<br />
{<br />
"id": "d6169de1-831b-4d1a-b0c7-1d924cc000a9",<br />
"slug": "factory-dam",<br />
"zone": "aws-ap-southeast-2-1",<br />
"title": "Factory Asset DAM",<br />
"state": "PRIVATE",<br />
"description": null,<br />
"role_on_kb": null,<br />
"allowed_origins": null,<br />
"allowed_ip_addresses": null,<br />
"search_configs": {},<br />
"external_index_provider": nu<br />
... (truncated)</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**                   | **Description**     |
|------------|------------------------------|---------------------|
| 200        | array\<KnowledgeBoxSummary\> | Successful Response |
| 422        | HTTPValidationError          | Validation Error    |

**POST /api/v1/account/{account_id}/kbs**

Create Knowledge Box

Creates a new Knowledge Box. The accepted values for the
learningconfiguration are dynamic and may be dependant of the account
used. Accepted field values needs to be checked on the 'Learning
configuration schema' endpoint

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| account_id | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| slug | string | yes |  |  |
| title | string | yes |  |  |
| description | string \| null |  |  |  |
| mode | KBMode |  | kb | Mode of the Knowledge Box (immutable after creation). 'kb': Standard KB with NucliaDB storage. 'agent': Agent with memory backed by NucliaDB. 'agentnomemory': Agent without memory (no NucliaDB KB crea… |
| learning_configuration | object (free-form map) |  |  |  |
| allowed_origins | array\<string\> \| null |  |  |  |
| allowed_ip_addresses | array\<string\> \| null |  |  |  |
| external_index_provider | DummyKBIndexProvider \| null |  |  | External index provider configuration for the Knowledge Box. If not set, the default NucliaDB's index will be used. |
| search_configs | object (free-form map) |  | {} |  |
| enforce_security | boolean |  | False | Whether security is enforced by default on all requests to this Knowledge Box. |

**Example** — a real call captured against the live sandbox:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/kbs" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"slug": "arag-book-sandbox",<br />
"title": "ARAG Book Sandbox (safe to delete)",<br />
"description": "Throwaway KB for live-testing while writing the
book."<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Response:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>{<br />
"id": "$KB"<br />
}</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 201        | ItemCreated         | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /api/v1/ephemeral_token**

Create Ephemeral Token From Sa

Create an ephemeral token scoped to a Knowledge Box (service account) or
a path (OAuth user)

**Request body** — application/json (required)

| **Field**     | **Type**        | **Req** | **Default** | **Description** |
|---------------|-----------------|---------|-------------|-----------------|
| agent_session | string \| null  |         |             |                 |
| path          | string \| null  |         |             |                 |
| ttl           | integer \| null |         |             |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST "https://$ZONE.dp.progress.cloud/api/v1/ephemeral_token"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**             | **Description**     |
|------------|------------------------|---------------------|
| 201        | EphemeralTokenResponse | Successful Response |
| 422        | HTTPValidationError    | Validation Error    |

**Invites (3)**

**POST /api/v1/account/{account_id}/kb/{kb_id}/invite**

Invite To Knowledge Box

Send an invitation to join a Knowledge Box via email.

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| account_id | path   | string   | yes     |                 |
| kb_id      | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type**       | **Req** | **Default** | **Description** |
|-----------|----------------|---------|-------------|-----------------|
| email     | string         | yes     |             |                 |
| role      | KbRole         | yes     |             |                 |
| came_from | string \| null |         |             |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/kb/$KB/invite"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"email": "user@example.com",<br />
"role": "SOWNER"<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 204        |                     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**DELETE /api/v1/account/{account_id}/kb/{kb_id}/invite**

Delete Invite

Invalidate an invite to join a Knowledge Box

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| account_id | path   | string   | yes     |                 |
| kb_id      | path   | string   | yes     |                 |
| email      | query  | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/kb/$KB/invite"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 204        |                     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /api/v1/account/{account_id}/kb/{kb_id}/invites**

Invited Users

List of users invited to a Knowledge Box, but not yet joined

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| account_id | path   | string   | yes     |                 |
| kb_id      | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/kb/$KB/invites"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**             | **Description**     |
|------------|------------------------|---------------------|
| 200        | array\<KbInvitedUser\> | Successful Response |
| 422        | HTTPValidationError    | Validation Error    |

**API Keys (7)**

**DELETE
/api/v1/account/{account_id}/kb/{kb_id}/service_account/{sa_id}**

Delete Service Account

Delete a new Service Account for a Knowledge Box

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| account_id | path   | string   | yes     |                 |
| kb_id      | path   | string   | yes     |                 |
| sa_id      | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/kb/$KB/service_account/{sa_id}"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 204        |                     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**DELETE
/api/v1/account/{account_id}/kb/{kb_id}/service_account/{sa_id}/key/{sa_key_id}**

Delete Api Key

Delete an API Key of a Knowledge Box

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| account_id | path   | string   | yes     |                 |
| kb_id      | path   | string   | yes     |                 |
| sa_id      | path   | string   | yes     |                 |
| sa_key_id  | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/kb/$KB/service_account/{sa_id}/key/{sa_key_id}"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 204        |                     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST
/api/v1/account/{account_id}/kb/{kb_id}/service_account/{sa_id}/keys**

Add Service Account Key

Create an API Key for a Service Account of a Knowledge Box

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| account_id | path   | string   | yes     |                 |
| kb_id      | path   | string   | yes     |                 |
| sa_id      | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| expires   | string   | yes     |             |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/kb/$KB/service_account/{sa_id}/keys"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"expires": "string"<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 201        | ServiceAccountJWT   | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /api/v1/account/{account_id}/kb/{kb_id}/service_accounts**

List Service Accounts

List of Service Accounts of a Knowledge Box

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| account_id | path   | string   | yes     |                 |
| kb_id      | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/kb/$KB/service_accounts"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**              | **Description**     |
|------------|-------------------------|---------------------|
| 200        | array\<ServiceAccount\> | Successful Response |
| 422        | HTTPValidationError     | Validation Error    |

**POST /api/v1/account/{account_id}/kb/{kb_id}/service_accounts**

Add Service Account

Create a new Service Account for a Knowledge Box

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| account_id | path   | string   | yes     |                 |
| kb_id      | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| title     | string   | yes     |             |                 |
| role      | KbRole   | yes     |             |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/kb/$KB/service_accounts"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"title": "My title",<br />
"role": "SOWNER"<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 201        | ItemCreated         | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /api/v1/service_account_agent_key**

Create Temporal Agent Key

Creates a temporal key to use an agent session

**Request body** — application/json (required)

| **Field**     | **Type** | **Req** | **Default** | **Description** |
|---------------|----------|---------|-------------|-----------------|
| agent_session | string   | yes     |             |                 |
| ttl           | integer  |         | 10          |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/service_account_agent_key"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"agent_session": "string",<br />
"ttl": 10<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**                    | **Description**     |
|------------|-------------------------------|---------------------|
| 201        | TemporalSecurityTokenResponse | Successful Response |
| 422        | HTTPValidationError           | Validation Error    |

**POST /api/v1/service_account_temporal_key**

Create Temporal Secure Token

Creates a temporal key for a service account. The key accepts

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/service_account_temporal_key"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"ttl": 10<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**                    | **Description**     |
|------------|-------------------------------|---------------------|
| 201        | TemporalSecurityTokenResponse | Successful Response |
| 422        | HTTPValidationError           | Validation Error    |

**Users (2)**

**GET /api/v1/account/{account_id}/kb/{kb_id}/users**

Users

List of users of a Knowledge Box

**Parameters**

| **Name**            | **In** | **Type** | **Req** | **Description** |
|---------------------|--------|----------|---------|-----------------|
| account_id          | path   | string   | yes     |                 |
| kb_id               | path   | string   | yes     |                 |
| include_user_detail | query  | boolean  |         |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/kb/$KB/users"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | array\<KbUser\>     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**PATCH /api/v1/account/{account_id}/kb/{kb_id}/users**

Update Users

Assign or remove users from a Knowledge Box

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| account_id | path   | string   | yes     |                 |
| kb_id      | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type**                      | **Req** | **Default** | **Description** |
|-----------|-------------------------------|---------|-------------|-----------------|
| add       | array\<AddKbUser\> \| null    |         |             |                 |
| update    | array\<UpdateKbUser\> \| null |         |             |                 |
| delete    | array\<string\> \| null       |         |             |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PATCH
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/kb/$KB/users"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 204        |                     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**NUA Keys (6)**

**GET /api/v1/account/{account_id}/nua_client/{client_id}**

Get Nua Client By Id

Gets the metadata of an existing Nuclia Understanding API

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| account_id | path   | string   | yes     |                 |
| client_id  | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/nua_client/{client_id}"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | NUAClientMetadata   | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**PATCH /api/v1/account/{account_id}/nua_client/{client_id}**

Update Nua Client By Id

Updates an existing Nuclia Understanding API client

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| account_id | path   | string   | yes     |                 |
| client_id  | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field**    | **Type**        | **Req** | **Default** | **Description** |
|--------------|-----------------|---------|-------------|-----------------|
| tokens_limit | integer \| null |         |             |                 |
| title        | string \| null  |         |             |                 |
| contact      | string \| null  |         |             |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PATCH
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/nua_client/{client_id}"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | NUAClientMetadata   | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**DELETE /api/v1/account/{account_id}/nua_client/{client_id}**

Delete Nua Client By Id

Deletes an existing Nuclia Understanding API client

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| account_id | path   | string   | yes     |                 |
| client_id  | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/nua_client/{client_id}"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 204        |                     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**PUT /api/v1/account/{account_id}/nua_client/{client_id}/key**

Set Account Nua Client Key

Recreates a new session key for an existing Nuclia Understanding API
client

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| account_id | path   | string   | yes     |                 |
| client_id  | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PUT
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/nua_client/{client_id}/key"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 201        | NUAClient           | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /api/v1/account/{account_id}/nua_clients**

Get Account Nua Clients

Gets the list of Nuclia Understanding API clients of an account

**Parameters**

| **Name**   | **In** | **Type**       | **Req** | **Description** |
|------------|--------|----------------|---------|-----------------|
| account_id | path   | string         | yes     |                 |
| client_id  | query  | string \| null |         |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/nua_clients"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | NUAClientsMetadata  | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /api/v1/account/{account_id}/nua_clients**

Create Account Nua Client

Create a new Nuclia Understanding API client for an account

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| account_id | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| contact | string | yes |  |  |
| title | string | yes |  |  |
| description | string \| null |  |  |  |
| client_id | string \| null |  |  |  |
| processing_webhook | ProcessingWebhook \| null |  |  |  |
| allow_kb_management | boolean |  | False |  |
| tokens_limit | integer \| null |  |  |  |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/nua_clients"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"contact": "string",<br />
"title": "My title",<br />
"allow_kb_management": false<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 201        | NUAClient           | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**Knowledgebox activity (8)**

**GET /api/v1/kb/{kb_id}/activity/download_request/{request_id}**

Get Download Status

Get the status of a download request by Knowledgebox ID and request ID

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| kb_id      | path   | string   | yes     |                 |
| request_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/activity/download_request/{request_id}"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | DownloadRequest     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /api/v1/kb/{kb_id}/activity/metrics**

Activity Logs Metrics

Get metrics for search and ask logs

**Parameters**

| **Name**    | **In** | **Type**       | **Req** | **Description** |
|-------------|--------|----------------|---------|-----------------|
| kb_id       | path   | string         | yes     |                 |
| aggregation | query  | Aggregation    |         |                 |
| from        | query  | string         | yes     |                 |
| to          | query  | string \| null |         |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/activity/metrics" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**                     | **Description**     |
|------------|--------------------------------|---------------------|
| 200        | array\<ActivityUsageResponse\> | Successful Response |
| 422        | HTTPValidationError            | Validation Error    |

**GET /api/v1/kb/{kb_id}/activity/{event_type}/months**

Get Knowledgebox Activity Downloads List

Get the list of monthly activity audit files available to download

**Parameters**

| **Name**   | **In** | **Type**  | **Req** | **Description** |
|------------|--------|-----------|---------|-----------------|
| kb_id      | path   | string    | yes     |                 |
| event_type | path   | EventType | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/activity/{event_type}/months"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | EventDownloadsList  | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /api/v1/kb/{kb_id}/activity/{event_type}/query**

Query Knowledgebox Activity Logs

**Parameters**

| **Name**   | **In** | **Type**  | **Req** | **Description** |
|------------|--------|-----------|---------|-----------------|
| kb_id      | path   | string    | yes     |                 |
| event_type | path   | EventType | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/activity/{event_type}/query"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"year_month": "string",<br />
"filters": {}<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**               |
|------------|---------------------|-------------------------------|
| 200        | object              | Returns data in NDJSON format |
| 422        | HTTPValidationError | Validation Error              |

**POST /api/v1/kb/{kb_id}/activity/{event_type}/query/download**

Request The Preparation Of Knowledgebox Activity Logs Download

Request Knowledgebox Activity Logs download

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kb_id | path | string | yes |  |
| event_type | path | EventType | yes |  |
| accept | header | enum(application/x-ndjson, text/csv) | yes |  |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/activity/{event_type}/query/download"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"year_month": "string",<br />
"filters": {},<br />
"notify_via_email": false<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 202        | DownloadRequest     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /api/v1/kb/{kb_id}/remi/query**

Query Rag Requests By Scores

Get a list of rag request that matches a remi scores query

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kb_id    | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| context_relevance | ContextRelevanceQuery \| null |  |  |  |
| month | string | yes |  |  |
| from_date | string \| null |  |  |  |
| to_date | string \| null |  |  |  |
| feedback_good | boolean \| null |  |  |  |
| status | Status \| null |  |  |  |
| pagination | Pagination |  | {'limit': 10} |  |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/remi/query" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"month": "string"<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | RemiQueryResults    | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /api/v1/kb/{kb_uuid}/remi/events/{event_id}**

Get A Rag Request With Related Remi Scores And Full Context

Get a rag request with full context and REMI scores. Intended for
obtaining complete context for an item originating from a /remi/query

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kb_uuid  | path   | string   | yes     |                 |
| event_id | path   | integer  | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/remi/events/{event_id}"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**                 | **Description**     |
|------------|----------------------------|---------------------|
| 200        | RemiQueryResultWithContext | Successful Response |
| 422        | HTTPValidationError        | Validation Error    |

**GET /api/v1/kb/{kb_uuid}/remi/scores**

Aggregated Remi Scores Across Time

Get the evolution of remi scores of a kb on a period of time

**Parameters**

| **Name**    | **In** | **Type**       | **Req** | **Description** |
|-------------|--------|----------------|---------|-----------------|
| kb_uuid     | path   | string         | yes     |                 |
| aggregation | query  | Aggregation    |         |                 |
| from        | query  | string         | yes     |                 |
| to          | query  | string \| null |         |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/remi/scores" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**                         | **Description**     |
|------------|------------------------------------|---------------------|
| 200        | array\<AggregatedRemiScoreMetric\> | Successful Response |
| 422        | HTTPValidationError                | Validation Error    |

**External Connections (7)**

**GET /api/v1/kb/{kb_id}/external_connection/{connection_id}**

Get External Connection

**Parameters**

| **Name**      | **In** | **Type** | **Req** | **Description** |
|---------------|--------|----------|---------|-----------------|
| kb_id         | path   | string   | yes     |                 |
| connection_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/external_connection/{connection_id}"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**               | **Description**     |
|------------|--------------------------|---------------------|
| 200        | ExternalConnectionOutput | Successful Response |
| 422        | HTTPValidationError      | Validation Error    |

**DELETE /api/v1/kb/{kb_id}/external_connection/{connection_id}**

Delete External Connection

**Parameters**

| **Name**      | **In** | **Type** | **Req** | **Description** |
|---------------|--------|----------|---------|-----------------|
| kb_id         | path   | string   | yes     |                 |
| connection_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/external_connection/{connection_id}"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 204        |                     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /api/v1/kb/{kb_id}/external_connection/{connection_id}/browse**

Browse Storage

Browse cloud storage to discover sites, drives and folders. Use this
endpoint to help users select a drive and folder path when creating a
sync configuration. SharePoint/OneDrive flow (OAuth): 1. Resolve site
URL: use the /resolvesite endpoint with a site URL → get siteid 2. List
drives in a site: provide siteid → returns drives for that site - Use
siteid=me for personal OneDrive (OAuth only) 3. L…

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kb_id | path | string | yes |  |
| connection_id | path | string | yes |  |
| site_search | query | string \| null |  | Search query for SharePoint sites. Only supported for certificate auth connections. For OAuth, use the /resolvesite endpoint instead. |
| site_id | query | string \| null |  | Microsoft Graph site ID to list drives for. Must be in the format 'hostname,site-collection-id,web-id' (e.g. 'contoso.sharepoint.com,\<guid\>,\<guid\>'). … |
| drive_id | query | string \| null |  | Drive ID to browse folders in. |
| path | query | string \| null |  | Folder path to list within the drive. Cannot be combined with folderid. |
| folder_id | query | string \| null |  | Folder ID to list contents of. Cannot be combined with path. |
| page_token | query | string \| null |  | Pagination token |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/external_connection/{connection_id}/browse"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | BrowseStorageOutput | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET
/api/v1/kb/{kb_id}/external_connection/{connection_id}/resolve_site**

Resolve Site

Resolve a SharePoint site URL to its site ID, or return the OneDrive
site. Given a full SharePoint site URL, this endpoint returns the site
ID, name, and web URL. The returned site ID can then be used with the
/browse endpoint to list drives for that site. This endpoint works with
the Sites.Selected permission scope, as long as the specific site has
been granted access to the application. For azur…

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kb_id | path | string | yes |  |
| connection_id | path | string | yes |  |
| site_url | query | string | yes | Full SharePoint site URL to resolve, or 'me'/'onedrive' for personal OneDrive. Examples: (see docs) me, onedrive. Passing 'me' or 'onedrive' is only s… |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/external_connection/{connection_id}/resolve_site"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | StorageSiteOutput   | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /api/v1/kb/{kb_id}/external_connections**

List External Connections

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kb_id    | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/external_connections"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**                        | **Description**     |
|------------|-----------------------------------|---------------------|
| 200        | array\<ExternalConnectionOutput\> | Successful Response |
| 422        | HTTPValidationError               | Validation Error    |

**POST /api/v1/kb/{kb_id}/external_connections**

Create External Connection

Create an external connection for cloud storage sync. For OAuth
providers (googleoauth, azureoauth, sharefileoauth): - Only provider is
required in the request body - Returns an authorizeurl that the user
should visit to complete the OAuth flow - After successful
authorization, an ExternalConnection will be created - Returns HTTP 200
For awss3assumerole: - Both provider and credentials are require…

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kb_id    | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| provider | Provider | yes |  |  |
| credentials | AWSS3AssumeRoleCredentials \| AzureCertificateCredentials \| null |  |  |  |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/external_connections"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"provider": "google_oauth"<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema** | **Description** |
|----|----|----|
| 200 | AuthorizeUrlOutput | OAuth authorization URL (for OAuth providers) |
| 201 | ExternalConnectionOutput | Created external connection (for access key providers) |
| 422 | HTTPValidationError | Validation Error |

**GET /api/v1/kb/{kb_id}/external_connections/s3/assume_role_info**

Get S3 Assume Role Info

Returns the AWS assume-role information that a client needs to create an
IAM role in their own AWS account for cross-account S3 access. The
client should use the returned externalid, rolename, and awsaccountid to
configure the IAM role trust policy.

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kb_id    | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/external_connections/s3/assume_role_info"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**             | **Description**     |
|------------|------------------------|---------------------|
| 200        | S3AssumeRoleInfoOutput | Successful Response |
| 422        | HTTPValidationError    | Validation Error    |

**Sync Configs (7)**

**GET /api/v1/kb/{kb_id}/sync_config/{config_id}**

Get Config

**Parameters**

| **Name**  | **In** | **Type** | **Req** | **Description** |
|-----------|--------|----------|---------|-----------------|
| kb_id     | path   | string   | yes     |                 |
| config_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/sync_config/{config_id}"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | SyncConfigOutput    | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**PATCH /api/v1/kb/{kb_id}/sync_config/{config_id}**

Update Config

**Parameters**

| **Name**  | **In** | **Type** | **Req** | **Description** |
|-----------|--------|----------|---------|-----------------|
| kb_id     | path   | string   | yes     |                 |
| config_id | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string \| null |  |  |  |
| file_filter | FileFilterInput \| null |  |  |  |
| labels | array\<LabelInput\> \| null |  |  |  |
| modified_time_range | ModifiedTimeRangeInput \| null |  |  |  |
| extract_strategy | string \| null |  |  |  |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PATCH
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/sync_config/{config_id}"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | SyncConfigOutput    | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**DELETE /api/v1/kb/{kb_id}/sync_config/{config_id}**

Delete Config

**Parameters**

| **Name**  | **In** | **Type** | **Req** | **Description** |
|-----------|--------|----------|---------|-----------------|
| kb_id     | path   | string   | yes     |                 |
| config_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/sync_config/{config_id}"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 204        |                     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /api/v1/kb/{kb_id}/sync_config/{config_id}/authorize**

Get Authorize Url

**Parameters**

| **Name**  | **In** | **Type** | **Req** | **Description** |
|-----------|--------|----------|---------|-----------------|
| kb_id     | path   | string   | yes     |                 |
| config_id | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field**           | **Type**       | **Req** | **Default** | **Description** |
|---------------------|----------------|---------|-------------|-----------------|
| widget_redirect_url | string \| null |         |             |                 |
| rao_redirect_url    | string         | yes     |             |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/sync_config/{config_id}/authorize"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"rao_redirect_url": "https://example.com"<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | AuthorizeUrlOutput  | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /api/v1/kb/{kb_id}/sync_config/{config_id}/validate_resources**

Validate Resources

Validate that the user has read access to the specified resources. This
endpoint checks if the provided credentials have access to the
files/items specified in the request. The provider is determined from
the sync config. Credentials must be encrypted using the same encryption
key used for external connections. Args: kbid: The knowledge base ID.
configid: The sync config ID (determines the provide…

**Parameters**

| **Name**  | **In** | **Type** | **Req** | **Description** |
|-----------|--------|----------|---------|-----------------|
| kb_id     | path   | string   | yes     |                 |
| config_id | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field**   | **Type**                    | **Req** | **Default** | **Description** |
|-------------|-----------------------------|---------|-------------|-----------------|
| credentials | string                      | yes     |             |                 |
| resources   | array\<ResourceIdentifier\> | yes     |             |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/sync_config/{config_id}/validate_resources"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"credentials": "string",<br />
"resources": [<br />
{<br />
"file_id": "string"<br />
}<br />
]<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**               | **Description**     |
|------------|--------------------------|---------------------|
| 200        | ResourceValidationOutput | Successful Response |
| 422        | HTTPValidationError      | Validation Error    |

**GET /api/v1/kb/{kb_id}/sync_configs**

List Configs

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kb_id    | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/sync_configs" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**                | **Description**     |
|------------|---------------------------|---------------------|
| 200        | array\<SyncConfigOutput\> | Successful Response |
| 422        | HTTPValidationError       | Validation Error    |

**POST /api/v1/kb/{kb_id}/sync_configs**

Add Config

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kb_id    | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string | yes |  |  |
| sync_root_path | string \| null |  |  |  |
| folder_id | string \| null |  |  |  |
| external_connection_id | string | yes |  |  |
| drive_id | string \| null |  |  |  |
| file_filter | FileFilterInput \| null |  |  |  |
| labels | array\<LabelInput\> \| null |  |  |  |
| modified_time_range | ModifiedTimeRangeInput \| null |  |  |  |
| extract_strategy | string \| null |  |  |  |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/sync_configs" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"name": "string",<br />
"external_connection_id": "string"<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 201        | SyncConfigOutput    | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**Sync Jobs (3)**

**GET /api/v1/kb/{kb_id}/sync_config/{config_id}/jobs**

List Jobs

List sync jobs for a sync config with cursor-based pagination. Use the
nextcursor from the response to fetch the next page of results.

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kb_id | path | string | yes |  |
| config_id | path | string | yes |  |
| limit | query | integer |  | Maximum number of jobs to return (1-100) |
| cursor | query | string \| null |  | Pagination cursor from previous response to fetch next page |
| order | query | SortOrder |  | Sort order by creation time: 'desc' (newest first) or 'asc' (oldest first) |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/sync_config/{config_id}/jobs"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**              | **Description**     |
|------------|-------------------------|---------------------|
| 200        | PaginatedSyncJobsOutput | Successful Response |
| 422        | HTTPValidationError     | Validation Error    |

**POST /api/v1/kb/{kb_id}/sync_config/{config_id}/sync**

Trigger Sync

Trigger an immediate sync for a sync config. Creates a new pending sync
job that will be processed by the sync job runner. Returns 409 Conflict
if there's already an active (pending or in-progress) job for the
specified config. Args: data: Optional input. Set options.fullsync=True
to ignore incremental sync state and perform a full re-sync. Note: S3
and ShareFile providers always perform full sync…

**Parameters**

| **Name**  | **In** | **Type** | **Req** | **Description** |
|-----------|--------|----------|---------|-----------------|
| kb_id     | path   | string   | yes     |                 |
| config_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/sync_config/{config_id}/sync"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"full_sync": false<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 201        | SyncJobOutput       | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /api/v1/kb/{kb_id}/sync_job/{job_id}/logs**

Get Job Logs

Get logs for a sync job with cursor-based pagination. Use the nextcursor
from the response to fetch the next page of results. Supports optional
filtering by: - level: Log level (DEBUG, INFO, WARNING, ERROR,
EXCEPTION, CRITICAL) - startdate / enddate: Timestamp range

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kb_id | path | string | yes |  |
| job_id | path | string | yes |  |
| limit | query | integer |  | Maximum number of log entries to return (1-500) |
| cursor | query | integer \| null |  | ID-based cursor from previous response to fetch next page (logs with id \< cursor) |
| level | query | LogLevel \| null |  | Filter by log level |
| start_date | query | string \| null |  | Filter logs with timestamp \>= startdate (ISO 8601 format) |
| end_date | query | string \| null |  | Filter logs with timestamp \<= enddate (ISO 8601 format) |
| order | query | SortOrder |  | Sort order by ID: 'desc' (newest first) or 'asc' (oldest first) |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/sync_job/{job_id}/logs"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | PaginatedLogsOutput | Successful Response |
| 422        | HTTPValidationError | Validation Error    |
