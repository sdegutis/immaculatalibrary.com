import { DataFile } from '../core/data-files';
import { sortBy } from '../core/helpers';
import allCategoryFiles from "../data/categories/";
import { Book, booksBySlug } from './books';

interface CategoryFile {
  title: string;
  shortTitle: string;
  books: string[];
  sortOrder: number;
}

export class Category extends DataFile<CategoryFile> {

  static override modelDir = 'categories';

  booksInCategory: Book[] = [];

  route: string;
  imageBig: string;
  imageSmall: string;

  constructor(file: [string, Buffer]) {
    super(file);
    this.route = `/books/category/${this.slug}.html`;
    this.imageBig = `/img/categories/${this.slug}-big.jpg`;
    this.imageSmall = `/img/categories/${this.slug}-small.jpg`;

    for (const bookSlug of this.data.books) {
      const book = booksBySlug[bookSlug]!;
      book.category = this;
      this.booksInCategory.push(book);
    }
  }

}

export const allCategories = (allCategoryFiles
  .map(file => new Category(file))
  .sort(sortBy(c => c.data.sortOrder)));

export const categoriesBySlug = Object.fromEntries(allCategories.map(cat => [cat.slug, cat]));
