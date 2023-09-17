import booksDir from '../../data/books/';
import { loadContentFile } from '../../util/data-files';

export const allBooks = booksDir.files.map(file => loadContentFile<{
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
}>(file, 'slug'));
