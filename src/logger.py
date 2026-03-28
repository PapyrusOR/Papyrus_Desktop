import json
import logging
import os
from collections.abc import Mapping, Sequence
from datetime import datetime
from logging.handlers import RotatingFileHandler
from typing import TypeAlias, TypedDict

JSONScalar: TypeAlias = str | int | float | bool | None
JSONValue: TypeAlias = JSONScalar | dict[str, "JSONValue"] | list["JSONValue"]

# 日志级别映射
LOG_LEVEL_MAP: dict[str, int] = {
    "DEBUG": logging.DEBUG,
    "INFO": logging.INFO,
    "WARNING": logging.WARNING,
    "ERROR": logging.ERROR,
}


class EventLogEntry(TypedDict):
    timestamp: str
    event: str
    level: str
    data: JSONValue


class ActivityLogEntry(TypedDict):
    timestamp: str
    type: str
    details: JSONValue


class LogConfig(TypedDict, total=False):
    log_dir: str
    log_level: str
    max_log_files: int
    log_rotation: bool


class PapyrusLogger:
    """Papyrus日志管理器"""

    def __init__(
        self,
        log_dir: str,
        log_level: str = "DEBUG",
        max_log_files: int = 10,
        log_rotation: bool = False,
    ) -> None:
        self._log_dir = log_dir
        self._log_level = log_level
        self._max_log_files = max_log_files
        self._log_rotation = log_rotation
        
        os.makedirs(log_dir, exist_ok=True)

        # 日志文件路径
        self.log_file = os.path.join(log_dir, "papyrus.log")
        self.error_log_file = os.path.join(log_dir, "error.log")
        self.activity_log_file = os.path.join(log_dir, "activity.log")
        # 结构化事件日志（JSONL）：用于监控 AI 工具调用 / MCP 请求等
        self.events_log_file = os.path.join(log_dir, "events.log")

        # 配置主日志记录器
        self.logger = logging.getLogger("Papyrus")
        self._setup_handlers()
        
        # 执行日志清理
        self._cleanup_old_logs()

    def _setup_handlers(self) -> None:
        """设置日志处理器。"""
        # 清除已有的处理器
        self.logger.handlers.clear()
        
        # 设置日志级别
        level = LOG_LEVEL_MAP.get(self._log_level.upper(), logging.DEBUG)
        self.logger.setLevel(level)

        # 文件处理器 - 所有日志
        if self._log_rotation:
            file_handler: logging.Handler = RotatingFileHandler(
                self.log_file, 
                encoding="utf-8",
                maxBytes=10 * 1024 * 1024,  # 10MB
                backupCount=self._max_log_files,
            )
        else:
            file_handler = logging.FileHandler(self.log_file, encoding="utf-8")
        file_handler.setLevel(level)
        file_formatter = logging.Formatter(
            "%(asctime)s - %(levelname)s - %(message)s",
            datefmt="%Y-%m-%d %H:%M:%S",
        )
        file_handler.setFormatter(file_formatter)
        self.logger.addHandler(file_handler)

        # 错误日志处理器
        if self._log_rotation:
            error_handler: logging.Handler = RotatingFileHandler(
                self.error_log_file, 
                encoding="utf-8",
                maxBytes=10 * 1024 * 1024,  # 10MB
                backupCount=self._max_log_files,
            )
        else:
            error_handler = logging.FileHandler(self.error_log_file, encoding="utf-8")
        error_handler.setLevel(logging.ERROR)
        error_handler.setFormatter(file_formatter)
        self.logger.addHandler(error_handler)

        # 控制台处理器
        console_handler = logging.StreamHandler()
        console_handler.setLevel(max(level, logging.INFO))  # 控制台至少显示INFO
        console_handler.setFormatter(file_formatter)
        self.logger.addHandler(console_handler)

    def _cleanup_old_logs(self) -> None:
        """清理旧的日志文件，保留最近的 max_log_files 个。"""
        if self._max_log_files <= 0:
            return
            
        try:
            # 获取所有日志文件（不包括当前正在使用的）
            log_files = []
            for filename in os.listdir(self._log_dir):
                if filename.endswith(".log") and not filename.startswith("papyrus.log"):
                    filepath = os.path.join(self._log_dir, filename)
                    if os.path.isfile(filepath):
                        log_files.append((filepath, os.path.getmtime(filepath)))
            
            # 按修改时间排序
            log_files.sort(key=lambda x: float(x[1]), reverse=True)  # type: ignore[misc,arg-type]
            
            # 删除旧文件
            for filepath, _ in log_files[self._max_log_files:]:
                try:
                    os.remove(filepath)
                except OSError:
                    pass
        except OSError:
            pass

    def set_log_dir(self, log_dir: str) -> bool:
        """动态更改日志目录。
        
        Args:
            log_dir: 新的日志目录路径
            
        Returns:
            是否成功更改
        """
        old_log_dir = self._log_dir
        try:
            # 确保新目录存在
            os.makedirs(log_dir, exist_ok=True)
            
            # 更新日志目录
            self._log_dir = log_dir
            
            # 更新日志文件路径
            self.log_file = os.path.join(log_dir, "papyrus.log")
            self.error_log_file = os.path.join(log_dir, "error.log")
            self.activity_log_file = os.path.join(log_dir, "activity.log")
            self.events_log_file = os.path.join(log_dir, "events.log")
            
            # 重新设置处理器
            self._setup_handlers()
            
            self.info(f"日志目录已更改为: {log_dir}")
            return True
        except Exception as e:
            # 恢复原来的目录
            self._log_dir = old_log_dir
            self.error(f"更改日志目录失败: {e}")
            return False

    def set_log_level(self, level: str) -> bool:
        """设置日志级别。
        
        Args:
            level: 日志级别 (DEBUG/INFO/WARNING/ERROR)
            
        Returns:
            是否成功设置
        """
        if level.upper() not in LOG_LEVEL_MAP:
            self.error(f"无效的日志级别: {level}")
            return False
            
        try:
            self._log_level = level.upper()
            self._setup_handlers()
            self.info(f"日志级别已设置为: {level}")
            return True
        except Exception as e:
            self.error(f"设置日志级别失败: {e}")
            return False

    def set_log_rotation(self, enabled: bool) -> bool:
        """设置是否启用日志轮转。
        
        Args:
            enabled: 是否启用
            
        Returns:
            是否成功设置
        """
        try:
            self._log_rotation = enabled
            self._setup_handlers()
            self.info(f"日志轮转已{'启用' if enabled else '禁用'}")
            return True
        except Exception as e:
            self.error(f"设置日志轮转失败: {e}")
            return False

    def set_max_log_files(self, count: int) -> bool:
        """设置保留日志文件数量。
        
        Args:
            count: 保留的文件数量
            
        Returns:
            是否成功设置
        """
        try:
            self._max_log_files = max(1, count)
            self._setup_handlers()
            self._cleanup_old_logs()
            self.info(f"最大日志文件数已设置为: {self._max_log_files}")
            return True
        except Exception as e:
            self.error(f"设置最大日志文件数失败: {e}")
            return False

    def get_config(self) -> LogConfig:
        """获取当前日志配置。"""
        return {
            "log_dir": self._log_dir,
            "log_level": self._log_level,
            "max_log_files": self._max_log_files,
            "log_rotation": self._log_rotation,
        }

    def info(self, message: str) -> None:
        """记录信息日志"""
        self.logger.info(message)

    def error(self, message: str) -> None:
        """记录错误日志"""
        self.logger.error(message)

    def warning(self, message: str) -> None:
        """记录警告日志"""
        self.logger.warning(message)

    def debug(self, message: str) -> None:
        """记录调试日志"""
        self.logger.debug(message)

    def _sanitize(self, obj: object, max_str_len: int = 800) -> JSONValue:
        """尽量安全地写入日志。

        - 对可能的密钥字段做脱敏
        - 对超长字符串做截断
        """

        def _mask_value(v: object) -> JSONValue:
            if not isinstance(v, str):
                return self._sanitize(v, max_str_len=max_str_len)
            if len(v) <= 8:
                return "***"
            return v[:3] + "***" + v[-2:]

        def _truncate_str(s: str) -> str:
            if len(s) <= max_str_len:
                return s
            return s[:max_str_len] + f"...<truncated:{len(s)}chars>"

        if obj is None:
            return None

        if isinstance(obj, str):
            return _truncate_str(obj)

        if isinstance(obj, (int, float, bool)):
            return obj

        if isinstance(obj, Sequence) and not isinstance(obj, (str, bytes, bytearray)):
            return [self._sanitize(x, max_str_len=max_str_len) for x in obj]

        if isinstance(obj, Mapping):
            masked: dict[str, JSONValue] = {}
            for k, v in obj.items():
                key = str(k)
                key_lower = key.lower()
                if any(
                    token in key_lower
                    for token in ["api_key", "authorization", "token", "secret", "password", "key"]
                ):
                    masked[key] = _mask_value(v)
                else:
                    masked[key] = self._sanitize(v, max_str_len=max_str_len)
            return masked

        # fallback：转字符串
        return _truncate_str(str(obj))

    def _sanitize_payload(self, payload: object) -> JSONValue:
        if payload is None:
            return {}
        return self._sanitize(payload)

    def _write_json_line(self, filepath: str, payload: EventLogEntry | ActivityLogEntry) -> None:
        with open(filepath, "a", encoding="utf-8") as f:
            f.write(json.dumps(payload, ensure_ascii=False) + "\n")

    def log_event(self, event_type: str, data: object = None, level: str = "INFO") -> None:
        """记录结构化事件（JSONL），用于监控 AI 工具调用 / MCP 服务器等。"""
        event: EventLogEntry = {
            "timestamp": datetime.now().isoformat(),
            "event": event_type,
            "level": level,
            "data": self._sanitize_payload(data),
        }

        try:
            self._write_json_line(self.events_log_file, event)
        except Exception as e:
            self.error(f"记录事件失败: {e}")

    def log_activity(self, activity_type: str, details: object) -> None:
        """记录用户活动。"""
        activity: ActivityLogEntry = {
            "timestamp": datetime.now().isoformat(),
            "type": activity_type,
            "details": self._sanitize_payload(details),
        }

        try:
            self._write_json_line(self.activity_log_file, activity)
        except Exception as e:
            self.error(f"记录活动失败: {e}")

    def get_logs(self, log_type: str = "all", limit: int | None = 100) -> list[str]:
        """获取日志内容。"""
        log_file_map: dict[str, str] = {
            "all": self.log_file,
            "error": self.error_log_file,
            "activity": self.activity_log_file,
            "events": self.events_log_file,
        }

        log_file = log_file_map.get(log_type, self.log_file)

        if not os.path.exists(log_file):
            return []

        try:
            with open(log_file, "r", encoding="utf-8") as f:
                lines = f.readlines()
                return lines[-limit:] if limit else lines
        except Exception as e:
            self.error(f"读取日志失败: {e}")
            return []

    def clear_logs(self) -> None:
        """清空日志文件。"""
        for log_file in [
            self.log_file,
            self.error_log_file,
            self.activity_log_file,
            self.events_log_file,
        ]:
            if os.path.exists(log_file):
                try:
                    open(log_file, "w", encoding="utf-8").close()
                    self.info("日志已清空")
                except Exception as e:
                    self.error(f"清空日志失败: {e}")

    def export_logs(self, export_path: str) -> str | None:
        """导出日志到指定路径。"""
        try:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            export_file = os.path.join(export_path, f"papyrus_logs_{timestamp}.txt")
            os.makedirs(export_path, exist_ok=True)

            with open(export_file, "w", encoding="utf-8") as out:
                out.write("=" * 50 + "\n")
                out.write("Papyrus 日志导出\n")
                out.write(f"导出时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
                out.write("=" * 50 + "\n\n")

                # 导出主日志
                out.write("【主日志】\n")
                out.write("-" * 50 + "\n")
                logs = self.get_logs("all", limit=None)
                out.writelines(logs)
                out.write("\n\n")

                # 导出错误日志
                out.write("【错误日志】\n")
                out.write("-" * 50 + "\n")
                error_logs = self.get_logs("error", limit=None)
                out.writelines(error_logs)
                out.write("\n\n")

                # 导出活动日志
                out.write("【活动日志】\n")
                out.write("-" * 50 + "\n")
                activity_logs = self.get_logs("activity", limit=None)
                out.writelines(activity_logs)
                out.write("\n\n")

                # 导出事件日志
                out.write("【事件日志】\n")
                out.write("-" * 50 + "\n")
                events_logs = self.get_logs("events", limit=None)
                out.writelines(events_logs)

            return export_file
        except Exception as e:
            self.error(f"导出日志失败: {e}")
            return None

    def open_log_dir(self) -> str:
        """打开日志文件夹，返回路径。"""
        try:
            import platform
            import subprocess
            
            system = platform.system()
            if system == "Windows":
                subprocess.run(["explorer", self._log_dir], check=False)
            elif system == "Darwin":  # macOS
                subprocess.run(["open", self._log_dir], check=False)
            else:  # Linux
                subprocess.run(["xdg-open", self._log_dir], check=False)
            return self._log_dir
        except Exception as e:
            self.error(f"打开日志文件夹失败: {e}")
            return self._log_dir
