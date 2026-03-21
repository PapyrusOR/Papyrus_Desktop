"""AI侧边栏 - 重新设计"""

from __future__ import annotations

import tkinter as tk
from tkinter import messagebox, filedialog, simpledialog
import threading
import json
import os
import re
from functools import partial
from typing import Any, Callable, Protocol, TypedDict, runtime_checkable


try:
    from tkinter import ttk
except ImportError:
    import tkinter.ttk as ttk


# Type definitions
class AttachmentMeta(TypedDict):
    id: str
    name: str
    stored_name: str
    path: str
    type: str
    mime_type: str
    size: int
    created_at: float


class SessionMessage(TypedDict, total=False):
    role: str
    content: str
    attachments: list[AttachmentMeta]


class SessionSummary(TypedDict):
    id: str
    title: str
    created_at: float
    updated_at: float
    message_count: int


class CurrentCard(TypedDict):
    q: str
    a: str


class ToolCall(TypedDict):
    tool: str
    params: dict[str, Any]


@runtime_checkable
class ConfigProtocol(Protocol):
    """Protocol for AI config."""
    config: dict[str, Any]

    def save_config(self) -> None: ...


@runtime_checkable
class AIManagerProtocol(Protocol):
    """Protocol for AI manager."""
    config: ConfigProtocol
    conversation_history: list[SessionMessage]

    def list_sessions(self) -> list[SessionSummary]: ...
    def get_active_session_id(self) -> str | None: ...
    def get_active_session_title(self) -> str: ...
    def switch_session(self, session_id: str) -> Any: ...
    def create_session(self, title: str | None = None, switch: bool = True) -> Any: ...
    def rename_session(self, session_id: str, title: str) -> None: ...
    def chat(self, user_message: str, system_prompt: str | None = None, attachments: list[str] | None = None) -> str: ...


@runtime_checkable
class CardToolsProtocol(Protocol):
    """Protocol for card tools."""
    def get_tools_definition(self) -> str: ...
    def parse_tool_call(self, ai_response: str) -> ToolCall | None: ...
    def execute_tool(self, tool_name: str, params: dict[str, Any]) -> dict[str, Any]: ...


@runtime_checkable
class LoggerProtocol(Protocol):
    """Protocol for logger."""
    def log_event(self, event_type: str, data: Any = None, level: str = "INFO") -> None: ...


GetCurrentCardCallback = Callable[[], CurrentCard | None]


