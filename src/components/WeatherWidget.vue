<template>
  <div class="widget weather-widget fade-in">
    <h3>Aktuelles Wetter in {{ city }}</h3>
    <div v-if="weather" class="weather-info">
      <img :src="weatherIconUrl" alt="Wetter Icon" />
      <div class="weather-details">
        <p class="temperature">{{ weather.temperature }}°C</p>
        <p class="description">{{ weather.description }}</p>
        <p class="time">{{ currentTime }}</p>
      </div>
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
      weather: null,
      currentTime: '',
    };
  },
  mounted() {
    this.fetchWeather();
    this.updateTime();
    setInterval(this.updateTime, 60000);
  },
  computed: {
    weatherIconUrl() {
      return `http://openweathermap.org/img/wn/${this.weather.icon}@2x.png`;
    }
  },
  methods: {
    fetchWeather() {
      weatherService.getWeather(this.city)
        .then(response => {
          const data = response.data;
          this.weather = {
            description: data.weather[0].description,
            temperature: Math.round(data.main.temp),
            icon: data.weather[0].icon,
          };
        })
        .catch(error => {
          console.error('Fehler beim Abrufen der Wetterdaten:', error);
        });
    },
    updateTime() {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
      });
    }
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

.weather-info {
  display: flex;
  align-items: center;
}

.weather-info img {
  width: 80px;
  height: 80px;
}

.weather-details {
  margin-left: 15px;
}

.temperature {
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
}

.description {
  text-transform: capitalize;
  margin: 5px 0;
}

.time {
  font-size: 0.9rem;
  color: var(--white);
}
</style>
