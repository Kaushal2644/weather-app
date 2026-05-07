package com.weather.weather_app.service;

import com.weather.weather_app.model.ForecastResponse;
import com.weather.weather_app.model.WeatherResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {

    @Value("${weather.api.key}")
    private String apiKey;

    @Value("${weather.api.url}")
    private String apiUrl;

    public WeatherResponse getWeather(String city) {

        String url = apiUrl + "?q=" + city + "&appid=" + apiKey + "&units=metric";

        RestTemplate restTemplate = new RestTemplate();

        return restTemplate.getForObject(url, WeatherResponse.class);
    }

    public ForecastResponse getForecast(String city) {
        String url = apiUrl + "?q=" + city + "&appid=" + apiKey + "&units=metric";
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, ForecastResponse.class);
    }
}
