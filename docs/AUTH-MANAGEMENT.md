# Auth & Management (builder companion)

The complete credential model and the account/zone/Knowledge Box lifecycle an expert ARAG builder
knows cold. `ARAG-REFERENCE.md` is the quick provisioning cheat-sheet; this is the deeper companion —
why each key opens which door, every rejection you'll meet, and the exact request bodies for the
operations a build performs when standing up a demo. Distilled from the practitioner's guide,
**Chapter 4 (Authentication & Authorization)** and **Chapter 5 (Accounts, Zones & KB Management)**.

---

## The mental model: APIs are doors, credentials are keys

There is not one credential but four, and each is accepted by some APIs and flatly rejected by
others — with a 403 that names the mismatch, not a graceful degrade. Memorize this matrix (Ch. 4):

| Credential | Global API | Zone API (management) | NucliaDB (content) | NUA (processing) |
|---|---|---|---|---|
| **User token / PAT** | Yes | Yes | Yes | Yes |
| **NUA key** | **No** | Yes\* | **No** | Yes |
| **KB service-account key** | No | No | Yes | Limited |

\* A NUA key manages KBs only if minted with the `allow_kb_management` claim, and only inside the
single account it is bound to.

### The three hosts (factory-canonical — use these exactly)

| Host | Is the… | Serves |
|---|---|---|
| `rag.progress.cloud/api/v1` (no zone) | **Global API** | Account creation, cross-account/slug lookup, activity logs. **Rejects NUA keys.** |
| `{zone}.dp.progress.cloud/api/v1` | **Zone API + NUA** | KB management (create/list/get/patch/delete), service accounts + keys, `search_configurations`, `tasks`/DA-agents, Predict/processing. |
| `{zone}.rag.progress.cloud/api/v1` | **NucliaDB data plane** | `/find`, `/ask`, `/catalog`, `/graph`, `/counters`, resources. What the portal server proxies. |

`{zone}` for this account: `aws-ap-southeast-2-1`. A KB is created in one zone and **never moves**.

> Note on sources: the guide's curl examples sometimes issue *content* calls against the `dp` host
> and send the KB key as `Authorization: Bearer`. The factory's verified convention (and
> `ARAG-REFERENCE.md`) is stricter and is what you should emit: content on the `{zone}.rag` host,
> service-account keys in the `X-NUCLIA-SERVICEACCOUNT` header. Both header forms are accepted for a
> KB key, but keep the account/PAT `Authorization` header distinct from the service-account header so
> intent is unambiguous.

---

## The four credentials in detail

| Credential | Header | Host it works on | TTL | Can do / cannot do |
|---|---|---|---|---|
| **User token** | `Authorization: Bearer …` | all | ~30 min | Everything the human can; browser login required. Dashboard / interactive CLI only — never scripts. |
| **PAT** (personal access token) | `Authorization: Bearer …` | all (esp. Global) | you set it; **90 d default**, revocable | Admin automation: account ops, activity logs, anything touching the Global API. |
| **NUA key** (`allow_kb_management`) | `X-NUCLIA-NUAKEY: Bearer …` | Zone + NUA (`dp`) | long-lived JWT | Create/list/get/patch/delete KBs, create service accounts + keys, start DA-agent tasks, Predict/Understanding. **No data-plane read/write; rejected on Global.** |
| **KB service-account key** | `X-NUCLIA-SERVICEACCOUNT: Bearer …` | NucliaDB content (`rag`) | you set `expires`, **≤ 1095 days** | KB content + search per its role (below). Minted *for* a service account, not directly. |

Send **exactly one** auth header per request.

### The NUA key JWT — what it knows about itself

```json
{
  "iss": "https://aws-ap-southeast-2-1.dp.progress.cloud/",
  "sub": "9c6108f9-…",           // NUA client id
  "key": "8c6c99ce-…",           // key id
  "exp": 253370764800,
  "allow_kb_management": true     // extends the key to KB management
}
```

The **account id is NOT in the payload** — only client and key ids. And you can't resolve it via the
Global API with a NUA key (that API rejects NUA keys). In practice the account id (UUID) comes from
the dashboard or the SDK config file after `nuclia auth nua`. Management paths want the **account
UUID, not the slug**.

### Rejection catalog (real messages — recognize them instantly)

