import { DataFile } from "../core/data-files.js";
import { sortBy } from "../core/helpers.js";
import allBookFiles from "../data/books/";
import { Category } from "./categories.js";
import { categories, snippets } from "./relations.js";
import { Snippet } from "./snippets.js";

interface BookFile {
  title: string;
  subtitle: string;
  dateAdded: string;
  author: string;
  translator: string;
  score: number;
  rating: number;
  files: {
    archiveId: string;
    pdfFile: string;
  }[];
  storeLinks: {
    link: string;
    image: string;
    title: string;
  }[];
  complete?: boolean;
  frontpage?: {
    image: string;
    why: string;
  },
}

export class Book extends DataFile<BookFile> {

  static override modelDir = 'books';

  route: string;

  constructor(slug: string, content: string, data: BookFile) {
    super(slug, content, data);
    this.route = `/books/${this.slug}.html`;
  }

  get category(): Category {
    return categories().categoryForBook.get(this)!;
  }

  get snippets(): Snippet[] {
    const snippetsInBook = snippets().snippetsInBook.get(this)!;

    snippetsInBook.sort(sortBy(s =>
      s.data.archivePage.startsWith('n')
        ? +s.data.archivePage.slice(1) - 1000
        : +s.data.archivePage));

    for (let i = 1; i < snippetsInBook.length; i++) {
      const s1 = snippetsInBook[i - 1];
      const s2 = snippetsInBook[i];
      s1!.nextSnippet = s2!;
      s2!.prevSnippet = s1!;
    }

    return snippetsInBook;
  }

}

export const allBooks = (allBookFiles
  .map(file => Book.fromFile(file))
  .sort(sortBy(b => `${b.data.dateAdded} ${b.slug}`)));

export const booksBySlug = Object.fromEntries(allBooks.map(book => [book.slug, book]));
