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

  createLabel(id = "", name) {
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
    // collect all todos into a collection
    projects.map((project) => {
      let projectDiv = document.createElement("div");
      let projectDivName = document.createElement("h2");
      projectDivName.innerHTML = `${project.name}`;

      projectDiv.appendChild(projectDivName);
      project.todos.map((todo) => {
        let subDiv = document.createElement("div");
        subDiv.setAttribute("id", `${project.name}&${todo.name}`);
        //name
        let name = document.createElement("h3");
        name.setAttribute("id", `name`);
        name.style.display = "inline-block";
        name.innerHTML = `${todo.name}`;
        subDiv.appendChild(name);

        //luxon DateTIme object
        let dueDate = document.createElement("p");
        dueDate.setAttribute("id", `dueDate`);
        dueDate.style.display = "block";
        dueDate.style.cssFloat = "right";
        dueDate.innerHTML = `${todo.dueDate.toLocaleString()}`;
        subDiv.appendChild(dueDate);
        subDiv.appendChild(document.createElement("br"));
        //priority
        let priority = document.createElement("h5");
        priority.setAttribute("id", `priority`);
        priority.style.display = "block";
        priority.style.textAlign = "right";
        priority.style.width = "80px";
        priority.style.cssFloat = "right";
        priority.innerHTML = `${todo.priority}`;
        if (priority.innerHTML == "high") {
          priority.style.color = "red";
        } else if (priority.innerHTML == "medium") {
          priority.style.color = "orange";
        } else {
          priority.style.color = "black";
        }

        subDiv.appendChild(priority);

        //label
        subDiv.appendChild(this.createLabel("", "Done?"));
        //checked??
        let checked = document.createElement("input");
        checked.setAttribute("id", `checked`);
        checked.setAttribute("class", "mx-2");
        checked.setAttribute("type", "checkbox");
        checked.disabled = true;
        todo.checked == true
          ? (checked.checked = true)
          : (checked.checked = false);
        subDiv.appendChild(checked);
        subDiv.appendChild(document.createElement("br")); // do multiple times
        subDiv.appendChild(document.createElement("br")); // do multiple times

        //description
        let description = document.createElement("p");
        description.setAttribute("id", `description`);
        description.setAttribute("class", "lead");
        description.innerHTML = `${todo.description}`;
        subDiv.appendChild(description);

        //notes
        let notes = document.createElement("p");
        notes.setAttribute("id", `notes`);
        notes.innerHTML = `${todo.notes}`;
        subDiv.appendChild(notes);

        //edit button
        let editButton = this.createFormButton(`edit`, "edit", "warning");
        editButton.style.display = "inline-block";
        subDiv.appendChild(editButton);

        //delete button
        let deleteButton = this.createFormButton(`delete`, "delete", "danger");
        deleteButton.style.display = "inline-block";
        deleteButton.addEventListener("click", function () {});

        subDiv.appendChild(deleteButton);

        //finally append
        projectDiv.appendChild(subDiv);
      });
      display.appendChild(projectDiv);
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
  viewEditToDo(parentDivId, controllerObject) {
    let childs = document.getElementById(parentDivId).childNodes;
    for (let i = 0; i < childs.length; i++) {
      if (childs[i].tagName == "H3") {
        let replacement = document.createElement("input");
        replacement.setAttribute("type", `text`);
        replacement.setAttribute("class", "form-control");
        replacement.setAttribute("id", `${childs[i].id}`);
        replacement.setAttribute("value", `${childs[i].innerHTML}`);
        childs[i].replaceWith(replacement);
      } else if (childs[i].tagName == "P") {
        let replacement = document.createElement("input");
        replacement.setAttribute("type", `text`);
        replacement.setAttribute("class", "form-control");
        replacement.setAttribute("id", `${childs[i].id}`);
        replacement.setAttribute("value", `${childs[i].innerHTML}`);
        childs[i].replaceWith(replacement);
      } else if (childs[i].tagName == "H5") {
        let replacement = document.createElement("select");
        replacement.style.cssFloat = "right";
        replacement.setAttribute("id", `${childs[i].id}`);
        let option1 = document.createElement("option");
        option1.value = "high";
        option1.innerHTML = "high";
        replacement.appendChild(option1);
        let option2 = document.createElement("option");
        option2.value = "medium";
        option2.innerHTML = "medium";
        replacement.appendChild(option2);
        let option3 = document.createElement("option");
        option3.value = "low";
        option3.innerHTML = "low";
        replacement.appendChild(option3);
        childs[i].replaceWith(replacement);
      } else if (childs[i].tagName == "INPUT") {
        childs[i].disabled = false;
      } else if (childs[i].tagName == "BUTTON" && childs[i].id == "edit") {
        let replacement = this.createFormButton(parentDivId, "done", "info");
        replacement.style.display = "inline-block";
        replacement.addEventListener("click", function (event) {
          event.preventDefault();
          controllerObject.editTodoHandler(parentDivId);
        });
        childs[i].replaceWith(replacement);
      }
    }
  }
}
