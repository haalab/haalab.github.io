// Keep older joint publications available without lengthening every card.
(function () {
  'use strict';

  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)');

  document.querySelectorAll('.person-more-papers').forEach(function (details) {
    var summary = details.querySelector('summary');
    var hovering = false;
    var openedOnHover = false;

    function closeHoverPreview() {
      if (openedOnHover && !hovering && !details.contains(document.activeElement)) {
        details.open = false;
        openedOnHover = false;
      }
    }

    details.addEventListener('pointerenter', function (event) {
      if (!canHover.matches || event.pointerType !== 'mouse') return;
      hovering = true;
      if (!details.open) {
        details.open = true;
        openedOnHover = true;
      }
    });

    details.addEventListener('pointerleave', function () {
      hovering = false;
      closeHoverPreview();
    });

    details.addEventListener('focusout', function () {
      // Wait until the next focused element is known before closing the list.
      queueMicrotask(closeHoverPreview);
    });

    summary.addEventListener('click', function () {
      // Leave explicit keyboard and touch toggles to the native disclosure.
      openedOnHover = false;
    });

    details.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape' || !details.open) return;
      event.preventDefault();
      details.open = false;
      openedOnHover = false;
      summary.focus();
    });
  });
})();
