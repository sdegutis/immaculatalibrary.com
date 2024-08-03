declare module 'https://cdn.jsdelivr.net/npm/markdown-it@13.0.2/+esm' {
  import MarkdownIt = require('markdown-it/lib');
  export default MarkdownIt;
}

declare module 'markdown-it' {
  import MarkdownIt = require('markdown-it/lib');
  export default MarkdownIt;
}

declare module 'https://cdn.jsdelivr.net/npm/eases@1.0.8/+esm' {
  const eases = await import('eases');
  export default eases;
}
