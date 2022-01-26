declare const __file: import('./src/filesys').FsFile;
declare const __dir: import('./src/filesys').FsDir;

interface Session {
  isAdmin: boolean;
}

declare const persisted: {
  sessions: Map<string, Session>;
};

declare module JSX {
  export type IntrinsicElements = import('./src/jsx').IntrinsicElements;
  export type Element = import('./src/jsx').Element;
}

declare module 'dir:*/' {
  const dir: import('./src/filesys').FsDir;
  export default dir;
}

declare module 'file:*' {
  const file: import('./src/filesys').FsFile;
  export default file;
}
