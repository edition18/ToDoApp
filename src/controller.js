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
    console.log(this);
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
    console.log(document.getElementById("projectCreateButton"));
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
