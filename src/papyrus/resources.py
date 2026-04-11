from __future__ import annotations

import os
import sys

from .paths import ASSETS_DIR


def resource_path(relative_path: str) -> str:
    """Return absolute path for an asset.

    Compatible with both dev environment and PyInstaller packaged environment.
    """
    # SECURITY: prevent path traversal
    safe_path = os.path.normpath(relative_path).lstrip(os.sep)
    if safe_path.startswith("..") or ".." in safe_path.split(os.sep):
        raise ValueError("Invalid relative path: path traversal detected")

    if hasattr(sys, "_MEIPASS"):
        full = os.path.join(sys._MEIPASS, "assets", safe_path)
    else:
        full = os.path.join(ASSETS_DIR, safe_path)
    
    # Ensure resolved path is still within assets directory
    resolved = os.path.abspath(full)
    base = os.path.abspath(ASSETS_DIR)
    if not resolved.startswith(base + os.sep) and resolved != base:
        raise ValueError("Invalid relative path: escapes assets directory")
    return resolved
