import { useRef, useState } from 'react';
import { Mic, Square, Volume2 } from 'lucide-react';
import type { SurfaceProps } from './types';
import type { Citation } from '../lib/arag';
import { ask } from '../lib/arag';
import { PageHeader } from '../components/PageHeader';
import { Citations } from '../components/Citations';

// Voice assistant — spoken, grounded, cited. Speech-to-text in, /ask over the
// Knowledge Box, text-to-speech out, with the same governance as the text Ask
// surface (an answer without citations is surfaced as ungrounded). Mirrors the
// arag-voice-bridge / Atlas two-voice concierge demos.
//
// Uses the browser SpeechRecognition + speechSynthesis Web APIs; if a browser
// lacks them, the surface falls back to typed input so the demo never dead-ends.

// The Web Speech API is not in the TS DOM lib in all setups — access loosely.
const SpeechRecognition: any =
  (typeof window !== 'undefined' && ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)) || null;

export function VoiceSurface({ surface }: SurfaceProps) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [typed, setTyped] = useState('');
  const [answer, setAnswer] = useState('');
  const [citations, setCitations] = useState<Citation[] | null>(null);
  const [streaming, setStreaming] = useState(false);
  const [latencyMs, setLatencyMs] = useState<number | null>(null);
  const recRef = useRef<any>(null);
  const startedRef = useRef(0);

  const speak = (text: string) => {
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 1.02;
      window.speechSynthesis?.cancel();
      window.speechSynthesis?.speak(u);
    } catch { /* speech synthesis unavailable — text answer still shows */ }
  };

  const runQuery = (query: string) => {
    const q = query.trim();
    if (!q || streaming) return;
    setTranscript(q);
    setAnswer('');
    setCitations(null);
    setStreaming(true);
    setLatencyMs(null);
    startedRef.current = performance.now();
    let spoken = false;
    ask(
      { query: q },
      {
        onToken: (t) => setAnswer((a) => a + t),
        onCitations: (c) => setCitations(c),
        onDone: () => {
          setStreaming(false);
          setLatencyMs(Math.round(performance.now() - startedRef.current));
          setAnswer((a) => { if (!spoken) { spoken = true; speak(a); } return a; });
        },
        onError: () => setStreaming(false),
      }
    );
  };

  const toggleListen = () => {
    if (!SpeechRecognition) return;
    if (listening) { recRef.current?.stop(); return; }
    const rec = new SpeechRecognition();
    rec.lang = 'en-AU';
    rec.interimResults = true;
    rec.continuous = false;
    rec.onresult = (e: any) => {
      const text = Array.from(e.results).map((r: any) => r[0].transcript).join('');
      setTranscript(text);
      if (e.results[e.results.length - 1].isFinal) runQuery(text);
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recRef.current = rec;
    setListening(true);
    rec.start();
  };

  const grounded = citations && citations.length > 0;

  return (
    <div className="space-y-6">
      <PageHeader icon={surface.icon} title="Voice">
        Speak to the assistant and hear a grounded answer back. Same governance as text — every spoken answer is
        grounded in the Knowledge Box and shows its sources; it declines out loud when the corpus can't support one.
      </PageHeader>

      <div className="rounded-2xl border border-ink-200 bg-white p-6 dark:border-ink-800 dark:bg-ink-900">
        <div className="flex flex-col items-center gap-4 py-4">
          <button
            onClick={toggleListen}
            disabled={!SpeechRecognition || streaming}
            className="flex h-20 w-20 items-center justify-center rounded-full text-white shadow-lg transition disabled:opacity-40"
            style={{ background: listening ? '#c0392b' : 'var(--brand)' }}
            aria-label={listening ? 'Stop listening' : 'Start voice call'}
          >
            {listening ? <Square size={26} /> : <Mic size={30} />}
          </button>
          <div className="text-sm text-ink-500">
            {!SpeechRecognition
              ? 'Voice input isn’t available in this browser — type below instead.'
              : listening ? 'Listening… speak your question' : 'Tap to speak'}
          </div>

          {!SpeechRecognition && (
            <form
              className="flex w-full max-w-xl gap-2"
              onSubmit={(e) => { e.preventDefault(); runQuery(typed); }}
            >
              <input
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                placeholder="Ask a question…"
                className="flex-1 rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm dark:border-ink-700 dark:bg-ink-800"
              />
              <button className="rounded-lg px-4 py-2 text-sm font-semibold text-white" style={{ background: 'var(--brand)' }}>
                Ask
              </button>
            </form>
          )}
        </div>

        {transcript && (
          <div className="mt-2 rounded-xl bg-ink-50 px-4 py-3 text-sm dark:bg-ink-800">
            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-500">You said</div>
            {transcript}
          </div>
        )}
      </div>

      {(answer || streaming) && (
        <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
          <div className="rounded-2xl border border-ink-200 bg-white p-6 dark:border-ink-800 dark:bg-ink-900">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--brand)' }}>
              <Volume2 size={14} /> {grounded ? 'Grounded answer' : streaming ? 'Answering…' : 'Answer'}
            </div>
            <p className="whitespace-pre-wrap leading-relaxed text-ink-800 dark:text-ink-100">{answer}</p>
            {!streaming && citations && citations.length === 0 && (
              <div className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
                Ungrounded — no supporting source was found. Treat this as unverified.
              </div>
            )}
            {latencyMs != null && (
              <div className="mt-4 text-xs text-ink-400">
                {(latencyMs / 1000).toFixed(1)}s · {citations?.length ?? 0} source{citations?.length === 1 ? '' : 's'} · citation coverage {grounded ? 'ok' : 'none'}
              </div>
            )}
          </div>
          <div>{citations && <Citations citations={citations} />}</div>
        </div>
      )}
    </div>
  );
}
