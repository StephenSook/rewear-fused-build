# DevPost submission (paste-ready, mapped to the form fields)

Hard deadline: **June 16 11:59pm ET** (the digital submission is EDITABLE until then, then it locks; June 17 is pitch + demo only). Team + track were submitted June 14. Add all three members. Track + video + T&C are required. Verify the video plays in incognito before submitting. No em-dashes anywhere (sweep before paste).

---

## PASTE THESE EXACT VALUES (canonical source; DevPost editable until Tue June 16 11:59pm ET)
- **Project name:** `REWEAR-FUSED` (all caps; if the site shows "Rewear-Fused", change it to match the brand).
- **Track** (Additional info dropdown): `5. Make & Remake`.
- **Terms consent:** Yes. Each member also signs the DocuSign Terms email AND completes the SEPARATE Cox Hackathon Registration Google Form (.edu, in-person Atlanta June 14-17) - that form is distinct from DevPost.
- **Team:** `@stephensookra` (creator), `@vinhbin` (Vinh Le), `@pkireri` (Pravin Ireri). DevPost submission id `1049249`.
- **Elevator pitch - PRIMARY (number-led, ~188 chars, under the 200 cap):**
  ```
  Elastane is in 80% of clothing; 1% makes recyclers reject the whole garment. REWEAR-FUSED co-designs a cleavable elastane and a matched enzyme to close the loop, plus a live passport.
  ```
