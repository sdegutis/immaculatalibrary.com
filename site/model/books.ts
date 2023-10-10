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

  static override modelDir = 'books';

  route: string;

  category!: Category;
  snippets: Snippet[] = [];

  constructor(slug: string, content: string, data: BookFile) {
    super(slug, content, data);
    this.route = `/books/${this.slug}.html`;
  }

}

export const allBooks = (allBookFiles
  .map(file => Book.fromFile(file))
  .sort(sortBy(b => `${b.data.dateAdded} ${b.slug}`)));

export const booksBySlug = Object.fromEntries(allBooks.map(book => [book.slug, book]));
