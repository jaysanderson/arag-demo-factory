**PART 2 — AUTHENTICATION AND MANAGEMENT**

**Chapter 4\
Authentication and Authorization**

*Which key opens which door — the credential model, tested end to end*

More early failures come from authentication than from any other part of
the platform, because there is not one credential but several, and each
is accepted by some APIs and flatly rejected by others. This chapter
maps the whole system. Every rejection quoted here is a real response
captured during testing, so you can recognize them instantly when they
happen to you.

**The mental model: APIs are doors, credentials are keys**

Recall the four APIs from Chapter 1 — Global, Zone, NucliaDB, and NUA.
Think of each as a separate door. A credential is a key cut for specific
doors. Presenting the right key at the wrong door does not degrade
gracefully; it returns 403 with a message naming the mismatch.

| **Credential** | **Global** | **Zone (management)** | **NucliaDB (content)** | **NUA (processing)** |
|----|----|----|----|----|
| User token / PAT | Yes | Yes | Yes | Yes |
| NUA key | **No** | Yes\* | **No** | Yes |
| KB API key (service account) | No | No | Yes | Limited |

\*A NUA key can manage Knowledge Boxes only if its token was minted with
the allow_kb_management claim, and only within the single account it is
bound to.

| **Gotcha — tested** Two rejections you will certainly meet. A NUA key against the Global API returns Nuakeys are not valid in the global API. A NUA key against Knowledge Box content returns NuaKeyUser cannot access context of type NucliaDBKnowledgeBox. Neither is a bug — they are the door telling you the key is cut for a different lock. |
|----|

**The four credentials in detail**

**User token and Personal Access Token (PAT)**

A **user token** represents an interactively authenticated human. It
grants everything that user can do across every API, but it is
short-lived — about 30 minutes — and obtaining one requires a browser
login flow. It is ideal for the dashboard and for interactive CLI
sessions, and unsuitable for unattended scripts.

A **Personal Access Token (PAT)** is the long-lived equivalent: same
broad access, but you set its expiry (90 days by default) and can revoke
it at any time. Use a PAT for administrative automation — anything that
must touch the Global API, manage accounts, or read activity logs.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p># Create a PAT with the CLI (opens a browser once to authenticate
you)<br />
nuclia auth login<br />
nuclia auth create_personal_token --description="ci-admin"
--days=30</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**NUA key**

A **NUA key** authenticates to the Nuclia Understanding API — the
processing and Predict services. Its token is a JWT whose payload
encodes the issuing zone, the account it belongs to, and its
capabilities. The key used throughout this book carries
"allow_kb_management": true, which extends it to Knowledge Box
management (list, get, create, delete) — but only inside its own
account.

NUA keys are presented in a dedicated header:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p># NUA key uses X-NUCLIA-NUAKEY, not Authorization<br />
curl
"https://$ZONE.dp.progress.cloud/api/v1/predict/tokens?text=Tesla+is+in+Austin"
\<br />
-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY"</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Decoding the token payload shows exactly what a NUA key knows about
itself:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>JSON</strong></p>
<p>{<br />
"iss": "https://aws-ap-southeast-2-1.dp.progress.cloud/",<br />
"sub": "9c6108f9-...", // the NUA client id<br />
"key": "8c6c99ce-...", // the key id<br />
"exp": 253370764800,<br />
"allow_kb_management": true // extends the key to KB management<br />
}</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

| **Gotcha — tested** The account id is **not** in the token payload — only the client and key ids are. And you cannot look the account up through the Global API with a NUA key, because that API rejects NUA keys. In practice the account id comes from the dashboard or from the SDK's stored configuration after you run nuclia auth nua. During testing, the SDK's config file was the reliable source of the bound account id. |
|----|

**Knowledge Box API key (service account)**

Content and search on a specific Knowledge Box are authorized by a
**Knowledge Box API key**. You do not create these directly; you create
a **service account** on the Knowledge Box, give it a role, and then
mint one or more **keys** for it. This indirection is deliberate: it
lets you rotate keys, scope them, and revoke a single leaked key without
disturbing the others.

The key is a bearer token used with the standard header, and it is the
credential your application backend should carry:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>BASH</strong></p>
<p>curl -X POST "https://$ZONE.dp.progress.cloud/api/v1/kb/$KB/find"
\<br />
-H "Authorization: Bearer $KB_API_KEY" \<br />
-H "Content-Type: application/json" \<br />
-d '{"query":"..."}'</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**The full bootstrap, as tested**

Here is the exact sequence used to stand up this book's sandbox — the
canonical way to go from a management credential to a working content
key.

1.  **Create the Knowledge Box** with the NUA key on the Zone API: POST
    /api/v1/account/{account}/kbs -\> returns the kbid.

2.  **Create a service account** on that KB: POST
    /api/v1/account/{account}/kb/{kbid}/service_accounts with
    {"title":..., "role":"SOWNER"} -\> returns the service account id.

3.  **Mint an API key** for it: POST /.../service_account/{sa_id}/keys
    with an expires date within 1095 days -\> returns the token.

4.  **Use that token** with Authorization: Bearer for all content and
    search calls on the KB.

| **Gotcha — tested** The key-expiry ceiling is exactly 1095 days (three years). An expires further out returns Choosen key expiration exceeds the current maxium of 1095 days — note the platform's own spelling of the message, which is how you will see it. |
|----|

**Service account roles**

A service account's role determines what its keys can do on the
Knowledge Box. Grant the narrowest role that works — a search-only
frontend should never hold a writer key.

| **Role** | **Grants** |
|----|----|
| SREADER | Read and search only — resources, find, ask, catalog |
| SWRITER | Reader plus create/modify/delete resources and fields |
| SCONTRIBUTOR | Write content but not manage KB-level configuration |
| SOWNER | Full control of the Knowledge Box, including configuration and keys |

| **Tip** Issue two keys per Knowledge Box in most applications: an SREADER key embedded in or proxied for the frontend, and an SWRITER/SOWNER key held only by your ingestion backend. If the frontend key leaks, no one can alter your data with it. |
|----|

**Security controls beyond the key**

Authorization does not stop at the token. A Knowledge Box can be locked
down further:

- **Allowed origins** — restrict which web origins may call the KB, so
  an embedded widget key can only be used from your own domains.

- **Allowed IP addresses** — restrict calls to a set of source IPs for
  backend-only Knowledge Boxes.

- **Security groups on resources** — mark resources with access_groups
  so that a query only returns results the caller's groups are permitted
  to see (row-level security). Enable enforce_security on the KB to make
  this mandatory.

These are configured at Knowledge Box creation or via management
(Chapter 5) and enforced at query time (Chapter 9). For multi-tenant
applications, resource security groups are how you keep one tenant's
content out of another tenant's answers within a shared Knowledge Box.
