export const jsx = (tag: string | Function, { children, ...attrs }: Record<string, any>) => {
  return createJsxElement(tag, attrs, children);
}

export const jsxs = jsx;
export const Fragment = '';

function createJsxElement(tag: string | Function, attrs: any, ...children: any[]) {
  if (typeof tag === 'function')
    return tag(attrs ?? {}, children);
  else
    return jsxToString(tag, attrs, ...children);
}










const jsxToString = (tag: string | Function, attrs: any, ...children: any[]) => {
  if (typeof tag === 'function') return tag(attrs ?? {}, children);

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
  parts.push('>');

  pushChildren(children, parts);

  parts.push('</', tag, '>');

  return parts.join('');
};

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