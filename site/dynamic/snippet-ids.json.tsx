import { allSnippets } from '../model/snippets.js';

export default <>
  {JSON.stringify(allSnippets.map(snippet => snippet.slug))}
</>;
