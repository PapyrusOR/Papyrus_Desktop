# Papyrus 全文件索引

> 版本: v2.0.0-beta.11
> 生成时间: 2026-06-04
> 本索引包含项目中所有重要文件及其功能说明

---

## 📁 根目录文件

| 文件 | 说明 |
|------|------|
| `README.md` | 项目主文档（英文） |
| `README.zh-CN.md` | 项目主文档（简体中文） |
| `README.ja.md` | 项目主文档（日本語） |
| `README-DEV.md` | 开发环境启动指南 |
| `CHANGELOG.md` | 版本更新日志 |
| `LICENSE` | MIT 开源许可证 |
| `package.json` | 根目录 Node.js 配置，定义脚本和 Electron 构建设置 |
| `.electron-builder.config.js` | Electron Builder 配置 |
| `electron-builder-debug.json` | Electron Builder 调试配置 |
| `ELECTRON.md` | Electron 相关文档 |
| `AGENTS.md` | 项目开发信息（Agent 指引） |
| `CLAUDE.md` | Claude Code 指引 |

---

## 🟢 Node.js 后端 (`backend/`)

### 配置

| 文件 | 说明 |
|------|------|
| `backend/package.json` | 后端依赖配置 |
| `backend/tsconfig.json` | TypeScript 配置 |
| `backend/tsconfig.test.json` | 测试 TypeScript 配置 |
| `backend/jest.config.js` | Jest 测试配置 |

### API 服务 (`backend/src/api/`)

| 文件 | 说明 | 路由前缀 |
|------|------|----------|
| `api/server.ts` | Fastify 服务入口，注册所有路由 | — |
| `api/routes/cards.ts` | 卡片管理 API | `/cards` |
| `api/routes/review.ts` | 复习流程 API | `/review` |
| `api/routes/notes.ts` | 笔记管理 API | `/notes` |
| `api/routes/files.ts` | 文件管理 API | `/files` |
| `api/routes/relations.ts` | 关系管理 API | `/relations` |
| `api/routes/extensions.ts` | 扩展管理 API | `/extensions` |
| `api/routes/search.ts` | 搜索功能 API | `/search` |
| `api/routes/ai-chat.ts` | AI 聊天 API | `/ai-chat` |
| `api/routes/ai-common.ts` | AI 公共逻辑 API | `/ai-common` |
| `api/routes/ai-completion.ts` | AI 补全 API | `/ai-completion` |
| `api/routes/ai-config.ts` | AI 配置 API | `/ai-config` |
| `api/routes/ai-messages.ts` | AI 消息管理 API | `/ai-messages` |
| `api/routes/ai-sessions.ts` | AI 会话管理 API | `/ai-sessions` |
| `api/routes/ai-tools.ts` | AI 工具调用 API | `/ai-tools` |
| `api/routes/progress.ts` | 复习进度 API | `/progress` |
| `api/routes/providers.ts` | AI 提供商 API | `/providers` |
| `api/routes/update.ts` | 应用更新 API | `/update` |
| `api/routes/mcp.ts` | MCP 服务 API | `/mcp` |
| `api/routes/markdown.ts` | Markdown 渲染 API | `/markdown` |
| `api/routes/logs.ts` | 日志配置 API | `/config/logs` |
| `api/routes/note-versions.ts` | 笔记版本历史 API | `/notes/:noteId` |
| `api/routes/card-versions.ts` | 卡片版本历史 API | `/cards/:cardId` |

### 核心逻辑 (`backend/src/core/`)

| 文件 | 说明 |
|------|------|
| `core/cards.ts` | 卡片 CRUD 操作 |
| `core/notes.ts` | 笔记管理 |
| `core/sm2.ts` | SM-2 间隔重复算法 |
| `core/versioning.ts` | 版本历史与回滚 |
| `core/crypto.ts` | AES-GCM 加密 |
| `core/relations.ts` | 关系管理 |
| `core/files.ts` | 文件操作 |

