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

type Component<T extends Record<string, any>> = (attrs: T, children: any) => string;
