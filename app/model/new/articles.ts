import articlesDir from '../../data/articles/';
import { loadContentFile } from '../../util/data-files';

export const allArticles = articlesDir.files.map(file => {
  const slug = file.name.slice(0, -3);
  const data = loadContentFile<{
    title: string,
    draft?: boolean,
  }>(file, 'date-slug');
  return { ...data, slug };
});
