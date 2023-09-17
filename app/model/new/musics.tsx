import musicDir from '../../data/music/';
import { loadContentFile } from '../../util/data-files';

interface Music {
  title: string;
  youtube: string;
  category: string;
}

export const allMusics = musicDir.files.map(file => loadContentFile<Music>(file, 'slug'));
