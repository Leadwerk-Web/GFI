# Bildinventar des GFI-Webprojekts

Stand: 22.09.2026 11:56

## Kurzüberblick

| Kennzahl | Anzahl |
|---|---:|
| Bildreferenzen im gesamten Projekt | 355 |
| Unterschiedliche referenzierte Bild-URLs/-Pfade | 150 |
| Bildreferenzen in aktiven Seiten/Styles (ohne Entwürfe/Versionen) | 271 |
| Unterschiedliche Bilder in aktiven Seiten/Styles | 136 |
| Lokale Bilddateien unter `assets/` | 195 |
| Physische Dubletten-Gruppen (identischer SHA-256-Inhalt) | 48 |
| Dateien innerhalb dieser Dubletten-Gruppen | 102 |
| Dubletten-Gruppen, deren verschiedene Pfade tatsächlich referenziert werden | 10 |
| Theoretisch redundanter Speicher durch alle physischen Dubletten | 57.38 MiB |
| Derzeit nicht referenzierte lokale Bilddateien | 64 |

**Ausgenommen:** Logo-, Favicon- und sämtliche SVG-Dateien sind auf Wunsch nicht Bestandteil dieses auf Fotomaterial ausgerichteten Inventars.

**Scope-Hinweis:** Als Entwürfe/Varianten gelten `index-v1.html`, `index-v2.html`, `index-v3.html`, `design-handout.html`, `hero-veil-preview.html`, `color-dark-preview.html` und `Stand-seit-letztem-Termin.html` sowie deren variantenspezifische Styles. Sie sind im vollständigen Inventar enthalten, aber nicht in der Kennzahl „aktive Seiten“.

## Mehrfach verwendete Bildreferenzen

Hier bedeutet „Dopplung“: derselbe Pfad bzw. dieselbe URL wird mehrfach eingebunden. Das ist bei wiederkehrenden Gestaltungselementen, etwa dem Zitatzeichen, häufig beabsichtigt.

| Anzahl | Bild | Verwendet in |
|---:|---|---|
| 38 | `assets/img/begleitung.jpeg` | design-handout.html, hero-veil-preview.html, index-v1.html, index-v2.html, index-v3.html, index.html, standort-bonn.html, standort-euskirchen.html, standort-karlsruhe.html, standort-koeln.html, standort-mannheim.html, standort-rhein-sieg-kreis.html, standort-suedliche-weinstrasse.html, standort-wiesbaden.html |
| 23 | `assets/img/kids.jpg` | design-handout.html, index-v1.html, index-v2.html, index-v3.html, index.html, standort-bonn.html, standort-euskirchen.html, standort-karlsruhe.html, standort-koeln.html, standort-mannheim.html, standort-rhein-sieg-kreis.html, standort-suedliche-weinstrasse.html, standort-wiesbaden.html |
| 18 | `assets/img/schule.jpeg` | design-handout.html, index-v1.html, index-v2.html, index-v3.html, index.html, standort-bonn.html, standort-euskirchen.html, standort-karlsruhe.html, standort-koeln.html, standort-mannheim.html, standort-rhein-sieg-kreis.html, standort-suedliche-weinstrasse.html, standort-wiesbaden.html |
| 17 | `assets/img/hero-kinder.jpeg` | index-v1.html, index-v2.html, index-v3.html, index.html, standort-bonn.html, standort-euskirchen.html, standort-karlsruhe.html, standort-koeln.html, standort-mannheim.html, standort-rhein-sieg-kreis.html, standort-suedliche-weinstrasse.html, standort-wiesbaden.html |
| 17 | `https://www.gfi-baden.de/wp-content/uploads/2025/01/DSC00020-1024x683.jpg` | fuer-eltern-angehoerige.html, fuer-schulen-aemter.html, index-v1.html, index-v2.html, index-v3.html, index.html, karriere-abteilungsleitung.html, karriere-fuehrungskraefte.html, karriere-geschaeftsfuehrung.html, karriere-operative.html, karriere-stellen.html, karriere-teamleitung.html, kontakt.html, leistungen.html, pooling.html, standort-rhein-sieg-kreis.html, ueber-uns.html |
| 16 | `assets/img/Betreuung.jpeg` | design-handout.html, index-v1.html, index-v2.html, index-v3.html, index.html, standort-bonn.html, standort-euskirchen.html, standort-karlsruhe.html, standort-koeln.html, standort-mannheim.html, standort-rhein-sieg-kreis.html, standort-suedliche-weinstrasse.html, standort-wiesbaden.html |
| 15 | `assets/img/team-portrait.jpg` | index-v2.html, index-v3.html, index.html, standort-bonn.html, standort-euskirchen.html, standort-karlsruhe.html, standort-koeln.html, standort-mannheim.html, standort-rhein-sieg-kreis.html, standort-suedliche-weinstrasse.html, standort-wiesbaden.html |
| 13 | `assets/img/High5.jpeg` | index-v1.html, index-v2.html, index-v3.html, index.html, standort-bonn.html, standort-euskirchen.html, standort-karlsruhe.html, standort-koeln.html, standort-mannheim.html, standort-rhein-sieg-kreis.html, standort-suedliche-weinstrasse.html, standort-wiesbaden.html |
| 9 | `assets/img/KindRollstuhl.png` | index-v3.html, standort-bonn.html, standort-euskirchen.html, standort-karlsruhe.html, standort-koeln.html, standort-mannheim.html, standort-rhein-sieg-kreis.html, standort-suedliche-weinstrasse.html, standort-wiesbaden.html |
| 9 | `assets/img/standorte/familie-alltag.jpg` | standort-bonn.html, standort-euskirchen.html, standort-karlsruhe.html, standort-koeln.html, standort-mannheim.html, standort-rhein-sieg-kreis.html, standort-suedliche-weinstrasse.html, standort-wiesbaden.html |
| 8 | `assets/img/team-event.png` | fuer-schulen-aemter.html, index-v1.html, index-v2.html, index.html |
| 5 | `assets/img/AdobeStock_286655242-min-1024x683.jpeg` | pooling.html, standort-bonn.html, standort-karlsruhe.html, standort-rhein-sieg-kreis.html, standort-suedliche-weinstrasse.html |
| 5 | `assets/img/gfi-gruppenbild-rheinland.jpg` | karriere-fuehrungskraefte.html, karriere-operative.html, karriere-stellen.html, standort-rhein-sieg-kreis.html, ueber-uns.html |
| 4 | `assets/img/badge-gptw.png` | index-v2.html, index-v3.html, index.html, ueber-uns.html |
| 4 | `assets/img/familie.jpeg` | index-v2.html, index-v3.html, index.html |
| 4 | `assets/img/Schule2.jpg` | index-v1.html, index-v2.html, index-v3.html, index.html |
| 3 | `assets/img/standorte/schul-kitabegleitung.jpg` | standort-euskirchen.html, standort-karlsruhe.html, standort-mannheim.html |
| 3 | `assets/img/team-2025.jpg` | index-v1.html, index-v2.html, index.html |
| 2 | `assets/img/AdobeStock_234499278-min-577x400.jpeg` | fuer-eltern-angehoerige.html |
| 2 | `assets/img/karriere-abteilungsleitung/profil.jpg` | karriere-abteilungsleitung.html |
| 2 | `assets/img/karriere-abteilungsleitung/tag-1.jpg` | karriere-abteilungsleitung.html |
| 2 | `assets/img/karriere-abteilungsleitung/tag-2.jpg` | karriere-abteilungsleitung.html |
| 2 | `assets/img/karriere-abteilungsleitung/tag-4.jpg` | karriere-abteilungsleitung.html |
| 2 | `assets/img/karriere-teamleitung/aufgaben-2.jpg` | karriere-teamleitung.html |
| 2 | `assets/img/karriere-teamleitung/karriere-1.png` | karriere-fuehrungskraefte.html, karriere-teamleitung.html |
| 2 | `assets/img/karriere-teamleitung/video-poster-gfi.jpg` | karriere-abteilungsleitung.html, karriere-teamleitung.html |
| 2 | `assets/img/standorte/inklusionsassistenz.jpg` | standort-koeln.html, standort-rhein-sieg-kreis.html |
| 2 | `https://i.ytimg.com/vi/gKMrGQW58Ms/maxresdefault.jpg` | karriere-abteilungsleitung.html, karriere-teamleitung.html |
| 2 | `https://i.ytimg.com/vi/LLYzTNoAoCk/maxresdefault.jpg` | karriere-abteilungsleitung.html, karriere-teamleitung.html |
| 2 | `https://i.ytimg.com/vi/sB1T93fAUW0/maxresdefault.jpg` | karriere-abteilungsleitung.html, karriere-teamleitung.html |

## Platzierung nach Datei

Zeilennummern beziehen sich auf den aktuellen Projektstand. Wiederholungen desselben Bildes in derselben Datei sind in einer Tabellenzeile zusammengefasst.

### design-handout.html

| Bild | Zeile(n) und Platzierung / Abschnitt | Alt-Text |
|---|---|---|
| `assets/img/kids.jpg` | 38 – Seiteninhalt (ohne eindeutige Überschrift); 467 – Showcase · Leistungs-Carousel |  |
| `assets/img/begleitung.jpeg` | 311 – Hero / Seitenkopf |  |
| `assets/img/schule.jpeg` | 381 – News-Karte |  |
| `assets/img/Betreuung.jpeg` | 471 – Schulbegleitung |  |

