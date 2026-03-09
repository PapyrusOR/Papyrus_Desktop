#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""诊断脚本 - 检查AI模块状态"""

import sys
import os
import io

# 设置输出编码为UTF-8
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

print("=" * 60)
print("Papyrus AI 模块诊断")
print("=" * 60)

# 1. 检查Python版本
print(f"\n1. Python版本: {sys.version}")

# 2. 检查requests
print("\n2. 检查requests库...")
try:
    import requests
    print(f"   ✓ requests已安装 (版本: {requests.__version__})")
except ImportError as e:
    print(f"   ✗ requests未安装: {e}")
    sys.exit(1)

# 3. 检查AI模块路径
print("\n3. 检查AI模块路径...")
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))
print(f"   添加路径: {os.path.join(os.path.dirname(__file__), 'src')}")

# 4. 检查AI模块文件
print("\n4. 检查AI模块文件...")
ai_files = [
    'src/ai/__init__.py',
    'src/ai/config.py',
    'src/ai/provider.py',
    'src/ai/sidebar_v3.py',
    'src/ai/tools.py'
]

for f in ai_files:
    if os.path.exists(f):
        print(f"   ✓ {f}")
    else:
        print(f"   ✗ {f} 不存在")

# 5. 尝试导入AI模块
print("\n5. 尝试导入AI模块...")
try:
    from ai.config import AIConfig
    print("   ✓ AIConfig导入成功")
except Exception as e:
    print(f"   ✗ AIConfig导入失败: {e}")
    import traceback
    traceback.print_exc()

try:
    from ai.provider import AIManager
    print("   ✓ AIManager导入成功")
except Exception as e:
    print(f"   ✗ AIManager导入失败: {e}")
    import traceback
    traceback.print_exc()

try:
    from ai.sidebar_v3 import AISidebar
    print("   ✓ AISidebar导入成功")
except Exception as e:
    print(f"   ✗ AISidebar导入失败: {e}")
    import traceback
    traceback.print_exc()

try:
    from ai.tools import CardTools
    print("   ✓ CardTools导入成功")
except Exception as e:
    print(f"   ✗ CardTools导入失败: {e}")
    import traceback
    traceback.print_exc()

# 6. 模拟主程序的导入逻辑
print("\n6. 模拟主程序导入逻辑...")
AI_AVAILABLE = False
try:
    import requests
    from ai.config import AIConfig
    from ai.provider import AIManager
    from ai.sidebar_v3 import AISidebar
    from ai.tools import CardTools
    AI_AVAILABLE = True
    print("   ✓ AI_AVAILABLE = True")
except ImportError as e:
    print(f"   ✗ 导入失败 (ImportError): {e}")
    AI_AVAILABLE = False
except Exception as e:
    print(f"   ✗ 导入失败 (Exception): {e}")
    import traceback
    traceback.print_exc()
    AI_AVAILABLE = False

print(f"\n最终结果: AI_AVAILABLE = {AI_AVAILABLE}")

if AI_AVAILABLE:
    print("\n✓ 所有检查通过！AI功能应该可用。")
    print("\n如果程序中仍显示占位面板，可能是：")
    print("  1. 程序没有完全重启")
    print("  2. 使用了不同的Python环境")
    print("  3. 代码中有其他错误")
else:
    print("\n✗ AI功能不可用，请检查上述错误信息。")

print("\n" + "=" * 60)