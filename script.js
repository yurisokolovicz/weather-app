function getWeatherData(location) {
    const apiKey = '05763633a9b64264b6c12601232506';
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}`;

    const loadingElement = document.getElementById('loading');
    const weatherElement = document.getElementById('weatherData');

    loadingElement.style.display = 'block';

    fetch(apiUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        })
        .then(data => {
            const weatherData = processWeatherData(data);
            console.log(data);
            displayWeatherData(weatherData);
            updateBackgroundImage(weatherData.condition);
        })
        .catch(error => {
            weatherElement.innerHTML = `<h3>Location does not exist.</h3>`;
            console.error('Error:', error);
            verifyWeatherDisplay();
        })
        .finally(() => {
            loadingElement.style.display = 'none';
        });
}
function updateBackgroundImage(condition) {
    const bodyElement = document.body;
    if (condition.toLowerCase().includes('clear')) {
        bodyElement.style.backgroundImage = 'url("../img/clear.jpeg")';
    } else if (condition.toLowerCase().includes('rain')) {
        bodyElement.style.backgroundImage = 'url("../img/rain.jpeg")';
    } else if (condition.toLowerCase().includes('snow')) {
        bodyElement.style.backgroundImage = 'url("../img/snow.jpeg")';
    } else if (condition.toLowerCase().includes('cloud')) {
        bodyElement.style.backgroundImage = 'url("../img/cloud1.jpeg")';
    }
}

function processWeatherData(data) {
    const location = data.location.name;
    const temperature = data.current.temp_c;
    const condition = data.current.condition.text;
    const humidity = data.current.humidity;
    const precipitation = data.current.precip_mm;
    const windSpeed = data.current.wind_kph;

    return { location, temperature, condition, humidity, precipitation, windSpeed };
}

function displayWeatherData(weatherData) {
    const weatherElement = document.getElementById('weatherData');
    weatherElement.innerHTML = `
    <h2>Weather in ${weatherData.location}</h2>
    <p>Temperature: ${weatherData.temperature}°C</p>
    <p>Condition: ${weatherData.condition}</p>
    <p>Humidity: ${weatherData.humidity}%</p>
    <p>Precipitation: ${weatherData.precipitation}mm</p>
    <p>Wind Speed: ${weatherData.windSpeed} km/h</p>
  `;
    verifyWeatherDisplay();
}

function verifyWeatherDisplay() {
    const weatherElement = document.getElementById('weatherData');
    if (weatherElement.hasChildNodes()) {
        weatherElement.style.display = '';
    } else {
        weatherElement.style.display = 'none';
    }
}

verifyWeatherDisplay();

const locationForm = document.getElementById('locationForm');
locationForm.addEventListener('submit', event => {
    event.preventDefault();
    const locationInput = document.getElementById('locationInput');
    const location = locationInput.value.trim();
    getWeatherData(location);
});
