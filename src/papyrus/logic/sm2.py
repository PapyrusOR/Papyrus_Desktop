"""SM-2 spaced repetition algorithm helpers."""

from __future__ import annotations

import time
from typing import TypedDict, NotRequired


class CardState(TypedDict):
    """SM-2 algorithm card state."""
    ef: NotRequired[float]
    repetitions: NotRequired[int]
    interval: NotRequired[float]
    next_review: NotRequired[float]


def apply_sm2(card: CardState, grade: int, *, now: float | None = None) -> tuple[float, float]:
    """Apply SM-2 update to `card` in-place.

    Args:
        card: Card dict, will be updated.
        grade: 1=forget, 2=fuzzy, 3=perfect.
        now: Optional override timestamp.

    Returns:
        (interval_days, ef)
    """
    if now is None:
        now = time.time()

    ef_raw: float | int | None = card.get("ef")
    ef = float(ef_raw) if isinstance(ef_raw, (int, float)) else 2.5

    rep_raw: int | float | None = card.get("repetitions")
    repetitions = int(rep_raw) if isinstance(rep_raw, (int, float)) and not isinstance(rep_raw, bool) else 0

    quality_map: dict[int, int] = {1: 1, 2: 3, 3: 5}
    quality = quality_map.get(grade, 3)

    if quality >= 3:
        if repetitions == 0:
            interval_days = 1.0
        elif repetitions == 1:
            interval_days = 6.0
        else:
            interval_raw: float | int | None = card.get("interval")
            interval_val = float(interval_raw) if isinstance(interval_raw, (int, float)) else 86400.0
            interval_days = (interval_val / 86400.0) * ef
        repetitions += 1
    else:
        repetitions = 0
        interval_days = 1.0

    ef = ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
    ef = max(1.3, ef)

    interval_seconds = interval_days * 86400.0
    card["next_review"] = now + interval_seconds
    card["interval"] = interval_seconds
    card["ef"] = round(ef, 2)
    card["repetitions"] = repetitions

    return interval_days, ef
