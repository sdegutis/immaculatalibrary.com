import { DataFileWithDate } from "../core/data-files.js";
import { markdown, sortBy } from "../core/helpers.js";
import allSnippetFiles from "../data/snippets/";
import { calculateReadingMins } from '../shared/helpers.js';
import { Book } from './books.js';
import { snippets } from "./relations.js";
import { Tag } from './tag.js';

interface SnippetFile {
  published: boolean;
  title: string;
  archiveSlug: string;
  archivePage: string;
  bookSlug: string;
  tags: string[];
}

export class Snippet extends DataFileWithDate<SnippetFile> {

  static override modelDir = 'snippets';

  route: string;
  archiveLink: string;
  renderedBody: string;
  renderedTitle: string;
  mins: number;

  prevSnippet?: Snippet;
  nextSnippet?: Snippet;
  tags: Set<Tag>;

  constructor(slug: string, content: string, data: SnippetFile) {
    super(slug, content, data);

    this.data.tags ??= [];

    this.route = `/snippets/${this.slug}.html`;

    this.archiveLink = `https://archive.org/details/${this.data.archiveSlug}/page/${this.data.archivePage}?view=theater`;
    this.renderedBody = markdown.render(this.content);
    this.renderedTitle = markdown.renderInline(this.data.title);
    this.mins = calculateReadingMins(this.content);

    this.tags = new Set([...this.data.tags ?? []].map(Tag.getOrCreate));
  }

  get book(): Book {
    return snippets().bookForSnippet.get(this)!;
  }

}

export const allSnippets = (allSnippetFiles
  .map(file => Snippet.fromFile(file))
  .filter((s => s.data.published))
  .sort(sortBy(s => s.slug))
  .reverse());
