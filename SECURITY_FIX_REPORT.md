# Papyrus 安全修复报告

**修复日期:** 2026-04-11  
**基于审计报告:** SECURITY_AUDIT_REPORT_v2.0.0-beta.2.md  
**修复范围:** P0 (Critical) + P1 (High) + 部分 P2 (Medium/Low)

---

## 修复摘要

本次提交修复了安全审计报告中发现的 20+ 个安全漏洞，涵盖 SSRF、MCP 认证、XSS、路径遍历、Electron IPC 安全、加密存储等多个方面。

---

## P0 — 严重问题修复 (Critical)

### 1. 移除 `/providers/test-decrypt` 调试端点
- **文件:** `src/papyrus_api/routers/providers.py`
- **修复:** 完全移除此端点，防止解密 Oracle 攻击。

### 2. MCP 服务器添加 Bearer Token 认证 + 关闭 CORS `*`
- **文件:** `src/mcp/server.py`, `src/papyrus_api/main.py`
- **修复:**
  - 启动时自动生成随机 Bearer Token
  - `/call` 端点必须携带正确的 `Authorization: Bearer <token>` 头
  - CORS `Access-Control-Allow-Origin` 从 `*` 改为仅允许 `localhost` / `127.0.0.1` 来源

### 3. 限制 AI `base_url` 防止 SSRF
- **文件:** `src/ai/config.py`
- **修复:**
  - 新增 `_is_private_url()` 校验，拒绝 localhost、私有 IP、链路本地地址
  - 保存配置时拦截指向内网的 `base_url`（Ollama 默认本地地址除外）

### 4. 停止自动执行破坏性 AI Tool Call
- **文件:** `src/ai/sidebar_v3.py`
- **修复:**
  - `create_card` / `update_card` / `delete_card` 不再自动执行
  - 改为在聊天窗口中显示"待执行工具（需手动确认）"提示

### 5. API Key 加密存储 + GET 端点掩码返回
- **文件:** `src/ai/config.py`, `src/papyrus_api/routers/ai.py`
- **修复:**
  - `AIConfig.save_config()` 保存前对 `api_key` 调用 `encrypt_api_key()`
  - `AIConfig.load_config()` 加载后自动解密
  - `GET /api/config/ai` 返回掩码后的 key（如 `********sk12`）
  - `POST /api/config/ai` 检测到掩码输入时保留原 key，不覆盖

### 6. 移除 Electron 自签名根证书安装逻辑
- **文件:** `electron/main.js`
- **修复:**
  - 完全删除 `installRootCertificate()` 函数及相关调用
  - 删除 `CERT_MESSAGES` 常量
  - 防止将自签名根 CA 安装到系统信任存储

### 7. 修复 Markdown 渲染 XSS
- **文件:** `frontend/src/NotesPage/views/NoteDetailView.tsx`
- **修复:**
  - 关闭 `markdown-it` 的 `html: true` 选项（设为 `false`）
  - 阻止笔记中的 raw HTML/JS 在 Electron 渲染进程中执行

---

## P1 — 高危问题修复 (High)

### 8-10. Electron `shell:openExternal` / `window.open` / `new-window` 协议白名单
- **文件:** `electron/main.js`
- **修复:**
  - `shell:openExternal` IPC handler 仅允许 `http:`, `https:`, `mailto:` 协议
  - `setWindowOpenHandler` 和全局 `new-window` 事件均添加相同的协议校验
  - 拒绝 `file://`, `ms-msdt:` 等危险协议

### 11. 删除硬编码代码签名证书密码
- **文件:** `.electron-builder.config.js`
- **修复:** 删除 fallback 密码 `'papyrus123'`，强制通过环境变量传入

### 12. 诊断窗口安全加固
- **文件:** `electron/diagnostic-window.js`, `electron/diagnostic-preload.js` (新建)
- **修复:**
  - 禁用 `nodeIntegration`，启用 `contextIsolation: true`
  - 通过 preload 脚本安全暴露必要的 `listDir` API
  - 不再允许 renderer 直接 `require('fs')`

### 13-14. Obsidian 导入路径遍历防护
- **文件:** `src/papyrus/integrations/obsidian.py`, `src/papyrus_api/routers/notes.py`
- **修复:**
  - 遍历目录时跳过符号链接（`is_symlink()`）
  - 校验每个解析后的文件路径仍在 Vault 根目录下
  - API 层对 `vault_path` 做基本合法性检查

