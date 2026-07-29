#!/usr/bin/env bash
set -uo pipefail

# ─────────────────────────────────────────────────────────────
# ARAG Demo Factory — Mac/Linux prerequisite check
# ─────────────────────────────────────────────────────────────
# Checks (and, with --install, installs) the small set of things
# the factory needs: Node.js 20+, Git. Then it probes npm registry
# reachability and checks for Nuclia credentials in .env.
#
# It deliberately does NOT hard-fail on an unreachable registry —
# the factory can still map prompts, generate corpora and reason
# about the KB without a portal build. It warns clearly instead.
#
# Usage:
#   chmod +x setup.sh
#   ./setup.sh            # check only
#   ./setup.sh --install  # attempt to install missing Node/Git
# ─────────────────────────────────────────────────────────────

INSTALL=false
for arg in "$@"; do
  case "$arg" in --install|-i) INSTALL=true ;; esac
done

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; CYAN='\033[0;36m'; NC='\033[0m'
ok()   { printf "${GREEN}[ok]${NC}      %s\n" "$*"; }
miss() { printf "${RED}[missing]${NC} %s\n" "$*"; }
warn() { printf "${YELLOW}[warn]${NC}    %s\n" "$*"; }
info() { printf "${CYAN}>>>${NC}       %s\n" "$*"; }

case "$(uname -s)" in
  Darwin) OS="mac" ;;
  Linux)  OS="linux" ;;
  *) echo "Unsupported OS: $(uname -s). Use setup.ps1 on Windows."; exit 1 ;;
esac

echo ""
echo "=================================================="
echo "  ARAG Demo Factory — Environment Check"
echo "  OS: $OS ($(uname -m))"
echo "=================================================="
echo ""

BLOCKERS=0

# ── Node.js 20+ ──────────────────────────────────────────────
NEED_NODE=false
if command -v node &>/dev/null; then
  NODE_VER=$(node --version | sed 's/^v//')
  NODE_MAJOR=$(echo "$NODE_VER" | cut -d. -f1)
  if [ "$NODE_MAJOR" -ge 20 ]; then
    ok "Node.js v$NODE_VER"
  else
    warn "Node.js v$NODE_VER found but v20+ is required"
    NEED_NODE=true
  fi
else
  miss "Node.js 20+"
  NEED_NODE=true
fi

# ── Git ──────────────────────────────────────────────────────
NEED_GIT=false
if command -v git &>/dev/null; then
  ok "Git $(git --version | awk '{print $3}')"
else
  miss "Git"
  NEED_GIT=true
fi

# ── Optional install of Node/Git ─────────────────────────────
if $INSTALL && { $NEED_NODE || $NEED_GIT; }; then
  if [ "$OS" = "mac" ]; then
    if command -v brew &>/dev/null; then
      $NEED_GIT  && { info "Installing Git...";  brew install git; }
      $NEED_NODE && { info "Installing Node 20..."; brew install node@20 && brew link --overwrite node@20 2>/dev/null || true; }
    else
      warn "Homebrew not found — install it from https://brew.sh then re-run, or install Node 20 + Git manually."
    fi
  else
    if command -v apt-get &>/dev/null; then
      $NEED_GIT  && { info "Installing Git...";  sudo apt-get update && sudo apt-get install -y git; }
      $NEED_NODE && { info "Installing Node 20..."; curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt-get install -y nodejs; }
    elif command -v dnf &>/dev/null; then
      $NEED_GIT  && sudo dnf install -y git
      $NEED_NODE && { curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash - && sudo dnf install -y nodejs; }
    else
      warn "No supported package manager found — install Node 20 + Git manually."
    fi
  fi
  # Re-check
  command -v node &>/dev/null && NEED_NODE=false
  command -v git  &>/dev/null && NEED_GIT=false
fi

$NEED_NODE && BLOCKERS=$((BLOCKERS + 1))
$NEED_GIT  && BLOCKERS=$((BLOCKERS + 1))

