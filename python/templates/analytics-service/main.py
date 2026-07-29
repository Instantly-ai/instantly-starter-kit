import threading
import time
from datetime import datetime, timezone

from app.config import load_config
from app.server import make_server
from app import analytics


def _scheduler(config) -> None:
    client = analytics.get_client(config.api_key)
    while True:
        try:
            analytics.set_cache(analytics.pull_snapshot(client))
            print(f"[scheduler] snapshot refreshed at {datetime.now(timezone.utc).isoformat()}")
        except Exception as err:  # keep the loop alive
            print(f"[scheduler] refresh failed: {err}")
        time.sleep(config.refresh_s)


def main() -> None:
    config = load_config()
    if config.api_key:
        threading.Thread(target=_scheduler, args=(config,), daemon=True).start()
    else:
        print("⚠  INSTANTLY_API_KEY not set — /analytics will 400 and the scheduler is disabled.")
    server = make_server(config)
    print(f"analytics-service listening on :{config.port}")
    server.serve_forever()


if __name__ == "__main__":
    main()
