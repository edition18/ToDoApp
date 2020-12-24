export class Model {
  constructor() {
    this.projects = [
      {
        name: "Test Project 1",
        todos: [
          {
            name: `item1`,
            description: `desc1`,
            dueDate: "11/11/2020",
            priority: "high",
            notes: "test1 notes",
            checklist: false,
          },
          {
            name: `item2`,
            description: `desc2`,
            dueDate: "11/11/2020",
            priority: "high",
            notes: "test2 notes",
            checklist: false,
          },
        ],
      },
      { name: "Test Project 2", todos: [] },
      { name: "Test Project 3", todos: [] },
    ];
  }

  createToDo(name, description, dueDate, priority, notes, checklist) {
    const todo = {
      name: name,
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
      name: name,
      todoList: [],
    };
    console.log(project);
    this.projects.push(project);
    console.log(this.projects);
  }

  hello() {
    console.log("hello");
  }
}
