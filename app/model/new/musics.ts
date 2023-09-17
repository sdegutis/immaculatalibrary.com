import musicDir from '../../data/music/';
import { loadContentFile } from '../../util/data-files';

export interface Music {
  slug: string;
  content: string;

  title: string;
  youtube: string;
  category: string;
}

export const allMusics = musicDir.files.map(file => {
  const data = loadContentFile<Music>(file);
  return data;
});