class AISidebar:
    """AI侧边栏"""

    def __init__(
        self,
        parent: tk.Widget,
        ai_manager: AIManagerProtocol,
        get_current_card_callback: GetCurrentCardCallback,
        card_tools: CardToolsProtocol | None = None,
        logger: LoggerProtocol | None = None
    ) -> None:
        self.parent: tk.Widget = parent
        self.ai_manager: AIManagerProtocol = ai_manager
        self.get_current_card: GetCurrentCardCallback = get_current_card_callback
        self.card_tools: CardToolsProtocol | None = card_tools
        self.logger: LoggerProtocol | None = logger
        self.is_processing: bool = False
        self.agent_mode: tk.BooleanVar = tk.BooleanVar(value=True)
        self.pending_attachments: list[str] = []
        self.session_label_to_id: dict[str, str] = {}

        # 创建侧边栏容器
        self.sidebar: tk.Frame = tk.Frame(parent, bg="#ffffff")
        self.sidebar.pack(side="right", fill="both", expand=True)
        self.create_widgets()

    def create_widgets(self) -> None:
        """创建所有组件"""
        # 1. 顶部标题栏
        self.create_header()
        # 2. 底部输入区（先pack，确保占位）
        self.create_input_area()
        # 3. 对话显示区（填充剩余空间）
        self.create_chat_area()

    def create_header(self) -> None:
        """创建顶部栏"""
        header: tk.Frame = tk.Frame(self.sidebar, bg="#ffffff")
        header.pack(side="top", fill="x", padx=15, pady=10)

        # 标题
        tk.Label(header, text="AI 助手",
                font=("微软雅黑", 13, "bold"),
                bg="#ffffff", fg="#333333").pack(side="left")

        # 按钮
        btn_frame: tk.Frame = tk.Frame(header, bg="#ffffff")
        btn_frame.pack(side="right")

        tk.Button(btn_frame, text="＋", command=self.new_chat,
                 bg="#f0f0f0", fg="#666666", font=("微软雅黑", 10),
                 relief="flat", width=3).pack(side="left", padx=2)

        tk.Button(btn_frame, text="✎", command=self.rename_current_chat,
             bg="#f0f0f0", fg="#666666", font=("微软雅黑", 10),
             relief="flat", width=3).pack(side="left", padx=2)

        tk.Button(btn_frame, text="⚙", command=self.open_settings,
                 bg="#f0f0f0", fg="#666666", font=("微软雅黑", 10),
                 relief="flat", width=3).pack(side="left", padx=2)

        # 分隔线
        tk.Frame(self.sidebar, bg="#e0e0e0", height=1).pack(side="top", fill="x")

        # 状态栏
        status_bar: tk.Frame = tk.Frame(self.sidebar, bg="#f8f8f8")
        status_bar.pack(side="top", fill="x", padx=15, pady=8)

        config_dict: dict[str, Any] = self.ai_manager.config.config
        current_model: str = str(config_dict.get("current_model", "gpt-3.5-turbo"))
        self.model_label: tk.Label = tk.Label(status_bar,
                                    text=current_model,
                                    font=("微软雅黑", 9),
                                    bg="#f8f8f8", fg="#888888")
        self.model_label.pack(side="left")

        self.session_var: tk.StringVar = tk.StringVar(value="")
        self.session_menu: tk.OptionMenu = tk.OptionMenu(status_bar, self.session_var, "")
        self.session_menu.config(font=("微软雅黑", 8), bg="#ffffff", relief="flat", highlightthickness=0)
        self.session_menu.pack(side="left", padx=(8, 0))

        self.refresh_session_menu(select_active=True)

        self.status_label: tk.Label = tk.Label(status_bar, text="● 就绪",
                                     font=("微软雅黑", 9),
                                     bg="#f8f8f8", fg="#28a745")
        self.status_label.pack(side="right")

        # 分隔线
        tk.Frame(self.sidebar, bg="#e0e0e0", height=1).pack(side="top", fill="x")

    def create_chat_area(self) -> None:
        """创建对话区"""
        chat_frame: tk.Frame = tk.Frame(self.sidebar, bg="#ffffff")
        chat_frame.pack(side="top", fill="both", expand=True)

        # 滚动条
        scrollbar: tk.Scrollbar = tk.Scrollbar(chat_frame)
        scrollbar.pack(side="right", fill="y")

        # 对话显示
        self.chat_display: tk.Text = tk.Text(chat_frame,
                                    wrap="word",
                                    font=("微软雅黑", 10),
                                    bg="#ffffff",
                                    fg="#333333",
                                    relief="flat",
                                    padx=15,
                                    pady=15,
                                    state="disabled",
                                    yscrollcommand=scrollbar.set)
        self.chat_display.pack(side="left", fill="both", expand=True)
        scrollbar.config(command=self.chat_display.yview)

        # 配置样式
        self.chat_display.tag_configure("user_label",
                                       foreground="#1976d2",
                                       font=("微软雅黑", 9, "bold"))
        self.chat_display.tag_configure("user_bubble",
                                       background="#e3f2fd",
                                       foreground="#1565c0",
                                       font=("微软雅黑", 10),
                                       lmargin1=10, lmargin2=10, rmargin=10,
                                       spacing1=3, spacing3=8)
        self.chat_display.tag_configure("assistant_label",
                                       foreground="#666666",
                                       font=("微软雅黑", 9, "bold"))
        self.chat_display.tag_configure("assistant_bubble",
                                       background="#f5f5f5",
                                       foreground="#333333",
                                       font=("微软雅黑", 10),
                                       lmargin1=10, lmargin2=10, rmargin=10,
                                       spacing1=3, spacing3=8)
        self.chat_display.tag_configure("system",
                                       foreground="#999999",
                                       font=("微软雅黑", 9, "italic"))

    def create_input_area(self) -> None:
        """创建输入区"""
        bottom_panel: tk.Frame = tk.Frame(self.sidebar, bg="#f8f8f8")
        bottom_panel.pack(side="bottom", fill="x")

        tk.Frame(bottom_panel, bg="#e0e0e0", height=1).pack(side="top", fill="x")

        # 第一行：模式选择
        mode_row: tk.Frame = tk.Frame(bottom_panel, bg="#f8f8f8")
        mode_row.pack(side="top", fill="x", padx=15, pady=(3, 0))

        tk.Label(mode_row,
                text="模式",
                font=("微软雅黑", 9),
                bg="#f8f8f8", fg="#666666").pack(side="left", padx=(0, 8))

        self.agent_btn: tk.Label = tk.Label(mode_row,
                                   text="Agent",
                                   bg="#1976d2",
                                   fg="#ffffff",
                                   font=("微软雅黑", 9),
                                   padx=10,
                                   pady=2,
                                   cursor="hand2")
        self.agent_btn.pack(side="left", padx=(0, 5))
        self.agent_btn.bind("<Button-1>", lambda e: self.set_mode(True))

        self.chat_btn: tk.Label = tk.Label(mode_row,
                                 text="Chat",
                                 bg="#e0e0e0",
                                 fg="#666666",
                                 font=("微软雅黑", 9),
                                 padx=10,
                                 pady=2,
                                 cursor="hand2")
        self.chat_btn.pack(side="left")
        self.chat_btn.bind("<Button-1>", lambda e: self.set_mode(False))

        # 第二行：模型选择
        model_row: tk.Frame = tk.Frame(bottom_panel, bg="#f8f8f8")
        model_row.pack(side="top", fill="x", padx=15, pady=(1, 1))

        config_dict: dict[str, Any] = self.ai_manager.config.config
        provider: str = str(config_dict.get("current_provider", "openai"))
        providers: dict[str, Any] = config_dict.get("providers", {})
        provider_config: dict[str, Any] = providers.get(provider, {})
        models: list[str] = provider_config.get("models", ["gpt-3.5-turbo"])
        current_model: str = str(config_dict.get("current_model", "gpt-3.5-turbo"))

        tk.Label(model_row,
                text="模型",
                font=("微软雅黑", 9),
                bg="#f8f8f8", fg="#666666").pack(side="left", padx=(0, 6))

        self.model_var: tk.StringVar = tk.StringVar(value=current_model)
        self.model_var.trace_add("write", self._on_model_var_changed)
        self.model_menu: tk.OptionMenu = tk.OptionMenu(model_row, self.model_var, *models)
        self.model_menu.bind("<<MenuSelect>>", lambda _: self.on_model_change(self.model_var.get()))
        self.model_menu.config(bg="#ffffff", fg="#666666", font=("微软雅黑", 9),
        relief="flat", highlightthickness=0, padx=6, pady=1)
        self.model_menu.pack(side="left")

        input_border_container: tk.Frame = tk.Frame(bottom_panel, bg="#f8f8f8")
        input_border_container.pack(side="top", fill="x", padx=15, pady=(0, 1))

        attachment_row: tk.Frame = tk.Frame(bottom_panel, bg="#f8f8f8")
        attachment_row.pack(side="top", fill="x", padx=15, pady=(0, 2))

        tk.Button(attachment_row,
              text="📎 添加文件",
              command=self.pick_attachments,
              bg="#f0f0f0", fg="#666666", font=("微软雅黑", 9),
              relief="flat").pack(side="left")

        self.attachments_label: tk.Label = tk.Label(attachment_row,
                          text="未添加附件",
                          font=("微软雅黑", 8),
                          bg="#f8f8f8", fg="#999999")
        self.attachments_label.pack(side="left", padx=(8, 0))

        input_border: tk.Frame = tk.Frame(input_border_container, bg="#d0d0d0", bd=1, relief="solid")
        input_border.pack(fill="x")

        input_inner: tk.Frame = tk.Frame(input_border, bg="#ffffff")
        input_inner.pack(fill="x", padx=1, pady=1)
        self.chat_input: tk.Text = tk.Text(input_inner,
            height=1,
            font=("微软雅黑", 10),
            bg="#ffffff",
            fg="#333333",
            relief="flat",
            bd=0,
            padx=10,
            pady=5,
            wrap="none")
        self.chat_input.pack(fill="both", expand=True)
        self.chat_input.bind("<Return>", self.on_enter)
        self.chat_input.bind("<Shift-Return>", lambda e: None)
        self._setup_drop_bindings()

    def _setup_drop_bindings(self) -> None:
        """绑定拖拽事件（支持 tkdnd 时可直接接收文件路径字符串）"""
        chat_input_any: Any = self.chat_input
        if hasattr(chat_input_any, "drop_target_register") and hasattr(chat_input_any, "dnd_bind"):
            try:
                chat_input_any.drop_target_register("DND_Files")
                chat_input_any.dnd_bind("<<Drop>>", self.on_file_drop)
                return
            except tk.TclError:
                pass

        for sequence in ("<<Drop>>", "<Drop>"):
            try:
                self.chat_input.bind(sequence, self.on_file_drop)
            except tk.TclError:
                continue

    def refresh_session_menu(self, select_active: bool = False) -> None:
        """刷新会话下拉菜单"""
        if not hasattr(self.ai_manager, "list_sessions") or not hasattr(self, "session_menu"):
            return

        sessions: list[SessionSummary] = self.ai_manager.list_sessions()
        self.session_label_to_id = {}
        menu: tk.Menu = self.session_menu["menu"]
        menu.delete(0, "end")

        for item in sessions:
            label: str = f"{item['title']} ({item['message_count']})"
            self.session_label_to_id[label] = item["id"]
            menu.add_command(label=label, command=partial(self.on_session_change, label))

        if not sessions:
            self.session_var.set("")
            return

        if select_active:
            active_id: str | None = self.ai_manager.get_active_session_id()
            for label, sid in self.session_label_to_id.items():
                if sid == active_id:
                    self.session_var.set(label)
                    break

    def on_session_change(self, label: str) -> None:
        """切换会话并重绘消息"""
        session_id: str | None = self.session_label_to_id.get(label)
        if not session_id:
            return
        try:
            self.ai_manager.switch_session(session_id)
            self.render_current_session()
        except Exception as e:
            self.add_message("system", f"切换会话失败: {e}")

    def render_current_session(self) -> None:
        """渲染当前会话历史"""
        self.chat_display.config(state="normal")
        self.chat_display.delete(1.0, "end")
        self.chat_display.config(state="disabled")

        for msg in self.ai_manager.conversation_history:
            role: str = msg.get("role", "")
            content: str = msg.get("content", "")
            if role == "user":
                attachments: list[AttachmentMeta] = msg.get("attachments") or []
                if attachments:
                    names: str = ", ".join([a.get("name", "") for a in attachments if a.get("name")])
                    content = f"{content}\n[附件] {names}"
                self.add_message("user", content)
            elif role == "assistant":
                self.add_message("assistant", content)

    def _split_dropped_paths(self, raw: str) -> list[str]:
        """解析拖拽事件中的文件路径字符串"""
        tokens: list[str] = re.findall(r"\{[^}]+\}|\S+", (raw or "").strip())
        paths: list[str] = []
        for token in tokens:
            token = token.strip().strip("{}\"")
            if token and os.path.exists(token):
                paths.append(token)
        return paths

    def on_file_drop(self, event: tk.Event) -> str | None:
        """处理拖拽上传"""
        paths: list[str] = self._split_dropped_paths(getattr(event, "data", ""))
        if paths:
            self.add_attachments(paths)
            return "break"
        return None

    def pick_attachments(self) -> None:
        """选择附件"""
        paths_result: str | tuple[str, ...] = filedialog.askopenfilenames(
            title="选择要发送的文件",
            filetypes=[
                ("支持的文件", "*.png *.jpg *.jpeg *.webp *.gif *.pdf *.txt *.md *.docx"),
                ("图片", "*.png *.jpg *.jpeg *.webp *.gif"),
                ("文档", "*.pdf *.txt *.md *.docx"),
                ("所有文件", "*.*"),
            ],
        )
        paths_list: list[str] = list(paths_result) if isinstance(paths_result, tuple) else []
        self.add_attachments(paths_list)

    def add_attachments(self, paths: list[str]) -> None:
        """加入待发送附件队列"""
        if not paths:
            return

        existing: set[str] = {os.path.abspath(p) for p in self.pending_attachments}
        for path in paths:
            abs_path: str = os.path.abspath(path)
            if os.path.isfile(abs_path) and abs_path not in existing:
                self.pending_attachments.append(abs_path)
                existing.add(abs_path)
        self.update_attachments_label()

    def clear_pending_attachments(self) -> None:
        """清除待发送附件"""
        self.pending_attachments = []
        self.update_attachments_label()

    def update_attachments_label(self) -> None:
        """更新附件标签"""
        if not hasattr(self, "attachments_label"):
            return
        count: int = len(self.pending_attachments)
        if count == 0:
            self.attachments_label.config(text="未添加附件")
            return
        names: list[str] = [os.path.basename(p) for p in self.pending_attachments[:2]]
        suffix: str = "" if count <= 2 else f" 等{count}个"
        self.attachments_label.config(text=f"{', '.join(names)}{suffix}")

    def set_mode(self, is_agent: bool) -> None:
        """切换模式"""
        self.agent_mode.set(is_agent)
        if is_agent:
            self.agent_btn.config(bg="#1976d2", fg="#ffffff")
            self.chat_btn.config(bg="#e0e0e0", fg="#666666")
        else:
            self.agent_btn.config(bg="#e0e0e0", fg="#666666")
            self.chat_btn.config(bg="#1976d2", fg="#ffffff")

    def _on_model_var_changed(self, *args: Any) -> None:
        """model_var 变化时自动同步顶部标签和配置"""
        model: str = self.model_var.get()
        if not model:
            return
        # 同步顶部状态栏标签
        if hasattr(self, 'model_label'):
            self.model_label.config(text=model)
        # 同步配置（如果不一致）
        config_dict: dict[str, Any] = self.ai_manager.config.config
        if config_dict.get("current_model") != model:
            config_dict["current_model"] = model
            self.ai_manager.config.save_config()

    def on_model_change(self, model: str) -> None:
        """切换模型 - 确保配置、顶部标签、下拉框三方同步"""
        config_dict: dict[str, Any] = self.ai_manager.config.config
        config_dict["current_model"] = model
        self.ai_manager.config.save_config()
        # 直接同步顶部标签
        self.model_label.config(text=model)
        # 同步下拉框显示（trace 会再次触发 _on_model_var_changed，但有幂等保护）
        if hasattr(self, 'model_var') and self.model_var.get() != model:
            self.model_var.set(model)

    def on_enter(self, event: tk.Event) -> str | None:
        """回车发送"""
        state: int = int(event.state) if isinstance(event.state, (int, float)) else 0
        if not state & 0x1:
            self.send_message()
            return "break"
        return None

    def add_message(self, role: str, content: str) -> None:
        """添加消息"""
        self.chat_display.config(state="normal")

        if role == "user":
            self.chat_display.insert("end", "你\n", "user_label")
            self.chat_display.insert("end", content + "\n", "user_bubble")
            self.chat_display.insert("end", "\n")
        elif role == "assistant":
            self.chat_display.insert("end", "AI\n", "assistant_label")
            self.chat_display.insert("end", content + "\n", "assistant_bubble")
            self.chat_display.insert("end", "\n")
        else:
            self.chat_display.insert("end", content + "\n\n", "system")

        self.chat_display.see("end")
        self.chat_display.config(state="disabled")

    def _log_event(self, event_type: str, data: Any = None, level: str = "INFO") -> None:
        """记录日志事件（可选）"""
        if self.logger and hasattr(self.logger, "log_event"):
            self.logger.log_event(event_type, data, level=level)

    def send_message(self) -> None:
        """发送消息"""
        if getattr(self, '_placeholder_active', False):
            return

        message: str = self.chat_input.get("1.0", "end").strip()
        if self.is_processing:
            return
        if not message and not self.pending_attachments:
            return

        self.chat_input.delete("1.0", "end")
        display_message: str = message or "[仅发送附件]"
        if self.pending_attachments:
            file_names: str = ", ".join([os.path.basename(p) for p in self.pending_attachments])
            display_message = f"{display_message}\n[附件] {file_names}"
        self.add_message("user", display_message)

        self.is_processing = True
        self.status_label.config(text="● 思考中...", fg="#ff9800")

        def process() -> None:
            import time
            start: float = time.time()
            try:
                card: CurrentCard | None = self.get_current_card()
                system_prompt: str = "你是Papyrus学习助手，帮助用户学习和管理知识卡片。"

                if card:
                    system_prompt += f"\n\n当前卡片：\n题目：{card['q']}\n答案：{card['a']}"

                agent_mode: bool = self.agent_mode.get()
                if agent_mode and self.card_tools:
                    system_prompt += f"\n\n{self.card_tools.get_tools_definition()}"

                self._log_event("ai.chat_start", {
                    "message_len": len(message),
                    "agent_mode": agent_mode,
                    "has_card": card is not None,
                    "attachments": len(self.pending_attachments),
                })

                attachments: list[str] = list(self.pending_attachments)
                response: str = self.ai_manager.chat(message, system_prompt=system_prompt, attachments=attachments)
                elapsed: float = round(time.time() - start, 4)
                self._log_event("ai.chat_ok", {
                    "elapsed_s": elapsed,
                    "response_len": len(response),
                })

                def add_assistant_msg(r: str = response) -> None:
                    self.add_message("assistant", r)
                self.parent.after(0, add_assistant_msg)
                self.parent.after(0, lambda: self.status_label.config(text="● 就绪", fg="#28a745"))
                self.parent.after(0, self.clear_pending_attachments)
                self.parent.after(0, lambda: self.refresh_session_menu(select_active=True))

                if agent_mode and self.card_tools:
                    tool_call: ToolCall | None = self.card_tools.parse_tool_call(response)
                    if tool_call:
                        tool_result: dict[str, Any] = self.card_tools.execute_tool(tool_call["tool"], tool_call["params"])
                        def show_tool_result(r: dict[str, Any] = tool_result) -> None:
                            self.add_message("system", f"执行: {json.dumps(r, ensure_ascii=False, indent=2)}")
                        self.parent.after(0, show_tool_result)
            except Exception as e:
                error_elapsed: float = round(time.time() - start, 4)
                self._log_event("ai.chat_error", {
                    "elapsed_s": error_elapsed,
                    "error": str(e),
                }, level="ERROR")
                self.parent.after(0, lambda: self.add_message("system", f"错误: {str(e)}"))
                self.parent.after(0, lambda: self.status_label.config(text="● 错误", fg="#dc3545"))
            finally:
                self.is_processing = False

        threading.Thread(target=process, daemon=True).start()

    def new_chat(self) -> None:
        """新建会话（替代清空对话）"""
        self.ai_manager.create_session()
        self.clear_pending_attachments()
        self.render_current_session()
        self.refresh_session_menu(select_active=True)

    def rename_current_chat(self) -> None:
        """重命名当前会话"""
        if not hasattr(self.ai_manager, "rename_session"):
            self.add_message("system", "当前版本不支持会话重命名")
            return

        session_id: str | None = self.ai_manager.get_active_session_id()
        current_title: str = self.ai_manager.get_active_session_title()
        new_title: str | None = simpledialog.askstring("重命名对话", "请输入新名称:", initialvalue=current_title)
        if new_title is None:
            return

        new_title = new_title.strip()
        if not new_title:
            messagebox.showwarning("提示", "对话名称不能为空")
            return

        try:
            if session_id:
                self.ai_manager.rename_session(session_id, new_title)
            self.refresh_session_menu(select_active=True)
            self.add_message("system", f"已重命名为: {new_title}")
        except Exception as e:
            self.add_message("system", f"重命名失败: {e}")

    def clear_chat(self) -> None:
        """兼容旧入口"""
        self.new_chat()

    def open_settings(self) -> None:
        """打开设置"""
        SettingsWindow(self.parent, self.ai_manager.config, self.update_model_display)

    def update_model_display(self) -> None:
        """更新模型显示（含下拉菜单刷新）—— 以 config 为唯一数据源，同步所有 UI"""
        config_dict: dict[str, Any] = self.ai_manager.config.config
        provider: str = str(config_dict.get("current_provider", ""))
        providers: dict[str, Any] = config_dict.get("providers", {})
        provider_cfg: dict[str, Any] = providers.get(provider) or {}
        models: list[str] = list(provider_cfg.get("models", []) or [])

        model: str = str(config_dict.get("current_model", ""))
        # 当前模型不在该提供商的列表中时，自动回退到第一个
        if models and model not in models:
            model = models[0]
            config_dict["current_model"] = model
            self.ai_manager.config.save_config()

        # 1) 同步顶部状态栏标签
        self.model_label.config(text=model)

        # 2) 同步下拉框选项列表
        if hasattr(self, "model_menu"):
            menu: tk.Menu = self.model_menu["menu"]
            menu.delete(0, "end")
            for m in (models or [model]):
                menu.add_command(label=m, command=partial(self.on_model_change, m))

        # 3) 同步下拉框当前显示值（放在最后，触发 trace 会再次写 label，幂等无害）
        if hasattr(self, "model_var") and self.model_var.get() != model:
            self.model_var.set(model)


