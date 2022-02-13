const unary = new Set(['br', 'hr', 'input']);

interface Context {
  head?: JSX.Element;
  stylesheets: Set<string>;
  scripts: Set<string>;
}

type PlainElement = {
  tag: string,
  attrs: Record<string, any>,
  children: any[],
};

export function renderElement(element: JSX.Element): Buffer {
  const simpleElement = evalTree(element) as PlainElement;

  const context: Context = {
    stylesheets: new Set(),
    scripts: new Set(),
  };

  hoistHeadThings(simpleElement, context);

  context.head ??= createHead(simpleElement);
  context.head.children.push(...context.stylesheets);
  context.head.children.push(...context.scripts);

  return Buffer.from(elementToString(simpleElement));
}

function evalTree(element: JSX.Element) {
  while (typeof element.tag === 'function') {
    element = element.tag(element.attrs, element.children);
  }

  element.children = element.children.flat().map(child => {
    if (isElement<JSX.Element>(child)) {
      return evalTree(child);
    }
    else {
      return child;
    }
  });

  return element;
}

function hoistHeadThings(element: PlainElement, context: Context) {
  if (element.tag === 'head') {
    context.head = element;
  }

  element.children = element.children.map(child => {
    if (isElement<PlainElement>(child)) {
      if (child.tag === 'link' && child.attrs["rel"] === 'stylesheet') {
        context.stylesheets.add(elementToString(child));
        return '';
      }
      else if (child.tag === 'script' && child.attrs["src"]) {
        context.scripts.add(elementToString(child));
        return '';
      }
      hoistHeadThings(child, context);
    }
    return child;
  });
}

function elementToString(element: PlainElement): string {
  const childrenString = (element.children
    .flat()
    .map(child => {
      if (child === undefined || child === null || child === false) {
        return '';
      }
      else if (isElement<PlainElement>(child)) {
        return elementToString(child);
      }
      else {
        return String(child);
      }
    })
    .join(''));

  if (element.tag === '') {
    return childrenString;
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

  if (unary.has(element.tag as string)) {
    return `<${element.tag}${attrsString}/>`;
  }

  return `<${element.tag}${attrsString}>${childrenString}</${element.tag}>`;
}

function isElement<T extends PlainElement | JSX.Element>(object: any): object is T {
  return (
    typeof object === 'object'
    && 'tag' in object
    && 'attrs' in object
    && 'children' in object
  );
}

function createHead(root: PlainElement): PlainElement {
  const head = <head /> as PlainElement;
  root.children.unshift(head);
  return head;
}
