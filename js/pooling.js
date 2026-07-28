/* ============================================================
   GFI Baden – Unterseite „Pooling“
   Seitenspezifische Interaktionen (vanilla JS):
   1. Tracking-Events (dataLayer-ready)
   2. FAQ (button, aria-expanded, Höhenanimation)
   3. Netzwerk-/Prozess-/Stufen-Reveals
   4. Formularvalidierung (ohne Schein-Übermittlung)
   Globale Interaktionen bleiben in js/main-v3.js.
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var CENTRAL = {
    phone: "0721/61930339",
    phoneHref: "tel:+4972161930339",
    email: "info@gfi-baden.de"
  };

  /* ------------------------------------------------------------
     TRACKING – keine personenbezogenen Formularinhalte
     ------------------------------------------------------------ */
  var track = function (eventName, payload) {
    if (!eventName) return;
    var data = payload && typeof payload === "object" ? payload : {};
    var entry = { event: eventName };
    Object.keys(data).forEach(function (key) {
      entry[key] = data[key];
    });
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(entry);
    try {
      document.dispatchEvent(new CustomEvent("gfi:track", { detail: entry }));
    } catch (e) { /* ignore */ }
  };

  (function initClickTracking() {
    document.addEventListener("click", function (e) {
      var el = e.target.closest("[data-track]");
      if (!el) return;
      track(el.getAttribute("data-track"), {
        href: el.getAttribute("href") || null,
        label: (el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80)
      });
    });
  })();

  (function initViewTracking() {
    var nodes = document.querySelectorAll("[data-track-view]");
    if (!nodes.length || !("IntersectionObserver" in window)) return;
    var seen = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var name = entry.target.getAttribute("data-track-view");
        if (!name || seen[name]) return;
        seen[name] = true;
        track(name);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.35 });
    nodes.forEach(function (node) { io.observe(node); });
  })();

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
     FAQ – barrierefreie Buttons
     ============================================================ */
  (function initPoolingFaq() {
    var list = document.getElementById("pl-faq-list");
    if (!list) return;

    var items = Array.prototype.slice.call(list.querySelectorAll(".pl-faq-item"));

    var setPanelOpen = function (item, open) {
      var btn = item.querySelector(".pl-faq-btn");
      var panel = item.querySelector(".pl-faq-panel");
      if (!btn || !panel) return;

      if (open) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
        panel.hidden = false;
        panel.style.maxHeight = "0px";
        void panel.offsetHeight;
        panel.style.maxHeight = panel.scrollHeight + "px";
        if (reduceMotion) {
          panel.style.maxHeight = "none";
          return;
        }
        var onEnd = function (e) {
          if (e.propertyName !== "max-height") return;
          panel.removeEventListener("transitionend", onEnd);
          if (item.classList.contains("is-open")) panel.style.maxHeight = "none";
        };
        panel.addEventListener("transitionend", onEnd);
      } else {
        if (!item.classList.contains("is-open")) return;
        panel.style.maxHeight = panel.scrollHeight + "px";
        void panel.offsetHeight;
        item.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
        panel.style.maxHeight = "0px";
        var finish = function () {
          panel.hidden = true;
        };
        if (reduceMotion) {
          finish();
          return;
        }
        var onClose = function (e) {
          if (e.propertyName !== "max-height") return;
          panel.removeEventListener("transitionend", onClose);
          finish();
        };
        panel.addEventListener("transitionend", onClose);
      }
    };

    items.forEach(function (item, index) {
      var btn = item.querySelector(".pl-faq-btn");
      var panel = item.querySelector(".pl-faq-panel");
      if (!btn || !panel) return;

      if (index === 0 || btn.getAttribute("aria-expanded") === "true") {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
        panel.hidden = false;
        panel.style.maxHeight = "none";
      } else {
        item.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
        panel.hidden = true;
        panel.style.maxHeight = "0px";
      }

      btn.addEventListener("click", function () {
        var willOpen = !item.classList.contains("is-open");
        items.forEach(function (other) {
          if (other !== item) setPanelOpen(other, false);
        });
        setPanelOpen(item, willOpen);
        if (willOpen) {
          track("pooling_faq_open", {
            question: (btn.querySelector(".pl-faq-q") || btn).textContent.replace(/\s+/g, " ").trim().slice(0, 120)
          });
        }
      });
    });

    window.addEventListener("resize", function () {
      list.querySelectorAll(".pl-faq-item.is-open .pl-faq-panel").forEach(function (panel) {
        panel.style.maxHeight = "none";
      });
    }, { passive: true });
  })();

  /* ============================================================
     SCROLL-REVEALS: Netzwerk, Stufen, Prozess, Rollen
     ============================================================ */
  (function initScrollExplainer() {
    var observeOnce = function (el, className) {
      if (!el) return;
      if (reduceMotion || !("IntersectionObserver" in window)) {
        el.classList.add(className || "is-active");
        return;
      }
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          el.classList.add(className || "is-active");
          io.unobserve(el);
        });
      }, { threshold: 0.28, rootMargin: "0px 0px -8% 0px" });
      io.observe(el);
    };

    observeOnce(document.getElementById("pl-network"), "is-active");
    observeOnce(document.querySelector("[data-pl-roles]"), "is-active");

    var stagesRoot = document.getElementById("pl-stages");
    if (stagesRoot) {
      var stages = Array.prototype.slice.call(stagesRoot.querySelectorAll(".pl-stage"));
      if (reduceMotion || !("IntersectionObserver" in window)) {
        stages.forEach(function (stage) { stage.classList.add("is-in"); });
      } else {
        var stageIo = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var stage = entry.target;
            var idx = stages.indexOf(stage);
            stage.classList.add("is-in");
            if (idx >= 0 && stages[idx + 1]) {
              window.setTimeout(function () {
                stages[idx + 1].classList.add("is-in");
              }, 180);
            }
            stageIo.unobserve(stage);
          });
        }, { threshold: 0.35 });
        stages.forEach(function (stage) { stageIo.observe(stage); });
      }
    }

    var processTrack = document.getElementById("pl-process-track");
    if (processTrack) {
      var steps = Array.prototype.slice.call(processTrack.querySelectorAll(".pl-process-step"));
      if (reduceMotion || !("IntersectionObserver" in window)) {
        processTrack.classList.add("is-drawn");
        steps.forEach(function (step) { step.classList.add("is-active"); });
      } else {
        var processIo = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            var ratio = entry.intersectionRatio;
            if (ratio > 0.2) processTrack.classList.add("is-drawn");
            if (!entry.isIntersecting) return;
            var step = entry.target;
            steps.forEach(function (s) { s.classList.remove("is-active"); });
            step.classList.add("is-active");
          });
        }, { threshold: [0.35, 0.55, 0.75] });
        steps.forEach(function (step) { processIo.observe(step); });
        observeOnce(processTrack, "is-drawn");
      }
    }
  })();

  /* ============================================================
     FORMULAR
     ============================================================ */
  (function initPoolingForm() {
    var form = document.getElementById("pooling-form");
    var successBox = document.getElementById("pooling-form-success");
    var errorBox = document.getElementById("pooling-form-error");
    if (!form) return;

    var emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    var phonePattern = /^[0-9 +()/.-]{6,}$/;
    var started = false;

    var fieldWrap = function (input) {
      return input.closest(".sa-field") || input.closest(".sa-consent") || input.closest(".sa-fieldset") || input.parentElement;
    };

    var errorNode = function (input) {
      if (input.name === "kontaktweg") return document.getElementById("pf-kontakt-error");
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
      if (input.type !== "radio") input.setAttribute("aria-invalid", "true");
      if (node) {
        node.textContent = message;
        node.hidden = false;
      }
    };

    var clearError = function (input) {
      var wrap = fieldWrap(input);
      var node = errorNode(input);
      if (wrap) wrap.classList.remove("has-error");
      if (input.type !== "radio") input.removeAttribute("aria-invalid");
      if (node) {
        node.textContent = "";
        node.hidden = true;
      }
    };

    var validateKontaktweg = function () {
      var checked = form.querySelector('input[name="kontaktweg"]:checked');
      var first = form.querySelector('input[name="kontaktweg"]');
      if (!checked) {
        if (first) setError(first, "Bitte wählen Sie einen bevorzugten Kontaktweg.");
        return false;
      }
      if (first) clearError(first);
      return true;
    };

    var validateField = function (input) {
      if (input.name === "kontaktweg") return validateKontaktweg();

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
      var seenRadio = false;
      fields.forEach(function (input) {
        if (input.name === "kontaktweg") {
          if (seenRadio) return;
          seenRadio = true;
        }
        if (!validateField(input) && !firstInvalid) {
          firstInvalid = input.nameAttribute("type") === "radio"
            ? form.querySelector('input[name="kontaktweg"]')
            : input;
        }
      });
      return firstInvalid;
    };

    var fields = Array.prototype.slice.call(form.querySelectorAll("input, select, textarea"));
    fields.forEach(function (input) {
      var eventName = (input.type === "checkbox" || input.type === "radio" || input.tagName === "SELECT") ? "change" : "blur";
      input.addEventListener(eventName, function () {
        if (input.hasAttribute("aria-invalid") || input.value || input.type === "radio" || input.type === "checkbox") {
          validateField(input);
        }
      });
      input.addEventListener("input", function () {
        if (!started) {
          started = true;
          track("pooling_form_start");
        }
        if (input.hasAttribute("aria-invalid")) validateField(input);
      });
      input.addEventListener("focus", function () {
        if (!started) {
          started = true;
          track("pooling_form_start");
        }
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

    var showPreparedState = function () {
      form.hidden = true;
      if (successBox) {
        successBox.hidden = false;
        revealWithin(successBox);
        if (typeof successBox.focus === "function") {
          successBox.setAttribute("tabindex", "-1");
          successBox.focus({ preventScroll: true });
        }
        successBox.scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" });
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

      track("pooling_form_submit", { status: "validated" });

      var endpoint = form.getAttribute("data-endpoint");
      if (!endpoint) {
        /* Keine Schein-Übermittlung: klarer Hinweis + Alternativkontakt */
        showPreparedState();
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
          track("pooling_form_submit", { status: "sent" });
          form.hidden = true;
          if (successBox) {
            successBox.hidden = false;
            successBox.querySelector("h3").textContent = "Vielen Dank für Ihre Anfrage.";
            successBox.querySelector("p").textContent =
              "Wir prüfen die regionale und fachliche Zuständigkeit und melden uns mit den nächsten Schritten.";
            revealWithin(successBox);
          }
        })
        .catch(function () {
          showFormError(
            "Ihre Anfrage konnte gerade nicht übermittelt werden. Bitte versuchen Sie es erneut oder " +
            "erreichen Sie uns telefonisch unter " + CENTRAL.phone + "."
          );
          track("pooling_form_submit", { status: "error" });
        })
        .then(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  })();
})();
