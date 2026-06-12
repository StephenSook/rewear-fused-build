#!/usr/bin/env python3
"""Generate data/artifacts/<version>/manifest.json with a real SHA-256 per file.

generatedAt is a stable placeholder here so the committed manifest does not
churn; the real pipeline re-stamps it with the actual freeze time at the
artifact-freeze gate. SHAs are real and are the frozen-model-parity anchor.
"""
from __future__ import annotations

import hashlib
import json
import sys
from pathlib import Path


def build(version: str = "v1.0.0") -> None:
    root = Path(__file__).resolve().parents[1]
    base = root / "data" / "artifacts" / version
    files = []
    for p in sorted(base.rglob("*")):
        if p.is_file() and p.name != "manifest.json":
            files.append(
                {
                    "path": str(p.relative_to(base)),
                    "sha256": hashlib.sha256(p.read_bytes()).hexdigest(),
                    "bytes": p.stat().st_size,
                    "producedBy": "placeholder",
                }
            )
    manifest = {
        "version": version.lstrip("v"),
        "generatedAt": "2026-06-12T00:00:00Z",
        "files": files,
        "modelVersions": {
            "engineC": "placeholder",
            "engineA": "placeholder",
            "engineB": "placeholder",
        },
    }
    (base / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"wrote manifest: {len(files)} files")


if __name__ == "__main__":
    build(*sys.argv[1:])
