import { DataFileWithoutDate, loadContentFile } from '../core/helpers';
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

export function bookFromFile(file: [string, Buffer]): Book {
  const data = loadContentFile<BookFile>(file);
  return new Book(data);
}
