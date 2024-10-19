<template>
  <div id="app">
    <header class="header">
      <div class="header__logo">Mein Portfolio</div>
      <nav class="nav">
        <ul>
          <li><a href="#about">Über mich</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#testimonials">Testimonials</a></li>
          <li><a href="#blog">Blog</a></li>
          <li><a href="#contact">Kontakt</a></li>
        </ul>
      </nav>
      <div class="header__search">
        <input type="text" v-model="searchQuery" placeholder="Search GitHub Repos" @input="filterRepos" />
      </div>
    </header>
    <main>
      <section id="about" class="main-section">
        <h2>Über mich</h2>
        <p>Ich bin ein Webentwickler aus Deutschland, spezialisiert auf Frontend- und Backend-Entwicklung. Hier sind einige meiner letzten Projekte:</p>
      </section>
      <section id="skills" class="main-section">
        <h2>Skills</h2>
        <canvas id="skillsChart"></canvas>
      </section>
      <section id="portfolio" class="main-section">
        <project-list :search-query="searchQuery"></project-list>
      </section>
      <section id="testimonials" class="main-section">
        <h2>Testimonials</h2>
        <div class="carousel">
          <!-- Carousel items here -->
        </div>
      </section>
      <section id="blog" class="main-section">
        <h2>Blog</h2>
        <div class="blog-posts">
          <!-- Blog posts here -->
        </div>
      </section>
      <section id="contact" class="main-section">
        <h2>Kontakt</h2>
        <div id="map" class="map"></div>
        <form class="contact-form">
          <input type="text" placeholder="Dein Name" />
          <input type="email" placeholder="Deine E-Mail" />
          <textarea placeholder="Deine Nachricht"></textarea>
          <button type="submit">Nachricht senden</button>
        </form>
      </section>
    </main>
    <footer class="footer">
      <p>&copy; 2024 - Dein Name. Alle Rechte vorbehalten.</p>
    </footer>
  </div>
</template>

<script>
import ProjectList from '@/components/ProjectList.vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Chart from 'chart.js/auto';

export default {
  components: {
    ProjectList
  },
  data() {
    return {
      searchQuery: ''
    };
  },
  mounted() {
    const map = L.map('map').setView([46.947, 7.447], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    L.marker([46.947, 7.447]).addTo(map)
      .bindPopup('Bern, Schweiz')
      .openPopup();

    const ctx = document.getElementById('skillsChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['HTML', 'CSS', 'JavaScript', 'Vue.js', 'Node.js'],
        datasets: [{
          label: 'Skills',
          data: [90, 85, 80, 75, 70],
          backgroundColor: ['#ff6b6b', '#feca57', '#54a0ff', '#1dd1a1', '#ff9ff3']
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  },
  methods: {
    filterRepos() {
      this.$refs.projectList.filterRepos(this.searchQuery);
    }
  }
};
</script>

<style src="@/assets/global.css"></style>
<style scoped>
/* Mobile-first styles */
body {
  font-family: 'Poppins', sans-serif;
  line-height: 1.6;
  color: #e0e0e0;
  background-color: #121212;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1f1f1f;
  padding: 20px;
  color: #fff;
}

.header__logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav ul {
  list-style: none;
  display: flex;
  justify-content: center;
  padding: 0;
}

.nav ul li {
  margin: 0 15px;
}

.nav ul li a {
  color: #bb86fc;
  text-decoration: none;
  font-weight: bold;
}

.nav ul li a:hover {
  text-decoration: underline;
}

.header__search input {
  padding: 5px;
  border: none;
  border-radius: 5px;
}

.main-section {
  padding: 40px;
  margin: 20px auto;
  background-color: #1f1f1f;
  border-radius: 10px;
  max-width: 800px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}

.contact-form input,
.contact-form textarea {
  padding: 10px;
  border: none;
  border-radius: 5px;
}

.contact-form button {
  align-self: flex-start;
}

.map {
  height: 300px;
  margin-bottom: 20px;
}

.header-animation {
  position: relative;
  height: 100px;
}

.header-animation__circle {
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: #ff6b6b;
  border-radius: 50%;
  animation: bounce 3s infinite ease-in-out;
  top: 0;
  left: 10%;
}

.header-animation__triangle {
  position: absolute;
  width: 0;
  height: 0;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-bottom: 50px solid #feca57;
  animation: bounce 3s infinite ease-in-out 0.5s;
  top: 0;
  left: 40%;
}

.header-animation__square {
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: #54a0ff;
  animation: bounce 3s infinite ease-in-out 1s;
  top: 0;
  left: 70%;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Responsive styles */
@media (min-width: 768px) {
  .main-section {
    max-width: 1000px;
  }

  .nav ul {
    justify-content: flex-end;
  }
}

@media (min-width: 1024px) {
  .main-section {
    max-width: 1200px;
  }
}
</style>