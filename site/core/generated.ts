import { outfiles } from "./main.js";

export function generated(name: string, generateContent: () => string) {
  const fullpath = `/generated/${name}`;
  if (!outfiles.has(fullpath)) {
    outfiles.set(fullpath, generateContent());
  }
  return fullpath;
}
