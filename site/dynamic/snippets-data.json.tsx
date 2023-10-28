import { SnippetSmallerJson } from "../dynamic/snippets/snippet.js";
import { Snippet, allSnippets } from "../model/snippets.js";

function snippetToJson(snippet: Snippet): SnippetSmallerJson {
  return {
    slug: snippet.slug,
    route: snippet.route,
    renderedTitle: snippet.renderedTitle,
    mins: snippet.mins,
    bookTitle: snippet.book.data.title,
    tags: snippet.data.tags,
  };
}

export default <>
  {JSON.stringify(allSnippets.map(snippetToJson))}
</>;
