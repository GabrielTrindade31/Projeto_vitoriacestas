export function createNotification() {
  const element = document.createElement("div");
  element.className = "notification";
  element.style.display = "none";

  function show(message, variant = "success") {
    element.textContent = message;
    element.className = `notification ${variant}`.trim();
    element.style.display = "block";
  }

  function hide() {
    element.textContent = "";
    element.style.display = "none";
  }

  return { element, show, hide };
}
