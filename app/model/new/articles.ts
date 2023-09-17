import articlesDir from '../../data/articles/';
import { loadContentFile } from '../../util/data-files';

export const allArticles = articlesDir.files.map(file => loadContentFile<{
  title: string;
  draft?: boolean;
}>(file, 'date-slug'));
