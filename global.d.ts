declare module JSX {
  export type IntrinsicElements = {
    [tag: string]: Record<string, string | boolean>;
  };
  export type Element = {
    jsx: true,
    tag: string,
    attrs: Record<string, any> | null,
    children: any[],
  };
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
  export default await import('markdown-it');
}
