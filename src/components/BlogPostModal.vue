<template>
  <teleport to="body">
    <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <span class="close-button" @click="closeModal">&times;</span>
        <h2>{{ post.title }}</h2>
        <img :src="post.image" alt="Bild zu {{ post.title }}" />
        <p>{{ post.content }}</p>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  props: ['post', 'isVisible'],
  emits: ['close'],
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background-color: var(--white);
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 800px;
  position: relative;
  max-height: 90%;
  overflow-y: auto;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 2rem;
  cursor: pointer;
  color: var(--accent-color);
}

.modal-content img {
  width: 100%;
  height: auto;
  margin-bottom: 20px;
}
</style>