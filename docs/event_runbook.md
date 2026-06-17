# Event runbook — REWEAR-FUSED (the one page we all follow)

The single checklist for June 14 to 17. Everything else (deploy, video, DevPost text) lives in linked docs; this is the spine. Check boxes as you go.

## Hard facts
- **Track:** Making & Remaking (Carter's). Targets: track win, grand prize, Cox Cleantech Residency.
- **Kickoff:** Sun June 14, 2pm to 6pm, **TSQATL Clubhouse, 848 Spring St NW**.
- **Build:** Mon June 15 to Tue June 16, **Biltmore Innovation Center, 817 W Peachtree St NW** (7am to 7pm, in-person optional).
- **FINAL SUBMISSION: Tue June 16, 11:59pm** on DevPost. NOTHING is committed to the submission repo after this. (Older rules text said June 17; we plan for June 16, confirm at kickoff.)
- **Demo Day:** Wed June 17, 9am to 4pm, Biltmore. At least one member present in person. Present only, no new submission.
- **The honesty line (non-negotiable):** everything is in-silico TRL 2-3, real public data only, no synthetic data, no fictional persona. Lead with "research and planning before, software built for the event."

## Team + lanes
- **Stephen** — frontend (5 views + shell), project architecture, the repo + deploy, the data contract.
- **Pravin** (pravinireri) — Engines A + B molecular pipelines + GPU pre-flight.
- **Vinh** (vinhbin) — Engine C classifier + Digital Product Passport + the live endpoint.

---

## PRE-KICKOFF (do before June 14, in parallel)
- [ ] All three register on the Cox form with a .edu email.
- [ ] All three sign the **DocuSign** Terms & Conditions email.
- [ ] DevPost: each creates an account, joins the hackathon (submission 1049249), all three on one team.
- [ ] Join the Discord (shows as Render ATL; Play with Purpose channels inside). Pull the Google Drive files.
- [ ] Accept the GitHub collaborator invites to `rewear-fused-build` (Pravin, Vinh).
- [ ] **Pravin:** provision RunPod, set the budget cap (~$300-500), and smoke the full enzyme pipeline once so it is not first-run during the event.
- [ ] **Stephen:** confirm the working tree builds clean (`cd frontend && npm run build`; `cd engine-c && pytest`).

---

## SUN JUNE 14 — Kickoff (TSQATL Clubhouse)
Event: 2pm welcome + tracks, 2:45 idea pitches/working, 3:45 team formation, 4:30-6 collaboration, **11:59pm team-formation submission deadline**.

Our build actions (evening, after kickoff):
- [ ] **Publish the event repo with clean history** (Stephen): `bash scripts/init_event_repo.sh . <event-repo-name> 1`. This makes a fresh git history dated today, excludes research-reports, creates the PUBLIC repo, pushes.
- [ ] Add collaborators to the new repo (the script prints the commands for pravinireri + vinhbin).
- [ ] Confirm CI green on the new repo (frontend + backend + engine-c jobs).
- [ ] **Deploy once** per `docs/deploy.md`: Engine C on Render (Blueprint from `render.yaml`), frontend on Vercel (Root Directory = `frontend`, env vars set), keepalive secret added. Smoke `/healthz`, `/classify`, and the deployed app in incognito.
- [ ] **DevPost:** confirm all three on the team, **select the Making & Remaking track**, opt into the prize category, check the T&C consent. Submit team formation by 11:59pm.

Gate **G2 (mid-build)**: VIEW 2 passport + VIEW 4 enzyme + the deployed URL are green. Done.

---

## MON JUNE 15 — Build (Biltmore)
Event: 7am open working, 10am + 5pm office hours, 11am Energy office hours, 2pm building workshops, 7pm close.

- [ ] **Pravin:** run Engine B (RFdiffusion to LigandMPNN to Boltz-2 to PLACER to FoldSeek) and Engine A screening on the GPU; emit ranked outputs.
- [ ] **Vinh:** finalize the Engine C classifier on real public data (CPSC, EU Safety Gate, Peaslee PFAS, OEKO-TEX); report the real PR-AUC.
- [ ] **Stephen:** polish, hold the demo path stable, support the artifact swap.
- [ ] **GATE G3 (artifact-freeze, June 15 EOD, HARD):** real Engine A/B/C outputs replace the placeholders in `data/artifacts/v1.0.0/` (same shapes per `data/contract.md`), run `python scripts/build_manifest.py`, commit, redeploy, verify the deployed golden path. If the enzyme pipeline is not on track, trigger the LigandMPNN-redesign fallback (do not slip the gate).
- [ ] Freeze the Engine C endpoint to the exact model that produced `v1.0.0` (frozen-model parity, manifest SHA).

---

## TUE JUNE 16 — Build + SUBMIT (Biltmore)
Event: 7am open working (deadline tonight), 10am MVP workshop, 4pm storytelling/pitch workshop, 5pm submission support, **11:59pm SUBMISSION DEADLINE**.

- [ ] **Re-capture the gallery** from the DEPLOYED app (the 5 views, 3:2) and the thumbnail; replace `docs/gallery/*`.
- [ ] **Record the demo video** per `docs/demo_script.md`: under 5 min, real screen captures, ElevenLabs narration, two-pass loudnorm -16 LUFS, captions ON. Verify it plays in incognito. Upload to YouTube (public or unlisted).
- [ ] **Fill the DevPost submission** from `docs/devpost_submission.md`: name, the 196-char elevator pitch, the 7-section story, Built with, the Try-it links (live app + Render API + repo), the image gallery, the video link, the track, the T&C.
- [ ] **Pre-submit checklist (before 11:59pm):**
  - [ ] All three members on the submission.
  - [ ] Track = Making & Remaking; T&C consent checked.
  - [ ] Video link set, plays in incognito, captioned, under 5 min.
  - [ ] Live app + Engine C + repo links filled and reachable.
  - [ ] AI-tone sweep: no em-dashes, no blocklist words in the story.
  - [ ] Deployed golden path green in incognito (the judge experience).
  - [ ] `npm run typecheck && npm run lint && npm run build` clean; `pytest` clean.
- [ ] **SUBMIT on DevPost before 11:59pm.** After this: NO commits to the submission repo. Warm the endpoint (keepalive) overnight.

Gate **G4 (submit)**: met when the above is submitted.

---

## WED JUNE 17 — Demo Day (Biltmore)
Event: 9am breakfast, 10am welcome + judges, 10:30-3 judging, 1:30-3 recruiters, 3-4 winners, 4pm close, 4:30-7 winners reception.

- [ ] At least one of us present in person (all three if possible; required to win).
- [ ] Warm the deployed app + endpoint before judging.
- [ ] Run the deterministic demo (the 5 views) + the live QR scan (opens the single-product passport) + the **click-Verify / Tamper credential check**. **Pre-warm Engine C** (hit `/healthz` + a `/classify` ~60s before each judge so the live badge fires, not the signed-bundle fallback). 4K OBS recording as fallback. Two laptops + hotspot.
- [ ] Q&A reflexes (from `docs/demo_script.md`): in-silico/TRL, aromatic-amine NONE, near-neutral triad, soft-segment cleavage, constraint-guided not generative, one-loop-not-two, Carter's-already-pays-TerraCycle.
- [ ] Point judges to the `/judges` page (the honesty tiering).
- [ ] No new commits today.

---

## Doc index (where the detail lives)
- `docs/deploy.md` — the one-step-per-surface deploy + the fresh-repo mechanics.
- `scripts/init_event_repo.sh` — tested one-command clean-history repo init.
- `docs/demo_script.md` — the 4-min pitch script, shot list, Q&A defense.
- `docs/devpost_submission.md` — paste-ready DevPost fields (name, pitch, story, built-with, track).
- `docs/gallery/` — the 3:2 thumbnail + 5-view gallery (re-capture June 16).
- `docs/pravin_handoff.md`, `docs/vinh_handoff.md` — the backend lane specs.
- `data/contract.md` — the artifact shapes all three conform to.
- `CLAUDE.md` — the full build spec + the operating contract.
