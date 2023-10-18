function copylink(e) {
  e.preventDefault();
  const a = e.target;
  navigator.clipboard.writeText(a.href);

  const done = document.createElement('span');
  done.innerHTML = ' (Copied)';
  a.parentElement.insertAdjacentElement('beforeend', done);

  setTimeout(() => {
    done.remove();
  }, 3000);
}