### AI 模块 (`backend/src/ai/`)

| 文件 | 说明 |
|------|------|
| `ai/config.ts` | AI 配置管理 |
| `ai/provider.ts` | AI 提供商接口 |
| `ai/tool-manager.ts` | 工具调用管理器 |
| `ai/llm-cache.ts` | LLM 响应缓存 |
| `ai/tools.ts` | 工具调用入口 |
| `ai/tools/registry.ts` | 工具注册表 |
| `ai/tools/parser.ts` | AI 响应解析 |
| `ai/tools/cards.ts` | 卡片工具 |
| `ai/tools/notes.ts` | 笔记工具 |
| `ai/tools/files.ts` | 文件工具 |
| `ai/tools/data.ts` | 数据查询工具 |
| `ai/tools/relations.ts` | 关系工具 |
| `ai/tools/settings.ts` | 设置工具 |
| `ai/tools/extensions.ts` | 扩展工具 |

### 数据层 (`backend/src/db/`)

| 文件 | 说明 |
|------|------|
| `db/database.ts` | JSON 数据持久化 |

### 集成 (`backend/src/integrations/`)

| 文件 | 说明 |
|------|------|
| `integrations/file-watcher.ts` | 文件监听（Obsidian Vault） |

### MCP 服务 (`backend/src/mcp/`)

| 文件 | 说明 |
|------|------|
| `mcp/server.ts` | MCP 服务器实现 |

### 工具函数 (`backend/src/utils/`)

| 文件 | 说明 |
|------|------|
| `utils/auth.ts` | 认证 |
| `utils/logger.ts` | 日志 |
| `utils/paths.ts` | 路径常量 |
| `utils/proxy.ts` | 代理配置 |
| `utils/client-id.ts` | 客户端标识 |

### 测试 (`backend/tests/`)

| 文件 | 说明 |
|------|------|
| `tests/unit/` | 单元测试 |
| `tests/integration/` | 集成测试 |

---

## ⚛️ React 前端 (`frontend/`)

### 配置与入口

| 文件 | 说明 |
|------|------|
| `frontend/package.json` | 前端依赖配置 |
| `frontend/vite.config.js` | Vite 构建配置 |
| `frontend/tsconfig.json` | TypeScript 配置 |
| `frontend/index.html` | HTML 入口 |
| `frontend/launcher.js` | 启动器 |

### 源码 (`frontend/src/`)

| 文件 | 说明 |
|------|------|
| `main.tsx` | 应用入口 |
| `App.tsx` | 根组件，页面路由管理 |
| `api.ts` | API 接口封装 |

#### 公共组件 (`frontend/src/components/`)

| 文件 | 说明 |
|------|------|
| `MarkdownView.tsx` | Markdown 渲染组件 |
| `ReasoningChain.tsx` | 推理链展示组件 |
| `ToolCallCard.tsx` | 工具调用卡片 |
| `ScreenReaderAnnouncer.tsx` | 屏幕阅读器播报 |

#### 自定义 Hooks (`frontend/src/hooks/`)

| 文件 | 说明 |
|------|------|
| `useScenery.ts` | 窗景背景 Hook |

#### 图标组件 (`frontend/src/icons/`)

| 文件 | 说明 |
|------|------|
| `IconAccessibility.tsx` | 无障碍图标 |
| `IconAgentMode.tsx` | Agent 模式图标 |
| `IconCharts.tsx` | 图表图标 |
| `IconScroll.tsx` | 卷轴图标 |
| `svgs/` | SVG 源文件 |

#### 页面组件

**开始页面 (`frontend/src/StartPage/`)**

| 文件 | 说明 |
|------|------|
| `StartPage.tsx` | 开始页面主组件 |
| `RecentNotes.tsx` | 最近笔记组件 |
| `ReviewQueue.tsx` | 复习队列组件 |
| `solarTerms.ts` | 二十四节气数据 |

**卷轴页面 (`frontend/src/ScrollPage/`)**

