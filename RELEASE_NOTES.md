## v1.2.2 (2026-03-13)

### 🐛 Bug 修复
- **修复 API Key 编码错误**：解决使用 requests 库时 'latin-1' codec 无法编码中文字符的问题
- **添加配置验证机制**：在保存配置前检查 API Key 和 Base URL 是否包含非 ASCII 字符
- **三层防护机制**：
  - 配置验证层：`AIConfig.validate_config()` 在保存前检查
  - UI 提示层：设置窗口捕获 `ValueError` 并显示友好提示
  - 请求兜底层：`AIProvider` 捕获 `UnicodeEncodeError` 并给出明确提示

### 💡 改进
- **更友好的错误提示**：明确指出哪个提供商的哪个字段包含非法字符
- **阻止保存非法配置**：用户必须修正错误才能保存设置
