import { loadContentFile } from '../util/data-files';

export interface Article {
  date: string;
  slug: string;
  content: string;

  title: string;
  draft?: boolean;
}

export function articleFromFile(file: FsFile) {
  const data = loadContentFile<Article>(file);
  return data;
}

// private derivePreview(count = 2000) {
//   const paragraphs = this.markdownContent.trim().split(/(\r?\n>+ *\r?\n)/);

//   let running = 0;
//   for (let i = 0; i < paragraphs.length; i++) {
//     running += paragraphs[i]!.length;
//     if (running > count) break;
//   }

//   if (running < this.markdownContent.length - 1) {
//     return this.markdownContent.substring(0, running);
//   }
//   return null;
// }
