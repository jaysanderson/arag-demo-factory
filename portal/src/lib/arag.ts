// Client for the portal's own /api/* surface. The browser NEVER talks to Nuclia
// directly and never holds the service-account token — every call goes to the
// Express server, which proxies to the KB.
//
// Ported from the shipped research portal (rp-grdc/ui/src/api.js): the /ask
// NDJSON streaming, retrieval-paragraph indexing, and citation grouping by
// document are the load-bearing bits and are reproduced faithfully here in TS.

export interface Citation {
  index: number;
  title: string;
  url: string | null;
  resourceId: string;
  text: string;
  excerptCount: number;
  spans: [number, number][];
}

interface ParagraphInfo {
  text: string;
  title: string;
  url: string | null;
  resourceId: string;
  score?: number;
}

async function postJson<T>(path: string, body: unknown): Promise<T> {
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

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(path);
  if (!res.ok) {
    const detail = await res.json().catch(() => ({}));
    throw new Error((detail as any).error || `${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

// ── retrieval / browse ────────────────────────────────────────────────────────

export interface SearchResult {
  resources?: Record<string, any>;
  best_matches?: string[];
  [k: string]: any;
  latencyMs?: number;
}
export function search(body: {
  query: string;
  filters?: string[];
  pageSize?: number;
  searchConfig?: string;
  features?: string[];
}): Promise<SearchResult> {
  return postJson('/api/search', body);
}

export interface CatalogCard {
  id: string;
  slug: string | null;
  title: string;
  summary: string;
  icon: string | null;
  created: string | null;
  sourceUrl: string | null;
  docType: string;
  mediaType: string | null;
  durationMinutes: number | null;
  labels: Record<string, string[]>;
  authors: string[];
}
export interface CatalogResult {
  items: CatalogCard[];
  facets: Record<string, { label: string; count: number }[]>;
  total: number;
  page: number;
  pageSize: number;
}
export function catalog(body: {
  query?: string;
  filters?: string[];
  pageSize?: number;
  page?: number;
} = {}): Promise<CatalogResult> {
  return postJson('/api/catalog', body);
}

export interface GraphNode { id: string; label: string; group: string; degree: number }
export interface GraphEdge { from: string; to: string; label: string }
export interface GraphResult { nodes: GraphNode[]; edges: GraphEdge[]; pathCount: number }
export function graph(body: { entity?: string; topK?: number } = {}): Promise<GraphResult> {
  return postJson('/api/graph', body);
}

export interface EntityGroups {
  groups: { id: string; title: string; count: number; entities: string[] }[];
}
export function entities(): Promise<EntityGroups> {
  return getJson('/api/entities');
}

export function getResource(id: string): Promise<any> {
  return getJson(`/api/resource/${encodeURIComponent(id)}`);
}

export interface Health { ok: boolean; kb: string; resources?: number | null; error?: string }
export function getHealth(): Promise<Health> {
  return getJson<Health>('/api/health').catch((err) => ({ ok: false, kb: 'unreachable', error: err.message }));
}

// ── streamed, grounded answer ─────────────────────────────────────────────────

export interface AskHandlers {
  onToken?: (text: string) => void;
  onCitations?: (citations: Citation[]) => void;
  onDone?: () => void;
  onError?: (err: Error) => void;
}

/**
 * Streamed grounded answer. Calls onToken as text arrives and onCitations as
 * soon as sources resolve — usually before generation finishes, so the sources
 * panel populates while the answer is still being written. Returns an abort fn.
 */
export function ask(
  body: { query: string; filters?: string[]; searchConfig?: string },
  { onToken, onCitations, onDone, onError }: AskHandlers
): () => void {
  const controller = new AbortController();

  (async () => {
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) {
        const detail = await res.json().catch(() => ({}));
        throw new Error((detail as any).error || `${res.status} ${res.statusText}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let citationsSent = false;

      // Citations arrive keyed by paragraph id with no title or text of their
      // own — just character spans into the answer. The retrieval event, which
      // always precedes them, carries the paragraph text and its parent document
      // title, so index it as it goes past.
      const paragraphs = new Map<string, ParagraphInfo>();

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;

          let event: any;
          try {
            event = JSON.parse(trimmed.startsWith('data:') ? trimmed.slice(5) : trimmed);
          } catch {
            onToken?.(trimmed);
            continue;
          }

          if (event.item?.type === 'answer' && event.item.text) onToken?.(event.item.text);
          else if (typeof event.answer === 'string') onToken?.(event.answer);

          if (event.item?.type === 'retrieval') {
            indexParagraphs(event.item.results || event.item, paragraphs);
          }

          const citations = event.citations || event.item?.citations;
          if (citations && !citationsSent) {
            citationsSent = true;
            onCitations?.(normalizeCitations(citations, paragraphs));
          }
        }
      }

      if (!citationsSent) onCitations?.([]);
      onDone?.();
    } catch (err: any) {
      if (err?.name !== 'AbortError') onError?.(err);
    }
  })();

  return () => controller.abort();
}

/** Flattens a retrieval payload into `paragraphId → { text, title, url }`. */
function indexParagraphs(results: any, into: Map<string, ParagraphInfo>) {
  for (const [rid, resource] of Object.entries<any>(results?.resources || {})) {
    const title = resource.title || rid;
    const url = resource.origin?.url || null;
    for (const field of Object.values<any>(resource.fields || {})) {
      for (const [paragraphId, paragraph] of Object.entries<any>(field.paragraphs || {})) {
        into.set(paragraphId, {
          text: (paragraph.text || '').trim(),
          title,
          url,
          resourceId: rid,
          score: paragraph.score,
        });
      }
    }
  }
  return into;
}

/**
 * Turns Nuclia's citations into what the sources panel renders. The payload is
 * `{ "<paragraphId>": [[start,end], …] }` — spans into the answer, no title or
 * excerpt. Both come from the retrieval index built while the stream was read.
 * Multiple cited paragraphs often belong to one document, so they are grouped by
 * document: eleven paragraph citations across four reports read as four sources.
 */
function normalizeCitations(raw: any, paragraphs: Map<string, ParagraphInfo>): Citation[] {
  const entries: [string, any][] = Array.isArray(raw)
    ? raw.map((c: any, i: number) => [c.id || `source-${i}`, c])
    : Object.entries(raw || {});

  const byDocument = new Map<string, {
    resourceId: string; title: string; url: string | null; excerpts: string[]; spans: [number, number][];
  }>();

  for (const [key, value] of entries) {
    const found = paragraphs.get(key);
    const resourceId = found?.resourceId || String(key).split('/')[0];
    const spans: [number, number][] = Array.isArray(value)
      ? value.filter((s: any) => Array.isArray(s))
      : [];

    if (!byDocument.has(resourceId)) {
      byDocument.set(resourceId, {
        resourceId,
        title: found?.title || (typeof value === 'object' && value?.title) || String(key),
        url: found?.url || null,
        excerpts: [],
        spans: [],
      });
    }
    const entry = byDocument.get(resourceId)!;
    if (found?.text) entry.excerpts.push(found.text);
    entry.spans.push(...spans);
  }

  return [...byDocument.values()].map((entry, i) => ({
    index: i + 1,
    title: entry.title,
    url: entry.url,
    resourceId: entry.resourceId,
    // Longest excerpt first — most likely to show why the document was cited.
    text: entry.excerpts.sort((a, b) => b.length - a.length)[0] || '',
    excerptCount: entry.excerpts.length,
    spans: entry.spans,
  }));
}
