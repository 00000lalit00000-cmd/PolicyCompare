"""Seed script for PolicyCompare backend."""
from sqlmodel import Session, select
from app.database import engine
from app.models import Policy
from datetime import date

SAMPLE = [
    {
        "title": "Data Protection Policy",
        "description": "Policy describing data protection requirements.",
        "effective_date": date(2024, 1, 1),
        "issuer": "Security",
        "tags": ["security", "data"],
        "sections": [
            {"title": "Purpose", "content": "Protect data."},
            {"title": "Scope", "content": "All employees."}
        ],
        "last_updated": "2024-01-01",
        "source_url": "https://example.com/policies/data-protection"
    },
    {
        "title": "Acceptable Use Policy",
        "description": "Rules for acceptable use of company resources.",
        "effective_date": date(2023, 6, 15),
        "issuer": "IT",
        "tags": ["it", "usage"],
        "sections": [
            {"title": "Introduction", "content": "Use responsibly."},
            {"title": "Prohibitions", "content": "No illegal activities."}
        ],
        "last_updated": "2023-06-15",
        "source_url": "https://example.com/policies/aup"
    }
]


def run():
    with Session(engine) as session:
        existing = session.exec(select(Policy)).first()
        if existing:
            print("Database already has policies; skipping seed.")
            return

        for item in SAMPLE:
            p = Policy(**item)
            session.add(p)
        session.commit()
    print("Seeded sample policies.")

if __name__ == "__main__":
    run()
