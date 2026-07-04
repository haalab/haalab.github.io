// ============================================================
// HAA Lab — shared interactions
// ============================================================
(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initReveal();
    initCounters();
    initFaq();
    initHeroCanvas();
    var yr = document.getElementById('footer-year');
    if (yr) yr.textContent = new Date().getFullYear();
  });

  // ---------- Navigation ----------
  function initNav() {
    var btn = document.getElementById('mobile-menu-btn');
    var menu = document.getElementById('mobile-menu');
    if (btn && menu) {
      btn.addEventListener('click', function () { menu.classList.toggle('open'); });
    }
    var nav = document.querySelector('.nav');
    if (nav) {
      var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 10); };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
    // Highlight current page
    var here = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(function (a) {
      var target = a.getAttribute('href');
      if (target === here) a.classList.add('active');
    });
  }

  // ---------- Scroll reveal ----------
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    if (reducedMotion || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  // ---------- Animated counters ----------
  function initCounters() {
    var els = document.querySelectorAll('[data-count]');
    if (!els.length) return;
    var animate = function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      if (reducedMotion) { el.textContent = target; return; }
      var dur = 1600, start = null;
      var stepFn = function (ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(stepFn);
      };
      requestAnimationFrame(stepFn);
    };
    if (!('IntersectionObserver' in window)) { els.forEach(animate); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    els.forEach(function (el) { io.observe(el); });
  }

  // ---------- FAQ accordion ----------
  function initFaq() {
    document.querySelectorAll('.faq-item').forEach(function (item) {
      var q = item.querySelector('.faq-q');
      var a = item.querySelector('.faq-a');
      if (!q || !a) return;
      q.addEventListener('click', function () {
        var open = item.classList.toggle('open');
        q.setAttribute('aria-expanded', open ? 'true' : 'false');
        a.style.maxHeight = open ? a.scrollHeight + 'px' : '0';
      });
    });
  }

  // ---------- Hero particle network ----------
  // A field of warm glowing nodes. Half drift organically ("human"),
  // half snap along subtle grid pulses ("agent"); links form between
  // nearby nodes and toward the visitor's cursor — human and agent
  // reaching for each other, like the two hands of the lab logo.
  function initHeroCanvas() {
    var canvas = document.getElementById('hero-canvas');
    if (!canvas || reducedMotion) return;
    var ctx = canvas.getContext('2d');
    var parent = canvas.parentElement;
    var W, H, nodes = [], mouse = { x: -9999, y: -9999 };
    var DPR = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      W = parent.offsetWidth; H = parent.offsetHeight;
      canvas.width = W * DPR; canvas.height = H * DPR;
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      spawn();
    }

    function spawn() {
      var count = Math.min(90, Math.floor(W * H / 16000));
      nodes = [];
      for (var i = 0; i < count; i++) {
        var agent = i % 2 === 0;
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * (agent ? 0.25 : 0.45),
          vy: (Math.random() - 0.5) * (agent ? 0.25 : 0.45),
          r: agent ? 1.6 + Math.random() * 1.6 : 1.2 + Math.random() * 1.4,
          agent: agent,
          phase: Math.random() * Math.PI * 2
        });
      }
    }

    parent.addEventListener('mousemove', function (e) {
      var rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top;
    });
    parent.addEventListener('mouseleave', function () { mouse.x = -9999; mouse.y = -9999; });

    var t = 0;
    function frame() {
      t += 0.008;
      ctx.clearRect(0, 0, W, H);

      var LINK = 130;
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        n.x += n.vx; n.y += n.vy;
        if (n.agent) { // gentle sinusoidal pulse for agent nodes
          n.x += Math.sin(t * 2 + n.phase) * 0.15;
          n.y += Math.cos(t * 1.6 + n.phase) * 0.15;
        }
        if (n.x < -20) n.x = W + 20; if (n.x > W + 20) n.x = -20;
        if (n.y < -20) n.y = H + 20; if (n.y > H + 20) n.y = -20;

        // links
        for (var j = i + 1; j < nodes.length; j++) {
          var m = nodes[j];
          var dx = n.x - m.x, dy = n.y - m.y;
          var d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            var alpha = (1 - Math.sqrt(d2) / LINK) * 0.32;
            // cross human-agent links glow warmer
            var cross = n.agent !== m.agent;
            ctx.strokeStyle = cross
              ? 'rgba(217,111,30,' + (alpha * 1.15) + ')'
              : 'rgba(240,166,60,' + (alpha * 0.8) + ')';
            ctx.lineWidth = cross ? 1 : 0.7;
            ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, m.y); ctx.stroke();
          }
        }

        // link to cursor
        var mdx = n.x - mouse.x, mdy = n.y - mouse.y;
        var md2 = mdx * mdx + mdy * mdy;
        if (md2 < 160 * 160) {
          var ma = (1 - Math.sqrt(md2) / 160) * 0.5;
          ctx.strokeStyle = 'rgba(169,78,18,' + ma + ')';
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }

        // node
        var tw = n.agent ? (0.75 + 0.25 * Math.sin(t * 3 + n.phase)) : 1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * tw, 0, Math.PI * 2);
        ctx.fillStyle = n.agent ? 'rgba(255,182,72,.85)' : 'rgba(217,111,30,.55)';
        ctx.fill();
        if (n.agent) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * tw * 2.6, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255,182,72,.08)';
          ctx.fill();
        }
      }
      requestAnimationFrame(frame);
    }

    window.addEventListener('resize', resize);
    resize();
    requestAnimationFrame(frame);
  }
})();
