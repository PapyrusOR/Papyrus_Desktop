"""Papyrus application package.

This package contains the refactored implementation of the original monolithic
`src/Papyrus.py` module.

The legacy tkinter `PapyrusApp` no longer exists. The supported public entrypoint
is now `run_app`, alongside the shared path/resource helpers.
"""

from .app import run_app  # noqa: F401
from .paths import (  # noqa: F401
    BASE_DIR,
    DATA_DIR,
    BACKUP_DIR,
    ASSETS_DIR,
    LOG_DIR,
    DATA_FILE,
    BACKUP_FILE,
)
from .resources import resource_path  # noqa: F401

__all__ = [
    "run_app",
    "BASE_DIR",
    "DATA_DIR",
    "BACKUP_DIR",
    "ASSETS_DIR",
    "LOG_DIR",
    "DATA_FILE",
    "BACKUP_FILE",
    "resource_path",
]

