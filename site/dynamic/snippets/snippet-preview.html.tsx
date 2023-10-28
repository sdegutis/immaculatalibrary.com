import { Snippet, allSnippets } from "../../model/snippets.js";
import { SnippetJson } from "./snippet.js";

function snippetToJson(snippet: Snippet): SnippetJson {
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
    previewMarkdown: snippet.previewMarkdown,
    renderedBody: snippet.renderedBody,
  };
}

export default allSnippets.map(snippet => [`${snippet.slug}-preview.json`, <>
  {JSON.stringify(snippetToJson(snippet))}
</>]);
