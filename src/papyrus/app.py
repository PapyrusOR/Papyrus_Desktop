"""Papyrus application entry point.

The tkinter GUI has been removed. The app now runs as a FastAPI backend
serving the React frontend.
"""

from __future__ import annotations

import traceback


def run_app() -> None:

    """Start the FastAPI backend server."""
    try:
        import uvicorn
        from papyrus_api.main import app  # noqa: F811

        print("Papyrus API server starting on http://127.0.0.1:8000")
        uvicorn.run(app, host="127.0.0.1", port=8000)
    except ImportError:
        print("[ERROR] uvicorn is not installed. Run: pip install \"uvicorn>=0.27.0\"")
    except Exception as e:
        error_msg = traceback.format_exc()
        print("Papyrus server error:\n", error_msg)
