# GFI Baden – Neue Homepage (Redesign)

Konversionsoptimierte, moderne Startseite für [gfi-baden.de](https://www.gfi-baden.de/).
Eigenständige, statische Umsetzung (HTML/CSS/Vanilla-JS) ohne Build-Schritt und ohne externe JS-Frameworks.

## Schnellstart

Einfach `index.html` im Browser öffnen, oder einen lokalen Server starten:

```bash
# Python
python -m http.server 8000
# danach: http://localhost:8000
```

## Struktur

```
GFI/
├── index.html        # Komplette Homepage (13 Sektionen, semantisch, SEO-Meta, JSON-LD)
├── css/styles.css    # Markenfarben als CSS-Variablen, responsives Layout
├── js/main.js        # Sticky-Header, Mobile-Navigation, Footer-Jahr
└── assets/img/        # Echte GFI-Bilder von der bestehenden Website (heruntergeladen)
```

## Hinweise

- Die Navigations- und Footer-Links zeigen auf die bestehenden Live-Seiten (`gfi-baden.de/...`),
  damit keine bestehenden Inhalte, Formulare oder Links zerstört werden.
- Bestehende Tech-Basis ist WordPress. Diese Umsetzung ist als Redesign-Vorlage/Prototyp gedacht,
  die in ein WordPress-Template (z. B. als Page-Template oder Block-Pattern) überführt werden kann.
- Farben, Bildmaterial und Logo stammen aus der bestehenden Marke (siehe `assets/img/`).
