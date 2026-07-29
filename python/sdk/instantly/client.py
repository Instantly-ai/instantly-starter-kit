# Generated file. Do not edit manually.
from __future__ import annotations

import json
import time
import urllib.error
import urllib.request
from dataclasses import dataclass, field
from typing import Any, Callable, Dict, Mapping, Optional, Tuple
from urllib.parse import quote, urlencode

from .errors import InstantlyApiError

DEFAULT_BASE_URL = "https://api.instantly.ai"
# A User-Agent is required — the API's edge (Cloudflare) blocks the stdlib default
# ("Python-urllib/..."). Callers can override it via request/default headers.
DEFAULT_USER_AGENT = "instantly-sdk-python/0.1.0"

# transport(method, url, headers, body) -> (status, reason, content_type, text)
Transport = Callable[[str, str, Dict[str, str], Optional[bytes]], Tuple[int, str, str, str]]


def _default_transport(method: str, url: str, headers: Dict[str, str], body: Optional[bytes]) -> Tuple[int, str, str, str]:
    req = urllib.request.Request(url, data=body, method=method, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp:
            return resp.status, resp.reason or "", resp.headers.get_content_type(), resp.read().decode("utf-8")
    except urllib.error.HTTPError as exc:
        text = exc.read().decode("utf-8") if exc.fp is not None else ""
        content_type = exc.headers.get_content_type() if exc.headers else ""
        return exc.code, exc.reason or "", content_type, text


@dataclass
class InstantlyClient:
    api_key: str
    base_url: str = DEFAULT_BASE_URL
    transport: Transport = _default_transport
    max_retries: int = 1
    default_headers: Dict[str, str] = field(default_factory=dict)


def create_instantly_client(
    api_key: str,
    *,
    base_url: Optional[str] = None,
    transport: Optional[Transport] = None,
    max_retries: int = 1,
    default_headers: Optional[Dict[str, str]] = None,
) -> InstantlyClient:
    return InstantlyClient(
        api_key=api_key,
        base_url=base_url or DEFAULT_BASE_URL,
        transport=transport or _default_transport,
        max_retries=1 if max_retries is None else max_retries,
        default_headers=dict(default_headers or {}),
    )


def _build_path(template: str, path_params: Optional[Dict[str, Any]]) -> str:
    path = template
    for key, value in (path_params or {}).items():
        path = path.replace("{" + key + "}", quote(str(value), safe=""))
    return path


def _build_query(query: Optional[Dict[str, Any]]) -> str:
    if not query:
        return ""
    pairs = []
    for key, value in query.items():
        if value is None:
            continue
        if isinstance(value, (list, tuple)):
            for item in value:
                pairs.append((key, str(item)))
        elif isinstance(value, bool):
            pairs.append((key, "true" if value else "false"))
        elif isinstance(value, dict):
            pairs.append((key, json.dumps(value)))
        else:
            pairs.append((key, str(value)))
    encoded = urlencode(pairs)
    return f"?{encoded}" if encoded else ""


def _parse_payload(content_type: str, text: str) -> Any:
    if "application/json" in (content_type or "") and text:
        try:
            return json.loads(text)
        except json.JSONDecodeError:
            return text
    return text


def execute_operation(
    client: InstantlyClient, metadata: Mapping[str, Any], request: Optional[Mapping[str, Any]] = None
) -> Any:
    request = request or {}
    path = _build_path(metadata["path"], request.get("path"))
    url = client.base_url.rstrip("/") + path + _build_query(request.get("query"))

    headers = dict(client.default_headers)
    headers["accept"] = "application/json"
    headers["authorization"] = f"Bearer {client.api_key}"
    headers.setdefault("user-agent", DEFAULT_USER_AGENT)

    body = request.get("body")
    data: Optional[bytes] = None
    if body is not None:
        data = json.dumps(body).encode("utf-8")
        headers["content-type"] = "application/json"
    for key, value in (request.get("headers") or {}).items():
        headers[key] = value

    attempt = 0
    while True:
        status, reason, content_type, text = client.transport(metadata["method"], url, headers, data)
        payload = _parse_payload(content_type, text)
        if 200 <= status < 300:
            return payload
        if (status == 429 or status >= 500) and attempt < client.max_retries:
            time.sleep(0.25 * (attempt + 1))
            attempt += 1
            continue
        raise InstantlyApiError(status, reason, payload)