- **Elevator pitch - ALTERNATIVE (customer-led, ~180 chars):**
  ```
  Carter's downcycles baby clothes into pet bedding because 1% elastane gets a garment rejected. REWEAR-FUSED co-designs a cleavable elastane and a matched enzyme that closes the loop.
  ```
  Pick ONE. PRIMARY leads with the number (Sookra Pillar 3). ALTERNATIVE names the customer + the novelty hook up front (maps to the rubric's Problem & Customer 10% + Novelty 15%). Watch the live counter; trim if it shows negative.

---

## General info

### Project name (60 chars max)
```
REWEAR-FUSED
```

### Elevator pitch / tagline (200 chars max)
Use the PRIMARY pitch from the "PASTE THESE EXACT VALUES" block above (~188 chars, under the 200 cap; verify the live counter):
```
Elastane is in 80% of clothing; 1% makes recyclers reject the whole garment. REWEAR-FUSED co-designs a cleavable elastane and a matched enzyme to close the loop, plus a live passport.
```

### Thumbnail (JPG/PNG/GIF, 5MB, 3:2)
A 3:2 capture of the enzyme view (Mol* with the green triad) or the loop cleavage frame. Real screen capture preferred; a branded card is acceptable garnish.

---

## Project Story → "About the project" (Markdown)

```markdown
## Inspiration
Carter's already collects worn baby clothes through KIDCYCLE. The problem is where they end up: shredded into insulation and pet bedding, never another onesie. Two walls stop the loop. Nobody can prove the recovered fabric is chemically safe against a baby's skin, and nobody can break down the elastane woven into every stretch garment. That second wall is small and brutal. Elastane is in about 80% of clothing, and as little as 1% of it makes a recycler reject the whole garment. We set out to knock down both.

## What it does
REWEAR-FUSED is one computational co-design loop with three engines.
- **Engine A** designs a new cleavable elastane fiber. It screens polyurethane-urea chemistry under hard constraints: aliphatic isocyanates only, so nothing carcinogenic comes off near a baby; the cleavable bond in the soft, amorphous segment, so the stretch survives; 25 to 35 percent hard segment.
- **Engine B** designs the matched enzyme, a carbamate hydrolase shaped to cut the exact bond Engine A built, with a near-neutral Ser-His-Asp triad so it leaves the companion cotton alone.
- **Engine C** is the Digital Recyclability Passport: a live classifier that routes each garment clear, lab-test, or divert against real US and EU regulation, then emits a scannable GS1 Digital Link passport. Scan its QR and the live single-product passport opens on any phone; it carries a real W3C Verifiable Credential you can cryptographically verify in your own browser.

Put together, the app makes the loop visible. A garment goes in, the system proposes a redesigned cleavable fiber, designs an enzyme against it, renders both structures in 3D, and animates the close: today's shred-to-pet-bedding on one side, depolymerize and re-spin into a new onesie on the other. By design it is a regenerative loop, not a one-time recycle: the same material is engineered to become a new garment again and again, a closed loop instead of a one-way downcycle.

## How we built it
The frontend is Next.js 16, React 19, and Tailwind v4. Mol* 5.9 renders the enzyme at publication grade, React Three Fiber drives a custom GPU particle storm for the closed loop, visx draws the trade-off curve, and GSAP and Lenis carry the scroll. Each passport carries a real Ed25519-signed W3C Verifiable Credential that the browser re-verifies with WebCrypto, no server, plus a tamper toggle that breaks the signature on cue. It deploys on Vercel.

Engine C runs for real. It is a FastAPI service on Render serving a signed, pre-computed artifact bundle, with a deterministic rule layer over real regulatory thresholds and a classifier trained on real public data (CPSC Recalls, EU Safety Gate, Toxic-Free Future / Peaslee PFAS, OEKO-TEX). Engines A and B use the open-source protein-design toolchain (LigandMPNN, Boltz-2, PLACER, FoldSeek) plus RDKit polymer screening, anchored on the published UMG-SP2 urethanase geometry; Engine B specifies three LigandMPNN redesigns at in-silico TM about 0.8 to template, with the redesign and de-novo RFdiffusion runs deferred to a longer GPU pass. The frontend reads pre-computed, SHA-256-signed artifacts, so the demo never waits on a GPU. Engine C also runs live, so the link works for anyone.

## Challenges we ran into
Existing elastane fights back. Its crystalline hard segments physically block enzymes, which is why every native enzyme fails on the intact fiber. So we inverted the problem: instead of attacking today's fiber, we redesigned the fiber to be breakable and built the enzyme to match. The engineering had its own potholes. Mol* crashed the Next.js Turbopack production build and we moved to webpack, and a full-screen WebGL background sat hidden behind the page until we fixed the z-index. The hardest discipline was honesty: everything molecular is in-silico, TRL 2 to 3, trained on real public data, with no synthetic data and no invented persona.

## Accomplishments that we're proud of
A real, deployed product, not a mockup: the passport endpoint and the five-view app, CI passing. The novelty we can stand behind: no one has co-designed a cleavable elastane and its matched enzyme, together, for textiles. Engine B specifies three LigandMPNN redesigns on real serine-hydrolase scaffolds with in-silico target metrics on the Lauko thresholds; the redesign and de-novo GPU runs are the compute we scoped and deferred, and we say so. And the honesty moat: Engine C numbers are live pipeline outputs, the science numbers are verified DOIs or clearly-labeled in-silico targets, and a /judges page tiers each engine real versus in-silico, so anyone can check our work instead of taking our word. We made the moat literal: click Verify and the browser cryptographically confirms the passport's Ed25519 signature, then flip one field and watch it go red.

## What we learned
The crystallinity-versus-stretch trade-off is real, and it has a published design window: 25 to 35 percent hard segment. We made it the centerpiece instead of hiding it. Calibrated honesty wins deep-tech rooms; over-claiming loses them. And a green build is not a working app, so we opened every view in a real browser before we believed it.

## What's next for REWEAR-FUSED
Wet lab. Express the top enzyme designs, spin a fiber sample, prove activity on a carbamate surrogate, file a provisional, and pilot one Carter's SKU. The Cox Cleantech Residency ask is exactly that: ten thousand dollars and six weeks. We are the Nexus Circular of textiles, the same shape Cox already backed, and the path forward is a license to incumbents (Hyosung, LYCRA, Asahi Kasei) on a 2030 to 2032 horizon. Because the cleavable fiber is drop-in to the solution dry-spinning those incumbents already run, the impact scales with time and resources rather than new capital: one license puts it on millions of garments.
```

### Built with (comma list)
```
next.js, react, typescript, tailwind-css, mol-star, three.js, react-three-fiber, gsap, lenis, visx, webcrypto, ed25519, fastapi, python, render, vercel, rdkit, ligandmpnn, boltz-2, placer, foldseek, catboost, gs1-digital-link, w3c-verifiable-credentials, gource, graphify
```

### "Try it out" links
- Live app (Vercel): https://rewear-fused.vercel.app
- Engine C API (Render): https://rewear-engine-c-vbqj.onrender.com/healthz
- Code (GitHub): https://github.com/StephenSook/rewear-fused
- Interactive 3D knowledge graph: https://rewear-fused.vercel.app/visualizations/knowledge-graph.html
- Codebase graph (graphify): https://rewear-fused.vercel.app/visualizations/codebase-graph.html

### Project Media
- Image gallery (3:2): screenshots of the five views (story, fiber, enzyme, loop, passport) and the /judges page. Real captures from the deployed app.
- **Video demo link (required)**: the YouTube/Vimeo URL. Record June 16 per `docs/demo_script.md`, under 5 minutes, captioned, verified in incognito.
- Visualizations (in the repo, linked from the README): a Gource git-history time-lapse (`docs/visualizations/rewear-fused-gource.mp4`), a graphify codebase graph (287 nodes / 401 edges), and the live interactive 3D knowledge graph.

---

## Additional info (for judges)

### What Problem Track Is Your Submission In?
```
Making & Remaking (Carter's)
```

### Terms & Conditions
Each team member checks the consent box, and each signs the DocuSign Terms email. Opt into the Making & Remaking prize category so the entry is eligible; the grand prize and the Cox Cleantech Residency flow from the track win.

---

## Pre-submit checklist (June 16, before 11:59pm)
- [ ] All three members on the submission.
- [ ] Track = Making & Remaking selected; T&C consent checked.
- [ ] Video link set, plays in incognito, captioned, under 5 min.
- [ ] Live app + Engine C + repo links filled and reachable.
- [ ] AI-tone sweep: no em-dashes, no blocklist words in the story.
- [ ] Final deployed golden-path green in incognito (the judge experience).
