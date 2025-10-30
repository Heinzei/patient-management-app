<template>
  <div>
    <h2>Neuen Patienten anlegen</h2>
    <form @submit.prevent="submit">
      <div><label>Nachname: <input v-model="form.lastname" required /></label></div>
      <div><label>Vorname: <input v-model="form.firstname" required /></label></div>
      <div><label>Geburtsdatum: <input type="date" v-model="form.birthdate" required /></label></div>
      <div><label>Geschlecht: <input v-model="form.gender" /></label></div>
      <div><label>Straße: <input v-model="form.street" /></label></div>
      <div><label>Hausnummer: <input v-model="form.housenumber" /></label></div>
      <div><label>PLZ: <input v-model="form.postalcode" /></label></div>
      <div><label>Ort: <input v-model="form.city" /></label></div>
      <div><label>Krankenkasse: <input v-model="form.insurance" /></label></div>
      <div><button type="submit">Erstellen</button></div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { Patient } from '../types/patient';

export default defineComponent({
  name: 'CreatePatient',
  setup() {
    const router = useRouter();
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

    const submit = async () => {
      // POST an Backend
      await axios.post('http://localhost:3000/patients', form);
      // Nach dem Erstellen zurück zur Liste
      router.push('/');
    };

    return { form, submit };
  }
});
</script>
