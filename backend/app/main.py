from fastapi import FastAPI
from dotenv import load_dotenv
from .database import create_db_and_tables
from .api import router
from fastapi.middleware.cors import CORSMiddleware
import os

load_dotenv()
app = FastAPI(title="PolicyCompare API")

origins_raw = os.getenv("CORS_ORIGINS", "http://localhost:5173")
origins = [origin.strip() for origin in origins_raw.split(",") if origin.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")

@app.on_event("startup")
def on_startup():
    create_db_and_tables()
