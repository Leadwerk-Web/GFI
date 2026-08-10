/* ============================================================
   GFI Baden – Unterseite „Über uns“
   Standortkarte + Qualitäts-Akkordeon. Globale Interaktionen: main-v3.js
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Qualitäts-Akkordeon (wie Schulen-Seite) ---------- */
  (function initQualityAccordion() {
    var list = document.querySelector(".uu-quality .sa-qgrid");
    if (!list) return;

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var heads = list.querySelectorAll(".sa-qcard-head");

    var closeCard = function (card) {
      var head = card.querySelector(".sa-qcard-head");
      var detail = card.querySelector(".sa-qcard-detail");
      if (!head || !detail || !card.classList.contains("is-open")) return;
      detail.style.maxHeight = detail.scrollHeight + "px";
      void detail.offsetHeight;
      card.classList.remove("is-open");
      head.setAttribute("aria-expanded", "false");
      detail.style.maxHeight = "0px";
    };

    var openCard = function (card) {
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

      if (card.classList.contains("is-open")) {
        detail.style.maxHeight = "none";
        head.setAttribute("aria-expanded", "true");
      } else {
        detail.style.maxHeight = "0px";
        head.setAttribute("aria-expanded", "false");
      }

      head.addEventListener("click", function () {
        if (card.classList.contains("is-open")) closeCard(card);
        else openCard(card);
      });
    });

    window.addEventListener("resize", function () {
      list.querySelectorAll(".sa-qcard.is-open .sa-qcard-detail").forEach(function (detail) {
        detail.style.maxHeight = "none";
      });
    }, { passive: true });
  })();

  /* ---------- Standortkarte ---------- */
  (function initLocationsMap() {
    var root = document.getElementById("uu-locations");
    if (!root) return;

    var pins = root.querySelectorAll(".uu-pin");
    var chips = root.querySelectorAll(".uu-loc-chip");
    var card = document.getElementById("uu-loc-card");
    if (!card || !pins.length) return;

    var titleEl = card.querySelector("[data-loc-title]");
    var regionEl = card.querySelector("[data-loc-region]");
    var textEl = card.querySelector("[data-loc-text]");
    var addressEl = card.querySelector("[data-loc-address]");
    var phoneWrap = card.querySelector("[data-loc-phone-wrap]");
    var phoneEl = card.querySelector("[data-loc-phone]");
    var linkEl = card.querySelector("[data-loc-link]");
    var emptyEls = card.querySelectorAll("[data-loc-empty]");
    var filledEls = card.querySelectorAll("[data-loc-filled]");

    var setActive = function (id) {
      pins.forEach(function (pin) {
        pin.classList.toggle("is-active", pin.getAttribute("data-loc") === id);
      });
      chips.forEach(function (chip) {
        chip.classList.toggle("is-active", chip.getAttribute("data-loc") === id);
      });
    };

    var showLocation = function (pin) {
      if (!pin) return;
      var id = pin.getAttribute("data-loc");
      var title = pin.getAttribute("data-title") || "";
      var region = pin.getAttribute("data-region") || "";
      var text = pin.getAttribute("data-text") || "";
      var address = pin.getAttribute("data-address") || "";
      var phone = pin.getAttribute("data-phone") || "";
      var phoneHref = pin.getAttribute("data-phone-href") || "";
      var href = pin.getAttribute("data-href") || "";

      setActive(id);
      card.classList.add("is-filled");

      emptyEls.forEach(function (el) { el.hidden = true; });
      filledEls.forEach(function (el) { el.hidden = false; });

      if (titleEl) titleEl.textContent = title;
      if (regionEl) regionEl.textContent = region;
      if (textEl) textEl.textContent = text;

      if (addressEl) {
        addressEl.hidden = !address;
        var addressText = addressEl.querySelector("span");
        if (addressText) addressText.textContent = address;
      }

      if (phoneWrap && phoneEl) {
        if (phone && phoneHref) {
          phoneWrap.hidden = false;
          phoneEl.href = phoneHref;
          phoneEl.textContent = phone;
        } else {
          phoneWrap.hidden = true;
        }
      }

      if (linkEl) {
        if (href) {
          linkEl.hidden = false;
          linkEl.href = href;
          if (href.indexOf("http") === 0) {
            linkEl.setAttribute("target", "_blank");
            linkEl.setAttribute("rel", "noopener noreferrer");
          } else {
            linkEl.removeAttribute("target");
            linkEl.removeAttribute("rel");
          }
        } else {
          linkEl.hidden = true;
        }
      }
    };

    pins.forEach(function (pin) {
      pin.addEventListener("click", function () { showLocation(pin); });
      pin.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          showLocation(pin);
        }
      });
    });

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var id = chip.getAttribute("data-loc");
        var pin = root.querySelector('.uu-pin[data-loc="' + id + '"]');
        if (pin) showLocation(pin);
      });
    });

    /* Default: Karlsruhe (GFI Baden) */
    var defaultPin = root.querySelector('.uu-pin[data-loc="karlsruhe"]') || pins[0];
    showLocation(defaultPin);
  })();
})();
