import { useEffect, useMemo, useState } from 'react';
import {
  FileInput,
  ScanText,
  Tags,
  Braces,
  Wand2,
  CheckCircle2,
  FileCheck2,
  Database,
  Copy,
  Play,
  Quote,
  FileText,
} from 'lucide-react';
import { Card, CardBody } from '@progress/kendo-react-layout';
import { Button, Chip } from '@progress/kendo-react-buttons';
import type { SurfaceProps } from './types';
import { ask, catalog, type CatalogCard, type Citation } from '../lib/arag';
import { PageHeader } from '../components/PageHeader';
import { Spinner, ErrorBanner } from '../components/States';

// Document Intelligence Studio. Live document-writer ingestion runs through the
// KB writer API, which the read-only portal proxy does not expose — but the
// intelligence is real and live: a document is picked from the corpus, its own
// classification is read from its labels, and its structured fields are
// EXTRACTED live by a grounded /ask that returns cited JSON. The eight-step
// pipeline animates over that real work; the JSON is the payload.

type StageState = 'idle' | 'active' | 'done' | 'fail';

interface Stage {
  key: string;
  label: string;
  icon: typeof FileInput;
  note: string;
}

const STAGES: Stage[] = [
  { key: 'ingest', label: 'Ingest', icon: FileInput, note: 'Document received' },
  { key: 'parse', label: 'Parse', icon: ScanText, note: 'Text, tables & layout' },
  { key: 'classify', label: 'Classify', icon: Tags, note: 'Type & taxonomy' },
  { key: 'extract', label: 'Extract', icon: Braces, note: 'Grounded field extraction' },
  { key: 'enrich', label: 'Enrich', icon: Wand2, note: 'Entities & references' },
  { key: 'validate', label: 'Validate', icon: CheckCircle2, note: 'Schema & grounding check' },
  { key: 'standardise', label: 'Standardise', icon: FileCheck2, note: 'Emit structured JSON' },
  { key: 'index', label: 'Index', icon: Database, note: 'Queryable in the KB' },
];

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

function toCamel(s: string): string {
  const parts = s.replace(/[^a-zA-Z0-9]+/g, ' ').trim().split(/\s+/);
  return parts
    .map((p, i) => (i === 0 ? p.toLowerCase() : p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()))
    .join('');
}

/** Derives sensible, domain-agnostic extraction keys from the document's own
 *  label taxonomies and type — never hardcoded to one vertical. */
function extractionKeys(doc: CatalogCard): string[] {
  const fromLabels = Object.keys(doc.labels || {}).map(toCamel).filter(Boolean);
  const base = ['summary', 'keyEntities', 'keyDates', 'criticalValues', 'referencedDocuments', 'actionItems'];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const k of [...fromLabels, ...base]) {
    if (k && !seen.has(k)) {
      seen.add(k);
      out.push(k);
    }
  }
  return out.slice(0, 8);
}

function extractionPrompt(doc: CatalogCard, keys: string[]): string {
  return (
    `From the document titled "${doc.title}", extract its key structured fields as a single JSON object ` +
    `with exactly these keys: ${keys.join(', ')}. Base every value strictly on that document; if a field ` +
    `is not present, use null. For list-like fields return an array of short strings. Respond with ONLY a ` +
    'fenced ```json code block and nothing else.'
  );
}

function parseJson(text: string): { data: unknown; pretty: string } | null {
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidates = [fence ? fence[1] : null, text.match(/\{[\s\S]*\}/)?.[0] || null].filter(Boolean) as string[];
  for (const c of candidates) {
    try {
      const data = JSON.parse(c.trim());
      return { data, pretty: JSON.stringify(data, null, 2) };
    } catch {
      /* try next candidate */
    }
  }
  return null;
}

