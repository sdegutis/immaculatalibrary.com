declare type FsFile = import('./src/filesys').FsFile;
declare type FsDir = import('./src/filesys').FsDir;

declare const __file: FsFile;
declare const __dir: FsDir;

declare module JSX {
  export type IntrinsicElements = {
    [tag: string]: Record<string, string | boolean>;
  };
  export type Element = {
    tag: string,
    attrs: Record<string, any> | null,
    children: any[],
  };
  export type Component<T extends Record<string, any>> =
    (attrs: T, children: any) => Element;
}

declare module '*/' {
  const dir: FsDir;
  export default dir;
}
