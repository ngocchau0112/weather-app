//Get current Time
function currentDate() {
  let now = new Date();

  let date = now.getDate();
  let year = now.getFullYear();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let seconds = now.getSeconds();
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

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

  let current = document.querySelector("#current-date");
  current.innerHTML = `${day} (${date} ${month} ${year})<br>${hours}:${minutes}:${seconds}`;
}

currentDate();

//Format Day
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

//Get Forecast
function displayForecast(response) {
  let dailyForecast = response.data.daily;
  let forecast = document.querySelector("#forecast");
  let forecastHTML = ``;

  dailyForecast.forEach(function (day, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-2">
   <div class="day">
   <figure class="text-center">
    <span class="forecast-day">${formatDay(day.dt)}</span><br>
    <img class="forecast-icon" src="http://openweathermap.org/img/wn/${
      day.weather[0].icon
    }@2x.png" alt=""><br>
     <div class="weather-forecast-temp">
      <span class="temp-max">${Math.round(day.temp.max)}</span>
      <span class="temp-min">${Math.round(day.temp.min)}</span>
     </div>
     </figure>
   </div>
  </div>
  `;
      forecast.innerHTML = forecastHTML;
    }
  });
}

function getForecast(coordinates) {
  let weatherAPIKey = "e39c2d2fa97742a130427a035ad0b7a5";
  let weatherAPIUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&exclude=alerts&appid=${weatherAPIKey}`;

  axios.get(weatherAPIUrl).then(displayForecast);
}

//Get geolocation based on current position
function currentLocation(position) {
  let lat = position.coords.latitude.toFixed(4);
  let lon = position.coords.longitude.toFixed(4);
  let weatherAPIKey = "e39c2d2fa97742a130427a035ad0b7a5";
  let weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weatherAPIKey}`;
  axios.get(weatherAPIUrl).then(showWeather);
}
showCurrentLocation();
function showCurrentLocation() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}
let currentPositionButton = document.querySelector("#current-position-button");
currentPositionButton.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(currentLocation);
});
//Input a City and Search
function outputCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let city = `${searchInput.value}`;
  city = city.trim().toLowerCase();
  searchCity(city);
}
function searchCity(city) {
  let weatherAPIKey = "e39c2d2fa97742a130427a035ad0b7a5";
  let weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherAPIKey}`;
  let searchingStatus = document.querySelector("#searching-status");
  searchingStatus.innerHTML = `Searching for ${city}...`;
  axios.get(weatherAPIUrl).then(showWeather);
}
function showWeather(response) {
  let city = response.data.name;
  let temp = response.data.main.temp;
  let currentCityName = document.querySelector("#city-name");
  let currentTemp = document.querySelector("#city-temperature");
  let currentWeather = document.querySelector("#current-weather");
  let currentHumidity = document.querySelector("#humidity");
  let currentWindSpeed = document.querySelector("#wind");
  let currentWeatherIcon = document.querySelector("#current-weather-icon");
  let searchingStatus = document.querySelector("#searching-status");
  currentCityName.innerHTML = response.data.name;
  currentTemp.innerHTML = response.data.main.temp;
  currentWeather.innerHTML = response.data.weather[0].description;
  currentHumidity.innerHTML = response.data.main.humidity;
  currentWindSpeed.innerHTML = response.data.wind.speed;
  currentWeatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentWeatherIcon.setAttribute("alt", response.data.weather[0].description);
  searchingStatus.innerHTML = ``;
  getForecast(response.data.coord);

  if (city !== undefined) {
    let tempCityC = Math.round(response.data.main.temp);
    let tempCityF = Math.round((response.data.main.temp * 9) / 5 + 32);
    function changeToF(event) {
      event.preventDefault();
      Cdegree.classList.remove("active");
      Fdegree.classList.add("active");
      currentTemp.innerHTML = `${tempCityF}`;
    }
    function changeToC(event) {
      event.preventDefault();
      Fdegree.classList.remove("active");
      Cdegree.classList.add("active");
      currentTemp.innerHTML = `${tempCityC}`;
    }
    let Fdegree = document.querySelector("#Fdegree");
    Fdegree.addEventListener("click", changeToF);
    let Cdegree = document.querySelector("#Cdegree");
    Cdegree.addEventListener("click", changeToC);
  } else {
    searchingStatus.innerHTML = `Sorry, we don't know the weather for ${city}, try going to <a href="https://www.google.com/search?q=weather+${city}">Google</a>`;
  }
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", outputCity);
//Show Lisbon Weather
function showLisbonWeather(event) {
  event.preventDefault();
  let city = "lisbon";
  searchCity(city);
}
let showLisbon = document.querySelector("#lisbon");
showLisbon.addEventListener("click", showLisbonWeather);
//Show Paris Weather
function showParisWeather(event) {
  event.preventDefault();
  let city = "paris";
  searchCity(city);
}
let showParis = document.querySelector("#paris");
showParis.addEventListener("click", showParisWeather);
//Show Sydney Weather
function showSydneyWeather(event) {
  event.preventDefault();
  let city = "sydney";
  searchCity(city);
}
let showSydney = document.querySelector("#sydney");
showSydney.addEventListener("click", showSydneyWeather);
//Show San Francisco Weather
function showSanFWeather(event) {
  event.preventDefault();
  let city = "san francisco";
  searchCity(city);
}
let showSanF = document.querySelector("#sanfrancisco");
showSanF.addEventListener("click", showSanFWeather);
