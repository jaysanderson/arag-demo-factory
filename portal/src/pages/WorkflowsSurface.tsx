import { useMemo, useState } from 'react';
import { Play, Plus, X, GitBranch, ArrowDown, Sparkles, Clock } from 'lucide-react';
import { Button } from '@progress/kendo-react-buttons';
import { Input } from '@progress/kendo-react-inputs';
import { Card, CardBody } from '@progress/kendo-react-layout';
import type { SurfaceProps } from './types';
import { ask, type Citation } from '../lib/arag';
import { renderMarkdown } from '../lib/markdown';
import { PageHeader } from '../components/PageHeader';
import { TypingDots, ErrorBanner } from '../components/States';

// Agentic workflows. A managed ARAG Retrieval Agent runs multi-step sessions
// server-side; that agent endpoint is not part of the read-only portal proxy.
// What IS real and live here: a workflow as an ordered chain of GROUNDED steps,
// each retrieved and cited through /ask, whose answers then feed a final
// synthesis /ask — the way an analyst actually works, one grounded question
// informing the next, ending in a cited root-cause recommendation.

type StepState = 'idle' | 'running' | 'grounded' | 'ungrounded' | 'error';

interface Step {
  id: number;
  q: string;
  state: StepState;
  answer?: string;
  citations?: Citation[];
  ms?: number;
}

/** Streams one grounded step, pushing tokens + citations live, resolving on done. */
function streamStep(
  query: string,
  onToken: (t: string) => void,
  onCites: (c: Citation[]) => void
): Promise<{ answer: string; citations: Citation[] }> {
  return new Promise((resolve, reject) => {
    let answer = '';
    let cites: Citation[] = [];
    ask(
      { query },
      {
        onToken: (t) => {
          answer += t;
          onToken(t);
        },
        onCitations: (c) => {
          cites = c;
          onCites(c);
        },
        onError: reject,
        onDone: () => resolve({ answer, citations: cites }),
      }
    );
  });
}

/** Builds the final synthesis prompt from the grounded findings of prior steps. */
function synthesisQuery(steps: Step[]): string {
  const findings = steps
    .filter((s) => (s.answer || '').trim())
    .map((s, i) => `Finding ${i + 1} — ${s.q}\n${s.answer}`)
    .join('\n\n');
  return (
    'Using only what the Knowledge Box can support, synthesise the findings below into a single ' +
    'root-cause assessment and a prioritised, actionable recommendation. Reconcile any tension ' +
    'between the findings and cite the governing documents.\n\n' +
    findings
  );
}

function probeSeeds(config: SurfaceProps['config']): string[] {
  const p = (config as unknown as { probes?: { answerable?: string[] } }).probes?.answerable;
  if (p && p.length) return p.slice(0, 4);
  const out: string[] = [];
  for (const s of config.demoScript || []) {
    const m = (s.show || '').match(/[‘'"“]([^’'"”]{6,})[’'"”]/);
    if (m) out.push(m[1]);
  }
  return out.slice(0, 3);
}

