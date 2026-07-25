---
description: "Extend the catalog — add a new vertical blueprint (and rarely a new capability) to the shopping list, grounded in a real or intended shipped ARAG demo, then rebuild catalog.json."
agent: "solution-architect"
argument-hint: "The vertical / use case to add, and the shipped demo it derives from (e.g. 'pharma safety signal, from a doc-processing demo')"
tools: [read, edit, search]
---

# Add a Use Case to the Shopping List

Add a new blueprint to `catalog/blueprints/` so the one-shot orchestrator can offer it on any
matching prompt. Everything here is **data, not code** — a new demo is one JSON file.

## Steps

1. **Ground it in the portfolio.** Read `DEMOS.md` and pick the shipped (or intended) demo
   this blueprint derives from — set `provenanceDemo` (and `liveReference` if it exists) so
   the pitch stays honest.
2. **Copy an existing blueprint** from `catalog/blueprints/` and retarget every field to the
   new vertical. Follow the schema in `catalog/README.md`:
   - `id`, `name`, `vertical`, `provenanceDemo`, `persona` (fictional), `tagline`,
     `elevatorPitch`.
   - `matchTags` — generous, domain-obvious words the orchestrator will score prompts
     against.
   - `capabilities` — the default surface set (must all exist in `catalog/capabilities/`).
   - `theme` — fictional brand name, primary + accent colors, mood.
   - `corpus` — the brief for `@knowledge-engineer`: `domain`, `docTypes`, `targetCount`,
     `recurringEntities` (rich enough for a real graph), `cornerstoneQueries` (answerable),
     `refusalProbes` (genuinely out of scope).
   - `demoScript` — the guided-tour beats.
   - `safety` — `syntheticOnly: true`, `noRealBrands: true`, a specific `disclaimer`.
3. **New capability only if truly needed.** If the blueprint needs a surface that does not
   exist, add a `catalog/capabilities/<id>.json` (schema in `catalog/README.md`) and note
   that `@ui-developer` must add the matching portal component.
4. **Honour the Hard Rules** — fictional brand/persona, synthetic corpus, no real identities,
   no residency claims.
5. **Rebuild the index:** `node scripts/build-catalog.mjs`, then confirm the new blueprint
   appears in `catalog/catalog.json`.

## Verify

- The new `blueprints/<id>.json` parses and matches the README schema.
- Every capability it references exists in `catalog/capabilities/`.
- `catalog.json` was rewritten and contains the new blueprint with its `matchTags`.

## Output

The new blueprint id + vertical, its provenance demo, its default capabilities, and
confirmation that `catalog.json` now lists it.
