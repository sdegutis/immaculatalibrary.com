import { DataFileWithoutDate, loadContentFile } from '../core/helpers';

interface MusicFile extends DataFileWithoutDate {
  title: string;
  youtube: string;
  category: string;
}

export class Music {

  constructor(public data: MusicFile) { }

}

export function musicFromFile(file: [string, Buffer]): Music {
  const data = loadContentFile<MusicFile>(file);
  return new Music(data);
}
