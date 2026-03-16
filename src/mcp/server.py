"""MCP 本地服务器 - 通过 HTTP 暴露卡片工具接口"""

import json
import threading
from http.server import HTTPServer, BaseHTTPRequestHandler


class _MCPHandler(BaseHTTPRequestHandler):
    """处理 MCP JSON-RPC 风格的请求"""

    def log_message(self, format, *args):
        """覆盖默认日志，转发到 PapyrusLogger"""
        logger = self.server.mcp_logger
        if logger:
            logger.info(f"MCP: {format % args}")

    def _send_json(self, data, status=200):
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json.dumps(data, ensure_ascii=False).encode("utf-8"))

    def do_OPTIONS(self):
        """处理 CORS 预检"""
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self):
        if self.path == "/health":
            self._send_json({"status": "ok"})
        elif self.path == "/tools":
            self._send_json({
                "tools": [
                    "search_cards",
                    "get_card_stats",
                    "create_card",
                    "update_card",
                    "delete_card",
                ]
            })
        else:
            self._send_json({"error": "未知路径"}, 404)

    def do_POST(self):
        if self.path != "/call":
            self._send_json({"error": "未知路径"}, 404)
            return

        card_tools = self.server.mcp_card_tools
        if card_tools is None:
            self._send_json({"error": "CardTools 未初始化"}, 503)
            return

        try:
            length = int(self.headers.get("Content-Length", 0))
            body = json.loads(self.rfile.read(length).decode("utf-8"))
        except (json.JSONDecodeError, ValueError):
            self._send_json({"error": "请求体不是合法 JSON"}, 400)
            return

        tool_name = body.get("tool")
        params = body.get("params", {})

        if not tool_name:
            self._send_json({"error": "缺少 tool 字段"}, 400)
            return

        result = card_tools.execute_tool(tool_name, params)
        self._send_json(result)


class MCPServer:
    """可在后台线程运行的轻量 MCP 服务器"""

    def __init__(self, host="127.0.0.1", port=9100, logger=None, card_tools=None):
        self.host = host
        self.port = port
        self.logger = logger
        self.card_tools = card_tools
        self._httpd = None
        self._thread = None

    def start(self):
        """在守护线程中启动 HTTP 服务器"""

        if self._httpd is not None:
            return

        class _ReusableHTTPServer(HTTPServer):
            allow_reuse_address = True

        self._httpd = _ReusableHTTPServer((self.host, self.port), _MCPHandler)
        # 把依赖挂到 HTTPServer 实例上，Handler 通过 self.server 访问
        self._httpd.mcp_logger = self.logger
        self._httpd.mcp_card_tools = self.card_tools

        self._thread = threading.Thread(target=self._httpd.serve_forever, daemon=True)
        self._thread.start()

        if self.logger:
            self.logger.info(f"MCP 服务器已启动: http://{self.host}:{self.port}")

    def stop(self):
        """关闭服务器"""

        if self._httpd is None:
            return

        try:
            self._httpd.shutdown()
            self._httpd.server_close()
        finally:
            self._httpd = None

        if self._thread is not None:
            self._thread.join(timeout=2)
            self._thread = None

        if self.logger:
            self.logger.info("MCP 服务器已停止")