export function WorkflowsSurface({ surface, config }: SurfaceProps) {
  const seed = useMemo(() => probeSeeds(config), [config]);
  const [steps, setSteps] = useState<Step[]>(seed.map((q, i) => ({ id: i + 1, q, state: 'idle' })));
  const [synth, setSynth] = useState<Step>({ id: 0, q: 'Synthesis — root cause & recommendation', state: 'idle' });
  const [nextId, setNextId] = useState(seed.length + 1);
  const [draft, setDraft] = useState('');
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalMs, setTotalMs] = useState<number | null>(null);

  const patch = (id: number, p: Partial<Step>) =>
    setSteps((prev) => prev.map((s) => (s.id === id ? { ...s, ...p } : s)));

  const run = async () => {
    if (!steps.length || running) return;
    setRunning(true);
    setError(null);
    setTotalMs(null);
    setSteps((prev) => prev.map((s) => ({ ...s, state: 'idle', answer: '', citations: undefined, ms: undefined })));
    setSynth((s) => ({ ...s, state: 'idle', answer: '', citations: undefined, ms: undefined }));

    const start = performance.now();
    const done: Step[] = [];
    try {
      for (const step of steps) {
        const t0 = performance.now();
        patch(step.id, { state: 'running', answer: '' });
        const { answer, citations } = await streamStep(
          step.q,
          (tok) => setSteps((prev) => prev.map((s) => (s.id === step.id ? { ...s, answer: (s.answer || '') + tok } : s))),
          (c) => patch(step.id, { citations: c })
        );
        patch(step.id, {
          state: citations.length ? 'grounded' : 'ungrounded',
          answer,
          citations,
          ms: performance.now() - t0,
        });
        done.push({ ...step, answer, citations });
      }

      // Final synthesis — reasons across every grounded finding, itself cited.
      const t0 = performance.now();
      setSynth((s) => ({ ...s, state: 'running', answer: '' }));
      const { answer, citations } = await streamStep(
        synthesisQuery(done),
        (tok) => setSynth((s) => ({ ...s, answer: (s.answer || '') + tok })),
        (c) => setSynth((s) => ({ ...s, citations: c }))
      );
      setSynth((s) => ({
        ...s,
        state: citations.length ? 'grounded' : 'ungrounded',
        answer,
        citations,
        ms: performance.now() - t0,
      }));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Workflow failed');
      setSteps((prev) => prev.map((s) => (s.state === 'running' ? { ...s, state: 'error' } : s)));
      setSynth((s) => (s.state === 'running' ? { ...s, state: 'error' } : s));
    }
    setTotalMs(performance.now() - start);
    setRunning(false);
  };

  const add = () => {
    const q = draft.trim();
    if (!q) return;
    setSteps((prev) => [...prev, { id: nextId, q, state: 'idle' }]);
    setNextId((n) => n + 1);
    setDraft('');
  };
  const remove = (id: number) => setSteps((prev) => prev.filter((s) => s.id !== id));
  const edit = (id: number, q: string) => patch(id, { q });

  const totalSources = [...steps, synth].reduce((n, s) => n + (s.citations?.length || 0), 0);

  return (
    <div className="space-y-6">
      <PageHeader
        icon={surface.icon}
        title="Workflows"
        actions={
          <Button
            themeColor="primary"
            onClick={run}
            disabled={running || !steps.length}
            startIcon={<Play size={15} />}
          >
            {running ? 'Running…' : 'Run workflow'}
          </Button>
        }
      >
        Not one lookup — a chain of grounded steps that reason across the corpus. Each step retrieves and
        cites before the next runs, then a final synthesis composes them into a cited recommendation.
      </PageHeader>

      {/* Run summary */}
      {(running || totalMs !== null) && (
        <Card className="card-flat">
          <CardBody className="flex flex-wrap items-center gap-x-6 gap-y-2 p-3 text-sm">
            <span className="inline-flex items-center gap-2 font-medium text-ink-700 dark:text-ink-200">
              <GitBranch size={15} style={{ color: 'var(--brand)' }} />
              {steps.length} grounded step{steps.length === 1 ? '' : 's'} → 1 synthesis
            </span>
            <span className="inline-flex items-center gap-1.5 text-ink-500">
              <Sparkles size={14} style={{ color: 'var(--accent)' }} />
              {totalSources} source{totalSources === 1 ? '' : 's'} cited across the chain
            </span>
            {totalMs !== null && (
              <span className="inline-flex items-center gap-1.5 text-ink-500">
                <Clock size={14} /> {(totalMs / 1000).toFixed(1)}s total
              </span>
            )}
          </CardBody>
        </Card>
      )}

      {error && <ErrorBanner>{error}</ErrorBanner>}

      {/* Step chain */}
      <ol className="space-y-0">
        {steps.map((s, i) => (
          <li key={s.id}>
            <StepCard
              index={i + 1}
              step={s}
              running={running}
              onEdit={(q) => edit(s.id, q)}
              onRemove={() => remove(s.id)}
            />
            <Connector />
          </li>
        ))}

        {/* Add step */}
        <li>
          <Card className="card-flat">
            <CardBody className="flex items-center gap-2 p-2">
              <Plus size={16} className="ml-2 shrink-0 text-ink-400" />
              <Input
                value={draft}
                onChange={(e) => setDraft(String(e.value))}
                onKeyDown={(e) => e.key === 'Enter' && add()}
                placeholder="Add a step — a grounded sub-question…"
                className="flex-1"
                disabled={running}
              />
              <Button fillMode="outline" onClick={add} disabled={running || !draft.trim()}>
                Add step
              </Button>
            </CardBody>
          </Card>
          <Connector accent />
        </li>

        {/* Synthesis */}
        <li>
          <SynthesisCard step={synth} count={steps.length} />
        </li>
      </ol>

      <p className="flex items-center gap-1.5 text-xs text-ink-400">
        <GitBranch size={13} /> Runs the chain live against the grounded /ask path. A deployed build can bind a
        managed ARAG Retrieval Agent so the planning and branching run server-side — the same cited steps,
        orchestrated by the platform.
      </p>
    </div>
  );
}

/* ── Pieces ─────────────────────────────────────────────────────────────────── */

