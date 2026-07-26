import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, Play, Pause, FileText, Film, Sparkles, SendHorizontal,
  Square, Clock, ExternalLink, ListVideo, Volume2,
} from 'lucide-react';
import { Button, Chip } from '@progress/kendo-react-buttons';
import { Card, CardBody } from '@progress/kendo-react-layout';
import { Input } from '@progress/kendo-react-inputs';
import {
  getResource, catalog, graph, ask,
  type Citation, type CatalogCard,
} from '../lib/arag';
import type { DemoConfig } from '../lib/config';
import { renderMarkdown } from '../lib/markdown';
import { Citations } from '../components/Citations';
import { ClickableCard } from '../components/ClickableCard';
import { Spinner, ErrorBanner, TypingDots, UngroundedWarning } from '../components/States';

// ── shape a raw Nuclia resource into what the watch page renders ────────────────
// Kept deliberately generic: it derives doc type, media type, duration and chips
// from whatever labelsets / metadata the resource carries, so it works for any
// blueprint (space, legal, retail…) without hardcoding a corpus's field names.

interface Derived {
  title: string;
  summary: string;
  body: string;
  sourceUrl: string | null;
  docType: string;
  mediaType: string | null;
  durationMinutes: number | null;
  otherChips: string[];
  isMedia: boolean;
  labels: Record<string, string[]>;
}

function deriveResource(data: any): Derived {
  const extra = data?.extra?.metadata || {};
  const classifications: { labelset: string; label: string }[] = data?.usermetadata?.classifications || [];
  const labels: Record<string, string[]> = {};
  for (const { labelset, label } of classifications) (labels[labelset] ||= []).push(label);
  const firstLabel = (...names: string[]) => {
    for (const n of names) if (labels[n]?.length) return labels[n][0];
    return null;
  };

  const docType = firstLabel('doc_type', 'type') || extra.doc_type || 'Document';
  const mediaType = firstLabel('media_type') || extra.media_type || null;
  const durationMinutes = extra.duration_minutes ?? null;

  const bodies: string[] = [];
  for (const field of Object.values<any>(data?.data?.texts || {})) {
    if (field?.value?.body) bodies.push(field.value.body);
  }
  const body = (bodies.join('\n\n') || data?.summary || '').trim();

  // Every classification label becomes a chip, minus the one already shown as the
  // primary doc-type chip. Deduped, capped, generic across corpora.
  const seen = new Set<string>([docType.toLowerCase()]);
  const otherChips: string[] = [];
  for (const { label } of classifications) {
    const key = label.toLowerCase();
    if (!label || seen.has(key)) continue;
    seen.add(key);
    otherChips.push(label);
  }

  const isMedia =
    (!!mediaType && /audio|video/i.test(mediaType)) ||
    /voice|video|podcast|call|webinar|audio|episode|recording|interview/i.test(docType);

  return {
    title: data?.title || 'Untitled',
    summary: data?.summary || '',
    body,
    sourceUrl: data?.origin?.url || extra.source_url || null,
    docType,
    mediaType,
    durationMinutes,
    otherChips: otherChips.slice(0, 8),
    isMedia,
    labels,
  };
}

