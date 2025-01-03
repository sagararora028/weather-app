document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");
    const API_KEY = "f778a3b8cc929ad59875ec018e22bdb1";

    getWeatherBtn.addEventListener("click", async () => {
        const cityName = cityInput.value.trim();
        if (!validateInput(cityName)) {
            alert("Please enter a valid city name");
            return;
        }

        try {
            const weatherData = await fetchData(cityName);
            displayData(weatherData);
        } catch (error) {
            displayError(error.message);
        }

        cityInput.value = "";
    });

    async function fetchData(cityName) {
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        console.log(response);
        console.log(data);

        return data;
    }

    function validateInput(input) {
        return input.length > 0 && /^[a-zA-Z\s]+$/.test(input);
    }

    function displayData(data) {
        const { name, main, weather } = data;
        weatherInfo.classList.remove("hidden");
        errorMessage.classList.add("hidden");
        cityNameDisplay.textContent = `City: ${name}`;
        temperatureDisplay.textContent = `Temperature: ${main.temp}°C`;
        descriptionDisplay.textContent = `Weather: ${weather[0].description}`;
    }

    function displayError(message) {
        weatherInfo.classList.add("hidden");
        errorMessage.classList.remove("hidden");
        errorMessage.textContent = message;
    }
});
