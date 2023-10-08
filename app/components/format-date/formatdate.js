document.addEventListener('DOMContentLoaded', formatAllDates);

export function formatAllDates() {
  for (const el of document.querySelectorAll('.format-date')) {
    el.textContent = formatDate(el.textContent);
    el.classList.remove('format-date');
  }
}

function formatDate(dateStr) {
  return new Date(dateStr.split('-')).toLocaleDateString('en-EN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
