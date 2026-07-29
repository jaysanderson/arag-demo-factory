import { useEffect, useRef, useState } from 'react';
// Kendo-free status pill (plain elements) — works in both UI modes.
import { getHealth } from '../lib/arag';

// KB-connected status chip. Reports connectivity only — NEVER the zone/region
// string (Hard Rule 4). Re-probes periodically so a cold KB shows as it wakes.
//
// A single upstream blip (e.g. a /counters timeout while a heavy graph query is
// in flight) must NOT flash "unreachable" in front of a buyer. We require two
// consecutive misses before showing "down", stay "connected" through one blip,
// and re-probe quickly after a miss so recovery shows fast.
export function StatusChip() {
  const [state, setState] = useState<'checking' | 'connected' | 'down'>('checking');
  const misses = useRef(0);

  useEffect(() => {
    let alive = true;
    let timer: ReturnType<typeof setTimeout>;

    const schedule = (ms: number) => {
      if (!alive) return;
      timer = setTimeout(probe, ms);
    };

    const probe = async () => {
      let ok = false;
      try {
        ok = (await getHealth()).ok;
      } catch {
        ok = false;
      }
      if (!alive) return;
      if (ok) {
        misses.current = 0;
        setState('connected');
        schedule(30000);
      } else {
        misses.current += 1;
        // Only surface "down" after a second consecutive miss; retry soon.
        if (misses.current >= 2) setState('down');
        schedule(misses.current >= 2 ? 30000 : 5000);
      }
    };

    probe();
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, []);

  const label =
    state === 'connected' ? 'Knowledge Box connected' : state === 'down' ? 'Knowledge Box unreachable' : 'Checking…';
  const dot = state === 'connected' ? '#22c55e' : state === 'down' ? '#ef4444' : '#94a3b8';
  const tone =
    state === 'connected'
      ? 'border-emerald-300 text-emerald-700 dark:border-emerald-800/70 dark:text-emerald-300'
      : state === 'down'
        ? 'border-red-300 text-red-700 dark:border-red-800/70 dark:text-red-300'
        : 'border-ink-300 text-ink-500 dark:border-ink-700';

  // Plain status pill with a coloured dot. A soft glow sits AROUND it (CSS only)
  // when the KB is live so it reads as a live indicator.
  return (
    <span className="relative inline-flex">
      {state === 'connected' && (
        <span
          className="pointer-events-none absolute -inset-1 rounded-full blur-md animate-pulse-glow"
          style={{ background: 'color-mix(in srgb, #22c55e 45%, transparent)' }}
          aria-hidden
        />
      )}
      <span
        className={`relative inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${tone} ${state === 'checking' ? 'animate-pulse' : ''}`}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: dot }} aria-hidden />
        {label}
      </span>
    </span>
  );
}
