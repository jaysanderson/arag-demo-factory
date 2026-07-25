import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play, ShieldCheck, Database, Layers, Radio, Sparkles } from 'lucide-react';
import type { DemoConfig, Surface } from '../lib/config';
import { getHealth, catalog } from '../lib/arag';
import { groupSurfaces } from '../lib/nav';
import { surfaceIcon } from '../lib/icons';

/**
 * The command center — the front door of the product. A cinematic hero, a live
 * status strip pulled from /api/health + /api/catalog, the capabilities as a
 * bento grid grouped by capability area, and the demo flow. Entirely driven by
 * demo.config.json, so it reads premium for any vertical or theme.
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
  // The tagline is the punchy headline; the fuller elevator pitch is the
  // supporting sub-copy. (Using the whole pitch as a display headline buries
  // everything below the fold.)
  const headline = config.tagline || config.elevatorPitch || config.title;
  const subcopy = config.tagline ? config.elevatorPitch : config.persona;
  const eyebrow = config.vertical || config.persona || 'Agentic RAG';

  return (
    <div className="space-y-14 pb-4">
      <Hero
        config={config}
        eyebrow={eyebrow}
        headline={headline}
        subcopy={subcopy || undefined}
        hasTour={hasTour}
        onStartTour={onStartTour}
        onAsk={() => navigate(askRoute)}
      />

      {/* Capabilities — grouped bento */}
      <section className="space-y-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">The platform</p>
            <h2 className="mt-2 font-display text-display text-ink-900 dark:text-ink-50">
              One solution, {groups.length} capability areas
            </h2>
          </div>
          <p className="hidden max-w-sm text-sm text-ink-500 sm:block">
            Every surface runs on the same grounded Knowledge Box behind one API — not a row of
            disconnected tools.
          </p>
        </div>

        {groups.map((g) => (
          <GroupBento key={g.group} group={g.group} intro={g.intro} items={g.surfaces} onOpen={navigate} />
        ))}
      </section>

      {hasTour && <DemoFlow config={config} surfaces={surfaces} onStartTour={onStartTour} />}
    </div>
  );
}

/* ── Hero ──────────────────────────────────────────────────────────────────── */

function Hero({
  config,
  eyebrow,
  headline,
  subcopy,
  hasTour,
  onStartTour,
  onAsk,
}: {
  config: DemoConfig;
  eyebrow: string;
  headline: string;
  subcopy?: string;
  hasTour: boolean;
  onStartTour: () => void;
  onAsk: () => void;
}) {
  return (
    <section className="card-elevated relative overflow-hidden rounded-3xl px-6 py-14 sm:px-12 sm:py-20">
      {/* Ambient light + technical grid */}
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div
        className="hero-orb -left-24 -top-28 h-[26rem] w-[26rem] animate-drift"
        style={{ background: 'var(--brand)' }}
        aria-hidden
      />
      <div
        className="hero-orb -right-20 -top-16 h-[22rem] w-[22rem] animate-drift"
        style={{ background: 'var(--accent)', animationDelay: '-6s' }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <div className="flex items-center justify-center gap-2 animate-fade-up">
          <span className="chip !border-transparent" style={{ background: 'var(--brand-soft)', color: 'var(--brand-strong)' }}>
            <Sparkles size={12} />
            {config.theme.brandName}
          </span>
          <span className="text-eyebrow uppercase tracking-[0.18em] text-ink-500">{eyebrow}</span>
        </div>

        <h1
          className="mx-auto mt-6 max-w-3xl font-display text-display-lg text-ink-900 dark:text-ink-50 animate-fade-up"
          style={{ animationDelay: '60ms', textWrap: 'balance' } as CSSProperties}
        >
          {headline}
        </h1>

        {subcopy && (
          <p
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-500 sm:text-lg animate-fade-up"
            style={{ animationDelay: '120ms' }}
          >
            {subcopy}
          </p>
        )}

        <div
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row animate-fade-up"
          style={{ animationDelay: '180ms' }}
        >
          {hasTour && (
            <button onClick={onStartTour} className="btn btn-brand shadow-glow-lg">
              <Play size={16} />
              Start the guided demo
            </button>
          )}
          <button onClick={onAsk} className="btn btn-ghost">
            Ask a question
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div className="relative mt-12">
        <StatusStrip />
      </div>
    </section>
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
      } catch {
        /* keep whatever health gave us; never fabricate numbers */
      }
      if (alive) setStats({ loading: false, connected: health.ok, documents, categories });
    })();
    return () => {
      alive = false;
    };
  }, []);

  return stats;
}

