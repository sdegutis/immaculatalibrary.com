import snippetsDir from 'dir:/data/snippets/';
import { Routeable } from '../core/router';
import { bookSnippetRandom, randomSnippetPage } from '../pages/random-snippet';
import { loadContentFile, saveContentFile } from '../util/data-files';
import { sortBy } from "../util/helpers";
import { allSnippetsPage, bookSnippetSearch } from '../view/pages/all-snippets';
import { SnippetRoute } from '../view/pages/snippet';
import { Book } from './book';
import { FsFile } from "/src/filesys";

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

  view;

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

}

export const allSnippets = (snippetsDir
  .files.map(file => Snippet.from(file))
  .sort(sortBy(s => s.view.route)));

export const publishedSnippets = (allSnippets
  .filter(s => s.published)
  .reverse());

export const snippetRoutes: Routeable[] = [
  allSnippetsPage,
  bookSnippetRandom,
  randomSnippetPage,
  bookSnippetSearch,
  ...allSnippets.map(s => s.view),
];
