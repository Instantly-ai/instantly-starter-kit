# Generated file. Do not edit manually.
from typing import Any

from ..client import InstantlyClient, execute_operation
from ..generated.metadata import OPERATION_METADATA
from ..generated import operations as ops


def list_email(client: InstantlyClient, request: "ops.ListEmailInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["listEmail"], request)


def forward_email(client: InstantlyClient, request: "ops.ForwardEmailInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["forwardEmail"], request)


def reply_to_email(client: InstantlyClient, request: "ops.ReplyToEmailInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["replyToEmail"], request)


def send_test_email(client: InstantlyClient, request: "ops.SendTestEmailInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["sendTestEmail"], request)


def mark_thread_as_read(client: InstantlyClient, request: "ops.MarkThreadAsReadInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["markThreadAsRead"], request)


def count_unread_emails(client: InstantlyClient, request: "ops.CountUnreadEmailsInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["countUnreadEmails"], request)


def get_email(client: InstantlyClient, request: "ops.GetEmailInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getEmail"], request)


def patch_email(client: InstantlyClient, request: "ops.PatchEmailInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["patchEmail"], request)


def delete_email(client: InstantlyClient, request: "ops.DeleteEmailInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["deleteEmail"], request)


__all__ = ["list_email", "forward_email", "reply_to_email", "send_test_email", "mark_thread_as_read", "count_unread_emails", "get_email", "patch_email", "delete_email"]