function StatusStrip() {
  const { loading, connected, documents, categories } = useStats();
  const fmt = (n: number | null) => (n == null ? '—' : n.toLocaleString());

  return (
    <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
      <Stat
        icon={<Radio size={15} />}
        label="Knowledge Box"
        value={loading ? '…' : connected ? 'Connected' : 'Offline'}
        tone={connected ? 'live' : 'muted'}
        live
      />
      <Stat icon={<Database size={15} />} label="Documents" value={loading ? '…' : fmt(documents)} />
      <Stat icon={<Layers size={15} />} label="Content facets" value={loading ? '…' : fmt(categories)} />
      <Stat icon={<ShieldCheck size={15} />} label="Answers" value="100% cited" tone="brand" />
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  tone,
  live,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  tone?: 'brand' | 'live' | 'muted';
  live?: boolean;
}) {
  const valueColor =
    tone === 'brand' ? 'var(--brand)' : tone === 'live' ? '#16a34a' : tone === 'muted' ? undefined : undefined;
  return (
    <div className="card flex items-center gap-3 rounded-xl px-3.5 py-3 text-left">
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
        style={{ background: 'var(--brand-soft)', color: 'var(--brand)' }}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          {live && (
            <span
              className="h-1.5 w-1.5 rounded-full animate-pulse-glow"
              style={{ background: tone === 'live' ? '#16a34a' : '#dc2626' }}
            />
          )}
          <span className="truncate text-sm font-semibold text-ink-900 dark:text-ink-50" style={{ color: valueColor }}>
            {value}
          </span>
        </div>
        <span className="block text-[11px] uppercase tracking-wide text-ink-400">{label}</span>
      </div>
    </div>
  );
}

/* ── Capabilities bento ─────────────────────────────────────────────────────── */

function GroupBento({
  group,
  intro,
  items,
  onOpen,
}: {
  group: string;
  intro?: string;
  items: Surface[];
  onOpen: (route: string) => void;
}) {
  return (
    <div>
      <div className="mb-5 flex items-baseline gap-3">
        <h3 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-50">{group}</h3>
        <span className="h-px flex-1" style={{ background: 'var(--hairline)' }} />
        {intro && <p className="hidden max-w-md text-sm text-ink-500 md:block">{intro}</p>}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {items.map((s, idx) => (
          <CapabilityCard
            key={s.route}
            surface={s}
            // A little bento rhythm: the first card of a multi-item area is wide.
            wide={items.length > 1 && idx === 0}
            full={items.length === 1}
            onOpen={onOpen}
          />
        ))}
      </div>
    </div>
  );
}

function CapabilityCard({
  surface,
  wide,
  full,
  onOpen,
}: {
  surface: Surface;
  wide?: boolean;
  full?: boolean;
  onOpen: (route: string) => void;
}) {
  const Icon = surfaceIcon(surface.icon);
  const span = full ? 'md:col-span-3' : wide ? 'md:col-span-2' : '';
  return (
    <button
      onClick={() => onOpen(surface.route)}
      className={`card card-hover group relative flex flex-col overflow-hidden rounded-2xl p-5 text-left ${span}`}
    >
      <div className="flex items-center justify-between">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform group-hover:scale-105"
          style={{ background: 'var(--brand-soft)', color: 'var(--brand)' }}
        >
          <Icon size={20} />
        </span>
        <ArrowRight
          size={18}
          className="text-ink-300 transition-all group-hover:translate-x-0.5 group-hover:text-[color:var(--brand)]"
        />
      </div>

      <h4 className="mt-4 font-display text-lg font-semibold text-ink-900 dark:text-ink-50">{surface.label}</h4>
      {surface.sells ? (
        <p className={`mt-1.5 text-sm leading-snug text-ink-500 ${wide || full ? 'max-w-xl' : ''}`}>{surface.sells}</p>
      ) : (
        surface.tagline && <p className="mt-1.5 text-sm leading-snug text-ink-500">{surface.tagline}</p>
      )}

      {/* Hairline that lights up in the brand colour on hover. */}
      <span
        className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
        style={{ background: 'linear-gradient(90deg, var(--brand), var(--accent))' }}
      />
    </button>
  );
}

/* ── Demo flow ──────────────────────────────────────────────────────────────── */

function DemoFlow({
  config,
  surfaces,
  onStartTour,
}: {
  config: DemoConfig;
  surfaces: Surface[];
  onStartTour: () => void;
}) {
  const beats = config.demoScript || [];
  return (
    <section className="card-elevated relative overflow-hidden rounded-3xl p-6 sm:p-10">
      <div className="hero-orb -right-16 top-0 h-64 w-64" style={{ background: 'var(--accent)' }} aria-hidden />
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="eyebrow">How the demo flows</p>
          <h2 className="mt-2 max-w-xl font-display text-display text-ink-900 dark:text-ink-50">
            A guided story in {beats.length} beats
          </h2>
        </div>
        <button onClick={onStartTour} className="btn btn-brand shrink-0 shadow-glow-lg">
          <Play size={16} />
          Play the guided demo
        </button>
      </div>

      <ol className="relative mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {beats.map((b) => {
          const surface = surfaces.find(
            (s) => (b.show || '').toLowerCase().startsWith(s.label.toLowerCase())
          );
          return (
            <li key={b.step} className="card rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold"
                  style={{ background: 'var(--brand)', color: 'var(--brand-contrast)' }}
                >
                  {b.step}
                </span>
                {surface && (
                  <span className="text-eyebrow uppercase tracking-wide text-ink-400">{surface.label}</span>
                )}
              </div>
              <p className="mt-3 text-sm leading-snug text-ink-700 dark:text-ink-200">{b.say}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
