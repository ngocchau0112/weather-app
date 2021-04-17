function currentDate() {
  let now = new Date();

  let date = now.getDate();
  let year = now.getFullYear();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];

  let current = document.querySelector("#currentDate");
  current.innerHTML = `${day} (${date} ${month} ${year})<br>${hours}:${minutes}:${seconds}`;
}

currentDate();

function showCityName(response) {
  let currentCityName = document.querySelector("#city-name");
  currentCityName.innerHTML = response.data.name;

  let currentCityTemp = document.querySelector("#city-temperature");
  currentCityTemp.innerHTML = response.data.main.temp;

  let currentCityWeather = document.querySelector("#current-weather");
  currentCityWeather.innerHTML = response.data.weather[0].description;

  let tempCityC = Math.round(response.data.main.temp);
  let tempCityF = Math.round((response.data.main.temp * 9) / 5 + 32);

  function changeToF(event) {
    event.preventDefault();
    currentCityTemp.innerHTML = `${tempCityF}`;
  }

  function changeToC(event) {
    event.preventDefault();
    currentCityTemp.innerHTML = `${tempCityC}`;
  }

  document.querySelector("#Fdegree").addEventListener("click", changeToF);
  document.querySelector("#Cdegree").addEventListener("click", changeToC);
}

function currentLocation(position) {
  let lat = position.coords.latitude.toFixed(4);
  let lon = position.coords.longitude.toFixed(4);
  let weatherAPIKey = "e39c2d2fa97742a130427a035ad0b7a5";
  let weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weatherAPIKey}`;

  axios.get(weatherAPIUrl).then(showCityName);
}

showCurrentLocation();
function showCurrentLocation() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let currentPositionButton = document.querySelector("#current-position-button");
currentPositionButton.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(currentLocation);
});

function outputCity(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#city-input");
  let city = `${searchInput.value}`;
  city = city.trim().toLowerCase();
  let weatherAPIKey = "e39c2d2fa97742a130427a035ad0b7a5";
  let weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherAPIKey}`;

  let searchingStatus = document.querySelector("#searching-status");
  searchingStatus.innerHTML = `Searching for ${city}...`;

  axios.get(weatherAPIUrl).then(function (response) {
    let city = response.data.name;
    let temp = response.data.main.temp;

    let currentCityName = document.querySelector("#city-name");
    currentCityName.innerHTML = response.data.name;

    let currentTemp = document.querySelector("#city-temperature");
    currentTemp.innerHTML = response.data.main.temp;

    let currentWeather = document.querySelector("#current-weather");

    currentWeather.innerHTML = response.data.weather[0].description;
    searchingStatus.innerHTML = ``;

    if (city !== undefined) {
      //let humidity = weather[city].humidity;
      let tempC = Math.round(temp);
      let tempF = Math.round((temp * 9) / 5 + 32);

      currentTemp.innerHTML = `${tempC}`;

      function changeToF(event) {
        event.preventDefault();

        currentTemp.innerHTML = `${tempF}`;
      }

      function changeToC(event) {
        event.preventDefault();

        currentTemp.innerHTML = `${tempC}`;
      }

      document.querySelector("#Fdegree").addEventListener("click", changeToF);
      document.querySelector("#Cdegree").addEventListener("click", changeToC);
    } else {
      searchingStatus.innerHTML = `Sorry, we don't know the weather for ${city}, try going to https://www.google.com/search?q=weather+${city}`;
    }
  });
}

function enterCity(event) {
  event.preventDefault();

  if (event.keyCode === 13) {
    outputCity(event);
  }
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", outputCity);
form.addEventListener("keyup", enterCity);
