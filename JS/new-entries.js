let newEntries = [];

function readInputs() {
  let newEntry = {
    name: inputNamePost.value,
    date: inputDatePost.value,
    photo: inputPhoto.value,
    description: descriptionNewPost.value,
  };
  newEntries.push(newEntry);
  document.forms[0].reset();
}

function fillList() {
  let lis = "";
  for (let i = 0; i < newEntries.length; i++) {
    const { name, date, photo, description } = newEntries[i];
    lis += `<li>${name} , ${date} , ${photo} , ${description} <button data-pos="${i}">🗑</button><button data-pos="${i}">✍🏼</button><button id="saveButton">✅</button></li>`;
  }
  newEntriesList.innerHTML = lis;
}

function save() {
  const newPost = JSON.stringify(newEntries);
  localStorage.setItem("newPost", newPost);
}

function load() {
  const newPost = localStorage.getItem("newPost");
  newEntries = JSON.parse(newPost);
}

const inputNamePost = document.querySelector("#inputNamePost");
const inputDatePost = document.querySelector("#inputDatePost");
const inputPhoto = document.querySelector("#inputPhoto");
const descriptionNewPost = document.querySelector("#descriptionNewPost");
const newEntriesList = document.querySelector("#newEntriesList");
const submitNewPost = document.querySelector("#submitNewPost");
const cancelNewPost = document.querySelector("#cancelNewPost");

submitNewPost.addEventListener("click", function () {
  readInputs();
  fillList();
  save();
});

cancelNewPost.addEventListener("click", document.forms[0].reset());

newEntriesList.addEventListener("click", function (event) {
  if (event.target.tagName !== "BUTTON") {
    return;
  }

  const button = event.target;
  const index = button.dataset.pos;

  if (button.textContent === "🗑") {
    const result = confirm("Are you sure?");
    if (result) {
      newEntries.splice(index, 1);
    }
  }
  // else if (button.textContent === "✍🏼") {
  //   // newEntries[index].contentEditable = true;
  //   console.log(newEntries[index]);

  // } else if (button.textContent === "✅") {
  //   const result = confirm("Want to save changes?");
  //   if (result) {
  //     newEntriesList.update(updatedContent);
  //     newEntriesList.contentEditable = false;
  //     return;
  //   }
  // }

  fillList();
  save();
});

load();
fillList();
