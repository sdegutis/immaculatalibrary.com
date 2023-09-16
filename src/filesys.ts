import fs from "fs";
import path from "path/posix";

abstract class FsNode {

  constructor(
    public readonly name: string,
    public readonly parent: FsDir | null,
  ) { }

  get path() {
    const parts: string[] = [];
    for (let node: FsNode | null = this; node; node = node.parent) {
      parts.unshift(node.name);
    }
    return path.join('/', ...parts);
  }

}

export class FsDir extends FsNode {

  children: (FsFile | FsDir)[] = [];

  get files() { return this.children.filter(child => child instanceof FsFile) as FsFile[]; }
  get dirs() { return this.children.filter(child => child instanceof FsDir) as FsDir[]; }

  get childrenByName() { return Object.fromEntries(this.children.map(c => [c.name, c])); }
  get filesByName() { return Object.fromEntries(this.files.map(c => [c.name, c])); }
  get dirsByName() { return Object.fromEntries(this.dirs.map(c => [c.name, c])); }

  find(toPath: string) {
    const absolutePath = (toPath.startsWith('/')
      ? toPath
      : path.join(this.path, toPath));

    let dir: FsDir = this;
    while (dir.parent) dir = dir.parent;

    const parts = absolutePath.split(path.sep).slice(1);
    let part: string | undefined;

    while (undefined !== (part = parts.shift())) {
      if (parts.length === 0) {
        if (part === '') return dir;

        return (
          dir.filesByName[part] ??
          dir.dirsByName[part] ??
          dir.filesByName[part + '.ts'] ??
          dir.filesByName[part + '.tsx'] ??
          dir.dirsByName[part]?.filesByName['index.ts'] ??
          dir.dirsByName[part]?.filesByName['index.tsx'] ??
          undefined
        );
      }
      else {
        const subdir = dir.dirsByName[part];
        if (!subdir) break;
        dir = subdir;
      }
    }

    return undefined;
  }

  clone(parent: FsDir | null) {
    const dir = new FsDir(this.name, parent);
    dir.children = this.children.map(node => node.clone(dir));
    return dir;
  }

  delete(node: FsFile | FsDir) {
    const idx = this.children.indexOf(node);
    this.children.splice(idx, 1);
  }

  createFile(name: string, contents: Buffer) {
    if (this.children.find(node => node.name === name)) {
      throw new Error(`File already exists with this name.`);
    }

    const file = new FsFile(name, this);
    file.buffer = contents;
    this.children.push(file);
  }

}

export class FsFile extends FsNode {

  declare parent: FsDir;
  buffer!: Buffer;

  get text() {
    return this.buffer.toString('utf8');
  }

  clone(parent: FsDir) {
    const file = new FsFile(this.name, parent);
    file.buffer = this.buffer;
    return file;
  }

}

export class FileSys {

  root;

  constructor(public realBase: string) {
    this.root = this.#loadDir('/', null);
  }

  realPath(node: FsNode) {
    return path.join(this.realBase, node.path);
  }

  #loadDir(base: string, parent: FsDir | null) {
    const dir = new FsDir(path.basename(base), parent);

    const dirRealPath = path.join(this.realBase, base);
    const files = fs.readdirSync(dirRealPath);
    for (const name of files) {
      if (name.startsWith('.')) continue;

      const fileRealPath = path.join(this.realBase, base, name);
      const stat = fs.statSync(fileRealPath);

      if (stat.isDirectory()) {
        const child = this.#loadDir(path.join(base, name), dir);
        dir.children.push(child);
      }
      else if (stat.isFile()) {
        const child = new FsFile(name, dir);
        child.buffer = fs.readFileSync(this.realPath(child));
        dir.children.push(child);
      }
    }

    return dir;
  }

  reflectChangesFromReal(realFilePaths: Set<string>) {
    for (const realFilePath of realFilePaths) {
      const fsFilePath = realFilePath.slice(this.realBase.length);
      const fsFile = this.root.find(fsFilePath) as FsFile | null;

      if (fs.existsSync(realFilePath)) {
        const contents = fs.readFileSync(realFilePath);

        if (fsFile) {
          fsFile.buffer = contents;
        }
        else {
          const dirs = fsFilePath.slice(1).split(path.sep);
          const name = dirs.pop()!;

          let dir = this.root;
          for (const dirName of dirs) {
            let subdir = dir.dirsByName[dirName];
            if (!subdir) {
              subdir = new FsDir(dirName, dir);
              dir.children.push(subdir);
            }
            dir = subdir;
          }

          const file = new FsFile(name, dir);
          file.buffer = contents;
          dir.children.push(file);
        }
      }
      else {
        if (fsFile) {
          const nodes = fsFile.parent.children;
          const idx = nodes.indexOf(fsFile);
          nodes.splice(idx, 1);
        }
      }
    }
  }

  reflectChangesToReal(outDir: FsDir) {
    console.log(outDir, this.root);

    this.root = outDir;
  }

}
