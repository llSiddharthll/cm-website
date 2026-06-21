#!/usr/bin/env bash
# Mirror cm-website/backend → the standalone cm-backend repo (Render's deploy source).
# Run from anywhere inside the monorepo, AFTER committing your backend changes.
#   ./scripts/sync-backend.sh "commit message"
set -euo pipefail

REPO_ROOT="$(git -C "$(dirname "$0")" rev-parse --show-toplevel)"
MSG="${1:-chore: sync backend from monorepo}"
CM_BACKEND="https://github.com/llSiddharthll/cm-backend.git"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

echo "→ cloning cm-backend…"
git clone -q "$CM_BACKEND" "$TMP"
cd "$TMP"

git rm -rq . >/dev/null
git -C "$REPO_ROOT" archive HEAD:backend | tar -x   # tracked backend files only (no .env)
git add -A

if git diff --cached --quiet; then
  echo "✓ cm-backend already up to date — nothing to push."
  exit 0
fi

git commit -q -m "$MSG"
git push -q origin main
echo "✓ pushed to cm-backend → Render will auto-deploy."
