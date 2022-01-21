import fs from "fs";
import path from "path";

class FsNode {

  constructor(
    public realBase: string,
    public name: string,
    public parent: Dir | null,
  ) { }

  get path() {
    const parts: string[] = [];
    for (let node: FsNode | Dir | null = this; node; node = node.parent) {
      parts.unshift(node.name);
    }
    return path.posix.join('/', ...parts);
  }

  get realPath() {
    return path.posix.join(this.realBase, this.path);
  }

  rename(newName: string) {
    if (this.parent?.childrenByName[newName]) {
      throw new Error("Cannot overwrite existing file.");
    }

    const oldPath = this.realPath;
    this.name = newName;
    const newPath = this.realPath;
    fs.renameSync(oldPath, newPath);
  }

  isFile(): this is File { return this instanceof File };
  isDir(): this is Dir { return this instanceof Dir };

}

function isFile(child: FsNode): child is File { return child.isFile(); };
function isDir(child: FsNode): child is Dir { return child.isDir(); };

export class Dir extends FsNode {

  children: (File | Dir)[] = [];

  get root(): Dir {
    let ancestor: Dir = this;
    while (ancestor.parent) ancestor = ancestor.parent;
    return ancestor;
  }

  get files(): File[] { return this.children.filter(isFile); }
  get dirs(): Dir[] { return this.children.filter(isDir); }

  get childrenByName() { return Object.fromEntries(this.children.map(c => [c.name, c])); }
  get filesByName() { return Object.fromEntries(this.files.map(c => [c.name, c])); }
  get dirsByName() { return Object.fromEntries(this.dirs.map(c => [c.name, c])); }

  createFile(name: string, buffer: Buffer) {
    if (this.childrenByName[name]) {
      throw new Error("Cannot overwrite existing file.");
    }

    const child = new File(this.realBase, name, this);
    child.buffer = buffer;
    fs.writeFileSync(child.realPath, buffer);
    this.children.push(child);
  }

  find(toPath: string) {
    const absolutePath = (toPath.startsWith('/')
      ? toPath
      : path.posix.join(this.path, toPath));

    let dir: Dir = this.root;
    const parts = absolutePath.split(path.posix.sep).slice(1);
    let part: string | undefined;

    while (undefined !== (part = parts.shift())) {
      if (parts.length === 0) {
        if (part === '') return dir;

        return (
          dir.filesByName[part] ??
          dir.filesByName[part + '.ts'] ??
          dir.filesByName[part + '.tsx'] ??
          null
        );
      }
      else {
        const subdir = dir.dirsByName[part];
        if (!subdir) break;
        dir = subdir;
      }
    }

    return null;
  }

}

export class File extends FsNode {

  declare parent: Dir;
  buffer!: Buffer;

  replace(newBuffer: Buffer) {
    this.buffer = newBuffer;
    fs.writeFileSync(this.realPath, newBuffer);
  }

  get root(): Dir {
    return this.parent.root;
  }

  get text() {
    return this.buffer.toString('utf8');
  }

}

export class FileSys {

  constructor(public fsBase: string) { }

  load() {
    return this.#loadDir('/', null);
  }

  #loadDir(base: string, parent: Dir | null) {
    const dir = new Dir(this.fsBase, path.posix.basename(base), parent);

    const dirRealPath = path.posix.join(this.fsBase, base);
    const files = fs.readdirSync(dirRealPath);
    for (const name of files) {
      if (name.startsWith('.')) continue;

      const fileRealPath = path.posix.join(this.fsBase, base, name);
      const stat = fs.statSync(fileRealPath);

      if (stat.isDirectory()) {
        const child = this.#loadDir(path.posix.join(base, name), dir);
        dir.children.push(child);
      }
      else if (stat.isFile()) {
        const child = new File(this.fsBase, name, dir);
        child.buffer = fs.readFileSync(child.realPath);
        dir.children.push(child);
      }
    }

    return dir;
  }

}
