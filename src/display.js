import { TodoItem, Project } from "./objects.js";

export const projectForm = () => {
  clearDisplay();
  let divElements = [];
  divElements.push(createLabel("projectName", "Project Name"));
  divElements.push(createFormTextElement("projectName", "create project name"));
  let formDiv = createFormGroupDiv();
  let formGroup = createFormGroup();

  divElements.map(function (item) {
    formDiv.append(item);
  });

  formGroup.appendChild(formDiv);
  formGroup.appendChild(createFormButton("projectName", "Submit", "primary"));
  document.getElementById("display").appendChild(formGroup);
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

export const createFormGroup = () => {
  let formGroup = document.createElement("form");
  return formGroup;
};

export const createFormTextElement = (id, placeholder) => {
  let textElement = document.createElement("input");
  textElement.setAttribute("type", `text`);
  textElement.setAttribute("id", `${id}`);
  textElement.setAttribute("class", "form-control"); //causes the element to become a block
  textElement.setAttribute("placeholder", `${placeholder}`);
  return textElement;
};

export const clearDisplay = () => {
  document.getElementById("display").innerHTML = ``;
};

export const createFormGroupDiv = () => {
  let formGroupDiv = document.createElement("div");
  formGroupDiv.setAttribute("class", "form-group");
  return formGroupDiv;
};

export const createFormButton = (id, text, type) => {
  let button = document.createElement("button");
  button.innerHTML = `${text}`;
  button.setAttribute("id", `${id}`);
  button.setAttribute("class", "btn");
  button.setAttribute("class", `btn-${type}`);
  button.addEventListener("click", function (event) {
    event.preventDefault();
    projectSubmit(projectArray);
  });
  return button;
};

export const projectSubmit = (projectArray) => {
  console.log(document.getElementById("projectName").value);
  let createdProject = new Project(
    document.getElementById("projectName").value
  );
  projectArray.push(createdProject);
};
