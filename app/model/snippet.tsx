import { SnippetRoute, SnippetWithPreviewRoute } from '../routes/snippets/one/snippet';
import { loadContentFile } from '../util/data-files';
import { markdown } from '../util/helpers';
import { Book } from './book';
import { allBooks, allSnippets } from './models';
import { Tag } from './tag';

export class Snippet {
  static from(file: FsFile) {
    const data = loadContentFile<{
      published: boolean,
      title: string,
      archiveSlug: string,
      archivePage: string,
      bookSlug: string,
      tags: string[],
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
      new Set(data.meta.tags ?? []),
    );
  }

  nextSnippet?: Snippet;
  prevSnippet?: Snippet;

  view;
  viewWithPreview;

  tags;

  public renderedBody;
  public renderedTitle;

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
    tags: Set<string>,
  ) {
    this.previewMarkdown = this.derivePreview(2000);

    this.view = new SnippetRoute(this);
    this.viewWithPreview = new SnippetWithPreviewRoute(this);

    this.book = allBooks.find(book => book.slug.includes(this.bookSlug))!;
    this.book.snippets.push(this);

    this.tags = new Set([...tags].map(Tag.getOrCreate));
    for (const tag of this.tags) {
      tag.addSnippet(this);
    }

    allSnippets?.unshift(this);

    this.renderedBody = markdown.render(this.markdownContent);
    this.renderedTitle = markdown.renderInline(this.title);
  }

  get archiveLink() {
    return `https://archive.org/details/${this.archiveSlug}/page/${this.archivePage}?view=theater`;
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

  book: Book;

  get image() {
    return this.book.category.imageBig;
  }

}
