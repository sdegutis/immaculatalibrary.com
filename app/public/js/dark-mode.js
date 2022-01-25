document.addEventListener('DOMContentLoaded', () => {
  const link = document.getElementById('dark-mode-toggle');
  reflectDarkMode(link);

  link.onclick = (e) => {
    e.preventDefault();

    const darkMode = !isDarkMode();
    localStorage.setItem('dark-mode', Number(darkMode));
    reflectDarkMode(link);

    gtag('event', 'toggle_dark_mode', {'event_category': 'Random Book Snippet', 'event_label': 'Turned it ' + (darkMode ? 'On' : 'Off')});
  };
});

function reflectDarkMode(link) {
  document.documentElement.classList.toggle('dark-mode', isDarkMode());

  link.innerText = (isDarkMode()
    ? link.dataset.lightmode
    : link.dataset.darkmode);
}

function isDarkMode() {
  return localStorage.getItem('dark-mode') === '1';
}
