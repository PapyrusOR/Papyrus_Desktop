## [v2.0.0-beta.3] - 2026-04-28

# ⚠️ 公告
1. 本版本为 beta 版本且由于时间限制未充分测试，可能遇到功能不可用情况，若发现 bug，请及时提供反馈，谢谢。
2. 即日起至 v2.0.0 beta 测试结束，我们向用户开放 DeepSeek V4 Flash 模型，每人每天有 50w tokens 额度。
   使用方法：设置 → 聊天 → 供应商管理，启用 LiYuan For DeepSeek 即可使用，欢迎反馈，后续 DeepSeek V4 Pro 也将开放限时免费调用。

### 🚀 架构

#### 后端
- **TypeScript / Fastify** on Node.js（原为 Python + FastAPI / Uvicorn）。单个 Node 运行时同时驱动 Electron、前端构建工具和 API。
- **AI 子系统以 TypeScript 重写**：provider 抽象、流式传输、工具调用、配置校验全部使用 TS。
- **MCP 子系统以 TypeScript 重写**：提供笔记/知识库 CRUD、搜索、索引的 REST 端点。
- **文件监听器**（`chokidar`）接入服务器，实现数据库/知识库变更的实时检测。
- **SQLite3** 替代旧的 JSON 文件夹存储；首次启动时自动迁移遗留的 `cards.json` / `notes.json`。

#### 前端
- **React 19 + TypeScript + Arco Design + Tailwind CSS** 全面重写 —— 旧的 Tk/Electron-Tk 混合方案已移除。
- **Electron v41** 升级，支持窗口模式、启动画面、无边框窗口、自定义标题栏/状态栏。
- **路由与布局**：App 外壳 + 侧边栏 + 二级侧边栏 + 可拖拽聊天面板。
- **共享基础设施**：`useShortcuts` / `useScenery` / `useCompletion` / `useScrollNavigation` / `useWebSocket` 等 Hooks；`AccessibilityContext`；`SmartTextArea` / `SearchBox` / `SectionNavigation` / `ChatHistory` / `ToolCallCard` / `ReasoningChain` / `SceneryBackground` 等组件。

### 🎉 新功能

#### 全新页面体系
- **起始页**：日期 / 节气主题 / 最近笔记 / 复习队列 / 卷轴入口
- **卷轴页**：卷轴学习 + 卡片复习
- **笔记页**：笔记查看器 + 关系图（RelationGraph / RelationsPanel）+ 文件夹树 + 大纲导航
- **聊天面板**：可拖拽 + 模式切换 + 副侧边栏 + 模型 ID 显示 + 多会话 / 附件 / 会话重命名
- **设置页**：二级菜单（外观与窗景合并、关于项内嵌）+ 设置侧边栏 + 悬停展开
- **文件库 / 扩展 / 图表页**：完整新建页面

#### 笔记编辑
- 笔记编辑底栏数据展示
- 锁定编辑模式
- Obsidian Vault 导入
- 关系图 / 关系面板
- 大纲导航

#### 窗景（Backdrop）系统
- 起始页 / 数据页 / 文件库 / 扩展管理 / 设置页 全面接入窗景
- 卷轴风格窗景 demo
- 动态调色、透明度范围与实际渲染一致

#### 笔记 / 卡片版本历史
- 每次更新自动按内容哈希存版本
- 回滚作为正向版本写入（无破坏性历史）
- 笔记与卡片独立的版本路由

#### AI / Provider 管理
- Provider / Model 管理 API + UI（增删改查、启用、设默认、下拉、侧边栏）
- 多 API Key 方案 + Key 选择
- **Encrypted API Key 静态存储**：AES-GCM + 每安装独立主密钥 + salt + auth tag
- **Tool-call 审批流**：手动 / 自动审批 + 待办队列 + 调用历史
- 模型 / 供应商图标系统（40+ providers / models：OpenAI、Anthropic、Gemini、Claude、Deepseek、Doubao、Grok、Llama/Meta、Mistral、Moonshot、Ollama、OpenRouter、Qwen、Tavily、Wenxin、Yuanbao、Zhipu、Minimax、Xiaomi MiMo、Nanobanana、Hugging Face、Cerebras、Cherry Studio、SiliconCloud、Stepfun、Vertex AI、Volcengine、Z.AI、Perplexity、Poe、Qiniu、Modelscope、NewAPI、NovelAI、NVIDIA、LM Studio、Infinigence、GitHub Copilot、Azure、Google Cloud、Alibaba Cloud、Baidu、ByteDance 等）
- Reasoning Chain 折叠展示
- 自动补全（max_token 统一长度）
- 流式输出 + WebSocket
- Markdown 渲染

