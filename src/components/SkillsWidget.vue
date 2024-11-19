<template>
  <section id="skills" class="main-section fade-in">
    <div class="container">
      <h2>Meine Fähigkeiten</h2>
      <div class="skills-grid">
        <div class="skill-item" v-for="skill in skills" :key="skill.name">
          <div class="circle-chart" :data-percent="skill.level">
            <svg viewBox="0 0 36 36">
              <path class="circle-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"/>
              <path class="circle"
                :stroke-dasharray="skill.level + ', 100'"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"/>
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
        { name: 'HTML', level: 90 },
        { name: 'CSS', level: 85 },
        { name: 'JavaScript', level: 80 },
        { name: 'Vue.js', level: 75 },
        { name: 'Node.js', level: 70 },
        { name: 'Python', level: 65 },
        { name: 'Datenbanken', level: 60 },
        { name: 'Git', level: 80 },
        { name: 'Docker', level: 50 },
      ],
    };
  },
  mounted() {
    this.observeCharts();
  },
  methods: {
    observeCharts() {
      const options = { threshold: 0.3 };
      const observer = new IntersectionObserver(this.animateCharts, options);
      const charts = this.$el.querySelectorAll('.circle-chart');
      charts.forEach(chart => {
        observer.observe(chart);
      });
    },
    animateCharts(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const chart = entry.target;
          const percent = chart.getAttribute('data-percent');
          const circle = chart.querySelector('.circle');
          circle.style.strokeDasharray = percent + ', 100';
          observer.unobserve(chart);
        }
      });
    },
  },
};
</script>

<style scoped>
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
  transform: rotate(-90deg);
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
  animation: progress 1.5s ease-out forwards;
}

.circle-chart span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.2rem;
  color: var(--text-color);
}

@keyframes progress {
  0% {
    stroke-dasharray: 0 100;
  }
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