"""AI provider implementations."""

from __future__ import annotations

import json
import os
import shutil
import time
import uuid
import mimetypes
import base64
from abc import ABC, abstractmethod
from typing import Any, TypedDict, cast, Protocol, Literal, Final, AsyncGenerator

requests_available: bool

try:
    import requests  # type: ignore[import-untyped]

    requests_available = True
except ImportError:
    requests = None
    requests_available = False

# Type definitions
StreamEventType = Literal["content", "reasoning", "tool_start", "tool_result", "done", "error"]
AttachmentType = Literal["image", "document"]
ProviderName = Literal["openai", "anthropic", "ollama", "moonshot", "custom"]

# Constants
IMAGE_EXTENSIONS: Final[set[str]] = {".png", ".jpg", ".jpeg", ".webp", ".gif"}
DOCUMENT_EXTENSIONS: Final[set[str]] = {".pdf", ".txt", ".md", ".docx"}
MAX_ATTACHMENT_SIZE: Final[int] = 10 * 1024 * 1024
MAX_ATTACHMENTS_PER_MESSAGE: Final[int] = 5


class AttachmentMeta(TypedDict):
    id: str
    name: str
    stored_name: str
    path: str
    type: AttachmentType
    mime_type: str
    size: int
    created_at: float


class SessionMessage(TypedDict, total=False):
    role: str
    content: str
    attachments: list[AttachmentMeta]


class SessionData(TypedDict):
    id: str
    title: str
    messages: list[SessionMessage]
    created_at: float
    updated_at: float


class SessionSummary(TypedDict):
    id: str
    title: str
    created_at: float
    updated_at: float
    message_count: int


class StreamChunk(TypedDict):
    """流式输出块结构"""
    type: StreamEventType
    data: str | dict[str, Any]


class AIProvider(ABC):
    """AI提供商基类"""

    @abstractmethod
    def chat(self, messages: list[dict[str, Any]], **kwargs: Any) -> str:
        """Send chat messages and return response content."""
        raise NotImplementedError

    @abstractmethod
    def list_models(self) -> list[str]:
        """List available models from the provider."""
        raise NotImplementedError


