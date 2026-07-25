import { useState } from 'react';
import { PlayCircle } from 'lucide-react';
import { Button } from '@progress/kendo-react-buttons';
import { Dialog } from '@progress/kendo-react-dialogs';
import type { DemoStep } from '../lib/config';

// A subtle, SE-facing "Demo script" affordance. Reads config.demoScript and pops
// open a talk-track the sales engineer can follow live. Deliberately unobtrusive
// so it never intrudes on the customer's view of the product.
export function DemoScriptPanel({ steps }: { steps: DemoStep[] }) {
  const [open, setOpen] = useState(false);
  if (!steps?.length) return null;

  return (
    <>
      <Button
        fillMode="outline"
        onClick={() => setOpen(true)}
        title="Open the guided demo script"
        startIcon={<PlayCircle size={15} />}
      >
        <span className="hidden md:inline">Demo script</span>
      </Button>

      {open && (
        <Dialog title="Demo script" onClose={() => setOpen(false)} width={440} height="80vh">
          <div className="scroll-slim flex h-full flex-col overflow-y-auto">
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
        </Dialog>
      )}
    </>
  );
}
