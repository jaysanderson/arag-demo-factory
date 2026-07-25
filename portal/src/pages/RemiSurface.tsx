import { useMemo, useState } from 'react';
import { Play, CheckCircle2, ShieldAlert, Plus, X } from 'lucide-react';
import type { SurfaceProps } from './types';
import { ask, type Citation } from '../lib/arag';
import { PageHeader } from '../components/PageHeader';
import { ErrorBanner } from '../components/States';

// Groundedness dashboard (REMi surface). Every answer either cites documents or
// it does not — and an uncited answer is the thing to govern against. This runs a
// live sweep of probe questions through the SAME grounded /ask path the Ask
// surface uses, and scores each on whether the Knowledge Box returned citations.
// It is the citation-groundedness rate an exec can hold the system to.

interface Probe { q: string; state: 'idle' | 'running' | 'grounded' | 'ungrounded' | 'error'; sources?: number; note?: string }

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

  return (
    <div>
      <PageHeader
        icon={surface.icon}
        title="Groundedness"
        actions={
          <button className="btn btn-brand" onClick={runAll} disabled={running || !probes.length}>
            <Play size={15} /> {running ? 'Running sweep…' : 'Run groundedness sweep'}
          </button>
        }
      >
        A live check that every answer stands on cited sources. Each probe runs through the grounded answer path;
        answers that cite documents pass, uncited answers are flagged. This is the number to govern against.
      </PageHeader>

      {error && <div className="mb-4"><ErrorBanner>{error}</ErrorBanner></div>}

      <div className="grid gap-6 lg:grid-cols-[16rem_1fr]">
        {/* Gauge */}
        <div className="card flex flex-col items-center justify-center p-6">
          <Gauge value={rate} />
          <p className="mt-3 text-center text-sm font-medium text-ink-700 dark:text-ink-200">
            Citation-grounded rate
          </p>
          <p className="mt-1 text-center text-xs text-ink-500">
            {scored.length ? `${grounded}/${scored.length} answers cited sources` : 'Run the sweep to measure'}
          </p>
        </div>

        {/* Probes */}
        <div className="space-y-3">
          <div className="card flex items-center gap-2 p-2">
            <Plus size={16} className="ml-2 text-ink-400" />
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addProbe()}
              placeholder="Add a probe question…"
              className="field border-0 bg-transparent shadow-none focus:shadow-none"
            />
            <button onClick={addProbe} className="btn btn-ghost">Add</button>
          </div>

          {probes.length === 0 && (
            <p className="text-sm text-ink-500">No probes yet — add a few questions to measure groundedness.</p>
          )}

          {probes.map((p, i) => (
            <div key={i} className="card flex items-start gap-3 p-4">
              <StateGlyph state={p.state} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-ink-900 dark:text-ink-100">{p.q}</p>
                <p className="mt-0.5 text-xs text-ink-500">
                  {p.state === 'grounded' && `Grounded — cited ${p.sources} source${p.sources === 1 ? '' : 's'}`}
                  {p.state === 'ungrounded' && 'Ungrounded — no citations returned (declined or off-corpus)'}
                  {p.state === 'running' && 'Asking…'}
                  {p.state === 'idle' && 'Not yet run'}
                  {p.state === 'error' && (p.note || 'Error')}
                </p>
              </div>
              <button onClick={() => removeProbe(i)} className="rounded p-1 text-ink-400 hover:text-ink-700" aria-label="Remove probe">
                <X size={15} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StateGlyph({ state }: { state: Probe['state'] }) {
  if (state === 'grounded') return <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-emerald-500" />;
  if (state === 'ungrounded' || state === 'error') return <ShieldAlert size={20} className="mt-0.5 shrink-0 text-amber-500" />;
  if (state === 'running')
    return <span className="mt-1 h-3.5 w-3.5 shrink-0 animate-spin rounded-full border-2 border-ink-300 border-t-transparent" />;
  return <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-ink-300" />;
}

function Gauge({ value }: { value: number | null }) {
  const pct = value ?? 0;
  const r = 52;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  const colour = value == null ? '#cbd5e1' : pct >= 90 ? '#10b981' : pct >= 70 ? 'var(--accent)' : '#ef4444';
  return (
    <svg viewBox="0 0 140 140" className="h-36 w-36 -rotate-90">
      <circle cx="70" cy="70" r={r} fill="none" stroke="currentColor" className="text-ink-200 dark:text-ink-800" strokeWidth="12" />
      <circle
        cx="70" cy="70" r={r} fill="none" stroke={colour} strokeWidth="12" strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`} style={{ transition: 'stroke-dasharray 0.6s ease' }}
      />
      <text x="70" y="70" textAnchor="middle" dominantBaseline="central" className="rotate-90 fill-ink-900 dark:fill-ink-50" fontSize="26" fontWeight="700" style={{ transform: 'rotate(90deg)', transformOrigin: '70px 70px' }}>
        {value == null ? '—' : `${value}%`}
      </text>
    </svg>
  );
}