# ── npm registry reachability (WARN only, never a blocker) ───
# The project resolves npm through the Progress HAR registry (see the .npmrc
# files; no auth needed for read access). Probe that, not npmjs.org.
echo ""
info "Probing npm registry (Progress HAR) reachability..."
HAR_REGISTRY="https://pkg.harness.io/pkg/ct8onj8YTdaXtKaFsYCRLg/org-marklogic-npm/npm/"
if curl -sSf -m 8 -o /dev/null "$HAR_REGISTRY" 2>/dev/null; then
  ok "HAR registry reachable — the portal build (npm ci in portal/) will work"
else
  warn "The Progress HAR npm registry is UNREACHABLE from this network."
  warn "  → The portal build (\`cd portal && npm ci\`) will fail until network access"
  warn "    to pkg.harness.io is restored. Everything else — mapping prompts, generating the"
  warn "    synthetic corpus, binding and reasoning about the Knowledge Box — still works."
  warn "  This is a warning, not a failure. Continuing."
fi

# ── Nuclia credentials in .env ───────────────────────────────
echo ""
info "Checking Nuclia credentials (the one-time setup)..."
has() { grep -q "^${1}=.\+" .env 2>/dev/null; }
if [ -f .env ]; then
  if has NUCLIA_NUA_KEY && has NUCLIA_ACCOUNT && has NUCLIA_ZONE; then
    ok "One-time setup complete: NUA key + account + zone are set."
    ok "Every demo is now a single prompt — Phase 1 provisions the KB automatically."
  elif has NUCLIA_SERVICEACCOUNT && has NUCLIA_KB_URL; then
    ok "Bound to an existing Knowledge Box (NUCLIA_SERVICEACCOUNT + NUCLIA_KB_URL)."
  else
    warn "Add the THREE one-time values to .env, then every demo is just a prompt:"
    warn "    NUCLIA_NUA_KEY   — your NUA key (dashboard → account → NUA keys)"
    warn "    NUCLIA_ACCOUNT   — your account id (the UUID; copy once from the dashboard)"
    warn "    NUCLIA_ZONE      — your zone, e.g. aws-ap-southeast-2-1"
    warn "  Everything else (KB, service-account token, ingest, agents) is provisioned for you."
    BLOCKERS=$((BLOCKERS + 1))
  fi
else
  warn "No .env found. Copy the template and add your three one-time values:"
  warn "    cp .env.example .env   # then set NUCLIA_NUA_KEY, NUCLIA_ACCOUNT (account UUID), NUCLIA_ZONE"
  BLOCKERS=$((BLOCKERS + 1))
fi

# ── Kendo / Telerik license (WARN only — trial mode never blocks) ──
echo ""
info "Checking KendoReact license (removes the trial banner from demos)..."
if has KENDO_UI_LICENSE || has TELERIK_LICENSE || [ -f telerik-license.txt ] || [ -f portal/telerik-license.txt ] || [ -f kendo-ui-license.txt ]; then
  ok "Kendo license found — demos build with NO trial banner."
else
  warn "No Kendo license set — demos will show a KendoReact trial banner in front of the customer."
  warn "    Paste your key into KENDO_UI_LICENSE in .env (or drop telerik-license.txt at the root)."
  warn "    Get it from telerik.com → your account → Manage License Keys. (Warning, not a blocker.)"
fi

# ── Summary ──────────────────────────────────────────────────
echo ""
echo "=================================================="
if [ "$BLOCKERS" -eq 0 ]; then
  ok "Ready. Open the factory in your AI coding tool and describe the demo you want —"
  ok "it builds in one shot. (See GETTING_STARTED.md.)"
else
  warn "$BLOCKERS item(s) need attention above before a build will succeed."
  info "Re-run with ./setup.sh --install to attempt installing missing Node/Git."
fi
echo "=================================================="
echo ""
exit 0