| You did | You get |
|---|---|
| NUA key → Global API | `Nuakeys are not valid in the global API` |
| NUA key → KB content (`/find` etc.) | `NuaKeyUser cannot access context of type NucliaDBKnowledgeBox` |
| NUA key → activity logs | `NuaKeyUser cannot access context of type ActivityLogsAPI` (needs user/PAT) |
| Key `expires` > 1095 days | `Choosen key expiration exceeds the current maxium of 1095 days` (platform's own spelling) |
| NUA key in `X-NUCLIA-SERVICEACCOUNT` | wrong-header-key rejection |

---

## Service-account roles

You don't create KB keys directly: create a **service account** with a role, then mint one or more
**keys** for it. This lets you rotate/scope/revoke a single leaked key without disturbing the others.
Grant the **narrowest role that works** (Ch. 4):

| Role | Grants |
|---|---|
| `SREADER` | Read + search only — resources, `/find`, `/ask`, `/catalog` |
| `SWRITER` | Reader + create/modify/delete resources and fields |
| `SCONTRIBUTOR` | Write content but not KB-level configuration |
| `SOWNER` | Full control incl. configuration, keys, and `search_configurations` |

**Pattern:** issue two keys per KB — an `SREADER` key for the frontend/proxy, and an
`SWRITER`/`SOWNER` key held only by the ingestion backend. A leaked frontend key can't alter data.
For the factory, `SCONTRIBUTOR` is the pragmatic single-token default (ingest + serve); use `SOWNER`
when the same token must also create `search_configurations`.

---

## The bootstrap sequence (management credential → working content key)

All on the **`{zone}.dp` (Zone API)** host, **account UUID** in the path, **NUA key** as Bearer.
Routes: `service_accounts` is **plural** to create, `service_account/{id}/keys` is **singular** to mint.

```bash
ZONE=aws-ap-southeast-2-1
BASE=https://$ZONE.dp.progress.cloud/api/v1
H=(-H "X-NUCLIA-NUAKEY: Bearer $NUA_KEY" -H "Content-Type: application/json")

# 1. Create the KB  ->  201 { "id": "e3bb0d28-…" }   (this is the kbid)
curl -X POST "$BASE/account/$ACCOUNT/kbs" "${H[@]}" -d '{
  "slug": "support-kb",
  "title": "Customer Support KB",
  "description": "Public help-centre content",
  "learning_configuration": { "generative_model": "chatgpt-azure-4o" }
}'

# 2. Create a service account  ->  returns the service-account id
curl -X POST "$BASE/account/$ACCOUNT/kb/$KB/service_accounts" "${H[@]}" \
  -d '{ "title": "backend", "role": "SCONTRIBUTOR" }'

# 3. Mint a key  ->  returns { "token": … }   (expires epoch, MUST be <= 1095 days out)
curl -X POST "$BASE/account/$ACCOUNT/kb/$KB/service_account/$SA_ID/keys" "${H[@]}" \
  -d "{ \"expires\": $(date -v+1095d +%s) }"

# 4. Use that token on the DATA PLANE (rag host), service-account header
curl -X POST "https://$ZONE.rag.progress.cloud/api/v1/kb/$KB/find" \
  -H "X-NUCLIA-SERVICEACCOUNT: Bearer $KB_KEY" -H "Content-Type: application/json" \
  -d '{"query":"…"}'
```

Implemented in `scripts/create-kb.mjs`.

---

## Knowledge Box lifecycle & configuration

### Create — fields (Ch. 5)

Only `slug` + `title` are required; the rest let you configure up front instead of patching later.

| Field | Type | Purpose |
|---|---|---|
| `slug` | string (req) | Human id, unique within account |
| `title` | string (req) | Display name |
| `description` | string | Free text |
| `mode` | enum | KB mode — **immutable after creation** |
| `learning_configuration` | object | Model choices (semantic, generative, NER, …) |
| `allowed_origins` | array\<string\> | Web origins permitted to call the KB |
| `allowed_ip_addresses` | array\<string\> | Source IPs permitted to call the KB |
| `external_index_provider` | object | Use an external vector index instead of built-in |
| `enforce_security` | boolean | Require resource security groups on every request |

### Two views of a KB

- **Management view** (Zone API, `GET|PATCH|DELETE /account/{account}/kb/{kb}`) — account context,
  security, top-level settings.
- **Learning configuration** (NucliaDB, `GET /kb/{kbid}/configuration`) — the models actually in
  force. Real sandbox config:

```json
{
  "semantic_model": "multilingual-2024-05-06", "semantic_vector_size": 1024,
  "semantic_vector_similarity": "DOT", "semantic_threshold": 0.4,
  "generative_model": "chatgpt-azure-4o", "ner_model": "multilingual",
  "relation_model": "base", "summary_model": "chatgpt-azure-4o", "summary": "simple"
}
```

Change it with a PATCH (Zone API, management). Model changes apply to **subsequent** operations —
changing the **semantic model** is where vectorsets matter, because existing vectors were produced by
the old model.

```bash
curl -X PATCH "$BASE/account/$ACCOUNT/kb/$KB" "${H[@]}" \
  -d '{"learning_configuration":{"generative_model":"chatgpt-azure-4o"}}'
```

### Choosing models

- **Semantic model** (embeddings): multilingual (e.g. `multilingual-2024-05-06`, 1024-dim, DOT) for
  cross-language content/users; an English model for best quality on English-only corpora. Query
  options from the Predict service.
- **Generative model** (the LLM that writes answers): platform lineup includes ChatGPT/Azure,
  **Anthropic Claude**, Llama, Azure Mistral. Set per-KB, but **override per request** — `/ask`
  accepts `generative_model`, so route hard questions to a stronger model, routine ones to a cheaper
  one, without reconfiguring. **Bring-your-own** provider (Anthropic, AWS Bedrock, Google Gemini) via
  `learning_configuration.user_keys` so generation runs under your own contract.

### List & delete

```bash
curl "$BASE/account/$ACCOUNT/kbs" "${H[@]}"                    # list all KBs in the account
curl -X DELETE "$BASE/account/$ACCOUNT/kb/$KB" "${H[@]}"       # IRREVERSIBLE
```

Deletion is permanent, removes all content + indexes, and **takes the KB's service accounts and API
keys with it**. Back up first (enterprise backup/restore KBs) for anything you might restore.

---

## Accounts, zones, data residency

- **Account** = the org boundary for billing, users, and KBs. Stable **UUID** + friendly slug; nearly
  every management URL is scoped by the UUID (`/account/{account_id}/…`).
- **Zone** = a region your data lives in, chosen at KB creation, immutable thereafter. Available
  zones seen in testing: Australia `aws-ap-southeast-2-1`, Europe `aws-eu-central-1-1` / `europe-1`,
  USA `aws-us-east-2-1`, Israel `aws-il-central-1-1`. Pick for **data-residency** + user proximity.

---

## Security controls beyond the key

Authorization doesn't stop at the token — a KB can be locked down further (set at creation or via
management; enforced at query time):

