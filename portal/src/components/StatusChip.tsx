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

  return (
    <Chip
      text={label}
      themeColor={themeColor}
      fillMode="outline"
      rounded="full"
      size="small"
      className={state === 'checking' ? 'animate-pulse' : undefined}
    />
  );
}
