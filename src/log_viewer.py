import tkinter as tk
from tkinter import ttk, filedialog, messagebox
from datetime import datetime

class LogViewer:
    """日志查看器窗口"""
    
    def __init__(self, parent, logger):
        self.logger = logger
        self.window = tk.Toplevel(parent)
        self.window.title("📋 日志查看器")
        self.window.geometry("900x600")
        self.window.minsize(700, 400)
        
        self.setup_ui()
        self.refresh_logs()
    
    def setup_ui(self):
        # 顶部工具栏
        toolbar = tk.Frame(self.window, bg="#f0f0f0", height=50)
        toolbar.pack(side="top", fill="x", padx=5, pady=5)
        
        # 日志类型选择
        tk.Label(toolbar, text="日志类型:", bg="#f0f0f0", font=("微软雅黑", 9)).pack(side="left", padx=5)
        
        self.log_type_var = tk.StringVar(value="all")
        log_types = [
            ("全部日志", "all"),
            ("错误日志", "error"),
            ("活动日志", "activity")
        ]
        
        for text, value in log_types:
            tk.Radiobutton(toolbar, text=text, variable=self.log_type_var, 
                          value=value, bg="#f0f0f0", font=("微软雅黑", 9),
                          command=self.refresh_logs).pack(side="left", padx=5)
        
        # 分隔符
        tk.Frame(toolbar, width=2, bg="#ccc").pack(side="left", fill="y", padx=10)
        
        # 显示行数
        tk.Label(toolbar, text="显示行数:", bg="#f0f0f0", font=("微软雅黑", 9)).pack(side="left", padx=5)
        
        self.limit_var = tk.StringVar(value="100")
        limit_combo = ttk.Combobox(toolbar, textvariable=self.limit_var, 
                                   values=["50", "100", "200", "500", "全部"],
                                   width=8, state="readonly")
        limit_combo.pack(side="left", padx=5)
        limit_combo.bind("<<ComboboxSelected>>", lambda e: self.refresh_logs())
        
        # 按钮组
        tk.Button(toolbar, text="🔄 刷新", command=self.refresh_logs,
                 bg="#e3f2fd", font=("微软雅黑", 9)).pack(side="left", padx=5)
        
        tk.Button(toolbar, text="💾 导出", command=self.export_logs,
                 bg="#fff3e0", font=("微软雅黑", 9)).pack(side="left", padx=5)
        
        tk.Button(toolbar, text="🗑️ 清空", command=self.clear_logs,
                 bg="#ffebee", font=("微软雅黑", 9)).pack(side="left", padx=5)
        
        # 搜索框
        tk.Frame(toolbar, width=2, bg="#ccc").pack(side="left", fill="y", padx=10)
        tk.Label(toolbar, text="搜索:", bg="#f0f0f0", font=("微软雅黑", 9)).pack(side="left", padx=5)
        
        self.search_var = tk.StringVar()
        search_entry = tk.Entry(toolbar, textvariable=self.search_var, width=20, font=("微软雅黑", 9))
        search_entry.pack(side="left", padx=5)
        search_entry.bind("<KeyRelease>", lambda e: self.filter_logs())
        
        # 主显示区域
        main_frame = tk.Frame(self.window)
        main_frame.pack(side="top", fill="both", expand=True, padx=5, pady=5)
        
        # 滚动条
        scrollbar = tk.Scrollbar(main_frame)
        scrollbar.pack(side="right", fill="y")
        
        # 日志文本框
        self.log_text = tk.Text(main_frame, font=("Consolas", 9), 
                               wrap="none", bg="#1e1e1e", fg="#d4d4d4",
                               yscrollcommand=scrollbar.set)
        self.log_text.pack(side="left", fill="both", expand=True)
        scrollbar.config(command=self.log_text.yview)
        
        # 配置文本标签样式
        self.log_text.tag_configure("INFO", foreground="#4ec9b0")
        self.log_text.tag_configure("WARNING", foreground="#dcdcaa")
        self.log_text.tag_configure("ERROR", foreground="#f48771")
        self.log_text.tag_configure("DEBUG", foreground="#9cdcfe")
        self.log_text.tag_configure("highlight", background="#264f78")
        
        # 底部状态栏
        self.status_var = tk.StringVar(value="就绪")
        status_bar = tk.Label(self.window, textvariable=self.status_var, 
                             relief="sunken", anchor="w", bg="#f0f0f0",
                             font=("微软雅黑", 9))
        status_bar.pack(side="bottom", fill="x")
        
        # 水平滚动条
        h_scrollbar = tk.Scrollbar(main_frame, orient="horizontal")
        h_scrollbar.pack(side="bottom", fill="x")
        self.log_text.config(xscrollcommand=h_scrollbar.set)
        h_scrollbar.config(command=self.log_text.xview)
    
    def refresh_logs(self):
        """刷新日志显示"""
        log_type = self.log_type_var.get()
        limit_str = self.limit_var.get()
        limit = None if limit_str == "全部" else int(limit_str)
        
        # 获取日志
        logs = self.logger.get_logs(log_type, limit)
        
        # 清空文本框
        self.log_text.config(state="normal")
        self.log_text.delete(1.0, "end")
        
        # 显示日志
        for line in logs:
            self.insert_log_line(line)
        
        self.log_text.config(state="disabled")
        
        # 自动滚动到底部
        self.log_text.see("end")
        
        # 更新状态栏
        self.status_var.set(f"已加载 {len(logs)} 条日志 | 类型: {log_type} | 时间: {datetime.now().strftime('%H:%M:%S')}")
    
    def insert_log_line(self, line):
        """插入日志行并应用样式"""
        # 检测日志级别并应用颜色
        if "ERROR" in line:
            self.log_text.insert("end", line, "ERROR")
        elif "WARNING" in line:
            self.log_text.insert("end", line, "WARNING")
        elif "INFO" in line:
            self.log_text.insert("end", line, "INFO")
        elif "DEBUG" in line:
            self.log_text.insert("end", line, "DEBUG")
        else:
            self.log_text.insert("end", line)
    
    def filter_logs(self):
        """根据搜索关键词过滤日志"""
        search_text = self.search_var.get().lower()
        
        if not search_text:
            self.refresh_logs()
            return
        
        log_type = self.log_type_var.get()
        logs = self.logger.get_logs(log_type, limit=None)
        
        # 过滤日志
        filtered_logs = [line for line in logs if search_text in line.lower()]
        
        # 清空并显示过滤结果
        self.log_text.config(state="normal")
        self.log_text.delete(1.0, "end")
        
        for line in filtered_logs:
            self.insert_log_line(line)
        
        self.log_text.config(state="disabled")
        
        # 更新状态栏
        self.status_var.set(f"搜索 '{search_text}' 找到 {len(filtered_logs)} 条结果")
    
    def export_logs(self):
        """导出日志到文件"""
        export_path = filedialog.askdirectory(title="选择导出目录")
        if not export_path:
            return
        
        try:
            export_file = self.logger.export_logs(export_path)
            if export_file:
                messagebox.showinfo("导出成功", f"日志已导出到:\n{export_file}")
                self.status_var.set(f"日志已导出: {export_file}")
            else:
                messagebox.showerror("导出失败", "无法导出日志文件")
        except Exception as e:
            messagebox.showerror("导出失败", f"错误: {e}")
    
    def clear_logs(self):
        """清空日志"""
        if messagebox.askyesno("确认清空", "确定要清空所有日志吗？\n此操作不可恢复！"):
            try:
                self.logger.clear_logs()
                self.refresh_logs()
                messagebox.showinfo("完成", "日志已清空")
            except Exception as e:
                messagebox.showerror("清空失败", f"错误: {e}")