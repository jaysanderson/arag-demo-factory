// Activates the KendoReact license at build time so the generated demo shows NO
// "license key missing" banner in front of a customer. Progress owns Kendo, so a
// key exists — capture it ONCE at setup: set KENDO_UI_LICENSE in the factory
// `.env`, or drop a telerik-license.txt at the factory root / portal root.
// Absent a key, the build still succeeds in trial mode (the banner shows) — we
// never fail a demo build over licensing.
//
// No public npm: @progress/kendo-licensing is already installed (from HAR); this
// invokes its LOCAL bin directly and validates the key OFFLINE (no registry, no
// network). Runs from portal/ (cwd during `npm run build`/`dev`).
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const PORTAL = join(dirname(fileURLToPath(import.meta.url)), '..');
const ROOT = join(PORTAL, '..');

// Load KENDO_UI_LICENSE / TELERIK_LICENSE from the factory .env files (real env
// always wins) — the same one-time setup surface as the Nuclia values. The
// server loads .env itself; npm scripts don't, so mirror that loader here.
for (const envPath of [join(ROOT, '.env'), join(PORTAL, '.env')]) {
  if (!existsSync(envPath)) continue;
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^\s*(KENDO_UI_LICENSE|TELERIK_LICENSE)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

const hasEnv = !!(process.env.KENDO_UI_LICENSE || process.env.TELERIK_LICENSE);
const licenseFiles = ['telerik-license.txt', 'kendo-ui-license.txt'].flatMap((f) => [join(PORTAL, f), join(ROOT, f)]);
const hasFile = licenseFiles.some((f) => existsSync(f));

if (!hasEnv && !hasFile) {
  console.log('  [kendo] No license key found (KENDO_UI_LICENSE in .env, or telerik-license.txt).');
  console.log('  [kendo] Building in TRIAL mode — a license banner will show. Set the key to remove it.');
  process.exit(0);
}

// Invoke the locally-installed CLI directly — never the public registry.
const bin = join(PORTAL, 'node_modules', '@progress', 'kendo-licensing', 'bin', 'kendo-ui-license.js');
try {
  execFileSync(process.execPath, [bin, 'activate', '--ignore-no-license'], { stdio: 'inherit', cwd: PORTAL });
  console.log('  [kendo] License activated — no banner in this build.');
} catch (e) {
  console.log('  [kendo] License activation failed; continuing in trial mode.', e.message);
}
