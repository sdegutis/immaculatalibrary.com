import { loadContentFile, markdown } from '../core/helpers';
import { Book } from './books';
import { Tag } from './tag';

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
  tagsForSnippet: Set<Tag>;
}

export function snippetFromFile(file: FsFile): Snippet {
  const data = loadContentFile<Snippet>(file);
  data.route = `/book-snippets/${data.slug}.html`;
  data.archiveLink = `https://archive.org/details/${data.archiveSlug}/page/${data.archivePage}?view=theater`;
  data.previewMarkdown = derivePreview(data);
  data.renderedBody = markdown.render(data.content);
  data.renderedTitle = markdown.renderInline(data.title);

  data.tagsForSnippet = new Set([...data.tags ?? []].map(Tag.getOrCreate));
  for (const tag of data.tagsForSnippet) {
    tag.addSnippet(data);
  }

  return data;
}

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