### fuer-eltern-angehoerige.html

| Bild | Zeile(n) und Platzierung / Abschnitt | Alt-Text |
|---|---|---|
| `https://www.gfi-baden.de/wp-content/uploads/2025/01/DSC00020-1024x683.jpg` | 21 – Social-Media-Vorschaubild |  |
| `assets/img/eltern-schulstart.png` | 202 – Hero / Seitenkopf |  |
| `assets/img/inklusion-seifenblasen.png` | 252 – Gute Unterstützung beginnt mit Zeit zum Kennenlernen. | Kind mit Kopfhörern – individuelle Begleitung und Fokus |
| `assets/img/kita-vorlesen.png` | 383 – Leistungen für Ihr Kind und Ihre Familie | Begleitperson unterstützt ein Kind im Alltag |
| `assets/img/kita-malen.png` | 441 – Vermittlung zu Behörden | Schulbegleitung im Alltag |
| `assets/img/therapie-holzspielzeug.png` | 660 – So individuell wie der Bedarf muss auch die Unterstützung sein. | Fachkraft in der Begleitung eines Kindes |
| `assets/img/AdobeStock_234499278-min-577x400.jpeg` | 713, 766 – Erfahrungen von Eltern und Angehörigen | Schulbegleitung im Unterricht |
| `assets/img/AdobeStock_52734725-min-1024x694.jpeg` | 717 – Erfahrungen von Eltern und Angehörigen |  |
| `assets/img/mentorin-zeichnen.png` | 721 – Erfahrungen von Eltern und Angehörigen |  |
| `assets/img/schulkind-rollstuhl.png` | 725 – Erfahrungen von Eltern und Angehörigen |  |
| `assets/img/kita-vorlesen-gruppe.png` | 729 – Erfahrungen von Eltern und Angehörigen |  |
| `assets/img/schulalltag-robotik.png` | 733 – Erfahrungen von Eltern und Angehörigen |  |
| `assets/img/gfi-inklusionstasche.jpg` | 737 – Erfahrungen von Eltern und Angehörigen |  |
| `assets/img/tablet-lernen.png` | 867 – Was für Sie zählt | Fachkraft begleitet Kinder beim gemeinsamen Lernen |

### fuer-schulen-aemter.html

| Bild | Zeile(n) und Platzierung / Abschnitt | Alt-Text |
|---|---|---|
| `https://www.gfi-baden.de/wp-content/uploads/2025/01/DSC00020-1024x683.jpg` | 21 – Social-Media-Vorschaubild |  |
| `assets/img/hero_schuleundamt.png` | 208 – Hero / Seitenkopf |  |
| `assets/img/AdobeStock_140130272-1024x684.jpeg` | 266 – Gute Unterstützung beginnt dort, wo alle Beteiligten dieselbe Richtung kennen. | Gemeinsame Verantwortung in der Schulbegleitung: Zusammenarbeit von Schule, Familie und Fachkräften |
| `assets/img/AdobeStock_294398653-1024x677.jpeg` | 398 – Verlässliche Zusammenarbeit im laufenden Schulbetrieb | Schulbegleiterin unterstützt ein Kind im Unterricht |
| `assets/img/schulbegleitung-highfive.png` | 458 – Vertretungsmanagement | High Five zwischen Fachkraft und Kind als Symbol für gelungene Zusammenarbeit |
| `assets/img/team-event.png` | 695 – So individuell wie der Bedarf muss auch die Unterstützung sein. | Team der GFI Baden bei einem gemeinsamen Einführungstag |
| `assets/img/AdobeStock_209231456-min-600x400.jpeg` | 837 – Voraussetzungen für eine Prüfung | Schulbegleiterin unterstützt ein Kind im Unterricht |

### hero-veil-preview.html

| Bild | Zeile(n) und Platzierung / Abschnitt | Alt-Text |
|---|---|---|
| `assets/img/begleitung.jpeg` | 146, 164 – Hero / Seitenkopf |  |

### index-v1.html

| Bild | Zeile(n) und Platzierung / Abschnitt | Alt-Text |
|---|---|---|
| `https://www.gfi-baden.de/wp-content/uploads/2025/01/DSC00020-1024x683.jpg` | 21 – Social-Media-Vorschaubild |  |
| `assets/img/begleitung.jpeg` | 195 – Verlässliche Schulbegleitung mit klaren Prozessen; 410 – Assistenz in Kita und Schule: das können wir!; 498 – Unterstützung flexibel und verlässlich organisieren | Schulbegleitung im Unterricht |
| `assets/img/Schulkind.png` | 361 – Wofür suchen Sie Unterstützung? |  |
| `assets/img/Amt.png` | 372 – Wofür suchen Sie Unterstützung? |  |
| `assets/img/High5.jpeg` | 383 – Wofür suchen Sie Unterstützung?; 685 – Fortbildung |  |
| `assets/img/kids.jpg` | 422 – Schulbegleitung; 715 – Vertretungskonzepte | Kitabegleitung im Kita-Alltag |
| `assets/img/Betreuung.jpeg` | 434 – Kitabegleitung; 647 – Strukturierte Abstimmung | Familienhilfe im beratenden Gespräch |
| `assets/img/schule.jpeg` | 446 – Familienhilfe; 701 – Feste Koordination | Ambulante Begleitung im Alltag |
| `assets/img/Schule2.jpg` | 487 – Unterstützung flexibel und verlässlich organisieren |  |
| `assets/img/team-2025.jpg` | 670 – Qualität entsteht durch klare Verantwortung |  |
| `assets/img/team-event.png` | 824 – Arbeiten, das im Schulalltag etwas bewegt | Team der GFI bei einer Einführungsveranstaltung |
| `assets/img/hero-kinder.jpeg` | 833 – Arbeiten, das im Schulalltag etwas bewegt; 895 – Orientierung zur Schulbegleitung | Kinder im gemeinsamen Lernen und Spielen |

### index-v2.html

| Bild | Zeile(n) und Platzierung / Abschnitt | Alt-Text |
|---|---|---|
| `https://www.gfi-baden.de/wp-content/uploads/2025/01/DSC00020-1024x683.jpg` | 21 – Social-Media-Vorschaubild |  |
| `assets/img/begleitung.jpeg` | 169 – Seiteninhalt (ohne eindeutige Überschrift); 386 – Assistenz in Kita und Schule: das können wir!; 620, 640, 681 – Erfahrungen von Familien und Partnern; 715 – News-Karte; 741 – Gestärkt als Team ins neue Schuljahr gestartet | Schulbegleiterin unterstützt ein Kind im Unterricht; Schulbegleiterin unterstützt einen Schüler im Unterricht; Schulbegleitung im Unterricht |
| `assets/img/High5.jpeg` | 172 – Seiteninhalt (ohne eindeutige Überschrift) | Team der GFI im Schulalltag |
| `assets/img/kids.jpg` | 175 – Seiteninhalt (ohne eindeutige Überschrift); 317 – Fachkompetenz, die im Schulalltag ankommt.; 398 – Schulbegleitung; 624, 636 – Erfahrungen von Familien und Partnern | Kinder im gemeinsamen Lernen; Kinder im gemeinsamen Schulalltag; Kitabegleitung im Kita-Alltag |
| `assets/img/Schule2.jpg` | 178 – Seiteninhalt (ohne eindeutige Überschrift) | Unterstützung im Schulalltag |
| `assets/img/team-portrait.jpg` | 219 – Seiteninhalt (ohne eindeutige Überschrift); 581 – Fachliche Prüfung; 648 – Erfahrungen von Familien und Partnern | Standortverantwortliche der GFI Baden, Suzanne Mack und Franziska Lang |
| `assets/img/team-2025.jpg` | 220 – Seiteninhalt (ohne eindeutige Überschrift) |  |
| `assets/img/team-event.png` | 221 – Seiteninhalt (ohne eindeutige Überschrift); 521 – Sinnstiftend arbeiten. Gut begleitet starten.; 723 – News-Karte | Team der GFI Baden bei einem gemeinsamen Einführungstag |
| `assets/img/Betreuung.jpeg` | 360 – Fachkompetenz, die im Schulalltag ankommt.; 410 – Kitabegleitung | Familienhilfe im beratenden Gespräch; Schulbegleitung im Unterricht |
| `assets/img/schule.jpeg` | 422 – Familienhilfe; 644 – Erfahrungen von Familien und Partnern; 707 – News-Karte | Ambulante Begleitung im Alltag |
| `assets/img/badge-gptw.png` | 522 – Auszeichnungs-Badge | Great Place to Work Auszeichnung 2024 |
| `assets/img/hero-kinder.jpeg` | 547 – Informationen für Eltern und Angehörige; 628, 652 – Erfahrungen von Familien und Partnern | Kinder in der Begleitung |
| `assets/img/familie.jpeg` | 632 – Erfahrungen von Familien und Partnern |  |

### index-v3.html

