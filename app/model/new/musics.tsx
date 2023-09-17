import musicDir from '../../data/music/';
import { loadContentFile } from '../../util/data-files';

export const allMusics = musicDir.files.map(file => loadContentFile<{
  title: string;
  youtube: string;
  category: string;
}>(file, 'slug'));
