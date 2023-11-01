import { Snippet, allSnippets } from "../../model/snippets.js";

export type SnippetSmallerJson = ReturnType<typeof snippetToJson>;

function snippetToJson(snippet: Snippet) {
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
