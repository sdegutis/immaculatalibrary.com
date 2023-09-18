import fs from 'fs';
import path from 'path';
import { FsDir, FsFile } from './filesys';
import { Site } from './site';

const site = new Site('app');
const out = site.build()!;

createTree(out);

function realPath(node: FsFile | FsDir) {
  return path.join('docs', node.path);
}

function createTree(dir: FsDir) {
  fs.mkdirSync(realPath(dir));
  for (const file of dir.files) { fs.writeFileSync(realPath(file), file.buffer); }
  for (const subdir of dir.dirs) { createTree(subdir); }
}
