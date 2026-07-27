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
  /** A bespoke, painted landing that replaces the default home. */
  Home?: ComponentType<CompositionContext & { onStartTour: () => void }>;
  /** Extra painted pages mounted inside the shell (path + a palette-composed component). */
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
