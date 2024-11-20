<template>
  <section id="portfolio" class="main-section fade-in">
    <div class="container">
      <h2>Portfolio</h2>
      <div class="project-list__search">
        <input
          type="text"
          placeholder="Projekte suchen..."
          v-model="searchQuery"
          @input="filterRepos"
        />
      </div>
      <div class="project-list__grid">
        <div class="project-card" v-for="project in filteredProjects" :key="project.id">
          <div class="project-card__header">
            <h3>{{ project.name }}</h3>
          </div>
          <div class="project-card__body">
            <p>{{ project.description || 'Keine Beschreibung verfügbar.' }}</p>
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
    githubService
      .getUserRepos()
      .then((response) => {
        this.projects = response.data;
        this.filteredProjects = this.projects;
      })
      .catch((error) => {
        console.error('Fehler beim Abrufen der GitHub Projekte:', error);
      });
  },
  methods: {
    filterRepos() {
      const query = this.searchQuery.toLowerCase();
      this.filteredProjects = this.projects.filter((project) =>
        project.name.toLowerCase().includes(query)
      );
    },
  },
};
</script>

<style scoped>
.project-list__search {
  margin-bottom: 2rem;
}

.project-list__search input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  background-color: var(--card-background);
  color: var(--text-color);
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.project-list__search input:focus {
  border-color: var(--primary-color);
  outline: none;
}

.project-list__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  animation: fadeInGrid 1s ease-in-out;
}

@keyframes fadeInGrid {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.project-card {
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.project-card__header h3 {
  margin: 0.5rem 0;
  color: var(--text-color);
  font-size: 1.2rem;
  transition: color 0.3s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.project-card__header h3:hover {
  color: var(--primary-color);
}

.project-card__body {
  flex: 1;
  margin-bottom: 0.75rem;
  color: var(--text-color);
  font-size: 0.9rem;
}

.project-card__footer {
  text-align: center;
}



@media (max-width: 768px) {
  .project-list__grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 0.75rem;
  }

  .project-card__body {
    font-size: 0.85rem;
  }

  .project-card__footer .button {
    padding: 0.4rem 1rem;
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .project-list__grid {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  .project-card {
    padding: 0.75rem;
  }

  .project-card__footer .button {
    padding: 0.3rem 0.8rem;
    font-size: 0.75rem;
  }
}

</style>