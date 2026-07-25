import { useCallback, useEffect, useMemo, useState } from 'react';
import { Search, X, FileText, Clock } from 'lucide-react';
import type { SurfaceProps } from './types';
import { search, catalog, type CatalogResult, type CatalogCard } from '../lib/arag';
import { PageHeader } from '../components/PageHeader';
import { DocumentDrawer } from '../components/DocumentDrawer';
import { Spinner, ErrorBanner, EmptyState } from '../components/States';

interface Hit {
  id: string;
  title: string;
  snippet: string;
  score: number;
  docType?: string;
}

/** Flatten a /find payload into ranked, deduped document hits with a snippet. */
function toHits(result: any): Hit[] {
  const hits: Hit[] = [];
  for (const [rid, resource] of Object.entries<any>(result?.resources || {})) {
    let best: { text: string; score: number } | null = null;
    for (const field of Object.values<any>(resource.fields || {})) {
      for (const p of Object.values<any>(field.paragraphs || {})) {
        if (!best || (p.score ?? 0) > best.score) best = { text: p.text || '', score: p.score ?? 0 };
      }
    }
    hits.push({
      id: rid,
      title: resource.title || rid,
      snippet: (best?.text || resource.summary || '').trim(),
      score: best?.score ?? 0,
    });
  }
  return hits.sort((a, b) => b.score - a.score);
}

const prettyLabelset = (id: string) =>
  id.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

