const axios = require("axios");
const { WEATHER_API_KEY } = require("../config/config");

const BASE_URL = "http://api.weatherapi.com/v1/forecast.json";

const fetchWeatherData = async (location) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: { key: WEATHER_API_KEY, q: location, days: 5 }
        });

        return response.data.forecast.forecastday.map(day => ({
            date: day.date,
            maxTemp: day.day.maxtemp_c,
            minTemp: day.day.mintemp_c,
            humidity: day.day.avghumidity,
            rainfall: day.day.daily_chance_of_rain,
            condition: day.day.condition.text
        }));
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw new Error("Failed to fetch weather data");
    }
};

module.exports = { fetchWeatherData };
