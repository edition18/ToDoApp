export class Model {
  constructor() {
    this.projects = [
      { name: "Test Project 1", todoList: [] },
      { name: "Test Project 2", todoList: [] },
      { name: "Test Project 2", todoList: [] },
    ];
  }

  createToDo(title, description, dueDate, priority, notes, checklist) {
    const todo = {
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
      notes: notes,
      checklist: checklist,
    };

    return todo;
  }

  createProject(name) {
    const project = {
      title: name,
      todoList: [],
    };

    this.projects.push(project);
  }

  hello() {
    console.log("hello");
  }
}
