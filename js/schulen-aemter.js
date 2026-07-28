/* ============================================================
   GFI Baden – Unterseite „Für Schulen & Ämter“
   Seitenspezifische Interaktionen (vanilla JS, keine Bibliothek):
   1. Ansprechpartner-Finder
   2. Qualitätskarten (Accordion-Card-Hybrid)
   3. Formularvalidierung inkl. Erfolgs- und Fehlerzustand
   Globale Interaktionen (Header, Navigation, Reveals, FAQ-Accordion,
   Zurück-nach-oben) stammen unverändert aus js/main-v3.js.
   ============================================================ */
(function () {
  "use strict";

  /* Bestätigter zentraler Kontakt (Quelle: bestehende Projektseiten). */
  var CENTRAL = {
    phone: "0721/61930339",
    phoneHref: "tel:+4972161930339",
    email: "info@gfi-baden.de"
  };

  /* ------------------------------------------------------------
     DATEN ERGÄNZEN – regionale Ansprechpartner
     Im Projekt sind bislang keine personenbezogenen Daten je Region
     hinterlegt. Sobald Name, Funktion, Telefonnummer und E-Mail
     freigegeben sind, werden hier "name", "role", "phone",
     "phoneHref" und "email" gefüllt. Solange ein Feld null ist,
     zeigt der Finder einen gekennzeichneten Platzhalter und den
     bestätigten zentralen Kontakt.
     ------------------------------------------------------------ */
  var REGIONS = {
    "karlsruhe-stadt": {
      region: "Stadt Karlsruhe",
      area: "Schulen und Leistungsträger im Stadtgebiet Karlsruhe",
      name: null, role: null, phone: null, phoneHref: null, email: null
    },
    "karlsruhe-land": {
      region: "Landkreis Karlsruhe",
      area: "Schulen und Leistungsträger im Landkreis Karlsruhe",
      name: null, role: null, phone: null, phoneHref: null, email: null
    },
    "freiburg": {
      region: "Freiburg und Umgebung",
      area: "Schulen und Leistungsträger in Freiburg und den angrenzenden Kreisen",
      name: null, role: null, phone: null, phoneHref: null, email: null
    },
    "heilbronn": {
      region: "Heilbronn und Umgebung",
      area: "Schulen und Leistungsträger in Heilbronn und den angrenzenden Kreisen",
      name: null, role: null, phone: null, phoneHref: null, email: null
    },
    "rastatt": {
      region: "Rastatt, Landkreis Rastatt und Baden-Baden",
      area: "Schulen und Leistungsträger in Rastatt, im Landkreis Rastatt und in Baden-Baden",
      name: null, role: null, phone: null, phoneHref: null, email: null
    },
    "suedliche-weinstrasse": {
      region: "Südliche Weinstraße und Umgebung",
      area: "Schulen und Leistungsträger an der Südlichen Weinstraße und in der Umgebung",
      name: null, role: null, phone: null, phoneHref: null, email: null
    },
    "weitere": {
      region: "Weitere angrenzende Regionen",
      area: "Angrenzende Regionen außerhalb der oben genannten Gebiete",
      name: null, role: null, phone: null, phoneHref: null, email: null
    }
  };

  var esc = function (value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };

  /* Elemente, die durch das Motion-System aus main-v3.js ausgeblendet
     wurden, beim späteren Einblenden sichtbar schalten. */
  var revealWithin = function (root) {
    if (!root) return;
    if (root.hasAttribute && (root.hasAttribute("data-motion") || root.hasAttribute("data-motion-group"))) {
      root.classList.add("is-visible");
    }
    root.querySelectorAll("[data-motion], [data-motion-group]").forEach(function (el) {
      el.classList.add("is-visible");
    });
  };

  /* ============================================================
     1. ANSPRECHPARTNER-FINDER
     ============================================================ */
  (function initRegionFinder() {
    var select = document.getElementById("region-select");
    var result = document.getElementById("region-result");
    if (!select || !result) return;

    var renderEmpty = function () {
      result.innerHTML =
        '<p class="sa-finder-empty">Wählen Sie eine Region aus. Anschließend sehen Sie die zuständige ' +
        "Ansprechperson und die passenden nächsten Schritte.</p>";
    };

    var contactLine = function (icon, content) {
      return '<li><svg class="ico" aria-hidden="true"><use href="#' + icon + '"/></svg>' + content + "</li>";
    };

    var render = function (key) {
      var data = REGIONS[key];
      if (!data) {
        renderEmpty();
        return;
      }

      var hasPerson = !!data.name;
      var lines = "";

      if (data.phone) {
        lines += contactLine("i-phone", '<a href="' + esc(data.phoneHref || "#") + '">' + esc(data.phone) + "</a>");
      } else {
        lines += contactLine(
          "i-phone",
          '<span><a href="' + CENTRAL.phoneHref + '">' + CENTRAL.phone + "</a> " +
          '<span class="sa-person-pending">(zentrale Weiterleitung)</span></span>'
        );
      }

      if (data.email) {
        lines += contactLine("i-mail", '<a href="mailto:' + esc(data.email) + '">' + esc(data.email) + "</a>");
      } else {
        lines += contactLine(
          "i-mail",
          '<span><a href="mailto:' + CENTRAL.email + "?subject=" + encodeURIComponent("Anfrage " + data.region) + '">' +
          CENTRAL.email + "</a> " +
          '<span class="sa-person-pending">(zentrale Weiterleitung)</span></span>'
        );
      }

      var mailtoExisting =
        "mailto:" + CENTRAL.email +
        "?subject=" + encodeURIComponent("Bestehende Maßnahme – " + data.region);

      result.innerHTML =
        '<article class="sa-person">' +
          '<p class="sa-person-region"><svg class="ico" aria-hidden="true"><use href="#i-pin"/></svg>' + esc(data.region) + "</p>" +
          "<h3>" + (hasPerson ? esc(data.name) : "Ansprechperson wird ergänzt") + "</h3>" +
          '<p class="sa-person-role">' + (data.role ? esc(data.role) : "Regionale Fach- beziehungsweise Abteilungsleitung") + "</p>" +
          '<p class="sa-person-area">Zuständigkeitsgebiet: ' + esc(data.area) + "</p>" +
          '<ul class="sa-person-lines">' + lines + "</ul>" +
          '<div class="sa-person-actions">' +
            '<a class="btn btn-accent" href="#kooperation-anfragen"><span>Neue Anfrage stellen</span>' +
              '<svg class="ico"><use href="#i-arrow"/></svg></a>' +
            '<a class="btn btn-ghost" href="' + mailtoExisting + '"><span>Bestehende Maßnahme</span></a>' +
          "</div>" +
          (hasPerson
            ? ""
            : '<p class="sa-person-hint">Die namentliche Zuordnung für diese Region wird derzeit ergänzt. ' +
              "Ihre Anfrage erreicht uns über den zentralen Kontakt und wird intern an die zuständige Fachkraft weitergeleitet.</p>") +
        "</article>";

      revealWithin(result);
    };

    select.addEventListener("change", function () {
      if (!select.value) renderEmpty();
      else render(select.value);
    });

    /* Vorauswahl (z. B. nach Zurück-Navigation) berücksichtigen */
    if (select.value) render(select.value);
  })();

  /* ============================================================
     2. QUALITÄTSKARTEN – öffnen per Klick und Tastatur
     ============================================================ */
  (function initQualityCards() {
    var list = document.getElementById("quality-cards");
    if (!list) return;

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var heads = list.querySelectorAll(".sa-qcard-head");

    var close = function (card) {
      var head = card.querySelector(".sa-qcard-head");
      var detail = card.querySelector(".sa-qcard-detail");
      if (!head || !detail || !card.classList.contains("is-open")) return;
      detail.style.maxHeight = detail.scrollHeight + "px";
      void detail.offsetHeight;
      card.classList.remove("is-open");
      head.setAttribute("aria-expanded", "false");
      detail.style.maxHeight = "0px";
    };

    var open = function (card) {
      var head = card.querySelector(".sa-qcard-head");
      var detail = card.querySelector(".sa-qcard-detail");
      if (!head || !detail) return;
      card.classList.add("is-open");
      head.setAttribute("aria-expanded", "true");
      detail.style.maxHeight = detail.scrollHeight + "px";
      if (reduceMotion) return;
      var onEnd = function (e) {
        if (e.propertyName !== "max-height") return;
        detail.removeEventListener("transitionend", onEnd);
        if (card.classList.contains("is-open")) detail.style.maxHeight = "none";
      };
      detail.addEventListener("transitionend", onEnd);
    };

    heads.forEach(function (head) {
      var card = head.closest(".sa-qcard");
      var detail = card ? card.querySelector(".sa-qcard-detail") : null;
      if (!card || !detail) return;
      detail.style.maxHeight = "0px";

      head.addEventListener("click", function () {
        if (card.classList.contains("is-open")) close(card);
        else open(card);
      });
    });

    /* Höhen nach Größenänderung korrigieren (offene Karten) */
    window.addEventListener("resize", function () {
      list.querySelectorAll(".sa-qcard.is-open .sa-qcard-detail").forEach(function (detail) {
        detail.style.maxHeight = "none";
      });
    }, { passive: true });
  })();

  /* ============================================================
     3. FORMULAR – einstufig für Schulen & Ämter (niedrige Hürde)
     Zweistufige Variante bleibt für „Eltern & Angehörige“ vorgesehen.
     ============================================================ */
  (function initRequestForm() {
    var form = document.getElementById("kooperation-form");
    var successBox = document.getElementById("form-success");
    var errorBox = document.getElementById("form-error");
    if (!form) return;

    var emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    var phonePattern = /^[0-9 +()/.-]{6,}$/;

    var fieldWrap = function (input) {
      return input.closest(".sa-field") || input.closest(".sa-consent") || input.parentElement;
    };

    var errorNode = function (input) {
      var described = input.getAttribute("aria-describedby");
      if (!described) return null;
      var ids = described.split(/\s+/);
      for (var i = 0; i < ids.length; i++) {
        var node = document.getElementById(ids[i]);
        if (node && node.classList.contains("sa-field-error")) return node;
      }
      return null;
    };

    var setError = function (input, message) {
      var wrap = fieldWrap(input);
      var node = errorNode(input);
      if (wrap) wrap.classList.add("has-error");
      input.setAttribute("aria-invalid", "true");
      if (node) {
        node.textContent = message;
        node.hidden = false;
      }
    };

    var clearError = function (input) {
      var wrap = fieldWrap(input);
      var node = errorNode(input);
      if (wrap) wrap.classList.remove("has-error");
      input.removeAttribute("aria-invalid");
      if (node) {
        node.textContent = "";
        node.hidden = true;
      }
    };

    var validateField = function (input) {
      var value = (input.value || "").trim();

      if (input.type === "checkbox") {
        if (input.required && !input.checked) {
          setError(input, "Bitte bestätigen Sie die Datenschutzhinweise.");
          return false;
        }
        clearError(input);
        return true;
      }

      if (input.required && !value) {
        setError(input, input.tagName === "SELECT" ? "Bitte treffen Sie eine Auswahl." : "Bitte füllen Sie dieses Feld aus.");
        return false;
      }

      if (input.type === "email" && value && !emailPattern.test(value)) {
        setError(input, "Bitte geben Sie eine gültige E-Mail-Adresse an.");
        return false;
      }

      if (input.id === "f-plz" && value && !/^\d{5}$/.test(value)) {
        setError(input, "Bitte geben Sie eine fünfstellige Postleitzahl an.");
        return false;
      }

      if (input.type === "tel" && value && !phonePattern.test(value)) {
        setError(input, "Bitte geben Sie eine gültige Telefonnummer an.");
        return false;
      }

      clearError(input);
      return true;
    };

    var validateForm = function () {
      var firstInvalid = null;
      var fields = Array.prototype.slice.call(form.querySelectorAll("input, select, textarea"));
      fields.forEach(function (input) {
        if (!validateField(input) && !firstInvalid) firstInvalid = input;
      });
      return firstInvalid;
    };

    var fields = Array.prototype.slice.call(form.querySelectorAll("input, select, textarea"));

    fields.forEach(function (input) {
      var eventName = (input.type === "checkbox" || input.tagName === "SELECT") ? "change" : "blur";
      input.addEventListener(eventName, function () {
        if (input.hasAttribute("aria-invalid") || input.value) validateField(input);
      });
      input.addEventListener("input", function () {
        if (input.hasAttribute("aria-invalid")) validateField(input);
      });
    });

    var showFormError = function (message) {
      if (!errorBox) return;
      errorBox.textContent = message;
      errorBox.hidden = false;
    };

    var hideFormError = function () {
      if (!errorBox) return;
      errorBox.hidden = true;
      errorBox.textContent = "";
    };

    var showSuccess = function () {
      form.hidden = true;
      if (successBox) {
        successBox.hidden = false;
        revealWithin(successBox);
        if (typeof successBox.focus === "function") {
          successBox.setAttribute("tabindex", "-1");
          successBox.focus({ preventScroll: true });
        }
        successBox.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      hideFormError();

      var firstInvalid = validateForm();
      if (firstInvalid) {
        showFormError("Bitte prüfen Sie die markierten Felder. Anschließend können Sie die Anfrage übermitteln.");
        firstInvalid.focus();
        return;
      }

      var endpoint = form.getAttribute("data-endpoint");
      if (!endpoint) {
        showSuccess();
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      fetch(endpoint, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(form)
      })
        .then(function (response) {
          if (!response.ok) throw new Error("request-failed");
          showSuccess();
        })
        .catch(function () {
          showFormError(
            "Ihre Anfrage konnte gerade nicht übermittelt werden. Bitte versuchen Sie es erneut oder " +
            "erreichen Sie uns telefonisch unter " + CENTRAL.phone + "."
          );
        })
        .then(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  })();

  /* ------------------------------------------------------------
     Prozess-Timeline: alle Kacheln auf gleiche Höhe bringen
     ------------------------------------------------------------ */
  (function initTimelineHeights() {
    var items = document.querySelectorAll(".sa-timeline-item");
    if (!items.length) return;

    var equalize = function () {
      var max = 0;
      items.forEach(function (item) {
        item.style.minHeight = "";
        max = Math.max(max, item.offsetHeight);
      });
      items.forEach(function (item) {
        item.style.minHeight = max + "px";
      });
    };

    equalize();
    window.addEventListener("resize", equalize, { passive: true });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(equalize).catch(function () {});
    }
  })();
})();
