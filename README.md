# ⛅ SkyCast — Weather App

A full-stack weather application built with **Spring Boot** (backend) and **React + Vite** (frontend). It shows real-time weather data and a 5-day forecast for any city, with auto-detection of the user's current location.

---

## 🖥️ Preview

> Search any city or allow location access to instantly see current weather, humidity, wind speed, pressure, and a 5-day forecast — all with a dynamic themed UI.

---

## 🛠️ Tech Stack

| Layer     | Technology                          |
|-----------|--------------------------------------|
| Frontend  | React 18, Vite, Axios, react-icons   |
| Backend   | Java 17, Spring Boot, RestTemplate   |
| API       | OpenWeatherMap API (free tier)       |
| Styling   | CSS3, Glassmorphism, CSS Variables   |

---

## 📁 Project Structure

```
Project-2/
├── weather-app/               # Spring Boot Backend
│   └── src/main/java/
│       └── com.weather.weather_app/
│           ├── controller/
│           │   └── WeatherController.java
│           ├── model/
│           │   ├── WeatherResponse.java
│           │   └── ForecastResponse.java
│           ├── service/
│           │   └── WeatherService.java
│           └── WeatherAppApplication.java
│   └── src/main/resources/
│       └── application.properties
│
└── weather-frontend/          # React Frontend
    └── src/
        ├── App.jsx
        ├── App.css
        ├── index.css
        └── main.jsx
```

---

## ⚙️ Backend Setup

### Prerequisites
- Java 17+
- Maven
- OpenWeatherMap API Key → [Get free key here](https://openweathermap.org/api)

### Configuration

Edit `src/main/resources/application.properties`:

```properties
weather.api.url=https://api.openweathermap.org/data/2.5
weather.api.key=YOUR_API_KEY_HERE
```

### Run the Backend

```bash
cd weather-app
./mvnw spring-boot:run
```

Backend runs at: `http://localhost:8080`

---

## 🌐 API Endpoints

| Method | Endpoint                          | Description                        |
|--------|------------------------------------|------------------------------------|
| GET    | `/api/weather?city={city}`         | Current weather by city name       |
| GET    | `/api/weather/forecast?city={city}`| 5-day / 3-hour forecast by city    |
| GET    | `/api/weather/coords?lat={}&lon={}`| Weather by GPS coordinates         |

---

## 💻 Frontend Setup

### Prerequisites
- Node.js 18+
- npm

### Install & Run

```bash
cd weather-frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## ✨ Features

- 🔍 **City Search** — Search weather for any city worldwide
- 📍 **Geolocation** — Auto-detects your current location on load
- 🌡️ **Current Weather** — Temperature, condition, city name, country
- 💧 **Stats** — Humidity, wind speed (km/h), atmospheric pressure
- 📅 **5-Day Forecast** — Daily forecast cards with icons and temperature
- 🎨 **Dynamic Themes** — Background changes based on weather condition
- ⌨️ **Keyboard Support** — Press Enter to search
- ❌ **Error Handling** — Friendly messages for invalid city or denied location

---

## 🎨 Weather Themes

| Condition  | Theme Colors              |
|------------|---------------------------|
| ☀️ Clear   | Orange / Golden           |
| ☁️ Cloudy  | Grey / Dark Slate         |
| 🌧️ Rain    | Indigo / Deep Blue        |
| ❄️ Snow    | Light Blue / Sky          |
| ⛈️ Thunder | Charcoal / Storm Grey     |
| 🌙 Default | Deep Navy / Midnight      |

---

## 🔐 Environment & Security

- API key is stored in `application.properties` on the backend — never exposed to the frontend
- All OpenWeatherMap calls are made server-side through Spring Boot
- CORS is configured to allow requests from `http://localhost:5173`

---

## 🚀 Build for Production

**Frontend:**
```bash
cd weather-frontend
npm run build
# Output goes to /dist folder
```

**Backend:**
```bash
cd weather-app
./mvnw clean package
java -jar target/weather-app-0.0.1-SNAPSHOT.jar
```

**Optional:** Copy the `/dist` contents into `src/main/resources/static/` in Spring Boot to serve everything from a single JAR.

---

## 📦 Dependencies

**Frontend (`package.json`):**
```json
{
  "dependencies": {
    "axios": "^1.x",
    "react": "^18.x",
    "react-icons": "^5.x"
  }
}
```

**Backend (`pom.xml`):**
- `spring-boot-starter-web`
- `spring-boot-starter-test`

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch → `git checkout -b feature/AmazingFeature`
3. Commit your changes → `git commit -m "Add AmazingFeature"`
4. Push to the branch → `git push origin feature/AmazingFeature`
5. Open a Pull Request
---

## 👨‍💻 Author

Built with ❤️ using Spring Boot + React
