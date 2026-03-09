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

- **当前版本**: v1.2.0-beta
- **更新日期**: 2026-03-09

### v1.2.0-beta 更新内容
- ✨ 全新设计的AI侧边栏界面（浅色主题）
- 🎨 优化对话气泡样式，更现代化的聊天体验
- 📁 重构项目结构，代码组织更清晰
- 🧹 清理冗余文件，移除旧版本代码
- 📝 完善文档结构，新增工具和测试目录
- 🐛 修复输入框布局问题


