package com.weather.weather_app.model;

import lombok.Data;

import java.util.List;

@Data
public class ForecastResponse {
    private List<Item> list;

    @Data
    public static class Item {
        private Main main;
        private List<Weather> weather;
        private String dt_txt;
    }

    @Data
    public static class Main {
        private double temp;
    }

    @Data
    public static class Weather {
        private String description;
    }
}
