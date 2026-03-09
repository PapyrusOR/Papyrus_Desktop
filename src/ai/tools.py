"""AI工具函数 - 让AI可以操作程序数据"""
import json

class CardTools:
    """卡片操作工具集"""
    
    def __init__(self, app):
        """
        app: PapyrusApp实例
        """
        self.app = app
        self.pending_operations = []  # 待审批的操作队列
    
    def get_tools_definition(self):
        """返回工具定义，供AI理解"""
        return """
你可以使用以下工具来操作学习卡片：

1. create_card(question, answer, tags=[])
   - 创建新卡片
   - 参数：question(题目), answer(答案), tags(标签列表，可选)
   
2. update_card(card_index, question=None, answer=None)
   - 更新指定卡片
   - 参数：card_index(卡片索引), question(新题目), answer(新答案)
   
3. delete_card(card_index)
   - 删除指定卡片
   - 参数：card_index(卡片索引)
   
4. search_cards(keyword)
   - 搜索包含关键词的卡片
   - 参数：keyword(搜索关键词)
   - 返回：匹配的卡片列表
   
5. get_card_stats()
   - 获取学习统计
   - 返回：总卡片数、待复习数、平均难度等
   
6. generate_practice_set(topic, count=5)
   - 根据主题生成练习题
   - 参数：topic(主题), count(数量)

使用格式：
```json
{
  "tool": "create_card",
  "params": {
    "question": "什么是递归？",
    "answer": "递归是函数调用自身的过程"
  }
}
```

注意：所有修改操作都需要用户确认后才会执行。
"""
    
    def create_card(self, question, answer, tags=None):
        """创建新卡片"""
        if not question or not answer:
            return {"success": False, "error": "题目和答案不能为空"}
        
        new_card = {
            "q": question,
            "a": answer,
            "next_review": 0,
            "interval": 0,
            "tags": tags or []
        }
        
        self.pending_operations.append({
            "type": "create",
            "data": new_card,
            "description": f"创建新卡片：{question[:30]}..."
        })
        
        return {
            "success": True,
            "message": "卡片已加入待审批队列",
            "preview": new_card
        }
    
    def update_card(self, card_index, question=None, answer=None):
        """更新卡片"""
        if card_index < 0 or card_index >= len(self.app.cards):
            return {"success": False, "error": "卡片索引无效"}
        
        old_card = self.app.cards[card_index].copy()
        updates = {}
        
        if question:
            updates["q"] = question
        if answer:
            updates["a"] = answer
        
        if not updates:
            return {"success": False, "error": "没有提供更新内容"}
        
        self.pending_operations.append({
            "type": "update",
            "index": card_index,
            "data": updates,
            "old_data": old_card,
            "description": f"更新卡片 #{card_index}: {old_card['q'][:30]}..."
        })
        
        return {
            "success": True,
            "message": "更新已加入待审批队列",
            "old": old_card,
            "new": updates
        }
    
    def delete_card(self, card_index):
        """删除卡片"""
        if card_index < 0 or card_index >= len(self.app.cards):
            return {"success": False, "error": "卡片索引无效"}
        
        card = self.app.cards[card_index]
        
        self.pending_operations.append({
            "type": "delete",
            "index": card_index,
            "data": card,
            "description": f"删除卡片 #{card_index}: {card['q'][:30]}..."
        })
        
        return {
            "success": True,
            "message": "删除操作已加入待审批队列",
            "card": card
        }
    
    def search_cards(self, keyword):
        """搜索卡片"""
        keyword = keyword.lower()
        results = []
        
        for i, card in enumerate(self.app.cards):
            if keyword in card['q'].lower() or keyword in card['a'].lower():
                results.append({
                    "index": i,
                    "question": card['q'],
                    "answer": card['a'][:100] + "..." if len(card['a']) > 100 else card['a']
                })
        
        return {
            "success": True,
            "count": len(results),
            "results": results
        }
    
    def get_card_stats(self):
        """获取统计信息"""
        total = len(self.app.cards)
        due = len(self.app.get_due_cards())
        
        # 计算平均EF
        efs = [c.get('ef', 2.5) for c in self.app.cards]
        avg_ef = sum(efs) / len(efs) if efs else 2.5
        
        # 计算复习次数分布
        reps = [c.get('repetitions', 0) for c in self.app.cards]
        
        return {
            "success": True,
            "stats": {
                "total_cards": total,
                "due_cards": due,
                "average_ef": round(avg_ef, 2),
                "max_repetitions": max(reps) if reps else 0,
                "cards_mastered": len([r for r in reps if r >= 5])
            }
        }
    
    def execute_tool(self, tool_name, params):
        """执行工具调用"""
        tools = {
            "create_card": self.create_card,
            "update_card": self.update_card,
            "delete_card": self.delete_card,
            "search_cards": self.search_cards,
            "get_card_stats": self.get_card_stats
        }
        
        if tool_name not in tools:
            return {"success": False, "error": f"未知工具: {tool_name}"}
        
        try:
            return tools[tool_name](**params)
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    def get_pending_operations(self):
        """获取待审批操作"""
        return self.pending_operations
    
    def approve_operation(self, index):
        """批准操作"""
        if index < 0 or index >= len(self.pending_operations):
            return False
        
        op = self.pending_operations[index]
        
        try:
            if op["type"] == "create":
                self.app.cards.append(op["data"])
            elif op["type"] == "update":
                for key, value in op["data"].items():
                    self.app.cards[op["index"]][key] = value
            elif op["type"] == "delete":
                del self.app.cards[op["index"]]
            
            self.app.save_data()
            self.pending_operations.pop(index)
            return True
        except Exception as e:
            print(f"执行操作失败: {e}")
            return False
    
    def reject_operation(self, index):
        """拒绝操作"""
        if index < 0 or index >= len(self.pending_operations):
            return False
        
        self.pending_operations.pop(index)
        return True
    
    def clear_pending(self):
        """清空待审批队列"""
        self.pending_operations.clear()
    
    def parse_tool_call(self, ai_response):
        """从AI响应中解析工具调用"""
        import re
        
        # 查找JSON代码块
        json_pattern = r'```json\s*(\{.*?\})\s*```'
        matches = re.findall(json_pattern, ai_response, re.DOTALL)
        
        if not matches:
            return None
        
        try:
            tool_call = json.loads(matches[0])
            if "tool" in tool_call and "params" in tool_call:
                return tool_call
        except:
            pass
        
        return None
