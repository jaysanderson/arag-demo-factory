import { Eye } from 'lucide-react';
import { Card, CardBody } from '@progress/kendo-react-layout';
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartValueAxis,
  ChartValueAxisItem,
  ChartTooltip,
} from '@progress/kendo-react-charts';
import type { SurfaceProps } from './types';
import { PageHeader } from '../components/PageHeader';
import { SurfaceNotice } from '../components/SurfaceNotice';

// AI-visibility index. Measuring how a brand appears across the model catalogue
// uses the ACCOUNT-level predict/chat endpoint (a NUA key with ?model=), which
// is a different credential from the KB service-account the portal proxies. We
// present the narrative and the shape of the report, gated on that credential.
const MODELS = ['GPT-class', 'Claude-class', 'Gemini-class', 'Llama-class', 'Mistral-class'];

export function VisibilitySurface({ surface }: SurfaceProps) {
  const css = typeof window !== 'undefined' ? getComputedStyle(document.documentElement) : null;
  const brand = css?.getPropertyValue('--brand').trim() || '#00713c';
  const accent = css?.getPropertyValue('--accent').trim() || '#d9a441';
  const chartData = MODELS.map((m, i) => ({
    model: m,
    value: [72, 64, 58, 41, 33][i],
    color: i < 2 ? brand : accent,
  }));

  return (
    <div className="space-y-6">
      <PageHeader icon={surface.icon} title="AI Visibility">
        How your brand appears across the AI model catalogue — and how to make your content retrievable so the answers
        improve. The AEO / answer-engine-optimisation narrative.
      </PageHeader>

      {/* Illustrative scorecard shape (structure, not live scores). */}
      <Card>
        <CardBody className="p-5">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-ink-500">Visibility across models</p>
          <Chart style={{ height: 240 }} transitions={false}>
            <ChartTooltip format="{0}%" />
            <ChartCategoryAxis>
              <ChartCategoryAxisItem categories={MODELS} />
            </ChartCategoryAxis>
            <ChartValueAxis>
              <ChartValueAxisItem max={100} labels={{ format: '{0}%' }} />
            </ChartValueAxis>
            <ChartSeries>
              <ChartSeriesItem
                type="bar"
                data={chartData}
                field="value"
                categoryField="model"
                colorField="color"
              />
            </ChartSeries>
          </Chart>
          <p className="mt-3 text-xs text-ink-400">
            Illustrative structure. Live scores require the account model catalogue — see below.
          </p>
        </CardBody>
      </Card>

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
