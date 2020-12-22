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
    console.log(this.pages);
    this.pages.map((page) => {
      console.log(page);
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

  createFormButton(id, text, type) {
    let button = document.createElement("button");
    button.innerHTML = `${text}`;
    button.setAttribute("id", `${id}`);
    button.setAttribute("class", "btn");
    button.setAttribute("class", `btn-${type}`);
    return button;
  }

  displayProjects(projects) {
    this.currentPage = "linkViewAllProjects";
    this.toggleActive();
    this.clearDisplay();
    projects.map((project) => {
      let subitem = document.createElement("div");
      subitem.innerHTML = `${project.name}`;
      document.getElementById("display").appendChild(subitem);
      console.log(project);
    });
  }

  viewAllToDos(projects) {
    this.clearDisplay();
    let divElements = [];
    // collect all todos into a collection
    projects.map((project) =>
      project.todos.map((todo) => {
        divElements.push(todo);
      })
    );
  }

  createProjectForm() {
    this.currentPage = "linkCreateProjectForm";
    this.toggleActive();
    this.clearDisplay();
    let divElements = [];
    divElements.push(this.createLabel("projectName", "Project Name"));
    divElements.push(
      this.createFormTextElement("projectName", "create project name")
    );
    let formDiv = this.createFormGroupDiv();
    let formGroup = this.createFormGroup();

    divElements.map(function (item) {
      formDiv.append(item);
    });

    formGroup.appendChild(formDiv);
    formGroup.appendChild(
      this.createFormButton("projectName", "Submit", "primary")
    );
    document.getElementById("display").appendChild(formGroup);
  }
}
