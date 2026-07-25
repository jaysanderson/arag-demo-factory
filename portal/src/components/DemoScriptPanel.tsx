import { useState } from 'react';
import { PlayCircle, X } from 'lucide-react';
import type { DemoStep } from '../lib/config';

// A subtle, SE-facing "Demo script" affordance. Reads config.demoScript and pops
// open a talk-track the sales engineer can follow live. Deliberately unobtrusive
// so it never intrudes on the customer's view of the product.
export function DemoScriptPanel({ steps }: { steps: DemoStep[] }) {
  const [open, setOpen] = useState(false);
  if (!steps?.length) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="btn btn-ghost !px-3 !py-1.5 text-xs"
        title="Open the guided demo script"
      >
        <PlayCircle size={15} />
        <span className="hidden md:inline">Demo script</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-ink-950/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <aside className="relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-lg animate-fade-in dark:bg-ink-900">
            <div className="flex items-center justify-between border-b border-ink-200 px-5 py-4 dark:border-ink-800">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--brand)' }}>
                  Guided walkthrough
                </p>
                <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-ink-50">Demo script</h2>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-md p-1.5 text-ink-500 hover:bg-ink-100 dark:hover:bg-ink-800" aria-label="Close">
                <X size={18} />
              </button>
            </div>

            <ol className="scroll-slim flex-1 space-y-4 overflow-y-auto p-5">
              {steps.map((s) => (
                <li key={s.step} className="flex gap-3">
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
                    style={{ background: 'var(--brand-soft)', color: 'var(--brand)' }}
                  >
                    {s.step}
                  </span>
                  <div className="pt-0.5">
                    <p className="text-sm font-medium text-ink-900 dark:text-ink-100">{s.say}</p>
                    {s.show && (
                      <p className="mt-1 text-xs text-ink-500">
                        <span className="font-semibold uppercase tracking-wide text-ink-400">Show — </span>
                        {s.show}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
            <p className="border-t border-ink-200 px-5 py-3 text-xs text-ink-400 dark:border-ink-800">
              SE-facing only — this panel is not part of the customer narrative.
            </p>
          </aside>
        </div>
      )}
    </>
  );
}
