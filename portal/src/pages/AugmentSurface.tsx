import { useEffect, useMemo, useState } from 'react';
import { Tags, Share2, MessageSquarePlus, FileText, Loader2 } from 'lucide-react';
import { Card, CardBody } from '@progress/kendo-react-layout';
import type { SurfaceProps } from './types';
import { catalog, type CatalogCard } from '../lib/arag';
import {
  augmentSource, augmentLabel, augmentGraph, augmentGenerate,
  type LabelHit, type EntityHit, type RelationHit, type QaPair,
} from '../lib/augment';
import { PageHeader } from '../components/PageHeader';
import { Pill } from '../components/Pill';
import { ErrorBanner } from '../components/States';

// Data-augmentation agents — the enrichment side of ARAG, live. Pick a document
// and watch the same models Nuclia's ingest-time augmentation agents use:
//   • Labeler   — classifies content into the KB's own taxonomy (predict/chat)
//   • Graph     — extracts entities (NER, predict/tokens) + relation triples
//   • Generator — writes synthetic Q&A grounded in the content (predict/chat)
// Nothing is invented: labels come from the corpus's real labelsets, entities
// from the text, answers from the document.

const ENTITY_LABEL: Record<string, string> = {
  PERSON: 'People', ORG: 'Organisations', PRODUCT: 'Products / assets', LOC: 'Places',
  GPE: 'Places', FAC: 'Facilities', DATE: 'Dates', TIME: 'Times', EVENT: 'Events',
  LAW: 'Rules / refs', NORP: 'Groups', MONEY: 'Amounts',
};

