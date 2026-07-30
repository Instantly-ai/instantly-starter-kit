# Generated file. Do not edit manually.
from typing import Any

from ..client import InstantlyClient, execute_operation
from ..generated.metadata import OPERATION_METADATA
from ..generated import operations as ops


def list_lead_label(client: InstantlyClient, request: "ops.ListLeadLabelInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["listLeadLabel"], request)


def create_lead_label(client: InstantlyClient, request: "ops.CreateLeadLabelInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["createLeadLabel"], request)


def test_ai_reply_label_lead_labels(client: InstantlyClient, request: "ops.TestAiReplyLabelLeadLabelsInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["testAiReplyLabelLeadLabels"], request)


def get_lead_label(client: InstantlyClient, request: "ops.GetLeadLabelInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getLeadLabel"], request)


def patch_lead_label(client: InstantlyClient, request: "ops.PatchLeadLabelInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["patchLeadLabel"], request)


def delete_lead_label(client: InstantlyClient, request: "ops.DeleteLeadLabelInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["deleteLeadLabel"], request)


__all__ = ["list_lead_label", "create_lead_label", "test_ai_reply_label_lead_labels", "get_lead_label", "patch_lead_label", "delete_lead_label"]
