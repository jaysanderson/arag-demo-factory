**PART 7 — REFERENCE APPENDIX**

**Appendix B — NUA API Reference**

*The Nuclia Understanding API — processing, Predict, and agents, fully
expanded*

The understanding services: processing pipeline, Predict, agents and
tasks.

**157 operations** in **18 groups**, generated from the official nua v1
OpenAPI specification. Served from
https://\<zone\>.dp.progress.cloud/api/v1; authorized with a NUA key
(X-NUCLIA-NUAKEY: Bearer). Every request-body field, parameter, and
response is listed; object-typed fields reference named schemas
documented in full in Appendix F (Schema Catalog).

**Models (16)**

**GET /account/{account_id}/assume_role/bedrock**

Account Assume Role For Bedrock Models

Start a new assume role authentication flow for an account

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
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/assume_role/bedrock"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**                     | **Description**     |
|------------|--------------------------------|---------------------|
| 200        | BedrockAssumeRoleStartResponse | Successful Response |
| 422        | HTTPValidationError            | Validation Error    |

**POST /account/{account_id}/assume_role/bedrock**

Account Bedrock Models Authentication

Finish a new bedrock authentication flow for an account

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| account_id | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description**                    |
|-----------|----------|---------|-------------|------------------------------------|
| role_arn  | string   | yes     |             | ARN of the role created in AWS IAM |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/assume_role/bedrock"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"role_arn": "string"<br />
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

**DELETE /account/{account_id}/assume_role/bedrock**

Account Bedrock Models Authentication

Delete existing bedrock assume role configuration for an account

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
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/assume_role/bedrock"
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
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /account/{account_id}/assume_role/bedrock/validate**

Account Bedrock Models Authentication

Validate the bedrock assume role configuration for an account

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
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/assume_role/bedrock/validate"
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
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /account/{account_id}/dataset/{dataset_id}/models**

Learning Configuration Schema

Get available models

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| account_id | path   | string   | yes     |                 |
| dataset_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/dataset/{dataset_id}/models"
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
| 200        | object (free-form map) | Successful Response |
| 422        | HTTPValidationError    | Validation Error    |

**GET /account/{account_id}/default_model/{model_id}**

Get Public Model Configuration On Account

Get details of a public model configuration on an account

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| account_id | path   | string   | yes     |                 |
| model_id   | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/default_model/{model_id}"
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
| 200        | DefaultModelConfig  | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**DELETE /account/{account_id}/default_model/{model_id}**

Public Model Configuration Deletion On Account

Delete specific public model configuration from the account

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| account_id | path   | string   | yes     |                 |
| model_id   | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/default_model/{model_id}"
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

**GET /account/{account_id}/default_models**

List Public Models Configured On An Account

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
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/default_models"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**                          | **Description**     |
|------------|-------------------------------------|---------------------|
| 200        | array\<DefaultModelConfigListItem\> | Successful Response |
| 422        | HTTPValidationError                 | Validation Error    |

**GET /account/{account_id}/model/{model_id}**

Learning Configuration Schema

Get trained models

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| account_id | path   | string   | yes     |                 |
| model_id   | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/model/{model_id}"
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
| 200        | CustomAccountModel  | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**DELETE /account/{account_id}/model/{model_id}**

Model Deletion On Account

Delete specific model from account, destroying action

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| account_id | path   | string   | yes     |                 |
| model_id   | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/model/{model_id}"
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

**GET /account/{account_id}/models**

Learning Configuration Models From Account

Get trained models

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
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/models" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**                          | **Description**     |
|------------|-------------------------------------|---------------------|
| 200        | array\<CustomAccountModelListItem\> | Successful Response |
| 422        | HTTPValidationError                 | Validation Error    |

**DELETE /account/{account_id}/models/{kbid}/{model_id}**

Delete A Model From A Kb

Remove from availability a model from a KB

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| kbid       | path   | string   | yes     |                 |
| model_id   | path   | string   | yes     |                 |
| account_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/models/$KB/{model_id}"
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

**GET /account/{account_id}/schema**

Learning Configuration Schema

Get schema for creating a KB

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
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/schema" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | ConfigSchema        | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /models/{kbid}**

Learning Configuration Schema

Get available models onprem

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET "https://$ZONE.dp.progress.cloud/api/v1/models/$KB"
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
| 200        | object (free-form map) | Successful Response |
| 422        | HTTPValidationError    | Validation Error    |

**POST /models/{kbid}**

Add A Model To A Kb Onprem

Add a model to a KB to be used

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| id        | string   | yes     |             |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST "https://$ZONE.dp.progress.cloud/api/v1/models/$KB"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"id": "..."<br />
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

**GET /models/{kbid}/model/{model_id}**

Model Configuration

Get trained models

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |
| model_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/models/$KB/model/{model_id}"
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
| 200        | object (free-form map) | Successful Response |
| 422        | HTTPValidationError    | Validation Error    |

**Datasets (10)**

**GET /account/{account_id}/dataset/{dataset_id}**

Get Dataset

Get a dataset

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| dataset_id | path   | string   | yes     |                 |
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
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/dataset/{dataset_id}"
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
| 200        | DatasetCreated      | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**DELETE /account/{account_id}/dataset/{dataset_id}**

Delete Dataset

Deletes a dataset

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| dataset_id | path   | string   | yes     |                 |
| account_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/dataset/{dataset_id}"
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

**PUT
/account/{account_id}/dataset/{dataset_id}/partition/{partition_id}**

Upload Partition Account

Upload a partition of a dataset

**Parameters**

| **Name**       | **In** | **Type** | **Req** | **Description** |
|----------------|--------|----------|---------|-----------------|
| dataset_id     | path   | string   | yes     |                 |
| account_id     | path   | string   | yes     |                 |
| partition_id   | path   | string   | yes     |                 |
| content-length | header | integer  | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PUT
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/dataset/{dataset_id}/partition/{partition_id}"
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
/account/{account_id}/dataset/{dataset_id}/partition/{partition_id}**

Delete Dataset Partition

Deletes a partition of a dataset

**Parameters**

| **Name**     | **In** | **Type** | **Req** | **Description** |
|--------------|--------|----------|---------|-----------------|
| dataset_id   | path   | string   | yes     |                 |
| partition_id | path   | string   | yes     |                 |
| account_id   | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/dataset/{dataset_id}/partition/{partition_id}"
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

**DELETE /account/{account_id}/dataset/{dataset_id}/partitions**

Delete Dataset Partitions

Deletes all partitions of a dataset

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| dataset_id | path   | string   | yes     |                 |
| account_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/dataset/{dataset_id}/partitions"
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

**GET /account/{account_id}/datasets**

List Datasets

Lists all datasets

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
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/datasets"
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
| 201        | DatasetsList        | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /account/{account_id}/datasets**

Create Dataset Account

Creates a new dataset

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| account_id | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type**      | **Req** | **Default** | **Description** |
|-----------|---------------|---------|-------------|-----------------|
| name      | string        | yes     |             |                 |
| filter    | DatasetFilter | yes     |             |                 |
| type      | Task-Input    | yes     |             |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/account/$ACCOUNT/datasets"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"name": "string",<br />
"filter": {<br />
"labels": [<br />
"string"<br />
]<br />
},<br />
"type": "PARAGRAPH_CLASSIFICATION"<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 201        | DatasetCreated      | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**DELETE /dataset/{dataset_id}**

Dataset Delete

Deletes a dataset

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| dataset_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/dataset/{dataset_id}" \<br />
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

**PUT /dataset/{dataset_id}/partition/{partition_id}**

Upload Partition

Upload a partition of a dataset

**Parameters**

| **Name**       | **In** | **Type** | **Req** | **Description** |
|----------------|--------|----------|---------|-----------------|
| dataset_id     | path   | string   | yes     |                 |
| partition_id   | path   | string   | yes     |                 |
| content-length | header | integer  | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PUT
"https://$ZONE.dp.progress.cloud/api/v1/dataset/{dataset_id}/partition/{partition_id}"
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

**POST /datasets**

Create Dataset

Creates a new dataset

**Request body** — application/json (required)

| **Field** | **Type**      | **Req** | **Default** | **Description** |
|-----------|---------------|---------|-------------|-----------------|
| name      | string        | yes     |             |                 |
| filter    | DatasetFilter | yes     |             |                 |
| type      | Task-Input    | yes     |             |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST "https://$ZONE.dp.progress.cloud/api/v1/datasets"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"name": "string",<br />
"filter": {<br />
"labels": [<br />
"string"<br />
]<br />
},<br />
"type": "PARAGRAPH_CLASSIFICATION"<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 201        | DatasetCreated      | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**Downloads (3)**

**DELETE /agent/{agent_id}/audit/download_request/{request_id}**

Delete Download Request

Delete a download request by its ID

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| agent_id   | path   | string   | yes     |                 |
| request_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/audit/download_request/{request_id}"
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
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /agent/{agent_id}/audit/download_request/{request_id}/status**

Get Download Request Status

Get status of an audit download request by its ID

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| agent_id   | path   | string   | yes     |                 |
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
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/audit/download_request/{request_id}/status"
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
| 200        | DownloadStatus      | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /agent/{agent_id}/audit/download_requests**

List Download Requests

List all download requests for the account

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| agent_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/audit/download_requests"
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
| 200        | array\<DownloadStatus\> | Successful Response |
| 422        | HTTPValidationError     | Validation Error    |

**Retrieval Agent (28)**

**POST /agent/{agent_id}/audit/interactions/download**

Request Interactions Audit Download

Request a download for the audit log of an agent's interactions

**Parameters**

| **Name** | **In** | **Type**                             | **Req** | **Description** |
|----------|--------|--------------------------------------|---------|-----------------|
| agent_id | path   | string                               | yes     |                 |
| accept   | header | enum(application/x-ndjson, text/csv) |         |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| session_id | string \| null |  |  | Filter by session ID |
| year | integer \| null |  |  | Filter by year (e.g., 2024). If not specified, defaults to the current year. |
| month | integer \| null |  |  | Filter by month (1-12). If not specified, defaults to the past month. |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/audit/interactions/download"
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
| 200        | DownloadStatus      | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**PATCH /agent/{agent_id}/driver/{driver}**

Patch Driver

Set Agent Configuration

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| agent_id | path   | string   | yes     |                 |
| driver   | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| id | string \| null |  |  |  |
| identifier | string | yes |  |  |
| name | string | yes |  |  |
| provider | object | yes |  | The type of driver, e.g., 'google', 'marklogic', etc. |
| config | EncryptedPayload | yes |  | The configuration specific to the driver. |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PATCH
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/driver/{driver}"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"identifier": "string",<br />
"name": "string",<br />
"provider": null,<br />
"config": {}<br />
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

**DELETE /agent/{agent_id}/driver/{driver}**

Delete Driver

Set Agent Configuration

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| agent_id | path   | string   | yes     |                 |
| driver   | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/driver/{driver}"
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
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /agent/{agent_id}/drivers**

Get Drivers

Get Agent Configuration

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| agent_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/drivers"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**                      | **Description**     |
|------------|---------------------------------|---------------------|
| 200        | array\<object (free-form map)\> | Successful Response |
| 422        | HTTPValidationError             | Validation Error    |

**POST /agent/{agent_id}/drivers**

Add Driver

Set Agent Configuration

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| agent_id | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| id | string \| null |  |  |  |
| identifier | string | yes |  |  |
| name | string | yes |  |  |
| provider | object | yes |  | The type of driver, e.g., 'google', 'marklogic', etc. |
| config | EncryptedPayload | yes |  | The configuration specific to the driver. |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/drivers"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"identifier": "string",<br />
"name": "string",<br />
"provider": null,<br />
"config": {}<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | DriverID            | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /agent/{agent_id}/export**

Request Export Retrieval Agent

Request the export of a Retrieval Agent. This will send an email with a
download link to the current user.

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| agent_id | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| passphrase | string | yes |  | Passphrase to encrypt the exported configuration. Will be required for import. |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/export" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"passphrase": "string"<br />
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

**GET /agent/{agent_id}/generation**

Get Generation

Set Agent Configuration

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| agent_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/generation"
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
| 200        | array\<object\>     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /agent/{agent_id}/generation**

Add Generation

Add Generation Agent Configuration

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| agent_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/generation"
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
| 200        | AgentID             | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**PATCH /agent/{agent_id}/generation/{generation}**

Patch Generation

Set PreProcess Agent Configuration

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| agent_id   | path   | string   | yes     |                 |
| generation | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PATCH
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/generation/{generation}"
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
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**DELETE /agent/{agent_id}/generation/{generation}**

Delete Generation

Delete Generation Agent Configuration

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| agent_id   | path   | string   | yes     |                 |
| generation | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/generation/{generation}"
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
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /agent/{agent_id}/import**

Import Retrieval Agent

Import Retrieval Agent Configuration

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| agent_id | path   | string   | yes     |                 |

