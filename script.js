let weather = {
  apiKey: "7492c62ab3ede91a184d84d91a62d3b4",
  defaultLocation: "Ho Chi Minh City",
  fetchWeather: function (location) {
    document.querySelector(".weather").classList.add("loading");
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${this.apiKey}`
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = `Weather in ${name}`;
    document.querySelector(
      ".icon"
    ).src = `https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector(".description").innerText =
      this.capitalizeFirstLetter(description);
    document.querySelector(".temp").innerText = `${temp}°C`;
    document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
    document.querySelector(".wind").innerText = `Wind speed: ${speed} km/h`;
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage = `url("https://source.unsplash.com/1600x900/?${name}")`;
  },
  search: function () {
    let location = document.querySelector(".search-bar").value;
    if (location) {
      this.fetchWeather(location);
      document.querySelector(".search-bar").value = "";
    }
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    weather.search();
  }
});

weather.fetchWeather(weather.defaultLocation);
