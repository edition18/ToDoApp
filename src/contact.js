export const loadContact = () => {
  let target = document.getElementById("content");

  let createdElement = document.createElement("div");
  createdElement.setAttribute("id", "details");
  target.appendChild(createdElement);
  let title = document.createElement("h1");
  title.innerHTML = `Contact`;
  let desc = document.createElement("div");
  desc.innerHTML = `+85 2313 3213`;

  createdElement.appendChild(title);
  createdElement.appendChild(desc);
};
