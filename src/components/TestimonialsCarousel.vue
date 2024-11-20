<template>
  <section id="testimonials" class="main-section fade-in">
    <div class="container">
      <h2>Testimonials</h2>
      <div class="testimonials-slider">
        <div
          class="testimonial"
          v-for="(testimonial, index) in testimonials"
          :key="index"
          :class="{ active: index === currentSlide }"
        >
          <img :src="testimonial.image" :alt="'Foto von ' + testimonial.author" />
          <p>"{{ testimonial.quote }}"</p>
          <h4>- {{ testimonial.author }}, {{ testimonial.position }}</h4>
        </div>
      </div>
      <div class="slider-navigation">
        <button @click="prevSlide"><i class="fas fa-chevron-left"></i></button>
        <button @click="nextSlide"><i class="fas fa-chevron-right"></i></button>
      </div>
      <div class="slider-dots">
        <span
          v-for="(testimonial, index) in testimonials"
          :key="index"
          :class="{ active: index === currentSlide }"
          @click="goToSlide(index)"
        ></span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      testimonials: [
        {
          quote:
            'Die Zusammenarbeit mit Lenny Hurni war hervorragend. Er lieferte qualitativ hochwertige Arbeit und übertraf unsere Erwartungen.',
          author: 'Kunde A',
          position: 'CEO bei Firma XYZ',
          image: require('@/assets/Images/testimonial1.jpg'),
        },
        {
          quote:
            'Seine Professionalität und sein Engagement sind beeindruckend. Ich kann ihn uneingeschränkt empfehlen.',
          author: 'Kunde B',
          position: 'Projektmanager bei Firma ABC',
          image: require('@/assets/Images/testimonial2.jpg'),
        },
        {
          quote:
            'Dank seiner Expertise konnten wir unser Projekt erfolgreich umsetzen. Seine Fähigkeiten sind erstklassig.',
          author: 'Kunde C',
          position: 'CTO bei Firma DEF',
          image: require('@/assets/Images/testimonial3.jpg'),
        },
      ],
      currentSlide: 0,
      autoplayInterval: null,
    };
  },
  mounted() {
    this.startAutoplay();
    window.addEventListener('mouseenter', this.stopAutoplay);
    window.addEventListener('mouseleave', this.startAutoplay);
  },
  methods: {
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.testimonials.length;
    },
    prevSlide() {
      this.currentSlide =
        (this.currentSlide - 1 + this.testimonials.length) % this.testimonials.length;
    },
    goToSlide(index) {
      this.currentSlide = index;
    },
    startAutoplay() {
      if (!this.autoplayInterval) {
        this.autoplayInterval = setInterval(this.nextSlide, 7000);
      }
    },
    stopAutoplay() {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    },
  },
  beforeUnmount() {
    this.stopAutoplay();
    window.removeEventListener('mouseenter', this.stopAutoplay);
    window.removeEventListener('mouseleave', this.startAutoplay);
  },
};
</script>

<style scoped>
.testimonials-slider {
  position: relative;
  overflow: hidden;
  height: 350px;
}

.testimonial {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80%;
  transform: translate(-50%, -50%) scale(0.8);
  opacity: 0;
  transition: all 0.6s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.testimonial.active {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

.testimonial img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1.5rem;
  border: 4px solid var(--color-primary);
  transition: transform 0.3s ease;
}

.testimonial img:hover {
  transform: rotate(360deg);
}

.testimonial p {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: var(--text-color);
  max-width: 600px;
  text-align: center;
  position: relative;
  padding: 0 20px;
}

.testimonial p::before,
.testimonial p::after {
  content: '“';
  font-size: 2rem;
  position: absolute;
  color: var(--color-primary);
}

.testimonial p::before {
  top: -10px;
  left: -10px;
}

.testimonial p::after {
  bottom: -10px;
  right: -10px;
}

.testimonial h4 {
  color: var(--color-primary);
  font-weight: 600;
  transition: color 0.3s ease;
}

.slider-navigation {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
}

.slider-navigation button {
  background: none;
  border: none;
  color: var(--color-primary);
  font-size: 2.5rem;
  cursor: pointer;
  margin: 0 1rem;
  transition: color 0.3s ease, transform 0.3s ease;
}

.slider-navigation button:hover {
  color: var(--color-dark);
  transform: scale(1.2);
}

.slider-dots {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.slider-dots span {
  display: block;
  width: 14px;
  height: 14px;
  background-color: var(--color-primary);
  border-radius: 50%;
  margin: 0 6px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.slider-dots span.active {
  background-color: var(--color-dark);
  transform: scale(1.3);
}

@media (max-width: 768px) {
  .testimonials-slider {
    height: 350px;
  }

  .testimonial {
    width: 95%;
    padding: 1rem;
  }

  .testimonial p {
    font-size: 0.95rem;
    max-width: 450px;
  }

  .slider-navigation button {
    font-size: 1.8rem;
  }

  .slider-dots span {
    width: 10px;
    height: 10px;
    margin: 0 3px;
  }
}

@media (max-width: 480px) {
  .testimonials-slider {
    height: 500px;
  }

  .testimonial {
    width: 100%;
    padding: 0.75rem;
  }

  .testimonial p {
    font-size: 0.9rem;
    max-width: 400px;
  }

  .slider-navigation button {
    font-size: 1.5rem;
  }

  .slider-dots span {
    width: 8px;
    height: 8px;
    margin: 0 2px;
  }
}
</style>