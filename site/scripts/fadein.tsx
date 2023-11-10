new MutationObserver((records) => {
  for (const record of records) {
    for (const node of record.target.childNodes) {
      if (node instanceof HTMLElement) {
        if (node.matches('.fadein:not(.ready)')) {
          fadeIn(node);
        }
      }
    }
  }
}).observe(document.documentElement, {
  subtree: true,
  childList: true,
});

for (const el of document.querySelectorAll<HTMLElement>('.fadein:not(.ready)')) {
  fadeIn(el);
}

function fadeIn(el: HTMLElement) {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry!.isIntersecting) {
      el.classList.toggle('ready');
      observer.disconnect();
    }
  }, { threshold: 0.1 });
  observer.observe(el);
}
