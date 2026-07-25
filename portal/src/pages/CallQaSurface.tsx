import { useEffect, useMemo, useState } from 'react';
import { Phone, Clock, PlayCircle } from 'lucide-react';
import type { SurfaceProps } from './types';
import { catalog, type CatalogCard } from '../lib/arag';
import { PageHeader } from '../components/PageHeader';
import { DocumentDrawer } from '../components/DocumentDrawer';
import { SurfaceNotice } from '../components/SurfaceNotice';
import { Spinner } from '../components/States';

// Call & media analytics. Transcribed calls are just resources with a media_type
// and a duration — so QA that used to sample 2% now covers 100%. We surface the
// transcripts in the corpus and let a question run across them.
export function CallQaSurface({ surface }: SurfaceProps) {
  const [items, setItems] = useState<CatalogCard[] | null>(null);
  const [openDoc, setOpenDoc] = useState<string | null>(null);

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
        Every transcribed call scored and searchable — resolution, compliance and themes across 100% of conversations,
        not a 2% sample.
      </PageHeader>

      {items === null ? (
        <Spinner label="Loading calls…" />
      ) : calls.length === 0 ? (
        <SurfaceNotice
          title="Call & Media Analytics"
          sells="Every call auto-scored for compliance, first-call resolution and cross-sell — QA that used to sample 2% now covers 100%."
          bullets={['Transcribe & index every call', 'Score compliance & resolution', 'Surface themes & objections', 'Ask across all conversations']}
        >
          This corpus has no media resources yet. Ingest transcripts with a <code className="font-mono">media_type</code> and
          <code className="font-mono"> duration_minutes</code> and they will appear here.
        </SurfaceNotice>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Conversations" value={String(calls.length)} />
            <Stat label="Total minutes" value={String(calls.reduce((s, c) => s + (c.durationMinutes || 0), 0))} />
            <Stat label="Coverage" value="100%" />
            <Stat label="Sampled (old way)" value="2%" muted />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {calls.map((c) => (
              <button key={c.id} onClick={() => setOpenDoc(c.id)} className="card block p-4 text-left transition hover:shadow-md">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: 'var(--brand-soft)', color: 'var(--brand)' }}>
                    <Phone size={15} />
                  </span>
                  <span className="chip !px-1.5 text-[11px]">{c.docType}</span>
                  {c.durationMinutes != null && (
                    <span className="ml-auto chip !px-1.5 text-[11px]"><Clock size={10} /> {c.durationMinutes}m</span>
                  )}
                </div>
                <p className="mt-2 line-clamp-1 font-semibold text-ink-900 dark:text-ink-100">{c.title}</p>
                {c.summary && <p className="mt-1 line-clamp-2 text-sm text-ink-500">{c.summary}</p>}
                <span className="mt-2 inline-flex items-center gap-1 text-xs" style={{ color: 'var(--brand)' }}>
                  <PlayCircle size={13} /> Open transcript
                </span>
              </button>
            ))}
          </div>
        </>
      )}

      {openDoc && <DocumentDrawer id={openDoc} onClose={() => setOpenDoc(null)} />}
    </div>
  );
}

function Stat({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="card p-4">
      <p className={`font-display text-2xl font-semibold ${muted ? 'text-ink-400' : 'text-ink-900 dark:text-ink-50'}`}>{value}</p>
      <p className="mt-0.5 text-xs text-ink-500">{label}</p>
    </div>
  );
}
