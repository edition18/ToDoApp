import { View } from "./view.js";
import { Controller } from "./controller.js";
import { Model } from "./model.js";
const { DateTime } = require("luxon");

const app = new Controller(new Model(), new View());

// split the app by views

// default view show current projects
// bind all other keys with their respective pages
// app.view.displayProjects(app.model.projects);

app.start();
