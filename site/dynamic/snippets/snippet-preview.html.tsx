import { Snippet, allSnippets } from "../../model/snippets.js";
import { SnippetJson } from "../../shared/snippet.js";

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
    previewMarkdown: derivePreview(snippet),
    renderedBody: snippet.renderedBody,
  };
}

const PREVIEW_LINES = 30;
const AVERAGE_LINE_LENGTH = 50;

function derivePreview(model: { content: string }) {
  const newline = model.content.indexOf(' ', PREVIEW_LINES * AVERAGE_LINE_LENGTH);
  if (newline !== -1)
    return model.content.slice(0, newline) + ' ...';
  else
    return null;
}

export default allSnippets.map(snippet => [`${snippet.slug}-preview.json`, <>
  {JSON.stringify(snippetToJson(snippet))}
</>]);
