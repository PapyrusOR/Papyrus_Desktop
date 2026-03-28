# 思维链投送和工具调用审批功能

## 概述

本功能为 AI 响应处理提供了两个核心能力：

1. **思维链投送 (Chain-of-Thought Delivery)** - 解析和分离 AI 响应中的思维链内容
2. **工具调用抓取 (Tool Call Capture)** - 识别 AI 响应中的工具调用并支持审批机制

## 核心组件

### 1. AIResponseParser - AI响应解析器

`src/ai/tools.py` 中的 `AIResponseParser` 类提供以下功能：

```python
from ai.tools import AIResponseParser, parse_response

# 解析AI响应
response = """<think>
我需要先搜索相关卡片
</think>

找到以下卡片：...

```json
{"tool": "create_card", "params": {"question": "Q", "answer": "A"}}
```"""

result = parse_response(response)
# result = {
#     "content": "找到以下卡片：...",
#     "reasoning": "我需要先搜索相关卡片",
#     "tool_call": {"tool": "create_card", "params": {...}}
# }
```

支持格式：
- `<think>...</think>`
- `<reasoning>...</reasoning>`
- `<thought>...</thought>`
- 提供商返回的 `reasoning_content` 字段

### 2. ToolManager - 工具调用管理器

`src/ai/tool_manager.py` 提供工具调用审批队列管理：

```python
from ai.tool_manager import get_tool_manager, ToolCallStatus

tm = get_tool_manager()

# 配置模式
tm.set_config({
    "mode": "manual",  # 或 "auto"
    "auto_execute_tools": ["search_cards", "get_card_stats"]
})

# 创建待审批调用
call_id = tm.create_pending_call("create_card", {
    "question": "Test",
    "answer": "Answer"
})

# 批准并执行
tm.approve_call(call_id)
tm.mark_executing(call_id)
tm.complete_call(call_id, {"success": True})

# 或拒绝
tm.reject_call(call_id, "User rejected")
```

## API 端点

### 工具调用配置

| 方法 | 端点 | 描述 |
|------|------|------|
| GET | `/api/tools/config` | 获取工具调用配置 |
| POST | `/api/tools/config` | 配置工具调用模式 |

**配置参数：**
```json
{
  "mode": "manual",
  "auto_execute_tools": ["search_cards", "get_card_stats"]
}
```

### 工具调用审批

| 方法 | 端点 | 描述 |
|------|------|------|
| GET | `/api/tools/pending` | 获取待审批工具调用列表 |
| POST | `/api/tools/approve/{call_id}` | 批准并执行工具调用 |
| POST | `/api/tools/reject/{call_id}` | 拒绝工具调用 |

### 工具调用历史

| 方法 | 端点 | 描述 |
|------|------|------|
| GET | `/api/tools/calls` | 获取工具调用历史 |
| GET | `/api/tools/calls/{call_id}` | 获取单个工具调用详情 |
| DELETE | `/api/tools/history` | 清理工具调用历史 |

### AI响应解析

| 方法 | 端点 | 描述 |
|------|------|------|
| POST | `/api/tools/parse` | 解析AI响应 |
| POST | `/api/tools/submit` | 提交新的工具调用 |

**解析请求示例：**
```json
{
  "response": "<think>思考内容</think>普通回复",
  "reasoning_content": "可选的提供商思维链"
}
```

## 工具调用状态

```python
class ToolCallStatus(str, Enum):
    PENDING = "pending"      # 待审批
    APPROVED = "approved"    # 已批准
    REJECTED = "rejected"    # 已拒绝
    EXECUTING = "executing"  # 执行中
    SUCCESS = "success"      # 执行成功
    FAILED = "failed"        # 执行失败
```

## 工具调用记录结构

```python
{
    "call_id": "tc_abc123...",
    "tool_name": "create_card",
    "params": {"question": "...", "answer": "..."},
    "status": "pending",
    "result": null,
    "created_at": 1234567890.0,
    "executed_at": null,
    "error": null
}
```

## 使用场景

### 场景1：自动执行只读工具

```python
tm.set_config({
    "mode": "manual",
    "auto_execute_tools": ["search_cards", "get_card_stats"]
})

# search_cards 和 get_card_stats 会自动执行
# create_card, update_card, delete_card 需要人工审批
```

### 场景2：全人工审批模式

```python
tm.set_config({
    "mode": "manual",
    "auto_execute_tools": []
})

# 所有工具调用都需要人工审批
```

### 场景3：全自动模式

```python
tm.set_config({
    "mode": "auto",
    "auto_execute_tools": []
})

# 所有工具调用都会自动执行
```

## 前端集成建议

1. **思维链展示**：使用 `/api/tools/parse` 解析AI响应后，将 `reasoning` 内容显示在折叠区域
2. **待审批通知**：定期轮询 `/api/tools/pending` 获取待审批列表
3. **审批UI**：为每个待审批的工具调用显示确认/拒绝按钮
4. **历史记录**：使用 `/api/tools/calls` 显示工具调用历史
