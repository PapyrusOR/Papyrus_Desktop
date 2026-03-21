"""AI工具函数 - 让AI可以操作程序数据"""

from __future__ import annotations

import json
import re
import time
from typing import Any, Protocol, TypedDict, cast


class CardData(TypedDict, total=False):
    q: str
    a: str
    next_review: float
    interval: float
    tags: list[str]
    ef: float
    repetitions: int


class SearchResultItem(TypedDict):
    index: int
    question: str
    answer: str


class StatsPayload(TypedDict):
    total_cards: int
    due_cards: int
    average_ef: float
    max_repetitions: int
    cards_mastered: int


class ToolResult(TypedDict, total=False):
    success: bool
    error: str
    message: str
    card: CardData
    old: dict[str, str]
    new: dict[str, str]
    deleted_card: CardData
    count: int
    results: list[SearchResultItem]
    stats: StatsPayload
    topic: str


class LoggerProtocol(Protocol):
    def log_event(self, event_type: str, data: object = None, level: str = "INFO") -> None: ...


class AppProtocol(Protocol):
    cards: list[CardData]
    logger: LoggerProtocol | None

    def save_data(self) -> None: ...
    def get_due_cards(self) -> list[CardData]: ...
    def next_card(self) -> None: ...


class ToolCall(TypedDict):
    tool: str
    params: dict[str, object]


