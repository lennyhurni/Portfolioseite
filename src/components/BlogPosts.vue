<template>
  <section id="blog" class="main-section fade-in">
    <div class="container">
      <h2>Blog</h2>
      <div class="blog-posts__grid">
        <div class="card blog-post" v-for="(post, index) in blogPosts" :key="index">
          <img :src="post.image" alt="Bild zu {{ post.title }}" />
          <h3>{{ post.title }}</h3>
          <p>{{ post.excerpt }}</p>
          <button @click="openModal(post)">Weiterlesen</button>
        </div>
      </div>
      <BlogPostModal :post="selectedPost" :isVisible="isModalVisible" @close="closeModal" />
    </div>
  </section>
</template>

<script>
import BlogPostModal from './BlogPostModal.vue';

export default {
  components: { BlogPostModal },
  data() {
    return {
      blogPosts: [
        {
          title: 'Die neuesten Trends in der Webentwicklung',
          excerpt: 'Erfahre mehr über die aktuellen Trends und Technologien in der Webentwicklung...',
          content: 'Hier ist der vollständige Inhalt des Blog-Beitrags...',
          image: require('@/assets/Images/blog1.jpg'),
        },
        {
          title: 'Tipps für ein erfolgreiches Projektmanagement',
          excerpt: 'Entdecke bewährte Methoden für effektives Projektmanagement...',
          content: 'Hier ist der vollständige Inhalt des Blog-Beitrags...',
          image: require('@/assets/Images/blog2.jpg'),
        },
        {
          title: 'Wie du deine Programmierfähigkeiten verbesserst',
          excerpt: 'Lerne Strategien kennen, um ein besserer Entwickler zu werden...',
          content: 'Hier ist der vollständige Inhalt des Blog-Beitrags...',
          image: require('@/assets/Images/blog3.jpg'),
        },
      ],
      selectedPost: null,
      isModalVisible: false,
    };
  },
  methods: {
    openModal(post) {
      this.selectedPost = post;
      this.isModalVisible = true;
      document.body.style.overflow = 'hidden'; // Scrollen verhindern
    },
    closeModal() {
      this.isModalVisible = false;
      document.body.style.overflow = 'auto'; // Scrollen wieder erlauben
    },
  },
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
  overflow: hidden;
  padding: 0;
}

.blog-post img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.blog-post h3 {
  padding: 15px;
  font-size: 1.5rem;
  color: var(--primary-color);
}

.blog-post p {
  padding: 0 15px;
  color: var(--text-color);
}

.blog-post button {
  margin: 15px;
  background-color: var(--accent-color);
  color: var(--white);
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.blog-post button:hover {
  background-color: #e55d5d;
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
