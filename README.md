# Backpack Simulator — als Samsung-App (APK) installieren

Diese Anleitung führt dich in ca. **15 Minuten** von diesen Dateien bis zur fertigen
APK-Datei auf deinem Samsung-Handy. Keine Programmiererfahrung nötig.

---

## Was ist in diesem Ordner?

| Datei | Wofür |
|---|---|
| `BackpackSimulator.html` | Die App selbst (mit PWA-Tags) |
| `manifest.json` | App-Konfiguration (Name, Icon, Startseite) |
| `service-worker.js` | Macht die App offline-fähig |
| `icon-192.png` / `icon-512.png` | App-Icon für den Homescreen |
| `icon-maskable-512.png` | Adaptives Icon für Android |
| `favicon-32.png` | Tab-Icon |

---

## Weg 1 (EMPFOHLEN): PWABuilder → fertige APK

Das ist der einfachste Weg. Kein Android Studio, keine Kommandozeile.

### Schritt 1 — Dateien online stellen (GitHub Pages, kostenlos)

Du brauchst eine HTTPS-URL, unter der die Dateien erreichbar sind. GitHub Pages
ist gratis und dauert 5 Minuten.

1. Gehe auf **https://github.com** und erstelle einen kostenlosen Account.
2. Klicke oben rechts auf **+** → **New repository**.
3. Name: z.B. `backpack-simulator`, auf **Public** stellen, **Create repository**.
4. Auf der neuen Repo-Seite: **uploading an existing file** klicken.
5. Ziehe ALLE Dateien aus diesem Ordner rein (html, json, js, alle pngs).
6. Unten auf **Commit changes**.
7. Oben rechts **Settings** → links **Pages** → unter **Branch** `main` und `/root`
   auswählen → **Save**.
8. Warte 1–2 Minuten. Oben wird eine URL angezeigt wie:
   `https://deinname.github.io/backpack-simulator/`
9. Teste im Handy-Browser:
   `https://deinname.github.io/backpack-simulator/BackpackSimulator.html`
   → sollte die App anzeigen.

**Wichtig:** In `manifest.json` und `service-worker.js` verweisen alle Pfade
relativ — die URL oben muss auf die HTML-Datei zeigen.

### Schritt 2 — APK generieren mit PWABuilder

1. Gehe auf **https://www.pwabuilder.com**.
2. Gib deine URL ein (z.B. `https://deinname.github.io/backpack-simulator/BackpackSimulator.html`)
   und klicke **Start**.
3. PWABuilder analysiert die App. Wenn es meckert, dass manifest/icons fehlen:
   Warte kurz, lade neu. Die Score-Anzeige zeigt idealerweise „Manifest OK"
   und „Service Worker OK".
4. Oben rechts auf **Package For Stores** klicken.
5. Bei **Android** auf **Generate Package**.
6. In der Dialog-Box:
   - **Package ID**: z.B. `com.deinname.backpacksimulator` (nur Kleinbuchstaben,
     Punkte, keine Umlaute — einmalig auswählen und nie wieder ändern!)
   - **App name**: `Backpack Simulator`
   - **Signing Key**: `Generate new` auswählen (PWABuilder erzeugt einen Key).
     **WICHTIG:** Den erzeugten Key-ZIP-File gut aufheben — sonst kannst du
     später keine App-Updates signieren.
   - **Download** klicken.
7. Du bekommst ein ZIP mit mehreren Dateien. Die Datei, die du brauchst, heißt:
   - `app-release-signed.apk` — das ist deine fertige App!

### Schritt 3 — APK auf dem Samsung installieren

1. Schick die APK-Datei per E-Mail, USB, Google Drive oder WhatsApp auf dein
   Handy.
2. Auf dem Samsung: Datei-Manager öffnen, APK antippen.
3. Android fragt: „Installation unbekannter Apps erlauben?" → **Einstellungen**
   → Erlauben → zurück → **Installieren**.
4. Fertig. Das Icon ist auf dem Homescreen.

---

## Weg 2 (noch einfacher, aber keine echte APK): „Zum Startbildschirm hinzufügen"

Falls du auf die APK-Datei verzichten kannst: Öffne die URL in Chrome auf deinem
Samsung, Menü → **Zum Startbildschirm hinzufügen**. Die App erscheint als Icon,
startet im Vollbild, funktioniert offline — fast wie eine APK. Nur kein
Play-Store-Upload möglich.

---

## Weg 3 (für Entwickler): Capacitor lokal

Wenn du Node.js und Android Studio hast:

```bash
npm init @capacitor/app
npx cap add android
# www-Ordner mit deinen Dateien füllen
npx cap sync
npx cap open android
# In Android Studio: Build → Generate Signed Bundle / APK
```

---

## Troubleshooting

**„PWABuilder meldet Score zu niedrig"**
→ Warte, bis GitHub Pages wirklich deployed ist (manchmal 5 min). Teste die
manifest.json direkt im Browser: `https://.../manifest.json` — muss JSON zurückgeben.

**„Fotos verschwinden auf neu installierter App"**
→ Normal. Fotos liegen im `localStorage` der PWA. Bei einer Neuinstallation ist
der isoliert. Die „Export"-Funktion im Einstellungsmenü der App schreibt alles
in eine JSON-Datei, die du vorher sichern kannst.

**„Kamera geht nicht in der APK"**
→ Beim ersten Kamera-Tap fragt Android nach Berechtigung. „Erlauben" tippen.
PWABuilder setzt die `CAMERA`-Permission automatisch.

**„App-Icon zu klein oder abgeschnitten"**
→ PWABuilder hat die maskable-Variante genutzt. Wenn's nicht gefällt: In
`manifest.json` das `"purpose": "maskable"` beim ersten Icon entfernen und
neu packagen.

---

Viel Erfolg! Wenn irgendwas hakt: die PWABuilder-Doku ist gut —
https://docs.pwabuilder.com
