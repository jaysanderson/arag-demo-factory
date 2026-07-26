import { useId } from 'react';

/**
 * The brand emblem. A small constellation / knowledge-graph — nodes joined by
 * faint edges with one glowing hub. It reads two ways at once: stars for a
 * mission demo, and a connected knowledge graph for the Agentic RAG platform
 * underneath. Painted in the demo's own brand→accent gradient, so every
 * blueprint gets a distinct-looking mark for free.
 */
export function BrandMark({ size = 38 }: { size?: number }) {
  const id = useId();
  const grad = `bm-grad-${id}`;
  const glow = `bm-glow-${id}`;

  // Constellation layout in a 40×40 field. hub is index 0.
  const nodes: [number, number, number][] = [
    [20, 20, 3.4], // hub
    [8.5, 10.5, 2],
    [31.5, 8, 2.3],
    [33, 28.5, 1.9],
    [11, 31.5, 2.1],
    [24.5, 32.5, 1.5],
  ];
  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [1, 2],
    [3, 5],
  ];

  return (
    <span
      className="relative flex items-center justify-center rounded-xl shadow-glow"
      style={{
        width: size,
        height: size,
        background:
          'radial-gradient(circle at 32% 26%, color-mix(in srgb, var(--brand) 26%, #0a0f1e), #0a0f1e 78%)',
        border: '1px solid color-mix(in srgb, var(--brand) 55%, transparent)',
      }}
      aria-hidden
    >
      <svg viewBox="0 0 40 40" width={size * 0.74} height={size * 0.74} fill="none">
        <defs>
          <linearGradient id={grad} x1="4" y1="6" x2="36" y2="34" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="var(--brand)" />
            <stop offset="1" stopColor="var(--accent)" />
          </linearGradient>
          <filter id={glow} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
            stroke={`url(#${grad})`}
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.7"
          />
        ))}

        {nodes.map(([cx, cy, r], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill={`url(#${grad})`}
            filter={i === 0 ? `url(#${glow})` : undefined}
          />
        ))}
      </svg>
    </span>
  );
}
