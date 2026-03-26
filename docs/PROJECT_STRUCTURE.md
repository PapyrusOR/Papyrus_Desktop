# Papyrus 项目结构说明

## 项目概览

Papyrus 是一个基于 Python 后端 + React 前端的桌面应用，使用 PyInstaller 打包为独立可执行文件。

---

## 目录结构

```text
Papyrus/
├── src/                           # Python 后端源码
│   ├── Papyrus.py                 # 兼容入口（shim）
│   ├── Papyrus.pyw                # 兼容入口（无控制台）
│   │
│   ├── papyrus/                   # 主程序包
│   │   ├── app.py                 # PapyrusApp + run_app()
│   │   ├── paths.py               # 路径常量
│   │   ├── resources.py           # 资源路径处理
│   │   ├── data/
│   │   │   └── storage.py         # 数据存取
│   │   ├── logic/
│   │   │   └── sm2.py             # SM-2 算法
│   │   ├── ui/                    # UI 组件
│   │   └── integrations/          # 集成模块
│   │
│   ├── papyrus_api/               # FastAPI 后端
│   │   └── main.py
│   ├── ai/                        # AI 功能
│   ├── mcp/                       # MCP 服务
│   └── logger.py                  # 日志模块
│
├── frontend/                      # React + TypeScript 前端
│   ├── package.json
│   ├── vite.config.js
│   ├── tsconfig.json
│   ├── index.html
│   │
│   └── src/
│       ├── main.tsx               # 应用入口
│       ├── App.tsx                # 根组件
│       ├── a11y.css               # ✅ 无障碍全局样式
│       │
│       ├── components/            # 公共组件
│       │   └── SceneryBackground.tsx
│       │
│       ├── icons/                 # 图标组件
│       │   ├── IconAccessibility.tsx    # ✅ 无障碍图标
│       │   ├── IconAgentMode.tsx
│       │   ├── IconCharts.tsx
│       │   ├── IconScroll.tsx
│       │   └── svgs/              # SVG 源文件
│       │       └── accessibility.svg    # ✅ 无障碍图标源文件
│       │
│       ├── hooks/                 # 自定义 Hooks
│       │   └── useScenery.ts
│       │
│       ├── api.ts                 # API 接口
│       ├── SearchBox.tsx          # 搜索组件
│       ├── ChatPanel.tsx          # 聊天面板
│       ├── Sidebar.tsx            # 侧边栏
│       ├── TitleBar.tsx           # 标题栏
│       ├── StatusBar.tsx          # 状态栏
│       │
│       ├── StartPage/             # 开始页面
│       │   ├── StartPage.tsx
│       │   ├── RecentNotes.tsx
│       │   ├── RecentScrolls.tsx
│       │   ├── ReviewQueue.tsx
│       │   └── ...
│       │
│       ├── ScrollPage/            # 卷轴页面
│       │   ├── ScrollPage.tsx
│       │   └── FlashcardStudy.tsx
│       │
│       ├── NotesPage/             # 笔记页面
│       │   ├── NotesPage.tsx
│       │   ├── components/
│       │   └── views/
│       │
│       ├── SettingsPage/          # 设置页面
│       │   ├── SettingsPage.tsx   # ✅ 包含无障碍设置
│       │   └── SettingsPage.css
│       │
│       ├── ChartsPage/
│       ├── FilesPage/
│       └── ExtensionsPage/
│
├── docs/                          # 文档
│   ├── PROJECT_STRUCTURE.md       # 本文件
│   ├── frontend-style-guide.md    # 前端样式规范
│   │
│   └── guides/                    # 使用指南
│       ├── QUICKSTART.md
│       ├── ACCESSIBILITY_GUIDE.md # ✅ 无障碍开发指南
│       ├── A11Y_IMPLEMENTATION.md # ✅ 无障碍实施记录
│       ├── A11Y_SETTINGS.md       # ✅ 无障碍设置说明
│       ├── UI_TOKENS.md
│       ├── CHANGELOG.md
│       └── ...
│
├── data/                          # 用户数据（不进 Git）
├── backup/                        # 用户备份（不进 Git）
├── assets/                        # 资源文件
├── tests/                         # 测试代码
├── run.pyw                        # 启动器
└── Papyrus.spec                   # PyInstaller 配置
```

---

## 前端架构

### 技术栈
- **框架**：React 19 + TypeScript
- **UI 库**：Arco Design
- **构建工具**：Vite
- **样式**：CSS + CSS 变量

### 无障碍（a11y）文件

| 文件 | 说明 |
|------|------|
| `frontend/src/a11y.css` | 全局无障碍样式，包含焦点样式、Skip Link、减少动画等 |
| `frontend/src/icons/IconAccessibility.tsx` | 无障碍图标组件 |
| `frontend/src/icons/svgs/accessibility.svg` | 无障碍图标 SVG 源文件 |
| `docs/guides/ACCESSIBILITY_GUIDE.md` | 无障碍开发指南 |
| `docs/guides/A11Y_IMPLEMENTATION.md` | 无障碍改进实施记录 |
| `docs/guides/A11Y_SETTINGS.md` | 无障碍设置使用说明 |

### 核心组件

| 组件 | 功能 |
|------|------|
| `App.tsx` | 应用根组件，管理页面路由 |
| `Sidebar.tsx` | 侧边导航栏 |
| `TitleBar.tsx` | 顶部标题栏 |
| `SearchBox.tsx` | 全局搜索 |
| `ChatPanel.tsx` | AI 聊天面板 |
| `SettingsPage.tsx` | 设置页面（含无障碍设置） |

---

## 文档导航

### 用户指南
- [快速启动](guides/QUICKSTART.md)
- [无障碍设置](guides/A11Y_SETTINGS.md)

### 开发指南
- [前端样式规范](../frontend-style-guide.md)
- [无障碍开发指南](guides/ACCESSIBILITY_GUIDE.md)
- [API 文档](guides/API_FASTAPI.md)

### 项目信息
- [更新日志](guides/CHANGELOG.md)
- [版本信息](guides/VERSION.md)

---

## 如何运行

### 开发模式

```bash
# 前端开发服务器
cd frontend
npm run dev

# Python 后端
python run.pyw
```

### 构建生产版本

```bash
# 构建前端
cd frontend
npm run build

# 打包完整应用
pyinstaller Papyrus.spec
```

---

## 最近更新

### 2026-03-26 无障碍改进
- ✅ 新增全局无障碍样式 (`a11y.css`)
- ✅ 新增无障碍设置面板
- ✅ 完善 ARIA 属性支持
- ✅ 优化键盘导航
- ✅ 达到 WCAG 2.1 AAA 级对比度标准
