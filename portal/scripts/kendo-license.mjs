// Activates the KendoReact license at build time so the generated demo shows NO
// "license key missing" banner in front of a customer. Progress owns Kendo, so a
// key exists — set KENDO_UI_LICENSE (env) or drop a telerik-license.txt at the
// portal root. Absent a key, the build still succeeds in trial mode (the banner
// shows) — we never fail a demo build over licensing.
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';

const hasEnv = !!(process.env.KENDO_UI_LICENSE || process.env.TELERIK_LICENSE);
const hasFile = existsSync('telerik-license.txt') || existsSync('kendo-ui-license.txt');

if (!hasEnv && !hasFile) {
  console.log('  [kendo] No license key found (KENDO_UI_LICENSE / telerik-license.txt).');
  console.log('  [kendo] Building in TRIAL mode — a license banner will show. Set the key to remove it.');
  process.exit(0);
}

try {
  execSync('npx --no-install kendo-ui-license activate', { stdio: 'inherit' });
  console.log('  [kendo] License activated — no banner in this build.');
} catch (e) {
  console.log('  [kendo] License activation failed; continuing in trial mode.', e.message);
}
