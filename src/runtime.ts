import { FileSys, FsDir, FsFile } from "./filesys";
import { Module } from "./module";

export class Runtime {

  #deps = new Map<string, Set<string>>();

  constructor(public fs: FileSys) {
    this.#createModules(fs.root);
  }

  #createModules(dir: FsDir) {
    for (const subdir of dir.dirs) {
      this.#createModules(subdir);
    }

    for (const file of dir.files) {
      if (file.name.match(/\.tsx?$/)) {
        file.module = new Module(file, this);
      }
    }
  }

  updateModules(files: FsFile[]) {
    const resetSeen = new Set<string>();

    for (const file of files) {
      if (file.name.match(/\.tsx?$/)) {
        if (file.module) {
          file.module.resetFunction();
        }
        else {
          file.module = new Module(file, this);
        }
      }

      this.#resetDepTree(file.path, resetSeen);
    }
  }

  addDep(path: string, requiringPath: string) {
    let list = this.#deps.get(requiringPath);
    if (!list) this.#deps.set(requiringPath, list = new Set());
    list.add(path);
  }

  #resetDepTree(path: string, seen: Set<string>) {
    if (seen.has(path)) return;
    seen.add(path);

    const deps = this.#deps.get(path);
    if (deps) {
      this.#deps.delete(path);
      for (const dep of deps) {
        const file = this.fs.root.find(dep) as FsFile;
        file.module?.resetExports();
        this.#resetDepTree(dep, seen);
      }
    }
  }

}
