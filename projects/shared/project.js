document.querySelectorAll('[data-current-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const copyButton = document.querySelector('[data-copy-citation]');
const citation = document.querySelector('#bibtex');

if (copyButton && citation) {
  copyButton.addEventListener('click', async () => {
    const originalLabel = copyButton.textContent;
    try {
      await navigator.clipboard.writeText(citation.textContent.trim());
      copyButton.textContent = 'Copied';
    } catch {
      copyButton.textContent = 'Select text to copy';
    }
    window.setTimeout(() => {
      copyButton.textContent = originalLabel;
    }, 1800);
  });
}
