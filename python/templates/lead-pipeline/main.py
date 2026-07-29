import os

from app.config import load_config
from app.pipeline import get_client, run
from app.sync import console_sync


def main() -> None:
    config = load_config()
    if not config.api_key:
        print("INSTANTLY_API_KEY is not set — this pipeline needs a key to run.")
        print("Set it and re-run:  INSTANTLY_API_KEY=... python main.py")
        return
    confirm_enrich = os.environ.get("CONFIRM_ENRICH") == "1"
    client = get_client(config.api_key)
    result = run(client, config.search_filters, config.limit, console_sync, confirm_enrich)
    if not result["enriched"]:
        print(f"Preview only — {result['count']} match(es), {result['previewed']} sampled. No credits spent, no list created.")
        print("Set CONFIRM_ENRICH=1 to enrich (spends credits + creates a list) and sync.")
    else:
        print(f"✓ enriched + synced — {result['count']} match(es), deduped {result['deduped']}, synced {result['synced']}")


if __name__ == "__main__":
    main()
