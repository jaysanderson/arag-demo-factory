import { useEffect, useState } from 'react';
import { FileInput, Tags, ScanText, CheckCircle2, Braces, ArrowRight } from 'lucide-react';
import { Card, CardBody } from '@progress/kendo-react-layout';
import { Chip } from '@progress/kendo-react-buttons';
import type { SurfaceProps } from './types';
import { catalog, type CatalogCard } from '../lib/arag';
import { PageHeader } from '../components/PageHeader';
import { SurfaceNotice } from '../components/SurfaceNotice';
import { Spinner } from '../components/States';

const STAGES = [
  { icon: FileInput, label: 'Ingest', note: 'Document arrives (PDF, transcript, page)' },
  { icon: ScanText, label: 'Extract', note: 'Text, tables & entities pulled out' },
  { icon: Tags, label: 'Classify', note: 'Labelled by type, topic, region…' },
  { icon: CheckCircle2, label: 'Validate', note: 'Checked against the taxonomy' },
  { icon: Braces, label: 'Standardise', note: 'Emitted as structured, queryable data' },
];

// Document Intelligence Studio. Live ingestion runs through the KB writer API,
// which the read-only portal proxy does not expose — but the RESULT of that
// pipeline is visible right now: every resource below arrived raw and came out
// classified. We show the pipeline, then prove it on the real corpus.
export function DocStudioSurface({ surface }: SurfaceProps) {
  const [items, setItems] = useState<CatalogCard[] | null>(null);

  useEffect(() => {
    catalog({ pageSize: 8 }).then((r) => setItems(r.items)).catch(() => setItems([]));
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader icon={surface.icon} title="Document Studio">
        Drop a document and watch it become structured, queryable data — classify, extract, validate, standardise.
      </PageHeader>

      {/* Pipeline */}
      <Card>
        <CardBody className="p-5">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-ink-500">The pipeline</p>
        <div className="flex flex-col gap-3 md:flex-row md:items-stretch">
          {STAGES.map((s, i) => (
            <div key={s.label} className="flex flex-1 items-center gap-3 md:flex-col md:items-start">
              <div className="flex flex-1 items-start gap-3 rounded-xl border border-ink-200 p-3 dark:border-ink-800">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ background: 'var(--brand-soft)', color: 'var(--brand)' }}>
                  <s.icon size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink-900 dark:text-ink-100">{s.label}</p>
                  <p className="text-xs text-ink-500">{s.note}</p>
                </div>
              </div>
              {i < STAGES.length - 1 && <ArrowRight size={16} className="hidden shrink-0 text-ink-300 md:mt-3 md:block" />}
            </div>
          ))}
        </div>
        </CardBody>
      </Card>

      {/* Proof on the real corpus */}
      <div>
        <p className="mb-3 text-sm font-medium text-ink-700 dark:text-ink-200">
          Extracted structure on the live corpus
        </p>
        {items === null ? (
          <Spinner label="Loading classified documents…" />
        ) : items.length === 0 ? (
          <SurfaceNotice
            title="Document Intelligence Studio"
            sells="An invoice, contract or claim becomes structured JSON in visible steps — the automation ROI story on a plate."
            bullets={['Classify by type & topic', 'Extract entities & tables', 'Validate against a taxonomy', 'Emit queryable structure']}
          >
            Bind a Knowledge Box with classified resources to see the extracted structure here.
          </SurfaceNotice>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {items.map((c) => (
              <Card key={c.id}>
                <CardBody className="p-4">
                  <div className="flex items-center gap-2">
                    <Chip
                      text={c.docType}
                      size="small"
                      rounded="full"
                      style={{ background: 'var(--brand-soft)', color: 'var(--brand-strong)', borderColor: 'transparent' }}
                    />
                    {c.mediaType && <Chip text={c.mediaType} size="small" fillMode="outline" rounded="full" />}
                  </div>
                  <p className="mt-2 line-clamp-1 font-semibold text-ink-900 dark:text-ink-100">{c.title}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {Object.entries(c.labels).flatMap(([ls, labels]) =>
                      labels.slice(0, 3).map((l) => (
                        <Chip key={`${ls}:${l}`} text={`${ls}: ${l}`} size="small" fillMode="outline" rounded="full" />
                      ))
                    )}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
