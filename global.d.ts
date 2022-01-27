declare type RouteHandler = import('./src/http').RouteHandler;
declare type RouteInput = import('./src/http').RouteInput;
declare type RouteOutput = import('./src/http').RouteOutput;

declare type FsFile = import('./src/filesys').FsFile;
declare type FsDir = import('./src/filesys').FsDir;

declare const __file: FsFile;
declare const __dir: FsDir;

declare module JSX {
  export type IntrinsicElements = import('./src/jsx').IntrinsicElements;
  export type Element = import('./src/jsx').Element;
}

declare module 'dir:*/' {
  const dir: FsDir;
  export default dir;
}

declare module 'file:*' {
  const file: FsFile;
  export default file;
}

type Component<T extends Record<string, any>> = (attrs: T, children: any) => string;