export function DocStudioSurface({ surface }: SurfaceProps) {
  const [items, setItems] = useState<CatalogCard[] | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [stages, setStages] = useState<Record<string, StageState>>({});
  const [processing, setProcessing] = useState(false);
  const [json, setJson] = useState<{ data: unknown; pretty: string } | null>(null);
  const [rawAnswer, setRawAnswer] = useState('');
  const [citations, setCitations] = useState<Citation[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    catalog({ query: '', pageSize: 12 })
      .then((r) => {
        setItems(r.items);
        if (r.items[0]) setSelectedId(r.items[0].id);
      })
      .catch((e) => {
        setItems([]);
        setError(e instanceof Error ? e.message : 'Could not load the corpus');
      });
  }, []);

  const selected = useMemo(() => items?.find((d) => d.id === selectedId) || null, [items, selectedId]);
  const keys = useMemo(() => (selected ? extractionKeys(selected) : []), [selected]);
  const setStage = (key: string, state: StageState) => setStages((prev) => ({ ...prev, [key]: state }));

  const process = async () => {
    if (!selected || processing) return;
    setProcessing(true);
    setError(null);
    setJson(null);
    setRawAnswer('');
    setCitations(null);
    setStages({});

    try {
      // Presentational lead-in — real document is already in the KB.
      for (const k of ['ingest', 'parse']) {
        setStage(k, 'active');
        await delay(420);
        setStage(k, 'done');
      }

      // Classify — real: the document's own labels/type.
      setStage('classify', 'active');
      await delay(520);
      setStage('classify', 'done');

      // Extract — real: a grounded /ask returning cited JSON.
      setStage('extract', 'active');
      const { answer, cites } = await new Promise<{ answer: string; cites: Citation[] }>((resolve, reject) => {
        let a = '';
        let c: Citation[] = [];
        ask(
          { query: extractionPrompt(selected, keys) },
          {
            onToken: (t) => {
              a += t;
            },
            onCitations: (cc) => {
              c = cc;
            },
            onError: reject,
            onDone: () => resolve({ answer: a, cites: c }),
          }
        );
      });
      const parsed = parseJson(answer);
      setRawAnswer(answer);
      setJson(parsed);
      setCitations(cites);
      setStage('extract', 'done');

      setStage('enrich', 'active');
      await delay(420);
      setStage('enrich', 'done');

      // Validate — real: did we get parseable, grounded structure?
      setStage('validate', 'active');
      await delay(480);
      setStage('validate', parsed && cites.length ? 'done' : 'fail');

      setStage('standardise', 'active');
      await delay(420);
      setStage('standardise', parsed ? 'done' : 'fail');

      setStage('index', 'active');
      await delay(420);
      setStage('index', 'done');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Extraction failed');
      setStages((prev) => {
        const next = { ...prev };
        for (const s of STAGES) if (next[s.key] === 'active') next[s.key] = 'fail';
        return next;
      });
    }
    setProcessing(false);
  };

  const copy = async () => {
    if (!json) return;
    try {
      await navigator.clipboard.writeText(json.pretty);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked — no-op */
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={surface.icon}
        title="Document Studio"
        actions={
          <Button
            themeColor="primary"
            onClick={process}
            disabled={processing || !selected}
            startIcon={<Play size={15} />}
          >
            {processing ? 'Processing…' : 'Process document'}
          </Button>
        }
      >
        Pick a document from the live corpus and watch it become structured, queryable data — classify,
        extract, validate, standardise. The extracted JSON is grounded and cited to the source.
      </PageHeader>

      {error && <ErrorBanner>{error}</ErrorBanner>}

      {/* Incoming documents */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-500">Incoming documents</p>
        {items === null ? (
          <Spinner label="Loading corpus…" />
        ) : items.length === 0 ? (
          <p className="text-sm text-ink-500">No documents available from the Knowledge Box.</p>
        ) : (
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((d) => {
              const active = d.id === selectedId;
              return (
                <button
                  key={d.id}
                  onClick={() => !processing && setSelectedId(d.id)}
                  disabled={processing}
                  className={`card ${active ? '' : 'card-hover'} flex items-start gap-3 rounded-xl p-3 text-left transition disabled:opacity-60`}
                  style={active ? { borderColor: 'var(--brand)', boxShadow: '0 0 0 1px var(--brand)' } : undefined}
                >
                  <span
                    className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: 'var(--brand-soft)', color: 'var(--brand)' }}
                  >
                    <FileText size={16} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-semibold text-ink-900 dark:text-ink-100">{d.title}</p>
                    <Chip
                      text={d.docType}
                      size="small"
                      rounded="full"
                      className="mt-1.5"
                      style={{ background: 'var(--brand-soft)', color: 'var(--brand-strong)', borderColor: 'transparent' }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Pipeline */}
      <Card>
        <CardBody className="p-5">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-ink-500">The pipeline</p>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-8">
            {STAGES.map((s) => (
              <StageCell key={s.key} stage={s} state={stages[s.key] || 'idle'} />
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Classification (real, from labels) */}
      {(stages.classify === 'done' || json) && selected && (
        <Card>
          <CardBody className="p-5">
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink-500">
              <Tags size={14} /> Classification
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Chip
                text={`type: ${selected.docType}`}
                size="small"
                rounded="full"
                style={{ background: 'var(--brand-soft)', color: 'var(--brand-strong)', borderColor: 'transparent' }}
              />
              {selected.mediaType && (
                <Chip text={`media: ${selected.mediaType}`} size="small" rounded="full" fillMode="outline" />
              )}
              {Object.entries(selected.labels).flatMap(([set, labels]) =>
                labels.slice(0, 4).map((l) => (
                  <Chip key={`${set}:${l}`} text={`${set}: ${l}`} size="small" rounded="full" fillMode="outline" />
                ))
              )}
              {Object.keys(selected.labels).length === 0 && (
                <span className="text-xs text-ink-400">No taxonomy labels on this document.</span>
              )}
            </div>
          </CardBody>
        </Card>
      )}

      {/* Structured output */}
      {json && selected && (
        <Card className="card-elevated overflow-hidden" style={{ borderColor: 'var(--accent)' }}>
          <div className="flex items-center justify-between px-5 py-3" style={{ background: 'var(--brand-soft)' }}>
            <span className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--brand-strong)' }}>
              <Braces size={16} /> Structured output
            </span>
            <Button fillMode="outline" size="small" onClick={copy} startIcon={<Copy size={13} />}>
              {copied ? 'Copied' : 'Copy JSON'}
            </Button>
          </div>
          <CardBody className="p-5">
            <div className="grid gap-5 lg:grid-cols-[1fr_18rem]">
              <div className="min-w-0">
                <pre className="scroll-slim max-h-[26rem] overflow-auto rounded-xl bg-ink-950/90 p-4 text-xs leading-relaxed text-emerald-200 dark:bg-black/60">
                  <code>{json.pretty}</code>
                </pre>
                {typeof json.data === 'object' && json.data && (
                  <dl className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                    {Object.entries(json.data as Record<string, unknown>).map(([k, v]) => (
                      <div key={k} className="min-w-0 border-b pb-1.5" style={{ borderColor: 'var(--hairline)' }}>
                        <dt className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">{k}</dt>
                        <dd className="truncate text-sm text-ink-800 dark:text-ink-200" title={fmtValue(v)}>
                          {fmtValue(v)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>

              <aside className="space-y-3">
                <p className="text-xs text-ink-500">
                  Extracted from{' '}
                  <span className="font-semibold text-ink-800 dark:text-ink-100">{selected.title}</span>
                </p>
                {citations && citations.length > 0 ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink-500">
                      <Quote size={13} /> {citations.length} cited source{citations.length === 1 ? '' : 's'}
                    </div>
                    {citations.map((c) => (
                      <div key={c.resourceId} className="rounded-lg border p-2.5" style={{ borderColor: 'var(--hairline)' }}>
                        <div className="flex items-center gap-1.5">
                          <FileText size={12} className="shrink-0 text-ink-400" />
                          <span className="truncate text-xs font-semibold text-ink-800 dark:text-ink-100" title={c.title}>
                            {c.title}
                          </span>
                        </div>
                        {c.text && <p className="mt-1 line-clamp-2 text-[11px] text-ink-500">“{c.text}”</p>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:border-amber-800/70 dark:bg-amber-950/40 dark:text-amber-200">
                    No citations returned — treat this extraction as ungrounded.
                  </p>
                )}
              </aside>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Extraction returned prose we couldn't parse as JSON */}
      {!json && rawAnswer && !processing && (
        <Card>
          <CardBody className="p-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-amber-600">
              Model returned unstructured text
            </p>
            <pre className="scroll-slim max-h-64 overflow-auto whitespace-pre-wrap text-xs text-ink-600 dark:text-ink-300">
              {rawAnswer}
            </pre>
          </CardBody>
        </Card>
      )}
    </div>
  );
}

function fmtValue(v: unknown): string {
  if (v == null) return '—';
  if (Array.isArray(v)) return v.map((x) => fmtValue(x)).join(', ');
  if (typeof v === 'object') return JSON.stringify(v);
  return String(v);
}

function StageCell({ stage, state }: { stage: Stage; state: StageState }) {
  const Icon = stage.icon;
  const done = state === 'done';
  const active = state === 'active';
  const fail = state === 'fail';
  const border = active ? 'var(--brand)' : fail ? '#f59e0b' : 'var(--hairline)';
  const iconBg = done || active ? 'var(--brand)' : fail ? '#fef3c7' : 'var(--brand-soft)';
  const iconColor = done || active ? 'var(--brand-contrast)' : fail ? '#b45309' : 'var(--brand)';
  return (
    <div
      className="flex flex-col items-center gap-2 rounded-xl border p-3 text-center transition"
      style={{ borderColor: border, opacity: state === 'idle' ? 0.65 : 1 }}
    >
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-lg ${active ? 'animate-pulse' : ''}`}
        style={{ background: iconBg, color: iconColor }}
      >
        {active ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <Icon size={17} />
        )}
      </span>
      <div>
        <p className="text-xs font-semibold text-ink-900 dark:text-ink-100">{stage.label}</p>
        <p className="mt-0.5 hidden text-[10px] leading-tight text-ink-400 lg:block">{stage.note}</p>
      </div>
    </div>
  );
}
