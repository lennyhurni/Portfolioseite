<!-- src/App.vue -->
<template>
  <div class="app-container">
    <!-- Loading Overlay als erstes Element -->
    <div v-if="isLoading" class="loading-overlay" @mousemove="handleMouseMove">
      <div class="loading-content">
        <!-- Updated Text Animation -->
        <div class="welcome-3d" :style="mouseStyle">
          <div class="text-wrapper">
            <div class="text-animation">
              <span class="letter" v-for="(letter, index) in 'Wilkommen'" :key="index" 
                    :style="{ '--delay': `${index * 0.1}s` }">
                {{ letter }}
              </span>
            </div>
          </div>
        </div>

        <!-- Animated SVG Background -->
        <div class="svg-background">
          <svg viewBox="0 0 200 200">
            <path class="path-animation" d="M10,10 C50,100 150,100 190,10" />
            <path class="path-animation" d="M10,90 C50,0 150,0 190,90" />
          </svg>
        </div>
        
        <!-- Enhanced Particle System -->
        <div class="particle-container">
          <div v-for="n in 40" :key="n" 
               class="particle" 
               :class="{ 'particle-glow': n % 3 === 0 }"
               :style="{ 
                 '--delay': `${n * 0.1}s`, 
                 '--angle': `${n * 9}deg`,
                 '--radius': `${100 + (n % 3) * 30}px`
               }">
          </div>
        </div>

        <!-- Progress Indicator -->
        <div class="loading-progress">
          <div class="progress-bar">
            <div class="progress-fill"></div>
          </div>
          <div class="loading-text"></div>
        </div>
      </div>
    </div>
    
    <!-- Existierender Header -->
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
          <input type="checkbox" v-model="isDarkMode" />
          <span class="slider round"></span>
        </label>
        <span class="theme-label">{{ isDarkMode ? 'Dark Mode' : 'Light Mode' }}</span>
      </div>
    </header>

    <!-- Existierender Content -->
    <main>
      <AboutMe :currentTheme="currentTheme" />
      <SkillsWidget />
      <ProjectList />
      <TestimonialsCarousel />
      <BlogPosts />
      <ContactForm />
      <WeatherWidget />
    </main>

    <!-- Existierender Footer -->
    <footer class="footer">
      <p>&copy; 2024 - Lenny Hurni. Alle Rechte vorbehalten.</p>
    </footer>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import AboutMe from '@/components/AboutMe.vue';
import SkillsWidget from '@/components/SkillsWidget.vue';
import ProjectList from '@/components/ProjectList.vue';
import TestimonialsCarousel from '@/components/TestimonialsCarousel.vue';
import BlogPosts from '@/components/BlogPosts.vue';
import ContactForm from '@/components/ContactForm.vue';
import WeatherWidget from '@/components/WeatherWidget.vue';

export default defineComponent({
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
      isLoading: true,
      isMenuOpen: false,
      isDarkMode: false,
      currentTheme: 'light',
      mouseX: 0,
      mouseY: 0,
    };
  },
  computed: {
    mouseStyle() {
      return {
        transform: `rotateX(${(this.mouseY - 50) * 0.1}deg) rotateY(${(this.mouseX - 50) * 0.1}deg)`
      }
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      this.currentTheme = this.isDarkMode ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', this.currentTheme);

      // Speichere die Einstellung im lokalen Speicher
      localStorage.setItem('isDarkMode', this.isDarkMode);
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
    handleMouseMove(e) {
      this.mouseX = (e.clientX / window.innerWidth) * 100
      this.mouseY = (e.clientY / window.innerHeight) * 100
    }
  },
  mounted() {
    const savedTheme = localStorage.getItem('isDarkMode');
    if (savedTheme !== null) {
      // Verwende die gespeicherte Einstellung
      this.isDarkMode = savedTheme === 'true';
    } else {
      // Fallback auf die Systemeinstellung
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDarkMode = prefersDark;
    }
    this.currentTheme = this.isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.currentTheme);

    // Simuliere einen Ladevorgang von 3 Sekunden
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  },
  watch: {
    isDarkMode(newValue) {
      this.currentTheme = newValue ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', this.currentTheme);
      localStorage.setItem('isDarkMode', newValue);
    }
  },
});
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

/* Füge die Loading-Styles am Ende der Style-Sektion hinzu */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--background-color);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  perspective: 1000px;
  overflow: hidden;
}

.loading-content {
  position: relative;
  transform-style: preserve-3d;
}

.welcome-3d {
  transform-style: preserve-3d;
  transition: transform 0.2s ease-out;
}

.text-wrapper {
  position: relative;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1200px;
  margin-bottom: 2rem;
}

.text-animation {
  position: relative;
  white-space: nowrap;
  transform-style: preserve-3d;
}

.letter {
  display: inline-block;
  font-size: 3.5rem;
  font-weight: 800;
  color: var(--primary-color);
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  opacity: 0;
  padding: 0 0.1em;
  transform-origin: center center;
  animation: letterReveal 0.8s var(--delay) forwards;
}

.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: var(--primary-color);
  border-radius: 50%;
  transform-origin: center var(--radius);
  animation: orbitAndPulse 4s var(--delay) infinite;
}

.particle-glow {
  box-shadow: 0 0 20px var(--primary-color);
}

.svg-background {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.path-animation {
  fill: none;
  stroke: var(--primary-color);
  stroke-width: 2;
  opacity: 0.3;
  animation: pathDraw 3s infinite;
}

@keyframes letterAppear {
  0% {
    opacity: 0;
    transform: rotateX(-90deg) translateY(30px) scale(0.8);
    filter: blur(8px);
  }
  50% {
    opacity: 0.5;
    filter: blur(4px);
  }
  100% {
    opacity: 1;
    transform: rotateX(0) translateY(0) scale(1);
    filter: blur(0);
  }
}

@keyframes letterReveal {
  0% {
    opacity: 0;
    transform: rotateX(-90deg) translateY(20px) scale(0.8);
    filter: blur(8px);
  }
  50% {
    opacity: 0.5;
    filter: blur(4px);
  }
  100% {
    opacity: 1;
    transform: rotateX(0) translateY(0) scale(1);
    filter: blur(0);
  }
}

@keyframes orbitAndPulse {
  0% {
    transform: rotate(var(--angle)) translateX(var(--radius)) scale(1);
  }
  50% {
    transform: rotate(calc(var(--angle) + 180deg)) translateX(var(--radius)) scale(1.5);
  }
  100% {
    transform: rotate(calc(var(--angle) + 360deg)) translateX(var(--radius)) scale(1);
  }
}

@keyframes pathDraw {
  0% {
    stroke-dasharray: 300;
    stroke-dashoffset: 300;
  }
  50% {
    stroke-dasharray: 300;
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dasharray: 300;
    stroke-dashoffset: -300;
  }
}
</style>

<style src="@/assets/global.css"></style>