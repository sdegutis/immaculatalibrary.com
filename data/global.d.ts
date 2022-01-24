const __file: import('../src/filesys').FsFile;
const __dir: import('../src/filesys').FsDir;

function restartSite(): void;

module JSX {
  type IntrinsicElements = import('../src/jsx-stringify').IntrinsicElements;
  type Element = import('../src/jsx-stringify').Element;
}

module 'dir:*/' {
  const dir: import('../src/filesys').FsDir;
  export default dir;
}

module 'file:*' {
  const file: import('../src/filesys').FsFile;
  export default file;
}
