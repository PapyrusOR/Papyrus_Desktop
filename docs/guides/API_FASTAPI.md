# Papyrus 后端 API 说明

> 本文档已更新。Papyrus 当前后端基于 **Node.js + Fastify + TypeScript**，不再使用 Python FastAPI。

---

## 后端架构

- **运行时**: Node.js 24+
- **框架**: Fastify 5
- **语言**: TypeScript 5（ES Module）
- **入口**: `backend/src/api/server.ts`

---

## 启动（开发）

安装依赖：

```bash
cd backend
npm install
```

启动 API：

```bash
cd backend
npm run dev   # tsx watch src/api/server.ts
```

健康检查：

- http://127.0.0.1:8000/api/health

---

## API 概览

所有 API 均以 `/api` 为前缀，支持 CORS，可从浏览器扩展或本地应用调用。

| 接口类型 | 前缀 | 说明 |
|---------|------|------|
| 核心 API | `/api/*` | 卡片、复习、笔记、文件、关系等 |
| MCP 扩展接口 | `/api/mcp/*` | 笔记 CRUD、搜索、Vault 操作 |
| Markdown 渲染 | `/api/markdown/*` | Markdown 转 HTML |

详见 [API 文档](../API.md)。

---

## 并发写入

当前卡片数据持久化是写入单个 JSON 文件。
JSON-file storage is single-writer; don't run multiple instances against the same data dir.

---

## 历史说明

Papyrus 早期版本（v1.x）使用 Python FastAPI 后端。v2.0.0 起全面迁移至 Node.js + Fastify + TypeScript 架构。
