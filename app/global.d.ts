const __file: import('../src/filesys').FsFile;
const __dir: import('../src/filesys').FsDir;

interface Session {
  isAdmin: boolean;
}

const persisted: {
  sessions: Map<string, Session>;
};

module JSX {
  type IntrinsicElements = import('../src/jsx').IntrinsicElements;
  type Element = import('../src/jsx').Element;
}

module 'dir:*/' {
  const dir: import('../src/filesys').FsDir;
  export default dir;
}

module 'file:*' {
  const file: import('../src/filesys').FsFile;
  export default file;
}
