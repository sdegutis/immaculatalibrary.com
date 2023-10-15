import { allSnippets } from '../../model/snippets';

export default <>
  {JSON.stringify(allSnippets.map(snippet => snippet.slug))}
</>;
