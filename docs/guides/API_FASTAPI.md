# Papyrus API (FastAPI) - 预留骨架

Papyrus 当前主程序是 Tkinter GUI。
为了给 TS/React 前端提供统一的 HTTP 接口，这里预留了一个 FastAPI 服务。

## 目标

- 向前端暴露 `/api/*` REST 接口
- 复用现有数据层：`src/papyrus/data/storage.py`

## 启动（开发）

安装依赖：

```bash
pip install -r requirements.txt
```

启动 API：

```bash
python -m uvicorn src.papyrus_api.main:app --reload --host 127.0.0.1 --port 8000
```

健康检查：

- http://127.0.0.1:8000/api/health

## 并发写入风险（重要）

当前卡片数据持久化是写入单个 JSON 文件（`data/Papyrusdata.json`）。
如果 **Tkinter GUI** 和 **FastAPI** 同时写入，可能出现竞态/覆盖。

建议：
- 运行 FastAPI 时不要同时启动 GUI 写入；或
- 后续引入文件锁/进程锁；或
- 将存储迁移到 SQLite。
