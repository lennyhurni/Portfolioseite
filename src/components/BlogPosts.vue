<!-- BlogPosts.vue -->

<template>
    <section id="blog" class="main-section fade-in">
      <div class="container">
        <h2>Mein Blog</h2>
        <div class="blog-posts__grid">
          <div class="card blog-post" v-for="(post, index) in blogPosts" :key="index">
            <h3>{{ post.title }}</h3>
            <p>{{ post.excerpt }}</p>
            <a href="#">Weiterlesen</a>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    data() {
      return {
        blogPosts: [
          { title: 'Mein erster Blog-Beitrag', excerpt: 'Dies ist eine kurze Zusammenfassung des Beitrags.' },
          { title: 'Vue.js Tipps und Tricks', excerpt: 'Einige nützliche Tipps für die Arbeit mit Vue.js.' },
          { title: 'Wie man ein Portfolio erstellt', excerpt: 'Eine Anleitung zum Erstellen einer beeindruckenden Portfolioseite.' },
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .blog-posts__grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  
  .blog-post {
    width: 100%;
    margin-bottom: 20px;
  }
  
  @media (min-width: 768px) {
    .blog-post {
      width: 48%;
    }
  }
  
  @media (min-width: 1024px) {
    .blog-post {
      width: 30%;
    }
  }
  </style>
  