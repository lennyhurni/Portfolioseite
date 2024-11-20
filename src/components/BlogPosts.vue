<template>
  <section id="blog" class="main-section fade-in">
    <div class="container">
      <h2>Blog</h2>
      <div class="blog-posts__grid">
        <div class="blog-post" v-for="post in posts" :key="post.title" @click="openModal(post)">
          <div class="blog-post__image">
            <img :src="post.image" :alt="post.title" />
          </div>
          <div class="blog-post__content">
            <h3>{{ post.title }}</h3>
            <p>{{ post.excerpt }}</p>
          </div>
        </div>
      </div>
      <!-- Ensure emits are correctly handled -->
      <BlogPostModal 
        :post="selectedPost" 
        :isVisible="isModalVisible" 
        @close="closeModal" 
      />
    </div>
  </section>
</template>

<script>
import BlogPostModal from './BlogPostModal.vue';

export default {
  components: {
    BlogPostModal,
  },
  data() {
    return {
      posts: [
        {
          title: 'Neueste Trends in der Webentwicklung',
          excerpt: 'Erfahre mehr über aktuelle Technologien und Frameworks...',
          content: 'Hier steht der vollständige Inhalt des Blog-Beitrags...',
          image: require('@/assets/Images/blog1.jpg'),
        },
        {
          title: 'Tipps für ein erfolgreiches Projektmanagement',
          excerpt: 'Entdecke bewährte Methoden für effektives Projektmanagement...',
          content: 'Hier ist der vollständige Inhalt des Blog-Beitrags...',
          image: require('@/assets/Images/blog2.jpg'),
        },
        // Weitere Beiträge...
      ],
      selectedPost: null,
      isModalVisible: false,
    };
  },
  methods: {
    openModal(post) {
      this.selectedPost = post;
      this.isModalVisible = true;
      document.body.style.overflow = 'hidden';
    },
    closeModal() {
      this.isModalVisible = false;
      this.selectedPost = null;
      document.body.style.overflow = 'auto';
    },
  },
};
</script>

<style scoped>
.blog-posts__grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.blog-post {
  flex: 1 1 calc(33.333% - 20px);
  background-color: var(--secondary-color);
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: var(--shadow);
  transition: transform var(--transition);
}

.blog-post:hover {
  transform: translateY(-5px);
}

.blog-post__image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.blog-post__content {
  padding: 15px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.blog-post__content h3 {
  color: var(--primary-color);
  margin-bottom: 10px;
}

.blog-post__content p {
  color: var(--text-color);
  flex: 1;
}

@media (max-width: 1024px) {
  .blog-post {
    flex: 1 1 calc(50% - 20px);
  }
}

@media (max-width: 768px) {
  .blog-post {
    flex: 1 1 calc(100% - 20px);
  }
}
</style>