
# Mein Forum Projekt

Dies ist eine einfache, erweiterbare Website mit integriertem Forum, gebaut mit HTML/CSS und Formspree für Formularverarbeitung. Bereit zur Veröffentlichung via GitHub Pages.

## 🌐 Live-Hosting mit GitHub Pages

1. Repository auf GitHub erstellen (z. B. `mein-forum-projekt`)
2. Alle Dateien aus diesem Projekt hochladen
3. Gehe zu **Settings > Pages**
4. Unter **Source**: Wähle `main` Branch und `/ (root)` aus
5. Nach wenigen Sekunden ist die Website unter  
   `https://<dein-benutzername>.github.io/mein-forum-projekt/` erreichbar

## ✉️ Formulare konfigurieren (Formspree)

1. Gehe zu [https://formspree.io](https://formspree.io) und registriere dich
2. Erstelle 2 Formulare:
   - Kontaktformular (für `contact.html`)
   - Forumformular (für `forum.html`)
3. Ersetze im HTML-Quellcode den Wert von `action` in den `<form>`-Tags:

```html
<!-- Beispiel -->
<form method="POST" action="https://formspree.io/f/deine-id-hier">
```

4. Optional: Nutze versteckte Felder zur Kennzeichnung der Quelle

```html
<input type="hidden" name="source" value="forum">
```

## 📁 Projektstruktur

```text
/
├── index.html          # Startseite
├── forum.html          # Forum-Seite (neue Beiträge)
├── contact.html        # Kontaktformular
├── about.html          # Über uns
├── services.html       # Dienstleistungen
├── media.html          # Medien
├── README.md           # Diese Anleitung
```

## 🔧 Erweiterungsideen

- Firebase-Integration (Login, Beiträge speichern)
- Supabase/Postgres als Backend
- Echte Benutzerprofile mit Avataren
- Kommentare, Likes, Themenkategorien

---

Erstellt mit ❤️ von [Dir]
