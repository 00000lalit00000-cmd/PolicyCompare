PolicyCompare — Backend (FastAPI)

Quick start

1. Create a virtualenv and install deps

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

2. Run the server

```bash
uvicorn app.main:app --reload --port 8000
```

API endpoints
- `GET /api/policies`
- `GET /api/policies/{id}`
- `POST /api/compare` — body `{ "ids": ["id1","id2"] }` (limit 2-4)
- `POST /api/seed` — dev-only seed endpoint

Seed data
- Run `python scripts/seed.py` to populate sample policies.

Switching to Postgres
- Set `DATABASE_URL` env var and update `app/database.py` accordingly.
