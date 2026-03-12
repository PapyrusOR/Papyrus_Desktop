# Papyrus 项目结构说明

## 目录结构

```
Papyrus/
├── src/                    # 源代码目录
│   └── Papyrus.pyw        # 主程序文件
│
├── data/                   # 数据目录
│   └── Papyrusdata.json   # 学习数据（卡片、进度等）
│
├── assets/                 # 资源目录
│   └── icon.ico           # 程序图标
│
├── backup/                 # 备份目录
│   └── Papyrusdata.json.bak  # 自动备份文件
│
├── docs/                   # 文档目录
│   └── PROJECT_STRUCTURE.md  # 本文件
│
├── build/                  # 构建输出目录（PyInstaller）
├── __pycache__/           # Python 缓存
│
├── run.pyw                 # 启动器（推荐使用）
├── README.md               # 项目说明
├── LICENSE                 # 许可证
├── .gitignore             # Git 忽略文件
└── Papyrus.spec           # PyInstaller 配置
```

## 如何运行

### 方法1：使用启动器（推荐）
双击根目录的 `run.pyw` 文件

### 方法2：直接运行
进入 `src` 目录，双击 `Papyrus.pyw`

### 方法3：命令行
```bash
python run.pyw
# 或
python src/Papyrus.pyw
```

## 文件说明

### 源代码 (src/)
- **Papyrus.pyw**: 主程序，包含所有功能逻辑

### 数据文件 (data/)
- **Papyrusdata.json**: 存储所有学习卡片和复习进度
  - 格式：JSON 数组，每个卡片包含题目、答案、下次复习时间、间隔时间

### 资源文件 (assets/)
- **icon.ico**: 程序窗口图标
  - 如果文件不存在，程序会自动跳过（容错处理）

### 备份文件 (backup/)
- **Papyrusdata.json.bak**: 自动备份文件
  - 智能备份：每小时自动备份一次
  - 手动备份：通过菜单「创建备份」立即备份
  - 重要操作前强制备份（如重置数据）

## 路径管理

程序使用相对路径自动定位各个目录：

```python
BASE_DIR = 项目根目录
DATA_DIR = BASE_DIR/data
BACKUP_DIR = BASE_DIR/backup
ASSETS_DIR = BASE_DIR/assets
```

所有路径都会自动创建，无需手动设置。

## 版本信息

- **当前版本**: v1.2.1
- **更新日期**: 2026-03-12

### v1.2.1 更新内容
#### 1. SM-2 科学记忆算法
- 替换原有简单算法，采用经过验证的 SM-2 间隔重复算法
- 根据答题质量动态调整复习间隔
- 每张卡片独立的难度系数 (Easiness Factor)
- 完全向后兼容旧数据

#### 2. AI 智能助手
- **主题**：现代化的对话界面
- **纯对话模式**：自然语言交互，无需记忆命令
- **上下文感知**：AI 自动知道你在学习哪张卡片

#### 3. 多模型支持
- **OpenAI**：GPT系列
- **Anthropic**：Claude Opus, Sonnet 等
- **Ollama**：本地运行，完全免费
- **自定义**：支持任何兼容 OpenAI API 的服务

#### 4. 完整的模型管理
- GUI 界面添加/编辑/删除模型
- 从 API 自动刷新模型列表
- 多提供商快速切换
- 参数精细调整（Temperature, Max Tokens）

#### 5. AI 工具调用
- 创建/更新/删除卡片
- 搜索知识库
- 学习统计分析
- 操作审批机制，确保数据安全

#### 6. 隐私保护
- API Key 在设置界面中隐藏显示（●●●）
- 数据本地存储，不上传云端
- 支持本地模型（Ollama），数据不出本地

#### 7. 跨平台
- 新增Apple Silicon MacOS，Linux版本支持。（Mac版本暂时使用默认头像）

### 📦 安装说明

#### 基础功能（无需额外依赖）
- SM-2 算法
- 卡片学习
- 数据管理

#### AI 功能（需要安装依赖）
```bash
pip install requests
```

### v1.2.0-beta 更新内容
- ✨ 全新设计的AI侧边栏界面（浅色主题）
- 🎨 优化对话气泡样式，更现代化的聊天体验
- 📁 重构项目结构，代码组织更清晰
- 🧹 清理冗余文件，移除旧版本代码
- 📝 完善文档结构，新增工具和测试目录
- 🐛 修复输入框布局问题