export function AugmentSurface({ surface }: SurfaceProps) {
  const [samples, setSamples] = useState<CatalogCard[]>([]);
  const [candidates, setCandidates] = useState<LabelHit[]>([]);
  const [source, setSource] = useState<{ title: string; text: string } | null>(null);
  const [extracting, setExtracting] = useState(false);
  const [labels, setLabels] = useState<LabelHit[] | null>(null);
  const [graph, setGraph] = useState<{ entities: EntityHit[]; relations: RelationHit[] } | null>(null);
  const [qa, setQa] = useState<QaPair[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    catalog({ query: '', pageSize: 6 }).then((r) => setSamples(r.items || [])).catch(() => {});
    catalog({ pageSize: 0 })
      .then((r) => {
        const c = Object.entries(r.facets).flatMap(([ls, arr]) =>
          (arr || []).slice(0, 6).map((f) => ({ labelset: ls, label: f.label }))
        );
        setCandidates(c);
      })
      .catch(() => {});
  }, []);

  const run = async (id: string, title: string) => {
    setError(null); setSource(null); setLabels(null); setGraph(null); setQa(null); setExtracting(true);
    try {
      const src = await augmentSource(id);
      setSource({ title: src.title || title, text: src.text });
      setExtracting(false);
      // Fire the three agents in parallel; each card fills as its call returns.
      augmentLabel(src.text, candidates).then((r) => setLabels(r.labels)).catch(() => setLabels([]));
      augmentGraph(src.text).then((r) => setGraph(r)).catch(() => setGraph({ entities: [], relations: [] }));
      augmentGenerate(src.text).then((r) => setQa(r.qa)).catch(() => setQa([]));
    } catch (e: any) {
      setExtracting(false);
      setError(e.message);
    }
  };

  const entityGroups = useMemo(() => {
    const g: Record<string, string[]> = {};
    for (const e of graph?.entities || []) (g[e.type] ||= []).push(e.text);
    return Object.entries(g).sort((a, b) => b[1].length - a[1].length);
  }, [graph]);

  return (
    <div className="space-y-6">
      <PageHeader icon={surface.icon} title="Augment">
        The enrichment side of ARAG. Pick a document and watch the augmentation agents run live —
        the Knowledge Box classifies it into its own taxonomy, extracts its entities and
        relationships, and generates grounded Q&amp;A. This is how the corpus builds itself at ingest.
      </PageHeader>

      {samples.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-ink-400">Run the agents on</span>
          {samples.map((s) => (
            <Pill key={s.id} text={s.title.length > 42 ? s.title.slice(0, 42) + '…' : s.title} title={s.title} onClick={() => run(s.id, s.title)} />
          ))}
        </div>
      )}

      {error && <ErrorBanner>{error}</ErrorBanner>}

      {(extracting || source) && (
        <Card>
          <CardBody className="p-4">
            <StepLabel icon={<FileText size={14} />} text="Extracted content" note="Nuclia default processing — layout-aware text + OCR" />
            {extracting ? (
              <Working label="Extracting…" />
            ) : (
              <>
                <p className="mt-1 text-sm font-semibold text-ink-900 dark:text-ink-100">{source!.title}</p>
                <p className="mt-2 max-h-32 overflow-y-auto scroll-slim whitespace-pre-wrap text-xs leading-relaxed text-ink-500">
                  {source!.text.slice(0, 900)}{source!.text.length > 900 ? '…' : ''}
                </p>
              </>
            )}
          </CardBody>
        </Card>
      )}

      {source && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Labeler */}
          <AgentCard icon={<Tags size={15} />} name="Labeler agent" sub="classifies into the KB taxonomy" loading={labels === null}>
            {labels && labels.length === 0 && <Empty>No labels applied.</Empty>}
            <div className="flex flex-wrap gap-1.5">
              {(labels || []).map((l, i) => (
                <span key={i} className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium"
                  style={{ background: 'var(--brand-soft)', color: 'var(--brand-strong)' }}>
                  <span className="opacity-60">{l.labelset}</span>{l.label}
                </span>
              ))}
            </div>
          </AgentCard>

          {/* Graph */}
          <AgentCard icon={<Share2 size={15} />} name="Graph agent" sub="entities + relationships (NER)" loading={graph === null}>
            {graph && entityGroups.length === 0 && <Empty>No entities found.</Empty>}
            <div className="space-y-2.5">
              {entityGroups.map(([type, ents]) => (
                <div key={type}>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-400">{ENTITY_LABEL[type] || type}</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {ents.slice(0, 8).map((e, i) => (
                      <span key={i} className="rounded-md border px-1.5 py-0.5 text-[11px] text-ink-700 dark:text-ink-200" style={{ borderColor: 'var(--hairline-strong)' }}>{e}</span>
                    ))}
                  </div>
                </div>
              ))}
              {(graph?.relations || []).length > 0 && (
                <div className="border-t pt-2" style={{ borderColor: 'var(--hairline)' }}>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-400">Relationships</p>
                  <ul className="mt-1 space-y-1">
                    {graph!.relations.map((r, i) => (
                      <li key={i} className="text-[11px] leading-snug text-ink-600 dark:text-ink-300">
                        <span className="font-medium text-ink-800 dark:text-ink-100">{r.s}</span>
                        <span className="mx-1" style={{ color: 'var(--brand)' }}>—{r.r}→</span>
                        <span className="font-medium text-ink-800 dark:text-ink-100">{r.o}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </AgentCard>

          {/* Generator */}
          <AgentCard icon={<MessageSquarePlus size={15} />} name="Generator agent" sub="synthetic Q&A, grounded" loading={qa === null}>
            {qa && qa.length === 0 && <Empty>No pairs generated.</Empty>}
            <ul className="space-y-2.5">
              {(qa || []).map((p, i) => (
                <li key={i} className="rounded-lg border p-2.5" style={{ borderColor: 'var(--hairline)' }}>
                  <p className="text-xs font-semibold text-ink-900 dark:text-ink-100">{p.q}</p>
                  {p.a && <p className="mt-1 text-[11px] leading-snug text-ink-500">{p.a}</p>}
                </li>
              ))}
            </ul>
          </AgentCard>
        </div>
      )}
    </div>
  );
}

function AgentCard({ icon, name, sub, loading, children }: { icon: React.ReactNode; name: string; sub: string; loading: boolean; children: React.ReactNode }) {
  return (
    <Card className="h-full">
      <CardBody className="p-4">
        <div className="mb-3 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: 'var(--brand-soft)', color: 'var(--brand)' }}>{icon}</span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-ink-900 dark:text-ink-100">{name}</p>
            <p className="text-[11px] text-ink-400">{sub}</p>
          </div>
        </div>
        {loading ? <Working label="Running…" /> : children}
      </CardBody>
    </Card>
  );
}

function StepLabel({ icon, text, note }: { icon: React.ReactNode; text: string; note?: string }) {
  return (
    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--brand)' }}>
      {icon} {text}
      {note && <span className="ml-1 font-normal normal-case tracking-normal text-ink-400">· {note}</span>}
    </div>
  );
}

function Working({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 py-2 text-xs text-ink-400">
      <Loader2 size={14} className="animate-spin" style={{ color: 'var(--brand)' }} /> {label}
    </div>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-ink-400">{children}</p>;
}
