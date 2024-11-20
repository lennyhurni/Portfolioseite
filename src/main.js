// main.js

import { createApp } from 'vue';
import App from './App.vue';
import './assets/global.css';

// Add Vue feature flag
window.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = true;

const app = createApp(App);

app.mount('#app');
