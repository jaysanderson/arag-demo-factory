// Small presentation helpers shared across surfaces. No ARAG calls here — just
// string/format tidying so titles, hostnames and gradient fallbacks look right.

/** Turn a raw resource title/filename into something readable. */
export function cleanTitle(t: string): string {
  return String(t || '')
    .replace(/\.(pdf|docx?|html?|txt|md|pptx?|csv|json)$/i, '')
    .replace(/[_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim() || 'Untitled';
}

/** Hostname of a URL, without the leading www. — empty string if not a URL. */
export function safeHost(u?: string | null): string {
  if (!u) return '';
  try {
    return new URL(u).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

/**
 * Deterministic, on-brand gradient seeded from a string. Every source gets a
 * distinct hero backdrop, but all of them stay within the demo's own palette
 * (brand → accent) so the walk feels designed rather than random.
 */
export function gradientFor(seed: string): string {
  let h = 0;
  for (let i = 0; i < (seed || '').length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const angle = 120 + (h % 90);
  const mix = 28 + (h % 34); // 28–62% accent blend
  return `linear-gradient(${angle}deg, var(--brand-strong), color-mix(in srgb, var(--brand) ${mix}%, var(--accent)))`;
}
