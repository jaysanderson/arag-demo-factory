import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shuffle, Sparkles, Share2, Play } from 'lucide-react';
import { Button } from '@progress/kendo-react-buttons';
import { Pill } from '../components/Pill';
import { Input } from '@progress/kendo-react-inputs';
import { Card, CardBody } from '@progress/kendo-react-layout';
import type { SurfaceProps } from './types';
import type { CatalogCard, GraphResult } from '../lib/arag';
import { catalog, graph, search } from '../lib/arag';
import { PageHeader } from '../components/PageHeader';
import { ClickableCard } from '../components/ClickableCard';

// Related & Similar Titles — "more like this" that understands the content, the
// YouTube-style member-experience recommendation. It shows the two mechanisms
// ARAG gives you, side by side, for a chosen title/topic:
//   • Similar by meaning   — semantic neighbours via /catalog (embeddings)
//   • Connected in the graph — entities the title shares with other content,
//     via /graph (the knowledge graph built from NER on every resource;
//     mirrors arag-personalize's KGRelated: traverse shared entities, rank by
//     overlap, instead of tag-based related posts).

type RelItem = { id: string; title: string; badge: string };

// Flatten a /find payload into ranked, deduped document hits — the real semantic
// neighbours (catalog is keyword/title-match only, so it can't do "more like this").
function toSimilar(result: any, seedText: string): RelItem[] {
  const out: RelItem[] = [];
  for (const [rid, r] of Object.entries<any>(result?.resources || {})) {
    if (r.title && r.title.toLowerCase() === seedText.toLowerCase()) continue;
    let best = -Infinity;
    for (const field of Object.values<any>(r.fields || {})) {
      for (const p of Object.values<any>(field.paragraphs || {})) {
        if ((p.score ?? 0) > best) best = p.score ?? 0;
      }
    }
    const labels: Record<string, string[]> = {};
    for (const c of r.usermetadata?.classifications || []) {
      (labels[c.labelset] ||= []).push(c.label);
    }
    const badge = labels.media_type?.[0] || labels.doc_type?.[0] || 'title';
    out.push({ id: rid, title: r.title || rid, badge, ...( { _s: best } as any) });
  }
  return out.sort((a: any, b: any) => (b._s ?? 0) - (a._s ?? 0)).slice(0, 6);
}

// HELIOS-style document codes (ANOM-HAL-011, MAL-ECLSS-07, P-204) are first-class
// entities in the knowledge graph, so a title that carries one can seed the graph.
function codeFrom(text: string): string | null {
  const m = text.match(/\b[A-Z]{1,5}-[A-Z0-9]+(?:-[A-Z0-9.]+)*\b/);
  return m ? m[0] : null;
}

