function pushChildren(el: HTMLElement | SVGElement | DocumentFragment, children: any[]) {
  const added: (HTMLElement | SVGElement | DocumentFragment)[] = [];
  for (const child of children) {
    if (Array.isArray(child)) {
      added.push(...pushChildren(el, child));
    }
    else if (child && child.jsx) {
      const childEl = jsxToElement(child);
      if (childEl.nodeName === 'LINK') {
        document.head.append(childEl);
      }
      else {
        el.append(childEl);
        added.push(childEl);
      }
    }
    else if (!child) {
      // skip
    }
    else {
      el.append(child);
      added.push(child);
    }
  }
  return added;
}

type JSXElementKind = HTMLElement | SVGElement | DocumentFragment;

export function jsxToElement<T extends JSXElementKind = JSXElementKind>(jsx: JSX.Element): T {
  if (jsx.tag === '') {
    const el = document.createDocumentFragment();
    const added = pushChildren(el, jsx.children);
    if (added.length === 1) {
      const onlyChild = added[0]!;
      return onlyChild as T;
    }
    return el as T;
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
  return el as T;
}

const replacements: Record<string, string> = {
  "class": 'className',
};

const attributes = new Set(['d', 'viewBox']);
const svgs = new Set(['svg', 'path']);
