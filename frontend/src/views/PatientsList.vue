<template>
  <div>
    <h2>Alle Patienten</h2>
    <div v-if="loading">Lade Patienten...</div>
    <div v-else>
      <table border="1" cellpadding="6">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Geburtsdatum</th><th>Aktionen</th></tr>
        </thead>
        <tbody>
          <tr v-for="p in patients" :key="p.id">
            <td>{{ p.id }}</td>
            <td>
              <router-link :to="`/patients/${p.id}`">{{ p.lastname }}, {{ p.firstname }}</router-link>
            </td>
            <td>{{ formatDate(p.birthdate) }}</td>
            <td>
              <router-link :to="`/edit/${p.id}`">Bearbeiten</router-link> |
              <a href="#" @click.prevent="deletePatient(p.id)">Löschen</a>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="patients.length === 0">Keine Patienten vorhanden.</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import axios from 'axios';
import { Patient } from '../types/patient';

export default defineComponent({
  name: 'PatientsList',
  setup() {
    const patients = ref<Patient[]>([]);
    const loading = ref(true);

    // Lädt die Patienten vom Backend
    const load = async () => {
      loading.value = true;
      const res = await axios.get<Patient[]>('http://localhost:3000/patients');
      patients.value = res.data;
      loading.value = false;
    };

    // Löscht einen Patienten
    const deletePatient = async (id?: number) => {
      if (!id) return;
      if (!confirm('Patient wirklich löschen?')) return;
      await axios.delete(`http://localhost:3000/patients/${id}`);
      await load();
    };

    const formatDate = (iso?: string) => {
      if (!iso) return '';
      return new Date(iso).toLocaleDateString();
    };

    onMounted(load);

    return { patients, loading, deletePatient, formatDate };
  }
});
</script>
