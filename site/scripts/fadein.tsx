for (const el of document.querySelectorAll('.fadein')) {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry!.isIntersecting) {
      el.classList.toggle('ready');
      observer.disconnect();
    }
  }, { threshold: 0.2 });
  observer.observe(el);
}
