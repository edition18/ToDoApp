export class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
  handleCreateProject(name) {
    this.model.createProject(name);
  }

  start(controllerObject) {
    // add listeners for all of the buttons so that no error is thrown

    document
      .getElementById("linkViewAllProjects")
      .addEventListener("click", function () {
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
    console.log(projectName);
    console.log("test");
    if (projectName !== ``) {
      //check if already exists in array
      if (this.checkProjectExists(projectName, this.model.projects)) {
        console.log(`project already exists! add another project name!`);
      } else {
        this.addToProjects(projectName, this);
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

  checkProjectExists(projectName, projectsArray) {
    let listOfProjectNames = [];
    projectsArray.map((project) => listOfProjectNames.push(project.name));
    console.log(listOfProjectNames);
    return listOfProjectNames.includes(projectName.trim()) ? true : false;
  }

  addToProjects(projectName, controllerObject) {
    controllerObject.model.createProject(projectName);
  }
}
