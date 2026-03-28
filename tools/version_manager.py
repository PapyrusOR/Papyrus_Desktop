#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Papyrus 版本号管理器

统一管理项目中所有版本号相关的文件：
- package.json (根目录)
- frontend/package.json
- src/papyrus_api/main.py

使用方法：
    python tools/version_manager.py [命令] [版本号]

命令：
    get       获取当前版本号
    set       设置新版本号 (例如: python tools/version_manager.py set 0.4.0)
    bump      增加版本号 (major|minor|patch)
    ui        启动图形界面
"""

import json
import re
import sys
import os
from pathlib import Path
from typing import List, Tuple

# 修复 Windows 控制台编码问题
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

# 项目根目录
ROOT_DIR = Path(__file__).parent.parent

# 需要管理的版本号文件
VERSION_FILES: List[Tuple[Path, str]] = [
    (ROOT_DIR / "package.json", "json"),
    (ROOT_DIR / "frontend" / "package.json", "json"),
    (ROOT_DIR / "src" / "papyrus_api" / "main.py", "python"),
]


class Version:
    """版本号类，支持比较和递增，支持预发布版本（如 2.0.0-alpha1, v2.0.0alpha1）"""
    
    def __init__(self, version_str: str):
        # 支持格式: vx.y.z 或 x.y.z 或 x.y.z-prerelease (如 v2.0.0alpha1, 2.0.0-alpha1)
        self.has_v_prefix = version_str.strip().lower().startswith('v')
        clean_version = version_str.strip().lstrip('vV')
        
        # 匹配格式: x.y.z 或 x.y.zprerelease 或 x.y.z-prerelease
        match = re.match(r'^(\d+)\.(\d+)\.(\d+)(?:[-.]?([a-zA-Z0-9.]+))?$', clean_version)
        if not match:
            raise ValueError(f"无效的版本号格式: {version_str}，请使用 vX.Y.Z 或 X.Y.Z-alpha1 格式")
        
        self.major = int(match.group(1))
        self.minor = int(match.group(2))
        self.patch = int(match.group(3))
        self.prerelease = match.group(4) or ""  # 预发布版本号，如 "alpha1", "beta.2"
    
    def __str__(self) -> str:
        version = f"{self.major}.{self.minor}.{self.patch}"
        if self.prerelease:
            version += f"-{self.prerelease}"
        return version
    
    def format_with_v(self) -> str:
        """返回带 v 前缀的版本号"""
        return f"v{self}"
    
    def bump_major(self) -> "Version":
        self.major += 1
        self.minor = 0
        self.patch = 0
        self.prerelease = ""
        return self
    
    def bump_minor(self) -> "Version":
        self.minor += 1
        self.patch = 0
        self.prerelease = ""
        return self
    
    def bump_patch(self) -> "Version":
        self.patch += 1
        self.prerelease = ""
        return self


def read_version_from_json(file_path: Path) -> str:
    """从 JSON 文件读取版本号"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            return data.get('version', '')
    except Exception as e:
        print(f"读取 {file_path} 失败: {e}")
        return ''


def read_version_from_python(file_path: Path) -> str:
    """从 Python 文件读取版本号"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            # 匹配 version="x.y.z" 或 version="vx.y.z" 或 version = "x.y.z-alpha1"
            match = re.search(r'version\s*=\s*"(v?\d+\.\d+\.\d+(?:[-.]?[a-zA-Z0-9.]*)?)"', content)
            if match:
                return match.group(1)
    except Exception as e:
        print(f"读取 {file_path} 失败: {e}")
    return ''


def write_version_to_json(file_path: Path, version: str) -> bool:
    """写入版本号到 JSON 文件"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        old_version = data.get('version', '')
        data['version'] = version
        
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
            f.write('\n')
        
        print(f"  ✓ {file_path.relative_to(ROOT_DIR)}: {old_version} → {version}")
        return True
    except Exception as e:
        print(f"  ✗ {file_path.relative_to(ROOT_DIR)}: 失败 - {e}")
        return False


