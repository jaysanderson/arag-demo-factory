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
Info "Checking Nuclia credentials..."
if (Test-Path ".env") {
  $envText = Get-Content ".env" -Raw
  $missing = @()
  foreach ($key in @("NUCLIA_SERVICEACCOUNT","NUCLIA_KB_URL","NUCLIA_ZONE","NUCLIA_KB_ID")) {
    if ($envText -notmatch "(?m)^$key=.+") { $missing += $key }
  }
  if ($missing.Count -eq 0) {
    Ok ".env present with NUCLIA_SERVICEACCOUNT, NUCLIA_KB_URL, NUCLIA_ZONE, NUCLIA_KB_ID set"
  } else {
    Warn ".env is missing values for: $($missing -join ', ')"
    Warn "  -> Fill them in before firing a build. The KB token stays server-side (never in git)."
    $blockers++
  }
} else {
  Warn "No .env found. Copy the template and add your Nuclia credentials:"
  Warn "    Copy-Item .env.example .env   # then paste your KB service-account token + KB URL"
  $blockers++
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
