import chokidar from 'chokidar';
import * as path from 'path';
import { Site } from './site';

const site = new Site('app', 'docs');
site.startServer(8080);

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

(chokidar.watch('app', { ignoreInitial: true, cwd: process.cwd() })
  .on('add', pathUpdated)
  .on('change', pathUpdated)
  .on('unlink', pathUpdated));
