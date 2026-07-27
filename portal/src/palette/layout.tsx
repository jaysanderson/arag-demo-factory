import type { ReactNode } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// The medium — unopinionated layout primitives.
//
// These are the canvas and brushes, not the picture: theme-token-driven wrappers
// the artist arranges into a bespoke information architecture. They impose no
// vertical, no fixed nav, no "app template" — only spacing, rhythm and surface.
// Colour comes from the demo's own brand/accent tokens (set per build), so the
// same primitives read completely differently from one demo to the next.
// ─────────────────────────────────────────────────────────────────────────────

/** A page section with an optional eyebrow + title + lede. */
export function Section({ eyebrow, title, lede, children }: {
  eyebrow?: string; title?: ReactNode; lede?: ReactNode; children?: ReactNode;
}) {
  return (
    <section className="space-y-4">
      {(eyebrow || title || lede) && (
        <header className="space-y-1">
          {eyebrow && <p className="text-eyebrow uppercase text-ink-400">{eyebrow}</p>}
          {title && <h2 className="font-display text-display text-ink-900 dark:text-ink-50">{title}</h2>}
          {lede && <p className="max-w-2xl text-ink-500">{lede}</p>}
        </header>
      )}
      {children}
    </section>
  );
}

/** A large editorial hero — the thesis of a page. Brand-gradient by default. */
export function Hero({ eyebrow, title, children, tone = 'brand' }: {
  eyebrow?: string; title: ReactNode; children?: ReactNode; tone?: 'brand' | 'plain';
}) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl p-8 sm:p-12"
      style={tone === 'brand'
        ? { background: 'linear-gradient(135deg, var(--brand-strong), color-mix(in srgb, var(--brand) 55%, var(--accent)))', color: 'var(--brand-contrast)' }
        : undefined}
    >
      {eyebrow && <p className="text-eyebrow uppercase opacity-80">{eyebrow}</p>}
      <h1 className="mt-2 font-display text-display-lg" style={{ textWrap: 'balance' }}>{title}</h1>
      {children && <div className="mt-4 max-w-2xl opacity-90">{children}</div>}
    </div>
  );
}

/** A plain surface card. */
export function Panel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`card p-5 ${className}`}>{children}</div>;
}

/** A responsive tile grid — pass the column count you want at the wide breakpoint. */
export function TileGrid({ cols = 3, children }: { cols?: 2 | 3 | 4; children: ReactNode }) {
  const lg = { 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4' }[cols];
  return <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${lg}`}>{children}</div>;
}
