import { useEffect, useState } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { getResource } from '../lib/arag';
import { Spinner, ErrorBanner } from './States';

// Slide-over showing a full resource, opened from a citation or a search result.
// Nuclia's `show=values` returns the field bodies; we render the text fields.
export function DocumentDrawer({ id, onClose }: { id: string | null; onClose: () => void }) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    setData(null);
    getResource(id)
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (!id) return null;

  const bodies: string[] = [];
  if (data) {
    for (const field of Object.values<any>(data.data?.texts || {})) {
      if (field?.value?.body) bodies.push(field.value.body);
    }
    if (data.summary && !bodies.length) bodies.push(data.summary);
  }
  const sourceUrl = data?.origin?.url || null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-ink-950/30 backdrop-blur-sm" onClick={onClose} />
      <aside className="relative z-10 flex h-full w-full max-w-xl flex-col bg-white shadow-lg animate-fade-in dark:bg-ink-900">
        <div className="flex items-start justify-between gap-3 border-b border-ink-200 px-5 py-4 dark:border-ink-800">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--brand)' }}>
              Document
            </p>
            <h2 className="truncate font-display text-lg font-semibold text-ink-900 dark:text-ink-50">
              {data?.title || 'Loading…'}
            </h2>
          </div>
          <button onClick={onClose} className="rounded-md p-1.5 text-ink-500 hover:bg-ink-100 dark:hover:bg-ink-800" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="scroll-slim flex-1 space-y-4 overflow-y-auto p-5">
          {loading && <Spinner label="Loading document…" />}
          {error && <ErrorBanner>{error}</ErrorBanner>}
          {data && (
            <>
              {sourceUrl && (
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm hover:underline"
                  style={{ color: 'var(--brand)' }}
                >
                  <ExternalLink size={14} /> Open original source
                </a>
              )}
              {bodies.map((b, i) => (
                <article key={i} className="whitespace-pre-wrap text-sm leading-relaxed text-ink-700 dark:text-ink-300">
                  {b}
                </article>
              ))}
              {!bodies.length && <p className="text-sm text-ink-500">No text body available for this resource.</p>}
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
