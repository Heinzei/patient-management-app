import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/main.css'

// Erstelle die Vue-Anwendung und mounte den Router
const app = createApp(App);
app.use(router);
app.mount('#app');