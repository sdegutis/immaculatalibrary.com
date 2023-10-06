import { DataFile } from '../core/data-files';
import { sortBy } from '../core/helpers';
import allCategoryFiles from "../data/categories/";
import { Book, booksBySlug } from './books';

interface CategoryFile {
  title: string;
  shortTitle: string;
  books: string[];
}

export class Category extends DataFile<CategoryFile> {

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

const categoryOrder = [
  'classics',
  'devotion',
  'instruction',
  'reference',
  'saints',
  'mary',
  'joseph',
  'apologetics',
  'blessed-sacrament',
  'sacred-heart',
  'holy-spirit',
  'lourdes',
  'st-francis-de-sales',
  'st-alphonsus-de-liguori',
  'st-catherine-of-siena',
  'st-teresa-of-avila',
  'st-john-of-the-cross',
  'st-john-henry-newman',
  'st-thomas-more',
  'st-thomas-aquinas',
  'st-louis-de-montfort',
  'jesuits',
  'fr-lasance',
];

export const allCategories = (allCategoryFiles
  .map(file => new Category(file))
  .sort(sortBy(c => categoryOrder.indexOf(c.slug))));

export const categoriesBySlug = Object.fromEntries(allCategories.map(cat => [cat.slug, cat]));
