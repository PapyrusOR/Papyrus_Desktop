# Papyrus 项目结构说明（Python 3.14+）

> 目标：主程序已从单文件迁移为包结构；`src/Papyrus.py` 仅保留兼容入口（shim）。

## 目录结构（当前）

```text
Papyrus/
├── src/
│   ├── Papyrus.py                 # 兼容入口：保持旧导入方式不变（from Papyrus import ...）
│   ├── Papyrus.pyw                # 兼容入口（历史启动文件，转发到 run_app）
│
│   ├── papyrus/                   # ✅ 新版主程序包（模块化后代码都在这里）
│   │   ├── app.py                 # PapyrusApp + run_app()
│   │   ├── paths.py               # 路径常量：DATA_DIR/BACKUP_DIR/...
│   │   ├── resources.py           # resource_path()（含 PyInstaller _MEIPASS 兼容）
│   │   ├── data/
│   │   │   └── storage.py         # load/save/backup/restore
│   │   ├── logic/
│   │   │   └── sm2.py             # SM-2 间隔重复算法
│   │   ├── ui/
│   │   │   ├── main_ui.py         # 主学习区 UI
│   │   │   └── ai_placeholder.py  # AI 不可用时占位面板
│   │   └── integrations/
│   │       ├── ai.py              # AI 依赖隔离导入（可选）
│   │       ├── mcp.py             # MCP 依赖隔离导入（可选）
│   │       └── logging.py         # 日志模块隔离导入（可选）
│   ├── papyrus_api/               # ✅ FastAPI 后端（预留：给前端提供 /api/*）
│   │   └── main.py
│   ├── ai/                        # AI 功能实现（现阶段仍为独立包）
│   ├── mcp/                       # MCP 本地服务实现（现阶段仍为独立包）
│   ├── logger.py                  # 日志实现
│   └── log_viewer.py              # 日志查看器
│
├── frontend/                      # ✅ TS + React + Arco 前端（预留）
│   ├── package.json
│   ├── vite.config.js
│   ├── tsconfig.json
│   ├── index.html
│   └── src/
│       ├── main.tsx
│       └── App.tsx
│
├── data/                          # 用户数据（不进 Git）
│   ├── Papyrusdata.json
│   └── ai_config.json
├── backup/                        # 用户备份（不进 Git）
│   └── Papyrusdata.json.bak
├── assets/                        # 资源文件
│   └── icon.ico
├── docs/
│   └── PROJECT_STRUCTURE.md       # 本文件
├── run.pyw                        # 启动器（推荐：双击运行）
├── Papyrus.spec                   # PyInstaller 配置
└── tests/
    └── test_papyrus.py

```

## 如何运行

### 方法 1：启动器（推荐）

```bash
python run.pyw
```

### 方法 2：直接运行（推荐：.pyw 无控制台窗口）

```bash
python src/Papyrus.pyw
```

### 方法 3：直接运行兼容入口（.py）

```bash
python src/Papyrus.py
```


> `src/Papyrus.py` 会转到 `src/papyrus/app.py:run_app()` 执行。

## 兼容性说明

- 旧导入方式仍可用：
  - `from Papyrus import PapyrusApp, resource_path, ASSETS_DIR, ...`
- PyInstaller 仍可继续以 `src/Papyrus.py` 作为脚本入口进行打包。



