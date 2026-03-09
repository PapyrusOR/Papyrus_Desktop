#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""AI模块测试脚本"""

import sys
import os

# 添加src到路径
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

try:
    from ai.config import AIConfig
    from ai.provider import AIManager
    print("✓ AI模块导入成功")
    
    # 测试配置
    config = AIConfig("data")
    print("✓ 配置加载成功")
    print(f"  当前提供商: {config.config['current_provider']}")
    print(f"  当前模型: {config.config['current_model']}")
    
    # 测试AI管理器
    ai_manager = AIManager(config)
    print("✓ AI管理器初始化成功")
    
    # 检查API配置
    provider_config = config.get_provider_config()
    if provider_config.get('api_key'):
        print("✓ API Key已配置")
    else:
        print("⚠ API Key未配置，请在设置中配置")
    
    print("\n所有测试通过！AI功能可用。")
    print("\n提示：")
    print("1. 运行 Papyrus.pyw 启动主程序")
    print("2. 点击侧边栏的 '⚙️ 设置' 配置API")
    print("3. 选择提供商和模型后即可使用AI功能")
    
except ImportError as e:
    print(f"✗ 导入失败: {e}")
    print("\n请安装依赖: pip install -r requirements.txt")
except Exception as e:
    print(f"✗ 测试失败: {e}")
    import traceback
    traceback.print_exc()