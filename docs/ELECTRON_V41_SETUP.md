# Electron v41 适配指南

本文档描述了如何在 Papyrus 项目中配置和使用 Electron v41。

## 配置概述

Electron v41.1.0 已通过以下方式配置到项目中：

- **Electron 可执行文件**: `electron-download/dist/electron.exe`
- **Electron 版本**: 41.1.0
- **Node 版本**: 24.14.0
- **Chrome 版本**: 146.0.7680.166

## 文件结构

```
electron-download/
├── dist/                          # Electron v41 解压后的文件
│   ├── electron.exe               # Electron 可执行文件
│   ├── chrome_100_percent.pak
│   ├── chrome_200_percent.pak
│   ├── ... (其他 Electron 文件)
│   └── resources/
│       └── default_app.asar       # 默认应用
├── electron-v41.1.0-win32-x64.zip # 原始 zip 包
└── package/                       # npm 包结构（从 registry 下载）
    ├── index.js                   # npm 包入口
    ├── package.json
    ├── cli.js
    └── ...

node_modules/electron/
├── dist/                          # 指向 electron-download/dist 的实际文件
├── index.js                       # npm 包入口（返回 electron 路径）
├── package.json                   # npm 包配置
├── cli.js                         # CLI 入口
├── path.txt                       # 指向 dist/electron.exe
└── ...

dist-electron/                     # 构建输出
├── win-unpacked/                  # 便携版（可直接运行）
│   ├── Papyrus.exe               # 应用程序
│   └── resources/
│       └── app.asar              # 应用代码
└── Papyrus-Setup-2.0.0-beta.1.exe # 安装程序
```

## 已完成的配置

### 1. Electron v41 文件准备 ✅

- [x] 复制 `electron-v41.1.0-win32-x64.zip` 到 `electron-download/`
- [x] 解压到 `electron-download/dist/`
- [x] 下载 npm 包结构到 `electron-download/package/`

### 2. npm 包安装 ✅

- [x] 复制 npm 包文件到 `node_modules/electron/`
- [x] 创建 `path.txt` 指向可执行文件

### 3. 项目配置更新 ✅

- [x] `electron-builder.json`: 配置 `electronDist` 和 `electronVersion`
- [x] `package.json`: 更新 electron 版本为 `^41.1.0`

### 4. 成功构建 ✅

- [x] 前端构建完成
- [x] Electron 应用打包成功
- [x] 安装程序生成: `Papyrus-Setup-2.0.0-beta.1.exe` (96.12 MB)
- [x] 便携版生成: `win-unpacked/Papyrus.exe` (212.44 MB)
- [x] 应用可以正常运行

## 首次设置

### 1. 下载 Electron v41

Electron 文件不包含在 Git 仓库中（文件太大），需要自行下载：

```powershell
# 创建目录
New-Item -ItemType Directory -Force -Path "electron-download"

# 下载 Electron v41.1.0 (Windows x64)
# 从官方镜像下载:
# https://github.com/electron/electron/releases/download/v41.1.0/electron-v41.1.0-win32-x64.zip
# 或从 npmmirror 镜像:
# https://npmmirror.com/mirrors/electron/v41.1.0/electron-v41.1.0-win32-x64.zip

# 解压到 electron-download/dist/
Expand-Archive -Path "electron-download\electron-v41.1.0-win32-x64.zip" -DestinationPath "electron-download\dist"

# 下载 npm 包结构
cd electron-download
npm pack electron@41.1.0
tar -xzf electron-41.1.0.tgz
cd ..

# 复制 npm 包文件到 node_modules
copy "electron-download\package\*" "node_modules\electron\"
# 创建 path.txt
echo "electron.exe" > "node_modules\electron\path.txt"
```

### 2. 验证配置

```bash
# 验证 Electron 路径
node -e "console.log(require('electron'))"
# 输出: C:\...\node_modules\electron\dist\electron.exe

# 验证 Electron 版本
.\node_modules\electron\dist\electron.exe -e "console.log(process.versions.electron)"
# 输出: 41.1.0
```

### 构建应用

#### 快速构建（同时输出两种格式）

```bash
# 构建前端
cd frontend && npm run build && cd ..

# 同时构建便携版 + 安装程序（默认）
npm run build:all
```

