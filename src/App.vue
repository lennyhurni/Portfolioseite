<template>
  <div class=\"project-list\">
    <h2>GitHub Projekte</h2>
    <div v-if=\"projects.length\">
      <ul class=\"project-list__items\">
        <li v-for=\"project in projects\" :key=\"project.id\" class=\"project-list__item\">
          <a :href=\"project.html_url\" target=\"_blank\" class=\"project-list__link\">{{ project.name }}</a>
          <p class=\"project-list__description\">{{ project.description }}</p>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Keine Projekte gefunden...</p>
    </div>
  </div>
</template>

<script>
import githubService from '../services/githubService.js';

export default {
  data() {
    return {
      projects: []
    };
  },
  mounted() {
    githubService.getUserRepos('deinbenutzername')
      .then(response => {
        this.projects = response.data;
      })
      .catch(error => {
        console.error('Fehler beim Abrufen der GitHub Projekte:', error);
      });
  }
};
</script>

<style scoped>
.project-list {
  padding: 20px;
  background-color: #1f1f1f;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.project-list__items {
  list-style: none;
  padding: 0;
}

.project-list__item {
  margin-bottom: 20px;
  border-bottom: 1px solid #333;
  padding-bottom: 10px;
}

.project-list__link {
  color: #bb86fc;
  text-decoration: none;
  font-weight: bold;
}

.project-list__link:hover {
  text-decoration: underline;
}

.project-list__description {
  margin-top: 5px;
  color: #e0e0e0;
}
</style>
" > components/ProjectList.vue

# Inhalt für githubService.js
echo "
import axios from 'axios';

const githubService = {
  getUserRepos(username) {
    return axios.get(`https://api.github.com/users/${username}/repos`);
  }
};

export default githubService;
" > services/githubService.js

# Schritt 7: Einbindung des GitHub Projekts in die Seite
# Füge ProjectList-Komponente in die App.vue Datei ein
ni src/App.vue
# Inhalt für App.vue
echo "
<template>
  <div id=\"app\">
    <header class=\"header\">
      <h1>Mein Portfolio</h1>
      <nav class=\"nav\">
        <ul>
          <li><a href=\"#about\">Über mich</a></li>
          <li><a href=\"#portfolio\">Portfolio</a></li>
          <li><a href=\"#contact\">Kontakt</a></li>
        </ul>
      </nav>
      <div class=\"header-animation\">
        <div class=\"header-animation__circle\"></div>
        <div class=\"header-animation__triangle\"></div>
        <div class=\"header-animation__square\"></div>
      </div>
    </header>
    <main>
      <section id=\"about\" class=\"main-section\">
        <h2>Über mich</h2>
        <p>Ich bin ein Webentwickler aus Deutschland, spezialisiert auf Frontend- und Backend-Entwicklung. Hier sind einige meiner letzten Projekte:</p>
      </section>
      <section id=\"portfolio\" class=\"main-section\">
        <project-list></project-list>
      </section>
      <section id=\"contact\" class=\"main-section\">
        <h2>Kontakt</h2>
        <div id=\"map\" class=\"map\"></div>
        <form class=\"contact-form\">
          <input type=\"text\" placeholder=\"Dein Name\" />
          <input type=\"email\" placeholder=\"Deine E-Mail\" />
          <textarea placeholder=\"Deine Nachricht\"></textarea>
          <button type=\"submit\">Nachricht senden</button>
        </form>
      </section>
    </main>
    <footer class=\"footer\">
      <p>&copy; 2024 - Dein Name. Alle Rechte vorbehalten.</p>
    </footer>
  </div>
</template>

<script>
import ProjectList from '@/components/ProjectList.vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  components: {
    ProjectList
  },
  mounted() {
    const map = L.map('map').setView([46.947, 7.447], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    L.marker([46.947, 7.447]).addTo(map)
      .bindPopup('Bern, Schweiz')
      .openPopup();
  }
};
</script>

<style src=\"@/assets/global.css\"></style>
<style scoped>
.main-section {
  padding: 40px;
  margin: 20px auto;
  background-color: #1f1f1f;
  border-radius: 10px;
  max-width: 800px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
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

@media (min-width: 768px) {
  .main-section {
    max-width: 1000px;
  }

  .nav ul {
    justify-content: flex-end;
  }
}
</style>