class CardTools:
    """卡片操作工具集"""

    def __init__(self, app: AppProtocol) -> None:
        """初始化工具集

        app: PapyrusApp实例
        """
        self.app = app

    def _log_event(self, event_type: str, data: object = None, level: str = "INFO") -> None:
        """安全地写入事件日志（logger 可能为 None）"""
        logger = self.app.logger
        if logger is not None:
            logger.log_event(event_type, data, level=level)

    def _try_refresh_ui(self) -> None:
        """尝试刷新主学习区"""
        try:
            self.app.next_card()
        except Exception:
            pass

    def get_tools_definition(self) -> str:
        """返回工具定义，供AI理解"""
        return """
你可以使用以下工具来操作学习卡片：

1. 创建卡片 (create_card)
参数：
- question: 题目内容
- answer: 答案内容
- tags: 标签列表（可选）
示例：{"tool": "create_card", "params": {"question": "...", "answer": "...", "tags": ["数学"]}}

2. 更新卡片 (update_card)
参数：
- card_index: 卡片索引
- question: 新题目（可选）
- answer: 新答案（可选）
示例：{"tool": "update_card", "params": {"card_index": 0, "question": "..."}}

3. 删除卡片 (delete_card)
参数：
- card_index: 卡片索引
示例：{"tool": "delete_card", "params": {"card_index": 0}}

4. 搜索卡片 (search_cards)
参数：
- keyword: 搜索关键词
示例：{"tool": "search_cards", "params": {"keyword": "数学"}}

5. 获取统计 (get_card_stats)
无参数
示例：{"tool": "get_card_stats", "params": {}}

6. 生成练习集 (generate_practice_set)
参数：
- topic: 主题
- count: 题目数量（可选，默认5）
示例：{"tool": "generate_practice_set", "params": {"topic": "三角函数", "count": 5}}

使用格式：
```json
{"tool": "工具名", "params": {...}}
```

注意：所有修改操作会立即执行并保存。
"""

    def create_card(self, question: str, answer: str, tags: list[str] | None = None) -> ToolResult:
        """创建新卡片并立即保存"""
        if not question or not answer:
            return {"success": False, "error": "题目和答案不能为空"}

        tag_list: list[str] = tags if tags is not None else []
        new_card: CardData = {
            "q": question,
            "a": answer,
            "next_review": 0,
            "interval": 86400,
            "tags": tag_list,
            "ef": 2.5,
            "repetitions": 0,
        }

        self.app.cards.append(new_card)
        self.app.save_data()
        self._log_event("tool.create_card", {"question": question[:50]})
        self._try_refresh_ui()

        return {
            "success": True,
            "message": "卡片已创建并保存",
            "card": new_card,
        }

    def update_card(self, card_index: int, question: str | None = None, answer: str | None = None) -> ToolResult:
        """更新卡片并立即保存"""
        if card_index < 0 or card_index >= len(self.app.cards):
            return {"success": False, "error": "卡片索引无效"}

        card: CardData = self.app.cards[card_index]
        old_q = str(card.get("q", ""))
        old_a = str(card.get("a", ""))

        if question:
            card["q"] = question
        if answer:
            card["a"] = answer

        self.app.save_data()
        self._log_event(
            "tool.update_card",
            {"index": card_index, "old_q": old_q[:50], "new_q": question[:50] if question else None},
        )
        self._try_refresh_ui()

        return {
            "success": True,
            "message": "卡片已更新并保存",
            "old": {"q": old_q, "a": old_a},
            "new": {"q": str(card.get("q", "")), "a": str(card.get("a", ""))},
        }

    def delete_card(self, card_index: int) -> ToolResult:
        """删除卡片并立即保存"""
        if card_index < 0 or card_index >= len(self.app.cards):
            return {"success": False, "error": "卡片索引无效"}

        card: CardData = self.app.cards.pop(card_index)
        self.app.save_data()
        self._log_event("tool.delete_card", {"index": card_index, "question": str(card.get("q", ""))[:50]})
        self._try_refresh_ui()

        return {
            "success": True,
            "message": "卡片已删除并保存",
            "deleted_card": card,
        }

    def search_cards(self, keyword: str) -> ToolResult:
        """搜索卡片"""
        keyword_lower = (keyword or "").lower()
        results: list[SearchResultItem] = []

        for i, card in enumerate(self.app.cards):
            question = str(card.get("q", ""))
            answer = str(card.get("a", ""))
            if keyword_lower in question.lower() or keyword_lower in answer.lower():
                results.append(
                    {
                        "index": i,
                        "question": question,
                        "answer": answer[:100] + "..." if len(answer) > 100 else answer,
                    }
                )

        return {
            "success": True,
            "message": f"找到 {len(results)} 张相关卡片",
            "results": results,
        }

    def get_card_stats(self) -> ToolResult:
        """获取统计信息"""
        total = len(self.app.cards)
        due = len(self.app.get_due_cards())

        def safe_float(value: object, default: float) -> float:
            try:
                return float(value)  # type: ignore[arg-type]
            except (TypeError, ValueError):
                return default

        def safe_int(value: object, default: int) -> int:
            try:
                return int(cast(Any, value))
            except (TypeError, ValueError):
                return default

        efs = [safe_float(card.get("ef"), 2.5) for card in self.app.cards]
        avg_ef = sum(efs) / len(efs) if efs else 2.5

        reps = [safe_int(card.get("repetitions"), 0) for card in self.app.cards]

        return {
            "success": True,
            "stats": {
                "total_cards": total,
                "due_cards": due,
                "average_ef": round(avg_ef, 2),
                "max_repetitions": max(reps) if reps else 0,
                "cards_mastered": len([rep for rep in reps if rep >= 5]),
            },
        }

    def execute_tool(self, tool_name: str, params: dict[str, object]) -> ToolResult:
        """执行工具调用"""
        known_tools = {
            "create_card",
            "update_card",
            "delete_card",
            "search_cards",
            "get_card_stats",
            "generate_practice_set",
        }

        if tool_name not in known_tools:
            self._log_event("tool.unknown", {"tool": tool_name}, level="WARNING")
            return {"success": False, "error": f"未知工具: {tool_name}"}

        self._log_event("tool.execute_start", {"tool": tool_name, "params": params})
        start: float = time.time()
        try:
            if tool_name == "create_card":
                question: object | None = params.get("question")
                answer: object | None = params.get("answer")
                tags: object | None = params.get("tags")
                if not isinstance(question, str) or not isinstance(answer, str):
                    return {"success": False, "error": "question 和 answer 必须是字符串"}
                tag_list: list[str] | None = None
                if isinstance(tags, list):
                    tag_list = [str(tag) for tag in tags]
                result = self.create_card(question=question, answer=answer, tags=tag_list)
            elif tool_name == "update_card":
                card_index: object | None = params.get("card_index")
                question = params.get("question")
                answer = params.get("answer")
                if not isinstance(card_index, int):
                    return {"success": False, "error": "card_index 必须是整数"}
                result = self.update_card(
                    card_index=card_index,
                    question=question if isinstance(question, str) else None,
                    answer=answer if isinstance(answer, str) else None,
                )
            elif tool_name == "delete_card":
                card_index = params.get("card_index")
                if not isinstance(card_index, int):
                    return {"success": False, "error": "card_index 必须是整数"}
                result = self.delete_card(card_index=card_index)
            elif tool_name == "search_cards":
                keyword: object | None = params.get("keyword")
                if not isinstance(keyword, str):
                    return {"success": False, "error": "keyword 必须是字符串"}
                result = self.search_cards(keyword=keyword)
            elif tool_name == "get_card_stats":
                result = self.get_card_stats()
            else:
                topic: object | None = params.get("topic")
                count: object = params.get("count", 5)
                if not isinstance(topic, str):
                    return {"success": False, "error": "topic 必须是字符串"}
                count_int = count if isinstance(count, int) else 5
                result = self.generate_practice_set(topic=topic, count=count_int)

            elapsed = round(time.time() - start, 4)
            self._log_event(
                "tool.execute_ok",
                {
                    "tool": tool_name,
                    "elapsed_s": elapsed,
                    "result_type": type(result).__name__,
                },
            )
            return result

        except Exception as exc:
            elapsed = round(time.time() - start, 4)
            self._log_event(
                "tool.execute_error",
                {
                    "tool": tool_name,
                    "elapsed_s": elapsed,
                    "error": str(exc),
                },
                level="ERROR",
            )
            return {"success": False, "error": str(exc)}

    def generate_practice_set(self, topic: str, count: int = 5) -> ToolResult:
        """根据主题生成练习题（占位：未实现）"""
        return {
            "success": False,
            "error": "生成功能尚未实现",
            "topic": topic,
            "count": count,
        }

    def parse_tool_call(self, ai_response: str) -> ToolCall | None:
        """从AI响应中解析工具调用"""
        json_pattern = r"```json\s*(\{.*?\})\s*```"
        matches = re.findall(json_pattern, ai_response, re.DOTALL)

        if not matches:
            return None

        try:
            tool_call_obj: object = json.loads(matches[0])
            if (
                isinstance(tool_call_obj, dict)
                and isinstance(tool_call_obj.get("tool"), str)
                and isinstance(tool_call_obj.get("params"), dict)
            ):
                tool_call: ToolCall = {
                    "tool": cast(str, tool_call_obj["tool"]),
                    "params": cast(dict[str, object], tool_call_obj["params"]),
                }
                self._log_event(
                    "tool.parse_ok",
                    {
                        "tool": tool_call["tool"],
                        "params_keys": list(tool_call["params"].keys()),
                    },
                )
                return tool_call
        except Exception as exc:
            self._log_event("tool.parse_error", {"error": str(exc)}, level="WARNING")

        return None
