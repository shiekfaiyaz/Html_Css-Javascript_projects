// DOM Elements Selection
const dateTime = document.querySelector(".date-time h3");
const searchInput = document.querySelector("form input[type='search']");
const weatherForm = document.querySelector("form");

const cityNameEl = document.querySelector(".city h3");
const tempEl = document.querySelector(".weather-img h2");
const weatherMsgEl = document.querySelector(".weather-msg");
const weatherImage = document.querySelector(".weather-img img");
const windSpeedEl = document.querySelector(".speed");
const bgContainer = document.querySelector(".background");

const apiKey = "624b7ffb5d06c13df7639726a4cf4a2b";

// 1. Live Date & Time Display
function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', hour: '2-digit', minute: '2-digit' };
    if (dateTime) {
        dateTime.innerText = now.toLocaleDateString('en-US', options);
    }
}
updateDateTime();

// 2. Fetch Weather Data from OpenWeatherMap API
async function getWeather(city) {
    if (!city.trim()) return;

    // Correct API endpoint for current weather data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        displayWeather(data);

    } catch (error) {
        alert(error.message);
        console.error("Error fetching data:", error.message);
    }
}

// 3. Display Data & Update UI Dynamically
function displayWeather(data) {
    const cityName = data.name;
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].main; // e.g. Clear, Clouds, Rain
    const windSpeed = data.wind.speed;

    // Update Text Content
    if (cityNameEl) cityNameEl.innerText = cityName;
    if (tempEl) tempEl.innerText = `${temp}°C`;
    if (weatherMsgEl) weatherMsgEl.innerText = data.weather[0].description;
    if (windSpeedEl) windSpeedEl.innerText = `${windSpeed} km/h wind speed`;

    // Update Weather Icon & Dynamic Background Image based on Weather Conditions
    updateVisuals(description, temp);
}

// 4. Change Icons and Background Dynamic Overlay
function updateVisuals(weatherCondition, temp) {
    let iconSrc = 'images/sun.png';

    const condition = weatherCondition.toLowerCase();

    if (condition.includes('cloud')) {
        iconSrc = 'images/cloudy.png';
    } else if (condition.includes('rain') || condition.includes('drizzle')) {
        iconSrc = 'images/rainy.png';
    } else if (condition.includes('clear')) {
        iconSrc = 'images/sun.png';
    } else if (temp <= 5) {
        iconSrc = 'images/storm.png';
    }

    // Update ONLY the container's weather icon
    if (weatherImage) {
        weatherImage.src = iconSrc;
    }
}

// 5. Form Submit Event Listener
if (weatherForm) {
    weatherForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevents page reload
        const query = searchInput.value;
        getWeather(query);
    });
}

// Default City Load on Page Start
getWeather("Hyderabad");