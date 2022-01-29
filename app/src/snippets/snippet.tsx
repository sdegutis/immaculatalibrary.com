import Yaml from 'js-yaml';
import * as luxon from 'luxon';
import { addRouteable } from '../core/router';
import { Book } from '../model/book';
import { loadContentFile, saveContentFile } from '../util/data-files';
import { sortBy } from "../util/helpers";
import { CloneSnippetPage } from './create/routes';
import { bookSnippetRandom, randomSnippetPage } from './random';
import { allSnippetsPage, bookSnippetSearch } from './view-all';
import { SnippetRoute } from './view-one';
import snippetsDir from '/data/snippets/';

[
  allSnippetsPage,
  bookSnippetRandom,
  randomSnippetPage,
  bookSnippetSearch,
].forEach(addRouteable);

export const snippetsById = new Map<string, Snippet>();

export class Snippet {
  static from(file: FsFile) {
    const data = loadContentFile<{
      published: boolean,
      title: string,
      archiveLink: string,
      bookSlug: string,
    }>(file, 'date-slug');

    return new Snippet(
      file,
      data.date,
      data.slug,
      data.markdownContent,
      data.meta.published,
      data.meta.title,
      data.meta.archiveLink,
      data.meta.bookSlug,
    );
  }

  id;
  view;
  clone;

  public previewMarkdown;
  constructor(
    private file: FsFile,
    public date: string,
    public slug: string,
    public markdownContent: string,
    public published: boolean,
    public title: string,
    public archiveLink: string,
    public bookSlug: string,
  ) {
    this.previewMarkdown = this.derivePreview(2000);

    this.view = new SnippetRoute(this);
    this.clone = new CloneSnippetPage(this);

    addRouteable(this.view);
    addRouteable(this.clone);

    this.id = `${this.date}-${this.slug}`;
    snippetsById.set(this.id, this);
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
    saveContentFile(this.file, {
      published: this.published,
      title: this.title,
      archiveLink: this.archiveLink,
      bookSlug: this.bookSlug,
    }, this.markdownContent);
  }

  book!: Book;

  get image() {
    return this.book.category.imageFilename;
  }

  createClone(newData: {
    archiveLink: string,
    slug: string,
    title: string,
    markdownContent: string,
  }): Snippet {
    const date = luxon.DateTime.now().toISODate();
    const header = Yaml.dump({
      published: true,
      title: newData.title,
      archiveLink: newData.archiveLink,
      bookSlug: this.bookSlug,
    });
    const buffer = Buffer.from(`---\n${header}---\n\n${newData.markdownContent}`);
    const file = snippetsDir.createFile(`${date}-${newData.slug}.md`, buffer);
    const newSnippet = Snippet.from(file);
    newSnippet.book = this.book;
    newSnippet.save();
    return newSnippet;
  }

}

export const allSnippets = (snippetsDir
  .files.map(file => Snippet.from(file))
  .sort(sortBy(s => s.view.route)));

export const publishedSnippets = (allSnippets
  .filter(s => s.published)
  .reverse());
