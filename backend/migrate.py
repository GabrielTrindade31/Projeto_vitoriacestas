from pathlib import Path
from sqlite3 import Connection

from database import get_connection, initialize_foreign_keys

MIGRATIONS_DIR = Path(__file__).resolve().parent / "migrations"


def apply_migration(connection: Connection, sql_path: Path) -> None:
    with sql_path.open("r", encoding="utf-8") as sql_file:
        statements = sql_file.read()
        connection.executescript(statements)


def run_all_migrations() -> None:
    sql_files = sorted(MIGRATIONS_DIR.glob("*.sql"))
    if not sql_files:
        print("Nenhuma migration encontrada.")
        return

    with get_connection() as connection:
        initialize_foreign_keys(connection)
        for sql_file in sql_files:
            apply_migration(connection, sql_file)
            print(f"Aplicada migration: {sql_file.name}")


if __name__ == "__main__":
    run_all_migrations()
