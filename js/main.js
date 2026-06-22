/* ============================================================
   GFI Baden – Homepage Interaktionen (vanilla JS, kein Framework)
   Loader, Sticky-Header, Mobile-Nav, Scroll-Reveals, Zähler,
   magnetische Buttons, Cursor-Ring,
   + Scroll-Parallax, horizontale Pin-Showcase, Pointer-Parallax, 3D-Tilt.
   Alles degradiert sauber & respektiert prefers-reduced-motion.
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var deskQuery = window.matchMedia("(min-width: 901px)");

  /* ---------- Loader ausblenden, danach Hero-Einblendung auf freiem Bild ---------- */
  var hero = document.getElementById("hero");
  var heroStarted = false;
  var startHero = function () {
    if (!heroStarted && hero) {
      heroStarted = true;
      hero.classList.add("is-in");
      hero.querySelectorAll(".motion-split").forEach(function (el) {
        el.classList.add("is-visible");
      });
    }
  };
  window.addEventListener("load", function () {
    var loader = document.getElementById("loader");
    if (reduceMotion) { if (loader) loader.classList.add("done"); startHero(); return; }
    var hideAt = 500;        // Loader beginnt zu verschwinden
    var heroAt = hideAt + 620; // Hero-Choreografie startet, sobald der Loader weg ist
    if (loader) setTimeout(function () { loader.classList.add("done"); }, hideAt);
    setTimeout(startHero, heroAt);
  });
  // Sicherheits-Fallback, falls das load-Event ausbleibt
  setTimeout(startHero, 3000);

  /* ---------- Mobile-Navigation ---------- */
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("main-nav");
  if (toggle && nav) {
    var setOpen = function (open) {
      nav.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
      document.body.style.overflow = open ? "hidden" : "";
    };
    toggle.addEventListener("click", function () { setOpen(!nav.classList.contains("open")); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) { setOpen(false); toggle.focus(); }
    });
  }

  /* ---------- Sticky-Header + Scroll-Progress ---------- */
  var header = document.getElementById("site-header");
  var bar = document.getElementById("progress-bar");
  var onScrollHeader = function () {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (header) header.classList.toggle("scrolled", y > 24);
    if (bar) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
  };
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* ============================================================
     MOTION-SYSTEM (Giveon-inspiriert)
     Überschriften: Buchstabe für Buchstabe von rechts
     Fließtext: von unten · Kacheln: gestaffelt von unten
     Bilder: von links / rechts
     ============================================================ */
  var splitChars = function (el) {
    if (el.dataset.charsReady) return;
    el.dataset.charsReady = "1";

    var wrapWord = function (word) {
      var wordEl = document.createElement("span");
      wordEl.className = "motion-word";
      for (var i = 0; i < word.length; i++) {
        var span = document.createElement("span");
        span.className = "motion-char";
        span.textContent = word[i];
        wordEl.appendChild(span);
      }
      return wordEl;
    };

    var appendSpace = function (frag, prevWord, nextWord) {
      /* Kurze Wörter (z. B. in, es, zu) mit dem Folgewort zusammenhalten */
      var bind = prevWord && prevWord.length <= 3 && nextWord;
      frag.appendChild(document.createTextNode(bind ? "\u00a0" : " "));
    };

    var walk = function (node) {
      if (node.nodeType === 3) {
        var text = node.textContent;
        if (!text) return;
        var frag = document.createDocumentFragment();
        var tokens = text.split(/\s+/).filter(function (t) { return t.length > 0; });
        for (var w = 0; w < tokens.length; w++) {
          if (w > 0) appendSpace(frag, tokens[w - 1], tokens[w]);
          frag.appendChild(wrapWord(tokens[w]));
        }
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === 1) {
        Array.prototype.slice.call(node.childNodes).forEach(walk);
      }
    };

    el.classList.add("motion-split");
    Array.prototype.slice.call(el.childNodes).forEach(walk);
    el.querySelectorAll(".motion-char").forEach(function (c, i) {
      c.style.setProperty("--char-i", i);
    });
  };

  var motionGroups = ".paths, .steps, .stats, .proof-grid, .news-grid, .values, .check-list, .final-actions";
  var motionSlides = ".intro-media, .career-media, .quality-media, .vc-photo, .sc-panel, .service-img, .frame-arch, .frame-soft";
  var motionRise = ".lead, .sec-lead, .hero-sub, .eyebrow, .value, .step h3, .step p, .path-card h3, .path-card p, .proof h3, .proof p, .news-card h3, .news-card p, .quote, .rating, .accordion, .final-contact, .process-cta, .microcopy, .showcase-hint, .statement-cta, .btn, .card-link, blockquote";

  var initMotion = function () {
    document.querySelectorAll("main h2, .statement-text").forEach(function (el) {
      if (el.closest("#hero")) return;
      el.setAttribute("data-motion", "chars");
    });

    document.querySelectorAll(motionRise).forEach(function (el) {
      if (!el.closest("#hero") && !el.closest(".site-header") && !el.dataset.motion) {
        el.setAttribute("data-motion", "rise");
      }
    });

    var slideIdx = 0;
    document.querySelectorAll(motionSlides).forEach(function (el) {
      if (!el.closest("#hero") && !el.dataset.motion) {
        el.setAttribute("data-motion", slideIdx % 2 === 0 ? "slide-left" : "slide-right");
        slideIdx++;
      }
    });

    document.querySelectorAll(motionGroups).forEach(function (group) {
      group.setAttribute("data-motion-group", "stagger");
      if (!group.dataset.stagger) group.dataset.stagger = "130";
      group.querySelectorAll(".reveal").forEach(function (c) { c.classList.remove("reveal"); });
      Array.prototype.forEach.call(group.children, function (child) {
        child.removeAttribute("data-motion");
      });
    });

    document.querySelectorAll(".reveal").forEach(function (el) {
      if (!el.dataset.motion) el.setAttribute("data-motion", "rise");
      el.classList.remove("reveal");
    });

    document.querySelectorAll('[data-motion="chars"]').forEach(splitChars);

    if (hero) {
      hero.querySelectorAll(".hero-title .line-in").forEach(function (line, li) {
        splitChars(line);
        line.style.setProperty("--motion-delay", (li * 180) + "ms");
      });
    }
  };

  initMotion();

  if (reduceMotion) {
    document.documentElement.classList.add("no-motion");
    document.querySelectorAll("[data-motion], [data-motion-group]").forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else if ("IntersectionObserver" in window) {
    var motionObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;

        if (el.hasAttribute("data-motion-group")) {
          el.classList.add("is-visible");
          var stagger = parseInt(el.dataset.stagger, 10) || 130;
          Array.prototype.forEach.call(el.children, function (child, i) {
            child.style.transitionDelay = (i * stagger) + "ms";
          });
        } else {
          el.classList.add("is-visible");
        }
        motionObs.unobserve(el);
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -2% 0px" });

    document.querySelectorAll("[data-motion], [data-motion-group]").forEach(function (el) {
      if (!el.closest("#hero")) motionObs.observe(el);
    });
  } else {
    document.querySelectorAll("[data-motion], [data-motion-group]").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- Zähler ---------- */
  var counters = document.querySelectorAll("[data-count]");
  var runCounter = function (el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduceMotion) { el.textContent = target + suffix; return; }
    var start = null, dur = 1400;
    var tick = function (t) {
      if (!start) start = t;
      var p = Math.min((t - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if (counters.length) {
    if (!("IntersectionObserver" in window)) {
      counters.forEach(runCounter);
    } else {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { runCounter(entry.target); cio.unobserve(entry.target); }
        });
      }, { threshold: 0.6 });
      counters.forEach(function (el) { cio.observe(el); });
    }
  }

  /* ============================================================
     SCROLL-ENGINE: Parallax + horizontale Pin-Showcase
     ============================================================ */
  var parallaxEls = reduceMotion ? [] : Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
  var showcase = document.getElementById("showcase");
  var track = document.getElementById("showcase-track");
  var scBar = document.getElementById("showcase-bar");
  var hpin = false;

  var evalHpin = function () {
    if (!showcase || !track) return;
    var want = deskQuery.matches && !reduceMotion;
    if (want === hpin) return;
    hpin = want;
    showcase.classList.toggle("no-hpin", !hpin);
    if (!hpin) { track.style.transform = ""; if (scBar) scBar.style.width = ""; }
  };
  evalHpin();

  var clamp = function (v, min, max) { return v < min ? min : (v > max ? max : v); };
  var scrollTicking = false;
  var renderScroll = function () {
    scrollTicking = false;
    var vh = window.innerHeight;

    for (var i = 0; i < parallaxEls.length; i++) {
      var el = parallaxEls[i];
      var speed = parseFloat(el.getAttribute("data-parallax")) || 0;
      var r = el.getBoundingClientRect();
      var offset = (r.top + r.height / 2) - vh / 2;
      el.style.transform = "translate3d(0," + (-offset * speed).toFixed(1) + "px,0)";
    }

    if (hpin && showcase && track) {
      var rect = showcase.getBoundingClientRect();
      var total = showcase.offsetHeight - vh;
      var prog = clamp(-rect.top, 0, total);
      var p = total > 0 ? prog / total : 0;
      var maxX = track.scrollWidth - track.clientWidth;
      track.style.transform = "translate3d(" + (-p * maxX).toFixed(1) + "px,0,0)";
      if (scBar) scBar.style.width = (p * 100).toFixed(1) + "%";
    }
  };
  var onScrollEngine = function () {
    if (!scrollTicking) { scrollTicking = true; requestAnimationFrame(renderScroll); }
  };
  if (parallaxEls.length || showcase) {
    window.addEventListener("scroll", onScrollEngine, { passive: true });
    window.addEventListener("resize", function () { evalHpin(); onScrollEngine(); });
    if (deskQuery.addEventListener) deskQuery.addEventListener("change", function () { evalHpin(); onScrollEngine(); });
    renderScroll();
  }

  /* ============================================================
     POINTER-PARALLAX (data-depth) + 3D-TILT (data-tilt)
     ============================================================ */
  if (finePointer && !reduceMotion) {
    var depthEls = Array.prototype.slice.call(document.querySelectorAll("[data-depth]"));
    if (depthEls.length) {
      var dTicking = false, mx = 0, my = 0;
      var renderDepth = function () {
        dTicking = false;
        for (var i = 0; i < depthEls.length; i++) {
          var d = parseFloat(depthEls[i].getAttribute("data-depth")) || 0;
          depthEls[i].style.transform = "translate3d(" + (mx * d).toFixed(1) + "px," + (my * d).toFixed(1) + "px,0)";
        }
      };
      window.addEventListener("mousemove", function (e) {
        mx = (e.clientX / window.innerWidth) - 0.5;
        my = (e.clientY / window.innerHeight) - 0.5;
        if (!dTicking) { dTicking = true; requestAnimationFrame(renderDepth); }
      }, { passive: true });
    }

    document.querySelectorAll("[data-tilt]").forEach(function (el) {
      var raf = null;
      el.addEventListener("mousemove", function (e) {
        if (raf) return;
        raf = requestAnimationFrame(function () {
          raf = null;
          var r = el.getBoundingClientRect();
          var px = (e.clientX - r.left) / r.width - 0.5;
          var py = (e.clientY - r.top) / r.height - 0.5;
          el.style.transform = "perspective(820px) rotateX(" + (-py * 6).toFixed(2) + "deg) rotateY(" + (px * 8).toFixed(2) + "deg)";
        });
      });
      el.addEventListener("mouseleave", function () {
        el.style.transition = "transform .45s var(--ease)";
        el.style.transform = "perspective(820px) rotateX(0deg) rotateY(0deg)";
        setTimeout(function () { el.style.transition = ""; }, 460);
      });
    });
  }

  /* ============================================================
     Magnetische Buttons + Cursor-Ring (Desktop, keine reduced-motion)
     ============================================================ */
  if (finePointer && !reduceMotion) {
    var ring = document.querySelector(".cursor-ring");
    if (ring) {
      var rx = 0, ry = 0, tx = 0, ty = 0, active = false;
      window.addEventListener("mousemove", function (e) {
        tx = e.clientX; ty = e.clientY;
        if (!active) { active = true; ring.classList.add("active"); }
      });
      var loop = function () {
        rx += (tx - rx) * 0.18; ry += (ty - ry) * 0.18;
        ring.style.transform = "translate(" + rx + "px," + ry + "px) translate(-50%,-50%)";
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
      document.querySelectorAll("a, button, summary, [data-magnetic]").forEach(function (el) {
        el.addEventListener("mouseenter", function () { ring.classList.add("hover"); });
        el.addEventListener("mouseleave", function () { ring.classList.remove("hover"); });
      });
    }
  }

  /* ---------- Jahr im Footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
