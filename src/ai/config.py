import ipaddress
import json
import os
import re
from typing import TypedDict
from urllib.parse import urlparse

from papyrus.data.crypto import encrypt_api_key, decrypt_api_key


class ProviderConfig(TypedDict, total=False):
    api_key: str
    base_url: str
    models: list[str]


class ParametersConfig(TypedDict, total=False):
    temperature: float
    top_p: float
    max_tokens: int
    presence_penalty: float
    frequency_penalty: float


class FeaturesConfig(TypedDict):
    auto_hint: bool
    auto_explain: bool
    context_length: int
    agent_enabled: bool


class LogConfig(TypedDict):
    log_dir: str
    log_level: str
    max_log_files: int
    log_rotation: bool


class AIConfigData(TypedDict):
    providers: dict[str, ProviderConfig]
    current_provider: str
    current_model: str
    parameters: ParametersConfig
    features: FeaturesConfig
    log: LogConfig


class AIConfig:
    """AI配置管理器"""

    def __init__(self, data_dir: str) -> None:
        self.data_dir: str = data_dir
        self.config_file: str = os.path.join(data_dir, "ai_config.json")
        self.config: AIConfigData = self._build_default_config()
        self.load_config()

    def _build_default_config(self) -> AIConfigData:
        default_log_dir = os.path.join(self.data_dir, "logs")
        return {
            "providers": {
                "openai": {
                    "api_key": "",
                    "base_url": "https://api.openai.com/v1",
                    "models": ["gpt-4", "gpt-3.5-turbo", "gpt-4-turbo"],
                },
                "anthropic": {
                    "api_key": "",
                    "base_url": "https://api.anthropic.com/v1",
                    "models": ["claude-3-opus-20240229", "claude-3-sonnet-20240229"],
                },
                "ollama": {
                    "base_url": "http://localhost:11434",
                    "models": ["llama2", "mistral", "qwen"],
                },
                "moonshot": {
                    "api_key": "",
                    "base_url": "https://api.moonshot.cn/v1",
                    "models": ["kimi-k2.5"],
                },
                "custom": {
                    "api_key": "",
                    "base_url": "",
                    "models": [],
                },
            },
            "current_provider": "openai",
            "current_model": "gpt-3.5-turbo",
            "parameters": {
                "temperature": 0.7,
                "top_p": 0.9,
                "max_tokens": 2000,
                "presence_penalty": 0.0,
                "frequency_penalty": 0.0,
            },
            "features": {
                "auto_hint": False,
                "auto_explain": False,
                "context_length": 10,
                "agent_enabled": False,
            },
            "log": {
                "log_dir": default_log_dir,
                "log_level": "DEBUG",
                "max_log_files": 10,
                "log_rotation": False,
            },
        }

    def _to_float(self, value: object, default: float) -> float:
        if isinstance(value, (int, float)):
            return float(value)
        if isinstance(value, str):
            try:
                return float(value)
            except (TypeError, ValueError):
                pass
        return default

    def _to_int(self, value: object, default: int) -> int:
        if isinstance(value, int) and not isinstance(value, bool):
            return value
        if isinstance(value, float):
            return int(value)
        if isinstance(value, str):
            try:
                return int(value)
            except (TypeError, ValueError):
                pass
        return default

    def _to_str(self, value: object, default: str = "") -> str:
        if value is None:
            return default
        return str(value)

    def _to_str_list(self, value: object) -> list[str]:
        if not isinstance(value, list):
            return []
        result: list[str] = []
        for item in value:
            if item is not None:        
                item_obj: object = item
                result.append(str(item_obj))
        return result

    def _copy_provider_config(self, source: ProviderConfig) -> ProviderConfig:
        normalized: ProviderConfig = {}
        api_key: object = source.get("api_key")
        if api_key is not None:
            normalized["api_key"] = self._to_str(api_key)
        base_url: object = source.get("base_url")
        if base_url is not None:
            normalized["base_url"] = self._to_str(base_url)
        models: object = source.get("models")
        if models is not None:
            normalized["models"] = self._to_str_list(models)
        return normalized

    def _copy_parameters_config(self, source: ParametersConfig) -> ParametersConfig:
        temp: object = source.get("temperature")
        top_p: object = source.get("top_p")
        max_tokens: object = source.get("max_tokens")
        presence: object = source.get("presence_penalty")
        frequency: object = source.get("frequency_penalty")

        normalized: ParametersConfig = {
            "temperature": self._to_float(temp, 0.7),
            "top_p": self._to_float(top_p, 0.9),
            "max_tokens": self._to_int(max_tokens, 2000),
            "presence_penalty": self._to_float(presence, 0.0),
            "frequency_penalty": self._to_float(frequency, 0.0),
        }
        return normalized

    def _copy_features_config(self, source: FeaturesConfig) -> FeaturesConfig:
        raw_context: object = source.get("context_length", 10)
        context_length = self._to_int(raw_context, 10)

        auto_hint: object = source.get("auto_hint", False)
        auto_explain: object = source.get("auto_explain", False)
        agent_enabled: object = source.get("agent_enabled", False)

        return {
            "auto_hint": bool(auto_hint),
            "auto_explain": bool(auto_explain),
            "context_length": context_length,
            "agent_enabled": bool(agent_enabled),
        }

    def _copy_log_config(self, source: LogConfig) -> LogConfig:
        default_log_dir = os.path.join(self.data_dir, "logs")
        
        log_dir_obj = source.get("log_dir")
        log_dir: str = self._to_str(log_dir_obj, default_log_dir) if log_dir_obj else default_log_dir
        
        log_level_obj = source.get("log_level")
        log_level: str = self._to_str(log_level_obj, "DEBUG") if log_level_obj else "DEBUG"
        
        max_files_obj = source.get("max_log_files")
        max_log_files: int = self._to_int(max_files_obj, 10)
        
        rotation_obj = source.get("log_rotation")
        log_rotation: bool = bool(rotation_obj) if rotation_obj else False
        
        return {
            "log_dir": log_dir,
            "log_level": log_level,
            "max_log_files": max_log_files,
            "log_rotation": log_rotation,
        }

    def _normalize_provider_config(self, raw: object, fallback: ProviderConfig) -> ProviderConfig:
        normalized = self._copy_provider_config(fallback)
        if not isinstance(raw, dict):
            return normalized

        raw_dict: dict[str, object] = raw

        api_key: object = raw_dict.get("api_key")
        if api_key is not None:
            normalized["api_key"] = self._to_str(api_key)

        base_url: object = raw_dict.get("base_url")
        if base_url is not None:
            normalized["base_url"] = self._to_str(base_url)

        models: object = raw_dict.get("models")
        if isinstance(models, list):
            normalized["models"] = self._to_str_list(models)

        return normalized

    def _normalize_parameters_config(self, raw: object, fallback: ParametersConfig) -> ParametersConfig:
        normalized = self._copy_parameters_config(fallback)
        if not isinstance(raw, dict):
            return normalized

        raw_dict: dict[str, object] = raw

        temperature: object = raw_dict.get("temperature")
        if temperature is not None:
            normalized["temperature"] = self._to_float(temperature, normalized.get("temperature", 0.7))

        top_p: object = raw_dict.get("top_p")
        if top_p is not None:
            normalized["top_p"] = self._to_float(top_p, normalized.get("top_p", 0.9))

        max_tokens: object = raw_dict.get("max_tokens")
        if max_tokens is not None:
            normalized["max_tokens"] = self._to_int(max_tokens, normalized.get("max_tokens", 2000))

        presence_penalty: object = raw_dict.get("presence_penalty")
        if presence_penalty is not None:
            normalized["presence_penalty"] = self._to_float(presence_penalty, normalized.get("presence_penalty", 0.0))

        frequency_penalty: object = raw_dict.get("frequency_penalty")
        if frequency_penalty is not None:
            normalized["frequency_penalty"] = self._to_float(frequency_penalty, normalized.get("frequency_penalty", 0.0))

        return normalized

    def _normalize_features_config(self, raw: object, fallback: FeaturesConfig) -> FeaturesConfig:
        if not isinstance(raw, dict):
            return self._copy_features_config(fallback)

        raw_dict: dict[str, object] = raw

        context_length_raw: object = raw_dict.get("context_length", fallback["context_length"])
        context_length = self._to_int(context_length_raw, fallback["context_length"])

        auto_hint: object = raw_dict.get("auto_hint", fallback["auto_hint"])
        auto_explain: object = raw_dict.get("auto_explain", fallback["auto_explain"])
        agent_enabled: object = raw_dict.get("agent_enabled", fallback.get("agent_enabled", False))

        return {
            "auto_hint": bool(auto_hint),
            "auto_explain": bool(auto_explain),
            "context_length": context_length,
            "agent_enabled": bool(agent_enabled),
        }

    def _normalize_log_config(self, raw: object, fallback: LogConfig) -> LogConfig:
        if not isinstance(raw, dict):
            return self._copy_log_config(fallback)

        raw_dict: dict[str, object] = raw
        default_log_dir = os.path.join(self.data_dir, "logs")

        log_dir_obj: object = raw_dict.get("log_dir")
        log_dir = self._to_str(log_dir_obj, fallback.get("log_dir", default_log_dir)) if log_dir_obj is not None else fallback.get("log_dir", default_log_dir)

        log_level_obj: object = raw_dict.get("log_level")
        log_level = self._to_str(log_level_obj, fallback.get("log_level", "DEBUG")) if log_level_obj is not None else fallback.get("log_level", "DEBUG")

        max_files_obj: object = raw_dict.get("max_log_files")
        max_log_files = self._to_int(max_files_obj, fallback.get("max_log_files", 10))

        rotation_obj: object = raw_dict.get("log_rotation")
        log_rotation = bool(rotation_obj) if rotation_obj is not None else fallback.get("log_rotation", False)

        return {
            "log_dir": log_dir,
            "log_level": log_level,
            "max_log_files": max_log_files,
            "log_rotation": log_rotation,
        }

    def load_config(self) -> None:
        default = self._build_default_config()

        if not os.path.exists(self.config_file):
            self.config = default
            self.save_config()
            return

        try:
            with open(self.config_file, "r", encoding="utf-8") as f:
                loaded: object = json.load(f)
            if not isinstance(loaded, dict):
                loaded = {}

            loaded_dict: dict[str, object] = loaded

            providers_raw_obj: object = loaded_dict.get("providers")
            providers_raw: dict[str, object] = providers_raw_obj if isinstance(providers_raw_obj, dict) else {}
            normalized_providers: dict[str, ProviderConfig] = {}
            for provider_name, provider_config in default["providers"].items():
                raw_provider_obj: object = providers_raw.get(provider_name)
                raw_provider: object = raw_provider_obj if raw_provider_obj is not None else None
                normalized_providers[provider_name] = self._normalize_provider_config(raw_provider, provider_config)

            current_provider_obj: object = loaded_dict.get("current_provider", default["current_provider"])
            current_provider: str = self._to_str(current_provider_obj, default["current_provider"])
            if current_provider not in normalized_providers:
                current_provider = default["current_provider"]

            current_model_obj: object = loaded_dict.get("current_model", default["current_model"])
            current_model: str = self._to_str(current_model_obj, default["current_model"])
            provider_cfg: ProviderConfig = normalized_providers[current_provider]
            provider_models_obj: object = provider_cfg.get("models", [])
            provider_models: list[str] = provider_models_obj if isinstance(provider_models_obj, list) else []
            if provider_models and current_model not in provider_models:
                current_model = provider_models[0]

            self.config = {
                "providers": normalized_providers,
                "current_provider": current_provider,
                "current_model": current_model,
                "parameters": self._normalize_parameters_config(
                    loaded_dict.get("parameters"), default["parameters"]
                ),
                "features": self._normalize_features_config(
                    loaded_dict.get("features"), default["features"]
                ),
                "log": self._normalize_log_config(
                    loaded_dict.get("log"), default["log"]
                ),
            }
            # Decrypt API keys after loading
            self._decrypt_provider_keys()
        except Exception:
            self.config = default

    def validate_config(self) -> None:
        """验证配置是否包含非法字符，并阻止 SSRF"""
        errors: list[str] = []
        # Providers that are expected to run locally
        local_providers = {
            "ollama",
            "lm-studio",
            "localai",
            "tabbyapi",
            "koboldcpp",
            "text-generation-webui",
            "llamacpp",
        }

        for provider_name, provider_config in self.config["providers"].items():
            api_key: str = provider_config.get("api_key", "")
            if api_key and not self._is_valid_ascii(api_key):
                errors.append(f"{provider_name.upper()} 的 API Key 中包含非法字符（如中文或特殊空格）")

            base_url: str = provider_config.get("base_url", "")
            if base_url and not self._is_valid_url(base_url):
                errors.append(f"{provider_name.upper()} 的 Base URL 中包含非法字符")
            # SECURITY: block private IPs / localhost to prevent SSRF for cloud providers
            if base_url and self._is_private_url(base_url):
                is_local = provider_name in local_providers
                is_custom = provider_name == "custom"
                if not is_local and not is_custom:
                    errors.append(f"{provider_name.upper()} 的 Base URL 指向私有地址，存在 SSRF 风险。请使用公网 API 地址，或将 provider 名称改为已知的本地模型标识")

        if errors:
            raise ValueError("\n".join(errors))

    def _is_valid_ascii(self, text: str) -> bool:
        """检查文本是否只包含 ASCII 字符"""
        try:
            text.encode("ascii")
            return True
        except UnicodeEncodeError:
            return False

    def _is_valid_url(self, url: str) -> bool:
        """检查 URL 是否有效（只包含 ASCII 字符）"""
        if not url:
            return True
        return self._is_valid_ascii(url)

    def _is_private_url(self, url: str) -> bool:
        """检查 URL 是否指向私有/内网地址，防止 SSRF"""
        if not url:
            return False
        try:
            parsed = urlparse(url)
            hostname = parsed.hostname
            if not hostname:
                return False
            # 拒绝常见内网主机名
            lower_host = hostname.lower()
            if lower_host in {"localhost", "127.0.0.1", "0.0.0.0", "::1"}:
                return True
            # 拒绝链路本地和私有 IP
            try:
                ip = ipaddress.ip_address(hostname)
                if ip.is_private or ip.is_loopback or ip.is_link_local or ip.is_reserved:
                    return True
            except ValueError:
                pass
            # 拒绝内网常见域名模式
            if re.search(r"^(127\.|10\.|172\.(1[6-9]|2[0-9]|3[01])\.|192\.168\.|169\.254\.|0\.|::1$)", hostname):
                return True
        except Exception:
            pass
        return False

    def save_config(self) -> None:
        self.validate_config()
        dirname: str = os.path.dirname(self.config_file)
        if dirname:
            os.makedirs(dirname, exist_ok=True)
        # SECURITY: encrypt API keys before saving
        config_to_save = self._config_with_encrypted_keys()
        with open(self.config_file, "w", encoding="utf-8") as f:
            json.dump(config_to_save, f, ensure_ascii=False, indent=2)

    def _config_with_encrypted_keys(self) -> AIConfigData:
        """Return a copy of config with API keys encrypted."""
        import copy
        cfg = copy.deepcopy(self.config)
        for provider in cfg.get("providers", {}).values():
            key = provider.get("api_key", "")
            if key:
                provider["api_key"] = encrypt_api_key(key)
        return cfg

    def _decrypt_provider_keys(self) -> None:
        """Decrypt API keys after loading from file."""
        for provider in self.config.get("providers", {}).values():
            key = provider.get("api_key", "")
            if key and (key.startswith("enc:") or key.startswith("plain:")):
                decrypted = decrypt_api_key(key)
                provider["api_key"] = decrypted

    def get_masked_config(self) -> AIConfigData:
        """Return config with API keys masked for API responses."""
        import copy
        cfg = copy.deepcopy(self.config)
        for provider in cfg.get("providers", {}).values():
            key = provider.get("api_key", "")
            if key:
                # Mask all but last 4 characters
                if len(key) > 4:
                    provider["api_key"] = "*" * (len(key) - 4) + key[-4:]
                else:
                    provider["api_key"] = "****"
        return cfg

    def get_provider_config(self) -> ProviderConfig:
        provider_name: str = self.config["current_provider"]
        provider_config: ProviderConfig | None = self.config["providers"].get(provider_name)
        if provider_config is None:
            raise KeyError(f"未知 provider: {provider_name}")
        return provider_config

    def get_current_model(self) -> str:
        return self.config["current_model"]

    def get_parameters(self) -> ParametersConfig:
        return self.config["parameters"]

    def get_log_config(self) -> LogConfig:
        """获取日志配置。"""
        return self.config["log"]

    def set_log_config(self, config: LogConfig) -> None:
        """设置日志配置并保存。"""
        self.config["log"] = self._normalize_log_config(config, self._build_default_config()["log"])
        self.save_config()
