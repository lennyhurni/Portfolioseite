<!-- src/App.vue -->
<template>
  <div id="app" :data-theme="currentTheme">
    <header class="header">
      <div class="header__logo">Lenny Hurni</div>
      <nav class="nav" :class="{ 'nav--open': isMenuOpen }">
        <ul>
          <li><a href="#about" @click.prevent="navigateTo('#about')">Über mich</a></li>
          <li><a href="#skills" @click.prevent="navigateTo('#skills')">Fähigkeiten</a></li>
          <li><a href="#portfolio" @click.prevent="navigateTo('#portfolio')">Portfolio</a></li>
          <li><a href="#testimonials" @click.prevent="navigateTo('#testimonials')">Testimonials</a></li>
          <li><a href="#blog" @click.prevent="navigateTo('#blog')">Blog</a></li>
          <li><a href="#contact" @click.prevent="navigateTo('#contact')">Kontakt</a></li>
        </ul>
      </nav>
      <div class="menu-toggle" :class="{ 'is-active': isMenuOpen }" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="theme-toggle">
        <label class="switch">
          <input type="checkbox" v-model="isDarkMode" @change="toggleTheme" />
          <span class="slider round"></span>
        </label>
        <span class="theme-label">{{ isDarkMode ? 'Dark Mode' : 'Light Mode' }}</span>
      </div>
    </header>
    <main>
      <AboutMe :currentTheme="currentTheme" />
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
  name: 'App',
  components: {
    AboutMe,
    SkillsWidget,
    ProjectList,
    TestimonialsCarousel,
    BlogPosts,
    ContactForm,
    WeatherWidget,
  },
  data() {
    return {
      isMenuOpen: false,
      isDarkMode: false,
      currentTheme: 'light',
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    toggleTheme() {
      this.currentTheme = this.isDarkMode ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', this.currentTheme);
      console.log(`Theme toggled to: ${this.currentTheme}`);
    },
    navigateTo(section) {
      this.isMenuOpen = false;
      this.scrollTo(section);
    },
    scrollTo(section) {
      const target = document.querySelector(section);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: 'smooth',
        });
      }
    },
  },
  mounted() {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.isDarkMode = prefersDark;
    this.currentTheme = this.isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    console.log(`Initial theme set to: ${this.currentTheme}`);
  },
};
</script>

<style scoped>
/* Header Styles */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--background-color);
  padding: 15px 30px;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  box-shadow: var(--shadow);
  transition: background-color var(--transition);
}

.header__logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
  transition: color var(--transition);
}

.nav {
  display: flex;
  align-items: center;
}

.nav ul {
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav ul li a {
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  position: relative;
  transition: color var(--transition);
}

.nav ul li a::after {
  content: '';
  position: absolute;
  width: 0%;
  height: 2px;
  background-color: var(--primary-color);
  left: 0;
  bottom: -5px;
  transition: width 0.3s;
}

.nav ul li a:hover::after {
  width: 100%;
}

/* Menu Toggle Styles */
.menu-toggle {
  display: none;
  cursor: pointer;
}

.menu-toggle span {
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px;
  background-color: var(--text-color);
  transition: transform 0.3s, background-color 0.3s;
}

.menu-toggle.is-active span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.menu-toggle.is-active span:nth-child(2) {
  opacity: 0;
}

.menu-toggle.is-active span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

/* Theme Toggle Styles */
.theme-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.theme-label {
  color: var(--text-color);
  font-size: 0.9rem;
}

/* Switch Styles */
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
  transition: var(--transition);
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
  transition: var(--transition);
  left: 2px;
  bottom: 2px;
}

input:checked + .slider {
  background-color: var(--primary-color);
}

input:checked + .slider:before {
  transform: translateX(20px);
}

/* Responsive Styles */
@media (max-width: 768px) {
  .nav {
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    height: calc(100vh - 70px);
    background-color: var(--background-color);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
  }

  .nav.nav--open {
    transform: translateX(0);
  }

  .nav ul {
    flex-direction: column;
    gap: 1.5rem;
  }

  .menu-toggle {
    display: block;
  }


  .header {
    padding: 15px;
  }

  .header__logo {
    font-size: 1.2rem;
  }
}

/* Main Content Styles */
main {
  margin-top: 70px;
  position: relative;
  z-index: 1;
}

/* Footer Styles */
.footer {
  background-color: var(--background-color);
  color: var(--text-color);
  text-align: center;
  padding: 20px;
  margin-top: 0;
  border-top: 1px solid var(--border-color);
  position: relative;
  z-index: 1;
}
</style>

<style src="@/assets/global.css"></style>