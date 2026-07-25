import { useEffect, useState } from 'react';
import { Shuffle, Sparkles, Share2, Play } from 'lucide-react';
import type { SurfaceProps } from './types';
import type { CatalogCard, GraphResult } from '../lib/arag';
import { catalog, graph } from '../lib/arag';
import { PageHeader } from '../components/PageHeader';

// Related & Similar Titles — "more like this" that understands the content, the
// YouTube-style member-experience recommendation. It shows the two mechanisms
// ARAG gives you, side by side, for a chosen title/topic:
//   • Similar by meaning   — semantic neighbours via /catalog (embeddings)
//   • Connected in the graph — entities the title shares with other content,
//     via /graph (the knowledge graph built from NER on every resource;
//     mirrors arag-personalize's KGRelated: traverse shared entities, rank by
//     overlap, instead of tag-based related posts).

function mediaBadge(c: CatalogCard) {
  return c.mediaType || c.docType || 'title';
}

export function RelatedSurface({ surface }: SurfaceProps) {
  const [seed, setSeed] = useState('');
  const [pending, setPending] = useState('');
  const [similar, setSimilar] = useState<CatalogCard[]>([]);
  const [graphRes, setGraphRes] = useState<GraphResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [seedTitle, setSeedTitle] = useState<string>('');

  // Seed the picker with a few titles from the library so the SE can just click one.
  const [picks, setPicks] = useState<CatalogCard[]>([]);
  useEffect(() => {
    catalog({ query: '', pageSize: 6 }).then((r) => setPicks(r.items || [])).catch(() => {});
  }, []);

  const run = (title: string) => {
    const t = title.trim();
    if (!t) return;
    setSeed(t);
    setSeedTitle(t);
    setLoading(true);
    Promise.all([
      catalog({ query: t, pageSize: 8 }),
      graph({ entity: t, topK: 24 }),
    ])
      .then(([c, g]) => {
        // Drop the seed itself from the "similar" list where possible.
        setSimilar((c.items || []).filter((x) => x.title.toLowerCase() !== t.toLowerCase()).slice(0, 6));
        setGraphRes(g);
      })
      .catch(() => { setSimilar([]); setGraphRes(null); })
      .finally(() => setLoading(false));
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
          <Shuffle size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            value={pending}
            onChange={(e) => setPending(e.target.value)}
            placeholder="A title or topic — e.g. a video, article or matter"
            className="w-full rounded-lg border border-ink-200 bg-white py-2 pl-9 pr-3 text-sm dark:border-ink-700 dark:bg-ink-800"
          />
        </div>
        <button className="rounded-lg px-4 py-2 text-sm font-semibold text-white" style={{ background: 'var(--brand)' }}>
          Find related
        </button>
      </form>

      {!seed && picks.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-ink-500">Try:</span>
          {picks.map((p) => (
            <button
              key={p.id}
              onClick={() => { setPending(p.title); run(p.title); }}
              className="rounded-full border border-ink-200 px-3 py-1 text-xs text-ink-600 hover:border-ink-400 dark:border-ink-700 dark:text-ink-300"
            >
              {p.title.length > 46 ? p.title.slice(0, 46) + '…' : p.title}
            </button>
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
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Similar by meaning */}
          <section>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--brand)' }}>
              <Sparkles size={16} /> Similar by meaning
            </div>
            <div className="space-y-2">
              {similar.length === 0 && <div className="text-sm text-ink-400">No semantic neighbours found.</div>}
              {similar.map((c) => (
                <div key={c.id} className="flex items-center gap-3 rounded-lg border border-ink-200 bg-white p-3 dark:border-ink-800 dark:bg-ink-900">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md" style={{ background: 'var(--brand-soft)', color: 'var(--brand)' }}>
                    <Play size={16} />
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-ink-800 dark:text-ink-100">{c.title}</div>
                    <div className="text-[11px] uppercase text-ink-400">{mediaBadge(c)}</div>
                  </div>
                </div>
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
                <button
                  key={n.id}
                  onClick={() => { setPending(n.label); run(n.label); }}
                  title={`${n.group} · ${n.degree} connections`}
                  className="rounded-full border px-3 py-1 text-xs transition hover:shadow-sm"
                  style={{ borderColor: 'var(--brand-soft)', color: 'var(--brand)', background: 'var(--brand-soft)' }}
                >
                  {n.label}
                  <span className="ml-1 opacity-60">· {n.degree}</span>
                </button>
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
