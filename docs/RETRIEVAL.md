# Retrieval & grounding policy

The single most important thing an executive needs to believe is that the answer is
**grounded and cited**. This document is the rationale behind the portal's retrieval
configuration (`portal/server/retrieval.mjs`), ported from the shipped research portal
(`rp-grdc/server/retrieval-config.js`). Grounding is not a default you can trust — it is
a policy you have to set. Here is why, and what the settings are.

---

## Why the defaults under-answer

Nuclia's defaults hand the model a set of **isolated top-scoring paragraphs**. For a
research-style corpus that reliably under-answers, because the fact and its context are
often in different paragraphs:

> A trial report states its sowing window in a results **table** and explains it three
> paragraphs later in prose. A single matched paragraph — the table row — arrives without
> the sentence that gives the actual number.

The measured symptom is the worst kind: a **correct retrieval** (0.84–0.95 similarity on
exactly the right documents) paired with an answer of *"not enough data"*. The model was
handed the right document and still could not answer, because it was handed the wrong
slice of it.

## The two departures that fix it

### 1. Neighbouring paragraphs (`rag_strategies`)

```js
ragStrategies: [{ name: 'neighbouring_paragraphs', before: 2, after: 2 }]
```

Pull the two paragraphs on either side of every match, so a hit on a heading or a table
row arrives **with** its explanation. This is the change that turns "not enough data" into
a specific, quantitative answer.

**Why not `full_resource`?** It grounds slightly better still, but it ships whole documents
(900–1500 words each) for *every* question. That is far more expensive, and once several
documents match it pushes long answers past the context budget. Neighbours are the better
trade: enough context to answer, little enough to stay fast and affordable.

### 2. Citations on (`citations: true`)

```js
citations: true,
citation_threshold: 0.25
```

Nuclia emits **no citations unless asked**. In this portal an answer without citations is
a **bug**, surfaced as an explicit *ungrounded* warning rather than shown as trustworthy
prose. So citations are mandatory, and the threshold governs how strongly a passage must
support a sentence before it is cited:

- **Lower** surfaces more sources (and risks a weak citation).
- **Higher** risks an answer that cites nothing — which the UI then flags as ungrounded.
- `0.25` is the measured-good middle for this class of corpus.

## The grounded system prompt

```js
top_k: 20   // paragraphs requested from the index before generation
```

The system prompt is domain-neutral (so one shell serves every demo) but strict on
grounding. Its load-bearing rules:

- **Answer only from the provided context.** If the context does not support an answer,
  say so plainly and name what is missing — never invent facts, figures, or sources.
- **Be specific and quantitative.** Quote figures with their units, exactly as the source
  gives them.
- **Attribute** location-, time-, or segment-specific results to their source; do not
  generalise a single result beyond what it supports.
- **Surface disagreement.** Where sources conflict, or a finding is preliminary or
  single-instance, say so rather than presenting it as settled.

The optional `persona` from `demo.config.json` is woven into the prompt so answers speak
in the demo's voice **without** loosening any of these rules.

## Refusal is a feature, not a failure

A build that answers everything confidently is **worse** than one that declines. The
portal is verified on two properties that pull against each other (see
`scripts/verify.mjs`):

1. **Answerable questions must be answered, with citations** (`cornerstoneQueries`).
2. **Questions the corpus cannot support must be refused, not confabulated**
   (`refusalProbes`).

A refusal on a genuinely unsupported question counts as a **pass**. In the UI, a refusal
arrives with zero citations, so it lands in the same *ungrounded* state — framed as the
system correctly declining. That declared honesty is what earns a researcher's trust.

## Personas (audience-scoped answers)

When a demo enables the `personas` capability, answers are scoped by a stored
**search configuration** rather than by editing the prompt per request. A named
`search_configuration` is **authoritative** — it carries its own retrieval strategy and
prompt — so the server drops the local `rag_strategies` / `prompt` / `top_k` when one is
set, to avoid two configurations silently fighting. One Knowledge Box, different answers
for client vs. researcher, staff vs. public.

## Where the numbers live

| Setting | Value | File |
|---|---|---|
| `top_k` | 20 | `portal/server/retrieval.mjs` |
| `rag_strategies` | neighbouring ±2 | `portal/server/retrieval.mjs` |
| `citations` | `true` | `portal/server/retrieval.mjs` |
| `citation_threshold` | 0.25 | `portal/server/retrieval.mjs` |

Adjust them in one place; the `/api/ask` proxy applies them to every question.
