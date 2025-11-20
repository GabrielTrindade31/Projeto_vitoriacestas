from pathlib import Path

# Caminhos e ajustes de ambiente básicos para o backend
BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
DATA_DIR.mkdir(exist_ok=True)

DB_PATH = DATA_DIR / "estoque.db"
HOST = "0.0.0.0"
PORT = 8000
