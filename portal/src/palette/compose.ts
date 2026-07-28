import type { ComponentType } from 'react';
import type { DemoConfig, Surface } from '../lib/config';

// ─────────────────────────────────────────────────────────────────────────────
// Composition seam — how the artist paints instead of filling a template.
//
// By default the portal renders the config-driven shell (a reliable "quick
// sketch": theme + enabled surfaces from demo.config.json). But a demo can PAINT
// its own experience: drop a `portal/src/demo/composition.tsx` that exports
// `composition`, and the shell hands it the home page and any bespoke routes it
// wants — composed from the palette. No demo file → nothing changes.
//
//   // portal/src/demo/composition.tsx
//   import { useAsk, GroundedAnswer, Hero, Section, CitedMetric } from '../palette';
//   export const composition: DemoComposition = {
//     Home: ({ config }) => ( … a landing you designed, painted from the palette … ),
//     routes: [{ path: '/briefings', Component: ({ config }) => ( … ) }],
//   };
// ─────────────────────────────────────────────────────────────────────────────

export interface CompositionContext {
  config: DemoConfig;
  surfaces: Surface[];
}

export interface DemoComposition {
  /**
   * FULL bespoke app shell — the demo owns its own navigation, layout, information
   * architecture and routes. When present it REPLACES the config-driven shell
   * entirely (no default AppBar / Converse-Explore-Analyze-Extend nav), so the demo
   * is structurally unique rather than a recoloured clone. It renders inside the
   * universal frame (synthetic-data disclaimer + footer + applied theme) and owns
   * everything else — including its own `<Routes>`. Mount the palette's
   * `<ResourceDetail>` at `/r/:id` if you want the record watch page.
   * THIS is the default way to paint a real demo; `Home`/`routes` below are the
   * lighter option that reuses the stock shell.
   */
  Shell?: ComponentType<CompositionContext>;
  /** A bespoke landing inside the DEFAULT shell. Ignored when `Shell` is set. */
  Home?: ComponentType<CompositionContext & { onStartTour: () => void }>;
  /** Extra painted pages mounted inside the DEFAULT shell. Ignored when `Shell` is set. */
  routes?: { path: string; Component: ComponentType<CompositionContext> }[];
}

/**
 * Absent-safe: returns the demo's composition if it painted one, else null.
 * `import.meta.glob` yields `{}` when the file doesn't exist, so a stock build
 * (no demo/composition.tsx) behaves exactly as before.
 */
export function loadComposition(): DemoComposition | null {
  const mods = import.meta.glob('../demo/composition.tsx', { eager: true }) as Record<
    string,
    { composition?: DemoComposition }
  >;
  return Object.values(mods)[0]?.composition ?? null;
}
