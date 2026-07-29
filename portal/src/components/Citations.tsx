import { useEffect, useState } from 'react';
import { ExternalLink, FileText, Quote } from 'lucide-react';
// Kendo-free: the citations panel (part of the grounding guarantee) uses plain
// elements + the `.card` utility, identical in both UI modes.
import type { Citation } from '../lib/arag';
import { getResource } from '../lib/arag';

// A raw Nuclia id (32 hex chars, optionally with a /field/paragraph suffix)
// leaking through as a title means the ask payload carried the citation but not
// the document's metadata. Human titles always have spaces; ids never do — use
// that plus the hex signature to detect one, so we can resolve the real title.
const isRawId = (title: string, resourceId: string) => {
  const t = title.trim();
  if (/\s/.test(t)) return false;
  return /^[0-9a-f]{32}(\/|$)/i.test(t) || t === resourceId || t.startsWith(resourceId);
};

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
  // Lazily resolve titles that came through as raw ids.
  const [resolved, setResolved] = useState<Record<string, string>>({});
  useEffect(() => {
    let live = true;
    const missing = citations.filter((c) => isRawId(c.title, c.resourceId)).map((c) => c.resourceId);
    for (const rid of missing) {
      if (resolved[rid]) continue;
      getResource(rid)
        .then((r) => {
          if (live && r?.title) setResolved((m) => ({ ...m, [rid]: r.title }));
        })
        .catch(() => {});
    }
    return () => {
      live = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [citations]);

  if (!citations.length) return null;
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink-500">
        <Quote size={13} />
        {citations.length} source{citations.length > 1 ? 's' : ''}
      </div>
      <ol className="space-y-2">
        {citations.map((c) => {
          const title = isRawId(c.title, c.resourceId) ? resolved[c.resourceId] || 'Loading source…' : c.title;
          const clickable = !!onOpen;
          return (
            <li key={c.resourceId}>
              <div
                className={`card p-3 transition ${clickable ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md' : 'hover:shadow-md'}`}
                {...(clickable
                  ? {
                      role: 'button',
                      tabIndex: 0,
                      onClick: () => onOpen!(c.resourceId),
                      onKeyDown: (e: React.KeyboardEvent) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onOpen!(c.resourceId);
                        }
                      },
                    }
                  : {})}
                title={title}
              >
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
                          <span
                            className={`truncate text-sm font-semibold text-ink-900 dark:text-ink-100 ${clickable ? 'group-hover:underline' : ''}`}
                          >
                            {title}
                          </span>
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
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 hover:text-ink-600"
                              style={{ color: 'var(--brand)' }}
                            >
                              <ExternalLink size={11} /> source
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
