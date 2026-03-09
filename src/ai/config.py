import json
import os

class AIConfig:
    """AI配置管理器"""
    def __init__(self, data_dir):
        self.config_file = os.path.join(data_dir, "ai_config.json")
        self.load_config()
    
    def load_config(self):
        default = {
            "providers": {
                "openai": {
                    "api_key": "",
                    "base_url": "https://api.openai.com/v1",
                    "models": ["gpt-4", "gpt-3.5-turbo", "gpt-4-turbo"]
                },
                "anthropic": {
                    "api_key": "",
                    "base_url": "https://api.anthropic.com/v1",
                    "models": ["claude-3-opus-20240229", "claude-3-sonnet-20240229"]
                },
                "ollama": {
                    "base_url": "http://localhost:11434",
                    "models": ["llama2", "mistral", "qwen"]
                },
                "custom": {
                    "api_key": "",
                    "base_url": "",
                    "models": []
                }
            },
            "current_provider": "openai",
            "current_model": "gpt-3.5-turbo",
            "parameters": {
                "temperature": 0.7,
                "top_p": 0.9,
                "max_tokens": 2000,
                "presence_penalty": 0.0,
                "frequency_penalty": 0.0
            },
            "features": {
                "auto_hint": False,
                "auto_explain": False,
                "context_length": 10
            }
        }
        
        if os.path.exists(self.config_file):
            try:
                with open(self.config_file, 'r', encoding='utf-8') as f:
                    loaded = json.load(f)
                    self.config = {**default, **loaded}
                    # 合并嵌套字典
                    for key in ['providers', 'parameters', 'features']:
                        if key in loaded:
                            self.config[key] = {**default[key], **loaded[key]}
            except:
                self.config = default
        else:
            self.config = default
            self.save_config()
    
    def save_config(self):
        with open(self.config_file, 'w', encoding='utf-8') as f:
            json.dump(self.config, f, ensure_ascii=False, indent=2)
    
    def get_provider_config(self):
        """获取当前提供商配置"""
        provider = self.config["current_provider"]
        return self.config["providers"][provider]
    
    def get_current_model(self):
        """获取当前模型"""
        return self.config["current_model"]
    
    def get_parameters(self):
        """获取当前参数"""
        return self.config["parameters"]