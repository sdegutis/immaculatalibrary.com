import fs from "fs";
import Yaml from "js-yaml";
import path from "path/posix";

export class DataFile<D> {

  static modelDir: string;

  slug;
  content;
  data;

  constructor([filepath, rawContent]: [string, Buffer]) {
    this.slug = path.basename(filepath).slice(0, -3);

    const fileContents = rawContent.toString('utf8').replace(/\r\n/g, '\n');
    const fileContentsMatch = fileContents.match(/^---\n(.+?)\n---\n\n(.+?)$/s)!;
    const frontmatter = fileContentsMatch[1]!;
    this.content = fileContentsMatch[2]!;

    this.data = Yaml.load(frontmatter!) as D;
  }

  save() {
    const modelDir = (this.constructor as typeof DataFile<D>).modelDir;
    const filepath = path.resolve(path.join('app/data', modelDir, this.#deriveFilename()));
    const content = `---\n${Yaml.dump(this.data)}---\n\n${this.content}`;
    fs.writeFileSync(filepath, content);
  }

  #deriveFilename() {
    return `${this.slug}.md`;
  }

}

export class DataFileWithDate<D> extends DataFile<D> {

  date: string;

  constructor(file: [string, Buffer]) {
    super(file);
    this.date = this.slug.match(/^(\d{4}-\d{2}-\d{2})-/)?.[1]!;
  }

}
