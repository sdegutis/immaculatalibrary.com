function copylink(e) {
  e.preventDefault();
  const a = e.target;
  navigator.clipboard.writeText(a.href);

  const done = document.createElement('span');
  done.innerHTML = 'Link copied.';
  a.insertAdjacentElement('afterend', done);
  a.hidden = true;

  setTimeout(() => {
    a.hidden = false;
    done.remove();
  }, 3000);
}