<!-- src/components/BlogPostModal.vue -->
<template>
  <teleport to="body">
    <transition name="modal-fade">
      <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
          <button class="close-button" @click="closeModal">
            <span class="close-icon">&times;</span>
          </button>
          
          <div class="modal-header">
            <h2>{{ post.title }}</h2>
          </div>

          <div class="image-container">
            <img 
              :src="post.image" 
              :alt="post.title"
              @click="toggleImageZoom"
              :class="{ 'zoomed': isImageZoomed }"
            />
          </div>

          <div class="content-container" v-html="compiledMarkdown"></div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { marked } from 'marked';

export default {
  props: ['post', 'isVisible'],
  emits: ['close'],
  data() {
    return {
      isImageZoomed: false
    }
  },
  computed: {
    compiledMarkdown() {
      if (!this.post) return '';
      // Configure marked options
      marked.setOptions({
        breaks: true,
        gfm: true,
        headerIds: true
      });
      return marked(this.post.content);
    }
  },
  methods: {
    closeModal() {
      this.isImageZoomed = false;
      this.$emit('close');
    },
    toggleImageZoom() {
      this.isImageZoomed = !this.isImageZoomed;
    }
  },
  watch: {
    isVisible(newVal) {
      if (newVal) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 20px;
}

.modal-content {
  background-color: var(--background-color);
  color: var(--text-color);
  border-radius: 12px;
  width: 95%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.modal-header {
  padding: 20px 30px;
  border-bottom: 1px solid var(--border-color);
}

.modal-header h2 {
  margin: 0;
  font-size: 1.8rem;
  color: var(--primary-color);
}

.image-container {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  margin-bottom: 20px;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease, filter 0.3s ease;
  cursor: pointer;
}

.image-container img:hover {
  filter: brightness(1.1);
}

.image-container img.zoomed {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.5);
  z-index: 10000;
  height: auto;
  max-height: 90vh;
  width: auto;
  max-width: 90vw;
  object-fit: contain;
}

.content-container {
  padding: 30px;
  line-height: 1.6;
}

.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 1;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  background-color: var(--background-color);
}

.close-button:hover {
  background-color: var(--border-color);
}

.close-icon {
  color: var(--text-color);
  font-size: 28px;
  line-height: 1;
}

/* Markdown Content Styling */
.content-container :deep(h1) {
  font-size: 2em;
  margin-bottom: 1em;
  color: var(--primary-color);
}

.content-container :deep(h2) {
  font-size: 1.5em;
  margin: 1.5em 0 1em;
  color: var(--primary-color);
}

.content-container :deep(h3) {
  font-size: 1.2em;
  margin: 1.2em 0 0.8em;
}

.content-container :deep(p) {
  margin-bottom: 1.2em;
  line-height: 1.8;
}

.content-container :deep(ul), 
.content-container :deep(ol) {
  margin: 1em 0;
  padding-left: 2em;
}

.content-container :deep(li) {
  margin-bottom: 0.5em;
}

.content-container :deep(blockquote) {
  margin: 1.5em 0;
  padding: 1em 2em;
  border-left: 4px solid var(--primary-color);
  background-color: var(--secondary-color);
  border-radius: 4px;
}

.content-container :deep(code) {
  background-color: var(--secondary-color);
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: monospace;
}

.content-container :deep(pre) {
  background-color: var(--secondary-color);
  padding: 1em;
  border-radius: 6px;
  overflow-x: auto;
  margin: 1.5em 0;
}

/* Modal Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.modal-fade-enter-to,
.modal-fade-leave-from {
  opacity: 1;
  transform: scale(1);
}

</style>