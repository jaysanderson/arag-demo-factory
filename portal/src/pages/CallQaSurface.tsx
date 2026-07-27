import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Clock, PlayCircle } from 'lucide-react';
import { Card, CardBody } from '@progress/kendo-react-layout';
import { Chip } from '@progress/kendo-react-buttons';
import type { SurfaceProps } from './types';
import { catalog, type CatalogCard } from '../lib/arag';
import { PageHeader } from '../components/PageHeader';
import { ClickableCard } from '../components/ClickableCard';
import { SurfaceNotice } from '../components/SurfaceNotice';
import { Spinner } from '../components/States';
import { CitedMetric } from '../palette';

// Call & media analytics. Transcribed calls are just resources with a media_type
// and a duration — so QA that used to sample 2% now covers 100%. We surface the
// transcripts in the corpus and let a question run across them.
export function CallQaSurface({ surface }: SurfaceProps) {
  const navigate = useNavigate();
  const [items, setItems] = useState<CatalogCard[] | null>(null);

  useEffect(() => {
    catalog({ pageSize: 60 }).then((r) => setItems(r.items)).catch(() => setItems([]));
  }, []);

  // Transcripts/media: anything carrying a media_type or a duration, or whose
  // type reads like a call/transcript.
  const calls = useMemo(
    () =>
      (items || []).filter(
        (c) =>
          c.durationMinutes != null ||
          (c.mediaType && c.mediaType !== 'text') ||
          /call|transcript|podcast|webinar|audio|video/i.test(c.docType)
      ),
    [items]
  );

  return (
    <div className="space-y-6">
      <PageHeader icon={surface.icon} title="Calls & Media">
        Every transcribed call in the corpus is scored and searchable — resolution, compliance and themes across
        whole conversations, not a hand-sampled few.
      </PageHeader>

      {items === null ? (
        <Spinner label="Loading calls…" />
      ) : calls.length === 0 ? (
        <SurfaceNotice
          title="Call & Media Analytics"
          bullets={['Transcribe & index every call', 'Score compliance & resolution', 'Surface themes & objections', 'Ask across all conversations']}
        >
          This corpus has no media resources yet. Ingest transcripts with a <code className="font-mono">media_type</code> and
          <code className="font-mono"> duration_minutes</code> and they will appear here.
        </SurfaceNotice>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <CitedMetric label="Conversations" value={String(calls.length)} source="media resources in the corpus" />
            <CitedMetric
              label="Total minutes"
              value={String(calls.reduce((s, c) => s + (c.durationMinutes || 0), 0))}
              source="sum of resource durations"
            />
            <CitedMetric label="Distinct topics" value={String(new Set(calls.map((c) => c.docType)).size)} source="call/media doc types" />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {calls.map((c) => (
              <ClickableCard key={c.id} ariaLabel={`Open ${c.title}`} onClick={() => navigate(`/r/${c.id}`)} className="hover:-translate-y-0.5">
                <Card className="card-hover h-full transition hover:shadow-md">
                  <CardBody className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: 'var(--brand-soft)', color: 'var(--brand)' }}>
                        <Phone size={15} />
                      </span>
                      <Chip text={c.docType} size="small" fillMode="outline" rounded="full" />
                      {c.durationMinutes != null && (
                        <span className="ml-auto inline-flex items-center gap-1 text-xs text-ink-500"><Clock size={11} /> {c.durationMinutes}m</span>
                      )}
                    </div>
                    <p className="mt-2 line-clamp-1 font-semibold text-ink-900 dark:text-ink-100">{c.title}</p>
                    {c.summary && <p className="mt-1 line-clamp-2 text-sm text-ink-500">{c.summary}</p>}
                    <span className="mt-2 inline-flex items-center gap-1 text-xs" style={{ color: 'var(--brand)' }}>
                      <PlayCircle size={13} /> Open transcript
                    </span>
                  </CardBody>
                </Card>
              </ClickableCard>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