| Bild | Zeile(n) und Platzierung / Abschnitt | Alt-Text |
|---|---|---|
| `https://www.gfi-baden.de/wp-content/uploads/2025/01/DSC00020-1024x683.jpg` | 21 – Social-Media-Vorschaubild |  |
| `assets/img/gfi-schulbegleitung-1.jpg` | 200 – Hero / Seitenkopf |  |
| `assets/img/gfi-autismus-spiel.jpg` | 313 – Fachkompetenz, die im Alltag ankommt. | Kind in einer therapeutischen Spielsituation |
| `assets/img/gfi-schulbegleitung-2.jpg` | 356 – Fachkompetenz, die im Alltag ankommt. | Schulbegleitung im Unterricht |
| `assets/img/gfi-schulbegleitung-3.jpg` | 379 – Passgenaue Unterstützung für jeden Bedarf. | Schulbegleitung im Unterricht |
| `assets/img/gfi-autismus-knete.jpg` | 393 – Schulbegleitung | Kitabegleitung: kreatives Spiel mit Knete |
| `assets/img/gfi-autismus-kopfhoerer.jpg` | 407 – Kitabegleitung | Autismus Therapie bei der GFI |
| `assets/img/familie.jpeg` | 421 – Autismus Therapie; 632 – Erfahrungen von Familien und Partnern | Familienhilfe im Alltag |
| `assets/img/gfi-schulbegleitung-8.png` | 457 – Informationen für Eltern und Angehörige | Schulbegleitung im inklusiven Alltag |
| `assets/img/gfi-event-hochseil.jpg` | 511 – Sinnstiftend arbeiten. Gut begleitet starten. | Team der GFI Baden bei einem gemeinsamen Einführungstag |
| `assets/img/badge-gptw.png` | 512 – Auszeichnungs-Badge | Great Place to Work Auszeichnung 2024 |
| `assets/img/gfi-sonstiges-1.jpg` | 580 – Einsatz begleiten | Standortverantwortliche der GFI Baden, Suzanne Mack und Franziska Lang |
| `assets/img/begleitung.jpeg` | 620, 681 – Erfahrungen von Familien und Partnern | Schulbegleitung im Unterricht |
| `assets/img/kids.jpg` | 624 – Erfahrungen von Familien und Partnern |  |
| `assets/img/hero-kinder.jpeg` | 628 – Erfahrungen von Familien und Partnern |  |
| `assets/img/High5.jpeg` | 636 – Erfahrungen von Familien und Partnern |  |
| `assets/img/Betreuung.jpeg` | 640 – Erfahrungen von Familien und Partnern |  |
| `assets/img/schule.jpeg` | 644 – Erfahrungen von Familien und Partnern |  |
| `assets/img/KindRollstuhl.png` | 648 – Erfahrungen von Familien und Partnern |  |
| `assets/img/team-portrait.jpg` | 652 – Erfahrungen von Familien und Partnern |  |
| `assets/img/gfi-workshop1.jpg` | 707 – News-Karte |  |
| `assets/img/gfi-gptw2026-3.jpg` | 715 – News-Karte |  |
| `assets/img/gfi-event-minigolf.jpg` | 723 – News-Karte |  |
| `assets/img/Schule2.jpg` | 741 – Gestärkt als Team ins neue Schuljahr gestartet | Schulbegleiterin unterstützt ein Kind im Unterricht |

### index.html

| Bild | Zeile(n) und Platzierung / Abschnitt | Alt-Text |
|---|---|---|
| `https://www.gfi-baden.de/wp-content/uploads/2025/01/DSC00020-1024x683.jpg` | 21 – Social-Media-Vorschaubild |  |
| `assets/img/begleitung.jpeg` | 165 – Seiteninhalt (ohne eindeutige Überschrift); 381 – Assistenz in Kita und Schule: das können wir!; 614, 634, 675 – Erfahrungen von Familien und Partnern; 709 – News-Karte; 735 – Gestärkt als Team ins neue Schuljahr gestartet | Schulbegleiterin unterstützt ein Kind im Unterricht; Schulbegleiterin unterstützt einen Schüler im Unterricht; Schulbegleitung im Unterricht |
| `assets/img/High5.jpeg` | 168 – Seiteninhalt (ohne eindeutige Überschrift) | Team der GFI im Schulalltag |
| `assets/img/kids.jpg` | 171 – Seiteninhalt (ohne eindeutige Überschrift); 313 – Fachkompetenz, die im Schulalltag ankommt.; 393 – Schulbegleitung; 618, 630 – Erfahrungen von Familien und Partnern | Kinder im gemeinsamen Lernen; Kinder im gemeinsamen Schulalltag; Kitabegleitung im Kita-Alltag |
| `assets/img/Schule2.jpg` | 174 – Seiteninhalt (ohne eindeutige Überschrift) | Unterstützung im Schulalltag |
| `assets/img/team-portrait.jpg` | 215 – Seiteninhalt (ohne eindeutige Überschrift); 575 – Fachliche Prüfung; 642 – Erfahrungen von Familien und Partnern | Standortverantwortliche der GFI Baden, Suzanne Mack und Franziska Lang |
| `assets/img/team-2025.jpg` | 216 – Seiteninhalt (ohne eindeutige Überschrift) |  |
| `assets/img/team-event.png` | 217 – Seiteninhalt (ohne eindeutige Überschrift); 515 – Sinnstiftend arbeiten. Gut begleitet starten.; 717 – News-Karte | Team der GFI Baden bei einem gemeinsamen Einführungstag |
| `assets/img/Betreuung.jpeg` | 356 – Fachkompetenz, die im Schulalltag ankommt.; 405 – Kitabegleitung | Familienhilfe im beratenden Gespräch; Schulbegleitung im Unterricht |
| `assets/img/schule.jpeg` | 417 – Familienhilfe; 638 – Erfahrungen von Familien und Partnern; 701 – News-Karte | Ambulante Begleitung im Alltag |
| `assets/img/badge-gptw.png` | 516 – Auszeichnungs-Badge | Great Place to Work Auszeichnung 2024 |
| `assets/img/hero-kinder.jpeg` | 541 – Informationen für Eltern und Angehörige; 622, 646 – Erfahrungen von Familien und Partnern | Kinder in der Begleitung |
| `assets/img/familie.jpeg` | 626 – Erfahrungen von Familien und Partnern |  |

### karriere-abteilungsleitung.html

| Bild | Zeile(n) und Platzierung / Abschnitt | Alt-Text |
|---|---|---|
| `https://www.gfi-baden.de/wp-content/uploads/2025/01/DSC00020-1024x683.jpg` | 19 – Social-Media-Vorschaubild |  |
| `assets/img/karriere-abteilungsleitung/hero.png` | 186 – Hero / Seitenkopf |  |
| `assets/img/karriere-abteilungsleitung/awards.png` | 209 – Seiteninhalt (ohne eindeutige Überschrift) |  |
| `assets/img/karriere-teamleitung/video-poster-gfi.jpg` | 232 – CSS-/Hintergrundbild |  |
| `assets/img/karriere-abteilungsleitung/tag-2.jpg` | 260 – Wertschätzung; 489 – Führung & Weiterentwicklung | Zusammenarbeit und Wertearbeit im Team |
| `assets/img/karriere-abteilungsleitung/tag-4.jpg` | 275 – Individuelle Karrierechancen; 495 – Führung & Weiterentwicklung | Führung und Weiterentwicklung bei der GFI |
| `assets/img/karriere-abteilungsleitung/tag-1.jpg` | 290 – Dynamik & Flexibilität; 486 – Führung & Weiterentwicklung | Flexibles Arbeiten bei der GFI |
| `assets/img/karriere-abteilungsleitung/aufgaben.jpg` | 403 – Abteilungsleitung in der Schulbegleitung |  |
| `assets/img/karriere-abteilungsleitung/profil.jpg` | 411 – Abteilungsleitung in der Schulbegleitung; 689 – Nahbarkeit durch flache Hierarchien | Teamsitzung und Zusammenarbeit bei der GFI |
| `assets/img/karriere-abteilungsleitung/tag-3.jpg` | 492 – Führung & Weiterentwicklung |  |
| `assets/img/karriere-abteilungsleitung/karriere.jpg` | 604 – Weiterentwicklung bei der GFI-Gruppe | Karrierestufe 2: Ihr Weg zur erfolgreichen Abteilungsleitung |
| `assets/img/karriere-abteilungsleitung/award.jpg` | 622 – Zeichen für herausragendes Engagement |  |
| `https://i.ytimg.com/vi/gKMrGQW58Ms/maxresdefault.jpg` | 636 – CSS-/Hintergrundbild |  |
| `https://i.ytimg.com/vi/LLYzTNoAoCk/maxresdefault.jpg` | 650 – CSS-/Hintergrundbild |  |
| `https://i.ytimg.com/vi/sB1T93fAUW0/maxresdefault.jpg` | 664 – CSS-/Hintergrundbild |  |

### karriere-fuehrungskraefte.html

| Bild | Zeile(n) und Platzierung / Abschnitt | Alt-Text |
|---|---|---|
| `https://www.gfi-baden.de/wp-content/uploads/2025/01/DSC00020-1024x683.jpg` | 19 – Social-Media-Vorschaubild |  |
| `assets/img/gfi-gruppenbild-rheinland.jpg` | 189 – Hero / Seitenkopf |  |
| `assets/img/karriere-teamleitung/karriere-1.png` | 222 – Weiterentwicklung bei der GFI-Gruppe | Schaubild: Karrierestufen bei der GFI-Gruppe |
| `https://i.ytimg.com/vi/_ENSwmccnCc/maxresdefault.jpg` | 328 – CSS-/Hintergrundbild |  |

