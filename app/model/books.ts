import { loadContentFile } from '../core/data-files';
import { Category } from './categories';
import { Snippet } from './snippets';

export interface Book {
  slug: string;
  content: string;

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

  route: string;

  category: Category;
  snippets: Snippet[];
}

export function bookFromFile(file: FsFile) {
  const data = loadContentFile<Book>(file);
  data.route = `/books/${data.slug}.html`;
  data.snippets = [];
  return data;
}
