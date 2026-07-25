import { useEffect, useMemo, useState } from 'react';
import { NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Moon, Sun, Play } from 'lucide-react';
import { AppBar, AppBarSection, AppBarSpacer } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
import { Loader } from '@progress/kendo-react-indicators';
import { loadConfig, type DemoConfig } from './lib/config';
import { applyTheme, initColorScheme, setColorScheme } from './lib/theme';
import { SURFACES } from './pages/registry';
import { OverviewSurface } from './pages/OverviewSurface';
import { GroupedNav } from './components/GroupedNav';
import { GuidedTour } from './components/GuidedTour';
import { StatusChip } from './components/StatusChip';
import { DisclaimerBanner, DisclaimerFooter } from './components/Disclaimer';

export default function App() {
  const [config, setConfig] = useState<DemoConfig | null>(null);
  const [dark, setDark] = useState<boolean>(() => document.documentElement.classList.contains('dark'));
  const [tourOpen, setTourOpen] = useState(false);

  useEffect(() => {
    loadConfig().then((cfg) => {
      setConfig(cfg);
      applyTheme(cfg.theme);
      // Honour the demo's default scheme (cinematic blueprints default dark)
      // unless the visitor has already chosen one.
      setDark(initColorScheme(cfg.theme.scheme));
    });
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
  const hasTour = (config.demoScript?.length || 0) > 0;

  return (
    <div className="flex min-h-full flex-col">
      <DisclaimerBanner text={config.safety?.disclaimer || ''} />

      <header className="glass sticky top-0 z-30 border-b">
        <AppBar positionMode="static" className="mx-auto h-16 max-w-7xl bg-transparent px-4 sm:px-6">
          <AppBarSection>
            <Brand config={config} />
          </AppBarSection>

          {/* Grouped console nav lives in the bar itself on desktop. */}
          <AppBarSection className="ml-4 hidden lg:flex">
            <GroupedNav surfaces={surfaces} />
          </AppBarSection>

          <AppBarSpacer />

          <AppBarSection className="flex items-center gap-2">
            <span className="hidden xl:block">
              <StatusChip />
            </span>
            {hasTour && (
              <Button themeColor="primary" onClick={() => setTourOpen(true)} startIcon={<Play size={15} />}>
                <span className="hidden sm:inline">Guided demo</span>
              </Button>
            )}
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

        {/* On smaller screens the grouped nav gets its own full-width row so it
            never crowds the brand or actions. */}
        <div className="mx-auto max-w-7xl border-t px-3 py-1.5 lg:hidden" style={{ borderColor: 'var(--hairline)' }}>
          <GroupedNav surfaces={surfaces} />
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
        {surfaces.length === 0 ? (
          <NoSurfaces />
        ) : (
          <Routes>
            <Route
              path="/"
              element={<OverviewSurface config={config} surfaces={surfaces} onStartTour={() => setTourOpen(true)} />}
            />
            {surfaces.map((s) => {
              const Component = SURFACES[s.component];
              return <Route key={s.route} path={s.route} element={<Component surface={s} config={config} />} />;
            })}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </main>

      <DisclaimerFooter text={config.safety?.disclaimer || ''} brand={config.theme.brandName} />

      {hasTour && (
        <GuidedTour config={config} surfaces={surfaces} open={tourOpen} onClose={() => setTourOpen(false)} />
      )}

      <RouteTitle config={config} />
    </div>
  );
}

function Brand({ config }: { config: DemoConfig }) {
  return (
    <NavLink to="/" className="flex items-center gap-2.5">
      <span
        className="flex h-9 w-9 items-center justify-center rounded-xl font-display text-lg font-bold shadow-glow"
        style={{ background: 'var(--brand)', color: 'var(--brand-contrast)' }}
      >
        {config.theme.brandName?.[0] || 'A'}
      </span>
      <div className="leading-tight">
        <p className="font-display text-base font-semibold text-ink-900 dark:text-ink-50">
          {config.theme.brandName}
        </p>
        <p className="text-[11px] text-ink-400">Agentic RAG platform</p>
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
