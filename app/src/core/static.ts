import { createHash } from 'crypto';
import path from 'path';
import publicDir from '../../public/';
import { EnrichedInput } from '../pages/admin';
import { addRouteable, Routeable, RouteMethod } from './router';

export const staticFiles: StaticFile[] = [];

const MAX_AGE_HOURS = 3;

class StaticFile implements Routeable {

  etag;
  route;
  constructor(private file: FsFile) {
    this.route = file.path.replace(/^\/public/, '');
    this.etag = `"${createHash('sha256').update(file.buffer).digest().toString('base64')}"`;
  }

  method: RouteMethod = 'GET';

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

staticFiles.forEach(addRouteable);

export class HashedStaticFile implements Routeable {

  static fromFile(file: FsFile) {
    return new HashedStaticFile(file.buffer, file.name);
  }

  etag;
  route;
  constructor(private buffer: Buffer, filename: string) {
    const { name, ext } = path.parse(filename);
    const hash = createHash('sha256').update(buffer).digest().toString('base64url');
    this.route = `/superstatic/${name}.${hash}${ext}`;
    this.etag = `"${hash}"`;
  }

  method: RouteMethod = 'GET';

  handle(input: EnrichedInput) {
    const headers = { 'ETag': this.etag, 'Cache-Control': `max-age=${60 * 60 * 24 * 7 * 52}, immutable` };

    if (input.headers['if-none-match'] === this.etag) {
      return { status: 304, headers };
    }

    return { body: this.buffer, headers };
  }

}

const map = new Map<FsFile, string>();

export function staticRouteFor(file: FsFile): string {
  let s = map.get(file);
  if (!s) {
    const f = HashedStaticFile.fromFile(file);
    addRouteable(f);
    map.set(file, s = f.route);
  }
  return s;
}
