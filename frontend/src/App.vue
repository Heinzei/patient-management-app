<template>
  <div class="container">
    <h1>Patientenverwaltung</h1>
    <div class="nav-links">
      <router-link to="/" class="nav-button">📋 Liste</router-link>
      <router-link to="/create" class="nav-button create">➕ Neuen Patienten anlegen</router-link>
    </div>
    <router-view />
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App'
});
</script>

/* Einfache Styles für bessere Lesbarkeit */

<style scoped>

a {
  text-decoration: none;
  color: #2c3e50;
}

.container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  text-align: center;
  font-family: Arial, sans-serif;
  background-color: beige;
}

.nav-links {
  margin-bottom: 20px;
}

.nav-button {
  display: inline-block;
  margin: 0 8px;
  padding: 8px 14px;
  background-color: #2196F3; /* Blau */
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: bold;
  transition: background-color 0.2s ease;
}

.nav-button:hover {
  background-color: #1976D2;
}

.nav-button.create {
  background-color: #4CAF50; /* Grün */
}

.nav-button.create:hover {
  background-color: #388E3C;
}
</style>
