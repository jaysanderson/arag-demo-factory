import { useState } from 'react';
import { PlayCircle, X } from 'lucide-react';
// Kendo-free (plain button + plain modal) — works in both UI modes.
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
        type="button"
        onClick={() => setOpen(true)}
        title="Open the guided demo script"
        className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium text-ink-700 transition hover:bg-ink-50 dark:text-ink-200 dark:hover:bg-ink-800"
        style={{ borderColor: 'var(--hairline)' }}
      >
        <PlayCircle size={15} />
        <span className="hidden md:inline">Demo script</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} aria-hidden />
          <div
            className="card-elevated relative flex max-h-[80vh] w-full max-w-[440px] flex-col rounded-2xl bg-white p-5 dark:bg-ink-900"
            role="dialog"
            aria-modal="true"
            aria-label="Demo script"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-ink-900 dark:text-ink-100">Demo script</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-100 dark:hover:bg-ink-800"
              >
                <X size={16} />
              </button>
            </div>
          <div className="scroll-slim flex flex-col overflow-y-auto">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--brand)' }}>
              Guided walkthrough
            </p>
            <ol className="flex-1 space-y-4">
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
            <p className="mt-4 border-t border-ink-200 pt-3 text-xs text-ink-400 dark:border-ink-800">
              SE-facing only — this panel is not part of the customer narrative.
            </p>
          </div>
          </div>
        </div>
      )}
    </>
  );
}
