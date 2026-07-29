"""06 · Handle a reply webhook

A minimal receiver for Instantly webhook deliveries. Instantly provides NO HMAC
signature — the only delivery-auth is a custom header you set on the webhook and
verify here. The payload's `email_id` IS the `reply_to_uuid`, so you can reply
in-thread with reply_to_email.

Register once (needs a public URL) with register_webhook(), then run this receiver:
    PORT=3000 python 06_reply_webhook.py
"""
import json
import os
from http.server import BaseHTTPRequestHandler, HTTPServer

from instantly import create_instantly_client
from instantly.resources.webhook import create_webhook
from instantly.resources.email import reply_to_email  # noqa: F401  (used when you reply in-thread)

SHARED_SECRET = os.environ.get("WEBHOOK_SECRET", "change-me")


def register_webhook(api_key: str, public_url: str, shared_secret: str):
    """One-time: point Instantly at your public receiver URL."""
    client = create_instantly_client(api_key)
    return create_webhook(client, {
        "body": {
            "target_hook_url": public_url,
            "event_type": "reply_received",
            "headers": {"x-shared-secret": shared_secret},  # your only delivery-auth (no HMAC)
        },
    })


class Handler(BaseHTTPRequestHandler):
    def do_POST(self) -> None:  # noqa: N802
        if self.headers.get("x-shared-secret") != SHARED_SECRET:
            self.send_response(401)
            self.end_headers()
            self.wfile.write(b"bad secret")
            return
        length = int(self.headers.get("content-length", 0))
        event = json.loads(self.rfile.read(length) or b"{}")
        # Match on the payload's event_type (may differ from the subscription enum).
        print(f"event={event.get('event_type')} email_id={event.get('email_id')}")
        # To reply in-thread: event['email_id'] is the reply_to_uuid — pass it to reply_to_email.
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b"ok")


def main() -> None:
    port = int(os.environ.get("PORT", "3000"))
    server = HTTPServer(("", port), Handler)
    print(f"Webhook receiver listening on :{port}")
    server.serve_forever()


if __name__ == "__main__":
    main()
