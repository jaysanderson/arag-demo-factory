// Client for the data-augmentation agents (Labeler / Graph / Generator) — the
// ingestion-time enrichment side of ARAG, exposed live via Nuclia predict. Kept
// separate from arag.ts (the retrieval client) so each stays single-purpose.

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const detail = await res.json().catch(() => ({}));
    throw new Error((detail as any).error || `${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export interface LabelHit { labelset: string; label: string }
export interface EntityHit { text: string; type: string }
export interface RelationHit { s: string; r: string; o: string }
export interface QaPair { q: string; a: string }

/** The "extract" step — the text Nuclia already processed out of the resource. */
export const augmentSource = (id: string) =>
  post<{ title: string; text: string }>('/api/augment/source', { id });

/** Labeler agent — which of the KB's own labels apply to this content. */
export const augmentLabel = (text: string, candidates: LabelHit[]) =>
  post<{ labels: LabelHit[] }>('/api/augment/label', { text, candidates });

/** Graph agent — entities (NER) + relation triples extracted from the content. */
export const augmentGraph = (text: string) =>
  post<{ entities: EntityHit[]; relations: RelationHit[] }>('/api/augment/graph', { text });

/** Generator agent — synthetic Q&A pairs grounded in the content. */
export const augmentGenerate = (text: string) =>
  post<{ qa: QaPair[] }>('/api/augment/generate', { text });