def write_version_to_python(file_path: Path, version: str) -> bool:
    """写入版本号到 Python 文件"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 匹配 version="x.y.z" 或 version = "x.y.z"
        old_match = re.search(r'version\s*=\s*"(\d+\.\d+\.\d+)"', content)
        old_version = old_match.group(1) if old_match else ''
        
        new_content = re.sub(
            r'(version\s*=\s*")(\d+\.\d+\.\d+)(")',
            f'\\g<1>{version}\\g<3>',
            content
        )
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"  ✓ {file_path.relative_to(ROOT_DIR)}: {old_version} → {version}")
        return True
    except Exception as e:
        print(f"  ✗ {file_path.relative_to(ROOT_DIR)}: 失败 - {e}")
        return False


def get_current_version() -> str:
    """获取当前版本号（从根目录 package.json）"""
    return read_version_from_json(ROOT_DIR / "package.json")


def set_version(new_version: str) -> bool:
    """设置新版本号到所有文件"""
    print(f"\n设置版本号: {new_version}")
    print("-" * 50)
    
    success = True
    for file_path, file_type in VERSION_FILES:
        if not file_path.exists():
            print(f"  ✗ {file_path.relative_to(ROOT_DIR)}: 文件不存在")
            success = False
            continue
        
        if file_type == "json":
            if not write_version_to_json(file_path, new_version):
                success = False
        elif file_type == "python":
            if not write_version_to_python(file_path, new_version):
                success = False
    
    print("-" * 50)
    if success:
        print(f"✅ 版本号已更新为: {new_version}")
    else:
        print(f"⚠️  部分文件更新失败")
    
    return success


def bump_version(part: str) -> bool:
    """递增版本号"""
    current = get_current_version()
    if not current:
        print("❌ 无法获取当前版本号")
        return False
    
    try:
        version = Version(current)
        
        if part == "major":
            version.bump_major()
        elif part == "minor":
            version.bump_minor()
        elif part == "patch":
            version.bump_patch()
        else:
            print(f"❌ 无效的递增部分: {part}，请使用 major|minor|patch")
            return False
        
        return set_version(str(version))
    except ValueError as e:
        print(f"❌ {e}")
        return False


def show_status():
    """显示所有文件的版本号状态"""
    print("\n📋 版本号状态")
    print("=" * 50)
    
    versions = {}
    for file_path, file_type in VERSION_FILES:
        if file_type == "json":
            version = read_version_from_json(file_path)
        else:
            version = read_version_from_python(file_path)
        
        versions[file_path] = version
        status = "✓" if version else "✗"
        rel_path = str(file_path.relative_to(ROOT_DIR))
        print(f"{status} {rel_path:<40} {version or '未找到'}")
    
    print("=" * 50)
    
    # 检查版本号是否一致
    unique_versions = set(v for v in versions.values() if v)
    if len(unique_versions) == 1:
        print(f"✅ 所有文件版本号一致: {unique_versions.pop()}")
    else:
        print(f"⚠️  版本号不一致！")


def run_ui():
    """运行图形界面"""
    try:
        import tkinter as tk
        from tkinter import ttk, messagebox
    except ImportError:
        print("❌ 无法导入 tkinter，请安装 Python 的 tk 支持")
        return
    
    class VersionManagerUI:
        def __init__(self, root):
            self.root = root
            self.root.title("Papyrus 版本号管理器")
            self.root.geometry("500x400")
            self.root.resizable(False, False)
            
            # 设置窗口居中
            self.center_window()
            
            # 标题
            ttk.Label(
                root, 
                text="Papyrus 版本号管理器", 
                font=("Microsoft YaHei", 16, "bold")
            ).pack(pady=20)
            
            # 当前版本
            self.current_version = get_current_version()
            self.version_var = tk.StringVar(value=self.current_version)
            
            frame = ttk.Frame(root)
            frame.pack(pady=10, padx=30, fill=tk.X)
            
            ttk.Label(frame, text="当前版本:", font=("Microsoft YaHei", 11)).pack(side=tk.LEFT)
            ttk.Label(
                frame, 
                text=self.current_version, 
                font=("Microsoft YaHei", 11, "bold"),
                foreground="#0066cc"
            ).pack(side=tk.LEFT, padx=10)
            
            # 新版本输入
            input_frame = ttk.Frame(root)
            input_frame.pack(pady=15, padx=30, fill=tk.X)
            
            ttk.Label(input_frame, text="新版本:", font=("Microsoft YaHei", 11)).pack(side=tk.LEFT)
            self.version_entry = ttk.Entry(
                input_frame, 
                textvariable=self.version_var,
                font=("Microsoft YaHei", 11),
                width=15
            )
            self.version_entry.pack(side=tk.LEFT, padx=10)
            
            # 递增按钮
            btn_frame = ttk.Frame(root)
            btn_frame.pack(pady=10)
            
            ttk.Button(
                btn_frame, 
                text="+ Major",
                command=self.bump_major,
                width=10
            ).pack(side=tk.LEFT, padx=5)
            
            ttk.Button(
                btn_frame, 
                text="+ Minor",
                command=self.bump_minor,
                width=10
            ).pack(side=tk.LEFT, padx=5)
            
            ttk.Button(
                btn_frame, 
                text="+ Patch",
                command=self.bump_patch,
                width=10
            ).pack(side=tk.LEFT, padx=5)
            
            # 操作按钮
            action_frame = ttk.Frame(root)
            action_frame.pack(pady=20)
            
            ttk.Button(
                action_frame, 
                text="应用更改",
                command=self.apply_version,
                width=15
            ).pack(side=tk.LEFT, padx=10)
            
            ttk.Button(
                action_frame, 
                text="刷新状态",
                command=self.refresh_status,
                width=15
            ).pack(side=tk.LEFT, padx=10)
            
            # 文件列表
            list_frame = ttk.LabelFrame(root, text="管理的文件", padding=10)
            list_frame.pack(pady=10, padx=30, fill=tk.BOTH, expand=True)
            
            self.file_labels = []
            for file_path, file_type in VERSION_FILES:
                label = ttk.Label(
                    list_frame, 
                    text=f"• {file_path.relative_to(ROOT_DIR)}",
                    font=("Microsoft YaHei", 9)
                )
                label.pack(anchor=tk.W, pady=2)
                self.file_labels.append(label)
        
        def center_window(self):
            """窗口居中"""
            self.root.update_idletasks()
            width = self.root.winfo_width()
            height = self.root.winfo_height()
            x = (self.root.winfo_screenwidth() // 2) - (width // 2)
            y = (self.root.winfo_screenheight() // 2) - (height // 2)
            self.root.geometry(f'{width}x{height}+{x}+{y}')
        
        def bump_major(self):
            v = Version(self.version_var.get())
            v.bump_major()
            self.version_var.set(str(v))
        
        def bump_minor(self):
            v = Version(self.version_var.get())
            v.bump_minor()
            self.version_var.set(str(v))
        
        def bump_patch(self):
            v = Version(self.version_var.get())
            v.bump_patch()
            self.version_var.set(str(v))
        
        def apply_version(self):
            new_version = self.version_var.get()
            try:
                Version(new_version)  # 验证格式
                if set_version(new_version):
                    messagebox.showinfo("成功", f"版本号已更新为: {new_version}")
                    self.current_version = new_version
                else:
                    messagebox.showerror("错误", "部分文件更新失败")
            except ValueError as e:
                messagebox.showerror("错误", str(e))
        
        def refresh_status(self):
            self.current_version = get_current_version()
            self.version_var.set(self.current_version)
    
    root = tk.Tk()
    app = VersionManagerUI(root)
    root.mainloop()


def main():
    """主函数"""
    args = sys.argv[1:]
    
    if not args or args[0] in ('--help', '-h', 'help'):
        print(__doc__)
        show_status()
        return
    
    command = args[0].lower()
    
    if command == 'get':
        version = get_current_version()
        if version:
            print(version)
        else:
            print("无法获取版本号", file=sys.stderr)
            sys.exit(1)
    
    elif command == 'set':
        if len(args) < 2:
            print("❌ 请提供版本号，例如: python tools/version_manager.py set 0.4.0")
            sys.exit(1)
        
        new_version = args[1]
        try:
            Version(new_version)  # 验证格式
            if not set_version(new_version):
                sys.exit(1)
        except ValueError as e:
            print(f"❌ {e}")
            sys.exit(1)
    
    elif command == 'bump':
        if len(args) < 2:
            print("❌ 请提供递增部分，例如: python tools/version_manager.py bump patch")
            sys.exit(1)
        
        if not bump_version(args[1]):
            sys.exit(1)
    
    elif command == 'ui':
        run_ui()
    
    elif command == 'status':
        show_status()
    
    else:
        print(f"❌ 未知命令: {command}")
        print(__doc__)
        sys.exit(1)


if __name__ == '__main__':
    main()
