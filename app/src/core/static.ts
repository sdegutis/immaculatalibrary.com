import { createHash } from 'crypto';
import publicDir from 'dir:../../public/';
import { EnrichedInput } from '../pages/admin';
import { Routeable } from './router';

export const staticFiles: StaticFile[] = [];

const MAX_AGE_HOURS = 3;

class StaticFile implements Routeable {

  etag;
  route;
  constructor(private file: FsFile) {
    this.route = file.path.replace(/^\/public/, '');
    this.etag = `"${createHash('sha256').update(file.buffer).digest().toString('base64')}"`;
  }

  method = 'GET' as const;

  handle(input: EnrichedInput): RouteOutput {
    const headers = {
      'Cache-Control': `max-age=${60 * 60 * MAX_AGE_HOURS}`,
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

export const staticFileRoutes: Routeable[] = staticFiles;
