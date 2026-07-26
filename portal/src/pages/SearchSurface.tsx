import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, FileText } from 'lucide-react';
import { Button, Chip } from '@progress/kendo-react-buttons';
import { Card, CardBody } from '@progress/kendo-react-layout';
import { Input, Checkbox } from '@progress/kendo-react-inputs';
import type { SurfaceProps } from './types';
import { search, catalog, type CatalogResult, type CatalogCard } from '../lib/arag';
import { PageHeader } from '../components/PageHeader';
import { ClickableCard } from '../components/ClickableCard';
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
  const navigate = useNavigate();
  const openResource = (rid: string) => navigate(`/r/${rid}`);

  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [filters, setFilters] = useState<Set<string>>(new Set());
  const [hits, setHits] = useState<Hit[] | null>(null);
  const [browse, setBrowse] = useState<CatalogResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

      <Card>
        <CardBody className="p-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              runSearch(query);
            }}
            className="flex items-center gap-2"
          >
            <Search size={18} className="ml-2 shrink-0 text-ink-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(String(e.value))}
              placeholder="Search the corpus by concept…"
              className="flex-1"
            />
            <Button type="submit" themeColor="primary">Search</Button>
          </form>
        </CardBody>
      </Card>

      <div className={`mt-6 grid grid-cols-1 gap-6 ${hasFacets ? 'lg:grid-cols-[16rem_1fr]' : ''}`}>
        {/* Facets */}
        {hasFacets && (
          <aside className="space-y-4">
            {filterList.length > 0 && (
              <Button
                fillMode="flat"
                size="small"
                onClick={clearFilters}
                startIcon={<X size={12} />}
              >
                Clear {filterList.length} filter{filterList.length > 1 ? 's' : ''}
              </Button>
            )}
            {facetKeys.length === 0 && <p className="text-xs text-ink-400">No facets available.</p>}
            {facetKeys.map((ls) => (
              <Card key={ls}>
                <CardBody className="p-3">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-500">
                    {prettyLabelset(ls)}
                  </p>
                  <ul className="space-y-1.5">
                    {facets[ls].slice(0, 8).map(({ label, count }) => {
                      const active = filters.has(`/classification.labels/${ls}/${label}`);
                      return (
                        <li key={label} className="flex items-center justify-between gap-2">
                          <Checkbox
                            checked={active}
                            onChange={() => toggleFilter(ls, label)}
                            label={label}
                            className="min-w-0 [&_.k-checkbox-label]:truncate"
                          />
                          <Chip text={String(count)} size="small" fillMode="outline" rounded="full" />
                        </li>
                      );
                    })}
                  </ul>
                </CardBody>
              </Card>
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
                  <ClickableCard key={h.id} ariaLabel={`Open ${h.title}`} onClick={() => openResource(h.id)}>
                    <Card className="card-hover transition hover:shadow-md">
                      <CardBody className="p-4">
                        <div className="flex items-center gap-2">
                          <FileText size={14} className="shrink-0 text-ink-400" />
                          <span className="font-semibold text-ink-900 dark:text-ink-100">{h.title}</span>
                          <Chip
                            text={`${Math.round(h.score * 100)}%`}
                            size="small"
                            fillMode="outline"
                            rounded="full"
                            className="ml-auto"
                          />
                        </div>
                        {h.snippet && <p className="mt-1.5 line-clamp-2 text-sm text-ink-500">{h.snippet}</p>}
                      </CardBody>
                    </Card>
                  </ClickableCard>
                ))
              )}
            </>
          )}

          {!loading && !showingSearch && (
            <BrowseGrid items={browse?.items || []} total={browse?.total} onOpen={openResource} />
          )}
        </div>
      </div>
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
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((c) => (
          <ClickableCard key={c.id} ariaLabel={`Open ${c.title}`} onClick={() => onOpen(c.id)} className="hover:-translate-y-0.5">
            <Card className="card-hover h-full transition hover:shadow-md">
              <CardBody className="p-4">
                <div className="flex items-center gap-2">
                  <Chip
                    text={c.docType}
                    size="small"
                    rounded="full"
                    style={{ background: 'var(--brand-soft)', color: 'var(--brand-strong)', borderColor: 'transparent' }}
                  />
                  {c.durationMinutes != null && (
                    <Chip
                      text={`${c.durationMinutes}m`}
                      size="small"
                      fillMode="outline"
                      rounded="full"
                    />
                  )}
                </div>
                <p className="mt-2 font-semibold text-ink-900 dark:text-ink-100">{c.title}</p>
                {c.summary && <p className="mt-1 line-clamp-2 text-sm text-ink-500">{c.summary}</p>}
              </CardBody>
            </Card>
          </ClickableCard>
        ))}
      </div>
    </>
  );
}
