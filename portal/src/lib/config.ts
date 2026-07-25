// The demo.config.json contract, typed. The shell renders itself entirely from
// this — adding or removing a surface is a config change, never a code change.
// The client copy is served by /api/config, already stripped of anything
// sensitive (no KB token, no zone/residency string).

export interface ThemeTokens {
  brandName: string;
  primary: string;
  accent: string;
  mood?: string;
  /** Default colour scheme for the demo ('dark' for cinematic blueprints). */
  scheme?: 'light' | 'dark';
}

export interface Surface {
  id: string;
  route: string;
  label: string;
  component: string; // must match a component name in src/pages
  icon?: string | null;
  capabilities?: string[];
  enabled: boolean;
}

export interface Safety {
  syntheticOnly: boolean;
  noRealBrands?: boolean;
  disclaimer: string;
}

export interface DemoStep {
  step: number;
  say: string;
  show?: string;
}

export interface DemoConfig {
  blueprint?: string;
  title: string;
  persona?: string | null;
  theme: ThemeTokens;
  surfaces: Surface[];
  safety: Safety;
  demoScript?: DemoStep[];
  provenance?: { demo?: string | null; reference?: string | null };
  generatedBy?: string;
}

const FALLBACK: DemoConfig = {
  title: 'Agentic RAG Portal',
  theme: { brandName: 'Agentic RAG', primary: '#14543F', accent: '#D9A441' },
  surfaces: [],
  safety: { syntheticOnly: true, disclaimer: 'Demonstration data — synthetic content for evaluation only.' },
};

/** Loads the runtime config from the server. Never throws — falls back safely. */
export async function loadConfig(): Promise<DemoConfig> {
  try {
    const res = await fetch('/api/config');
    if (!res.ok) throw new Error(String(res.status));
    const data = (await res.json()) as Partial<DemoConfig>;
    return {
      ...FALLBACK,
      ...data,
      theme: { ...FALLBACK.theme, ...(data.theme || {}) },
      safety: { ...FALLBACK.safety, ...(data.safety || {}) },
      surfaces: (data.surfaces || []).filter((s) => s.enabled !== false),
    } as DemoConfig;
  } catch {
    return FALLBACK;
  }
}
