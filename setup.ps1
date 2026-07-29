# ─────────────────────────────────────────────────────────────
# ARAG Demo Factory — Windows prerequisite check
# ─────────────────────────────────────────────────────────────
# Checks Node.js 20+, Git, probes npm registry reachability, and
# checks for Nuclia credentials in .env. Does NOT hard-fail on an
# unreachable registry — it warns clearly instead.
#
# Usage:
#   .\setup.ps1
# ─────────────────────────────────────────────────────────────

$ErrorActionPreference = 'Continue'

function Ok($m)   { Write-Host "[ok]      $m" -ForegroundColor Green }
function Miss($m) { Write-Host "[missing] $m" -ForegroundColor Red }
function Warn($m) { Write-Host "[warn]    $m" -ForegroundColor Yellow }
function Info($m) { Write-Host ">>>       $m" -ForegroundColor Cyan }

Write-Host ""
Write-Host "=================================================="
Write-Host "  ARAG Demo Factory - Environment Check (Windows)"
Write-Host "=================================================="
Write-Host ""

$blockers = 0

# ── Node.js 20+ ──────────────────────────────────────────────
$node = Get-Command node -ErrorAction SilentlyContinue
if ($node) {
  $nodeVer = (& node --version) -replace '^v', ''
  $nodeMajor = [int]($nodeVer.Split('.')[0])
  if ($nodeMajor -ge 20) { Ok "Node.js v$nodeVer" }
  else { Warn "Node.js v$nodeVer found but v20+ is required"; $blockers++ }
} else {
  Miss "Node.js 20+  (install from https://nodejs.org/ or: winget install OpenJS.NodeJS.LTS)"
  $blockers++
}

# ── Git ──────────────────────────────────────────────────────
$git = Get-Command git -ErrorAction SilentlyContinue
if ($git) { Ok ("Git " + ((& git --version) -replace 'git version ', '')) }
else { Miss "Git  (install: winget install Git.Git)"; $blockers++ }

# ── npm registry reachability (WARN only) ────────────────────
# The project resolves npm through the Progress HAR registry (see .npmrc; no auth
# needed for read access). Probe that, not npmjs.org.
Write-Host ""
Info "Probing npm registry (Progress HAR) reachability..."
try {
  $resp = Invoke-WebRequest -Uri "https://pkg.harness.io/pkg/ct8onj8YTdaXtKaFsYCRLg/org-marklogic-npm/npm/" -Method Head -TimeoutSec 8 -UseBasicParsing
  Ok "HAR registry reachable - the portal build (npm ci in portal/) will work"
} catch {
  Warn "The Progress HAR npm registry is UNREACHABLE from this network."
  Warn "  -> The portal build (cd portal; npm ci) will fail until network access to"
  Warn "     pkg.harness.io is restored. Everything else - mapping prompts, generating the"
  Warn "     synthetic corpus, binding and reasoning about the Knowledge Box - still works."
  Warn "  This is a warning, not a failure. Continuing."
}

# ── Nuclia credentials in .env ───────────────────────────────
Write-Host ""
Info "Checking Nuclia credentials (the one-time setup)..."
if (Test-Path ".env") {
  $envText = Get-Content ".env" -Raw
  if (($envText -match "(?m)^NUCLIA_NUA_KEY=.+") -and ($envText -match "(?m)^NUCLIA_ACCOUNT=.+") -and ($envText -match "(?m)^NUCLIA_ZONE=.+")) {
    Ok "One-time setup complete: NUA key + account + zone are set."
    Ok "Every demo is now a single prompt — Phase 1 provisions the KB automatically."
  } elseif (($envText -match "(?m)^NUCLIA_SERVICEACCOUNT=.+") -and ($envText -match "(?m)^NUCLIA_KB_URL=.+")) {
    Ok "Bound to an existing Knowledge Box (NUCLIA_SERVICEACCOUNT + NUCLIA_KB_URL)."
  } else {
    Warn "Add the THREE one-time values to .env, then every demo is just a prompt:"
    Warn "    NUCLIA_NUA_KEY   - your NUA key (dashboard -> account -> NUA keys)"
    Warn "    NUCLIA_ACCOUNT   - your account id (the UUID; copy once from the dashboard)"
    Warn "    NUCLIA_ZONE      - your zone, e.g. aws-ap-southeast-2-1"
    Warn "  Everything else (KB, service-account token, ingest, agents) is provisioned for you."
    $blockers++
  }
} else {
  Warn "No .env found. Copy the template and add your three one-time values:"
  Warn "    Copy-Item .env.example .env   # then set NUCLIA_NUA_KEY, NUCLIA_ACCOUNT (account UUID), NUCLIA_ZONE"
  $blockers++
}

# ── UI mode + Kendo license (WARN only — never blocks) ──
Write-Host ""
$envText2 = if (Test-Path ".env") { Get-Content ".env" -Raw } else { "" }
$uiMode = ""
if ($envText2 -match "(?m)^UI_MODE=(.+)$") { $uiMode = $Matches[1].Trim().ToLower() }
if ($uiMode -eq "opensource") {
  Info "UI mode: open-source (Radix + Recharts + TanStack + Tailwind)."
  Ok "No KendoReact, no license needed - demos build with no trial banner."
} else {
  Info "UI mode: KendoReact (default). Checking license (removes the trial banner)..."
  if (($envText2 -match "(?m)^KENDO_UI_LICENSE=.+") -or ($envText2 -match "(?m)^TELERIK_LICENSE=.+") -or (Test-Path "telerik-license.txt") -or (Test-Path "portal/telerik-license.txt") -or (Test-Path "kendo-ui-license.txt")) {
    Ok "Kendo license found - demos build with NO trial banner."
  } else {
    Warn "No Kendo license set - demos will show a KendoReact trial banner in front of the customer."
    Warn "    Paste your key into KENDO_UI_LICENSE in .env (or drop telerik-license.txt at the root),"
    Warn "    OR set UI_MODE=opensource in .env to build with open-source components instead."
    Warn "    Get a key from telerik.com -> your account -> Manage License Keys. (Warning, not a blocker.)"
  }
}

# ── Summary ──────────────────────────────────────────────────
Write-Host ""
Write-Host "=================================================="
if ($blockers -eq 0) {
  Ok "Ready. Open the factory in your AI coding tool and describe the demo you want -"
  Ok "it builds in one shot. (See GETTING_STARTED.md.)"
} else {
  Warn "$blockers item(s) need attention above before a build will succeed."
}
Write-Host "=================================================="
Write-Host ""
