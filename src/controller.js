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
      if (buttons[i].id == "edit") {
        buttons[i].addEventListener("click", function () {
          controllerObject.view.viewEditToDo(
            buttons[i].parentNode.id,
            controllerObject
          );
        });
      }
      if (buttons[i].id == "delete") {
        buttons[i].addEventListener("click", function () {
          controllerObject.deleteTodoHandler(
            buttons[i].parentNode.id,
            controllerObject
          );
        });
      }
    }
  }

  deleteTodoHandler(parentDivId, controllerObject) {
    const [projectName, todoName] = parentDivId.split("&");
    console.log(projectName);
    console.log(todoName);
    const proj = this.model.projects.find(
      (project) => project.name == projectName
    );

    const todoToRemove = proj.todos.find((todo) => todo.name == todoName);
    let filteredTodos = proj.todos.filter(
      (todo) => todo.name !== todoToRemove.name
    );

    console.log(filteredTodos);
    proj.todos = filteredTodos;
    controllerObject.linkViewAllTodos(controllerObject);
  }

  editTodoHandler(parentDivId) {
    const [projectName, todoName] = parentDivId.split("&");

    let proj = this.model.projects.find(
      (project) => project.name == projectName
    );

    let todo = proj.todos.find((todo) => todo.name == todoName);
    let childs = document.getElementById(parentDivId).childNodes;
    // console.log(todo);
    // console.log(childs);

    for (let i = 0; i < childs.length; i++) {
      console.log(childs[i].id);
      if (todo[childs[i].id]) {
        // truthy
        todo[childs[i].id] = childs[i].value;
      }
      if (childs[i].id == "checkbox") {
        todo["checked"] = childs[i].checked;
      }
    }
    console.log(todo);
    this.linkViewAllTodos(this);
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
      if (this.checkProjectExists(projectName)) {
        alert(`project already exists! add another project name!`);
      } else {
        this.addToProjects(projectName);
        alert("project created");
        projectName = " ";
      }
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
