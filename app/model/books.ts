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

// this.snippets.sort(sortBy(s =>
//   s.archivePage.startsWith('n')
//     ? +s.archivePage.slice(1) - 1000
//     : +s.archivePage));
// for (let i = 1; i < this.snippets.length; i++) {
//   const s1 = this.snippets[i - 1];
//   const s2 = this.snippets[i];
//   s1!.nextSnippet = s2!;
//   s2!.prevSnippet = s1!;
// }
