import { loadContentFile } from '../core/helpers';

export interface Music {
  slug: string;
  content: string;

  title: string;
  youtube: string;
  category: string;
}

export function musicFromFile(file: FsFile) {
  const data = loadContentFile<Music>(file);
  return data;
}
