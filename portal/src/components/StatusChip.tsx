import { useEffect, useState } from 'react';
import { Chip } from '@progress/kendo-react-buttons';
import { getHealth } from '../lib/arag';

// KB-connected status chip. Reports connectivity only — NEVER the zone/region
// string (Hard Rule 4). Re-probes periodically so a cold KB shows as it wakes.
export function StatusChip() {
  const [state, setState] = useState<'checking' | 'connected' | 'down'>('checking');

  useEffect(() => {
    let alive = true;
    const probe = async () => {
      const h = await getHealth();
      if (alive) setState(h.ok ? 'connected' : 'down');
    };
    probe();
    const id = setInterval(probe, 30000);
    return () => {
      alive = false;
      clearInterval(id);
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
