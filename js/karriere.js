/* ============================================================
   GFI Baden – Karriere
   Bewerbungsformular + Lite-YouTube. Globale Interaktionen: main-v3.js
   ============================================================ */
(function () {
  "use strict";

  var CENTRAL = {
    phone: "0721/61930339",
    phoneHref: "tel:+4972161930339",
    email: "info@gfi-baden.de"
  };

  /* YouTube erst bei Klick laden – spart Hauptthread/Netzwerk beim Scrollen */
  (function initLiteVideos() {
    document.querySelectorAll(".ka-video[data-yt]").forEach(function (wrap) {
      var id = wrap.getAttribute("data-yt");
      if (!id) return;
      var btn = wrap.querySelector(".ka-video-play");
      if (!btn) return;

      var load = function () {
        if (wrap.classList.contains("is-playing")) return;
        wrap.classList.add("is-playing");
        var iframe = document.createElement("iframe");
        iframe.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id) + "?autoplay=1&rel=0";
        iframe.title = wrap.getAttribute("data-yt-title") || "Video";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        iframe.allowFullscreen = true;
        iframe.setAttribute("allowfullscreen", "");
        wrap.appendChild(iframe);
        btn.remove();
      };

      btn.addEventListener("click", load);
    });
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

  (function initRequestForms() {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    var phonePattern = /^[0-9 +()/.-]{6,}$/;

    var bindForm = function (form, successBox, errorBox) {
      if (!form) return;

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

        if (input.type === "file") {
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
        fields.forEach(function (input) {
          if (!validateField(input) && !firstInvalid) firstInvalid = input;
        });
        return firstInvalid;
      };

      var fields = Array.prototype.slice.call(form.querySelectorAll("input, select, textarea"));

      fields.forEach(function (input) {
        var eventName = (input.type === "checkbox" || input.tagName === "SELECT" || input.type === "file") ? "change" : "blur";
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
          showFormError("Bitte prüfen Sie die markierten Felder. Anschließend können Sie die Bewerbung übermitteln.");
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
          headers: { Accept: "application/json" },
          body: new FormData(form)
        })
          .then(function (response) {
            if (!response.ok) throw new Error("request-failed");
            showSuccess();
          })
          .catch(function () {
            showFormError(
              "Ihre Bewerbung konnte gerade nicht übermittelt werden. Bitte versuchen Sie es erneut oder " +
              "erreichen Sie uns telefonisch unter " + CENTRAL.phone + "."
            );
          })
          .then(function () {
            if (submitBtn) submitBtn.disabled = false;
          });
      });
    };

    bindForm(
      document.getElementById("karriere-form"),
      document.getElementById("form-success"),
      document.getElementById("form-error")
    );
  })();

  /* Bild-Slideshow (z. B. Arbeitstag) */
  (function initSliders() {
    document.querySelectorAll("[data-ka-slider]").forEach(function (root) {
      var slides = Array.prototype.slice.call(root.querySelectorAll(".ka-day-slide"));
      if (slides.length < 2) return;

      var dotsHost = root.querySelector("[data-ka-slider-dots]");
      var prevBtn = root.querySelector("[data-ka-slider-prev]");
      var nextBtn = root.querySelector("[data-ka-slider-next]");
      var index = Math.max(0, slides.findIndex(function (s) { return s.classList.contains("is-active"); }));
      var timer = null;
      var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      var renderDots = function () {
        if (!dotsHost) return;
        dotsHost.innerHTML = "";
        slides.forEach(function (_, i) {
          var dot = document.createElement("button");
          dot.type = "button";
          dot.className = "ka-day-slider-dot" + (i === index ? " is-active" : "");
          dot.setAttribute("aria-label", "Bild " + (i + 1) + " von " + slides.length);
          dot.setAttribute("aria-current", i === index ? "true" : "false");
          dot.addEventListener("click", function () { goTo(i, true); });
          dotsHost.appendChild(dot);
        });
      };

      var goTo = function (next, user) {
        index = (next + slides.length) % slides.length;
        slides.forEach(function (slide, i) {
          slide.classList.toggle("is-active", i === index);
        });
        renderDots();
        if (user) restart();
      };

      var stop = function () {
        if (timer) {
          clearInterval(timer);
          timer = null;
        }
      };

      var start = function () {
        if (reduceMotion) return;
        stop();
        timer = setInterval(function () { goTo(index + 1, false); }, 4500);
      };

      var restart = function () {
        stop();
        start();
      };

      if (prevBtn) prevBtn.addEventListener("click", function () { goTo(index - 1, true); });
      if (nextBtn) nextBtn.addEventListener("click", function () { goTo(index + 1, true); });

      root.addEventListener("mouseenter", stop);
      root.addEventListener("mouseleave", start);
      root.addEventListener("focusin", stop);
      root.addEventListener("focusout", function (e) {
        if (!root.contains(e.relatedTarget)) start();
      });

      renderDots();
      start();
    });
  })();

  /* Lightbox für freistehende Karriere-Bilder */
  (function initLightbox() {
    var triggers = document.querySelectorAll("[data-ka-lightbox]");
    if (!triggers.length) return;

    var dialog = document.createElement("dialog");
    dialog.className = "ka-lightbox";
    dialog.setAttribute("aria-label", "Bildansicht");
    dialog.innerHTML =
      '<div class="ka-lightbox-inner">' +
        '<button type="button" class="ka-lightbox-close" aria-label="Schließen">' +
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>' +
        "</button>" +
        '<img class="ka-lightbox-img" alt="" />' +
      "</div>";
    document.body.appendChild(dialog);

    var img = dialog.querySelector(".ka-lightbox-img");
    var closeBtn = dialog.querySelector(".ka-lightbox-close");
    var lastFocus = null;

    var open = function (trigger) {
      var thumb = trigger.querySelector("img");
      if (!thumb) return;
      lastFocus = trigger;
      img.src = thumb.currentSrc || thumb.src;
      img.alt = thumb.alt || "";
      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        dialog.setAttribute("open", "");
      }
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    };

    var close = function () {
      if (dialog.open) dialog.close();
      else dialog.removeAttribute("open");
      document.body.style.overflow = "";
      if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
      lastFocus = null;
    };

    triggers.forEach(function (btn) {
      btn.addEventListener("click", function () { open(btn); });
    });

    closeBtn.addEventListener("click", close);
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) close();
    });
    dialog.addEventListener("cancel", function (e) {
      e.preventDefault();
      close();
    });
    dialog.addEventListener("close", function () {
      document.body.style.overflow = "";
      img.removeAttribute("src");
    });
  })();
})();
