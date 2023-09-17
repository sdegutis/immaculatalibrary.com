import { loadContentFile } from '../util/data-files';
import { markdown } from '../util/helpers';
import { Book } from './books';

const PREVIEW_LENGTH = 2000;

export interface Snippet {
  date: string;
  slug: string;
  content: string;

  published: boolean;
  title: string;
  archiveSlug: string;
  archivePage: string;
  bookSlug: string;
  tags: string[];

  route: string;
  archiveLink: string;
  previewMarkdown: string | null;
  renderedBody: string;
  renderedTitle: string;

  book: Book;
  prevSnippet?: Snippet;
  nextSnippet?: Snippet;
}

export function snippetFromFile(file: FsFile) {
  const data = loadContentFile<Snippet>(file);
  data.route = `/book-snippets/${data.slug}.html`;
  data.archiveLink = `https://archive.org/details/${data.archiveSlug}/page/${data.archivePage}?view=theater`;
  data.previewMarkdown = derivePreview(data);
  data.renderedBody = markdown.render(data.content);
  data.renderedTitle = markdown.renderInline(data.title);
  return data;
}

// ) {

//   this.tags = new Set([...tags].map(Tag.getOrCreate));
//   for (const tag of this.tags) {
//     tag.addSnippet(this);
//   }

// }

function derivePreview(snippet: Snippet) {
  const paragraphs = snippet.content.trim().split(/(\r?\n>+ *\r?\n)/);

  let running = 0;
  for (let i = 0; i < paragraphs.length; i++) {
    running += paragraphs[i]!.length;
    if (running > PREVIEW_LENGTH) break;
  }

  if (running < snippet.content.trim().length - 1) {
    return snippet.content.substring(0, running);
  }
  return null;
}
