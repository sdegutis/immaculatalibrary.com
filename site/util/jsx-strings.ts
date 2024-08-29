const UNARY = new Set(["img", "br", "hr", "input", "meta", "link"]);

export function jsxToString({ jsx: tag, children, ...attrs }: JSX.Element): string {
  if (typeof tag === 'function') {
    const result = tag(attrs, children);
    if (typeof result === 'object' && 'jsx' in result) {
      return jsxToString(result);
    }
    return result;
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
  parts.push('>');

  if (!UNARY.has(tag)) {
    pushChildren(children, parts);
    parts.push('</', tag, '>');
  }

  return parts.join('');
}

function pushChildren(children: any[], parts: string[]) {
  for (const child of children) {
    if (child !== null && child !== undefined && child !== false) {
      if (Array.isArray(child)) {
        pushChildren(child, parts);
      }
      else {
        if (typeof child === 'object' && 'jsx' in child) {
          parts.push(jsxToString(child));
        }
        else {
          parts.push(child);
        }
      }
    }
  }
}
