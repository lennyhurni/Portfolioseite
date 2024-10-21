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
      // Holen der CSS-Variable
      const textColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--text-color')
        .trim();
  
      const ctx = document.getElementById('skillsChart').getContext('2d');
      new Chart(ctx, {
        type: 'radar',
        data: {
          labels: ['HTML', 'CSS', 'JavaScript', 'Vue.js', 'Node.js', 'Python', 'Datenbanken'],
          datasets: [{
            label: 'Skill-Level',
            data: [90, 85, 80, 75, 70, 65, 60],
            backgroundColor: 'rgba(78, 84, 200, 0.2)',
            borderColor: 'rgba(78, 84, 200, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(78, 84, 200, 1)',
          }]
        },
        options: {
          responsive: true,
          scales: {
            r: {
              beginAtZero: true,
              ticks: {
                color: textColor,
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.1)',
              },
              angleLines: {
                color: 'rgba(0, 0, 0, 0.1)',
              },
              pointLabels: {
                color: textColor,
              },
            }
          }
        }
      });
    }
  };
  </script>
  
  <style scoped>
  .skills__chart {
    max-width: 600px;
    margin: 0 auto;
    padding-top: 40px;
  }
  </style>
  