# Papyrus 项目安全审计报告

**审计日期:** 2026-03-29  
**审计版本:** v2.0.0-beta.1  
**审计范围:** 全项目代码、配置文件、CI/CD 工作流

---

## 执行摘要

| 风险等级 | 数量 | 状态 |
|---------|------|------|
| 🔴 高危 | 2 | 需修复 |
| 🟡 中危 | 2 | 建议修复 |
| 🟢 低危 | 3 | 可选修复 |
| ✅ 安全 | - | 已通过检查 |

**总体评价:** 项目整体安全状况良好，主要风险集中在证书密码硬编码和本地证书管理。

---

## 详细发现

### 🔴 高危问题

#### 1. 代码签名证书密码硬编码
**位置:**
- `.electron-builder.config.js:57`
- `electron-builder.json:50`
- `package.json:72`

**问题描述:**
代码签名证书密码 `papyrus123` 被硬编码在三个配置文件中。这是一个自签名证书用于本地测试，但如果仓库被公开，攻击者可使用此证书伪造签名。

**风险:**
- 证书私钥若被泄露，攻击者可签名恶意软件
- 用户安装时可能信任被篡改的应用

**修复建议:**
```javascript
// 使用环境变量
const certificatePassword = process.env.CERTIFICATE_PASSWORD || '';
```

然后在 CI/CD 中设置 secrets:
```yaml
env:
  CERTIFICATE_PASSWORD: ${{ secrets.CERTIFICATE_PASSWORD }}
```

**优先级:** 高  
**修复难度:** 低

---

#### 2. 证书文件本地存储风险
**位置:** `build/code-signing.pfx`, `build/root-ca.cer`

**问题描述:**
代码签名私钥（PFX 文件）和根证书存储在本地 `build/` 目录，虽然被 `.gitignore` 忽略，但存在以下风险：
- 开发者可能意外使用 `git add -f` 提交
- 备份或共享项目时可能包含这些文件

**风险:**
- 私钥泄露导致签名被伪造

**修复建议:**
1. 将证书移动到项目外的安全目录，如 `~/.papyrus-certs/`
2. 在 README 中添加安全警告
3. 创建 `build/certs/.gitkeep` 并在 .gitignore 中忽略 `build/certs/*`

**优先级:** 高  
**修复难度:** 低

---

### 🟡 中危问题

#### 3. SQL 注入风险（低风险）
**位置:** `src/mcp/vault_tools.py:237-239`

**问题描述:**
```python
cursor.execute(f"ALTER TABLE notes ADD COLUMN {col} INTEGER DEFAULT 0")
```

虽然 `col` 来自预定义的 `required` 集合，但使用 f-string 构造 SQL 仍然存在潜在风险。

**风险:**
- 如果未来代码修改导致 `col` 可被外部控制，将存在 SQL 注入

**修复建议:**
```python
# SQLite 不支持 ALTER TABLE ... ADD COLUMN 的参数化查询
# 应使用白名单验证列名
ALLOWED_COLUMNS = {'incoming_count', 'outgoing_links', 'created_at', 'updated_at'}
if col not in ALLOWED_COLUMNS:
    raise ValueError(f"Invalid column name: {col}")
# 验证通过后才执行
```

**优先级:** 中  
**修复难度:** 低

---

#### 4. MCP 服务器无身份验证
**位置:** `src/mcp/server.py`, `src/papyrus_api/main.py:76-82`

**问题描述:**
MCP (Model Context Protocol) 服务器在端口 9100 启动，但没有身份验证机制：
```python
_mcp_server = MCPServer(
    host="127.0.0.1",
    port=9100,
    ...
)
```

**风险:**
- 本地其他应用可连接 MCP 服务器操作数据
- 如果存在 SSRF 漏洞，可能被远程利用

**修复建议:**
1. 添加 token 验证
2. 或使用 Unix Socket 替代 TCP（仅限本地）

**优先级:** 中  
**修复难度:** 中

---

### 🟢 低危问题

#### 5. CORS 配置允许 localhost
**位置:** `src/papyrus_api/main.py:98-101`

**问题描述:**
```python
allow_origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173",
],
```

