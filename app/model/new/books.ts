import { loadContentFile } from '../../util/data-files';

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
}

export function bookFromFile(file: FsFile) {
  const data = loadContentFile<Book>(file);
  return data;
}
