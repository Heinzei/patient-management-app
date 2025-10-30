<template>
  <div class="container">
    <h1>Patientenverwaltung</h1>
    <router-link to="/">Liste</router-link> |
    <router-link to="/create">Neuen Patienten anlegen</router-link>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App'
});
</script>

<style>
/* Einfache Styles für bessere Lesbarkeit */
.container {
  max-width: 900px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
}
a {
  text-decoration: none;
  color: #2c3e50;
}
</style>
