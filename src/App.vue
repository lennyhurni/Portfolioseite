<template>
  <div id="app">
    <header class="header">
      <h1>Mein Portfolio</h1>
    </header>
    <main>
      <section>
        <project-list></project-list>
      </section>
    </main>
    <footer class="footer">
      <p>&copy; 2024 - Dein Name. Alle Rechte vorbehalten.</p>
    </footer>
  </div>
</template>

<script>
import ProjectList from './components/ProjectList.vue';

export default {
  components: {
    ProjectList
  }
};
</script>

<style src="./assets/global.css"></style>