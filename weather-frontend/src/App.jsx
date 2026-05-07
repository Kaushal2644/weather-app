import { useState, useEffect } from "react";
import axios from "axios";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiNightClear,
  WiHumidity,
  WiStrongWind,
  WiBarometer,
} from "react-icons/wi";
import { FiSearch, FiMapPin } from "react-icons/fi";
import "./App.css";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [locating, setLocating] = useState(false);

  // ─── Core fetch by city name ───
  const fetchWeatherByCity = async (cityName) => {
    if (!cityName.trim()) return;
    setLoading(true);
    setError("");
    try {
      const [weatherRes, forecastRes] = await Promise.all([
        axios.get(`http://localhost:8080/api/weather?city=${cityName}`),
        axios.get(`http://localhost:8080/api/weather/forecast?city=${cityName}`),
      ]);
      setWeather(weatherRes.data);
      setForecast(forecastRes.data);
    } catch {
      setError("City not found. Try again.");
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeather = () => fetchWeatherByCity(city);

  const handleKey = (e) => {
    if (e.key === "Enter") fetchWeather();
  };

  // ─── 📍 Geolocation ───
  const detectLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLocating(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Reverse geocode via backend endpoint
          const geoRes = await axios.get(
            `http://localhost:8080/api/weather/coords?lat=${latitude}&lon=${longitude}`
          );
          const detectedCity = geoRes.data.name;
          setCity(detectedCity);
          await fetchWeatherByCity(detectedCity);
        } catch {
          setError("Could not detect your location's city.");
        } finally {
          setLocating(false);
        }
      },
      (err) => {
        setLocating(false);
        if (err.code === 1) {
          setError("Location permission denied. Please search manually.");
        } else {
          setError("Unable to retrieve your location.");
        }
      },
      { timeout: 8000 }
    );
  };

  // ─── Auto-detect on first load ───
  useEffect(() => {
    detectLocation();
  }, []);

  // ─── Theme helpers ───
  const getWeatherUI = (condition = "") => {
    const c = condition.toLowerCase();
    if (c.includes("thunder")) return { icon: <WiThunderstorm />, theme: "thunder" };
    if (c.includes("rain") || c.includes("drizzle")) return { icon: <WiRain />, theme: "rain" };
    if (c.includes("snow"))   return { icon: <WiSnow />, theme: "snow" };
    if (c.includes("cloud"))  return { icon: <WiCloud />, theme: "cloud" };
    if (c.includes("clear"))  return { icon: <WiDaySunny />, theme: "sunny" };
    return { icon: <WiNightClear />, theme: "night" };
  };

  const getForecastIcon = (desc = "") => {
    const c = desc.toLowerCase();
    if (c.includes("thunder")) return <WiThunderstorm />;
    if (c.includes("rain") || c.includes("drizzle")) return <WiRain />;
    if (c.includes("snow"))   return <WiSnow />;
    if (c.includes("cloud"))  return <WiCloud />;
    if (c.includes("clear"))  return <WiDaySunny />;
    return <WiNightClear />;
  };

  const condition = weather?.weather?.[0]?.description || "";
  const { icon, theme } = getWeatherUI(condition);

  const dailyForecast = forecast?.list?.filter((_, i) => i % 8 === 0).slice(0, 5) || [];

  const getDayName = (dt_txt) =>
    new Date(dt_txt).toLocaleDateString("en-US", { weekday: "short" });

  const isLoading = loading || locating;

  return (
    <div className={`app theme-${theme}`}>
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="card">
        {/* Header */}
        <div className="app-header">
          <span className="app-logo">⛅</span>
          <h1 className="app-title">SkyCast</h1>
        </div>

        {/* Search Row */}
        <div className="search-row">
          <input
            className="search-input"
            type="text"
            placeholder="Search city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKey}
          />
          {/* Location button */}
          <button
            className="search-btn locate-btn"
            onClick={detectLocation}
            disabled={isLoading}
            title="Use my location"
          >
            {locating ? <span className="spinner" /> : <FiMapPin size={18} />}
          </button>
          {/* Search button */}
          <button className="search-btn" onClick={fetchWeather} disabled={isLoading}>
            {loading ? <span className="spinner" /> : <FiSearch size={18} />}
          </button>
        </div>

        {/* Location detecting notice */}
        {locating && (
          <p className="locating-msg">📍 Detecting your location...</p>
        )}

        {error && <p className="error-msg">{error}</p>}

        {/* Current Weather */}
        {weather?.main && (
          <div className="weather-main">
            <div className="weather-icon-wrap">{icon}</div>
            <div className="temp-display">
              {Math.round(weather.main.temp)}
              <span className="deg">°C</span>
            </div>
            <p className="condition-label">{condition}</p>
            <p className="city-name">
              {weather.name}
              {weather.sys?.country ? `, ${weather.sys.country}` : ""}
            </p>

            <div className="stats-row">
              <div className="stat">
                <WiHumidity className="stat-icon" />
                <span className="stat-val">{weather.main.humidity}%</span>
                <span className="stat-label">Humidity</span>
              </div>
              <div className="stat-divider" />
              <div className="stat">
                <WiStrongWind className="stat-icon" />
                <span className="stat-val">{Math.round(weather.wind?.speed * 3.6)} km/h</span>
                <span className="stat-label">Wind</span>
              </div>
              <div className="stat-divider" />
              <div className="stat">
                <WiBarometer className="stat-icon" />
                <span className="stat-val">{weather.main.pressure} hPa</span>
                <span className="stat-label">Pressure</span>
              </div>
            </div>
          </div>
        )}

        {/* 5-Day Forecast */}
        {dailyForecast.length > 0 && (
          <div className="forecast-section">
            <p className="forecast-title">5-Day Forecast</p>
            <div className="forecast-row">
              {dailyForecast.map((item, i) => (
                <div key={i} className="forecast-tile">
                  <p className="f-day">{getDayName(item.dt_txt)}</p>
                  <div className="f-icon">{getForecastIcon(item.weather?.[0]?.description)}</div>
                  <p className="f-temp">{Math.round(item.main.temp)}°</p>
                  <p className="f-desc">{item.weather?.[0]?.main}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!weather && !isLoading && !error && (
          <div className="empty-state">
            <span className="empty-icon">🌍</span>
            <p>Search for any city to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}