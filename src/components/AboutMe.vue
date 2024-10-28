<template>
  <section id="about" class="main-section fade-in">
    <div class="container flex align-center">
      <div class="about__image">
        <img :src="avatarImage" alt="Mein Foto" />
      </div>
      <div class="about__content">
        <h2>Über mich</h2>
        <p>Ich bin Lenny, ein erfahrener Webentwickler aus Bern.</p>
        <!-- Dynamische Zeitleiste -->
        <div class="timeline">
          <div v-for="(event, index) in timeline" :key="index" class="timeline-event">
            <h3>{{ event.year }}</h3>
            <p>{{ event.description }}</p>
          </div>
        </div>
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
      timeline: [
        { year: '2022', description: 'Senior Developer bei XYZ' },
        { year: '2020', description: 'Webentwickler bei ABC' },
        { year: '2018', description: 'Abschluss an der Universität' },
        // Weitere Ereignisse...
      ],
    };
  },
  methods: {
    downloadCV() {
      window.open('path/to/your/cv.pdf', '_blank');
    },
  },
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

.timeline {
  margin-bottom: 20px;
}

.timeline-event {
  position: relative;
  padding-left: 30px;
  margin-bottom: 20px;
}

.timeline-event::before {
  content: '';
  position: absolute;
  left: 0;
  top: 5px;
  width: 15px;
  height: 15px;
  background-color: var(--primary-color);
  border-radius: 50%;
}

.timeline-event h3 {
  margin-bottom: 5px;
  color: var(--primary-color);
}

.timeline-event p {
  margin: 0;
}
</style>
