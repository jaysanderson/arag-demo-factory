// ─────────────────────────────────────────────────────────────────────────────
// Retrieval & generation policy — the grounding contract for every /ask.
//
// Ported from the shipped research portal (rp-grdc/server/retrieval-config.js).
// Nuclia's DEFAULTS under-answer this class of corpus: they hand the model a set
// of isolated top-scoring paragraphs, so a match on a heading or a results-table
// row arrives WITHOUT the sentence three paragraphs later that explains it. The
// measured symptom was correct retrieval (0.84–0.95 similarity on the right
// documents) paired with an answer of "not enough data".
//
// Two deliberate departures from the defaults fix it, and they are why this file
// exists rather than trusting Nuclia's out-of-the-box behaviour:
//
//   1. neighbouring_paragraphs — pull the paragraphs on either side of every
//      match, so a hit on a table row comes with its explanation. (`full_resource`
//      grounds slightly better but ships whole 900–1500-word documents per
//      question — far more expensive, and it blows the context budget once
//      several documents match. Neighbours are the better trade.)
//   2. citations: true — Nuclia emits no citations unless asked, and in this
//      portal an answer without citations is a BUG, surfaced as an "ungrounded"
//      warning rather than shown as trustworthy prose.
//
// See docs/RETRIEVAL.md for the full rationale.
// ─────────────────────────────────────────────────────────────────────────────

// A grounded, refuse-when-unsupported system prompt. It is domain-neutral so one
// shell serves every demo; the optional persona from demo.config.json is woven in
// so answers speak in the demo's voice without loosening the grounding rules.
export function systemPrompt(persona) {
  const audience = persona
    ? `You are the research assistant for ${persona}.`
    : 'You are a grounded research assistant for this knowledge base.';

  return `${audience}

Rules:
- Answer ONLY from the provided context. If the context does not support an answer, say so plainly and name what is missing — never invent facts, figures, or sources.
- Be specific and quantitative. Quote figures (rates, yields, prices, dates, measurements) exactly as the source gives them, with their units.
- Attribute location-, time-, or segment-specific results to their source; do not generalise a single result beyond what it supports.
- Where sources disagree, or a finding is preliminary or single-instance, say so rather than presenting it as settled.
- Prefer the language and spelling conventions of the source material.`;
}

// Tunables. Kept together so a demo can adjust grounding without touching the
// proxy. These mirror the shipped portal's measured-good values.
export const RETRIEVAL = {
  /** Paragraphs requested from the index before generation. */
  topK: 20,
  /** Context expansion: adjacent paragraphs pulled in with each match. */
  ragStrategies: [{ name: 'neighbouring_paragraphs', before: 2, after: 2 }],
  /** Mandatory here — the UI renders a citation-free answer as an error state. */
  citations: true,
  /**
   * How strongly a passage must support a sentence before it is cited. Lower
   * surfaces more sources; higher risks an answer that cites nothing.
   */
  citationThreshold: 0.25,
};

/**
 * Builds the generation half of an /ask request body. `overrides` lets a caller
 * (e.g. a persona/search-configuration) adjust individual knobs; `persona`
 * personalises the system prompt.
 */
export function askBody({ persona, overrides = {}, generativeModel } = {}) {
  const merged = { ...RETRIEVAL, ...overrides };
  const body = {
    top_k: merged.topK,
    rag_strategies: merged.ragStrategies,
    citations: merged.citations,
    citation_threshold: merged.citationThreshold,
    prompt: { system: systemPrompt(persona) },
  };
  // Never send an empty generative_model — blank means "use the KB default".
  if (generativeModel) body.generative_model = generativeModel;
  return body;
}
