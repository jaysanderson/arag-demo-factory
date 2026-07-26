import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import type { Surface } from '../lib/config';
import { groupSurfaces, groupForRoute } from '../lib/nav';
import { surfaceIcon } from '../lib/icons';

/**
 * Elevated, grouped console nav. The 13 surfaces collapse into their four
 * capability areas (Converse / Explore / Analyze / Extend); each area is a
 * menu that reveals its surfaces with icon + tagline. Reads as organised, and
 * never clips no matter how many surfaces a flagship enables.
 */
export function GroupedNav({ surfaces }: { surfaces: Surface[] }) {
  const navigate = useNavigate();
  const location = useLocation();
  const groups = groupSurfaces(surfaces);
  const activeGroup = groupForRoute(surfaces, location.pathname);
  const [open, setOpen] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click and on route change.
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);
  useEffect(() => setOpen(null), [location.pathname]);

  const go = (route: string) => {
    setOpen(null);
    navigate(route);
  };

  return (
    <div ref={ref} className="flex flex-wrap items-center gap-1">
      {groups.map(({ group, intro, surfaces: items }) => {
        const isActive = activeGroup === group;
        const isOpen = open === group;
        return (
          <div key={group} className="relative shrink-0">
            <button
              onClick={() => setOpen(isOpen ? null : group)}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition"
              style={{
                color: isActive || isOpen ? 'var(--brand)' : undefined,
                background: isActive || isOpen ? 'var(--brand-soft)' : 'transparent',
              }}
              aria-expanded={isOpen}
            >
              {group}
              <ChevronDown
                size={14}
                className="transition-transform"
                style={{ transform: isOpen ? 'rotate(180deg)' : undefined }}
              />
            </button>

            {isOpen && (
              <div
                className="glass card-elevated absolute left-0 top-[calc(100%+10px)] z-50 w-80 overflow-hidden rounded-2xl p-1.5 shadow-xl"
                style={{ transformOrigin: 'top left' }}
              >
                {intro && (
                  <p className="px-3 py-2 text-xs leading-snug text-ink-500">{intro}</p>
                )}
                <div className="space-y-0.5">
                  {items.map((s) => {
                    const Icon = surfaceIcon(s.icon);
                    const current = location.pathname === s.route;
                    return (
                      <button
                        key={s.route}
                        onClick={() => go(s.route)}
                        className="group flex w-full items-start gap-3 rounded-lg px-3 py-2 text-left transition hover:bg-ink-100 dark:hover:bg-ink-800"
                        style={current ? { background: 'var(--brand-soft)' } : undefined}
                      >
                        <span
                          className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                          style={{ background: 'var(--brand-soft)', color: 'var(--brand)' }}
                        >
                          <Icon size={16} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-medium text-ink-900 dark:text-ink-100">
                            {s.label}
                          </span>
                          {s.tagline && (
                            <span className="mt-0.5 block text-xs leading-snug text-ink-500">
                              {s.tagline}
                            </span>
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
