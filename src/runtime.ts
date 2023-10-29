import * as fs from "fs";
import * as path from "path/posix";
import * as sucrase from 'sucrase';
import { pathToFileURL } from "url";
import * as vm from 'vm';

class File {

  module?: Module;

  constructor(public path: string, public content: Buffer, public realFilePath: string) {
    if (path.match(/\.tsx?$/)) {
      this.path = path.replace(/\.tsx?$/, '.js');

      const rawCode = content.toString('utf8');
      const fileUrl = pathToFileURL(realFilePath).href;

      const transformed = sucrase.transform(rawCode, {
        transforms: ['typescript', 'jsx'],
        jsxRuntime: 'automatic',
        jsxImportSource: '/core',
        disableESTransforms: true,
        production: true,
        filePath: fileUrl,
        sourceMapOptions: {
          compiledFilename: realFilePath,
        },
      });

      const sourceCode = transformed.code.replace(/"\/core\/jsx-runtime"/g, `"/core/jsx-transform.js"`);
      this.content = Buffer.from(sourceCode);

      const sourceMapBase64 = Buffer.from(JSON.stringify(transformed.sourceMap)).toString('base64url');
      const sourceMap = `\n//# sourceMappingURL=data:application/json;base64,${sourceMapBase64}`;

      this.module = new Module(sourceCode, sourceMap, fileUrl);
    }
  }

}

class Module {

  constructor(
    private sourceCode: string,
    private sourceMap: string,
    private fileUrl: string,
  ) {

  }

  create() {

  }

  require(): any {

  }

  resetExports() {

  }

}

export class Runtime {

  files = new Map<string, File>();

  constructor(private realBase: string) {
    this.#loadDir('/');
    this.#createModules();
  }

  build() {
    console.time('Running /core/main.js');
    try {
      const mainModule = this.files.get('/core/main.js')!.module!;
      return mainModule.require() as {
        outfiles: Map<string, Buffer | string>,
        handlers: Map<string, (body: string) => string>,
      };
    }
    catch (e) {
      console.error(e);
      return;
    }
    finally {
      console.timeEnd('Running /core/main.js');
    }
  }

  async pathsUpdated(...paths: string[]) {
    const filepaths = paths.map(p => p.slice(this.realBase.length));

    for (const filepath of filepaths) {
      const realFilePath = path.join(this.realBase, filepath);

      if (fs.existsSync(realFilePath)) {
        this.#createFile(filepath);
      }
      else {
        this.files.delete(filepath);
      }
    }

    await this.#createModules();
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
        this.#createFile(filepath);
      }
    }
  }

  #createFile(filepath: string) {
    const realFilePath = path.join(this.realBase, filepath);
    let content = fs.readFileSync(realFilePath);
    const file = new File(filepath, content, realFilePath);
    this.files.set(file.path, file);
  }

  async #createModules() {
    // const linker = async (specifier: string, referencingModule: vm.Module) => {
    //   if (!specifier.match(/^[./]/)) {
    //     return await packageCache.import(specifier);
    //   }

    //   const referencingAbsPath = this.pathsForModules.get(referencingModule)!;
    //   const absPath = path.resolve(path.dirname(referencingAbsPath), specifier);

    //   const module = this.modules.get(absPath);
    //   if (module) {
    //     return module;
    //   }

    //   if (specifier.endsWith('/')) {
    //     const dirPath = absPath.endsWith('/') ? absPath : absPath + '/';
    //     const files = [...this.files.entries()]
    //       .map(([filepath, file]) => ({ path: filepath, content: file.content }))
    //       .filter(file => file.path.startsWith((dirPath)));
    //     return await moduleFor({ default: files });
    //   }

    //   throw new Error(`Can't find file at path: ${specifier}`);
    // };

    // async function importDynamic(specifier: string, referencingModule: vm.Module) {
    //   const mod = await linker(specifier, referencingModule);
    //   await mod.link(linker);
    //   await mod.evaluate();
    //   return mod;
    // }

    for (const [filepath, file] of this.files.entries()) {
      file.module?.create();
    }

    // await this.modules.get('/core/main.js')!.link(linker);
  }

}
