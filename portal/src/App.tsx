import { useEffect, useMemo, useState } from 'react';
import { NavLink, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { AppBar, AppBarSection, AppBarSpacer } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
import { Loader } from '@progress/kendo-react-indicators';
import { loadConfig, type DemoConfig } from './lib/config';
import { applyTheme, initColorScheme, setColorScheme } from './lib/theme';
import { surfaceIcon } from './lib/icons';
import { SURFACES } from './pages/registry';
import { StatusChip } from './components/StatusChip';
import { DemoScriptPanel } from './components/DemoScriptPanel';
import { DisclaimerBanner, DisclaimerFooter } from './components/Disclaimer';

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
      <div className="flex h-full items-center justify-center gap-3 text-sm text-ink-500">
        <Loader type="pulsing" themeColor="primary" />
        Loading portal…
      </div>
    );
  }

  const surfaces = config.surfaces.filter((s) => SURFACES[s.component]);
  const home = surfaces[0]?.route || '/ask';

  return (
    <div className="flex min-h-full flex-col">
      <DisclaimerBanner text={config.safety?.disclaimer || ''} />

      <header className="sticky top-0 z-30 border-b border-ink-200 bg-ink-50/85 backdrop-blur dark:border-ink-800 dark:bg-ink-950/85">
        <AppBar positionMode="static" className="mx-auto h-16 max-w-6xl bg-transparent px-4 sm:px-6">
          <AppBarSection>
            <Brand config={config} home={home} />
          </AppBarSection>

          <AppBarSection className="ml-2 hidden md:flex">
            <SurfaceNav surfaces={surfaces} />
          </AppBarSection>

          <AppBarSpacer />

          <AppBarSection className="flex items-center gap-2">
            <StatusChip />
            <DemoScriptPanel steps={config.demoScript || []} />
            <Button
              fillMode="outline"
              onClick={toggleDark}
              aria-label="Toggle colour scheme"
              title="Toggle colour scheme"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </Button>
          </AppBarSection>
        </AppBar>

        {/* Mobile nav */}
        <nav className="scroll-slim flex gap-1 overflow-x-auto border-t border-ink-200 px-3 py-2 md:hidden dark:border-ink-800">
          <SurfaceNav surfaces={surfaces} mobile />
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

/** Config-driven surface nav rendered as togglable Kendo Buttons. */
function SurfaceNav({ surfaces, mobile }: { surfaces: DemoConfig['surfaces']; mobile?: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      {surfaces.map((s) => {
        const Icon = surfaceIcon(s.icon);
        const active = location.pathname === s.route;
        return (
          <Button
            key={s.route}
            togglable
            selected={active}
            fillMode="flat"
            onClick={() => navigate(s.route)}
            className={mobile ? 'shrink-0' : undefined}
            style={active ? { background: 'var(--brand-soft)', color: 'var(--brand-strong)' } : undefined}
            startIcon={<Icon size={15} />}
          >
            {s.label}
          </Button>
        );
      })}
    </>
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
