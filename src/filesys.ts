import fs from "fs";
import path from "path";

export class Dir {

  files: { [name: string]: File } = Object.create(null);
  subdirs: { [name: string]: Dir } = Object.create(null);
  entries: { [name: string]: File | Dir } = Object.create(null);

  constructor(
    public root: Dir,
    public path: string,
    public name: string,
    public parent: Dir | null,
    realpath: string,
  ) { }

  createFile(name: string, buffer: Buffer) {
    throw new Error();
  }

  rename(newName: string) {
    throw new Error();
  }

}

export class File {

  #realpath: string;
  buffer: Buffer;
  constructor(
    public root: Dir,
    public path: string,
    public name: string,
    public parent: Dir | null,
    realpath: string,
  ) {
    this.#realpath = realpath;
    this.buffer = fs.readFileSync(realpath);
  }

  replace(newBuffer: Buffer) {
    this.buffer = newBuffer;
    fs.writeFileSync(this.#realpath, newBuffer);
  }

  rename(newName: string) {
    throw new Error();
  }

}

export class FileSys {

  constructor(public fsBase: string) { }

  load() {
    return this.#loadDir('/', null, null);
  }

  #loadDir(base: string, parent: Dir | null, root: Dir | null) {
    const dirRealPath = path.posix.join(this.fsBase, base);
    const files = fs.readdirSync(dirRealPath);

    const dir = new Dir(root!, base, path.posix.basename(base), parent, dirRealPath);
    if (!root) {
      root = dir.root = dir;
    }

    for (const name of files) {
      if (name.startsWith('.')) continue;

      const fileRealPath = path.posix.join(this.fsBase, base, name);
      const stat = fs.statSync(fileRealPath);

      if (stat.isDirectory()) {
        const child = this.#loadDir(path.posix.join(base, name), dir, root);
        dir.subdirs[name] = child;
        dir.entries[name] = child;
      }
      else if (stat.isFile()) {
        const child = new File(root, path.posix.join(base, name), name, dir, fileRealPath);
        dir.files[name] = child;
        dir.entries[name] = child;
      }
    }

    return dir;
  }

}
