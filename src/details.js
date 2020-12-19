export const loadDetails = () => {
  let target = document.getElementById("content");

  let createdElement = document.createElement("div");
  createdElement.setAttribute("id", "details");
  target.appendChild(createdElement);
  let title = document.createElement("h1");
  title.innerHTML = `This Restaurant is Great`;
  let picture = document.createElement("img");
  picture.setAttribute(
    "src",
    "http://weknowyourdreams.com/images/restaurant/restaurant-02.jpg"
  );
  let desc = document.createElement("div");
  desc.innerHTML = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore quo possimus sed. Placeat, saepe deleniti.`;

  createdElement.appendChild(title);
  createdElement.appendChild(picture);
  createdElement.appendChild(desc);
};
