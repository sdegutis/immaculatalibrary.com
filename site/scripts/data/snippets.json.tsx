import { Snippet, allSnippets } from "../../model/snippets.js";

export type SnippetSmallerJson = ReturnType<typeof snippetToJson>;

function snippetToJson(snippet: Snippet) {
  return {
    slug: snippet.slug,
    route: snippet.route,
    title: snippet.renderedTitle,
    mins: snippet.mins,
    bookTitle: snippet.book.data.title,
    bookAuthor: snippet.book.data.author,
    tags: snippet.data.tags,
    markdown: snippet.content,
  };
}

export default <>
  {JSON.stringify(allSnippets.map(snippetToJson))}
</>;
