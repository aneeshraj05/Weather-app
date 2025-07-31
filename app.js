document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "";
  const form = document.querySelector(".weather-container");
  const input = document.getElementById("input");

  const tempEl = document.querySelector(".celcius");
  const cityEl = document.querySelector(".city");
  const humidityEl = document.querySelector(".humidity-percentage");
  const windEl = document.querySelector(".wind-km");
  const emojiEl = document.createElement("div");
  emojiEl.classList.add("weather-emoji");
  document.querySelector(".temp").prepend(emojiEl);

  const emojiMap = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Drizzle: "🌦️",
    Thunderstorm: "⛈️",
    Snow: "❄️",
    Mist: "🌫️",
    Haze: "🌫️",
    Fog: "🌁",
    Smoke: "💨",
    Dust: "🌪️"
  };

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const city = input.value.trim();
    if (!city) {
      alert("Please enter a city name.");
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.cod !== 200) {
          alert("City not found!");
          return;
        }

        const condition = data.weather[0].main;
        const emoji = emojiMap[condition] || "🌍";

        // Update DOM
        emojiEl.textContent = emoji;
        tempEl.innerHTML = `${data.main.temp}°C`;
        cityEl.innerHTML = city;
        humidityEl.innerHTML = `${data.main.humidity}%`;
        windEl.innerHTML = `${data.wind.speed} km/h`;
      })
      .catch(error => {
        console.error("Error fetching weather data:", error);
        alert("Something went wrong while fetching the weather.");
      });
  });
});
