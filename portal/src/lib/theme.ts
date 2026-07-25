// Applies a demo's theme tokens as CSS variables, so one shell themes every
// demo. Tailwind's `brand`/`accent` colors resolve to these variables (see
// tailwind.config.js). We derive a small ramp (strong/soft/contrast) from the
// two source hexes rather than asking the config for six values.

import type { ThemeTokens } from './config';

function clamp(n: number) {
  return Math.max(0, Math.min(255, Math.round(n)));
}

function parseHex(hex: string): [number, number, number] {
  let h = hex.replace('#', '').trim();
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const n = parseInt(h || '000000', 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function toHex(r: number, g: number, b: number) {
  return `#${[r, g, b].map((v) => clamp(v).toString(16).padStart(2, '0')).join('')}`;
}

/** Mix a colour toward white (amount>0) or black (amount<0). */
function shade(hex: string, amount: number) {
  const [r, g, b] = parseHex(hex);
  const t = amount < 0 ? 0 : 255;
  const p = Math.abs(amount);
  return toHex(r + (t - r) * p, g + (t - g) * p, b + (t - b) * p);
}

/** Relative luminance → pick black or white text for legibility on a fill. */
function contrastText(hex: string) {
  const [r, g, b] = parseHex(hex).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  }) as [number, number, number];
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 0.45 ? '#141210' : '#FFFFFF';
}

export function applyTheme(theme: ThemeTokens) {
  const root = document.documentElement;
  const brand = theme.primary || '#14543F';
  const accent = theme.accent || '#D9A441';

  root.style.setProperty('--brand', brand);
  root.style.setProperty('--brand-strong', shade(brand, -0.22));
  root.style.setProperty('--brand-soft', shade(brand, 0.86));
  root.style.setProperty('--brand-softer', shade(brand, 0.93));
  root.style.setProperty('--brand-contrast', contrastText(brand));
  root.style.setProperty('--accent', accent);
  root.style.setProperty('--accent-strong', shade(accent, -0.2));
  root.style.setProperty('--accent-soft', shade(accent, 0.84));

  // Re-skin the whole KendoReact set per demo. The default theme derives every
  // hover/active/subtle/on-primary state from --kendo-color-primary via oklch()
  // relative colours, so setting the base primary is enough to repaint buttons,
  // chips, tabs, focus rings, charts and the rest in the demo's brand colour.
  root.style.setProperty('--kendo-color-primary', brand);
  root.style.setProperty('--kendo-color-primary-emphasis', accent);

  if (theme.brandName) document.title = theme.brandName;
}

const DARK_KEY = 'arag-portal-theme';

export function initColorScheme() {
  const stored = localStorage.getItem(DARK_KEY);
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  const dark = stored ? stored === 'dark' : !!prefersDark;
  document.documentElement.classList.toggle('dark', dark);
  return dark;
}

export function setColorScheme(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark);
  localStorage.setItem(DARK_KEY, dark ? 'dark' : 'light');
}
