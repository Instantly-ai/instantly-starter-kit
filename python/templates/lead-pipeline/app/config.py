import os
from dataclasses import dataclass
from typing import Any, Dict, Optional


@dataclass
class Config:
    api_key: Optional[str]
    limit: int
    # Edit to your ICP — see docs/api/enrichment.md for the SuperSearch filter shape.
    search_filters: Dict[str, Any]


def load_config() -> Config:
    return Config(
        api_key=os.environ.get("INSTANTLY_API_KEY"),
        limit=int(os.environ.get("LIMIT", "100")),
        search_filters={"title": {"include": ["Founder", "CEO"]}, "department": ["Sales"]},
    )
