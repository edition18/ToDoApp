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
        console.log("test");
      });
  }

  createProjectHandler() {
    let projectName = document.getElementById("projectName").value;
    console.log(projectName);
    console.log("test");
    document
      .getElementById("projectNameButton")
      .addEventListener("click", function (event) {
        event.preventDefault();
        if (document.getElementById("projectName").value !== ``) {
          //check if already exists in array
          if (
            this.checkProjectExists(
              projectName,
              controllerObject.model.projects
            )
          ) {
            this.addToProjects(projectName);
            alert("project created");
            projectName.value = ``;
          } else {
            console.log(`project already exists! add another project name!`);
          }

          // return error if so
          // if not then add to array
          // show alert that added succesfull
        } else {
          alert("please enter a project name");
        }
      });
  }

  checkProjectExists(projectName, projectsArray) {
    let listOfProjectNames = [];
    projectsArray.map((project) => listOfProjectNames.push(project.name));
    return listOfProjectNames.includes(str.trim(projectName)) ? true : false;
  }

  addToProjects(projectName) {
    controllerObject.model.projects.createProject(projectName);
  }
}