### 15. 资源路径解析路径遍历防护
- **文件:** `src/papyrus/resources.py`
- **修复:**
  - 对 `relative_path` 进行 `os.path.normpath` 和 `..` 过滤
  - 使用 `os.path.commonpath` 校验最终路径仍在 `ASSETS_DIR` 内

### 16-18. 备份/恢复功能路径遍历防护
- **文件:** `src/papyrus/data/storage.py`, `src/papyrus/data/notes_storage.py`
- **修复:**
  - `create_backup`, `restore_backup`, `save_cards`, `save_notes` 均限制备份路径必须在 `DATA_DIR` 内
  - 阻止将数据库内容复制到任意可写路径

### 19. 移除 CORS `null` Origin
- **文件:** `src/papyrus_api/main.py`
- **修复:** 从 `allow_origin_regex` 中移除 `^null$`，防止 `file://` 和沙盒 iframe 携带 credentials 发起跨域请求

---

## P2 — 中/低危问题修复 (Medium/Low)

### 20. Vault Schema SQL 注入防护
- **文件:** `src/mcp/vault_tools.py`
- **修复:** 对 `ALTER TABLE` 的列名增加 `ALLOWED_COLUMNS` 白名单校验

### 21. 日志目录路径遍历防护
- **文件:** `src/papyrus_api/routers/logs.py`
- **修复:** 限制 `log_dir` 必须在应用数据目录或系统临时目录内

### 22. 加密库缺失时拒绝存储 API Key
- **文件:** `src/papyrus/data/crypto.py`
- **修复:**
  - `encrypt_api_key()` 在 `cryptography` 不可用时抛出 `RuntimeError`
  - 不再回退到 `plain:` 前缀的明文存储

### 23. 修复敏感文件创建 TOCTOU 竞态条件
- **文件:** `src/papyrus/data/crypto.py`
- **修复:**
  - 使用 `os.open(..., os.O_CREAT | os.O_EXCL)` 原子创建 master key 和 salt 文件
  - 创建时直接指定权限（`0o400` / `0o600`）

### 24. `backend:restart` IPC 限流
- **文件:** `electron/main.js`
- **修复:** 30 秒内只能重启一次后端，防止恶意 renderer 造成 DoS

### 25. 构建脚本默认 `shell: false`
- **文件:** `scripts/build-electron.js`
- **修复:** `exec()` 辅助函数默认 `shell: false`

### 26. 生产环境禁用 DevTools
- **文件:** `electron/main.js`
- **修复:** 主窗口 `devTools` 根据 `isDevMode` 动态设置，生产环境显式禁用

### 27. 规范化错误信息（防止信息泄露）
- **文件:** `src/papyrus_api/routers/ai.py`, `src/papyrus_api/routers/data.py`, `src/papyrus_api/routers/logs.py`
- **修复:** 多个端点捕获通用 Exception 后不再将原始异常字符串返回给客户端，改为返回通用错误提示

### 28. 启用更新签名验证
- **文件:** `package.json`, `electron-builder.json`, `.electron-builder.config.js`
- **修复:** 将 `verifyUpdateCodeSignature` 从 `false` 改为 `true`

---

## 未修复项（建议后续处理）

以下问题因涉及架构改动较大，建议后续版本逐步完善：

1. **AI / MCP 端点速率限制** — 建议引入 `slowapi` 或内存限流器
2. **Content Security Policy (CSP)** — 建议通过 `webRequest.onHeadersReceived` 配置严格 CSP
3. **日志文件权限（Unix）** — 建议创建日志文件后显式设置 `0o600`
4. **DLP / PII 脱敏** — 建议在发送数据到 AI Provider 前增加隐私警告和可选 scrubber

---

**验证结果:**
- Python 语法检查: 全部通过
- 单元测试 (`tests/test_ai.py`): 10/10 passed
- 单元测试 (`tests/test_api.py` 抽样): passed

**Commit 建议信息:**
```
security: 修复审计报告中的 P0/P1/P2 级安全漏洞

- 移除 test-decrypt 调试端点
- MCP 添加 Bearer Token 认证并收紧 CORS
- SSRF: 限制 AI base_url 指向私有地址
- API Key 加密存储，GET 端点返回掩码
- 阻止自动执行破坏性 AI tool call
- 移除 Electron 自签名根证书安装逻辑
- 修复 Markdown XSS (关闭 html: true)
- Electron IPC / window.open 协议白名单
- 修复多处路径遍历 (Obsidian/资源/备份/日志/附件)
- 诊断窗口禁用 nodeIntegration，启用 contextIsolation
- 加密失败时拒绝存储，修复 TOCTOU
- 生产环境禁用 DevTools，启用更新签名验证
```
