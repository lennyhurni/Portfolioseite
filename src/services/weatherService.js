// weatherService.js

import axios from 'axios';

const API_KEY = '174d91032b3710ff1385521b246120ba';

const weatherService = {
  getWeather() {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=bern&units=metric&appid=${API_KEY}`);
  }
};

export default weatherService;
