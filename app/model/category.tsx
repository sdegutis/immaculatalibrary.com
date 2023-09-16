import { loadContentFile } from '../util/data-files';
import { Book } from './book';
import { allBooks } from './models';

export class Category {

  static from(file: FsFile) {
    const slug = file.name.slice(0, -3);

    const data = loadContentFile<{
      title: string,
      shortTitle: string,
      books: string[],
    }>(file, 'slug');

    return new Category(
      slug,
      data.markdownContent,
      data.meta.title,
      data.meta.shortTitle,
      `/img/categories/${slug}-big.jpg`,
      `/img/categories/${slug}-small.jpg`,
      new Set(data.meta.books),
    );
  }

  books: Book[] = [];

  constructor(
    public slug: string,
    public markdownContent: string,
    public title: string,
    public shortTitle: string,
    public imageBig: string,
    public imageSmall: string,
    public bookSlugs: Set<string>,
  ) {
    for (const bookSlug of this.bookSlugs) {
      const book = allBooks.find(book => book.slug === bookSlug)!;
      this.books.push(book);
      book.category = this;
    }
  }

}
