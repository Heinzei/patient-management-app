<template>
  <div>
    <h2>Patient bearbeiten</h2>
    <div v-if="loading">Lade...</div>
    <form v-else @submit.prevent="submit">
      <div><label>Nachname: <input v-model="form.lastname" required /></label></div>
      <div><label>Vorname: <input v-model="form.firstname" required /></label></div>
      <div><label>Geburtsdatum: <input type="date" v-model="form.birthdate" required /></label></div>
      <div><label>Geschlecht: <input v-model="form.gender" /></label></div>
      <div><label>Straße: <input v-model="form.street" /></label></div>
      <div><label>Hausnummer: <input v-model="form.housenumber" /></label></div>
      <div><label>PLZ: <input v-model="form.postalcode" /></label></div>
      <div><label>Ort: <input v-model="form.city" /></label></div>
      <div><label>Krankenkasse: <input v-model="form.insurance" /></label></div>
      <div><button type="submit">Speichern</button></div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { Patient } from '../types/patient';

export default defineComponent({
  name: 'EditPatient',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const loading = ref(true);
    const form = reactive<Patient>({
      lastname: '',
      firstname: '',
      birthdate: '',
      gender: '',
      street: '',
      housenumber: '',
      postalcode: '',
      city: '',
      insurance: '',
    });

    const load = async () => {
      loading.value = true;
      const id = route.params.id;
      const res = await axios.get<Patient>(`http://localhost:3000/patients/${id}`);
      Object.assign(form, res.data);
      loading.value = false;
    };

    const submit = async () => {
      const id = route.params.id;
      await axios.put(`http://localhost:3000/patients/${id}`, form);
      router.push('/');
    };

    onMounted(load);

    return { form, submit, loading };
  }
});
</script>
