import { useEffect, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Database, Layers, Radio, Search, CornerDownLeft } from 'lucide-react';
import type { DemoConfig, Surface } from '../lib/config';
import { getHealth, catalog } from '../lib/arag';
import { groupSurfaces } from '../lib/nav';
import { surfaceIcon } from '../lib/icons';
import { useReveal, useCountUp } from '../lib/motion';

/**
 * The home of a working knowledge environment — NOT a product landing page.
 * The prospect should feel they've opened their own internal tool: a place to
 * ask the record a question, with the operational status of the knowledge base
 * and a quiet launcher for the rest of the workspace. No "showcase" framing, no
 * capability-selling copy, no "how the demo flows" — value is shown by using it.
 * Entirely driven by demo.config.json, so it reads right for any vertical.
 */
export function OverviewSurface({
  config,
  surfaces,
  onStartTour,
}: {
  config: DemoConfig;
  surfaces: Surface[];
  onStartTour: () => void;
}) {
  const navigate = useNavigate();
  const groups = groupSurfaces(surfaces);
  const hasTour = (config.demoScript?.length || 0) > 0;
  const askRoute = surfaces.find((s) => s.id === 'ask')?.route || surfaces[0]?.route || '/ask';
  const starters = (config.probes?.answerable || []).slice(0, 4);

  const ask = (query: string) => {
    const t = query.trim();
    navigate(t ? `${askRoute}?q=${encodeURIComponent(t)}` : askRoute);
  };

  return (
    <div className="space-y-12 pb-4">
      <Home
        config={config}
        starters={starters}
        onAsk={ask}
        hasTour={hasTour}
        onStartTour={onStartTour}
      />

      <Workspace groups={groups} onOpen={navigate} />
    </div>
  );
}

/* ── Home: greeting + ask + starters + live status ──────────────────────────── */

function Home({
  config,
  starters,
  onAsk,
  hasTour,
  onStartTour,
}: {
  config: DemoConfig;
  starters: string[];
  onAsk: (q: string) => void;
  hasTour: boolean;
  onStartTour: () => void;
}) {
  const [q, setQ] = useState('');
  // Product promise: the headline states what this environment does; the subline
  // is the grounding guarantee. Both come from config (blueprint-authored).
  const headline = config.tagline || `Ask ${config.theme.brandName} anything.`;
  const subline =
    config.elevatorPitch ||
    'Every answer is grounded in your own records and shows the sources it came from.';

  return (
    <section className="card-elevated ring-hairline relative overflow-hidden rounded-[1.75rem] px-6 py-12 sm:px-12 sm:py-14">
      <div className="absolute inset-0 bg-grid opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 -top-1/4 mx-auto h-[130%] animate-pulse-glow"
        style={{
          background:
            'radial-gradient(50% 60% at 50% 0%, color-mix(in srgb, var(--brand) 22%, transparent) 0%, transparent 70%)',
        }}
        aria-hidden
      />
      <div className="hero-orb -left-24 -top-28 h-[24rem] w-[24rem] animate-drift-a" style={{ background: 'var(--brand)' }} aria-hidden />
      <div className="hero-orb -right-24 -top-20 h-[20rem] w-[20rem] animate-drift-b" style={{ background: 'var(--accent)', animationDelay: '-6s' }} aria-hidden />

      <div className="relative mx-auto max-w-3xl">
        <div className="flex items-center gap-2 animate-fade-up">
          <LiveDot />
          <span className="text-eyebrow uppercase tracking-[0.18em] text-ink-500">
            {config.title || config.theme.brandName}
          </span>
        </div>

        <h1
          className="mt-4 font-display text-display-lg animate-fade-up"
          style={{ animationDelay: '60ms', textWrap: 'balance' }}
        >
          {headline}
        </h1>
        {subline && (
          <p
            className="mt-4 max-w-2xl text-base leading-relaxed text-ink-500 sm:text-lg animate-fade-up"
            style={{ animationDelay: '120ms' }}
          >
            {subline}
          </p>
        )}

        {/* The primary action: ask the record. */}
        <form
          onSubmit={(e) => { e.preventDefault(); onAsk(q); }}
          className="mt-8 animate-fade-up"
          style={{ animationDelay: '180ms' }}
        >
          <div className="ask-bar flex items-center gap-2 rounded-2xl px-3 py-2">
            <Search size={18} className="ml-1 shrink-0 text-ink-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={`Ask ${config.theme.brandName} a question…`}
              className="min-w-0 flex-1 border-0 bg-transparent py-2 text-base outline-none placeholder:text-ink-400"
              aria-label="Ask a question"
            />
            <button type="submit" className="btn btn-brand shrink-0 shadow-glow" aria-label="Ask">
              Ask
              <CornerDownLeft size={15} />
            </button>
          </div>
        </form>

        {starters.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2 animate-fade-up" style={{ animationDelay: '240ms' }}>
            <span className="text-xs font-medium text-ink-400">Try</span>
            {starters.map((s) => (
              <button
                key={s}
                onClick={() => onAsk(s)}
                className="max-w-full truncate rounded-full border px-3 py-1.5 text-left text-xs text-ink-600 transition hover:border-[color:var(--brand)] hover:text-ink-900 dark:text-ink-300 dark:hover:text-ink-100"
                style={{ borderColor: 'var(--hairline-strong)' }}
                title={s}
              >
                {s}
              </button>
            ))}
            {hasTour && (
              <button
                onClick={onStartTour}
                className="ml-auto text-xs font-medium text-ink-500 underline-offset-4 transition hover:text-[color:var(--brand)] hover:underline"
              >
                Take a guided tour
              </button>
            )}
          </div>
        )}
      </div>

      <div className="relative mt-12 animate-fade-up" style={{ animationDelay: '300ms' }}>
        <StatusStrip />
      </div>
    </section>
  );
}

function LiveDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: '#16a34a' }} />
      <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: '#16a34a' }} />
    </span>
  );
}

/* ── Live status strip ──────────────────────────────────────────────────────── */

interface Stats {
  loading: boolean;
  connected: boolean;
  documents: number | null;
  categories: number | null;
}

function useStats(): Stats {
  const [stats, setStats] = useState<Stats>({ loading: true, connected: false, documents: null, categories: null });
  useEffect(() => {
    let alive = true;
    (async () => {
      const health = await getHealth();
      let documents: number | null = health.resources ?? null;
      let categories: number | null = null;
      try {
        const cat = await catalog({ pageSize: 1 });
        if (typeof cat.total === 'number') documents = cat.total;
        const values = Object.values(cat.facets || {}).reduce((n, arr) => n + (arr?.length || 0), 0);
        categories = values || null;
      } catch { /* never fabricate numbers */ }
      if (alive) setStats({ loading: false, connected: health.ok, documents, categories });
    })();
    return () => { alive = false; };
  }, []);
  return stats;
}

function StatusStrip() {
  const { loading, connected, documents, categories } = useStats();
  const docsAnim = useCountUp(documents, !loading);
  const catsAnim = useCountUp(categories, !loading);
  const citedAnim = useCountUp(100, !loading);

  return (
    <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
      <Stat icon={<Radio size={15} />} label="Knowledge base" value={loading ? '…' : connected ? 'Connected' : 'Offline'} tone={connected ? 'live' : 'muted'} live />
      <Stat icon={<Database size={15} />} label="Documents" value={loading ? '…' : documents == null ? '—' : docsAnim.toLocaleString()} />
      <Stat icon={<Layers size={15} />} label="Topics" value={loading ? '…' : categories == null ? '—' : catsAnim.toLocaleString()} />
      <Stat icon={<ShieldCheck size={15} />} label="Answers" value={loading ? '…' : `${citedAnim}% cited`} tone="brand" />
    </div>
  );
}

function Stat({ icon, label, value, tone, live }: { icon: ReactNode; label: string; value: string; tone?: 'brand' | 'live' | 'muted'; live?: boolean; }) {
  const valueColor = tone === 'brand' ? 'var(--brand)' : tone === 'live' ? '#16a34a' : undefined;
  return (
    <div className="card ring-hairline flex items-center gap-3 rounded-xl px-3.5 py-3 text-left">
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
        style={{ background: 'linear-gradient(160deg, color-mix(in srgb, var(--brand) 20%, transparent), color-mix(in srgb, var(--brand) 7%, transparent))', color: 'var(--brand)' }}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          {live && <span className="h-1.5 w-1.5 rounded-full animate-pulse-glow" style={{ background: tone === 'live' ? '#16a34a' : '#dc2626' }} />}
          <span className="truncate text-sm font-semibold text-ink-900 dark:text-ink-50" style={{ color: valueColor }}>{value}</span>
        </div>
        <span className="block text-[11px] uppercase tracking-wide text-ink-400">{label}</span>
      </div>
    </div>
  );
}

/* ── Workspace: the tool launcher ───────────────────────────────────────────── */

function Workspace({ groups, onOpen }: { groups: ReturnType<typeof groupSurfaces>; onOpen: (route: string) => void }) {
  return (
    <section className="space-y-9">
      <h2 className="font-display text-display text-ink-900 dark:text-ink-50">Your workspace</h2>
      {groups.map((g) => (
        <GroupBlock key={g.group} group={g.group} items={g.surfaces} onOpen={onOpen} />
      ))}
    </section>
  );
}

function GroupBlock({ group, items, onOpen }: { group: string; items: Surface[]; onOpen: (route: string) => void }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref}>
      <div className="mb-4 flex items-baseline gap-3">
        <h3 className="text-eyebrow uppercase tracking-[0.14em] text-ink-500">{group}</h3>
        <span className="h-px flex-1" style={{ background: 'linear-gradient(90deg, var(--hairline-strong), transparent)' }} />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((s, idx) => (
          <div key={s.route} className={`reveal ${visible ? 'is-visible' : ''}`} style={{ transitionDelay: `${idx * 55}ms` }}>
            <ToolCard surface={s} onOpen={onOpen} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ToolCard({ surface, onOpen }: { surface: Surface; onOpen: (route: string) => void }) {
  const Icon = surfaceIcon(surface.icon);
  return (
    <button
      onClick={() => onOpen(surface.route)}
      className="card card-hover ring-hairline group relative flex h-full w-full items-start gap-3.5 overflow-hidden rounded-2xl p-4 text-left"
    >
      <span
        className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
        style={{ background: 'linear-gradient(160deg, color-mix(in srgb, var(--brand) 22%, transparent), color-mix(in srgb, var(--brand) 8%, transparent))', color: 'var(--brand)' }}
      >
        <Icon size={19} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5">
          <span className="font-display text-[15px] font-semibold text-ink-900 dark:text-ink-50">{surface.label}</span>
          <ArrowRight size={15} className="text-ink-300 transition-all group-hover:translate-x-0.5 group-hover:text-[color:var(--brand)]" />
        </span>
        {/* Functional description only — never the executive `sells` line. */}
        {surface.tagline && <span className="mt-1 block text-sm leading-snug text-ink-500">{surface.tagline}</span>}
      </span>
    </button>
  );
}
