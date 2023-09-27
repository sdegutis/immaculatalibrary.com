const UNARY = new Set(['br', 'hr', 'input']);

interface Context {
  head?: JSX.Element;
  stylesheets: Set<string>;
  scripts: Set<string>;
}

export function renderElement(element: JSX.Element): Buffer {
  const context: Context = {
    stylesheets: new Set(),
    scripts: new Set(),
  };

  hoistHeadThings(element, context);

  context.head ??= createHead(element);
  context.head.children.push(...context.stylesheets);
  context.head.children.push(...context.scripts);

  const topChild = element.children[0];
  if (isElement(topChild) && topChild.tag === 'head' && topChild.children.length === 0) {
    element.children.shift();
  }

  return Buffer.from(elementToString(element));
}

function hoistHeadThings(element: JSX.Element, context: Context) {
  if (element.tag === 'head') {
    context.head = element;
    return;
  }

  element.children = element.children.map(child => {
    if (isElement<JSX.Element>(child)) {
      if (child.tag === 'link' && child.attrs?.["rel"] === 'stylesheet') {
        context.stylesheets.add(elementToString(child));
        return '';
      }
      else if (child.tag === 'script' && child.attrs?.["src"]) {
        context.scripts.add(elementToString(child));
        return '';
      }
      hoistHeadThings(child, context);
    }
    return child;
  });
}

function elementToString(element: JSX.Element): string {
  const childrenString = (element.children
    .flat(Infinity)
    .map(child => {
      if (child === undefined || child === null || child === false) {
        return '';
      }
      else if (isElement<JSX.Element>(child)) {
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

  const attrsArray = Object.entries(element.attrs ?? {});
  const attrsString = (attrsArray.length > 0
    ? ' ' + attrsArray
      .map(([k, v]) => {
        if (v === true) return k;
        if (v === false || v === null || v === undefined) return '';
        return `${k}="${v}"`;
      })
      .join(' ')
    : '');

  if (UNARY.has(element.tag as string)) {
    return `<${element.tag}${attrsString}/>`;
  }

  return `<${element.tag}${attrsString}>${childrenString}</${element.tag}>`;
}

function isElement<T extends JSX.Element | JSX.Element>(object: any): object is T {
  return (
    typeof object === 'object'
    && object !== null
    && 'tag' in object
    && 'attrs' in object
    && 'children' in object
  );
}

function createHead(root: JSX.Element): JSX.Element {
  const head = <head />;
  root.children.unshift(head);
  return head;
}
