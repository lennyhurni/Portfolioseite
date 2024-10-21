<!-- ProjectList.vue -->

<template>
  <section id="portfolio" class="main-section fade-in">
    <div class="container">
      <h2>Mein Portfolio</h2>
      <div class="project-list__search">
        <input type="text" v-model="searchQuery" placeholder="Projekte suchen..." @input="filterRepos" />
      </div>
      <div v-if="filteredProjects.length">
        <div class="project-list__grid">
          <div v-for="project in filteredProjects" :key="project.id" class="card project-list__item">
            <h3>{{ project.name }}</h3>
            <p>{{ project.description }}</p>
            <a :href="project.html_url" target="_blank">Zum Projekt</a>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Keine Projekte gefunden...</p>
      </div>
    </div>
  </section>
</template>

<script>
import githubService from '../services/githubService.js';

export default {
  data() {
    return {
      projects: [],
      filteredProjects: [],
      searchQuery: ''
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
  methods: {
    filterRepos() {
      this.filteredProjects = this.projects.filter(project =>
        project.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
};
</script>

<style scoped>
.project-list__search {
  margin-bottom: 20px;
}

.project-list__search input {
  width: 100%;
  padding: 10px;
  border: 2px solid var(--primary-color);
  border-radius: 5px;
}

.project-list__grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.project-list__item {
  width: 100%;
  margin-bottom: 20px;
}

@media (min-width: 768px) {
  .project-list__item {
    width: 48%;
  }
}

@media (min-width: 1024px) {
  .project-list__item {
    width: 30%;
  }
}
</style>
