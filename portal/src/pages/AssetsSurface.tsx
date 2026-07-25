import { useEffect, useState } from 'react';
import { Image as ImageIcon, Film, FileText, Search, Sparkles } from 'lucide-react';
import type { SurfaceProps } from './types';
import type { Citation, CatalogCard } from '../lib/arag';
import { catalog, ask } from '../lib/arag';
import { PageHeader } from '../components/PageHeader';
import { Citations } from '../components/Citations';

// Asset Library (Agentic DAM) — a governed library with semantic discovery and
// "Ask the Archive". Assets come from the Knowledge Box catalog; discovery is
// meaning-based (/catalog + /find), and the archive answers questions with
// citations over its own contents. Mirrors arag-dam / wildmere Assets.

function mediaIcon(mediaType: string | null) {
  if (mediaType === 'video') return Film;
  if (mediaType === 'image') return ImageIcon;
  return FileText;
}

export function AssetsSurface({ surface }: SurfaceProps) {
  const [query, setQuery] = useState('');
  const [cards, setCards] = useState<CatalogCard[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Ask-the-Archive panel
  const [ask_q, setAskQ] = useState('');
  const [answer, setAnswer] = useState('');
  const [citations, setCitations] = useState<Citation[] | null>(null);
  const [asking, setAsking] = useState(false);

  const load = (q = '') => {
    setLoading(true);
    catalog({ query: q, pageSize: 24 })
      .then((r) => { setCards(r.items || []); setTotal(r.total ?? (r.items?.length ?? 0)); })
      .catch(() => setCards([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const runAsk = (q: string) => {
    if (!q.trim() || asking) return;
    setAnswer('');
    setCitations(null);
    setAsking(true);
    ask({ query: q }, {
      onToken: (t) => setAnswer((a) => a + t),
      onCitations: (c) => setCitations(c),
      onDone: () => setAsking(false),
      onError: () => setAsking(false),
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader icon={surface.icon} title="Asset Library">
        A governed library that understands its own contents. Find an asset by meaning, not filename — and ask the
        archive a question to get a cited answer across images, video and documents.
      </PageHeader>

      {/* Semantic discovery */}
      <form
        onSubmit={(e) => { e.preventDefault(); load(query); }}
        className="flex gap-2"
      >
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find assets by meaning — e.g. “campaign hero, summer, outdoor”"
            className="w-full rounded-lg border border-ink-200 bg-white py-2 pl-9 pr-3 text-sm dark:border-ink-700 dark:bg-ink-800"
          />
        </div>
        <button className="rounded-lg px-4 py-2 text-sm font-semibold text-white" style={{ background: 'var(--brand)' }}>
          Search
        </button>
      </form>

      <div className="text-xs uppercase tracking-wide text-ink-500">
        {loading ? 'Loading library…' : `${total} asset${total === 1 ? '' : 's'} in the library`}
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {cards.map((c) => {
          const Icon = mediaIcon(c.mediaType);
          return (
            <div key={c.id} className="group overflow-hidden rounded-xl border border-ink-200 bg-white transition hover:shadow-md dark:border-ink-800 dark:bg-ink-900">
              <div className="flex h-28 items-center justify-center" style={{ background: 'var(--brand-soft)', color: 'var(--brand)' }}>
                <Icon size={30} />
              </div>
              <div className="space-y-1 p-3">
                <div className="flex items-center gap-2">
                  <span className="rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase" style={{ background: 'var(--brand-soft)', color: 'var(--brand)' }}>
                    {c.mediaType || c.docType || 'asset'}
                  </span>
                  {c.durationMinutes ? <span className="text-[10px] text-ink-400">{c.durationMinutes}m</span> : null}
                </div>
                <div className="line-clamp-2 text-sm font-medium text-ink-800 dark:text-ink-100">{c.title}</div>
                {c.summary && <div className="line-clamp-2 text-xs text-ink-500">{c.summary}</div>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Ask the Archive */}
      <div className="rounded-2xl border border-ink-200 bg-white p-6 dark:border-ink-800 dark:bg-ink-900">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--brand)' }}>
          <Sparkles size={16} /> Ask the Archive
        </div>
        <form onSubmit={(e) => { e.preventDefault(); runAsk(ask_q); }} className="flex gap-2">
          <input
            value={ask_q}
            onChange={(e) => setAskQ(e.target.value)}
            placeholder="Ask a question about the library — the answer is cited to the assets it came from"
            className="flex-1 rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm dark:border-ink-700 dark:bg-ink-800"
          />
          <button className="rounded-lg px-4 py-2 text-sm font-semibold text-white" style={{ background: 'var(--brand)' }}>
            Ask
          </button>
        </form>
        {(answer || asking) && (
          <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_18rem]">
            <p className="whitespace-pre-wrap leading-relaxed text-ink-800 dark:text-ink-100">{answer || 'Searching the archive…'}</p>
            <div>{citations && <Citations citations={citations} />}</div>
          </div>
        )}
      </div>
    </div>
  );
}
