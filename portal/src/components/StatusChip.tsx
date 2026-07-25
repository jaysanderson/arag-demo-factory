import { useEffect, useState } from 'react';
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

  const dot =
    state === 'connected' ? 'bg-emerald-500' : state === 'down' ? 'bg-red-500' : 'bg-ink-400';
  const label =
    state === 'connected' ? 'Knowledge Box connected' : state === 'down' ? 'Knowledge Box unreachable' : 'Checking…';

  return (
    <span className="chip" title={label}>
      <span className={`h-2 w-2 rounded-full ${dot} ${state === 'checking' ? 'animate-pulse' : ''}`} />
      <span className="hidden sm:inline">{label}</span>
      <span className="sm:hidden">KB</span>
    </span>
  );
}
