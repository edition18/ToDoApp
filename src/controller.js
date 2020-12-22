export class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
  handleCreateProject(name) {
    this.model.createProject(name);
  }

  linkAllPages(controllerObject) {
    document
      .getElementById("linkViewAllProjects")
      .addEventListener("click", function () {
        controllerObject.view.displayProjects(controllerObject.model.projects);
      });
    // document
    //   .getElementById("linkViewAllTodos")
    //   .addEventListener("onclick", function () {
    //     this.viewAllToDos(controllerObject.model.projects);
    //   });
    document
      .getElementById("linkCreateProjectForm")
      .addEventListener("click", function () {
        controllerObject.view.createProjectForm();
      });
    // document
    //   .getElementById("linkCreateTodosForm")
    //   .addEventListener("onclick", controllerObject.view.createTodo());
  }
}
