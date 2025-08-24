const apiKey = "ee17c4bc5276f7cad1948387af3ed986";
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
searchBtn.addEventListener("click", () => {
  const city = cityInput.value;
  if (city) {
    getWeather(city);
    getForecast(city);
  }
});

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.cod === "404") {
    alert("City not found!");
    return;
  }

document.getElementById("cityName").textContent = data.name;
document.getElementById("temperature").textContent = `${Math.round(data.main.temp)} °C`;
document.getElementById("description").textContent = data.weather[0].description;
document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
document.getElementById("wind").textContent = `Wind: ${data.wind.speed} m/s`;

const weatherIcon = document.getElementById("weatherIcon");
const iconCode = data.weather[0].icon;
weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
weatherIcon.style.display = "block";

changeBackground(data.weather[0].main);
}

async function getForecast(city) {
const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
const res = await fetch(url);
const data = await res.json();
const forecastContainer = document.getElementById("forecast");
forecastContainer.innerHTML = "";

for (let i = 0; i < data.list.length; i += 8) {
    const forecast = data.list[i];
    const date = new Date(forecast.dt_txt).toLocaleDateString("en-US", { weekday: "short" });
    const temp = Math.round(forecast.main.temp);
    const iconCode = forecast.weather[0].icon;
    const card = document.createElement("div");
    card.classList.add("forecast-card");
    card.innerHTML = `
      <h4>${date}</h4>
      <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="icon">
      <p>${temp} °C</p>
    `;
    forecastContainer.appendChild(card);
  }
}

function changeBackground(condition) {
  if (condition === "Clear") {
    document.body.style.background = "linear-gradient(to right, #f9d423, #ff4e50)";
  } else if (condition === "Clouds") {
    document.body.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)";
  } else if (condition === "Rain") {
    document.body.style.background = "linear-gradient(to right, #00c6ff, #0072ff)";
  } else {
    document.body.style.background = "linear-gradient(to right, #4facfe, #00f2fe)";
  }
}
