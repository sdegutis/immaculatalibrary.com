import { createHash } from 'crypto';
import publicDir from 'dir:../../public/';
import { AuthedInput } from '../pages/admin';
import { Routeable } from './router';
import { FsDir, FsFile } from '/../src/filesys';
import { RouteOutput } from '/../src/http';

export const staticFiles: StaticFile[] = [];

class StaticFile implements Routeable {

  etag;
  route;
  constructor(private file: FsFile) {
    this.route = file.path.replace(/^\/public/, '');
    this.etag = `"${createHash('sha256').update(file.buffer).digest().toString('base64')}"`;
  }

  get(input: AuthedInput): RouteOutput {
    const headers = {
      'Cache-Control': `max-age=${60 * 60 * 24 * 1}`,
      'ETag': this.etag,
    };

    if (input.headers['if-none-match'] === this.etag) {
      return {
        status: 304,
        headers,
      };
    }

    return {
      body: this.file.buffer,
      headers,
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
