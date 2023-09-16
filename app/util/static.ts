import { createHash } from 'crypto';
import path from 'path';
import { addRouteable, Routeable } from '../core/router';

export class HashedStaticFile implements Routeable {

  etag;
  route;
  constructor(private buffer: Buffer, filename: string) {
    const { name, ext } = path.parse(filename);
    const hash = createHash('sha256').update(buffer).digest().toString('base64url');
    this.route = `/superstatic/${name}.${hash}${ext}`;
    this.etag = `"${hash}"`;
  }

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
    const f = new HashedStaticFile(file.buffer, file.name);
    addRouteable(f);
    map.set(file, s = f.route);
  }
  return s;
}
