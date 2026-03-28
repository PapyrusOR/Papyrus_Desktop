#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Papyrus 三平台自动打包脚本
自动下载 Electron 并构建 Windows/macOS/Linux 版本
"""

import os
import sys
import json
import shutil
import zipfile
import urllib.request
from pathlib import Path

# 修复 Windows 控制台编码
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

# 配置
ELECTRON_VERSION = "41.1.0"
DOWNLOAD_BASE = "https://github.com/electron/electron/releases/download"
DOWNLOAD_DIR = Path.home() / "Downloads"
OUTPUT_DIR = Path("dist-electron")

# 平台配置
PLATFORMS = {
    "win": {
        "name": "Windows",
        "file": f"electron-v{ELECTRON_VERSION}-win32-x64.zip",
        "extract_dir": f"electron-v{ELECTRON_VERSION}-win32-x64",
        "output_name": "Papyrus-win32-x64",
        "exe_name": "electron.exe",
        "final_name": "Papyrus.exe",
        "app_path": "resources/app",
    },
    "mac": {
        "name": "macOS",
        "file": f"electron-v{ELECTRON_VERSION}-darwin-x64.zip",
        "extract_dir": f"electron-v{ELECTRON_VERSION}-darwin-x64",
        "output_name": "Papyrus-darwin-x64",
        "exe_name": "Electron.app",
        "final_name": "Papyrus.app",
        "app_path": "Papyrus.app/Contents/Resources/app",
    },
    "linux": {
        "name": "Linux",
        "file": f"electron-v{ELECTRON_VERSION}-linux-x64.zip",
        "extract_dir": f"electron-v{ELECTRON_VERSION}-linux-x64",
        "output_name": "Papyrus-linux-x64",
        "exe_name": "electron",
        "final_name": "papyrus",
        "app_path": "resources/app",
    },
}


def log(msg, level="info"):
    """打印日志"""
    prefix = {
        "success": "[OK] ",
        "warning": "[!] ",
        "error": "[X] ",
        "info": "",
    }
    print(f"{prefix.get(level, '')}{msg}")


def download_file(url, dest, desc=""):
    """下载文件并显示进度"""
    if dest.exists():
        log(f"  ✓ {desc} 已存在，跳过下载", "success")
        return True
    
    log(f"  ↓ 正在下载 {desc}...")
    log(f"    URL: {url}")
    
    try:
        urllib.request.urlretrieve(url, dest)
        log(f"  ✓ 下载完成", "success")
        return True
    except Exception as e:
        log(f"  ✗ 下载失败: {e}", "error")
        return False


def extract_zip(zip_path, extract_to):
    """解压 zip 文件"""
    if extract_to.exists():
        log(f"  ✓ 已解压，跳过")
        return True
    
    log(f"  📦 正在解压...")
    try:
        with zipfile.ZipFile(zip_path, 'r') as z:
            z.extractall(extract_to)
        log(f"  ✓ 解压完成", "success")
        return True
    except Exception as e:
        log(f"  ✗ 解压失败: {e}", "error")
        return False


def build_frontend():
    """构建前端"""
    frontend_dist = Path("frontend/dist")
    if frontend_dist.exists():
        log("  ✓ 前端已构建，跳过")
        return True
    
    log("  🔨 正在构建前端...")
    result = os.system("cd frontend && npm run build")
    if result == 0:
        log("  ✓ 前端构建完成", "success")
        return True
    else:
        log("  ✗ 前端构建失败", "error")
        return False


def create_app_structure(electron_dir, platform_info, version):
    """创建应用目录结构"""
    output_path = OUTPUT_DIR / platform_info["output_name"]
    app_path = output_path / platform_info["app_path"]
    
    # 清理旧版本
    if output_path.exists():
        shutil.rmtree(output_path)
    
    # 复制 Electron
    log(f"  📁 复制 Electron 文件...")
    shutil.copytree(electron_dir, output_path)
    
    # 创建 app 目录
    app_path.mkdir(parents=True, exist_ok=True)
    
    # 复制应用代码
    log(f"  📄 复制应用代码...")
    shutil.copytree("electron", app_path / "electron")
    shutil.copytree("frontend/dist", app_path / "frontend" / "dist")
    
    # 创建 package.json
    package_json = {
        "name": "papyrus",
        "version": version,
        "main": "electron/main.js"
    }
    with open(app_path / "package.json", "w", encoding="utf-8") as f:
        json.dump(package_json, f, indent=2)
    
    # 重命名可执行文件
    if platform_info["exe_name"] != platform_info["final_name"]:
        exe_path = output_path / platform_info["exe_name"]
        final_path = output_path / platform_info["final_name"]
        if exe_path.exists():
            exe_path.rename(final_path)
    
    return output_path


def build_platform(platform_key, version):
    """构建单个平台"""
    info = PLATFORMS[platform_key]
    log(f"\n{'='*50}")
    log(f"构建 {info['name']} 版本")
    log(f"{'='*50}")
    
    # 检查本地是否已有 Electron
    electron_dir = DOWNLOAD_DIR / info["extract_dir"]
    zip_path = DOWNLOAD_DIR / info["file"]
    
    if not electron_dir.exists():
        if not zip_path.exists():
            # 需要下载
            url = f"{DOWNLOAD_BASE}/v{ELECTRON_VERSION}/{info['file']}"
            log(f"\n  需要下载 {info['name']} 版 Electron")
            
            choice = input(f"  自动下载? (y/n): ").strip().lower()
            if choice != 'y':
                log(f"  ⏭️  跳过 {info['name']}", "warning")
                return False
            
            if not download_file(url, zip_path, info["file"]):
                return False
        
        # 解压
        if not extract_zip(zip_path, electron_dir):
            return False
    
    # 构建应用
    log(f"\n  🚀 构建 {info['name']} 应用...")
    output_path = create_app_structure(electron_dir, info, version)
    
    log(f"\n  ✅ {info['name']} 构建完成!", "success")
    log(f"     输出: {output_path}")
    
    return True


def main():
    """主函数"""
    log("\n" + "="*60)
    log("   Papyrus 三平台自动打包工具")
    log("="*60 + "\n")
    
    # 读取版本号
    try:
        with open("package.json", encoding="utf-8") as f:
            version = json.load(f)["version"]
    except:
        version = "v2.0.0alpha1"
    
    log(f"版本号: {version}")
    log(f"Electron 版本: {ELECTRON_VERSION}\n")
    
    # 构建前端
    log("前置检查：")
    if not build_frontend():
        log("\n❌ 打包失败：前端构建出错", "error")
        return
    
    # 选择构建目标
    args = sys.argv[1:]
    
    if args:
        choice = args[0]
    else:
        log("\n" + "-"*60)
        log("选择要构建的平台:")
        log("  1. Windows (win32-x64)")
        log("  2. macOS (darwin-x64)")
        log("  3. Linux (linux-x64)")
        log("  4. 全部平台")
        log("  0. 退出")
        log("-"*60)
        choice = input("\n请输入选项 (0-4): ").strip()
    
    if choice == "0":
        return
    elif choice == "1" or choice == "win":
        targets = ["win"]
    elif choice == "2" or choice == "mac":
        targets = ["mac"]
    elif choice == "3" or choice == "linux":
        targets = ["linux"]
    elif choice == "4" or choice == "all":
        targets = ["win", "mac", "linux"]
    else:
        log("无效选项", "error")
        return
    
    # 执行构建
    success_count = 0
    for target in targets:
        if build_platform(target, version):
            success_count += 1
    
    # 总结
    log("\n" + "="*60)
    log(f"构建完成: {success_count}/{len(targets)} 个平台成功")
    log("="*60)
    
    if success_count > 0:
        log(f"\n输出目录: {OUTPUT_DIR.absolute()}\n")
        for target in targets:
            info = PLATFORMS[target]
            output_path = OUTPUT_DIR / info["output_name"]
            if output_path.exists():
                log(f"  ✓ {info['name']:10} {output_path}")
    
    input("\n按 Enter 键退出...")


if __name__ == "__main__":
    main()
