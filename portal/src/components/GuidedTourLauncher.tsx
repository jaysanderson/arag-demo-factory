import { useState } from 'react';
import { Play } from 'lucide-react';
import type { DemoConfig, Surface } from '../lib/config';
import { GuidedTour } from './GuidedTour';

/**
 * Self-managed guided-tour affordance: a floating launch pill + the GuidedTour
 * itself, owning its own open/close state. Drop it in ONCE and a demo has the
 * guided walkthrough — no wiring required. The universal App frame mounts this
 * for every bespoke Shell so EVERY build ships the tour (the config shell keeps
 * its own in-bar "Guided tour" button instead). Renders nothing when the demo
 * has no demoScript, but every build should generate one.
 *
 * A bespoke Shell that wants the launcher in its own chrome can import this from
 * the palette and place it there; pass `floating={false}` to drop the pill and
 * drive `GuidedTour` from its own button instead.
 */
export function GuidedTourLauncher({
  config,
  surfaces,
  floating = true,
}: {
  config: DemoConfig;
  surfaces: Surface[];
  floating?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const hasTour = (config.demoScript?.length || 0) > 0;
  if (!hasTour) return null;

  return (
    <>
      {floating && !open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Start the guided tour"
          className="fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold shadow-lg ring-1 ring-black/10 transition hover:brightness-110 active:scale-[0.98]"
          style={{ background: 'var(--brand-strong, var(--brand))', color: 'var(--brand-contrast, #fff)' }}
        >
          <Play size={15} />
          Guided tour
        </button>
      )}
      <GuidedTour config={config} surfaces={surfaces} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
