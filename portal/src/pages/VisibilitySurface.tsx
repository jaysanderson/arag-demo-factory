import { Eye, Bot } from 'lucide-react';
import type { SurfaceProps } from './types';
import { PageHeader } from '../components/PageHeader';
import { SurfaceNotice } from '../components/SurfaceNotice';

// AI-visibility index. Measuring how a brand appears across the model catalogue
// uses the ACCOUNT-level predict/chat endpoint (a NUA key with ?model=), which
// is a different credential from the KB service-account the portal proxies. We
// present the narrative and the shape of the report, gated on that credential.
const MODELS = ['GPT-class', 'Claude-class', 'Gemini-class', 'Llama-class', 'Mistral-class'];

export function VisibilitySurface({ surface }: SurfaceProps) {
  return (
    <div className="space-y-6">
      <PageHeader icon={surface.icon} title="AI Visibility">
        How your brand appears across the AI model catalogue — and how to make your content retrievable so the answers
        improve. The AEO / answer-engine-optimisation narrative.
      </PageHeader>

      {/* Illustrative scorecard shape (structure, not live scores). */}
      <div className="card p-5">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-ink-500">Visibility across models</p>
        <div className="space-y-3">
          {MODELS.map((m, i) => {
            const pct = [72, 64, 58, 41, 33][i];
            return (
              <div key={m} className="flex items-center gap-3">
                <Bot size={15} className="shrink-0 text-ink-400" />
                <span className="w-32 shrink-0 text-sm text-ink-600 dark:text-ink-300">{m}</span>
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-ink-100 dark:bg-ink-800">
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: i < 2 ? 'var(--brand)' : 'var(--accent)' }} />
                </div>
                <span className="w-10 shrink-0 text-right text-xs font-medium text-ink-500">{pct}%</span>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-ink-400">
          Illustrative structure. Live scores require the account model catalogue — see below.
        </p>
      </div>

      <SurfaceNotice
        title="AI Visibility Index"
        sells="Measure brand appearance across the model catalogue and make content retrievable via MCP — the AEO / AI-visibility narrative."
        bullets={[
          'Probe 60+ models with brand prompts',
          'Score share-of-voice & sentiment',
          'Identify content gaps to close',
          'Expose the KB via MCP so answers cite you',
        ]}
      >
        <span className="inline-flex items-center gap-1"><Eye size={14} /> This surface queries the account-level</span>{' '}
        <code className="font-mono">/predict/chat?model=</code> endpoint, which honours the full model catalogue. That uses an{' '}
        <strong>account NUA key</strong> (<code className="font-mono">Authorization: Bearer</code>) — a different credential from the
        KB service-account the portal proxies. Provide it server-side to light up live scores.
      </SurfaceNotice>
    </div>
  );
}
