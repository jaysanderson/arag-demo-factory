import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { Card } from '@progress/kendo-react-layout';
import { AutoComplete } from '@progress/kendo-react-dropdowns';
import type { SurfaceProps } from './types';
import { graph, entities, type GraphNode, type GraphEdge } from '../lib/arag';
import { PageHeader } from '../components/PageHeader';
import { ErrorBanner } from '../components/States';

const WIDTH = 900;
const HEIGHT = 560;

// Stable colour per entity group, so the legend means something. Graph colours
// are intentionally categorical (not theme-driven) — a knowledge graph needs
// distinguishable groups more than it needs brand paint.
const GROUP_COLOURS: Record<string, string> = {
  PERSON: '#2f7d5e', ORG: '#0b5c8a', GPE: '#c8861a', LOC: '#a33417',
  PRODUCT: '#7c5c8a', FAC: '#00838f', NORP: '#6d4c41', EVENT: '#c2185b', LAW: '#455a64',
};
const GROUP_LABELS: Record<string, string> = {
  PERSON: 'People', ORG: 'Organisations', GPE: 'Regions & places', LOC: 'Locations',
  PRODUCT: 'Products & varieties', FAC: 'Facilities', NORP: 'Groups', EVENT: 'Events', LAW: 'Standards',
};
const colourFor = (group: string) => GROUP_COLOURS[group] || '#78909c';

interface PositionedNode extends GraphNode { x: number; y: number; vx: number; vy: number }
interface PositionedLink { source: PositionedNode; target: PositionedNode; label: string }

/**
 * Force-directed layout ported from the shipped portal (rp-grdc GraphView):
 * repulsion between all nodes, springs along edges, a weak pull to centre.
 * Runs a fixed number of ticks up front rather than animating — these graphs
 * are small and a settled layout reads better than a wobbling one.
 */
function layout(nodes: GraphNode[], edges: GraphEdge[]): { nodes: PositionedNode[]; links: PositionedLink[] } {
  const positioned: PositionedNode[] = nodes.map((node, i) => {
    const angle = (i / Math.max(nodes.length, 1)) * Math.PI * 2;
    const radius = 90 + (i % 7) * 26;
    return { ...node, x: WIDTH / 2 + Math.cos(angle) * radius, y: HEIGHT / 2 + Math.sin(angle) * radius, vx: 0, vy: 0 };
  });

  const byId = new Map(positioned.map((n) => [n.id, n]));
  const links: PositionedLink[] = edges
    .map((e) => ({ source: byId.get(e.from)!, target: byId.get(e.to)!, label: e.label }))
    .filter((l) => l.source && l.target);

  for (let tick = 0; tick < 340; tick++) {
    const cooling = 1 - tick / 340;
    for (let i = 0; i < positioned.length; i++) {
      for (let j = i + 1; j < positioned.length; j++) {
        const a = positioned[i], b = positioned[j];
        let dx = b.x - a.x, dy = b.y - a.y, distance = Math.hypot(dx, dy);
        if (distance < 1) { dx = (i % 3) - 1 || 0.7; dy = (j % 3) - 1 || 0.7; distance = Math.hypot(dx, dy); }
        const force = 3000 / (distance * distance);
        const fx = (dx / distance) * force, fy = (dy / distance) * force;
        a.vx -= fx; a.vy -= fy; b.vx += fx; b.vy += fy;
      }
    }
    for (const link of links) {
      const dx = link.target.x - link.source.x, dy = link.target.y - link.source.y;
      const distance = Math.hypot(dx, dy) || 0.01;
      const force = (distance - 130) * 0.015;
      const fx = (dx / distance) * force, fy = (dy / distance) * force;
      link.source.vx += fx; link.source.vy += fy;
      link.target.vx -= fx; link.target.vy -= fy;
    }
    for (const node of positioned) {
      node.vx += (WIDTH / 2 - node.x) * 0.004;
      node.vy += (HEIGHT / 2 - node.y) * 0.004;
      node.x += node.vx * cooling * 0.55;
      node.y += node.vy * cooling * 0.55;
      node.vx *= 0.82; node.vy *= 0.82;
      node.x = Math.max(52, Math.min(WIDTH - 52, node.x));
      node.y = Math.max(30, Math.min(HEIGHT - 30, node.y));
    }
  }
  return { nodes: positioned, links };
}

