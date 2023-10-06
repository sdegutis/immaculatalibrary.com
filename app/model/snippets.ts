import { DataFileWithDate, calculateReadingMins, loadContentFile, markdown } from '../core/helpers';
import { Book } from './books';
import { Tag } from './tag';

const PREVIEW_LENGTH = 2000;

interface SnippetFile extends DataFileWithDate {
  published: boolean;
  title: string;
  archiveSlug: string;
  archivePage: string;
  bookSlug: string;
  tags?: string[];
}

export class Snippet {

  route: string;
  archiveLink: string;
  previewMarkdown: string | null;
  renderedBody: string;
  renderedTitle: string;
  mins: number;

  book!: Book;
  prevSnippet?: Snippet;
  nextSnippet?: Snippet;
  tagsForSnippet: Set<Tag>;

  constructor(public data: SnippetFile) {
    data.tags ??= [];

    this.route = `/book-snippets/${data.slug}.html`;
    this.archiveLink = `https://archive.org/details/${data.archiveSlug}/page/${data.archivePage}?view=theater`;
    this.previewMarkdown = derivePreview(data);
    this.renderedBody = markdown.render(data.content);
    this.renderedTitle = markdown.renderInline(data.title);
    this.mins = calculateReadingMins(data.content);

    this.tagsForSnippet = new Set([...data.tags ?? []].map(Tag.getOrCreate));
  }

}

export function snippetFromFile(file: [string, Buffer]): Snippet {
  const data = loadContentFile<SnippetFile>(file);
  return new Snippet(data);
}

function derivePreview(data: SnippetFile) {
  const paragraphs = data.content.trim().split(/(\r?\n>+ *\r?\n)/);

  let running = 0;
  for (let i = 0; i < paragraphs.length; i++) {
    running += paragraphs[i]!.length;
    if (running > PREVIEW_LENGTH) break;
  }

  if (running < data.content.trim().length - 1) {
    return data.content.substring(0, running);
  }
  return null;
}
