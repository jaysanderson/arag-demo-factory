import { useMemo, useState } from 'react';
import { Play, CheckCircle2, ShieldAlert, X } from 'lucide-react';
import { Button } from '@progress/kendo-react-buttons';
import { Input } from '@progress/kendo-react-inputs';
import { Card, CardBody } from '@progress/kendo-react-layout';
import { Grid, GridColumn, type GridCustomCellProps } from '@progress/kendo-react-grid';
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartSeriesLabels,
  ChartLegend,
} from '@progress/kendo-react-charts';
import type { SurfaceProps } from './types';
import { ask, type Citation } from '../lib/arag';
import { PageHeader } from '../components/PageHeader';
import { chartPalette } from '../lib/chartTheme';
import { ErrorBanner } from '../components/States';

// Groundedness dashboard (REMi surface). Every answer either cites documents or
// it does not — and an uncited answer is the thing to govern against. This runs a
// live sweep of probe questions through the SAME grounded /ask path the Ask
// surface uses, and scores each on whether the Knowledge Box returned citations.
// It is the citation-groundedness rate an exec can hold the system to.

interface Probe { q: string; state: 'idle' | 'running' | 'grounded' | 'ungrounded' | 'error'; sources?: number; note?: string }
type ProbeRow = Probe & { _i: number };

function askOnce(query: string): Promise<{ answer: string; citations: Citation[] }> {
  return new Promise((resolve, reject) => {
    let answer = '';
    ask(
      { query },
      {
        onToken: (t) => { answer += t; },
        onCitations: (c) => resolve({ answer, citations: c }),
        onError: reject,
        onDone: () => resolve({ answer, citations: [] }),
      }
    );
  });
}

function scriptProbes(config: SurfaceProps['config']): string[] {
  const out: string[] = [];
  for (const s of config.demoScript || []) {
    const m = (s.show || '').match(/[‘'"“]([^’'"”]{6,})[’'"”]/);
    if (m) out.push(m[1]);
  }
  return out;
}

export function RemiSurface({ surface, config }: SurfaceProps) {
  const initial = useMemo(() => scriptProbes(config), [config]);
  const [probes, setProbes] = useState<Probe[]>(initial.map((q) => ({ q, state: 'idle' })));
  const [draft, setDraft] = useState('');
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scored = probes.filter((p) => p.state === 'grounded' || p.state === 'ungrounded');
  const grounded = probes.filter((p) => p.state === 'grounded').length;
  const rate = scored.length ? Math.round((grounded / scored.length) * 100) : null;

  const runAll = async () => {
    if (!probes.length || running) return;
    setRunning(true);
    setError(null);
    for (let i = 0; i < probes.length; i++) {
      setProbes((prev) => prev.map((p, idx) => (idx === i ? { ...p, state: 'running' } : p)));
      try {
        const { citations } = await askOnce(probes[i].q);
        const n = citations.length;
        setProbes((prev) =>
          prev.map((p, idx) =>
            idx === i ? { ...p, state: n > 0 ? 'grounded' : 'ungrounded', sources: n } : p
          )
        );
      } catch (e: any) {
        setError(e.message);
        setProbes((prev) => prev.map((p, idx) => (idx === i ? { ...p, state: 'error', note: e.message } : p)));
      }
    }
    setRunning(false);
  };

  const addProbe = () => {
    const q = draft.trim();
    if (!q) return;
    setProbes((prev) => [...prev, { q, state: 'idle' }]);
    setDraft('');
  };
  const removeProbe = (i: number) => setProbes((prev) => prev.filter((_, idx) => idx !== i));

  const rows: ProbeRow[] = probes.map((p, i) => ({ ...p, _i: i }));

  // Custom Grid cells ------------------------------------------------------
  const StatusCell = (props: GridCustomCellProps) => {
    const p = props.dataItem as ProbeRow;
    return (
      <td>
        <span className="inline-flex items-center gap-2">
          <StateGlyph state={p.state} />
          <span className="text-sm">
            {p.state === 'grounded' && `Grounded · ${p.sources} source${p.sources === 1 ? '' : 's'}`}
            {p.state === 'ungrounded' && 'Ungrounded'}
            {p.state === 'running' && 'Asking…'}
            {p.state === 'idle' && 'Not yet run'}
            {p.state === 'error' && (p.note || 'Error')}
          </span>
        </span>
      </td>
    );
  };
  const ProbeCell = (props: GridCustomCellProps) => {
    const p = props.dataItem as ProbeRow;
    return <td><span className="text-sm font-medium text-ink-900 dark:text-ink-100">{p.q}</span></td>;
  };
  const RemoveCell = (props: GridCustomCellProps) => {
    const p = props.dataItem as ProbeRow;
    return (
      <td>
        <Button fillMode="flat" size="small" onClick={() => removeProbe(p._i)} aria-label="Remove probe">
          <X size={15} />
        </Button>
      </td>
    );
  };

  return (
    <div>
      <PageHeader
        icon={surface.icon}
        title="Groundedness"
        actions={
          <Button themeColor="primary" onClick={runAll} disabled={running || !probes.length} startIcon={<Play size={15} />}>
            {running ? 'Running sweep…' : 'Run groundedness sweep'}
          </Button>
        }
      >
        A live check that every answer stands on cited sources. Each probe runs through the grounded answer path;
        answers that cite documents pass, uncited answers are flagged. This is the number to govern against.
      </PageHeader>

      {error && <div className="mb-4"><ErrorBanner>{error}</ErrorBanner></div>}

      <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
        {/* Quality chart */}
        <Card>
          <CardBody className="flex flex-col items-center justify-center p-6">
            <GroundedDonut grounded={grounded} ungrounded={scored.length - grounded} rate={rate} />
            <p className="mt-3 text-center text-sm font-medium text-ink-700 dark:text-ink-200">
              Citation-grounded rate
            </p>
            <p className="mt-1 text-center text-xs text-ink-500">
              {scored.length ? `${grounded}/${scored.length} answers cited sources` : 'Run the sweep to measure'}
            </p>
          </CardBody>
        </Card>

        {/* Probes */}
        <div className="space-y-3">
          <Card>
            <CardBody className="flex items-center gap-2 p-2">
              <Input
                value={draft}
                onChange={(e) => setDraft(String(e.value))}
                onKeyDown={(e) => e.key === 'Enter' && addProbe()}
                placeholder="Add a probe question…"
                className="flex-1"
              />
              <Button fillMode="outline" onClick={addProbe}>Add</Button>
            </CardBody>
          </Card>

          {probes.length === 0 ? (
            <p className="text-sm text-ink-500">No probes yet — add a few questions to measure groundedness.</p>
          ) : (
            <Grid data={rows} className="bg-transparent">
              <GridColumn field="q" title="Probe" cells={{ data: ProbeCell }} />
              <GridColumn title="Status" width="220px" cells={{ data: StatusCell }} />
              <GridColumn title="" width="60px" cells={{ data: RemoveCell }} />
            </Grid>
          )}
        </div>
      </div>
    </div>
  );
}

