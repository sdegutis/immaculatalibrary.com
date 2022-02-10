const unary = new Set(['br', 'hr', 'input']);

export function renderElement(element: JSX.Element): Buffer {
  while (typeof element.tag === 'function') {
    element = element.tag(element.attrs, element.children);
  }

  const childrenString = (element.children
    .flat()
    .filter(isPresent)
    .map(child => {
      if (typeof child === 'object' &&
        'tag' in child &&
        'attrs' in child &&
        'children' in child
      ) return renderElement(child);
      return String(child);
    })
    .join(''));

  if (element.tag === '') {
    return Buffer.from(childrenString);
  }

  const attrsArray = Object.entries(element.attrs);
  const attrsString = (attrsArray.length > 0
    ? ' ' + attrsArray
      .map(([k, v]) => {
        if (v === true) return k;
        if (v === false || v === null || v === undefined) return '';
        return `${k}="${v}"`;
      })
      .join(' ')
    : '');

  if (unary.has(element.tag)) {
    return Buffer.from(`<${element.tag}${attrsString}/>`);
  }

  return Buffer.from(`<${element.tag}${attrsString}>${childrenString}</${element.tag}>`);
}

function isPresent<T>(o: T | false | undefined | null): o is T {
  return o !== null &&
    o !== undefined &&
    o !== false;
}
