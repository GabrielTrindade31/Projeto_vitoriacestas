import { createButton } from "./components/Button.js";
import { createInputField } from "./components/InputField.js";
import { createNotification } from "./components/Notification.js";
import { createTable } from "./components/Table.js";

const app = document.getElementById("app");
const title = document.createElement("h1");
title.textContent = "Cadastro de itens do estoque";
app.appendChild(title);

const notification = createNotification();
app.appendChild(notification.element);

const form = document.createElement("form");
form.className = "form-grid";

const nameField = createInputField({
  label: "Nome do item",
  name: "name",
  required: true,
  placeholder: "Digite o nome do item",
});

const descriptionField = createInputField({
  label: "Descrição",
  name: "description",
  placeholder: "Detalhes adicionais",
  multiline: true,
});

const quantityField = createInputField({
  label: "Quantidade",
  name: "quantity",
  type: "number",
  required: true,
  placeholder: "0",
});

const categoryField = createInputField({
  label: "Categoria (ID)",
  name: "category_id",
  type: "number",
  required: true,
  placeholder: "Ex.: 1",
});

const supplierField = createInputField({
  label: "Fornecedor (ID)",
  name: "supplier_id",
  type: "number",
  required: true,
  placeholder: "Ex.: 1",
});

form.append(
  nameField.wrapper,
  descriptionField.wrapper,
  quantityField.wrapper,
  categoryField.wrapper,
  supplierField.wrapper
);

const actions = document.createElement("div");
actions.className = "form-actions";

const submitButton = createButton({ label: "Salvar item", type: "submit" });
const resetButton = createButton({
  label: "Limpar",
  type: "button",
  variant: "secondary",
  onClick: () => form.reset(),
});

actions.append(submitButton, resetButton);
form.appendChild(actions);

const table = createTable({
  headers: [
    { key: "name", label: "Nome" },
    { key: "quantity", label: "Qtd" },
    { key: "category_id", label: "Categoria" },
    { key: "supplier_id", label: "Fornecedor" },
  ],
  rows: [],
});

const items = [];

function renderTable() {
  table.tbody.innerHTML = "";
  items.forEach((item) => {
    const row = document.createElement("tr");
    table.tbody.appendChild(row);

    ["name", "quantity", "category_id", "supplier_id"].forEach((key) => {
      const cell = document.createElement("td");
      cell.textContent = item[key];
      row.appendChild(cell);
    });
  });
}

async function submitItem(event) {
  event.preventDefault();
  notification.hide();

  const name = nameField.input.value.trim();
  const description = descriptionField.input.value.trim();
  const quantity = quantityField.input.value;
  const categoryId = categoryField.input.value;
  const supplierId = supplierField.input.value;

  if (!name || !quantity || !categoryId || !supplierId) {
    notification.show("Preencha todos os campos obrigatórios.", "error");
    return;
  }

  const quantityNumber = Number(quantity);
  if (!Number.isInteger(quantityNumber) || quantityNumber < 0) {
    notification.show("Quantidade deve ser um número inteiro não negativo.", "error");
    return;
  }

  const payload = {
    name,
    description: description || undefined,
    quantity: quantityNumber,
    category_id: Number(categoryId),
    supplier_id: Number(supplierId),
  };

  try {
    const response = await fetch("http://localhost:8000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      notification.show(data.message || "Erro ao salvar item.", "error");
      return;
    }

    items.unshift(data);
    renderTable();
    form.reset();
    notification.show("Item cadastrado com sucesso!", "success");
  } catch (error) {
    notification.show("Falha ao comunicar com o backend.", "error");
    console.error(error);
  }
}

form.addEventListener("submit", submitItem);

app.appendChild(form);
app.appendChild(table.wrapper);

renderTable();
