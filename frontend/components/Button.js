export function createButton({ label, type = "button", variant = "primary", onClick }) {
  const button = document.createElement("button");
  button.type = type;
  button.textContent = label;
  button.className = `button ${variant === "secondary" ? "secondary" : ""}`.trim();

  if (typeof onClick === "function") {
    button.addEventListener("click", onClick);
  }

  return button;
}
