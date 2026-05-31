from typing import List, Optional
from sqlmodel import SQLModel, Field
from sqlalchemy import Column, JSON
from datetime import date
import uuid

class Policy(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True, index=True)
    title: str
    description: Optional[str] = None
    effective_date: Optional[date] = None
    issuer: Optional[str] = None
    tags: Optional[List[str]] = Field(default_factory=list, sa_column=Column(JSON))
    sections: Optional[List[dict]] = Field(default_factory=list, sa_column=Column(JSON))
    last_updated: Optional[str] = None
    source_url: Optional[str] = None
