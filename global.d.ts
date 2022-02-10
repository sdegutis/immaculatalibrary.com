declare type FsFile = import('./src/filesys').FsFile;
declare type FsDir = import('./src/filesys').FsDir;

declare const __file: FsFile;
declare const __dir: FsDir;

declare module JSX {
  export type IntrinsicElements = {
    [tag: string]: Record<string, string | boolean>;
  };
  export type Element = {
    tag: string | Component<any>,
    attrs: Record<string, any>,
    children: any[],
  };
  export type Component<T extends Record<string, any>> =
    (attrs: T, children: any) => Element;
}

declare module '*/' {
  const dir: FsDir;
  export default dir;
}

declare module '*.css' {
  const file: FsFile;
  export default file;
}

declare module '*.js' {
  const file: FsFile;
  export default file;
}

declare module '*.jpg' {
  const file: FsFile;
  export default file;
}

declare module '*.json' {
  const file: FsFile;
  export default file;
}
