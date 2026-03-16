# AI操作数据功能 - Demo说明

## 功能概述

这个Demo展示了AI如何通过Function Calling来操作程序内的学习数据。

## 工作流程

```
用户输入自然语言
    ↓
AI理解意图
    ↓
AI生成工具调用JSON
    ↓
系统执行工具
    ↓
操作加入待审批队列
    ↓
用户确认后执行
```

## 可用工具

### 1. create_card - 创建卡片
```json
{
  "tool": "create_card",
  "params": {
    "question": "什么是Python装饰器？",
    "answer": "装饰器是一种设计模式，可以在不修改函数代码的情况下增加额外功能",
    "tags": ["Python", "高级特性"]
  }
}
```

### 2. update_card - 更新卡片
```json
{
  "tool": "update_card",
  "params": {
    "card_index": 0,
    "question": "新的题目",
    "answer": "新的答案"
  }
}
```

### 3. delete_card - 删除卡片
```json
{
  "tool": "delete_card",
  "params": {
    "card_index": 5
  }
}
```

### 4. search_cards - 搜索卡片
```json
{
  "tool": "search_cards",
  "params": {
    "keyword": "递归"
  }
}
```

### 5. get_card_stats - 获取统计
```json
{
  "tool": "get_card_stats",
  "params": {}
}
```

## 使用示例

### 示例1：创建卡片
**用户输入：**
```
帮我创建一张关于Python列表推导式的卡片
```

**AI响应：**
```
好的，我来帮你创建一张关于Python列表推导式的卡片。

```json
{
  "tool": "create_card",
  "params": {
    "question": "什么是Python列表推导式？",
    "answer": "列表推导式是Python中创建列表的简洁方式，语法为 [expression for item in iterable if condition]。例如：[x**2 for x in range(10) if x % 2 == 0] 创建偶数的平方列表。",
    "tags": ["Python", "列表"]
  }
}
```

这张卡片已加入待审批队列，请在「待审批」中确认。
```

### 示例2：搜索卡片
**用户输入：**
```
搜索所有关于递归的卡片
```

**AI响应：**
```
正在搜索包含"递归"的卡片...

```json
{
  "tool": "search_cards",
  "params": {
    "keyword": "递归"
  }
}
```

找到3张相关卡片：
1. [#5] 什么是递归？
2. [#12] 递归和循环的区别
3. [#18] 递归的经典例子
```

### 示例3：查看统计
**用户输入：**
```
给我看看学习统计
```

**AI响应：**
```
这是你的学习统计：

- 总卡片数：45张
- 待复习：8张
- 平均难度系数：2.3
- 已掌握（复习5次以上）：12张
- 最高复习次数：15次

继续加油！💪
```

### 示例4：批量操作
**用户输入：**
```
帮我创建3张关于Python数据类型的卡片：列表、元组、字典
```

**AI响应：**
```
AI会生成3个create_card调用，每个都会加入待审批队列。
你可以在「待审批」界面中一次性查看和批准所有操作。
```

## 安全机制

### 1. 待审批队列
- 所有修改操作（创建、更新、删除）都不会立即执行
- 先加入待审批队列
- 用户可以查看详情后决定批准或拒绝

### 2. 操作预览
- 显示操作前后的对比
- 更新操作会显示old_data和new_data
- 删除操作会显示被删除的内容

### 3. 只读操作
- 搜索和统计等只读操作立即执行
- 不需要审批

## 使用步骤

1. **安装依赖**
   ```bash
   pip install requests
   ```

2. **启动程序**
   ```bash
   python src/Papyrus.pyw
   # 或
   python src/Papyrus.py
   ```

3. **配置API**
   - 点击侧边栏「⚙️ 设置」
   - 输入OpenAI或其他提供商的API Key

4. **使用AI操作数据**
   - 点击「🤖 AI操作数据 (Demo)」按钮
   - 输入自然语言指令
   - 点击「🚀 执行」
   - 查看AI响应和工具调用
   - 在「📋 查看待审批」中确认操作

## 扩展建议

### 更多工具
- `merge_cards(card_ids)` - 合并多张卡片
- `split_card(card_index, count)` - 拆分复杂卡片
- `add_tags(card_index, tags)` - 添加标签
- `export_cards(format, filter)` - 导出卡片
- `import_from_url(url)` - 从网页导入

### 智能功能
- **自动优化**：AI定期分析数据，建议优化
- **智能分组**：根据主题自动分类
- **难度调整**：根据答题情况自动调整卡片难度
- **知识图谱**：构建知识点之间的关系

### 批量操作
- 支持一次性处理多个操作
- 批量审批/拒绝
- 操作历史记录
- 撤销功能

## 注意事项

1. **API费用**：每次AI调用都会消耗tokens
2. **数据备份**：重要操作前建议先备份
3. **仔细审批**：批准前仔细检查操作内容
4. **测试环境**：建议先在测试数据上试用

## 技术细节

### Function Calling实现
```python
# 1. 定义工具
tools = CardTools(app)

# 2. 将工具定义发送给AI
system_prompt = tools.get_tools_definition()

# 3. AI返回工具调用JSON
response = ai_manager.chat(user_input, system_prompt)

# 4. 解析并执行
tool_call = tools.parse_tool_call(response)
result = tools.execute_tool(tool_call["tool"], tool_call["params"])

# 5. 用户审批
tools.approve_operation(index)
```

### 数据流
```
User Input → AI → Tool Call JSON → Tool Execution → Pending Queue → User Approval → Data Update
```

## 未来展望

这个Demo展示了AI操作数据的基础能力。未来可以扩展为：

1. **完全自主的学习助手**
   - AI主动发现问题并提出改进
   - 自动生成学习计划
   - 智能推荐复习内容

2. **协作学习**
   - 多用户共享优质卡片
   - AI从社区学习最佳实践
   - 自动推荐相关资源

3. **多模态支持**
   - 语音输入/输出
   - 图片识别（拍照题目）
   - 视频笔记提取

4. **RAG增强**
   - 接入知识库
   - 自动查找相关资料
   - 生成更准确的答案

## 反馈

如果你有任何建议或发现bug，欢迎反馈！