import { DataFileWithDate } from "../core/data-files.js";
import { markdown, sortBy } from "../core/helpers.js";
import allSnippetFiles from "../data/snippets/";
import { calculateReadingMins } from '../shared/helpers.js';
import { Book, allBooks, booksBySlug } from './books.js';
import { Tag } from './tag.js';

const PREVIEW_LENGTH = 2000;

interface SnippetFile {
  published: boolean;
  title: string;
  archiveSlug: string;
  archivePage: string;
  bookSlug: string;
  tags: string[];
}

export class Snippet extends DataFileWithDate<SnippetFile> {

  static override modelDir = 'snippets';

  route: string;
  archiveLink: string;
  previewMarkdown: string | null;
  renderedBody: string;
  renderedTitle: string;
  mins: number;

  book: Book;
  prevSnippet?: Snippet;
  nextSnippet?: Snippet;
  tags: Set<Tag>;

  constructor(slug: string, content: string, data: SnippetFile) {
    super(slug, content, data);

    this.data.tags ??= [];

    this.route = `/book-snippets/${this.slug}.html`;

    this.archiveLink = `https://archive.org/details/${this.data.archiveSlug}/page/${this.data.archivePage}?view=theater`;
    this.previewMarkdown = derivePreview(this);
    this.renderedBody = markdown.render(this.content);
    this.renderedTitle = markdown.renderInline(this.data.title);
    this.mins = calculateReadingMins(this.content);

    this.tags = new Set([...this.data.tags ?? []].map(Tag.getOrCreate));

    const book = booksBySlug[this.data.bookSlug]!;
    this.book = book;
    book.snippets.push(this);
  }

}

export const allSnippets = (allSnippetFiles
  .map(file => Snippet.fromFile(file))
  .filter((s => s.data.published))
  .sort(sortBy(s => s.slug))
  .reverse());

for (const book of allBooks) {
  book.snippets.sort(sortBy(s =>
    s.data.archivePage.startsWith('n')
      ? +s.data.archivePage.slice(1) - 1000
      : +s.data.archivePage));

  for (let i = 1; i < book.snippets.length; i++) {
    const s1 = book.snippets[i - 1];
    const s2 = book.snippets[i];
    s1!.nextSnippet = s2!;
    s2!.prevSnippet = s1!;
  }
}

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
