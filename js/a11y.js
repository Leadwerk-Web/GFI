(function () {
  "use strict";

  var a11yKey = "gfi-a11y";
  var a11yRoot = document.documentElement;
  var a11yWidget = document.getElementById("a11yWidget");
  var a11yToggle = document.getElementById("a11yToggle");
  var a11yPanel = document.getElementById("a11yPanel");
  var a11yClose = document.getElementById("a11yClose");
  var a11yReset = document.getElementById("a11yReset");
  var a11yFontBtns = document.querySelectorAll(".a11y__font-btn");
  var a11yContrast = document.getElementById("a11yContrast");
  var a11yUnderline = document.getElementById("a11yUnderline");
  var a11yMotion = document.getElementById("a11yMotion");
  var a11yLineHeight = document.getElementById("a11yLineHeight");

  if (!a11yWidget || !a11yToggle || !a11yPanel) return;

  var defaultA11y = {
    font: "normal",
    contrast: false,
    underline: false,
    motion: false,
    lineHeight: false
  };

  var a11yFontScales = { normal: 1, sm: 0.875, lg: 1.125, xl: 1.25 };

  function applyFontScale(font) {
    var scale = a11yFontScales[font] || 1;
    if (scale === 1) {
      a11yRoot.removeAttribute("data-a11y-font");
      a11yRoot.style.zoom = "";
      a11yRoot.style.fontSize = "";
      return;
    }
    a11yRoot.setAttribute("data-a11y-font", font);
    a11yRoot.style.zoom = scale;
    a11yRoot.style.fontSize = "";
  }

  function loadA11y() {
    try {
      return Object.assign({}, defaultA11y, JSON.parse(localStorage.getItem(a11yKey) || "{}"));
    } catch (e) {
      return Object.assign({}, defaultA11y);
    }
  }

  function saveA11y(settings) {
    try {
      localStorage.setItem(a11yKey, JSON.stringify(settings));
    } catch (e) {}
  }

  function applyA11y(settings) {
    applyFontScale(settings.font || "normal");
    a11yRoot.classList.toggle("a11y-contrast", settings.contrast);
    a11yRoot.classList.toggle("a11y-underline-links", settings.underline);
    a11yRoot.classList.toggle("a11y-reduced-motion", settings.motion);
    a11yRoot.classList.toggle("a11y-line-height", settings.lineHeight);
  }

  function syncA11yUI(settings) {
    a11yFontBtns.forEach(function (btn) {
      var active = btn.getAttribute("data-a11y-font") === settings.font;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
    if (a11yContrast) a11yContrast.setAttribute("aria-pressed", settings.contrast ? "true" : "false");
    if (a11yUnderline) a11yUnderline.setAttribute("aria-pressed", settings.underline ? "true" : "false");
    if (a11yMotion) a11yMotion.setAttribute("aria-pressed", settings.motion ? "true" : "false");
    if (a11yLineHeight) a11yLineHeight.setAttribute("aria-pressed", settings.lineHeight ? "true" : "false");
  }

  var a11ySettings = loadA11y();
  applyA11y(a11ySettings);
  syncA11yUI(a11ySettings);

  function openA11y() {
    a11yPanel.hidden = false;
    a11yWidget.classList.add("is-open");
    a11yToggle.setAttribute("aria-expanded", "true");
    a11yToggle.setAttribute("aria-label", "Barrierefreiheit schließen");
    if (a11yClose) a11yClose.focus();
  }

  function closeA11y() {
    a11yPanel.hidden = true;
    a11yWidget.classList.remove("is-open");
    a11yToggle.setAttribute("aria-expanded", "false");
    a11yToggle.setAttribute("aria-label", "Barrierefreiheit öffnen");
    a11yToggle.focus();
  }

  a11yToggle.addEventListener("click", function () {
    a11yPanel.hidden ? openA11y() : closeA11y();
  });

  if (a11yClose) a11yClose.addEventListener("click", closeA11y);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !a11yPanel.hidden) closeA11y();
  });

  document.addEventListener("click", function (e) {
    if (a11yPanel.hidden) return;
    if (!a11yWidget.contains(e.target)) closeA11y();
  });

  a11yFontBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      a11ySettings.font = btn.getAttribute("data-a11y-font");
      applyA11y(a11ySettings);
      syncA11yUI(a11ySettings);
      saveA11y(a11ySettings);
    });
  });

  function bindA11yToggle(el, key) {
    if (!el) return;
    el.addEventListener("click", function () {
      a11ySettings[key] = !a11ySettings[key];
      applyA11y(a11ySettings);
      syncA11yUI(a11ySettings);
      saveA11y(a11ySettings);
    });
  }

  bindA11yToggle(a11yContrast, "contrast");
  bindA11yToggle(a11yUnderline, "underline");
  bindA11yToggle(a11yMotion, "motion");
  bindA11yToggle(a11yLineHeight, "lineHeight");

  if (a11yReset) {
    a11yReset.addEventListener("click", function () {
      a11ySettings = Object.assign({}, defaultA11y);
      applyA11y(a11ySettings);
      syncA11yUI(a11ySettings);
      localStorage.removeItem(a11yKey);
    });
  }
})();
