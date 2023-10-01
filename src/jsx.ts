export class JsxElement {

  constructor(
    public tag: string,
    public attrs: Record<string, any> | null,
    public children: any[],
  ) { }

  stringify(): string {
    const element = createJsxElement('', null, this);

    const context: RenderContext = { head: element, hoisted: new Set() };
    hoistHeadThings(element, context);
    context.head.children.push(...context.hoisted);

    const parts: string[] = [];
    addElement(element, parts);
    return parts.join('');
  }

}

interface RenderContext {
  head: JsxElement;
  hoisted: Set<string>,
}

function hoistHeadThings(element: JsxElement, context: RenderContext) {
  if (element.tag === 'head') {
    context.head = element;
  }
  hoistInArray(element.children, context);
}

function hoistInArray(array: any[], context: RenderContext) {
  for (let i = 0; i < array.length; i++) {
    const child = array[i];
    if (child instanceof JsxElement) {
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

function addElement(element: JsxElement, parts: string[]) {
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

  parts.push('>');
  pushChildren(element.children, parts);
  parts.push('</', element.tag, '>');
}

function pushChildren(children: any[], parts: string[]) {
  for (const child of children) {
    if (child === undefined || child === null || child === false) {
      continue;
    }
    else if (child instanceof JsxElement) {
      addElement(child, parts);
    }
    else if (Array.isArray(child)) {
      pushChildren(child, parts);
    }
    else {
      parts.push(child);
    }
  }
}

export function createJsxElement(tag: string | Function, attrs: any, ...children: any[]): JsxElement {
  if (typeof tag === 'function')
    return tag(attrs ?? {}, children);
  else
    return new JsxElement(tag, attrs, children);
}