/** Split a transcript body into speaker-labelled lines where present. */
function parseTranscript(body: string): { speaker: string | null; text: string }[] {
  return body
    .split(/\n+/)
    .map((line) => {
      const m = line.match(/^\s*([A-Z][\w .'’&/-]{1,40}):\s+(.*)$/);
      return m ? { speaker: m[1].trim(), text: m[2].trim() } : { speaker: null, text: line.trim() };
    })
    .filter((l) => l.text);
}

function fmtClock(totalMinutes: number | null, fraction = 1): string {
  if (totalMinutes == null) return '';
  const totalSec = Math.round(totalMinutes * 60 * fraction);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function ResourceDetail({ config }: { config: DemoConfig }) {
  const { id = '' } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let live = true;
    setLoading(true);
    setError(null);
    setData(null);
    getResource(id)
      .then((d) => { if (live) setData(d); })
      .catch((e) => { if (live) setError(e.message); })
      .finally(() => { if (live) setLoading(false); });
    return () => { live = false; };
  }, [id]);

  const r = useMemo(() => (data ? deriveResource(data) : null), [data]);

  useEffect(() => {
    if (r) document.title = `${r.title} · ${config?.theme?.brandName || 'Portal'}`;
  }, [r, config]);

  const goBack = () => (window.history.length > 1 ? navigate(-1) : navigate('/'));

  return (
    <div className="reveal is-visible">
      <Button fillMode="flat" onClick={goBack} startIcon={<ArrowLeft size={16} />} className="mb-5 -ml-2">
        Back
      </Button>

      {loading && <Spinner label="Loading resource…" />}
      {error && <ErrorBanner>{error}</ErrorBanner>}

      {r && (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <MainColumn resource={r} id={id} navigate={navigate} />
          <UpNextRail seedId={id} seedTitle={r.title} labels={r.labels} navigate={navigate} />
        </div>
      )}
    </div>
  );
}

// ── main column ("the player") ─────────────────────────────────────────────────

function MainColumn({
  resource,
  id,
  navigate,
}: {
  resource: Derived;
  id: string;
  navigate: (to: string) => void;
}) {
  return (
    <div className="min-w-0 space-y-6">
      {resource.isMedia ? (
        <MediaPlayer title={resource.title} durationMinutes={resource.durationMinutes} />
      ) : null}

      <header className="space-y-3">
        <h1 className="font-display text-[1.9rem] font-semibold leading-tight tracking-tight text-ink-900 dark:text-ink-50">
          {resource.title}
        </h1>
        <MetaChips resource={resource} />
        {resource.sourceUrl && (
          <a
            href={resource.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm hover:underline"
            style={{ color: 'var(--brand)' }}
          >
            <ExternalLink size={14} /> Open original source
          </a>
        )}
      </header>

      {resource.isMedia ? (
        <Transcript body={resource.body} />
      ) : (
        <Reader body={resource.body} summary={resource.summary} />
      )}

      <AskAboutThis title={resource.title} navigate={navigate} />
    </div>
  );
}

function MetaChips({ resource }: { resource: Derived }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Chip
        text={resource.docType}
        size="small"
        rounded="full"
        style={{ background: 'var(--brand-soft)', color: 'var(--brand-strong)', borderColor: 'transparent' }}
      />
      {resource.mediaType && !resource.otherChips.some((c) => c.toLowerCase() === resource.mediaType!.toLowerCase()) && (
        <Chip text={resource.mediaType} size="small" fillMode="outline" rounded="full" />
      )}
      {resource.durationMinutes != null && (
        <Chip text={`${resource.durationMinutes} min`} size="small" fillMode="outline" rounded="full" />
      )}
      {resource.otherChips.map((c) => (
        <Chip key={c} text={c} size="small" fillMode="outline" rounded="full" />
      ))}
    </div>
  );
}

// A cinematic, demo-only "player": it does not stream real media, but it reads
// like a real transport (play/pause, moving scrubber, elapsed / total time).
function MediaPlayer({ title, durationMinutes }: { title: string; durationMinutes: number | null }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0..100

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      setProgress((p) => {
        const next = p + 0.5;
        return next >= 100 ? 100 : next;
      });
    }, 120);
    return () => clearInterval(t);
  }, [playing]);

  useEffect(() => {
    if (progress >= 100) setPlaying(false);
  }, [progress]);

  return (
    <div
      className="ring-hairline relative overflow-hidden rounded-2xl"
      style={{
        aspectRatio: '16 / 9',
        background:
          'radial-gradient(120% 120% at 15% 10%, color-mix(in srgb, var(--brand) 60%, black) 0%, transparent 60%),' +
          'radial-gradient(120% 120% at 90% 20%, color-mix(in srgb, var(--accent) 45%, black) 0%, transparent 55%),' +
          'linear-gradient(160deg, color-mix(in srgb, var(--brand) 30%, #05050a), #05050a)',
      }}
    >
      <div className="bg-grid absolute inset-0 opacity-40" />

      {/* Centre play / pause */}
      <button
        type="button"
        onClick={() => setPlaying((p) => !p)}
        aria-label={playing ? 'Pause' : 'Play'}
        className="group absolute inset-0 z-10 flex items-center justify-center outline-none"
      >
        <span
          className="flex h-20 w-20 items-center justify-center rounded-full text-white shadow-2xl transition-transform duration-200 group-hover:scale-105 group-active:scale-95"
          style={{
            background: 'color-mix(in srgb, var(--brand) 78%, black)',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.18) inset, 0 24px 60px -20px color-mix(in srgb, var(--brand) 90%, transparent)',
          }}
        >
          {playing ? <Pause size={34} /> : <Play size={34} className="ml-1" />}
        </span>
      </button>

      {/* Transport bar */}
      <div className="absolute inset-x-0 bottom-0 z-10 space-y-2 bg-gradient-to-t from-black/70 to-transparent px-5 pb-4 pt-10">
        <div className="flex items-center gap-2 text-[13px] font-medium text-white/90">
          <Volume2 size={15} className="shrink-0" />
          <span className="truncate">{title}</span>
          {durationMinutes != null && (
            <span className="ml-auto shrink-0 tabular-nums text-white/70">
              {fmtClock(durationMinutes, progress / 100)} / {fmtClock(durationMinutes)}
            </span>
          )}
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full transition-[width] duration-150"
            style={{ width: `${progress}%`, background: 'linear-gradient(90deg, var(--brand-contrast), var(--accent))' }}
          />
        </div>
      </div>
    </div>
  );
}

