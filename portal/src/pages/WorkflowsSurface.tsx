import { useMemo, useState } from 'react';
import { Play, Plus, X, GitBranch } from 'lucide-react';
import type { SurfaceProps } from './types';
import { ask, type Citation } from '../lib/arag';
import { renderMarkdown } from '../lib/markdown';
import { PageHeader } from '../components/PageHeader';
import { SurfaceNotice } from '../components/SurfaceNotice';
import { ErrorBanner } from '../components/States';

// Agentic workflows. A managed ARAG Retrieval Agent runs multi-step sessions
// server-side; that agent endpoint is not part of the read-only portal proxy.
// What IS real here: a workflow as an ordered chain of GROUNDED steps, each
// retrieved and cited through /ask — the way an analyst actually works, one
// grounded question feeding the next.

interface Step {
  q: string;
  state: 'idle' | 'running' | 'done' | 'error';
  answer?: string;
  citations?: Citation[];
  note?: string;
}

function askOnce(query: string): Promise<{ answer: string; citations: Citation[] }> {
  return new Promise((resolve, reject) => {
    let answer = '';
    ask({ query }, {
      onToken: (t) => { answer += t; },
      onCitations: (c) => resolve({ answer, citations: c }),
      onError: reject,
      onDone: () => resolve({ answer, citations: [] }),
    });
  });
}

export function WorkflowsSurface({ surface, config }: SurfaceProps) {
  const seed = useMemo(() => {
    const out: string[] = [];
    for (const s of config.demoScript || []) {
      const m = (s.show || '').match(/[‘'"“]([^’'"”]{6,})[’'"”]/);
      if (m) out.push(m[1]);
    }
    return out.slice(0, 3);
  }, [config.demoScript]);

  const [steps, setSteps] = useState<Step[]>(seed.map((q) => ({ q, state: 'idle' })));
  const [draft, setDraft] = useState('');
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    if (!steps.length || running) return;
    setRunning(true);
    setError(null);
    setSteps((prev) => prev.map((s) => ({ ...s, state: 'idle', answer: undefined, citations: undefined })));
    for (let i = 0; i < steps.length; i++) {
      setSteps((prev) => prev.map((s, idx) => (idx === i ? { ...s, state: 'running' } : s)));
      try {
        const { answer, citations } = await askOnce(steps[i].q);
        setSteps((prev) => prev.map((s, idx) => (idx === i ? { ...s, state: 'done', answer, citations } : s)));
      } catch (e: any) {
        setError(e.message);
        setSteps((prev) => prev.map((s, idx) => (idx === i ? { ...s, state: 'error', note: e.message } : s)));
        break;
      }
    }
    setRunning(false);
  };

  const add = () => {
    const q = draft.trim();
    if (!q) return;
    setSteps((prev) => [...prev, { q, state: 'idle' }]);
    setDraft('');
  };
  const remove = (i: number) => setSteps((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-6">
      <PageHeader
        icon={surface.icon}
        title="Workflows"
        actions={
          <button className="btn btn-brand" onClick={run} disabled={running || !steps.length}>
            <Play size={15} /> {running ? 'Running…' : 'Run workflow'}
          </button>
        }
      >
        Not one answer — a chain of grounded steps that mirrors how an analyst works. Each step retrieves and cites
        before the next runs.
      </PageHeader>

      {error && <ErrorBanner>{error}</ErrorBanner>}

      <div className="card flex items-center gap-2 p-2">
        <Plus size={16} className="ml-2 text-ink-400" />
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && add()}
          placeholder="Add a step (a grounded sub-question)…"
          className="field border-0 bg-transparent shadow-none focus:shadow-none"
        />
        <button onClick={add} className="btn btn-ghost">Add step</button>
      </div>

      <ol className="space-y-3">
        {steps.map((s, i) => (
          <li key={i} className="relative">
            {i < steps.length - 1 && <span className="absolute left-[19px] top-10 h-[calc(100%-1rem)] w-px bg-ink-200 dark:bg-ink-800" />}
            <div className="card p-4">
              <div className="flex items-start gap-3">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
                  style={{ background: 'var(--brand-soft)', color: 'var(--brand)' }}
                >
                  {s.state === 'running' ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  ) : (
                    i + 1
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-ink-900 dark:text-ink-100">{s.q}</p>
                    <button onClick={() => remove(i)} className="ml-auto rounded p-1 text-ink-400 hover:text-ink-700" aria-label="Remove step">
                      <X size={14} />
                    </button>
                  </div>
                  {s.state === 'done' && (
                    <>
                      <div className="answer-prose mt-2 max-h-48 overflow-y-auto scroll-slim text-sm" dangerouslySetInnerHTML={{ __html: renderMarkdown(s.answer || '') }} />
                      <p className="mt-2 text-xs font-medium" style={{ color: s.citations && s.citations.length ? 'var(--brand)' : '#b45309' }}>
                        {s.citations && s.citations.length
                          ? `Grounded — ${s.citations.length} source${s.citations.length === 1 ? '' : 's'}`
                          : 'No citations — treated as ungrounded'}
                      </p>
                    </>
                  )}
                  {s.state === 'error' && <p className="mt-1 text-xs text-red-600">{s.note}</p>}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <SurfaceNotice title="Productionising the workflow" bullets={['Managed multi-step Retrieval Agent sessions', 'Tool use & branching over the KB', 'Server-side orchestration with citations preserved']}>
        <span className="inline-flex items-center gap-1"><GitBranch size={14} /> This runs the chain client-side against the grounded /ask path.</span> A
        deployed demo can bind a managed ARAG Retrieval Agent (an <code className="font-mono">/agent/session</code> endpoint) so the
        planning and branching run server-side — the same steps, orchestrated by the platform.
      </SurfaceNotice>
    </div>
  );
}
