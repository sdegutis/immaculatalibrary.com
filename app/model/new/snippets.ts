import { loadContentFile } from '../../util/data-files';

export interface Snippet {
  date: string;
  slug: string;
  content: string;

  published: boolean;
  title: string;
  archiveSlug: string;
  archivePage: string;
  bookSlug: string;
  tags: string[];
}

export function snippetFromFile(file: FsFile) {
  const data = loadContentFile<Snippet>(file);
  return data;
}
