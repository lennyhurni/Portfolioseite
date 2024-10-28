<template>
  <div id="app" :data-theme="currentTheme">
    <header class="header">
      <div class="header__logo">Lenny Hurni</div>
      <nav class="nav">
        <ul>
          <li><a href="#about" @click.prevent="scrollTo('#about')">Über mich</a></li>
          <li><a href="#skills" @click.prevent="scrollTo('#skills')">Fähigkeiten</a></li>
          <li><a href="#portfolio" @click.prevent="scrollTo('#portfolio')">Portfolio</a></li>
          <li><a href="#testimonials" @click.prevent="scrollTo('#testimonials')">Testimonials</a></li>
          <li><a href="#blog" @click.prevent="scrollTo('#blog')">Blog</a></li>
          <li><a href="#contact" @click.prevent="scrollTo('#contact')">Kontakt</a></li>
        </ul>
      </nav>
      <div class="theme-toggle">
        <label class="switch">
          <input type="checkbox" v-model="isDarkMode" @change="toggleTheme" />
          <span class="slider round"></span>
        </label>
        <span class="theme-label">{{ isDarkMode ? 'Dark Mode' : 'Light Mode' }}</span>
      </div>
    </header>
    <main>
      <AboutMe />
      <SkillsWidget />
      <ProjectList />
      <TestimonialsCarousel />
      <BlogPosts />
      <ContactForm />
      <WeatherWidget />
    </main>
    <footer class="footer">
      <p>&copy; 2024 - Lenny Hurni. Alle Rechte vorbehalten.</p>
    </footer>
  </div>
</template>

<script>
import AboutMe from '@/components/AboutMe.vue';
import SkillsWidget from '@/components/SkillsWidget.vue';
import ProjectList from '@/components/ProjectList.vue';
import TestimonialsCarousel from '@/components/TestimonialsCarousel.vue';
import BlogPosts from '@/components/BlogPosts.vue';
import ContactForm from '@/components/ContactForm.vue';
import WeatherWidget from '@/components/WeatherWidget.vue';

export default {
  components: {
    AboutMe,
    SkillsWidget,
    ProjectList,
    TestimonialsCarousel,
    BlogPosts,
    ContactForm,
    WeatherWidget
  },
  data() {
    return {
      isDarkMode: false,
      currentTheme: 'light',
    };
  },
  methods: {
    toggleTheme() {
      this.currentTheme = this.isDarkMode ? 'dark' : 'light';
    },
    scrollTo(section) {
      const target = document.querySelector(section);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70, // 70px für die Header-Höhe
          behavior: 'smooth'
        });
      }
    }
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--background-color);
  padding: 10px 20px;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header__logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
}

.nav ul {
  list-style: none;
  display: flex;
  margin: 0;
}

.nav ul li {
  margin: 0 15px;
}

.nav ul li a {
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
}

.nav ul li a:hover {
  color: var(--primary-color);
}

.theme-toggle {
  display: flex;
  align-items: center;
}

.theme-label {
  margin-left: 10px;
  color: var(--text-color);
  font-size: 0.9rem;
}

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  background-color: #ccc;
  border-radius: 34px;
  transition: .4s;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  background-color: white;
  border-radius: 50%;
  transition: .4s;
  left: 2px;
  bottom: 2px;
}

input:checked + .slider {
  background-color: var(--primary-color);
}

input:checked + .slider:before {
  transform: translateX(20px);
}

main {
  margin-top: 70px; /* Höhe des Headers */
}
</style>

<style src="@/assets/global.css"></style>
<style src="@/assets/styles.css"></style>
