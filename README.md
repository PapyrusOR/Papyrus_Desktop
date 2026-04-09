# 📜 Papyrus (莎草纸)

![Minecraft Paper](https://img.shields.io/badge/Icon-Minecraft_Paper-green)
![Python](https://img.shields.io/badge/Python-3.8-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)
![AI-Assisted](https://img.shields.io/badge/Dev-AI--Assisted-blueviolet)

**Papyrus** 是一款专注于高强度模型记忆的极简、高效、全键盘驱动的AI Agent驱动暗记（SRS）复习引擎。

> “大道至简。”

---

## ✨ 核心特性

- 🚀 **极简交互**：全流程键盘驱动，无需触碰鼠标，助你进入深度复习的“心流”状态。
- 🧠 **智能调度**：内置基于艾宾浩斯遗忘曲线逻辑的简化间隔复习算法，根据掌握程度自动安排下一次复习时间。
- 📦 **轻量便携**：单文件 `.exe` 运行，零依赖，数据本地化存储于 `Papyrusdata.json`，隐私安全。

---

## ⌨️ 快捷键 (心流模式)

| 按键 | 动作 | 效果 |
| :--- | :--- | :--- |
| **Space (空格)** | **揭晓答案** | 展开卷轴，查看“卷尾”内容 |
| **1** | **忘记** | 标记为不熟悉，短期内高频重现 |
| **2** | **模糊** | 标记为不确定，稍后再次复习 |
| **3** | **秒杀** | 记忆极其稳固，复习间隔线性翻倍 |

---

## 📥 批量导入格式

准备一个 `UTF-8` 编码的 `.txt` 文件，格式如下：

```text
模型场景或问题 A === 核心扳机或答案 A

模型场景或问题 B === 核心扳机或答案 B
```

*提示：每组卡片通过 `===` 分隔，组与组之间建议空一行以保持清晰。*

---

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

---

## 🛠️ 技术细节 (For Developers)

- **开发模式**: 本人为主，AI辅助(Cluade Sonnet 4.6,Gemini 3.0 Pro)
- **语言**: Python 3.8 (Tkinter)
- **工程化**: 采用 `PyInstaller` 封装，处理了 `sys._MEIPASS` 资源路径兼容性。
- **开源协议**: MIT License
- **鸣谢**: 图标素材来源于 Minecraft Wiki (Mojang Studio)。

---
## 致谢
<a href="https://github.com/PapyrusOR/Papyrus_Desktop/contributors">
  <img src="https://contrib.rocks/image?repo=PapyrusOR/Papyrus_Desktop&max=200&columns=14" />
</a>

感谢你们的支持，Papyrus因为你们而更好！

## 💡 开发者说
其实这个作品的诞生过程没有那么理想和伟大。

为什么要做这个呢？有一天我在搞AI学习，下了个Anki准备背记知识点，下完发现这玩意要检查更新，更新要连服务器，我死活连不上。

这时候发现Gemini在旁边呢，让它给我写一个吧，然后写了写调了调，就拿去用了。

其实我本来没想发这个东西的，为啥还是发了呢？

昨天我用上好久没上的号给女朋友点star，github把我识别成机器人，把我的活动下了。我火大啊，我自己用AI，我自己又不是AI，为了证明我不是AI，刚好手里有这个，就改了改放上来了。

小故事讲完了，今天都初六了，过会都天亮了。苦逼学生，哎，只能在这发发牢骚。

我很喜欢一句话：知识使人自由(Veritas vos liberabit)，与各位大佬共勉，这是我的第一个开源项目，望大佬们多多海涵。

就当是拜个晚年吧。
**祝你在新的一年，手持知识之利刃，刺破黑夜之墟，直捣黎明之境。**

---

## 📚 文档导航

- [快速启动指南](docs/guides/QUICKSTART.md) - 5分钟上手
- [版本信息](docs/guides/VERSION.md) - 当前版本和更新内容
- [更新日志](docs/guides/CHANGELOG.md) - 完整的版本历史
- [项目结构](docs/PROJECT_STRUCTURE.md) - 代码组织说明
- [AI功能说明](docs/AI_README.md) - AI助手使用指南
- [AI工具演示](docs/AI_TOOLS_DEMO.md) - 实际使用案例

