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
          title: 'Large Language Models (LLMs) - Die Revolution der KI',
          excerpt: 'Ein tiefer Einblick in die Technologie hinter ChatGPT, GPT-4 und anderen LLMs...',
          content: `# Large Language Models (LLMs)

Die Art und Weise, wie wir mit künstlicher Intelligenz interagieren, wurde durch LLMs grundlegend verändert. Diese fortschrittlichen KI-Modelle wie GPT-4, PaLM und Claude basieren auf der Transformer-Architektur und wurden mit enormen Mengen an Textdaten trainiert.

## Die wichtigsten Merkmale von LLMs

* **Selbstaufmerksamkeit (Self-Attention)**
  - Ermöglicht dem Modell, Beziehungen zwischen Wörtern in einem Text zu verstehen
  
* **Kontextverständnis** 
  - Fähigkeit, lange Textpassagen zu verstehen und im Kontext zu antworten
  
* **Zero-Shot Learning**
  - Kann Aufgaben ohne spezifisches Training lösen
  
* **Multimodale Fähigkeiten**
  - Neuere Modelle können auch Bilder und Code verarbeiten

## Anwendungsbereiche

1. Textgenerierung und -zusammenfassung
2. Programmierunterstützung
3. Übersetzungen
4. Kreatives Schreiben
5. Datenanalyse

> **Hinweis**: Trotz ihrer beeindruckenden Fähigkeiten haben LLMs auch Einschränkungen wie Halluzinationen, Biases und ethische Bedenken, die bei ihrem Einsatz berücksichtigt werden müssen.`,
          image: require('@/assets/Images/blog1.jpg'),
        },
        {
          title: 'Prompt Engineering: Die Kunst der KI-Kommunikation',
          excerpt: 'Lerne effektive Techniken für die Kommunikation mit KI-Modellen...',
          content: `# Prompt Engineering

Prompt Engineering ist eine entscheidende Fähigkeit im Umgang mit Large Language Models. Es geht darum, Anfragen so zu formulieren, dass die KI die bestmöglichen Ergebnisse liefert.

## Grundlegende Prinzipien

### 1. Klarheit und Präzision
* Verwende spezifische Anweisungen
* Strukturiere komplexe Aufgaben in Teilschritte
* Definiere den gewünschten Output-Format

### 2. Kontext und Rollen
* Gib dem KI-Modell eine klare Rolle
* Stelle relevanten Kontext bereit
* Nutze System-Prompts für Grundregeln

### 3. Iterative Verfeinerung
* Teste verschiedene Prompt-Variationen
* Analysiere die Antworten
* Optimiere schrittweise

## Fortgeschrittene Techniken

* **Chain-of-Thought Prompting**
* **Few-Shot Learning**
* **Zero-Shot Chain-of-Thought**
* **Self-Consistency**

> **Tipp**: Die Qualität des Prompts hat direkten Einfluss auf die Qualität der KI-Ausgabe. Gutes Prompt Engineering kann die Leistung eines LLM erheblich verbessern.`,
          image: require('@/assets/Images/blog2.jpg'),
        }
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