| 文件 | 说明 |
|------|------|
| `ScrollPage.tsx` | 卷轴复习页面 |
| `FlashcardStudy.tsx` | 闪卡学习组件 |

**笔记页面 (`frontend/src/NotesPage/`)**

| 文件 | 说明 |
|------|------|
| `NotesPage.tsx` | 笔记页面主组件 |
| `components/RelationGraph.tsx` | 关联图谱组件 |
| `components/FileTree.tsx` | 文件树组件 |

**统计页面 (`frontend/src/ChartsPage/`)**

| 文件 | 说明 |
|------|------|
| `ChartsPage.tsx` | 统计图表页面 |

**文件页面 (`frontend/src/FilesPage/`)**

| 文件 | 说明 |
|------|------|
| `FilesPage.tsx` | 文件管理页面 |
| `FileIcon.tsx` | 文件图标组件 |

**扩展页面 (`frontend/src/ExtensionsPage/`)**

| 文件 | 说明 |
|------|------|
| `ExtensionsPage.tsx` | 扩展管理页面 |

**设置页面 (`frontend/src/SettingsPage/`)**

| 文件 | 说明 |
|------|------|
| `SettingsPage.tsx` | 设置页面主组件 |
| `views/GeneralView.tsx` | 常规设置 |
| `views/AppearanceView.tsx` | 外观设置 |
| `views/AccessibilityView.tsx` | 无障碍设置 |
| `views/ChatView.tsx` | 聊天设置 |
| `views/DataView.tsx` | 数据管理 |
| `views/McpView.tsx` | MCP 设置 |
| `views/ShortcutsView.tsx` | 快捷键设置 |
| `views/AboutView.tsx` | 关于页面 |

**AI 聊天面板 (`frontend/src/ChatPanel/`)**

| 文件 | 说明 |
|------|------|
| `ChatPanel.tsx` | AI 聊天面板 |

#### 布局组件

| 文件 | 说明 |
|------|------|
| `Sidebar.tsx` | 侧边导航栏 |
| `TitleBar.tsx` | 顶部标题栏 |
| `StatusBar.tsx` | 底部状态栏 |
| `SearchBox.tsx` | 全局搜索组件 |

#### 上下文 (`frontend/src/contexts/`)

| 文件 | 说明 |
|------|------|
| `AccessibilityContext.tsx` | 无障碍上下文 |

#### 国际化 (`frontend/src/i18n/`)

| 文件 | 说明 |
|------|------|
| `i18n.ts` | i18next 配置 |
| `locales/zh-CN.json` | 简体中文 |
| `locales/en-US.json` | 英文 |
| `locales/zh-TW.json` | 繁体中文 |
| `locales/ja-JP.json` | 日文 |

#### 类型定义 (`frontend/src/types/`)

| 文件 | 说明 |
|------|------|
| `ai.ts` | AI 相关类型 |
| `electron.d.ts` | Electron API 类型声明 |

---

## 🖥️ Electron (`electron/`)

| 文件 | 说明 |
|------|------|
| `main.js` | 主进程入口 |
| `preload.js` | 预加载脚本 |
| `diagnostic-window.js` | 诊断窗口 |
| `diagnostic-preload.js` | 诊断预加载 |

---

## 📚 文档 (`docs/`)

### 主文档

| 文件 | 说明 |
|------|------|
| `README.md` | 文档导航 |
| `PROJECT_STRUCTURE.md` | 项目结构说明 |
| `API.md` | API 接口文档 |
| `AI_README.md` | AI 功能说明 |
| `AI_TOOLS_DEMO.md` | AI 工具演示 |
| `EXTENSIONS.md` | 扩展开发指南 |
| `COMPLETION_DEMO.md` | 补全功能演示 |
| `CLI_MANAGER_DESIGN.md` | CLI Manager 设计 |
| `ELECTRON_V41_SETUP.md` | Electron v41 配置 |
| `PRD.md` | 产品需求文档 |
| `FILE_INDEX.md` | 本文件 |

