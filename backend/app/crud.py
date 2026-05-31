from typing import List, Optional
from sqlmodel import select
from .models import Policy
from sqlmodel import Session


def list_policies(session: Session, q: Optional[str] = None, category: Optional[str] = None, tags: Optional[List[str]] = None, offset: int = 0, limit: int = 20):
    stmt = select(Policy)
    if q:
        stmt = stmt.where(Policy.title.ilike(f"%{q}%"))
    if category:
        stmt = stmt.where(Policy.category == category)
    if tags:
        # naive tag filter: policies that have any of the tags
        stmt = stmt.where(Policy.tags != None)
    stmt = stmt.offset(offset).limit(limit)
    results = session.exec(stmt).all()
    return results


def get_policy(session: Session, policy_id: str) -> Optional[Policy]:
    return session.get(Policy, policy_id)


def get_policies_by_ids(session: Session, ids: List[str]) -> List[Policy]:
    stmt = select(Policy).where(Policy.id.in_(ids))
    return session.exec(stmt).all()


def create_policy(session: Session, policy: Policy) -> Policy:
    session.add(policy)
    session.commit()
    session.refresh(policy)
    return policy