### karriere-geschaeftsfuehrung.html

| Bild | Zeile(n) und Platzierung / Abschnitt | Alt-Text |
|---|---|---|
| `https://www.gfi-baden.de/wp-content/uploads/2025/01/DSC00020-1024x683.jpg` | 19 – Social-Media-Vorschaubild |  |
| `assets/img/karriere-geschaeftsfuehrung/hero.jpg` | 186 – Hero / Seitenkopf |  |
| `assets/img/karriere-geschaeftsfuehrung/awards.png` | 210 – Seiteninhalt (ohne eindeutige Überschrift) |  |
| `assets/img/karriere-geschaeftsfuehrung/intro-lead.jpg` | 235 – Ihr potenzieller Businesspartner für einen Start als Geschäftsführung | Führungskraft der GFI |
| `assets/img/karriere-geschaeftsfuehrung/konzept-meeting.jpg` | 267 – Für angehende GeschäftsführerInnen (m/w/d) | Teamsitzung Leitungsteam |
| `assets/img/karriere-geschaeftsfuehrung/gptw-team.jpg` | 275 – Für angehende GeschäftsführerInnen (m/w/d) | Great Place to Work Auszeichnung mit dem GFI-Team |
| `assets/img/karriere-geschaeftsfuehrung/wachstum-karte.png` | 392 – Entwicklung der GFI-Gruppe | Standorte der GFI-Gruppe in Deutschland |
| `assets/img/karriere-geschaeftsfuehrung/wachstum-umsatz.png` | 394 – Entwicklung der GFI-Gruppe | Umsatzwachstum seit Gründung in t€ |

### karriere-operative.html

| Bild | Zeile(n) und Platzierung / Abschnitt | Alt-Text |
|---|---|---|
| `https://www.gfi-baden.de/wp-content/uploads/2025/01/DSC00020-1024x683.jpg` | 19 – Social-Media-Vorschaubild |  |
| `assets/img/gfi-gruppenbild-rheinland.jpg` | 189 – Hero / Seitenkopf |  |
| `https://gesellschaft-fuer-inklusion.de/wp-content/uploads/2023/12/simonodes-01-scaled.jpg` | 225 – CSS-/Hintergrundbild |  |
| `assets/img/gptw-beste-arbeitgeber-deutschland-2024.jpg` | 232 – Wir stellen uns regelmäßig auf den Prüfstand |  |
| `https://gesellschaft-fuer-inklusion.de/wp-content/uploads/2023/12/Screenshot-2023-12-23-112142-min.jpeg` | 375 – CSS-/Hintergrundbild |  |
| `https://gesellschaft-fuer-inklusion.de/wp-content/uploads/2023/12/Einfuehrungsveranstaltung-min.jpg` | 385 – CSS-/Hintergrundbild |  |
| `https://gesellschaft-fuer-inklusion.de/wp-content/uploads/2024/07/Screenshot-2024-07-04-151957.jpg` | 395 – CSS-/Hintergrundbild |  |

### karriere-stellen.html

| Bild | Zeile(n) und Platzierung / Abschnitt | Alt-Text |
|---|---|---|
| `https://www.gfi-baden.de/wp-content/uploads/2025/01/DSC00020-1024x683.jpg` | 19 – Social-Media-Vorschaubild |  |
| `assets/img/gfi-gruppenbild-rheinland.jpg` | 190 – Hero / Seitenkopf |  |

### karriere-teamleitung.html

| Bild | Zeile(n) und Platzierung / Abschnitt | Alt-Text |
|---|---|---|
| `https://www.gfi-baden.de/wp-content/uploads/2025/01/DSC00020-1024x683.jpg` | 19 – Social-Media-Vorschaubild |  |
| `assets/img/karriere-teamleitung/hero.jpg` | 186 – Hero / Seitenkopf |  |
| `assets/img/karriere-teamleitung/GFI - Bester Arbeitgeber.png` | 209 – Seiteninhalt (ohne eindeutige Überschrift) |  |
| `assets/img/karriere-teamleitung/video-poster-gfi.jpg` | 232 – CSS-/Hintergrundbild |  |
| `https://i.ytimg.com/vi/zWI_PyL07lk/maxresdefault.jpg` | 260 – CSS-/Hintergrundbild |  |
| `https://i.ytimg.com/vi/-BwFBYcjsFk/maxresdefault.jpg` | 278 – CSS-/Hintergrundbild |  |
| `https://i.ytimg.com/vi/heldOnTbLro/maxresdefault.jpg` | 296 – CSS-/Hintergrundbild |  |
| `assets/img/karriere-teamleitung/aufgaben-2.jpg` | 408 – Teamleitung in der Schulbegleitung; 707 – Nahbarkeit durch flache Hierarchien | Team der GFI in der Schulbegleitung |
| `assets/img/karriere-teamleitung/aufgaben-1.jpg` | 416 – Teamleitung in der Schulbegleitung |  |
| `assets/img/karriere-teamleitung/profil-1.jpg` | 487 – Führen |  |
| `assets/img/karriere-teamleitung/profil-2.jpg` | 490 – Führen |  |
| `assets/img/karriere-teamleitung/profil-3.jpg` | 493 – Führen |  |
| `assets/img/karriere-teamleitung/karriere-1.png` | 602 – Weiterentwicklung bei der GFI-Gruppe | Karrierestufen bei der GFI |
| `assets/img/karriere-teamleitung/karriere-2.png` | 627 – Koordinationstrainee |  |
| `assets/img/karriere-teamleitung/karriere-3.jpg` | 640 – Zeichen für herausragendes Engagement |  |
| `https://i.ytimg.com/vi/gKMrGQW58Ms/maxresdefault.jpg` | 654 – CSS-/Hintergrundbild |  |
| `https://i.ytimg.com/vi/LLYzTNoAoCk/maxresdefault.jpg` | 668 – CSS-/Hintergrundbild |  |
| `https://i.ytimg.com/vi/sB1T93fAUW0/maxresdefault.jpg` | 682 – CSS-/Hintergrundbild |  |

### kontakt.html

| Bild | Zeile(n) und Platzierung / Abschnitt | Alt-Text |
|---|---|---|
| `https://www.gfi-baden.de/wp-content/uploads/2025/01/DSC00020-1024x683.jpg` | 21 – Social-Media-Vorschaubild |  |
| `assets/img/gfi-event-escape.jpg` | 209 – Hero / Seitenkopf |  |
| `assets/img/gfi-auszeichnung.jpg` | 499 – Nähe, die man erreichen kann. | Team der GFI Baden |

### leistungen.html

| Bild | Zeile(n) und Platzierung / Abschnitt | Alt-Text |
|---|---|---|
| `https://www.gfi-baden.de/wp-content/uploads/2025/01/DSC00020-1024x683.jpg` | 21 – Social-Media-Vorschaubild |  |
| `assets/img/gfi-schulbegleitung-4.jpg` | 202 – Hero / Seitenkopf |  |
| `assets/img/gfi-schulbegleitung-5.jpg` | 253 – Unterstützung, die sich am individuellen Bedarf orientiert. | Fachkraft begleitet ein Kind im Alltag |
| `assets/img/gfi-schulbegleitung-6.jpg` | 347 – Schulbegleitung für verlässliche Teilhabe | Schulbegleitung: Fachkraft unterstützt Kinder beim Zeichnen |
| `assets/img/gfi-autismus-ballpit.jpg` | 380 – Kitabegleitung im Gruppenalltag | Kitabegleitung: gemeinsames Spiel in der Gruppe |
| `assets/img/gfi-autismus-stifte.jpg` | 413 – Autismus Therapie – fachlich und alltagsnah | Autismus-Therapie: Kind beim konzentrierten Spiel |
| `assets/img/Gemeinsam_Verantwortung.png` | 422 – Autismus Therapie – fachlich und alltagsnah |  |
| `assets/img/kinder-feld.png` | 461 – Familienhilfe mit klarer Begleitung | Familienhilfe: Kind in ruhiger, individueller Situation |
| `assets/img/inklusion-malen.png` | 495 – Inklusionsassistenz mit klarer Abstimmung | Inklusionsassistenz: Kind mit Buntstiften in konzentrierter Tätigkeit |
| `assets/img/Führungskräfte-Workshop2.jpg` | 529 – GFI-Akademie: Qualifizierung für den Schulalltag | Führungskräfte-Workshop der GFI |
| `assets/img/schulbegleitung-zeichnen.png` | 639 – Was unsere Arbeit auszeichnet | Begleitung im Alltag |

### pooling.html

| Bild | Zeile(n) und Platzierung / Abschnitt | Alt-Text |
|---|---|---|
| `https://www.gfi-baden.de/wp-content/uploads/2025/01/DSC00020-1024x683.jpg` | 21 – Social-Media-Vorschaubild |  |
| `assets/img/Teamsitzung2.jpg` | 206 – Seiteninhalt (ohne eindeutige Überschrift) |  |
| `assets/img/gfi-schulbegleitung-7.jpg` | 379 – Infrastrukturmodelle und Pooling aktiv anstoßen |  |
| `assets/img/Unbenannt_I-min-1-1024x720.jpg` | 473 – Drei Schulbegleitungen in einer Jahrgangsstufe – so kann Bündelung greifen |  |
| `assets/img/AdobeStock_286655242-min-1024x683.jpeg` | 513 – Mehr Spielraum im Tagesablauf |  |
| `assets/img/gfi-sonstiges-3.jpg` | 570 – Pooling lohnt sich dort, wo Bündelung möglich ist |  |
| `assets/img/pooling-schulalltag.png` | 793 – GFI-Inklusionskoffer | Beratungsgespräch der GFI zu Pooling und Zusammenarbeit |

