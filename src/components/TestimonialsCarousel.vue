<!-- filepath: /c:/EWEB/portfolio_page/portfolio-vue/src/components/TestimonialsCarousel.vue -->
<template>
  <section id="testimonials" class="main-section fade-in">
    <div class="container">
      <h2>Testimonials</h2>
      <swiper
        :slides-per-view="1"
        :navigation="true"
        :pagination="{ clickable: true }"
        :autoplay="{ delay: 4000 }"
        loop
        class="testimonials-swiper"
      >
        <swiper-slide v-for="(testimonial, index) in testimonials" :key="index">
          <div class="testimonial">
            <img :src="testimonial.image" alt="Foto von {{ testimonial.author }}" />
            <p>"{{ testimonial.quote }}"</p>
            <h4>- {{ testimonial.author }}, {{ testimonial.position }}</h4>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      testimonials: [
        {
          quote: 'Die Zusammenarbeit mit [Dein Name] war hervorragend. Er lieferte qualitativ hochwertige Arbeit und übertraf unsere Erwartungen.',
          author: 'Kunde A',
          position: 'CEO bei Firma XYZ',
          image: require('@/assets/Images/testimonial1.jpg'),
        },
        {
          quote: 'Seine Professionalität und sein Engagement sind beeindruckend. Ich kann ihn uneingeschränkt empfehlen.',
          author: 'Kunde B',
          position: 'Projektmanager bei Firma ABC',
          image: require('@/assets/Images/testimonial2.jpg'),
        },
        {
          quote: 'Dank seiner Expertise konnten wir unser Projekt erfolgreich umsetzen. Seine Fähigkeiten sind erstklassig.',
          author: 'Kunde C',
          position: 'CTO bei Firma DEF',
          image: require('@/assets/Images/testimonial3.jpg'),
        },
      ],
    };
  },
};
</script>

<style scoped>
.testimonials-swiper {
  position: relative;
}

.swiper-button-next,
.swiper-button-prev {
  color: var(--primary-color);
}

.swiper-pagination-bullet-active {
  background-color: var(--primary-color);
}

.testimonial {
  text-align: center;
  padding: 20px;
  background-color: var(--background-color); /* Ensure background color matches dark mode */
}

.testimonial img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
}

.testimonial p {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: var(--text-color);
}

.testimonial h4 {
  color: var(--primary-color);
  font-weight: bold;
}
</style>