import { getFiles } from '../../data.js'
import { DataFile } from '../util/_datafiles.js'

const allMusicFiles = getFiles('/data/music/', import.meta.url)

interface MusicFile {
  title: string
  youtube?: string
  spotify?: string
  category: string
}

export class Music extends DataFile<MusicFile> {

  static override modelDir = 'music';

}

export const allMusics = (allMusicFiles
  .map(file => Music.fromFile(file)))
