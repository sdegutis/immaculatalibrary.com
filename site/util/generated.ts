import { outfiles } from "../core/exports.js";

export function generated(name: string, generateContent: () => string) {
  const fullpath = `/generated/${name}`;
  if (!outfiles.has(fullpath)) {
    outfiles.set(fullpath, generateContent());
  }
  return fullpath;
}
