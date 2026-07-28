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
import { ResourceDetail } from './pages/ResourceDetail';
import { loadComposition } from './palette/compose';
import { GroupedNav } from './components/GroupedNav';
import { GuidedTour } from './components/GuidedTour';
import { GuidedTourLauncher } from './components/GuidedTourLauncher';
import { StatusChip } from './components/StatusChip';
import { DisclaimerBanner, DisclaimerFooter } from './components/Disclaimer';
import { AmbientBackground } from './components/AmbientBackground';
import { BrandMark } from './components/BrandMark';
import { MobileNav } from './components/MobileNav';
import { useIsDesktop } from './lib/useMediaQuery';

export default function App() {
  const [config, setConfig] = useState<DemoConfig | null>(null);
  const [dark, setDark] = useState<boolean>(() => document.documentElement.classList.contains('dark'));
  const [tourOpen, setTourOpen] = useState(false);
  const isDesktop = useIsDesktop();

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
  // If the demo painted its own experience, use it; otherwise the config shell.
  const composition = loadComposition();

  // A bespoke Shell owns the ENTIRE experience — nav, layout, IA, routes — so the
  // demo is structurally unique, not a recoloured clone of the stock shell. Only
  // the universal frame (synthetic-data disclaimer + footer) and the applied theme
  // wrap it. This is the default way to paint a real demo.
  if (composition?.Shell) {
    const Shell = composition.Shell;
    return (
      <div className="flex min-h-full flex-col">
        <DisclaimerBanner text={config.safety?.disclaimer || ''} />
        <div className="flex-1">
          <Shell config={config} surfaces={surfaces} />
        </div>
        <DisclaimerFooter text={config.safety?.disclaimer || ''} brand={config.theme.brandName} />
        {/* Universal-frame guarantee: EVERY build ships the guided tour, even a
            bespoke Shell that didn't wire one. Floating launcher + tour; renders
            nothing without a demoScript (every build should generate one). */}
        <GuidedTourLauncher config={config} surfaces={surfaces} />
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col">
      <AmbientBackground dark={dark} />
      <DisclaimerBanner text={config.safety?.disclaimer || ''} />

      <header className="glass sticky top-0 z-30 border-b">
        <AppBar
          positionMode="static"
          className="mx-auto h-16 max-w-7xl bg-transparent px-4 sm:px-6"
          style={{ overflow: 'visible' }}
        >
          <AppBarSection>
            <Brand config={config} />
          </AppBarSection>

          {/* Desktop: grouped dropdown nav in the bar. Mobile: a hamburger sheet
              (below). We switch on a JS media-query, not CSS `hidden`/`lg:flex`,
              because Kendo's unlayered stylesheet overrides Tailwind display
              utilities on `AppBarSection`. */}
          {isDesktop && (
            <AppBarSection className="ml-4">
              <GroupedNav surfaces={surfaces} />
            </AppBarSection>
          )}

          <AppBarSpacer />

          <AppBarSection className="flex items-center gap-2">
            <span className="hidden xl:block">
              <StatusChip />
            </span>
            {hasTour && (
              <Button themeColor="primary" onClick={() => setTourOpen(true)} startIcon={<Play size={15} />}>
                <span className="hidden sm:inline">Guided tour</span>
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
            {!isDesktop && <MobileNav surfaces={surfaces} />}
          </AppBarSection>
        </AppBar>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
        {surfaces.length === 0 ? (
          <NoSurfaces />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                composition?.Home ? (
                  <composition.Home config={config} surfaces={surfaces} onStartTour={() => setTourOpen(true)} />
                ) : (
                  <OverviewSurface config={config} surfaces={surfaces} onStartTour={() => setTourOpen(true)} />
                )
              }
            />
            {/* Bespoke painted pages the demo composed from the palette. */}
            {composition?.routes?.map((r) => (
              <Route key={r.path} path={r.path} element={<r.Component config={config} surfaces={surfaces} />} />
            ))}
            {surfaces.map((s) => {
              const Component = SURFACES[s.component];
              return <Route key={s.route} path={s.route} element={<Component surface={s} config={config} />} />;
            })}
            {/* The YouTube-style watch/detail page — reachable from any resource
                click; rendered inside the shell so nav + atmosphere stay. */}
            <Route path="/r/:id" element={<ResourceDetail config={config} />} />
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

// A product descriptor under the wordmark — the product's own identity, not the
// vendor tech category. Derived from the title (e.g. "Meridian — Matter
// Intelligence" → "Matter Intelligence"), never "Agentic RAG platform".
function brandDescriptor(config: DemoConfig): string {
  const brand = config.theme.brandName || '';
  const title = (config.title || '').trim();
  const descriptor = title.replace(brand, '').replace(/^[\s—–·:|-]+/, '').trim();
  return descriptor || 'Knowledge workspace';
}

function Brand({ config }: { config: DemoConfig }) {
  return (
    <NavLink to="/" className="flex items-center gap-2.5">
      <BrandMark size={38} />
      <div className="leading-tight">
        <p className="font-display text-base font-semibold text-ink-900 dark:text-ink-50">
          {config.theme.brandName}
        </p>
        <p className="text-[11px] text-ink-400">{brandDescriptor(config)}</p>
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
