import { loadContentFile, sortBy } from '../core/helpers';
import { Book } from './books';

export interface Category {
  slug: string;
  content: string;

  title: string;
  shortTitle: string;
  books: string[];

  route: string;
  imageBig: string;
  imageSmall: string;

  booksInCategory: Book[];
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

export const categorySorter = sortBy((c: Category) => categoryOrder.indexOf(c.slug));

export function categoryFromFile(file: FsFile): Category {
  const data = loadContentFile<Category>(file);
  data.route = `/books/category/${data.slug}.html`;
  data.imageBig = `/img/categories/${data.slug}-big.jpg`;
  data.imageSmall = `/img/categories/${data.slug}-small.jpg`;
  data.booksInCategory = [];
  return data;
}
