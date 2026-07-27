// ─────────────────────────────────────────────────────────────────────────────
// The palette — grounded data hooks ("pigments").
//
// Every hook here draws from the Knowledge Box through the portal's own /api
// proxy (see lib/arag, lib/augment). None of them can invent data: they return
// what ARAG returned, plus loading/error/provenance. Compose them freely — the
// truthfulness lives in the materials, not in any particular page.
// ─────────────────────────────────────────────────────────────────────────────
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ask as askApi, search as searchApi, catalog as catalogApi, graph as graphApi,
  entities as entitiesApi, getHealth,
  type Citation, type SearchResult, type CatalogResult, type GraphResult,
  type EntityGroups, type Health,
} from '../lib/arag';

// Phrases that mark a well-behaved refusal — the KB declined rather than confabulated.
const REFUSAL_MARKERS = [
  'not enough data', 'does not contain', 'no information', 'not provided',
  'cannot answer', "don't have", 'does not provide', 'not covered', 'no supporting',
  'unable to', 'no relevant',
];

export interface AskState {
  query: string;
  answer: string;
  citations: Citation[] | null;
  streaming: boolean;
  error: string | null;
  /** Answer finished with zero citations — treat as ungrounded (a bug to surface, not hide). */
  ungrounded: boolean;
  /** Ungrounded AND the text reads like an explicit, correct refusal. */
  refusalLike: boolean;
  done: boolean;
  run: (q: string) => void;
  stop: () => void;
  reset: () => void;
}

/**
 * Streamed, grounded Ask. The load-bearing pigment: it streams answer tokens and
 * resolves citations, and exposes ungrounded/refusal state so a UI can NEVER
 * present an uncited answer as fact. `resourceId` scopes the answer to one source
 * (used by the Journey's "how does this relate?").
 */
export function useAsk(opts: { resourceId?: string } = {}): AskState {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [citations, setCitations] = useState<Citation[] | null>(null);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<null | (() => void)>(null);

  const run = useCallback((q: string) => {
    const text = q.trim();
    if (!text) return;
    abortRef.current?.();
    setQuery(text); setAnswer(''); setCitations(null); setError(null); setStreaming(true);
    abortRef.current = askApi(
      { query: text, resourceId: opts.resourceId },
      {
        onToken: (t) => setAnswer((prev) => prev + t),
        onCitations: (c) => setCitations(c),
        onDone: () => setStreaming(false),
        onError: (e) => { setError(e.message); setStreaming(false); },
      }
    );
  }, [opts.resourceId]);

  const stop = useCallback(() => { abortRef.current?.(); setStreaming(false); }, []);
  const reset = useCallback(() => { abortRef.current?.(); setStreaming(false); setQuery(''); setAnswer(''); setCitations(null); setError(null); }, []);
  useEffect(() => () => abortRef.current?.(), []);

  const done = !streaming && !!answer;
  const ungrounded = done && citations !== null && citations.length === 0;
  const refusalLike = ungrounded && REFUSAL_MARKERS.some((m) => answer.toLowerCase().includes(m));
  return { query, answer, citations, streaming, error, ungrounded, refusalLike, done, run, stop, reset };
}

// ── on-demand async pigments ────────────────────────────────────────────────
interface AsyncState<T> { data: T | null; loading: boolean; error: string | null; run: (...a: any[]) => void; }

function useArag<T>(fn: (...a: any[]) => Promise<T>, { immediate = false }: { immediate?: boolean } = {}): AsyncState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState<string | null>(null);
  const fnRef = useRef(fn); fnRef.current = fn;
  const run = useCallback((...args: any[]) => {
    setLoading(true); setError(null);
    fnRef.current(...args).then((d) => setData(d)).catch((e) => setError(e.message)).finally(() => setLoading(false));
  }, []);
  useEffect(() => { if (immediate) run(); /* eslint-disable-next-line */ }, [immediate]);
  return { data, loading, error, run };
}

/** Semantic retrieval (/find) — the ranked source list behind an answer. */
export const useSearch = () => useArag<SearchResult>((body) => searchApi(body));
/** Faceted browse over the corpus (metadata, not semantic). */
export const useCatalog = (immediate = false) => useArag<CatalogResult>((body = {}) => catalogApi(body), { immediate });
/** Knowledge-graph path search. */
export const useGraph = () => useArag<GraphResult>((body = {}) => graphApi(body));
/** Entity groups discovered in the corpus. */
export const useEntities = (immediate = false) => useArag<EntityGroups>(() => entitiesApi(), { immediate });
/** KB liveness + resource count. */
export const useHealth = (immediate = true) => useArag<Health>(() => getHealth(), { immediate });

export type { Citation };
