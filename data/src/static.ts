import publicDir from '../public/';
import { Routeable } from './router';
import { Dir, File } from '/../src/filesys';
import { RouteOutput } from '/../src/http';

export const staticFiles: StaticFile[] = [];

class StaticFile implements Routeable {

  route;
  constructor(private file: File) {
    this.route = file.path.replace(/^\/public/, '');
    console.log(this.route)
  }

  get(): RouteOutput {
    return {
      body: this.file.buffer,
    };
  }

}

function addStaticFile(file: File) {
  staticFiles.push(new StaticFile(file));
}

function addStaticFiles(dir: Dir) {
  dir.files.forEach(addStaticFile);
  dir.dirs.forEach(addStaticFiles);
}

addStaticFiles(publicDir);
