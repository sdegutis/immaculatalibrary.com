import { createHash } from 'crypto';
import mime from 'mime';
import path from 'path';
import { EnrichedInput } from '../auth/login';
import { addRouteable, Routeable, RouteMethod } from '../core/router';

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
    if (file.buffer.length < 5_000) {
      const type = mime.getType(file.name) ?? 'application/octet-stream';
      map.set(file, s = `data:${type};base64,${file.buffer.toString('base64')}`);
    }
    else {
      const f = HashedStaticFile.fromFile(file);
      addRouteable(f);
      map.set(file, s = f.route);
    }
  }
  return s;
}