- **`allowed_origins`** — restrict web origins, so an embedded-widget key only works from your domains.
- **`allowed_ip_addresses`** — restrict source IPs for backend-only KBs.
- **Resource security groups** — mark resources with `access_groups`; a query only returns results
  the caller's groups may see (row-level security). Set **`enforce_security: true`** on the KB to make
  it mandatory. This is how multi-tenant demos keep one tenant's content out of another's answers
  within a shared KB.

---

## Management operations at a glance (Zone API unless noted)

| Operation | Endpoint |
|---|---|
| Create KB | `POST /account/{account}/kbs` |
| Get / modify / delete KB | `GET\|PATCH\|DELETE /account/{account}/kb/{kb}` |
| List KBs | `GET /account/{account}/kbs` |
| Service accounts | `GET\|POST /account/{account}/kb/{kb}/service_accounts` |
| API keys | `POST /…/service_account/{sa}/keys` · `DELETE /…/key/{id}` |
| Learning config (models in force) | `GET /kb/{kb}/configuration` (NucliaDB host) |
| Invite users to a KB | `POST /account/{account}/kb/{kb}/invite` |
| KB permissions / users | `GET /…/kb/{kb}/permissions` · `GET\|PATCH /…/kb/{kb}/users` |
| Activity logs | `POST /kb/{kb}/activity/{event_type}/query` — **needs user/PAT**, not NUA |

---

Source: *Building Solutions with Progress Agentic RAG* — Chapter 4 (Authentication & Authorization)
and Chapter 5 (Accounts, Zones & Knowledge Box Management); host/header conventions reconciled against
the factory's verified `docs/ARAG-REFERENCE.md`.
