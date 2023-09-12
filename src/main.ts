import chokidar from 'chokidar';
import 'dotenv/config';
import * as path from 'path';
import 'source-map-support/register';
import { Site } from './site';

const site = new Site('app');
onFsChanges('app', 100, (path) => site.fileChanged(path));

function onFsChanges(fromPath: string, msTimeout: number, fn: (path: string) => void) {
  let timeout: NodeJS.Timeout | null = null;
  chokidar.watch(fromPath, { ignoreInitial: true }).on('all', (e, p) => {
    const updatedPath = p.split(path.win32.sep).join(path.posix.sep);
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => fn(updatedPath), msTimeout);
  });
}
