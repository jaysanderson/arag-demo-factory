import { useEffect, useState } from 'react';

/**
 * Media-query hook driving responsive layout in JS rather than CSS.
 *
 * Why JS and not Tailwind's `lg:` classes: KendoReact ships an *unlayered*
 * stylesheet, which beats Tailwind's `@layer utilities` on the cascade — so
 * `hidden`/`lg:flex` on a Kendo `AppBarSection` (which Kendo styles
 * `display:flex`) never actually hides. Conditionally rendering off a JS
 * media-query sidesteps that entirely and is immune to Kendo's CSS.
 *
 * Testing/preview override: append `?vp=mobile` or `?vp=desktop` to the URL to
 * force a breakpoint (handy for previewing the mobile layout on a desktop, and
 * for automated checks in a fixed-viewport headless browser).
 */
export function useMediaQuery(query: string): boolean {
  const get = () => {
    if (typeof window === 'undefined') return false;
    const forced = forcedMatch(query);
    if (forced !== null) return forced;
    return window.matchMedia(query).matches;
  };
  const [matches, setMatches] = useState<boolean>(get);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(get);
    onChange();
    mql.addEventListener('change', onChange);
    window.addEventListener('resize', onChange);
    return () => {
      mql.removeEventListener('change', onChange);
      window.removeEventListener('resize', onChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return matches;
}

/** `true` at or above the `lg` breakpoint (1024px) — the desktop layout. */
export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)');
}

// Honour a ?vp=mobile / ?vp=desktop override for min-width queries.
function forcedMatch(query: string): boolean | null {
  try {
    const vp = new URLSearchParams(window.location.search).get('vp');
    if (vp !== 'mobile' && vp !== 'desktop') return null;
    const m = query.match(/min-width:\s*(\d+)/);
    if (!m) return null;
    // Pretend the viewport is 390px (mobile) or 1440px (desktop).
    const pretend = vp === 'mobile' ? 390 : 1440;
    return pretend >= Number(m[1]);
  } catch {
    return null;
  }
}
