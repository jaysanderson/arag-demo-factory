import { useEffect, useRef, useState } from 'react';
import { Chip } from '@progress/kendo-react-buttons';
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

  const themeColor = state === 'connected' ? 'success' : state === 'down' ? 'error' : 'base';
  const label =
    state === 'connected' ? 'Knowledge Box connected' : state === 'down' ? 'Knowledge Box unreachable' : 'Checking…';

  // Vendor KendoReact Chip, themed via the Kendo colour vars. A soft glow sits
  // AROUND the chip (CSS only) when the KB is live so it reads as a status pill
  // without hand-rolling the control itself.
  return (
    <span className="relative inline-flex">
      {state === 'connected' && (
        <span
          className="pointer-events-none absolute -inset-1 rounded-full blur-md animate-pulse-glow"
          style={{ background: 'color-mix(in srgb, #22c55e 45%, transparent)' }}
          aria-hidden
        />
      )}
      <Chip
        className={`relative ${state === 'checking' ? 'animate-pulse' : undefined}`}
        text={label}
        themeColor={themeColor}
        fillMode="outline"
        rounded="full"
        size="small"
      />
    </span>
  );
}
