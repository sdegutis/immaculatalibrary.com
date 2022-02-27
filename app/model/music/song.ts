import Yaml from 'js-yaml';
import { ViewSong } from '../../routes/music/view-song';
import { markdown } from '../../util/helpers';

export class Song {

  view;

  constructor(
    public slug: string,
    public title: string,
    public youtube: string,
    public category: string,
    public html: string,
  ) {
    this.view = new ViewSong(this);
  }


}

export function loadAllSongs() {
  const files = __dir.dirsByName['data']!.files;
  return files.map(file => {
    const slug = file.name.replace(/\.md$/, '');
    const fileContents = file.text.replace(/\r\n/g, '\n');
    const [, yaml, md] = fileContents.match(/^---\n(.+?)\n---\n\n(.+?)$/s)!;
    const { title, youtube, category } = Yaml.load(yaml!) as any;
    return new Song(slug, title, youtube, category, markdown.render(md!));
  });
}
