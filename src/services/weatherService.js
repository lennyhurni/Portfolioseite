import axios from 'axios';

const API_KEY = process.env.VUE_APP_WEATHER_API_KEY;

const weatherService = {
  getWeather() {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=bern&units=metric&appid=${API_KEY}`);
  }
};

export default weatherService;