import { out } from "../out";

const map = new Map<Buffer, string>();

export function staticFileFor([filepath, buffer]: [string, Buffer]) {
  let path = map.get(buffer);
  if (!path) {
    map.set(buffer, path = filepath);
    out.set(path, buffer);
  }
  return path;
}
