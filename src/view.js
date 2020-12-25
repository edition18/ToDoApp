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
        let replacement = document.createElement("input");
        replacement.setAttribute("id", `checked`);
        replacement.setAttribute("class", "mx-2");
        replacement.setAttribute("type", "checkbox");
        childs[i].checked ? replacement.setAttribute("checked", "") : "";
        childs[i].replaceWith(replacement);
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
  createTodoForm(controllerObject) {
    this.currentPage = "linkCreateTodosForm";
    this.toggleActive();
    this.clearDisplay();
    let namesOfProjects = [];
    let todoFormArea = document.createElement("div");
    document
      .getElementById("display")
      .appendChild(this.createLabel("", "Create Todo"));
    document
      .getElementById("display")
      .appendChild(document.createElement("br"));
    controllerObject.model.projects.forEach((project) => {
      namesOfProjects.push(project.name);
    });

    //add projects available
    let toggleProjectName = document.createElement("select");
    toggleProjectName.setAttribute("id", `projectName`);
    namesOfProjects.forEach((name) => {
      let option = document.createElement("option");
      option.value = name;
      option.innerHTML = name;
      toggleProjectName.appendChild(option);
    });
    todoFormArea.appendChild(this.createLabel("", "Project:"));
    todoFormArea.appendChild(toggleProjectName);
    todoFormArea.appendChild(document.createElement("br"));

    //add todoName available
    let todoNameLabel = this.createLabel("", "Todo Name:");
    todoNameLabel.style.display = "inline";
    todoFormArea.appendChild(todoNameLabel);
    let todoName = this.createFormTextElement("name", "add a todo name");
    todoName.style.width = "auto";
    todoName.style.display = "inline";
    todoFormArea.appendChild(todoName);

    //add date
    let date = this.createFormTextElement("dueDate", "dueDate");
    date.style.width = "150px";
    date.style.display = "inline";
    date.style.cssFloat = "right";
    todoFormArea.appendChild(date);
    let dateLabel = this.createLabel("", "Date:");
    dateLabel.style.display = "inline";
    dateLabel.style.cssFloat = "right";
    todoFormArea.appendChild(dateLabel);
    todoFormArea.appendChild(document.createElement("br"));

    // add checked
    let doneLabel = this.createLabel("", "Done?");
    doneLabel.style.display = "inline";
    todoFormArea.appendChild(doneLabel);
    let checked = document.createElement("input");
    checked.setAttribute("id", `checked`);
    checked.setAttribute("class", "mx-2");
    checked.setAttribute("type", "checkbox");
    checked.style.width = "auto";
    checked.style.display = "inline";
    todoFormArea.appendChild(checked);

    //add priority
    let priority = document.createElement("select");
    priority.setAttribute("id", `priority`);
    let prioritySet = ["low", "medium", "high"];
    prioritySet.forEach((name) => {
      let option = document.createElement("option");
      option.value = name;
      option.innerHTML = name;
      priority.appendChild(option);
    });

    priority.style.width = "150px";
    priority.style.display = "inline";
    priority.style.cssFloat = "right";
    todoFormArea.appendChild(priority);
    let priorityLabel = this.createLabel("", "Priority:");
    priorityLabel.style.display = "inline";
    priorityLabel.style.cssFloat = "right";
    todoFormArea.appendChild(priorityLabel);
    todoFormArea.appendChild(document.createElement("br"));

    //desc
    let descriptionLabel = this.createLabel("", "Description");
    todoFormArea.appendChild(descriptionLabel);
    let description = this.createFormTextElement(
      "description",
      "add description"
    );
    todoFormArea.appendChild(description);
    todoFormArea.appendChild(document.createElement("br"));
    //notes
    let notesLabel = this.createLabel("", "Notes");
    todoFormArea.appendChild(notesLabel);
    let notes = this.createFormTextElement("notes", "add notes");
    todoFormArea.appendChild(notes);
    todoFormArea.appendChild(document.createElement("br"));

    //add button
    todoFormArea.appendChild(
      this.createFormButton("todoCreateButton", "create", "primary")
    );
    //append to display
    document.getElementById("display").appendChild(todoFormArea);
  }
}
