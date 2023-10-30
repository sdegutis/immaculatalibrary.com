function pushChildren(el: HTMLElement | DocumentFragment, children: any[]) {
  for (const child of children) {
    if (Array.isArray(child)) {
      pushChildren(el, child);
    }
    else if (child && child.jsx) {
      el.append(jsxToElement(child));
    }
    else if (!child) {
      // skip
    }
    else {
      el.append(child);
    }
  }
}

export function jsxToElement(jsx: JSX.Element) {
  if (jsx.tag === '') {
    const el = document.createDocumentFragment();
    pushChildren(el, jsx.children);
    return el;
  }

  const el = document.createElement(jsx.tag);
  for (const [key, val] of Object.entries(jsx.attrs ?? {})) {
    if (key.startsWith('data-')) {
      const dataKey = key.slice(5);
      el.dataset[dataKey] = val;
    }
    else {
      const jsKey = key.replace(/-\w/, (s) => `${s.toUpperCase()}`);
      (el as any)[jsKey] = val;
    }
  }
  pushChildren(el, jsx.children);
  return el;
}
