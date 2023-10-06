import { DataFile } from '../core/data-files';
import { sortBy } from '../core/helpers';
import allBookFiles from "../data/books/";
import { Category } from './categories';
import { Snippet } from './snippets';

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

  route: string;

  category!: Category;
  snippets: Snippet[] = [];

  constructor(file: [string, Buffer]) {
    super(file);
    this.route = `/books/${this.slug}.html`;
  }

}

export const allBooks = (allBookFiles
  .map(file => new Book(file))
  .sort(sortBy(b => `${b.data.dateAdded} ${b.slug}`)));

export const booksBySlug = Object.fromEntries(allBooks.map(book => [book.slug, book]));
