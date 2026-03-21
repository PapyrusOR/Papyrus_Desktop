"""FastAPI backend for Papyrus.

Goal:
- Provide a clean HTTP API for a TS/React frontend.
- Reuse existing Papyrus core logic (UI-agnostic) without rewriting scheduling.

NOTE: Concurrency
- This service uses an in-process lock (see `papyrus.core.cards`).
- Do NOT run multiple backend processes/workers against the same JSON file
  unless a real file lock is introduced.

Run (dev):

```bash
python -m uvicorn src.papyrus_api.main:app --reload
```

"""

from __future__ import annotations

import os
from typing import Literal

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from papyrus.core import cards as card_core
from papyrus.core.cards import CardDict, NextDueResult
from papyrus.paths import DATA_FILE


def _get_data_file() -> str:
    # Allow overriding in deployment
    return os.environ.get("PAPYRUS_DATA_FILE", DATA_FILE)


def _pick_card_text(*values: str | None) -> str:
    for value in values:
        if isinstance(value, str):
            stripped = value.strip()
            if stripped:
                return stripped
    return ""


app = FastAPI(title="Papyrus API", version="0.2.0")


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


class CreateCardIn(BaseModel):
    q: str | None = None
    a: str | None = None
    question: str | None = None
    answer: str | None = None


class RateCardIn(BaseModel):
    grade: Literal[1, 2, 3] = Field(..., description="1=忘记, 2=模糊, 3=秒杀")


class ImportTxtIn(BaseModel):
    content: str


class CardsListResponse(BaseModel):
    success: bool
    cards: list[CardDict]
    count: int


class CreateCardResponse(BaseModel):
    success: bool
    card: CardDict


class DeleteCardResponse(BaseModel):
    success: bool


class NextDueEmptyResponse(BaseModel):
    success: bool
    card: None = None
    due_count: int
    total_count: int


class NextDueResponse(BaseModel):
    success: bool
    card: CardDict
    due_count: int
    total_count: int


class RateCardResponse(BaseModel):
    success: bool
    card: CardDict
    interval_days: float
    ef: float
    next: NextDueResult | None


class ImportTxtResponse(BaseModel):
    success: bool
    count: int


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/cards", response_model=CardsListResponse)
def list_cards() -> CardsListResponse:
    data_file = _get_data_file()
    cards = card_core.list_cards(data_file)
    return CardsListResponse(success=True, cards=cards, count=len(cards))


@app.post("/api/cards", response_model=CreateCardResponse)
def create_card(payload: CreateCardIn) -> CreateCardResponse:
    q = _pick_card_text(payload.q, payload.question)
    a = _pick_card_text(payload.a, payload.answer)


    data_file = _get_data_file()
    try:
        card = card_core.create_card(data_file, q=q, a=a)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    return CreateCardResponse(success=True, card=card)


@app.delete("/api/cards/{card_id}", response_model=DeleteCardResponse)
def delete_card(card_id: str) -> DeleteCardResponse:
    data_file = _get_data_file()
    ok = card_core.delete_card(data_file, card_id)
    if not ok:
        raise HTTPException(status_code=404, detail="card not found")
    return DeleteCardResponse(success=True)


@app.get("/api/review/next", response_model=NextDueResponse | NextDueEmptyResponse)
def get_next_due() -> NextDueResponse | NextDueEmptyResponse:
    """Get next due card.

    If no cards are due, returns success with card=None.
    """

    data_file = _get_data_file()
    res = card_core.get_next_due(data_file)
    if res is None:
        cards = card_core.list_cards(data_file)
        return NextDueEmptyResponse(
            success=True,
            card=None,
            due_count=0,
            total_count=len(cards),
        )

    return NextDueResponse(success=True, **res)


@app.post("/api/review/{card_id}/rate", response_model=RateCardResponse)
def rate_card(card_id: str, payload: RateCardIn) -> RateCardResponse:
    data_file = _get_data_file()
    res = card_core.rate_card(data_file, card_id, int(payload.grade))
    if res is None:
        raise HTTPException(status_code=404, detail="card not found")

    # also return the next due snapshot for convenience
    nxt = card_core.get_next_due(data_file)
    return RateCardResponse(success=True, **res, next=nxt)


@app.post("/api/import/txt", response_model=ImportTxtResponse)
def import_txt(payload: ImportTxtIn) -> ImportTxtResponse:
    data_file = _get_data_file()
    count = card_core.import_from_txt(data_file, payload.content)
    if count == 0:
        raise HTTPException(status_code=400, detail="未找到有效卡片，请确认格式为：题目===答案")
    return ImportTxtResponse(success=True, count=count)

