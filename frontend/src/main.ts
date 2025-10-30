import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Erstelle die Vue-Anwendung und mounte den Router
const app = createApp(App);
app.use(router);
app.mount('#app');
