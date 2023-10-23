import * as fs from "fs";
import * as path from "path/posix";
import { Module } from "./module.js";

class FsFile {

  module?: Module;

  constructor(
    public path: string,
    public content: Buffer,
  ) {

  }

}

export class Runtime {

  files = new Map<string, FsFile>();
  #deps = new Map<string, Set<string>>();

  constructor(private realBase: string) {
    this.#loadDir('/');
  }

  #loadDir(base: string) {
    const dirRealPath = path.join(this.realBase, base);
    const files = fs.readdirSync(dirRealPath);
    for (const name of files) {
      if (name.startsWith('.')) continue;

      const realFilePath = path.join(dirRealPath, name);
      const stat = fs.statSync(realFilePath);

      if (stat.isDirectory()) {
        this.#loadDir(path.join(base, name));
      }
      else if (stat.isFile()) {
        const filepath = path.join(base, name);
        this.#createFile(filepath, realFilePath);
      }
    }
  }

  #createFile(filepath: string, realFilePath: string) {
    const content = fs.readFileSync(realFilePath);
    const file = new FsFile(filepath, content);
    this.files.set(filepath, file);

    if (filepath.match(/\.tsx?$/)) {
      file.module = new Module(filepath, file.content, this);
    }
  }

  realPath(filepath: string) {
    return path.join(this.realBase, filepath);
  }

  reflectChangesFromReal(filepaths: string[]) {
    for (const filepath of filepaths) {
      const realFilePath = path.join(this.realBase, filepath);

      if (fs.existsSync(realFilePath)) {
        this.#createFile(filepath, realFilePath);
      }
      else {
        this.files.delete(filepath);
      }
    }
  }

  updateModules(filepaths: string[]) {
    const resetSeen = new Set<string>();
    for (const filepath of filepaths) {
      this.#resetDepTree(filepath, resetSeen);
    }
  }

  addDeps(requiredBy: string, requiring: string) {
    let list = this.#deps.get(requiring);
    if (!list) this.#deps.set(requiring, list = new Set());
    list.add(requiredBy);
  }

  #resetDepTree(path: string, seen: Set<string>) {
    if (seen.has(path)) return;
    seen.add(path);

    for (const [requiring, requiredBy] of this.#deps) {
      if (path.startsWith(requiring)) {
        this.#deps.delete(requiring);
        for (const dep of requiredBy) {
          const module = this.files.get(dep)?.module;
          module?.resetExports();
          this.#resetDepTree(dep, seen);
        }
      }
    }
  }

}
