const __file: import('../src/filesys').File;
const __dir: import('../src/filesys').Dir;

module JSX {
  type IntrinsicElements = import('../src/jsx-stringify').IntrinsicElements;
  type Element = import('../src/jsx-stringify').Element;
}

module '*/' {
  const dir: import('../src/filesys').Dir;
  export default dir;
}

module '*' {
  const file: import('../src/filesys').File;
  export default file;
}
