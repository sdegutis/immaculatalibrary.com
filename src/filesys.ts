import fs from "fs";
import path from "path/posix";

abstract class FsNode {

  abstract root: FsDir;

  readonly path;
  readonly realPath;

  constructor(
    public readonly realBase: string,
    public readonly name: string,
    public readonly parent: FsDir | null,
  ) {
    const parts: string[] = [];
    for (let node: FsNode | FsDir | null = this; node; node = node.parent) {
      parts.unshift(node.name);
    }
    this.path = path.join('/', ...parts);
    this.realPath = path.join(this.realBase, this.path);
  }

  // rename(newName: string) {
  //   if (this.parent?.childrenByName[newName]) {
  //     throw new Error("Cannot overwrite existing file.");
  //   }

  //   const oldPath = this.realPath;
  //   this.name = newName;
  //   const newPath = this.realPath;
  //   fs.renameSync(oldPath, newPath);
  // }

}

export class FsDir extends FsNode {

  root;
  children: (FsFile | FsDir)[] = [];

  constructor(realBase: string, name: string, parent: FsDir | null) {
    super(realBase, name, parent);

    let ancestor: FsDir = this;
    while (ancestor.parent) ancestor = ancestor.parent;
    this.root = ancestor;
  }

  get files(): FsFile[] { return this.children.filter(child => child instanceof FsFile) as FsFile[]; }
  get dirs(): FsDir[] { return this.children.filter(child => child instanceof FsDir) as FsDir[]; }

  get childrenByName() { return Object.fromEntries(this.children.map(c => [c.name, c])); }
  get filesByName() { return Object.fromEntries(this.files.map(c => [c.name, c])); }
  get dirsByName() { return Object.fromEntries(this.dirs.map(c => [c.name, c])); }

  // createFile(name: string, buffer: Buffer) {
  //   if (this.childrenByName[name]) {
  //     throw new Error("Cannot overwrite existing file.");
  //   }

  //   const child = new FsFile(this.realBase, name, this);
  //   child.buffer = buffer;
  //   fs.writeFileSync(child.realPath, buffer);
  //   this.children.push(child);

  //   return child;
  // }

  find(toPath: string) {
    const absolutePath = (toPath.startsWith('/')
      ? toPath
      : path.join(this.path, toPath));

    let dir: FsDir = this.root;
    const parts = absolutePath.split(path.sep).slice(1);
    let part: string | undefined;

    while (undefined !== (part = parts.shift())) {
      if (parts.length === 0) {
        if (part === '') return dir;

        return (
          dir.filesByName[part] ??
          dir.filesByName[part + '.ts'] ??
          dir.filesByName[part + '.tsx'] ??
          dir.dirsByName[part]?.filesByName['index.ts'] ??
          dir.dirsByName[part]?.filesByName['index.tsx'] ??
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

export class FsFile extends FsNode {

  root;
  declare parent: FsDir;
  buffer!: Buffer;

  constructor(realBase: string, name: string, parent: FsDir | null) {
    super(realBase, name, parent);
    this.root = this.parent.root;
  }

  // replace(newBuffer: Buffer) {
  //   this.buffer = newBuffer;
  //   fs.writeFileSync(this.realPath, newBuffer);
  // }

  get text() {
    return this.buffer.toString('utf8');
  }

}

export class FileSys {

  root;

  constructor(public fsBase: string) {
    this.root = this.#loadDir('/', null);
  }

  #loadDir(base: string, parent: FsDir | null) {
    const dir = new FsDir(this.fsBase, path.basename(base), parent);

    const dirRealPath = path.join(this.fsBase, base);
    const files = fs.readdirSync(dirRealPath);
    for (const name of files) {
      if (name.startsWith('.')) continue;

      const fileRealPath = path.join(this.fsBase, base, name);
      const stat = fs.statSync(fileRealPath);

      if (stat.isDirectory()) {
        const child = this.#loadDir(path.join(base, name), dir);
        dir.children.push(child);
      }
      else if (stat.isFile()) {
        const child = new FsFile(this.fsBase, name, dir);
        child.buffer = fs.readFileSync(child.realPath);
        dir.children.push(child);
      }
    }

    return dir;
  }

  update(filePaths: Set<string>) {
    this.root = this.#loadDir('/', null);
  }

}
