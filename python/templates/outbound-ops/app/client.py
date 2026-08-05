import os

from instantly import create_instantly_client


def get_client():
    """Build a client from the environment. Never hardcode the key.

    Set AS_WORKSPACE (with an admin-workspace key) to run against a client sub-workspace.
    """
    api_key = os.environ.get("INSTANTLY_API_KEY")
    if not api_key:
        raise RuntimeError("INSTANTLY_API_KEY is not set")
    as_workspace = os.environ.get("AS_WORKSPACE")
    if as_workspace:
        return create_instantly_client(api_key, default_headers={"x-as-workspace": as_workspace})
    return create_instantly_client(api_key)
