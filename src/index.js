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

//Get geolocation based on current position
function showCurrentCity(response) {
  let currentCityName = document.querySelector("#city-name");
  let currentTemp = document.querySelector("#city-temperature");
  let currentWeather = document.querySelector("#current-weather");
  let currentHumidity = document.querySelector("#humidity");
  let currentWindSpeed = document.querySelector("#wind");

  currentCityName.innerHTML = response.data.name;
  currentTemp.innerHTML = response.data.main.temp;
  currentWeather.innerHTML = response.data.weather[0].description;
  currentHumidity.innerHTML = response.data.main.humidity;
  currentWindSpeed.innerHTML = response.data.wind.speed;

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

  axios.get(weatherAPIUrl).then(showCurrentCity);
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
  let weatherAPIKey = "e39c2d2fa97742a130427a035ad0b7a5";
  let weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherAPIKey}`;

  let searchingStatus = document.querySelector("#searching-status");
  searchingStatus.innerHTML = `Searching for ${city}...`;

  axios.get(weatherAPIUrl).then(function (response) {
    let city = response.data.name;
    let temp = response.data.main.temp;

    let currentCityName = document.querySelector("#city-name");
    let currentTemp = document.querySelector("#city-temperature");
    let currentWeather = document.querySelector("#current-weather");
    let currentHumidity = document.querySelector("#humidity");
    let currentWindSpeed = document.querySelector("#wind");

    currentCityName.innerHTML = response.data.name;
    currentTemp.innerHTML = response.data.main.temp;
    currentWeather.innerHTML = response.data.weather[0].description;
    currentHumidity.innerHTML = response.data.main.humidity;
    currentWindSpeed.innerHTML = response.data.wind.speed;
    searchingStatus.innerHTML = ``;

    if (city !== undefined) {
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

//Show Lisbon Weather
function showLisbonWeather(event) {
  event.preventDefault();
  let city = "lisbon";

  let weatherAPIKey = "e39c2d2fa97742a130427a035ad0b7a5";
  let weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherAPIKey}`;

  axios.get(weatherAPIUrl).then(function (response) {
    let temp = response.data.main.temp;

    let currentCityName = document.querySelector("#city-name");
    let currentTemp = document.querySelector("#city-temperature");
    let currentWeather = document.querySelector("#current-weather");
    let currentHumidity = document.querySelector("#humidity");
    let currentWindSpeed = document.querySelector("#wind");

    currentCityName.innerHTML = response.data.name;
    currentTemp.innerHTML = response.data.main.temp;
    currentWeather.innerHTML = response.data.weather[0].description;
    currentHumidity.innerHTML = response.data.main.humidity;
    currentWindSpeed.innerHTML = response.data.wind.speed;
    searchingStatus.innerHTML = ``;

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
  });
}

let showLisbon = document.querySelector("#lisbon");
showLisbon.addEventListener("click", showLisbonWeather);

//Show Paris Weather
function showParisWeather(event) {
  event.preventDefault();
  let city = "paris";

  let weatherAPIKey = "e39c2d2fa97742a130427a035ad0b7a5";
  let weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherAPIKey}`;

  axios.get(weatherAPIUrl).then(function (response) {
    let temp = response.data.main.temp;

    let currentCityName = document.querySelector("#city-name");
    let currentTemp = document.querySelector("#city-temperature");
    let currentWeather = document.querySelector("#current-weather");
    let currentHumidity = document.querySelector("#humidity");
    let currentWindSpeed = document.querySelector("#wind");

    currentCityName.innerHTML = response.data.name;
    currentTemp.innerHTML = response.data.main.temp;
    currentWeather.innerHTML = response.data.weather[0].description;
    currentHumidity.innerHTML = response.data.main.humidity;
    currentWindSpeed.innerHTML = response.data.wind.speed;
    searchingStatus.innerHTML = ``;

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
  });
}

let showParis = document.querySelector("#paris");
showParis.addEventListener("click", showParisWeather);

//Show Sydney Weather
function showSydneyWeather(event) {
  event.preventDefault();
  let city = "sydney";

  let weatherAPIKey = "e39c2d2fa97742a130427a035ad0b7a5";
  let weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherAPIKey}`;

  axios.get(weatherAPIUrl).then(function (response) {
    let temp = response.data.main.temp;

    let currentCityName = document.querySelector("#city-name");
    let currentTemp = document.querySelector("#city-temperature");
    let currentWeather = document.querySelector("#current-weather");
    let currentHumidity = document.querySelector("#humidity");
    let currentWindSpeed = document.querySelector("#wind");

    currentCityName.innerHTML = response.data.name;
    currentTemp.innerHTML = response.data.main.temp;
    currentWeather.innerHTML = response.data.weather[0].description;
    currentHumidity.innerHTML = response.data.main.humidity;
    currentWindSpeed.innerHTML = response.data.wind.speed;
    searchingStatus.innerHTML = ``;

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
  });
}

let showSydney = document.querySelector("#sydney");
showSydney.addEventListener("click", showSydneyWeather);

//Show San Francisco Weather
function showSanFWeather(event) {
  event.preventDefault();
  let city = "san francisco";

  let weatherAPIKey = "e39c2d2fa97742a130427a035ad0b7a5";
  let weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherAPIKey}`;

  axios.get(weatherAPIUrl).then(function (response) {
    let temp = response.data.main.temp;

    let currentCityName = document.querySelector("#city-name");
    let currentTemp = document.querySelector("#city-temperature");
    let currentWeather = document.querySelector("#current-weather");
    let currentHumidity = document.querySelector("#humidity");
    let currentWindSpeed = document.querySelector("#wind");

    currentCityName.innerHTML = response.data.name;
    currentTemp.innerHTML = response.data.main.temp;
    currentWeather.innerHTML = response.data.weather[0].description;
    currentHumidity.innerHTML = response.data.main.humidity;
    currentWindSpeed.innerHTML = response.data.wind.speed;
    searchingStatus.innerHTML = ``;

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
  });
}

let showSanF = document.querySelector("#sanfrancisco");
showSanF.addEventListener("click", showSanFWeather);