function Transcript({ body }: { body: string }) {
  // The transcript body is markdown (bold speaker/timestamp labels, headings),
  // so render it through the same markdown pipeline as the reader rather than as
  // raw text — otherwise the `**`/`#` markers show literally.
  const html = useMemo(() => renderMarkdown(body), [body]);
  if (!body) return <EmptyBody />;
  return (
    <Card>
      <CardBody className="p-5 sm:p-6">
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--brand)' }}>
          <FileText size={14} /> Transcript
        </div>
        <article className="answer-prose max-w-prose" dangerouslySetInnerHTML={{ __html: html }} />
      </CardBody>
    </Card>
  );
}

function Reader({ body, summary }: { body: string; summary: string }) {
  const html = useMemo(() => renderMarkdown(body || summary), [body, summary]);
  if (!body && !summary) return <EmptyBody />;
  return (
    <Card>
      <CardBody className="p-6 sm:p-8">
        <article className="answer-prose max-w-prose" dangerouslySetInnerHTML={{ __html: html }} />
      </CardBody>
    </Card>
  );
}

function EmptyBody() {
  return (
    <Card>
      <CardBody className="p-6">
        <p className="text-sm text-ink-500">No text body available for this resource.</p>
      </CardBody>
    </Card>
  );
}

// ── "Ask about this" — grounded, streamed, cited, on the watch page ─────────────

function AskAboutThis({ title, navigate }: { title: string; navigate: (to: string) => void }) {
  const prefill = `About "${title}": summarise the key points`;
  const [query, setQuery] = useState(prefill);
  const [answer, setAnswer] = useState('');
  const [citations, setCitations] = useState<Citation[] | null>(null);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<null | (() => void)>(null);

  // Reset the prefill when navigating between resources.
  useEffect(() => {
    setQuery(prefill);
    setAnswer('');
    setCitations(null);
    setError(null);
    abortRef.current?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  const run = (q: string) => {
    const text = q.trim();
    if (!text || streaming) return;
    abortRef.current?.();
    setAnswer('');
    setCitations(null);
    setError(null);
    setStreaming(true);
    abortRef.current = ask(
      { query: text },
      {
        onToken: (t) => setAnswer((a) => a + t),
        onCitations: (c) => setCitations(c),
        onDone: () => setStreaming(false),
        onError: (e) => { setError(e.message); setStreaming(false); },
      }
    );
  };

  const done = !streaming && !!answer;
  const ungrounded = done && citations !== null && citations.length === 0;

  return (
    <Card>
      <CardBody className="p-5">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--brand)' }}>
          <Sparkles size={16} /> Ask about this
        </div>
        <form onSubmit={(e) => { e.preventDefault(); run(query); }} className="flex flex-col gap-2 sm:flex-row">
          <Input
            value={query}
            onChange={(e) => setQuery(String(e.value))}
            placeholder="Ask a grounded question about this resource…"
            className="flex-1"
          />
          {streaming ? (
            <Button type="button" fillMode="outline" onClick={() => abortRef.current?.()} startIcon={<Square size={15} />}>
              Stop
            </Button>
          ) : (
            <Button type="submit" themeColor="primary" disabled={!query.trim()} startIcon={<SendHorizontal size={16} />}>
              Ask
            </Button>
          )}
        </form>

        {error && <div className="mt-4"><ErrorBanner>{error}</ErrorBanner></div>}

        {(answer || streaming) && (
          <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_16rem]">
            <div>
              <div
                className="answer-prose"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(answer) }}
              />
              {streaming && <div className="mt-2"><TypingDots /></div>}
              {ungrounded && <div className="mt-4"><UngroundedWarning /></div>}
            </div>
            <aside>
              {citations && citations.length > 0 ? (
                <Citations citations={citations} onOpen={(rid) => navigate(`/r/${rid}`)} />
              ) : streaming ? (
                <p className="text-sm text-ink-400">Resolving sources…</p>
              ) : null}
            </aside>
          </div>
        )}
      </CardBody>
    </Card>
  );
}

