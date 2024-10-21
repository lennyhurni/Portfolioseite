<!-- WeatherWidget.vue -->

<template>
    <div class="widget weather-widget fade-in">
      <h3>Aktuelles Wetter in {{ city }}</h3>
      <div v-if="weather">
        <p>{{ weather.description }}</p>
        <p>{{ weather.temperature }} °C</p>
      </div>
      <div v-else>
        <p>Wetterdaten werden geladen...</p>
      </div>
    </div>
  </template>
  
  <script>
  import weatherService from '../services/weatherService.js';
  
  export default {
    data() {
      return {
        city: 'Bern',
        weather: null
      };
    },
    mounted() {
      weatherService.getWeather(this.city)
        .then(response => {
          this.weather = {
            description: response.data.weather[0].description,
            temperature: response.data.main.temp
          };
        })
        .catch(error => {
          console.error('Fehler beim Abrufen der Wetterdaten:', error);
        });
    }
  };
  </script>
  
  <style scoped>
  .weather-widget {
    max-width: 300px;
    margin: 0 auto;
    background-color: var(--secondary-color);
    color: var(--white);
    padding: 20px;
    border-radius: 10px;
  }
  </style>
  