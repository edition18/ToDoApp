export const projectForm = () => {
  clearDisplay();
  let formGroup = formGroupCreate();
  formGroup.appendChild(
    formGroupDiv().appendChild(
      formTextElementCreate("projectName", "enter your project name")
    )
  );
  document.getElementById("display").appendChild(formGroup);
  console.log("yes");
};

// title, description, dueDate, priority, notes, checklist

export const toggleActive = (element) => {
  // note the use of .classList method
  element.classList.contains("active")
    ? element.classList.remove("active")
    : element.setAttribute("class", "active");
};

export const createLabel = (id, name) => {
  let label = document.createElement("label");
  label.setAttribute("for", `${id}`);
  label.innerHTML = `${name}`;
  return label;
};

export const formGroupCreate = () => {
  let formGroup = document.createElement("form");
  return formGroup;
};

export const formTextElementCreate = (id, placeholder) => {
  let textElement = document.createElement("input");
  textElement.setAttribute("type", `text`);
  textElement.setAttribute("id", `${id}`);
  textElement.setAttribute("placeholder", `${placeholder}`);
  return textElement;
};

export const clearDisplay = () => {
  document.getElementById("display").innerHTML = ``;
};

export const formGroupDiv = () => {
  let formGroupDiv = document.createElement("div");
  formGroupDiv.setAttribute("class", "form-group");
  return formGroupDiv;
};
