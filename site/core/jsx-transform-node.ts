const UNARY = new Set(["img", "br", "hr", "input", "meta", "link"]);

export const jsx = (tag: string | Function, { children, ...attrs }: Record<string, any>) => {
  if (children === null || children === undefined) children = [];
  if (!Array.isArray(children)) children = [children];

  if (typeof tag === 'function') {
    return tag(attrs ?? {}, children);
  }

  const parts: string[] = [];

  if (tag === '') {
    pushChildren(children, parts);
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

  if (UNARY.has(tag)) {
    parts.push('/>');
  }
  else {
    parts.push('>');
    pushChildren(children, parts);
    parts.push('</', tag, '>');
  }

  return parts.join('');
}

export const jsxs = jsx;
export const Fragment = '';

function pushChildren(children: any[], parts: string[]) {
  for (const child of children) {
    if (child) {
      if (Array.isArray(child)) {
        pushChildren(child, parts);
      }
      else {
        parts.push(child);
      }
    }
  }
}