**Request body** — multipart/form-data (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| file | string | yes |  |  |
| passphrase | string | yes |  | Passphrase for the encrypted export file |
| overwrite | boolean |  | False | Whether to overwrite existing agent configuration. If false and the agent configuration is not empty, the import will fail. |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/import" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
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

**GET /agent/{agent_id}/postprocess**

Get Postprocess

Set Agent Configuration

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| agent_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/postprocess"
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
| 200        | array\<object\>     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /agent/{agent_id}/postprocess**

Add Postprocess

Add PostProcess Agent Configuration

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| agent_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/postprocess"
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
| 200        | AgentID             | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**PATCH /agent/{agent_id}/postprocess/{postprocess}**

Patch Postprocess

Set PostProcess Agent Configuration

**Parameters**

| **Name**    | **In** | **Type** | **Req** | **Description** |
|-------------|--------|----------|---------|-----------------|
| agent_id    | path   | string   | yes     |                 |
| postprocess | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PATCH
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/postprocess/{postprocess}"
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
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**DELETE /agent/{agent_id}/postprocess/{postprocess}**

Delete Postprocess

Delete PreProcess Agent Configuration

**Parameters**

| **Name**    | **In** | **Type** | **Req** | **Description** |
|-------------|--------|----------|---------|-----------------|
| agent_id    | path   | string   | yes     |                 |
| postprocess | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/postprocess/{postprocess}"
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
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /agent/{agent_id}/preprocess**

Get Preprocess

Set Agent Configuration

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| agent_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/preprocess"
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
| 200        | array\<object\>     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /agent/{agent_id}/preprocess**

Add Preprocess

Add PreProcess Agent Configuration

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| agent_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/preprocess"
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
| 200        | AgentID             | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**PATCH /agent/{agent_id}/preprocess/{preprocess}**

Patch Preprocess

Set PreProcess Agent Configuration

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| agent_id   | path   | string   | yes     |                 |
| preprocess | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PATCH
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/preprocess/{preprocess}"
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
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**DELETE /agent/{agent_id}/preprocess/{preprocess}**

Delete Preprocess

Delete PreProcess Agent Configuration

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| agent_id   | path   | string   | yes     |                 |
| preprocess | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/preprocess/{preprocess}"
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
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /agent/{agent_id}/rules**

Get Rules

Set Agent Configuration

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| agent_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/rules" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
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

**POST /agent/{agent_id}/rules**

Set Rules

Set Agent Configuration

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| agent_id | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| rules | array\<Rule \| string\> |  |  | List of rules that the workflow should follow. Each rule can be a string or a Rule object with a prompt. |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/rules" \<br />
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
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /agent/{agent_id}/session/{session}**

Get Session

Create session

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| agent_id | path   | string   | yes     |                 |
| session  | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/session/{session}"
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
| 200        | Resource-Output     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /agent/{agent_id}/session/{session}**

Interaction

Interact session

**Parameters**

| **Name**    | **In** | **Type** | **Req** | **Description** |
|-------------|--------|----------|---------|-----------------|
| agent_id    | path   | string   | yes     |                 |
| session     | path   | string   | yes     |                 |
| workflow_id | query  | string   |         |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| question | string | yes |  |  |
| headers | map\<string, string\> |  | {} |  |
| arguments | map\<string, string\> |  | {} |  |
| chat_history | array\<HistoryQuestionAnswer\> \| null |  |  | Client-managed chat history. When set (even to an empty list), overrides any server-side session history for agents that use previous Q&A context (rephrase, summarize, smart, etc.). Omit the field ent… |
| operation | InteractionOperation |  | 0 |  |
| streaming | boolean |  | False |  |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/session/{session}"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"question": "your question here",<br />
"operation": 0,<br />
"streaming": false<br />
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

**PATCH /agent/{agent_id}/session/{session}**

Patch Session

Create session

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| agent_id | path   | string   | yes     |                 |
| session  | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type**   | **Req** | **Default** | **Description** |
|-----------|------------|---------|-------------|-----------------|
| slug      | string     | yes     |             |                 |
| name      | string     | yes     |             |                 |
| summary   | string     | yes     |             |                 |
| data      | string     | yes     |             |                 |
| format    | TextFormat | yes     |             |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PATCH
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/session/{session}"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"slug": "my-resource",<br />
"name": "string",<br />
"summary": "string",<br />
"data": "string",<br />
"format": "PLAIN"<br />
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

**DELETE /agent/{agent_id}/session/{session}**

Delete Session

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| agent_id | path   | string   | yes     |                 |
| session  | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/session/{session}"
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
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /agent/{agent_id}/sessions**

Get Sessions

Create session

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description**                 |
|----------|--------|----------|---------|---------------------------------|
| agent_id | path   | string   | yes     |                                 |
| page     | query  | integer  |         | Requested page number (0-based) |
| size     | query  | integer  |         | Page size                       |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/sessions"
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
| 200        | ResourceList        | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /agent/{agent_id}/sessions**

Create Session

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| agent_id | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type**   | **Req** | **Default** | **Description** |
|-----------|------------|---------|-------------|-----------------|
| slug      | string     | yes     |             |                 |
| name      | string     | yes     |             |                 |
| summary   | string     | yes     |             |                 |
| data      | string     | yes     |             |                 |
| format    | TextFormat | yes     |             |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/sessions"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"slug": "my-resource",<br />
"name": "string",<br />
"summary": "string",<br />
"data": "string",<br />
"format": "PLAIN"<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | ResourceCreated     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /agent/{agent_id}/workflow/{workflow_id}/session/{session}**

Interaction

Interact session

**Parameters**

| **Name**    | **In** | **Type** | **Req** | **Description** |
|-------------|--------|----------|---------|-----------------|
| agent_id    | path   | string   | yes     |                 |
| session     | path   | string   | yes     |                 |
| workflow_id | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| question | string | yes |  |  |
| headers | map\<string, string\> |  | {} |  |
| arguments | map\<string, string\> |  | {} |  |
| chat_history | array\<HistoryQuestionAnswer\> \| null |  |  | Client-managed chat history. When set (even to an empty list), overrides any server-side session history for agents that use previous Q&A context (rephrase, summarize, smart, etc.). Omit the field ent… |
| operation | InteractionOperation |  | 0 |  |
| streaming | boolean |  | False |  |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/workflow/{workflow_id}/session/{session}"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"question": "your question here",<br />
"operation": 0,<br />
"streaming": false<br />
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

**Prompt Management (5)**

**GET /agent/{agent_id}/prompt/{prompt_id}**

Get Prompt

Get Agent Configuration

**Parameters**

| **Name**  | **In** | **Type** | **Req** | **Description** |
|-----------|--------|----------|---------|-----------------|
| agent_id  | path   | string   | yes     |                 |
| prompt_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/prompt/{prompt_id}"
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
| 200        | PromptConfig        | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**PATCH /agent/{agent_id}/prompt/{prompt_id}**

Patch Prompt

Update Prompt of Agent

**Parameters**

| **Name**  | **In** | **Type** | **Req** | **Description** |
|-----------|--------|----------|---------|-----------------|
| agent_id  | path   | string   | yes     |                 |
| prompt_id | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string | yes |  |  |
| description | string | yes |  |  |
| prompt | string | yes |  |  |
| arguments | array\<PromptArgument\> \| null |  |  |  |
| icons | map\<string, string\> \| null |  |  |  |
| meta | map\<string, string\> \| null |  |  |  |
| prompt_id | string \| null |  |  |  |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PATCH
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/prompt/{prompt_id}"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"name": "string",<br />
"description": "string",<br />
"prompt": "string"<br />
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

**DELETE /agent/{agent_id}/prompt/{prompt_id}**

Delete Prompt

Delete prompt id

**Parameters**

| **Name**  | **In** | **Type** | **Req** | **Description** |
|-----------|--------|----------|---------|-----------------|
| agent_id  | path   | string   | yes     |                 |
| prompt_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/prompt/{prompt_id}"
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
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /agent/{agent_id}/prompts**

Get Prompts

Get Agent Configuration

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| agent_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/prompts"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**            | **Description**     |
|------------|-----------------------|---------------------|
| 200        | array\<PromptConfig\> | Successful Response |
| 422        | HTTPValidationError   | Validation Error    |

**POST /agent/{agent_id}/prompts**

Add Prompt

Add Prompt to Agent

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| agent_id | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string | yes |  |  |
| description | string | yes |  |  |
| prompt | string | yes |  |  |
| arguments | array\<PromptArgument\> \| null |  |  |  |
| icons | map\<string, string\> \| null |  |  |  |
| meta | map\<string, string\> \| null |  |  |  |
| prompt_id | string \| null |  |  |  |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/prompts"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"name": "string",<br />
"description": "string",<br />
"prompt": "string"<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | PromptID            | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**General (5)**

**GET /agent/{agent_id}/session/{session}/mcp**

Interaction Mcp Handler

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| agent_id | path   | string   | yes     |                 |
| session  | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/session/{session}/mcp"
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
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /agent/{agent_id}/session/{session}/mcp**

Interaction Mcp Handler

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| agent_id | path   | string   | yes     |                 |
| session  | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/session/{session}/mcp"
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
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**DELETE /agent/{agent_id}/session/{session}/mcp**

Mcp Handler Delete

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| agent_id | path   | string   | yes     |                 |
| session  | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/session/{session}/mcp"
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
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /kb/{kbid}/mcp**

Mcp Handler

**Parameters**

| **Name**        | **In** | **Type**           | **Req** | **Description** |
|-----------------|--------|--------------------|---------|-----------------|
| kbid            | path   | string             | yes     |                 |
| x-ndb-client    | header | NucliaDBClientType |         |                 |
| x-nucliadb-user | header | string             |         |                 |
| x-forwarded-for | header | string             |         |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET "https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/mcp"
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
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /kb/{kbid}/mcp**

Mcp Handler

**Parameters**

| **Name**        | **In** | **Type**           | **Req** | **Description** |
|-----------------|--------|--------------------|---------|-----------------|
| kbid            | path   | string             | yes     |                 |
| x-ndb-client    | header | NucliaDBClientType |         |                 |
| x-nucliadb-user | header | string             |         |                 |
| x-forwarded-for | header | string             |         |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST "https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/mcp"
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
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**Workflows (18)**

**PATCH /agent/{agent_id}/workflow/{workflow_id}**

Set Workflow

Set Workflow Configuration

**Parameters**

| **Name**    | **In** | **Type** | **Req** | **Description** |
|-------------|--------|----------|---------|-----------------|
| agent_id    | path   | string   | yes     |                 |
| workflow_id | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field**   | **Type**               | **Req** | **Default** | **Description** |
|-------------|------------------------|---------|-------------|-----------------|
| name        | string                 | yes     |             |                 |
| description | string                 | yes     |             |                 |
| parameters  | object (free-form map) | yes     |             |                 |
| required    | array\<string\>        |         |             |                 |
| rules       | Rules \| null          |         |             |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PATCH
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/workflow/{workflow_id}"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"name": "string",<br />
"description": "string",<br />
"parameters": {},<br />
"required": [<br />
"string"<br />
]<br />
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

**DELETE /agent/{agent_id}/workflow/{workflow_id}**

Delete Workflow

Delete Workflow Configuration

**Parameters**

| **Name**    | **In** | **Type** | **Req** | **Description** |
|-------------|--------|----------|---------|-----------------|
| agent_id    | path   | string   | yes     |                 |
| workflow_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/workflow/{workflow_id}"
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
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /agent/{agent_id}/workflow/{workflow_id}/generation**

Get Generation

Get Generation Workflows Configuration

**Parameters**

| **Name**    | **In** | **Type** | **Req** | **Description** |
|-------------|--------|----------|---------|-----------------|
| agent_id    | path   | string   | yes     |                 |
| workflow_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/workflow/{workflow_id}/generation"
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
| 200        | array\<object\>     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /agent/{agent_id}/workflow/{workflow_id}/generation**

Add Generation

Add Generation Workflows Configuration

**Parameters**

| **Name**    | **In** | **Type** | **Req** | **Description** |
|-------------|--------|----------|---------|-----------------|
| agent_id    | path   | string   | yes     |                 |
| workflow_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/workflow/{workflow_id}/generation"
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
| 200        | AgentID             | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**PATCH
/agent/{agent_id}/workflow/{workflow_id}/generation/{generation}**

Patch Generation

Set Generation Workflows Configuration

**Parameters**

| **Name**    | **In** | **Type** | **Req** | **Description** |
|-------------|--------|----------|---------|-----------------|
| agent_id    | path   | string   | yes     |                 |
| workflow_id | path   | string   | yes     |                 |
| generation  | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PATCH
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/workflow/{workflow_id}/generation/{generation}"
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
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**DELETE
/agent/{agent_id}/workflow/{workflow_id}/generation/{generation}**

Delete Generation

Delete Generation Workflows Configuration

**Parameters**

| **Name**    | **In** | **Type** | **Req** | **Description** |
|-------------|--------|----------|---------|-----------------|
| agent_id    | path   | string   | yes     |                 |
| workflow_id | path   | string   | yes     |                 |
| generation  | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/workflow/{workflow_id}/generation/{generation}"
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
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /agent/{agent_id}/workflow/{workflow_id}/postprocess**

Get Postprocess

Get PostProcess Workflows Configuration

**Parameters**

| **Name**    | **In** | **Type** | **Req** | **Description** |
|-------------|--------|----------|---------|-----------------|
| agent_id    | path   | string   | yes     |                 |
| workflow_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/workflow/{workflow_id}/postprocess"
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
| 200        | array\<object\>     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /agent/{agent_id}/workflow/{workflow_id}/postprocess**

Add Postprocess

Add PostProcess Workflows Configuration

**Parameters**

| **Name**    | **In** | **Type** | **Req** | **Description** |
|-------------|--------|----------|---------|-----------------|
| agent_id    | path   | string   | yes     |                 |
| workflow_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/workflow/{workflow_id}/postprocess"
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
| 200        | AgentID             | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**PATCH
/agent/{agent_id}/workflow/{workflow_id}/postprocess/{postprocess}**

Patch Postprocess

Set PostProcess Workflows Configuration

**Parameters**

| **Name**    | **In** | **Type** | **Req** | **Description** |
|-------------|--------|----------|---------|-----------------|
| agent_id    | path   | string   | yes     |                 |
| workflow_id | path   | string   | yes     |                 |
| postprocess | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PATCH
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/workflow/{workflow_id}/postprocess/{postprocess}"
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
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**DELETE
/agent/{agent_id}/workflow/{workflow_id}/postprocess/{postprocess}**

Delete Postprocess

Delete PostProcess Workflows Configuration

**Parameters**

| **Name**    | **In** | **Type** | **Req** | **Description** |
|-------------|--------|----------|---------|-----------------|
| agent_id    | path   | string   | yes     |                 |
| workflow_id | path   | string   | yes     |                 |
| postprocess | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/workflow/{workflow_id}/postprocess/{postprocess}"
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
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /agent/{agent_id}/workflow/{workflow_id}/preprocess**

Get Preprocess

Set Workflow Configuration

**Parameters**

| **Name**    | **In** | **Type** | **Req** | **Description** |
|-------------|--------|----------|---------|-----------------|
| agent_id    | path   | string   | yes     |                 |
| workflow_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/workflow/{workflow_id}/preprocess"
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
| 200        | array\<object\>     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /agent/{agent_id}/workflow/{workflow_id}/preprocess**

Add Preprocess

Add PreProcess Workflows Configuration

**Parameters**

| **Name**    | **In** | **Type** | **Req** | **Description** |
|-------------|--------|----------|---------|-----------------|
| agent_id    | path   | string   | yes     |                 |
| workflow_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/workflow/{workflow_id}/preprocess"
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
| 200        | AgentID             | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**PATCH
/agent/{agent_id}/workflow/{workflow_id}/preprocess/{preprocess}**

Patch Preprocess

Set PreProcess Workflows Configuration

**Parameters**

| **Name**    | **In** | **Type** | **Req** | **Description** |
|-------------|--------|----------|---------|-----------------|
| agent_id    | path   | string   | yes     |                 |
| workflow_id | path   | string   | yes     |                 |
| preprocess  | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PATCH
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/workflow/{workflow_id}/preprocess/{preprocess}"
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
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**DELETE
/agent/{agent_id}/workflow/{workflow_id}/preprocess/{preprocess}**

Delete Preprocess

Delete PreProcess Workflows Configuration

**Parameters**

| **Name**    | **In** | **Type** | **Req** | **Description** |
|-------------|--------|----------|---------|-----------------|
| agent_id    | path   | string   | yes     |                 |
| preprocess  | path   | string   | yes     |                 |
| workflow_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/workflow/{workflow_id}/preprocess/{preprocess}"
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
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /agent/{agent_id}/workflow/{workflow_id}/rules**

Get Rules

Get Workflow Rules Configuration

**Parameters**

| **Name**    | **In** | **Type** | **Req** | **Description** |
|-------------|--------|----------|---------|-----------------|
| agent_id    | path   | string   | yes     |                 |
| workflow_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/workflow/{workflow_id}/rules"
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
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /agent/{agent_id}/workflow/{workflow_id}/rules**

Set Rules

Set Workflow Rules Configuration

**Parameters**

| **Name**    | **In** | **Type** | **Req** | **Description** |
|-------------|--------|----------|---------|-----------------|
| agent_id    | path   | string   | yes     |                 |
| workflow_id | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| rules | array\<Rule \| string\> |  |  | List of rules that the workflow should follow. Each rule can be a string or a Rule object with a prompt. |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/workflow/{workflow_id}/rules"
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
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /agent/{agent_id}/workflows**

Get Workflows

Get Workflow Configuration

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| agent_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/workflows"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**            | **Description**     |
|------------|-----------------------|---------------------|
| 200        | array\<WorkflowData\> | Successful Response |
| 422        | HTTPValidationError   | Validation Error    |

**POST /agent/{agent_id}/workflows**

Add Workflow

Add Workflow Configuration

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| agent_id | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| id | string | yes |  |  |
| name | string | yes |  |  |
| description | string \| null |  |  |  |
| parameters | object (free-form map) \| null |  |  |  |
| rules | Rules |  |  |  |
| required | array\<string\> |  |  |  |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/agent/{agent_id}/workflows"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"id": "...",<br />
"name": "string",<br />
"required": [<br />
"string"<br />
]<br />
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

**Collector (2)**

**GET /collect/feedback/{kbid}**

Feedback Avalaible Months

List of months within the last year with feedback data

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/collect/feedback/$KB" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
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

**GET /collect/feedback/{kbid}/{month}**

Get Feedback

Given a month, returns a csv with all the feedback data from it

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |
| month    | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/collect/feedback/$KB/{month}"
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
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**Knowledge Boxes (8)**

**GET /config/{kbid}**

Knowledgebox Models Configuration

Current configuration of models assigned to a knowledgebox

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET "https://$ZONE.dp.progress.cloud/api/v1/config/$KB"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**            | **Description**     |
|------------|-----------------------|---------------------|
| 200        | LearningConfiguration | Successful Response |
| 422        | HTTPValidationError   | Validation Error    |

**POST /config/{kbid}**

Knowledgebox Models Add Configuration

Current configuration of models assigned to a knowledgebox

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| anonymization_model | AnonymizationModel \| string |  | disabled |  |
| visual_labeling | VisualLabeling \| string |  | disabled |  |
| generative_model | string |  | chatgpt-azure-4o |  |
| ner_model | NERModel \| string |  | multilingual |  |
| relation_model | RelationModel \| string |  | base |  |
| user_keys | UserLearningKeys \| null |  |  |  |
| user_prompts | UserPrompts \| null |  |  |  |
| summary | Summary \| null |  | simple |  |
| summary_model | string |  | chatgpt-azure-4o |  |
| summary_prompt | SummaryPrompt \| null |  |  |  |
| prefer_markdown_generative_response | boolean |  | False |  |
| default_semantic_model | string \| null |  |  | The default vector set / semantic model to use. Must be one of the models defined in the semanticmodels field. If not provided, the first model in the list will be used. |
| semantic_model | ParagraphEmbeddingModel \| null |  |  |  |
| semantic_models | array\<ParagraphEmbeddingModel\> \| null |  |  |  |
| semantic_graph_node_models | array\<NodeEmbeddingModel\> \| null |  |  |  |
| default_semantic_graph_node_model | string \| null |  |  |  |
| semantic_graph_edge_models | array\<EdgeEmbeddingModel\> \| null |  |  |  |
| default_semantic_graph_edge_model | string \| null |  |  |  |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST "https://$ZONE.dp.progress.cloud/api/v1/config/$KB"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"generative_model": "chatgpt-azure-4o",<br />
"summary_model": "chatgpt-azure-4o",<br />
"prefer_markdown_generative_response": false<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**            | **Description**     |
|------------|-----------------------|---------------------|
| 200        | LearningConfiguration | Successful Response |
| 422        | HTTPValidationError   | Validation Error    |

**PATCH /config/{kbid}**

Knowledgebox Models Update Configuration

Current configuration of models assigned to a knowledgebox

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| anonymization_model | AnonymizationModel \| string |  | disabled |  |
| visual_labeling | VisualLabeling \| string |  | disabled |  |
| generative_model | string |  | chatgpt-azure-4o |  |
| ner_model | NERModel \| string |  | multilingual |  |
| relation_model | RelationModel \| string |  | base |  |
| user_keys | UserLearningKeys \| null |  |  |  |
| user_prompts | UserPrompts \| null |  |  |  |
| summary | Summary \| null |  | simple |  |
| summary_model | string |  | chatgpt-azure-4o |  |
| summary_prompt | SummaryPrompt \| null |  |  |  |
| prefer_markdown_generative_response | boolean |  | False |  |
| default_semantic_model | string \| null |  |  | The default vector set / semantic model to use. Must be one of the models defined in the semanticmodels field. If not provided, the first model in the list will be used. |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PATCH "https://$ZONE.dp.progress.cloud/api/v1/config/$KB"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"generative_model": "chatgpt-azure-4o",<br />
"summary_model": "chatgpt-azure-4o",<br />
"prefer_markdown_generative_response": false<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**            | **Description**     |
|------------|-----------------------|---------------------|
| 200        | LearningConfiguration | Successful Response |
| 422        | HTTPValidationError   | Validation Error    |

**DELETE /config/{kbid}**

Knowledgebox Models Configuration

Delete a KB configuration

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE "https://$ZONE.dp.progress.cloud/api/v1/config/$KB"
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

**GET /generative_providers/{kbid}**

Available Models For A Knowledge Box

Get all available models for a knowledge box grouped by provider

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/generative_providers/$KB"
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
| 200        | ProvidersResponse   | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /learning/configuration/schema**

Learning Configuration Schema

Get jsonschema definition for learningconfiguration field of
knowledgebox creation payload

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/learning/configuration/schema"
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
| 200        | ConfigSchema        | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /schema**

Learning Configuration Schema

Get jsonschema definition for learningconfiguration field of
knowledgebox creation payload

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET "https://$ZONE.dp.progress.cloud/api/v1/schema" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | ConfigSchema        | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /schema/{kbid}**

Learning Configuration Schema

Get jsonschema definition for learningconfiguration field of
knowledgebox update payload

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET "https://$ZONE.dp.progress.cloud/api/v1/schema/$KB"
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
| 200        | ConfigSchema        | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**Ingestion Agents and Tasks (15)**

**POST /dataset/{dataset_id}/task/start**

Start Dataset Task

Start an Ingestion Agent or a Task on a Dataset

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| dataset_id | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | TaskName | yes |  |  |
| parameters | DataAugmentation-Input \| SemanticModelMigrationParams \| null |  |  | Parameters to be passed to the task. These must match the validation field for the Task definition class |
| uuid_task | string \| null |  |  | UUID of an already configured task. This is used to start a task that was already configured |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/dataset/{dataset_id}/task/start"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"name": "dummy"<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | TaskResponse        | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**DELETE /dataset/{dataset_id}/task/{task_id}**

Delete Dataset Task

Delete an Ingestion Agent or a Task of a Dataset

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| dataset_id | path   | string   | yes     |                 |
| task_id    | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/dataset/{dataset_id}/task/{task_id}"
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
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /dataset/{dataset_id}/task/{task_id}/inspect**

Inspect Dataset Task

Get the status of an Ingestion Agent or a Task of a Dataset

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| dataset_id | path   | string   | yes     |                 |
| task_id    | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/dataset/{dataset_id}/task/{task_id}/inspect"
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
| 200        | PublicTaskRequest   | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /dataset/{dataset_id}/task/{task_id}/stop**

Stop Dataset Task

Stop an Ingestion Agent or a Task of a Dataset

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| dataset_id | path   | string   | yes     |                 |
| task_id    | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/dataset/{dataset_id}/task/{task_id}/stop"
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
| 200        | TaskResponse        | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /dataset/{dataset_id}/tasks**

List Account Available Tasks

Get the available tasks for a Dataset

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description**                   |
|------------|--------|----------|---------|-----------------------------------|
| dataset_id | path   | string   | yes     |                                   |
| count      | query  | integer  |         | How many finished tasks to return |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/dataset/{dataset_id}/tasks"
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
| 200        | TaskList            | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /kb/{kb_uuid}/task/start**

Start Knowledge Box Task

Start an Ingestion Agent or a Task on a Knowledge Box

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kb_uuid  | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | TaskName | yes |  |  |
| parameters | DataAugmentation-Input \| SemanticModelMigrationParams \| null |  |  | Parameters to be passed to the task. These must match the validation field for the Task definition class |
| uuid_task | string \| null |  |  | UUID of an already configured task. This is used to start a task that was already configured |
| apply | ApplyOptions |  | ALL | Defines how the tasks should be applied to the existing data. - EXSITING: Only apply to existing data (starts a worker that executes the task) - NEW: Only apply to new data (enables the task at proces… |
| enabled | boolean |  | True | Whether the task should be enabled at the time of creation. This only applies to tasks involving 'NEW' apply options, as 'EXISTING' tasks start immediately |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/task/start" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"name": "dummy",<br />
"apply": "EXISTING",<br />
"enabled": true<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | TaskResponse        | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**PATCH /kb/{kb_uuid}/task/{task_id}**

Patch Knowledge Box Task

Modify the parameters of a task. This is only available for tasks that
run on NEW resources, tasks that run on EXISTING resources cannot be
modified.

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kb_uuid  | path   | string   | yes     |                 |
| task_id  | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| parameters | DataAugmentation-Input \| SemanticModelMigrationParams \| null | yes |  | Parameters to be passed to the task. These must match the validation field for the Task definition class |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PATCH
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/task/{task_id}" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"parameters": {<br />
"name": "",<br />
"on": 0<br />
}<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | TaskRequest         | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**DELETE /kb/{kb_uuid}/task/{task_id}**

Delete Knowledge Box Task

Delete an Ingestion Agent or a Task of a Knowledge Box

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description**                           |
|----------|--------|----------|---------|-------------------------------------------|
| kb_uuid  | path   | string   | yes     |                                           |
| task_id  | path   | string   | yes     |                                           |
| cleanup  | query  | boolean  |         | Cleanup all data associated with the task |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/task/{task_id}" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
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

**POST /kb/{kb_uuid}/task/{task_id}/cleanup**

Cleanup Knowledge Box Task

Start a cleanup process for an Ingestion Agent or a Task of a Knowledge
Box

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kb_uuid  | path   | string   | yes     |                 |
| task_id  | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/task/{task_id}/cleanup"
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
| 200        | PublicTaskSet       | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /kb/{kb_uuid}/task/{task_id}/enable**

Enable Knowledge Box Task

Enable or disable a task. This is only available for tasks that run on
NEW resources. To disable a task that runs on EXISTING resources, use
the stop endpoint.

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| task_id  | path   | string   | yes     |                 |
| kb_uuid  | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|-----------|----------|---------|-------------|-----------------|
| enabled   | boolean  | yes     |             |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/task/{task_id}/enable"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"enabled": true<br />
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

**GET /kb/{kb_uuid}/task/{task_id}/inspect**

Inspect Knowledge Box Task

Get the details of an Ingestion Agent or a Task of a Knowledge Box

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kb_uuid  | path   | string   | yes     |                 |
| task_id  | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/task/{task_id}/inspect"
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
| 200        | PublicTaskSet       | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /kb/{kb_uuid}/task/{task_id}/restart**

Restart Knowledge Box Task

Restart an Ingestion Agent or a Task of a Knowledge Box. This only
affects tasks that are configured to run on EXISTING resources, for
tasks that run on NEW resources, use the enable endpoint.

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kb_uuid  | path   | string   | yes     |                 |
| task_id  | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/task/{task_id}/restart"
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
| 200        | TaskResponse        | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /kb/{kb_uuid}/task/{task_id}/stop**

Stop Knowledge Box Task

Stop an Ingestion Agent or a Task of a Knowledge Box. This only affects
tasks that are currently running on EXISTING resources, for disabling
tasks that run on NEW resources, use the enable endpoint.

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kb_uuid  | path   | string   | yes     |                 |
| task_id  | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/task/{task_id}/stop"
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
| 200        | TaskResponse        | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /kb/{kb_uuid}/task/{task_id}/worker_config**

Inspect Knowledge Box Task Worker

Get the worker config of a task on a knowledge box

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| task_id  | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/task/{task_id}/worker_config"
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
| 200        | TaskRequest         | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /kb/{kb_uuid}/tasks**

List Knowledge Box Available Tasks

Get the available Ingestion Agents and Tasks of a Knowledge Box

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description**                   |
|----------|--------|----------|---------|-----------------------------------|
| kb_uuid  | path   | string   | yes     |                                   |
| count    | query  | integer  |         | How many finished tasks to return |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET "https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/tasks"
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
| 200        | TaskList            | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**Training (1)**

**GET /download/{kbid}/model/{model_id}/{filename}**

Download Account Predictive Model File

Download the trained model or any other generated file as a result of a
training task on a Knowledge Box

**Parameters**

| **Name**   | **In** | **Type** | **Req** | **Description** |
|------------|--------|----------|---------|-----------------|
| kbid       | path   | string   | yes     |                 |
| model_id   | path   | string   | yes     |                 |
| filename   | path   | string   | yes     |                 |
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
"https://$ZONE.dp.progress.cloud/api/v1/download/$KB/model/{model_id}/{filename}"
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
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**Extract Strategies (4)**

**GET /extract_strategies/{kbid}**

Learning Extract Strategies

Get available extract strategies onprem

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/extract_strategies/$KB" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**                          | **Description**     |
|------------|-------------------------------------|---------------------|
| 200        | map\<string, ExtractConfig-Output\> | Successful Response |
| 422        | HTTPValidationError                 | Validation Error    |

**POST /extract_strategies/{kbid}**

Add A Extract Strategy To A Kb Onprem

Add a extract strategy to a KB to be used

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string |  |  |  |
| vllm_config | VLLMExtractionConfig-Input \| null |  |  |  |
| ai_tables | AITables-Input \| null |  |  |  |
| split | SplitConfig \| null |  |  |  |
| max_parallel_llm_calls | integer |  | 0 |  |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/extract_strategies/$KB" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"name": "",<br />
"max_parallel_llm_calls": 0<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | string              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /extract_strategies/{kbid}/strategies/{strategy_id}**

Extract Strategy Configuration

Get extract strategy for a given id

**Parameters**

| **Name**    | **In** | **Type** | **Req** | **Description** |
|-------------|--------|----------|---------|-----------------|
| kbid        | path   | string   | yes     |                 |
| strategy_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/extract_strategies/$KB/strategies/{strategy_id}"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**           | **Description**     |
|------------|----------------------|---------------------|
| 200        | ExtractConfig-Output | Successful Response |
| 422        | HTTPValidationError  | Validation Error    |

**DELETE /extract_strategies/{kbid}/strategies/{strategy_id}**

Disable Extract Strategy Onprem

Disable a extract strategy from a Knowledge Box

**Parameters**

| **Name**    | **In** | **Type** | **Req** | **Description** |
|-------------|--------|----------|---------|-----------------|
| kbid        | path   | string   | yes     |                 |
| strategy_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/extract_strategies/$KB/strategies/{strategy_id}"
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
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**Task Assets (2)**

**GET /kb/{kb_uuid}/assets**

List Kb Assets

List all assets for a Knowledge Box, ordered by creation date descending

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kb_uuid  | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET "https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/assets"
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
| 200        | AssetList           | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /kb/{kb_uuid}/assets/{asset_id}**

Get Kb Asset

Get a signed download URL for a single task asset

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kb_uuid  | path   | string   | yes     |                 |
| asset_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/assets/{asset_id}"
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
| 200        | AssetSignedURL      | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**Search (3)**

**POST /kb/{kbid}/ask**

Ask Knowledge Box

Ask questions on a Knowledge Box

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kbid | path | string | yes |  |
| x-ndb-client | header | NucliaDBClientType |  |  |
| x-show-consumption | header | boolean |  |  |
| x-nucliadb-user | header | string |  |  |
| x-forwarded-for | header | string |  |  |
| x-synchronous | header | boolean |  | When set to true, outputs response as JSON in a non-streaming way. This is slower and requires waiting for entire answer to be ready. |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| audit_metadata | map\<string, string\> \| null |  |  | A dictionary containing optional audit-specific metadata, such as userid, environment, or other contextual information. This metadata can be leveraged for filtering and analyzing activity logs in futu… |
| query | string | yes |  | The query to get a generative answer for |
| top_k | integer |  | 20 | The top most relevant results to fetch at the retrieval step. The maximum number of results allowed is 200. |
| filter_expression | FilterExpression \| null |  |  | Returns only documents that match this filter expression.Filtering examples can be found here: (see docs) This allows building complex filtering expressions and replaces the following parameters:field… |
| fields | array\<string\> |  | \[\] | The list of fields to search in. For instance: a/title to search only on title field. For more details on filtering by field, see: (see docs) |
| filters | array\<string\> \| array\<Filter\> |  | \[\] | The list of filters to apply. Filtering examples can be found here: (see docs) |
| keyword_filters | array\<string\> \| array\<Filter\> |  | \[\] | List of keyword filter expressions to apply to the retrieval step. The text block search will only be performed on the documents that contain the specified keywords. The filters are case-insensitive, … |
| vectorset | string \| null |  |  | Vectors index to perform the search in. If not provided, NucliaDB will use the default one |
| min_score | number \| MinScore \| null |  |  | Minimum score to filter search results. Results with a lower score will be ignored. Accepts either a float or a dictionary with the minimum scores for the bm25 and vector indexes. If a float is provid… |
| features | array\<ChatOptions\> |  | \['semantic', 'keyword'\] | Features enabled for the chat endpoint. Semantic search is done if semantic is included. If keyword is included, the results will include matching paragraphs from the bm25 index. If relations is inclu… |
| range_creation_start | string \| null |  |  | Resources created before this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53:00+05:00. |
| range_creation_end | string \| null |  |  | Resources created after this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53:00+05:00. |
| range_modification_start | string \| null |  |  | Resources modified before this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53:00+05:00. |
| range_modification_end | string \| null |  |  | Resources modified after this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53:00+05:00. |
| show | array\<ResourceProperties\> |  | \['basic'\] | Controls which types of metadata are serialized on resources of search results |
| field_type_filter | array\<FieldTypeName\> |  | \['text', 'file', 'link', 'conversation', 'generic', 'key_value'\] | Define which field types are serialized on resources of search results |
| extracted | array\<ExtractedDataTypeName\> |  | \[\] | \[Deprecated\] Please use GET resource endpoint instead to get extracted metadata |
| context | array\<ChatContextMessage\> \| null |  |  | DEPRECATED! Please, use chathistory instead. |
| chat_history | array\<ChatContextMessage\> \| null |  |  | Use to rephrase the new LLM query by taking into account the chat conversation history. This will be passed to the LLM so that it is aware of the previous conversation. |
| extra_context | array\<string\> \| null |  |  | Additional context that is added to the retrieval context sent to the LLM. It allows extending the chat feature with content that may not be in the Knowledge Box. |
| extra_context_images | array\<Image\> \| null |  |  | Additional images added to the retrieval context sent to the LLM." It allows extending the chat feature with content that may not be in the Knowledge Box. |
| query_image | Image \| null |  |  | Image that will be used together with the query text for retrieval and then sent to the LLM as part of the context. If a query image is provided, the extracontextimages and ragimagesstrategies will be… |
| highlight | boolean |  | False | If set to true, the query terms will be highlighted in the results between \<mark\>...\</mark\> tags |
| resource_filters | array\<string\> |  | \[\] | List of resource ids to filter search results for. Only paragraphs from the specified resources will be returned. |
| prompt | string \| CustomPrompt \| null |  |  | Use to customize the prompts given to the generative model. Both system and user prompts can be customized. If a string is provided, it is interpreted as the user prompt. |
| rank_fusion | RankFusionName \| ReciprocalRankFusion |  | rrf | Rank fusion algorithm to use to merge results from multiple retrievers (keyword, semantic) |
| reranker | RerankerName \| PredictReranker |  | predict | Reranker let you specify which method you want to use to rerank your results at the end of retrieval |
| citations | boolean \| CitationsType \| null |  |  | Whether to include citations in the response. If set to None or False, no citations will be computed. If set to True or 'default', citations will be computed after answer generation and send as a sepa… |
| citation_threshold | number \| null |  |  | If citations is set to True or 'default', this will be the similarity threshold. Value between 0 and 1, lower values will produce more citations. If not set, it will be set to the optimized threshold … |
| security | RequestSecurity \| null |  |  | Security metadata for the request. Please refer to the documentation for more details on how security works: (see docs) |
| show_hidden | boolean |  | False | If set to false (default), excludes hidden resources from search |
| rag_strategies | array\<FieldExtensionStrategy \| FullResourceStrategy \| HierarchyResourceStrategy \| NeighbouringParagraphsStrategy \| MetadataExtensionStrategy \| ConversationalStrategy \| PreQueriesStrategy \| GraphStrategy\> |  | \[\] | Options for tweaking how the context for the LLM model is crafted: - fullresource will add the full text of the matching resources to the context. This strategy cannot be combined with hierarchy, neig… |
| rag_images_strategies | array\<PageImageStrategy \| ParagraphImageStrategy \| TableImageStrategy\> |  | \[\] | Options for tweaking how the image based context for the LLM model is crafted: - pageimage will add the full page image of the matching resources to the context. - tables will send the table images fo… |
| debug | boolean |  | False | If set, the response will include some extra metadata for debugging purposes, like the list of queried nodes. |
| generative_model | string \| null |  |  | The generative model to use for the chat endpoint. If not provided, the model configured for the Knowledge Box is used. |
| generative_model_seed | integer \| null |  |  | The seed to use for the generative model for deterministic generation. Only supported by some models. |
| max_tokens | integer \| MaxTokens \| null |  |  | Use to limit the amount of tokens used in the LLM context and/or for generating the answer. If not provided, the default maximum tokens of the generative model will be used. If an integer is provided,… |
| rephrase | boolean |  | False | Rephrase the query for a more efficient retrieval. This will consume LLM tokens and make the request slower. |
| chat_history_relevance_threshold | number \| null |  |  | Threshold to determine if the past chat history is relevant to rephrase the user's question. 0 - Always treat previous messages as relevant (always rephrase).1 - Always treat previous messages as irre… |
| prefer_markdown | boolean |  | False | If set to true, the response will be in markdown format |
| answer_json_schema | object (free-form map) \| null |  |  | Desired JSON schema for the LLM answer. This schema is passed to the LLM so that it answers in a scructured format following the schema. If not provided, textual response is returned. Note that when u… |
| generate_answer | boolean |  | True | Whether to generate an answer using the generative model. If set to false, the response will only contain the retrieval results. |
| search_configuration | string \| null |  |  | Load ask parameters from this configuration. Parameters in the request override parameters from the configuration. |
| reasoning | Reasoning \| boolean |  | False | Reasoning options for the generative model. Set to True to enable default reasoning, False to disable, or provide a Reasoning object for custom options. |

**Example** — a real call captured against the live sandbox:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST "https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/ask"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"query": "How much does a home battery store and when is it
subsidised?",<br />
"top_k": 5,<br />
"features": [<br />
"keyword",<br />
"semantic"<br />
],<br />
"citations": true<br />
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
"answer": "A home battery stores 10kWh of usable capacity and is
subsidised starting from July 2025 under the federal Cheaper Home
Batteries program.",<br />
"status": "success",<br />
"retrieval_results": {<br />
"resources": {<br />
"86b5f7948b144b008f018cbd47a2bde4": {<br />
"id": "86b5f7948b144b008f018cbd47a2bde4",<br />
"slug": "battery-storage",<br />
"title": "Home Battery Storage",<br />
"summary": "",<br />
"icon": "text/plain",<br />
"thumbnail": "",<br />
"metadata": {<br />
"metadata": {},<br />
"language": "en",<br />
"languages": [<br />
"en"<br />
],<br />
"status": "PROCESSED"<br />
},<br />
"usermetadata": {<br />
"classifications": [<br />
{<br />
"labelset": "topic",<br />
"label": "energy",<br />
"cancelled_by_user": false<br />
}<br />
],<br />
"relations": []<br />
},<br />
"fi<br />
... (truncated)</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | SyncAskResponse     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /kb/{kbid}/resource/{rid}/ask**

Ask a resource (by id)

Ask questions to a resource

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kbid | path | string | yes |  |
| rid | path | string | yes |  |
| x-show-consumption | header | boolean |  |  |
| x-ndb-client | header | NucliaDBClientType |  |  |
| x-nucliadb-user | header | string |  |  |
| x-forwarded-for | header | string |  |  |
| x-synchronous | header | boolean |  | When set to true, outputs response as JSON in a non-streaming way. This is slower and requires waiting for entire answer to be ready. |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| audit_metadata | map\<string, string\> \| null |  |  | A dictionary containing optional audit-specific metadata, such as userid, environment, or other contextual information. This metadata can be leveraged for filtering and analyzing activity logs in futu… |
| query | string | yes |  | The query to get a generative answer for |
| top_k | integer |  | 20 | The top most relevant results to fetch at the retrieval step. The maximum number of results allowed is 200. |
| filter_expression | FilterExpression \| null |  |  | Returns only documents that match this filter expression.Filtering examples can be found here: (see docs) This allows building complex filtering expressions and replaces the following parameters:field… |
| fields | array\<string\> |  | \[\] | The list of fields to search in. For instance: a/title to search only on title field. For more details on filtering by field, see: (see docs) |
| filters | array\<string\> \| array\<Filter\> |  | \[\] | The list of filters to apply. Filtering examples can be found here: (see docs) |
| keyword_filters | array\<string\> \| array\<Filter\> |  | \[\] | List of keyword filter expressions to apply to the retrieval step. The text block search will only be performed on the documents that contain the specified keywords. The filters are case-insensitive, … |
| vectorset | string \| null |  |  | Vectors index to perform the search in. If not provided, NucliaDB will use the default one |
| min_score | number \| MinScore \| null |  |  | Minimum score to filter search results. Results with a lower score will be ignored. Accepts either a float or a dictionary with the minimum scores for the bm25 and vector indexes. If a float is provid… |
| features | array\<ChatOptions\> |  | \['semantic', 'keyword'\] | Features enabled for the chat endpoint. Semantic search is done if semantic is included. If keyword is included, the results will include matching paragraphs from the bm25 index. If relations is inclu… |
| range_creation_start | string \| null |  |  | Resources created before this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53:00+05:00. |
| range_creation_end | string \| null |  |  | Resources created after this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53:00+05:00. |
| range_modification_start | string \| null |  |  | Resources modified before this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53:00+05:00. |
| range_modification_end | string \| null |  |  | Resources modified after this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53:00+05:00. |
| show | array\<ResourceProperties\> |  | \['basic'\] | Controls which types of metadata are serialized on resources of search results |
| field_type_filter | array\<FieldTypeName\> |  | \['text', 'file', 'link', 'conversation', 'generic', 'key_value'\] | Define which field types are serialized on resources of search results |
| extracted | array\<ExtractedDataTypeName\> |  | \[\] | \[Deprecated\] Please use GET resource endpoint instead to get extracted metadata |
| context | array\<ChatContextMessage\> \| null |  |  | DEPRECATED! Please, use chathistory instead. |
| chat_history | array\<ChatContextMessage\> \| null |  |  | Use to rephrase the new LLM query by taking into account the chat conversation history. This will be passed to the LLM so that it is aware of the previous conversation. |
| extra_context | array\<string\> \| null |  |  | Additional context that is added to the retrieval context sent to the LLM. It allows extending the chat feature with content that may not be in the Knowledge Box. |
| extra_context_images | array\<Image\> \| null |  |  | Additional images added to the retrieval context sent to the LLM." It allows extending the chat feature with content that may not be in the Knowledge Box. |
| query_image | Image \| null |  |  | Image that will be used together with the query text for retrieval and then sent to the LLM as part of the context. If a query image is provided, the extracontextimages and ragimagesstrategies will be… |
| highlight | boolean |  | False | If set to true, the query terms will be highlighted in the results between \<mark\>...\</mark\> tags |
| resource_filters | array\<string\> |  | \[\] | List of resource ids to filter search results for. Only paragraphs from the specified resources will be returned. |
| prompt | string \| CustomPrompt \| null |  |  | Use to customize the prompts given to the generative model. Both system and user prompts can be customized. If a string is provided, it is interpreted as the user prompt. |
| rank_fusion | RankFusionName \| ReciprocalRankFusion |  | rrf | Rank fusion algorithm to use to merge results from multiple retrievers (keyword, semantic) |
| reranker | RerankerName \| PredictReranker |  | predict | Reranker let you specify which method you want to use to rerank your results at the end of retrieval |
| citations | boolean \| CitationsType \| null |  |  | Whether to include citations in the response. If set to None or False, no citations will be computed. If set to True or 'default', citations will be computed after answer generation and send as a sepa… |
| citation_threshold | number \| null |  |  | If citations is set to True or 'default', this will be the similarity threshold. Value between 0 and 1, lower values will produce more citations. If not set, it will be set to the optimized threshold … |
| security | RequestSecurity \| null |  |  | Security metadata for the request. Please refer to the documentation for more details on how security works: (see docs) |
| show_hidden | boolean |  | False | If set to false (default), excludes hidden resources from search |
| rag_strategies | array\<FieldExtensionStrategy \| FullResourceStrategy \| HierarchyResourceStrategy \| NeighbouringParagraphsStrategy \| MetadataExtensionStrategy \| ConversationalStrategy \| PreQueriesStrategy \| GraphStrategy\> |  | \[\] | Options for tweaking how the context for the LLM model is crafted: - fullresource will add the full text of the matching resources to the context. This strategy cannot be combined with hierarchy, neig… |
| rag_images_strategies | array\<PageImageStrategy \| ParagraphImageStrategy \| TableImageStrategy\> |  | \[\] | Options for tweaking how the image based context for the LLM model is crafted: - pageimage will add the full page image of the matching resources to the context. - tables will send the table images fo… |
| debug | boolean |  | False | If set, the response will include some extra metadata for debugging purposes, like the list of queried nodes. |
| generative_model | string \| null |  |  | The generative model to use for the chat endpoint. If not provided, the model configured for the Knowledge Box is used. |
| generative_model_seed | integer \| null |  |  | The seed to use for the generative model for deterministic generation. Only supported by some models. |
| max_tokens | integer \| MaxTokens \| null |  |  | Use to limit the amount of tokens used in the LLM context and/or for generating the answer. If not provided, the default maximum tokens of the generative model will be used. If an integer is provided,… |
| rephrase | boolean |  | False | Rephrase the query for a more efficient retrieval. This will consume LLM tokens and make the request slower. |
| chat_history_relevance_threshold | number \| null |  |  | Threshold to determine if the past chat history is relevant to rephrase the user's question. 0 - Always treat previous messages as relevant (always rephrase).1 - Always treat previous messages as irre… |
| prefer_markdown | boolean |  | False | If set to true, the response will be in markdown format |
| answer_json_schema | object (free-form map) \| null |  |  | Desired JSON schema for the LLM answer. This schema is passed to the LLM so that it answers in a scructured format following the schema. If not provided, textual response is returned. Note that when u… |
| generate_answer | boolean |  | True | Whether to generate an answer using the generative model. If set to false, the response will only contain the retrieval results. |
| search_configuration | string \| null |  |  | Load ask parameters from this configuration. Parameters in the request override parameters from the configuration. |
| reasoning | Reasoning \| boolean |  | False | Reasoning options for the generative model. Set to True to enable default reasoning, False to disable, or provide a Reasoning object for custom options. |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/resource/$RID/ask"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"query": "your question here",<br />
"top_k": 20,<br />
"fields": [],<br />
"features": [<br />
"semantic",<br />
"keyword"<br />
],<br />
"show": [<br />
"basic"<br />
],<br />
"field_type_filter": [<br />
"text",<br />
"file",<br />
"link",<br />
"conversation",<br />
"generic",<br />
"key_value"<br />
]<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | SyncAskResponse     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /kb/{kbid}/slug/{slug}/ask**

Ask a resource (by slug)

Ask questions to a resource

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kbid | path | string | yes |  |
| slug | path | string | yes |  |
| x-show-consumption | header | boolean |  |  |
| x-ndb-client | header | NucliaDBClientType |  |  |
| x-nucliadb-user | header | string |  |  |
| x-forwarded-for | header | string |  |  |
| x-synchronous | header | boolean |  | When set to true, outputs response as JSON in a non-streaming way. This is slower and requires waiting for entire answer to be ready. |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| audit_metadata | map\<string, string\> \| null |  |  | A dictionary containing optional audit-specific metadata, such as userid, environment, or other contextual information. This metadata can be leveraged for filtering and analyzing activity logs in futu… |
| query | string | yes |  | The query to get a generative answer for |
| top_k | integer |  | 20 | The top most relevant results to fetch at the retrieval step. The maximum number of results allowed is 200. |
| filter_expression | FilterExpression \| null |  |  | Returns only documents that match this filter expression.Filtering examples can be found here: (see docs) This allows building complex filtering expressions and replaces the following parameters:field… |
| fields | array\<string\> |  | \[\] | The list of fields to search in. For instance: a/title to search only on title field. For more details on filtering by field, see: (see docs) |
| filters | array\<string\> \| array\<Filter\> |  | \[\] | The list of filters to apply. Filtering examples can be found here: (see docs) |
| keyword_filters | array\<string\> \| array\<Filter\> |  | \[\] | List of keyword filter expressions to apply to the retrieval step. The text block search will only be performed on the documents that contain the specified keywords. The filters are case-insensitive, … |
| vectorset | string \| null |  |  | Vectors index to perform the search in. If not provided, NucliaDB will use the default one |
| min_score | number \| MinScore \| null |  |  | Minimum score to filter search results. Results with a lower score will be ignored. Accepts either a float or a dictionary with the minimum scores for the bm25 and vector indexes. If a float is provid… |
| features | array\<ChatOptions\> |  | \['semantic', 'keyword'\] | Features enabled for the chat endpoint. Semantic search is done if semantic is included. If keyword is included, the results will include matching paragraphs from the bm25 index. If relations is inclu… |
| range_creation_start | string \| null |  |  | Resources created before this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53:00+05:00. |
| range_creation_end | string \| null |  |  | Resources created after this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53:00+05:00. |
| range_modification_start | string \| null |  |  | Resources modified before this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53:00+05:00. |
| range_modification_end | string \| null |  |  | Resources modified after this date will be filtered out of search results. Datetime are represented as a str in ISO 8601 format, like: 2008-09-15T15:53:00+05:00. |
| show | array\<ResourceProperties\> |  | \['basic'\] | Controls which types of metadata are serialized on resources of search results |
| field_type_filter | array\<FieldTypeName\> |  | \['text', 'file', 'link', 'conversation', 'generic', 'key_value'\] | Define which field types are serialized on resources of search results |
| extracted | array\<ExtractedDataTypeName\> |  | \[\] | \[Deprecated\] Please use GET resource endpoint instead to get extracted metadata |
| context | array\<ChatContextMessage\> \| null |  |  | DEPRECATED! Please, use chathistory instead. |
| chat_history | array\<ChatContextMessage\> \| null |  |  | Use to rephrase the new LLM query by taking into account the chat conversation history. This will be passed to the LLM so that it is aware of the previous conversation. |
| extra_context | array\<string\> \| null |  |  | Additional context that is added to the retrieval context sent to the LLM. It allows extending the chat feature with content that may not be in the Knowledge Box. |
| extra_context_images | array\<Image\> \| null |  |  | Additional images added to the retrieval context sent to the LLM." It allows extending the chat feature with content that may not be in the Knowledge Box. |
| query_image | Image \| null |  |  | Image that will be used together with the query text for retrieval and then sent to the LLM as part of the context. If a query image is provided, the extracontextimages and ragimagesstrategies will be… |
| highlight | boolean |  | False | If set to true, the query terms will be highlighted in the results between \<mark\>...\</mark\> tags |
| resource_filters | array\<string\> |  | \[\] | List of resource ids to filter search results for. Only paragraphs from the specified resources will be returned. |
| prompt | string \| CustomPrompt \| null |  |  | Use to customize the prompts given to the generative model. Both system and user prompts can be customized. If a string is provided, it is interpreted as the user prompt. |
| rank_fusion | RankFusionName \| ReciprocalRankFusion |  | rrf | Rank fusion algorithm to use to merge results from multiple retrievers (keyword, semantic) |
| reranker | RerankerName \| PredictReranker |  | predict | Reranker let you specify which method you want to use to rerank your results at the end of retrieval |
| citations | boolean \| CitationsType \| null |  |  | Whether to include citations in the response. If set to None or False, no citations will be computed. If set to True or 'default', citations will be computed after answer generation and send as a sepa… |
| citation_threshold | number \| null |  |  | If citations is set to True or 'default', this will be the similarity threshold. Value between 0 and 1, lower values will produce more citations. If not set, it will be set to the optimized threshold … |
| security | RequestSecurity \| null |  |  | Security metadata for the request. Please refer to the documentation for more details on how security works: (see docs) |
| show_hidden | boolean |  | False | If set to false (default), excludes hidden resources from search |
| rag_strategies | array\<FieldExtensionStrategy \| FullResourceStrategy \| HierarchyResourceStrategy \| NeighbouringParagraphsStrategy \| MetadataExtensionStrategy \| ConversationalStrategy \| PreQueriesStrategy \| GraphStrategy\> |  | \[\] | Options for tweaking how the context for the LLM model is crafted: - fullresource will add the full text of the matching resources to the context. This strategy cannot be combined with hierarchy, neig… |
| rag_images_strategies | array\<PageImageStrategy \| ParagraphImageStrategy \| TableImageStrategy\> |  | \[\] | Options for tweaking how the image based context for the LLM model is crafted: - pageimage will add the full page image of the matching resources to the context. - tables will send the table images fo… |
| debug | boolean |  | False | If set, the response will include some extra metadata for debugging purposes, like the list of queried nodes. |
| generative_model | string \| null |  |  | The generative model to use for the chat endpoint. If not provided, the model configured for the Knowledge Box is used. |
| generative_model_seed | integer \| null |  |  | The seed to use for the generative model for deterministic generation. Only supported by some models. |
| max_tokens | integer \| MaxTokens \| null |  |  | Use to limit the amount of tokens used in the LLM context and/or for generating the answer. If not provided, the default maximum tokens of the generative model will be used. If an integer is provided,… |
| rephrase | boolean |  | False | Rephrase the query for a more efficient retrieval. This will consume LLM tokens and make the request slower. |
| chat_history_relevance_threshold | number \| null |  |  | Threshold to determine if the past chat history is relevant to rephrase the user's question. 0 - Always treat previous messages as relevant (always rephrase).1 - Always treat previous messages as irre… |
| prefer_markdown | boolean |  | False | If set to true, the response will be in markdown format |
| answer_json_schema | object (free-form map) \| null |  |  | Desired JSON schema for the LLM answer. This schema is passed to the LLM so that it answers in a scructured format following the schema. If not provided, textual response is returned. Note that when u… |
| generate_answer | boolean |  | True | Whether to generate an answer using the generative model. If set to false, the response will only contain the retrieval results. |
| search_configuration | string \| null |  |  | Load ask parameters from this configuration. Parameters in the request override parameters from the configuration. |
| reasoning | Reasoning \| boolean |  | False | Reasoning options for the generative model. Set to True to enable default reasoning, False to disable, or provide a Reasoning object for custom options. |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/slug/{slug}/ask" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"query": "your question here",<br />
"top_k": 20,<br />
"fields": [],<br />
"features": [<br />
"semantic",<br />
"keyword"<br />
],<br />
"show": [<br />
"basic"<br />
],<br />
"field_type_filter": [<br />
"text",<br />
"file",<br />
"link",<br />
"conversation",<br />
"generic",<br />
"key_value"<br />
]<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | SyncAskResponse     | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**Predict (23)**

**POST /predict/chat**

Predict Chat

Chat interface for your NucliaDB

**Parameters**

| **Name**           | **In** | **Type** | **Req** | **Description** |
|--------------------|--------|----------|---------|-----------------|
| model              | query  | string   |         |                 |
| x-show-consumption | header | boolean  |         |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| question | string | yes |  |  |
| retrieval | boolean |  | True |  |
| user_id | string |  | system |  |
| system | string \| null |  |  |  |
| chat_history | array\<AssistantMessage \| ToolMessage \| Message\> |  |  |  |
| context | array\<Message\> |  | \[\] |  |
| query_context | array\<string\> \| map\<string, string\> |  | {} |  |
| query_context_order | map\<string, integer\> |  | {} |  |
| truncate | boolean \| null |  | True |  |
| user_prompt | UserPrompt \| null |  |  |  |
| citations | boolean \| CitationsType \| null |  |  | Whether to include citations in the response. If set to None or False, no citations will be computed. If set to True or 'default', citations will be computed after answer generation and send as a sepa… |
| citation_threshold | number \| null |  |  | If citations is set to True or 'default', this will be the similarity threshold. Value between 0 and 1, lower values will produce more citations. If not set, it will be set to the optimized threshold … |
| generative_model | string \| null |  |  |  |
| max_tokens | integer \| null |  |  |  |
| query_context_images | array\<Image\> \| map\<string, Image\> |  | {} |  |
| prefer_markdown | boolean \| null |  |  |  |
| json_schema | object (free-form map) \| null |  |  |  |
| format_prompt | boolean |  | True |  |
| rerank_context | boolean |  | False | Whether to reorder the query context based on a reranker. This option will also make it so the first response will contain the scores given for each context piece. |
| tools | array\<Tool\> |  |  | List of tools to choose |
| tool_choice | ToolChoiceAuto \| ToolChoiceNone \| ToolChoiceRequired \| ToolChoiceForced |  | {'type': 'required'} | Tool choice strategy. auto: The model decides whether to use a tool or not based on the prompt and available tools. required (default): A tool must be used.none: Disables tool usage even if tools are … |
| seed | integer \| null |  |  | Seed use for the generative model for a deterministic output. |
| reasoning | Reasoning \| boolean |  | False | Reasoning options for the generative model. Set to True to enable default reasoning, False to disable, or provide a Reasoning object for custom options. |
| image_generation | boolean |  | False | Whether to enable image generation in the response. |

**Example** — a real call captured against the live sandbox:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST "https://$ZONE.dp.progress.cloud/api/v1/predict/chat"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"question": "What is 2+2? Answer with just the number.",<br />
"query_context": [],<br />
"user_id": "book-test"<br />
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
<p>Not enough data to answer this.-2</p></th>
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

**POST /predict/chat/{kbid}**

Predict Chat Kbid

Chat interface for your NucliaDB

**Parameters**

| **Name**           | **In** | **Type** | **Req** | **Description** |
|--------------------|--------|----------|---------|-----------------|
| kbid               | path   | string   | yes     |                 |
| x-show-consumption | header | boolean  |         |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| question | string | yes |  |  |
| retrieval | boolean |  | True |  |
| user_id | string |  | system |  |
| system | string \| null |  |  |  |
| chat_history | array\<AssistantMessage \| ToolMessage \| Message\> |  |  |  |
| context | array\<Message\> |  | \[\] |  |
| query_context | array\<string\> \| map\<string, string\> |  | {} |  |
| query_context_order | map\<string, integer\> |  | {} |  |
| truncate | boolean \| null |  | True |  |
| user_prompt | UserPrompt \| null |  |  |  |
| citations | boolean \| CitationsType \| null |  |  | Whether to include citations in the response. If set to None or False, no citations will be computed. If set to True or 'default', citations will be computed after answer generation and send as a sepa… |
| citation_threshold | number \| null |  |  | If citations is set to True or 'default', this will be the similarity threshold. Value between 0 and 1, lower values will produce more citations. If not set, it will be set to the optimized threshold … |
| generative_model | string \| null |  |  |  |
| max_tokens | integer \| null |  |  |  |
| query_context_images | array\<Image\> \| map\<string, Image\> |  | {} |  |
| prefer_markdown | boolean \| null |  |  |  |
| json_schema | object (free-form map) \| null |  |  |  |
| format_prompt | boolean |  | True |  |
| rerank_context | boolean |  | False | Whether to reorder the query context based on a reranker. This option will also make it so the first response will contain the scores given for each context piece. |
| tools | array\<Tool\> |  |  | List of tools to choose |
| tool_choice | ToolChoiceAuto \| ToolChoiceNone \| ToolChoiceRequired \| ToolChoiceForced |  | {'type': 'required'} | Tool choice strategy. auto: The model decides whether to use a tool or not based on the prompt and available tools. required (default): A tool must be used.none: Disables tool usage even if tools are … |
| seed | integer \| null |  |  | Seed use for the generative model for a deterministic output. |
| reasoning | Reasoning \| boolean |  | False | Reasoning options for the generative model. Set to True to enable default reasoning, False to disable, or provide a Reasoning object for custom options. |
| image_generation | boolean |  | False | Whether to enable image generation in the response. |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/predict/chat/$KB" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"question": "your question here",<br />
"retrieval": true,<br />
"user_id": "system",<br />
"format_prompt": true,<br />
"rerank_context": false,<br />
"image_generation": false<br />
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

**POST /predict/compat/chat/completions**

Chat Completions

OpenAI-compatible chat completions

**Parameters**

| **Name**           | **In** | **Type** | **Req** | **Description** |
|--------------------|--------|----------|---------|-----------------|
| x-show-consumption | header | boolean  |         |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| messages | array\<ChatCompletionDeveloperMessageParam \| ChatCompletionSystemMessageParam \| ChatCompletionUserMessageParam \| ChatCompletionAssistantMessageParam \| ChatCompletionToolMessageParam \| ChatCompletionFunctionMessageParam\> | yes |  |  |
| model | string \| null |  |  |  |
| stream | boolean |  | False |  |
| max_tokens | integer \| null |  |  |  |
| seed | integer \| null |  |  |  |
| temperature | number \| null |  |  |  |
| top_p | number \| null |  |  |  |
| user | string \| null |  |  |  |
| tools | array\<ChatCompletionFunctionToolParam\> \| null |  |  |  |
| tool_choice | enum\[none, auto, required\] \| ChatCompletionAllowedToolChoiceParam \| ChatCompletionNamedToolChoiceParam \| ChatCompletionNamedToolChoiceCustomParam \| null |  |  |  |
| response_format | ResponseFormatText \| ResponseFormatJSONSchema \| ResponseFormatJSONObject \| null |  |  |  |
| json_schema | object (free-form map) \| null |  |  |  |
| reasoning_effort | enum\[none, minimal, low, medium, high, xhigh\] \| null |  |  |  |
| image_generation | boolean \| null |  |  |  |
| truncate | boolean \| null |  |  |  |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/predict/compat/chat/completions"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"messages": [<br />
{<br />
"content": "string",<br />
"role": "string",<br />
"name": "string"<br />
}<br />
],<br />
"stream": false<br />
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

**POST /predict/compat/embeddings**

Predict Sentences

Get the vector of a sentence

**Parameters**

| **Name**           | **In** | **Type** | **Req** | **Description** |
|--------------------|--------|----------|---------|-----------------|
| x-show-consumption | header | boolean  |         |                 |

**Request body** — application/json (required)

| **Field** | **Type**                  | **Req** | **Default** | **Description** |
|-----------|---------------------------|---------|-------------|-----------------|
| input     | array\<string\> \| string | yes     |             |                 |
| model     | string \| null            |         |             |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/predict/compat/embeddings"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"input": [<br />
"string"<br />
]<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**              | **Description**     |
|------------|-------------------------|---------------------|
| 200        | EmbeddingsResponseModel | Successful Response |
| 422        | HTTPValidationError     | Validation Error    |

**GET /predict/compat/models**

List Models

OpenAI-compatible chat completions

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/predict/compat/models" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | ListModelsResponse  | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /predict/compat/models/{model_id}**

Get Model

OpenAI-compatible chat completions

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| model_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/predict/compat/models/{model_id}"
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
| 200        | ModelInfo           | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /predict/query**

Predict Query

Get the vector of a sentence. This endpoint is deprecated, please use
the POST endpoint instead.

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| text | query | string \| null |  | Text to process |
| semantic_model | query | string |  |  |
| token_model | query | string |  |  |
| generative_model | query | string |  |  |
| rephrase | query | boolean |  |  |
| rephrase_prompt | query | string \| null |  | Prompt to rephrase the sentence, if not provided, the default prompt will be used. It must include the {question} placeholder. The placeholder will be… |
| agentic_entities | query | boolean |  | If true, the model will return the entities detected in the sentence guided by an already defined Graph Extraction Agent in the Knowledge Box. |
| graph_nodes | query | array\<string\> \| null |  | List of graph node names to compute embeddings for. If not provided, no graph node embeddings will be computed. |
| semantic_graph_node_models | query | array\<string\> \| null |  | Semantic models to compute graph node embeddings for. If not provided, the default graph semantic model will be used. |
| graph_edges | query | array\<string\> \| null |  | List of graph edge labels to compute embeddings for. If not provided, no graph edge embeddings will be computed. |
| semantic_graph_edge_models | query | array\<string\> \| null |  | Semantic models to compute graph edge embeddings for. If not provided, the default graph semantic model will be used. |
| x-show-consumption | header | boolean |  |  |

**Example** — a real call captured against the live sandbox:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET "https://$ZONE.dp.progress.cloud/api/v1/predict/query"
\<br />
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
<p>{<br />
"language": "en",<br />
"stop_words": [],<br />
"semantic_threshold": 0.4,<br />
"semantic_thresholds": {<br />
"multilingual-2024-05-06": 0.4<br />
},<br />
"visual_llm": true,<br />
"max_context": 128000,<br />
"entities": {<br />
"tokens": [],<br />
"time": 0.005558967590332031,<br />
"input_tokens": 6<br />
},<br />
"sentence": {<br />
"data": [<br />
-0.04191460460424423,<br />
0.0056065721437335014,<br />
-0.053347326815128326,<br />
-0.017205987125635147,<br />
-0.04948826879262924,<br />
-0.016326231881976128,<br />
0.005131538026034832,<br />
0.058367349207401276,<br />
-0.009004657156765461,<br />
0.01678045466542244,<br />
0.045586612075567245,<br />
0.04044400155544281,<br />
0.007959005422890186,<br />
0.02128644660115242,<br />
-0.0064488910138607025,<br />
-0.01187361590564251,<br />
0.026733797043561935,<br />
0.006086751818656921,<br />
0.0387454554438591,<br />
-0.005352390464395285,<br />
0.02820778824388981,<br />
... (truncated)</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | QueryInfo           | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /predict/query**

Predict Query Post

Preprocess a query.

**Parameters**

| **Name**           | **In** | **Type** | **Req** | **Description** |
|--------------------|--------|----------|---------|-----------------|
| x-show-consumption | header | boolean  |         |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| text | string \| null |  |  | The query text to be processed |
| query_image | Image \| null |  |  | Image to be considered as part of the query. Even if the rephrase parameter is set to false, the rephrasing process will occur, combining the provided text with the image's visual features in the reph… |
| rephrase | boolean |  | False | If true, the model will rephrase the input text before processing |
| rephrase_prompt | string \| null |  |  | Custom prompt for rephrasing the input text |
| generative_model | string |  | chatgpt-azure-4o | The generative model to use for rephrasing. |
| semantic_models | array\<string\> \| null |  |  | Semantic models to compute the sentence vector for, if not provided, it will only compute the sentence vector for default semantic model in the Knowledge box's configuration. |
| agentic_entities | boolean |  | False | If true, the model will return the entities detected in the sentence guided by an already defined Graph Extraction Agent in the Knowledge Box. |
| graph_nodes | array\<string\> \| null |  |  | List of graph node names to compute embeddings for. If not provided, no graph node embeddings will be computed. |
| semantic_graph_node_models | array\<string\> \| null |  |  | Semantic models to compute graph node embeddings for. If not provided, it will only compute embeddings for the default graph semantic model in the Knowledge box's configuration. |
| graph_edges | array\<string\> \| null |  |  | List of graph edge labels to compute embeddings for. If not provided, no graph edge embeddings will be computed. |
| semantic_graph_edge_models | array\<string\> \| null |  |  | Semantic models to compute graph edge embeddings for. If not provided, it will only compute embeddings for the default graph edge semantic model in the Knowledge box's configuration. |
| token_model | string |  | multilingual | The NER model to use for extracting entities from the input text. |
| semantic_model | string |  | multilingual-2024-05-06 | Semantic model to compute the sentence vector for. |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST "https://$ZONE.dp.progress.cloud/api/v1/predict/query"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"rephrase": false,<br />
"generative_model": "chatgpt-azure-4o",<br />
"agentic_entities": false,<br />
"token_model": "multilingual",<br />
"semantic_model": "multilingual-2024-05-06"<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | QueryInfo           | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /predict/query/{kbid}**

Predict Query Kbid

Get the vector of a sentence

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kbid | path | string | yes |  |
| text | query | string \| null |  | Text to process |
| semantic_models | query | array\<string\> \| null |  | Semantic models to compute the sentence vector for, if not provided, it will only compute the sentence vector for default semantic model in the Knowle… |
| graph_nodes | query | array\<string\> \| null |  | List of graph node names to compute embeddings for. If not provided, no graph node embeddings will be computed. |
| semantic_graph_node_models | query | array\<string\> \| null |  | Semantic models to compute graph node embeddings for. If not provided, it will only compute embeddings for the default graph semantic model in the Kno… |
| graph_edges | query | array\<string\> \| null |  | List of graph edge labels to compute embeddings for. If not provided, no graph edge embeddings will be computed. |
| semantic_graph_edge_models | query | array\<string\> \| null |  | Semantic models to compute graph edge embeddings for. If not provided, it will only compute embeddings for the default graph edge semantic model in th… |
| generative_model | query | string |  |  |
| rephrase | query | boolean |  |  |
| rephrase_prompt | query | string \| null |  | Prompt to rephrase the sentence, if not provided, the default prompt will be used. It must include the {question} placeholder. The placeholder will be… |
| agentic_entities | query | boolean |  | If true, the model will return the entities detected in the sentence guided by an already defined Graph Extraction Agent in the Knowledge Box. |
| x-show-consumption | header | boolean |  |  |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/predict/query/$KB" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | QueryInfo           | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /predict/query/{kbid}**

Predict Query Post Kbid

Get the vector of a sentence

**Parameters**

| **Name**           | **In** | **Type** | **Req** | **Description** |
|--------------------|--------|----------|---------|-----------------|
| kbid               | path   | string   | yes     |                 |
| x-show-consumption | header | boolean  |         |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| text | string \| null |  |  | The query text to be processed |
| query_image | Image \| null |  |  | Image to be considered as part of the query. Even if the rephrase parameter is set to false, the rephrasing process will occur, combining the provided text with the image's visual features in the reph… |
| rephrase | boolean |  | False | If true, the model will rephrase the input text before processing |
| rephrase_prompt | string \| null |  |  | Custom prompt for rephrasing the input text |
| generative_model | string \| null |  |  | The generative model to use for rephrasing |
| semantic_models | array\<string\> \| null |  |  | Semantic models to compute the sentence vector for, if not provided, it will only compute the sentence vector for default semantic model in the Knowledge box's configuration. |
| agentic_entities | boolean |  | False | If true, the model will return the entities detected in the sentence guided by an already defined Graph Extraction Agent in the Knowledge Box. |
| graph_nodes | array\<string\> \| null |  |  | List of graph node names to compute embeddings for. If not provided, no graph node embeddings will be computed. |
| semantic_graph_node_models | array\<string\> \| null |  |  | Semantic models to compute graph node embeddings for. If not provided, it will only compute embeddings for the default graph semantic model in the Knowledge box's configuration. |
| graph_edges | array\<string\> \| null |  |  | List of graph edge labels to compute embeddings for. If not provided, no graph edge embeddings will be computed. |
| semantic_graph_edge_models | array\<string\> \| null |  |  | Semantic models to compute graph edge embeddings for. If not provided, it will only compute embeddings for the default graph edge semantic model in the Knowledge box's configuration. |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/predict/query/$KB" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"rephrase": false,<br />
"agentic_entities": false<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | QueryInfo           | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /predict/remi**

Predict Remi

The REMi model is a model that computes metrics for a given question,
answer and contexts. The metrics computed are: - Answer Relevance:
Measures the relevance of the generated answer to the user query, in a
scale of 0 to 5. - Context Relevance: Measures the relevance of the
retrieved context to the user query, in a scale of 0 to 5. -
Groundedness: Measures the degree to which the generated answer…

**Parameters**

| **Name**           | **In** | **Type** | **Req** | **Description** |
|--------------------|--------|----------|---------|-----------------|
| x-show-consumption | header | boolean  |         |                 |

**Request body** — application/json (required)

| **Field** | **Type**                | **Req** | **Default** | **Description** |
|-----------|-------------------------|---------|-------------|-----------------|
| user_id   | string                  | yes     |             |                 |
| question  | string \| null          |         |             |                 |
| answer    | string \| null          |         |             |                 |
| contexts  | array\<string\> \| null |         |             |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST "https://$ZONE.dp.progress.cloud/api/v1/predict/remi"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"user_id": "string"<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | RemiResponse        | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /predict/remi/{kbid}**

Predict Remi Kbid

The REMi model is a model that computes metrics for a given question,
answer and contexts. The metrics computed are: - Answer Relevance:
Measures the relevance of the generated answer to the user query, in a
scale of 0 to 5. - Context Relevance: Measures the relevance of the
retrieved context to the user query, in a scale of 0 to 5. -
Groundedness: Measures the degree to which the generated answer…

**Parameters**

| **Name**           | **In** | **Type** | **Req** | **Description** |
|--------------------|--------|----------|---------|-----------------|
| kbid               | path   | string   | yes     |                 |
| x-show-consumption | header | boolean  |         |                 |

**Request body** — application/json (required)

| **Field** | **Type**                | **Req** | **Default** | **Description** |
|-----------|-------------------------|---------|-------------|-----------------|
| user_id   | string                  | yes     |             |                 |
| question  | string \| null          |         |             |                 |
| answer    | string \| null          |         |             |                 |
| contexts  | array\<string\> \| null |         |             |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/predict/remi/$KB" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"user_id": "string"<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | RemiResponse        | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /predict/rephrase**

Predict Rephrase

Rephrase interface for your NucliaDB

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| model    | query  | string   |         |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| question | string | yes |  |  |
| chat_history | array\<Message\> |  |  |  |
| context | array\<Message\> |  |  |  |
| user_context | array\<string\> \| null |  |  |  |
| user_id | string |  | system |  |
| generative_model | string \| null |  |  | The generative model to use for the rephrase endpoint. If not provided, the model configured for the Knowledge Box is used. |
| prompt | string \| null |  |  | Prompt to send the model to rephrase the sentence, if not provided, the default prompt will be used. It must include the {question} placeholder. The placeholder will be replaced with the original ques… |
| chat_history_relevance_threshold | number \| null |  |  |  |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/predict/rephrase" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"question": "your question here",<br />
"user_id": "system"<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | string              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /predict/rephrase/{kbid}**

Predict Rephrase Kbid

Rephrase interface for your NucliaDB with Container

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| question | string | yes |  |  |
| chat_history | array\<Message\> |  |  |  |
| context | array\<Message\> |  |  |  |
| user_context | array\<string\> \| null |  |  |  |
| user_id | string |  | system |  |
| generative_model | string \| null |  |  | The generative model to use for the rephrase endpoint. If not provided, the model configured for the Knowledge Box is used. |
| prompt | string \| null |  |  | Prompt to send the model to rephrase the sentence, if not provided, the default prompt will be used. It must include the {question} placeholder. The placeholder will be replaced with the original ques… |
| chat_history_relevance_threshold | number \| null |  |  |  |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/predict/rephrase/$KB" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"question": "your question here",<br />
"user_id": "system"<br />
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

**POST /predict/rerank**

Predict Rerank

Rerank your results

**Parameters**

| **Name**           | **In** | **Type** | **Req** | **Description** |
|--------------------|--------|----------|---------|-----------------|
| x-show-consumption | header | boolean  |         |                 |

**Request body** — application/json (required)

| **Field** | **Type**              | **Req** | **Default** | **Description** |
|-----------|-----------------------|---------|-------------|-----------------|
| question  | string                | yes     |             |                 |
| user_id   | string                | yes     |             |                 |
| context   | map\<string, string\> |         | {}          |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST "https://$ZONE.dp.progress.cloud/api/v1/predict/rerank"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"question": "your question here",<br />
"user_id": "string"<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | RerankResponse      | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /predict/rerank/{kbid}**

Predict Rerank Kbid

Rerank your results

**Parameters**

| **Name**           | **In** | **Type** | **Req** | **Description** |
|--------------------|--------|----------|---------|-----------------|
| kbid               | path   | string   | yes     |                 |
| x-show-consumption | header | boolean  |         |                 |

**Request body** — application/json (required)

| **Field** | **Type**              | **Req** | **Default** | **Description** |
|-----------|-----------------------|---------|-------------|-----------------|
| question  | string                | yes     |             |                 |
| user_id   | string                | yes     |             |                 |
| context   | map\<string, string\> |         | {}          |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/predict/rerank/$KB" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"question": "your question here",<br />
"user_id": "string"<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | RerankResponse      | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /predict/sentence**

Predict Sentence

Get the vector of a sentence

**Parameters**

| **Name**           | **In** | **Type** | **Req** | **Description** |
|--------------------|--------|----------|---------|-----------------|
| text               | query  | string   | yes     |                 |
| model              | query  | string   |         |                 |
| x-show-consumption | header | boolean  |         |                 |

**Example** — a real call captured against the live sandbox:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET "https://$ZONE.dp.progress.cloud/api/v1/predict/sentence"
\<br />
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
<p>{<br />
"data": [<br />
0.029169481247663498,<br />
-0.018954990431666374,<br />
-0.07776276022195816,<br />
0.003512586699798703,<br />
-0.0026530593167990446,<br />
-0.04167490452528,<br />
0.01399991661310196,<br />
0.015164509415626526,<br />
0.009860660880804062,<br />
-0.01598522439599037,<br />
0.01639706641435623,<br />
0.021829016506671906,<br />
-0.01719529926776886,<br />
-0.0076917321421206,<br />
-0.030735479667782784,<br />
-0.034635890275239944,<br />
-0.030568357557058334,<br />
0.0011353847803547978,<br />
-0.01868302747607231,<br />
-0.023224780336022377,<br />
0.009786454029381275,<br />
-0.04288719967007637,<br />
0.028424957767128944,<br />
0.03647059574723244,<br />
0.0408468134701252,<br />
0.009546011686325073,<br />
-0.03288205713033676,<br />
0.018240636214613914,<br />
-0.018396202474832535,<br />
0.016910549253225327,<br />
0.0065836310386657715,<br />
0.002969736699014902,<br />
-0.026616955175995827,<br />
-0.01999562233686447,<br />
... (truncated)</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | SentenceResponse    | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /predict/sentence/{kbid}**

Predict Sentence Kbid

Get the vector of a sentence

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| kbid | path | string | yes |  |
| text | query | string | yes |  |
| models | query | array\<string\> \| null |  | Semantic models to compute the sentence vector for, if not provided, it will only compute the sentence vector for default semantic model in the Knowle… |
| x-show-consumption | header | boolean |  |  |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/predict/sentence/$KB" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | SentenceResponse    | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /predict/sentences**

Predict Sentences

Generate the vectors of multiple texts in batch

**Parameters**

| **Name**           | **In** | **Type** | **Req** | **Description** |
|--------------------|--------|----------|---------|-----------------|
| x-show-consumption | header | boolean  |         |                 |

**Request body** — application/json (required)

| **Field** | **Type**        | **Req** | **Default** | **Description** |
|-----------|-----------------|---------|-------------|-----------------|
| texts     | array\<string\> | yes     |             |                 |
| model     | string \| null  |         |             |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/predict/sentences" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"texts": [<br />
"string"<br />
]<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | SentencesResponse   | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**POST /predict/summarize**

Predict Summarize

Get summarized answers via NUA

**Parameters**

| **Name**           | **In** | **Type** | **Req** | **Description** |
|--------------------|--------|----------|---------|-----------------|
| model              | query  | string   |         |                 |
| x-show-consumption | header | boolean  |         |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| resources | map\<string, SummarizeResource\> | yes |  |  |
| summary_kind | SummaryKind |  | simple |  |
| user_prompt | string \| null |  |  |  |
| generative_model | string \| null |  |  |  |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/predict/summarize" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"resources": {},<br />
"summary_kind": "simple"<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**                     | **Description**     |
|------------|--------------------------------|---------------------|
| 200        | SummarizedModelWithConsumption | Successful Response |
| 422        | HTTPValidationError            | Validation Error    |

**POST /predict/summarize/{kbid}**

Predict Summarize Kbid

Get summarized answers via NUA with Container

**Parameters**

| **Name**           | **In** | **Type** | **Req** | **Description** |
|--------------------|--------|----------|---------|-----------------|
| kbid               | path   | string   | yes     |                 |
| x-show-consumption | header | boolean  |         |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| resources | map\<string, SummarizeResource\> | yes |  |  |
| summary_kind | SummaryKind |  | simple |  |
| user_prompt | string \| null |  |  |  |
| generative_model | string \| null |  |  |  |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/predict/summarize/$KB" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"resources": {},<br />
"summary_kind": "simple"<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**                     | **Description**     |
|------------|--------------------------------|---------------------|
| 200        | SummarizedModelWithConsumption | Successful Response |
| 422        | HTTPValidationError            | Validation Error    |

**GET /predict/tokens**

Predict Tokens

Get tokens of a sentence

**Parameters**

| **Name**           | **In** | **Type** | **Req** | **Description** |
|--------------------|--------|----------|---------|-----------------|
| text               | query  | string   | yes     |                 |
| model              | query  | string   |         |                 |
| x-show-consumption | header | boolean  |         |                 |

**Example** — a real call captured against the live sandbox:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET "https://$ZONE.dp.progress.cloud/api/v1/predict/tokens"
\<br />
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
<p>{<br />
"tokens": [<br />
{<br />
"text": "Sydney",<br />
"ner": "GPE",<br />
"start": 0,<br />
"end": 6<br />
},<br />
{<br />
"text": "Australia",<br />
"ner": "GPE",<br />
"start": 13,<br />
"end": 22<br />
},<br />
{<br />
"text": "Tesla",<br />
"ner": "ORG",<br />
"start": 27,<br />
"end": 32<br />
}<br />
],<br />
"time": 0.006089448928833008,<br />
"input_tokens": 10<br />
}</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | TokenSearch         | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /predict/tokens/{kbid}**

Predict Tokens Kbid

Get tokens of a sentence with Container

**Parameters**

| **Name**           | **In** | **Type** | **Req** | **Description** |
|--------------------|--------|----------|---------|-----------------|
| kbid               | path   | string   | yes     |                 |
| text               | query  | string   | yes     |                 |
| x-show-consumption | header | boolean  |         |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/predict/tokens/$KB" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | TokenSearch         | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**Processing (6)**

**GET /processing/download**

Download Binary File

Download a file referenced in an upload token

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| token    | query  | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/processing/download" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
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

**POST /processing/push**

Send Data To Process

Push data to process

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| kbid | string \| null |  |  |  |
| uuid | string \| null |  |  |  |
| title | string \| null |  |  |  |
| labels | array\<string\> |  | \[\] |  |
| slug | string \| null |  |  |  |
| source | Source \| null |  |  |  |
| userid | string \| null |  |  |  |
| genericfield | map\<string, Text\> |  | {} |  |
| filefield | map\<string, string\> |  | {} |  |
| linkfield | map\<string, LinkUpload\> |  | {} |  |
| textfield | map\<string, Text\> |  | {} |  |
| layoutfield | map\<string, ProcessingLayoutDiff\> |  | {} |  |
| conversationfield | map\<string, ProcessingConversation\> |  | {} |  |
| generated_conversationfield | map\<string, ProcessingGeneratedConversation\> |  | {} |  |
| processing_options | PushProcessingOptions \| null |  |  |  |
| learning_config | LearningConfig \| null |  |  |  |
| webhook_config | WebhookConfig \| null |  |  |  |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST "https://$ZONE.dp.progress.cloud/api/v1/processing/push"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"labels": []<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | PushResponse        | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /processing/requests**

Get Processed Data

Retreive status of processed and unprocessed payloads from a zone

**Parameters**

| **Name**   | **In** | **Type**        | **Req** | **Description** |
|------------|--------|-----------------|---------|-----------------|
| cursor     | query  | string \| null  |         |                 |
| limit      | query  | integer         |         |                 |
| scheduled  | query  | boolean \| null |         |                 |
| kbid       | query  | string \| null  |         |                 |
| sort_on    | query  | SortFields      |         |                 |
| sort_order | query  | SortOrder       |         |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/processing/requests" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**                  | **Description**     |
|------------|-----------------------------|---------------------|
| 200        | ProcessRequestStatusResults | Successful Response |
| 422        | HTTPValidationError         | Validation Error    |

**GET /processing/requests/{processing_id}**

Get Processed Data

Retreive status of processed and unprocessed payloads from a zone

**Parameters**

| **Name**      | **In** | **Type** | **Req** | **Description** |
|---------------|--------|----------|---------|-----------------|
| processing_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/processing/requests/{processing_id}"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**           | **Description**     |
|------------|----------------------|---------------------|
| 200        | ProcessRequestStatus | Successful Response |
| 422        | HTTPValidationError  | Validation Error    |

**GET /processing/requests/{processing_id}/results**

Stream Processed Data

Retrieve SSE stream of processed data for a given processing ID.

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----|----|----|----|----|
| processing_id | path | string | yes |  |
| data_types | query | array\<StreamDataTypes\> \| null |  |  |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/processing/requests/{processing_id}/results"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema** | **Description** |
|----|----|----|
| 200 | object | Server-Sent Events stream of processing data. Each event contains JSON object. |
| 404 |  | Processing ID not found or invalid |
| 422 | HTTPValidationError | Validation Error |

**POST /processing/upload**

Upload Binary File

Upload a file using a multipart request

**Parameters**

| **Name**   | **In** | **Type**       | **Req** | **Description** |
|------------|--------|----------------|---------|-----------------|
| x-filename | header | string \| null |         |                 |
| x-password | header | string \| null |         |                 |
| x-language | header | string \| null |         |                 |
| x-md5      | header | string \| null |         |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/processing/upload" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 201        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**Processing TUS uploads (4)**

**POST /processing/tusupload**

Create New Upload

An empty POST request is used to create a new upload resource. The
Upload-Length header indicates the size of the entire upload in bytes.

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/processing/tusupload" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema** | **Description**     |
|------------|------------|---------------------|
| 201        | object     | Successful Response |

**PATCH /processing/tusupload/{upload_id}**

Upload Data

Upload all bytes in the requests and append them in the specifyied
offset

**Parameters**

| **Name**  | **In** | **Type** | **Req** | **Description** |
|-----------|--------|----------|---------|-----------------|
| upload_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X PATCH
"https://$ZONE.dp.progress.cloud/api/v1/processing/tusupload/{upload_id}"
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
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**HEAD /processing/tusupload/{upload_id}**

Upload Information

Get information about a current download (completed upload size)

**Parameters**

| **Name**  | **In** | **Type** | **Req** | **Description** |
|-----------|--------|----------|---------|-----------------|
| upload_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X HEAD
"https://$ZONE.dp.progress.cloud/api/v1/processing/tusupload/{upload_id}"
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
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**OPTIONS /processing/tusupload/{upload_id}**

Tus Server Information

Gather information about the Server’s current configuration such as
enabled extensions, version...

**Parameters**

| **Name**  | **In** | **Type**       | **Req** | **Description** |
|-----------|--------|----------------|---------|-----------------|
| upload_id | path   | string \| null | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X OPTIONS
"https://$ZONE.dp.progress.cloud/api/v1/processing/tusupload/{upload_id}"
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

**split Strategies (4)**

**GET /split_strategies/{kbid}**

Learning Split Strategies

Get available split strategies onprem

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/split_strategies/$KB" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**                               | **Description**     |
|------------|------------------------------------------|---------------------|
| 200        | map\<string, SplitConfiguration-Output\> | Successful Response |
| 422        | HTTPValidationError                      | Validation Error    |

**POST /split_strategies/{kbid}**

Add A Split Strategy To A Kb Onprem

Add a split strategy to a KB to be used

**Parameters**

| **Name** | **In** | **Type** | **Req** | **Description** |
|----------|--------|----------|---------|-----------------|
| kbid     | path   | string   | yes     |                 |

**Request body** — application/json (required)

| **Field** | **Type** | **Req** | **Default** | **Description** |
|----|----|----|----|----|
| name | string |  |  |  |
| max_paragraph | integer |  | 0 |  |
| custom_split | CustomSplitStrategy \| null |  | 0 |  |
| llm_split | LLMSplitConfig-Input \| null |  |  |  |
| manual_split | ManualSplitConfig \| null |  |  |  |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST
"https://$ZONE.dp.progress.cloud/api/v1/split_strategies/$KB" \<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{<br />
"name": "",<br />
"max_paragraph": 0<br />
}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**          | **Description**     |
|------------|---------------------|---------------------|
| 200        | string              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |

**GET /split_strategies/{kbid}/strategies/{strategy_id}**

Split Strategy Configuration

Get split strategy for a given id

**Parameters**

| **Name**    | **In** | **Type** | **Req** | **Description** |
|-------------|--------|----------|---------|-----------------|
| kbid        | path   | string   | yes     |                 |
| strategy_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X GET
"https://$ZONE.dp.progress.cloud/api/v1/split_strategies/$KB/strategies/{strategy_id}"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Response codes**

| **Status** | **Schema**                | **Description**     |
|------------|---------------------------|---------------------|
| 200        | SplitConfiguration-Output | Successful Response |
| 422        | HTTPValidationError       | Validation Error    |

**DELETE /split_strategies/{kbid}/strategies/{strategy_id}**

Disable Split Strategy Onprem

Disable a split strategy from a Knowledge Box

**Parameters**

| **Name**    | **In** | **Type** | **Req** | **Description** |
|-------------|--------|----------|---------|-----------------|
| kbid        | path   | string   | yes     |                 |
| strategy_id | path   | string   | yes     |                 |

**Example** — a representative request:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X DELETE
"https://$ZONE.dp.progress.cloud/api/v1/split_strategies/$KB/strategies/{strategy_id}"
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
| 200        | object              | Successful Response |
| 422        | HTTPValidationError | Validation Error    |
