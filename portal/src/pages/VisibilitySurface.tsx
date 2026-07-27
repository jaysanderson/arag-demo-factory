import { useMemo, useState } from 'react';
import { Play, ShieldCheck, Scale, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@progress/kendo-react-buttons';
import { Card, CardBody } from '@progress/kendo-react-layout';
import { Chart, ChartSeries, ChartSeriesItem, ChartSeriesLabels, ChartLegend } from '@progress/kendo-react-charts';
import type { SurfaceProps } from './types';
import { ask, type Citation } from '../lib/arag';
import { PageHeader } from '../components/PageHeader';
import { chartPalette } from '../lib/chartTheme';
import { ErrorBanner } from '../components/States';

// Coverage & Governance. A live readiness probe over the SAME grounded /ask path
// the rest of the portal uses. Two questions decide whether a Knowledge Box can
// be trusted: does it ANSWER what it should (grounded + cited), and does it
// DECLINE what it must (refuse rather than invent)? This sweep runs both sets of
// probes live and scores each — coverage and governance, the numbers an exec
// governs against. Works for any KB, whatever the domain.

const REFUSAL_MARKERS = [
  'not enough data', 'does not contain', 'no information', 'not provided', 'cannot answer',
  "don't have", 'does not provide', 'not covered', 'no supporting', 'unable to', 'no relevant',
  'does not', 'cannot', 'no data',
];

type Kind = 'answerable' | 'refusal';
type ProbeState = 'idle' | 'running' | 'pass' | 'fail';

interface Probe {
  q: string;
  kind: Kind;
  state: ProbeState;
  sources?: number;
  declined?: boolean;
}

function askOnce(query: string): Promise<{ answer: string; citations: Citation[] }> {
  return new Promise((resolve, reject) => {
    let answer = '';
    let cites: Citation[] = [];
    ask(
      { query },
      {
        onToken: (t) => {
          answer += t;
        },
        onCitations: (c) => {
          cites = c;
        },
        onError: reject,
        onDone: () => resolve({ answer, citations: cites }),
      }
    );
  });
}

function getProbes(config: SurfaceProps['config']): Probe[] {
  const p = (config as unknown as { probes?: { answerable?: string[]; refusal?: string[] } }).probes;
  const answerable = p?.answerable?.length
    ? p.answerable
    : (config.demoScript || [])
        .map((s) => (s.show || '').match(/[‘'"“]([^’'"”]{6,})[’'"”]/)?.[1])
        .filter((x): x is string => !!x);
  const refusal = p?.refusal || [];
  return [
    ...answerable.map((q): Probe => ({ q, kind: 'answerable', state: 'idle' })),
    ...refusal.map((q): Probe => ({ q, kind: 'refusal', state: 'idle' })),
  ];
}

export function VisibilitySurface({ surface, config }: SurfaceProps) {
  const initial = useMemo(() => getProbes(config), [config]);
  const [probes, setProbes] = useState<Probe[]>(initial);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const answerable = probes.filter((p) => p.kind === 'answerable');
  const refusal = probes.filter((p) => p.kind === 'refusal');
  const covPass = answerable.filter((p) => p.state === 'pass').length;
  const covScored = answerable.filter((p) => p.state === 'pass' || p.state === 'fail').length;
  const govPass = refusal.filter((p) => p.state === 'pass').length;
  const govScored = refusal.filter((p) => p.state === 'pass' || p.state === 'fail').length;

  const runSweep = async () => {
    if (!probes.length || running) return;
    setRunning(true);
    setError(null);
    setProgress(0);
    setProbes((prev) => prev.map((p) => ({ ...p, state: 'idle', sources: undefined, declined: undefined })));

    for (let i = 0; i < probes.length; i++) {
      setProbes((prev) => prev.map((p, idx) => (idx === i ? { ...p, state: 'running' } : p)));
      try {
        const { answer, citations } = await askOnce(probes[i].q);
        const sources = citations.length;
        const grounded = sources > 0;
        const declinedText = REFUSAL_MARKERS.some((m) => answer.toLowerCase().includes(m));
        const declined = !grounded || declinedText;
        const pass = probes[i].kind === 'answerable' ? grounded : declined;
        setProbes((prev) =>
          prev.map((p, idx) => (idx === i ? { ...p, state: pass ? 'pass' : 'fail', sources, declined } : p))
        );
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Sweep failed');
        setProbes((prev) => prev.map((p, idx) => (idx === i ? { ...p, state: 'fail' } : p)));
      }
      setProgress(i + 1);
    }
    setRunning(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={surface.icon}
        title="Coverage & Governance"
        actions={
          <Button
            themeColor="primary"
            onClick={runSweep}
            disabled={running || !probes.length}
            startIcon={<Play size={15} />}
          >
            {running ? `Running ${progress}/${probes.length}…` : 'Run coverage sweep'}
          </Button>
        }
      >
        How answerable and how governed your Knowledge Box is. This sweep runs live probes through the grounded
        answer path — the ones it should answer (expect citations) and the ones it must refuse (expect a decline).
      </PageHeader>

      {error && <ErrorBanner>{error}</ErrorBanner>}

      {/* Scorecards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Scorecard
          icon={<ShieldCheck size={16} />}
          title="Grounded coverage"
          caption={
            covScored ? `${covPass}/${answerable.length} answered with citations` : 'Answerable probes, cited'
          }
          pass={covPass}
          total={answerable.length}
          scored={covScored}
        />
        <Scorecard
          icon={<Scale size={16} />}
          title="Governance"
          caption={
            govScored
              ? `${govPass}/${refusal.length} refusals correctly declined`
              : refusal.length
                ? 'Restricted probes, correctly declined'
                : 'No refusal probes configured'
          }
          pass={govPass}
          total={refusal.length}
          scored={govScored}
        />
      </div>

      {/* Answerable coverage */}
      <ProbeSection
        label="Answerable — expect grounded, cited answers"
        probes={answerable}
      />

      {/* Governance / refusals */}
      {refusal.length > 0 && (
        <ProbeSection label="Restricted — expect a correct decline" probes={refusal} />
      )}
    </div>
  );
}

/* ── Scorecard ──────────────────────────────────────────────────────────────── */

function Scorecard({
  icon,
  title,
  caption,
  pass,
  total,
  scored,
}: {
  icon: React.ReactNode;
  title: string;
  caption: string;
  pass: number;
  total: number;
  scored: number;
}) {
  const pct = scored ? Math.round((pass / scored) * 100) : null;
  return (
    <Card>
      <CardBody className="flex items-center gap-5 p-5">
        <Donut pass={pass} fail={scored - pass} pct={pct} />
        <div className="min-w-0">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink-500">
            <span style={{ color: 'var(--brand)' }}>{icon}</span>
            {title}
          </p>
          <p className="mt-1 font-display text-2xl font-bold text-ink-900 dark:text-ink-50">
            {scored ? `${pass}/${total}` : '—'}
          </p>
          <p className="mt-0.5 text-sm text-ink-500">{caption}</p>
        </div>
      </CardBody>
    </Card>
  );
}

// Pass rate as a KendoReact donut — the vendor control, themed to brand/accent
// and animated in, with a soft brand glow around it (CSS only).
function Donut({ pass, fail, pct }: { pass: number; fail: number; pct: number | null }) {
  const { brand, accent, track } = chartPalette();
  const data =
    pct == null
      ? [{ category: 'Not run', value: 1, color: track }]
      : [
          { category: 'Pass', value: pass, color: brand },
          { category: 'Fail', value: fail, color: accent },
        ];
  return (
    <div className="relative h-24 w-24 shrink-0">
      {pct != null && (
        <div
          className="pointer-events-none absolute inset-2 rounded-full blur-xl"
          style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--brand) 40%, transparent), transparent 70%)' }}
          aria-hidden
        />
      )}
      <Chart style={{ height: 96, width: 96 }} className="relative" transitions>
        <ChartLegend visible={false} />
        <ChartSeries>
          <ChartSeriesItem
            type="donut"
            data={data}
            field="value"
            categoryField="category"
            colorField="color"
            holeSize={40}
            startAngle={90}
          >
            <ChartSeriesLabels visible={false} />
          </ChartSeriesItem>
        </ChartSeries>
      </Chart>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="font-display text-lg font-bold text-ink-900 dark:text-ink-50">
          {pct == null ? '—' : `${pct}%`}
        </span>
      </div>
    </div>
  );
}

