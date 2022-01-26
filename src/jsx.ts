
export type IntrinsicElements = /* {
  [Tag in keyof HTMLElementTagNameMap]: (
    { [Attr in keyof Omit<HTMLElementTagNameMap[Tag], 'children' | 'toString'>]?: string }
    & { children?: any, class?: string }
  );
} & {
    [Tag in keyof SVGElementTagNameMap]: (
      { [Attr in keyof Omit<SVGElementTagNameMap[Tag], 'children' | 'toString'>]?: string }
      & { children?: any, class?: string }
    );
  } & */ { [tag: string]: any };

export type Element = string;

const unary = new Set(['br', 'hr', 'input']);

export function jsxCreateStringifiedElement(tag: string | Function | symbol, attrs: any, ...children: any[]) {
  attrs ??= {};

  if (typeof tag === 'function') {
    return tag(attrs, children);
  }

  const childrenString = (children
    .flat()
    .filter(c =>
      c !== null &&
      c !== undefined &&
      c !== false)
    .join(''));

  if (typeof tag === 'symbol') {
    if (tag.description === 'fragment') {
      return childrenString;
    }
    else if (!tag.description) {
      throw new Error('Empty Symbol passed as JSX tag.');
    }
    tag = tag.description;
  }

  const attrsArray = Object.entries(attrs);
  const attrsString = (attrsArray.length > 0
    ? ' ' + attrsArray
      .map(([k, v]) => {
        if (v === true) return k;
        if (v === false || v === null || v === undefined) return '';
        return `${k}="${v}"`;
      })
      .join(' ')
    : '');

  if (unary.has(tag)) {
    return `<${tag}${attrsString}/>`;
  }

  return `<${tag}${attrsString}>${childrenString}</${tag}>`;
}
