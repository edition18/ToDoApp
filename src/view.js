const { DateTime } = require("luxon");

export class View {
  constructor() {
    this.pages = [
      "linkViewAllProjects",
      "linkViewAllTodos",
      "linkCreateProjectForm",
      "linkCreateTodosForm",
    ];
    this.currentPage = null;
  }

  // bindModelAction(element, eventType, handlerCallback) {
  //   element.addEventListener(`${eventType}`, (event) => {
  //     event.preventDefault();
  //     handlerCallback(element.value);
  //     element.resetValue();
  //   });
  // }

  createFormTextElement(id, placeholder) {
    let textElement = document.createElement("input");
    textElement.setAttribute("type", `text`);
    textElement.setAttribute("id", `${id}`);
    textElement.setAttribute("class", "form-control"); //causes the element to become a block
    textElement.setAttribute("placeholder", `${placeholder}`);
    return textElement;
  }

  clearDisplay() {
    document.getElementById("display").innerHTML = ``;
  }

  resetValue(element) {
    element.value = ``;
  }

  createFormGroupDiv() {
    let formGroupDiv = document.createElement("div");
    formGroupDiv.setAttribute("class", "form-group");
    return formGroupDiv;
  }

  toggleActive() {
    this.pages.map((page) => {
      let element = document.getElementById(`${page}`);
      element.classList.contains("active")
        ? element.classList.remove("active")
        : "";
    });
    let currentElement = document.getElementById(`${this.currentPage}`);
    currentElement.classList.add("active");
  }

  createFormGroup() {
    let formGroup = document.createElement("form");
    return formGroup;
  }

  createLabel(id, name) {
    let label = document.createElement("label");
    label.setAttribute("for", `${id}`);
    label.innerHTML = `${name}`;
    return label;
  }

  createFormButton(id, text, type, display = "block") {
    let button = document.createElement("button");
    button.innerHTML = `${text}`;
    button.setAttribute("id", `${id}`);
    button.setAttribute("class", "btn");
    button.setAttribute("class", `btn-${type}`);
    button.style.display = `${display}`;
    return button;
  }

  displayProjects(projects) {
    this.currentPage = "linkViewAllProjects";
    this.toggleActive();
    this.clearDisplay();
    let display = document.getElementById("display");
    projects.map((project) => {
      let subitem = document.createElement("div");
      subitem.innerHTML = `${project.name}`;
      subitem.style.display = "inline-block";
      display.appendChild(subitem);
      display.appendChild(
        this.createFormButton(`${project.name}`, "delete", "danger")
      );
      display.appendChild(document.createElement("br"));
    });
  }

  viewAllToDos(projects) {
    this.clearDisplay();
    let display = document.getElementById("display");
    let todos = [];
    // collect all todos into a collection
    projects.map((project) =>
      project.todos.map((todo) => {
        todos.push(todo);
      })
    );
    todos.forEach((todo) => {
      let subDiv = document.createElement("div");
      let name = document.createElement("h1");
      name.innerHTML = `${todo.name}`;
      subDiv.appendChild(name);
      let description = document.createElement("div");
      description.innerHTML = `${todo.description}`;
      subDiv.appendChild(description);
      let dueDate = document.createElement("div");
      dueDate.innerHTML = `${todo.dueDate}`;
      subDiv.appendChild(dueDate);
      let priority = document.createElement("div");
      priority.innerHTML = `${todo.priority}`;
      subDiv.appendChild(priority);
      let notes = document.createElement("div");
      notes.innerHTML = `${todo.notes}`;
      subDiv.appendChild(notes);
      let checklist = document.createElement("div");
      checklist.innerHTML = `${todo.checklist}`;
      subDiv.appendChild(checklist);

      display.appendChild(subDiv);
    });
  }

  createProjectForm() {
    this.currentPage = "linkCreateProjectForm";
    this.toggleActive();
    this.clearDisplay();
    let divElements = [];
    divElements.push(this.createLabel("projectCreateName", "Project Name"));
    divElements.push(
      this.createFormTextElement("projectCreateName", "create project name")
    );
    let formDiv = this.createFormGroupDiv();
    let formGroup = this.createFormGroup();

    divElements.map(function (item) {
      formDiv.append(item);
    });

    formGroup.appendChild(formDiv);
    formGroup.appendChild(
      this.createFormButton("projectCreateButton", "submit", "primary")
    );
    document.getElementById("display").appendChild(formGroup);
  }
}
