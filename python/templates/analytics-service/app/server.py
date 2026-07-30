import json
from http.server import BaseHTTPRequestHandler, HTTPServer

from instantly import InstantlyApiError

from .config import Config
from . import analytics


def make_handler(config: Config):
    class Handler(BaseHTTPRequestHandler):
        def _send(self, status: int, body) -> None:
            self.send_response(status)
            self.send_header("content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(body).encode())

        def do_GET(self) -> None:  # noqa: N802
            try:
                if self.path == "/health":
                    return self._send(200, {"ok": True, "service": "analytics-service"})
                if self.path == "/analytics/cached":
                    snap = analytics.get_cache()
                    return self._send(200, snap) if snap else self._send(503, {"error": "no snapshot yet"})
                if self.path == "/analytics":
                    snapshot = analytics.pull_snapshot(analytics.get_client(config.api_key))
                    analytics.set_cache(snapshot)
                    return self._send(200, snapshot)
                return self._send(404, {"error": "not found"})
            except InstantlyApiError as err:
                return self._send(err.status, {"error": "instantly_api_error", "payload": err.payload})
            except ValueError as err:
                return self._send(400, {"error": str(err)})

        def log_message(self, *args) -> None:
            pass

    return Handler


def make_server(config: Config) -> HTTPServer:
    return HTTPServer(("", config.port), make_handler(config))
