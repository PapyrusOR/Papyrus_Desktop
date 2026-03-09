try:
    import requests
    REQUESTS_AVAILABLE = True
except ImportError:
    REQUESTS_AVAILABLE = False
    requests = None

import json
from abc import ABC, abstractmethod

class AIProvider(ABC):
    """AI提供商基类"""
    @abstractmethod
    def chat(self, messages, **kwargs):
        pass
    
    @abstractmethod
    def list_models(self):
        pass

class OpenAIProvider(AIProvider):
    """OpenAI兼容的提供商（支持OpenAI、Anthropic、自定义）"""
    def __init__(self, api_key, base_url):
        self.api_key = api_key
        self.base_url = base_url.rstrip('/')
    
    def chat(self, messages, model, temperature=0.7, max_tokens=2000, **kwargs):
        if not REQUESTS_AVAILABLE:
            raise Exception("requests库未安装，请运行: pip install requests")
        
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        data = {
            "model": model,
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens,
            **kwargs
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/chat/completions",
                headers=headers,
                json=data,
                timeout=60
            )
            response.raise_for_status()
            return response.json()["choices"][0]["message"]["content"]
        except requests.exceptions.RequestException as e:
            raise Exception(f"API调用失败: {str(e)}")
    
    def list_models(self):
        if not REQUESTS_AVAILABLE:
            return []
        try:
            headers = {"Authorization": f"Bearer {self.api_key}"}
            response = requests.get(f"{self.base_url}/models", headers=headers, timeout=10)
            response.raise_for_status()
            return [m["id"] for m in response.json()["data"]]
        except:
            return []

class OllamaProvider(AIProvider):
    """Ollama本地模型提供商"""
    def __init__(self, base_url):
        self.base_url = base_url.rstrip('/')
    
    def chat(self, messages, model, temperature=0.7, **kwargs):
        if not REQUESTS_AVAILABLE:
            raise Exception("requests库未安装，请运行: pip install requests")
        
        data = {
            "model": model,
            "messages": messages,
            "stream": False,
            "options": {"temperature": temperature}
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/chat",
                json=data,
                timeout=120
            )
            response.raise_for_status()
            return response.json()["message"]["content"]
        except requests.exceptions.RequestException as e:
            raise Exception(f"Ollama调用失败: {str(e)}")
    
    def list_models(self):
        if not REQUESTS_AVAILABLE:
            return []
        try:
            response = requests.get(f"{self.base_url}/api/tags", timeout=5)
            response.raise_for_status()
            return [m["name"] for m in response.json()["models"]]
        except:
            return []

class AIManager:
    """AI管理器 - 统一调用入口"""
    def __init__(self, config):
        self.config = config
        self.conversation_history = []
    
    def get_provider(self):
        """获取当前提供商实例"""
        provider_name = self.config.config["current_provider"]
        provider_config = self.config.config["providers"][provider_name]
        
        if provider_name == "ollama":
            return OllamaProvider(provider_config["base_url"])
        else:
            return OpenAIProvider(
                provider_config.get("api_key", ""),
                provider_config.get("base_url", "https://api.openai.com/v1")
            )
    
    def chat(self, user_message, system_prompt=None):
        """发送消息并获取回复"""
        messages = []
        
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        
        # 添加历史对话
        context_length = self.config.config["features"]["context_length"]
        if context_length > 0:
            messages.extend(self.conversation_history[-(context_length*2):])
        
        # 添加当前消息
        messages.append({"role": "user", "content": user_message})
        
        provider = self.get_provider()
        params = self.config.config["parameters"]
        model = self.config.config["current_model"]
        
        response = provider.chat(messages, model=model, **params)
        
        # 保存对话历史
        self.conversation_history.append({"role": "user", "content": user_message})
        self.conversation_history.append({"role": "assistant", "content": response})
        
        return response
    
    def clear_history(self):
        """清空对话历史"""
        self.conversation_history = []
    
    def get_hint(self, question):
        """获取智能提示"""
        prompt = f"用户正在学习这个问题：\n{question}\n\n请给出一个不直接透露答案的提示，帮助用户思考。"
        return self.chat(prompt, system_prompt="你是一个学习助手，擅长给出启发性的提示而不是直接答案。")
    
    def explain_answer(self, question, answer):
        """解释答案"""
        prompt = f"题目：{question}\n答案：{answer}\n\n请用简单易懂的语言解释这个答案，帮助加深理解。"
        return self.chat(prompt, system_prompt="你是一个学习助手，擅长用通俗的语言解释复杂概念。")
    
    def generate_related(self, question, answer):
        """生成相关问题"""
        prompt = f"基于这个知识点：\n题目：{question}\n答案：{answer}\n\n请生成3个相关的问题，帮助巩固这个知识点。"
        return self.chat(prompt, system_prompt="你是一个学习助手，擅长设计相关的练习题。")
    
    def analyze_mistakes(self, cards_data):
        """分析错题"""
        prompt = f"用户最近答错的题目：\n{cards_data}\n\n请分析可能的薄弱环节，并给出学习建议。"
        return self.chat(prompt, system_prompt="你是一个学习分析师，擅长发现学习中的问题并给出建议。")