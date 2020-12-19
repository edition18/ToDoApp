export const loadMenu = () => {
  let target = document.getElementById("content");

  let createdElement = document.createElement("div");
  createdElement.setAttribute("id", "details");
  target.appendChild(createdElement);
  let title = document.createElement("h1");
  title.innerHTML = `Menu`;
  let desc = document.createElement("div");
  desc.innerHTML = `Chicken Fillet`;

  createdElement.appendChild(title);
  createdElement.appendChild(desc);
};
