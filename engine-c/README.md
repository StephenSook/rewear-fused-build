# engine-c — Digital Recyclability Passport (Vinh)

Chemical-compliance classifier + EU Digital Product Passport + data ETL + live endpoint. Full spec in `docs/vinh_handoff.md`. Outputs conform to `data/contract.md`.

- `ingest/` — ETL for REAL public datasets (CPSC SaferProducts, EU Safety Gate, Toxic-Free Future / Peaslee PFAS, OEKO-TEX negatives). No synthetic data in the judged path.
- `classifier/` — deterministic rule layer over 85+ thresholds first, then CatBoost classifier-chain + ChemBERTa-2/MolFormer featurization + SHAP. Target PR-AUC >= 0.85 per label (report PR-AUC, not ROC); report the real achieved number.
- `passport/` — W3C VC 2.0 (JSON-LD under UNTP) + GS1 Digital Link + scannable QR, clear/lab-test/divert.
- `api/` — FastAPI on Render, `POST /classify`, `/healthz`, keepalive cron. Serves the SAME frozen model that produced `data/artifacts/v1.0.0` (manifest SHA verified).

```bash
python -m venv .venv && source .venv/bin/activate
pip install -e .
pytest -q
```
