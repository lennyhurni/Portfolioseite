<template>
  <div class="project-list">
    <h2>GitHub Projekte</h2>
    <div v-if="projects.length">
      <ul class="project-list__items">
        <li v-for="project in projects" :key="project.id" class="project-list__item">
          <a :href="project.html_url" target="_blank" class="project-list__link">{{ project.name }}</a>
          <p class="project-list__description">{{ project.description }}</p>
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