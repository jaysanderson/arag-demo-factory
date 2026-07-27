import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SendHorizontal, Square, RotateCcw } from 'lucide-react';
import { Button } from '@progress/kendo-react-buttons';
import { Card, CardBody } from '@progress/kendo-react-layout';
import type { SurfaceProps } from './types';
import { useAsk, GroundedAnswer, Pill, PageHeader } from '../palette';

/** Pull example questions out of the demo script (steps like `Ask: '…'`). */
function suggestionsFromScript(steps: SurfaceProps['config']['demoScript']): string[] {
  const out: string[] = [];
  for (const s of steps || []) {
    const m = (s.show || '').match(/[‘'"“]([^’'"”]{6,})[’'"”]/);
    if (m) out.push(m[1]);
  }
  return out.slice(0, 4);
}

// Composed from the palette: the Ask composer plus <GroundedAnswer>, which owns
// the answer, its sources, the Journey walk, and the ungrounded/refusal guarantee.
export function AskSurface({ surface, config }: SurfaceProps) {
  const chat = useAsk();
  const [input, setInput] = useState('');
  const suggestions = useMemo(() => suggestionsFromScript(config.demoScript), [config.demoScript]);
  const scoped = surface.capabilities?.includes('personas');

  const submit = (q: string) => {
    const text = q.trim();
    if (!text || chat.streaming) return;
    setInput(text);
    chat.run(text);
  };

  // Ask arrived from the home ask bar (or a shared link): /ask?q=… → run it once.
  const location = useLocation();
  const ranInitial = useRef(false);
  useEffect(() => {
    if (ranInitial.current) return;
    const q = new URLSearchParams(location.search).get('q');
    if (q && q.trim()) { ranInitial.current = true; submit(q); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  return (
    <div>
      <PageHeader icon={surface.icon} title="Ask">
        Ask a question in plain language. Every answer is grounded in the Knowledge Box and shows the
        documents it came from — {scoped ? 'scoped to your audience, and ' : ''}it declines when the corpus
        can't support an answer.
      </PageHeader>

      <Card>
        <CardBody className="p-2">
          <div className="flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(input); }
              }}
              rows={1}
              placeholder={suggestions[0] ? `e.g. ${suggestions[0]}` : 'Ask a question about the knowledge base…'}
              className="field max-h-40 min-h-[46px] flex-1 resize-none border-0 bg-transparent shadow-none focus:shadow-none"
            />
            {chat.streaming ? (
              <Button fillMode="outline" onClick={chat.stop} startIcon={<Square size={15} />}>Stop</Button>
            ) : chat.done ? (
              <Button fillMode="outline" onClick={() => { chat.reset(); setInput(''); }} startIcon={<RotateCcw size={14} />}>New</Button>
            ) : (
              <Button themeColor="primary" onClick={() => submit(input)} disabled={!input.trim()} startIcon={<SendHorizontal size={16} />}>Ask</Button>
            )}
          </div>
        </CardBody>
      </Card>

      {!chat.answer && !chat.streaming && suggestions.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="self-center text-xs font-medium text-ink-400">Try:</span>
          {suggestions.map((s) => <Pill key={s} text={s} onClick={() => submit(s)} />)}
        </div>
      )}

      {(chat.answer || chat.streaming || chat.error) && (
        <div className="mt-6"><GroundedAnswer state={chat} /></div>
      )}
    </div>
  );
}
