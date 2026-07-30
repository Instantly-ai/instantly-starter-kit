# Generated file. Do not edit manually.
from typing import Any

from ..client import InstantlyClient, execute_operation
from ..generated.metadata import OPERATION_METADATA
from ..generated import operations as ops


def list_campaign_subsequence(client: InstantlyClient, request: "ops.ListCampaignSubsequenceInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["listCampaignSubsequence"], request)


def create_campaign_subsequence(client: InstantlyClient, request: "ops.CreateCampaignSubsequenceInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["createCampaignSubsequence"], request)


def get_campaign_subsequence(client: InstantlyClient, request: "ops.GetCampaignSubsequenceInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getCampaignSubsequence"], request)


def patch_campaign_subsequence(client: InstantlyClient, request: "ops.PatchCampaignSubsequenceInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["patchCampaignSubsequence"], request)


def delete_campaign_subsequence(client: InstantlyClient, request: "ops.DeleteCampaignSubsequenceInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["deleteCampaignSubsequence"], request)


def duplicate_subsequence(client: InstantlyClient, request: "ops.DuplicateSubsequenceInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["duplicateSubsequence"], request)


def pause_subsequence(client: InstantlyClient, request: "ops.PauseSubsequenceInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["pauseSubsequence"], request)


def resume_subsequence(client: InstantlyClient, request: "ops.ResumeSubsequenceInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["resumeSubsequence"], request)


def get_subsequence_sending_status(client: InstantlyClient, request: "ops.GetSubsequenceSendingStatusInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getSubsequenceSendingStatus"], request)


__all__ = ["list_campaign_subsequence", "create_campaign_subsequence", "get_campaign_subsequence", "patch_campaign_subsequence", "delete_campaign_subsequence", "duplicate_subsequence", "pause_subsequence", "resume_subsequence", "get_subsequence_sending_status"]
