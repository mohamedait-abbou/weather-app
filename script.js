// API Configuration - Replace with your own key from openweathermap.org
const API_KEY = 'YOUR_API_KEY_HERE'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM Elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const locationBtn = document.getElementById('location-btn');
const weatherInfo = document.getElementById('weather-info');
const forecastContainer = document.getElementById('forecast-container');
const historyContainer = document.getElementById('history-container');
const errorMessage = document.getElementById('error-message');
const unitSwitch = document.getElementById('unit-switch');

// State
let currentTemp = 0;
let isCelsius = true;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadHistory();
    
    // Event Listeners
    searchBtn.addEventListener('click', searchWeather);
    locationBtn.addEventListener('click', getLocationWeather);
    unitSwitch.addEventListener('change', toggleUnit);
    
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchWeather();
    });
});

// Search Weather by City
async function searchWeather() {
    const city = cityInput.value.trim();
    if (!city) return;
    
    try {
        await fetchWeatherData(city);
        addToHistory(city);
    } catch (error) {
        showError(error.message);
    }
}

// Get Weather by Geolocation
function getLocationWeather() {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by your browser');
        return;
    }
    
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            try {
                const { latitude, longitude } = position.coords;
                const response = await fetch(
                    `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
                );
                
                if (!response.ok) throw new Error('City not found');
                
                const data = await response.json();
                await fetchWeatherData(data.name);
                addToHistory(data.name);
            } catch (error) {
                showError('Unable to get location weather');
            }
        },
        () => showError('Location access denied')
    );
}

// Fetch Weather Data
async function fetchWeatherData(city) {
    try {
        // Current Weather
        const weatherResponse = await fetch(
            `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        
        if (!weatherResponse.ok) {
            throw new Error('City not found. Please check the spelling.');
        }
        
        const weatherData = await weatherResponse.json();
        
        // Forecast
        const forecastResponse = await fetch(
            `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );
        const forecastData = await forecastResponse.json();
        
        displayWeather(weatherData);
        displayForecast(forecastData.list);
        hideError();
        
    } catch (error) {
        throw error;
    }
}

// Display Current Weather
function displayWeather(data) {
    document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('wind').textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    
    const iconCode = data.weather[0].icon;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    
    currentTemp = data.main.temp;
    updateTemperatureDisplay();
    
    weatherInfo.style.display = 'block';
    forecastContainer.style.display = 'block';
}

// Display 5-Day Forecast
function displayForecast(forecastList) {
    const forecastGrid = document.getElementById('forecast-grid');
    forecastGrid.innerHTML = '';
    
    // Filter to get one forecast per day (around noon)
    const dailyForecasts = forecastList.filter(item => item.dt_txt.includes('12:00:00'));
    
    dailyForecasts.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(day.main.temp);
        const icon = day.weather[0].icon;
        
        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <p>${dayName}</p>
            <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${day.weather[0].description}">
            <p>${isCelsius ? temp + '°C' : ((temp * 9/5) + 32).toFixed(0) + '°F'}</p>
        `;
        
        forecastGrid.appendChild(card);
    });
}

// Toggle Temperature Unit
function toggleUnit() {
    isCelsius = !isCelsius;
    updateTemperatureDisplay();
    
    // Update forecast temperatures
    const forecastCards = document.querySelectorAll('.forecast-card');
    forecastCards.forEach(card => {
        const tempText = card.querySelector('p:last-child');
        const currentTempValue = parseFloat(tempText.textContent);
        
        if (isCelsius) {
            const celsius = ((currentTempValue - 32) * 5/9).toFixed(0);
            tempText.textContent = celsius + '°C';
        } else {
            const fahrenheit = ((currentTempValue * 9/5) + 32).toFixed(0);
            tempText.textContent = fahrenheit + '°F';
        }
    });
}

function updateTemperatureDisplay() {
    const tempElement = document.getElementById('temperature');
    if (isCelsius) {
        tempElement.textContent = `${Math.round(currentTemp)}°C`;
    } else {
        tempElement.textContent = `${((currentTemp * 9/5) + 32).toFixed(0)}°F`;
    }
}

// Local Storage History
function addToHistory(city) {
    let history = JSON.parse(localStorage.getItem('weatherHistory')) || [];
    
    // Remove if exists and add to front
    history = history.filter(item => item.toLowerCase() !== city.toLowerCase());
    history.unshift(city);
    
    // Keep only last 10
    if (history.length > 10) history = history.slice(0, 10);
    
    localStorage.setItem('weatherHistory', JSON.stringify(history));
    loadHistory();
}

function loadHistory() {
    const historyList = document.getElementById('history-list');
    const history = JSON.parse(localStorage.getItem('weatherHistory')) || [];
    
    historyList.innerHTML = '';
    
    if (history.length === 0) {
        historyContainer.style.display = 'none';
        return;
    }
    
    historyContainer.style.display = 'block';
    
    history.forEach(city => {
        const item = document.createElement('div');
        item.className = 'history-item';
        item.textContent = city;
        item.addEventListener('click', () => {
            cityInput.value = city;
            searchWeather();
        });
        historyList.appendChild(item);
    });
}

// Error Handling
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    weatherInfo.style.display = 'none';
    forecastContainer.style.display = 'none';
}

function hideError() {
    errorMessage.style.display = 'none';
}
