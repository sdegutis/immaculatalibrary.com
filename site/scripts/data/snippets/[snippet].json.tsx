import { Snippet, allSnippets } from "../../../_model/snippets.js";

function snippetToJson(snippet: Snippet) {
  return {
    route: snippet.route,
    renderedTitle: snippet.renderedTitle,
    date: snippet.date,
    mins: snippet.mins,
    bookAuthor: snippet.book.data.author,
    bookSlug: snippet.data.bookSlug,
    bookRoute: snippet.book.route,
    bookTitle: snippet.book.data.title,
    bookSnippetsCount: snippet.book.snippets.length,
    archiveLink: snippet.archiveLink,
    archivePage: snippet.data.archivePage,
    archiveSlug: snippet.data.archiveSlug,
    content: snippet.content,
    prevSnippet: snippet.prevSnippet?.slug ?? '',
    nextSnippet: snippet.nextSnippet?.slug ?? '',
  };
}

export type SnippetJson = ReturnType<typeof snippetToJson>;

export default allSnippets.map(snippet => [snippet.slug, snippetToJson(snippet)]);
