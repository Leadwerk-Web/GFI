/* ============================================================
   GFI – Standort-Unterseiten
   Formularvalidierung (einstufig). Globale Interaktionen: main-v3.js
   ============================================================ */
(function () {
  "use strict";

  var contactPhone = function (form) {
    return (form && form.getAttribute("data-phone")) || "";
  };

  var revealWithin = function (root) {
    if (!root) return;
    if (root.hasAttribute && (root.hasAttribute("data-motion") || root.hasAttribute("data-motion-group"))) {
      root.classList.add("is-visible");
    }
    root.querySelectorAll("[data-motion], [data-motion-group]").forEach(function (el) {
      el.classList.add("is-visible");
    });
  };

  (function initRequestForm() {
    var form = document.getElementById("standort-form");
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
        headers: { Accept: "application/json" },
        body: new FormData(form)
      })
        .then(function (response) {
          if (!response.ok) throw new Error("request-failed");
          showSuccess();
        })
        .catch(function () {
          var phone = contactPhone(form);
          showFormError(
            "Ihre Anfrage konnte gerade nicht übermittelt werden. Bitte versuchen Sie es erneut" +
            (phone ? " oder erreichen Sie uns telefonisch unter " + phone + "." : ".")
          );
        })
        .then(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  })();
})();
