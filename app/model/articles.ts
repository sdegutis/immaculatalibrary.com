import { DataFileWithDate } from '../core/data-files';
import { calculateReadingMins, sortBy } from '../core/helpers';
import allArticleFiles from '../data/articles/';

const PREVIEW_LENGTH = 2000;

interface ArticleFile {
  title: string;
  draft?: boolean;
  imageFilename?: string;
  imageCaption?: string;
}

export class Article extends DataFileWithDate<ArticleFile> {

  static override modelDir = 'articles';

  mins: number;
  route: string;
  previewMarkdown: string | null;

  constructor(file: [string, Buffer]) {
    super(file);
    this.route = `/articles/${this.slug}.html`;
    this.mins = calculateReadingMins(this.content);
    this.previewMarkdown = derivePreview(this);
  }

}

function derivePreview(article: Article) {
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
  .map(file => new Article(file))
  .sort(sortBy(article => article.date))
  .filter(s => !s.data.draft)
  .reverse());