export function RelatedSurface({ surface }: SurfaceProps) {
  const navigate = useNavigate();
  const [seed, setSeed] = useState('');
  const [pending, setPending] = useState('');
  const [similar, setSimilar] = useState<RelItem[]>([]);
  const [graphRes, setGraphRes] = useState<GraphResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [seedTitle, setSeedTitle] = useState<string>('');

  // Seed the picker with a few titles from the library so the SE can just click one.
  const [picks, setPicks] = useState<CatalogCard[]>([]);
  useEffect(() => {
    catalog({ query: '', pageSize: 6 }).then((r) => setPicks(r.items || [])).catch(() => {});
  }, []);

  const run = async (title: string) => {
    const t = title.trim();
    if (!t) return;
    setSeed(t);
    setSeedTitle(t);
    setLoading(true);
    try {
      const s = await search({ query: t, pageSize: 8, features: ['keyword', 'semantic'] });
      const sim = toSimilar(s, t);
      setSimilar(sim);

      // Graph: try the seed as an entity (works after a pivot), then a document
      // code lifted from the title, then codes lifted from the semantic
      // neighbours — so even a title with no entity of its own (e.g. a voice
      // loop) still surfaces the graph neighbourhood it sits next to.
      const tryEntities = [t, codeFrom(t), ...sim.map((x) => codeFrom(x.title))].filter(
        (v, i, a): v is string => !!v && a.indexOf(v) === i
      );
      let g: GraphResult | null = null;
      for (const ent of tryEntities) {
        g = await graph({ entity: ent, topK: 24 }).catch(() => null);
        if (g && g.nodes.length > 0) break;
      }
      setGraphRes(g);
    } catch {
      setSimilar([]);
      setGraphRes(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader icon={surface.icon} title="Related & Similar">
        Pick a title and see what to watch next — titles that are close in <strong>meaning</strong> and titles
        <strong> connected in the knowledge graph</strong> through the entities they share. Recommendations that
        understand the content, not just its tags.
      </PageHeader>

      <form onSubmit={(e) => { e.preventDefault(); run(pending); }} className="flex gap-2">
        <div className="relative flex-1">
          <Shuffle size={16} className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-ink-400" />
          <Input
            value={pending}
            onChange={(e) => setPending(String(e.value))}
            placeholder="A title or topic — e.g. a video, article or matter"
            className="w-full [&_.k-input-inner]:pl-7"
          />
        </div>
        <Button type="submit" themeColor="primary">Find related</Button>
      </form>

      {!seed && picks.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-ink-500">Try:</span>
          {picks.map((p) => (
            <Pill
              key={p.id}
              text={p.title.length > 46 ? p.title.slice(0, 46) + '…' : p.title}
              title={p.title}
              onClick={() => { setPending(p.title); run(p.title); }}
            />
          ))}
        </div>
      )}

      {seed && (
        <div className="rounded-xl bg-ink-50 px-4 py-3 text-sm dark:bg-ink-800">
          <span className="text-ink-500">Because you picked</span>{' '}
          <span className="font-semibold text-ink-800 dark:text-ink-100">{seedTitle}</span>
        </div>
      )}

      {loading && <div className="text-sm text-ink-500">Finding related titles…</div>}

      {seed && !loading && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Similar by meaning */}
          <section>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--brand)' }}>
              <Sparkles size={16} /> Similar by meaning
            </div>
            <div className="space-y-2">
              {similar.length === 0 && <div className="text-sm text-ink-400">No semantic neighbours found.</div>}
              {similar.map((c) => (
                <ClickableCard key={c.id} ariaLabel={`Open ${c.title}`} onClick={() => navigate(`/r/${c.id}`)} className="hover:-translate-y-0.5">
                  <Card className="card-hover">
                    <CardBody className="flex items-center gap-3 p-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md" style={{ background: 'var(--brand-soft)', color: 'var(--brand)' }}>
                        <Play size={16} />
                      </span>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium text-ink-800 dark:text-ink-100">{c.title}</div>
                        <div className="text-[11px] uppercase text-ink-400">{c.badge}</div>
                      </div>
                    </CardBody>
                  </Card>
                </ClickableCard>
              ))}
            </div>
          </section>

          {/* Connected in the graph */}
          <section>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--brand)' }}>
              <Share2 size={16} /> Connected in the graph
            </div>
            <div className="flex flex-wrap gap-2">
              {(!graphRes || graphRes.nodes.length === 0) && (
                <div className="text-sm text-ink-400">No shared-entity connections found for this title.</div>
              )}
              {graphRes?.nodes.slice(0, 20).map((n) => (
                <Pill
                  key={n.id}
                  text={`${n.label} · ${n.degree}`}
                  onClick={() => { setPending(n.label); run(n.label); }}
                />
              ))}
            </div>
            <p className="mt-3 text-xs text-ink-400">
              These entities are shared between “{seedTitle}” and other titles in the library — the knowledge graph’s
              answer to “what else is connected to this?”. Click one to pivot.
            </p>
          </section>
        </div>
      )}
    </div>
  );
}
