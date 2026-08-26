/* ============================================================
   GFI Baden – Homepage V3 Interaktionen (vanilla JS, kein Framework)
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
  var isLocalFile = location.protocol === "file:";
  /* Content-Seiten: natives Scrollen + weniger Dauereffekte (Parallax/Cursor).
     Motion-Reveals bleiben aktiv – nur das träge Wheel-Lerp wird abgeschaltet. */
  var lightPerfPage = document.documentElement.classList.contains("page-schulen")
    || document.documentElement.classList.contains("page-karriere");
  if (isLocalFile) document.documentElement.classList.add("is-local-file");
  if (lightPerfPage) document.documentElement.classList.add("is-light-perf");

  /* ---------- Loader ausblenden, danach Hero-Einblendung auf freiem Bild ---------- */
  var hero = document.getElementById("hero");
  var heroStarted = false;
  var startHero = function () {
    if (!heroStarted && hero) {
      heroStarted = true;
      hero.classList.add("is-in");
      hero.querySelectorAll(".motion-split, [data-motion], [data-motion-group]").forEach(function (el) {
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

  /* ---------- Hero-Hintergrund-Video ---------- */
  (function initHeroVideo() {
    var video = document.querySelector("#hero .hero-video");
    if (!video) return;

    if (reduceMotion) {
      video.pause();
      video.removeAttribute("autoplay");
      return;
    }

    function playVideo() {
      var p = video.play();
      if (p && typeof p.catch === "function") p.catch(function () {});
    }

    playVideo();
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) video.pause();
      else playVideo();
    });
  })();

  /* ---------- Hero-Hintergrund-Slider (Legacy / V2) ---------- */
  (function initHeroSlider() {
    var slider = document.getElementById("hero-slider");
    var nav = document.getElementById("hero-slider-nav");
    if (!slider) return;

    var slides = slider.querySelectorAll(".hero-slide");
    if (slides.length < 2) return;

    var navBtns = nav ? nav.querySelectorAll(".hero-slider-nav-btn") : [];
    var idx = 0;
    var interval = 6500;
    var timer = null;

    function restartProgress(btn) {
      if (!btn || reduceMotion) return;
      var fill = btn.querySelector(".hero-slider-line-fill");
      if (!fill) return;
      fill.style.animation = "none";
      void fill.offsetWidth;
      fill.style.animation = "";
    }

    function goTo(next) {
      slides[idx].classList.remove("is-active");
      if (navBtns[idx]) {
        navBtns[idx].classList.remove("is-active");
        navBtns[idx].removeAttribute("aria-current");
      }
      idx = (next + slides.length) % slides.length;
      slides[idx].classList.add("is-active");
      if (navBtns[idx]) {
        navBtns[idx].classList.add("is-active");
        navBtns[idx].setAttribute("aria-current", "true");
        restartProgress(navBtns[idx]);
      }
    }

    function next() { goTo(idx + 1); }

    function start() {
      if (reduceMotion || timer) return;
      timer = setInterval(next, interval);
    }

    function stop() {
      if (!timer) return;
      clearInterval(timer);
      timer = null;
    }

    navBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = parseInt(btn.getAttribute("data-slide"), 10);
        if (isNaN(target) || target === idx) return;
        stop();
        goTo(target);
        start();
      });
    });

    if (!reduceMotion) {
      if (navBtns[0]) restartProgress(navBtns[0]);
      start();
      document.addEventListener("visibilitychange", function () {
        if (document.hidden) stop();
        else start();
      });
    }
  })();

  /* ---------- Hero-Hintergrund-Slider (Startseite V1) ---------- */
  (function initHpHeroSlider() {
    var heroEl = document.getElementById("hero");
    if (!heroEl || !heroEl.classList.contains("hp-hero--slide")) return;

    var slider = heroEl.querySelector(".hp-hero-slider");
    if (!slider) return;

    var slides = slider.querySelectorAll(".hp-hero-slide");
    if (slides.length < 2) return;

    var prevBtn = heroEl.querySelector(".hp-hero-arrow--prev");
    var nextBtn = heroEl.querySelector(".hp-hero-arrow--next");
    var idx = 0;
    var interval = 6500;
    var timer = null;
    var total = slides.length;

    function goTo(next) {
      slides[idx].classList.remove("is-active");
      idx = (next + total) % total;
      slides[idx].classList.add("is-active");
    }

    function next() { goTo(idx + 1); }
    function prev() { goTo(idx - 1); }

    function start() {
      if (reduceMotion || timer) return;
      timer = setInterval(next, interval);
    }

    function stop() {
      if (!timer) return;
      clearInterval(timer);
      timer = null;
    }

    function restartAutoplay() {
      stop();
      start();
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        prev();
        restartAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        next();
        restartAutoplay();
      });
    }

    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", start);
    slider.addEventListener("focusin", stop);
    slider.addEventListener("focusout", start);

    if (!reduceMotion) {
      start();
      document.addEventListener("visibilitychange", function () {
        if (document.hidden) stop();
        else start();
      });
    }
  })();

  /* ---------- Mobile-Navigation ---------- */
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("main-nav");
  var navClose = document.getElementById("nav-close");
  var navOverlay = document.getElementById("nav-overlay");
  var navLinks = document.querySelectorAll(".main-nav__link, .main-nav__cta, .main-nav a");
  var dropdownItems = document.querySelectorAll(".main-nav .has-dropdown");

  if (toggle && nav) {
    var setOpen = function (open) {
      nav.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
      document.body.style.overflow = open ? "hidden" : "";
      if (!open) {
        dropdownItems.forEach(function (item) {
          item.classList.remove("is-open");
          var btn = item.querySelector(".nav-dropdown-toggle");
          if (btn) btn.setAttribute("aria-expanded", "false");
        });
      }
      if (navOverlay) {
        if (open) {
          navOverlay.hidden = false;
          requestAnimationFrame(function () { navOverlay.classList.add("is-visible"); });
        } else {
          navOverlay.classList.remove("is-visible");
          setTimeout(function () { navOverlay.hidden = true; }, 350);
        }
      }
    };
    var openNav = function () { setOpen(true); };
    var closeNav = function () { setOpen(false); };

    toggle.addEventListener("click", function () {
      if (nav.classList.contains("open")) closeNav();
      else openNav();
    });
    if (navClose) navClose.addEventListener("click", closeNav);
    if (navOverlay) navOverlay.addEventListener("click", closeNav);
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (nav.classList.contains("open")) closeNav();
      });
    });
    dropdownItems.forEach(function (item) {
      var btn = item.querySelector(".nav-dropdown-toggle");
      if (!btn) return;
      btn.addEventListener("click", function (e) {
        var isMobile = window.matchMedia("(max-width: 760px)").matches;
        if (!isMobile) return;
        e.preventDefault();
        var willOpen = !item.classList.contains("is-open");
        dropdownItems.forEach(function (other) {
          if (other === item) return;
          other.classList.remove("is-open");
          var otherBtn = other.querySelector(".nav-dropdown-toggle");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        });
        item.classList.toggle("is-open", willOpen);
        btn.setAttribute("aria-expanded", willOpen ? "true" : "false");
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) { closeNav(); toggle.focus(); }
    });
  }

  /* ---------- Sticky-Header + Scroll-Progress + To-Top ---------- */
  var header = document.getElementById("site-header");
  var heroShell = document.querySelector(".hero-shell");
  var bar = document.getElementById("progress-bar");
  var toTopBtn = document.getElementById("to-top");
  var toTopShowAt = 280;
  var headerFrameMargin = 20;
  var headerPinAt = 0;
  var headerScrollRaf = null;
  var refreshHeaderMetrics = function () {
    headerFrameMargin = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hero-frame-margin")) || 20;
    if (heroShell && header) {
      headerPinAt = heroShell.offsetTop + heroShell.offsetHeight - header.offsetHeight - headerFrameMargin;
    }
  };
  var applyHeaderScroll = function () {
    headerScrollRaf = null;
    var y = window.scrollY || document.documentElement.scrollTop;
    if (header) {
      header.classList.toggle("scrolled", y > 40);
      if (heroShell) {
        var shellBottom = heroShell.getBoundingClientRect().bottom;
        header.classList.toggle("is-pinned", y >= headerPinAt || shellBottom <= header.offsetHeight + headerFrameMargin);
      }
    }
    if (toTopBtn) {
      var showTop = y > toTopShowAt;
      toTopBtn.classList.toggle("is-visible", showTop);
      toTopBtn.hidden = !showTop;
    }
    if (bar) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
  };
  var onScrollHeader = function () {
    if (headerScrollRaf) return;
    headerScrollRaf = requestAnimationFrame(applyHeaderScroll);
  };
  refreshHeaderMetrics();
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  window.addEventListener("resize", function () {
    refreshHeaderMetrics();
    onScrollHeader();
  }, { passive: true });
  applyHeaderScroll();

  if (toTopBtn) {
    toTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---------- Anker-Navigation (natives Scrollen – kein Wheel-Hijack) ---------- */
  var maxScrollY = function () {
    return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  };
  var clampScroll = function (v) { return v < 0 ? 0 : (v > maxScrollY() ? maxScrollY() : v); };

  var scrollToAnchor = function (dest) {
    var top = clampScroll(dest);
    if (reduceMotion) {
      window.scrollTo(0, top);
      return;
    }
    window.scrollTo({ top: top, behavior: "smooth" });
  };

  var initSmoothScroll = function () {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      var href = link.getAttribute("href");
      if (!href || href === "#") return;
      link.addEventListener("click", function (e) {
        var id = href.slice(1);
        var dest = document.getElementById(id);
        if (!dest) return;
        e.preventDefault();
        var offset = header && header.classList.contains("scrolled") ? header.offsetHeight + 12 : 24;
        scrollToAnchor(dest.getBoundingClientRect().top + window.scrollY - offset);
      });
    });
  };

  /* ============================================================
     MOTION-SYSTEM (Giveon-inspiriert)
     Überschriften: Buchstabe für Buchstabe von rechts
     Fließtext: von unten · Kacheln: gestaffelt von unten
     Bilder: von links / rechts
     ============================================================ */
  var applyEmGradient = function (em) {
    var chars = em.querySelectorAll(".motion-char");
    var n = chars.length;
    if (!n) return;
    chars.forEach(function (c, i) {
      c.classList.add("motion-char-accent");
      if (n === 1) {
        c.style.backgroundSize = "100% 100%";
        c.style.backgroundPosition = "0 0";
      } else {
        c.style.backgroundSize = (n * 100) + "% 100%";
        c.style.backgroundPosition = ((i / (n - 1)) * 100) + "% 0";
      }
    });
  };

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
      /* Kurze Wörter (≤3 Zeichen) im selben Textlauf mit NBSP am Folgewort binden */
      var bind = prevWord && prevWord.length <= 3 && nextWord;
      frag.appendChild(document.createTextNode(bind ? "\u00a0" : " "));
    };

    var walk = function (node) {
      if (node.nodeType === 3) {
        var text = node.textContent;
        if (!text) return;
        var frag = document.createDocumentFragment();
        var trimmed = text.trim();
        if (!trimmed) {
          frag.appendChild(document.createTextNode(" "));
          node.parentNode.replaceChild(frag, node);
          return;
        }
        /* Leerzeichen vor/nach Inline-Elementen (z. B. <em>) erhalten */
        if (/^\s/.test(text)) frag.appendChild(document.createTextNode(" "));
        var tokens = trimmed.split(/\s+/);
        for (var w = 0; w < tokens.length; w++) {
          if (w > 0) appendSpace(frag, tokens[w - 1], tokens[w]);
          frag.appendChild(wrapWord(tokens[w]));
        }
        if (/\s$/.test(text)) frag.appendChild(document.createTextNode(" "));
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
    el.querySelectorAll("em").forEach(applyEmGradient);
  };

  var motionGroups = ".paths, .steps, .values-list, .proof-grid, .impact-stats, .news-grid, .check-list, .final-actions, .hp-pooling-benefits, .hp-career-list, .hp-families-list, .hp-final-steps, .hp-knowledge-grid, .hp-benefit-cards, .sa-entry-grid, .sa-role-grid, .sa-schools-tiles, .sa-authorities-tiles, .sa-timeline, .sa-qgrid, .pl-principles, .pl-framework-list, .pl-quality-grid, .pl-extra-grid, .pl-stages, .ka-path-grid, .ka-benefit-grid, .ka-value-grid, .ka-steps-list, .ka-ladder-list, .ka-voices-grid, .ka-concept-grid, .ka-growth, .ka-aside-grid, .ka-task-list, .ka-profile-list";
  var motionSlides = ".intro-media, .career-media .frame-soft, .frame-arch, .sc-media, .faq-visual-media, .sa-team-media, .sa-schools-media, .sa-authorities-media, .sa-expertise-media, .ka-video";
  var motionFlow = ".lead, .sec-lead, .intro-head-lead, .intro-foot, .quote, .sa-pullquote, .sa-note, .sa-timeline-text, .sa-contact-fallback, .faq-cta-text, .sa-pooling-copy > p, .sa-team-copy > p:not(.eyebrow), .sa-request-copy > p:not(.eyebrow), .sa-authorities-copy > p:not(.eyebrow), .sa-schools-copy > p:not(.eyebrow), .sa-expertise-copy > p:not(.eyebrow), .sa-quality-copy > p:not(.eyebrow), .sa-role-head-lead > p, .sa-contact-copy > p:not(.eyebrow), .pl-challenge-lead > p, .pl-explain-copy > p:not(.eyebrow), .pl-quality-copy > p:not(.eyebrow), .pl-framework-close, .pl-internal-links, .pl-request-micro";
  var motionRise = ".hero-sub, .eyebrow, .voices-panel, .voices-visual, .accordion, .final-contact, .process-cta, .microcopy, .showcase-hint, .statement-cta, .btn, blockquote:not(.quote):not(.sa-pullquote)";
  var motionMediaWrap = ".intro-media, .career-media .frame-soft, .quality-media, .faq-visual-media, .sa-team-media, .sa-schools-media, .sa-authorities-media, .sa-expertise-media";

  var isInMotionTile = function (el) {
    var group = el.closest("[data-motion-group]");
    return !!(group && el.parentElement !== group);
  };

  var clearNestedMotion = function (root) {
    root.querySelectorAll("[data-motion]").forEach(function (nested) {
      nested.removeAttribute("data-motion");
      nested.classList.remove("motion-media");
    });
  };

  var revealMotionElement = function (el) {
    if (el.hasAttribute("data-motion-group")) {
      if (el.classList.contains("is-visible")) return;
      el.classList.add("is-visible");
      var staggerStep = parseInt(el.dataset.stagger, 10) || 180;
      var staggerBase = parseInt(el.dataset.staggerBase, 10) || 220;
      Array.prototype.forEach.call(el.children, function (child, i) {
        child.style.setProperty("--tile-delay", (staggerBase + i * staggerStep) + "ms");
      });
      return;
    }
    el.classList.add("is-visible");
  };

  var initMotion = function () {
    document.querySelectorAll("main h2, .statement-text").forEach(function (el) {
      if (el.closest("#hero") || el.closest("#showcase") || el.closest("#leistungen")) return;
      el.setAttribute("data-motion", "chars");
    });

    document.querySelectorAll(motionFlow).forEach(function (el) {
      if (el.closest("#hero") || el.closest(".site-header") || el.dataset.motion || isInMotionTile(el)) return;
      el.setAttribute("data-motion", "tile-up");
    });

    document.querySelectorAll(motionRise).forEach(function (el) {
      if (el.closest("#hero") || el.closest(".site-header") || el.dataset.motion || isInMotionTile(el)) return;
      el.setAttribute("data-motion", "rise");
    });

    var slideIdx = 0;
    document.querySelectorAll(motionSlides).forEach(function (el) {
      if (el.closest("#hero") || el.closest(".showcase-track") || el.dataset.motion) return;
      /* verschachtelte Media-Figuren nicht doppelt animieren */
      if (el.parentElement && el.parentElement.closest('[data-motion="slide-left"],[data-motion="slide-right"]')) return;
      el.setAttribute("data-motion", slideIdx % 2 === 0 ? "slide-left" : "slide-right");
      el.classList.add("motion-media");
      slideIdx++;
    });

    document.querySelectorAll(motionGroups).forEach(function (group) {
      group.setAttribute("data-motion-group", "stagger");
      group.classList.remove("reveal");
      if (!group.dataset.staggerBase) group.dataset.staggerBase = "220";
      if (!group.dataset.stagger) group.dataset.stagger = "180";
      group.querySelectorAll(".reveal").forEach(function (c) { c.classList.remove("reveal"); });
      Array.prototype.forEach.call(group.children, function (child) {
        child.removeAttribute("data-motion");
        child.classList.remove("motion-media");
        clearNestedMotion(child);
      });
    });

    document.querySelectorAll(".reveal").forEach(function (el) {
      if (el.closest("#hero")) {
        el.classList.remove("reveal");
        return;
      }
      if (motionMediaWrap.split(", ").some(function (sel) { return el.matches(sel); })) {
        el.classList.remove("reveal");
        return;
      }
      if (!el.dataset.motion && !el.closest("[data-motion-group]")) {
        /* Fließtext wie auf index-v3: tile-up; Headlines behalten chars (bereits gesetzt) */
        var isHeadline = el.matches("h1, h2, h3, h4, .statement-text");
        var isFlowText = el.matches("p, blockquote, .lead, .sec-lead, .sa-pullquote, .sa-note, .sa-timeline-text, .sa-contact-fallback, .faq-cta-text");
        el.setAttribute("data-motion", isHeadline ? "rise" : (isFlowText ? "tile-up" : "rise"));
      }
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

  /* Sichtbarkeit per Viewport (Fallback wenn IO hängen bleibt, z. B. file://) */
  var revealInViewport = function () {
    if (reduceMotion) return;
    var vh = window.innerHeight || document.documentElement.clientHeight;
    document.querySelectorAll("[data-motion]:not(.is-visible), [data-motion-group]:not(.is-visible)").forEach(function (el) {
      if (el.closest("#hero")) return;
      var r = el.getBoundingClientRect();
      if (r.bottom > 24 && r.top < vh - 24) {
        revealMotionElement(el);
      }
    });
  };

  if (reduceMotion) {
    document.documentElement.classList.add("no-motion");
    document.querySelectorAll("[data-motion], [data-motion-group]").forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else if ("IntersectionObserver" in window) {
    var motionObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        revealMotionElement(entry.target);
        motionObs.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "60px 0px 60px 0px" });

    document.querySelectorAll("[data-motion], [data-motion-group]").forEach(function (el) {
      if (!el.closest("#hero")) motionObs.observe(el);
    });

    requestAnimationFrame(function () {
      requestAnimationFrame(revealInViewport);
    });
  } else {
    document.querySelectorAll("[data-motion], [data-motion-group]").forEach(function (el) {
      revealMotionElement(el);
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
  var parallaxEls = (reduceMotion || lightPerfPage) ? [] : Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
  var parallaxState = parallaxEls.map(function (el) {
    return { el: el, current: 0, speed: parseFloat(el.getAttribute("data-parallax")) || 0 };
  });
  var isHomeV1 = document.documentElement.classList.contains("home-v1");
  var parallaxGain = isHomeV1 ? 1.45 : 1;
  var parallaxLerp = isHomeV1 ? 0.16 : 0.1;
  var showcase = document.getElementById("showcase") || document.getElementById("leistungen");
  var track = document.getElementById("showcase-track");
  var scBar = document.getElementById("showcase-bar");
  var hpin = false;
  var showcaseMetrics = { total: 0, maxX: 0, valid: false };

  var refreshShowcaseMetrics = function () {
    if (!showcase || !track || !hpin) {
      showcaseMetrics.valid = false;
      return;
    }
    var vh = window.innerHeight;
    showcaseMetrics.total = Math.max(0, showcase.offsetHeight - vh);
    showcaseMetrics.maxX = Math.max(0, track.scrollWidth - track.clientWidth);
    showcaseMetrics.valid = true;
  };

  var evalHpin = function () {
    if (!showcase || !track) return;
    var want = deskQuery.matches && !reduceMotion;
    if (want === hpin) return;
    hpin = want;
    showcase.classList.toggle("no-hpin", !hpin);
    refreshShowcaseMetrics();
    if (!hpin) {
      track.style.transform = "";
      if (scBar) scBar.style.width = "";
    }
  };
  evalHpin();

  /* Horizontal 1:1 an Scrollposition – kein zweites Lerp (das fühlte sich „klebrig“ an) */
  var applyShowcaseTransform = function (offset) {
    if (!hpin || !track) return;
    var x = offset || 0;
    track.style.transform = "translate3d(" + (-x).toFixed(2) + "px,0,0)";
    if (scBar && showcaseMetrics.maxX > 0) {
      scBar.style.width = ((x / showcaseMetrics.maxX) * 100).toFixed(1) + "%";
    }
  };

  /* Showcase-Bilder: horizontal gepinnt → Sichtbarkeit per Scroll prüfen */
  var revealShowcaseMedia = function () {
    if (!track) return;
    track.querySelectorAll(".sc-media[data-motion]").forEach(function (media) {
      var r = media.getBoundingClientRect();
      if (r.right > 40 && r.left < window.innerWidth - 40) {
        media.classList.add("is-visible");
      }
    });
  };

  if (!reduceMotion && showcase && track && "IntersectionObserver" in window) {
    var showcaseObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) revealShowcaseMedia();
      });
    }, { threshold: 0.05 });
    showcaseObs.observe(showcase);
  }

  /* ---------- Seitenweite Parallax-Kreise (home-v1) ---------- */
  var pageBubbleState = [];
  var pageBubbleHost = document.getElementById("hp-page-bubbles");
  var pageBubbleReady = false;

  /* Layout-Vorgabe aus Mockup: cy = Mittelpunkt (0–1), sizeVw = Durchmesser relativ zur Viewport-Breite */
  var pageBubbleBlueprint = [
    { cy: 0.095, sizeVw: 0.70, edge: "right", peek: 0.20, color: "green", speed: 0.34 },
    { cy: 0.248, sizeVw: 0.36, edge: "left", peek: 0.50, color: "orange", speed: 0.26 },
    { cy: 0.405, sizeVw: 0.38, edge: "right", peek: 0.28, color: "green", speed: 0.30 },
    { cy: 0.545, sizeVw: 0.58, edge: "left", peek: 0.42, color: "orange", speed: 0.32 },
    { cy: 0.695, sizeVw: 0.22, edge: "right", inset: 0.16, color: "green", speed: 0.22 },
    { cy: 0.755, sizeVw: 0.24, edge: "left", peek: 0.50, color: "orange", speed: 0.24 },
    { cy: 0.845, sizeVw: 0.56, edge: "right", peek: 0.30, color: "green", speed: 0.30 },
    { cy: 0.905, sizeVw: 0.26, edge: "left", peek: 0.48, color: "orange", speed: 0.22 },
    { cy: 0.965, sizeVw: 0.62, edge: "right", peek: 0.24, color: "green", speed: 0.28 }
  ];

  var initPageBubbles = function () {
    if (!pageBubbleHost || !document.documentElement.classList.contains("home-v1")) return;
    pageBubbleHost.innerHTML = "";
    pageBubbleState = [];

    var vw = window.innerWidth;
    var pageHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body ? document.body.scrollHeight : 0,
      window.innerHeight
    );
    pageBubbleHost.style.height = pageHeight + "px";

    var narrow = vw < 901;
    var minSize = narrow ? 120 : 160;
    var maxSize = narrow ? 520 : 760;

    for (var i = 0; i < pageBubbleBlueprint.length; i++) {
      var spec = pageBubbleBlueprint[i];
      var size = Math.round(spec.sizeVw * vw);
      if (size < minSize) size = minSize;
      if (size > maxSize) size = maxSize;

      var centerY = spec.cy * pageHeight;
      var top = centerY - size * 0.5;
      var left;

      if (spec.inset != null) {
        left = vw - size * (1 + spec.inset);
      } else if (spec.edge === "left") {
        left = -size * spec.peek;
      } else {
        left = vw - size * (1 - spec.peek);
      }

      var anchorTop = top + size * 0.5;
      var bubble = document.createElement("span");
      bubble.className = "hp-page-bubble hp-page-bubble--" + spec.color;
      bubble.style.width = size + "px";
      bubble.style.height = size + "px";
      bubble.style.left = left.toFixed(1) + "px";
      bubble.style.top = top.toFixed(1) + "px";
      pageBubbleHost.appendChild(bubble);
      pageBubbleState.push({
        el: bubble,
        anchorTop: anchorTop,
        speed: spec.speed,
        current: 0
      });
    }

    pageBubbleReady = pageBubbleState.length > 0;
  };

  var renderPageBubbles = function () {
    if (!pageBubbleReady || reduceMotion) return;
    var scrollY = window.scrollY || window.pageYOffset || 0;
    var vh = window.innerHeight;
    for (var i = 0; i < pageBubbleState.length; i++) {
      var b = pageBubbleState[i];
      var centerInView = b.anchorTop - scrollY;
      var target = (centerInView - vh * 0.5) * b.speed * -0.34;
      target = target < -110 ? -110 : (target > 110 ? 110 : target);
      b.current += (target - b.current) * parallaxLerp;
      b.el.style.transform = "translate3d(0," + b.current.toFixed(2) + "px,0)";
    }
  };

  initPageBubbles();
  window.addEventListener("load", function () {
    initPageBubbles();
    renderPageBubbles();
  });

  var clamp = function (v, min, max) { return v < min ? min : (v > max ? max : v); };
  var scrollTicking = false;
  var scrollEndTimer = null;
  var renderScroll = function () {
    scrollTicking = false;
    var vh = window.innerHeight;

    for (var i = 0; i < parallaxState.length; i++) {
      var p = parallaxState[i];
      var r = p.el.getBoundingClientRect();
      if (r.bottom < -vh || r.top > vh * 2) continue;
      var offset = (r.top + r.height / 2) - vh / 2;
      var targetY = -offset * p.speed * parallaxGain;
      p.current += (targetY - p.current) * parallaxLerp;
      p.el.style.transform = "translate3d(0," + p.current.toFixed(2) + "px,0)";
    }

    if (hpin && showcase && track) {
      if (!showcaseMetrics.valid) refreshShowcaseMetrics();
      var rect = showcase.getBoundingClientRect();
      var total = showcaseMetrics.total;
      var prog = clamp(-rect.top, 0, total);
      var progress = total > 0 ? prog / total : 0;
      applyShowcaseTransform(progress * showcaseMetrics.maxX);
      revealShowcaseMedia();
    }

    if (track && !reduceMotion) revealShowcaseMedia();
    renderPageBubbles();
  };
  var onScrollEngine = function () {
    if (!scrollTicking) { scrollTicking = true; requestAnimationFrame(renderScroll); }
    if (scrollEndTimer) clearTimeout(scrollEndTimer);
    scrollEndTimer = setTimeout(function () {
      requestAnimationFrame(renderScroll);
      revealInViewport();
    }, 90);
  };
  if (parallaxState.length || showcase || pageBubbleReady) {
    window.addEventListener("scroll", onScrollEngine, { passive: true });
    window.addEventListener("resize", function () {
      initPageBubbles();
      evalHpin();
      showcaseMetrics.valid = false;
      refreshShowcaseMetrics();
      onScrollEngine();
    });
    if (deskQuery.addEventListener) deskQuery.addEventListener("change", function () { evalHpin(); showcaseMetrics.valid = false; refreshShowcaseMetrics(); onScrollEngine(); });
    window.addEventListener("load", function () {
      showcaseMetrics.valid = false;
      refreshShowcaseMetrics();
      onScrollEngine();
    });
    refreshShowcaseMetrics();
    renderScroll();
  }
  initSmoothScroll();

  /* ============================================================
     POINTER-PARALLAX (data-depth) + 3D-TILT (data-tilt)
     ============================================================ */
  if (finePointer && !reduceMotion && !lightPerfPage) {
    var depthEls = Array.prototype.slice.call(document.querySelectorAll("[data-depth]"));
    if (depthEls.length) {
      var depthScale = 1;
      var dTicking = false, mx = 0, my = 0;
      var renderDepth = function () {
        dTicking = false;
        for (var i = 0; i < depthEls.length; i++) {
          var d = parseFloat(depthEls[i].getAttribute("data-depth")) || 0;
          depthEls[i].style.transform = "translate3d(" + (mx * d * depthScale).toFixed(1) + "px," + (my * d * depthScale).toFixed(1) + "px,0)";
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

    /* ---------- Magnetische Buttons (dezent) ---------- */
    document.querySelectorAll("[data-magnetic]").forEach(function (el) {
      var strength = 0.12;
      var maxOffset = 8;
      var mRaf = null, lastE = null;
      el.addEventListener("mousemove", function (e) {
        lastE = e;
        if (mRaf) return;
        mRaf = requestAnimationFrame(function () {
          mRaf = null;
          var r = el.getBoundingClientRect();
          var dx = (lastE.clientX - r.left - r.width / 2) * strength;
          var dy = (lastE.clientY - r.top - r.height / 2) * strength;
          var dist = Math.hypot(dx, dy);
          if (dist > maxOffset) {
            dx *= maxOffset / dist;
            dy *= maxOffset / dist;
          }
          el.style.transition = "transform .28s var(--ease-out)";
          el.style.transform = "translate(" + dx.toFixed(1) + "px," + (dy - 2).toFixed(1) + "px)";
        });
      });
      el.addEventListener("mouseleave", function () {
        el.style.transition = "transform .45s var(--ease-out)";
        el.style.transform = "";
        setTimeout(function () { el.style.transition = ""; }, 460);
      });
    });
  }

  /* ============================================================
     Magnetische Buttons + Cursor-Ring (Desktop, keine reduced-motion)
     ============================================================ */
  if (finePointer && !reduceMotion && !lightPerfPage) {
    var ring = document.querySelector(".cursor-ring");
    if (ring) {
      var rx = 0, ry = 0, tx = 0, ty = 0, active = false;

      function cursorOnDark(x, y) {
        var el = document.elementFromPoint(x, y);
        if (!el || el === ring) return false;
        if (el.closest('[data-cursor="dark"]')) return true;
        if (el.closest(".site-header:not(.scrolled)") && !document.documentElement.classList.contains("home-v1")) return true;
        return false;
      }

      function cursorOnButton(x, y) {
        var el = document.elementFromPoint(x, y);
        if (!el || el === ring) return null;
        if (el.closest(".btn-accent")) return "orange";
        if (el.closest(".btn-primary, .btn-dark")) return "green";
        return null;
      }

      window.addEventListener("mousemove", function (e) {
        tx = e.clientX; ty = e.clientY;
        var btnType = cursorOnButton(tx, ty);
        ring.classList.toggle("on-orange-btn", btnType === "orange");
        ring.classList.toggle("on-green-btn", btnType === "green");
        ring.classList.toggle("on-dark", !btnType && cursorOnDark(tx, ty));
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

  /* ---------- Kundenstimmen-Slider ---------- */
  (function initVoicesSlider() {
    var track = document.getElementById("voices-track");
    if (!track) return;

    var slides = track.querySelectorAll(".voices-slide");
    if (!slides.length) return;

    var prevBtn = document.getElementById("voices-prev");
    var nextBtn = document.getElementById("voices-next");
    var authorEl = document.getElementById("voices-author");
    var avatarEl = document.getElementById("voices-avatar");
    var imageEl = document.getElementById("voices-image");
    var railEl = document.getElementById("voices-rail");
    var railTextEl = document.getElementById("voices-rail-text");
    var starsEl = document.getElementById("voices-stars");
    var figureEl = document.querySelector(".voices-figure");
    var idx = 0;
    var timer = null;
    var interval = 8000;

    function renderStars(count) {
      if (!starsEl) return;
      var n = Math.max(0, Math.min(5, parseInt(count, 10) || 0));
      starsEl.setAttribute("aria-label", n + " von 5 Sternen");
      starsEl.textContent = "";
      for (var i = 0; i < 5; i++) {
        var star = document.createElement("span");
        star.className = "voices-star" + (i < n ? " is-filled" : "");
        star.setAttribute("aria-hidden", "true");
        star.textContent = "\u2605";
        starsEl.appendChild(star);
      }
    }

    function slideMeta(slide) {
      return {
        role: slide.querySelector(".voices-slide-role") ? slide.querySelector(".voices-slide-role").textContent.trim() : "",
        img: slide.getAttribute("data-img") || "",
        rail: slide.getAttribute("data-rail") || "",
        initial: slide.getAttribute("data-initial") || "G",
        stars: slide.getAttribute("data-stars") || "5"
      };
    }

    function applyMeta(meta) {
      if (authorEl) authorEl.textContent = meta.role;
      if (avatarEl) avatarEl.textContent = meta.initial;
      if (railTextEl) railTextEl.textContent = meta.rail;
      renderStars(meta.stars);
      if (imageEl && meta.img && imageEl.getAttribute("src") !== meta.img) {
        if (figureEl) figureEl.classList.add("is-changing");
        if (railEl) railEl.classList.add("is-changing");
        imageEl.onload = function () {
          if (figureEl) figureEl.classList.remove("is-changing");
          if (railEl) railEl.classList.remove("is-changing");
          imageEl.onload = null;
        };
        imageEl.src = meta.img;
        if (imageEl.complete) {
          if (figureEl) figureEl.classList.remove("is-changing");
          if (railEl) railEl.classList.remove("is-changing");
        }
      }
    }

    function goTo(next) {
      slides[idx].classList.remove("is-active");
      idx = (next + slides.length) % slides.length;
      slides[idx].classList.add("is-active");
      applyMeta(slideMeta(slides[idx]));
    }

    function next() { goTo(idx + 1); }
    function prev() { goTo(idx - 1); }

    function start() {
      stop();
      if (reduceMotion || slides.length < 2) return;
      timer = window.setInterval(next, interval);
    }

    function stop() {
      if (timer) { window.clearInterval(timer); timer = null; }
    }

    if (nextBtn) nextBtn.addEventListener("click", function () { next(); start(); });
    if (prevBtn) prevBtn.addEventListener("click", function () { prev(); start(); });

    var shell = document.getElementById("voices");
    if (shell) {
      shell.addEventListener("mouseenter", stop);
      shell.addEventListener("mouseleave", start);
      shell.addEventListener("focusin", stop);
      shell.addEventListener("focusout", start);
    }

    applyMeta(slideMeta(slides[idx]));
    start();
  })();

  /* ---------- FAQ: weiches Öffnen, nur ein Panel offen ---------- */
  (function initFaqAccordion() {
    var items = document.querySelectorAll(".faq-item");
    if (!items.length) return;

    var animMs = reduceMotion ? 0 : 450;

    var setAnswerHeight = function (answer, height) {
      answer.style.maxHeight = height;
    };

    var expandItem = function (item) {
      var answer = item.querySelector(".faq-answer");
      if (!answer) return;
      item.setAttribute("open", "");
      item.classList.add("is-open");
      setAnswerHeight(answer, "0");
      answer.style.opacity = "0";
      void answer.offsetHeight;
      setAnswerHeight(answer, answer.scrollHeight + "px");
      answer.style.opacity = "1";
      var onEnd = function (e) {
        if (e.propertyName !== "max-height") return;
        answer.removeEventListener("transitionend", onEnd);
        if (item.classList.contains("is-open")) setAnswerHeight(answer, "none");
      };
      if (animMs) answer.addEventListener("transitionend", onEnd);
      else setAnswerHeight(answer, "none");
    };

    var collapseItem = function (item, done) {
      var answer = item.querySelector(".faq-answer");
      if (!answer || !item.classList.contains("is-open")) {
        if (done) done();
        return;
      }
      setAnswerHeight(answer, answer.scrollHeight + "px");
      void answer.offsetHeight;
      item.classList.remove("is-open");
      setAnswerHeight(answer, "0");
      answer.style.opacity = "0";
      var finish = function () {
        item.removeAttribute("open");
        if (done) done();
      };
      if (!animMs) { finish(); return; }
      var onEnd = function (e) {
        if (e.propertyName !== "max-height") return;
        answer.removeEventListener("transitionend", onEnd);
        finish();
      };
      answer.addEventListener("transitionend", onEnd);
    };

    items.forEach(function (item) {
      var summary = item.querySelector("summary");
      var answer = item.querySelector(".faq-answer");
      if (!summary || !answer) return;

      if (item.hasAttribute("open")) {
        item.classList.add("is-open");
        setAnswerHeight(answer, "none");
        answer.style.opacity = "1";
      } else {
        setAnswerHeight(answer, "0");
        answer.style.opacity = "0";
      }

      summary.addEventListener("click", function (e) {
        e.preventDefault();
        var willOpen = !item.classList.contains("is-open");

        if (willOpen) {
          items.forEach(function (other) {
            if (other !== item) collapseItem(other);
          });
          expandItem(item);
        } else {
          collapseItem(item);
        }
      });
    });
  })();

  /* ---------- Hero-Karussell (volle Breite) ---------- */
  (function initHeroCarousel() {
    var root = document.getElementById("hp-hero-carousel");
    var viewport = document.getElementById("hp-hero-carousel-viewport");
    var track = document.getElementById("hp-hero-carousel-track");
    if (!root || !viewport || !track) return;

    var slides = Array.prototype.slice.call(track.querySelectorAll(".hp-hero-tile"));
    if (!slides.length) return;

    var prevBtn = document.getElementById("hp-hero-carousel-prev");
    var nextBtn = document.getElementById("hp-hero-carousel-next");
    var dotsHost = document.getElementById("hp-hero-carousel-dots");
    var idx = 0;
    var timer = null;
    var interval = 5500;
    var isDown = false;
    var startX = 0;
    var startTranslate = 0;
    var currentTranslate = 0;

    var syncTileWidths = function () {
      var visible = parseFloat(getComputedStyle(root).getPropertyValue("--hp-carousel-visible")) || 4;
      var gap = parseFloat(getComputedStyle(track).gap) || 0;
      var width = (viewport.clientWidth - (visible - 1) * gap) / visible;
      if (width > 0) {
        viewport.style.setProperty("--hp-tile-w", width.toFixed(2) + "px");
      }
    };

    var syncTileHeights = function () {
      var pooling = track.querySelector(".hp-hero-tile--pooling");
      if (!pooling) return;

      slides.forEach(function (slide) {
        slide.style.height = "auto";
        slide.style.minHeight = "0";
        slide.style.maxHeight = "none";
      });

      var height = pooling.offsetHeight;
      slides.forEach(function (slide) {
        slide.style.height = "";
        slide.style.minHeight = "";
        slide.style.maxHeight = "";
      });

      if (height > 0) {
        viewport.style.setProperty("--hp-tile-h", height + "px");
      }
    };

    var maxScroll = function () {
      return Math.max(0, track.scrollWidth - viewport.clientWidth);
    };

    var slideOffset = function (i) {
      return slides[i] ? slides[i].offsetLeft : 0;
    };

    var maxIndex = function () {
      var limit = maxScroll();
      if (limit <= 0) return 0;
      var last = 0;
      for (var i = 0; i < slides.length; i++) {
        if (slideOffset(i) <= limit + 2) last = i;
      }
      return last;
    };

    var applyTransform = function (x, animate) {
      var limit = maxScroll();
      currentTranslate = x < 0 ? 0 : (x > limit ? limit : x);
      track.style.transition = (!animate || reduceMotion) ? "none" : "";
      track.style.transform = "translate3d(" + (-currentTranslate).toFixed(2) + "px,0,0)";
    };

    var updateUI = function () {
      slides.forEach(function (slide, i) {
        slide.classList.toggle("is-active", i === idx);
      });
      if (dotsHost) {
        var dots = dotsHost.querySelectorAll(".hp-hero-carousel-dot");
        dots.forEach(function (dot, i) {
          dot.classList.toggle("is-active", i === idx);
          dot.setAttribute("aria-selected", i === idx ? "true" : "false");
        });
      }
      if (prevBtn) prevBtn.disabled = idx <= 0;
      if (nextBtn) nextBtn.disabled = idx >= maxIndex();
    };

    var goTo = function (next, animate) {
      var max = maxIndex();
      idx = next < 0 ? 0 : (next > max ? max : next);
      applyTransform(slideOffset(idx), animate !== false);
      updateUI();
    };

    var buildDots = function () {
      if (!dotsHost) return;
      dotsHost.innerHTML = "";
      slides.forEach(function (_, i) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "hp-hero-carousel-dot" + (i === 0 ? " is-active" : "");
        dot.setAttribute("role", "tab");
        dot.setAttribute("aria-label", "Kachel " + (i + 1));
        dot.setAttribute("aria-selected", i === 0 ? "true" : "false");
        dot.addEventListener("click", function () {
          stop();
          goTo(i);
          start();
        });
        dotsHost.appendChild(dot);
      });
    };

    var next = function () { goTo(idx + 1); };
    var prev = function () { goTo(idx - 1); };

    var start = function () {
      stop();
      if (reduceMotion || slides.length < 2) return;
      timer = window.setInterval(function () {
        if (idx >= maxIndex()) goTo(0);
        else next();
      }, interval);
    };

    var stop = function () {
      if (timer) { window.clearInterval(timer); timer = null; }
    };

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        stop();
        prev();
        start();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        stop();
        next();
        start();
      });
    }

    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", start);

    viewport.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      if (e.target.closest("a, button")) return;
      isDown = true;
      startX = e.clientX;
      startTranslate = currentTranslate;
      root.classList.add("is-dragging");
      stop();
      if (viewport.setPointerCapture) viewport.setPointerCapture(e.pointerId);
    });

    viewport.addEventListener("pointermove", function (e) {
      if (!isDown) return;
      applyTransform(startTranslate - (e.clientX - startX), false);
    });

    var endDrag = function (e) {
      if (!isDown) return;
      isDown = false;
      root.classList.remove("is-dragging");
      var closest = 0;
      var best = Infinity;
      var max = maxIndex();
      for (var i = 0; i <= max; i++) {
        var dist = Math.abs(slideOffset(i) - currentTranslate);
        if (dist < best) { best = dist; closest = i; }
      }
      goTo(closest);
      start();
      if (e && viewport.releasePointerCapture) {
        try { viewport.releasePointerCapture(e.pointerId); } catch (err) { /* noop */ }
      }
    };

    viewport.addEventListener("pointerup", endDrag);
    viewport.addEventListener("pointercancel", endDrag);

    buildDots();
    var reflow = function () {
      syncTileWidths();
      syncTileHeights();
      goTo(Math.min(idx, maxIndex()), false);
    };

    window.addEventListener("resize", reflow);
    window.addEventListener("load", reflow);

    if ("ResizeObserver" in window) {
      var ro = new ResizeObserver(reflow);
      ro.observe(viewport);
    }

    reflow();
    start();
  })();

  /* ---------- Ansprechpartner: Drag-Scroll + Kontakt-Toggle ---------- */
  (function initContactCarousel() {
    var carousel = document.getElementById("hp-contact-carousel");
    if (!carousel) return;

    var visuals = carousel.querySelectorAll(".hp-contact-visual");
    var isDown = false;
    var startX = 0;
    var scrollLeft = 0;
    var moved = false;

    var setScrollable = function () {
      carousel.classList.toggle("is-scrollable", carousel.scrollWidth > carousel.clientWidth + 8);
    };

    var closeAll = function (except) {
      visuals.forEach(function (visual) {
        if (visual !== except) {
          visual.classList.remove("is-active");
          visual.setAttribute("aria-expanded", "false");
        }
      });
    };

    visuals.forEach(function (visual) {
      visual.addEventListener("click", function (e) {
        if (finePointer || e.target.closest("a")) return;
        if (moved) return;
        var willOpen = !visual.classList.contains("is-active");
        closeAll(willOpen ? visual : null);
        visual.classList.toggle("is-active", willOpen);
        visual.setAttribute("aria-expanded", willOpen ? "true" : "false");
      });

      visual.addEventListener("keydown", function (e) {
        if (e.key !== "Enter" && e.key !== " ") return;
        if (finePointer) return;
        e.preventDefault();
        var willOpen = !visual.classList.contains("is-active");
        closeAll(willOpen ? visual : null);
        visual.classList.toggle("is-active", willOpen);
        visual.setAttribute("aria-expanded", willOpen ? "true" : "false");
      });
    });

    document.addEventListener("click", function (e) {
      if (!carousel.contains(e.target)) closeAll();
    });

    carousel.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      if (e.target.closest("a")) return;
      isDown = true;
      moved = false;
      startX = e.clientX;
      scrollLeft = carousel.scrollLeft;
      carousel.classList.add("is-dragging");
      if (carousel.setPointerCapture) carousel.setPointerCapture(e.pointerId);
    });

    carousel.addEventListener("pointermove", function (e) {
      if (!isDown) return;
      var delta = e.clientX - startX;
      if (Math.abs(delta) > 4) moved = true;
      carousel.scrollLeft = scrollLeft - delta;
    });

    var endDrag = function (e) {
      if (!isDown) return;
      isDown = false;
      carousel.classList.remove("is-dragging");
      if (e && carousel.releasePointerCapture) {
        try { carousel.releasePointerCapture(e.pointerId); } catch (err) { /* noop */ }
      }
    };

    carousel.addEventListener("pointerup", endDrag);
    carousel.addEventListener("pointercancel", endDrag);
    carousel.addEventListener("pointerleave", endDrag);

    window.addEventListener("resize", setScrollable, { passive: true });
    window.addEventListener("load", setScrollable);
    setScrollable();
  })();

  /* Scroll/Load: Medien-Reveals nachziehen (wichtig für file://) */
  if (!reduceMotion) {
    var syncRevealsRaf = null;
    var syncRevealsActive = true;
    var syncReveals = function () {
      if (!syncRevealsActive || syncRevealsRaf) return;
      syncRevealsRaf = requestAnimationFrame(function () {
        syncRevealsRaf = null;
        revealInViewport();
        if (typeof revealShowcaseMedia === "function") revealShowcaseMedia();
        /* Listener abschalten, sobald nichts mehr zu enthüllen ist */
        if (!document.querySelector("[data-motion]:not(.is-visible), [data-motion-group]:not(.is-visible)")) {
          syncRevealsActive = false;
          window.removeEventListener("scroll", syncReveals);
          window.removeEventListener("resize", syncReveals);
        }
      });
    };
    window.addEventListener("scroll", syncReveals, { passive: true });
    window.addEventListener("load", syncReveals);
    window.addEventListener("resize", syncReveals, { passive: true });
    syncReveals();
    if (isLocalFile) {
      setTimeout(function () {
        document.querySelectorAll(".motion-media").forEach(function (el) {
          el.classList.add("is-visible");
        });
        syncReveals();
      }, 400);
    }
  }
})();
