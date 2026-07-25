import type { DemoConfig, Surface } from '../lib/config';

// Every surface component receives its own resolved surface descriptor plus the
// full demo config, so it can read its capabilities, icon, and the theme/persona.
export interface SurfaceProps {
  surface: Surface;
  config: DemoConfig;
}
