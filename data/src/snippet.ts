import { sortBy } from "./helpers";
import { File } from "/../src/filesys";
import Yaml from 'js-yaml';

class Snippet {

  static from(file: File) {
    const [, date, slug] = file.name.match(/^(\d{4}-\d{2}-\d{2})-(.+?).md$/)!;

    const fileContents = file.buffer.toString('utf8');
    const [, frontmatter, markdownContent] = fileContents.match(/^---\n(.+?)\n---\n\n(.+?)$/s)!;

    const meta = Yaml.load(frontmatter!) as {
      published: boolean,
      title: string,
      archiveLink: string,
      bookSlug: string,
    };

    return new Snippet(
      file,
      date!,
      slug!,
      markdownContent!,
      meta.published,
      meta.title,
      meta.archiveLink,
      meta.bookSlug,
    );
  }

  public preview;
  constructor(
    private file: File,
    public date: string,
    public slug: string,
    public markdownContent: string,
    public published: boolean,
    public title: string,
    public archiveLink: string,
    public bookSlug: string,
  ) {
    this.preview = this.derivePreview(2000);
  }

  private derivePreview(count: number) {
    const paragraphs = this.markdownContent.trim().split(/(\r?\n>+ *\r?\n)/);

    let running = 0;
    for (let i = 0; i < paragraphs.length; i++) {
      running += paragraphs[i]!.length;
      if (running > count) break;
    }

    return {
      hasPreview: running < this.markdownContent.length - 1,
      previewMarkdownContent: this.markdownContent.substring(0, running)
    };
  }

  save() {
    const header = Yaml.dump({
      published: this.published,
      title: this.title,
      archiveLink: this.archiveLink,
      bookSlug: this.bookSlug,
    }, {
      forceQuotes: true,
    });
    this.file.replace(Buffer.from(`---\n${header}---\n\n${this.markdownContent}`));
  }
}

export const allSnippets = (__file.root
  .dirsByName['data']!
  .dirsByName['snippets']!
  .files.map(file => Snippet.from(file))
  .sort(sortBy(s => s.date)));
