// ═════════════════════════════════════════════════════════════════════════════
// THE PALETTE
//
// This is what the sales engineer paints with. Import from here to compose a
// bespoke demo: grounded data hooks (the pigments), guaranteed components that
// keep every claim truthful, and a layout medium (the canvas + brushes). The
// portfolio and catalog show the RANGE these can paint — never a template.
//
//   import { useAsk, GroundedAnswer, CitedMetric, Hero, Section } from '../palette';
//
// The guarantees live in the materials: GroundedAnswer cannot show an uncited
// claim; CitedMetric cannot show a number without KB provenance. Compose freely.
// See ./README.md and docs/PALETTE-ARCHITECTURE.md.
// ═════════════════════════════════════════════════════════════════════════════

// ── pigments: grounded data hooks ──
export {
  useAsk, useSearch, useCatalog, useGraph, useEntities, useHealth,
  type AskState, type Citation,
} from './hooks';

// ── guaranteed components (truthful by construction) ──
export { GroundedAnswer } from './GroundedAnswer';
export { CitedMetric } from './CitedMetric';
export { ConfidenceRing, matchColor } from '../components/journey/ConfidenceRing';
// The cinematic grounding walk, named for what it is when composing.
export { AnswerJourney as JourneyThroughContext } from '../components/journey/AnswerJourney';
export { Citations } from '../components/Citations';

// ── medium: layout primitives ──
export { Section, Hero, Panel, TileGrid } from './layout';

// ── responsive: gate shell breakpoints in JS, never CSS `lg:` on shell structure.
// Kendo's unlayered stylesheet beats Tailwind display utilities, and only these
// hooks honour the `?vp=mobile` preview override. A bespoke Shell MUST switch its
// sidebar/drawer on `useIsDesktop()` so it is testable and Kendo-immune.
export { useMediaQuery, useIsDesktop } from '../lib/useMediaQuery';

// ── shared building blocks (states, chrome) ──
export { Spinner, TypingDots, ErrorBanner, EmptyState, UngroundedWarning } from '../components/States';
export { PageHeader } from '../components/PageHeader';
export { Pill } from '../components/Pill';
export { ClickableCard } from '../components/ClickableCard';
export { StatusChip } from '../components/StatusChip';

// ── composition seam: paint bespoke pages instead of filling the template ──
export { loadComposition, type DemoComposition, type CompositionContext } from './compose';
// The record watch/detail page — mount at /r/:id inside a bespoke Shell's own <Routes>.
export { ResourceDetail } from '../pages/ResourceDetail';

// ── escape hatch: the raw grounded client, for capabilities without a hook yet ──
export * as arag from '../lib/arag';
export { buildStops, relate } from '../lib/journey';
