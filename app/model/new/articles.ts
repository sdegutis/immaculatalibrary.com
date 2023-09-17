import articlesDir from '../../data/articles/';
import { loadContentFile } from '../../util/data-files';

export interface Article {
  date: string;
  slug: string;
  content: string;

  title: string;
  draft?: boolean;
}

export const allArticles = articlesDir.files.map(file => {
  const data = loadContentFile<Article>(file);
  return data;
});
