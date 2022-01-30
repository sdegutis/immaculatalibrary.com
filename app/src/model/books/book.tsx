import { addRouteable } from '../../core/router';
import { ViewBookRoute } from '../../pages/books/one-book/view-book';
import { randomBookPage } from '../../pages/books/random-book';
import { loadContentFile } from '../../util/data-files';
import { sortBy } from "../../util/helpers";
import { Category } from '../categories/category';
import { Snippet } from '../snippets/snippet';
import booksDir from '/data/books/';

export class Book {

  static from(file: FsFile) {
    const data = loadContentFile<{
      title: string,
      subtitle: string,
      dateAdded: string,
      author: string,
      translator: string,
      score: number,
      rating: number,
      files: {
        archiveId: string,
        pdfFile: string,
      }[],
      storeLinks: {
        link: string;
        image: string;
        title: string;
      }[],
    }>(file, 'slug');

    return new Book(
      data.slug,
      data.markdownContent,
      data.meta.title,
      data.meta.subtitle,
      data.meta.dateAdded,
      data.meta.author,
      data.meta.translator,
      data.meta.score,
      data.meta.rating,
      data.meta.files,
      data.meta.storeLinks,
    );
  }

  view;

  constructor(
    public slug: string,
    public markdownContent: string,
    public title: string,
    public subtitle: string,
    public dateAdded: string,
    public author: string,
    public translator: string,
    public score: number,
    public rating: number,
    public files: {
      archiveId: string,
      pdfFile: string,
    }[],
    public storeLinks: {
      link: string;
      image: string;
      title: string;
    }[],
  ) {
    this.view = new ViewBookRoute(this);
  }

  category!: Category;
  snippets: Snippet[] = [];

}

export const allBooks = (booksDir
  .files.map(file => Book.from(file))
  .sort(sortBy(b => `${b.dateAdded} ${b.slug}`)));

addRouteable(randomBookPage);
