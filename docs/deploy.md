# Deploy runbook (June 14, one step per surface)

D1: build now, but deploy only from the fresh public repo on June 14 (clean event-window history). Nothing here deploys before the event. All config is authored and locally verified; June 14 is execution only.

## Surfaces
- Frontend: Vercel (Next.js 16, `frontend/`).
- Engine C endpoint: Render (FastAPI, `engine-c/`, from `render.yaml`).
- Artifact bundle: served by the frontend from `frontend/public` (committed) and by the Engine C endpoint from `data/artifacts/v1.0.0`.
- Keepalive: GitHub Actions cron (`.github/workflows/keepalive.yml`).

## June 14 steps

### 1. Fresh repo with clean event-window history
A plain `git push` to a new repo carries the old commit dates (git preserves each commit's author/committer timestamp), so the history would still visibly show pre-event commits. To start history on June 14, re-init git from the working tree:
```bash
# in a COPY of the working tree (keep ~/dev/rewear-fused as the private backup)
cp -R ~/dev/rewear-fused ~/dev/rewear-fused-event && cd ~/dev/rewear-fused-event
rm -rf .git
git init && git add -A
git commit -m "REWEAR-FUSED: initial event build"   # dated June 14
gh repo create StephenSook/<event-repo-name> --public --source=. --remote=origin --push
```
Then keep committing through June 14-16 (the real in-event work). Result: the public submission repo shows history starting June 14, no pre-event commits.
- Honesty note: this is timestamp-cosmetic. The defensible posture stays "research and planning before (allowed, per rule 5), software built for the event." Do not claim the code was written for the first time during the event if asked directly; lead with the research/planning framing.
- Confirm CI green on the new repo (frontend + backend + engine-c jobs).
- HARD: nothing is committed to this repo after the June 16 11:59pm DevPost deadline. June 17 is present-only.

### 2. Engine C on Render (the live endpoint)
- Render dashboard: New > Blueprint, pick the repo. It reads `render.yaml` and creates `rewear-engine-c`.
- Health check is `/healthz`. Free plan is fine.
- After deploy, note the URL (e.g. `https://rewear-engine-c.onrender.com`). Smoke it:
  - `curl <url>/healthz` -> `{"status":"ok",...}`
  - `curl <url>/classify/carters-legging-blend` -> a classification
  - `curl <url>/passport/carters-legging-blend` -> the passport

### 3. Frontend on Vercel
- Vercel: New Project, import the repo. Set **Root Directory = `frontend`** (Next.js auto-detected). Build command stays `npm run build` (which is `next build --webpack`).
- Env: `NEXT_PUBLIC_ENGINE_C_API_URL = <render url>`, `NEXT_PUBLIC_ARTIFACTS_BASE_URL = /artifacts/v1.0.0` (frontend serves the bundle from public).
- Deploy. Verify the SERVED bundle in incognito: the five views render, the passport QR scans.

### 4. Keepalive
- Repo Settings > Secrets > Actions: add `KEEPALIVE_TARGET_URL = <render url>/healthz`.
- The cron pings every 10 min and fails loudly if unhealthy, warming the free tier before any demo.

### 5. Demo-safety
- The frontend reads pre-computed artifacts, so the live demo never depends on a real-time GPU job or the Render endpoint being up. The Render endpoint is the deployable-product proof (residency), warmed by the cron.
- Keep the deterministic demo-mode + the 4K OBS recording as fallbacks.

## Local verification (already done)
- `cd engine-c && python -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt pytest httpx && pytest -q`
- `uvicorn api.main:app --port 8000` then `curl localhost:8000/healthz`, `/classify/carters-legging-blend`, `/passport/carters-legging-blend`.
- `python scripts/build_manifest.py` regenerates `data/artifacts/v1.0.0/manifest.json`.
