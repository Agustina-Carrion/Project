const fetchLocations = document.querySelector("#fetchLocations");
const mapDiv = document.querySelector("#map");

function addMarker() {
  destinationsCoordinates.forEach(function (child) {
    new tt.Marker().setLngLat(child).addTo(map);
  });
}

let map = tt.map({
  key: "fbREUaAPdvSqFX1DAmzjJZtvuuWeMrsz",
  container: "map",
  zoom: 1,
});

map.addControl(new tt.FullscreenControl());
map.addControl(new tt.NavigationControl());

let destinationsCoordinates = [];

fetchLocations.addEventListener("click", function () {
  fetch("./destinations.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      destinationsCoordinates = result;
      addMarker();
    });
});
