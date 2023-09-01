document.addEventListener("DOMContentLoaded", () => {
    const dropdown = document.getElementById("cityDropdown");

    // Fetch city names from the server
    fetch("http://localhost:3000/cities")
        .then(response => response.json())
        .then(data => {
            data.forEach(city => {
                const option = document.createElement("option");
                option.value = city;
                option.textContent = city;
                dropdown.appendChild(option);
            });
        });
});

function fetchWeatherData() {
    console.log("here")
    const city = document.getElementById("cityDropdown").value;
    fetch(`http://localhost:3000/weather/${city}`)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
        });
}

function displayWeather(data) {
    const detailsDiv = document.getElementById("weatherDetails");
    document.getElementById("weatherCity").textContent = data.name;
    document.getElementById("temp").textContent = data.main.temp;
    document.getElementById("description").textContent = data.weather[0].description;

    // Set background image based on weather condition
    const weatherCondition = data.weather[0].main.toLowerCase();
    switch (weatherCondition) {
        case 'clear':
            document.body.style.backgroundImage = 'url(images/sunny.jpeg)';
            break;
        case 'rain':
            document.body.style.backgroundImage = 'url(images/rainy.jfif)';
            break;
        case 'clouds':
            document.body.style.backgroundImage = 'url(images/cloudy.jpeg)';
            break;
        case 'snow':
            document.body.style.backgroundImage = 'url(images/snow.jpeg)';
            break;
        // ... add more cases for other conditions
        default:
            document.body.style.backgroundImage = 'url(images/clearsky.jpeg)';
            break;
    }

    detailsDiv.style.display = "block";
}
