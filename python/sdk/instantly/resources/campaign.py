# Generated file. Do not edit manually.
from typing import Any

from ..client import InstantlyClient, execute_operation
from ..generated.metadata import OPERATION_METADATA
from ..generated import operations as ops


def list_campaign(client: InstantlyClient, request: "ops.ListCampaignInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["listCampaign"], request)


def create_campaign(client: InstantlyClient, request: "ops.CreateCampaignInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["createCampaign"], request)


def get_campaign_analytics(client: InstantlyClient, request: "ops.GetCampaignAnalyticsInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getCampaignAnalytics"], request)


def get_daily_campaign_analytics(client: InstantlyClient, request: "ops.GetDailyCampaignAnalyticsInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getDailyCampaignAnalytics"], request)


def get_campaign_analytics_overview(client: InstantlyClient, request: "ops.GetCampaignAnalyticsOverviewInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getCampaignAnalyticsOverview"], request)


def get_campaign_steps_analytics(client: InstantlyClient, request: "ops.GetCampaignStepsAnalyticsInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getCampaignStepsAnalytics"], request)


def count_launched(client: InstantlyClient, request: "ops.CountLaunchedInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["countLaunched"], request)


def search_by_contact(client: InstantlyClient, request: "ops.SearchByContactInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["searchByContact"], request)


def get_campaign(client: InstantlyClient, request: "ops.GetCampaignInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getCampaign"], request)


def patch_campaign(client: InstantlyClient, request: "ops.PatchCampaignInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["patchCampaign"], request)


def delete_campaign(client: InstantlyClient, request: "ops.DeleteCampaignInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["deleteCampaign"], request)


def activate_campaign(client: InstantlyClient, request: "ops.ActivateCampaignInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["activateCampaign"], request)


def duplicate(client: InstantlyClient, request: "ops.DuplicateInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["duplicate"], request)


def export_campaign(client: InstantlyClient, request: "ops.ExportCampaignInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["exportCampaign"], request)


def create_from_export(client: InstantlyClient, request: "ops.CreateFromExportInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["createFromExport"], request)


def pause_campaign(client: InstantlyClient, request: "ops.PauseCampaignInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["pauseCampaign"], request)


def get_campaign_sending_status(client: InstantlyClient, request: "ops.GetCampaignSendingStatusInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getCampaignSendingStatus"], request)


def share_campaign(client: InstantlyClient, request: "ops.ShareCampaignInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["shareCampaign"], request)


def add_variables(client: InstantlyClient, request: "ops.AddVariablesInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["addVariables"], request)


__all__ = ["list_campaign", "create_campaign", "get_campaign_analytics", "get_daily_campaign_analytics", "get_campaign_analytics_overview", "get_campaign_steps_analytics", "count_launched", "search_by_contact", "get_campaign", "patch_campaign", "delete_campaign", "activate_campaign", "duplicate", "export_campaign", "create_from_export", "pause_campaign", "get_campaign_sending_status", "share_campaign", "add_variables"]
