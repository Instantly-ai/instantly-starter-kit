import json
from dataclasses import asdict
from http.server import BaseHTTPRequestHandler, HTTPServer

from instantly import InstantlyApiError

from .config import Config
from .classify import classify
from . import store
from .actions import get_client, apply_interest


def make_handler(config: Config):
    class Handler(BaseHTTPRequestHandler):
        def _send(self, status: int, body) -> None:
            self.send_response(status)
            self.send_header("content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(body).encode())

        def _read_json(self):
            length = int(self.headers.get("content-length", 0))
            raw = self.rfile.read(length) if length else b""
            return json.loads(raw or b"{}")

        def do_GET(self) -> None:  # noqa: N802
            if self.path == "/health":
                return self._send(200, {"ok": True, "service": "reply-automation"})
            if self.path == "/replies":
                return self._send(200, {"replies": store.recent()})
            return self._send(404, {"error": "not found"})

        def do_POST(self) -> None:  # noqa: N802
            if self.path != "/webhooks/replies":
                return self._send(404, {"error": "not found"})
            if self.headers.get("x-shared-secret") != config.webhook_secret:
                return self._send(401, {"error": "bad secret"})
            try:
                event = self._read_json()
                text = event.get("reply_text") or event.get("reply_text_snippet") or ""
                classification = classify(text)
                lead_email = event.get("lead_email") or event.get("lead")
                acted = False
                if config.act_on_replies and lead_email and config.api_key:
                    apply_interest(get_client(config.api_key), lead_email, classification.interest_value)
                    acted = True
                store.record({
                    "email_id": event.get("email_id"),
                    "event_type": event.get("event_type"),
                    "lead_email": lead_email,
                    "classification": asdict(classification),
                    "acted": acted,
                })
                print(f"[reply] {classification.label} ({classification.interest_value}) lead={lead_email} acted={acted}")
                return self._send(200, {"classification": asdict(classification), "acted": acted})
            except InstantlyApiError as err:
                return self._send(err.status, {"error": "instantly_api_error", "payload": err.payload})
            except ValueError as err:
                return self._send(400, {"error": str(err)})

        def log_message(self, *args) -> None:
            pass

    return Handler


def serve(config: Config) -> None:
    server = HTTPServer(("", config.port), make_handler(config))
    print(f"reply-automation listening on :{config.port}")
    print("acting on replies" if config.act_on_replies else "classify + log only (ACT_ON_REPLIES=0)")
    server.serve_forever()
