import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// Vite-Konfiguration für Vue 3 + TypeScript
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173, // oder jeder andere freie Port
  },
});
