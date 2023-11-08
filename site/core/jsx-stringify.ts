const UNARY = new Set(["img", "br", "hr", "input", "meta", "link"]);

export type JSXElement = {
  jsx: true,
  tag: string,
  attrs: Record<string, any> | null,
  children: any[],
};

export function jsxToString(element: JSXElement): string {
  element = { jsx: true, tag: '', attrs: {}, children: [element] };

  const context: RenderContext = { head: element, hoisted: new Set() };
  hoistHeadThings(element, context);
  context.head.children.push(...context.hoisted);

  const parts: string[] = [];
  addElement(element, parts);
  return parts.join('');
}

interface RenderContext {
  head: JSXElement;
  hoisted: Set<string>,
}

function hoistHeadThings(element: JSXElement, context: RenderContext) {
  if (element.tag === 'head') {
    context.head = element;
  }
  hoistInArray(element.children, context);
}

function hoistInArray(array: any[], context: RenderContext) {
  for (let i = 0; i < array.length; i++) {
    const child = array[i];
    if (child && typeof child === 'object' && child.jsx) {
      if (child.tag === 'style' || child.tag === 'script' || child.tag === 'link') {
        array.splice(i--, 1);

        const parts: string[] = [];
        addElement(child, parts);
        context.hoisted.add(parts.join(''));
      }
      else {
        hoistHeadThings(child, context);
      }
    }
    else if (Array.isArray(child)) {
      hoistInArray(child, context);
    }
  }
}

function addElement(element: JSXElement, parts: string[]) {
  if (element.tag === '') {
    pushChildren(element.children, parts);
    return;
  }

  parts.push('<', element.tag);

  for (const k in element.attrs) {
    const v = element.attrs[k];
    if (v === true)
      parts.push(' ', k);
    else if (v === false || v === null || v === undefined)
      continue;
    else
      parts.push(' ', k, '="', v, '"');
  }

  if (UNARY.has(element.tag)) {
    parts.push('/>');
  }
  else {
    parts.push('>');
    pushChildren(element.children, parts);
    parts.push('</', element.tag, '>');
  }
}

function pushChildren(children: any[], parts: string[]) {
  for (const child of children) {
    if (child === undefined || child === null || child === false) {
      continue;
    }
    else if (Array.isArray(child)) {
      pushChildren(child, parts);
    }
    else if (typeof child === 'object' && child.jsx) {
      addElement(child, parts);
    }
    else {
      parts.push(child);
    }
  }
}
