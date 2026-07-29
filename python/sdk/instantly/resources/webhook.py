# Generated file. Do not edit manually.
from typing import Any

from ..client import InstantlyClient, execute_operation
from ..generated.metadata import OPERATION_METADATA
from ..generated import operations as ops


def list_webhook(client: InstantlyClient, request: "ops.ListWebhookInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["listWebhook"], request)


def create_webhook(client: InstantlyClient, request: "ops.CreateWebhookInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["createWebhook"], request)


def list_webhook_event_types(client: InstantlyClient, request: "ops.ListWebhookEventTypesInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["listWebhookEventTypes"], request)


def get_webhook(client: InstantlyClient, request: "ops.GetWebhookInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getWebhook"], request)


def patch_webhook(client: InstantlyClient, request: "ops.PatchWebhookInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["patchWebhook"], request)


def delete_webhook(client: InstantlyClient, request: "ops.DeleteWebhookInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["deleteWebhook"], request)


def resume_webhook(client: InstantlyClient, request: "ops.ResumeWebhookInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["resumeWebhook"], request)


def test_webhook(client: InstantlyClient, request: "ops.TestWebhookInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["testWebhook"], request)


__all__ = ["list_webhook", "create_webhook", "list_webhook_event_types", "get_webhook", "patch_webhook", "delete_webhook", "resume_webhook", "test_webhook"]