export function SearchSurface({ surface }: SurfaceProps) {
  const hasFacets = surface.capabilities?.includes('facets');

  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [filters, setFilters] = useState<Set<string>>(new Set());
  const [hits, setHits] = useState<Hit[] | null>(null);
  const [browse, setBrowse] = useState<CatalogResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openDoc, setOpenDoc] = useState<string | null>(null);

  const filterList = useMemo(() => [...filters], [filters]);

  // Facets + browse items come live from /catalog and refresh with filters.
  const loadCatalog = useCallback(async () => {
    if (!hasFacets && submitted) return; // facets not enabled and we're searching
    try {
      const data = await catalog({ filters: filterList, pageSize: 60 });
      setBrowse(data);
    } catch (e: any) {
      setError(e.message);
    }
  }, [filterList, hasFacets, submitted]);

  useEffect(() => {
    loadCatalog();
  }, [loadCatalog]);

  const runSearch = useCallback(
    async (q: string) => {
      const text = q.trim();
      setSubmitted(text);
      if (!text) {
        setHits(null);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const result = await search({ query: text, filters: filterList, pageSize: 30 });
        setHits(toHits(result));
      } catch (e: any) {
        setError(e.message);
        setHits([]);
      } finally {
        setLoading(false);
      }
    },
    [filterList]
  );

  // Re-run an active search when filters change.
  useEffect(() => {
    if (submitted) runSearch(submitted);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterList]);

  const toggleFilter = (labelset: string, label: string) => {
    const f = `/classification.labels/${labelset}/${label}`;
    setFilters((prev) => {
      const next = new Set(prev);
      next.has(f) ? next.delete(f) : next.add(f);
      return next;
    });
  };
  const clearFilters = () => setFilters(new Set());

  const facets = browse?.facets || {};
  const facetKeys = Object.keys(facets).filter((k) => facets[k].length);
  const showingSearch = !!submitted;

  return (
    <div>
      <PageHeader icon={surface.icon} title="Search">
        Meaning-based retrieval over the whole corpus — type a concept, not a keyword.
        {hasFacets && ' Narrow by type, topic, region and more; counts come live from the Knowledge Box.'}
      </PageHeader>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          runSearch(query);
        }}
        className="card flex items-center gap-2 p-2"
      >
        <Search size={18} className="ml-2 text-ink-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the corpus by concept…"
          className="field border-0 bg-transparent shadow-none focus:shadow-none"
        />
        <button type="submit" className="btn btn-brand">Search</button>
      </form>

      <div className={`mt-6 grid gap-6 ${hasFacets ? 'lg:grid-cols-[16rem_1fr]' : ''}`}>
        {/* Facets */}
        {hasFacets && (
          <aside className="space-y-4">
            {filterList.length > 0 && (
              <button onClick={clearFilters} className="inline-flex items-center gap-1 text-xs text-ink-500 hover:text-ink-800">
                <X size={12} /> Clear {filterList.length} filter{filterList.length > 1 ? 's' : ''}
              </button>
            )}
            {facetKeys.length === 0 && <p className="text-xs text-ink-400">No facets available.</p>}
            {facetKeys.map((ls) => (
              <div key={ls} className="card p-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-500">
                  {prettyLabelset(ls)}
                </p>
                <ul className="space-y-1">
                  {facets[ls].slice(0, 8).map(({ label, count }) => {
                    const active = filters.has(`/classification.labels/${ls}/${label}`);
                    return (
                      <li key={label}>
                        <button
                          onClick={() => toggleFilter(ls, label)}
                          className={`flex w-full items-center justify-between gap-2 rounded-md px-2 py-1 text-left text-sm transition ${
                            active ? 'font-semibold' : 'text-ink-600 hover:bg-ink-50 dark:text-ink-300 dark:hover:bg-ink-800'
                          }`}
                          style={active ? { background: 'var(--brand-soft)', color: 'var(--brand-strong)' } : undefined}
                        >
                          <span className="truncate">{label}</span>
                          <span className="chip !px-1.5 !py-0 text-[11px]">{count}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </aside>
        )}

        {/* Results */}
        <div className="space-y-3">
          {error && <ErrorBanner>{error}</ErrorBanner>}
          {loading && <Spinner label="Searching…" />}

          {!loading && showingSearch && hits && (
            <>
              <p className="text-xs text-ink-500">
                {hits.length} result{hits.length === 1 ? '' : 's'} for “{submitted}”
              </p>
              {hits.length === 0 ? (
                <EmptyState title="No matches" hint="Try a broader concept or remove a filter." />
              ) : (
                hits.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => setOpenDoc(h.id)}
                    className="card block w-full p-4 text-left transition hover:shadow-md"
                  >
                    <div className="flex items-center gap-2">
                      <FileText size={14} className="shrink-0 text-ink-400" />
                      <span className="font-semibold text-ink-900 dark:text-ink-100">{h.title}</span>
                      <span className="ml-auto chip !px-1.5 text-[11px]">{Math.round(h.score * 100)}%</span>
                    </div>
                    {h.snippet && <p className="mt-1.5 line-clamp-2 text-sm text-ink-500">{h.snippet}</p>}
                  </button>
                ))
              )}
            </>
          )}

          {!loading && !showingSearch && (
            <BrowseGrid items={browse?.items || []} total={browse?.total} onOpen={setOpenDoc} />
          )}
        </div>
      </div>

      {openDoc && <DocumentDrawer id={openDoc} onClose={() => setOpenDoc(null)} />}
    </div>
  );
}

function BrowseGrid({
  items,
  total,
  onOpen,
}: {
  items: CatalogCard[];
  total?: number;
  onOpen: (id: string) => void;
}) {
  if (!items.length) return <EmptyState title="Nothing to browse yet" hint="Bind a Knowledge Box with ingested resources." />;
  return (
    <>
      <p className="text-xs text-ink-500">{total ?? items.length} documents in the corpus</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((c) => (
          <button key={c.id} onClick={() => onOpen(c.id)} className="card block p-4 text-left transition hover:shadow-md">
            <div className="flex items-center gap-2">
              <span className="chip !px-1.5 text-[11px]" style={{ background: 'var(--brand-soft)', color: 'var(--brand-strong)' }}>
                {c.docType}
              </span>
              {c.durationMinutes != null && (
                <span className="chip !px-1.5 text-[11px]">
                  <Clock size={10} /> {c.durationMinutes}m
                </span>
              )}
            </div>
            <p className="mt-2 font-semibold text-ink-900 dark:text-ink-100">{c.title}</p>
            {c.summary && <p className="mt-1 line-clamp-2 text-sm text-ink-500">{c.summary}</p>}
          </button>
        ))}
      </div>
    </>
  );
}
