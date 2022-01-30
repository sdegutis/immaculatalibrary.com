import Yaml from 'js-yaml';
import * as luxon from 'luxon';
import { CloneSnippetPage } from '../../pages/snippets/create/routes';
import { SnippetRoute } from '../../pages/snippets/one/snippet';
import { loadContentFile, saveContentFile } from '../../util/data-files';
import { Book } from '../books/book';
import { allBooks, allSnippets } from '../models';
import snippetsDir from './data/';

export class Snippet {
  static from(file: FsFile) {
    const data = loadContentFile<{
      published: boolean,
      title: string,
      archiveSlug: string,
      archivePage: string,
      bookSlug: string,
    }>(file, 'date-slug');

    return new Snippet(
      file,
      data.date,
      data.slug,
      data.markdownContent,
      data.meta.published,
      data.meta.title,
      data.meta.archiveSlug,
      data.meta.archivePage,
      data.meta.bookSlug,
    );
  }

  view;
  clone;

  archiveLink;
  public previewMarkdown;
  constructor(
    private file: FsFile,
    public date: string,
    public slug: string,
    public markdownContent: string,
    public published: boolean,
    public title: string,
    public archiveSlug: string,
    public archivePage: string,
    public bookSlug: string,
  ) {
    this.previewMarkdown = this.derivePreview(2000);

    this.view = new SnippetRoute(this);
    this.clone = new CloneSnippetPage(this, `${this.date}-${this.slug}`);

    this.book = allBooks.find(book => book.slug.includes(this.bookSlug))!;
    this.book.snippets.push(this);

    this.archiveLink = `https://archive.org/details/${archiveSlug}/page/${archivePage}?view=theater`;

    allSnippets?.unshift(this);
  }

  private derivePreview(count: number) {
    const paragraphs = this.markdownContent.trim().split(/(\r?\n>+ *\r?\n)/);

    let running = 0;
    for (let i = 0; i < paragraphs.length; i++) {
      running += paragraphs[i]!.length;
      if (running > count) break;
    }

    if (running < this.markdownContent.trim().length - 1) {
      return this.markdownContent.substring(0, running);
    }
    return null;
  }

  save() {
    saveContentFile(this.file, {
      published: this.published,
      title: this.title,
      archiveSlug: this.archiveSlug,
      archivePage: this.archivePage,
      bookSlug: this.bookSlug,
    }, this.markdownContent);
  }

  book: Book;

  get image() {
    return this.book.category.imageBig;
  }

  static create(newData: {
    archiveSlug: string,
    archivePage: string,
    slug: string,
    bookSlug: string,
    title: string,
    markdownContent: string,
  }): Snippet {
    const date = luxon.DateTime.now().toISODate();
    const header = Yaml.dump({
      published: true,
      title: newData.title,
      archiveSlug: newData.archiveSlug,
      archivePage: newData.archivePage,
      bookSlug: newData.bookSlug,
    });
    const buffer = Buffer.from(`---\n${header}---\n\n${newData.markdownContent}`);
    const file = snippetsDir.createFile(`${date}-${newData.slug}.md`, buffer);
    const newSnippet = Snippet.from(file);
    newSnippet.save();
    return newSnippet;
  }

}
