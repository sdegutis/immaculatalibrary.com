import snippetsDir from '../../data/snippets/';
import { loadContentFile } from '../../util/data-files';

export const allSnippets = snippetsDir.files.map(file => {
  const slug = file.name.slice(0, -3);
  const data = loadContentFile<{
    published: boolean,
    title: string,
    archiveSlug: string,
    archivePage: string,
    bookSlug: string,
    tags: string[],
  }>(file, 'date-slug');
  return { ...data, slug };
});
