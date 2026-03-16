"""FastAPI backend (reservation scaffold).

Goal:
- Provide a clean HTTP API for a TS/React frontend.
- Reuse existing Papyrus data layer (load/save cards) without rewriting logic.

NOTE: Concurrency
- The Tkinter GUI app and this API should not write to the same JSON file concurrently
  unless a file lock is introduced.

Run (dev):
    python -m uvicorn src.papyrus_api.main:app --reload

"""

from __future__ import annotations

import os
from typing import Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from papyrus.paths import DATA_FILE
from papyrus.data.storage import load_cards, save_cards


def _get_data_file() -> str:
    # Allow overriding in deployment
    return os.environ.get("PAPYRUS_DATA_FILE", DATA_FILE)


app = FastAPI(title="Papyrus API", version="0.1.0")

# Frontend dev server (vite) defaults to 5173
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/cards")
def list_cards() -> dict[str, Any]:
    data_file = _get_data_file()
    cards = load_cards(data_file)
    return {"success": True, "cards": cards, "count": len(cards)}


@app.post("/api/cards")
def create_card(payload: dict[str, Any]) -> dict[str, Any]:
    question = (payload.get("q") or payload.get("question") or "").strip()
    answer = (payload.get("a") or payload.get("answer") or "").strip()
    if not question or not answer:
        return {"success": False, "error": "q/a 不能为空"}

    data_file = _get_data_file()
    cards = load_cards(data_file)
    cards.append({"q": question, "a": answer, "next_review": 0, "interval": 0})
    save_cards(data_file, cards)
    return {"success": True, "card": cards[-1]}
