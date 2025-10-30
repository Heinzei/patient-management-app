import { createRouter, createWebHistory } from 'vue-router';
import PatientsList from '../views/PatientsList.vue';
import PatientDetails from '../views/PatientDetails.vue';
import CreatePatient from '../views/CreatePatient.vue';
import EditPatient from '../views/EditPatient.vue';

const routes = [
  { path: '/', component: PatientsList },
  { path: '/patients/:id', component: PatientDetails, props: true },
  { path: '/create', component: CreatePatient },
  { path: '/edit/:id', component: EditPatient, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
