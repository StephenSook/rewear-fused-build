#!/usr/bin/env bash
# One-command June-14 fresh-repo init for clean event-window history.
#
# A plain `git push` to a new repo carries the old commit dates. To start
# history on June 14, this copies the working tree into a sibling dir with a
# FRESH git history (one commit dated now), excluding heavy/generated dirs and
# the internal research-reports. It does NOT go public unless you pass --push.
#
# Usage:
#   scripts/init_event_repo.sh                      # dry: make the fresh copy + history, print next step
#   scripts/init_event_repo.sh . rewear-fused 1     # also create a PUBLIC repo + push (June 14 only)
#
# Arg 1: source dir (default: cwd). Arg 2: new repo name. Arg 3: any value = go public.
set -euo pipefail

SRC="$(cd "${1:-$(pwd)}" && pwd)"
NAME="${2:-rewear-fused}"
GO_PUBLIC="${3:-}"
DEST="${SRC%/}-event"

echo "Source:      $SRC"
echo "Destination: $DEST"

rm -rf "$DEST"
rsync -a \
  --exclude '.git' \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude '.venv' \
  --exclude '__pycache__' \
  --exclude '.DS_Store' \
  --exclude '.claude' \
  --exclude '.playwright-mcp' \
  --exclude '.ruff_cache' \
  --exclude 'research-reports' \
  --exclude 'CLAUDE.md' \
  --exclude 'PLAN.md' \
  --exclude 'scripts/init_event_repo.sh' \
  --exclude 'docs/deploy.md' \
  --exclude 'docs/devpost_submission.md' \
  --exclude 'docs/demo_script.md' \
  --exclude 'docs/pitch_inperson.md' \
  --exclude 'docs/vinh_video_handoff.md' \
  --exclude 'docs/event_runbook.md' \
  --exclude 'docs/pravin_handoff.md' \
  --exclude 'docs/vinh_handoff.md' \
  "$SRC/" "$DEST/"

# Excluded files stay PRIVATE (internal strategy / coordination / lane handoffs:
# win conditions, judge-defense, IP-FTO, pitch numbers, secrets ownership). The
# public repo is the README + code + shareable docs (deploy, gallery, contract).

cd "$DEST"
git init -q -b main
git add -A
git commit -q -m "REWEAR-FUSED: initial event build"

echo "Fresh history (1 commit, dated now):"
git log --oneline
echo "Tracked file count: $(git ls-files | wc -l | tr -d ' ')"

if [ -n "$GO_PUBLIC" ]; then
  echo "Creating PUBLIC repo StephenSook/$NAME and pushing..."
  gh repo create "StephenSook/$NAME" --public --source=. --remote=origin --push
  echo "Done. Add collaborators: gh api -X PUT repos/StephenSook/$NAME/collaborators/pravinireri -f permission=push"
  echo "                          gh api -X PUT repos/StephenSook/$NAME/collaborators/vinhbin -f permission=push"
else
  echo
  echo "DRY run complete. To go public on June 14:"
  echo "  cd $DEST && gh repo create StephenSook/$NAME --public --source=. --remote=origin --push"
fi
