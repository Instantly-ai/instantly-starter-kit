import os
from dataclasses import dataclass
from typing import Optional


@dataclass
class Config:
    api_key: Optional[str]
    webhook_secret: str
    port: int
    act_on_replies: bool


def load_config() -> Config:
    return Config(
        api_key=os.environ.get("INSTANTLY_API_KEY"),
        webhook_secret=os.environ.get("WEBHOOK_SECRET", "change-me"),
        port=int(os.environ.get("PORT", "3000")),
        act_on_replies=os.environ.get("ACT_ON_REPLIES") == "1",
    )
