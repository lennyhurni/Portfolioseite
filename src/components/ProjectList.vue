<template>
  <div>
    <h2>GitHub Projekte</h2>
    <div v-if="projects.length">
      <ul>
        <li v-for="project in projects" :key="project.id">
          <a :href="project.html_url" target="_blank">{{ project.name }}</a>
          <p>{{ project.description }}</p>
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
ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 20px;
}

a {
  color: #2980b9;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

</style>