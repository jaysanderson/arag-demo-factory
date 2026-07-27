import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SendHorizontal, Square, RotateCcw, Compass } from 'lucide-react';
import { Button } from '@progress/kendo-react-buttons';
import { Pill } from '../components/Pill';
import { Card, CardBody } from '@progress/kendo-react-layout';
import type { SurfaceProps } from './types';
import { ask, type Citation } from '../lib/arag';
import { renderMarkdown } from '../lib/markdown';
import { PageHeader } from '../components/PageHeader';
import { Citations } from '../components/Citations';
import { TypingDots, ErrorBanner, UngroundedWarning } from '../components/States';
import { AnswerJourney } from '../components/journey/AnswerJourney';

const REFUSAL_MARKERS = [
  'not enough data', 'does not contain', 'no information', 'not provided',
  'cannot answer', "don't have", 'does not provide', 'not covered', 'no supporting',
  'unable to', 'no relevant',
];

/** Pull example questions out of the demo script (steps like `Ask: '…'`). */
function suggestionsFromScript(steps: SurfaceProps['config']['demoScript']): string[] {
  const out: string[] = [];
  for (const s of steps || []) {
    const m = (s.show || '').match(/[‘'"“]([^’'"”]{6,})[’'"”]/);
    if (m) out.push(m[1]);
  }
  return out.slice(0, 4);
}

export function AskSurface({ surface, config }: SurfaceProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [citations, setCitations] = useState<Citation[] | null>(null);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [journeyOpen, setJourneyOpen] = useState(false);
  const abortRef = useRef<null | (() => void)>(null);
  const answerRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => {
    const fromScript = suggestionsFromScript(config.demoScript);
    return fromScript.length ? fromScript : [];
  }, [config.demoScript]);

  const scoped = surface.capabilities?.includes('personas');

  const run = (q: string) => {
    const text = q.trim();
    if (!text || streaming) return;
    abortRef.current?.();
    setAnswer('');
    setCitations(null);
    setError(null);
    setStreaming(true);
    setQuery(text);

    abortRef.current = ask(
      { query: text },
      {
        onToken: (t) => {
          setAnswer((prev) => prev + t);
          requestAnimationFrame(() => {
            if (answerRef.current) answerRef.current.scrollTop = answerRef.current.scrollHeight;
          });
        },
        onCitations: (c) => setCitations(c),
        onDone: () => setStreaming(false),
        onError: (e) => {
          setError(e.message);
          setStreaming(false);
        },
      }
    );
  };

  // Ask arrived from the home ask bar (or a shared link): /ask?q=… → run it once.
  const location = useLocation();
  const ranInitial = useRef(false);
  useEffect(() => {
    if (ranInitial.current) return;
    const q = new URLSearchParams(location.search).get('q');
    if (q && q.trim()) {
      ranInitial.current = true;
      run(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const stop = () => {
    abortRef.current?.();
    setStreaming(false);
  };
  const reset = () => {
    stop();
    setAnswer('');
    setCitations(null);
    setError(null);
    setQuery('');
  };

  const done = !streaming && !!answer;
  const ungrounded = done && citations !== null && citations.length === 0;
  const refusalLike = ungrounded && REFUSAL_MARKERS.some((m) => answer.toLowerCase().includes(m));

  return (
    <div>
      <PageHeader icon={surface.icon} title="Ask">
        Ask a question in plain language. Every answer is grounded in the Knowledge Box and shows the
        documents it came from — {scoped ? 'scoped to your audience, and ' : ''}it declines when the corpus
        can't support an answer.
      </PageHeader>

      {/* Composer */}
      <Card>
        <CardBody className="p-2">
          <div className="flex items-end gap-2">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  run(query);
                }
              }}
              rows={1}
              placeholder={suggestions[0] ? `e.g. ${suggestions[0]}` : 'Ask a question about the knowledge base…'}
              className="field max-h-40 min-h-[46px] flex-1 resize-none border-0 bg-transparent shadow-none focus:shadow-none"
            />
            {streaming ? (
              <Button fillMode="outline" onClick={stop} startIcon={<Square size={15} />}>
                Stop
              </Button>
            ) : (
              <Button
                themeColor="primary"
                onClick={() => run(query)}
                disabled={!query.trim()}
                startIcon={<SendHorizontal size={16} />}
              >
                Ask
              </Button>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Suggestions */}
      {!answer && !streaming && suggestions.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="self-center text-xs font-medium text-ink-400">Try:</span>
          {suggestions.map((s) => (
            <Pill key={s} text={s} onClick={() => run(s)} />
          ))}
        </div>
      )}

      {error && <div className="mt-4"><ErrorBanner>{error}</ErrorBanner></div>}

      {/* Answer + sources */}
      {(answer || streaming) && (
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_20rem]">
          <Card>
            <CardBody className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-ink-500">
                  Grounded answer
                </span>
                {done && (
                  <Button
                    fillMode="flat"
                    size="small"
                    onClick={reset}
                    startIcon={<RotateCcw size={12} />}
                  >
                    New question
                  </Button>
                )}
              </div>
              <div
                ref={answerRef}
                className="answer-prose max-h-[60vh] overflow-y-auto scroll-slim"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(answer) }}
              />
              {streaming && (
                <div className="mt-2">
                  <TypingDots />
                </div>
              )}
              {ungrounded && (
                <div className="mt-4">
                  <UngroundedWarning>
                    {refusalLike
                      ? 'The portal correctly declined: the Knowledge Box holds nothing that supports this question, so it did not invent an answer. That refusal is the behaviour to trust.'
                      : 'The Knowledge Box returned no citations for this answer. Do not rely on the text above — an uncited answer is treated as ungrounded here.'}
                  </UngroundedWarning>
                </div>
              )}
            </CardBody>
          </Card>

          <aside className="lg:sticky lg:top-4 lg:self-start">
            {citations && citations.length > 0 ? (
              <>
                <Citations citations={citations} onOpen={(rid) => navigate(`/r/${rid}`)} />
                {done && (
                  <Button
                    fillMode="outline"
                    onClick={() => setJourneyOpen(true)}
                    startIcon={<Compass size={15} />}
                    className="mt-3 w-full justify-center"
                  >
                    Journey through the context
                  </Button>
                )}
              </>
            ) : streaming ? (
              <Card className="card-flat"><CardBody className="p-4 text-sm text-ink-400">Resolving sources…</CardBody></Card>
            ) : null}
          </aside>
        </div>
      )}

      <AnswerJourney
        open={journeyOpen}
        query={query}
        citedIds={(citations || []).map((c) => c.resourceId)}
        onClose={() => setJourneyOpen(false)}
      />
    </div>
  );
}
