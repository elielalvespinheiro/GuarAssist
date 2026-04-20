import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "guarassist.db")

def get_connection():
    return sqlite3.connect(DB_PATH)

def init_db():
    with get_connection() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS analyses (
                id TEXT PRIMARY KEY,
                timestamp INTEGER,
                filename TEXT,
                status TEXT,
                disease TEXT,
                confidence REAL
            )
        """)
        conn.commit()
    print("✅ Banco de dados inicializado.")

def save_analysis(data: dict):
    with get_connection() as conn:
        conn.execute("""
            INSERT INTO analyses (id, timestamp, filename, status, disease, confidence)
            VALUES (:id, :timestamp, :filename, :status, :disease, :confidence)
        """, data)
        conn.commit()

def get_all_analyses():
    with get_connection() as conn:
        conn.row_factory = sqlite3.Row
        rows = conn.execute("SELECT * FROM analyses ORDER BY timestamp DESC LIMIT 100").fetchall()
        return [dict(row) for row in rows]
 
