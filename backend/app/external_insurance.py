import json
import os
from typing import Any, Dict, List, Optional
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

BASE_URL = os.getenv("INSURANCE_API_BASE_URL")
API_KEY = os.getenv("INSURANCE_API_KEY")
API_USER = os.getenv("INSURANCE_API_USER")
API_PASSWORD = os.getenv("INSURANCE_API_PASSWORD")
API_TIMEOUT = int(os.getenv("INSURANCE_API_TIMEOUT", "30"))


def is_configured() -> bool:
    return bool(BASE_URL)


def _build_request(path: str, params: Optional[Dict[str, Any]] = None) -> Request:
    url = BASE_URL.rstrip("/") + path
    if params:
        query = urlencode({k: v for k, v in params.items() if v is not None})
        url = f"{url}?{query}"

    headers = {
        "Accept": "application/json",
        "User-Agent": "PolicyCompare/1.0",
    }
    if API_KEY:
        headers["Authorization"] = f"Bearer {API_KEY}"

    return Request(url, headers=headers)


def _execute_request(request: Request) -> Any:
    try:
        with urlopen(request, timeout=API_TIMEOUT) as response:
            payload = response.read().decode("utf-8")
            return json.loads(payload)
    except HTTPError as error:
        raise RuntimeError(f"Live provider HTTP error {error.code}: {error.reason}")
    except URLError as error:
        raise RuntimeError(f"Live provider connection error: {error.reason}")
    except Exception as error:
        raise RuntimeError(f"Live provider error: {error}")


def fetch_live_policies(q: Optional[str] = None, category: Optional[str] = None, page: int = 1, page_size: int = 20) -> List[Dict[str, Any]]:
    if not is_configured():
        raise RuntimeError("Live insurance provider is not configured")

    params: Dict[str, Any] = {
        "q": q,
        "category": category,
        "page": page,
        "page_size": page_size,
    }
    request = _build_request("/policies", params=params)
    data = _execute_request(request)
    if isinstance(data, dict) and "policies" in data:
        return data["policies"]
    if isinstance(data, list):
        return data
    raise RuntimeError("Live provider returned unexpected policy payload")


def fetch_live_policy(policy_id: str) -> Dict[str, Any]:
    if not is_configured():
        raise RuntimeError("Live insurance provider is not configured")

    request = _build_request(f"/policies/{policy_id}")
    data = _execute_request(request)
    if isinstance(data, dict):
        return data
    raise RuntimeError("Live provider returned unexpected policy payload")
