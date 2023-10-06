import { DataFileWithDate, calculateReadingMins, loadContentFile, markdown, sortBy } from "../core/helpers";
import allSnippetFiles from "../data/snippets/";
import { Book, allBooks, booksBySlug } from './books';
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

    const book = booksBySlug[this.data.bookSlug]!;
    this.book = book;
    book.snippets.push(this);
  }

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

export const allSnippets = (allSnippetFiles
  .map(file => new Snippet(loadContentFile(file)))
  .filter((s => s.data.published))
  .sort(sortBy(s => s.data.slug))
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
