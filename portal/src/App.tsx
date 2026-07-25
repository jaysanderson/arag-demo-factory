import { useEffect, useMemo, useState } from 'react';
import { NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { loadConfig, type DemoConfig } from './lib/config';
import { applyTheme, initColorScheme, setColorScheme } from './lib/theme';
import { surfaceIcon } from './lib/icons';
import { SURFACES } from './pages/registry';
import { StatusChip } from './components/StatusChip';
import { DemoScriptPanel } from './components/DemoScriptPanel';
import { DisclaimerBanner, DisclaimerFooter } from './components/Disclaimer';
import { Spinner } from './components/States';

export default function App() {
  const [config, setConfig] = useState<DemoConfig | null>(null);
  const [dark, setDark] = useState<boolean>(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    loadConfig().then((cfg) => {
      setConfig(cfg);
      applyTheme(cfg.theme);
    });
    setDark(initColorScheme());
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    setColorScheme(next);
  };

  if (!config) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner label="Loading portal…" />
      </div>
    );
  }

  const surfaces = config.surfaces.filter((s) => SURFACES[s.component]);
  const home = surfaces[0]?.route || '/ask';

  return (
    <div className="flex min-h-full flex-col">
      <DisclaimerBanner text={config.safety?.disclaimer || ''} />

      <header className="sticky top-0 z-30 border-b border-ink-200 bg-ink-50/85 backdrop-blur dark:border-ink-800 dark:bg-ink-950/85">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
          <Brand config={config} home={home} />

          <nav className="ml-2 hidden items-center gap-1 md:flex">
            {surfaces.map((s) => {
              const Icon = surfaceIcon(s.icon);
              return (
                <NavLink
                  key={s.route}
                  to={s.route}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                      isActive
                        ? 'text-ink-900 dark:text-ink-50'
                        : 'text-ink-500 hover:bg-ink-100 hover:text-ink-800 dark:hover:bg-ink-800 dark:hover:text-ink-100'
                    }`
                  }
                  style={({ isActive }: { isActive: boolean }) =>
                    isActive ? { background: 'var(--brand-soft)', color: 'var(--brand-strong)' } : undefined
                  }
                >
                  <Icon size={15} />
                  {s.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <StatusChip />
            <DemoScriptPanel steps={config.demoScript || []} />
            <button
              onClick={toggleDark}
              className="rounded-lg border border-ink-200 bg-white p-2 text-ink-600 transition hover:bg-ink-50 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-300 dark:hover:bg-ink-800"
              aria-label="Toggle colour scheme"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <nav className="scroll-slim flex gap-1 overflow-x-auto border-t border-ink-200 px-3 py-2 md:hidden dark:border-ink-800">
          {surfaces.map((s) => {
            const Icon = surfaceIcon(s.icon);
            return (
              <NavLink
                key={s.route}
                to={s.route}
                className={({ isActive }) =>
                  `inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium ${
                    isActive ? 'text-ink-900 dark:text-ink-50' : 'text-ink-500'
                  }`
                }
                style={({ isActive }: { isActive: boolean }) =>
                  isActive ? { background: 'var(--brand-soft)', color: 'var(--brand-strong)' } : undefined
                }
              >
                <Icon size={15} />
                {s.label}
              </NavLink>
            );
          })}
        </nav>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        {surfaces.length === 0 ? (
          <NoSurfaces />
        ) : (
          <Routes>
            {surfaces.map((s) => {
              const Component = SURFACES[s.component];
              return <Route key={s.route} path={s.route} element={<Component surface={s} config={config} />} />;
            })}
            <Route path="*" element={<Navigate to={home} replace />} />
          </Routes>
        )}
      </main>

      <DisclaimerFooter text={config.safety?.disclaimer || ''} brand={config.theme.brandName} />
      <RouteTitle config={config} />
    </div>
  );
}

function Brand({ config, home }: { config: DemoConfig; home: string }) {
  return (
    <NavLink to={home} className="flex items-center gap-2.5">
      <span
        className="flex h-9 w-9 items-center justify-center rounded-xl font-display text-lg font-bold"
        style={{ background: 'var(--brand)', color: 'var(--brand-contrast)' }}
      >
        {config.theme.brandName?.[0] || 'A'}
      </span>
      <div className="leading-tight">
        <p className="font-display text-base font-semibold text-ink-900 dark:text-ink-50">
          {config.theme.brandName}
        </p>
        <p className="text-[11px] text-ink-400">Agentic RAG portal</p>
      </div>
    </NavLink>
  );
}

function NoSurfaces() {
  return (
    <div className="card px-6 py-16 text-center">
      <p className="font-display text-xl font-semibold text-ink-900 dark:text-ink-50">No surfaces enabled</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-ink-500">
        Add capabilities to <code className="font-mono">demo.config.json</code> and the shell will render them here — no
        code change required.
      </p>
    </div>
  );
}

// Keep the document title in sync with the active surface for nicer history.
function RouteTitle({ config }: { config: DemoConfig }) {
  const loc = useLocation();
  const label = useMemo(
    () => config.surfaces.find((s) => s.route === loc.pathname)?.label,
    [config.surfaces, loc.pathname]
  );
  useEffect(() => {
    document.title = label ? `${label} · ${config.theme.brandName}` : config.theme.brandName;
  }, [label, config.theme.brandName]);
  return null;
}
