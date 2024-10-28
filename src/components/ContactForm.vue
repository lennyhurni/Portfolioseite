<template>
  <section id="contact" class="main-section fade-in">
    <div class="container">
      <h2>Kontakt</h2>
      <!-- Karte -->
      <div id="map" class="map"></div>
      <!-- Formular -->
      <form class="contact-form" @submit.prevent="submitForm">
        <input type="text" v-model="form.name" placeholder="Dein Name" required />
        <span v-if="errors.name" class="error">{{ errors.name }}</span>

        <input type="email" v-model="form.email" placeholder="Deine E-Mail" required />
        <span v-if="errors.email" class="error">{{ errors.email }}</span>

        <textarea v-model="form.message" placeholder="Deine Nachricht" required></textarea>
        <span v-if="errors.message" class="error">{{ errors.message }}</span>

        <button type="submit">Senden</button>
      </form>
      <!-- Erfolgsnachricht -->
      <div v-if="successMessage" class="success">{{ successMessage }}</div>
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
    const map = L.map('map').setView([46.947, 7.447], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    L.marker([46.947, 7.447]).addTo(map).bindPopup('Mein Standort').openPopup();
  },
  methods: {
    validateForm() {
      this.errors = {};
      if (!this.form.name) this.errors.name = 'Bitte gib deinen Namen ein.';
      if (!this.form.email) {
        this.errors.email = 'Bitte gib deine E-Mail ein.';
      } else if (!/\S+@\S+\.\S+/.test(this.form.email)) {
        this.errors.email = 'Bitte gib eine gültige E-Mail ein.';
      }
      if (!this.form.message) this.errors.message = 'Bitte gib eine Nachricht ein.';
      return Object.keys(this.errors).length === 0;
    },
    submitForm() {
      if (this.validateForm()) {
        // Sende das Formular
        this.successMessage = 'Vielen Dank für deine Nachricht!';
        // Formular zurücksetzen
        this.form = { name: '', email: '', message: '' };
        // Erfolgsnachricht nach 5 Sekunden ausblenden
        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
      }
    },
  },
};
</script>

<style scoped>
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}

.contact-form input,
.contact-form textarea {
  padding: 10px;
  border: 2px solid var(--primary-color);
  border-radius: 5px;
}

.contact-form button {
  align-self: flex-start;
  background-color: var(--accent-color);
  color: var(--white);
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  transition: background 0.3s;
  border-radius: 5px;
}

.contact-form button:hover {
  background-color: darken(var(--accent-color), 10%);
}

.map {
  height: 300px;
  margin-bottom: 20px;
}

.error {
  color: var(--accent-color);
  font-size: 0.9rem;
}

.success {
  color: var(--primary-color);
  margin-top: 20px;
  font-size: 1rem;
}
</style>
