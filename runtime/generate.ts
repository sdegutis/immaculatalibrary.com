import * as fs from 'fs';
import * as path from 'path/posix';
import { Runtime } from './runtime.js';

const runtime = new Runtime("site");

const out = runtime.build()!;

const madeDirs = new Set<string>();
const mkdirIfNeeded = (dir: string) => {
  if (madeDirs.has(dir)) return;
  madeDirs.add(dir);
  console.log('mkdir', dir);
  fs.mkdirSync(dir);
};

for (const [filepath, content] of out) {
  const newFilepath = path.join('docs', filepath);
  const parts = newFilepath.split(path.sep);
  for (let i = 1; i < parts.length; i++) {
    const dir = path.join(...parts.slice(0, i));
    mkdirIfNeeded(dir);
  }

  console.log('writefile', newFilepath)
  fs.writeFileSync(newFilepath, content);
}