#### 头像 / 扩展
- 头像系统 + 自定义头像
- 扩展支持（含 Extension Template 示例）
- 笔记 / 卡片 / 数据界面 Markdown 支持

### ♿ 无障碍（WCAG 2.1 AA/AAA）
- 全局无障碍样式 [frontend/src/a11y.css](frontend/src/a11y.css)
- 设置面板：减少动画 / 高对比度 / 屏幕阅读器优化
- 完整 ARIA 属性 + 键盘导航 + Skip Link
- ScreenReaderAnnouncer 组件
- 字重 / 标题层级 / 卡片样式统一
- 配套文档：A11Y_IMPLEMENTATION / A11Y_SETTINGS / A11Y_VERIFICATION / ACCESSIBILITY_GUIDE / WCAG_AA_AAA_IMPLEMENTATION

### 🐛 Bug 修复
- **Obsidian Vault 导入全平台 CI 通过**：将脆弱的字符串前缀 `home` 检查替换为操作系统级别的 `dev`+`ino` 遍历，修复了 Windows 8.3 短路径（`RUNNER~1`）、macOS `/var` ↔ `/private/var` 别名、Linux `/tmp` 不在 `$HOME` 下导致的失败。
- **服务端直接运行检测** 在所有平台上正确识别打包后的主入口。
- **API 测试隔离**：集成测试不再跨文件共享状态；移除了不稳定的超时。
- **控制台噪音** 已从日志和 AI Provider 测试中移除。
- TypeScript 迁移审计中暴露的多个 P0/P1/P2 后端 bug。
- 修复透明度范围与实际渲染不一致
- 修复返回顶部按钮入侵聊天框
- 修复顶栏飞出与报错不明显问题
- 修复模型 ID 同步问题
- 修复侧边栏跟随滚动的问题
- 修复 ChatView 不正常结束
- 修复多个 UI 与启动问题
- 修复 Electron 启动崩溃

### 🔒 安全
- **审计驱动的加固**：安全审查中的 Critical/High 建议已解决。`frontend/` 与 `backend/` 的 CI 现已强制执行 `npm audit --omit=dev --audit-level=high`。
- **SSRF 防护**：AI Base URL 校验拒绝云厂商的私有/回环地址（ollama / 本地部署仍允许）。
- **显式错误上报**：错误不再静默吞掉 —— 消息中携带上下文，方便诊断。
- **路径遍历加固**：笔记附件与 Obsidian 导入使用 `dev`+`ino` 容器检查替代字符串比对。
- **Auth Token**：MCP/API 写操作强制要求 token；首次运行时生成并持久化。
- **Rate Limiting**：公共 API 表面已添加限流。
- **API Key 静态加密**（AES-GCM）。
- 修复审计报告中的 P0/P1/P2 级安全漏洞
- 放宽本地模型 `base_url` 校验，支持常见本地部署标识（ollama 等）
- 安全相关敏感文件移出版本库

### 🔧 构建与发布流水线
- **三平台 GitHub Actions 矩阵**（Windows x64、macOS arm64、Linux x64），产出 NSIS 安装包 + 便携版、DMG + ZIP、AppImage + deb + tar.gz。
- **Tag 推送自动触发**（`v*`）：构建完成后自动创建带分类发布说明的 GitHub Draft Release。
- **生产依赖审计门禁**：构建前强制执行。
- **后端 / 前端构建校验步骤**：输出缺失时快速失败。
- **测试失败自动上传产物**：CI 现在将 `backend/test-output.log` 附加到失败运行，方便离线调试。
- **Apple Developer 签名槽位已预留**（注释状态）—— 有 Apple ID 后取消注释对应 env 即可。
- Electron Builder **缓存命中优化**。
- **macOS / Linux 包体积优化**（解决体积膨胀）。

### ⚠️ 破坏性变更
- **Python 后端已移除**：`src/Papyrus.py`、`src/ai/*.py`、`src/mcp/*.py`、`tests/test_*.py`、`tools/diagnose.py`、`requirements.txt`、`run.pyw` 均已删除。源码运行者现需使用 Node.js 24+ 替代 Python。
- **旧版 Tk UI 已移除**：无法回退到 Tk 版本。
- **数据目录布局** 现位于新的 `paths.dataDir` 下（默认 `$HOME/PapyrusData` 或 `PAPYRUS_DATA_DIR`）；JSON 文件迁移路径会在首次启动时导入遗留的 `cards.json` / `notes.json`。
- **MCP / API 认证**：写操作强制要求 token；现有客户端必须在请求头中携带 `~/.papyrus/auth.token` 中的认证令牌。

致谢
@Alpaca233114514
@ChimeHsia
