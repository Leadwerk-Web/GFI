(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Footer year */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* Mobile navigation */
  var navToggle = document.getElementById('nav-toggle');
  var mainNav = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navToggle.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Menü öffnen');
        document.body.style.overflow = '';
      });
    });
  }

  /* Header scroll state */
  var header = document.getElementById('site-header');

  function updateHeader() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  /* Tabs (Zielgruppen) */
  var tabsRoot = document.querySelector('[data-tabs]');

  if (tabsRoot) {
    var tabBtns = tabsRoot.querySelectorAll('.tab-btn');
    var tabPanels = tabsRoot.querySelectorAll('.tab-panel');
    var indicator = tabsRoot.querySelector('.tab-indicator');

    function moveIndicator(btn) {
      if (!indicator || window.innerWidth <= 640) return;
      indicator.style.width = btn.offsetWidth + 'px';
      indicator.style.transform = 'translateX(' + btn.offsetLeft + 'px)';
    }

    function activateTab(btn) {
      var target = btn.getAttribute('data-tab');

      tabBtns.forEach(function (b) {
        var isActive = b === btn;
        b.classList.toggle('is-active', isActive);
        b.setAttribute('aria-selected', isActive ? 'true' : 'false');
        b.setAttribute('tabindex', isActive ? '0' : '-1');
      });

      tabPanels.forEach(function (panel) {
        var panelId = panel.id.replace('panel-', '');
        var isActive = panelId === target;
        panel.classList.toggle('is-active', isActive);
        if (isActive) {
          panel.removeAttribute('hidden');
        } else {
          panel.setAttribute('hidden', '');
        }
      });

      moveIndicator(btn);
    }

    tabBtns.forEach(function (btn, index) {
      btn.addEventListener('click', function () {
        activateTab(btn);
      });

      btn.addEventListener('keydown', function (e) {
        var nextIndex = index;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          nextIndex = (index + 1) % tabBtns.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          nextIndex = (index - 1 + tabBtns.length) % tabBtns.length;
        } else if (e.key === 'Home') {
          nextIndex = 0;
        } else if (e.key === 'End') {
          nextIndex = tabBtns.length - 1;
        } else {
          return;
        }
        e.preventDefault();
        tabBtns[nextIndex].focus();
        activateTab(tabBtns[nextIndex]);
      });
    });

    var activeBtn = tabsRoot.querySelector('.tab-btn.is-active');
    if (activeBtn) {
      moveIndicator(activeBtn);
    }

    window.addEventListener('resize', function () {
      var current = tabsRoot.querySelector('.tab-btn.is-active');
      if (current) moveIndicator(current);
    });
  }

  /* Wayfinder — scroll spy */
  var wayfinderLinks = document.querySelectorAll('.wayfinder-link');
  var sections = [];

  wayfinderLinks.forEach(function (link) {
    var id = link.getAttribute('data-section');
    var section = document.getElementById(id);
    if (section) {
      sections.push({ id: id, el: section, link: link });
    }
  });

  function updateWayfinder() {
    if (!sections.length) return;

    var scrollPos = window.scrollY + window.innerHeight * 0.35;
    var current = sections[0];

    sections.forEach(function (item) {
      if (item.el.offsetTop <= scrollPos) {
        current = item;
      }
    });

    wayfinderLinks.forEach(function (link) {
      link.classList.remove('is-active');
    });

    if (current && current.link) {
      current.link.classList.add('is-active');
    }
  }

  window.addEventListener('scroll', updateWayfinder, { passive: true });
  updateWayfinder();

  /* ======================================================================
     SCROLL-REVEAL-SYSTEM (Text-, Bild- & Zahlen-Animationen)
     ====================================================================== */
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var supportsIO = 'IntersectionObserver' in window;

  function rafThrottle(fn) {
    var ticking = false;
    return function () {
      var args = arguments;
      var ctx = this;
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(function () {
          fn.apply(ctx, args);
          ticking = false;
        });
      }
    };
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  /* Wörter in maskierte Spans aufteilen (erhält <em> & Co.) */
  function wrapWords(source, target, counter) {
    Array.prototype.forEach.call(source.childNodes, function (node) {
      if (node.nodeType === 3) {
        node.textContent.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            target.appendChild(document.createTextNode(' '));
          } else {
            var word = document.createElement('span');
            word.className = 'word';
            var inner = document.createElement('span');
            inner.className = 'word-inner';
            inner.style.setProperty('--i', counter.n++);
            inner.textContent = part;
            word.appendChild(inner);
            target.appendChild(word);
          }
        });
      } else if (node.nodeType === 1) {
        var clone = node.cloneNode(false);
        target.appendChild(clone);
        wrapWords(node, clone, counter);
      }
    });
  }

  function splitWords(el) {
    if (el.getAttribute('data-split')) return;
    el.setAttribute('data-split', '1');
    var frag = document.createDocumentFragment();
    wrapWords(el, frag, { n: 0 });
    el.textContent = '';
    el.appendChild(frag);
    el.classList.add('reveal-words');
  }

  /* Kennzahlen hochzählen */
  function animateCount(el) {
    if (el.getAttribute('data-counted')) return;
    var raw = (el.textContent || '').trim();
    var m = raw.match(/^(\d[\d.]*)(\D*)$/);
    if (!m) return;
    var end = parseInt(m[1].replace(/\./g, ''), 10);
    var suffix = m[2] || '';
    if (!suffix && end > 999) return; /* Jahreszahlen o. Ä. nicht zählen */
    el.setAttribute('data-counted', '1');
    var dur = 1500;
    var startT = null;
    function tick(now) {
      if (startT === null) startT = now;
      var p = Math.min((now - startT) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(end * eased) + suffix;
      if (p < 1) window.requestAnimationFrame(tick);
    }
    window.requestAnimationFrame(tick);
  }

  if (!prefersReducedMotion) {
    var headlineSel = '.hero-title, .section-head h2, .intro-copy h2, .career-copy h2, .quality-copy h2, .statement-quote p, .final-inner h2';
    document.querySelectorAll(headlineSel).forEach(function (h) {
      splitWords(h);
      h.classList.remove('fade-in');
      h.removeAttribute('data-anim');
    });

    ['.values', '.steps', '.proof-grid', '.news-grid'].forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (group) {
        Array.prototype.forEach.call(group.children, function (child, i) {
          if (!child.classList.contains('fade-in') && !child.hasAttribute('data-anim')) {
            child.setAttribute('data-anim', 'up');
          }
          child.style.setProperty('--d', (i * 90) + 'ms');
        });
      });
    });
  }

  /* Bilder zu Reveal-Figuren machen (Clip-Wipe + Skeleton) */
  var mediaItems = [];
  document.querySelectorAll('main img').forEach(function (img) {
    var fig = img.closest('figure, .news-media');
    if (!fig) return;
    img.setAttribute('data-reveal', '');
    if (!fig.classList.contains('quality-media')) {
      fig.classList.add('media-figure');
    }
    var item = { fig: fig, loaded: false, inview: false };
    function maybe() {
      if (item.loaded && item.inview) {
        fig.classList.add('is-revealed');
        fig.classList.remove('media-skeleton');
      }
    }
    item.maybe = maybe;
    if (img.complete && img.naturalWidth > 0) {
      item.loaded = true;
    } else {
      fig.classList.add('media-skeleton');
      img.addEventListener('load', function () { item.loaded = true; fig.classList.remove('media-skeleton'); maybe(); });
      img.addEventListener('error', function () { item.loaded = true; fig.classList.remove('media-skeleton'); maybe(); });
    }
    mediaItems.push(item);
  });

  /* Hero-Copy beim Laden gestaffelt einblenden */
  var heroCopy = document.querySelector('[data-hero-copy]');
  if (heroCopy && !prefersReducedMotion) {
    Array.prototype.forEach.call(heroCopy.children, function (child, i) {
      if (!child.classList.contains('reveal-words')) {
        child.setAttribute('data-anim', 'up');
      }
      child.style.setProperty('--d', (120 + i * 120) + 'ms');
    });
  }

  if (!prefersReducedMotion && supportsIO) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in', 'is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });

    document.querySelectorAll('.fade-in, [data-anim], .reveal-words').forEach(function (el) {
      revealObserver.observe(el);
    });

    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    document.querySelectorAll('.trust-num').forEach(function (el) { countObserver.observe(el); });

    var mediaObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          for (var k = 0; k < mediaItems.length; k++) {
            if (mediaItems[k].fig === entry.target) {
              mediaItems[k].inview = true;
              mediaItems[k].maybe();
              break;
            }
          }
          mediaObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -5% 0px', threshold: 0.1 });
    mediaItems.forEach(function (m) { mediaObserver.observe(m.fig); });
  } else {
    document.querySelectorAll('.fade-in, [data-anim], .reveal-words').forEach(function (el) {
      el.classList.add('is-in', 'is-visible');
    });
    mediaItems.forEach(function (m) {
      m.fig.classList.add('is-revealed');
      m.fig.classList.remove('media-skeleton');
    });
  }

  if (prefersReducedMotion) return;

  /* --- Subtile Maus-Parallax (Hero-Szene) ------------------------------ */
  if (canHover) {
    document.querySelectorAll('[data-tilt-scene]').forEach(function (scene) {
      var layers = scene.querySelectorAll('[data-depth]');
      if (!layers.length) return;

      var targetX = 0, targetY = 0;
      var curX = 0, curY = 0;
      var animating = false;

      function animate() {
        curX = lerp(curX, targetX, 0.08);
        curY = lerp(curY, targetY, 0.08);

        layers.forEach(function (layer) {
          var depth = parseFloat(layer.getAttribute('data-depth')) || 0;
          layer.style.setProperty('--mx', (curX * depth).toFixed(2) + 'px');
          layer.style.setProperty('--my', (curY * depth).toFixed(2) + 'px');
        });

        if (Math.abs(curX - targetX) > 0.1 || Math.abs(curY - targetY) > 0.1) {
          window.requestAnimationFrame(animate);
        } else {
          animating = false;
        }
      }

      function kick() {
        if (!animating) {
          animating = true;
          window.requestAnimationFrame(animate);
        }
      }

      scene.addEventListener('mousemove', function (e) {
        var rect = scene.getBoundingClientRect();
        var relX = (e.clientX - rect.left) / rect.width - 0.5;
        var relY = (e.clientY - rect.top) / rect.height - 0.5;
        targetX = relX * 24;
        targetY = relY * 24;
        kick();
      });

      scene.addEventListener('mouseleave', function () {
        targetX = 0;
        targetY = 0;
        kick();
      });
    });
  }

  /* --- Magnet-Effekt auf Buttons --------------------------------------- */
  if (canHover) {
    var magneticBtns = document.querySelectorAll('.btn-primary, .btn-accent, .btn-lg');
    magneticBtns.forEach(function (btn) {
      var label = btn.querySelector('span');
      var strength = 0.3;

      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var mx = e.clientX - rect.left - rect.width / 2;
        var my = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = 'translate(' + (mx * strength).toFixed(1) + 'px,' + (my * strength - 2).toFixed(1) + 'px)';
        if (label) {
          label.style.transform = 'translate(' + (mx * 0.12).toFixed(1) + 'px,' + (my * 0.12).toFixed(1) + 'px)';
        }
      });

      btn.addEventListener('mouseleave', function () {
        btn.style.transform = '';
        if (label) label.style.transform = '';
      });
    });
  }

  /* --- Scroll-Reveal mit unterschiedlichen Geschwindigkeiten ----------- */
  var parallaxEls = [];
  document.querySelectorAll('[data-scroll-speed]').forEach(function (el) {
    parallaxEls.push({ el: el, speed: parseFloat(el.getAttribute('data-scroll-speed')) || 0 });
  });

  if (parallaxEls.length && window.innerWidth >= 800) {
    var vh = window.innerHeight;

    var updateParallax = rafThrottle(function () {
      var center = window.scrollY + vh / 2;
      parallaxEls.forEach(function (item) {
        var rect = item.el.getBoundingClientRect();
        var elCenter = window.scrollY + rect.top + rect.height / 2;
        var offset = (elCenter - center) * item.speed;
        item.el.style.setProperty('--parallax-y', offset.toFixed(1) + 'px');
      });
    });

    window.addEventListener('scroll', updateParallax, { passive: true });
    window.addEventListener('resize', function () {
      vh = window.innerHeight;
      updateParallax();
    }, { passive: true });
    updateParallax();
  }
})();
