// ============================================================
// HAA Lab — publications live search & filter
// Requires: js/publications-data.js (const PUBLICATIONS)
// ============================================================
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    if (typeof PUBLICATIONS === 'undefined') return;

    var listEl = document.getElementById('pub-list');
    var emptyEl = document.getElementById('pub-empty');
    var countEl = document.getElementById('pub-count');
    var searchEl = document.getElementById('pub-search-input');
    var typeRow = document.getElementById('filter-types');
    var areaRow = document.getElementById('filter-areas');

    var state = { q: '', type: 'All', area: 'All' };

    var TYPE_ORDER = ['All', 'Conference', 'Journal', 'Book', 'Overview', 'Workshop', 'Preprint'];
    var TYPE_LABEL = {
      All: 'All', Conference: 'Conference', Journal: 'Journal', Book: 'Book',
      Overview: 'Agenda & Overview', Workshop: 'Workshop', Preprint: 'Preprint'
    };

    // Collect research areas from data
    var areas = [];
    PUBLICATIONS.forEach(function (p) {
      (p.g || []).forEach(function (t) { if (areas.indexOf(t) === -1) areas.push(t); });
    });
    areas.sort();

    buildChips(typeRow, TYPE_ORDER.map(function (t) { return { v: t, label: TYPE_LABEL[t] }; }), 'type');
    buildChips(areaRow, [{ v: 'All', label: 'All' }].concat(areas.map(function (a) { return { v: a, label: a }; })), 'area');

    function buildChips(row, items, key) {
      if (!row) return;
      items.forEach(function (it, idx) {
        var b = document.createElement('button');
        b.className = 'chip' + (idx === 0 ? ' on' : '');
        b.type = 'button';
        b.textContent = it.label;
        b.setAttribute('data-value', it.v);
        b.addEventListener('click', function () {
          state[key] = it.v;
          row.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('on'); });
          b.classList.add('on');
          render();
        });
        row.appendChild(b);
      });
    }

    var debounce;
    if (searchEl) {
      searchEl.addEventListener('input', function () {
        clearTimeout(debounce);
        debounce = setTimeout(function () {
          state.q = searchEl.value.trim().toLowerCase();
          render();
        }, 120);
      });
    }

    function matches(p) {
      if (state.type !== 'All' && p.s !== state.type) return false;
      if (state.area !== 'All' && (p.g || []).indexOf(state.area) === -1) return false;
      if (state.q) {
        var hay = (p.t + ' ' + p.a + ' ' + p.v + ' ' + (p.g || []).join(' ')).toLowerCase();
        var terms = state.q.split(/\s+/);
        for (var i = 0; i < terms.length; i++) {
          if (hay.indexOf(terms[i]) === -1) return false;
        }
      }
      return true;
    }

    function esc(s) {
      return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function highlightPI(authors) {
      return esc(authors).replace(/Chung-Chi Chen/g, '<strong>Chung-Chi Chen</strong>');
    }

    function render() {
      var filtered = PUBLICATIONS.filter(matches);
      listEl.innerHTML = '';
      if (countEl) countEl.innerHTML = '<strong>' + filtered.length + '</strong> of ' + PUBLICATIONS.length + ' publications';
      if (emptyEl) emptyEl.style.display = filtered.length ? 'none' : 'block';

      // group by year (desc), unknown years last
      var groups = {};
      filtered.forEach(function (p) {
        var y = p.y || 'Other';
        (groups[y] = groups[y] || []).push(p);
      });
      var years = Object.keys(groups).sort(function (a, b) {
        if (a === 'Other') return 1; if (b === 'Other') return -1;
        return b.localeCompare(a);
      });

      years.forEach(function (y) {
        var h = document.createElement('h2');
        h.className = 'pub-year-header';
        h.textContent = y;
        listEl.appendChild(h);

        groups[y].forEach(function (p) {
          var d = document.createElement('article');
          d.className = 'pub-item';
          var linksHtml = '';
          Object.keys(p.l || {}).forEach(function (k) {
            var url = p.l[k];
            if (!url) return;
            linksHtml += '<a href="' + esc(url) + '" target="_blank" rel="noopener">' + esc(k) + ' ↗</a>';
          });
          var tagsHtml = '<span class="pub-tag type">' + esc(p.s) + '</span>';
          (p.g || []).forEach(function (t) { tagsHtml += '<span class="pub-tag">' + esc(t) + '</span>'; });

          d.innerHTML =
            '<h3 class="pub-title">' + esc(p.t) + '</h3>' +
            (p.a ? '<p class="pub-authors">' + highlightPI(p.a) + '</p>' : '') +
            (p.v ? '<p class="pub-venue">' + esc(p.v) + '</p>' : '') +
            (p.n ? '<p class="pub-note">' + esc(p.n) + '</p>' : '') +
            '<div class="pub-tags">' + tagsHtml + '</div>' +
            (linksHtml ? '<div class="pub-links">' + linksHtml + '</div>' : '');
          listEl.appendChild(d);
        });
      });
    }

    render();
  });
})();
