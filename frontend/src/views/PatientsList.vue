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
              <router-link class="edit-link" :to="`/edit/${p.id}`">Bearbeiten</router-link>
              |
              <a href="#" class="delete-link" @click.prevent="deletePatient(p.id)">Löschen</a>
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

<style scoped>
/* Container der ganzen View */
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* Tabelle selbst */
table {
  border-collapse: collapse;
  width: 100%; 
  margin: 20px auto; 
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

/* Tabellenkopf */
th {
  background-color: #2196F3;
  color: white;
  padding: 10px;
  text-align: left;
}

/* Tabellenzellen */
td {
  border-bottom: 1px solid #ddd;
  padding: 8px 10px;
}

/* Zeilen-Hover-Effekt */
tr:hover {
  background-color: #f5f5f5;
}

/* Buttons im Tabellenbereich */
.edit-link {
  color: white;
  background-color: #4CAF50;
  padding: 6px 10px;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.2s;
}

.edit-link:hover {
  background-color: #45a049;
}

.delete-link {
  color: white;
  background-color: #f44336;
  padding: 6px 10px;
  border-radius: 4px;
  text-decoration: none;
  margin-left: 5px;
  transition: background-color 0.2s;
}

.delete-link:hover {
  background-color: #d32f2f;
}

.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* jetzt auch vertikal mittig */
  min-height: 100vh;
  background-color: #f9f9f9;
}

</style>


