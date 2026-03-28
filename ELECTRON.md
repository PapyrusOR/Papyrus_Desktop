# Papyrus Electron 配置说明

本文档说明如何使用 Electron 打包 Papyrus 应用程序。

## 项目结构

```
Papyrus/
├── electron/               # Electron 主进程代码
│   ├── main.js            # 主进程入口
│   └── preload.js         # 预加载脚本（安全桥接）
├── scripts/               # 构建脚本
│   └── build-electron.js  # 统一构建脚本
├── build/                 # 构建资源
│   ├── entitlements.mac.plist  # macOS 权限配置
│   └── installer.nsh      # Windows 安装脚本
├── frontend/              # React + Vite 前端
│   └── dist/              # 前端构建输出
├── src/                   # Python FastAPI 后端
├── assets/                # 应用图标等资源
├── package.json           # Electron 配置
├── electron-builder.json  # 打包配置
└── PapyrusAPI.spec        # PyInstaller 配置
```

## 快速开始

### 1. 安装依赖

```bash
# 安装根目录依赖（包含 Electron）
npm install

# 安装前端依赖
cd frontend && npm install
```

### 2. 开发模式

```bash
# 启动开发服务器（同时启动前端、后端和 Electron）
npm run electron:dev

# 或者手动启动各服务
# 终端 1: cd frontend && npm run dev:frontend
# 终端 2: python -m uvicorn src.papyrus_api.main:app --reload --port 8000
# 终端 3: npx electron .
```

### 3. 构建应用

```bash
# 构建当前平台
npm run electron:build

# 仅构建 Windows
npm run electron:build:win

# 仅构建 macOS
npm run electron:build:mac

# 仅构建 Linux
npm run electron:build:linux
```

## 配置说明

### 开发模式

- **前端**: `http://localhost:5173` (Vite 开发服务器)
- **后端**: `http://localhost:8000` (FastAPI + Uvicorn)
- **Electron**: 加载 localhost:5173，启用 DevTools

### 生产模式

- **前端**: 打包后的静态文件 (`frontend/dist`)
- **后端**: PyInstaller 生成的可执行文件 (`dist-python/Papyrus`)
- **Electron**: 加载本地文件，禁用 DevTools

## 平台支持

| 平台 | 架构 | 输出格式 |
|------|------|----------|
| Windows | x64 | NSIS 安装程序 (.exe), 便携版 (.exe) |
| macOS | arm64, x64 | DMG (.dmg), ZIP (.zip) |
| Linux | x64 | AppImage, DEB (.deb), TAR.GZ |

## 关键文件说明

### electron/main.js

Electron 主进程，负责：
- 创建应用窗口
- 启动/停止 Python 后端
- 系统托盘集成
- 平台适配

### electron/preload.js

预加载脚本，安全地暴露 Electron API 给前端：
- `window.electronAPI` - 主进程通信接口
- `window.electronEnv` - 环境信息

### scripts/build-electron.js

统一构建脚本：
- 检查依赖
- 构建前端
- 打包 Python 后端（可选）
- 打包 Electron 应用

### electron-builder.json

打包配置：
- 应用标识和元数据
- 平台特定配置
- 文件包含/排除规则
- 输出格式配置

## 环境变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `NODE_ENV` | 运行环境 | `production` |
| `ELECTRON_IS_DEV` | 开发模式标志 | 自动检测 |

## 常见问题

### 1. 后端启动失败

检查：
- Python 3.8+ 是否安装
- 依赖是否安装: `pip install -r requirements.txt`
- 端口 8000 是否被占用

### 2. 前端构建失败

检查：
- Node.js 16+ 是否安装
- 前端依赖是否安装: `cd frontend && npm install`

### 3. PyInstaller 打包失败

检查：
- PyInstaller 是否安装: `pip install pyinstaller`
- 是否有足够的磁盘空间

### 4. macOS 签名问题

如需代码签名，修改 `electron-builder.json`：
```json
"mac": {
  "codesignIdentity": "Developer ID Application: Your Name (TEAM_ID)"
}
```

## 调试

### 查看日志

- **Windows**: `%APPDATA%\Papyrus\logs\`
- **macOS**: `~/Library/Application Support/Papyrus/logs/`
- **Linux**: `~/.config/Papyrus/logs/`

### 开发工具

开发模式下自动打开 DevTools。生产模式下按 `Ctrl+Shift+I` (Windows/Linux) 或 `Cmd+Option+I` (macOS) 打开。

## 发布

1. 更新版本号 (`package.json`)
2. 运行构建命令
3. 检查 `dist-electron` 目录
4. 上传到 GitHub Releases（配置了自动发布）

```bash
# 构建所有平台
npm run electron:build:all
```
