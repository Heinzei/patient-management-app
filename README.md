# Patientenverwaltung (Vue 3 + TypeScript Frontend, Node.js + Express + TypeScript Backend, SQLite)

Dieses Repository enthält eine einfache Patientenverwaltungsanwendung:
- Frontend: Vue 3, TypeScript, Vite
- Backend: Node.js, Express, TypeScript
- Datenbank: SQLite (leichtgewichtig, keine zusätzliche Installation notwendig)

## Projektstruktur

```
patient-management-app/
├─ backend/
│  ├─ package.json
│  ├─ tsconfig.json
│  ├─ src/
│  │  ├─ index.ts         # Express Server + REST API
│  │  └─ db.ts            # SQLite Anbindung & CRUD Funktionen
│  └─ data/               # SQLite Datenbankdatei wird hier angelegt (patients.db)
├─ frontend/
│  ├─ package.json
│  ├─ tsconfig.json
│  ├─ index.html
│  └─ src/
│     ├─ main.ts
│     ├─ App.vue
│     ├─ router/
│     │  └─ index.ts
│     ├─ views/
│     │  ├─ PatientsList.vue
│     │  ├─ PatientDetails.vue
│     │  ├─ CreatePatient.vue
│     │  └─ EditPatient.vue
│     └─ types/
│        └─ patient.ts
└─ README.md
```

> Hinweis: Diese Datei enthält auch eine Anleitung, wie Du MySQL in Visual Studio Code einbindest, falls Du statt SQLite MySQL verwenden möchtest.

---

## Schnellstart (Visual Studio Code)

Folge diesen Schritten, um das Projekt lokal auszuführen.

### Voraussetzungen
- Node.js (16+ empfohlen)
- npm (oder yarn)
- Visual Studio Code

### Backend starten
1. Öffne ein Terminal in `backend/`
2. Installiere die Abhängigkeiten:
   ```bash
   npm install
   ```
3. Starte den Entwicklungsserver:
   ```bash
   npm run dev
   ```
   Der Server läuft dann auf `http://localhost:3000`.
   - API Endpunkte:
     - `GET /patients` - Liste
     - `GET /patients/:id` - Details
     - `POST /patients` - Neu anlegen
     - `PUT /patients/:id` - Aktualisieren
     - `DELETE /patients/:id` - Löschen

### Frontend starten
1. Öffne ein Terminal in `frontend/`
2. Installiere Abhängigkeiten:
   ```bash
   npm install
   ```
3. Starte die Entwicklungsumgebung:
   ```bash
   npm run dev
   ```
4. Öffne den im Terminal ausgegebenen Link (z.B. `http://localhost:5173`).

---

## Hinweise zum Code (für Anfänger erklärt)
- Backend:
  - `src/db.ts` verwendet `better-sqlite3` für einfache, synchrone DB-Zugriffe. Tabellen werden automatisch erstellt.
  - `src/index.ts` stellt die REST-API zur Verfügung und benutzt einfache Validierung.
- Frontend:
  - Vue-Router wird verwendet, um zwischen Liste, Detailansicht, Erstellung und Bearbeitung zu wechseln.
  - Axios sendet HTTP-Anfragen an das Backend.

---

## MySQL statt SQLite verwenden (Anleitung für Visual Studio Code)

Obwohl das Beispiel SQLite verwendet (praktisch für Entwicklung), kannst Du auch MySQL einsetzen. Nachfolgend eine kurze Anleitung, wie Du MySQL in VS Code einbindest und das Backend anpasst.

### 1) MySQL installieren / Zugang besorgen
- Lokal: Installiere MySQL Community Server (oder MariaDB).
- Oder: Benutze einen Cloud-MySQL-Dienst (z.B. in einer Cloud).

Merke Dir: Host, Port (Standard 3306), Benutzername, Passwort, Datenbankname.

### 2) VS Code: MySQL-Extension
- Öffne VS Code > Extensions.
- Installiere z.B. `MySQL` (von `formulahendry`) oder `SQLTools` + MySQL driver.
- Richte eine Verbindung mit Deinen Zugangsdaten ein. Damit kannst Du in VS Code Tabellen anschauen und SQL-Queries ausführen.

### 3) Backend anpassen: Beispiel mit `mysql2/promise`
- Installiere Pakete im Backend:
  ```bash
  npm install mysql2
  npm install --save-dev @types/mysql
  ```
- Ersetze die Datei `backend/src/db.ts` durch ein einfaches Beispiel, das `mysql2/promise` verwendet. Beispiel:

```ts
// Beispiel (Kurzversion) - NICHT komplett, dient als Ausgangspunkt
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'patients_db',
  connectionLimit: 5
});

// Beispiel: Tabelle erstellen (einmalig)
await pool.query(\`
  CREATE TABLE IF NOT EXISTS patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lastname VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    birthdate DATE NOT NULL,
    gender VARCHAR(10),
    street VARCHAR(255),
    housenumber VARCHAR(50),
    postalcode VARCHAR(20),
    insurance VARCHAR(255),
    created_at DATETIME NOT NULL
  )
\`);
```

- Passe CRUD-Funktionen an (`pool.query` / `pool.execute`) und konvertiere Datumsformate entsprechend.

### 4) Umgebungsvariablen
- Lege in `backend/` eine `.env` Datei an (oder verwende `process.env`):
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=meinpasswort
DB_NAME=patients_db
```
- Verwende z.B. `dotenv` Paket, um die Variablen zu laden:
```bash
npm install dotenv
```
und oben in `index.ts`:
```ts
import dotenv from 'dotenv';
dotenv.config();
```

### 5) VS Code: SQL-Abfragen und Verwaltung
- Mit der MySQL-Extension kannst Du die Verbindung speichern, Tabellen ansehen, und SQL direkt in VS Code ausführen.
- Erstelle die Datenbank `patients_db` einmalig:
```sql
CREATE DATABASE patients_db;
USE patients_db;
```

---

## Abschluss und Hinweise
- Das Projekt ist bewusst einfach gehalten und stark kommentiert, damit Anfänger es verstehen.
- Wenn Du möchtest, kann ich Dir zusätzlich zeigen, wie Du das Backend so umstellst, dass es sowohl SQLite als auch MySQL über eine Konfigurationsvariable unterstützt (z.B. `DB_TYPE=sqlite|mysql`). Sag kurz Bescheid und ich erstelle die alternative `db.ts`.

Viel Erfolg beim Ausprobieren!