class SettingsWindow:
    """设置窗口"""

    # 动态创建的属性声明
    temperature_var: tk.DoubleVar
    max_tokens_var: tk.DoubleVar

    def __init__(self, parent: tk.Widget, config: ConfigProtocol, callback: Callable[[], None] | None = None) -> None:
        self.config: ConfigProtocol = config
        self.callback: Callable[[], None] | None = callback

        self.window: tk.Toplevel = tk.Toplevel(parent)
        self.window.title("设置")
        self.window.geometry("600x500")

        notebook: ttk.Notebook = ttk.Notebook(self.window)
        notebook.pack(fill="both", expand=True, padx=10, pady=10)

        self.api_entries: dict[str, tk.Entry] = {}

        self.setup_models_tab(notebook)
        self.setup_api_tab(notebook)
        self.setup_params_tab(notebook)

        tk.Button(self.window, text="保存设置", command=self.save_all,
                 bg="#28a745", fg="white", font=("微软雅黑", 10),
                 padx=30, pady=8).pack(pady=10)

    def setup_models_tab(self, notebook: ttk.Notebook) -> None:
        frame: tk.Frame = tk.Frame(notebook)
        notebook.add(frame, text="模型管理")

        top_frame: tk.Frame = tk.Frame(frame)
        top_frame.pack(fill="x", padx=20, pady=10)

        tk.Label(top_frame, text="提供商:", font=("微软雅黑", 10)).pack(side="left", padx=(0, 10))

        config_dict: dict[str, Any] = self.config.config
        current_provider: str = str(config_dict.get("current_provider", "openai"))
        self.provider_var: tk.StringVar = tk.StringVar(value=current_provider)
        provider_keys: tuple[str, ...] = tuple(config_dict.get("providers", {}).keys())
        provider_menu: tk.OptionMenu = tk.OptionMenu(top_frame, self.provider_var, *provider_keys)
        def on_provider_var_change(*args: Any) -> None:
            self.on_provider_change(self.provider_var.get())
        self.provider_var.trace_add("write", on_provider_var_change)
        provider_menu.config(font=("微软雅黑", 9))
        provider_menu.pack(side="left", fill="x", expand=True)

        list_frame: tk.LabelFrame = tk.LabelFrame(frame, text="模型列表", font=("微软雅黑", 10, "bold"))
        list_frame.pack(fill="both", expand=True, padx=20, pady=10)

        list_container: tk.Frame = tk.Frame(list_frame)
        list_container.pack(fill="both", expand=True, padx=10, pady=10)

        scrollbar: tk.Scrollbar = tk.Scrollbar(list_container)
        scrollbar.pack(side="right", fill="y")

        self.model_listbox: tk.Listbox = tk.Listbox(list_container, font=("微软雅黑", 10),
                                        yscrollcommand=scrollbar.set)
        self.model_listbox.pack(side="left", fill="both", expand=True)
        scrollbar.config(command=self.model_listbox.yview)

        btn_frame: tk.Frame = tk.Frame(list_frame)
        btn_frame.pack(fill="x", padx=10, pady=(0, 10))

        tk.Button(btn_frame, text="➕ 添加", command=self.add_model,
                 bg="#28a745", fg="white", font=("微软雅黑", 9)).pack(side="left", padx=5)
        tk.Button(btn_frame, text="✏️ 编辑", command=self.edit_model,
                 bg="#007bff", fg="white", font=("微软雅黑", 9)).pack(side="left", padx=5)
        tk.Button(btn_frame, text="🗑️ 删除", command=self.delete_model,
                 bg="#dc3545", fg="white", font=("微软雅黑", 9)).pack(side="left", padx=5)

        self.update_model_list()

    def setup_api_tab(self, notebook: ttk.Notebook) -> None:
        frame: tk.Frame = tk.Frame(notebook)
        notebook.add(frame, text="API配置")

        canvas: tk.Canvas = tk.Canvas(frame)
        scrollbar: tk.Scrollbar = tk.Scrollbar(frame, orient="vertical", command=canvas.yview)
        scrollable_frame: tk.Frame = tk.Frame(canvas)

        scrollable_frame.bind("<Configure>",
                             lambda e: canvas.configure(scrollregion=canvas.bbox("all")))

        canvas.create_window((0, 0), window=scrollable_frame, anchor="nw")
        canvas.configure(yscrollcommand=scrollbar.set)

        canvas.pack(side="left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")

        config_dict: dict[str, Any] = self.config.config
        providers: dict[str, Any] = config_dict.get("providers", {})

        for provider_name, provider_config in providers.items():
            group: tk.LabelFrame = tk.LabelFrame(scrollable_frame, text=provider_name.upper(),
                                 font=("微软雅黑", 10, "bold"))
            group.pack(fill="x", padx=20, pady=10)

            if "api_key" in provider_config:
                tk.Label(group, text="API Key:", font=("微软雅黑", 9)).grid(
                    row=0, column=0, sticky="w", padx=10, pady=5)

                entry: tk.Entry = tk.Entry(group, show="●", width=50, font=("微软雅黑", 9))
                entry.insert(0, provider_config.get("api_key", ""))
                entry.grid(row=0, column=1, sticky="ew", padx=10, pady=5)
                self.api_entries[f"{provider_name}_api_key"] = entry

            if "base_url" in provider_config:
                tk.Label(group, text="Base URL:", font=("微软雅黑", 9)).grid(
                    row=1, column=0, sticky="w", padx=10, pady=5)

                entry = tk.Entry(group, width=50, font=("微软雅黑", 9))
                entry.insert(0, provider_config.get("base_url", ""))
                entry.grid(row=1, column=1, sticky="ew", padx=10, pady=5)
                self.api_entries[f"{provider_name}_base_url"] = entry

            group.columnconfigure(1, weight=1)

    def setup_params_tab(self, notebook: ttk.Notebook) -> None:
        frame: tk.Frame = tk.Frame(notebook)
        notebook.add(frame, text="参数")

        config_dict: dict[str, Any] = self.config.config
        params: dict[str, Any] = config_dict.get("parameters", {})

        self.create_param_slider(frame, "Temperature", "temperature",
                                 0, 2, 0.1, params.get("temperature", 0.7))
        self.create_param_slider(frame, "Max Tokens", "max_tokens",
                                 100, 4000, 100, params.get("max_tokens", 2000))

    def create_param_slider(self, parent: tk.Widget, label: str, key: str, from_: float, to: float, resolution: float, default: float) -> None:
        container: tk.Frame = tk.Frame(parent)
        container.pack(fill="x", padx=20, pady=15)

        tk.Label(container, text=label, font=("微软雅黑", 10, "bold")).pack(anchor="w")

        var: tk.DoubleVar = tk.DoubleVar(value=default)
        setattr(self, f"{key}_var", var)

        value_label: tk.Label = tk.Label(container, textvariable=var, font=("微软雅黑", 9))
        value_label.pack(anchor="e")

        slider: tk.Scale = tk.Scale(container, from_=from_, to=to, resolution=resolution,
                         orient="horizontal", variable=var, showvalue=False)
        slider.pack(fill="x")

    def on_provider_change(self, provider: str) -> None:
        self.update_model_list()

    def update_model_list(self) -> None:
        provider: str = self.provider_var.get()
        config_dict: dict[str, Any] = self.config.config
        providers: dict[str, Any] = config_dict.get("providers", {})
        provider_cfg: dict[str, Any] = providers.get(provider, {})
        models: list[str] = provider_cfg.get("models", [])

        self.model_listbox.delete(0, "end")
        for model in models:
            self.model_listbox.insert("end", model)

    def add_model(self) -> None:
        name: str | None = simpledialog.askstring("添加模型", "模型名称:")
        if not name:
            return

        provider: str = self.provider_var.get()
        config_dict: dict[str, Any] = self.config.config
        providers: dict[str, Any] = config_dict.get("providers", {})
        provider_cfg: dict[str, Any] = providers.get(provider, {})
        models: list[str] = provider_cfg.get("models", [])

        if name in models:
            messagebox.showwarning("提示", "模型已存在")
            return

        models.append(name)
        self.update_model_list()

    def edit_model(self) -> None:
        selection: tuple[int, ...] = self.model_listbox.curselection()  # type: ignore[no-untyped-call]
        if not selection:
            messagebox.showwarning("提示", "请选择模型")
            return

        old_name: str = self.model_listbox.get(selection[0])
        new_name: str | None = simpledialog.askstring("编辑模型", "模型名称:", initialvalue=old_name)

        if not new_name or new_name == old_name:
            return

        provider: str = self.provider_var.get()
        config_dict: dict[str, Any] = self.config.config
        providers: dict[str, Any] = config_dict.get("providers", {})
        provider_cfg: dict[str, Any] = providers.get(provider, {})
        models: list[str] = provider_cfg.get("models", [])

        idx: int = models.index(old_name)
        models[idx] = new_name
        self.update_model_list()

    def delete_model(self) -> None:
        selection: tuple[int, ...] = self.model_listbox.curselection()  # type: ignore[no-untyped-call]
        if not selection:
            messagebox.showwarning("提示", "请选择模型")
            return

        name: str = self.model_listbox.get(selection[0])

        if not messagebox.askyesno("确认", f"删除 '{name}'?"):
            return

        provider: str = self.provider_var.get()
        config_dict: dict[str, Any] = self.config.config
        providers: dict[str, Any] = config_dict.get("providers", {})
        provider_cfg: dict[str, Any] = providers.get(provider, {})
        models: list[str] = provider_cfg.get("models", [])

        if len(models) <= 1:
            messagebox.showwarning("提示", "至少保留一个模型")
            return

        models.remove(name)
        self.update_model_list()

    def save_all(self) -> None:
        # 保存API配置
        config_dict: dict[str, Any] = self.config.config
        providers: dict[str, Any] = config_dict.get("providers", {})

        for provider in providers.keys():
            if f"{provider}_api_key" in self.api_entries:
                providers[provider]["api_key"] = \
                    self.api_entries[f"{provider}_api_key"].get()
            if f"{provider}_base_url" in self.api_entries:
                providers[provider]["base_url"] = \
                    self.api_entries[f"{provider}_base_url"].get()

        # 保存参数设置
        if hasattr(self, "temperature_var"):
            config_dict["parameters"]["temperature"] = self.temperature_var.get()
        if hasattr(self, "max_tokens_var"):
            config_dict["parameters"]["max_tokens"] = int(self.max_tokens_var.get())

        # 保存当前选择的提供商
        new_provider: str = self.provider_var.get()
        config_dict["current_provider"] = new_provider

        # 验证并更新当前模型
        current_model: str = config_dict.get("current_model", "")
        available_models: list[str] = providers[new_provider].get("models", [])

        # 如果当前模型不在新提供商的模型列表中，使用第一个可用模型
        if not available_models:
            messagebox.showwarning("警告", f"提供商 '{new_provider}' 没有可用模型，请先添加模型")
            return

        if current_model not in available_models:
            config_dict["current_model"] = available_models[0]
            messagebox.showinfo("提示", f"已自动切换到模型: {available_models[0]}")

        # 保存配置到文件
        try:
            self.config.save_config()

            if self.callback:
                self.callback()

            messagebox.showinfo("成功", "设置已保存")
            self.window.destroy()
        except ValueError as e:
            # 配置验证错误（如包含非法字符）
            messagebox.showerror("配置错误", str(e))
        except Exception as e:
            messagebox.showerror("错误", f"保存设置失败: {str(e)}")