// ── side rail ("Up next") ───────────────────────────────────────────────────────

type RelatedItem = CatalogCard & { via: string };

function UpNextRail({
  seedId,
  seedTitle,
  labels,
  navigate,
}: {
  seedId: string;
  seedTitle: string;
  labels: Record<string, string[]>;
  navigate: (to: string) => void;
}) {
  const [items, setItems] = useState<RelatedItem[] | null>(null);
  const labelsKey = JSON.stringify(labels);

  useEffect(() => {
    let live = true;
    setItems(null);

    (async () => {
      const seen = new Set<string>([seedId]);
      const out: RelatedItem[] = [];

      // "Up next" = other resources that share this one's classifications.
      // /catalog is a metadata query, so filtering by the doc's own labels
      // (subsystem, topic, doc type…) returns real neighbours — where a query
      // on the full title would only ever match the doc itself. Broad/among-all
      // labelsets like media_type are skipped so recommendations stay meaningful.
      const SKIP = new Set(['media_type', 'classification', 'state']);
      const PRIORITY = ['subsystem', 'topic', 'crop', 'crops', 'vertical', 'doc_type', 'type', 'mission_phase', 'season'];
      const entries = Object.entries(labels || {})
        .filter(([ls]) => !SKIP.has(ls))
        .sort((a, b) => {
          const ia = PRIORITY.indexOf(a[0]); const ib = PRIORITY.indexOf(b[0]);
          return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
        });

      for (const [labelset, labelList] of entries) {
        for (const label of labelList) {
          if (out.length >= 12) break;
          try {
            const c = await catalog({
              filters: [`/classification.labels/${labelset}/${label}`],
              pageSize: 8,
            });
            for (const item of c.items || []) {
              if (seen.has(item.id)) continue;
              seen.add(item.id);
              out.push({ ...item, via: label });
            }
          } catch { /* try the next label */ }
        }
        if (out.length >= 12) break;
      }

      if (live) setItems(out.slice(0, 12));
    })();

    return () => { live = false; };
  }, [seedId, labelsKey]);

  return (
    <aside className="space-y-3 lg:sticky lg:top-4 lg:self-start">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink-500">
        <ListVideo size={14} /> Up next
      </div>

      {items === null && <Spinner label="Finding related…" />}
      {items?.length === 0 && <p className="text-sm text-ink-400">No related resources found.</p>}

      <div className="space-y-2.5">
        {items?.map((c) => {
          const Icon = c.mediaType && /audio|video/i.test(c.mediaType) ? Film : FileText;
          return (
            <ClickableCard
              key={c.id}
              ariaLabel={`Open ${c.title}`}
              onClick={() => navigate(`/r/${c.id}`)}
              className="hover:-translate-y-0.5"
            >
              <Card className="card-hover h-full">
                <CardBody className="flex gap-3 p-3">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: 'var(--brand-soft)', color: 'var(--brand)' }}
                  >
                    <Icon size={18} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-semibold text-ink-900 dark:text-ink-100">{c.title}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                      <Chip text={c.docType} size="small" fillMode="outline" rounded="full" />
                      {c.durationMinutes != null && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-ink-400">
                          <Clock size={10} /> {c.durationMinutes}m
                        </span>
                      )}
                    </div>
                    {c.via !== 'Similar' && (
                      <p className="mt-1 truncate text-[11px] text-ink-400">shares “{c.via}”</p>
                    )}
                  </div>
                </CardBody>
              </Card>
            </ClickableCard>
          );
        })}
      </div>
    </aside>
  );
}
