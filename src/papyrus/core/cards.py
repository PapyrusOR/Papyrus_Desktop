from __future__ import annotations

"""Core card operations (UI-agnostic).

This module is meant to be reused by:
- Tkinter UI (legacy)
- FastAPI backend (for the React frontend)

Design goals:
- Keep dependencies minimal
- Keep storage format backward-compatible
- Add stable `id` to cards (generated lazily for old data)

NOTE about concurrency
- This uses an in-process lock only. Do NOT run multiple backend processes/workers
  against the same JSON file without a real file lock.
"""

import threading
import time
import uuid
from typing import Iterable, TypeAlias, TypedDict, cast


from papyrus.data.storage import CardRecord, load_cards, save_cards
from papyrus.logic.sm2 import apply_sm2, CardState
from papyrus.paths import BACKUP_FILE

_LOCK = threading.Lock()
_last_backup_time: float = 0.0

CardDict: TypeAlias = CardRecord


class NextDueResult(TypedDict):
    card: CardDict
    due_count: int
    total_count: int


class RateCardResult(TypedDict):
    card: CardDict
    interval_days: float
    ef: float



def _now_ts(now: float | None) -> float:
    return time.time() if now is None else float(now)


def _new_card(*, q: str, a: str, tags: list[str] | None = None) -> CardDict:
    return {
        "id": uuid.uuid4().hex,
        "q": q,
        "a": a,
        "next_review": 0.0,
        "interval": 0.0,
        "tags": tags or [],
    }


def _ensure_card_ids(cards: list[CardDict]) -> bool:
    """Ensure every card has a stable string id.

    Returns:
        changed: whether any card was modified.
    """

    changed = False
    for c in cards:
        cid = c.get("id")
        if not isinstance(cid, str) or not cid.strip():
            c["id"] = uuid.uuid4().hex
            changed = True
    return changed



def list_cards(data_file: str) -> list[CardDict]:
    with _LOCK:
        cards: list[CardDict] = load_cards(data_file)
        changed = _ensure_card_ids(cards)
        if changed:
            _save_cards(data_file, cards)
        return cards



def get_card(data_file: str, card_id: str) -> CardDict | None:
    cards = list_cards(data_file)
    for c in cards:
        if c.get("id") == card_id:
            return c
    return None



def create_card(data_file: str, q: str, a: str, tags: list[str] | None = None) -> CardDict:
    q = (q or "").strip()
    a = (a or "").strip()
    if not q or not a:
        raise ValueError("q/a 不能为空")

    with _LOCK:
        cards = load_cards(data_file)
        _ensure_card_ids(cards)

        card = _new_card(q=q, a=a, tags=tags)
        cards.append(card)
        _save_cards(data_file, cards)
        return card



def delete_card(data_file: str, card_id: str) -> bool:
    with _LOCK:
        cards = load_cards(data_file)
        _ensure_card_ids(cards)

        before = len(cards)
        cards = [c for c in cards if c.get("id") != card_id]
        if len(cards) == before:
            return False

        _save_cards(data_file, cards)
        return True



def import_from_txt(data_file: str, content: str) -> int:
    """Parse and import TXT content.

    Format:
        question === answer

    Blocks separated by one blank line.
    """

    content = content or ""
    blocks: Iterable[str] = content.split("\n\n")

    new_cards: list[CardDict] = []
    for block in blocks:
        if "===" not in block:
            continue
        q, a = (part.strip() for part in block.split("===", 1))
        if not q or not a:
            continue
        new_cards.append(_new_card(q=q, a=a))

    if not new_cards:
        return 0

    with _LOCK:
        cards = load_cards(data_file)
        _ensure_card_ids(cards)
        cards.extend(new_cards)
        _save_cards(data_file, cards)
        return len(new_cards)



def get_due_cards(cards: list[CardDict], *, now: float | None = None, tag: str | None = None) -> list[CardDict]:
    ts = _now_ts(now)
    due = [c for c in cards if float(c.get("next_review", 0.0) or 0.0) <= ts]
    if tag is not None:
        due = [c for c in due if tag in (c.get("tags") or [])]
    return due



def get_next_due(data_file: str, *, now: float | None = None, tag: str | None = None) -> NextDueResult | None:
    """Return the next due card plus counts.

    Returns:
        None if no due card
        else { card, due_count, total_count }
    """

    cards = list_cards(data_file)
    due = get_due_cards(cards, now=now, tag=tag)
    if not due:
        return None

    return {
        "card": due[0],
        "due_count": len(due),
        "total_count": len(cards),
    }



def rate_card(data_file: str, card_id: str, grade: int, *, now: float | None = None) -> RateCardResult | None:
    """Apply SM-2 to a card by id and persist.

    Returns:
        { card, interval_days, ef } or None if card not found
    """

    ts = _now_ts(now)

    with _LOCK:
        cards = load_cards(data_file)
        _ensure_card_ids(cards)

        target: CardDict | None = None
        for c in cards:
            if c.get("id") == card_id:
                target = c
                break

        if target is None:
            return None

        interval_days, ef = apply_sm2(cast(CardState, target), int(grade), now=ts)
        _save_cards(data_file, cards)

        return {
            "card": target,
            "interval_days": interval_days,
            "ef": ef,
        }



def update_card(data_file: str, card_id: str, *, q: str | None = None, a: str | None = None, tags: list[str] | None = None) -> CardDict | None:
    """Update a card's fields by id."""
    with _LOCK:
        cards = load_cards(data_file)
        _ensure_card_ids(cards)

        target: CardDict | None = None
        for c in cards:
            if c.get("id") == card_id:
                target = c
                break

        if target is None:
            return None

        if q is not None:
            target["q"] = q.strip()
        if a is not None:
            target["a"] = a.strip()
        if tags is not None:
            target["tags"] = tags

        _save_cards(data_file, cards)
        return target



def _save_cards(data_file: str, cards: list[CardDict]) -> None:
    global _last_backup_time
    _last_backup_time = save_cards(
        data_file,
        cards,
        backup_file=BACKUP_FILE,
        last_backup_time=_last_backup_time,
    )
