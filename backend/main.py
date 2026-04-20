from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.analyze import router as analyze_router
from routes.history import router as history_router
from database.db import init_db

app = FastAPI(
    title="GuarAssist API",
    description="Detecção de pragas em plantações de guaraná via IA",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # URL do React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

app.include_router(analyze_router, prefix="/api")
app.include_router(history_router, prefix="/api")

@app.get("/")
def root():
    return {"status": "GuarAssist API rodando ✅"}
 
