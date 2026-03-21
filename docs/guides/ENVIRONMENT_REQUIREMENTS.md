# Papyrus 环境要求

## 目标

本文用于统一说明 Papyrus 当前开发与运行所需的环境版本，区分：

- Python 后端环境
- Node / React 前端环境
- 可选工具

---

## 1. Python 后端环境

### 必需版本

- Python: `3.14.3`

### Python 依赖锁定版本

对应 `requirements.txt`：

```text
requests==2.32.5
fastapi==0.135.1
uvicorn==0.41.0
```

### 适用范围

- AI 能力依赖 `requests`
- 后端 API 依赖 `fastapi`
- 本地开发启动服务依赖 `uvicorn`

### 安装方式

```bash
python -m pip install -r requirements.txt
```

---

## 2. Node / React 前端环境

### 已确认版本

- Node.js: `24.14.0`
- npm: `11.9.0`

### 前端核心依赖

来自 `frontend/package.json`：

- react: `19.2.4`
- react-dom: `19.2.4`
- @arco-design/web-react: `2.66.11`

### 前端开发依赖

- vite: `^5.4.0`
- @vitejs/plugin-react: `^4.2.0`
- typescript: `^5.6.0`
- @types/react: `^19.0.0`
- @types/react-dom: `^19.0.0`

### 适用范围

- React 负责前端页面渲染
- Vite 负责本地开发与打包
- TypeScript 负责类型检查
- Arco Design React 负责 UI 组件

### 安装方式

```bash
cd frontend
npm install
```

### 本地开发

```bash
cd frontend
npm run dev
```

默认前端开发服务使用：

- Vite dev server: `http://127.0.0.1:5173`

前端会将 `/api` 请求代理到：

- Backend API: `http://127.0.0.1:8000`

---

## 3. 可选工具

### uv

- 状态：当前环境未安装
- 用途：可作为 Python 包与虚拟环境管理工具
- 是否必需：否

如果后续团队决定引入 `uv`，建议单独补充：

- `pyproject.toml`
- `uv.lock`
- 统一安装/同步命令

在未引入前，默认仍以 `requirements.txt` 为准。

---

## 4. 推荐启动顺序

### 启动后端

```bash
python -m uvicorn src.papyrus_api.main:app --reload --host 127.0.0.1 --port 8000
```

### 启动前端

```bash
cd frontend
npm run dev
```

---

## 5. 版本基线总结

### 后端

- Python `3.14.3`
- requests `2.32.5`
- fastapi `0.135.1`
- uvicorn `0.41.0`

### 前端

- Node.js `24.14.0`
- npm `11.9.0`
- react `19.2.4`
- react-dom `19.2.4`
- @arco-design/web-react `2.66.11`
- vite `^5.4.0`
- typescript `^5.6.0`

### 可选工具

- uv：未安装，未纳入当前工程标准环境
