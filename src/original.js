class TodoItem {
  constructor(title, description, dueDate, priority, notes, checklist) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist;
  }
}

class Project {
  constructor(name) {
    this.name = name;
    this.list = [];
  }
}
