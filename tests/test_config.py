"""AIConfig 单元测试

补 test_integration 未覆盖的分支：配置文件损坏降级、部分配置合并、base_url 校验、
保存时校验失败不写盘、getter。
"""

import os
import sys
import json
import unittest
import tempfile
import shutil

# 添加 src 到路径
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "src"))


class TestAIConfig(unittest.TestCase):
    def setUp(self):
        self.tmp_dir = tempfile.mkdtemp()

    def tearDown(self):
        shutil.rmtree(self.tmp_dir, ignore_errors=True)

    def _write_config(self, text):
        with open(os.path.join(self.tmp_dir, "ai_config.json"), "w", encoding="utf-8") as f:
            f.write(text)

    def test_corrupt_config_falls_back_to_default(self):
        """配置文件损坏时应降级为默认配置而不是崩溃"""
        from ai.config import AIConfig
        self._write_config("{坏掉的 json")
        config = AIConfig(self.tmp_dir)
        self.assertEqual(config.config["current_provider"], "openai")
        self.assertIn("openai", config.config["providers"])

    def test_partial_config_merges_with_default(self):
        """部分配置应与默认值合并，缺失的键用默认补齐"""
        from ai.config import AIConfig
        self._write_config(json.dumps({"current_model": "gpt-4"}))
        config = AIConfig(self.tmp_dir)
        self.assertEqual(config.config["current_model"], "gpt-4")
        # 没写的 parameters 仍应来自默认值
        self.assertIn("temperature", config.config["parameters"])

    def test_validate_rejects_non_ascii_base_url(self):
        """base_url 含中文等非 ASCII 字符应被拒绝（此前只测了 api_key）"""
        from ai.config import AIConfig
        config = AIConfig(self.tmp_dir)
        config.config["providers"]["openai"]["base_url"] = "https://例子.com/v1"
        with self.assertRaises(ValueError):
            config.validate_config()

    def test_save_with_invalid_key_does_not_write(self):
        """保存时若校验失败应抛错且不落盘"""
        from ai.config import AIConfig
        config = AIConfig(self.tmp_dir)
        config_path = os.path.join(self.tmp_dir, "ai_config.json")
        os.remove(config_path)  # 删掉首次初始化写入的文件，便于断言 save 未写盘
        config.config["providers"]["openai"]["api_key"] = "sk-含中文"
        with self.assertRaises(ValueError):
            config.save_config()
        self.assertFalse(os.path.exists(config_path))

    def test_getters(self):
        """getter 返回当前 provider/model/parameters"""
        from ai.config import AIConfig
        config = AIConfig(self.tmp_dir)
        self.assertEqual(config.get_current_model(), "gpt-3.5-turbo")
        self.assertEqual(config.get_provider_config(), config.config["providers"]["openai"])
        self.assertIn("temperature", config.get_parameters())


if __name__ == "__main__":
    unittest.main()
