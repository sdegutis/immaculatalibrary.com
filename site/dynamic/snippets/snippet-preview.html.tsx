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
    previewMarkdown: derivePreview(snippet),
    renderedBody: snippet.renderedBody,
  };
}

const PREVIEW_LENGTH = 2000;

function derivePreview(model: { content: string }) {
  const paragraphs = model.content.split(/(\r?\n>+ *\r?\n)/);

  let running = 0;
  for (let i = 0; i < paragraphs.length; i++) {
    running += paragraphs[i]!.length;
    if (running > PREVIEW_LENGTH) break;
  }

  if (running < model.content.length - 1) {
    return model.content.substring(0, running);
  }
  return null;
}

export default allSnippets.map(snippet => [`${snippet.slug}-preview.json`, <>
  {JSON.stringify(snippetToJson(snippet))}
</>]);
