<template>
  <section id="contact" class="main-section fade-in">
    <div class="container">
      <h2>Kontakt</h2>
      <!-- Karte -->
      <div id="map" class="map"></div>
      <!-- Formular -->
      <form class="contact-form" @submit.prevent="submitForm" novalidate>
        <div class="form-group" :class="{ 'has-error': errors.name }">
          <div class="input-icon">
            <i class="fas fa-user"></i>
            <input type="text" v-model="form.name" placeholder="Dein Name" @input="validateField('name')" required />
          </div>
          <span v-if="errors.name" class="error">{{ errors.name }}</span>
        </div>

        <div class="form-group" :class="{ 'has-error': errors.email }">
          <div class="input-icon">
            <i class="fas fa-envelope"></i>
            <input type="email" v-model="form.email" placeholder="Deine E-Mail" @input="validateField('email')" required />
          </div>
          <span v-if="errors.email" class="error">{{ errors.email }}</span>
        </div>

        <div class="form-group" :class="{ 'has-error': errors.message }">
          <div class="input-icon">
            <i class="fas fa-comment"></i>
            <textarea v-model="form.message" placeholder="Deine Nachricht" @input="validateField('message')" required></textarea>
          </div>
          <span v-if="errors.message" class="error">{{ errors.message }}</span>
        </div>

      <button type="submit" class="custom-button">
        <i class="fas fa-paper-plane"></i> Senden
      </button>
      </form>
      <!-- Erfolgsnachricht -->
      <transition name="fade">
        <div v-if="successMessage" class="success">{{ successMessage }}</div>
      </transition>
    </div>
  </section>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  props: {
    currentTheme: {
      type: String,
      default: 'light'
    }
  },
  data() {
    return {
      map: null,
      marker: null,
      tileLayer: null,
      form: {
        name: '',
        email: '',
        message: '',
      },
      errors: {},
      successMessage: '',
    };
  },
  watch: {
    currentTheme: {
      handler(newTheme) {
        if (this.map) {
          this.updateMapStyle(newTheme);
        }
      },
      immediate: true
    }
  },
  methods: {
    initMap() {
      this.$nextTick(() => { // Sicherstellen, dass das DOM komplett gerendert ist
        const coordinates = [46.9480, 7.4474]; // Bern coordinates

        if (!this.map) {
          // Karte initialisieren
          this.map = L.map('map', {
            center: coordinates,
            zoom: 14,
            zoomControl: false
          });

          // Zoom-Button hinzufügen
          L.control.zoom({
            position: 'topright'
          }).addTo(this.map);

          // Standard-Tile-Layer (immer Light Mode)
          this.tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '©OpenStreetMap',
            maxZoom: 19,
          }).addTo(this.map);

          // Benutzerdefinierter Marker
          const customIcon = L.icon({
            iconUrl: require('@/assets/Images/pin-icon.png'), // Korrigierter Pfad
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40]
          });

          // Marker hinzufügen mit Popup
          this.marker = L.marker(coordinates, { icon: customIcon })
            .addTo(this.map)
            .bindPopup('<strong>Lenny Hurni</strong><br>Bern, Schweiz')
            .openPopup();
        }
      });
    },
    updateMapStyle(theme) {
      if (!this.map) return;

      // Nur Popup und Zoom-Controls anpassen
      const isDark = theme === 'dark';

      // Popups anpassen
      const popups = document.querySelectorAll('.leaflet-popup-content-wrapper, .leaflet-popup-tip');
      popups.forEach(popup => {
        popup.style.backgroundColor = isDark ? '#1a1a1a' : '#ffffff';
        popup.style.color = isDark ? '#ffffff' : '#000000';
      });

      // Zoom-Controls anpassen (keine Tile-Layer Anpassung mehr)
      const zoomButtons = document.querySelectorAll('.leaflet-control-zoom a');
      zoomButtons.forEach(button => {
        button.style.backgroundColor = isDark ? '#1a1a1a' : 'var(--background-color)';
        button.style.color = isDark ? '#ffffff' : 'var(--text-color)';
        button.style.borderColor = 'var(--border-color)';
      });

      // Hover-Effekt für Zoom-Buttons
      // Dieser wird bereits durch CSS gehandhabt
    },
    validateField(field) {
      if (field === 'name' && !this.form.name) {
        this.errors.name = 'Bitte gib deinen Namen ein.';
      } else if (field === 'email') {
        if (!this.form.email) {
          this.errors.email = 'Bitte gib deine E-Mail ein.';
        } else if (!/\S+@\S+\.\S+/.test(this.form.email)) {
          this.errors.email = 'Bitte gib eine gültige E-Mail ein.';
        } else {
          delete this.errors.email;
        }
      } else if (field === 'message' && !this.form.message) {
        this.errors.message = 'Bitte gib deine Nachricht ein.';
      } else {
        delete this.errors[field];
      }
    },
    submitForm() {
      if (this.validateForm()) {
        // Formular verarbeiten
        this.successMessage = 'Nachricht erfolgreich gesendet!';
        // Formular zurücksetzen
        this.form = { name: '', email: '', message: '' };
      }
    },
    validateForm() {
      this.errors = {};

      this.validateField('name');
      this.validateField('email');
      this.validateField('message');

      return Object.keys(this.errors).length === 0;
    }
  },
  mounted() {
    this.initMap();
  },
  beforeUnmount() {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 400px;
  margin-bottom: 2rem;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}

.form-group {
  position: relative;
}

.input-icon {
  position: relative;
}

.input-icon i {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  color: var(--primary-color);
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 2px solid var(--border-color);
  border-radius: 5px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.contact-form input:focus,
.contact-form textarea:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 5px rgba(78, 84, 200, 0.5);
  outline: none;
}

.has-error input,
.has-error textarea {
  border-color: var(--accent-color);
}

.contact-form button {
  align-self: flex-start;
}

.error {
  color: var(--accent-color);
  font-size: 0.9rem;
  margin-top: 5px;
}

.success {
  color: var(--primary-color);
  margin-top: 20px;
  font-size: 1rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom popup styles */
:deep(.leaflet-popup-content-wrapper) {
  background: var(--background-color);
  color: var(--text-color);
  border-radius: 8px;
}

:deep(.leaflet-popup-tip) {
  background: var(--background-color);
}

:deep(.leaflet-container) {
  font-family: var(--font-family);
}

:deep(.leaflet-control-zoom a) {
  background-color: var(--background-color) !important;
  color: var(--text-color) !important;
  border-color: var(--border-color) !important;
}

:deep(.leaflet-control-zoom a:hover) {
  background-color: var(--primary-color) !important;
  color: var(--white) !important;
}

/* Icons Styling */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
</style>