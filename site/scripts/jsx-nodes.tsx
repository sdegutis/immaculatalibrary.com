function pushChildren(el: HTMLElement | SVGElement | DocumentFragment, children: any[]) {
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

  const isSvg = svgs.has(jsx.tag);
  const el = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', jsx.tag) : document.createElement(jsx.tag);
  for (const [key, val] of Object.entries(jsx.attrs ?? {})) {
    if (isSvg) {
      const jsKey = key.replace(/-\w/, (s) => `${s.toUpperCase()}`);
      el.setAttribute(jsKey, val);
    }
    else {
      const jsKey = replacements[key] ?? key.replace(/-\w/, (s) => `${s.toUpperCase()}`);
      if (isSvg || attributes.has(jsKey)) {
        el.setAttribute(jsKey, val);
      }
      else {
        (el as any)[jsKey] = val;
      }
    }
  }
  pushChildren(el, jsx.children);
  return el;
}

const replacements: Record<string, string> = {
  "class": 'className',
};

const attributes = new Set(['d', 'viewBox']);
const svgs = new Set(['svg', 'path']);
