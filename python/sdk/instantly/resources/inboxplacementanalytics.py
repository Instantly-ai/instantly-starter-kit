# Generated file. Do not edit manually.
from typing import Any

from ..client import InstantlyClient, execute_operation
from ..generated.metadata import OPERATION_METADATA
from ..generated import operations as ops


def list_inbox_placement_analytics(client: InstantlyClient, request: "ops.ListInboxPlacementAnalyticsInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["listInboxPlacementAnalytics"], request)


def get_inbox_placement_analytics_deliverability_insights(client: InstantlyClient, request: "ops.GetInboxPlacementAnalyticsDeliverabilityInsightsInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getInboxPlacementAnalyticsDeliverabilityInsights"], request)


def get_inbox_placement_analytics_stats_by_date(client: InstantlyClient, request: "ops.GetInboxPlacementAnalyticsStatsByDateInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getInboxPlacementAnalyticsStatsByDate"], request)


def get_inbox_placement_analytics_stats_by_test_id(client: InstantlyClient, request: "ops.GetInboxPlacementAnalyticsStatsByTestIdInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getInboxPlacementAnalyticsStatsByTestId"], request)


def get_inbox_placement_analytics(client: InstantlyClient, request: "ops.GetInboxPlacementAnalyticsInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getInboxPlacementAnalytics"], request)


__all__ = ["list_inbox_placement_analytics", "get_inbox_placement_analytics_deliverability_insights", "get_inbox_placement_analytics_stats_by_date", "get_inbox_placement_analytics_stats_by_test_id", "get_inbox_placement_analytics"]
