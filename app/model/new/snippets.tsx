import snippetsDir from '../../data/snippets/';
import { loadContentFile } from '../../util/data-files';

export const allSnippets = snippetsDir.files.map(file => loadContentFile<{
  published: boolean;
  title: string;
  archiveSlug: string;
  archivePage: string;
  bookSlug: string;
  tags: string[];
}>(file, 'date-slug'));
