<template>
  <section id="skills" class="main-section fade-in" ref="skillsSection">
    <div class="container">
      <h2>Meine Fähigkeiten</h2>
      <div class="skills-grid">
        <div class="skill-item" v-for="skill in skills" :key="skill.name">
          <div class="circle-chart">
            <svg viewBox="0 0 36 36">
              <path
                class="circle-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                class="circle"
                :class="{ animate: animateSkills }"
                :style="{ '--target-progress': skill.level }"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span>{{ skill.level }}%</span>
          </div>
          <h3>{{ skill.name }}</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      skills: [
        { name: 'JavaScript', level: 90 },
        { name: 'Vue.js', level: 85 },
        { name: 'CSS', level: 80 },
        { name: 'HTML', level: 90 },
        { name: 'Node.js', level: 70 },
        { name: 'Python', level: 65 },
        { name: 'Datenbanken', level: 60 },
        { name: 'Git', level: 80 },
        { name: 'Docker', level: 50 },
      ],
      animateSkills: false,
    };
  },
  mounted() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.animateSkills = true;
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    
    observer.observe(this.$refs.skillsSection);
  }
};
</script>

<style scoped>
.main-section {
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.main-section.fade-in {
  opacity: 1;
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.skill-item {
  flex: 1 1 calc(33.333% - 20px);
  background-color: var(--secondary-color);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  transition: background-color var(--transition);
}

.circle-chart {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 10px;
}

.circle-chart svg {
  width: 100%;
  height: 100%;
}

.circle-bg, .circle {
  fill: none;
  stroke-width: 2.8;
}

.circle-bg {
  stroke: var(--border-color);
}

.circle {
  stroke: var(--accent-color);
  stroke-linecap: round;
  stroke-dasharray: 0, 100;
}

.circle.animate {
  animation: progress 1.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes progress {
  0% {
    stroke-dasharray: 0, 100;
  }
  100% {
    stroke-dasharray: var(--target-progress), 100;
  }
}

.circle-chart span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.2rem;
  color: var(--text-color);
}

.skill-item h3 {
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .skill-item {
    flex: 1 1 calc(50% - 20px);
  }
}

@media (max-width: 480px) {
  .skill-item {
    flex: 1 1 100%;
  }
}
</style>