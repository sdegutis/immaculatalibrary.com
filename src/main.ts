import chokidar from 'chokidar';
import * as path from 'path';
import { Server } from './server';
import { Site } from './site';

process.env['DEV'] = '1';

const server = new Server();
server.startServer(8080);

const site = new Site('app');
server.files = site.build();

const updatedPaths = new Set<string>();
let reloadFsTimer: NodeJS.Timeout;

const pathUpdated = (filePath: string) => {
  updatedPaths.add(filePath.split(path.sep).join(path.posix.sep));
  clearTimeout(reloadFsTimer);
  reloadFsTimer = setTimeout(() => {
    site.pathsUpdated(...updatedPaths);
    server.files = site.build();
    updatedPaths.clear();
  }, 100);
};

(chokidar.watch('app', { ignoreInitial: true, cwd: process.cwd() })
  .on('add', pathUpdated)
  .on('change', pathUpdated)
  .on('unlink', pathUpdated));
