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

        <button type="submit">Senden</button>
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
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: '',
      },
      errors: {},
      successMessage: '',
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const map = L.map('map').setView([46.947, 7.447], 13);

      // Dark Mode Tile Layer
      const darkModeTileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      });

      // Light Mode Tile Layer
      const lightModeTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });

      // Add the appropriate tile layer based on the current theme
      if (document.documentElement.getAttribute('data-theme') === 'dark') {
        darkModeTileLayer.addTo(map);
      } else {
        lightModeTileLayer.addTo(map);
      }

      // Custom Icon
      const customIcon = L.icon({
        iconUrl: require('@/assets/Images/pin-icon.png'), // Pfad zu Ihrem benutzerdefinierten Stecknadel-Icon
        iconSize: [38, 38], // Größe des Icons
        iconAnchor: [22, 38], // Punkt des Icons, der auf den Marker zeigt
        popupAnchor: [-3, -38] // Punkt, von dem aus das Popup relativ zum Icon geöffnet wird
      });

      L.marker([46.947, 7.447], { icon: customIcon }).addTo(map).bindPopup('Mein Standort').openPopup();
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
        this.errors.message = 'Bitte gib eine Nachricht ein.';
      } else {
        delete this.errors[field];
      }
    },
    validateForm() {
      this.errors = {};
      this.validateField('name');
      this.validateField('email');
      this.validateField('message');
      return Object.keys(this.errors).length === 0;
    },
    submitForm() {
      if (this.validateForm()) {
        // Sende das Formular
        this.successMessage = 'Vielen Dank für deine Nachricht!';
        // Formular zurücksetzen
        this.form = { name: '', email: '', message: '' };
        // Erfolgsmeldung nach 5 Sekunden ausblenden
        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
      }
    },
  },
};
</script>

<style scoped>
.map {
  height: 300px;
  margin-bottom: 20px;
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
  background-color: var(--primary-color);
  color: var(--white);
  padding: 12px 25px;
  border: none;
  cursor: pointer;
  transition: background 0.3s;
  border-radius: 5px;
}

.contact-form button:hover {
  background-color: #3a3fbd;
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

/* Icons Styling */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
</style>