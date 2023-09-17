import musicDir from '../../data/music/';
import { loadContentFile } from '../../util/data-files';

export const allMusics = musicDir.files.map(file => {
  const slug = file.name.slice(0, -3);
  const data = loadContentFile<{
    title: string,
    youtube: string,
    category: string,
  }>(file, 'slug');
  return { ...data, slug };
});
