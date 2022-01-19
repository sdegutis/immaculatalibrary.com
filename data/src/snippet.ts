import { sortBy } from "./helpers";
import { File } from "/../src/filesys";

class Snippet {

  static from(file: File) {
    return new Snippet();
  }

  date!: string;

}

export const allSnippets = (__file.root
  .dirsByName['data']!
  .dirsByName['snippets']!
  .files.map(file => Snippet.from(file))
  .sort(sortBy(s => s.date)));
