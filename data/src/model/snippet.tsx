import Yaml from 'js-yaml';
import { md, sortBy } from "../helpers";
import { Routeable } from '../router';
import { File } from "/../src/filesys";
import { RouteInput, RouteOutput } from "/../src/http";
import snippetsDir from '/data/snippets/';

class Snippet implements Routeable {

  static from(file: File) {
    const [, date, slug] = file.name.match(/^(\d{4}-\d{2}-\d{2})-(.+?).md$/)!;

    const fileContents = file.text.replace(/\r\n/g, '\n');
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

  public previewMarkdown;
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
    this.previewMarkdown = this.derivePreview(2000);
  }

  private derivePreview(count: number) {
    const paragraphs = this.markdownContent.trim().split(/(\r?\n>+ *\r?\n)/);

    let running = 0;
    for (let i = 0; i < paragraphs.length; i++) {
      running += paragraphs[i]!.length;
      if (running > count) break;
    }

    if (running < this.markdownContent.length - 1) {
      return this.markdownContent.substring(0, running);
    }
    return null;
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

  get route() {
    return `/book-snippets/${this.date}-${this.slug}.html`;
  }

  get(input: RouteInput): RouteOutput {
    return {
      body: <>
        {'<!DOCTYPE html>'}
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
          </head>
          <body>
            {md.render(this.markdownContent)}
          </body>
        </html>
      </>
    }
  }

}

export const allSnippets = (snippetsDir
  .files.map(file => Snippet.from(file))
  .sort(sortBy(s => s.date)));

export function publishedSnippets() {
  return allSnippets.filter(s => s.published);
}
