import { DataFileWithoutDate, loadContentFile, sortBy } from '../core/helpers';
import allBookFiles from "../data/books/";
import { Category } from './categories';
import { Snippet } from './snippets';

interface BookFile extends DataFileWithoutDate {
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

export class Book {

  route: string;

  category!: Category;
  snippets: Snippet[] = [];

  constructor(public data: BookFile) {
    this.route = `/books/${data.slug}.html`;
  }

}

export const allBooks = (allBookFiles
  .map(file => new Book(loadContentFile(file)))
  .sort(sortBy(b => `${b.data.dateAdded} ${b.data.slug}`)));

export const booksBySlug = Object.fromEntries(allBooks.map(book => [book.data.slug, book]));
