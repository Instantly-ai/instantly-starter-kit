import os
from dataclasses import dataclass
from typing import Optional


@dataclass
class Config:
    """API routes 400 if api_key is missing, but the server still starts."""

    api_key: Optional[str]
    webhook_secret: str
    port: int
    public_url: Optional[str]


def load_config() -> Config:
    return Config(
        api_key=os.environ.get("INSTANTLY_API_KEY"),
        webhook_secret=os.environ.get("WEBHOOK_SECRET", "change-me"),
        port=int(os.environ.get("PORT", "3000")),
        public_url=os.environ.get("PUBLIC_URL"),
    )
