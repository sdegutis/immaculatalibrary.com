import { Snippet, allSnippets } from "../model/snippets.js";
import { SnippetSmallerJson } from "./snippets/snippet.js";

function snippetToJson(snippet: Snippet): SnippetSmallerJson {
  return {
    slug: snippet.slug,
    route: snippet.route,
    renderedTitle: snippet.renderedTitle,
    mins: snippet.mins,
    book: {
      data: {
        title: snippet.book.data.title,
        author: snippet.book.data.author,
      }
    },
    data: { tags: snippet.data.tags },
    content: snippet.content,
  };
}

export default <>
  {JSON.stringify(allSnippets.map(snippetToJson))}
</>;
