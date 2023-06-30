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
    const lowercaseCondition = condition.toLowerCase();

    if (lowercaseCondition.includes('clear')) {
        bodyElement.style.backgroundImage = 'url("../img/clear.jpeg")';
    } else if (lowercaseCondition.includes('rain')) {
        bodyElement.style.backgroundImage = 'url("../img/rain.jpeg")';
    } else if (lowercaseCondition.includes('snow')) {
        bodyElement.style.backgroundImage = 'url("../img/snow.jpeg")';
    } else if (lowercaseCondition.includes('cloud') || lowercaseCondition.includes('overcast')) {
        bodyElement.style.backgroundImage = 'url("../img/cloud1.jpeg")';
    } else {
        bodyElement.style.backgroundImage = 'url("../img/cloud.jpeg")';
    }
}

function updateBackgroundImage(condition) {
    const bodyElement = document.body;
    const lowercaseCondition = condition.toLowerCase();

    if (lowercaseCondition.includes('clear')) {
        bodyElement.style.backgroundImage = 'url("../img/clear.jpeg")';
    } else if (lowercaseCondition.includes('sunny')) {
        bodyElement.style.backgroundImage = 'url("../img/sunny.jpeg")';
    } else if (lowercaseCondition.includes('partly cloudy')) {
        bodyElement.style.backgroundImage = 'url("../img/partly_cloudy.jpeg")';
    } else if (lowercaseCondition.includes('cloudy') || lowercaseCondition.includes('overcast')) {
        bodyElement.style.backgroundImage = 'url("../img/cloudy.jpeg")';
    } else if (lowercaseCondition.includes('mist')) {
        bodyElement.style.backgroundImage = 'url("../img/mist.jpeg")';
    } else if (lowercaseCondition.includes('fog')) {
        bodyElement.style.backgroundImage = 'url("../img/fog.jpeg")';
    } else if (lowercaseCondition.includes('haze')) {
        bodyElement.style.backgroundImage = 'url("../img/haze.jpeg")';
    } else if (lowercaseCondition.includes('smoke')) {
        bodyElement.style.backgroundImage = 'url("../img/smoke.jpeg")';
    } else if (lowercaseCondition.includes('dust')) {
        bodyElement.style.backgroundImage = 'url("../img/dust.jpeg")';
    } else if (lowercaseCondition.includes('sand')) {
        bodyElement.style.backgroundImage = 'url("../img/sand.jpeg")';
    } else if (lowercaseCondition.includes('rain') || lowercaseCondition.includes('showers')) {
        bodyElement.style.backgroundImage = 'url("../img/rain.jpeg")';
    } else if (lowercaseCondition.includes('drizzle')) {
        bodyElement.style.backgroundImage = 'url("../img/drizzle.jpeg")';
    } else if (lowercaseCondition.includes('thunderstorm')) {
        bodyElement.style.backgroundImage = 'url("../img/thunderstorm.jpeg")';
    } else if (lowercaseCondition.includes('snow')) {
        bodyElement.style.backgroundImage = 'url("../img/snow.jpeg")';
    } else if (lowercaseCondition.includes('blowing snow')) {
        bodyElement.style.backgroundImage = 'url("../img/blowing_snow.jpeg")';
    } else if (lowercaseCondition.includes('sleet')) {
        bodyElement.style.backgroundImage = 'url("../img/sleet.jpeg")';
    } else if (lowercaseCondition.includes('freezing rain')) {
        bodyElement.style.backgroundImage = 'url("../img/freezing_rain.jpeg")';
    } else if (lowercaseCondition.includes('ice pellets')) {
        bodyElement.style.backgroundImage = 'url("../img/ice_pellets.jpeg")';
    } else {
        bodyElement.style.backgroundImage = 'url("../img/default.jpg")';
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

    const locationInput = document.getElementById('locationInput');
    locationInput.value = '';

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
