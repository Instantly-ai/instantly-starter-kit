import os
from dataclasses import dataclass
from typing import Optional


@dataclass
class Config:
    api_key: Optional[str]
    port: int
    refresh_s: float


def load_config() -> Config:
    return Config(
        api_key=os.environ.get("INSTANTLY_API_KEY"),
        port=int(os.environ.get("PORT", "3000")),
        refresh_s=float(os.environ.get("REFRESH_MS", "300000")) / 1000.0,
    )
