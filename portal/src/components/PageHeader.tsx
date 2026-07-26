import type { ReactNode } from 'react';
import { surfaceIcon } from '../lib/icons';

/** Consistent surface header — icon + title + one-line description. */
export function PageHeader({
  icon,
  title,
  children,
  actions,
}: {
  icon?: string | null;
  title: string;
  children?: ReactNode;
  actions?: ReactNode;
}) {
  const Icon = surfaceIcon(icon);
  return (
    <div className="reveal is-visible mb-7 flex items-start justify-between gap-4">
      <div className="flex items-start gap-3.5">
        <span
          className="ring-hairline mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: 'linear-gradient(160deg, color-mix(in srgb, var(--brand) 18%, transparent), color-mix(in srgb, var(--brand) 6%, transparent))',
            color: 'var(--brand)',
          }}
        >
          <Icon size={20} />
        </span>
        <div>
          <h1 className="font-display text-[1.7rem] font-semibold tracking-tight text-ink-900 dark:text-ink-50">
            {title}
          </h1>
          {children && <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-500">{children}</p>}
        </div>
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
}
