"""AIProvider / AIManager 单元测试

聚焦此前几乎零覆盖、却最容易在线上出问题的路径：
- Provider 调外部 API 时的网络错误包装、requests 缺失
- 附件校验的各条拒绝分支
- 会话管理的异常分支（不存在 / 删到只剩一个）
- sessions.json 损坏时的降级恢复

网络相关用例通过 patch ai.provider.requests 模拟，不发真实请求。
"""

import os
import sys
import unittest
import tempfile
import shutil
from unittest.mock import patch

# 添加 src 到路径
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "src"))


class TestOpenAIProviderErrors(unittest.TestCase):
    def setUp(self):
        from ai.provider import OpenAIProvider
        self.provider = OpenAIProvider("sk-test", "https://api.test/v1")

    def test_chat_network_error_wrapped(self):
        """网络异常应被包装成 'API调用失败'，而不是抛裸 requests 异常"""
        import ai.provider as provider_mod
        import requests as real_requests

        with patch.object(provider_mod, "requests") as mock_requests:
            mock_requests.exceptions = real_requests.exceptions
            mock_requests.post.side_effect = real_requests.exceptions.ConnectionError("boom")
            with self.assertRaises(Exception) as ctx:
                self.provider.chat([{"role": "user", "content": "hi"}], model="gpt-x")
        self.assertIn("API调用失败", str(ctx.exception))

    def test_chat_requires_requests_installed(self):
        """requests 未安装时应给出明确报错"""
        import ai.provider as provider_mod
        with patch.object(provider_mod, "REQUESTS_AVAILABLE", False):
            with self.assertRaises(Exception) as ctx:
                self.provider.chat([{"role": "user", "content": "hi"}], model="gpt-x")
        self.assertIn("requests", str(ctx.exception))

    def test_list_models_returns_empty_on_failure(self):
        """list_models 出错时返回空列表而不是抛异常"""
        import ai.provider as provider_mod
        import requests as real_requests

        with patch.object(provider_mod, "requests") as mock_requests:
            mock_requests.exceptions = real_requests.exceptions
            mock_requests.get.side_effect = real_requests.exceptions.Timeout("slow")
            self.assertEqual(self.provider.list_models(), [])


class TestOllamaProviderErrors(unittest.TestCase):
    def test_chat_network_error_wrapped(self):
        """Ollama 网络异常应被包装成 'Ollama调用失败'"""
        from ai.provider import OllamaProvider
        import ai.provider as provider_mod
        import requests as real_requests

        provider = OllamaProvider("http://localhost:11434")
        with patch.object(provider_mod, "requests") as mock_requests:
            mock_requests.exceptions = real_requests.exceptions
            mock_requests.post.side_effect = real_requests.exceptions.ConnectionError("boom")
            with self.assertRaises(Exception) as ctx:
                provider.chat([{"role": "user", "content": "hi"}], model="llama2")
        self.assertIn("Ollama调用失败", str(ctx.exception))


class TestAttachmentValidation(unittest.TestCase):
    def setUp(self):
        from ai.config import AIConfig
        from ai.provider import AIManager
        self.tmp_dir = tempfile.mkdtemp()
        self.manager = AIManager(AIConfig(self.tmp_dir))

    def tearDown(self):
        shutil.rmtree(self.tmp_dir, ignore_errors=True)

    def _make_file(self, name, size=10):
        p = os.path.join(self.tmp_dir, name)
        with open(p, "wb") as f:
            f.write(b"x" * size)
        return p

    def test_too_many_attachments(self):
        files = [self._make_file(f"f{i}.png") for i in range(6)]
        with self.assertRaises(ValueError):
            self.manager._validate_attachments(files)

    def test_nonexistent_file(self):
        with self.assertRaises(ValueError):
            self.manager._validate_attachments(["/no/such/file.png"])

    def test_unsupported_type(self):
        p = self._make_file("evil.exe")
        with self.assertRaises(ValueError):
            self.manager._validate_attachments([p])

    def test_oversize_file(self):
        from ai.provider import MAX_ATTACHMENT_SIZE
        p = self._make_file("big.png", size=MAX_ATTACHMENT_SIZE + 1)
        with self.assertRaises(ValueError):
            self.manager._validate_attachments([p])

    def test_valid_attachment_passes(self):
        p = self._make_file("ok.png")
        self.assertEqual(self.manager._validate_attachments([p]), [p])

    def test_empty_attachments(self):
        self.assertEqual(self.manager._validate_attachments([]), [])
        self.assertEqual(self.manager._validate_attachments(None), [])


class TestSessionManagement(unittest.TestCase):
    def setUp(self):
        from ai.config import AIConfig
        from ai.provider import AIManager
        self.tmp_dir = tempfile.mkdtemp()
        self.manager = AIManager(AIConfig(self.tmp_dir))

    def tearDown(self):
        shutil.rmtree(self.tmp_dir, ignore_errors=True)

    def test_switch_nonexistent_session_raises(self):
        with self.assertRaises(ValueError):
            self.manager.switch_session("nope")

    def test_rename_nonexistent_session_raises(self):
        with self.assertRaises(ValueError):
            self.manager.rename_session("nope", "x")

    def test_delete_nonexistent_session_raises(self):
        with self.assertRaises(ValueError):
            self.manager.delete_session("nope")

    def test_delete_last_session_raises(self):
        """至少保留一个会话：删最后一个应被拒绝"""
        only_id = self.manager.get_active_session_id()
        with self.assertRaises(ValueError):
            self.manager.delete_session(only_id)

    def test_delete_active_session_switches_to_another(self):
        """删除当前活跃会话后应自动切换到剩余会话"""
        first = self.manager.get_active_session_id()
        second = self.manager.create_session(title="second", switch=True)["id"]
        self.manager.delete_session(second)
        self.assertEqual(self.manager.get_active_session_id(), first)


class TestSessionCorruptionRecovery(unittest.TestCase):
    def test_corrupt_sessions_file_recovers(self):
        """sessions.json 损坏时应降级为全新状态并仍有可用的活跃会话"""
        from ai.config import AIConfig
        from ai.provider import AIManager

        tmp_dir = tempfile.mkdtemp()
        try:
            conv_dir = os.path.join(tmp_dir, "conversations")
            os.makedirs(conv_dir, exist_ok=True)
            with open(os.path.join(conv_dir, "sessions.json"), "w", encoding="utf-8") as f:
                f.write("{not valid json")

            manager = AIManager(AIConfig(tmp_dir))  # 不应抛异常
            self.assertIsNotNone(manager.get_active_session_id())
        finally:
            shutil.rmtree(tmp_dir, ignore_errors=True)


if __name__ == "__main__":
    unittest.main()
