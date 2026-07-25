import { AlertTriangle, Loader2, Inbox, ShieldAlert } from 'lucide-react';
import type { ReactNode } from 'react';

export function Spinner({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-ink-500">
      <Loader2 size={16} className="animate-spin" />
      {label || 'Loading…'}
    </div>
  );
}

export function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 align-middle" aria-label="Generating">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="typing-dot h-1.5 w-1.5 rounded-full"
          style={{ background: 'var(--brand)', animationDelay: `${i * 0.16}s` }}
        />
      ))}
    </span>
  );
}

export function ErrorBanner({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
      <AlertTriangle size={16} className="mt-0.5 shrink-0" />
      <div>{children}</div>
    </div>
  );
}

export function EmptyState({ title, hint }: { title: string; hint?: ReactNode }) {
  return (
    <div className="card flex flex-col items-center gap-2 px-6 py-14 text-center">
      <Inbox size={26} className="text-ink-400" />
      <p className="font-medium text-ink-700 dark:text-ink-200">{title}</p>
      {hint && <p className="max-w-md text-sm text-ink-500">{hint}</p>}
    </div>
  );
}

/**
 * The ungrounded warning. An answer with no citations is a BUG in this portal —
 * it is never shown as trustworthy prose. This makes that state loud.
 */
export function UngroundedWarning({ children }: { children?: ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-800/70 dark:bg-amber-950/40 dark:text-amber-200">
      <ShieldAlert size={18} className="mt-0.5 shrink-0" />
      <div>
        <p className="font-semibold">No sources returned — treat as ungrounded.</p>
        <p className="mt-0.5 text-amber-800 dark:text-amber-300/90">
          {children ||
            'The Knowledge Box did not cite any documents for this answer. A grounded portal declines rather than asserting the unsupported — do not rely on this text.'}
        </p>
      </div>
    </div>
  );
}
