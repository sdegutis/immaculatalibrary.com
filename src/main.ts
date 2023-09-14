import chokidar from 'chokidar';
import * as path from 'path';
import 'source-map-support/register';
import { Site } from './site';

const site = new Site('app');

const updatedPaths = new Set<string>();
let reloadFsTimer: NodeJS.Timeout;

const pathUpdated = (filePath: string) => {
  updatedPaths.add(filePath.split(path.sep).join(path.posix.sep));
  clearTimeout(reloadFsTimer);
  reloadFsTimer = setTimeout(() => {
    site.pathsUpdated(updatedPaths);
    updatedPaths.clear();
  }, 100);
};

(chokidar.watch('app', { ignoreInitial: true })
  .on('add', pathUpdated)
  .on('change', pathUpdated)
  .on('unlink', pathUpdated));
