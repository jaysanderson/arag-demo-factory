import type { ReactNode } from 'react';
import { Lightbulb } from 'lucide-react';
// Kendo-free (plain `.card` div) — works in both UI modes.

/**
 * A graceful "this surface needs enabling" state. Surfaces whose ARAG endpoint
 * isn't part of the base KB proxy (agent sessions, account predict, MCP SSE)
 * render this when their call is unavailable — on-brand, never a broken screen.
 */
export function SurfaceNotice({
  title,
  children,
  bullets,
}: {
  title: string;
  children?: ReactNode;
  bullets?: string[];
}) {
  return (
    <div className="card overflow-hidden">
      <div className="px-6 py-6" style={{ background: 'var(--brand-soft)' }}>
        <div className="flex items-center gap-2" style={{ color: 'var(--brand-strong)' }}>
          <Lightbulb size={18} />
          <span className="text-sm font-semibold">{title}</span>
        </div>
      </div>
      <div className="space-y-4 px-6 py-6">
        {children && <div className="text-sm leading-relaxed text-ink-600 dark:text-ink-300">{children}</div>}
        {bullets && (
          <ul className="grid gap-2 sm:grid-cols-2">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-ink-600 dark:text-ink-300">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: 'var(--accent)' }} />
                {b}
              </li>
            ))}
          </ul>
        )}
        <p className="rounded-lg border border-dashed border-ink-300 px-4 py-3 text-xs text-ink-500 dark:border-ink-700">
          Enable this surface by adding its capability to <code className="font-mono">demo.config.json</code> and
          binding a Knowledge Box with the features it needs. The shell renders it automatically — no code change.
        </p>
      </div>
    </div>
  );
}
