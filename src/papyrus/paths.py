from __future__ import annotations

from pathlib import Path
import os
import sys

# NOTE: This module centralizes all filesystem paths used by the app.
# In production (PyInstaller), data should be stored in user's data directory
# controlled by Electron via PAPYRUS_DATA_DIR environment variable.

def get_base_dir() -> Path:
    """Get project root or PyInstaller temp directory."""
    if hasattr(sys, "_MEIPASS"):
        # PyInstaller temp directory (read-only)
        return Path(sys._MEIPASS)
    # Development: project root
    return Path(__file__).resolve().parents[2]

def get_data_dir() -> str:
    """Get data directory."""
    # In production, Electron sets this environment variable
    env_data_dir = os.environ.get("PAPYRUS_DATA_DIR")
    if env_data_dir:
        return env_data_dir
    # Development or fallback
    return str(get_base_dir() / "data")

def get_assets_dir() -> str:
    """Get assets directory (read-only, bundled with app)."""
    base = get_base_dir()
    # In PyInstaller, assets are bundled at root
    if hasattr(sys, "_MEIPASS"):
        return str(base / "assets")
    return str(base / "assets")

# Base directory (read-only in production)
BASE_DIR = str(get_base_dir())

# Data directories (writable, controlled by environment or default)
DATA_DIR = get_data_dir()
BACKUP_DIR = os.path.join(DATA_DIR, "backup")
ASSETS_DIR = get_assets_dir()
LOG_DIR = os.path.join(DATA_DIR, "logs")

# Ensure directories exist
for directory in [DATA_DIR, BACKUP_DIR, LOG_DIR]:
    os.makedirs(directory, exist_ok=True)

# File paths
DATA_FILE = str(Path(DATA_DIR) / "Papyrusdata.json")
BACKUP_FILE = str(Path(BACKUP_DIR) / "Papyrusdata.json.bak")
SCROLLS_FILE = str(Path(DATA_DIR) / "scrolls.json")
NOTES_FILE = str(Path(DATA_DIR) / "notes_data.json")
NOTES_BACKUP_FILE = str(Path(BACKUP_DIR) / "notes_data.json.bak")

# SQLite database file
DATABASE_FILE = str(Path(DATA_DIR) / "papyrus.db")
