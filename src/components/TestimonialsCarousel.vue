<!-- TestimonialsCarousel.vue -->

<template>
    <section id="testimonials" class="main-section fade-in">
      <div class="container">
        <h2>Was andere über mich sagen</h2>
        <div class="carousel">
          <div class="carousel__item" v-for="(testimonial, index) in testimonials" :key="index" v-show="currentIndex === index">
            <p>"{{ testimonial.quote }}"</p>
            <h4>- {{ testimonial.author }}</h4>
          </div>
          <div class="carousel__controls">
            <button @click="prevSlide">Zurück</button>
            <button @click="nextSlide">Weiter</button>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    data() {
      return {
        testimonials: [
          { quote: 'Er ist ein großartiger Entwickler!', author: 'Kunde' },
          { quote: 'Die Zusammenarbeit war hervorragend.', author: 'Kunde' },
          { quote: 'Seine Arbeit hat unsere Erwartungen übertroffen.', author: 'Kunde' },
        ],
        currentIndex: 0
      };
    },
    methods: {
      nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
      },
      prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
      }
    }
  };
  </script>
  
  <style scoped>
  .carousel {
    position: relative;
    text-align: center;
  }
  
  .carousel__item {
    min-height: 150px;
  }
  
  .carousel__controls {
    margin-top: 20px;
  }
  
  .carousel__controls button {
    margin: 0 10px;
  }
  </style>
  