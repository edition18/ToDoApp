export class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
  handleCreateProject(name) {
    this.model.createProject(name);
  }

  start() {
    // create reference to current app object so it is easy to work with
    let controllerObject = this;
    // add listeners for all of the buttons so that no error is thrown
    document
      .getElementById("linkViewAllProjects")
      .addEventListener("click", function () {
        // this would refer to the element rather than the controller object
        controllerObject.linkViewAllProjects(controllerObject);
      });
    document
      .getElementById("linkCreateProjectForm")
      .addEventListener("click", function () {
        controllerObject.linkCreateProjectForm(controllerObject);
      });
    document
      .getElementById("linkViewAllTodos")
      .addEventListener("click", function () {
        controllerObject.linkViewAllTodos(controllerObject);
      });

    this.linkViewAllTodos(controllerObject);
  }

  linkViewAllTodos(controllerObject) {
    controllerObject.view.viewAllToDos(controllerObject.model.projects);
    let buttons = document.getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
      button[i].addEventListener("click", function () {
        controllerObject.editTodo(buttons[i].parentNode.id);
      });
    }
  }

  editTodo(parentDivId) {
    let controllerObject = this;

    let parentNode = document.getElementById(parentDivId);

    let childs = document.getElementById(parentDivId).childNodes;
    console.log(childs);
    const [projectName, todoName] = parentDivId.split("&");

    for (let i = 0; i < childs.length; i++) {
      if (childs[i].tagName == "H3") {
        console.log(childs[i]);
        let replacement = document.createElement("input");
        replacement.setAttribute("type", `text`);
        replacement.setAttribute("class", "form-control");
        replacement.setAttribute("id", `${childs[i].id}`);
        replacement.setAttribute("placeholder", `${childs[i].innerHTML}`);
        childs[i].replaceWith(replacement);
      } else if (childs[i].tagName == "P") {
        console.log(childs[i]);
        let replacement = document.createElement("input");
        replacement.setAttribute("type", `text`);
        replacement.setAttribute("class", "form-control");
        replacement.setAttribute("id", `${childs[i].id}`);
        replacement.setAttribute("placeholder", `${childs[i].innerHTML}`);
        childs[i].replaceWith(replacement);
      } else if (childs[i].tagName == "INPUT") {
        childs[i].disabled = false;
      } else if (childs[i].tagName == "BUTTON") {
        let replacement = this.view.createFormButton(
          parentDivId,
          "done",
          "info"
        );
        replacement.addEventListener("click", function (event) {
          event.preventDefault();
          controllerObject.editTodoHandler(parentDivId);
        });
        childs[i].replaceWith(replacement);
      }
    }
    //can we convert all elements to free form text? or clickable checkbox

    // const foundProject = this.model.projects.find(
    //   (project) => (project.name = projectName)
    // );
    // const foundToDo = foundProject.find((todo) => (todo.name = todoName));
  }

  linkViewAllProjects(controllerObject) {
    controllerObject.view.displayProjects(controllerObject.model.projects);
    controllerObject.bindProjectDeleteButton();
  }

  bindProjectDeleteButton() {
    let controllerObject = this;
    let listOfProjectNames = [];
    controllerObject.model.projects.forEach((project) =>
      listOfProjectNames.push(project.name)
    );
    listOfProjectNames.forEach((projectName) =>
      document
        .getElementById(projectName)
        .addEventListener("click", function () {
          console.log("test");
          controllerObject.deleteProjectHandler(projectName);
        })
    );
  }

  deleteProjectHandler(projectName) {
    let filteredProjects = [];
    this.model.projects.forEach((project) => {
      project.name !== projectName ? filteredProjects.push(project) : "";
    });
    // replace array
    this.model.projects = filteredProjects;
    this.linkViewAllProjects(this);
  }

  linkCreateProjectForm(controllerObject) {
    controllerObject.view.createProjectForm();
    document
      .getElementById("projectCreateButton")
      .addEventListener("click", function (event) {
        event.preventDefault();
        controllerObject.createProjectHandler();
      });
  }

  createProjectHandler() {
    let projectName = document.getElementById("projectCreateName").value;
    if (projectName !== ``) {
      //check if already exists in array
      if (this.checkProjectExists(projectName)) {
        alert(`project already exists! add another project name!`);
      } else {
        this.addToProjects(projectName);
        alert("project created");
        projectName = " ";
      }

      // return error if so
      // if not then add to array
      // show alert that added succesfull
    } else {
      alert("please enter a project name");
    }
  }

  checkProjectExists(projectName) {
    let listOfProjectNames = [];
    this.model.projects.forEach((project) =>
      listOfProjectNames.push(project.name)
    );
    console.log(listOfProjectNames);
    return listOfProjectNames.includes(projectName.trim()) ? true : false;
  }

  addToProjects(projectName) {
    this.model.createProject(projectName);
  }
}
