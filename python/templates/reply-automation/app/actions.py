from typing import Any, Optional

from instantly import create_instantly_client, InstantlyClient
from instantly.resources.lead import update_lead_interest_status


def get_client(api_key: Optional[str]) -> InstantlyClient:
    if not api_key:
        raise ValueError("INSTANTLY_API_KEY is not set")
    return create_instantly_client(api_key)


def apply_interest(client: InstantlyClient, lead_email: str, interest_value: int) -> Any:
    """Set the lead's interest status. update_lead_interest_status is async (HTTP 202).
    To auto-respond instead, use instantly.resources.email.reply_to_email with the
    payload's email_id (= reply_to_uuid)."""
    return update_lead_interest_status(client, {"body": {"lead_email": lead_email, "interest_value": interest_value}})
