"""CardTools（AI工具）单元测试

说明：当前版本已取消“待审批队列”，create/update/delete 会立即写入 cards 并调用 save_data()。
"""

import os
import sys
import unittest
from unittest.mock import MagicMock


# 添加 src 到路径
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "src"))


class _FakeApp:
    """最小化的 PapyrusApp 替身，用于测试 CardTools"""

    def __init__(self):
        self.cards = []
        self.save_data = MagicMock()
        self.next_card = MagicMock()
        self.logger = None

    def get_due_cards(self):
        return [c for c in self.cards if c.get("next_review", 0) <= 0]


class TestCardToolsImmediateWrite(unittest.TestCase):
    def setUp(self):
        from ai.tools import CardTools

        self.app = _FakeApp()
        self.tools = CardTools(self.app)

    def test_tools_definition_mentions_immediate_save(self):
        text = self.tools.get_tools_definition()
        self.assertIn("立即执行", text)
        self.assertNotIn("待审批", text)

    def test_create_card_appends_and_saves(self):
        result = self.tools.create_card("Q1", "A1", tags=["t"])

        self.assertTrue(result["success"])
        self.assertEqual(len(self.app.cards), 1)
        self.assertEqual(self.app.cards[0]["q"], "Q1")
        self.assertEqual(self.app.cards[0]["a"], "A1")
        self.assertEqual(self.app.cards[0]["tags"], ["t"])
        self.app.save_data.assert_called_once()
        self.app.next_card.assert_called_once()

    def test_create_card_requires_q_and_a(self):
        self.assertFalse(self.tools.create_card("", "A")["success"])
        self.assertFalse(self.tools.create_card("Q", "")["success"])
        self.app.save_data.assert_not_called()

    def test_update_card_updates_and_saves(self):
        self.app.cards = [{"q": "Q", "a": "A", "next_review": 0, "interval": 0}]

        result = self.tools.update_card(0, question="Q2")

        self.assertTrue(result["success"])
        self.assertEqual(self.app.cards[0]["q"], "Q2")
        self.assertEqual(self.app.cards[0]["a"], "A")
        self.app.save_data.assert_called_once()

    def test_update_card_invalid_index(self):
        self.app.cards = []
        result = self.tools.update_card(0, question="Q")
        self.assertFalse(result["success"])
        self.app.save_data.assert_not_called()

    def test_delete_card_deletes_and_saves(self):
        self.app.cards = [
            {"q": "Q1", "a": "A1", "next_review": 0, "interval": 0},
            {"q": "Q2", "a": "A2", "next_review": 0, "interval": 0},
        ]

        result = self.tools.delete_card(0)

        self.assertTrue(result["success"])
        self.assertEqual(len(self.app.cards), 1)
        self.assertEqual(self.app.cards[0]["q"], "Q2")
        self.app.save_data.assert_called_once()

    def test_search_cards(self):
        self.app.cards = [
            {"q": "Python 是什么", "a": "语言", "next_review": 0, "interval": 0},
            {"q": "Java", "a": "语言", "next_review": 0, "interval": 0},
        ]

        res = self.tools.search_cards("python")
        self.assertTrue(res["success"])
        self.assertEqual(res["count"], 1)
        self.assertEqual(res["results"][0]["index"], 0)

    def test_search_cards_tolerates_missing_fields(self):
        """卡片缺少 q 或 a 字段时不应崩溃（回归：search_cards 曾用 card["a"] 硬索引抛 KeyError）"""
        self.app.cards = [
            {"q": "只有题目"},                   # 缺 a
            {"a": "只有答案"},                   # 缺 q
            {"q": "完整卡片", "a": "完整答案"},
        ]
        # 命中完整卡片，且不会因前两张缺字段的卡片抛 KeyError
        res = self.tools.search_cards("完整")
        self.assertTrue(res["success"])
        self.assertEqual(res["count"], 1)
        self.assertEqual(res["results"][0]["question"], "完整卡片")

        # 仅有题目/仅有答案的卡片也能各自被关键词命中
        self.assertEqual(self.tools.search_cards("只有题目")["count"], 1)
        self.assertEqual(self.tools.search_cards("只有答案")["count"], 1)

    def test_get_card_stats(self):
        self.app.cards = [
            {"q": "Q1", "a": "A1", "next_review": 0, "interval": 0, "ef": 2.5, "repetitions": 0},
            {"q": "Q2", "a": "A2", "next_review": 999999, "interval": 0, "ef": 2.0, "repetitions": 5},
        ]

        res = self.tools.get_card_stats()
        self.assertTrue(res["success"])
        self.assertEqual(res["stats"]["total_cards"], 2)

    def test_execute_tool_unknown(self):
        res = self.tools.execute_tool("no_such_tool", {})
        self.assertFalse(res["success"])
        self.assertIn("未知工具", res["error"])

    def test_parse_tool_call(self):
        ai_response = (
            "这里是回复\n"
            "```json\n"
            "{\"tool\": \"create_card\", \"params\": {\"question\": \"Q\", \"answer\": \"A\"}}\n"
            "```\n"
        )

        tool_call = self.tools.parse_tool_call(ai_response)
        self.assertEqual(tool_call["tool"], "create_card")
        self.assertEqual(tool_call["params"]["question"], "Q")


if __name__ == "__main__":
    unittest.main()