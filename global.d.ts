declare module JSX {
  export type IntrinsicElements = {
    [tag: string]: Record<string, string | boolean>;
  };
  export type Element = import('./src/jsx').JsxElement;
  export type Component<T extends Record<string, any>> =
    (attrs: T, children: any) => Element;
}

declare module '*/' {
  const dir: [string, Buffer][];
  export default dir;
}

declare module '*.css' {
  const file: [string, Buffer];
  export default file;
}
