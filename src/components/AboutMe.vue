<!-- AboutMe.vue -->

<template>
    <section id="about" class="main-section fade-in">
      <div class="container flex align-center">
        <div class="about__image">
            <img :src="avatarImage" alt="Mein Foto" />
        </div>
        <div class="about__content">
          <h2>Über mich</h2>
          <p>Hallo! Ich bin Lenny, ein leidenschaftlicher Webentwickler aus Bern, spezialisiert auf Frontend- und Backend-Entwicklung.</p>
          <button @click="downloadCV">Lebenslauf herunterladen</button>
        </div>
      </div>
    </section>
  </template>
  
  <script>
    export default {
    data() {
        return {
        avatarImage: require('@/assets/Images/avatar.png'),
        };
    },
    methods: {
        downloadCV() {
        window.open('path/to/your/cv.pdf', '_blank');
        }
    }
    };
  </script>
  
  <style scoped>
  .about__image img {
    width: 200px;
    border-radius: 50%;
    margin-right: 40px;
  }
  
  .about__content {
    max-width: 600px;
  }
  
  .about__content h2 {
    margin-bottom: 20px;
  }
  
  .about__content p {
    margin-bottom: 20px;
    font-size: 1.1rem;
    line-height: 1.8;
  }
  </style>
  