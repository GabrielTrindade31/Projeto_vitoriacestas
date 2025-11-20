export function createTable({ headers = [], rows = [] }) {
  const wrapper = document.createElement("div");
  wrapper.className = "table-wrapper";

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  headers.forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header.label;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  rows.forEach((row) => {
    const tr = document.createElement("tr");
    headers.forEach((header) => {
      const td = document.createElement("td");
      td.textContent = row[header.key] ?? "";
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  wrapper.appendChild(table);

  return { wrapper, table, tbody };
}
