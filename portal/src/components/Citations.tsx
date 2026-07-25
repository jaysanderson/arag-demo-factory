import { ExternalLink, FileText, Quote } from 'lucide-react';
import type { Citation } from '../lib/arag';

// Sources panel — citations grouped by document (see arag.ts). An answer with
// citations is grounded; the count of source documents is shown so the reader
// can see the answer stands on more than one leg.
export function Citations({
  citations,
  onOpen,
}: {
  citations: Citation[];
  onOpen?: (resourceId: string) => void;
}) {
  if (!citations.length) return null;
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink-500">
        <Quote size={13} />
        {citations.length} source{citations.length > 1 ? 's' : ''}
      </div>
      <ol className="space-y-2">
        {citations.map((c) => (
          <li key={c.resourceId} className="card p-3 transition hover:shadow-md">
            <div className="flex items-start gap-2.5">
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                style={{ background: 'var(--brand)', color: 'var(--brand-contrast)' }}
              >
                {c.index}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <FileText size={13} className="shrink-0 text-ink-400" />
                  <button
                    onClick={() => onOpen?.(c.resourceId)}
                    className="truncate text-left text-sm font-semibold text-ink-900 hover:underline dark:text-ink-100"
                    title={c.title}
                  >
                    {c.title}
                  </button>
                </div>
                {c.text && (
                  <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-ink-500">“{c.text}”</p>
                )}
                <div className="mt-1.5 flex items-center gap-3 text-[11px] text-ink-400">
                  {c.excerptCount > 1 && <span>{c.excerptCount} cited passages</span>}
                  {c.url && (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 hover:text-ink-600"
                      style={{ color: 'var(--brand)' }}
                    >
                      <ExternalLink size={11} /> source
                    </a>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
