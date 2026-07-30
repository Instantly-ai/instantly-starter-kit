import json
import uuid
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs

from instantly import InstantlyApiError

from .config import Config
from . import store
from . import outreach


def make_handler(config: Config):
    class Handler(BaseHTTPRequestHandler):
        def _send(self, status: int, body) -> None:
            payload = json.dumps(body).encode()
            self.send_response(status)
            self.send_header("content-type", "application/json")
            self.end_headers()
            self.wfile.write(payload)

        def _read_json(self):
            length = int(self.headers.get("content-length", 0))
            raw = self.rfile.read(length) if length else b""
            return json.loads(raw or b"{}")

        def do_GET(self) -> None:  # noqa: N802
            path = urlparse(self.path).path
            if path == "/health":
                return self._send(200, {"ok": True, "service": "outreach-service"})
            if path == "/status":
                return self._send(200, {"runs": store.list_runs()})
            if path.startswith("/status/"):
                run = store.get_run(path[len("/status/"):])
                return self._send(200, run) if run else self._send(404, {"error": "run not found"})
            return self._send(404, {"error": "not found"})

        def do_POST(self) -> None:  # noqa: N802
            parsed = urlparse(self.path)
            path = parsed.path
            qs = parse_qs(parsed.query)
            try:
                # Reply webhook receiver (no key; verify shared secret).
                if path == "/webhooks/replies":
                    if self.headers.get("x-shared-secret") != config.webhook_secret:
                        return self._send(401, {"error": "bad secret"})
                    event = self._read_json()
                    run_id = qs.get("run", [None])[0]
                    run = store.get_run(run_id) if run_id else None
                    if run is not None:
                        run["replies"].append({"email_id": event.get("email_id"), "event_type": event.get("event_type")})
                        store.update_run(run_id, replies=run["replies"])
                    print(f"[webhook] event={event.get('event_type')} email_id={event.get('email_id')}")
                    return self._send(200, {"received": True})

                # Build a run: list -> (enrich) -> add + verify -> campaign draft (needs key).
                if path == "/runs":
                    client = outreach.get_client(config.api_key)
                    body = self._read_json()
                    run_id = str(uuid.uuid4())
                    store.create_run(run_id)
                    if body.get("search_filters"):
                        list_id = outreach.enrich_into_list(client, body["name"], body["search_filters"], body.get("enrich_limit", 100))
                    else:
                        list_id = outreach.create_list(client, body["name"])
                    store.update_run(run_id, list_id=list_id, status="verifying")
                    stats = None
                    if body.get("leads"):
                        stats = outreach.add_and_verify_leads(client, list_id, body["leads"], body.get("verify") is True)
                    campaign_id = outreach.create_campaign_draft(client, body)
                    store.update_run(run_id, campaign_id=campaign_id, leads=len(body.get("leads", [])),
                                     verification_stats=stats, status="ready")
                    return self._send(201, {"run_id": run_id, "list_id": list_id, "campaign_id": campaign_id, "status": "ready"})

                # Launch a run: preflight; activate only with { "confirm": true } (needs key).
                if path.startswith("/runs/") and path.endswith("/launch"):
                    run_id = path[len("/runs/"):-len("/launch")]
                    run = store.get_run(run_id)
                    if not run or not run.get("campaign_id"):
                        return self._send(404, {"error": "run or campaign not found"})
                    client = outreach.get_client(config.api_key)
                    pre = outreach.preflight(client, run["campaign_id"])
                    body = self._read_json()
                    if not body.get("confirm"):
                        return self._send(200, {"preflight": pre, "note": 'POST { "confirm": true } to activate (sends email)'})
                    outreach.launch(client, run["campaign_id"])
                    store.update_run(run_id, status="active")
                    return self._send(200, {"run_id": run_id, "status": "active"})

                return self._send(404, {"error": "not found"})
            except InstantlyApiError as err:
                return self._send(err.status, {"error": "instantly_api_error", "payload": err.payload})
            except ValueError as err:
                return self._send(400, {"error": str(err)})

        def log_message(self, *args) -> None:  # keep the console quiet
            pass

    return Handler


def serve(config: Config) -> None:
    server = HTTPServer(("", config.port), make_handler(config))
    print(f"outreach-service listening on :{config.port}")
    if not config.api_key:
        print("⚠  INSTANTLY_API_KEY not set — /runs and /launch will 400 until you set it.")
    server.serve_forever()
