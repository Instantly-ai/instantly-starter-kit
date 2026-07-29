# Generated file. Do not edit manually.
from typing import Any

from ..client import InstantlyClient, execute_operation
from ..generated.metadata import OPERATION_METADATA
from ..generated import operations as ops


def create_super_search_enrichment(client: InstantlyClient, request: "ops.CreateSuperSearchEnrichmentInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["createSuperSearchEnrichment"], request)


def create_ai_enrichment(client: InstantlyClient, request: "ops.CreateAIEnrichmentInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["createAIEnrichment"], request)


def get_ai_enrichment_for_resource(client: InstantlyClient, request: "ops.GetAiEnrichmentForResourceInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getAiEnrichmentForResource"], request)


def count_leads_from_supersearch(client: InstantlyClient, request: "ops.CountLeadsFromSupersearchInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["countLeadsFromSupersearch"], request)


def enrich_leads_from_supersearch(client: InstantlyClient, request: "ops.EnrichLeadsFromSupersearchInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["enrichLeadsFromSupersearch"], request)


def get_enrichment_history(client: InstantlyClient, request: "ops.GetEnrichmentHistoryInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getEnrichmentHistory"], request)


def preview_leads_from_supersearch(client: InstantlyClient, request: "ops.PreviewLeadsFromSupersearchInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["previewLeadsFromSupersearch"], request)


def run_enrichment(client: InstantlyClient, request: "ops.RunEnrichmentInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["runEnrichment"], request)


def signal_keywords_facet(client: InstantlyClient, request: "ops.SignalKeywordsFacetInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["signalKeywordsFacet"], request)


def get_enrichment_for_resource(client: InstantlyClient, request: "ops.GetEnrichmentForResourceInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getEnrichmentForResource"], request)


def update_enrichment_settings_for_resource(client: InstantlyClient, request: "ops.UpdateEnrichmentSettingsForResourceInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["updateEnrichmentSettingsForResource"], request)


__all__ = ["create_super_search_enrichment", "create_ai_enrichment", "get_ai_enrichment_for_resource", "count_leads_from_supersearch", "enrich_leads_from_supersearch", "get_enrichment_history", "preview_leads_from_supersearch", "run_enrichment", "signal_keywords_facet", "get_enrichment_for_resource", "update_enrichment_settings_for_resource"]
