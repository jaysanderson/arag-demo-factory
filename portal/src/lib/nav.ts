// Grouping + deep-link helpers shared by the grouped nav, the command-center
// bento, and the guided tour. Everything here is derived from demo.config.json —
// nothing is hardcoded to a particular demo's surfaces.

import type { DemoConfig, Surface, DemoStep } from './config';

/** Canonical capability-area order. Unknown groups sort after, by first sight. */
export const GROUP_ORDER = ['Converse', 'Explore', 'Analyze', 'Extend'];

/** Short, product-facing intro shown under each capability-area heading. */
export const GROUP_INTRO: Record<string, string> = {
  Converse: 'Ask in plain language — spoken or typed — and get grounded, cited answers back.',
  Explore: 'Move through the corpus by meaning: search, assets, entities and what connects them.',
  Analyze: 'Turn documents, calls and answers into structured, scored, governable signal.',
  Extend: 'Push the same grounded knowledge outward — to people, feeds and other agents.',
};

export interface SurfaceGroup {
  group: string;
  intro?: string;
  surfaces: Surface[];
}

/** Group renderable surfaces by their `group`, in canonical order. */
export function groupSurfaces(surfaces: Surface[]): SurfaceGroup[] {
  const buckets = new Map<string, Surface[]>();
  for (const s of surfaces) {
    const g = (s.group && String(s.group)) || 'More';
    if (!buckets.has(g)) buckets.set(g, []);
    buckets.get(g)!.push(s);
  }
  const seen = [...buckets.keys()];
  const ordered = [
    ...GROUP_ORDER.filter((g) => buckets.has(g)),
    ...seen.filter((g) => !GROUP_ORDER.includes(g)),
  ];
  return ordered.map((group) => ({
    group,
    intro: GROUP_INTRO[group],
    surfaces: buckets.get(group)!,
  }));
}

/** Which group (if any) contains the given route — for nav active state. */
export function groupForRoute(surfaces: Surface[], pathname: string): string | null {
  return surfaces.find((s) => s.route === pathname)?.group ?? null;
}

// Light synonym hints so tour beats that describe an action ("a refusal probe",
// "groundedness score") still resolve to a surface even when no label appears
// verbatim. Keyed by surface id; values are extra words to match on.
const SYNONYMS: Record<string, string[]> = {
  ask: ['refus', 'decline', 'ungrounded', 'hallucinat', 'cited answer', 'plain language'],
  voice: ['spoken', 'speak', 'out loud', 'hear', 'hands-free'],
  remi: ['groundedness', 'score', 'quality', 'relevance'],
  related: ['similar', 'more like', 'past', 'anomal'],
  graph: ['entity', 'entities', 'relationship', 'cascade', 'connected'],
  search: ['retrieval', 'find', 'semantic'],
};

/**
 * Best-effort deep link for a demo-script beat. Reads the step's `show` hint
 * (and `say` as a fallback) and matches it against each surface's label, id and
 * synonym words. Returns the matched route, or `fallback` when nothing scores.
 */
export function resolveStepRoute(step: DemoStep, surfaces: Surface[], fallback: string): string {
  const hay = `${step.show || ''}  ${step.say || ''}`.toLowerCase();
  let best: { route: string; score: number; at: number } | null = null;

  for (const s of surfaces) {
    const label = s.label.toLowerCase();
    const candidates = [
      { term: label, weight: 3 },
      { term: s.id.toLowerCase(), weight: 2 },
      ...(SYNONYMS[s.id] || []).map((term) => ({ term, weight: 1 })),
    ];
    for (const { term, weight } of candidates) {
      if (!term) continue;
      const at = hay.indexOf(term);
      if (at === -1) continue;
      // A hint that *starts* with a label ("Voice: …") is the strongest signal.
      const boost = at <= 1 ? 5 : 0;
      const score = weight + boost - at / 1000; // earlier match wins ties
      if (!best || score > best.score) best = { route: s.route, score, at };
    }
  }
  return best?.route || fallback;
}

/** Resolve a full tour: each beat paired with the surface route it deep-links to. */
export function resolveTour(config: DemoConfig, surfaces: Surface[]) {
  const home = surfaces[0]?.route || '/ask';
  let last = home;
  return (config.demoScript || []).map((step) => {
    const route = resolveStepRoute(step, surfaces, last);
    last = route;
    const surface = surfaces.find((s) => s.route === route) || null;
    return { step, route, surface };
  });
}