### standort-bonn.html

| Bild | Zeile(n) und Platzierung / Abschnitt | Alt-Text |
|---|---|---|
| `https://www.gfi-baden.de/assets/img/standorte/bonn-hero.jpg` | 19 – Social-Media-Vorschaubild |  |
| `assets/img/standorte/bonn-hero.jpg` | 217 – Hero / Seitenkopf |  |
| `assets/img/standorte/integrationsassistenz.jpg` | 311 – Integrationsassistenz im Bonner Poolmodell und im Einzelfall | Integrationsassistenz: gemeinsame Aktivität und Ermutigung |
| `assets/img/begleitung.jpeg` | 332, 393 – Erfahrungen von Familien und Partnern | Schulbegleitung im Unterricht |
| `assets/img/KindRollstuhl.png` | 336 – Erfahrungen von Familien und Partnern |  |
| `assets/img/schule.jpeg` | 340 – Erfahrungen von Familien und Partnern |  |
| `assets/img/Betreuung.jpeg` | 344 – Erfahrungen von Familien und Partnern |  |
| `assets/img/High5.jpeg` | 348 – Erfahrungen von Familien und Partnern |  |
| `assets/img/standorte/familie-alltag.jpg` | 352 – Erfahrungen von Familien und Partnern |  |
| `assets/img/hero-kinder.jpeg` | 356 – Erfahrungen von Familien und Partnern |  |
| `assets/img/team-portrait.jpg` | 360 – Erfahrungen von Familien und Partnern |  |
| `assets/img/kids.jpg` | 364 – Erfahrungen von Familien und Partnern |  |
| `assets/img/standorte/bonn-foto.jpg` | 406 – Erfahrungen von Familien und Partnern |  |
| `assets/img/AdobeStock_286655242-min-1024x683.jpeg` | 504 – Ambulante Hilfen zur Erziehung (HZE) | Ambulante Hilfen zur Erziehung: Begleitung im Alltag |
| `assets/img/standorte/timo-ivan-bonn.jpg` | 568 – Sie haben Fragen? Wunderbar. | Timo Ivan, Standortleitung Bonn |

### standort-euskirchen.html

| Bild | Zeile(n) und Platzierung / Abschnitt | Alt-Text |
|---|---|---|
| `https://www.gfi-baden.de/assets/img/standorte/euskirchen-hero.jpg` | 19 – Social-Media-Vorschaubild |  |
| `assets/img/standorte/euskirchen-hero.jpg` | 217 – Hero / Seitenkopf |  |
| `assets/img/standorte/schul-kitabegleitung.jpg` | 311 – Schul- und Kitabegleitung | Schul- und Kitabegleitung: gemeinsame Aktivität und Ermutigung |
| `assets/img/begleitung.jpeg` | 332, 393 – Erfahrungen von Familien und Partnern | Schulbegleitung im Unterricht |
| `assets/img/KindRollstuhl.png` | 336 – Erfahrungen von Familien und Partnern |  |
| `assets/img/schule.jpeg` | 340 – Erfahrungen von Familien und Partnern |  |
| `assets/img/Betreuung.jpeg` | 344 – Erfahrungen von Familien und Partnern |  |
| `assets/img/High5.jpeg` | 348 – Erfahrungen von Familien und Partnern |  |
| `assets/img/standorte/familie-alltag.jpg` | 352 – Erfahrungen von Familien und Partnern |  |
| `assets/img/hero-kinder.jpeg` | 356 – Erfahrungen von Familien und Partnern |  |
| `assets/img/kids.jpg` | 360 – Erfahrungen von Familien und Partnern |  |
| `assets/img/team-portrait.jpg` | 364 – Erfahrungen von Familien und Partnern |  |
| `assets/img/standorte/euskirchen-foto.jpg` | 406 – Erfahrungen von Familien und Partnern |  |
| `assets/img/standorte/claudia-niessner.jpg` | 546 – Sie haben Fragen? Wunderbar. | Claudia Niessner, Fachbereichsleitung Standort Euskirchen |

### standort-karlsruhe.html

| Bild | Zeile(n) und Platzierung / Abschnitt | Alt-Text |
|---|---|---|
| `https://www.gfi-baden.de/assets/img/standorte/karlsruhe-hero.jpg` | 19 – Social-Media-Vorschaubild |  |
| `assets/img/standorte/karlsruhe-hero.jpg` | 217 – Hero / Seitenkopf |  |
| `assets/img/standorte/schul-kitabegleitung.jpg` | 311 – Schul- und Kitabegleitung | Schul- und Kitabegleitung: gemeinsame Aktivität und Ermutigung |
| `assets/img/begleitung.jpeg` | 332, 393 – Erfahrungen von Familien und Partnern | Schulbegleitung im Unterricht |
| `assets/img/KindRollstuhl.png` | 336 – Erfahrungen von Familien und Partnern |  |
| `assets/img/schule.jpeg` | 340 – Erfahrungen von Familien und Partnern |  |
| `assets/img/Betreuung.jpeg` | 344 – Erfahrungen von Familien und Partnern |  |
| `assets/img/High5.jpeg` | 348 – Erfahrungen von Familien und Partnern |  |
| `assets/img/standorte/familie-alltag.jpg` | 352 – Erfahrungen von Familien und Partnern |  |
| `assets/img/hero-kinder.jpeg` | 356 – Erfahrungen von Familien und Partnern |  |
| `assets/img/kids.jpg` | 360 – Erfahrungen von Familien und Partnern |  |
| `assets/img/team-portrait.jpg` | 364 – Erfahrungen von Familien und Partnern |  |
| `assets/img/standorte/karlsruhe-foto.jpg` | 406 – Erfahrungen von Familien und Partnern |  |
| `assets/img/AdobeStock_286655242-min-1024x683.jpeg` | 504 – Ambulante Hilfen zur Erziehung (HZE) | Ambulante Hilfen zur Erziehung: Begleitung im Alltag |
| `assets/img/standorte/suzanne-franziska.jpg` | 568 – Sie haben Fragen? Wunderbar. | Suzanne Mack und Franziska Lang, Standortverantwortliche Karlsruhe |

### standort-koeln.html

| Bild | Zeile(n) und Platzierung / Abschnitt | Alt-Text |
|---|---|---|
| `https://www.gfi-baden.de/assets/img/standorte/koeln-hero.jpg` | 19 – Social-Media-Vorschaubild |  |
| `assets/img/standorte/koeln-hero.jpg` | 217 – Hero / Seitenkopf |  |
| `assets/img/standorte/inklusionsassistenz.jpg` | 311 – Inklusionsassistenz an Schulen und Kitas | Inklusionsassistenz: gemeinsame Aktivität und Ermutigung |
| `assets/img/begleitung.jpeg` | 332, 393 – Erfahrungen von Familien und Partnern | Schulbegleitung im Unterricht |
| `assets/img/KindRollstuhl.png` | 336 – Erfahrungen von Familien und Partnern |  |
| `assets/img/schule.jpeg` | 340 – Erfahrungen von Familien und Partnern |  |
| `assets/img/Betreuung.jpeg` | 344 – Erfahrungen von Familien und Partnern |  |
| `assets/img/High5.jpeg` | 348 – Erfahrungen von Familien und Partnern |  |
| `assets/img/standorte/familie-alltag.jpg` | 352 – Erfahrungen von Familien und Partnern |  |
| `assets/img/hero-kinder.jpeg` | 356 – Erfahrungen von Familien und Partnern |  |
| `assets/img/kids.jpg` | 360 – Erfahrungen von Familien und Partnern |  |
| `assets/img/team-portrait.jpg` | 364 – Erfahrungen von Familien und Partnern |  |
| `assets/img/standorte/koeln-foto.jpg` | 406 – Erfahrungen von Familien und Partnern |  |
| `assets/img/standorte/isabell-kloppmann.jpg` | 546 – Sie haben Fragen? Wunderbar. | Isabell Kloppmann, Fachbereichsleitung Inklusionsassistenz Köln |

### standort-mannheim.html

| Bild | Zeile(n) und Platzierung / Abschnitt | Alt-Text |
|---|---|---|
| `https://www.gfi-baden.de/assets/img/standorte/mannheim-hero.jpg` | 19 – Social-Media-Vorschaubild |  |
| `assets/img/standorte/mannheim-hero.jpg` | 217 – Hero / Seitenkopf |  |
| `assets/img/standorte/schul-kitabegleitung.jpg` | 311 – Schul- und Kitabegleitung | Schul- und Kitabegleitung: gemeinsame Aktivität und Ermutigung |
| `assets/img/begleitung.jpeg` | 332, 393 – Erfahrungen von Familien und Partnern | Schulbegleitung im Unterricht |
| `assets/img/KindRollstuhl.png` | 336 – Erfahrungen von Familien und Partnern |  |
| `assets/img/schule.jpeg` | 340 – Erfahrungen von Familien und Partnern |  |
| `assets/img/Betreuung.jpeg` | 344 – Erfahrungen von Familien und Partnern |  |
| `assets/img/High5.jpeg` | 348 – Erfahrungen von Familien und Partnern |  |
| `assets/img/standorte/familie-alltag.jpg` | 352 – Erfahrungen von Familien und Partnern |  |
| `assets/img/hero-kinder.jpeg` | 356 – Erfahrungen von Familien und Partnern |  |
| `assets/img/kids.jpg` | 360 – Erfahrungen von Familien und Partnern |  |
| `assets/img/team-portrait.jpg` | 364 – Erfahrungen von Familien und Partnern |  |
| `assets/img/standorte/mannheim-foto.jpg` | 406 – Erfahrungen von Familien und Partnern |  |
| `assets/img/standorte/chiara-graca.jpg` | 546 – Sie haben Fragen? Wunderbar. | Chiara Graca, Standortleitung Mannheim |

