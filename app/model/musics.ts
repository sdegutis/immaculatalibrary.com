import { DataFileWithoutDate, loadContentFile } from '../core/helpers';
import allMusicFiles from "../data/music/";

interface MusicFile extends DataFileWithoutDate {
  title: string;
  youtube: string;
  category: string;
}

export class Music {

  constructor(public data: MusicFile) { }

}

export const allMusics = (allMusicFiles
  .map(file => new Music(loadContentFile(file))));
