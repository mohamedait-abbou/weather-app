# Weather App

A simple web application that displays weather information for any city using the OpenWeatherMap API.

## Features

- Search for weather by city name
- Display current temperature, weather description, humidity, and wind speed
- Clean, responsive UI with light/dark mode support
- Built with vanilla HTML, CSS, and JavaScript

## Project Structure

```
├── index.html          # Main application page with UI and embedded JavaScript
├── style.css           # Stylesheet for custom styling
├── app.js              # Front-end logic and weather API interactions
├── app-structure.html  # Visual project structure overview page
└── README.md           # This file - setup and usage documentation
```

## Setup

1. **Get an API Key**: Sign up for a free API key at [OpenWeatherMap](https://openweathermap.org/api)

2. **Configure the API Key**: 
   - Open `index.html`
   - Replace `YOUR_API_KEY` in the fetch URL (line 52) with your actual OpenWeatherMap API key

3. **Run the Application**:
   - Simply open `index.html` in your web browser
   - Or use a local development server:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (npx)
     npx serve
     ```

## Usage

1. Enter a city name in the input field
2. Click "Get Weather" or press Enter
3. View the current weather information including:
   - City name
   - Temperature (in Kelvin)
   - Weather description
   - Humidity percentage
   - Wind speed (m/s)

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- OpenWeatherMap API

## Browser Support

Works on all modern browsers including Chrome, Firefox, Safari, and Edge.

## License

MIT License