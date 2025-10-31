/**
 * Express-Server mit TypeScript.
 */

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getAllPatients, getPatientById, createPatient, updatePatient, deletePatient, Patient } from './db';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// List all patients
app.get('/patients', (req, res) => {
  const list = getAllPatients();
  res.json(list);
});

// GET /patients/:id - Details eines Patienten
app.get('/patients/:id', (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' });
  const patient = getPatientById(id);
  if (!patient) return res.status(404).json({ error: 'Patient not found' });
  res.json(patient);
});

// POST /patients - neuen Patienten anlegen
app.post('/patients', (req, res) => {
  try {
    const payload = req.body as Patient;
    // Validierung
    if (!payload.lastname || !payload.firstname || !payload.birthdate) {
      return res.status(400).json({ error: 'lastname, firstname and birthdate are required' });
    }
    const created = createPatient(payload);
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /patients/:id - Patienten aktualisieren
app.put('/patients/:id', (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' });
  const payload = req.body as Patient;
  if (!payload.lastname || !payload.firstname || !payload.birthdate) {
    return res.status(400).json({ error: 'lastname, firstname and birthdate are required' });
  }
  const updated = updatePatient(id, payload);
  if (!updated) return res.status(404).json({ error: 'Patient not found' });
  res.json(updated);
});

// DELETE /patients/:id - Patienten löschen
app.delete('/patients/:id', (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' });
  const ok = deletePatient(id);
  if (!ok) return res.status(404).json({ error: 'Patient not found' });
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
