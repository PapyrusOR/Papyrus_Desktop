anh# Papyrus AI 功能说明

## 安装依赖

```bash
pip install -r requirements.txt
```

## 功能特性

### 1. SM-2 算法
- 已替换原有的简单间隔算法
- 自动适配旧数据，无需迁移
- 根据答题表现动态调整复习间隔

### 2. AI 侧边栏

#### 支持的AI提供商
- **OpenAI**: GPT-4, GPT-3.5-turbo
- **Anthropic**: Claude-3 系列
- **Ollama**: 本地模型（llama2, mistral, qwen等）
- **自定义**: 任何兼容OpenAI API的服务



## 快速开始
## 🚀 下载与使用 (Download & Usage)

### 1. 获取程序
前往 [Releases](https://github.com/Alpaca233114514/Papyrus/releases) 页面，下载最新版本。

### 2. 运行说明
1. 解压下载的 `.zip` 文件到任意文件夹。
3. 双击 `Papyrus.exe` 即可启动。
> **注意：** 请勿将 `.exe` 单独移动到其他地方运行，否则程序将无法加载图标或读取之前的复习进度（仅限v1.0.0版本）。

### 3.AI功能使用
### 1. 配置 API

点击侧边栏的 "⚙️ 设置" 按钮，输入你的 API Key：

- **OpenAI**: 在 https://platform.openai.com/api-keys 获取
- **Anthropic**: 在 https://console.anthropic.com/ 获取
- **Ollama**: 本地运行，无需API Key
  ```bash
  # 安装 Ollama
  # 下载: https://ollama.ai
  
  # 拉取模型
  ollama pull llama2
  ```

### 2. 模式配置
#### Agent模式
AI将使用工具调用进行卡片的添加，编辑，删除等操作
#### Chat模式
仅保留聊天功能

### 3. 参数调整

在设置中可以调整：
- **Temperature**: 控制创造性（0-2，越高越随机）
- **Max Tokens**: 最大回复长度

## 配置文件

AI配置保存在 `data/ai_config.json`，包含：
- API密钥
- 模型选择
- 参数设置

## 注意事项

1. **API费用**: OpenAI和Anthropic按使用量收费，建议设置预算
2. **本地模型**: Ollama完全免费，但需要较好的硬件
3. **网络**: 云端API需要稳定的网络连接
4. **隐私**: 本地模型数据不会上传，云端API会发送问题内容

## 故障排除

### AI功能不可用
- 检查是否安装了 `requests` 库
- 查看控制台错误信息

### API调用失败
- 检查API Key是否正确
- 检查网络连接
- 确认API额度是否充足

### Ollama连接失败
- 确认Ollama服务是否运行
- 检查端口是否为 11434
- 尝试: `ollama serve`

## 架构说明

```
src/
├── Papyrus.pyw          # 主程序（已集成AI）
└── ai/
    ├── __init__.py      # 模块初始化
    ├── config.py        # 配置管理
    ├── provider.py      # AI提供商接口
    └── sidebar.py       # UI界面
```

## 后续开发建议

1. **C# 重写UI**: 当前Python实现可作为后端API
2. **Function Calling**: 让AI直接操作卡片数据
3. **RAG集成**: 接入知识库增强回答质量
4. **语音功能**: TTS朗读和STT输入
5. **统计分析**: AI分析学习数据并给出建议

## 版本

- AI模块: v1.0.0
- SM-2算法: 已集成