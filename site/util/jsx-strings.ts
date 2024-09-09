const UNARY = new Set(["img", "br", "hr", "input", "meta", "link"]);

const jsx = Symbol.for('jsx');

export function jsxToString(object: any): string {
  const t = typeof object;
  if (t === 'string') return object;
  if (t === 'undefined' || t === 'boolean' || object === null) return '';
  if (t !== 'object') return String(object);

  const parts: string[] = [];

  if (object instanceof Array) {
    for (const child of object) {
      parts.push(jsxToString(child));
    }
    return parts.join('');
  }

  if (!(jsx in object)) return String(object);
  const { [jsx]: tag, ...attrs } = object;

  if (typeof tag === 'function') {
    return jsxToString(tag(attrs));
  }

  let children = attrs.children;
  if (!Array.isArray(children)) children = [children];
  delete attrs.children;

  if (tag === '') {
    for (const child of children) {
      parts.push(jsxToString(child));
    }
    return parts.join('');
  }

  parts.push('<', tag);
  for (const k in attrs) {
    const v = attrs[k];
    if (v === true)
      parts.push(' ', k);
    else if (v)
      parts.push(' ', k, '="', v, '"');
  }
  parts.push('>');

  if (!UNARY.has(tag)) {
    for (const child of children) {
      parts.push(jsxToString(child));
    }
    parts.push('</', tag, '>');
  }

  return parts.join('');
}
