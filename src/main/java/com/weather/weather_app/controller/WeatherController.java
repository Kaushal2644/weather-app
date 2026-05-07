package com.weather.weather_app.controller;

import com.weather.weather_app.model.ForecastResponse;
import com.weather.weather_app.model.WeatherResponse;
import com.weather.weather_app.service.WeatherService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestOperations;

import java.util.Map;

@RestController
@RequestMapping("/api/weather")
@CrossOrigin(origins = "http://localhost:5173")
public class WeatherController {

    private String weatherUrl;   // → replace apiUrl with weatherUrl
    private String secretKey;

    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping
    public WeatherResponse getWeather(@RequestParam String city) {
        return weatherService.getWeather(city);
    }

    @GetMapping("/forecast")
    public ForecastResponse getForecast(@RequestParam String city) {
        return weatherService.getForecast(city);
    }

    @GetMapping("/coords")
    public ResponseEntity<?> getWeatherByCoords(
            @RequestParam double lat,
            @RequestParam double lon) {
        String url = weatherUrl + "/weather?lat=" + lat + "&lon=" + lon
                + "&appid=" + secretKey + "&units=metric";
        RestOperations restTemplate = null;
        ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
        return ResponseEntity.ok(response.getBody());
    }
}
