# Papyrus API 文档

Base URL: `/api`

后端默认监听 `127.0.0.1:8000`，可通过 `PAPYRUS_PORT` 环境变量覆盖。

---

## 健康检查

### GET /health
检查服务状态。

**响应:**
```json
{ "status": "ok" }
```

---

## 卡片管理 (Cards)

### GET /cards
列出所有卡片。

**响应:**
```json
{
  "success": true,
  "cards": [
    { "id": "...", "q": "问题", "a": "答案", "next_review": 1234567890, "interval": 1.0 }
  ],
  "count": 1
}
```

### POST /cards
创建卡片。

**请求体:**
```json
{ "q": "问题", "a": "答案", "tags": ["标签"] }
```

### GET /cards/:id
获取单个卡片。

### PATCH /cards/:id
更新卡片。

### DELETE /cards/:id
删除卡片。

---

## 复习 (Review)

### GET /review/next
获取下一张到期卡片。

**响应:**
```json
{
  "success": true,
  "card": { ... },
  "due_count": 5,
  "total_count": 100
}
```

### POST /review/:id/rate
评分卡片。

**请求体:**
```json
{ "grade": 1|2|3 }  // 1=忘记, 2=模糊, 3=秒杀
```

---

## 笔记管理 (Notes)

### GET /notes
列出所有笔记。

### POST /notes
创建笔记。

**请求体:**
```json
{
  "title": "标题",
  "folder": "文件夹",
  "content": "内容",
  "tags": ["标签"]
}
```

### GET /notes/:id
获取单个笔记。

### PATCH /notes/:id
更新笔记（部分更新）。

### DELETE /notes/:id
删除笔记。

---

## 导入 (Import)

### POST /notes/import/obsidian
从 Obsidian Vault 导入笔记。

**请求体:**
```json
{
  "vault_path": "/path/to/obsidian/vault",
  "exclude_folders": [".obsidian", ".git"]
}
```

---

## 文件管理 (Files)

### GET /files
列出所有文件。

### POST /files
上传文件。

### DELETE /files/:id
删除文件。

---

## 关系管理 (Relations)

### GET /relations
列出所有关系。

### POST /relations
创建关系。

### DELETE /relations/:id
删除关系。

---

## 扩展管理 (Extensions)

### GET /extensions
列出已安装扩展。

### POST /extensions/install
安装扩展。

### DELETE /extensions/:name
卸载扩展。

### POST /extensions/:name/enable
启用扩展。

### POST /extensions/:name/disable
禁用扩展。

---

## 设置 (Settings)

### GET /settings
获取所有设置。

### PATCH /settings
更新设置。

---

## 搜索 (Search)

### GET /search?q=关键词
全局搜索卡片和笔记。

---

## AI 功能

### POST /ai/chat
AI 聊天（流式 SSE）。

### GET /ai/sessions
获取聊天会话列表。

### POST /ai/sessions
创建新会话。

### DELETE /ai/sessions/:id
删除会话。

### GET /ai/messages/:sessionId
获取会话消息。

### POST /ai/tools/execute
执行 AI 工具调用。

---

## AI 配置

### GET /config/ai
获取 AI 配置。

### PATCH /config/ai
更新 AI 配置。

---

## AI 提供商

### GET /providers
获取所有提供商和模型列表。

### POST /providers
添加自定义提供商。

### DELETE /providers/:id
删除提供商。

---

## 进度 (Progress)

### GET /progress
获取复习进度统计。

---

## MCP 服务

### GET /mcp/notes
MCP 笔记列表。

### GET /mcp/notes/:id
MCP 单篇笔记。

### POST /mcp/notes
MCP 创建笔记。

### PATCH /mcp/notes/:id
MCP 更新笔记。

### DELETE /mcp/notes/:id
MCP 删除笔记。

### POST /mcp/notes/search
MCP 搜索笔记。

### POST /mcp/vault/index
Vault 索引（批量获取元数据）。

### POST /mcp/vault/read
Vault 读取（批量获取内容）。

---

## Markdown 渲染

### POST /markdown/render
将 Markdown 渲染为 HTML。

**请求体:**
```json
{ "content": "# 标题\n\n**粗体** 和 *斜体*" }
```

---

## 前端调用示例

```typescript
import { api } from './api';

// 获取笔记列表
const { notes } = await api.listNotes();

// 创建笔记
await api.createNote('标题', '文件夹', '内容', ['标签']);

// 更新笔记
await api.updateNote('note-id', { title: '新标题', content: '新内容' });

// 从 Obsidian 导入
const result = await api.importObsidian('/path/to/vault');
console.log(`导入 ${result.imported} 条，跳过 ${result.skipped} 条`);
```

---

## 版本历史

| 版本 | 更新内容 |
|------|----------|
| v2.0.0-beta.11 | 补全 API 文档，移除预留标记 |
| v2.0.0-beta.4 | 初始 API 文档 |