#### 单独构建特定格式

```bash
# 只构建便携版（适合 Beta 测试）
npm run build:portable
# 输出: dist-electron/Papyrus-2.0.0-beta.1.exe (单文件，无需安装)

# 只构建安装程序（适合正式版发布）
npm run build:installer
# 输出: dist-electron/Papyrus-Setup-2.0.0-beta.1.exe (安装向导)
```

#### 输出文件说明

| 格式 | 文件名 | 适用场景 |
|------|--------|----------|
| 便携版 | `Papyrus-2.0.0-beta.1.exe` | Beta测试、绿色运行、U盘携带 |
| 安装版 | `Papyrus-Setup-2.0.0-beta.1.exe` | 正式版发布、需要安装向导 |

#### 运行应用

```bash
# 便携版：直接运行，无需安装
.\dist-electron\Papyrus-2.0.0-beta.1.exe

# 安装版：运行安装向导
.\dist-electron\Papyrus-Setup-2.0.0-beta.1.exe
```

## 遇到的问题与解决方案

### 1. rcedit-x64.exe 缺失

**问题**: electron-builder 在 Windows 上需要 `rcedit-x64.exe` 来修改可执行文件的版本信息和图标。

**错误信息**:
```
cannot execute cause=exec: "...\rcedit-x64.exe": file does not exist
```

**解决方案**:

```powershell
# 下载 rcedit-x64.exe
$rceditUrl = "https://github.com/electron/rcedit/releases/download/v2.0.0/rcedit-x64.exe"
$winCodeSignDir = "$env:LOCALAPPDATA\electron-builder\Cache\winCodeSign\winCodeSign-2.6.0"
New-Item -ItemType Directory -Force -Path $winCodeSignDir | Out-Null
Invoke-WebRequest -Uri $rceditUrl -OutFile "$winCodeSignDir\rcedit-x64.exe" -UseBasicParsing
```

**替代方案**（已采用）:
在 `electron-builder.json` 中禁用可执行文件修改：
```json
"win": {
  "signAndEditExecutable": false
}
```

### 2. 文件被占用

**问题**: 重新打包时，`dist-electron` 目录中的文件被占用，导致无法删除。

**错误信息**:
```
remove ...\dxcompiler.dll: The process cannot access the file because it is being used by another process.
```

**解决方案**:

```powershell
# 1. 杀死所有相关进程
Get-Process | Where-Object { 
    $_.ProcessName -like "*electron*" -or 
    $_.ProcessName -like "*Papyrus*"
} | Stop-Process -Force

# 2. 强制删除目录
cmd /c "rd /s /q dist-electron 2>nul"
```

### 3. rcedit 无法加载文件

**问题**: 即使安装了 rcedit，也可能因为文件格式问题无法修改 Electron v41 的可执行文件。

**错误信息**:
```
Unable to load file: "...\Papyrus.exe"
```

**解决方案**:
使用 `signAndEditExecutable: false` 禁用可执行文件修改。这样打包后的应用使用 Electron 原始图标，但功能完全正常。

## 构建输出

构建成功后会生成以下文件：

| 文件 | 大小 | 说明 |
|------|------|------|
| `dist-electron/Papyrus-Setup-2.0.0-beta.1.exe` | ~96 MB | NSIS 安装程序 |
| `dist-electron/win-unpacked/Papyrus.exe` | ~212 MB | 便携版（可直接运行） |
| `dist-electron/win-unpacked/resources/app.asar` | ~2 MB | 应用代码（压缩） |

## 更新 Electron 版本

1. 下载新的 Electron zip 包到 `electron-download/`
2. 备份旧的 `electron-download/dist` 目录
3. 解压新的 zip 包到 `electron-download/dist`
4. 更新 `electron-builder.json` 中的 `electronVersion`
5. 更新 `package.json` 中的 electron 版本号
6. 重新运行 `npm pack electron@新版本` 获取 npm 包结构
7. 复制 npm 包文件到 `node_modules/electron/`

## 配置完成日期

2026-03-29

## 参考

- [Electron 41 Release Notes](https://releases.electronjs.org/release/v41.1.0)
- [electron-builder Configuration](https://www.electron.build/configuration/configuration)
- [rcedit GitHub](https://github.com/electron/rcedit)
