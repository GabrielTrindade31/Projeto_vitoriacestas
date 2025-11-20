import sqlite3
from contextlib import contextmanager
from typing import Iterator

import config


def initialize_foreign_keys(connection: sqlite3.Connection) -> None:
    connection.execute("PRAGMA foreign_keys = ON;")


@contextmanager
def get_connection() -> Iterator[sqlite3.Connection]:
    connection = sqlite3.connect(config.DB_PATH)
    connection.row_factory = sqlite3.Row
    initialize_foreign_keys(connection)
    try:
        yield connection
        connection.commit()
    finally:
        connection.close()