### 使用指南 (`docs/guides/`)

| 文件 | 说明 |
|------|------|
| `QUICKSTART.md` | 快速启动指南 |
| `VERSION.md` | 版本信息 |
| `CHANGELOG.md` | 更新日志格式 |
| `ENVIRONMENT_REQUIREMENTS.md` | 环境要求 |
| `RELEASE.md` | 发布流程 |
| `ARTIFACTS.md` | 构建产物说明 |

#### 无障碍文档

| 文件 | 说明 |
|------|------|
| `ACCESSIBILITY_GUIDE.md` | 无障碍开发指南 |
| `A11Y_IMPLEMENTATION.md` | 无障碍实施记录 |
| `A11Y_SETTINGS.md` | 无障碍设置说明 |
| `A11Y_VERIFICATION.md` | 无障碍验证 |
| `WCAG_AA_AAA_IMPLEMENTATION.md` | WCAG 实施 |

#### 功能文档

| 文件 | 说明 |
|------|------|
| `UI_TOKENS.md` | UI 设计变量 |
| `INPUT_FEATURES.md` | 输入功能说明 |
| `SCENERY_DESIGN_GUIDE.md` | 窗景设计指南 |

---

## 🧪 测试

### 后端测试 (`backend/tests/`)

| 文件 | 说明 |
|------|------|
| `tests/unit/` | 单元测试 |
| `tests/integration/` | 集成测试 |

### E2E 测试 (`e2e/`)

| 文件 | 说明 |
|------|------|
| `e2e/api.spec.ts` | API E2E 测试 |
| `e2e/playwright.config.ts` | Playwright 配置 |

---

## 🔧 脚本 (`scripts/`)

| 文件 | 说明 |
|------|------|
| `build-electron.js` | Electron 构建脚本 |
| `bump-version.js` | 版本号管理脚本 |
| `extract-changelog.js` | 更新日志提取脚本 |
| `sync-version.js` | 版本同步脚本 |
| `download-artifacts.js` | 构建产物下载脚本 |

---

## 📂 数据目录

| 目录 | 说明 |
|------|------|
| `$HOME/PapyrusData/` | 用户数据存储（默认） |
| `$HOME/PapyrusData/logs/` | 日志文件目录 |

可通过 `PAPYRUS_DATA_DIR` 环境变量覆盖数据目录。

---

## 🎨 资源 (`assets/`)

| 文件 | 说明 |
|------|------|
| `icon.ico` | Windows 应用图标 |
| `icon.icns` | macOS 应用图标 |
| `icon.png` | Linux 应用图标 |
| `icon.svg` | SVG 矢量图标 |

---

## ⚙️ 构建配置 (`build/`)

| 文件 | 说明 |
|------|------|
| `installer.nsh` | NSIS 安装脚本 |
| `entitlements.mac.plist` | macOS 权限配置 |
| `create-cert.ps1` | 代码签名证书生成 |

---

## 📋 文件统计

| 类别 | 数量 |
|------|------|
| TypeScript/TSX 源码文件 | ~100+ |
| CSS 样式文件 | ~15 |
| 后端测试文件 | 20+ |
| E2E 测试文件 | 2 |
| 文档文件 | 30+ |
| 脚本文件 | 10+ |

---

## 📄 相关文档

| 文档 | 说明 |
|------|------|
| `docs/PRD.md` | 产品需求文档 |
| `docs/PROJECT_STRUCTURE.md` | 项目架构详细说明 |
| `docs/API.md` | API 接口文档 |

## 🔍 关键入口点

| 用途 | 入口文件 |
|------|----------|
| 桌面应用启动 | `electron/main.js` |
| Node.js 后端服务 | `backend/src/api/server.ts` |
| 前端开发 | `frontend/src/main.tsx` |
| Electron 主进程 | `electron/main.js` |
| 后端测试 | `cd backend && npm test` |
| E2E 测试 | `npx playwright test` |
