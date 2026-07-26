import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, FileText } from 'lucide-react';
import { Chip } from '@progress/kendo-react-buttons';
import { Card, CardBody } from '@progress/kendo-react-layout';
import type { SurfaceProps } from './types';
import { search, catalog } from '../lib/arag';
import { PageHeader } from '../components/PageHeader';
import { ClickableCard } from '../components/ClickableCard';
import { Spinner } from '../components/States';

interface Rec { id: string; title: string; snippet: string }

function toRecs(result: any): Rec[] {
  const out: Rec[] = [];
  for (const [rid, resource] of Object.entries<any>(result?.resources || {})) {
    let best = '';
    for (const field of Object.values<any>(resource.fields || {})) {
      for (const p of Object.values<any>(field.paragraphs || {})) {
        if ((p.text || '').length > best.length) best = p.text;
      }
    }
    out.push({ id: rid, title: resource.title || rid, snippet: (best || resource.summary || '').trim() });
  }
  return out.slice(0, 8);
}

// Personalised experience. One grounded plugin powers a "for you" feed: pick an
// interest and the corpus reorders around it — all retrieved, all attributable,
// no separate recommender to keep in sync.
export function PersonalizeSurface({ surface }: SurfaceProps) {
  const navigate = useNavigate();
  const [interests, setInterests] = useState<string[]>([]);
  const [active, setActive] = useState<string>('');
  const [recs, setRecs] = useState<Rec[] | null>(null);
  const [loading, setLoading] = useState(false);

  // Derive interest chips from the corpus's own facet labels — real topics, not
  // invented ones.
  useEffect(() => {
    catalog({ pageSize: 0 })
      .then((r) => {
        const labels = Object.values(r.facets).flat().map((f) => f.label);
        const uniq = [...new Set(labels)].slice(0, 8);
        setInterests(uniq);
        if (uniq.length) setActive(uniq[0]);
      })
      .catch(() => setInterests([]));
  }, []);

  useEffect(() => {
    if (!active) return;
    setLoading(true);
    search({ query: active, pageSize: 12 })
      .then((r) => setRecs(toRecs(r)))
      .catch(() => setRecs([]))
      .finally(() => setLoading(false));
  }, [active]);

  const heading = useMemo(() => (active ? `Because you follow “${active}”` : 'Recommended for you'), [active]);

  return (
    <div className="space-y-6">
      <PageHeader icon={surface.icon} title="For You">
        A grounded, personalised feed. Pick an interest and the Knowledge Box reorders around it — one plugin instead of a
        separate search, recommender and chat stack.
      </PageHeader>

      {interests.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {interests.map((it) => (
            <Chip
              key={it}
              text={it}
              selected={active === it}
              onClick={() => setActive(it)}
              rounded="full"
              size="small"
              fillMode={active === it ? 'solid' : 'outline'}
              style={active === it ? { background: 'var(--brand)', color: 'var(--brand-contrast)', borderColor: 'var(--brand)' } : undefined}
            />
          ))}
        </div>
      )}

      <div>
        <p className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-ink-700 dark:text-ink-200">
          <Sparkles size={15} style={{ color: 'var(--accent)' }} /> {heading}
        </p>
        {loading ? (
          <Spinner label="Personalising…" />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {(recs || []).map((r) => (
              <ClickableCard key={r.id} ariaLabel={`Open ${r.title}`} onClick={() => navigate(`/r/${r.id}`)} className="hover:-translate-y-0.5">
                <Card className="card-hover h-full transition hover:shadow-md">
                  <CardBody className="p-4">
                    <div className="flex items-center gap-2">
                      <FileText size={14} className="shrink-0 text-ink-400" />
                      <span className="line-clamp-1 font-semibold text-ink-900 dark:text-ink-100">{r.title}</span>
                    </div>
                    {r.snippet && <p className="mt-1.5 line-clamp-2 text-sm text-ink-500">{r.snippet}</p>}
                  </CardBody>
                </Card>
              </ClickableCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
