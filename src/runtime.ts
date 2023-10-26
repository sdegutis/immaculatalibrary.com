import * as fs from "fs";
import * as path from "path/posix";
import * as sucrase from 'sucrase';
import { pathToFileURL } from "url";
import * as vm from 'vm';

interface ModuleData {
  sourceMap: string;
  fileUrl: string;
}

interface FsFile {
  content: Buffer;
  moduleData: ModuleData | undefined;
}

export class Runtime {

  files = new Map<string, FsFile>();
  modules = new Map<string, vm.Module>();

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
        this.#createFile(filepath);
      }
    }
  }

  #createFile(filepath: string) {
    const finalFilePath = filepath.replace(/\.tsx?$/, '.js');
    const isTS = finalFilePath !== filepath;

    const realFilePath = path.join(this.realBase, filepath);
    let content = fs.readFileSync(realFilePath);

    let moduleData: ModuleData | undefined;
    if (isTS) {
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

      content = Buffer.from(transformed.code
        .replace(/"\/core\/jsx-runtime"/g, `"/core/jsx-runtime.js"`)
      );

      const sourceMapBase64 = Buffer.from(JSON.stringify(transformed.sourceMap)).toString('base64url');
      const sourceMap = `\n//# sourceMappingURL=data:application/json;base64,${sourceMapBase64}`;

      moduleData = { sourceMap, fileUrl };
    }

    const file = { content, moduleData };
    this.files.set(finalFilePath, file);
  }

  realPath(filepath: string) {
    return path.join(this.realBase, filepath);
  }

  async reflectChangesFromReal(filepaths: string[]) {
    for (const filepath of filepaths) {
      const realFilePath = path.join(this.realBase, filepath);

      if (fs.existsSync(realFilePath)) {
        this.#createFile(filepath);
      }
      else {
        this.files.delete(filepath);
      }
    }

    await this.createModules();
  }

  async createModules() {
    const linker = async (specifier: string, referencingModule: vm.Module) => {
      if (!specifier.match(/^[./]/)) {
        return await packageCache.import(specifier);
      }

      const prefixLen = `${pathToFileURL(process.cwd()).href}/${this.realBase}`.length;
      const absPath = path.resolve(path.dirname(referencingModule.identifier.slice(prefixLen)), specifier);

      const module = this.modules.get(absPath);
      if (module) {
        return module;
      }

      if (specifier.endsWith('/')) {
        const dirPath = absPath.endsWith('/') ? absPath : absPath + '/';
        const files = [...this.files.entries()]
          .map(([filepath, file]) => ({ path: filepath, content: file.content }))
          .filter(file => file.path.startsWith((dirPath)));

        return new vm.SyntheticModule(['default'], function () {
          this.setExport('default', files);
        });
      }

      throw new Error(`Can't find file at path: ${specifier}`);
    };

    this.modules.clear();

    for (const [filepath, file] of this.files.entries()) {
      if (file.moduleData) {
        const module = new vm.SourceTextModule(file.content.toString('utf8') + file.moduleData.sourceMap!, {
          identifier: file.moduleData.fileUrl!,
          importModuleDynamically: (async (specifier: string, referencingModule: vm.Module) => {
            const mod = await linker(specifier, referencingModule);
            await mod.link(linker);
            await mod.evaluate();
            return mod.namespace;
          }) as any,
        });

        this.modules.set(filepath, module);
      }
    }

    await this.modules.get('/core/main.js')!.link(linker);
  }

}

class PackageCache {

  packages = new Map<string, vm.Module>();

  async import(specifier: string): Promise<vm.Module> {
    let pkg = this.packages.get(specifier);
    if (!pkg) this.packages.set(specifier, pkg = await this.#wrap(await import(specifier)));
    return pkg;
  }

  async #wrap(ns: Record<string, any>) {
    return new vm.SyntheticModule(Object.keys(ns), function () {
      for (const [key, val] of Object.entries(ns)) {
        this.setExport(key, val);
      }
    });
  }

}

const packageCache = new PackageCache();
