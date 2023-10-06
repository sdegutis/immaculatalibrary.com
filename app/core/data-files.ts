import fs from "fs";
import Yaml from "js-yaml";
import path from "path/posix";

export class DataFile<D> {

  slug;
  content;
  data;
  #filepath;

  constructor([filepath, rawContent]: [string, Buffer]) {
    this.#filepath = filepath;

    this.slug = path.basename(filepath).slice(0, -3);

    const fileContents = rawContent.toString('utf8').replace(/\r\n/g, '\n');
    const fileContentsMatch = fileContents.match(/^---\n(.+?)\n---\n\n(.+?)$/s)!;
    const frontmatter = fileContentsMatch[1]!;
    this.content = fileContentsMatch[2]!;

    this.data = Yaml.load(frontmatter!) as D;
  }

  save() {
    const filepath = path.resolve(path.join('app', this.#filepath));
    const content = `---\n${Yaml.dump(this.data)}---\n\n${this.content}`;
    fs.writeFileSync(filepath, content);
  }

}

export class DataFileWithDate<D> extends DataFile<D> {

  date: string;

  constructor(file: [string, Buffer]) {
    super(file);
    this.date = this.slug.match(/^(\d{4}-\d{2}-\d{2})-/)?.[1]!;
  }

}
