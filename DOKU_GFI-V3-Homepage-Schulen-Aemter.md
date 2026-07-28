# Feature-Dokumentation: GFI V3 – Homepage & Schulen/Ämter
*Status: Abgeschlossen | Datum: 2026-07-28*

## 1. Übersicht & Zweck
`index-v3.html` ist die öffentliche Startseite der GFI Baden: Zielgruppenführung, Leistungen, Pooling, Karriere und allgemeine Kooperation. `fuer-schulen-aemter.html` vertieft denselben Design- und Motion-Stack für Institutionen und führt Schulen sowie Leistungsträger mit niedriger Hürde zur Kontaktaufnahme.

## 2. Komponenten & Seitenstruktur
* **Seite 1: `index-v3.html` (Homepage V3)**
  - Kernfunktion: Marken- und Orientierungsseite für Schulen/Ämter, Familien und Bewerber – inklusive Pooling-, Prozess-, Qualitäts- und FAQ-Abschnitten sowie Final-CTA.
  - Wichtige States/Props: `html.theme-v3.home-v3`; Hero `is-in` nach Loader; Motion via `data-motion` / `data-motion-group` / `chars`; Showcase-Pin `#leistungen`; Voices-Carousel; kein Framework-State (vanilla DOM in `js/main-v3.js`).
* **Seite 2: `fuer-schulen-aemter.html` (Unterseite Institutionen)**
  - Kernfunktion: Institutionelle Landingpage mit Einstiegen (Schule / Amt / Pooling), Ablauf, Qualitätsakkordion, regionalem Ansprechpartner-Finder und einstufigem Kooperationsformular `#kooperation-anfragen`.
  - Wichtige States/Props: `html.theme-v3.page-schulen`; Qualitätskarten `sa-qcard.is-open`; Finder `#region-select` → `#region-result`; Formular `#kooperation-form` (Validierung, `#form-success` / `#form-error`); teilt globale Motion/Header-Logik aus `main-v3.js`, ergänzt durch `js/schulen-aemter.js`.

## 3. Datenfluss & Kommunikation
* Die Seiten sind statisches HTML ohne gemeinsamen App-State. Verbindung läuft über Navigation, Anker-Links und geteilte Assets (CSS/JS/Design-Tokens).
* **Verbindungspunkt 1 – Navigation:** Startseite verlinkt auf `fuer-schulen-aemter.html`; Unterseite zurück auf `index-v3.html` bzw. `index-v3.html#familien` / `#pooling`. Aktiver Nav-Punkt auf der Unterseite: „Für Schulen & Ämter“.
* **Verbindungspunkt 2 – Shared Runtime:** Beide laden `css/styles-v3.css` und `js/main-v3.js` (Loader, Sticky-Header, Mobile-Nav, Scroll-Reveals, FAQ-Accordion, To-Top). Die Unterseite ergänzt `css/schulen-aemter.css` und `js/schulen-aemter.js` (Finder, Qualitätskarten, Formular). Formular-Endpunkt: `data-endpoint=""` (Platzhalter bis serverseitige Anbindung).

## 4. Technische Besonderheiten & Abhängigkeiten
* Stack: Vanilla HTML/CSS/JS (kein React/Vue); Plus Jakarta Sans; Font Awesome (Footer Social); SVG Icon-Sprite.
* Designsystem V3: CSS-Tokens/Spots in `styles-v3.css`; Unterseiten-Overrides nur unter `.page-schulen` in `schulen-aemter.css`.
* Motion: IntersectionObserver + `tile-up` / `rise` / `chars` / Media-Slides; `prefers-reduced-motion` und `file://`-Fallbacks.
* Homepage-Extras: horizontale Pin-Showcase, Parallax, magnetische Buttons, Cursor-Ring, Voices-Slider, 3D-Tilt.
* Unterseiten-Extras: Regionsdaten im JS-Objekt `REGIONS`, einstufiges Kontaktformular (niedrige Hürde); zweistufiges Formular bewusst für „Eltern & Angehörige“ vorgesehen, hier nicht umgesetzt.
* SEO/A11y: Canonical, Open Graph, FAQPage-/WebPage-JSON-LD, Skip-Link, `aria-*` an Formular und Finder.

## 5. Nächste Schritte / Offene Punkte (Verbindung zu Phase 3)
- [ ] Serverseitigen Formular-Endpunkt setzen (`data-endpoint`) und Versand/Spam-Schutz anbinden
- [ ] Zweistufiges Kontaktformular für „Eltern & Angehörige“ auf eigener Unterseite bzw. im Familien-Abschnitt umsetzen
- [ ] Regionsdaten im Ansprechpartner-Finder vervollständigen (namentliche Ansprechpersonen)
- [ ] Optionale Pooling-Unterseite statt Anker-Platzhalter; PDF-/Download-Strecke bei Bedarf wieder aufnehmen
- [ ] Produktiv-URLs, Indexierung (`robots`) und Weiterleitung von Legacy-`index.html` auf V3 klären
