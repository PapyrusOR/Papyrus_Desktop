"""MCP HTTP server 错误分支测试

补 test_integration 未覆盖的错误路径：
- POST /call 缺 tool 字段 → 400
- 未知 GET / POST 路径 → 404
- CardTools 未初始化 → 503
"""

import os
import sys
import json
import time
import unittest
import tempfile
import shutil
from urllib.request import urlopen, Request

# 添加 src 到路径
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "src"))


def _request(port, method, path, body=None):
    url = f"http://127.0.0.1:{port}{path}"
    data = json.dumps(body).encode("utf-8") if body is not None else None
    req = Request(url, data=data, method=method)
    req.add_header("Content-Type", "application/json")
    try:
        with urlopen(req, timeout=5) as resp:
            return resp.status, json.loads(resp.read().decode("utf-8"))
    except Exception as e:  # urllib 对 4xx/5xx 抛 HTTPError
        status = getattr(e, "code", None)
        payload = json.loads(e.read().decode("utf-8")) if hasattr(e, "read") else {}
        return status, payload


class _StubApp:
    def __init__(self, data_file):
        self.cards = []
        self.data_file = data_file
        self.logger = None

    def save_data(self):
        with open(self.data_file, "w", encoding="utf-8") as f:
            json.dump(self.cards, f, ensure_ascii=False)

    def get_due_cards(self):
        return []

    def next_card(self):
        pass


class TestMCPErrorPaths(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        from ai.tools import CardTools
        from mcp.server import MCPServer

        cls.tmp_dir = tempfile.mkdtemp()
        cls.app = _StubApp(os.path.join(cls.tmp_dir, "cards.json"))
        cls.port = 19880
        cls.server = MCPServer(host="127.0.0.1", port=cls.port, card_tools=CardTools(cls.app))
        cls.server.start()
        time.sleep(0.3)

    @classmethod
    def tearDownClass(cls):
        cls.server.stop()
        shutil.rmtree(cls.tmp_dir, ignore_errors=True)

    def test_missing_tool_field_returns_400(self):
        status, body = _request(self.port, "POST", "/call", {"params": {}})
        self.assertEqual(status, 400)
        self.assertIn("error", body)

    def test_unknown_get_path_returns_404(self):
        status, _ = _request(self.port, "GET", "/does-not-exist")
        self.assertEqual(status, 404)

    def test_unknown_post_path_returns_404(self):
        status, _ = _request(self.port, "POST", "/does-not-exist")
        self.assertEqual(status, 404)


class TestMCPWithoutCardTools(unittest.TestCase):
    """card_tools 未初始化时 /call 应返回 503"""

    @classmethod
    def setUpClass(cls):
        from mcp.server import MCPServer

        cls.port = 19881
        cls.server = MCPServer(host="127.0.0.1", port=cls.port, card_tools=None)
        cls.server.start()
        time.sleep(0.3)

    @classmethod
    def tearDownClass(cls):
        cls.server.stop()

    def test_call_without_card_tools_returns_503(self):
        status, body = _request(
            self.port, "POST", "/call", {"tool": "get_card_stats", "params": {}}
        )
        self.assertEqual(status, 503)
        self.assertIn("error", body)


if __name__ == "__main__":
    unittest.main()
