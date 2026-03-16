# Papyrus 版本信息

## 当前版本：v1.2.2

### 🎉 主要更新

#### v1.2.2 更新内容
- **修复 API Key 编码错误**：解决 'latin-1' codec 无法编码中文字符的问题
- **配置验证机制**：在保存前检查 API Key 和 Base URL，阻止包含非法字符的配置
- **三层防护**：配置验证层、UI 提示层、请求兜底层
- **改进错误提示**：明确指出哪个提供商的哪个字段包含非法字符

#### v1.2.1-beta+macOS.arm64 更新内容
- **修复构建工作流**：解决跨平台路径问题
- **优化打包配置**：支持 Windows 和 macOS 自动构建
- **改进 CI/CD**：自动化发布流程

#### v1.2.1-beta 更新内容
- **修复 AI 设置保存问题**：切换提供商时自动验证并调整模型兼容性
- **改进错误提示**：保存失败时显示具体原因
- **增强稳定性**：防止提供商和模型不匹配导致的问题


### 📦 安装说明

#### 基础功能（无需额外依赖）
- SM-2 算法
- 卡片学习
- 数据管理

#### AI 功能（需要安装依赖）
```bash
pip install -r requirements.txt

```

### 🚀 快速开始

#### 1. 启动程序
```bash
python src/Papyrus.pyw
# 或
python src/Papyrus.py
```


#### 2. 配置 AI（可选）
1. 点击右侧 AI 助手的 "⚙" 按钮
2. 在 "API配置" 标签页输入 API Key
3. 在 "模型管理" 标签页选择模型
4. 保存设置

#### 3. 使用 AI 对话
直接在输入框输入问题：
- "帮我解释这道题"
- "创建一张关于递归的卡片"
- "搜索所有 Python 相关的题"

### 📊 数据格式变更

新版本卡片数据新增字段（向后兼容）：
```json
{
  "q": "题目",
  "a": "答案",
  "next_review": 0,
  "interval": 0,
  "ef": 2.5,           // 新增：难度系数
  "repetitions": 0     // 新增：连续正确次数
}
```

旧数据会自动适配，无需手动迁移。

### 🔧 技术架构

```
Papyrus/
├── src/
│   ├── Papyrus.pyw          # 兼容入口（推荐运行：python src/Papyrus.pyw）
│   ├── Papyrus.py           # 兼容入口（旧导入支持：from Papyrus import ...）
│   ├── papyrus/             # 新版主程序包（模块化实现）
│   ├── papyrus_api/         # FastAPI 后端（预留：给前端提供 /api/*）
│   └── ai/                  # AI 模块
│       ├── config.py        # 配置管理
│       ├── provider.py      # AI 提供商接口
│       ├── sidebar_v3.py    # AI 侧边栏 UI
│       └── tools.py         # 工具调用系统
├── frontend/                # TS + React + Arco 前端（预留）
├── data/
│   ├── Papyrusdata.json     # 学习数据
│   └── ai_config.json       # AI 配置
├── backup/                  # 自动备份
├── requirements.txt         # Python 依赖
├── CHANGELOG.md             # 详细更新日志
└── README.md                # 项目说明
```



### 🌐 FastAPI（可选：给前端提供接口）

```bash
python -m uvicorn src.papyrus_api.main:app --reload --host 127.0.0.1 --port 8000
```

- Health: http://127.0.0.1:8000/api/health



1. **Windows 控制台编码警告**
   - 不影响使用
   - 已在代码中处理

2. **Ollama 刷新功能**
   - 待完善
   - 可手动添加模型名称

### 🔮 未来计划

- [ ] 语音输入/输出（TTS/STT）
- [ ] 图片识别（拍照题目）
- [ ] 知识图谱可视化
- [ ] 学习进度统计面板
- [ ] 社区卡片分享
- [ ] 移动端支持

### 📝 更新日志

详细的版本历史请查看 [CHANGELOG.md](CHANGELOG.md)

### 💬 反馈与支持

- 问题反馈：[GitHub Issues](https://github.com/Alpaca233114514/Papyrus/issues)
- 功能建议：欢迎提交 Pull Request

### 📄 开源协议

MIT License

---

**Papyrus v1.2.2** - 让学习更智能，让记忆更科学。


