import { useState } from 'react';
import { Info, X } from 'lucide-react';

// Persistent synthetic-data disclaimer (Hard Rule 5). Rendered from
// demo.config.json's safety.disclaimer — every generated portal must show it.
// Refined to a slim, theme-tinted glass strip: present and honest, never a
// loud yellow bar. Dismissible for the session so it stays out of the way.
export function DisclaimerBanner({ text }: { text: string }) {
  const [dismissed, setDismissed] = useState(false);
  if (!text || dismissed) return null;
  return (
    <div
      className="relative z-40 flex items-center justify-center gap-2 border-b px-4 py-1 text-center text-[11px] font-medium tracking-wide text-[color:var(--accent-strong)] dark:text-[color:var(--accent)]"
      style={{
        background: 'color-mix(in srgb, var(--accent) 8%, var(--glass))',
        borderColor: 'var(--glass-border)',
        WebkitBackdropFilter: 'blur(8px)',
        backdropFilter: 'blur(8px)',
      }}
      role="note"
    >
      <span
        className="h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ background: 'var(--accent)' }}
        aria-hidden
      />
      <Info size={12} className="shrink-0 opacity-70" aria-hidden />
      <span className="truncate opacity-90">{text}</span>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss notice"
        className="ml-1 shrink-0 rounded p-0.5 opacity-60 transition hover:opacity-100"
      >
        <X size={12} />
      </button>
    </div>
  );
}

export function DisclaimerFooter({ text, brand }: { text: string; brand: string }) {
  return (
    <footer className="relative mt-8 border-t px-6 py-6 text-xs text-ink-500" style={{ borderColor: 'var(--hairline)' }}>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 sm:flex-row">
        <span className="inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--brand)' }} aria-hidden />
          <span className="font-medium text-ink-600 dark:text-ink-300">{brand}</span>
        </span>
        <span className="flex-1 text-center text-ink-400">{text}</span>
        {/* Honest, quiet attribution — a product credit, not a headline. */}
        <span className="text-[11px] text-ink-400">Built on Progress Agentic RAG</span>
      </div>
    </footer>
  );
}
