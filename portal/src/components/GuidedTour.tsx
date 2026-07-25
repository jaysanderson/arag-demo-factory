import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, X, Play } from 'lucide-react';
import type { DemoConfig, Surface } from '../lib/config';
import { resolveTour } from '../lib/nav';
import { surfaceIcon } from '../lib/icons';

/**
 * DEMO MODE — a launchable, config-driven walkthrough of demoScript. Each beat
 * shows its narration and deep-links to the surface it's about, so the audience
 * watches the real product move underneath a slim docked narration bar (never a
 * blocking modal). Driven entirely by config.demoScript + resolveTour().
 */
export function GuidedTour({
  config,
  surfaces,
  open,
  onClose,
}: {
  config: DemoConfig;
  surfaces: Surface[];
  open: boolean;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const beats = useMemo(() => resolveTour(config, surfaces), [config, surfaces]);
  const [i, setI] = useState(0);

  const goto = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(beats.length - 1, next));
      setI(clamped);
      const route = beats[clamped]?.route;
      if (route) navigate(route);
    },
    [beats, navigate]
  );

  // On open, jump to the first beat and deep-link its surface.
  useEffect(() => {
    if (open && beats.length) {
      setI(0);
      if (beats[0]?.route) navigate(beats[0].route);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Keyboard driving — arrows advance, Escape exits.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') goto(i + 1);
      else if (e.key === 'ArrowLeft') goto(i - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, i, goto, onClose]);

  if (!open || !beats.length) return null;

  const { step, surface } = beats[i];
  const Icon = surfaceIcon(surface?.icon);
  const last = i === beats.length - 1;
  const pct = ((i + 1) / beats.length) * 100;

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-50 flex flex-col justify-end">
      {/* Thin top progress bar */}
      <div className="pointer-events-none fixed inset-x-0 top-0 h-0.5 bg-transparent">
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${pct}%`, background: 'linear-gradient(90deg, var(--brand), var(--accent))' }}
        />
      </div>

      {/* Docked narration bar — audience still sees the live surface above it. */}
      <div className="pointer-events-auto mx-auto mb-5 w-full max-w-3xl px-4 animate-fade-up">
        <div className="card-elevated glass overflow-hidden rounded-2xl">
          <div className="flex items-start gap-4 p-4 sm:p-5">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
              style={{ background: 'var(--brand-soft)', color: 'var(--brand)' }}
            >
              <Icon size={20} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-eyebrow uppercase" style={{ color: 'var(--brand)' }}>
                <span>Guided demo</span>
                <span className="text-ink-400">·</span>
                <span className="text-ink-500">
                  Beat {i + 1} / {beats.length}
                </span>
                {surface && (
                  <>
                    <span className="text-ink-400">·</span>
                    <span className="text-ink-500">{surface.label}</span>
                  </>
                )}
              </div>
              <p className="mt-1.5 text-[15px] font-medium leading-snug text-ink-900 dark:text-ink-50">
                {step.say}
              </p>
              {step.show && (
                <p className="mt-1 truncate text-xs text-ink-500">
                  <span className="font-semibold uppercase tracking-wide text-ink-400">Show — </span>
                  {step.show}
                </p>
              )}
            </div>

            <button
              onClick={onClose}
              aria-label="Exit guided demo"
              className="shrink-0 rounded-lg p-1.5 text-ink-400 transition hover:bg-ink-100 hover:text-ink-700 dark:hover:bg-ink-800 dark:hover:text-ink-200"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex items-center justify-between gap-3 border-t px-4 py-2.5" style={{ borderColor: 'var(--hairline)' }}>
            {/* Beat dots */}
            <div className="flex items-center gap-1.5">
              {beats.map((b, idx) => (
                <button
                  key={b.step.step}
                  onClick={() => goto(idx)}
                  aria-label={`Go to beat ${idx + 1}`}
                  className="h-1.5 rounded-full transition-all"
                  style={{
                    width: idx === i ? 22 : 6,
                    background: idx === i ? 'var(--brand)' : 'var(--hairline-strong)',
                  }}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => goto(i - 1)}
                disabled={i === 0}
                className="btn btn-ghost !px-3 !py-1.5 text-xs disabled:opacity-40"
              >
                <ArrowLeft size={14} /> Back
              </button>
              {last ? (
                <button onClick={onClose} className="btn btn-brand !px-4 !py-1.5 text-xs">
                  Finish
                </button>
              ) : (
                <button onClick={() => goto(i + 1)} className="btn btn-brand !px-4 !py-1.5 text-xs">
                  Next <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        <p className="mt-2 text-center text-[11px] text-ink-400">
          <Play size={10} className="mr-1 inline" />
          Use ← → to move between beats · Esc to exit
        </p>
      </div>
    </div>,
    document.body
  );
}
