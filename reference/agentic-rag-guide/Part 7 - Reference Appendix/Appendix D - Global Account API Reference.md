**PART 7 — REFERENCE APPENDIX**

**Appendix D — Global / Account API Reference**

*Accounts, users, and zones, fully expanded*

Account-level concerns: accounts, users and invites, zones, usage.

**27 operations** in **7 groups**, generated from the official global v1
OpenAPI specification. Served from https://rag.progress.cloud/api/v1;
authorized with a user token or PAT (NUA keys are rejected here). Every
request-body field, parameter, and response is listed; object-typed
fields reference named schemas documented in full in Appendix F (Schema
Catalog).

**Invites (3)**

**DELETE /api/v1/account/{account_id}/invite/{email}**

Delete Invite

Invalidate an invite to join an account

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| account_id | path   | string   | yes     |                 |
| email      | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://rag.progress.cloud/api/v1/account/$ACCOUNT/invite/{email}"
\<br />
-H "Authorization: Bearer $PAT"</p></th>
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

**GET /api/v1/account/{account_id}/invites**

Invited Users

List of users invited to an account, but not yet joined

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
"https://rag.progress.cloud/api/v1/account/$ACCOUNT/invites" \<br />
-H "Authorization: Bearer $PAT"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**           | **Description**     |
|------------|----------------------|---------------------|
| 200        | array\<InvitedUser\> | Successful Response |
| 422        | HTTPValidationError  | Validation Error    |

**POST /api/v1/account/{account_slug}/invite**

Invite To Account

Invite somebody by email

**Parameters**

| **Name**     | **In** | **Type** | **Req** | **Description** |
|--------------|--------|----------|---------|-----------------|
| account_slug | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type**       | **Req** | **Default** | **Description** |
|-----------|----------------|---------|-------------|-----------------|
| email     | string         | yes     |             |                 |
| role      | AccountRole    |         | AMEMBER     |                 |
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
"https://rag.progress.cloud/api/v1/account/{account_slug}/invite"
\<br />
-H "Authorization: Bearer $PAT" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"email": "user@example.com",<br />
"role": "AOWNER"<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**Accounts (9)**

**GET /api/v1/account/{account_id}/usage**

Get Usage

Retrieve statistics for a knowledgebox or account

**Parameters**

| **Name**     | **In** | **Type**       | **Req** | **Description** |
|--------------|--------|----------------|---------|-----------------|
| account_id   | path   | string         | yes     |                 |
| aggregation  | query  | Aggregation    |         |                 |
| knowledgebox | query  | string \| null |         |                 |
| nua_key_id   | query  | string \| null |         |                 |
| from         | query  | string         | yes     |                 |
| to           | query  | string \| null |         |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://rag.progress.cloud/api/v1/account/$ACCOUNT/usage" \<br />
-H "Authorization: Bearer $PAT"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**                | **Description**     |
|------------|---------------------------|---------------------|
| 200        | array\<KbUsageDashboard\> | Successful Response |
| 422        | HTTPValidationError       | Validation Error    |

**GET /api/v1/account/{account_slug_or_id}**

Get Account

**Parameters**

| **Name**           | **In** | **Type** | **Req** | **Description** |
|--------------------|--------|----------|---------|-----------------|
| account_slug_or_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://rag.progress.cloud/api/v1/account/{account_slug_or_id}" \<br />
-H "Authorization: Bearer $PAT"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | Account             | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**PATCH /api/v1/account/{account_slug}**

Modify Account

**Parameters**

| **Name**     | **In** | **Type** | **Req** | **Description** |
|--------------|--------|----------|---------|-----------------|
| account_slug | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field**     | **Type**              | **Req** | **Default** | **Description** |
|---------------|-----------------------|---------|-------------|-----------------|
| title         | string \| null        |         |             |                 |
| description   | string \| null        |         |             |                 |
| saml          | OldSAMLConfig \| null |         |             |                 |
| saml_config   | SAMLConfig \| null    |         |             |                 |
| slug          | string \| null        |         |             |                 |
| workflow      | WorkflowMode \| null  |         |             |                 |
| eula_accepted | boolean \| null       |         |             |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PATCH
"https://rag.progress.cloud/api/v1/account/{account_slug}" \<br />
-H "Authorization: Bearer $PAT" \<br />
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
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**DELETE /api/v1/account/{account_slug}**

