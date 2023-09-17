import snippetsDir from '../../data/snippets/';
import { loadContentFile } from '../../util/data-files';

interface Snippet {
  published: boolean;
  title: string;
  archiveSlug: string;
  archivePage: string;
  bookSlug: string;
  tags: string[];
}

export const allSnippets = snippetsDir.files.map(file => loadContentFile<Snippet>(file, 'date-slug'));
