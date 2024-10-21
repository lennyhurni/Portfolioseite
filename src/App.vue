<!-- App.vue -->


<template>
  <div id="app">
    <header class="header">
      <div class="header__logo">Lenny Hurni</div>
      <nav class="nav">
        <ul>
          <li><a href="#about">Über mich</a></li>
          <li><a href="#skills">Fähigkeiten</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#testimonials">Testimonials</a></li>
          <li><a href="#blog">Blog</a></li>
          <li><a href="#contact">Kontakt</a></li>
        </ul>
      </nav>
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
      <p>&copy; 2024 - [Dein Name]. Alle Rechte vorbehalten.</p>
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
  }
};
</script>

<style src="@/assets/global.css"></style>
<style src="@/assets/styles.css"></style>

