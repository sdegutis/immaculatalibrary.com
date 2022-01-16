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
  ) { }

}

export class File {

  constructor(
    public root: Dir,
    public path: string,
    public name: string,
    public parent: Dir | null,
    public buffer: Buffer,
  ) { }

}

export class FileSys {

  constructor(public fsBase: string) { }

  load() {
    return this.#loadDir('/', null, null);
  }

  #loadDir(base: string, parent: Dir | null, root: Dir | null) {
    const files = fs.readdirSync(path.posix.join(this.fsBase, base));

    const dir = new Dir(root!, base, path.posix.basename(base), parent);
    if (!root) {
      root = dir.root = dir;
    }

    for (const name of files) {
      if (name.startsWith('.')) continue;

      const fullpath = path.posix.join(this.fsBase, base, name);
      const stat = fs.statSync(fullpath);

      if (stat.isDirectory()) {
        const child = this.#loadDir(path.posix.join(base, name), dir, root);
        dir.subdirs[name] = child;
        dir.entries[name] = child;
      }
      else if (stat.isFile()) {
        const buffer = fs.readFileSync(fullpath);

        const child = new File(root, path.posix.join(base, name), name, dir, buffer);
        dir.files[name] = child;
        dir.entries[name] = child;
      }
    }

    return dir;
  }

}
