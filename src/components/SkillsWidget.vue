<!-- filepath: /c:/EWEB/portfolio_page/portfolio-vue/src/components/SkillsWidget.vue -->
<template>
  <section id="skills" class="main-section fade-in">
    <div class="container">
      <h2>Meine Fähigkeiten</h2>
      <div class="skills__chart">
        <canvas id="skillsChart"></canvas>
      </div>
    </div>
  </section>
</template>

<script>
import { Chart } from 'chart.js/auto';

export default {
  mounted() {
    const styles = getComputedStyle(document.documentElement);
    const textColor = styles.getPropertyValue('--text-color').trim();

    const ctx = document.getElementById('skillsChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['HTML', 'CSS', 'JavaScript', 'Vue.js', 'Node.js', 'Python', 'Datenbanken', 'Git', 'Docker'],
        datasets: [{
          label: 'Skill-Level',
          data: [90, 85, 80, 75, 70, 65, 60, 70, 65],
          backgroundColor: 'rgba(78, 84, 200, 0.6)',
          borderColor: 'rgba(78, 84, 200, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(78, 84, 200, 0.8)',
        }]
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.label}: ${context.parsed.y}%`;
              }
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: textColor,
            },
            grid: {
              display: false,
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: textColor,
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
            }
          }
        }
      }
    });
  }
};
</script>

<style scoped>
.skills__chart {
  max-width: 800px;
  margin: 0 auto;
  padding-top: 40px;
}
</style>
