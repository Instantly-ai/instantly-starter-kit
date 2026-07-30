# Generated file. Do not edit manually.
from typing import Any

from ..client import InstantlyClient, execute_operation
from ..generated.metadata import OPERATION_METADATA
from ..generated import operations as ops


def list_webhook_event(client: InstantlyClient, request: "ops.ListWebhookEventInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["listWebhookEvent"], request)


def get_webhook_events_summary(client: InstantlyClient, request: "ops.GetWebhookEventsSummaryInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getWebhookEventsSummary"], request)


def get_webhook_events_summary_by_date(client: InstantlyClient, request: "ops.GetWebhookEventsSummaryByDateInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getWebhookEventsSummaryByDate"], request)


def get_webhook_event(client: InstantlyClient, request: "ops.GetWebhookEventInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getWebhookEvent"], request)


__all__ = ["list_webhook_event", "get_webhook_events_summary", "get_webhook_events_summary_by_date", "get_webhook_event"]