Delete Account

**Parameters**

| **Name**     | **In** | **Type** | **Req** | **Description** |
|--------------|--------|----------|---------|-----------------|
| account_slug | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://rag.progress.cloud/api/v1/account/{account_slug}" \<br />
-H "Authorization: Bearer $PAT"</p></th>
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

**GET /api/v1/account/{account_slug}/logo.png**

Download Account Logo

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| account_id | query  | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://rag.progress.cloud/api/v1/account/{account_slug}/logo.png"
\<br />
-H "Authorization: Bearer $PAT"</p></th>
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

**PATCH /api/v1/account/{account_slug}/logo.png**

Upload Account Logo

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| account_id | query  | string   | yes     |                 |

**Request body** — multipart/form-data (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| file      | string   | yes     |             |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PATCH
"https://rag.progress.cloud/api/v1/account/{account_slug}/logo.png"
\<br />
-H "Authorization: Bearer $PAT"</p></th>
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

**GET /api/v1/account/{account_slug}/permissions**

Get Account Permissions

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| account_id | query  | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://rag.progress.cloud/api/v1/account/{account_slug}/permissions"
\<br />
-H "Authorization: Bearer $PAT"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /api/v1/accounts**

List Accounts

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET "https://rag.progress.cloud/api/v1/accounts" \<br />
-H "Authorization: Bearer $PAT"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**               | **Description**     |
|------------|--------------------------|---------------------|
| 200        | array\<AccountListItem\> | Successful Response |

**POST /api/v1/accounts**

Create Account

**Request body** — application/json (required)

| **Field**     | **Type**       | **Req** | **Default** | **Description** |
|---------------|----------------|---------|-------------|-----------------|
| slug          | string \| null |         |             |                 |
| title         | string         | yes     |             |                 |
| description   | string \| null |         |             |                 |
| email         | string \| null |         |             |                 |
| zone          | string \| null |         |             |                 |
| workflow      | WorkflowMode   |         | classic     |                 |
| eula_accepted | boolean        |         | False       |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST "https://rag.progress.cloud/api/v1/accounts" \<br />
-H "Authorization: Bearer $PAT" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"title": "My title",<br />
"workflow": "classic",<br />
"eula_accepted": false<br />
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

**Zones (2)**

**GET /api/v1/account/{account_slug_or_id}/zones**

List Account Zones

List zones visible to a specific account. Accepts either the account
slug or UUID.

**Parameters**

| **Name**           | **In** | **Type** | **Req** | **Description** |
|--------------------|--------|----------|---------|-----------------|
| account_slug_or_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://rag.progress.cloud/api/v1/account/{account_slug_or_id}/zones"
\<br />
-H "Authorization: Bearer $PAT"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | array\<Zone\>       | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /api/v1/zones**

List Zones

List available zones across all user accounts (union)

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET "https://rag.progress.cloud/api/v1/zones" \<br />
-H "Authorization: Bearer $PAT"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**    | **Description**     |
|------------|---------------|---------------------|
| 200        | array\<Zone\> | Successful Response |

**Users (4)**

**GET /api/v1/account/{account_slug}/user/{user_id}**

Get Account User Details

**Parameters**

| **Name**     | **In** | **Type** | **Req** | **Description** |
|--------------|--------|----------|---------|-----------------|
| account_slug | path   | string   | yes     |                 |
| user_id      | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://rag.progress.cloud/api/v1/account/{account_slug}/user/{user_id}"
\<br />
-H "Authorization: Bearer $PAT"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | AccountUser         | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /api/v1/account/{account_slug}/users**

List Account Users

**Parameters**

| **Name**     | **In** | **Type** | **Req** | **Description** |
|--------------|--------|----------|---------|-----------------|
| account_slug | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://rag.progress.cloud/api/v1/account/{account_slug}/users" \<br />
-H "Authorization: Bearer $PAT"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**           | **Description**     |
|------------|----------------------|---------------------|
| 200        | array\<AccountUser\> | Successful Response |
| 422        | HTTPValidationError  | Validation Error    |

**PATCH /api/v1/account/{account_slug}/users**

Update Users

Account user modification

**Parameters**

| **Name**     | **In** | **Type** | **Req** | **Description** |
|--------------|--------|----------|---------|-----------------|
| account_slug | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| add | array\<AddAccountUser\> \| null |  |  |  |
| delete | array\<string\> \| null |  |  |  |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PATCH
"https://rag.progress.cloud/api/v1/account/{account_slug}/users" \<br />
-H "Authorization: Bearer $PAT" \<br />
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

**GET /api/v1/account/{account_slug}/users/search**

Search Account Users

**Parameters**

| **Name**     | **In** | **Type** | **Req** | **Description** |
|--------------|--------|----------|---------|-----------------|
| account_slug | path   | string   | yes     |                 |
| query        | query  | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://rag.progress.cloud/api/v1/account/{account_slug}/users/search"
\<br />
-H "Authorization: Bearer $PAT"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**           | **Description**     |
|------------|----------------------|---------------------|
| 200        | array\<AccountUser\> | Successful Response |
| 422        | HTTPValidationError  | Validation Error    |

**Authenticated User (4)**

**GET /api/v1/user**

Get Authenticated User

Information about user

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET "https://rag.progress.cloud/api/v1/user" \<br />
-H "Authorization: Bearer $PAT"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**                            | **Description**     |
|------------|---------------------------------------|---------------------|
| 200        | stashify_idp\_\_api\_\_models\_\_User | Successful Response |

**PATCH /api/v1/user**

Modify User Profile

Set information about user

**Request body** — application/json (required)

| **Field** | **Type**          | **Req** | **Default** | **Description** |
|-----------|-------------------|---------|-------------|-----------------|
| name      | string \| null    |         |             |                 |
| avatar    | string \| null    |         |             |                 |
| email     | string \| null    |         |             |                 |
| language  | Languages \| null |         |             |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PATCH "https://rag.progress.cloud/api/v1/user" \<br />
-H "Authorization: Bearer $PAT" \<br />
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
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**DELETE /api/v1/user**

Delete Authenticated User

Delete the logged in user

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE "https://rag.progress.cloud/api/v1/user" \<br />
-H "Authorization: Bearer $PAT"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema** | **Description**     |
|------------|------------|---------------------|
| 204        |            | Successful Response |

**GET /api/v1/user/welcome**

Welcome

Welcome information for a new user

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET "https://rag.progress.cloud/api/v1/user/welcome" \<br />
-H "Authorization: Bearer $PAT"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema** | **Description**     |
|------------|------------|---------------------|
| 200        | Welcome    | Successful Response |

**Personal Access Tokens (3)**

**DELETE /api/v1/user/pa_token/{token_id}**

Delete Token

Delete a personal access token by its ID

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| token_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://rag.progress.cloud/api/v1/user/pa_token/{token_id}" \<br />
-H "Authorization: Bearer $PAT"</p></th>
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

**GET /api/v1/user/pa_tokens**

List Tokens

List all personal access tokens for the authenticated user

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET "https://rag.progress.cloud/api/v1/user/pa_tokens"
\<br />
-H "Authorization: Bearer $PAT"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**         | **Description**     |
|------------|--------------------|---------------------|
| 200        | array\<TokenItem\> | Successful Response |

**POST /api/v1/user/pa_tokens**

Create Token

Create a new personal access token

**Request body** — application/json (required)

| **Field**       | **Type**       | **Req** | **Default** | **Description** |
|-----------------|----------------|---------|-------------|-----------------|
| description     | string         | yes     |             |                 |
| expiration_date | string \| null |         |             |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST "https://rag.progress.cloud/api/v1/user/pa_tokens"
\<br />
-H "Authorization: Bearer $PAT" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"description": "string"<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 201        | TokenCreated        | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**Authentication - OAuth (2)**

**POST /oauth2/register**

Register Oauth Client

Dynamic Client Registration - create (RFC 7591)

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST "https://rag.progress.cloud/oauth2/register" \<br />
-H "Authorization: Bearer $PAT"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**             | **Description**     |
|------------|------------------------|---------------------|
| 201        | object (free-form map) | Successful Response |

**PUT /oauth2/register/{client_id}**

Update Oauth Client

Dynamic Client Registration - update (RFC 7591)

**Parameters**

| **Name**  | **In** | **Type** | **Req** | **Description** |
|-----------|--------|----------|---------|-----------------|
| client_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PUT "https://rag.progress.cloud/oauth2/register/{client_id}"
\<br />
-H "Authorization: Bearer $PAT"</p></th>
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