### standort-rhein-sieg-kreis.html

| Bild | Zeile(n) und Platzierung / Abschnitt | Alt-Text |
|---|---|---|
| `https://www.gfi-baden.de/wp-content/uploads/2025/01/DSC00020-1024x683.jpg` | 19 – Social-Media-Vorschaubild |  |
| `assets/img/standorte/rhein-sieg-hero.jpg` | 217 – Hero / Seitenkopf |  |
| `assets/img/standorte/inklusionsassistenz.jpg` | 311 – Inklusionsassistenz an Schulen und Kitas | Inklusionsassistenz: gemeinsame Aktivität in der Gruppe |
| `assets/img/begleitung.jpeg` | 332, 393 – Erfahrungen von Familien und Partnern | Schulbegleitung im Unterricht |
| `assets/img/KindRollstuhl.png` | 336 – Erfahrungen von Familien und Partnern |  |
| `assets/img/schule.jpeg` | 340 – Erfahrungen von Familien und Partnern |  |
| `assets/img/Betreuung.jpeg` | 344 – Erfahrungen von Familien und Partnern |  |
| `assets/img/High5.jpeg` | 348 – Erfahrungen von Familien und Partnern |  |
| `assets/img/standorte/familie-alltag.jpg` | 352 – Erfahrungen von Familien und Partnern; 504 – Familienentlastender Dienst (FED) | Familienalltag: gemeinsame Aktivität in der Küche |
| `assets/img/hero-kinder.jpeg` | 356 – Erfahrungen von Familien und Partnern |  |
| `assets/img/kids.jpg` | 360 – Erfahrungen von Familien und Partnern |  |
| `assets/img/team-portrait.jpg` | 364 – Erfahrungen von Familien und Partnern |  |
| `assets/img/gfi-gruppenbild-rheinland.jpg` | 406 – Erfahrungen von Familien und Partnern |  |
| `assets/img/AdobeStock_286655242-min-1024x683.jpeg` | 527 – Ambulante Hilfen zur Erziehung (HZE) | Ambulante Hilfen zur Erziehung: Begleitung im Alltag |
| `assets/img/standorte/timo-ivan.jpg` | 591 – Sie haben Fragen? Wunderbar. | Timo Ivan, Standortleitung Rhein-Sieg-Kreis |

### standort-suedliche-weinstrasse.html

| Bild | Zeile(n) und Platzierung / Abschnitt | Alt-Text |
|---|---|---|
| `https://www.gfi-baden.de/assets/img/standorte/suedliche-weinstrasse-hero.jpg` | 19 – Social-Media-Vorschaubild |  |
| `assets/img/standorte/suedliche-weinstrasse-hero.jpg` | 217 – Hero / Seitenkopf |  |
| `assets/img/standorte/schulbegleitung-suw.jpg` | 311 – Schulbegleitung / Integrationsassistenz an Schulen und Kitas | Schulbegleitung: gemeinsame Aktivität und Ermutigung |
| `assets/img/begleitung.jpeg` | 332, 393 – Erfahrungen von Familien und Partnern | Schulbegleitung im Unterricht |
| `assets/img/KindRollstuhl.png` | 336 – Erfahrungen von Familien und Partnern |  |
| `assets/img/schule.jpeg` | 340 – Erfahrungen von Familien und Partnern |  |
| `assets/img/Betreuung.jpeg` | 344 – Erfahrungen von Familien und Partnern |  |
| `assets/img/High5.jpeg` | 348 – Erfahrungen von Familien und Partnern |  |
| `assets/img/standorte/familie-alltag.jpg` | 352 – Erfahrungen von Familien und Partnern |  |
| `assets/img/hero-kinder.jpeg` | 356 – Erfahrungen von Familien und Partnern |  |
| `assets/img/kids.jpg` | 360 – Erfahrungen von Familien und Partnern |  |
| `assets/img/team-portrait.jpg` | 364 – Erfahrungen von Familien und Partnern |  |
| `assets/img/standorte/suedliche-weinstrasse-foto.jpg` | 406 – Erfahrungen von Familien und Partnern |  |
| `assets/img/AdobeStock_286655242-min-1024x683.jpeg` | 504 – Ambulante Hilfen zur Erziehung (HZE) | Ambulante Hilfen zur Erziehung: Begleitung im Alltag |
| `assets/img/standorte/phil-waetzmann.jpg` | 568 – Sie haben Fragen? Wunderbar. | Phil Wätzmann, Fachbereichsleitung Schulbegleitung SÜW |

### standort-wiesbaden.html

| Bild | Zeile(n) und Platzierung / Abschnitt | Alt-Text |
|---|---|---|
| `https://www.gfi-baden.de/assets/img/standorte/wiesbaden-hero.jpg` | 19 – Social-Media-Vorschaubild |  |
| `assets/img/standorte/wiesbaden-hero.jpg` | 217 – Hero / Seitenkopf |  |
| `assets/img/standorte/teilhabeassistenz.jpg` | 311 – Teilhabeassistenz an Schulen und Kitas | Teilhabeassistenz: gemeinsame Aktivität und Ermutigung |
| `assets/img/begleitung.jpeg` | 332, 393 – Erfahrungen von Familien und Partnern | Schulbegleitung im Unterricht |
| `assets/img/KindRollstuhl.png` | 336 – Erfahrungen von Familien und Partnern |  |
| `assets/img/schule.jpeg` | 340 – Erfahrungen von Familien und Partnern |  |
| `assets/img/Betreuung.jpeg` | 344 – Erfahrungen von Familien und Partnern |  |
| `assets/img/High5.jpeg` | 348 – Erfahrungen von Familien und Partnern |  |
| `assets/img/standorte/familie-alltag.jpg` | 352 – Erfahrungen von Familien und Partnern |  |
| `assets/img/hero-kinder.jpeg` | 356 – Erfahrungen von Familien und Partnern |  |
| `assets/img/kids.jpg` | 360 – Erfahrungen von Familien und Partnern |  |
| `assets/img/team-portrait.jpg` | 364 – Erfahrungen von Familien und Partnern |  |
| `assets/img/standorte/wiesbaden-foto.jpg` | 406 – Erfahrungen von Familien und Partnern |  |
| `assets/img/standorte/betreutes-wohnen.jpg` | 504 – Assistenzleistungen im Betreuten Wohnen für Menschen mit Behinderung | Assistenz im Betreuten Wohnen: Alltag und Begleitung |
| `assets/img/standorte/dana-haude.jpg` | 568 – Sie haben Fragen? Wunderbar. | Dana Haude, Standortleitung Wiesbaden |

### ueber-uns.html

| Bild | Zeile(n) und Platzierung / Abschnitt | Alt-Text |
|---|---|---|
| `https://www.gfi-baden.de/wp-content/uploads/2025/01/DSC00020-1024x683.jpg` | 21 – Social-Media-Vorschaubild |  |
| `assets/img/gfi-gruppenbild-rheinland.jpg` | 204 – Hero / Seitenkopf |  |
| `assets/img/kinder-kreis.png` | 254 – Wir sind in vier Bundesländern für Sie da. | Vielfältige Kindergruppe – Inklusion und Gemeinschaft |
| `assets/img/badge-gptw.png` | 323 – Auszeichnungs-Badge | Great Place to Work Siegel 2024 |
| `assets/img/Teamsitzung.jpg` | 434 – Wir messen uns an den Ergebnissen |  |
| `assets/img/wissen/team-schuljahr-2023.jpg` | 595 – Einblicke, Fachwissen und Hintergründe |  |
| `assets/img/wissen/wissensmanagement.jpg` | 608 – Gestärkt als Team ins neue Schuljahr gestartet |  |
| `assets/img/wissen/fsj.jpg` | 621 – Internes Wissensmanagement: so gelingt Weiterentwicklung |  |
| `assets/img/wissen/einfuehrung-2022.jpg` | 634 – Berufliche Orientierung und persönliche Weiterentwicklung |  |
| `assets/img/wissen/masernschutz.jpg` | 647 – Einführung in das neue Schuljahr 2022/23 |  |
| `assets/img/wissen/praesenzpflicht.jpg` | 660 – Masernschutzgesetz |  |

## Physisch identische Dateien unter verschiedenen Pfaden

Diese Gruppen sind byte-identisch (SHA-256), nicht nur optisch ähnlich. „genutzt“ heißt: mindestens eine Referenz im untersuchten HTML/CSS/JS.

### Dublettengruppe 1 — 5 Dateien, 119070 Bytes

