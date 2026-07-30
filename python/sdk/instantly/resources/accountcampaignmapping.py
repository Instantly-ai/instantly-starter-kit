# Generated file. Do not edit manually.
from typing import Any

from ..client import InstantlyClient, execute_operation
from ..generated.metadata import OPERATION_METADATA
from ..generated import operations as ops


def get_account_campaign_mapping(client: InstantlyClient, request: "ops.GetAccountCampaignMappingInput") -> Any:
    return execute_operation(client, OPERATION_METADATA["getAccountCampaignMapping"], request)


__all__ = ["get_account_campaign_mapping"]
