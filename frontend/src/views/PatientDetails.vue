<template>
  <div>
    <h2>Patient: {{ patient?.firstname }} {{ patient?.lastname }}</h2>
    <div v-if="loading">Lade...</div>
    <div v-else-if="patient">
      <p><strong>Geburtsdatum:</strong> {{ patient.birthdate }}</p>
      <p><strong>Geschlecht:</strong> {{ patient.gender }}</p>
      <p><strong>Straße:</strong> {{ patient.street }} {{ patient.housenumber }}</p>
      <p><strong>PLZ:</strong> {{ patient.postalcode }}</p>
      <p><strong>Krankenkasse:</strong> {{ patient.insurance }}</p>
      <p><strong>Angelegt am:</strong> {{ patient.created_at }}</p>
      <p><strong>Ort:</strong> {{ patient.city }}</p>
      <router-link :to="`/edit/${patient.id}`">Bearbeiten</router-link>
    </div>
    <div v-else>
      <p>Patient nicht gefunden.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { Patient } from '../types/patient';

export default defineComponent({
  name: 'PatientDetails',
  setup() {
    const route = useRoute();
    const patient = ref<Patient | null>(null);
    const loading = ref(true);

    const load = async () => {
      loading.value = true;
      const id = route.params.id;
      const res = await axios.get<Patient>(`http://localhost:3000/patients/${id}`);
      patient.value = res.data;
      loading.value = false;
    };

    onMounted(load);

    return { patient, loading };
  }
});
</script>
