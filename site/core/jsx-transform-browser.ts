export const jsx = (tag: string | Function, fullAttrs: Record<string, any>) => {
  const { children, ...attrs } = fullAttrs;

  if (typeof tag === 'function') {
    return tag(attrs ?? {}, children);
  }

  if (tag === '') {
    if (!Array.isArray(children)) {
      return children;
    }
    else if (children.length === 1) {
      return children[0];
    }

    const el = document.createDocumentFragment();
    pushChildren(el, children);
    return el;
  }

  const isSvg = svgs.has(tag);
  const el = (isSvg
    ? document.createElementNS('http://www.w3.org/2000/svg', tag)
    : document.createElement(tag));

  pushChildren(el, children);

  for (const [key, val] of Object.entries(attrs ?? {})) {
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
  return el;
}

function pushChildren(el: DocumentFragment | HTMLElement | SVGElement, children: any) {
  const goodChildren = [children].flat(Infinity).filter(o => o);
  for (const child of goodChildren) {
    if (child instanceof HTMLLinkElement || child instanceof HTMLStyleElement) {
      document.head.append(child);
    }
    else {
      el.append(child);
    }
  }
}

export const jsxs = jsx;
export const Fragment = '';

const replacements: Record<string, string> = {
  "class": 'className',
};

const attributes = new Set(['d', 'viewBox']);
const svgs = new Set(['svg', 'path']);
