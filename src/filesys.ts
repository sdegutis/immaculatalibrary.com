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

}

export class Dir extends FsNode {

  children: (File | Dir)[] = [];

  constructor(
    realBase: string,
    name: string,
    parent: Dir | null,
  ) {
    super(realBase, name, parent);
  }

  createFile(name: string, buffer: Buffer) {
    throw new Error();
  }

  rename(newName: string) {
    throw new Error();
  }

  get root(): Dir {
    let ancestor: Dir = this;
    while (ancestor.parent) ancestor = ancestor.parent;
    return ancestor;
  }

  get entries() {
    return this.#makeMap(this.children);
  }

  get files() {
    return this.#makeMap(this.children
      .filter((child => child instanceof File) as
        (child: FsNode) => child is File));
  }

  get subdirs() {
    return this.#makeMap(this.children
      .filter((child => child instanceof Dir) as
        (child: FsNode) => child is Dir));
  }

  #makeMap<T extends FsNode>(children: T[]): { [name: string]: T } {
    return Object.fromEntries(children.map(child => [child.name, child]));
  }

}

export class File extends FsNode {

  declare parent: Dir;

  buffer: Buffer;
  constructor(
    realBase: string,
    name: string,
    parent: Dir | null,
  ) {
    super(realBase, name, parent);
    this.buffer = fs.readFileSync(this.realPath);
  }

  replace(newBuffer: Buffer) {
    this.buffer = newBuffer;
    fs.writeFileSync(this.realPath, newBuffer);
  }

  rename(newName: string) {
    throw new Error();
  }

  get root(): Dir {
    return this.parent.root;
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
        dir.children.push(child);
      }
    }

    return dir;
  }

}
