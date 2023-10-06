import { DataFileWithDate, calculateReadingMins, loadContentFile, sortBy } from '../core/helpers';
import allArticleFiles from '../data/articles/';

const PREVIEW_LENGTH = 2000;

interface ArticleFile extends DataFileWithDate {
  title: string;
  draft?: boolean;
  imageFilename?: string;
  imageCaption?: string;
}

export class Article {

  mins: number;
  route: string;
  previewMarkdown: string | null;

  constructor(public data: ArticleFile) {
    this.route = `/articles/${data.slug}.html`;
    this.mins = calculateReadingMins(data.content);
    this.previewMarkdown = derivePreview(data);
  }

}

function derivePreview(article: ArticleFile) {
  const paragraphs = article.content.trim().split(/(\r?\n>+ *\r?\n)/);

  let running = 0;
  for (let i = 0; i < paragraphs.length; i++) {
    running += paragraphs[i]!.length;
    if (running > PREVIEW_LENGTH) break;
  }

  if (running < article.content.length - 1) {
    return article.content.substring(0, running);
  }
  return null;
}

export const allArticles = (allArticleFiles
  .map(file => new Article(loadContentFile(file)))
  .sort(sortBy(article => article.data.date))
  .filter(s => !s.data.draft)
  .reverse());
