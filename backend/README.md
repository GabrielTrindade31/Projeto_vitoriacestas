# Backend

Serviço em Python para o módulo de estoque. O ambiente usa apenas a biblioteca padrão do Python, com armazenamento em SQLite. Ajustes principais ficam em `config.py`.

## Como executar

```bash
python migrate.py
python server.py
```

O endpoint `/health` responde com o status do serviço.

## Cadastro de itens

`POST /items` cria um item de estoque com validações de obrigatoriedade, integridade de categoria e fornecedor e prevenção de nomes duplicados.

Exemplo de corpo:

```json
{
  "name": "Arroz",
  "description": "Pacote 5kg",
  "category_id": 1,
  "supplier_id": 1,
  "quantity": 10
}
```

## Migrations

Para criar ou atualizar o banco local, execute:

```bash
python migrate.py
```

As definições de tabela ficam em `migrations/001_create_tables.sql` com entidades para categorias, fornecedores e itens de estoque.
