from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from .database import get_session
from sqlmodel import Session
from .crud import list_policies, get_policy, get_policies_by_ids, create_policy
from .models import Policy
from pydantic import BaseModel

router = APIRouter()

class CompareRequest(BaseModel):
    ids: List[str]


class CompareResponse(BaseModel):
    policies: List[Policy]


@router.get("/policies", response_model=List[Policy])
def api_list_policies(page: int = 1, page_size: int = 20, q: str | None = None, tags: str | None = None, session: Session = Depends(get_session)):
    offset = (page - 1) * page_size
    tag_list = tags.split(",") if tags else None
    results = list_policies(session, q=q, tags=tag_list, offset=offset, limit=page_size)
    return results


@router.get("/policies/{policy_id}", response_model=Policy)
def api_get_policy(policy_id: str, session: Session = Depends(get_session)):
    p = get_policy(session, policy_id)
    if not p:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Policy not found")
    return p


@router.post("/compare", response_model=CompareResponse)
def api_compare(req: CompareRequest, session: Session = Depends(get_session)):
    if not (2 <= len(req.ids) <= 4):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Provide between 2 and 4 policy ids to compare")
    policies = get_policies_by_ids(session, req.ids)
    if len(policies) != len(req.ids):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="One or more policies not found")
    return {"policies": policies}


class SeedRequest(BaseModel):
    items: List[Policy]


@router.post("/seed")
def api_seed(req: SeedRequest, session: Session = Depends(get_session)):
    created = []
    for item in req.items:
        created.append(create_policy(session, item))
    return {"created": len(created)}
