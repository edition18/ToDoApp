export class View {
  constructor() {}
  // create the view for project Form
  displayProjectForm() {
    clearDisplay();
    let divElements = [];
    divElements.push(createLabel("projectName", "Project Name"));
    divElements.push(
      createFormTextElement("projectName", "create project name")
    );
    let formDiv = createFormGroupDiv();
    let formGroup = createFormGroup();

    divElements.map(function (item) {
      formDiv.append(item);
    });

    formGroup.appendChild(formDiv);
    formGroup.appendChild(createFormButton("projectName", "Submit", "primary"));
    document.getElementById("display").appendChild(formGroup);
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

  toggleActive(element) {
    // note the use of .classList method
    element.classList.contains("active")
      ? element.classList.remove("active")
      : element.setAttribute("class", "active");
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
    this.clearDisplay();
    projects.map((project) => {
      let subitem = document.createElement("div");
      subitem.innerHTML = `${project.name}`;
      document.getElementById("display").appendChild(subitem);
      console.log(project);
    });
  }
}
