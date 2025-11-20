export function createInputField({
  label,
  name,
  type = "text",
  placeholder = "",
  required = false,
  multiline = false,
  options = [],
}) {
  const wrapper = document.createElement("div");
  wrapper.className = "input-field";

  const labelElement = document.createElement("label");
  labelElement.textContent = label;
  labelElement.htmlFor = name;

  let inputElement;
  if (multiline) {
    inputElement = document.createElement("textarea");
    inputElement.rows = 3;
  } else if (type === "select") {
    inputElement = document.createElement("select");
    options.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.value = option.value;
      optionElement.textContent = option.label;
      inputElement.appendChild(optionElement);
    });
  } else {
    inputElement = document.createElement("input");
    inputElement.type = type;
  }

  inputElement.name = name;
  inputElement.id = name;
  inputElement.placeholder = placeholder;
  inputElement.required = required;

  wrapper.appendChild(labelElement);
  wrapper.appendChild(inputElement);

  return { wrapper, input: inputElement };
}