class OpenAIProvider(AIProvider):
    """OpenAI兼容的提供商（支持OpenAI、Anthropic、自定义）"""

    def __init__(self, api_key: str, base_url: str) -> None:
        self.api_key: str = api_key
        self.base_url: str = base_url.rstrip('/')

    def chat(self, messages: list[dict[str, Any]], model: str, temperature: float = 0.7, max_tokens: int = 2000, **kwargs: Any) -> str:  # type: ignore[override]
        """Send chat request to OpenAI-compatible API."""
        if not requests_available or requests is None:
            raise Exception("requests库未安装，请运行: pip install requests")

        headers: dict[str, str] = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        data: dict[str, Any] = {
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
            result: dict[str, Any] = response.json()
            choices: list[dict[str, Any]] = result.get("choices", [])
            if not choices:
                raise Exception("API返回中没有choices")
            message: dict[str, Any] = choices[0].get("message", {})
            content: str = message.get("content", "")
            return content
        except UnicodeEncodeError:
            raise Exception("配置错误：API Key 或 Base URL 中包含非法字符（如中文或特殊空格），请检查 AI 设置")
        except requests.exceptions.RequestException as e:
            raise Exception(f"API调用失败: {str(e)}")

    def list_models(self) -> list[str]:
        """List available models from OpenAI-compatible API."""
        if not requests_available or requests is None:
            return []
        try:
            headers: dict[str, str] = {"Authorization": f"Bearer {self.api_key}"}
            response = requests.get(f"{self.base_url}/models", headers=headers, timeout=10)
            response.raise_for_status()
            result: dict[str, Any] = response.json()
            data: list[dict[str, Any]] = result.get("data", [])
            return [str(m.get("id", "")) for m in data if m.get("id")]
        except Exception:
            return []


class OllamaProvider(AIProvider):
    """Ollama本地模型提供商"""

    def __init__(self, base_url: str) -> None:
        self.base_url: str = base_url.rstrip('/')

    def chat(self, messages: list[dict[str, Any]], model: str, temperature: float = 0.7, **kwargs: Any) -> str:  # type: ignore[override]
        """Send chat request to Ollama API."""
        if not requests_available or requests is None:
            raise Exception("requests库未安装，请运行: pip install requests")

        data: dict[str, Any] = {
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
            result: dict[str, Any] = response.json()
            message: dict[str, Any] = result.get("message", {})
            content: str = message.get("content", "")
            return content
        except UnicodeEncodeError:
            raise Exception("配置错误：Base URL 中包含非法字符（如中文），请检查 AI 设置")
        except requests.exceptions.RequestException as e:
            raise Exception(f"Ollama调用失败: {str(e)}")

    def list_models(self) -> list[str]:
        """List available models from Ollama API."""
        if not requests_available or requests is None:
            return []
        try:
            response = requests.get(f"{self.base_url}/api/tags", timeout=5)
            response.raise_for_status()
            result: dict[str, Any] = response.json()
            models: list[dict[str, Any]] = result.get("models", [])
            return [str(m.get("name", "")) for m in models if m.get("name")]
        except Exception:
            return []


class ConfigProtocol(Protocol):
    """Protocol for config object passed to AIManager."""
    config_file: str

    def save_config(self) -> None: ...


class AIManager:
    """AI管理器 - 统一调用入口"""

    def __init__(self, config: ConfigProtocol) -> None:
        self.config: ConfigProtocol = config
        self.data_dir: str = self._get_data_dir()
        self.conversations_dir: str = os.path.join(self.data_dir, "conversations")
        self.uploads_dir: str = os.path.join(self.data_dir, "uploads")
        self.sessions_file: str = os.path.join(self.conversations_dir, "sessions.json")
        self.sessions: dict[str, SessionData] = {}
        self.active_session_id: str | None = None

        os.makedirs(self.conversations_dir, exist_ok=True)
        os.makedirs(self.uploads_dir, exist_ok=True)
        self._load_sessions()
        # 确保有活跃的会话
        active_id: str | None = self.active_session_id
        if active_id is None or active_id not in self.sessions:
            self.create_session(title="新对话", switch=True)

    @property
    def conversation_history(self) -> list[SessionMessage]:
        """保持与旧代码兼容：返回当前会话消息列表"""
        return self._get_active_session()["messages"]

    @conversation_history.setter
    def conversation_history(self, value: list[SessionMessage] | None) -> None:
        session = self._get_active_session()
        session["messages"] = list(value or [])
        session["updated_at"] = time.time()
        self._save_sessions()

    def _get_data_dir(self) -> str:
        if hasattr(self.config, "config_file") and self.config.config_file:
            return os.path.dirname(self.config.config_file)
        return os.path.join(os.getcwd(), "data")

    def _load_sessions(self) -> None:
        if not os.path.exists(self.sessions_file):
            return

        try:
            with open(self.sessions_file, "r", encoding="utf-8") as f:
                data: dict[str, Any] = json.load(f)
            self.active_session_id = data.get("active_session_id")
            loaded_sessions: list[dict[str, Any]] = data.get("sessions", [])
            for session in loaded_sessions:
                session_id: str | None = session.get("id")
                if not session_id:
                    continue
                self.sessions[session_id] = {
                    "id": session_id,
                    "title": session.get("title", "新对话"),
                    "messages": session.get("messages", []),
                    "created_at": session.get("created_at", time.time()),
                    "updated_at": session.get("updated_at", time.time()),
                }
        except Exception:
            # 会话文件损坏时降级为全新状态，避免阻塞应用启动
            self.sessions = {}
            self.active_session_id = None

    def _save_sessions(self) -> None:
        payload: dict[str, Any] = {
            "active_session_id": self.active_session_id,
            "sessions": list(self.sessions.values()),
        }
        temp_file: str = f"{self.sessions_file}.tmp"
        with open(temp_file, "w", encoding="utf-8") as f:
            json.dump(payload, f, ensure_ascii=False, indent=2)
        os.replace(temp_file, self.sessions_file)

    def _get_active_session(self) -> SessionData:
        if not self.active_session_id or self.active_session_id not in self.sessions:
            return self.create_session(title="新对话", switch=True)
        return self.sessions[self.active_session_id]

    def list_sessions(self) -> list[SessionSummary]:
        """列出会话摘要（按最近更新时间倒序）"""
        summaries: list[SessionSummary] = []
        for session in self.sessions.values():
            summaries.append({
                "id": session["id"],
                "title": session["title"],
                "created_at": session["created_at"],
                "updated_at": session["updated_at"],
                "message_count": len(session.get("messages", [])),
            })
        return sorted(summaries, key=lambda x: x["updated_at"], reverse=True)

    def create_session(self, title: str | None = None, switch: bool = True) -> SessionData:
        """创建新会话"""
        session_id: str = uuid.uuid4().hex[:12]
        now: float = time.time()
        session: SessionData = {
            "id": session_id,
            "title": title or time.strftime("新对话 %m-%d %H:%M"),
            "messages": [],
            "created_at": now,
            "updated_at": now,
        }
        self.sessions[session_id] = session
        if switch:
            self.active_session_id = session_id
        self._save_sessions()
        return session

    def switch_session(self, session_id: str) -> SessionData:
        """切换当前会话"""
        if session_id not in self.sessions:
            raise ValueError("会话不存在")
        self.active_session_id = session_id
        self.sessions[session_id]["updated_at"] = time.time()
        self._save_sessions()
        return self.sessions[session_id]

    def rename_session(self, session_id: str, title: str) -> None:
        """重命名会话"""
        if session_id not in self.sessions:
            raise ValueError("会话不存在")
        self.sessions[session_id]["title"] = title.strip() or "新对话"
        self.sessions[session_id]["updated_at"] = time.time()
        self._save_sessions()

    def delete_session(self, session_id: str) -> None:
        """删除会话"""
        if session_id not in self.sessions:
            raise ValueError("会话不存在")
        if len(self.sessions) <= 1:
            raise ValueError("至少保留一个会话")
        del self.sessions[session_id]
        if self.active_session_id == session_id:
            self.active_session_id = next(iter(self.sessions.keys()))
        self._save_sessions()

    def get_active_session_id(self) -> str | None:
        return self.active_session_id

    def get_active_session_title(self) -> str:
        return self._get_active_session()["title"]

    def _validate_attachments(self, attachments: list[str] | list[dict[str, str]] | None) -> list[str]:
        """验证附件列表"""
        if not attachments:
            return []

        if len(attachments) > MAX_ATTACHMENTS_PER_MESSAGE:
            raise ValueError(f"单次最多上传 {MAX_ATTACHMENTS_PER_MESSAGE} 个附件")

        normalized: list[str] = []
        for item in attachments:
            item_any: Any = item
            path: str | None = item_any.get("path") if hasattr(item_any, "get") else str(item_any)
            if not path:
                continue
            if not os.path.isfile(path):
                raise ValueError(f"文件不存在: {path}")

            ext: str = os.path.splitext(path)[1].lower()
            if ext not in IMAGE_EXTENSIONS and ext not in DOCUMENT_EXTENSIONS:
                raise ValueError(f"不支持的文件类型: {os.path.basename(path)}")

            size: int = os.path.getsize(path)
            if size > MAX_ATTACHMENT_SIZE:
                raise ValueError(f"文件超过大小限制(10MB): {os.path.basename(path)}")

            normalized.append(path)
        return normalized

    def _store_attachments(self, attachments: list[str] | list[dict[str, str]] | None) -> list[AttachmentMeta]:
        """存储附件到上传目录"""
        paths: list[str] = self._validate_attachments(attachments)
        if not paths:
            return []

        session_id: str | None = self.get_active_session_id()
        if session_id is None:
            session_id = self.create_session(title="新对话", switch=True)["id"]

        session_upload_dir: str = os.path.join(self.uploads_dir, session_id)
        os.makedirs(session_upload_dir, exist_ok=True)

        stored: list[AttachmentMeta] = []
        for path in paths:
            ext: str = os.path.splitext(path)[1].lower()
            file_id: str = uuid.uuid4().hex
            stored_name: str = f"{file_id}{ext}"
            dst: str = os.path.join(session_upload_dir, stored_name)
            shutil.copy2(path, dst)
            mime_type: str = mimetypes.guess_type(path)[0] or "application/octet-stream"
            attachment_type: AttachmentType = "image" if ext in IMAGE_EXTENSIONS else "document"
            stored.append({
                "id": file_id,
                "name": os.path.basename(path),
                "stored_name": stored_name,
                "path": os.path.relpath(dst, self.data_dir),
                "type": attachment_type,
                "mime_type": mime_type,
                "size": os.path.getsize(dst),
                "created_at": time.time(),
            })
        return stored

    def _safe_read_text_file(self, abs_path: str, max_chars: int = 6000) -> str:
        """安全读取文本文件"""
        try:
            with open(abs_path, "r", encoding="utf-8") as f:
                return f.read(max_chars)
        except Exception:
            return ""

    def _build_user_message_for_provider(self, provider_name: str, user_message: str, attachments_meta: list[AttachmentMeta]) -> dict[str, Any]:
        """构建包含附件的用户消息"""
        if not attachments_meta:
            return {"role": "user", "content": user_message}

        if provider_name == "openai":
            blocks: list[dict[str, Any]] = [{"type": "text", "text": user_message}]
            doc_chunks: list[str] = []
            unresolved_docs: list[str] = []

            for item in attachments_meta:
                abs_path: str = os.path.join(self.data_dir, item["path"])
                if item["type"] == "image":
                    try:
                        with open(abs_path, "rb") as f:
                            b64: str = base64.b64encode(f.read()).decode("ascii")
                        blocks.append({
                            "type": "image_url",
                            "image_url": {"url": f"data:{item['mime_type']};base64,{b64}"}
                        })
                    except Exception:
                        unresolved_docs.append(item["name"])
                else:
                    ext: str = os.path.splitext(item["name"])[1].lower()
                    if ext in {".txt", ".md"}:
                        snippet: str = self._safe_read_text_file(abs_path)
                        if snippet:
                            doc_chunks.append(f"[文件:{item['name']}]\n{snippet}")
                        else:
                            unresolved_docs.append(item["name"])
                    else:
                        unresolved_docs.append(item["name"])

            if doc_chunks:
                blocks.append({"type": "text", "text": "\n\n".join(doc_chunks)})
            if unresolved_docs:
                blocks.append({
                    "type": "text",
                    "text": "以下文件已上传但当前未做文本解析，请结合文件名理解上下文: " + ", ".join(unresolved_docs)
                })
            return {"role": "user", "content": blocks}

        # 非 OpenAI 兼容模型：降级为文本附加说明
        lines: list[str] = [user_message, "", "附件信息:"]
        for item in attachments_meta:
            item_abs_path: str = os.path.join(self.data_dir, item["path"])
            if item["type"] == "document" and os.path.splitext(item["name"])[1].lower() in {".txt", ".md"}:
                item_snippet: str = self._safe_read_text_file(item_abs_path)
                lines.append(f"- {item['name']} ({item['type']})")
                if item_snippet:
                    lines.append(f"  内容摘要: {item_snippet[:1200]}")
            else:
                lines.append(f"- {item['name']} ({item['type']})")
        return {"role": "user", "content": "\n".join(lines)}

    def _message_to_provider_format(self, provider_name: str, message: SessionMessage) -> dict[str, Any]:
        """转换消息为提供商格式"""
        role: str = message.get("role", "user")
        content: str = message.get("content", "")
        attachments: list[AttachmentMeta] = message.get("attachments", [])

        if role == "user" and attachments:
            return self._build_user_message_for_provider(provider_name, content, attachments)
        return {"role": role, "content": content}

    def get_provider(self) -> AIProvider:
        """获取当前提供商实例"""
        config_dict: dict[str, Any] = cast(dict[str, Any], self.config.config if hasattr(self.config, 'config') else self.config)
        provider_name: str = str(config_dict.get("current_provider", "openai"))
        providers: dict[str, Any] = config_dict.get("providers", {})
        provider_config: dict[str, Any] = providers.get(provider_name, {})

        if provider_name == "ollama":
            return OllamaProvider(str(provider_config.get("base_url", "http://localhost:11434")))
        else:
            return OpenAIProvider(
                str(provider_config.get("api_key", "")),
                str(provider_config.get("base_url", "https://api.openai.com/v1"))
            )

    def chat(self, user_message: str, system_prompt: str | None = None, attachments: list[str] | list[dict[str, str]] | None = None) -> str:
        """发送消息并获取回复（支持附件）"""
        config_dict: dict[str, Any] = cast(dict[str, Any], self.config.config if hasattr(self.config, 'config') else self.config)
        provider_name: str = str(config_dict.get("current_provider", "openai"))

        messages: list[dict[str, Any]] = []

        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})

        context_length: int = 10
        features: dict[str, Any] = config_dict.get("features", {})
        context_length = int(features.get("context_length", 10))

        if context_length > 0:
            history: list[SessionMessage] = self.conversation_history[-(context_length * 2):]
            for msg in history:
                messages.append(self._message_to_provider_format(provider_name, msg))

        attachments_meta: list[AttachmentMeta] = self._store_attachments(attachments)
        messages.append(self._build_user_message_for_provider(provider_name, user_message, attachments_meta))

        provider: AIProvider = self.get_provider()
        params: dict[str, Any] = config_dict.get("parameters", {})
        model: str = str(config_dict.get("current_model", "gpt-3.5-turbo"))

        response: str = provider.chat(messages, model=model, **params)

        active_session: SessionData = self._get_active_session()
        active_session["messages"].append({
            "role": "user",
            "content": user_message,
            "attachments": attachments_meta,
        })
        active_session["messages"].append({"role": "assistant", "content": response})
        active_session["updated_at"] = time.time()
        self._save_sessions()

        return response

    async def chat_stream(
        self,
        user_message: str,
        system_prompt: str | None = None,
        attachments: list[str] | list[dict[str, str]] | None = None,
    ) -> AsyncGenerator[StreamChunk, None]:
        """发送消息并获取流式回复（支持附件）
        
        Yields:
            StreamChunk: 流式输出块，包含类型和内容
        """
        if not requests_available or requests is None:
            yield {"type": "error", "data": "requests库未安装，请运行: pip install requests"}
            return

        config_dict: dict[str, Any] = cast(dict[str, Any], self.config.config if hasattr(self.config, 'config') else self.config)
        provider_name: str = str(config_dict.get("current_provider", "openai"))
        provider_config: dict[str, Any] = config_dict.get("providers", {}).get(provider_name, {})

        # 构建消息列表
        messages: list[dict[str, Any]] = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})

        context_length: int = int(config_dict.get("features", {}).get("context_length", 10))
        if context_length > 0:
            history: list[SessionMessage] = self.conversation_history[-(context_length * 2):]
            for msg in history:
                messages.append(self._message_to_provider_format(provider_name, msg))

        attachments_meta: list[AttachmentMeta] = self._store_attachments(attachments)
        messages.append(self._build_user_message_for_provider(provider_name, user_message, attachments_meta))

        params: dict[str, Any] = config_dict.get("parameters", {})
        model: str = str(config_dict.get("current_model", "gpt-3.5-turbo"))

        try:
            if provider_name == "ollama":
                async for chunk in self._chat_stream_ollama(messages, model, params, provider_config):
                    yield chunk
            else:
                async for chunk in self._chat_stream_openai(messages, model, params, provider_config):
                    yield chunk

            # 保存会话历史
            active_session: SessionData = self._get_active_session()
            # 注意：流式响应的内容需要由调用方在收集后添加到会话历史中
            active_session["messages"].append({
                "role": "user",
                "content": user_message,
                "attachments": attachments_meta,
            })
            active_session["updated_at"] = time.time()
            self._save_sessions()

            yield {"type": "done", "data": ""}

        except Exception as e:
            yield {"type": "error", "data": str(e)}

    async def _chat_stream_openai(
        self,
        messages: list[dict[str, Any]],
        model: str,
        params: dict[str, Any],
        provider_config: dict[str, Any],
    ) -> AsyncGenerator[StreamChunk, None]:
        """OpenAI 兼容 API 流式调用"""
        base_url: str = str(provider_config.get("base_url", "https://api.openai.com/v1")).rstrip('/')
        api_key: str = str(provider_config.get("api_key", ""))

        headers: dict[str, str] = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        data: dict[str, Any] = {
            "model": model,
            "messages": messages,
            "stream": True,
            "temperature": params.get("temperature", 0.7),
            "max_tokens": params.get("max_tokens", 2000),
        }
        if "top_p" in params:
            data["top_p"] = params["top_p"]
        if "presence_penalty" in params:
            data["presence_penalty"] = params["presence_penalty"]
        if "frequency_penalty" in params:
            data["frequency_penalty"] = params["frequency_penalty"]

        if requests is None:
            raise Exception("requests库未安装，请运行: pip install requests")
        response = requests.post(
            f"{base_url}/chat/completions",
            headers=headers,
            json=data,
            stream=True,
            timeout=120
        )
        response.raise_for_status()

        for line in response.iter_lines():
            if not line:
                continue

            line_str = line.decode('utf-8')
            if line_str.startswith('data: '):
                line_str = line_str[6:]
            
            if line_str == '[DONE]':
                break

            try:
                chunk: dict[str, Any] = json.loads(line_str)
                choices: list[dict[str, Any]] = chunk.get("choices", [])
                if not choices:
                    continue

                delta: dict[str, Any] = choices[0].get("delta", {})

                # 处理思维链内容 (如 DeepSeek R1)
                reasoning_content: str | None = delta.get("reasoning_content")
                if reasoning_content:
                    yield {"type": "reasoning", "data": reasoning_content}

                # 处理普通内容
                content: str | None = delta.get("content")
                if content:
                    yield {"type": "content", "data": content}

                # 处理工具调用
                tool_calls: list[dict[str, Any]] | None = delta.get("tool_calls")
                if tool_calls:
                    for tool_call in tool_calls:
                        yield {"type": "tool_start", "data": tool_call}

            except json.JSONDecodeError:
                continue
            except Exception:
                continue

    async def _chat_stream_ollama(
        self,
        messages: list[dict[str, Any]],
        model: str,
        params: dict[str, Any],
        provider_config: dict[str, Any],
    ) -> AsyncGenerator[StreamChunk, None]:
        """Ollama API 流式调用"""
        base_url: str = str(provider_config.get("base_url", "http://localhost:11434")).rstrip('/')

        data: dict[str, Any] = {
            "model": model,
            "messages": messages,
            "stream": True,
            "options": {
                "temperature": params.get("temperature", 0.7),
            }
        }

        if requests is None:
            raise Exception("requests库未安装，请运行: pip install requests")
        response = requests.post(
            f"{base_url}/api/chat",
            json=data,
            stream=True,
            timeout=120
        )
        response.raise_for_status()

        for line in response.iter_lines():
            if not line:
                continue

            try:
                chunk: dict[str, Any] = json.loads(line.decode('utf-8'))

                # 检查是否完成
                if chunk.get("done", False):
                    break

                message: dict[str, Any] = chunk.get("message", {})
                content: str = message.get("content", "")

                if content:
                    yield {"type": "content", "data": content}

                # Ollama 工具调用处理
                tool_calls: list[dict[str, Any]] | None = message.get("tool_calls")
                if tool_calls:
                    for tool_call in tool_calls:
                        yield {"type": "tool_start", "data": tool_call}

            except json.JSONDecodeError:
                continue
            except Exception:
                continue

    def clear_history(self) -> None:
        """兼容旧调用：清空动作改为创建并切换到新会话"""
        self.create_session(title="新对话", switch=True)

    def get_hint(self, question: str) -> str:
        """获取智能提示"""
        prompt: str = f"用户正在学习这个问题：\n{question}\n\n请给出一个不直接透露答案的提示，帮助用户思考。"
        return self.chat(prompt, system_prompt="你是一个学习助手，擅长给出启发性的提示而不是直接答案。")

    def explain_answer(self, question: str, answer: str) -> str:
        """解释答案"""
        prompt: str = f"题目：{question}\n答案：{answer}\n\n请用简单易懂的语言解释这个答案，帮助加深理解。"
        return self.chat(prompt, system_prompt="你是一个学习助手，擅长用通俗的语言解释复杂概念。")

    def generate_related(self, question: str, answer: str) -> str:
        """生成相关问题"""
        prompt: str = f"基于这个知识点：\n题目：{question}\n答案：{answer}\n\n请生成3个相关的问题，帮助巩固这个知识点。"
        return self.chat(prompt, system_prompt="你是一个学习助手，擅长设计相关的练习题。")

    def analyze_mistakes(self, cards_data: str) -> str:
        """分析错题"""
        prompt: str = f"用户最近答错的题目：\n{cards_data}\n\n请分析可能的薄弱环节，并给出学习建议。"
        return self.chat(prompt, system_prompt="你是一个学习分析师，擅长发现学习中的问题并给出建议。")
