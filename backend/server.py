import json
from http.server import BaseHTTPRequestHandler, HTTPServer
from typing import Tuple

import config
from models import find_item_by_name, get_category, get_supplier, insert_item


def json_response(handler: BaseHTTPRequestHandler, status: int, payload: dict) -> None:
    body = json.dumps(payload).encode()
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json")
    handler.send_header("Content-Length", str(len(body)))
    handler.end_headers()
    handler.wfile.write(body)


def parse_body(handler: BaseHTTPRequestHandler):
    content_length = int(handler.headers.get("Content-Length", 0))
    raw_body = handler.rfile.read(content_length)
    try:
        return json.loads(raw_body.decode() or "{}")
    except json.JSONDecodeError:
        return None


class SimpleHandler(BaseHTTPRequestHandler):
    def _not_found(self) -> None:
        json_response(self, 404, {"message": "Endpoint não encontrado"})

    def _bad_request(self, message: str) -> None:
        json_response(self, 400, {"message": message})

    def do_GET(self):  # noqa: N802 - nome exigido pela biblioteca padrão
        if self.path == "/health":
            json_response(self, 200, {"status": "ok"})
        else:
            self._not_found()

    def do_POST(self):  # noqa: N802 - nome exigido pela biblioteca padrão
        if self.path == "/items":
            self.handle_create_item()
        else:
            self._not_found()

    def handle_create_item(self) -> None:
        payload = parse_body(self)
        if payload is None:
            return self._bad_request("Corpo da requisição inválido, envie JSON válido.")

        required_fields = ["name", "category_id", "supplier_id", "quantity"]
        missing = [field for field in required_fields if not payload.get(field) and payload.get(field) != 0]
        if missing:
            return self._bad_request(
                "Campos obrigatórios ausentes ou vazios: " + ", ".join(sorted(missing))
            )

        try:
            quantity = int(payload.get("quantity"))
        except (TypeError, ValueError):
            return self._bad_request("O campo quantity deve ser um número inteiro.")

        if quantity < 0:
            return self._bad_request("O campo quantity não pode ser negativo.")

        name = str(payload.get("name")).strip()
        if not name:
            return self._bad_request("O campo name não pode estar vazio.")

        if find_item_by_name(name):
            return self._bad_request("Já existe um item cadastrado com esse nome.")

        category_id = payload.get("category_id")
        supplier_id = payload.get("supplier_id")

        category = get_category(int(category_id)) if category_id is not None else None
        supplier = get_supplier(int(supplier_id)) if supplier_id is not None else None

        if category is None:
            return self._bad_request("Categoria informada não existe.")
        if supplier is None:
            return self._bad_request("Fornecedor informado não existe.")

        description = payload.get("description")

        item = insert_item(
            name=name,
            description=description,
            category_id=category.id,
            supplier_id=supplier.id,
            quantity=quantity,
        )

        json_response(
            self,
            201,
            {
                "id": item.id,
                "name": item.name,
                "description": item.description,
                "category_id": item.category_id,
                "supplier_id": item.supplier_id,
                "quantity": item.quantity,
            },
        )

    def log_message(self, format: str, *args) -> None:  # noqa: A003 - assinatura herdada
        # Reduz ruído no console e mantém compatibilidade com BaseHTTPRequestHandler
        return


def run_server(host: str = config.HOST, port: int = config.PORT) -> Tuple[str, int]:
    server = HTTPServer((host, port), SimpleHandler)
    print(f"Servidor rodando em http://{host}:{port}")
    server.serve_forever()
    return host, port


if __name__ == "__main__":
    try:
        run_server()
    except KeyboardInterrupt:
        print("Servidor finalizado pelo usuário")