export function GraphSurface({ surface }: SurfaceProps) {
  const [seed, setSeed] = useState('');
  const [pending, setPending] = useState('');
  const [result, setResult] = useState<{ nodes: GraphNode[]; edges: GraphEdge[] }>({ nodes: [], edges: [] });
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const version = useRef(0);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const run = ++version.current;
    try {
      const data = await graph({ entity: seed, topK: seed ? 120 : 260 });
      if (run === version.current) setResult(data);
    } catch (e: any) {
      if (run === version.current) setError(e.message);
    } finally {
      if (run === version.current) setLoading(false);
    }
  }, [seed]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    entities()
      .then((d) => {
        const wanted = ['PERSON', 'ORG', 'GPE', 'PRODUCT'];
        setSuggestions(
          (d.groups || []).filter((g) => wanted.includes(g.id)).flatMap((g) => g.entities.slice(0, 40))
        );
      })
      .catch(() => {});
  }, []);

  const { nodes, links } = useMemo(() => layout(result.nodes.slice(0, 55), result.edges), [result]);
  const groups = [...new Set(nodes.map((n) => n.group))];

  const explore = (value: string) => { setPending(value); setSeed(value); };
  const connected = hover
    ? new Set(links.filter((l) => l.source.id === hover || l.target.id === hover).flatMap((l) => [l.source.id, l.target.id]))
    : null;

  return (
    <div>
      <PageHeader icon={surface.icon} title="Knowledge Graph">
        Entities and relationships Progress Agentic RAG extracted from the corpus during processing — and how they
        connect. Leave the box empty for the densest part of the graph, or name an entity to explore its neighbourhood.
      </PageHeader>

      <Card className="mb-4">
        <form
          onSubmit={(e) => { e.preventDefault(); setSeed(pending); }}
          className="flex items-center gap-2 p-2"
        >
          <AutoComplete
            value={pending}
            data={suggestions}
            onChange={(e) => setPending(String(e.value))}
            placeholder="Entity name — e.g. an organisation, person, place or product"
            fillMode="flat"
            className="flex-1"
          />
          <Button type="submit" themeColor="primary">Explore</Button>
          {seed && <Button type="button" fillMode="outline" onClick={() => explore('')}>Whole graph</Button>}
        </form>
      </Card>

      {error && <ErrorBanner>{error}</ErrorBanner>}

      {loading ? (
        <Card><div className="px-6 py-14 text-center text-sm text-ink-400">Building graph…</div></Card>
      ) : nodes.length === 0 ? (
        <Card><div className="px-6 py-14 text-center text-sm text-ink-500">
          No relations found{seed ? ` for “${seed}”` : ''}. Try a suggested entity, or explore the whole graph.
        </div></Card>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-[420px] w-full min-w-[560px] sm:h-[560px] sm:min-w-[680px]">
              {links.map((link, i) => {
                const hot = hover && (link.source.id === hover || link.target.id === hover);
                return (
                  <line
                    key={i}
                    x1={link.source.x} y1={link.source.y} x2={link.target.x} y2={link.target.y}
                    stroke={hot ? 'var(--brand)' : '#cbd5e1'}
                    strokeOpacity={hover ? (hot ? 0.9 : 0.12) : 0.45}
                    strokeWidth={hot ? 2 : 1}
                  />
                );
              })}
              {nodes.map((node) => {
                const radius = Math.min(6 + node.degree * 1.7, 18);
                const dimmed = connected && !connected.has(node.id);
                return (
                  <g
                    key={node.id}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setHover(node.id)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => explore(node.label)}
                  >
                    <circle cx={node.x} cy={node.y} r={radius} fill={colourFor(node.group)} opacity={dimmed ? 0.22 : 0.92} stroke="#fff" strokeWidth={1.5} />
                    <text
                      x={node.x} y={node.y - radius - 5} textAnchor="middle"
                      fontSize={11} fill="currentColor" className="text-ink-600 dark:text-ink-300"
                      opacity={dimmed ? 0.25 : 1} style={{ pointerEvents: 'none', paintOrder: 'stroke' }}
                    >
                      {node.label.length > 24 ? `${node.label.slice(0, 24)}…` : node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-ink-200 px-4 py-3 text-xs text-ink-500 dark:border-ink-800">
            {groups.map((group) => (
              <span key={group} className="inline-flex items-center gap-1.5">
                <i className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: colourFor(group) }} />
                {GROUP_LABELS[group] || group}
              </span>
            ))}
            <span className="ml-auto text-ink-400">
              {nodes.length} entities · {links.length} relations · click a node to explore it
            </span>
          </div>
        </Card>
      )}
    </div>
  );
}