/* ── Probe rows ─────────────────────────────────────────────────────────────── */

function ProbeSection({ label, probes }: { label: string; probes: Probe[] }) {
  return (
    <section>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-500">{label}</p>
      <div className="space-y-2.5">
        {probes.map((p, i) => (
          <ProbeRow key={`${p.kind}-${i}`} probe={p} />
        ))}
      </div>
    </section>
  );
}

function ProbeRow({ probe }: { probe: Probe }) {
  return (
    <Card>
      <CardBody className="flex items-center gap-4 p-4">
        <p className="min-w-0 flex-1 text-sm font-medium text-ink-900 dark:text-ink-100">{probe.q}</p>
        <Verdict probe={probe} />
      </CardBody>
    </Card>
  );
}

function Verdict({ probe }: { probe: Probe }) {
  if (probe.state === 'running')
    return (
      <span className="inline-flex shrink-0 items-center gap-2 text-xs font-medium text-ink-500">
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-ink-300 border-t-transparent" />
        Asking…
      </span>
    );
  if (probe.state === 'idle')
    return <span className="shrink-0 text-xs text-ink-400">Not yet run</span>;

  // Passed
  if (probe.state === 'pass') {
    if (probe.kind === 'answerable')
      return (
        <Pill tone="green" icon={<CheckCircle2 size={14} />}>
          Grounded · {probe.sources} source{probe.sources === 1 ? '' : 's'}
        </Pill>
      );
    return (
      <Pill tone="amber" icon={<CheckCircle2 size={14} />}>
        Correctly declined
      </Pill>
    );
  }

  // Failed
  return (
    <Pill tone="red" icon={<XCircle size={14} />}>
      {probe.kind === 'answerable' ? 'Failed — no citations' : 'Failed — answered a restricted query'}
    </Pill>
  );
}

function Pill({
  tone,
  icon,
  children,
}: {
  tone: 'green' | 'amber' | 'red';
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const styles: Record<string, string> = {
    green:
      'border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-800/70 dark:bg-emerald-950/40 dark:text-emerald-300',
    amber:
      'border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-800/70 dark:bg-amber-950/40 dark:text-amber-300',
    red: 'border-red-300 bg-red-50 text-red-700 dark:border-red-800/70 dark:bg-red-950/40 dark:text-red-300',
  };
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${styles[tone]}`}
    >
      {icon}
      {children}
    </span>
  );
}
