#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// create-kb.mjs — auto-provision a Nuclia Knowledge Box from an account key.
//
// The orchestrator runs this in Phase 1 when no KB is bound in .env but an
// account key IS present. It:
//   1. creates a fresh Knowledge Box (account management API — VERIFIED),
//   2. mints a KB service-account token (best-effort — needs an account PAT with
//      service-account permission),
//   3. writes NUCLIA_KB_URL / NUCLIA_KB_ID / NUCLIA_ZONE (+ NUCLIA_SERVICEACCOUNT
//      when the token was minted) back into .env.
//
// Reads from .env (or real env): NUCLIA_ACCOUNT, NUCLIA_ACCOUNT_TOKEN, NUCLIA_ZONE.
// Zero dependencies — Node 20+ (global fetch).
//
//   node scripts/create-kb.mjs --title "Meridian — Matter Intelligence" --slug meridian
// ─────────────────────────────────────────────────────────────────────────────

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ENV_PATH = join(ROOT, '.env');

// ── tiny .env reader/writer (no dotenv) ──────────────────────────────────────
function readEnv() {
  const env = { ...process.env };
  if (existsSync(ENV_PATH)) {
    for (const line of readFileSync(ENV_PATH, 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && env[m[1]] === undefined) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
  return env;
}
function writeEnvVars(vars) {
  let text = existsSync(ENV_PATH) ? readFileSync(ENV_PATH, 'utf8') : '';
  for (const [k, v] of Object.entries(vars)) {
    if (v == null || v === '') continue;
    const line = `${k}=${v}`;
    const re = new RegExp(`^${k}=.*$`, 'm');
    text = re.test(text) ? text.replace(re, line) : (text.replace(/\n?$/, '\n') + line + '\n');
  }
  writeFileSync(ENV_PATH, text);
}

function arg(name, def) {
  const i = process.argv.indexOf(name);
  return i > -1 ? process.argv[i + 1] : def;
}
const slugify = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40);
const fail = (m) => { console.error(`\n  ✗ ${m}\n`); process.exit(1); };

async function req(url, { token, method = 'GET', body, header = 'Authorization' } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  headers[header] = `Bearer ${token}`;
  const res = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const text = await res.text();
  let json; try { json = JSON.parse(text); } catch { json = text; }
  return { ok: res.ok, status: res.status, json };
}

async function main() {
  const env = readEnv();
  const account = env.NUCLIA_ACCOUNT;
  const token = env.NUCLIA_ACCOUNT_TOKEN;
  const zone = env.NUCLIA_ZONE || 'aws-eu-1';
  if (!account || !token) {
    fail('Set NUCLIA_ACCOUNT (slug/id) and NUCLIA_ACCOUNT_TOKEN (account key) in .env first.\n' +
         '  These are what let the factory create its own Knowledge Box.');
  }

  const title = arg('--title', 'ARAG Demo Knowledge Box');
  const slug = slugify(arg('--slug', title)) || `arag-demo-${Date.now().toString(36)}`;
  const zbase = `https://${zone}.rag.progress.cloud/api/v1`;
  const gbase = `https://rag.progress.cloud/api/v1`;

  console.log(`\n  Provisioning a Knowledge Box in account ${account} (zone ${zone})…`);

  // 1) Create the KB (account management API — verified).
  const create = await req(`${zbase}/account/${account}/kbs`, {
    token, method: 'POST', body: { title, slug, zone },
  });
  if (!create.ok) fail(`KB creation failed (HTTP ${create.status}): ${JSON.stringify(create.json).slice(0, 300)}`);
  const kbId = create.json.id || create.json.uuid;
  if (!kbId) fail(`KB created but no id in response: ${JSON.stringify(create.json).slice(0, 200)}`);
  const kbUrl = `${zbase}/kb/${kbId}`;
  console.log(`  ✓ Knowledge Box created: ${kbId}`);
  writeEnvVars({ NUCLIA_KB_ID: kbId, NUCLIA_KB_URL: kbUrl, NUCLIA_ZONE: zone });

  // 2) Mint a KB service-account token (best-effort — needs SA permission).
  let saToken = null;
  try {
    // Service account, then a key. Try the account-management shapes in order.
    const saCandidates = [
      { base: gbase, path: `/account/${account}/service_accounts` },
      { base: zbase, path: `/account/${account}/kb/${kbId}/service_accounts` },
    ];
    for (const c of saCandidates) {
      const sa = await req(`${c.base}${c.path}`, { token, method: 'POST', body: { title: `factory-${slug}`, role: 'SMEMBER' } });
      const saId = sa.ok && (sa.json.id);
      if (!saId) continue;
      const keyCandidates = [
        `${c.base}${c.path}/${saId}/keys`,
        `${gbase}/account/${account}/service_accounts/${saId}/keys`,
      ];
      for (const ku of keyCandidates) {
        const k = await req(ku, { token, method: 'POST', body: {} });
        const t = k.ok && (k.json.token || k.json.key);
        if (t) { saToken = t; break; }
      }
      if (saToken) break;
    }
  } catch { /* fall through to manual step */ }

  if (saToken) {
    writeEnvVars({ NUCLIA_SERVICEACCOUNT: saToken });
    console.log(`  ✓ Service-account token minted and written to .env`);
    console.log(`\n  Knowledge Box fully provisioned — ready to ingest. NUCLIA_KB_URL / _ID / _ZONE / _SERVICEACCOUNT are set.\n`);
  } else {
    console.log(`  ⚠ Could not mint a service-account token automatically (the account key may lack`);
    console.log(`    service-account permission). The KB IS created and its coordinates are in .env.`);
    console.log(`\n  One step to finish: create a KB service-account key in the Nuclia dashboard`);
    console.log(`    → Account ${account} → Knowledge Box "${slug}" → Service accounts → add key`);
    console.log(`    then paste it into .env as  NUCLIA_SERVICEACCOUNT=…  and re-run the build.\n`);
    process.exit(3); // signal "KB made, token pending" so the orchestrator can prompt for it
  }
}

main().catch((e) => fail(e.message));
