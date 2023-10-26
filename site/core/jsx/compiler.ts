export const jsx = (tag: string | undefined | Function, { children, ...attrs }: Record<string, any>) => {
  return createJsxElement(tag ?? '', attrs, children);
}

export const jsxs = jsx;
export const Fragment = undefined;

function createJsxElement(tag: string | Function, attrs: any, ...children: any[]) {
  if (typeof tag === 'function')
    return tag(attrs ?? {}, children);
  else
    return { jsx: true, tag, attrs, children };
}
