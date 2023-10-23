import * as fs from "fs";
import * as path from "path/posix";

export class FileSys {

  files = new Map<string, Buffer>();

  constructor(private realBase: string) {
    this.#loadDir('/');
  }

  #loadDir(base: string) {
    const dirRealPath = path.join(this.realBase, base);
    const files = fs.readdirSync(dirRealPath);
    for (const name of files) {
      if (name.startsWith('.')) continue;

      const fileRealPath = path.join(dirRealPath, name);
      const stat = fs.statSync(fileRealPath);

      if (stat.isDirectory()) {
        this.#loadDir(path.join(base, name));
      }
      else if (stat.isFile()) {
        const filepath = path.join(base, name);
        const content = fs.readFileSync(fileRealPath);
        this.files.set(filepath, content);
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
        const contents = fs.readFileSync(realFilePath);
        this.files.set(filepath, contents);
      }
      else {
        this.files.delete(filepath);
      }
    }
  }

}
