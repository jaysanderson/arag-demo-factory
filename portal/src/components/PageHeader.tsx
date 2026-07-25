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
    <div className="mb-6 flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        <span
          className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{ background: 'var(--brand-soft)', color: 'var(--brand)' }}
        >
          <Icon size={20} />
        </span>
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-ink-50">{title}</h1>
          {children && <p className="mt-1 max-w-2xl text-sm text-ink-500">{children}</p>}
        </div>
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
}
