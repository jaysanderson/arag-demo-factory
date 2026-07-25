import { Info } from 'lucide-react';

// Persistent synthetic-data disclaimer (Hard Rule 5). Rendered from
// demo.config.json's safety.disclaimer — every generated portal must show it.
export function DisclaimerBanner({ text }: { text: string }) {
  if (!text) return null;
  return (
    <div
      className="flex items-center justify-center gap-2 px-4 py-1.5 text-center text-xs"
      style={{ background: 'var(--accent-soft)', color: 'var(--accent-strong)' }}
      role="note"
    >
      <Info size={13} className="shrink-0" />
      <span>{text}</span>
    </div>
  );
}

export function DisclaimerFooter({ text, brand }: { text: string; brand: string }) {
  return (
    <footer className="border-t border-ink-200 px-6 py-4 text-xs text-ink-500 dark:border-ink-800">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 sm:flex-row">
        <span>
          {brand} · powered by <span className="font-medium">Progress Agentic RAG</span>
        </span>
        <span className="text-ink-400">{text}</span>
      </div>
    </footer>
  );
}
