function createTree(spec: JSX.Element) {
  const el = document.createElement(spec.tag);
  for (const child of spec.children) {
    if (typeof child === 'string') {
      el.append(child);
    }
  }
  return el;
}

for (const a of document.querySelectorAll<HTMLAnchorElement>('.copylink')) {
  a.addEventListener('click', e => {
    e.preventDefault();

    navigator.clipboard.writeText(a.href);

    const done = createTree(<span>Link copied.</span>);
    a.insertAdjacentElement('afterend', done);
    a.hidden = true;

    setTimeout(() => {
      a.hidden = false;
      done.remove();
    }, 3000);
  });
}
