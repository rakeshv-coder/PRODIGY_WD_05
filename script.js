const apiKey = '0efcc6aa8d588569a7910bdb772973e3';

document.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            getWeather(latitude, longitude);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

function getWeather(latitude, longitude) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        });
}

function getWeatherByLocation() {
    const location = document.getElementById('location-input').value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        });
}


function capitalizeDescription(description) {
    return description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function displayWeather(data) {
    const location = data.name;
    const temperature = data.main.temp;
    const description = capitalizeDescription(data.weather[0].description);
    //description = charAt(0).toUpperCase() + description.slice(1);
    const condition = data.weather[0].main;
    
    document.getElementById('location').textContent = `Location: ${location}`;
    document.getElementById('temperature').textContent = `Temperature: ${temperature} °C`;
    document.getElementById('description').textContent = `Weather: ${description}`;

    updateWeatherIcon(condition);
}

function updateWeatherIcon(condition) {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.className = ''; // Reset class
    
    if (condition === 'Clear') {
        weatherIcon.classList.add('fas', 'fa-sun');
    } else if (condition === 'Clouds') {
        weatherIcon.classList.add('fas', 'fa-cloud');
    } else if (condition === 'Rain') {
        weatherIcon.classList.add('fas', 'fa-cloud-showers-heavy');
    } else if (condition === 'Snow') {
        weatherIcon.classList.add('fas', 'fa-snowflake');
    } else {
        weatherIcon.classList.add('fas', 'fa-smog');
    }
}

