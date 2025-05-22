# Movies App für üK294

Dieses Projekt ist eine Filmdatenbank, die im Rahmen des üK294 (Überbetrieblicher Kurs Applikationsentwicklung) von mir programmiert wurde.  
Sie dient dazu, praktische Kenntnisse in **React, TypeScript, REST-APIs und State-Management** zu vertiefen.

## Ziele und Lerninhalte

- Wir haben mit **React** gelernt, Webseiten aus kleinen Bausteinen (Komponenten) zu bauen.  
- Wir haben **TypeScript** genutzt, damit unser Code klarer und sicherer ist.  
- Wir konnten mit **axios** Daten vom Server holen und wieder zurückschicken.  
- Mit **useState** und **useEffect** haben wir Zustände verwaltet und automatisch Daten geladen.  
- Wir haben eine **Login-Funktion mit Token** eingebaut.  
- Wir konnten Filme **anzeigen, hinzufügen, bearbeiten und löschen** (CRUD).  
- Wir haben **Formulare mit Formik** benutzt, um Eingaben zu prüfen.  
- Wir haben unsere App nach dem **Atomic Design-Prinzip** aufgebaut.
- 
## Funktionen

- **Login** mit Token-Authentifizierung
- **Filme durchsuchen**
- **Filme hinzufügen**
- **Filme bearbeiten**
- **Filme löschen**
- **Detailansicht von Filmen**

## Setup

1. **Installiere Abhängigkeiten:**

### Haupt-Dependencies

| Paket                     | Beschreibung                                      |
|---------------------------|---------------------------------------------------|
| `react`                   | React-Bibliothek                                  |
| `react-dom`               | Zum Rendern der React-Komponenten im DOM         |
| `react-router-dom`        | Routing (z. B. `/login`, `/homepage`)             |
| `axios`                   | Für REST-API-Aufrufe                              |
| `formik`                  | Für einfaches Handling von Formularen             |
| `yup`                     | (Optional) Validierung für Formulare mit Formik   |
| `@mui/material`           | UI-Komponenten (z. B. Button, Dialog)             |
| `@emotion/react`          | Für MUI Styling                                   |
| `@emotion/styled`         | Styled Components für MUI                         |

---

### Dev-Dependencies

| Paket                     | Beschreibung                                      |
|---------------------------|---------------------------------------------------|
| `typescript`              | Für typsichere Entwicklung                        |
| `vite`                    | Build Tool / Dev Server                           |
| `@types/react`            | TypeScript-Typen für React                        |
| `@types/react-dom`        | TypeScript-Typen für ReactDOM                     |
| `@types/react-router-dom` | Typen für Router                                  |


2. **Starte das Projekt:**
   ```bash
   npm run dev
   ```

3. **API-Server sicherstellen:**  
   Die App greift auf eine lokale API unter `http://localhost:3030` zu. Stelle sicher, dass dein Backend läuft.
