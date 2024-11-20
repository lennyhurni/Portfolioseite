<!-- src/components/ThreeDBackground.vue -->
<template>
  <div ref="threeCanvas" class="three-canvas"></div>
</template>

<script>
import * as THREE from 'three';
import { markRaw } from 'vue';

export default {
  name: 'ThreeDBackground',
  props: {
    currentTheme: {
      type: String,
      default: 'light'
    }
  },
  mounted() {
    this.initScene();
    window.addEventListener('resize', this.onWindowResize);
  },
  beforeUnmount() {
    cancelAnimationFrame(this.animationId);
    this.cleanup();
    window.removeEventListener('resize', this.onWindowResize);
  },
  methods: {
    cleanup() {
      if (this.particleSystem) {
        this.particleSystem.geometry.dispose();
        this.particleSystem.material.dispose();
        this.scene.remove(this.particleSystem);
        this.particleSystem = null;
      }
      if (this.renderer) {
        this.renderer.dispose();
        if (this.renderer.domElement.parentNode === this.$refs.threeCanvas) {
          this.$refs.threeCanvas.removeChild(this.renderer.domElement);
        }
        this.renderer = null;
      }
      if (this.scene) {
        this.scene = null;
      }
      if (this.camera) {
        this.camera = null;
      }
      console.log('Three.js Szene bereinigt.');
    },
    onWindowResize() {
      if (this.camera && this.renderer) {
        const width = this.$refs.threeCanvas.clientWidth;
        const height = this.$refs.threeCanvas.clientHeight;
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        console.log('Three.js Szene an Fenstergröße angepasst.');
      }
    },
    initScene() {
      console.log('Initialisiere Three.js Szene.');

      // Initialisiere Szene
      this.scene = markRaw(new THREE.Scene());

      // Initialisiere Kamera
      const width = this.$refs.threeCanvas.clientWidth;
      const height = this.$refs.threeCanvas.clientHeight;
      this.camera = markRaw(new THREE.PerspectiveCamera(75, width / height, 0.1, 1000));
      this.camera.position.z = 5;

      // Initialisiere Renderer
      this.renderer = markRaw(new THREE.WebGLRenderer({ 
        alpha: true,
        antialias: true,
        preserveDrawingBuffer: true
      }));
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      
      // Setze die Hintergrundfarbe basierend auf dem aktuellen Theme
      const bgColor = this.currentTheme === 'dark' ? 0x1a1a1a : 0xffffff; // Dunkelgrau für Dark Mode, Weiß für Light Mode
      const bgOpacity = this.currentTheme === 'dark' ? 1 : 0; // Vollständig deckend für Dark Mode, transparent für Light Mode
      this.renderer.setClearColor(bgColor, bgOpacity);
      this.$refs.threeCanvas.appendChild(this.renderer.domElement);

      // Erstelle Partikel
      const particlesGeometry = new THREE.BufferGeometry();
      const particleCount = 300;
      const particlePositions = new Float32Array(particleCount * 3);
      const radius = 2;

      for (let i = 0; i < particleCount * 3; i += 3) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        particlePositions[i]     = radius * Math.sin(phi) * Math.cos(theta);
        particlePositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        particlePositions[i + 2] = radius * Math.cos(phi);
      }

      particlesGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(particlePositions, 3)
      );

      // Hole die Partikelfarbe aus den CSS-Variablen
      const particleColor = getComputedStyle(document.documentElement).getPropertyValue('--particle-color').trim();
      console.log(`Gelesene Partikelfarbe: ${particleColor}`);

      const particleMaterial = new THREE.PointsMaterial({
        color: particleColor,
        size: 0.2, // Größere Partikel
        transparent: true,
        opacity: 0.9,
        sizeAttenuation: true
      });

      this.particleSystem = markRaw(new THREE.Points(particlesGeometry, particleMaterial));
      this.scene.add(this.particleSystem);

      // Animationsschleife
      const animate = () => {
        this.animationId = requestAnimationFrame(animate);
        
        if (this.particleSystem) {
          this.particleSystem.rotation.y += 0.002;
          this.particleSystem.rotation.x += 0.001;
        }

        this.renderer.render(this.scene, this.camera);
      };

      animate();
      console.log('Three.js Animationsschleife gestartet.');
    }
  },
  watch: {
    currentTheme(newTheme) {
      console.log(`Theme geändert zu: ${newTheme}`);
      if (this.particleSystem) {
        // Aktualisiere die Partikelfarbe aus den CSS-Variablen
        const particleColor = getComputedStyle(document.documentElement).getPropertyValue('--particle-color').trim();
        console.log(`Gelesene neue Partikelfarbe: ${particleColor}`);
        this.particleSystem.material.color.set(particleColor);
        console.log(`Partikelfarbe auf ${particleColor} geändert.`);
      }

      // Aktualisiere die Hintergrundfarbe basierend auf dem neuen Theme
      if (this.renderer) {
        const bgColor = newTheme === 'dark' ? 0x1a1a1a : 0xffffff;
        const bgOpacity = newTheme === 'dark' ? 1 : 0;
        this.renderer.setClearColor(bgColor, bgOpacity);
        console.log(`Hintergrundfarbe auf ${bgColor.toString(16)} geändert.`);
      }
    }
  }
};
</script>

<style scoped>
.three-canvas {
  position: absolute;
  top: 50%; /* Zentriere vertikal */
  left: 50%; /* Zentriere horizontal */
  transform: translate(-50%, -50%); /* Exakte Zentrierung */
  width: 420px; /* Größer für bessere Sichtbarkeit */
  height: 420px;
  z-index: -1; /* Hintergrund */
  background-color: transparent; /* Transparenz */
}
</style>