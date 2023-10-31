import { DataFile } from '../core/data-files.js';
import { sortBy } from '../core/helpers.js';
import allVideoFiles from "../data/videos/";

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
