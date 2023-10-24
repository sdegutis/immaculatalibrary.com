reflectDarkMode();

document.addEventListener('DOMContentLoaded', () => {
  reflectDarkMode();

  for (const button of getDarkModeButtons()) {
    button.onclick = (e) => {
      e.preventDefault();
      localStorage.setItem('dark-mode', Number(!isDarkMode()).toString());
      reflectDarkMode();
    };
  }
});


function getDarkModeButtons() {
  return document.querySelectorAll<HTMLButtonElement>('.dark-mode-toggle');
}

function reflectDarkMode() {
  document.documentElement.classList.toggle('dark-mode', isDarkMode());

  for (const button of getDarkModeButtons()) {
    button.innerText = (isDarkMode()
      ? "Light mode"
      : "Dark mode");
  }
}

function isDarkMode() {
  const stored = localStorage.getItem('dark-mode');
  if (stored === null) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return stored === '1';
}
