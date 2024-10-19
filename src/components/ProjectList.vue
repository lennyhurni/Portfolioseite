<template>
  <div class="project-list">
    <h2>GitHub Projekte</h2>
    <div v-if="filteredProjects.length">
      <ul class="project-list__items">
        <li v-for="project in filteredProjects" :key="project.id" class="project-list__item">
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
  props: ['searchQuery'],
  data() {
    return {
      projects: [],
      filteredProjects: []
    };
  },
  mounted() {
    githubService.getUserRepos('deinbenutzername')
      .then(response => {
        this.projects = response.data;
        this.filteredProjects = this.projects;
      })
      .catch(error => {
        console.error('Fehler beim Abrufen der GitHub Projekte:', error);
      });
  },
  watch: {
    searchQuery(newQuery) {
      this.filterRepos(newQuery);
    }
  },
  methods: {
    filterRepos(query) {
      this.filteredProjects = this.projects.filter(project =>
        project.name.toLowerCase().includes(query.toLowerCase())
      );
    }
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