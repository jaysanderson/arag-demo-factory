import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import type { Surface } from '../lib/config';
import { groupSurfaces } from '../lib/nav';
import { surfaceIcon } from '../lib/icons';

/**
 * Mobile navigation: a hamburger button that opens a full-width sheet listing
 * every surface grouped by capability area. Built from plain elements + native
 * buttons (not Kendo) so Tailwind responsive/utility classes and click handlers
 * behave. Shown only below the `lg` breakpoint (the parent decides via JS).
 */
export function MobileNav({ surfaces }: { surfaces: Surface[] }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const groups = groupSurfaces(surfaces);

  // Close on route change and lock body scroll while open.
  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const go = (route: string) => { setOpen(false); navigate(route); };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-lg border transition"
        style={{ borderColor: 'var(--hairline)', color: 'var(--brand)' }}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            style={{ top: 0 }}
            onClick={() => setOpen(false)}
            aria-hidden
          />
          {/* Sheet */}
          <div className="glass card-elevated fixed inset-x-0 top-0 z-50 max-h-[100dvh] overflow-y-auto rounded-b-2xl p-3 pt-4 shadow-xl">
            <div className="mb-2 flex items-center justify-between px-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-ink-500">Menu</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-lg"
                style={{ color: 'var(--brand)' }}
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4 pb-2">
              {groups.map(({ group, surfaces: items }) => (
                <div key={group}>
                  <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-ink-400">{group}</p>
                  <div className="grid grid-cols-1 gap-1">
                    {items.map((s) => {
                      const Icon = surfaceIcon(s.icon);
                      const current = location.pathname === s.route;
                      return (
                        <button
                          key={s.route}
                          onClick={() => go(s.route)}
                          className="flex items-center gap-3 rounded-xl px-3 py-3 text-left transition active:scale-[0.99]"
                          style={current ? { background: 'var(--brand-soft)' } : undefined}
                        >
                          <span
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                            style={{ background: 'var(--brand-soft)', color: 'var(--brand)' }}
                          >
                            <Icon size={17} />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-[15px] font-medium text-ink-900 dark:text-ink-100">{s.label}</span>
                            {s.tagline && (
                              <span className="mt-0.5 block truncate text-xs text-ink-500">{s.tagline}</span>
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
