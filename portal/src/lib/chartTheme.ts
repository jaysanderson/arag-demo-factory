// Resolves the demo's theme tokens into concrete colours for KendoReact Charts.
// Kendo renders charts to SVG/canvas, where CSS var() / color-mix() don't
// resolve, so we read the computed --brand / --accent (written by theme.ts) and
// hand the charts real hex/rgb values. Reading at render keeps a re-skin cheap
// and correct — --brand is identical in light and dark, so no theme listener
// is needed. Series stay on-brand instead of hardcoded chart-library colours.

export interface ChartPalette {
  brand: string;
  accent: string;
  track: string;
}

export function chartPalette(): ChartPalette {
  if (typeof window === 'undefined') {
    return { brand: '#22d3ee', accent: '#f59e0b', track: 'rgba(148,163,184,0.35)' };
  }
  const css = getComputedStyle(document.documentElement);
  const brand = css.getPropertyValue('--brand').trim() || '#22d3ee';
  const accent = css.getPropertyValue('--accent').trim() || '#f59e0b';
  const track = css.getPropertyValue('--hairline-strong').trim() || 'rgba(148,163,184,0.35)';
  return { brand, accent, track };
}
