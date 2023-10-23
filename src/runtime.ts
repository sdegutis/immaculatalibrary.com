import * as fs from "fs";
import * as path from "path/posix";
import { Module } from "./module.js";

class File {

  constructor(
    public path: string,
    public content: Buffer,
  ) {

  }

}

export class Runtime {

  files = new Map<string, File>();
  modules = new Map<string, Module>();
  #deps = new Map<string, Set<string>>();

  constructor(private realBase: string) {
    this.#loadDir('/');

    for (const [filepath, file] of this.files) {
      if (filepath.match(/\.tsx?$/)) {
        this.modules.set(filepath, new Module(filepath, file.content, this));
      }
    }
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
        const content = fs.readFileSync(realFilePath);
        this.files.set(filepath, new File(filepath, content));
      }
    }
  }

  realPath(filepath: string) {
    return path.join(this.realBase, filepath);
  }

  reflectChangesFromReal(filepaths: string[]) {
    for (const filepath of filepaths) {
      const realFilePath = path.join(this.realBase, filepath);

      if (fs.existsSync(realFilePath)) {
        const content = fs.readFileSync(realFilePath);
        this.files.set(filepath, new File(filepath, content));
      }
      else {
        this.files.delete(filepath);
      }
    }
  }

  updateModules(filepaths: string[]) {
    const resetSeen = new Set<string>();

    for (const filepath of filepaths) {
      const file = this.files.get(filepath);
      if (file && filepath.match(/\.tsx?$/)) {
        this.modules.set(filepath, new Module(filepath, file.content, this));
      }
      else {
        this.modules.delete(filepath);
      }

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
          const module = this.modules.get(dep);
          module?.resetExports();
          this.#resetDepTree(dep, seen);
        }
      }
    }
  }

}
