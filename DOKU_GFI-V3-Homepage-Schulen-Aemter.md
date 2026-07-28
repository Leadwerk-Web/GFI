# Feature-Dokumentation: GFI V3 – Homepage, Schulen/Ämter & Pooling
*Status: Abgeschlossen | Datum: 2026-07-28*

## 1. Übersicht & Zweck
`index-v3.html` ist die öffentliche Startseite der GFI Baden: Zielgruppenführung, Leistungen, Pooling, Karriere und allgemeine Kooperation. `fuer-schulen-aemter.html` vertieft denselben Design- und Motion-Stack für Institutionen und führt Schulen sowie Leistungsträger mit niedriger Hürde zur Kontaktaufnahme. `pooling.html` ist die eigenständige Unterseite zu infrastrukturellem Pooling und führt qualifizierte Anfragen zum Pooling-Konzept.

## 2. Komponenten & Seitenstruktur
* **Seite 1: `index-v3.html` (Homepage V3)**
  - Kernfunktion: Marken- und Orientierungsseite für Schulen/Ämter, Familien und Bewerber – inklusive Pooling-, Prozess-, Qualitäts- und FAQ-Abschnitten sowie Final-CTA.
  - Wichtige States/Props: `html.theme-v3.home-v3`; Hero `is-in` nach Loader; Motion via `data-motion` / `data-motion-group` / `chars`; Showcase-Pin `#leistungen`; Voices-Carousel; kein Framework-State (vanilla DOM in `js/main-v3.js`).
* **Seite 2: `fuer-schulen-aemter.html` (Unterseite Institutionen)**
  - Kernfunktion: Institutionelle Landingpage mit Einstiegen (Schule / Amt / Pooling), Ablauf, Qualitätsakkordion, regionalem Ansprechpartner-Finder und einstufigem Kooperationsformular `#kooperation-anfragen`.
  - Wichtige States/Props: `html.theme-v3.page-schulen`; Qualitätskarten `sa-qcard.is-open`; Finder `#region-select` → `#region-result`; Formular `#kooperation-form` (Validierung, `#form-success` / `#form-error`); teilt globale Motion/Header-Logik aus `main-v3.js`, ergänzt durch `js/schulen-aemter.js`.
* **Seite 3: `pooling.html` (Unterseite Pooling)**
  - Kernfunktion: Erklärt infrastrukturelles Pooling, Visualisiert Unterschied Einzelstruktur/Pooling, Prozess, Rollen, Qualität und führt zur Pooling-Anfrage `#pooling-anfrage`.
  - Wichtige States/Props: `html.theme-v3.page-pooling`; FAQ via Button/`aria-expanded` (`#pl-faq-list`); Formular `#pooling-form`; Scroll-Explainer für Netzwerk, Stufen und Prozess in `js/pooling.js`.

## 3. Datenfluss & Kommunikation
* Die Seiten sind statisches HTML ohne gemeinsamen App-State. Verbindung läuft über Navigation, Anker-Links und geteilte Assets (CSS/JS/Design-Tokens).
* **Verbindungspunkt 1 – Navigation:** Startseite und Schulen/Ämter verlinken auf `pooling.html`; Pooling-Seite zurück auf `index-v3.html` bzw. `fuer-schulen-aemter.html`. Aktiver Nav-Punkt auf der Pooling-Seite: CTA „Pooling“ (`aria-current="page"`).
* **Verbindungspunkt 2 – Shared Runtime:** Alle V3-Seiten laden `css/styles-v3.css` und `js/main-v3.js`. Schulen/Ämter ergänzt `css/schulen-aemter.css` + `js/schulen-aemter.js`. Pooling ergänzt `css/schulen-aemter.css` (Formular-/Note-Muster), `css/pooling.css` und `js/pooling.js`. Formular-Endpunkte: `data-endpoint=""` (Platzhalter bis serverseitige Anbindung).

## 4. Technische Besonderheiten & Abhängigkeiten
* Stack: Vanilla HTML/CSS/JS (kein React/Vue); Plus Jakarta Sans; Font Awesome (Footer Social); SVG Icon-Sprite.
* Designsystem V3: CSS-Tokens/Spots in `styles-v3.css`; Unterseiten-Overrides unter `.page-schulen` bzw. `.page-pooling`.
* Motion: IntersectionObserver + `tile-up` / `rise` / `chars` / Media-Slides; `prefers-reduced-motion` und `file://`-Fallbacks. Pooling ergänzt inhaltliche Scroll-Explainer (Netzwerklinien, Prozesslinie, Stufenaufbau).
* Tracking (Pooling): Events über `window.dataLayer` / CustomEvent `gfi:track` – `pooling_cta_click`, `pooling_process_view`, `pooling_faq_open`, `pooling_form_start`, `pooling_form_submit`, `pooling_phone_click`, `pooling_email_click`.
* SEO/A11y: Canonical, Open Graph, FAQPage-/WebPage-JSON-LD, Skip-Link, Breadcrumbs (sichtbar + Schema), `aria-*` an FAQ und Formular.

## 5. Nächste Schritte / Offene Punkte
- [ ] Serverseitigen Formular-Endpunkt setzen (`data-endpoint`) und Versand/Spam-Schutz anbinden (Schulen/Ämter + Pooling)
- [ ] Finales Hero-Foto `assets/img/pooling-schulalltag.webp` (aktuell PNG-Platzhalter auf Basis vorhandenem Kooperationsmotiv)
- [ ] Zweistufiges Kontaktformular für „Eltern & Angehörige“ auf eigener Unterseite bzw. im Familien-Abschnitt umsetzen
- [ ] Regionsdaten im Ansprechpartner-Finder vervollständigen (namentliche Ansprechpersonen)
- [ ] Produktiv-URLs, Indexierung (`robots`) und Weiterleitung von Legacy-`index.html` auf V3 klären
- [ ] Analytics-Anbindung an `dataLayer`-Events prüfen