**风险:**
- 本地恶意网站可能通过 XSS 或浏览器漏洞访问 API
- 但仅限于本地攻击，风险较低

**修复建议:**
- 生产环境应严格限制来源
- 添加 `allow_credentials=False` 如果不需要 cookies

**优先级:** 低  
**修复难度:** 低

---

#### 6. Electron 未启用上下文隔离（已启用）
**位置:** `electron/main.js:233-235`

**问题描述:** 已正确配置
```javascript
webPreferences: {
  nodeIntegration: false,
  contextIsolation: true,
  preload: path.join(__dirname, 'preload.js'),
}
```

**状态:** ✅ 安全

---

#### 7. 日志文件路径可配置
**位置:** `src/logger.py`

**问题描述:** 日志文件存储在用户数据目录，可被任意用户读取（取决于操作系统权限）。

**风险:** 低，因为日志通常不包含敏感信息

**修复建议:** 在 Windows 上设置适当的 ACL 权限

**优先级:** 低  
**修复难度:** 低

---

## 安全配置检查

### ✅ 已正确配置的安全项

| 检查项 | 状态 | 说明 |
|-------|------|------|
| Electron 上下文隔离 | ✅ | `contextIsolation: true` |
| Electron 节点集成 | ✅ | `nodeIntegration: false` |
| SQL 参数化查询 | ✅ | 大部分使用 `?` 占位符 |
| Subprocess 安全调用 | ✅ | 使用列表而非 shell=True |
| 无 eval/document.write | ✅ | 未发现危险函数 |
| 环境变量隔离 | ✅ | 使用 `.env` 模式（虽未使用） |
| CI/CD Secrets | ✅ | 正确使用 `secrets.GITHUB_TOKEN` |

### ⚠️ 需要注意的配置

| 检查项 | 状态 | 说明 |
|-------|------|------|
| 证书密码 | ⚠️ | 硬编码在配置中 |
| 证书文件 | ⚠️ | 存储在项目目录内 |
| MCP 认证 | ⚠️ | 无身份验证 |
| CORS | ⚠️ | 允许 localhost |

---

## 依赖安全分析

### Python 依赖
| 包名 | 版本 | 状态 |
|-----|------|------|
| requests | 2.32.5 | ✅ 最新稳定版 |
| fastapi | 0.135.1 | ✅ 最新稳定版 |
| uvicorn | 0.41.0 | ✅ 最新稳定版 |
| watchdog | 6.0.0 | ✅ 最新稳定版 |
| markdown-it-py | 4.0.0 | ✅ 最新稳定版 |

### Node.js 依赖
| 包名 | 版本 | 状态 |
|-----|------|------|
| electron | ^30.0.0 | ✅ 较新版本 |
| electron-builder | ^24.13.0 | ✅ 稳定版 |
| react | 19.2.4 | ✅ 最新稳定版 |
| vite | ^5.4.0 | ✅ 最新稳定版 |

**建议:** 定期运行 `npm audit` 和 `pip audit` 检查新漏洞。

---

## 修复建议清单

### 立即修复（高危）
- [ ] 将证书密码移至环境变量
- [ ] 将证书文件移至项目外部目录

### 短期修复（中危）
- [ ] 为 MCP 服务器添加身份验证
- [ ] 修复 SQL f-string 使用白名单验证

### 长期改进（低危）
- [ ] 添加自动化安全扫描（SAST）到 CI/CD
- [ ] 实施依赖自动更新机制
- [ ] 添加安全头部（Security Headers）

---

## 附录

### A. 扫描命令参考
```bash
# 扫描敏感信息
git secrets --scan

# 依赖漏洞扫描
npm audit
pip audit

# 代码安全扫描
bandit -r src/
semgrep --config=auto .
```

### B. 证书管理建议
1. 生产环境使用受信任的 CA 证书（如 DigiCert, Sectigo）
2. 自签名证书仅用于内部测试
3. 私钥存储在硬件安全模块（HSM）或密钥管理服务（KMS）

---

**报告生成时间:** 2026-03-29 12:00:00+08:00  
**审计工具:** 手动代码审查 + 自动化扫描  
**下次审计建议:** 发布后 3 个月内
