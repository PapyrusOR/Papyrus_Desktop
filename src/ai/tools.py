"""AI工具函数 - 让AI可以操作程序数据"""

import json
import time


class CardTools:
    """卡片操作工具集"""

    def __init__(self, app):
        """初始化工具集

        app: PapyrusApp实例
        """
        self.app = app

    def _log_event(self, event_type, data=None, level="INFO"):
        """安全地写入事件日志（logger 可能为 None）"""
        logger = getattr(self.app, "logger", None)
        if logger and hasattr(logger, "log_event"):
            logger.log_event(event_type, data, level=level)

    def _try_refresh_ui(self):
        """尝试刷新主学习区"""
        try:
            if hasattr(self.app, "next_card"):
                self.app.next_card()
        except Exception:
            pass

    def get_tools_definition(self):
        """返回工具定义，供AI理解"""
        return """
你可以使用以下工具来操作学习卡片：

1. create_card(question, answer, tags=[])
   - 创建新卡片
   - 参数：question(题目), answer(答案), tags(标签列表，可选)

2. update_card(card_index, question=None, answer=None)
   - 更新指定卡片
   - 参数：card_index(卡片索引), question(新题目), answer(新答案)

3. delete_card(card_index)
   - 删除指定卡片
   - 参数：card_index(卡片索引)

4. search_cards(keyword)
   - 搜索包含关键词的卡片
   - 参数：keyword(搜索关键词)
   - 返回：匹配的卡片列表

5. get_card_stats()
   - 获取学习统计
   - 返回：总卡片数、待复习数、平均难度等

6. generate_practice_set(topic, count=5)
   - 根据主题生成练习题（当前版本未实现；会返回未实现错误）
   - 参数：topic(主题), count(数量)


使用格式：
```json
{
  "tool": "create_card",
  "params": {
    "question": "什么是递归？",
    "answer": "递归是函数调用自身的过程"
  }
}
```

注意：所有修改操作会立即执行并保存。
"""

    def create_card(self, question, answer, tags=None):
        """创建新卡片并立即保存"""
        if not question or not answer:
            return {"success": False, "error": "题目和答案不能为空"}

        new_card = {
            "q": question,
            "a": answer,
            "next_review": 0,
            "interval": 0,
            "tags": tags or [],
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

    def update_card(self, card_index, question=None, answer=None):
        """更新卡片并立即保存"""
        if card_index < 0 or card_index >= len(self.app.cards):
            return {"success": False, "error": "卡片索引无效"}

        card = self.app.cards[card_index]
        old_q, old_a = card["q"], card["a"]

        if question:
            card["q"] = question
        if answer:
            card["a"] = answer

        if not question and not answer:
            return {"success": False, "error": "没有提供更新内容"}

        self.app.save_data()
        self._log_event("tool.update_card", {"index": card_index})
        self._try_refresh_ui()

        return {
            "success": True,
            "message": "卡片已更新并保存",
            "old": {"q": old_q, "a": old_a},
            "new": {"q": card["q"], "a": card["a"]},
        }

    def delete_card(self, card_index):
        """删除卡片并立即保存"""
        if card_index < 0 or card_index >= len(self.app.cards):
            return {"success": False, "error": "卡片索引无效"}

        card = self.app.cards.pop(card_index)
        self.app.save_data()
        self._log_event("tool.delete_card", {"index": card_index, "question": card["q"][:50]})
        self._try_refresh_ui()

        return {
            "success": True,
            "message": "卡片已删除并保存",
            "deleted_card": card,
        }

    def search_cards(self, keyword):
        """搜索卡片"""
        keyword = (keyword or "").lower()
        results = []

        for i, card in enumerate(self.app.cards):
            q = card.get("q", "")
            ans = card.get("a", "")
            if keyword in q.lower() or keyword in ans.lower():
                results.append(
                    {
                        "index": i,
                        "question": q,
                        "answer": ans[:100] + "..." if len(ans) > 100 else ans,
                    }
                )

        return {
            "success": True,
            "count": len(results),
            "results": results,
        }

    def get_card_stats(self):
        """获取统计信息"""
        total = len(self.app.cards)
        due = len(self.app.get_due_cards())

        efs = [c.get("ef", 2.5) for c in self.app.cards]
        avg_ef = sum(efs) / len(efs) if efs else 2.5

        reps = [c.get("repetitions", 0) for c in self.app.cards]

        return {
            "success": True,
            "stats": {
                "total_cards": total,
                "due_cards": due,
                "average_ef": round(avg_ef, 2),
                "max_repetitions": max(reps) if reps else 0,
                "cards_mastered": len([r for r in reps if r >= 5]),
            },
        }

    def execute_tool(self, tool_name, params):
        """执行工具调用"""
        tools = {
            "create_card": self.create_card,
            "update_card": self.update_card,
            "delete_card": self.delete_card,
            "search_cards": self.search_cards,
            "get_card_stats": self.get_card_stats,
            "generate_practice_set": self.generate_practice_set,
        }

        if tool_name not in tools:
            self._log_event("tool.unknown", {"tool": tool_name}, level="WARNING")
            return {"success": False, "error": f"未知工具: {tool_name}"}

        self._log_event("tool.execute_start", {"tool": tool_name, "params": params})
        start = time.time()
        try:
            result = tools[tool_name](**params)
            elapsed = round(time.time() - start, 4)

            if not isinstance(result, dict):
                result = {"success": True, "result": result}

            self._log_event(
                "tool.execute_ok",
                {
                    "tool": tool_name,
                    "elapsed_s": elapsed,
                    "success": result.get("success"),
                },
            )
            return result

        except Exception as e:
            elapsed = round(time.time() - start, 4)
            self._log_event(
                "tool.execute_error",
                {
                    "tool": tool_name,
                    "elapsed_s": elapsed,
                    "error": str(e),
                },
                level="ERROR",
            )
            return {"success": False, "error": str(e)}

    def generate_practice_set(self, topic, count=5):
        """根据主题生成练习题（占位：未实现）"""
        return {
            "success": False,
            "error": "generate_practice_set 当前版本未实现",
            "topic": topic,
            "count": count,
        }

    def parse_tool_call(self, ai_response):
        """从AI响应中解析工具调用"""
        import re

        json_pattern = r"```json\s*(\{.*?\})\s*```"
        matches = re.findall(json_pattern, ai_response, re.DOTALL)

        if not matches:
            return None

        try:
            tool_call = json.loads(matches[0])
            if "tool" in tool_call and "params" in tool_call:
                self._log_event(
                    "tool.parse_ok",
                    {
                        "tool": tool_call["tool"],
                        "params": tool_call["params"],
                    },
                )
                return tool_call
        except Exception as e:
            self._log_event("tool.parse_error", {"error": str(e)}, level="WARNING")

        return None
