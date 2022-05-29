// apiKey = "5a38587bb876207d38825820b4844cd0";

var submitCityEl = document.querySelector("#search");
var cityInputEl = document.querySelector("#city");
var weatherCards = document.querySelector("#weather-cards");
var weatherDash = document.querySelector("#weather-dash");
var searchEl = document.querySelector("#previous");

var uniqueId = 0;

var citySubmitHandler = function (event) {
  event.preventDefault();

  var city = cityInputEl.value.trim();

  localStorage.setItem(uniqueId, city);
  if (city) {
    get5Weather(city);
    getTodayWeather(city);
    lastSearch(city);
    cityInputEl.value = "";
  }
};

var lastSearch = function () {
  var lastCity = localStorage.getItem(uniqueId);
  uniqueId++;
  console.log("city", lastCity);

  var lastSearch = document.createElement("li");
  lastSearch.classList = "list-group-item";
  lastSearch.setAttribute("id", uniqueId);
  lastSearch.textContent = lastCity;

  var searchTerms = document.createElement("ul");
  searchTerms.appendChild(lastSearch);

  searchEl.appendChild(searchTerms);
};

var get5Weather = function (city) {
  var apiURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=imperial&appid=5a38587bb876207d38825820b4844cd0";

  fetch(apiURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          // console.log(data)
          displayWeatherCards(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to Weather App");
    });
};

var getTodayWeather = function (city) {
  var apiURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=5a38587bb876207d38825820b4844cd0";

  fetch(apiURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          // console.log(data)
          bigDash(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to Weather App");
    });
};

var bigDash = function (data) {
  weatherDash.innerHTML = "";

  var currentDate = moment().format("L");

  var cityWeather = data.weather[0].icon;

  var weatherIcon = "http://openweathermap.org/img/w/" + cityWeather + ".png";
  var weatherEl = document.createElement("img");
  weatherEl.classList = "card-title";
  weatherEl.src = weatherIcon;

  var cityName = data.name;

  var nameEl = document.createElement("h1");
  nameEl.classList = "card-title";
  nameEl.innerHTML = cityName + " (" + currentDate + ")";

  var dashHeader = document.createElement("div");
  dashHeader.appendChild(nameEl);
  dashHeader.appendChild(weatherEl);

  var cityTemp = "Temperature: " + data.main.temp + " °F";

  var tempEl = document.createElement("p");
  tempEl.classList = "card-text";
  tempEl.textContent = cityTemp;

  var cityHumidity = "Humidity: " + data.main.humidity;

  var humidityEl = document.createElement("p");
  humidityEl.classList = "card-text";
  humidityEl.textContent = cityHumidity;

  var cityWind = "Wind Speed: " + data.wind.speed + " mph";

  var windEl = document.createElement("p");
  windEl.classList = "card-text";
  windEl.textContent = cityWind;

  var cityLon = data.coord.lon;

  var cityLat = data.coord.lat;

  // create Dashboard
  var dashCard = document.createElement("div");
  dashCard.classList = "card-body";

  // append
  dashCard.appendChild(dashHeader);
  dashCard.appendChild(tempEl);
  dashCard.appendChild(humidityEl);
  dashCard.appendChild(windEl);

  var uvURL =
    "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=5a38587bb876207d38825820b4844cd0&lat=" +
    cityLat +
    "&lon=" +
    cityLon;
  fetch(uvURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (uv) {
        var uvValue = uv[0].value;

        var uvEl = document.createElement("div");

        if (uvValue < 5) {
          uvEl.classList = "card text-white bg-success mb-3";
        } else if (uvValue > 5 && uvValue < 10) {
          uvEl.classList = "card text-white bg-warning mb-3";
        } else uvValue > 10;
        {
          uvEl.classList = "card text-white bg-danger mb-3";
        }
        uvEl.textContent = "UV Index: " + uvValue;
        dashCard.appendChild(uvEl);
      });
    }
  });

  weatherDash.appendChild(dashCard);
};

// cards
var displayWeatherCards = function (data) {
  weatherCards.innerHTML = "";

  //create loop for the 5 days
  for (var i = 0; i < 40; i += 8) {
    var origDate = moment(data.list[i].dt_txt.split(" ")[0], "YYYY-MM-DD");
    var cityDate = origDate.format("MM/DD/YY");

    var dateEl = document.createElement("h5");
    dateEl.classList = "card-title";
    dateEl.textContent = cityDate;

    var cityWeather = data.list[i].weather[0].icon;
    // console.log(cityWeather)

    var weatherIcon = "http://openweathermap.org/img/w/" + cityWeather + ".png";
    var weatherEl = document.createElement("img");
    weatherEl.classList = "card-text";
    weatherEl.src = weatherIcon;

    var cardHeader = document.createElement("div");
    cardHeader.appendChild(dateEl);
    cardHeader.appendChild(weatherEl);

    var cityTemp = "Temp: " + data.list[i].main.temp + " °F";
    var tempEl = document.createElement("p");
    tempEl.classList = "card-text";
    tempEl.textContent = cityTemp;

    var cityHumidity = "Humidity: " + data.list[i].main.humidity;
    var humidityEl = document.createElement("p");
    humidityEl.classList = "card-text";
    humidityEl.textContent = cityHumidity;

    var weatherCard = document.createElement("div");
    weatherCard.classList = "card text-white bg-info mb-2 col-2";

    // append
    weatherCard.appendChild(cardHeader);
    weatherCard.appendChild(tempEl);
    weatherCard.appendChild(humidityEl);

    // append
    weatherCards.appendChild(weatherCard);
  }

  // clears search
};

submitCityEl.addEventListener("click", citySubmitHandler);