function StateGlyph({ state }: { state: Probe['state'] }) {
  if (state === 'grounded') return <CheckCircle2 size={18} className="shrink-0 text-emerald-500" />;
  if (state === 'ungrounded' || state === 'error') return <ShieldAlert size={18} className="shrink-0 text-amber-500" />;
  if (state === 'running')
    return <span className="h-3.5 w-3.5 shrink-0 animate-spin rounded-full border-2 border-ink-300 border-t-transparent" />;
  return <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-ink-300" />;
}

// Groundedness as a KendoReact donut chart — the vendor control, themed to the
// demo's brand/accent and animated in on data. A soft brand glow sits AROUND
// the chart (CSS only) so it reads as a luminous score dial while the chart
// itself stays a Kendo component. Grounded vs ungrounded share of scored probes.
function GroundedDonut({ grounded, ungrounded, rate }: { grounded: number; ungrounded: number; rate: number | null }) {
  const { brand, accent, track } = chartPalette();
  const data =
    rate == null
      ? [{ category: 'Not run', value: 1, color: track }]
      : [
          { category: 'Grounded', value: grounded, color: brand },
          { category: 'Ungrounded', value: ungrounded, color: accent },
        ];
  return (
    <div className="relative h-44 w-44">
      {/* Brand light bloom behind the vendor chart. */}
      {rate != null && (
        <div
          className="pointer-events-none absolute inset-4 rounded-full blur-2xl"
          style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--brand) 42%, transparent), transparent 70%)' }}
          aria-hidden
        />
      )}
      <Chart style={{ height: 176, width: 176 }} className="relative" transitions>
        <ChartLegend visible={false} />
        <ChartSeries>
          <ChartSeriesItem
            type="donut"
            data={data}
            field="value"
            categoryField="category"
            colorField="color"
            holeSize={58}
            startAngle={90}
          >
            <ChartSeriesLabels visible={false} />
          </ChartSeriesItem>
        </ChartSeries>
      </Chart>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="font-display text-2xl font-bold text-ink-900 dark:text-ink-50">
          {rate == null ? '—' : `${rate}%`}
        </span>
      </div>
    </div>
  );
}
