function createCard(card, index) {
  const cardTemplate = `
  <div class="column is-one-third-desktop is-flex">
  <div class="card">
  <button data-index="${index}" class="delete is-large"></button>
    <div class="card-image">
      <figure class="image">
        <img
          src="${card.image}"
          alt="${card.imageAltText}"
        />
      </figure>
    </div>
    <div class="card-content">
      <div class="media is-align-items-center">
        <div class="media-left">
          <figure class="image is-48x48">
            <img id="weatherIcon-${card.city}"
              src="${card.thumbnail}"
              alt="${card.thumbnailAltText}"
            />
          </figure>
        <div id="weatherBox-${card.city}" style="width: 150px">Weather's loading</div>
        </div>
        <div class="media-content">
          <p class="title is-4">${card.name}</p>
          <p class="subtitle is-6">${card.date}</p>
        </div>
      </div>

      <div class="content">
      ${card.description}
      </div>
    </div>
  </div>
</div>`;
  return cardTemplate;
}

let cards = [];

function renderCards() {
  cardContainer.innerHTML = "";
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    cardContainer.innerHTML += createCard(card, i);
    fetchWeather(card.city);
  }
}

const cardContainer = document.querySelector("#cardContainer");
const weatherIcon = document.querySelector(".weatherIcon");

fetch("./destinations.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (result) {
    cards = result;
    renderCards();
  })
  .catch(function (error) {
    alert("There's an error somewhere!");
  });

function fetchWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fe9b9d62a21b37d39baab5ed769d8339&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      const icon = result.weather[0].icon;
      const weatherIcon = document.querySelector(`#weatherIcon-${city}`);
      weatherIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      const weatherBox = document.querySelector(`#weatherBox-${city}`);
      weatherBox.innerHTML = `<strong>${result.name}</strong>,<em> ${result.weather[0].main}</em> <br/> Temp ${result.main.temp}°`;
    })
    .catch(function (error) {
      console.log(error);
    });
}

cardContainer.addEventListener("click", function (event) {
  if (event.target.tagName !== "BUTTON") {
    return;
  }
  const index = event.target.dataset.index;
  cards.splice(index, 1);
  renderCards();
  // console.log(event.target);
  // alert(event.target.dataset.index);
});