- `assets/img/standorte/inklusionsassistenz.jpg` — genutzt
- `assets/img/standorte/integrationsassistenz.jpg` — genutzt
- `assets/img/standorte/schul-kitabegleitung.jpg` — genutzt
- `assets/img/standorte/schulbegleitung-suw.jpg` — genutzt
- `assets/img/standorte/teilhabeassistenz.jpg` — genutzt

### Dublettengruppe 2 — 3 Dateien, 141107 Bytes

- `assets/img/gfi-pooling-faq.jpg` — ungenutzt
- `assets/img/karriere-abteilungsleitung/stimmen-faq.jpg` — ungenutzt
- `assets/img/karriere-teamleitung/kontakt.jpg` — ungenutzt

### Dublettengruppe 3 — 3 Dateien, 107271 Bytes

- `assets/img/Betreuung.jpeg` — genutzt
- `assets/img/gfi-schulbegleitung-1.jpg` — genutzt
- `assets/img/von GFI/Schulbegleitung/AdobeStock_225806636-1024x683.jpeg` — ungenutzt

### Dublettengruppe 4 — 3 Dateien, 344674 Bytes

- `assets/img/karriere-abteilungsleitung/awards.png` — genutzt
- `assets/img/karriere-geschaeftsfuehrung/awards.png` — genutzt
- `assets/img/karriere-teamleitung/hero.gif` — ungenutzt

### Dublettengruppe 5 — 2 Dateien, 2420220 Bytes

- `assets/img/gfi-event-hochseil.jpg` — genutzt
- `assets/img/von GFI/Team_und_Sonstiges/Team_Event_Hochseilgarten1.JPG` — ungenutzt

### Dublettengruppe 6 — 2 Dateien, 1865911 Bytes

- `assets/img/gfi-autismus-knete.jpg` — genutzt
- `assets/img/von GFI/Autismus-Therapie/pexels-mccutcheon-1449934.jpg` — ungenutzt

### Dublettengruppe 7 — 2 Dateien, 1338785 Bytes

- `assets/img/gfi-schulbegleitung-4.jpg` — genutzt
- `assets/img/von GFI/Schulbegleitung/AdobeStock_320627162 (3)-min.jpeg` — ungenutzt

### Dublettengruppe 8 — 2 Dateien, 770260 Bytes

- `assets/img/gfi-auszeichnung.jpg` — genutzt
- `assets/img/von GFI/Team_und_Sonstiges/Auszeichnung_GFI-Award.jpg` — ungenutzt

### Dublettengruppe 9 — 2 Dateien, 1306207 Bytes

- `assets/img/gfi-autismus-stifte.jpg` — genutzt
- `assets/img/von GFI/Autismus-Therapie/pexels-mikhail-nilov-8653447.jpg` — ungenutzt

### Dublettengruppe 10 — 2 Dateien, 519305 Bytes

- `assets/img/Teamsitzung2.jpg` — genutzt
- `assets/img/von GFI/Team_und_Sonstiges/Teamsitzung2.jpg` — ungenutzt

### Dublettengruppe 11 — 2 Dateien, 514084 Bytes

- `assets/img/karriere-abteilungsleitung/tag-3.jpg` — genutzt
- `assets/img/karriere-teamleitung/profil-3.jpg` — genutzt

### Dublettengruppe 12 — 2 Dateien, 192701 Bytes

- `assets/img/gfi-teamevent.jpg` — ungenutzt
- `assets/img/von GFI/Team_und_Sonstiges/Teamevent.jpeg` — ungenutzt

### Dublettengruppe 13 — 2 Dateien, 1175632 Bytes

- `assets/img/gfi-autismus-kopfhoerer.jpg` — genutzt
- `assets/img/von GFI/Autismus-Therapie/pexels-jonas-mohamadi-1490844.jpg` — ungenutzt

### Dublettengruppe 14 — 2 Dateien, 2292401 Bytes

- `assets/img/gfi-sonstiges-2.jpg` — ungenutzt
- `assets/img/von GFI/Team_und_Sonstiges/Sonstiges2.jpg` — ungenutzt

### Dublettengruppe 15 — 2 Dateien, 1898288 Bytes

- `assets/img/gfi-event-hochseil-2.jpg` — ungenutzt
- `assets/img/von GFI/Team_und_Sonstiges/Team_Event_Hochseilgarten2.JPG` — ungenutzt

### Dublettengruppe 16 — 2 Dateien, 1692182 Bytes

- `assets/img/gfi-gruppenbild-rheinland.jpg` — genutzt
- `assets/img/von GFI/Team_und_Sonstiges/GFI-Rheinland_Gruppenbild.JPEG` — ungenutzt

### Dublettengruppe 17 — 2 Dateien, 226015 Bytes

- `assets/img/karriere-abteilungsleitung/tag-4.jpg` — genutzt
- `assets/img/karriere-geschaeftsfuehrung/konzept-meeting.jpg` — genutzt

### Dublettengruppe 18 — 2 Dateien, 320271 Bytes

- `assets/img/gfi-inklusionstasche.jpg` — genutzt
- `assets/img/von GFI/Team_und_Sonstiges/Inklusionstasche.jpg` — ungenutzt

### Dublettengruppe 19 — 2 Dateien, 634039 Bytes

- `assets/img/gfi-sonstiges-1.jpg` — genutzt
- `assets/img/von GFI/Team_und_Sonstiges/Sonstiges.jpg` — ungenutzt

### Dublettengruppe 20 — 2 Dateien, 4944889 Bytes

- `assets/img/gfi-schulbegleitung-3.jpg` — genutzt
- `assets/img/von GFI/Schulbegleitung/AdobeStock_179712832.jpeg` — ungenutzt

### Dublettengruppe 21 — 2 Dateien, 400386 Bytes

- `assets/img/gfi-schulbegleitung-6.jpg` — genutzt
- `assets/img/von GFI/Schulbegleitung/UnbenanntAA.jpg` — ungenutzt

### Dublettengruppe 22 — 2 Dateien, 527780 Bytes

- `assets/img/gfi-schulbegleitung-5.jpg` — genutzt
- `assets/img/von GFI/Schulbegleitung/Unbenannt-min.jpg` — ungenutzt

### Dublettengruppe 23 — 2 Dateien, 576144 Bytes

- `assets/img/karriere-abteilungsleitung/tag-2.jpg` — genutzt
- `assets/img/karriere-teamleitung/profil-2.jpg` — genutzt

### Dublettengruppe 24 — 2 Dateien, 150941 Bytes

- `assets/img/gfi-gptw2026-3.jpg` — genutzt
- `assets/img/von GFI/Team_und_Sonstiges/GPTW2026_3.jpg` — ungenutzt

### Dublettengruppe 25 — 2 Dateien, 87572 Bytes

- `assets/img/gfi-schulbegleitung-7.jpg` — genutzt
- `assets/img/von GFI/Schulbegleitung/pexels-cottonbro-6986439.jpg` — ungenutzt

### Dublettengruppe 26 — 2 Dateien, 158242 Bytes

- `assets/img/gfi-gptw2026-2.jpg` — ungenutzt
- `assets/img/von GFI/Team_und_Sonstiges/GPTW2026_2.jpg` — ungenutzt

### Dublettengruppe 27 — 2 Dateien, 3737260 Bytes

- `assets/img/Gemeinsam_Verantwortung.png` — genutzt
- `assets/img/pooling-schulalltag.png` — genutzt

### Dublettengruppe 28 — 2 Dateien, 362945 Bytes

- `assets/img/Führungskräfte-Workshop2.jpg` — genutzt
- `assets/img/von GFI/Team_und_Sonstiges/Führungskräfte-Workshop2.jpg` — ungenutzt

### Dublettengruppe 29 — 2 Dateien, 92498 Bytes

- `assets/img/hero-kinder.jpeg` — genutzt
- `assets/img/schule.jpeg` — genutzt

### Dublettengruppe 30 — 2 Dateien, 385295 Bytes

- `assets/img/gfi-schulbegleitung-2.jpg` — genutzt
- `assets/img/von GFI/Schulbegleitung/AdobeStock_343577830-scaled.jpeg` — ungenutzt

### Dublettengruppe 31 — 2 Dateien, 2922887 Bytes

- `assets/img/gfi-event-minigolf.jpg` — genutzt
- `assets/img/von GFI/Team_und_Sonstiges/Team_Event_Schwarzlichminigolf1.jpg` — ungenutzt

### Dublettengruppe 32 — 2 Dateien, 3542149 Bytes

- `assets/img/gfi-sonstiges-3.jpg` — genutzt
- `assets/img/von GFI/Team_und_Sonstiges/Sonstiges3.jpeg` — ungenutzt

### Dublettengruppe 33 — 2 Dateien, 507265 Bytes

- `assets/img/gfi-event-escape.jpg` — genutzt
- `assets/img/von GFI/Team_und_Sonstiges/Team_Event_EscapeRoom.jpg` — ungenutzt

### Dublettengruppe 34 — 2 Dateien, 289959 Bytes

- `assets/img/gfi-autismus-boy.jpg` — ungenutzt
- `assets/img/von GFI/Autismus-Therapie/boy-6822528_1280.jpg` — ungenutzt

### Dublettengruppe 35 — 2 Dateien, 216328 Bytes

