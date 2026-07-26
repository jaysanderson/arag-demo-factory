import { useEffect, useRef, useState, type ReactNode } from 'react';
import { CircularGauge } from '@progress/kendo-react-gauges';
import { useReveal, useCountUp } from '../lib/motion';

/**
 * A glowing score ring, built on the Progress **KendoReact `CircularGauge`**
 * (vendor control) — a full 360° progress arc in the demo's brand colour with a
 * soft glow, sweeping from 0 to `value`% the first time it scrolls into view.
 * Center content is rendered via `children`. Fully themeable (reads --brand) and
 * reduced-motion aware (snaps to the final value).
 *
 * Same props as before, so the surfaces that use it need no changes.
 * `value` is a 0–100 percentage, or null for an inert "not run" state.
 */
export function ProgressRing({
  value,
  size = 168,
  stroke = 12,
  children,
}: {
  value: number | null;
  size?: number;
  stroke?: number;
  children?: ReactNode;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const animated = useCountUp(value, visible, 1200);
  const pct = value == null ? 0 : Math.max(0, Math.min(100, animated));

  // Kendo gauges take a concrete colour string, so resolve the theme var.
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [brand, setBrand] = useState('#22d3ee');
  useEffect(() => {
    const el = hostRef.current || document.documentElement;
    const c = getComputedStyle(el).getPropertyValue('--brand').trim();
    if (c) setBrand(c);
  }, [visible]);

  return (
    <div
      ref={(node) => {
        ref.current = node;
        hostRef.current = node;
      }}
      className="relative inline-flex items-center justify-center"
      style={{
        width: size,
        height: size,
        filter: `drop-shadow(0 0 16px color-mix(in srgb, var(--brand) ${value == null ? 0 : 45}%, transparent))`,
      }}
    >
      <CircularGauge
        value={pct}
        color={brand}
        transitions
        style={{ width: size, height: size }}
        scale={{
          startAngle: 0,
          endAngle: 360,
          rangeSize: stroke,
          rangeLineCap: 'round',
          labels: { visible: false },
          majorTicks: { visible: false },
          minorTicks: { visible: false },
        }}
      />
      {/* Center content overlaid so the label stays crisp regardless of gauge internals. */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        {children}
      </div>
    </div>
  );
}
