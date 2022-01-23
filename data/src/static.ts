import publicDir from 'dir:../public/';
import { Routeable } from './router';
import { FsDir, FsFile } from '/../src/filesys';
import { RouteOutput } from '/../src/http';

export const staticFiles: StaticFile[] = [];

class StaticFile implements Routeable {

  route;
  constructor(private file: FsFile) {
    this.route = file.path.replace(/^\/public/, '');
  }

  get(): RouteOutput {
    return {
      body: this.file.buffer,
    };
  }

}

function addStaticFile(file: FsFile) {
  staticFiles.push(new StaticFile(file));
}

function addStaticFiles(dir: FsDir) {
  dir.files.forEach(addStaticFile);
  dir.dirs.forEach(addStaticFiles);
}

addStaticFiles(publicDir);
