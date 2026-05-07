# Quick Setup Guide

## 1. Get Your Free API Key
1. Go to https://openweathermap.org/api
2. Click "Sign Up" (free account)
3. After signing in, go to "API keys" in your profile
4. Copy your API key

## 2. Add Your API Key
Open `script.js` and replace this line:
```javascript
const API_KEY = 'YOUR_API_KEY_HERE';
```
With your actual key:
```javascript
const API_KEY = 'your_actual_key_here';
```

## 3. Test Locally
Simply open `index.html` in your browser, or use a local server:
```bash
# If you have Python
python -m http.server 8000

# Or with Node.js
npx serve
```

## 4. Deploy to GitHub Pages
1. Commit all files (except .env)
2. Push to GitHub
3. Go to Settings > Pages
4. Select main branch and save
5. Your app will be live at `https://yourusername.github.io/repo-name`

## Features Added
✅ Geolocation button (📍) - gets weather for your current location
✅ Unit toggle (°C/°F) - switch between Celsius and Fahrenheit
✅ 5-Day Forecast - shows upcoming weather
✅ Recent Searches - saved in browser history
✅ Responsive Design - works on mobile and desktop
✅ Error Handling - clear messages for issues
✅ Smooth Animations - professional feel

## Tips for Portfolio
- Add a screenshot to your README
- Include the live demo link
- Mention the technologies used (HTML, CSS, JavaScript, OpenWeatherMap API)
- Highlight features like geolocation and localStorage
