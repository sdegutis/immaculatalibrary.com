for (const a of document.querySelectorAll<HTMLAnchorElement>('.copylink')) {
  a.addEventListener('click', e => {
    e.preventDefault();

    navigator.clipboard.writeText(a.href);

    const done = document.createElement('span');
    done.innerHTML = 'Link copied.';
    a.insertAdjacentElement('afterend', done);
    a.hidden = true;

    setTimeout(() => {
      a.hidden = false;
      done.remove();
    }, 3000);
  });
}
