<template>
  <section id="about" class="main-section" :class="{ 'fade-in': !isLoading }">
    <div class="container">
      <div class="about__header flex align-center">
        <div class="about__image">
          <ThreeDBackground :currentTheme="currentTheme"/>
          <img :src="profileImage" alt="Mein Foto" />
        </div>
        <div class="about__intro">
          <h2>Über mich</h2>
          <p class="about__description">{{ intro }}</p>
          <button @click="downloadCV" class="custom-button">
            <i class="fas fa-download"></i> Lebenslauf herunterladen
          </button>
        </div>
      </div>

      <div class="about__content">
        <div class="experience-section" ref="experienceSection">
          <h3><i class="fas fa-briefcase"></i> Aktuelle Positionen</h3>
          <div class="current-positions">
            <div v-for="(position, index) in currentPositions" 
                 :key="index" 
                 class="position-card"
                 :class="{ 'animate': animateElements }">
              <img :src="position.logo" :alt="position.company" />
              <div class="position-info">
                <h4>{{ position.title }}</h4>
                <p class="company">{{ position.company }}</p>
                <p class="period">{{ position.period }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="education-section">
          <h3><i class="fas fa-graduation-cap"></i> Ausbildung</h3>
          <div class="education-timeline">
            <div v-for="(edu, index) in education" :key="index" class="timeline-item">
              <div class="timeline-content">
                <h4>{{ edu.title }}</h4>
                <p class="institution">{{ edu.institution }}</p>
                <p class="period">{{ edu.period }}</p>
                <p class="description">{{ edu.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="skills-section" ref="skillsSection">
          <h3><i class="fas fa-tools"></i> Kernkompetenzen</h3>
          <div class="skills-grid">
            <div v-for="(skill, index) in skills" 
                 :key="index" 
                 class="skill-item"
                 :class="{ 'animate': animateElements }">
              <span class="skill-name">{{ skill }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ThreeDBackground from '@/components/ThreeDBackground.vue';

export default {
  props: {
    currentTheme: {
      type: String,
      default: 'light',
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ThreeDBackground,
  },
  data() {
    return {
      profileImage: require('@/assets/Images/avatar.png'),
      intro: 'Ich bin ein engagierter und motivierter Fachmann mit Erfahrung in der Entwicklung innovativer KI-Lösungen, digitaler Transformation und Kundenbetreuung. Mein Ziel ist es, Unternehmen durch datengestützte Entscheidungen und optimierte Prozesse voranzubringen.',
      currentPositions: [
        {
          title: 'Co-Founder & Geschäftsführer',
          company: 'apexAI',
          period: '05/2024 - Heute',
          logo: 'https://media.licdn.com/dms/image/v2/D4E0BAQF4zuCbAmC82Q/company-logo_100_100/company-logo_100_100/0/1714224897361/apexaich_logo?e=1738195200&v=beta&t=JWy7GL2Cg_wm4nylUXDtnANUrp7wQ_1kYcZOadDZChE'
        },
        {
          title: 'Fachbereich Digitalisierung',
          company: 'Entlastungsdienst Schweiz',
          period: '10/2024 - Heute',
          logo: 'https://media.licdn.com/dms/image/v2/D4E0BAQEQyUFAP-hzow/company-logo_100_100/company-logo_100_100/0/1709548798027/entlastungsdienst_schweiz_logo?e=1738195200&v=beta&t=1c_mrICb9b-DeKIWTjsG_OellDfoIlPAR1uR6lM7xbo'
        }
      ],
      education: [
        {
          title: 'Bachelor of Science - Digital Business & AI',
          institution: 'Berner Fachhochschule BFH',
          period: '08/2022 - 08/2025',
          description: 'Studium mit Fokus auf digitale Geschäftsmodelle und künstliche Intelligenz.'
        },
        {
          title: 'Berufsmaturität Typ Wirtschaft',
          institution: 'WKS KV Bildung',
          period: '01/2020 - 12/2021',
          description: 'Erweiterte Allgemeinbildung mit Schwerpunkt Wirtschaft.'
        }
      ],
      skills: [
        'Datenanalyse',
        'Künstliche Intelligenz',
        'Maschinelles Lernen',
        'Programmierung',
        'Digitale Transformation',
        'ERP-Systeme',
        'Projektmanagement',
        'Datenbanken & SQL'
      ],
      animateElements: false
    };
  },
  mounted() {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.animateElements = true;
      } else {
        this.animateElements = false; 
      }
    }, { threshold: 0.3 });

    observer.observe(this.$refs.experienceSection);
  },
  
  methods: {
    downloadCV(event) {
      event.preventDefault();
      const baseUrl = process.env.BASE_URL || '';
      const cvUrl = `${baseUrl}Lebenslauf_Lenny.html`;
      window.open(cvUrl, '_blank', 'noopener,noreferrer');
    }
  }
};

</script>

<style>
.about__header {
  margin-bottom: 4rem;
}

.about__image {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
}

.about__image img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--primary-color);
  position: relative;
  z-index: 1;
}

.about__intro {
  flex: 1;
  margin-left: 2rem;
}

.about__description {
  font-size: 1.1rem;
  line-height: 1.8;
  margin: 1.5rem 0;
  color: var(--text-color);
}

.experience-section,
.education-section,
.skills-section {
  margin-bottom: 3rem;
}

h3 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.current-positions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.position-card {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background-color: var(--background-color);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.position-card.animate {
  opacity: 1;
  transform: translateY(0);
}

.position-card:nth-child(2) {
  transition-delay: 0.2s;
}

.position-card img {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  margin-right: 1rem;
}

.position-info h4 {
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.education-timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
  padding-left: 1.5rem;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -2px;
  top: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: var(--primary-color);
}

.timeline-item::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 16px;
  bottom: -2rem;
  width: 2px;
  background-color: var(--border-color);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.skill-item {
  padding: 1rem;
  background-color: var(--background-color);
  border-radius: 8px;
  text-align: center;
  transition: transform 0.3s ease;
}

.skill-item:hover {
  transform: translateY(-2px);
}


@media (max-width: 768px) {
  .about__header {
    flex-direction: column;
    text-align: center;
  }

  .about__image {
    margin-bottom: 2rem;
  }

  .about__intro {
    margin-left: 0;
  }

  .current-positions {
    grid-template-columns: 1fr;
  }
}
</style>