# Generated file. Do not edit manually.
from typing import Any, Dict, List, Literal, Optional, Union, TypedDict

GetAccountCampaignMappingPathParams = TypedDict(
    "GetAccountCampaignMappingPathParams",
    {
        "email": str,
    },
    total=False,
)

GetAccountCampaignMappingQueryParams = TypedDict(
    "GetAccountCampaignMappingQueryParams",
    {
        "limit": float,
        "starting_after": str,
    },
    total=False,
)

GetAccountCampaignMappingInput = TypedDict(
    "GetAccountCampaignMappingInput",
    {
        "path": GetAccountCampaignMappingPathParams,
        "query": GetAccountCampaignMappingQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

ListAccountPathParams = Dict[str, Any]

ListAccountQueryParams = TypedDict(
    "ListAccountQueryParams",
    {
        "limit": int,
        "starting_after": str,
        "search": str,
        "status": Literal[1, 2, 3, -1, -2, -3],
        "provider_code": Literal[1, 2, 3, 4, 8],
        "tag_ids": str,
        "tag_ids_all": str,
        "include_tags": bool,
        "filter": Literal["ACC_FILTER_PAUSED", "ACC_FILTER_ERROR", "ACC_FILTER_NO_CTD", "ACC_FILTER_PW_ACCOUNTS", "ACC_FILTER_DFY", "ACC_FILTER_DFY_SETUP_PENDING", "ACC_FILTER_W_ACTIVE", "ACC_FILTER_W_PAUSED", "ACC_FILTER_W_ERROR"],
        "sort_by": Literal["timestamp_created", "email", "stat_warmup_score", "status"],
        "sort_order": Literal["asc", "desc"],
    },
    total=False,
)

ListAccountInput = TypedDict(
    "ListAccountInput",
    {
        "path": ListAccountPathParams,
        "query": ListAccountQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

CreateAccountPathParams = Dict[str, Any]

CreateAccountQueryParams = Dict[str, Any]

CreateAccountInput = TypedDict(
    "CreateAccountInput",
    {
        "path": CreateAccountPathParams,
        "query": CreateAccountQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetDailyAccountAnalyticsPathParams = Dict[str, Any]

GetDailyAccountAnalyticsQueryParams = TypedDict(
    "GetDailyAccountAnalyticsQueryParams",
    {
        "start_date": str,
        "end_date": str,
        "emails": List[str],
    },
    total=False,
)

GetDailyAccountAnalyticsInput = TypedDict(
    "GetDailyAccountAnalyticsInput",
    {
        "path": GetDailyAccountAnalyticsPathParams,
        "query": GetDailyAccountAnalyticsQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetCtdStatusPathParams = Dict[str, Any]

GetCtdStatusQueryParams = TypedDict(
    "GetCtdStatusQueryParams",
    {
        "host": str,
    },
    total=False,
)

GetCtdStatusInput = TypedDict(
    "GetCtdStatusInput",
    {
        "path": GetCtdStatusPathParams,
        "query": GetCtdStatusQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

MoveAccountsPathParams = Dict[str, Any]

MoveAccountsQueryParams = Dict[str, Any]

MoveAccountsInput = TypedDict(
    "MoveAccountsInput",
    {
        "path": MoveAccountsPathParams,
        "query": MoveAccountsQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

TestAccountVitalsPathParams = Dict[str, Any]

TestAccountVitalsQueryParams = Dict[str, Any]

TestAccountVitalsInput = TypedDict(
    "TestAccountVitalsInput",
    {
        "path": TestAccountVitalsPathParams,
        "query": TestAccountVitalsQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetWarmupAnalyticsPathParams = Dict[str, Any]

GetWarmupAnalyticsQueryParams = Dict[str, Any]

GetWarmupAnalyticsInput = TypedDict(
    "GetWarmupAnalyticsInput",
    {
        "path": GetWarmupAnalyticsPathParams,
        "query": GetWarmupAnalyticsQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

DisableWarmupForAccountsPathParams = Dict[str, Any]

DisableWarmupForAccountsQueryParams = Dict[str, Any]

DisableWarmupForAccountsInput = TypedDict(
    "DisableWarmupForAccountsInput",
    {
        "path": DisableWarmupForAccountsPathParams,
        "query": DisableWarmupForAccountsQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

EnableWarmupForAccountsPathParams = Dict[str, Any]

EnableWarmupForAccountsQueryParams = Dict[str, Any]

EnableWarmupForAccountsInput = TypedDict(
    "EnableWarmupForAccountsInput",
    {
        "path": EnableWarmupForAccountsPathParams,
        "query": EnableWarmupForAccountsQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetAccountPathParams = TypedDict(
    "GetAccountPathParams",
    {
        "email": str,
    },
    total=False,
)

GetAccountQueryParams = Dict[str, Any]

GetAccountInput = TypedDict(
    "GetAccountInput",
    {
        "path": GetAccountPathParams,
        "query": GetAccountQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

PatchAccountPathParams = TypedDict(
    "PatchAccountPathParams",
    {
        "email": str,
    },
    total=False,
)

PatchAccountQueryParams = Dict[str, Any]

PatchAccountInput = TypedDict(
    "PatchAccountInput",
    {
        "path": PatchAccountPathParams,
        "query": PatchAccountQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

DeleteAccountPathParams = TypedDict(
    "DeleteAccountPathParams",
    {
        "email": str,
    },
    total=False,
)

DeleteAccountQueryParams = Dict[str, Any]

DeleteAccountInput = TypedDict(
    "DeleteAccountInput",
    {
        "path": DeleteAccountPathParams,
        "query": DeleteAccountQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

MarkAccountFixedPathParams = TypedDict(
    "MarkAccountFixedPathParams",
    {
        "email": str,
    },
    total=False,
)

MarkAccountFixedQueryParams = Dict[str, Any]

MarkAccountFixedInput = TypedDict(
    "MarkAccountFixedInput",
    {
        "path": MarkAccountFixedPathParams,
        "query": MarkAccountFixedQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

PauseAccountPathParams = TypedDict(
    "PauseAccountPathParams",
    {
        "email": str,
    },
    total=False,
)

PauseAccountQueryParams = Dict[str, Any]

PauseAccountInput = TypedDict(
    "PauseAccountInput",
    {
        "path": PauseAccountPathParams,
        "query": PauseAccountQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

ResumeAccountPathParams = TypedDict(
    "ResumeAccountPathParams",
    {
        "email": str,
    },
    total=False,
)

ResumeAccountQueryParams = Dict[str, Any]

ResumeAccountInput = TypedDict(
    "ResumeAccountInput",
    {
        "path": ResumeAccountPathParams,
        "query": ResumeAccountQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

ListAPIKeyPathParams = Dict[str, Any]

ListAPIKeyQueryParams = TypedDict(
    "ListAPIKeyQueryParams",
    {
        "limit": int,
        "starting_after": str,
    },
    total=False,
)

ListAPIKeyInput = TypedDict(
    "ListAPIKeyInput",
    {
        "path": ListAPIKeyPathParams,
        "query": ListAPIKeyQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

CreateAPIKeyPathParams = Dict[str, Any]

CreateAPIKeyQueryParams = Dict[str, Any]

CreateAPIKeyInput = TypedDict(
    "CreateAPIKeyInput",
    {
        "path": CreateAPIKeyPathParams,
        "query": CreateAPIKeyQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

DeleteAPIKeyPathParams = TypedDict(
    "DeleteAPIKeyPathParams",
    {
        "id": str,
    },
    total=False,
)

DeleteAPIKeyQueryParams = Dict[str, Any]

DeleteAPIKeyInput = TypedDict(
    "DeleteAPIKeyInput",
    {
        "path": DeleteAPIKeyPathParams,
        "query": DeleteAPIKeyQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

ListAuditLogPathParams = Dict[str, Any]

ListAuditLogQueryParams = TypedDict(
    "ListAuditLogQueryParams",
    {
        "limit": int,
        "starting_after": str,
        "activity_type": float,
        "search": str,
        "start_date": str,
        "end_date": str,
    },
    total=False,
)

ListAuditLogInput = TypedDict(
    "ListAuditLogInput",
    {
        "path": ListAuditLogPathParams,
        "query": ListAuditLogQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

ListBackgroundJobPathParams = Dict[str, Any]

ListBackgroundJobQueryParams = TypedDict(
    "ListBackgroundJobQueryParams",
    {
        "limit": int,
        "starting_after": str,
        "ids": str,
        "included_ids": str,
        "excluded_ids": str,
        "type": Literal["move-leads", "import-leads", "export-leads", "update-warmup-accounts", "rename-variable", "broadcast-ai-generate", "broadcast-website-scrape", "import-subscribers-from-crm", "resync-subscriber-crm-tags"],
        "entity_type": Literal["list", "campaign", "workspace", "broadcast", "subscriber-group-sync", "subscriber-group"],
        "entity_id": str,
        "status": str,
        "sort_column": Literal["created_at", "updated_at"],
        "sort_order": Literal["asc", "desc"],
    },
    total=False,
)

ListBackgroundJobInput = TypedDict(
    "ListBackgroundJobInput",
    {
        "path": ListBackgroundJobPathParams,
        "query": ListBackgroundJobQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetBackgroundJobPathParams = TypedDict(
    "GetBackgroundJobPathParams",
    {
        "id": str,
    },
    total=False,
)

GetBackgroundJobQueryParams = TypedDict(
    "GetBackgroundJobQueryParams",
    {
        "data_fields": str,
    },
    total=False,
)

GetBackgroundJobInput = TypedDict(
    "GetBackgroundJobInput",
    {
        "path": GetBackgroundJobPathParams,
        "query": GetBackgroundJobQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

ListBlockListEntryPathParams = Dict[str, Any]

ListBlockListEntryQueryParams = TypedDict(
    "ListBlockListEntryQueryParams",
    {
        "limit": int,
        "starting_after": str,
        "domains_only": bool,
        "search": str,
    },
    total=False,
)

ListBlockListEntryInput = TypedDict(
    "ListBlockListEntryInput",
    {
        "path": ListBlockListEntryPathParams,
        "query": ListBlockListEntryQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

CreateBlockListEntryPathParams = Dict[str, Any]

CreateBlockListEntryQueryParams = Dict[str, Any]

CreateBlockListEntryInput = TypedDict(
    "CreateBlockListEntryInput",
    {
        "path": CreateBlockListEntryPathParams,
        "query": CreateBlockListEntryQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

DeleteallBlockListEntryPathParams = Dict[str, Any]

DeleteallBlockListEntryQueryParams = TypedDict(
    "DeleteallBlockListEntryQueryParams",
    {
        "domains_only": bool,
        "search": str,
    },
    total=False,
)

DeleteallBlockListEntryInput = TypedDict(
    "DeleteallBlockListEntryInput",
    {
        "path": DeleteallBlockListEntryPathParams,
        "query": DeleteallBlockListEntryQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

CreateblukBlockListEntryPathParams = Dict[str, Any]

CreateblukBlockListEntryQueryParams = Dict[str, Any]

CreateblukBlockListEntryInput = TypedDict(
    "CreateblukBlockListEntryInput",
    {
        "path": CreateblukBlockListEntryPathParams,
        "query": CreateblukBlockListEntryQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

DeletebulkBlockListEntryPathParams = Dict[str, Any]

DeletebulkBlockListEntryQueryParams = Dict[str, Any]

DeletebulkBlockListEntryInput = TypedDict(
    "DeletebulkBlockListEntryInput",
    {
        "path": DeletebulkBlockListEntryPathParams,
        "query": DeletebulkBlockListEntryQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

DownloadBlockListEntryPathParams = Dict[str, Any]

DownloadBlockListEntryQueryParams = TypedDict(
    "DownloadBlockListEntryQueryParams",
    {
        "domains_only": bool,
        "search": str,
    },
    total=False,
)

DownloadBlockListEntryInput = TypedDict(
    "DownloadBlockListEntryInput",
    {
        "path": DownloadBlockListEntryPathParams,
        "query": DownloadBlockListEntryQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetBlockListEntryPathParams = TypedDict(
    "GetBlockListEntryPathParams",
    {
        "id": str,
    },
    total=False,
)

GetBlockListEntryQueryParams = Dict[str, Any]

GetBlockListEntryInput = TypedDict(
    "GetBlockListEntryInput",
    {
        "path": GetBlockListEntryPathParams,
        "query": GetBlockListEntryQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

PatchBlockListEntryPathParams = TypedDict(
    "PatchBlockListEntryPathParams",
    {
        "id": str,
    },
    total=False,
)

PatchBlockListEntryQueryParams = Dict[str, Any]

PatchBlockListEntryInput = TypedDict(
    "PatchBlockListEntryInput",
    {
        "path": PatchBlockListEntryPathParams,
        "query": PatchBlockListEntryQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

DeleteBlockListEntryPathParams = TypedDict(
    "DeleteBlockListEntryPathParams",
    {
        "id": str,
    },
    total=False,
)

DeleteBlockListEntryQueryParams = Dict[str, Any]

DeleteBlockListEntryInput = TypedDict(
    "DeleteBlockListEntryInput",
    {
        "path": DeleteBlockListEntryPathParams,
        "query": DeleteBlockListEntryQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

ListCampaignPathParams = Dict[str, Any]

ListCampaignQueryParams = TypedDict(
    "ListCampaignQueryParams",
    {
        "limit": int,
        "starting_after": str,
        "search": str,
        "tag_ids": str,
        "ai_sales_agent_id": str,
        "status": Literal[-99, -1, -2, 0, 1, 2, 3, 4],
    },
    total=False,
)

ListCampaignInput = TypedDict(
    "ListCampaignInput",
    {
        "path": ListCampaignPathParams,
        "query": ListCampaignQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

CreateCampaignPathParams = Dict[str, Any]

CreateCampaignQueryParams = Dict[str, Any]

CreateCampaignInput = TypedDict(
    "CreateCampaignInput",
    {
        "path": CreateCampaignPathParams,
        "query": CreateCampaignQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetCampaignAnalyticsPathParams = Dict[str, Any]

GetCampaignAnalyticsQueryParams = TypedDict(
    "GetCampaignAnalyticsQueryParams",
    {
        "id": str,
        "ids": List[str],
        "start_date": str,
        "end_date": str,
        "exclude_total_leads_count": bool,
    },
    total=False,
)

GetCampaignAnalyticsInput = TypedDict(
    "GetCampaignAnalyticsInput",
    {
        "path": GetCampaignAnalyticsPathParams,
        "query": GetCampaignAnalyticsQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetDailyCampaignAnalyticsPathParams = Dict[str, Any]

GetDailyCampaignAnalyticsQueryParams = TypedDict(
    "GetDailyCampaignAnalyticsQueryParams",
    {
        "campaign_id": str,
        "start_date": str,
        "end_date": str,
        "campaign_status": Literal[-99, -1, -2, 0, 1, 2, 3, 4],
    },
    total=False,
)

GetDailyCampaignAnalyticsInput = TypedDict(
    "GetDailyCampaignAnalyticsInput",
    {
        "path": GetDailyCampaignAnalyticsPathParams,
        "query": GetDailyCampaignAnalyticsQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetCampaignAnalyticsOverviewPathParams = Dict[str, Any]

GetCampaignAnalyticsOverviewQueryParams = TypedDict(
    "GetCampaignAnalyticsOverviewQueryParams",
    {
        "id": str,
        "ids": List[str],
        "start_date": str,
        "end_date": str,
        "campaign_status": Literal[-99, -1, -2, 0, 1, 2, 3, 4],
        "expand_crm_events": bool,
    },
    total=False,
)

GetCampaignAnalyticsOverviewInput = TypedDict(
    "GetCampaignAnalyticsOverviewInput",
    {
        "path": GetCampaignAnalyticsOverviewPathParams,
        "query": GetCampaignAnalyticsOverviewQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetCampaignStepsAnalyticsPathParams = Dict[str, Any]

GetCampaignStepsAnalyticsQueryParams = TypedDict(
    "GetCampaignStepsAnalyticsQueryParams",
    {
        "campaign_id": str,
        "start_date": str,
        "end_date": str,
        "include_opportunities_count": bool,
    },
    total=False,
)

GetCampaignStepsAnalyticsInput = TypedDict(
    "GetCampaignStepsAnalyticsInput",
    {
        "path": GetCampaignStepsAnalyticsPathParams,
        "query": GetCampaignStepsAnalyticsQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

CountLaunchedPathParams = Dict[str, Any]

CountLaunchedQueryParams = Dict[str, Any]

CountLaunchedInput = TypedDict(
    "CountLaunchedInput",
    {
        "path": CountLaunchedPathParams,
        "query": CountLaunchedQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

SearchByContactPathParams = Dict[str, Any]

SearchByContactQueryParams = TypedDict(
    "SearchByContactQueryParams",
    {
        "search": str,
        "sort_column": str,
        "sort_order": str,
    },
    total=False,
)

SearchByContactInput = TypedDict(
    "SearchByContactInput",
    {
        "path": SearchByContactPathParams,
        "query": SearchByContactQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetCampaignPathParams = TypedDict(
    "GetCampaignPathParams",
    {
        "id": str,
    },
    total=False,
)

GetCampaignQueryParams = Dict[str, Any]

GetCampaignInput = TypedDict(
    "GetCampaignInput",
    {
        "path": GetCampaignPathParams,
        "query": GetCampaignQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

PatchCampaignPathParams = TypedDict(
    "PatchCampaignPathParams",
    {
        "id": str,
    },
    total=False,
)

PatchCampaignQueryParams = Dict[str, Any]

PatchCampaignInput = TypedDict(
    "PatchCampaignInput",
    {
        "path": PatchCampaignPathParams,
        "query": PatchCampaignQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

DeleteCampaignPathParams = TypedDict(
    "DeleteCampaignPathParams",
    {
        "id": str,
    },
    total=False,
)

DeleteCampaignQueryParams = Dict[str, Any]

DeleteCampaignInput = TypedDict(
    "DeleteCampaignInput",
    {
        "path": DeleteCampaignPathParams,
        "query": DeleteCampaignQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

ActivateCampaignPathParams = TypedDict(
    "ActivateCampaignPathParams",
    {
        "id": str,
    },
    total=False,
)

ActivateCampaignQueryParams = Dict[str, Any]

ActivateCampaignInput = TypedDict(
    "ActivateCampaignInput",
    {
        "path": ActivateCampaignPathParams,
        "query": ActivateCampaignQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

DuplicatePathParams = TypedDict(
    "DuplicatePathParams",
    {
        "id": str,
    },
    total=False,
)

DuplicateQueryParams = Dict[str, Any]

DuplicateInput = TypedDict(
    "DuplicateInput",
    {
        "path": DuplicatePathParams,
        "query": DuplicateQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

ExportCampaignPathParams = TypedDict(
    "ExportCampaignPathParams",
    {
        "id": str,
    },
    total=False,
)

ExportCampaignQueryParams = Dict[str, Any]

ExportCampaignInput = TypedDict(
    "ExportCampaignInput",
    {
        "path": ExportCampaignPathParams,
        "query": ExportCampaignQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

CreateFromExportPathParams = TypedDict(
    "CreateFromExportPathParams",
    {
        "id": str,
    },
    total=False,
)

CreateFromExportQueryParams = Dict[str, Any]

CreateFromExportInput = TypedDict(
    "CreateFromExportInput",
    {
        "path": CreateFromExportPathParams,
        "query": CreateFromExportQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

PauseCampaignPathParams = TypedDict(
    "PauseCampaignPathParams",
    {
        "id": str,
    },
    total=False,
)

PauseCampaignQueryParams = Dict[str, Any]

PauseCampaignInput = TypedDict(
    "PauseCampaignInput",
    {
        "path": PauseCampaignPathParams,
        "query": PauseCampaignQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetCampaignSendingStatusPathParams = TypedDict(
    "GetCampaignSendingStatusPathParams",
    {
        "id": str,
    },
    total=False,
)

GetCampaignSendingStatusQueryParams = TypedDict(
    "GetCampaignSendingStatusQueryParams",
    {
        "with_ai_summary": bool,
    },
    total=False,
)

GetCampaignSendingStatusInput = TypedDict(
    "GetCampaignSendingStatusInput",
    {
        "path": GetCampaignSendingStatusPathParams,
        "query": GetCampaignSendingStatusQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

ShareCampaignPathParams = TypedDict(
    "ShareCampaignPathParams",
    {
        "id": str,
    },
    total=False,
)

ShareCampaignQueryParams = Dict[str, Any]

ShareCampaignInput = TypedDict(
    "ShareCampaignInput",
    {
        "path": ShareCampaignPathParams,
        "query": ShareCampaignQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

AddVariablesPathParams = TypedDict(
    "AddVariablesPathParams",
    {
        "id": str,
    },
    total=False,
)

AddVariablesQueryParams = Dict[str, Any]

AddVariablesInput = TypedDict(
    "AddVariablesInput",
    {
        "path": AddVariablesPathParams,
        "query": AddVariablesQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

ListPhoneNumbersPathParams = Dict[str, Any]

ListPhoneNumbersQueryParams = Dict[str, Any]

ListPhoneNumbersInput = TypedDict(
    "ListPhoneNumbersInput",
    {
        "path": ListPhoneNumbersPathParams,
        "query": ListPhoneNumbersQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

DeletePhoneNumberPathParams = TypedDict(
    "DeletePhoneNumberPathParams",
    {
        "id": str,
    },
    total=False,
)

DeletePhoneNumberQueryParams = Dict[str, Any]

DeletePhoneNumberInput = TypedDict(
    "DeletePhoneNumberInput",
    {
        "path": DeletePhoneNumberPathParams,
        "query": DeletePhoneNumberQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

ListCustomTagMappingPathParams = Dict[str, Any]

ListCustomTagMappingQueryParams = TypedDict(
    "ListCustomTagMappingQueryParams",
    {
        "limit": int,
        "starting_after": str,
        "resource_ids": str,
    },
    total=False,
)

ListCustomTagMappingInput = TypedDict(
    "ListCustomTagMappingInput",
    {
        "path": ListCustomTagMappingPathParams,
        "query": ListCustomTagMappingQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

ListCustomTagPathParams = Dict[str, Any]

ListCustomTagQueryParams = TypedDict(
    "ListCustomTagQueryParams",
    {
        "limit": int,
        "starting_after": str,
        "search": str,
        "resource_ids": str,
        "tag_ids": str,
    },
    total=False,
)

ListCustomTagInput = TypedDict(
    "ListCustomTagInput",
    {
        "path": ListCustomTagPathParams,
        "query": ListCustomTagQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

CreateCustomTagPathParams = Dict[str, Any]

CreateCustomTagQueryParams = Dict[str, Any]

CreateCustomTagInput = TypedDict(
    "CreateCustomTagInput",
    {
        "path": CreateCustomTagPathParams,
        "query": CreateCustomTagQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

ToggleTagResourcePathParams = Dict[str, Any]

ToggleTagResourceQueryParams = Dict[str, Any]

ToggleTagResourceInput = TypedDict(
    "ToggleTagResourceInput",
    {
        "path": ToggleTagResourcePathParams,
        "query": ToggleTagResourceQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetCustomTagPathParams = TypedDict(
    "GetCustomTagPathParams",
    {
        "id": str,
    },
    total=False,
)

GetCustomTagQueryParams = Dict[str, Any]

GetCustomTagInput = TypedDict(
    "GetCustomTagInput",
    {
        "path": GetCustomTagPathParams,
        "query": GetCustomTagQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

PatchCustomTagPathParams = TypedDict(
    "PatchCustomTagPathParams",
    {
        "id": str,
    },
    total=False,
)

PatchCustomTagQueryParams = Dict[str, Any]

PatchCustomTagInput = TypedDict(
    "PatchCustomTagInput",
    {
        "path": PatchCustomTagPathParams,
        "query": PatchCustomTagQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

DeleteCustomTagPathParams = TypedDict(
    "DeleteCustomTagPathParams",
    {
        "id": str,
    },
    total=False,
)

DeleteCustomTagQueryParams = Dict[str, Any]

DeleteCustomTagInput = TypedDict(
    "DeleteCustomTagInput",
    {
        "path": DeleteCustomTagPathParams,
        "query": DeleteCustomTagQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

ListDFYEmailAccountOrderPathParams = Dict[str, Any]

ListDFYEmailAccountOrderQueryParams = TypedDict(
    "ListDFYEmailAccountOrderQueryParams",
    {
        "limit": int,
        "starting_after": str,
    },
    total=False,
)

ListDFYEmailAccountOrderInput = TypedDict(
    "ListDFYEmailAccountOrderInput",
    {
        "path": ListDFYEmailAccountOrderPathParams,
        "query": ListDFYEmailAccountOrderQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

CreateDFYEmailAccountOrderPathParams = Dict[str, Any]

CreateDFYEmailAccountOrderQueryParams = Dict[str, Any]

CreateDFYEmailAccountOrderInput = TypedDict(
    "CreateDFYEmailAccountOrderInput",
    {
        "path": CreateDFYEmailAccountOrderPathParams,
        "query": CreateDFYEmailAccountOrderQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

ListDFYEmailAccountOrdersAccountsPathParams = Dict[str, Any]

ListDFYEmailAccountOrdersAccountsQueryParams = TypedDict(
    "ListDFYEmailAccountOrdersAccountsQueryParams",
    {
        "limit": int,
        "starting_after": str,
        "with_passwords": bool,
    },
    total=False,
)

ListDFYEmailAccountOrdersAccountsInput = TypedDict(
    "ListDFYEmailAccountOrdersAccountsInput",
    {
        "path": ListDFYEmailAccountOrdersAccountsPathParams,
        "query": ListDFYEmailAccountOrdersAccountsQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

CancelDFYEmailAccountsPathParams = Dict[str, Any]

CancelDFYEmailAccountsQueryParams = Dict[str, Any]

CancelDFYEmailAccountsInput = TypedDict(
    "CancelDFYEmailAccountsInput",
    {
        "path": CancelDFYEmailAccountsPathParams,
        "query": CancelDFYEmailAccountsQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

CheckDomainsAvailabilityPathParams = Dict[str, Any]

CheckDomainsAvailabilityQueryParams = Dict[str, Any]

CheckDomainsAvailabilityInput = TypedDict(
    "CheckDomainsAvailabilityInput",
    {
        "path": CheckDomainsAvailabilityPathParams,
        "query": CheckDomainsAvailabilityQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

PreWarmedUpDomainsListPathParams = Dict[str, Any]

PreWarmedUpDomainsListQueryParams = Dict[str, Any]

PreWarmedUpDomainsListInput = TypedDict(
    "PreWarmedUpDomainsListInput",
    {
        "path": PreWarmedUpDomainsListPathParams,
        "query": PreWarmedUpDomainsListQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GenerateSimilarDomainsPathParams = Dict[str, Any]

GenerateSimilarDomainsQueryParams = Dict[str, Any]

GenerateSimilarDomainsInput = TypedDict(
    "GenerateSimilarDomainsInput",
    {
        "path": GenerateSimilarDomainsPathParams,
        "query": GenerateSimilarDomainsQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

CreateEmailVerificationPathParams = Dict[str, Any]

CreateEmailVerificationQueryParams = Dict[str, Any]

CreateEmailVerificationInput = TypedDict(
    "CreateEmailVerificationInput",
    {
        "path": CreateEmailVerificationPathParams,
        "query": CreateEmailVerificationQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

CheckVerificationStatusPathParams = TypedDict(
    "CheckVerificationStatusPathParams",
    {
        "email": str,
    },
    total=False,
)

CheckVerificationStatusQueryParams = Dict[str, Any]

CheckVerificationStatusInput = TypedDict(
    "CheckVerificationStatusInput",
    {
        "path": CheckVerificationStatusPathParams,
        "query": CheckVerificationStatusQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

ListEmailPathParams = Dict[str, Any]

ListEmailQueryParams = TypedDict(
    "ListEmailQueryParams",
    {
        "limit": int,
        "starting_after": str,
        "search": str,
        "campaign_id": str,
        "list_id": str,
        "i_status": float,
        "eaccount": str,
        "is_unread": bool,
        "has_reminder": bool,
        "mode": Literal["emode_focused", "emode_others", "emode_all"],
        "preview_only": bool,
        "sort_order": Literal["asc", "desc"],
        "scheduled_only": bool,
        "assigned_to": str,
        "lead": str,
        "company_domain": str,
        "marked_as_done": bool,
        "email_type": Literal["received", "sent", "manual"],
        "min_timestamp_created": str,
        "max_timestamp_created": str,
        "latest_of_thread": bool,
    },
    total=False,
)

ListEmailInput = TypedDict(
    "ListEmailInput",
    {
        "path": ListEmailPathParams,
        "query": ListEmailQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

ForwardEmailPathParams = Dict[str, Any]

ForwardEmailQueryParams = Dict[str, Any]

ForwardEmailInput = TypedDict(
    "ForwardEmailInput",
    {
        "path": ForwardEmailPathParams,
        "query": ForwardEmailQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

ReplyToEmailPathParams = Dict[str, Any]

ReplyToEmailQueryParams = Dict[str, Any]

ReplyToEmailInput = TypedDict(
    "ReplyToEmailInput",
    {
        "path": ReplyToEmailPathParams,
        "query": ReplyToEmailQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

SendTestEmailPathParams = Dict[str, Any]

SendTestEmailQueryParams = Dict[str, Any]

SendTestEmailInput = TypedDict(
    "SendTestEmailInput",
    {
        "path": SendTestEmailPathParams,
        "query": SendTestEmailQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

MarkThreadAsReadPathParams = TypedDict(
    "MarkThreadAsReadPathParams",
    {
        "thread_id": str,
    },
    total=False,
)

MarkThreadAsReadQueryParams = Dict[str, Any]

MarkThreadAsReadInput = TypedDict(
    "MarkThreadAsReadInput",
    {
        "path": MarkThreadAsReadPathParams,
        "query": MarkThreadAsReadQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

CountUnreadEmailsPathParams = Dict[str, Any]

CountUnreadEmailsQueryParams = Dict[str, Any]

CountUnreadEmailsInput = TypedDict(
    "CountUnreadEmailsInput",
    {
        "path": CountUnreadEmailsPathParams,
        "query": CountUnreadEmailsQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetEmailPathParams = TypedDict(
    "GetEmailPathParams",
    {
        "id": str,
    },
    total=False,
)

GetEmailQueryParams = Dict[str, Any]

GetEmailInput = TypedDict(
    "GetEmailInput",
    {
        "path": GetEmailPathParams,
        "query": GetEmailQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

PatchEmailPathParams = TypedDict(
    "PatchEmailPathParams",
    {
        "id": str,
    },
    total=False,
)

PatchEmailQueryParams = Dict[str, Any]

PatchEmailInput = TypedDict(
    "PatchEmailInput",
    {
        "path": PatchEmailPathParams,
        "query": PatchEmailQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

DeleteEmailPathParams = TypedDict(
    "DeleteEmailPathParams",
    {
        "id": str,
    },
    total=False,
)

DeleteEmailQueryParams = Dict[str, Any]

DeleteEmailInput = TypedDict(
    "DeleteEmailInput",
    {
        "path": DeleteEmailPathParams,
        "query": DeleteEmailQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

ListInboxPlacementAnalyticsPathParams = Dict[str, Any]

ListInboxPlacementAnalyticsQueryParams = TypedDict(
    "ListInboxPlacementAnalyticsQueryParams",
    {
        "limit": int,
        "starting_after": str,
        "test_id": str,
        "date_from": str,
        "date_to": str,
        "recipient_geo": str,
        "recipient_type": str,
        "recipient_esp": str,
        "sender_email": str,
    },
    total=False,
)

ListInboxPlacementAnalyticsInput = TypedDict(
    "ListInboxPlacementAnalyticsInput",
    {
        "path": ListInboxPlacementAnalyticsPathParams,
        "query": ListInboxPlacementAnalyticsQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetInboxPlacementAnalyticsDeliverabilityInsightsPathParams = Dict[str, Any]

GetInboxPlacementAnalyticsDeliverabilityInsightsQueryParams = Dict[str, Any]

GetInboxPlacementAnalyticsDeliverabilityInsightsInput = TypedDict(
    "GetInboxPlacementAnalyticsDeliverabilityInsightsInput",
    {
        "path": GetInboxPlacementAnalyticsDeliverabilityInsightsPathParams,
        "query": GetInboxPlacementAnalyticsDeliverabilityInsightsQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetInboxPlacementAnalyticsStatsByDatePathParams = Dict[str, Any]

GetInboxPlacementAnalyticsStatsByDateQueryParams = Dict[str, Any]

GetInboxPlacementAnalyticsStatsByDateInput = TypedDict(
    "GetInboxPlacementAnalyticsStatsByDateInput",
    {
        "path": GetInboxPlacementAnalyticsStatsByDatePathParams,
        "query": GetInboxPlacementAnalyticsStatsByDateQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetInboxPlacementAnalyticsStatsByTestIdPathParams = Dict[str, Any]

GetInboxPlacementAnalyticsStatsByTestIdQueryParams = Dict[str, Any]

GetInboxPlacementAnalyticsStatsByTestIdInput = TypedDict(
    "GetInboxPlacementAnalyticsStatsByTestIdInput",
    {
        "path": GetInboxPlacementAnalyticsStatsByTestIdPathParams,
        "query": GetInboxPlacementAnalyticsStatsByTestIdQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetInboxPlacementAnalyticsPathParams = TypedDict(
    "GetInboxPlacementAnalyticsPathParams",
    {
        "id": str,
    },
    total=False,
)

GetInboxPlacementAnalyticsQueryParams = Dict[str, Any]

GetInboxPlacementAnalyticsInput = TypedDict(
    "GetInboxPlacementAnalyticsInput",
    {
        "path": GetInboxPlacementAnalyticsPathParams,
        "query": GetInboxPlacementAnalyticsQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

ListInboxPlacementBlacklistAndSpamAssassinReportPathParams = Dict[str, Any]

ListInboxPlacementBlacklistAndSpamAssassinReportQueryParams = TypedDict(
    "ListInboxPlacementBlacklistAndSpamAssassinReportQueryParams",
    {
        "limit": int,
        "starting_after": str,
        "test_id": str,
        "date_from": str,
        "date_to": str,
        "skip_spam_assassin_report": bool,
        "skip_blacklist_report": bool,
    },
    total=False,
)

ListInboxPlacementBlacklistAndSpamAssassinReportInput = TypedDict(
    "ListInboxPlacementBlacklistAndSpamAssassinReportInput",
    {
        "path": ListInboxPlacementBlacklistAndSpamAssassinReportPathParams,
        "query": ListInboxPlacementBlacklistAndSpamAssassinReportQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetInboxPlacementBlacklistAndSpamAssassinReportPathParams = TypedDict(
    "GetInboxPlacementBlacklistAndSpamAssassinReportPathParams",
    {
        "id": str,
    },
    total=False,
)

GetInboxPlacementBlacklistAndSpamAssassinReportQueryParams = Dict[str, Any]

GetInboxPlacementBlacklistAndSpamAssassinReportInput = TypedDict(
    "GetInboxPlacementBlacklistAndSpamAssassinReportInput",
    {
        "path": GetInboxPlacementBlacklistAndSpamAssassinReportPathParams,
        "query": GetInboxPlacementBlacklistAndSpamAssassinReportQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

ListInboxPlacementTestPathParams = Dict[str, Any]

ListInboxPlacementTestQueryParams = TypedDict(
    "ListInboxPlacementTestQueryParams",
    {
        "limit": int,
        "starting_after": str,
        "search": str,
        "status": Literal[1, 2, 3],
        "sort_order": Literal["asc", "desc"],
    },
    total=False,
)

ListInboxPlacementTestInput = TypedDict(
    "ListInboxPlacementTestInput",
    {
        "path": ListInboxPlacementTestPathParams,
        "query": ListInboxPlacementTestQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

CreateInboxPlacementTestPathParams = Dict[str, Any]

CreateInboxPlacementTestQueryParams = Dict[str, Any]

CreateInboxPlacementTestInput = TypedDict(
    "CreateInboxPlacementTestInput",
    {
        "path": CreateInboxPlacementTestPathParams,
        "query": CreateInboxPlacementTestQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetInboxPlacementTestESPOptionsPathParams = Dict[str, Any]

GetInboxPlacementTestESPOptionsQueryParams = Dict[str, Any]

GetInboxPlacementTestESPOptionsInput = TypedDict(
    "GetInboxPlacementTestESPOptionsInput",
    {
        "path": GetInboxPlacementTestESPOptionsPathParams,
        "query": GetInboxPlacementTestESPOptionsQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetInboxPlacementTestPathParams = TypedDict(
    "GetInboxPlacementTestPathParams",
    {
        "id": str,
    },
    total=False,
)

GetInboxPlacementTestQueryParams = TypedDict(
    "GetInboxPlacementTestQueryParams",
    {
        "with_metadata": bool,
    },
    total=False,
)

GetInboxPlacementTestInput = TypedDict(
    "GetInboxPlacementTestInput",
    {
        "path": GetInboxPlacementTestPathParams,
        "query": GetInboxPlacementTestQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

PatchInboxPlacementTestPathParams = TypedDict(
    "PatchInboxPlacementTestPathParams",
    {
        "id": str,
    },
    total=False,
)

PatchInboxPlacementTestQueryParams = Dict[str, Any]

PatchInboxPlacementTestInput = TypedDict(
    "PatchInboxPlacementTestInput",
    {
        "path": PatchInboxPlacementTestPathParams,
        "query": PatchInboxPlacementTestQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

DeleteInboxPlacementTestPathParams = TypedDict(
    "DeleteInboxPlacementTestPathParams",
    {
        "id": str,
    },
    total=False,
)

DeleteInboxPlacementTestQueryParams = Dict[str, Any]

DeleteInboxPlacementTestInput = TypedDict(
    "DeleteInboxPlacementTestInput",
    {
        "path": DeleteInboxPlacementTestPathParams,
        "query": DeleteInboxPlacementTestQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

ListLeadLabelPathParams = Dict[str, Any]

ListLeadLabelQueryParams = TypedDict(
    "ListLeadLabelQueryParams",
    {
        "limit": int,
        "starting_after": str,
        "search": str,
        "interest_status": Literal["positive", "neutral", "negative"],
    },
    total=False,
)

ListLeadLabelInput = TypedDict(
    "ListLeadLabelInput",
    {
        "path": ListLeadLabelPathParams,
        "query": ListLeadLabelQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

CreateLeadLabelPathParams = Dict[str, Any]

CreateLeadLabelQueryParams = Dict[str, Any]

CreateLeadLabelInput = TypedDict(
    "CreateLeadLabelInput",
    {
        "path": CreateLeadLabelPathParams,
        "query": CreateLeadLabelQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

TestAiReplyLabelLeadLabelsPathParams = Dict[str, Any]

TestAiReplyLabelLeadLabelsQueryParams = Dict[str, Any]

TestAiReplyLabelLeadLabelsInput = TypedDict(
    "TestAiReplyLabelLeadLabelsInput",
    {
        "path": TestAiReplyLabelLeadLabelsPathParams,
        "query": TestAiReplyLabelLeadLabelsQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetLeadLabelPathParams = TypedDict(
    "GetLeadLabelPathParams",
    {
        "id": str,
    },
    total=False,
)

GetLeadLabelQueryParams = Dict[str, Any]

GetLeadLabelInput = TypedDict(
    "GetLeadLabelInput",
    {
        "path": GetLeadLabelPathParams,
        "query": GetLeadLabelQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

PatchLeadLabelPathParams = TypedDict(
    "PatchLeadLabelPathParams",
    {
        "id": str,
    },
    total=False,
)

PatchLeadLabelQueryParams = Dict[str, Any]

PatchLeadLabelInput = TypedDict(
    "PatchLeadLabelInput",
    {
        "path": PatchLeadLabelPathParams,
        "query": PatchLeadLabelQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

DeleteLeadLabelPathParams = TypedDict(
    "DeleteLeadLabelPathParams",
    {
        "id": str,
    },
    total=False,
)

DeleteLeadLabelQueryParams = Dict[str, Any]

DeleteLeadLabelInput = TypedDict(
    "DeleteLeadLabelInput",
    {
        "path": DeleteLeadLabelPathParams,
        "query": DeleteLeadLabelQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

ListLeadListPathParams = Dict[str, Any]

ListLeadListQueryParams = TypedDict(
    "ListLeadListQueryParams",
    {
        "limit": int,
        "starting_after": str,
        "has_enrichment_task": bool,
        "search": str,
    },
    total=False,
)

ListLeadListInput = TypedDict(
    "ListLeadListInput",
    {
        "path": ListLeadListPathParams,
        "query": ListLeadListQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

CreateLeadListPathParams = Dict[str, Any]

CreateLeadListQueryParams = Dict[str, Any]

CreateLeadListInput = TypedDict(
    "CreateLeadListInput",
    {
        "path": CreateLeadListPathParams,
        "query": CreateLeadListQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetLeadListPathParams = TypedDict(
    "GetLeadListPathParams",
    {
        "id": str,
    },
    total=False,
)

GetLeadListQueryParams = Dict[str, Any]

GetLeadListInput = TypedDict(
    "GetLeadListInput",
    {
        "path": GetLeadListPathParams,
        "query": GetLeadListQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

PatchLeadListPathParams = TypedDict(
    "PatchLeadListPathParams",
    {
        "id": str,
    },
    total=False,
)

PatchLeadListQueryParams = Dict[str, Any]

PatchLeadListInput = TypedDict(
    "PatchLeadListInput",
    {
        "path": PatchLeadListPathParams,
        "query": PatchLeadListQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

DeleteLeadListPathParams = TypedDict(
    "DeleteLeadListPathParams",
    {
        "id": str,
    },
    total=False,
)

DeleteLeadListQueryParams = Dict[str, Any]

DeleteLeadListInput = TypedDict(
    "DeleteLeadListInput",
    {
        "path": DeleteLeadListPathParams,
        "query": DeleteLeadListQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetVerificationStatsPathParams = TypedDict(
    "GetVerificationStatsPathParams",
    {
        "id": str,
    },
    total=False,
)

GetVerificationStatsQueryParams = Dict[str, Any]

GetVerificationStatsInput = TypedDict(
    "GetVerificationStatsInput",
    {
        "path": GetVerificationStatsPathParams,
        "query": GetVerificationStatsQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

CreateLeadPathParams = Dict[str, Any]

CreateLeadQueryParams = Dict[str, Any]

CreateLeadInput = TypedDict(
    "CreateLeadInput",
    {
        "path": CreateLeadPathParams,
        "query": CreateLeadQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

BulkDeleteLeadsPathParams = Dict[str, Any]

BulkDeleteLeadsQueryParams = Dict[str, Any]

BulkDeleteLeadsInput = TypedDict(
    "BulkDeleteLeadsInput",
    {
        "path": BulkDeleteLeadsPathParams,
        "query": BulkDeleteLeadsQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

BulkAddLeadsPathParams = Dict[str, Any]

BulkAddLeadsQueryParams = Dict[str, Any]

BulkAddLeadsInput = TypedDict(
    "BulkAddLeadsInput",
    {
        "path": BulkAddLeadsPathParams,
        "query": BulkAddLeadsQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

BulkAssignLeadsPathParams = Dict[str, Any]

BulkAssignLeadsQueryParams = Dict[str, Any]

BulkAssignLeadsInput = TypedDict(
    "BulkAssignLeadsInput",
    {
        "path": BulkAssignLeadsPathParams,
        "query": BulkAssignLeadsQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

ListLeadsPathParams = Dict[str, Any]

ListLeadsQueryParams = Dict[str, Any]

ListLeadsInput = TypedDict(
    "ListLeadsInput",
    {
        "path": ListLeadsPathParams,
        "query": ListLeadsQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

MergeLeadsPathParams = Dict[str, Any]

MergeLeadsQueryParams = Dict[str, Any]

MergeLeadsInput = TypedDict(
    "MergeLeadsInput",
    {
        "path": MergeLeadsPathParams,
        "query": MergeLeadsQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

MoveLeadsPathParams = Dict[str, Any]

MoveLeadsQueryParams = Dict[str, Any]

MoveLeadsInput = TypedDict(
    "MoveLeadsInput",
    {
        "path": MoveLeadsPathParams,
        "query": MoveLeadsQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

MoveLeadToSubsequencePathParams = Dict[str, Any]

MoveLeadToSubsequenceQueryParams = Dict[str, Any]

MoveLeadToSubsequenceInput = TypedDict(
    "MoveLeadToSubsequenceInput",
    {
        "path": MoveLeadToSubsequencePathParams,
        "query": MoveLeadToSubsequenceQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

RemoveLeadFromSubsequencePathParams = Dict[str, Any]

RemoveLeadFromSubsequenceQueryParams = Dict[str, Any]

RemoveLeadFromSubsequenceInput = TypedDict(
    "RemoveLeadFromSubsequenceInput",
    {
        "path": RemoveLeadFromSubsequencePathParams,
        "query": RemoveLeadFromSubsequenceQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

UpdateLeadInterestStatusPathParams = Dict[str, Any]

UpdateLeadInterestStatusQueryParams = Dict[str, Any]

UpdateLeadInterestStatusInput = TypedDict(
    "UpdateLeadInterestStatusInput",
    {
        "path": UpdateLeadInterestStatusPathParams,
        "query": UpdateLeadInterestStatusQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetLeadPathParams = TypedDict(
    "GetLeadPathParams",
    {
        "id": str,
    },
    total=False,
)

GetLeadQueryParams = Dict[str, Any]

GetLeadInput = TypedDict(
    "GetLeadInput",
    {
        "path": GetLeadPathParams,
        "query": GetLeadQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

PatchLeadPathParams = TypedDict(
    "PatchLeadPathParams",
    {
        "id": str,
    },
    total=False,
)

PatchLeadQueryParams = Dict[str, Any]

PatchLeadInput = TypedDict(
    "PatchLeadInput",
    {
        "path": PatchLeadPathParams,
        "query": PatchLeadQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

DeleteLeadPathParams = TypedDict(
    "DeleteLeadPathParams",
    {
        "id": str,
    },
    total=False,
)

DeleteLeadQueryParams = Dict[str, Any]

DeleteLeadInput = TypedDict(
    "DeleteLeadInput",
    {
        "path": DeleteLeadPathParams,
        "query": DeleteLeadQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

InitGoogleOAuthPathParams = Dict[str, Any]

InitGoogleOAuthQueryParams = Dict[str, Any]

InitGoogleOAuthInput = TypedDict(
    "InitGoogleOAuthInput",
    {
        "path": InitGoogleOAuthPathParams,
        "query": InitGoogleOAuthQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

InitMicrosoftOAuthPathParams = Dict[str, Any]

InitMicrosoftOAuthQueryParams = Dict[str, Any]

InitMicrosoftOAuthInput = TypedDict(
    "InitMicrosoftOAuthInput",
    {
        "path": InitMicrosoftOAuthPathParams,
        "query": InitMicrosoftOAuthQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetOAuthSessionStatusPathParams = TypedDict(
    "GetOAuthSessionStatusPathParams",
    {
        "sessionId": str,
    },
    total=False,
)

GetOAuthSessionStatusQueryParams = Dict[str, Any]

GetOAuthSessionStatusInput = TypedDict(
    "GetOAuthSessionStatusInput",
    {
        "path": GetOAuthSessionStatusPathParams,
        "query": GetOAuthSessionStatusQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

ListCampaignSubsequencePathParams = Dict[str, Any]

ListCampaignSubsequenceQueryParams = TypedDict(
    "ListCampaignSubsequenceQueryParams",
    {
        "limit": int,
        "starting_after": str,
        "parent_campaign": str,
        "search": str,
    },
    total=False,
)

ListCampaignSubsequenceInput = TypedDict(
    "ListCampaignSubsequenceInput",
    {
        "path": ListCampaignSubsequencePathParams,
        "query": ListCampaignSubsequenceQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

CreateCampaignSubsequencePathParams = Dict[str, Any]

CreateCampaignSubsequenceQueryParams = Dict[str, Any]

CreateCampaignSubsequenceInput = TypedDict(
    "CreateCampaignSubsequenceInput",
    {
        "path": CreateCampaignSubsequencePathParams,
        "query": CreateCampaignSubsequenceQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetCampaignSubsequencePathParams = TypedDict(
    "GetCampaignSubsequencePathParams",
    {
        "id": str,
    },
    total=False,
)

GetCampaignSubsequenceQueryParams = Dict[str, Any]

GetCampaignSubsequenceInput = TypedDict(
    "GetCampaignSubsequenceInput",
    {
        "path": GetCampaignSubsequencePathParams,
        "query": GetCampaignSubsequenceQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

PatchCampaignSubsequencePathParams = TypedDict(
    "PatchCampaignSubsequencePathParams",
    {
        "id": str,
    },
    total=False,
)

PatchCampaignSubsequenceQueryParams = Dict[str, Any]

PatchCampaignSubsequenceInput = TypedDict(
    "PatchCampaignSubsequenceInput",
    {
        "path": PatchCampaignSubsequencePathParams,
        "query": PatchCampaignSubsequenceQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

DeleteCampaignSubsequencePathParams = TypedDict(
    "DeleteCampaignSubsequencePathParams",
    {
        "id": str,
    },
    total=False,
)

DeleteCampaignSubsequenceQueryParams = Dict[str, Any]

DeleteCampaignSubsequenceInput = TypedDict(
    "DeleteCampaignSubsequenceInput",
    {
        "path": DeleteCampaignSubsequencePathParams,
        "query": DeleteCampaignSubsequenceQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

DuplicateSubsequencePathParams = TypedDict(
    "DuplicateSubsequencePathParams",
    {
        "id": str,
    },
    total=False,
)

DuplicateSubsequenceQueryParams = Dict[str, Any]

DuplicateSubsequenceInput = TypedDict(
    "DuplicateSubsequenceInput",
    {
        "path": DuplicateSubsequencePathParams,
        "query": DuplicateSubsequenceQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

PauseSubsequencePathParams = TypedDict(
    "PauseSubsequencePathParams",
    {
        "id": str,
    },
    total=False,
)

PauseSubsequenceQueryParams = Dict[str, Any]

PauseSubsequenceInput = TypedDict(
    "PauseSubsequenceInput",
    {
        "path": PauseSubsequencePathParams,
        "query": PauseSubsequenceQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

ResumeSubsequencePathParams = TypedDict(
    "ResumeSubsequencePathParams",
    {
        "id": str,
    },
    total=False,
)

ResumeSubsequenceQueryParams = Dict[str, Any]

ResumeSubsequenceInput = TypedDict(
    "ResumeSubsequenceInput",
    {
        "path": ResumeSubsequencePathParams,
        "query": ResumeSubsequenceQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetSubsequenceSendingStatusPathParams = TypedDict(
    "GetSubsequenceSendingStatusPathParams",
    {
        "id": str,
    },
    total=False,
)

GetSubsequenceSendingStatusQueryParams = TypedDict(
    "GetSubsequenceSendingStatusQueryParams",
    {
        "with_ai_summary": bool,
    },
    total=False,
)

GetSubsequenceSendingStatusInput = TypedDict(
    "GetSubsequenceSendingStatusInput",
    {
        "path": GetSubsequenceSendingStatusPathParams,
        "query": GetSubsequenceSendingStatusQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

CreateSuperSearchEnrichmentPathParams = Dict[str, Any]

CreateSuperSearchEnrichmentQueryParams = Dict[str, Any]

CreateSuperSearchEnrichmentInput = TypedDict(
    "CreateSuperSearchEnrichmentInput",
    {
        "path": CreateSuperSearchEnrichmentPathParams,
        "query": CreateSuperSearchEnrichmentQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

CreateAIEnrichmentPathParams = Dict[str, Any]

CreateAIEnrichmentQueryParams = Dict[str, Any]

CreateAIEnrichmentInput = TypedDict(
    "CreateAIEnrichmentInput",
    {
        "path": CreateAIEnrichmentPathParams,
        "query": CreateAIEnrichmentQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetAiEnrichmentForResourcePathParams = TypedDict(
    "GetAiEnrichmentForResourcePathParams",
    {
        "resource_id": str,
    },
    total=False,
)

GetAiEnrichmentForResourceQueryParams = Dict[str, Any]

GetAiEnrichmentForResourceInput = TypedDict(
    "GetAiEnrichmentForResourceInput",
    {
        "path": GetAiEnrichmentForResourcePathParams,
        "query": GetAiEnrichmentForResourceQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

CountLeadsFromSupersearchPathParams = Dict[str, Any]

CountLeadsFromSupersearchQueryParams = Dict[str, Any]

CountLeadsFromSupersearchInput = TypedDict(
    "CountLeadsFromSupersearchInput",
    {
        "path": CountLeadsFromSupersearchPathParams,
        "query": CountLeadsFromSupersearchQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

EnrichLeadsFromSupersearchPathParams = Dict[str, Any]

EnrichLeadsFromSupersearchQueryParams = Dict[str, Any]

EnrichLeadsFromSupersearchInput = TypedDict(
    "EnrichLeadsFromSupersearchInput",
    {
        "path": EnrichLeadsFromSupersearchPathParams,
        "query": EnrichLeadsFromSupersearchQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetEnrichmentHistoryPathParams = TypedDict(
    "GetEnrichmentHistoryPathParams",
    {
        "resource_id": str,
    },
    total=False,
)

GetEnrichmentHistoryQueryParams = TypedDict(
    "GetEnrichmentHistoryQueryParams",
    {
        "offset": float,
        "limit": float,
    },
    total=False,
)

GetEnrichmentHistoryInput = TypedDict(
    "GetEnrichmentHistoryInput",
    {
        "path": GetEnrichmentHistoryPathParams,
        "query": GetEnrichmentHistoryQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

PreviewLeadsFromSupersearchPathParams = Dict[str, Any]

PreviewLeadsFromSupersearchQueryParams = Dict[str, Any]

PreviewLeadsFromSupersearchInput = TypedDict(
    "PreviewLeadsFromSupersearchInput",
    {
        "path": PreviewLeadsFromSupersearchPathParams,
        "query": PreviewLeadsFromSupersearchQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

RunEnrichmentPathParams = Dict[str, Any]

RunEnrichmentQueryParams = Dict[str, Any]

RunEnrichmentInput = TypedDict(
    "RunEnrichmentInput",
    {
        "path": RunEnrichmentPathParams,
        "query": RunEnrichmentQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

SignalKeywordsFacetPathParams = Dict[str, Any]

SignalKeywordsFacetQueryParams = Dict[str, Any]

SignalKeywordsFacetInput = TypedDict(
    "SignalKeywordsFacetInput",
    {
        "path": SignalKeywordsFacetPathParams,
        "query": SignalKeywordsFacetQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetEnrichmentForResourcePathParams = TypedDict(
    "GetEnrichmentForResourcePathParams",
    {
        "resource_id": str,
    },
    total=False,
)

GetEnrichmentForResourceQueryParams = Dict[str, Any]

GetEnrichmentForResourceInput = TypedDict(
    "GetEnrichmentForResourceInput",
    {
        "path": GetEnrichmentForResourcePathParams,
        "query": GetEnrichmentForResourceQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

UpdateEnrichmentSettingsForResourcePathParams = TypedDict(
    "UpdateEnrichmentSettingsForResourcePathParams",
    {
        "resource_id": str,
    },
    total=False,
)

UpdateEnrichmentSettingsForResourceQueryParams = Dict[str, Any]

UpdateEnrichmentSettingsForResourceInput = TypedDict(
    "UpdateEnrichmentSettingsForResourceInput",
    {
        "path": UpdateEnrichmentSettingsForResourcePathParams,
        "query": UpdateEnrichmentSettingsForResourceQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

ListWebhookEventPathParams = Dict[str, Any]

ListWebhookEventQueryParams = TypedDict(
    "ListWebhookEventQueryParams",
    {
        "limit": int,
        "starting_after": str,
        "success": bool,
        "from": str,
        "to": str,
        "search": str,
    },
    total=False,
)

ListWebhookEventInput = TypedDict(
    "ListWebhookEventInput",
    {
        "path": ListWebhookEventPathParams,
        "query": ListWebhookEventQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetWebhookEventsSummaryPathParams = Dict[str, Any]

GetWebhookEventsSummaryQueryParams = TypedDict(
    "GetWebhookEventsSummaryQueryParams",
    {
        "from": str,
        "to": str,
    },
    total=False,
)

GetWebhookEventsSummaryInput = TypedDict(
    "GetWebhookEventsSummaryInput",
    {
        "path": GetWebhookEventsSummaryPathParams,
        "query": GetWebhookEventsSummaryQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetWebhookEventsSummaryByDatePathParams = Dict[str, Any]

GetWebhookEventsSummaryByDateQueryParams = TypedDict(
    "GetWebhookEventsSummaryByDateQueryParams",
    {
        "from": str,
        "to": str,
    },
    total=False,
)

GetWebhookEventsSummaryByDateInput = TypedDict(
    "GetWebhookEventsSummaryByDateInput",
    {
        "path": GetWebhookEventsSummaryByDatePathParams,
        "query": GetWebhookEventsSummaryByDateQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetWebhookEventPathParams = TypedDict(
    "GetWebhookEventPathParams",
    {
        "id": str,
    },
    total=False,
)

GetWebhookEventQueryParams = Dict[str, Any]

GetWebhookEventInput = TypedDict(
    "GetWebhookEventInput",
    {
        "path": GetWebhookEventPathParams,
        "query": GetWebhookEventQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

ListWebhookPathParams = Dict[str, Any]

ListWebhookQueryParams = TypedDict(
    "ListWebhookQueryParams",
    {
        "limit": int,
        "starting_after": str,
        "campaign": str,
        "event_type": Literal["all_events", "email_sent", "email_opened", "email_link_clicked", "reply_received", "email_bounced", "lead_unsubscribed", "campaign_completed", "account_error", "lead_neutral", "lead_interested", "lead_not_interested", "lead_meeting_booked", "lead_meeting_completed", "lead_closed", "lead_out_of_office", "lead_wrong_person"],
    },
    total=False,
)

ListWebhookInput = TypedDict(
    "ListWebhookInput",
    {
        "path": ListWebhookPathParams,
        "query": ListWebhookQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

CreateWebhookPathParams = Dict[str, Any]

CreateWebhookQueryParams = Dict[str, Any]

CreateWebhookInput = TypedDict(
    "CreateWebhookInput",
    {
        "path": CreateWebhookPathParams,
        "query": CreateWebhookQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

ListWebhookEventTypesPathParams = Dict[str, Any]

ListWebhookEventTypesQueryParams = Dict[str, Any]

ListWebhookEventTypesInput = TypedDict(
    "ListWebhookEventTypesInput",
    {
        "path": ListWebhookEventTypesPathParams,
        "query": ListWebhookEventTypesQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetWebhookPathParams = TypedDict(
    "GetWebhookPathParams",
    {
        "id": str,
    },
    total=False,
)

GetWebhookQueryParams = Dict[str, Any]

GetWebhookInput = TypedDict(
    "GetWebhookInput",
    {
        "path": GetWebhookPathParams,
        "query": GetWebhookQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

PatchWebhookPathParams = TypedDict(
    "PatchWebhookPathParams",
    {
        "id": str,
    },
    total=False,
)

PatchWebhookQueryParams = Dict[str, Any]

PatchWebhookInput = TypedDict(
    "PatchWebhookInput",
    {
        "path": PatchWebhookPathParams,
        "query": PatchWebhookQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

DeleteWebhookPathParams = TypedDict(
    "DeleteWebhookPathParams",
    {
        "id": str,
    },
    total=False,
)

DeleteWebhookQueryParams = Dict[str, Any]

DeleteWebhookInput = TypedDict(
    "DeleteWebhookInput",
    {
        "path": DeleteWebhookPathParams,
        "query": DeleteWebhookQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

ResumeWebhookPathParams = TypedDict(
    "ResumeWebhookPathParams",
    {
        "id": str,
    },
    total=False,
)

ResumeWebhookQueryParams = Dict[str, Any]

ResumeWebhookInput = TypedDict(
    "ResumeWebhookInput",
    {
        "path": ResumeWebhookPathParams,
        "query": ResumeWebhookQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

TestWebhookPathParams = TypedDict(
    "TestWebhookPathParams",
    {
        "id": str,
    },
    total=False,
)

TestWebhookQueryParams = Dict[str, Any]

TestWebhookInput = TypedDict(
    "TestWebhookInput",
    {
        "path": TestWebhookPathParams,
        "query": TestWebhookQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetWorkspacePlanDetailsPathParams = Dict[str, Any]

GetWorkspacePlanDetailsQueryParams = Dict[str, Any]

GetWorkspacePlanDetailsInput = TypedDict(
    "GetWorkspacePlanDetailsInput",
    {
        "path": GetWorkspacePlanDetailsPathParams,
        "query": GetWorkspacePlanDetailsQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetWorkspaceSubscriptionDetailsPathParams = Dict[str, Any]

GetWorkspaceSubscriptionDetailsQueryParams = Dict[str, Any]

GetWorkspaceSubscriptionDetailsInput = TypedDict(
    "GetWorkspaceSubscriptionDetailsInput",
    {
        "path": GetWorkspaceSubscriptionDetailsPathParams,
        "query": GetWorkspaceSubscriptionDetailsQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

ListWorkspaceGroupMemberPathParams = Dict[str, Any]

ListWorkspaceGroupMemberQueryParams = TypedDict(
    "ListWorkspaceGroupMemberQueryParams",
    {
        "limit": int,
        "starting_after": str,
    },
    total=False,
)

ListWorkspaceGroupMemberInput = TypedDict(
    "ListWorkspaceGroupMemberInput",
    {
        "path": ListWorkspaceGroupMemberPathParams,
        "query": ListWorkspaceGroupMemberQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

CreateWorkspaceGroupMemberPathParams = Dict[str, Any]

CreateWorkspaceGroupMemberQueryParams = Dict[str, Any]

CreateWorkspaceGroupMemberInput = TypedDict(
    "CreateWorkspaceGroupMemberInput",
    {
        "path": CreateWorkspaceGroupMemberPathParams,
        "query": CreateWorkspaceGroupMemberQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetAdminWorkspaceGroupMemberPathParams = Dict[str, Any]

GetAdminWorkspaceGroupMemberQueryParams = Dict[str, Any]

GetAdminWorkspaceGroupMemberInput = TypedDict(
    "GetAdminWorkspaceGroupMemberInput",
    {
        "path": GetAdminWorkspaceGroupMemberPathParams,
        "query": GetAdminWorkspaceGroupMemberQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetWorkspaceGroupMemberPathParams = TypedDict(
    "GetWorkspaceGroupMemberPathParams",
    {
        "id": str,
    },
    total=False,
)

GetWorkspaceGroupMemberQueryParams = Dict[str, Any]

GetWorkspaceGroupMemberInput = TypedDict(
    "GetWorkspaceGroupMemberInput",
    {
        "path": GetWorkspaceGroupMemberPathParams,
        "query": GetWorkspaceGroupMemberQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

DeleteWorkspaceGroupMemberPathParams = TypedDict(
    "DeleteWorkspaceGroupMemberPathParams",
    {
        "id": str,
    },
    total=False,
)

DeleteWorkspaceGroupMemberQueryParams = Dict[str, Any]

DeleteWorkspaceGroupMemberInput = TypedDict(
    "DeleteWorkspaceGroupMemberInput",
    {
        "path": DeleteWorkspaceGroupMemberPathParams,
        "query": DeleteWorkspaceGroupMemberQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

ListWorkspaceMemberPathParams = Dict[str, Any]

ListWorkspaceMemberQueryParams = TypedDict(
    "ListWorkspaceMemberQueryParams",
    {
        "limit": int,
        "starting_after": str,
        "accepted": bool,
        "search": str,
    },
    total=False,
)

ListWorkspaceMemberInput = TypedDict(
    "ListWorkspaceMemberInput",
    {
        "path": ListWorkspaceMemberPathParams,
        "query": ListWorkspaceMemberQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

CreateWorkspaceMemberPathParams = Dict[str, Any]

CreateWorkspaceMemberQueryParams = Dict[str, Any]

CreateWorkspaceMemberInput = TypedDict(
    "CreateWorkspaceMemberInput",
    {
        "path": CreateWorkspaceMemberPathParams,
        "query": CreateWorkspaceMemberQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetWorkspaceMemberPathParams = TypedDict(
    "GetWorkspaceMemberPathParams",
    {
        "id": str,
    },
    total=False,
)

GetWorkspaceMemberQueryParams = Dict[str, Any]

GetWorkspaceMemberInput = TypedDict(
    "GetWorkspaceMemberInput",
    {
        "path": GetWorkspaceMemberPathParams,
        "query": GetWorkspaceMemberQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

PatchWorkspaceMemberPathParams = TypedDict(
    "PatchWorkspaceMemberPathParams",
    {
        "id": str,
    },
    total=False,
)

PatchWorkspaceMemberQueryParams = Dict[str, Any]

PatchWorkspaceMemberInput = TypedDict(
    "PatchWorkspaceMemberInput",
    {
        "path": PatchWorkspaceMemberPathParams,
        "query": PatchWorkspaceMemberQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

DeleteWorkspaceMemberPathParams = TypedDict(
    "DeleteWorkspaceMemberPathParams",
    {
        "id": str,
    },
    total=False,
)

DeleteWorkspaceMemberQueryParams = Dict[str, Any]

DeleteWorkspaceMemberInput = TypedDict(
    "DeleteWorkspaceMemberInput",
    {
        "path": DeleteWorkspaceMemberPathParams,
        "query": DeleteWorkspaceMemberQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetWorkspacePathParams = Dict[str, Any]

GetWorkspaceQueryParams = Dict[str, Any]

GetWorkspaceInput = TypedDict(
    "GetWorkspaceInput",
    {
        "path": GetWorkspacePathParams,
        "query": GetWorkspaceQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

PatchWorkspacePathParams = Dict[str, Any]

PatchWorkspaceQueryParams = Dict[str, Any]

PatchWorkspaceInput = TypedDict(
    "PatchWorkspaceInput",
    {
        "path": PatchWorkspacePathParams,
        "query": PatchWorkspaceQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

ChangeWorkspaceOwnerPathParams = Dict[str, Any]

ChangeWorkspaceOwnerQueryParams = Dict[str, Any]

ChangeWorkspaceOwnerInput = TypedDict(
    "ChangeWorkspaceOwnerInput",
    {
        "path": ChangeWorkspaceOwnerPathParams,
        "query": ChangeWorkspaceOwnerQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

GetWorkspaceDomainInfoPathParams = Dict[str, Any]

GetWorkspaceDomainInfoQueryParams = Dict[str, Any]

GetWorkspaceDomainInfoInput = TypedDict(
    "GetWorkspaceDomainInfoInput",
    {
        "path": GetWorkspaceDomainInfoPathParams,
        "query": GetWorkspaceDomainInfoQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

AddWorkspaceAgencyDomainPathParams = Dict[str, Any]

AddWorkspaceAgencyDomainQueryParams = Dict[str, Any]

AddWorkspaceAgencyDomainInput = TypedDict(
    "AddWorkspaceAgencyDomainInput",
    {
        "path": AddWorkspaceAgencyDomainPathParams,
        "query": AddWorkspaceAgencyDomainQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)

DeleteWorkspaceDomainPathParams = Dict[str, Any]

DeleteWorkspaceDomainQueryParams = Dict[str, Any]

DeleteWorkspaceDomainInput = TypedDict(
    "DeleteWorkspaceDomainInput",
    {
        "path": DeleteWorkspaceDomainPathParams,
        "query": DeleteWorkspaceDomainQueryParams,
        "body": Dict[str, Any],
        "headers": Dict[str, str],
    },
    total=False,
)
