/**
 * Einfache SQLite-Anbindung mit better-sqlite3 (synchron, für Anfänger leicht verständlich).
 * Diese Datei stellt Funktionen zur Verfügung, die von den API-Endpunkten genutzt werden.
 */

import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Datenbank-Dateipfad (im Projektordner backend/data)
const dbFolder = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dbFolder)) fs.mkdirSync(dbFolder);

// Öffne (oder erstelle) die SQLite-Datei
const dbPath = path.join(dbFolder, 'patients.db');
const db = new Database(dbPath);

// Erstelle Tabelle falls nicht vorhanden
db.prepare(`
  CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lastname TEXT NOT NULL,
    firstname TEXT NOT NULL,
    birthdate TEXT NOT NULL,
    gender TEXT,
    street TEXT,
    housenumber TEXT,
    postalcode TEXT,
    insurance TEXT,
    created_at TEXT NOT NULL
  )
`).run();

// Typescript-Interface für Patient
export interface Patient {
  id?: number;
  lastname: string;
  firstname: string;
  birthdate: string; // ISO-Date
  gender?: string;
  street?: string;
  housenumber?: string;
  postalcode?: string;
  insurance?: string;
  created_at?: string; // ISO datetime
}

// CRUD-Funktionen

export function getAllPatients(): Patient[] {
  const stmt = db.prepare('SELECT * FROM patients ORDER BY id DESC');
  return stmt.all() as Patient[];
}

export function getPatientById(id: number): Patient | null {
  const stmt = db.prepare('SELECT * FROM patients WHERE id = ?');
  return stmt.get(id) as Patient || null;
}

export function createPatient(p: Patient): Patient {
  const now = new Date().toISOString();
  const stmt = db.prepare(`
    INSERT INTO patients (lastname, firstname, birthdate, gender, street, housenumber, postalcode, insurance, created_at)
    VALUES (@lastname, @firstname, @birthdate, @gender, @street, @housenumber, @postalcode, @insurance, @created_at)
  `);
  const info = stmt.run({
    lastname: p.lastname,
    firstname: p.firstname,
    birthdate: p.birthdate,
    gender: p.gender || null,
    street: p.street || null,
    housenumber: p.housenumber || null,
    postalcode: p.postalcode || null,
    insurance: p.insurance || null,
    created_at: now
  });
  return getPatientById(info.lastInsertRowid as number) as Patient;
}

export function updatePatient(id: number, p: Patient): Patient | null {
  const stmt = db.prepare(`
    UPDATE patients SET
      lastname = @lastname,
      firstname = @firstname,
      birthdate = @birthdate,
      gender = @gender,
      street = @street,
      housenumber = @housenumber,
      postalcode = @postalcode,
      insurance = @insurance
    WHERE id = @id
  `);
  const info = stmt.run({
    id,
    lastname: p.lastname,
    firstname: p.firstname,
    birthdate: p.birthdate,
    gender: p.gender || null,
    street: p.street || null,
    housenumber: p.housenumber || null,
    postalcode: p.postalcode || null,
    insurance: p.insurance || null
  });
  if (info.changes === 0) return null;
  return getPatientById(id);
}

export function deletePatient(id: number): boolean {
  const stmt = db.prepare('DELETE FROM patients WHERE id = ?');
  const info = stmt.run(id);
  return info.changes > 0;
}
