declare module JSX {
  export type IntrinsicElements = {
    [tag: string]: Record<string, string | boolean | Function>;
  };
  export type Element = HTMLElement | SVGElement | DocumentFragment | string;
  export type Component<T extends Record<string, any> = {}, C extends any[] = any[]> =
    (attrs: T, children: C) => Element;
}

type FsFile = {
  path: string;
  content: Buffer;
};

declare module '*/' {
  const dir: FsFile[];
  export default dir;
}

declare module 'https://cdn.jsdelivr.net/npm/markdown-it@13.0.2/+esm' {
  import md = require('markdown-it/lib');
  export default md;
}

declare module 'markdown-it' {
  import md = require('markdown-it/lib');
  export default md;
}
