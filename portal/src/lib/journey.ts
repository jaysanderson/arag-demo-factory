// Answer Journey — turn an answer's grounding into an ordered, walkable set of
// "stops" (most → least confident), and stream a per-source "how does this
// relate?" answer. The ranked grounding is rebuilt server-side via the same
// hybrid retrieval that produced the answer (POST /api/journey); the relation is
// a resource-scoped /ask, so each stop speaks only for itself.
import { ask } from './arag';

export interface JourneyStop {
  resourceId: string;
  title: string;
  url: string | null;
  score: number;   // 0–1 confidence
  quote: string;   // best supporting passage
  labels: string[];
  cited: boolean;  // this resource appears in the answer's citations
}

/** Rebuild the ranked grounding for a query (strongest first, cited flagged). */
export async function buildStops(
  query: string,
  filters: string[] = [],
  citedIds: string[] = []
): Promise<JourneyStop[]> {
  const res = await fetch('/api/journey', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, filters, citedIds }),
  });
  if (!res.ok) return [];
  const data = await res.json().catch(() => ({ stops: [] }));
  return (data.stops || []) as JourneyStop[];
}

/**
 * Stream a short, resource-scoped answer to "how does this relate?". Calls
 * onToken with the accumulated text as it arrives. Returns an abort function.
 */
export function relate(
  resourceId: string,
  question: string,
  handlers: { onToken: (accumulated: string) => void; onDone?: () => void }
): () => void {
  const q = `How does this source relate to the question: "${question}"? Answer in 2-3 sentences, grounded only in this source.`;
  let acc = '';
  return ask(
    { query: q, resourceId },
    {
      onToken: (t) => { acc += t; handlers.onToken(acc); },
      onDone: handlers.onDone,
      onError: handlers.onDone,
    }
  );
}
