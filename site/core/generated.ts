import { outfiles } from "./main";

export function generated(name: string, generateContent: () => string) {
  const fullpath = `/generated/${name}`;
  if (!outfiles.has(fullpath)) {
    outfiles.set(fullpath, generateContent());
  }
  return fullpath;
}
