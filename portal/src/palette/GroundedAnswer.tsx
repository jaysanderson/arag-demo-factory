import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass } from 'lucide-react';
// Kendo-free: plain elements + Tailwind so the answer/citation guarantee holds
// identically in both the KendoReact and open-source UI modes.
import type { AskState } from './hooks';
import { renderMarkdown } from '../lib/markdown';
import { Citations } from '../components/Citations';
import { TypingDots, ErrorBanner, UngroundedWarning } from '../components/States';
import { AnswerJourney } from '../components/journey/AnswerJourney';

// ─────────────────────────────────────────────────────────────────────────────
// GroundedAnswer — the incorruptible answer pigment.
//
// It renders the streamed answer AND its sources together, and it is structurally
// incapable of presenting an uncited claim as fact: when an answer resolves with
// zero citations it renders an explicit ungrounded/refusal warning instead of
// clean prose. Every composition that shows an ARAG answer should use this rather
// than printing `answer` directly — that is what keeps "an ungrounded answer is a
// bug" true no matter how freely the page is composed.
// ─────────────────────────────────────────────────────────────────────────────
export function GroundedAnswer({ state, journey = true }: { state: AskState; journey?: boolean }) {
  const navigate = useNavigate();
  const [journeyOpen, setJourneyOpen] = useState(false);
  const { answer, citations, streaming, error, done, ungrounded, refusalLike, query } = state;

  if (error) return <ErrorBanner>{error}</ErrorBanner>;
  if (!answer && !streaming) return null;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_20rem]">
      <div className="card p-5">
        <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-500">Grounded answer</div>
        <div className="answer-prose max-h-[60vh] overflow-y-auto scroll-slim" dangerouslySetInnerHTML={{ __html: renderMarkdown(answer) }} />
        {streaming && <div className="mt-2"><TypingDots /></div>}
        {ungrounded && (
          <div className="mt-4">
            <UngroundedWarning>
              {refusalLike
                ? 'The portal correctly declined: the Knowledge Box holds nothing that supports this question, so it did not invent an answer. That refusal is the behaviour to trust.'
                : 'The Knowledge Box returned no citations for this answer. Do not rely on the text above — an uncited answer is treated as ungrounded here.'}
            </UngroundedWarning>
          </div>
        )}
      </div>

      <aside className="lg:sticky lg:top-4 lg:self-start">
        {citations && citations.length > 0 ? (
          <>
            <Citations citations={citations} onOpen={(rid) => navigate(`/r/${rid}`)} />
            {journey && done && (
              <button
                type="button"
                onClick={() => setJourneyOpen(true)}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium text-ink-700 transition hover:bg-ink-50 dark:text-ink-200 dark:hover:bg-ink-800"
                style={{ borderColor: 'var(--hairline)' }}
              >
                <Compass size={15} />
                Journey through the context
              </button>
            )}
          </>
        ) : streaming ? (
          <div className="card card-flat p-4 text-sm text-ink-400">Resolving sources…</div>
        ) : null}
      </aside>

      {journey && (
        <AnswerJourney
          open={journeyOpen}
          query={query}
          citedIds={(citations || []).map((c) => c.resourceId)}
          onClose={() => setJourneyOpen(false)}
        />
      )}
    </div>
  );
}