function Connector({ accent }: { accent?: boolean }) {
  return (
    <div className="flex justify-start pl-[19px]">
      <span
        className="my-1 flex h-6 w-px items-center justify-center"
        style={{ background: accent ? 'var(--accent)' : 'var(--hairline)' }}
      >
        {accent && <ArrowDown size={14} className="translate-y-3" style={{ color: 'var(--accent)' }} />}
      </span>
    </div>
  );
}

function Badge({ index, state }: { index: number; state: StepState }) {
  if (state === 'running')
    return (
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
        style={{ background: 'var(--brand-soft)', color: 'var(--brand)' }}
      >
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      </span>
    );
  const grounded = state === 'grounded';
  const bad = state === 'ungrounded' || state === 'error';
  return (
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
      style={{
        background: grounded ? 'var(--brand)' : bad ? '#fef3c7' : 'var(--brand-soft)',
        color: grounded ? 'var(--brand-contrast)' : bad ? '#b45309' : 'var(--brand)',
      }}
    >
      {index}
    </span>
  );
}

function StatusLine({ step }: { step: Step }) {
  if (step.state === 'running')
    return (
      <span className="inline-flex items-center gap-2 text-xs font-medium text-ink-500">
        Retrieving & reasoning <TypingDots />
      </span>
    );
  if (step.state === 'grounded')
    return (
      <span className="text-xs font-semibold" style={{ color: 'var(--brand)' }}>
        Grounded — {step.citations!.length} source{step.citations!.length === 1 ? '' : 's'}
        {step.ms != null && <span className="font-normal text-ink-400"> · {(step.ms / 1000).toFixed(1)}s</span>}
      </span>
    );
  if (step.state === 'ungrounded')
    return <span className="text-xs font-semibold text-amber-600">No citations — treated as ungrounded</span>;
  if (step.state === 'error') return <span className="text-xs font-semibold text-red-600">Step failed</span>;
  return null;
}

function StepSources({ citations }: { citations?: Citation[] }) {
  if (!citations || !citations.length) return null;
  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {citations.map((c) => (
        <span
          key={c.resourceId}
          className="inline-flex max-w-[16rem] items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px]"
          style={{ borderColor: 'var(--hairline)' }}
          title={c.text || c.title}
        >
          <span
            className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
            style={{ background: 'var(--brand)', color: 'var(--brand-contrast)' }}
          >
            {c.index}
          </span>
          <span className="truncate text-ink-600 dark:text-ink-300">{c.title}</span>
        </span>
      ))}
    </div>
  );
}

function StepCard({
  index,
  step,
  running,
  onEdit,
  onRemove,
}: {
  index: number;
  step: Step;
  running: boolean;
  onEdit: (q: string) => void;
  onRemove: () => void;
}) {
  const locked = running || step.state === 'running';
  return (
    <Card>
      <CardBody className="p-4">
        <div className="flex items-start gap-3">
          <Badge index={index} state={step.state} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <Input
                value={step.q}
                onChange={(e) => onEdit(String(e.value))}
                disabled={locked}
                className="flex-1 font-medium"
              />
              <Button
                fillMode="flat"
                size="small"
                onClick={onRemove}
                disabled={locked}
                aria-label="Remove step"
              >
                <X size={14} />
              </Button>
            </div>

            {(step.answer || step.state === 'running') && (
              <div
                className="answer-prose mt-3 max-h-56 overflow-y-auto scroll-slim text-sm"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(step.answer || '') }}
              />
            )}

            <div className="mt-2">
              <StatusLine step={step} />
            </div>
            <StepSources citations={step.state === 'running' ? undefined : step.citations} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

function SynthesisCard({ step, count }: { step: Step; count: number }) {
  const pending = step.state === 'idle';
  return (
    <Card
      className="card-elevated overflow-hidden"
      style={{ borderColor: 'var(--accent)' }}
    >
      <div className="px-4 py-2.5" style={{ background: 'var(--brand-soft)' }}>
        <span className="inline-flex items-center gap-2 text-xs font-semibold" style={{ color: 'var(--brand-strong)' }}>
          <Sparkles size={14} /> Synthesis — root cause &amp; recommendation
        </span>
      </div>
      <CardBody className="p-4">
        {pending ? (
          <p className="text-sm text-ink-500">
            After the {count} step{count === 1 ? '' : 's'} run, this composes their grounded findings into a
            single cited recommendation.
          </p>
        ) : (
          <>
            {(step.answer || step.state === 'running') && (
              <div
                className="answer-prose text-sm"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(step.answer || '') }}
              />
            )}
            <div className="mt-2">
              <StatusLine step={step} />
            </div>
            <StepSources citations={step.state === 'running' ? undefined : step.citations} />
          </>
        )}
      </CardBody>
    </Card>
  );
}
