import type { ReactNode } from 'react';
import { Card, CardBody } from '@progress/kendo-react-layout';

// ─────────────────────────────────────────────────────────────────────────────
// CitedMetric — the incorruptible metric pigment.
//
// A number on screen must come from the Knowledge Box, never from the author's
// imagination. So this pigment refuses to render a value without a `source`: the
// provenance of the figure (e.g. "8 resources in the corpus", "12/12 probes
// cited"). Passing a hardcoded marketing number here is awkward by design — and
// the groundedness lint (scripts/verify.mjs) flags bare numeric/percent literals
// in composed pages, so fabricated metrics fail the build rather than ship.
//
// Derive `value` from a KB response (a count, a ratio you computed from real
// results, a REMi/coverage score). If you cannot state its `source`, it does not
// belong on the page.
// ─────────────────────────────────────────────────────────────────────────────
export function CitedMetric({
  label,
  value,
  source,
  muted,
}: {
  label: string;
  /** The figure — must be derived from a Knowledge Box response, not invented. */
  value: ReactNode;
  /** Where the figure came from (required): its provenance in the KB. */
  source: string;
  muted?: boolean;
}) {
  return (
    <Card>
      <CardBody className="p-4">
        <p className={`font-display text-2xl font-semibold ${muted ? 'text-ink-400' : 'text-ink-900 dark:text-ink-50'}`}>
          {value}
        </p>
        <p className="mt-0.5 text-xs text-ink-500">{label}</p>
        <p className="mt-1 text-[10px] uppercase tracking-wide text-ink-400" title={source}>
          from {source}
        </p>
      </CardBody>
    </Card>
  );
}
