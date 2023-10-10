import { DataFile } from '../core/data-files';
import allMusicFiles from "../data/music/";

interface MusicFile {
  title: string;
  youtube: string;
  category: string;
}

export class Music extends DataFile<MusicFile> {

  static override modelDir = 'music';

}

export const allMusics = (allMusicFiles
  .map(file => Music.fromFile(file)));