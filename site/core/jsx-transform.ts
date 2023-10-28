export const jsx = (tag: string | Function, { children, ...attrs }: Record<string, any>) => {
  return createJsxElement(tag, attrs, children);
}

// TODO: figure this mess out

export const jsxs = jsx;
export const Fragment = '';

function createJsxElement(tag: string | Function, attrs: any, ...children: any[]) {
  if (typeof tag === 'function')
    return tag(attrs ?? {}, children);
  else
    return { jsx: true, tag, attrs, children };
}
