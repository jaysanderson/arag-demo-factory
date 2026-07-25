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
echo ""
info "Probing npm registry reachability..."
if curl -sSf -m 8 -o /dev/null https://registry.npmjs.org/ 2>/dev/null; then
  ok "npm registry reachable — the portal build (npm install in portal/) will work"
else
  warn "npm registry is UNREACHABLE from this network."
  warn "  → The portal build (\`cd portal && npm install\`) will fail until network access"
  warn "    is restored. Everything else — mapping prompts, generating the synthetic corpus,"
  warn "    binding and reasoning about the Knowledge Box — still works."
  warn "  This is a warning, not a failure. Continuing."
fi

# ── Nuclia credentials in .env ───────────────────────────────
echo ""
info "Checking Nuclia credentials..."
if [ -f .env ]; then
  MISSING_KEYS=()
  for key in NUCLIA_SERVICEACCOUNT NUCLIA_KB_URL NUCLIA_ZONE NUCLIA_KB_ID; do
    if ! grep -q "^${key}=.\+" .env 2>/dev/null; then MISSING_KEYS+=("$key"); fi
  done
  if [ ${#MISSING_KEYS[@]} -eq 0 ]; then
    ok ".env present with NUCLIA_SERVICEACCOUNT, NUCLIA_KB_URL, NUCLIA_ZONE, NUCLIA_KB_ID set"
  else
    warn ".env is missing values for: ${MISSING_KEYS[*]}"
    warn "  → Fill them in before firing a build. The KB token stays server-side (never in git)."
    BLOCKERS=$((BLOCKERS + 1))
  fi
else
  warn "No .env found. Copy the template and add your Nuclia credentials:"
  warn "    cp .env.example .env   # then paste your KB service-account token + KB URL"
  BLOCKERS=$((BLOCKERS + 1))
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
