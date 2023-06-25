function getWeatherData(location) {
    const apiKey = '05763633a9b64264b6c12601232506';
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}`;

    const loadingElement = document.getElementById('loading');
    loadingElement.style.display = 'block';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherData = processWeatherData(data);
            displayWeatherData(weatherData);
        })
        .catch(error => {
            console.log('Error:', error);
        })
        .finally(() => {
            loadingElement.style.display = 'none';
        });
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
}

const locationForm = document.getElementById('locationForm');
locationForm.addEventListener('submit', event => {
    event.preventDefault();
    const locationInput = document.getElementById('locationInput');
    const location = locationInput.value.trim();
    getWeatherData(location);
});
