console.log("dsd");

import { loadDetails } from "./details.js";
import { loadMenu } from "./menu.js";
import { loadContact } from "./contact.js";

const addListeners = () => {
  let details = document.getElementById("details");
  let contact = document.getElementById("contact");
  let menu = document.getElementById("menu");

  details.addEventListener("click", function () {
    clearContents();
    clearPages();
    currentPage(this.id);
    loadDetails();
  });
  contact.addEventListener("click", function () {
    clearContents();
    clearPages();
    currentPage(this.id);
    loadContact();
  });
  menu.addEventListener("click", function () {
    clearContents();
    clearPages();
    currentPage(this.id);
    loadMenu();
  });
};

const clearContents = () => {
  document.getElementById("content").innerHTML = ``;
};

const currentPage = (id) => {
  document.getElementById(`${id}`).style.color = "Blue";
};

const clearPages = () => {
  document.getElementById(`details`).style.color = "Black";
  document.getElementById(`contact`).style.color = "Black";
  document.getElementById(`menu`).style.color = "Black";
};

addListeners();
