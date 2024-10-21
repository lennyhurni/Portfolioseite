<!-- ContactForm.vue -->

<template>
    <section id="contact" class="main-section fade-in">
      <div class="container">
        <h2>Kontaktiere mich</h2>
        <div id="map" class="map"></div>
        <form class="contact-form" @submit.prevent="submitForm">
          <input type="text" v-model="form.name" placeholder="Dein Name" required />
          <input type="email" v-model="form.email" placeholder="Deine E-Mail" required />
          <textarea v-model="form.message" placeholder="Deine Nachricht" required></textarea>
          <button type="submit">Nachricht senden</button>
        </form>
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
          message: ''
        }
      };
    },
    mounted() {
      const map = L.map('map').setView([46.947, 7.447], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);
      L.marker([46.947, 7.447]).addTo(map)
        .bindPopup('Mein Standort')
        .openPopup();
    },
    methods: {
      submitForm() {
        alert('Vielen Dank für deine Nachricht!');
        this.form.name = '';
        this.form.email = '';
        this.form.message = '';
      }
    }
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
  }
  
  .map {
    height: 300px;
    margin-bottom: 20px;
  }
  </style>
  