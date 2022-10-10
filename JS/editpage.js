let newStyles = [];

function readInputs() {
  let newStyle = {
    backgroundColor: selectedBC.value,
    textColor: selectedTC.value,
    fontSize: selectedFS.value,
  };
  newStyles.push(newStyle);
  document.forms[0].reset();
}

function fillList() {
  let lis = "";
  for (let i = 0; i < newStyles.length; i++) {
    const { backgroundColor, textColor, fontSize } = newStyles[i];
    lis += `<li>${backgroundColor} , ${textColor} , ${fontSize} <button data-pos="${i}">Apply Changes</button><button data-pos="${i}">Delete Changes</button></li>`;
  }
  stylesList.innerHTML = lis;
}

function save() {
  const newStyle = JSON.stringify(newStyles);
  localStorage.setItem("newStyle", newStyle);
}

function load() {
  const newStyle = localStorage.getItem("newStyle");
  newStyles = JSON.parse(newStyle);
}

let newArray = [];
function convertListIntoArray() {
  newArray = Array.from(stylesList.childNodes);
  return newArray;
}

const selectedBC = document.querySelector("#selectedBC");
const selectedTC = document.querySelector("#selectedTC");
const selectedFS = document.querySelector("#selectedFS");
const stylesList = document.querySelector("#stylesList");
const saveChanges = document.querySelector("#saveChanges");
const cancelChanges = document.querySelector("#cancelChanges");

saveChanges.addEventListener("click", function () {
  readInputs();
  fillList();
  save();
});

cancelChanges.addEventListener("click", document.forms[0].reset());

stylesList.addEventListener("click", function (event) {
  if (event.target.tagName !== "BUTTON") {
    return;
  }

  const button = event.target;
  const index = button.dataset.pos;

  if (button.textContent === "Apply Changes") {
    const container = document.querySelector(".container");
    const title = document.querySelector(".title");
    convertListIntoArray();

    let styleDetails = newArray[index].childNodes[index].data.split(" ");

    console.log(styleDetails);

    container.style.backgroundColor = styleDetails[0];
    title.style.color = styleDetails[2];
    title.style.fontSize = styleDetails[4];
  } else if (button.textContent === "Delete Changes") {
    const result = confirm("Are you sure?");
    if (result) {
      newStyles.splice(index, 1);
    }
  }

  fillList();
  save();
});

load();
fillList();
