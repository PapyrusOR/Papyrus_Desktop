"""Compatibility launcher.

Historically the project used `src/Papyrus.pyw` as the GUI entrypoint.
We keep this file so existing shortcuts/docs continue to work.

It forwards to `src/Papyrus.py` (shim) -> `papyrus.app.run_app()`.
"""

from __future__ import annotations

from Papyrus import run_app


if __name__ == "__main__":
    run_app()
