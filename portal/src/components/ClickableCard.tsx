import type { CSSProperties, ReactNode } from 'react';

// A reliable click target for a resource "card".
//
// KendoReact's <Card> does NOT forward `onClick` to the DOM, so relying on it
// silently drops every click. The fix is to make the click target a genuine
// native control: this wraps the Kendo Card visual in a real, keyboard-operable
// button role so the click always fires. Card stays presentation; this is the
// hit target.
export function ClickableCard({
  onClick,
  ariaLabel,
  className = '',
  style,
  children,
}: {
  onClick: () => void;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className={`cursor-pointer rounded-xl outline-none transition focus-visible:ring-2 ${className}`}
      style={{ ['--tw-ring-color' as string]: 'color-mix(in srgb, var(--brand) 55%, transparent)', ...style }}
    >
      {children}
    </div>
  );
}