- `assets/img/kids.jpg` — genutzt
- `assets/img/wissen/fsj.jpg` — genutzt

### Dublettengruppe 36 — 2 Dateien, 2246391 Bytes

- `assets/img/gfi-schulbegleitung-8.png` — genutzt
- `assets/img/von GFI/Schulbegleitung/8243DE89-08A2-4B3E-A227-402D555853E8.PNG` — ungenutzt

### Dublettengruppe 37 — 2 Dateien, 3128490 Bytes

- `assets/img/gfi-gptw2024.jpg` — ungenutzt
- `assets/img/von GFI/Team_und_Sonstiges/GPTW2024.jpg` — ungenutzt

### Dublettengruppe 38 — 2 Dateien, 154429 Bytes

- `assets/img/gfi-gptw2026-1.jpg` — ungenutzt
- `assets/img/von GFI/Team_und_Sonstiges/GPTW2026_1.jpg` — ungenutzt

### Dublettengruppe 39 — 2 Dateien, 2704579 Bytes

- `assets/img/gfi-event-minigolf-2.jpg` — ungenutzt
- `assets/img/von GFI/Team_und_Sonstiges/Team_Event_Schwarzlichminigolf2.jpg` — ungenutzt

### Dublettengruppe 40 — 2 Dateien, 1877270 Bytes

- `assets/img/gfi-autismus-spiel.jpg` — genutzt
- `assets/img/von GFI/Autismus-Therapie/pexels-pavel-danilyuk-8422207.jpg` — ungenutzt

### Dublettengruppe 41 — 2 Dateien, 304847 Bytes

- `assets/img/karriere-abteilungsleitung/award.jpg` — genutzt
- `assets/img/karriere-teamleitung/karriere-3.jpg` — genutzt

### Dublettengruppe 42 — 2 Dateien, 43938 Bytes

- `assets/img/Teamsitzung.jpg` — genutzt
- `assets/img/von GFI/Team_und_Sonstiges/Teamsitzung.jpg` — ungenutzt

### Dublettengruppe 43 — 2 Dateien, 1114167 Bytes

- `assets/img/gfi-workshop1.jpg` — genutzt
- `assets/img/von GFI/Team_und_Sonstiges/Führungskräfte-Workshop1.jpg` — ungenutzt

### Dublettengruppe 44 — 2 Dateien, 5286940 Bytes

- `assets/img/gfi-leitungsteam.jpg` — ungenutzt
- `assets/img/von GFI/Team_und_Sonstiges/Leitungsteam_Rheinland.jpg` — ungenutzt

### Dublettengruppe 45 — 2 Dateien, 2922671 Bytes

- `assets/img/gfi-gptw2026.jpg` — ungenutzt
- `assets/img/von GFI/Team_und_Sonstiges/GPTW2026_4.jpg` — ungenutzt

### Dublettengruppe 46 — 2 Dateien, 1133042 Bytes

- `assets/img/gfi-karriere-kultur.jpg` — ungenutzt
- `assets/img/karriere-teamleitung/kultur-wertschaetzung.png` — ungenutzt

### Dublettengruppe 47 — 2 Dateien, 1108582 Bytes

- `assets/img/gfi-gruppenbild-baden.jpg` — ungenutzt
- `assets/img/von GFI/Team_und_Sonstiges/GFI-Baden_Gruppenbild.JPEG` — ungenutzt

### Dublettengruppe 48 — 2 Dateien, 415695 Bytes

- `assets/img/gfi-autismus-ballpit.jpg` — genutzt
- `assets/img/von GFI/Autismus-Therapie/ball-pit-1661374_1280.jpg` — ungenutzt

## Nicht referenzierte lokale Bilddateien

Diese Dateien wurden in keinem untersuchten HTML-, CSS- oder JS-Quelltext gefunden. Eine indirekte Laufzeitnutzung außerhalb dieser Dateien ist damit nicht ausgeschlossen.

- `assets/img/Avatar.png`
- `assets/img/gfi-autismus-boy.jpg`
- `assets/img/gfi-event-hochseil-2.jpg`
- `assets/img/gfi-event-minigolf-2.jpg`
- `assets/img/gfi-gptw2024.jpg`
- `assets/img/gfi-gptw2026-1.jpg`
- `assets/img/gfi-gptw2026-2.jpg`
- `assets/img/gfi-gptw2026.jpg`
- `assets/img/gfi-gruppenbild-baden.jpg`
- `assets/img/gfi-karriere-kultur.jpg`
- `assets/img/gfi-leitungsteam.jpg`
- `assets/img/gfi-pooling-faq.jpg`
- `assets/img/gfi-sonstiges-2.jpg`
- `assets/img/gfi-teamevent.jpg`
- `assets/img/gfi-wissen-1.jpg`
- `assets/img/gfi-wissen-2.jpg`
- `assets/img/gptw-beste-arbeitgeber-deutschland-2024.png`
- `assets/img/karriere-abteilungsleitung/stimmen-faq.jpg`
- `assets/img/karriere-teamleitung/hero.gif`
- `assets/img/karriere-teamleitung/karriere-2.jpg`
- `assets/img/karriere-teamleitung/kontakt.jpg`
- `assets/img/karriere-teamleitung/kultur-kommunikation.png`
- `assets/img/karriere-teamleitung/kultur-weiterentwicklung.png`
- `assets/img/karriere-teamleitung/kultur-wertschaetzung.png`
- `assets/img/von GFI/Autismus-Therapie/ball-pit-1661374_1280.jpg`
- `assets/img/von GFI/Autismus-Therapie/boy-6822528_1280.jpg`
- `assets/img/von GFI/Autismus-Therapie/pexels-jonas-mohamadi-1490844.jpg`
- `assets/img/von GFI/Autismus-Therapie/pexels-mccutcheon-1449934.jpg`
- `assets/img/von GFI/Autismus-Therapie/pexels-mikhail-nilov-8653447.jpg`
- `assets/img/von GFI/Autismus-Therapie/pexels-pavel-danilyuk-8422207.jpg`
- `assets/img/von GFI/Schulbegleitung/1168692091-huge.jpg`
- `assets/img/von GFI/Schulbegleitung/8243DE89-08A2-4B3E-A227-402D555853E8.PNG`
- `assets/img/von GFI/Schulbegleitung/AdobeStock_179712832.jpeg`
- `assets/img/von GFI/Schulbegleitung/AdobeStock_225806636-1024x683.jpeg`
- `assets/img/von GFI/Schulbegleitung/AdobeStock_320627162 (3)-min.jpeg`
- `assets/img/von GFI/Schulbegleitung/AdobeStock_343577830-scaled.jpeg`
- `assets/img/von GFI/Schulbegleitung/pexels-cottonbro-6986439.jpg`
- `assets/img/von GFI/Schulbegleitung/shutterstock_310995530.jpg`
- `assets/img/von GFI/Schulbegleitung/Unbenannt-min.jpg`
- `assets/img/von GFI/Schulbegleitung/UnbenanntAA.jpg`
- `assets/img/von GFI/Team_und_Sonstiges/Auszeichnung_GFI-Award.jpg`
- `assets/img/von GFI/Team_und_Sonstiges/Führungskräfte-Workshop1.jpg`
- `assets/img/von GFI/Team_und_Sonstiges/Führungskräfte-Workshop2.jpg`
- `assets/img/von GFI/Team_und_Sonstiges/GFI-Baden_Gruppenbild.JPEG`
- `assets/img/von GFI/Team_und_Sonstiges/GFI-Rheinland_Gruppenbild.JPEG`
- `assets/img/von GFI/Team_und_Sonstiges/GPTW2024.jpg`
- `assets/img/von GFI/Team_und_Sonstiges/GPTW2026_1.jpg`
- `assets/img/von GFI/Team_und_Sonstiges/GPTW2026_2.jpg`
- `assets/img/von GFI/Team_und_Sonstiges/GPTW2026_3.jpg`
- `assets/img/von GFI/Team_und_Sonstiges/GPTW2026_4.jpg`
- `assets/img/von GFI/Team_und_Sonstiges/Inklusionstasche.jpg`
- `assets/img/von GFI/Team_und_Sonstiges/Leitungsteam_Rheinland.jpg`
- `assets/img/von GFI/Team_und_Sonstiges/Sonstiges.jpg`
- `assets/img/von GFI/Team_und_Sonstiges/Sonstiges2.jpg`
- `assets/img/von GFI/Team_und_Sonstiges/Sonstiges3.jpeg`
- `assets/img/von GFI/Team_und_Sonstiges/Team_Event_EscapeRoom.jpg`
- `assets/img/von GFI/Team_und_Sonstiges/Team_Event_Hochseilgarten1.JPG`
- `assets/img/von GFI/Team_und_Sonstiges/Team_Event_Hochseilgarten2.JPG`
- `assets/img/von GFI/Team_und_Sonstiges/Team_Event_Schwarzlichminigolf1.jpg`
- `assets/img/von GFI/Team_und_Sonstiges/Team_Event_Schwarzlichminigolf2.jpg`
- `assets/img/von GFI/Team_und_Sonstiges/Teamevent.jpeg`
- `assets/img/von GFI/Team_und_Sonstiges/Teamsitzung.jpg`
- `assets/img/von GFI/Team_und_Sonstiges/Teamsitzung2.jpg`
- `assets/img/Zitat.png`
