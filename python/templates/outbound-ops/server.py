"""Example: the daily ops over HTTP, so another service can call them.

Import OutboundOps into any backend the same way. Read-only endpoints;
containment requires ?confirm=1.

    GET /brief                      -> the morning brief as JSON
    GET /incident?domains=acme.com  -> diagnosis (read-only)
    GET /incident?confirm=1         -> diagnose, then execute containment

Run:  INSTANTLY_API_KEY=... PORT=3000 python server.py
"""
import json
import os
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs

from instantly import InstantlyApiError

from app.ops import OutboundOps

ops = OutboundOps.from_env()
PORT = int(os.environ.get("PORT", "3000"))


class Handler(BaseHTTPRequestHandler):
    def _send(self, status, body):
        payload = json.dumps(body).encode("utf-8")
        self.send_response(status)
        self.send_header("content-type", "application/json")
        self.end_headers()
        self.wfile.write(payload)

    def do_GET(self):  # noqa: N802
        u = urlparse(self.path)
        q = parse_qs(u.query)
        try:
            if u.path == "/brief":
                return self._send(200, ops.brief())
            if u.path == "/incident":
                domains = [s.strip() for s in q.get("domains", [""])[0].split(",") if s.strip()]
                diag = ops.diagnose(domains)
                if q.get("confirm", ["0"])[0] == "1" and not diag["ready"]:
                    return self._send(200, {"diagnosis": diag, "contained": ops.contain(diag)})
                return self._send(200, diag)
            return self._send(404, {"error": "not found — try GET /brief or GET /incident"})
        except InstantlyApiError as e:
            return self._send(e.status, {"error": "instantly_api_error", "payload": e.payload})
        except Exception as e:  # noqa: BLE001
            return self._send(500, {"error": str(e)})

    def log_message(self, *args):  # quiet
        pass


if __name__ == "__main__":
    print(f"outbound-ops on http://localhost:{PORT} — GET /brief, GET /incident")
    HTTPServer(("", PORT), Handler).serve_forever()
