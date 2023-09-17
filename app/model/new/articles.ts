import articlesDir from '../../data/articles/';
import { loadContentFile } from '../../util/data-files';

interface Article {
  title: string;
  draft?: boolean;
}

export const allArticles = articlesDir.files.map(file => loadContentFile<Article>(file, 'date-slug'));
