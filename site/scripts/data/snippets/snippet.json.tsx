import { Snippet, allSnippets } from "../../../model/snippets.js";

function snippetToJson(snippet: Snippet) {
  return {
    route: snippet.route,
    renderedTitle: snippet.renderedTitle,
    date: snippet.date,
    mins: snippet.mins,
    bookAuthor: snippet.book.data.author,
    bookRoute: snippet.book.route,
    bookTitle: snippet.book.data.title,
    archiveLink: snippet.archiveLink,
    archivePage: snippet.data.archivePage,
    content: snippet.content,
  };
}

export type SnippetJson = ReturnType<typeof snippetToJson>;

export default allSnippets.map(snippet => [`${snippet.slug}.json`, <>
  {JSON.stringify(snippetToJson(snippet))}
</>]);
