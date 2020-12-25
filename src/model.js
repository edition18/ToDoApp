const { DateTime } = require("luxon");

export class Model {
  constructor() {
    this.projects = [
      {
        name: "Test Project 1",
        todos: [
          {
            name: `item1`,
            description: `desc1`,
            dueDate: DateTime.local(2020, 12, 12),
            priority: "high",
            notes: "test1 notes",
            checked: true,
          },
          // {
          //   name: `item2`,
          //   description: `desc2`,
          //   dueDate: DateTime.local(2020, 12, 10),
          //   priority: "low",
          //   notes: "test2 notes",
          //   checked: false,
          // },
        ],
      },
      { name: "Test Project 2", todos: [] },
      { name: "Test Project 3", todos: [] },
    ];
  }

  createToDo(name, description, dueDate, priority, notes, checked) {
    const todo = {
      name: name,
      description: description,
      dueDate: dueDate,
      priority: priority,
      notes: notes,
      checked: checked,
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
