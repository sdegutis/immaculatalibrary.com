import { DataFileWithoutDate, loadContentFile, sortBy } from '../core/helpers';
import { Book } from './books';

interface CategoryFile extends DataFileWithoutDate {
  title: string;
  shortTitle: string;
  books: string[];
}

export class Category {

  booksInCategory: Book[] = [];

  route: string;
  imageBig: string;
  imageSmall: string;

  constructor(public data: CategoryFile) {
    this.route = `/books/category/${data.slug}.html`;
    this.imageBig = `/img/categories/${data.slug}-big.jpg`;
    this.imageSmall = `/img/categories/${data.slug}-small.jpg`;
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

export const categorySorter = sortBy((c: Category) => categoryOrder.indexOf(c.data.slug));

export function categoryFromFile(file: [string, Buffer]): Category {
  const data = loadContentFile<CategoryFile>(file);
  return new Category(data);
}
