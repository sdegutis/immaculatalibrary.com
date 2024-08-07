import allVideoFiles from "../data/videos/";
import { DataFile } from '../util/_datafiles.js';
import { sortBy } from '../util/_helpers.js';

interface VideoFile {
  title: string;
  youtube: string;
  author: string;
  desc?: string;
  sort: number;
}

export class Video extends DataFile<VideoFile> {

  static override modelDir = 'videos';

}

export const allVideos = (allVideoFiles
  .map(file => Video.fromFile(file)))
  .sort(sortBy(video => video.data.sort));
