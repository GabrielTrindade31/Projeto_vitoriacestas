from dataclasses import dataclass
from typing import Optional

from database import get_connection


@dataclass
class Category:
    id: int
    name: str
    description: Optional[str]


@dataclass
class Supplier:
    id: int
    name: str
    contact: Optional[str]


@dataclass
class Item:
    id: int
    name: str
    description: Optional[str]
    category_id: int
    supplier_id: int
    quantity: int


def row_to_category(row) -> Category:
    return Category(id=row["id"], name=row["name"], description=row["description"])


def row_to_supplier(row) -> Supplier:
    return Supplier(id=row["id"], name=row["name"], contact=row["contact"])


def row_to_item(row) -> Item:
    return Item(
        id=row["id"],
        name=row["name"],
        description=row["description"],
        category_id=row["category_id"],
        supplier_id=row["supplier_id"],
        quantity=row["quantity"],
    )


def get_category(category_id: int) -> Optional[Category]:
    with get_connection() as connection:
        row = connection.execute(
            "SELECT id, name, description FROM categories WHERE id = ?", (category_id,)
        ).fetchone()
        if row:
            return row_to_category(row)
    return None


def get_supplier(supplier_id: int) -> Optional[Supplier]:
    with get_connection() as connection:
        row = connection.execute(
            "SELECT id, name, contact FROM suppliers WHERE id = ?", (supplier_id,)
        ).fetchone()
        if row:
            return row_to_supplier(row)
    return None


def find_item_by_name(name: str) -> Optional[Item]:
    with get_connection() as connection:
        row = connection.execute(
            "SELECT id, name, description, category_id, supplier_id, quantity FROM items WHERE name = ?",
            (name,),
        ).fetchone()
        if row:
            return row_to_item(row)
    return None


def insert_category(name: str, description: Optional[str] = None) -> Category:
    with get_connection() as connection:
        cursor = connection.execute(
            "INSERT INTO categories (name, description) VALUES (?, ?)",
            (name, description),
        )
        category_id = cursor.lastrowid
        return Category(id=category_id, name=name, description=description)


def insert_supplier(name: str, contact: Optional[str] = None) -> Supplier:
    with get_connection() as connection:
        cursor = connection.execute(
            "INSERT INTO suppliers (name, contact) VALUES (?, ?)",
            (name, contact),
        )
        supplier_id = cursor.lastrowid
        return Supplier(id=supplier_id, name=name, contact=contact)


def insert_item(
    *, name: str, description: Optional[str], category_id: int, supplier_id: int, quantity: int
) -> Item:
    with get_connection() as connection:
        cursor = connection.execute(
            """
            INSERT INTO items (name, description, category_id, supplier_id, quantity)
            VALUES (?, ?, ?, ?, ?)
            """,
            (name, description, category_id, supplier_id, quantity),
        )
        item_id = cursor.lastrowid
        return Item(
            id=item_id,
            name=name,
            description=description,
            category_id=category_id,
            supplier_id=supplier_id,
            quantity=quantity,
        )
