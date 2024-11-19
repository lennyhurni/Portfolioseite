<template>
  <section id="portfolio" class="main-section fade-in">
    <div class="container">
      <h2>Portfolio</h2>
      <div class="project-list__search">
        <input type="text" placeholder="Projekte suchen..." v-model="searchQuery" @input="filterRepos" />
      </div>
      <div class="project-list__grid">
        <div class="project-card" v-for="project in filteredProjects" :key="project.id">
          <div class="project-card__header">
            <h3>{{ project.name }}</h3>
          </div>
          <div class="project-card__body">
            <p>{{ project.description }}</p>
          </div>
          <div class="project-card__footer">
            <a :href="project.html_url" target="_blank" class="button">Zum Repository</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import githubService from '@/services/githubService';

export default {
  data() {
    return {
      projects: [],
      filteredProjects: [],
      searchQuery: '',
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
    },
  },
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
  box-shadow: var(--shadow);
  transition: border-color var(--transition), box-shadow var(--transition);
}

.project-list__search input:focus {
  border-color: var(--accent-color);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.project-list__grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.project-card {
  flex: 1 1 calc(33.333% - 20px);
  background-color: var(--secondary-color);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow);
  transition: transform var(--transition), box-shadow var(--transition);
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.project-card__header {
  background-color: var(--primary-color);
  padding: 15px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.project-card__header h3 {
  color: var(--white);
  margin: 0;
}

.project-card__body {
  flex: 1;
  padding: 15px;
  color: var(--text-color);
}

.project-card__footer {
  padding: 15px;
  border-top: 1px solid var(--border-color);
  text-align: right;
}

.project-card__footer .button {
  background-color: var(--primary-color);
  color: var(--white);
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color var(--transition), transform var(--transition);
}

.project-card__footer .button:hover {
  background-color: var(--accent-color);
  transform: translateY(-3px);
}

@media (max-width: 1024px) {
  .project-card {
    flex: 1 1 calc(50% - 20px);
  }
}

@media (max-width: 768px) {
  .project-card {
    flex: 1 1 calc(100% - 20px);
  }
}
</style>