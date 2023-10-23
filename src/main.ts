import * as chokidar from 'chokidar';
import * as path from 'path';
import { Server } from './server';
import { Site } from './site';

process.env['DEV'] = '1';

const server = new Server();
server.startServer(8080);

const site = new Site();
const artifacts = site.build();
server.files = artifacts?.outfiles;
server.handlers = artifacts?.handlers;

const updatedPaths = new Set<string>();
let reloadFsTimer: NodeJS.Timeout;

const pathUpdated = (filePath: string) => {
  updatedPaths.add(filePath.split(path.sep).join(path.posix.sep));
  clearTimeout(reloadFsTimer);
  reloadFsTimer = setTimeout(() => {
    console.log('Rebuilding site...');
    site.pathsUpdated(...updatedPaths);

    const artifacts = site.build();
    server.files = artifacts?.outfiles;
    server.handlers = artifacts?.handlers;

    updatedPaths.clear();
    server.events.emit('rebuild');
    console.log('Done.');
  }, 100);
};

(chokidar.watch('site', { ignoreInitial: true, cwd: process.cwd() })
  .on('add', pathUpdated)
  .on('change', pathUpdated)
  .on('unlink', pathUpdated));
