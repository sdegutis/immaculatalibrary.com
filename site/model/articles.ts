import { DataFileWithDate } from '../core/data-files.js';
import { sortBy } from '../core/helpers.js';
import allArticleFiles from '../data/articles/';
import { calculateReadingMins } from '../shared/$helpers.js';

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

  constructor(slug: string, content: string, data: ArticleFile) {
    super(slug, content, data);
    this.route = `/articles/${this.slug}.html`;
    this.mins = calculateReadingMins(this.content);
  }

}

export const allArticles = (allArticleFiles
  .map(file => Article.fromFile(file))
  .sort(sortBy(article => article.date))
  .filter(s => !s.data.draft)
  .reverse());
