#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""FastAPI API 集成测试

使用真实数据层的集成测试，不再过度 Mock 核心逻辑。
"""

import sys
import os
import unittest
import tempfile
import shutil
import time
import uuid
from unittest.mock import patch, MagicMock

# 添加 src 到路径
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "src"))


class IntegrationTestBase(unittest.TestCase):
    """集成测试基类，提供临时数据目录设置和隔离。
    
    每个测试方法使用独立的数据库文件，确保完全隔离。
    """
    
    def setUp(self):
        """每个测试前创建新的临时数据库。"""
        # 创建唯一的临时目录
        self.tmp_dir = tempfile.mkdtemp(prefix=f"papyrus_test_{uuid.uuid4().hex[:8]}_")
        self.data_file = os.path.join(self.tmp_dir, "cards.json")
        self.db_file = os.path.join(self.tmp_dir, "test.db")
        self.notes_file = os.path.join(self.tmp_dir, "notes_data.json")
        
        # 设置环境变量
        os.environ["PAPYRUS_DATA_FILE"] = self.data_file
        os.environ["PAPYRUS_DATA_DIR"] = self.tmp_dir
        
        # 创建备份和日志目录
        os.makedirs(os.path.join(self.tmp_dir, "backup"), exist_ok=True)
        os.makedirs(os.path.join(self.tmp_dir, "logs"), exist_ok=True)
    
    def tearDown(self):
        """每个测试后清理临时目录。"""
        shutil.rmtree(self.tmp_dir, ignore_errors=True)


def create_test_client(tmp_dir: str, data_file: str, db_file: str):
    """创建测试客户端，Mock 掉 MCP 服务器和外部依赖。
    
    Args:
        tmp_dir: 临时数据目录
        data_file: 卡片数据文件路径
        db_file: 数据库文件路径
    """
    # 设置环境变量
    os.environ["PAPYRUS_DATA_FILE"] = data_file
    os.environ["PAPYRUS_DATA_DIR"] = tmp_dir
    
    # 重新导入 paths 模块以使用新环境变量
    import papyrus.paths
    papyrus.paths.DATA_DIR = tmp_dir
    papyrus.paths.DATA_FILE = data_file
    papyrus.paths.DATABASE_FILE = db_file
    papyrus.paths.NOTES_FILE = os.path.join(tmp_dir, "notes_data.json")
    papyrus.paths.BACKUP_DIR = os.path.join(tmp_dir, "backup")
    papyrus.paths.LOG_DIR = os.path.join(tmp_dir, "logs")
    
    # 确保目录存在
    os.makedirs(papyrus.paths.BACKUP_DIR, exist_ok=True)
    os.makedirs(papyrus.paths.LOG_DIR, exist_ok=True)
    
    # 初始化数据库
    from papyrus.data.database import init_database
    init_database(db_file)
    
    # Mock MCP 服务器和相关外部依赖
    with patch.dict('sys.modules', {
        'mcp': MagicMock(),
        'mcp.server': MagicMock(),
        'mcp.vault_tools': MagicMock(),
    }):
        with patch('papyrus_api.main.MCPServer') as mock_mcp:
            mock_instance = MagicMock()
            mock_mcp.return_value = mock_instance
            
            # 清除模块缓存以确保使用最新的环境变量
            modules_to_clear = [k for k in sys.modules.keys() 
                            if k.startswith('papyrus_api.') or k.startswith('papyrus.')]
            for mod in modules_to_clear:
                if mod in sys.modules:
                    del sys.modules[mod]
            
            # 延迟导入 FastAPI 相关模块
            from fastapi.testclient import TestClient
            from papyrus_api.main import app
            
            return TestClient(app), mock_instance


class TestHealthEndpoint(IntegrationTestBase):
    """测试健康检查端点。"""
    
    def test_health_check(self):
        """健康检查应该返回 ok。"""
        client, _ = create_test_client(self.tmp_dir, self.data_file, self.db_file)
        response = client.get("/api/health")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "ok"})


class TestCardsAPI(IntegrationTestBase):
    """测试卡片 API - 使用真实数据层。"""
    
    def test_list_cards(self):
        """真实创建卡片后验证列表。"""
        client, _ = create_test_client(self.tmp_dir, self.data_file, self.db_file)
        
        # 先创建一张卡片
        client.post("/api/cards", json={"q": "Test Q1", "a": "Test A1"})
        
        # 获取卡片列表
        response = client.get("/api/cards")
        
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        self.assertEqual(data["count"], 1)
        self.assertEqual(len(data["cards"]), 1)
        self.assertEqual(data["cards"][0]["q"], "Test Q1")
        self.assertEqual(data["cards"][0]["a"], "Test A1")
    
    def test_create_card(self):
        """验证真实创建卡片到数据库。"""
        client, _ = create_test_client(self.tmp_dir, self.data_file, self.db_file)
        
        response = client.post("/api/cards", json={
            "q": "What is Python?",
            "a": "A programming language.",
            "tags": ["programming", "python"]
        })
        
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        self.assertEqual(data["card"]["q"], "What is Python?")
        self.assertEqual(data["card"]["a"], "A programming language.")
        self.assertEqual(data["card"]["tags"], ["programming", "python"])
        self.assertIn("id", data["card"])
        
        # 验证卡片真的在数据库中
        list_response = client.get("/api/cards")
        list_data = list_response.json()
        self.assertEqual(list_data["count"], 1)
    
    def test_create_card_empty_qa(self):
        """创建卡片时问题或答案为空应该返回 400。"""
        client, _ = create_test_client(self.tmp_dir, self.data_file, self.db_file)
        
        response = client.post("/api/cards", json={"q": "", "a": ""})
        self.assertEqual(response.status_code, 400)
    
    def test_delete_card(self):
        """验证真实删除卡片。"""
        client, _ = create_test_client(self.tmp_dir, self.data_file, self.db_file)
        
        # 先创建一张卡片
        create_response = client.post("/api/cards", json={"q": "To Delete", "a": "Answer"})
        card_id = create_response.json()["card"]["id"]
        
        # 删除卡片
        response = client.delete(f"/api/cards/{card_id}")
        
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        
        # 验证卡片已被删除
        list_response = client.get("/api/cards")
        list_data = list_response.json()
        self.assertEqual(list_data["count"], 0)
    
    def test_delete_card_not_found(self):
        """删除不存在的卡片应该返回 404。"""
        client, _ = create_test_client(self.tmp_dir, self.data_file, self.db_file)
        
        response = client.delete("/api/cards/non-existent-id")
        
        self.assertEqual(response.status_code, 404)
    
    def test_import_txt(self):
        """真实导入文本卡片。"""
        client, _ = create_test_client(self.tmp_dir, self.data_file, self.db_file)
        
        content = "Question 1 === Answer 1\n\nQuestion 2 === Answer 2"
        response = client.post("/api/cards/import/txt", json={"content": content})
        
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        self.assertEqual(data["count"], 2)
        
        # 验证卡片真的被导入
        list_response = client.get("/api/cards")
        list_data = list_response.json()
        self.assertEqual(list_data["count"], 2)
    
    def test_import_txt_empty(self):
        """导入空内容应该返回 400。"""
        client, _ = create_test_client(self.tmp_dir, self.data_file, self.db_file)
        
        response = client.post("/api/cards/import/txt", json={"content": ""})
        self.assertEqual(response.status_code, 400)
    
    def test_import_txt_invalid_format(self):
        """导入无效格式应该返回 400。"""
        client, _ = create_test_client(self.tmp_dir, self.data_file, self.db_file)
        
        response = client.post("/api/cards/import/txt", json={"content": "no separator here"})
        self.assertEqual(response.status_code, 400)


class TestReviewAPI(IntegrationTestBase):
    """测试复习 API - 使用真实数据层和 SM-2 算法。"""
    
    def test_get_next_due(self):
        """创建待复习卡片后获取。"""
        client, _ = create_test_client(self.tmp_dir, self.data_file, self.db_file)
        
        # 创建一张过期的卡片（next_review = 0 表示已过期）
        client.post("/api/cards", json={"q": "Due Question", "a": "Due Answer"})
        
        response = client.get("/api/review/next")
        
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        self.assertIsNotNone(data["card"])
        self.assertEqual(data["card"]["q"], "Due Question")
        self.assertEqual(data["due_count"], 1)
        self.assertEqual(data["total_count"], 1)
    
    def test_get_next_due_empty(self):
        """无卡片时的处理。"""
        client, _ = create_test_client(self.tmp_dir, self.data_file, self.db_file)
        
        response = client.get("/api/review/next")
        
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        self.assertIsNone(data["card"])
        self.assertEqual(data["due_count"], 0)
        self.assertEqual(data["total_count"], 0)
    
    def test_get_next_due_no_due_cards(self):
        """有卡片但没有到期卡片时的处理。"""
        client, _ = create_test_client(self.tmp_dir, self.data_file, self.db_file)
        
        # 创建一张卡片并评分（让它变成未来到期）
        create_response = client.post("/api/cards", json={"q": "Future", "a": "Card"})
        card_id = create_response.json()["card"]["id"]
        
        # 评分 3（完全记住），会让卡片间隔变大，变成未来到期
        client.post(f"/api/review/{card_id}/rate", json={"grade": 3})
        
        # 现在应该没有到期卡片了
        response = client.get("/api/review/next")
        
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        self.assertIsNone(data["card"])
        self.assertEqual(data["due_count"], 0)
        self.assertEqual(data["total_count"], 1)
    
    def test_rate_card(self):
        """真实评分卡片，验证 SM-2 算法。"""
        client, _ = create_test_client(self.tmp_dir, self.data_file, self.db_file)
        
        # 创建一张卡片
        create_response = client.post("/api/cards", json={"q": "Rate Me", "a": "Please"})
        card_id = create_response.json()["card"]["id"]
        
        # 评分 3（完全记住）
        response = client.post(f"/api/review/{card_id}/rate", json={"grade": 3})
        
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        self.assertEqual(data["card"]["id"], card_id)
        # SM-2 算法：第一次评分 3，间隔应该是 1 天，EF 应该 >= 2.5
        self.assertGreaterEqual(data["interval_days"], 1.0)
        self.assertGreaterEqual(data["ef"], 2.5)
        
        # 验证卡片的 next_review 被更新了
        card = data["card"]
        self.assertGreater(card["next_review"], 0)
        self.assertGreaterEqual(card["interval"], 1.0)
    
    def test_rate_card_with_ef_change(self):
        """评分影响 EF 值。"""
        client, _ = create_test_client(self.tmp_dir, self.data_file, self.db_file)
        
        # 创建一张卡片
        create_response = client.post("/api/cards", json={"q": "EF Test", "a": "Answer"})
        card_id = create_response.json()["card"]["id"]
        
        # 第一次评分 3
        client.post(f"/api/review/{card_id}/rate", json={"grade": 3})
        
        # 修改卡片使其立即到期（模拟时间过去）
        from papyrus.core import cards as card_core
        from papyrus_api.deps import get_data_file
        card_core.update_card(get_data_file(), card_id, q="EF Test Updated")
        
        # 修改 next_review 为过去的时间使其到期
        import papyrus.data.database as db
        db.update_card(self.db_file, {
            "id": card_id,
            "q": "EF Test Updated",
            "a": "Answer",
            "next_review": 0,
            "interval": 1.0,
            "ef": 2.5,
            "repetitions": 1,
            "tags": []
        })
        
        # 第二次评分 2（模糊），EF 应该降低
        response = client.post(f"/api/review/{card_id}/rate", json={"grade": 2})
        
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        # 评分 2 会让 EF 从 2.5 降到约 2.36
        self.assertLess(data["ef"], 2.5)
    
    def test_rate_card_not_found(self):
        """评分不存在的卡片应该返回 404。"""
        client, _ = create_test_client(self.tmp_dir, self.data_file, self.db_file)
        
        response = client.post("/api/review/non-existent/rate", json={"grade": 3})
        
        self.assertEqual(response.status_code, 404)


class TestSearchAPI(IntegrationTestBase):
    """测试搜索 API - 使用真实笔记数据。"""
    
    def test_search_empty(self):
        """空搜索返回空结果。"""
        client, _ = create_test_client(self.tmp_dir, self.data_file, self.db_file)
        
        response = client.get("/api/search?query=")
        
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        self.assertEqual(data["total"], 0)
        self.assertEqual(data["notes_count"], 0)
        self.assertEqual(data["cards_count"], 0)
    
    def test_search_notes(self):
        """创建笔记后搜索。"""
        client, _ = create_test_client(self.tmp_dir, self.data_file, self.db_file)
        
        # 创建一条笔记
        client.post("/api/notes", json={
            "title": "Python Guide",
            "folder": "dev",
            "content": "Python is a great programming language.",
            "tags": ["python", "programming"]
        })
        
        # 搜索 "python"
        response = client.get("/api/search?query=python")
        
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        self.assertEqual(data["total"], 1)
        self.assertEqual(data["notes_count"], 1)
        self.assertEqual(data["results"][0]["type"], "note")
        self.assertEqual(data["results"][0]["title"], "Python Guide")
    
    def test_search_cards(self):
        """创建卡片后搜索。"""
        client, _ = create_test_client(self.tmp_dir, self.data_file, self.db_file)
        
        # 创建一张卡片
        client.post("/api/cards", json={
            "q": "What is JavaScript?",
            "a": "A programming language for the web."
        })
        
        # 搜索 "JavaScript"
        response = client.get("/api/search?query=JavaScript")
        
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        self.assertEqual(data["total"], 1)
        self.assertEqual(data["cards_count"], 1)
        self.assertEqual(data["results"][0]["type"], "card")
    
    def test_search_multiple_results(self):
        """搜索返回多个类型的结果。"""
        client, _ = create_test_client(self.tmp_dir, self.data_file, self.db_file)
        
        # 创建笔记和卡片
        client.post("/api/notes", json={
            "title": "Python Tutorial",
            "folder": "dev",
            "content": "Learn Python programming.",
            "tags": []
        })
        client.post("/api/cards", json={
            "q": "Python syntax",
            "a": "Python uses indentation."
        })
        
        # 搜索 "Python"
        response = client.get("/api/search?query=Python")
        
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        self.assertEqual(data["total"], 2)
        self.assertEqual(data["notes_count"], 1)
        self.assertEqual(data["cards_count"], 1)
    
    def test_search_no_match(self):
        """搜索无匹配内容。"""
        client, _ = create_test_client(self.tmp_dir, self.data_file, self.db_file)
        
        # 创建内容
        client.post("/api/cards", json={"q": "Apple", "a": "Fruit"})
        
        # 搜索不存在的关键词
        response = client.get("/api/search?query=banana")
        
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        self.assertEqual(data["total"], 0)


class TestAIConfigAPI(IntegrationTestBase):
    """测试 AI 配置 API。"""
    
    @patch('papyrus_api.routers.ai.get_ai_config')
    def test_get_ai_config(self, mock_get_config):
        """获取 AI 配置。"""
        mock_config = MagicMock()
        mock_config.config = {
            "current_provider": "openai",
            "current_model": "gpt-3.5-turbo",
            "providers": {
                "openai": {"api_key": "sk-xxx", "base_url": "", "models": ["gpt-3.5"]},
                "anthropic": {"api_key": "", "base_url": "", "models": []},
            },
            "parameters": {"temperature": 0.7, "top_p": 0.9, "max_tokens": 2000, 
                          "presence_penalty": 0.0, "frequency_penalty": 0.0},
            "features": {"auto_hint": False, "auto_explain": False, "context_length": 10, "agent_enabled": False},
        }
        mock_get_config.return_value = mock_config
        
        client, _ = create_test_client(self.tmp_dir, self.data_file, self.db_file)
        response = client.get("/api/config/ai")
        
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        self.assertEqual(data["config"]["current_provider"], "openai")
        self.assertEqual(data["config"]["current_model"], "gpt-3.5-turbo")
    
    @patch('papyrus_api.routers.ai.get_ai_config')
    def test_test_connection_no_key(self, mock_get_config):
        """测试连接 - 无 API Key。"""
        mock_config = MagicMock()
        mock_config.config = {
            "current_provider": "openai",
        }
        mock_config.get_provider_config.return_value = {"api_key": ""}
        mock_get_config.return_value = mock_config
        
        client, _ = create_test_client(self.tmp_dir, self.data_file, self.db_file)
        response = client.post("/api/config/ai/test")
        
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertFalse(data["success"])
        self.assertIn("API Key", data["message"])


class TestDataAPI(IntegrationTestBase):
    """测试数据管理 API - 使用真实数据层。"""
    
    def test_import_data(self):
        """导入数据（卡片+笔记）。"""
        client, _ = create_test_client(self.tmp_dir, self.data_file, self.db_file)
        
        response = client.post("/api/import", json={
            "cards": [
                {"q": "Imported Q1", "a": "Imported A1"},
                {"q": "Imported Q2", "a": "Imported A2"}
            ],
            "notes": [
                {"title": "Imported Note", "content": "Imported content", "folder": "test"}
            ]
        })
        
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        # 2 cards + 1 note
        self.assertEqual(data["imported"], 3)
        
        # 验证卡片真的被导入
        cards_response = client.get("/api/cards")
        cards_data = cards_response.json()
        self.assertEqual(cards_data["count"], 2)
        
        # 验证笔记真的被导入
        notes_response = client.get("/api/notes")
        notes_data = notes_response.json()
        self.assertEqual(notes_data["count"], 1)
        self.assertEqual(notes_data["notes"][0]["title"], "Imported Note")
    
    def test_import_data_empty(self):
        """导入空数据。"""
        client, _ = create_test_client(self.tmp_dir, self.data_file, self.db_file)
        
        response = client.post("/api/import", json={"cards": [], "notes": []})
        
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        self.assertEqual(data["imported"], 0)
    
    def test_import_data_cards_only(self):
        """只导入卡片。"""
        client, _ = create_test_client(self.tmp_dir, self.data_file, self.db_file)
        
        response = client.post("/api/import", json={
            "cards": [{"q": "Q1", "a": "A1"}]
        })
        
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        self.assertEqual(data["imported"], 1)
    
    def test_import_data_notes_only(self):
        """只导入笔记。"""
        client, _ = create_test_client(self.tmp_dir, self.data_file, self.db_file)
        
        response = client.post("/api/import", json={
            "notes": [{"title": "Note 1", "content": "Content 1"}]
        })
        
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        self.assertEqual(data["imported"], 1)
    
    def test_export_data(self):
        """导出数据。"""
        client, _ = create_test_client(self.tmp_dir, self.data_file, self.db_file)
        
        # 先创建一些数据
        client.post("/api/cards", json={"q": "Export Q", "a": "Export A"})
        client.post("/api/notes", json={"title": "Export Note", "content": "Content", "folder": "test"})
        
        response = client.get("/api/export")
        
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data["cards"]), 1)
        self.assertEqual(len(data["notes"]), 1)
        self.assertIn("config", data)
    
    def test_backup(self):
        """创建备份。"""
        client, _ = create_test_client(self.tmp_dir, self.data_file, self.db_file)
        
        # 先创建一些数据
        client.post("/api/cards", json={"q": "Backup Q", "a": "Backup A"})
        
        response = client.post("/api/backup")
        
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        self.assertIn("path", data)


if __name__ == "__main__":
    unittest.main()
