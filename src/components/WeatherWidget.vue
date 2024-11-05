<!-- src/components/WeatherWidget.vue -->
<template>
  <section class="main-section">
    <div class="widget weather-widget fade-in">
      <div class="weather-widget__container">
        <h3>Aktuelles Wetter in {{ city }}</h3>
        <div v-if="weather" class="weather-info">
          <div class="weather-info__main">
            <img :src="weatherIconUrl" alt="Wetter Icon" />
            <div class="weather-details">
              <p class="temperature">{{ weather.temperature }}°C</p>
              <p class="description">{{ weather.description }}</p>
            </div>
          </div>
          <div class="weather-info__additional">
            <p class="time">{{ currentTime }} Uhr</p>
            <p class="date">{{ currentDate }}</p>
          </div>
        </div>
        <div v-else class="weather-loading">
          <p>Wetterdaten werden geladen...</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import weatherService from '../services/weatherService.js';

export default {
  data() {
    return {
      city: 'Bern',
      weather: null,
      currentTime: '',
      currentDate: '',
    };
  },
  mounted() {
    this.fetchWeather();
    this.updateDateTime();
    setInterval(this.updateDateTime, 60000);
  },
  computed: {
    weatherIconUrl() {
      if (!this.weather?.icon) return '';
      return `https://openweathermap.org/img/wn/${this.weather.icon}@2x.png`;
    },
  },
  methods: {
    updateDateTime() {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit'
      });
      this.currentDate = now.toLocaleDateString('de-DE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
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
    }
  }
};
</script>

<style scoped>
.weather-widget {
  max-width: 400px;
  width: 100%;
  margin: 2rem auto;
  background-color: var(--secondary-color);
  border-radius: 15px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  position: relative;
  border: 1px solid var(--border-color);
}

.weather-widget__container {
  padding: 2rem;
}

.weather-widget h3 {
  color: var(--text-color);
  font-size: 1.3rem;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 600;
}

.weather-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.weather-info__main {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 1.5rem;
  background-color: var(--background-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.weather-info img {
  width: 120px;
  height: 120px;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  transition: transform 0.3s ease;
}

.weather-info img:hover {
  transform: scale(1.05);
}

.weather-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.temperature {
  font-size: 3rem;
  font-weight: bold;
  color: var(--primary-color);
  margin: 0;
  line-height: 1;
}

.description {
  text-transform: capitalize;
  color: var(--text-color);
  font-size: 1.2rem;
  font-weight: 500;
}

.weather-info__additional {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: var(--background-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.time, .date {
  color: var(--text-color);
  font-size: 1rem;
  margin: 0;
  font-weight: 500;
}

.weather-loading {
  text-align: center;
  padding: 3rem;
  color: var(--text-color);
  font-size: 1.1rem;
  background-color: var(--background-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  margin: 1rem 0;
}

/* Dark mode specific adjustments */
:root[data-theme="dark"] .weather-info__main,
:root[data-theme="dark"] .weather-info__additional,
:root[data-theme="dark"] .weather-loading {
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
}

/* Fix for the white space issue */
section.main-section {
  background-color: var(--secondary-color);
  width: 100%;
  margin: 0;
  padding: 3rem 0;
}

@media (max-width: 768px) {
  .weather-widget {
    margin: 1rem auto;
  }
  
  .weather-widget__container {
    padding: 1.5rem;
  }
  
  .weather-info__main {
    padding: 1rem;
    gap: 1rem;
  }
  
  .weather-info img {
    width: 100px;
    height: 100px;
  }
  
  .temperature {
    font-size: 2.5rem;
  }
  
  .description {
    font-size: 1.1rem;
  }
  
  .weather-info__additional {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
</style>