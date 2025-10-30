# Patientenverwaltung

- Frontend: Vue3, TypeScript
- Backend: Node.js, Express, TypeScript
- Datenbank: SQLite


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

