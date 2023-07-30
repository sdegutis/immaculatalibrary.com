import { createHash } from 'crypto';
import mime from 'mime';
import path from 'path';
import { addRouteable, Routeable, RouteMethod } from '../core/router';

export class HashedStaticFile implements Routeable {

  etag;
  route;
  constructor(private buffer: Buffer, filename: string) {
    const { name, ext } = path.parse(filename);
    const hash = createHash('sha256').update(buffer).digest().toString('base64url');
    this.route = `/superstatic/${name}.${hash}${ext}`;
    this.etag = `"${hash}"`;
  }

  method: RouteMethod = 'GET';

  handle() {
    return { body: this.buffer };
  }

}

interface Staticable {
  buffer: Buffer;
  name: string;
}

const map = new Map<Staticable, string>();

export function staticRouteFor(file: Staticable): string {
  let s = map.get(file);
  if (!s) {
    if (file.buffer.length < 1_000) {
      const type = mime.getType(file.name) ?? 'application/octet-stream';
      map.set(file, s = `data:${type};base64,${file.buffer.toString('base64')}`);
    }
    else {
      const f = new HashedStaticFile(file.buffer, file.name);
      addRouteable(f);
      map.set(file, s = f.route);
    }
  }
  return s;
}
