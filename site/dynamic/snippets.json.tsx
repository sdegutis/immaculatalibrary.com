import { allSnippets } from '../model/snippets.js';

export default <>
  {JSON.stringify(Object.fromEntries(allSnippets.map(snippet => [
    snippet.slug,
    snippet.content.toLowerCase()
    + snippet.data.title.toLowerCase()
    + snippet.book.data.title.toLowerCase()
    + snippet.book.data.author.toLowerCase()
  ])))}
</>;
